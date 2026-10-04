# ZXP ENGLISH — Andamento

> Arquivo de continuidade. Atualizado a cada etapa. Se a sessão for interrompida, comece por aqui.

Última atualização: 2026-10-04

## Etapas

| # | Etapa | Estado |
|---|-------|--------|
| 1 | Inspeção do repositório e plano | ✅ concluída |
| 2 | Modelo de conteúdo e mapa curricular | ✅ concluída |
| 3 | Fluxo completo com uma unidade de referência (A1·U1) | ✅ concluída |
| 4 | Persistência, revisão espaçada e progressão | ✅ concluída |
| 5 | Produção e revisão das 32 unidades | ⏳ 1 de 32 publicadas |
| 6 | Refinamento visual e acessibilidade | ⏳ base pronta (AA verificado, teclado, movimento reduzido) |
| 7 | Testes, correções e documentação de deploy | ⏳ testes ✅ · documentação ⬜ |

## Concluído

- Repositório local em `zxp-english/` com `.git` próprio. **Atenção:** `C:\Users\caual` é um repositório Git em si; sempre conferir `git rev-parse --show-toplevel`.
- Remote `origin` → `https://github.com/caua-lima/zxp-english.git`, branch `main`.
- Stack: Next.js 16.3.8 (App Router), React 19, TypeScript estrito, Tailwind 4, Zod 4, Vitest 5, Playwright 1.63.
- **Conteúdo** (`src/content`): schema Zod, construtores (DSL), mapa curricular das 32 unidades, auditor, diagnóstico (22 perguntas), unidade A1·U1 completa.
- **Motor** (`src/engine`): correção, revisão espaçada, sessão, progressão, XP/sequência, plano diário, diagnóstico, estatísticas, conquistas.
- **Persistência** (`src/persistence`): IndexedDB atômico, fallback em memória, backup JSON, migrações.
- **Estado** (`src/state`): ações puras e idempotentes, `ProgressStore` com fila e recuperação de falha.
- **Interface** (`src/components`, `src/app`): 11 telas pedidas + diagnóstico e menu; executor de sessão para lição, checkpoint, atividades, revisão e caderno de erros.
- **Testes**: 234 de unidade/conteúdo (Vitest) e 37 de ponta a ponta (Playwright, build de produção, perfil de celular).

## Como verificar

```bash
npm run typecheck      # next typegen + tsc
npm run lint
ZXP_ALLOW_PARTIAL=1 npm test   # enquanto faltarem unidades; a versão final roda sem a variável
npm run content:audit
npm run test:e2e       # faz o build e roda o Playwright
```

## Pendências

1. **Conteúdo: 31 unidades** (a1-u02 … b2-u08). Cada uma segue o padrão de `src/content/units/a1-u01.ts` e precisa passar em `npm run content:audit`. Depois de escrever uma unidade, registrá-la em `LOADERS` (`src/content/registry.ts`).
2. Regras do auditor a respeitar ao escrever: cada conceito precisa de ≥ 2 exercícios corrigidos em lições/atividades, sendo ≥ 1 de produção (lacuna, ditado, correção ou resposta digitada); checkpoint com versões A e B de 10 itens, sem repetir perguntas das lições; cada lição com 6 a 12 exercícios, 3 fases e ≥ 3 tipos.
3. Documentação: `README.md`, `docs/CURRICULO.md`, `docs/REGRAS.md`, `docs/BACKUP.md`, `docs/DEPLOY.md`, `docs/IA-EXTENSAO.md`, `docs/REVISAO-EDITORIAL.md`, `docs/VERIFICACAO.md`, `docs/DECISOES.md`.
4. Ao terminar o conteúdo: rodar `npm test` **sem** `ZXP_ALLOW_PARTIAL`, gerar o instantâneo de IDs estáveis e registrar o resultado final das verificações.

## Problemas conhecidos

- `npm audit` reporta 5 avisos *high* na cadeia `eslint-config-next → … → braces`. São dependências **só de desenvolvimento** (lint), fora do bundle de produção. A correção automática faria downgrade para o Next 14; aguardar atualização upstream.
- A ferramenta de preview do ambiente de desenvolvimento desta sessão sobe o servidor de outro projeto; a verificação visual foi feita por capturas do Playwright (`ZXP_SHOTS=1 npx playwright test tests/e2e/smoke.spec.ts`).
- O Chromium usado nos testes não tem síntese de voz: os testes simulam a API para cobrir o caminho "com áudio" e usam a ausência real para cobrir o caminho "sem áudio". A qualidade real da voz depende do aparelho do usuário e não foi verificada.
