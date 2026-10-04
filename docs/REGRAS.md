# Regras de progressão, revisão e correção

Valores padrão em `src/engine/defaults.ts`. São decisões de produto (heurísticas iniciais), configuráveis em Ajustes, e não fórmulas científicas universais.

## Progressão
- Lições são liberadas em ordem dentro da unidade; o checkpoint depende das 4 lições.
- Checkpoint: **80%** de acertos *independentes* (sem pista nem "mostrar resposta") para avançar; ajustável. Há duas versões (A/B) com perguntas diferentes para a nova tentativa.
- Unidades têm pré-requisitos; é possível começar de outra unidade (início manual) sem falsificar o histórico: as anteriores ficam como "não feitas".
- O diagnóstico opcional **sugere** um ponto de partida; não declara nível CEFR.

## Revisão espaçada
- Intervalos: 1, 3, 7, 14 e 30 dias. Acerto sobe um nível; erro volta ao início.
- Acerto com ajuda (pista) não promove o item; é reagendado para o dia seguinte.
- Há modo de **reconhecimento** e de **produção** por conceito; a produção só entra se existir exercício de produção.
- Limite diário de revisões por tempo de sessão (10/20/30 min → 10/20/30 itens). O excedente **nunca é apagado**: fica pendente para o próximo dia.
- Erros viram entradas no caderno de erros, com a explicação, e podem ser praticados de forma direcionada.

## XP, meta e sequência
- XP mede atividade, não proficiência. Cada evento tem ID determinístico e só rende XP uma vez; reabrir uma lição não gera XP extra.
- Meta diária de XP: 40/80/120 (10/20/30 min). Um dia só conta como estudo com ≥ 10 XP.
- O "dia" usa o fuso horário configurado. Sem corações nem perda de conteúdo; há plano de retorno após dias sem estudar.

## Correção de respostas
- Normaliza maiúsculas, espaços e pontuação; expande contrações; aceita variantes britânicas válidas.
- **Nunca** remove negação, tempo verbal ou apóstrofo essencial. A tolerância a erros de digitação é restrita e nunca muda negação, tempo verbal ou palavra essencial.
- Armadilhas conhecidas (por exemplo, "Yes, I'm" no lugar de "Yes, I am") têm prioridade literal e geram explicação específica.
- Respostas abertas (escrever/falar) são **autoavaliadas** com lista de critérios: não há nota inventada.
- Atividades de escuta adaptadas a texto não contam como evidência de escuta.
