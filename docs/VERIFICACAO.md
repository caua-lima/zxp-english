# Verificação

Resultados da última execução completa (com as 32 unidades):

| Verificação | Comando | Resultado |
|---|---|---|
| Tipos (TS estrito) | `npm run typecheck` | ✅ sem erros |
| Lint | `npm run lint` | ✅ 0 erros, 1 aviso (`combos` não usado em `a1-u02.ts`) |
| Unidade + conteúdo | `npm test` | ✅ 236 testes, 8 arquivos |
| Auditoria de conteúdo | `npm run content:audit` | ✅ 0 erros, 9 avisos de estilo (falas-modelo longas; A1-U03, B2-U07 sem diálogo nas lições) |
| Build de produção | `next build` (dentro de `test:e2e`) | ✅ totalmente estático |
| Ponta a ponta | `npm run test:e2e` | ✅ 37 testes (perfil de celular), cobrindo lição, checkpoint, revisão, backup, áudio, layout, fuso horário, tema escuro e movimento reduzido |

## O que a auditoria cobre
Schema, IDs únicos, cobertura de conceitos, regras de checkpoint (sem questão repetida), contagem de palavras dos modelos, caracteres do português em campos de inglês, distratores válidos e estrutura de atividades. Ver [CURRICULO.md](CURRICULO.md).

## O que NÃO foi verificado
- **Revisão humana especializada**: não houve. Ver [REVISAO-EDITORIAL.md](REVISAO-EDITORIAL.md).
- Qualidade da voz sintética em cada navegador/sistema.
- Reconhecimento de fala (não implementado).
- Navegadores além do Chromium (Playwright rodou em Chromium com perfil de celular).
- Leitores de tela reais (houve verificação de foco, teclado e contraste; não de NVDA/VoiceOver).
- Os 5 avisos "high" do `npm audit` estão na cadeia de desenvolvimento do ESLint, não no app publicado.
