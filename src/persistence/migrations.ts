/**
 * Migrações do formato de dados.
 *
 * `MIGRATIONS[n]` converte dados do formato `n` para `n + 1`. Ao mudar o modelo
 * em `engine/model.ts`: incremente `SCHEMA_VERSION`, adicione aqui a migração
 * `n → n+1` e um teste. Hoje existe só o formato 1, então a tabela está vazia
 * (o mecanismo é testado com tabelas de exemplo em tests/unit/persistence.test.ts).
 */
export type MigrationTable = Record<number, (data: unknown) => unknown>;

export const MIGRATIONS: MigrationTable = {};

export function migrate(data: unknown, from: number, to: number, table: MigrationTable = MIGRATIONS): unknown {
  let current = data;
  for (let v = from; v < to; v++) {
    const step = table[v];
    if (!step) throw new Error(`não há migração do formato ${v} para ${v + 1}`);
    current = step(current);
  }
  return current;
}
