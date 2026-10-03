/**
 * Repositório IndexedDB. Uma transação cobre todas as lojas afetadas, então
 * `apply` e `replaceAll` são atômicos: se algo falhar, a transação é abortada e
 * os dados anteriores permanecem intactos.
 */
import type { ProgressState } from "@/engine/model";
import {
  emptyRows,
  rowsToState,
  StorageError,
  stateToOps,
  STORES,
  type LoadResult,
  type ProgressRepository,
  type StoreName,
  type WriteOp,
} from "./repository";

export const DB_NAME = "zxp-english";
export const DB_VERSION = 1;

function toStorageError(e: unknown, action: string): StorageError {
  if (e instanceof StorageError) return e;
  const name = (e as { name?: string })?.name;
  if (name === "QuotaExceededError") {
    return new StorageError(`Sem espaço para salvar (${action}). Libere espaço no navegador e exporte um backup.`, "quota", e);
  }
  if (name === "SecurityError" || name === "InvalidStateError") {
    return new StorageError("O navegador bloqueou o armazenamento local (modo privado ou permissões).", "unavailable", e);
  }
  return new StorageError(`Não foi possível ${action} seu progresso neste navegador.`, "failed", e);
}

function req<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function done(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error ?? new DOMException("Transação abortada", "AbortError"));
  });
}

export function idbAvailable(factory: IDBFactory | undefined = globalThis.indexedDB): boolean {
  return typeof factory !== "undefined" && factory !== null;
}

export class IdbRepository implements ProgressRepository {
  readonly kind = "indexeddb" as const;
  private db: IDBDatabase | null = null;

  constructor(
    private readonly factory: IDBFactory = globalThis.indexedDB,
    private readonly name: string = DB_NAME,
  ) {}

  private open(): Promise<IDBDatabase> {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      let request: IDBOpenDBRequest;
      try {
        request = this.factory.open(this.name, DB_VERSION);
      } catch (e) {
        reject(toStorageError(e, "abrir o armazenamento"));
        return;
      }
      request.onupgradeneeded = () => {
        const db = request.result;
        for (const s of STORES) if (!db.objectStoreNames.contains(s)) db.createObjectStore(s);
      };
      request.onblocked = () => reject(new StorageError("Feche as outras abas do ZXP ENGLISH e tente de novo.", "blocked"));
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => {
          db.close();
          this.db = null;
        };
        this.db = db;
        resolve(db);
      };
      request.onerror = () => reject(toStorageError(request.error, "abrir o armazenamento"));
    });
  }

  async load(): Promise<LoadResult> {
    try {
      const db = await this.open();
      const tx = db.transaction([...STORES], "readonly");
      const rows = emptyRows();
      await Promise.all(
        STORES.map(async (s) => {
          const store = tx.objectStore(s);
          const [keys, values] = await Promise.all([req(store.getAllKeys()), req(store.getAll())]);
          keys.forEach((k, i) => rows[s].set(String(k), values[i]));
        }),
      );
      return rowsToState(rows, new Date().toISOString());
    } catch (e) {
      throw toStorageError(e, "ler");
    }
  }

  /** Executa escritas numa única transação; qualquer erro aborta TUDO. */
  private async write(stores: StoreName[], body: (tx: IDBTransaction) => void, action: string): Promise<void> {
    try {
      const db = await this.open();
      const tx = db.transaction(stores, "readwrite");
      const finished = done(tx);
      try {
        body(tx);
      } catch (e) {
        try {
          tx.abort();
        } catch {
          /* já finalizada */
        }
        await finished.catch(() => undefined);
        throw e;
      }
      await finished;
    } catch (e) {
      throw toStorageError(e, action);
    }
  }

  async apply(ops: WriteOp[]): Promise<void> {
    if (ops.length === 0) return;
    const touched = [...new Set(ops.map((o) => o.store))] as StoreName[];
    await this.write(
      touched,
      (tx) => {
        for (const op of ops) {
          const store = tx.objectStore(op.store);
          if ("delete" in op) store.delete(op.key);
          else store.put(op.value, op.key);
        }
      },
      "salvar",
    );
  }

  async replaceAll(state: ProgressState): Promise<void> {
    await this.write(
      [...STORES],
      (tx) => {
        for (const s of STORES) tx.objectStore(s).clear();
        for (const op of stateToOps(state)) {
          if (!("delete" in op)) tx.objectStore(op.store).put(op.value, op.key);
        }
      },
      "restaurar",
    );
  }

  async wipe(): Promise<void> {
    await this.write([...STORES], (tx) => { for (const s of STORES) tx.objectStore(s).clear(); }, "apagar");
  }

  close(): void {
    this.db?.close();
    this.db = null;
  }
}

/** Escolhe a melhor implementação disponível. */
export async function createRepository(): Promise<ProgressRepository> {
  const { MemoryRepository } = await import("./memory");
  if (!idbAvailable()) return new MemoryRepository();
  const repo = new IdbRepository();
  try {
    await repo.load(); // testa abrir de verdade
    return repo;
  } catch {
    return new MemoryRepository();
  }
}
