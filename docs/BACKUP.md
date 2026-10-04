# Backup e restauração

Todo o progresso fica no **IndexedDB do seu navegador**, neste aparelho. Limpar os dados do site, trocar de navegador ou aparelho apaga/isola o progresso. Faça backup.

## Exportar
Ajustes → Backup → **Exportar**. Gera um arquivo JSON com versão do esquema, data e todo o progresso. Nada é enviado para servidor algum.

## Importar
Ajustes → Backup → **Importar**. O arquivo é validado (Zod) **antes** de qualquer mudança:
- arquivo inválido ou corrompido → mensagem de erro e **nada é alterado**;
- versão antiga → migrada automaticamente (`src/persistence/migrations.ts`);
- versão mais nova que o app → recusada com aviso;
- substituir o progresso atual exige **confirmação explícita**.

## Falha de armazenamento
Se o navegador bloquear o IndexedDB (modo privado, cota), o app avisa e continua em memória, sugerindo exportar o backup antes de fechar a aba.

## Desenvolvedores
Ao mudar o formato dos dados: incremente `SCHEMA_VERSION` em `src/engine/model.ts`, adicione a migração em `migrations.ts` e um teste em `tests/unit`.
