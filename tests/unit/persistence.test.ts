import { describe, expect, it } from "vitest";
import { IDBFactory } from "fake-indexeddb";
import { IdbRepository } from "@/persistence/idb";
import { MemoryRepository } from "@/persistence/memory";
import { StorageError, stateToOps } from "@/persistence/repository";
import { buildBackup, parseBackup, serializeBackup, summarize } from "@/persistence/backup";
import { migrate } from "@/persistence/migrations";
import { ProgressStore } from "@/state/store";
import { completeLesson, recordAttempt, submitTask } from "@/state/actions";
import { attemptInput, exCloze, fresh, T0 } from "./helpers";
import type { ProgressState } from "@/engine/model";
import { totalXp } from "@/engine/xp";

function populated(): ProgressState {
  let s = fresh();
  s = recordAttempt(s, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), T0).state;
  s = completeLesson(s, { lessonId: "a1-u01-l1", concepts: [{ id: "a1-u01:good-morning", modes: ["rec", "prod"] }], accuracy: 0.9 }, T0).state;
  s = submitTask(s, { id: "a1-u01-act-writing-w1", unitId: "a1-u01", kind: "writing", status: "self_assessed", text: "Good morning! I'm Ana.", checks: [true, true, false, true] }, T0).state;
  return s;
}

const repos: [string, () => IdbRepository | MemoryRepository][] = [
  ["IndexedDB", () => new IdbRepository(new IDBFactory(), "t-" + Math.random())],
  ["memória", () => new MemoryRepository()],
];

describe.each(repos)("repositório %s", (_name, make) => {
  it("primeiro acesso: não há nada salvo", async () => {
    const repo = make();
    expect((await repo.load()).state).toBeNull();
  });

  it("grava e relê exatamente o mesmo estado", async () => {
    const repo = make();
    const state = populated();
    await repo.replaceAll(state);
    const loaded = await repo.load();
    expect(loaded.warnings).toEqual([]);
    expect(loaded.state).toEqual(state);
  });

  it("aplica operações incrementais e remove linhas", async () => {
    const repo = make();
    const s0 = populated();
    await repo.replaceAll(s0);
    const s1 = recordAttempt(s0, attemptInput(exCloze, { kind: "cloze", text: "x" }, { attemptId: "other" }), T0);
    await repo.apply(s1.ops);
    expect((await repo.load()).state!.attempts).toHaveLength(2);
    await repo.apply([{ store: "attempts", key: "other", delete: true }]);
    expect((await repo.load()).state!.attempts).toHaveLength(1);
  });

  it("ignora linhas inválidas com aviso, sem perder as válidas", async () => {
    const repo = make();
    const state = populated();
    await repo.replaceAll(state);
    await repo.apply([{ store: "lessons", key: "quebrada", value: { id: 7 } }]);
    const loaded = await repo.load();
    expect(loaded.warnings.join(" ")).toContain("quebrada");
    expect(Object.keys(loaded.state!.lessons)).toEqual(["a1-u01-l1"]);
  });

  it("apagar tudo volta ao primeiro acesso", async () => {
    const repo = make();
    await repo.replaceAll(populated());
    await repo.wipe();
    expect((await repo.load()).state).toBeNull();
  });
});

describe("atomicidade (IndexedDB)", () => {
  it("replaceAll que falha no meio não destrói os dados anteriores", async () => {
    const repo = new IdbRepository(new IDBFactory(), "atomic");
    const good = populated();
    await repo.replaceAll(good);

    const bad = { ...populated(), settings: { ...good.settings, voiceURI: (() => 1) as unknown as string } };
    await expect(repo.replaceAll(bad)).rejects.toBeInstanceOf(StorageError);

    expect((await repo.load()).state).toEqual(good);
  });

  it("apply com valor impossível de gravar não deixa escritas parciais", async () => {
    const repo = new IdbRepository(new IDBFactory(), "atomic2");
    const good = populated();
    await repo.replaceAll(good);
    await expect(
      repo.apply([
        { store: "lessons", key: "novo", value: { ok: true } },
        { store: "lessons", key: "quebra", value: () => 1 },
      ]),
    ).rejects.toBeInstanceOf(StorageError);
    const loaded = await repo.load();
    expect(Object.keys(loaded.state!.lessons)).toEqual(["a1-u01-l1"]);
  });
});

