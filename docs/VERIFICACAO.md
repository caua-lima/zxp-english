# Verificação

Resultados da última execução completa (com as 32 unidades):

| Verificação | Comando | Resultado |
|---|---|---|
| Tipos (TS estrito) | `npm run typecheck` | ✅ sem erros |
| Lint | `npm run lint` | ✅ 0 erros, 0 avisos |
| Unidade + conteúdo | `npm test` | ✅ 244 testes, 10 arquivos (inclui IDs estáveis e "o corretor concorda com todo o gabarito") |
| Auditoria de conteúdo | `npm run content:audit` | ✅ 0 erros, 7 avisos de estilo (falas-modelo longas) |
| Build de produção | `next build` (dentro de `test:e2e`) | ✅ totalmente estático |
| Ponta a ponta | `npm run test:e2e` | ✅ 44 testes (celular emulado): lição, checkpoint, revisão, backup, áudio, layout, fuso, tema, movimento reduzido, **acessibilidade (axe)** e **uso offline** |
| Currículo completo pela interface | `ZXP_FULL=1 npx playwright test curriculo-completo` | ✅ 32/32 unidades: todas as lições, checkpoints e atividades concluídas na UI real, sem rolagem horizontal (≈ 9 min) |

## O que a auditoria cobre
Schema, IDs únicos, cobertura de conceitos, regras de checkpoint (sem questão repetida), contagem de palavras dos modelos, caracteres do português em campos de inglês, distratores válidos e estrutura de atividades. Ver [CURRICULO.md](CURRICULO.md).

## O que NÃO foi verificado
- **Revisão humana especializada**: não houve. Ver [REVISAO-EDITORIAL.md](REVISAO-EDITORIAL.md).
- Qualidade da voz sintética em cada navegador/sistema.
- Reconhecimento de fala (não implementado).
- Navegadores além do Chromium (Playwright rodou em Chromium com perfil de celular).
- Leitores de tela reais (houve verificação de foco, teclado e contraste; não de NVDA/VoiceOver).
- Varredura axe (WCAG 2.x A/AA) cobre as telas principais, a lição e o feedback de erro/acerto, nos dois temas; não substitui leitor de tela real.
- Os 5 avisos "high" do `npm audit` estão na cadeia de desenvolvimento do ESLint, não no app publicado.
