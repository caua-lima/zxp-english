# ZXP ENGLISH — Andamento

> Arquivo de continuidade. Se a sessão for interrompida, comece por aqui.

Última atualização: 2026-10-04

## Etapas

| # | Etapa | Estado |
|---|-------|--------|
| 1 | Inspeção do repositório e plano | ✅ concluída |
| 2 | Modelo de conteúdo e mapa curricular | ✅ concluída |
| 3 | Fluxo completo com unidade de referência (A1·U1) | ✅ concluída |
| 4 | Persistência, revisão espaçada e progressão | ✅ concluída |
| 5 | Produção das 32 unidades | ✅ 32 de 32 escritas e auditadas (0 erros) |
| 6 | Refinamento visual e acessibilidade | ✅ base (AA, teclado, movimento reduzido) · leitor de tela real não testado |
| 7 | Testes, correções e documentação | ✅ testes e documentação · ⬜ revisão humana do conteúdo |

## Números

32 unidades · 128 lições · 32 checkpoints · 1.265 exercícios · 340 conceitos · ~2.980 IDs estáveis.

## Verificação (última execução)

- `npm run typecheck` ✅ · `npm run lint` ✅ (1 aviso) · `npm test` ✅ 238 testes · `npm run content:audit` ✅ 0 erros, 9 avisos de estilo · `npm run test:e2e` ✅ 37 testes (build de produção incluído).

## Pendências reais

1. **Revisão humana especializada do conteúdo** — não feita; ver `REVISAO-EDITORIAL.md`.
2. Publicar na Vercel (passo manual; ver `DEPLOY.md`).
3. Testar com aprendizes reais, em outros navegadores e com leitor de tela.
4. Opcional: extensão de IA (`IA-EXTENSAO.md`), sincronização entre aparelhos, reconhecimento de fala.

## Regras de trabalho

- Sempre conferir `git rev-parse --show-toplevel` (`C:\Users\caual` é um repositório Git em si).
- Após alterar `src/content/units`, rodar `node scripts/sync-registry.mjs`, `npm run content:audit` e `npm test`.
- Se um ID precisar mudar, regerar `tests/content/ids.snapshot.json` e migrar os dados salvos.
- Um commit por alteração coerente, seguido de `git push origin main`.
