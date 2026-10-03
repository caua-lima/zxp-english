/**
 * Repositório em memória: usado em testes e como último recurso quando o navegador
 * não permite IndexedDB (alguns modos privados). Nesse caso a interface avisa que o
 * progresso NÃO será salvo.
 */
import type { ProgressState } from "@/engine/model";
import {
  applyOpsToRows,
  emptyRows,
  rowsToState,
  stateToOps,
  StorageError,
  type LoadResult,
  type ProgressRepository,
  type Rows,
  type WriteOp,
} from "./repository";

export class MemoryRepository implements ProgressRepository {
  readonly kind = "memory" as const;
  private rows: Rows = emptyRows();
  /** Para testes: força falha na próxima escrita. */
  failNextWrite: StorageError | null = null;

  async load(): Promise<LoadResult> {
    return rowsToState(this.rows, new Date().toISOString());
  }

  async apply(ops: WriteOp[]): Promise<void> {
    this.maybeFail();
    // Atomicidade: trabalha numa cópia e só troca no final.
    const next = emptyRows();
    for (const k of Object.keys(this.rows) as (keyof Rows)[]) next[k] = new Map(this.rows[k]);
    applyOpsToRows(next, ops);
    this.rows = next;
  }

  async replaceAll(state: ProgressState): Promise<void> {
    this.maybeFail();
    const next = emptyRows();
    applyOpsToRows(next, stateToOps(state));
    this.rows = next;
  }

  async wipe(): Promise<void> {
    this.rows = emptyRows();
  }

  close(): void {}

  private maybeFail(): void {
    if (this.failNextWrite) {
      const e = this.failNextWrite;
      this.failNextWrite = null;
      throw e;
    }
  }
}