describe("backup e importação", () => {
  const state = populated();
  const text = serializeBackup(buildBackup(state, new Date("2026-10-02T12:00:00Z")));

  it("exporta e importa sem perder nada", () => {
    const r = parseBackup(text);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.state).toEqual(state);
      expect(r.summary.lessonsCompleted).toBe(1);
      expect(r.summary.totalXp).toBe(totalXp(state.xp));
      expect(r.migratedFrom).toBeNull();
    }
  });

  it("rejeita arquivo que não é JSON", () => {
    const r = parseBackup("isto não é json {");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("JSON");
  });

  it("rejeita JSON de outro app", () => {
    const r = parseBackup(JSON.stringify({ app: "outro", schemaVersion: 1, exportedAt: "2026-01-01T00:00:00Z", data: {} }));
    expect(r.ok).toBe(false);
  });

  it("rejeita backup de versão mais nova e orienta a atualizar", () => {
    const newer = JSON.stringify({ ...JSON.parse(text), schemaVersion: 99 });
    const r = parseBackup(newer);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("mais nova");
  });

  it("rejeita dados corrompidos e diz onde", () => {
    const broken = JSON.parse(text);
    broken.data.settings.dailyMinutes = 45;
    const r = parseBackup(JSON.stringify(broken));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("Nada foi alterado");
  });

  it("rejeita dados faltando campos obrigatórios", () => {
    const broken = JSON.parse(text);
    delete broken.data.profile;
    expect(parseBackup(JSON.stringify(broken)).ok).toBe(false);
  });

  it("descarta tentativas e XP duplicados com aviso", () => {
    const dup = JSON.parse(text);
    dup.data.attempts.push(dup.data.attempts[0]);
    dup.data.xp.push(dup.data.xp[0]);
    const r = parseBackup(JSON.stringify(dup));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.state.attempts).toHaveLength(state.attempts.length);
      expect(r.state.xp).toHaveLength(state.xp.length);
      expect(r.warnings.length).toBe(2);
    }
  });

  it("migra de um formato antigo quando existe migração", () => {
    // Simula uma versão futura (formato 2) lendo um backup do formato 1.
    const ok = parseBackup(text, { 1: (d) => d }, 2);
    expect(ok.ok && ok.migratedFrom).toBe(1);
    const missing = parseBackup(text, {}, 2);
    expect(missing.ok).toBe(false);
    if (!missing.ok) expect(missing.error).toContain("converter");
  });

  it("migrate aplica os passos em ordem", () => {
    const table = { 1: (d: unknown) => ({ ...(d as object), a: 1 }), 2: (d: unknown) => ({ ...(d as object), b: 2 }) };
    expect(migrate({}, 1, 3, table)).toEqual({ a: 1, b: 2 });
    expect(() => migrate({}, 1, 4, table)).toThrow(/3 para 4/);
  });

  it("o resumo mostra o que será substituído", () => {
    const s = summarize(state, "2026-10-02T12:00:00Z");
    expect(s.concepts).toBe(Object.keys(state.concepts).length);
  });

  it("stateToOps cobre todas as linhas do estado", () => {
    expect(stateToOps(state).length).toBeGreaterThan(5);
  });
});

