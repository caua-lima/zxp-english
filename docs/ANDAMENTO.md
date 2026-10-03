# ZXP ENGLISH — Andamento

> Arquivo de continuidade. Atualizado a cada etapa. Se a sessão for interrompida, comece por aqui.

Última atualização: 2026-10-03

## Etapas

| # | Etapa | Estado |
|---|-------|--------|
| 1 | Inspeção do repositório e plano | ✅ concluída |
| 2 | Modelo de conteúdo e mapa curricular | ✅ concluída |
| 3 | Fluxo completo com uma unidade de referência (A1·U1) | ⏳ conteúdo ✅ · interface ⬜ |
| 4 | Persistência, revisão espaçada e progressão | ⏳ motor e persistência ✅ (116 testes) · telas ⬜ |
| 5 | Produção e revisão das 32 unidades | ⬜ pendente |
| 6 | Refinamento visual e acessibilidade | ⬜ pendente |
| 7 | Testes, correções e documentação de deploy | ⬜ pendente |

## Concluído

- Repositório local criado em `zxp-english/` (o diretório estava vazio). **Atenção:** a pasta de usuário `C:\Users\caual` é um repositório Git em si; o projeto tem `.git` próprio para não misturar commits.
- Remote `origin` → `https://github.com/caua-lima/zxp-english.git` (vazio no início).
- Scaffold: Next.js 16.3.8 (App Router), React 19, TypeScript estrito, Tailwind 4, ESLint 9.
- Dependências: zod 4, lucide-react, vitest 5, fake-indexeddb, @playwright/test, tsx.

## Pendências

Tudo o que não está marcado como concluído acima. Detalhes serão adicionados conforme as etapas avançam.

## Próximos passos

1. Esquema Zod de conteúdo + construtores + mapa curricular de 32 unidades.
2. Motor (correção, SRS, progressão, XP, datas) com testes.
3. Persistência IndexedDB + backup.
4. Interface + unidade de referência.

## Vulnerabilidades conhecidas em dependências

- `npm audit` reporta 5 avisos *high* na cadeia `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. São dependências **somente de desenvolvimento** (lint); não entram no bundle de produção. A correção sugerida (`--force`) faria downgrade para Next 14, o que é inaceitável. Acompanhar atualização upstream.
