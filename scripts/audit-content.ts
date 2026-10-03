/**
 * `npm run content:audit` — valida todo o conteúdo publicado e imprime um resumo.
 * Sai com código 1 se houver qualquer erro.
 */
import { CURRICULUM } from "../src/content/curriculum";
import { LOADERS, loadAllPublished } from "../src/content/registry";
import { auditMeta, auditUnits, contentStats } from "../src/content/audit";

async function main() {
  const units = await loadAllPublished();
  const issues = [...auditMeta(CURRICULUM), ...auditUnits(units, CURRICULUM)];
  const missing = CURRICULUM.filter((m) => !(m.id in LOADERS));

  const stats = contentStats(units);
  const total = stats.reduce(
    (a, s) => ({
      lessons: a.lessons + s.lessons,
      ex: a.ex + s.lessonExercises,
      cp: a.cp + s.checkpointExercises,
      act: a.act + s.activityExercises,
      concepts: a.concepts + s.concepts,
    }),
    { lessons: 0, ex: 0, cp: 0, act: 0, concepts: 0 },
  );
  console.log(`Unidades publicadas: ${units.length}/${CURRICULUM.length}`);
  console.log(`Lições: ${total.lessons} · exercícios de lição: ${total.ex} · checkpoint: ${total.cp} · atividades: ${total.act} · conceitos: ${total.concepts}`);
  for (const s of stats) {
    console.log(`  ${s.unit}: ${s.lessons} lições, ${s.lessonExercises} ex., ${s.concepts} conceitos`);
  }
  if (missing.length) console.log(`\nSem conteúdo (${missing.length}): ${missing.map((m) => m.id).join(", ")}`);

  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");
  for (const i of [...errors, ...warns]) console.log(`${i.level === "error" ? "ERRO " : "AVISO"} [${i.unit}] ${i.where}: ${i.message}`);
  console.log(`\n${errors.length} erro(s), ${warns.length} aviso(s).`);
  if (errors.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
