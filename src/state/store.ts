/**
 * ProgressStore: mantém o estado em memória, aplica ações e grava no repositório.
 *
 * - O estado em memória é atualizado de imediato (interface rápida).
 * - As gravações entram numa fila serial, uma transação atômica por ação.
 * - Se uma gravação falhar, o estado continua em memória, a interface mostra o
 *   erro e a próxima gravação regrava o estado COMPLETO (`dirty`), recuperando o
 *   que ficou pendente.
 * - Entre abas: um BroadcastChannel avisa as outras abas para recarregar.
 */
import type { ProgressState } from "@/engine/model";
import { emptyState } from "@/engine/defaults";
import { now as clockNow } from "@/engine/dates";
import { StorageError, type ProgressRepository } from "@/persistence/repository";
import type { Change } from "./actions";
import { unlockAchievements } from "./actions";
import { newlyUnlocked } from "@/engine/achievements";

export type StoreStatus = "loading" | "ready";

export interface StoreSnapshot {
  status: StoreStatus;
  state: ProgressState | null;
  storage: {
    kind: "indexeddb" | "memory" | null;
    /** Mensagem amigável se a última gravação falhou. */
    error: string | null;
    /** Linhas inválidas ignoradas ao carregar. */
    warnings: string[];
  };
}

type Listener = () => void;

export class ProgressStore {
  private snap: StoreSnapshot = { status: "loading", state: null, storage: { kind: null, error: null, warnings: [] } };
  private listeners = new Set<Listener>();
  private repo: ProgressRepository | null = null;
  private queue: Promise<void> = Promise.resolve();
  private dirty = false;
  private channel: BroadcastChannel | null = null;
  private readonly tabId = Math.random().toString(36).slice(2);

  constructor(
    private readonly makeRepo: () => Promise<ProgressRepository>,
    private readonly clock: () => Date = clockNow,
  ) {}

  // ---- useSyncExternalStore ----
  subscribe = (l: Listener): (() => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  getSnapshot = (): StoreSnapshot => this.snap;
  getServerSnapshot = (): StoreSnapshot => LOADING;

  private set(next: Partial<StoreSnapshot>): void {
    this.snap = { ...this.snap, ...next };
    this.listeners.forEach((l) => l());
  }

  private setError(error: string | null): void {
    this.set({ storage: { ...this.snap.storage, error } });
  }

  get state(): ProgressState {
    if (!this.snap.state) throw new Error("ProgressStore ainda não inicializado");
    return this.snap.state;
  }

  now(): Date {
    return this.clock();
  }

  async init(): Promise<void> {
    if (this.repo) return;
    this.repo = await this.makeRepo();
    let state: ProgressState | null = null;
    let warnings: string[] = [];
    try {
      const loaded = await this.repo.load();
      state = loaded.state;
      warnings = loaded.warnings;
    } catch (e) {
      this.set({ storage: { kind: this.repo.kind, error: friendly(e), warnings: [] } });
    }
    if (!state) {
      state = emptyState(this.clock().toISOString());
      // Persiste o estado inicial para que o perfil exista.
      try {
        await this.repo.replaceAll(state);
      } catch (e) {
        this.dirty = true;
        this.set({ storage: { kind: this.repo.kind, error: friendly(e), warnings } });
      }
    }
    this.set({ status: "ready", state, storage: { ...this.snap.storage, kind: this.repo.kind, warnings } });
    this.openChannel();
  }

  private openChannel(): void {
    if (typeof BroadcastChannel === "undefined" || this.repo?.kind !== "indexeddb") return;
    this.channel = new BroadcastChannel("zxp-english");
    this.channel.onmessage = (ev: MessageEvent) => {
      if (ev.data?.from !== this.tabId) void this.reload();
    };
  }

  /** Recarrega do armazenamento (mudança vinda de outra aba). */
  async reload(): Promise<void> {
    if (!this.repo) return;
    await this.queue;
    try {
      const loaded = await this.repo.load();
      if (loaded.state) this.set({ state: loaded.state });
    } catch {
      /* mantém o estado atual */
    }
  }

  /** Aplica uma ação pura e persiste. */
  run(action: (state: ProgressState, now: Date) => Change): Change {
    const now = this.clock();
    let change = action(this.state, now);
    // Conquistas dependem do estado resultante.
    const fresh = newlyUnlocked(change.state, now);
    if (fresh.length) {
      const extra = unlockAchievements(change.state, fresh, now);
      change = { state: extra.state, ops: [...change.ops, ...extra.ops] };
    }
    this.commit(change);
    return change;
  }

  private commit(change: Change): void {
    if (change.state === this.snap.state && change.ops.length === 0) return;
    this.set({ state: change.state });
    this.persist(change);
  }

  private persist(change: Change): void {
    const repo = this.repo;
    if (!repo) return;
    this.queue = this.queue.then(async () => {
      try {
        if (this.dirty) {
          // Houve falha antes: regrava tudo de uma vez para recuperar o que faltou.
          await repo.replaceAll(this.snap.state!);
          this.dirty = false;
        } else if (change.ops.length) {
          await repo.apply(change.ops);
        }
        if (this.snap.storage.error) this.setError(null);
        this.channel?.postMessage({ from: this.tabId });
      } catch (e) {
        this.dirty = true;
        this.setError(friendly(e));
      }
    });
  }

  /** Aguarda as gravações pendentes (testes e antes de exportar). */
  async flush(): Promise<void> {
    await this.queue;
  }

  /** Tenta gravar o estado completo de novo (botão "Tentar salvar de novo"). */
  async retrySave(): Promise<boolean> {
    if (!this.repo) return false;
    await this.queue;
    try {
      await this.repo.replaceAll(this.state);
      this.dirty = false;
      this.setError(null);
      return true;
    } catch (e) {
      this.setError(friendly(e));
      return false;
    }
  }

  /** Substitui TODO o progresso (restauração de backup). Atômico: em caso de erro nada muda. */
  async replaceAll(next: ProgressState): Promise<void> {
    if (!this.repo) throw new StorageError("Armazenamento indisponível.", "unavailable");
    await this.queue;
    await this.repo.replaceAll(next); // lança se falhar; o estado atual permanece
    this.dirty = false;
    this.set({ state: next });
    this.setError(null);
    this.channel?.postMessage({ from: this.tabId });
  }

  /** Apaga todo o progresso e volta ao estado inicial. */
  async wipe(): Promise<void> {
    if (!this.repo) return;
    await this.queue;
    await this.repo.wipe();
    const fresh = emptyState(this.clock().toISOString());
    await this.repo.replaceAll(fresh);
    this.dirty = false;
    this.set({ state: fresh });
    this.setError(null);
    this.channel?.postMessage({ from: this.tabId });
  }

  get storageKind(): "indexeddb" | "memory" | null {
    return this.repo?.kind ?? null;
  }

  dispose(): void {
    this.channel?.close();
    this.repo?.close();
  }
}

const LOADING: StoreSnapshot = { status: "loading", state: null, storage: { kind: null, error: null, warnings: [] } };

function friendly(e: unknown): string {
  if (e instanceof StorageError) return e.message;
  return "Não foi possível salvar seu progresso neste navegador. Exporte um backup para não perdê-lo.";
}
