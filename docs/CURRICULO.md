# Currículo

32 unidades em 4 etapas. Cada unidade tem 4 lições, um checkpoint (duas versões A/B de 10 questões, mais uma produção) e 5 atividades: leitura, escuta, escrita, fala e missão prática (com tarefa fora do app). O conteúdo vive em `src/content/units/*.ts`, separado da interface, validado pelo schema Zod e por um auditor (`npm run content:audit`).

Totais: 128 lições, 32 checkpoints, 1.265 exercícios, 340 conceitos.

## Etapas e unidades

### A1 — Primeiros passos
1. Olá! Primeiros contatos · 2. Quem sou eu · 3. Família e pessoas · 4. Minha rotina · 5. Horas, datas e compromissos · 6. Casa e lugares · 7. Comida e compras · 8. O que eu sei fazer.

### A2 — Situações do dia a dia
1. Agora e sempre · 2. Ontem foi assim · 3. Viagens e imprevistos · 4. Comparar e recomendar · 5. Quanto? Quantos? · 6. Planos e intenções · 7. Saúde e conselhos · 8. Convites e experiências.

### B1 — Independência
1. Narrativas · 2. Present perfect × passado simples · 3. Futuro, might/probably e primeira condicional · 4. Trabalho e entrevistas (orações relativas) · 5. Opiniões, although/however · 6. Segunda condicional, wish · 7. Voz passiva, discurso indireto, say × tell · 8. Conversas mais longas e mal-entendidos.

### B2 — Autonomia
1. Argumentar · 2. Past perfect e narrativas complexas · 3. Terceira e mista, should have, regret · 4. Dedução e atenuação (hedging) · 5. Registro, pedidos delicados, negociação · 6. Reuniões e entrevistas (STAR) · 7. Leitura crítica, inferência, paráfrase e resumo · 8. Projeto final, debate, autorrevisão e plano de estudo.

A fonte de verdade dos títulos, objetivos ("consigo…"), pré-requisitos e focos é `src/content/curriculum.ts`.

## Estrutura de uma lição

Objetivo → contexto (diálogo ou texto) → explicação (resumo, detalhes, exemplos, contrastes de erro típico de brasileiros) → prática guiada → independente → aplicação (produção) → resumo. Entre 6 e 12 exercícios, ao menos 3 tipos e ao menos 1 de produção.

## Regras editoriais verificadas automaticamente

- IDs estáveis (`unidade-lição-exercício`); sem placeholders.
- Cada conceito aparece em ≥ 2 exercícios revisáveis, com ao menos 1 de produção (exceto "sound").
- Checkpoints: só itens corrigíveis, ≥ 4 tipos, ≥ 3 de produção, conceitos de todas as lições e **nenhuma questão repetida** de lição nem entre A e B.
- Cada unidade: leitura com contexto, escuta com ≥ 3 itens de ouvir/ditado, escrita, fala e missão com diálogo e tarefa externa.
- Textos-modelo de escrita com pelo menos o mínimo de palavras pedido; distratores de múltipla escolha que não sejam alternativas válidas.

Esses controles encontram erros estruturais. Eles **não** substituem revisão humana de especialista (ver [REVISAO-EDITORIAL.md](REVISAO-EDITORIAL.md)).