describe("ProgressStore", () => {
  async function ready(repo = new MemoryRepository()) {
    const store = new ProgressStore(async () => repo, () => T0);
    await store.init();
    return { store, repo };
  }

  it("primeiro acesso cria o estado inicial e persiste o perfil", async () => {
    const { store, repo } = await ready();
    expect(store.getSnapshot().status).toBe("ready");
    expect((await repo.load()).state).not.toBeNull();
  });

  it("importação inválida não destrói o progresso atual", async () => {
    const { store, repo } = await ready();
    store.run((s, now) => recordAttempt(s, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), now));
    await store.flush();
    const before = JSON.stringify(store.state);

    const result = parseBackup('{"app":"zxp-english","schemaVersion":1,"exportedAt":"2026-01-01T00:00:00Z","data":{"lixo":true}}');
    expect(result.ok).toBe(false); // nem chega a substituir

    // E uma falha ao gravar a restauração também preserva tudo:
    repo.failNextWrite = new StorageError("sem espaço", "quota");
    await expect(store.replaceAll({ ...fresh() })).rejects.toBeInstanceOf(StorageError);
    expect(JSON.stringify(store.state)).toBe(before);
    expect(JSON.stringify((await repo.load()).state)).toBe(before);
  });

  it("falha ao gravar mostra o erro, mantém o estado e se recupera na próxima gravação", async () => {
    const { store, repo } = await ready();
    repo.failNextWrite = new StorageError("O navegador está sem espaço.", "quota");
    store.run((s, now) => recordAttempt(s, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }), now));
    await store.flush();
    expect(store.getSnapshot().storage.error).toContain("sem espaço");
    expect(store.state.attempts).toHaveLength(1); // continua em memória

    // próxima ação grava o estado completo, incluindo o que ficou pendente
    store.run((s, now) => recordAttempt(s, attemptInput(exCloze, { kind: "cloze", text: "afternoon" }, { attemptId: "s1:b:1" }), now));
    await store.flush();
    expect(store.getSnapshot().storage.error).toBeNull();
    expect((await repo.load()).state!.attempts).toHaveLength(2);
  });

  it("retrySave regrava tudo", async () => {
    const { store, repo } = await ready();
    repo.failNextWrite = new StorageError("falhou", "failed");
    store.run((s, now) => completeLesson(s, { lessonId: "a1-u01-l1", concepts: [], accuracy: 1 }, now));
    await store.flush();
    expect(await store.retrySave()).toBe(true);
    expect((await repo.load()).state!.lessons["a1-u01-l1"]).toBeTruthy();
  });

  it("cliques duplos não duplicam XP", async () => {
    const { store } = await ready();
    const input = attemptInput(exCloze, { kind: "cloze", text: "afternoon" });
    store.run((s, now) => recordAttempt(s, input, now));
    store.run((s, now) => recordAttempt(s, input, now));
    await store.flush();
    expect(store.state.attempts).toHaveLength(1);
    expect(totalXp(store.state.xp)).toBe(2);
  });

  it("restaurar substitui tudo e persiste", async () => {
    const { store, repo } = await ready();
    const target = populated();
    await store.replaceAll(target);
    expect(store.state).toEqual(target);
    expect((await repo.load()).state).toEqual(target);
  });

  it("apagar tudo volta ao estado inicial", async () => {
    const { store } = await ready();
    await store.replaceAll(populated());
    await store.wipe();
    expect(store.state.attempts).toHaveLength(0);
    expect(store.state.profile.onboarded).toBe(false);
  });

  it("concede conquistas uma única vez", async () => {
    const { store } = await ready();
    store.run((s, now) => completeLesson(s, { lessonId: "a1-u01-l1", concepts: [], accuracy: 1 }, now));
    expect(store.state.achievements["first-lesson"]).toBeTruthy();
    const at = store.state.achievements["first-lesson"].unlockedAt;
    store.run((s, now) => completeLesson(s, { lessonId: "a1-u01-l2", concepts: [], accuracy: 1 }, now));
    expect(store.state.achievements["first-lesson"].unlockedAt).toBe(at);
  });
});
