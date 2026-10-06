# ZXP ENGLISH

Aplicativo web pessoal para aprender inglês do A1 ao B2, com interface e explicações em português (cada vez mais inglês ao longo da trilha). Os dados ficam no navegador: **sem login, sem pagamento, sem chave de IA, sem servidor de dados**. O progresso fica no seu aparelho (IndexedDB) e pode ser exportado em JSON.

## O que tem

- **4 etapas × 8 unidades = 32 unidades**, 128 lições, 32 checkpoints, 1.265 exercícios e 340 conceitos com IDs estáveis (ver [docs/CURRICULO.md](docs/CURRICULO.md)).
- Motor de exercícios reutilizável: múltipla escolha, completar, ordenar, associar, ouvir, ditado, corrigir, digitar, diálogo com escolhas, escrita e fala.
- Correção cuidadosa (não aceita negação, tempo ou apóstrofo essencial errados) e respostas abertas **autoavaliadas**, sem nota falsa.
- Revisão espaçada (1, 3, 7, 14 e 30 dias), caderno de erros, plano do dia, XP, metas, sequência, conquistas e revisão semanal.
- Áudio pela voz do navegador (normal e lenta) e gravação opcional; o microfone só é pedido sob demanda.
- Funciona sem internet depois da primeira visita (service worker): as telas e as unidades que você já abriu ficam em cache. Uma unidade nunca aberta precisa de conexão uma vez.
- Backup/restauração em JSON com validação e migração de versão.
- Diagnóstico opcional que **não** declara nível CEFR.

## Rodar localmente

Requisitos: Node 20+ e npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Verificações:

```bash
npm run typecheck  # next typegen + tsc
npm run lint
npm test           # Vitest: unidade + auditoria de conteúdo
npm run content:audit
npm run test:e2e   # build de produção + Playwright (perfil de celular)
```

## Publicar na Vercel

O site é totalmente estático (sem variáveis de ambiente). Passo a passo em [docs/DEPLOY.md](docs/DEPLOY.md). A publicação **não é automática**: nada é enviado à Vercel sem você importar o repositório.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [docs/CURRICULO.md](docs/CURRICULO.md) | As 32 unidades, estrutura de lição, regras editoriais |
| [docs/REGRAS.md](docs/REGRAS.md) | Progressão, revisão espaçada, XP e correção |
| [docs/BACKUP.md](docs/BACKUP.md) | Exportar, importar, migrar |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Vercel |
| [docs/IA-EXTENSAO.md](docs/IA-EXTENSAO.md) | Extensão opcional com IA (não implementada) |
| [docs/VERIFICACAO.md](docs/VERIFICACAO.md) | O que foi verificado e como |
| [docs/REVISAO-EDITORIAL.md](docs/REVISAO-EDITORIAL.md) | Revisão do conteúdo e seus limites |
| [docs/LIMITACOES.md](docs/LIMITACOES.md) | Limitações reais |
| [docs/ANDAMENTO.md](docs/ANDAMENTO.md) | Estado do projeto |

## Aviso honesto

Concluir unidades mede **progresso no curso**, não prova nível de proficiência. Para isso, use conversas reais e testes externos.
