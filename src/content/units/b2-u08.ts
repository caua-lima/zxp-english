/** B2 · Unidade 8 — Projeto final: planejar, debater, revisar e continuar aprendendo sozinho. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "My plan for the next six months: I will study thirty minutes a day, and I will keep a notebook of mistakes. Every Sunday I will review it. If I miss a day, I will not give up; I will simply carry on the next day. By December I would like to hold a ten-minute conversation without a script. To check my progress, I will record myself once a month and compare the recordings.";

export default defineUnit({
  id: "b2-u08",

  concepts: [
    concept("plan-structure", "pattern", "First, I'll … Then … By December, I'd like to …", "Primeiro, vou … Depois … Até dezembro, gostaria de …", "l1", ["By June, I'd like to read a book in English.", "Até junho, gostaria de ler um livro em inglês."], { note: "Um plano tem prazo, ação e forma de checar." }),
    concept("set-goal", "phrase", "set a goal / track progress / keep a routine", "estabelecer uma meta / acompanhar o progresso / manter uma rotina", "l1", ["I set a goal and track my progress every week.", "Estabeleço uma meta e acompanho meu progresso toda semana."], { tags: ["collocation"], note: "Colocações de planejamento." }),
    concept("self-edit", "phrase", "proofread / revise / double-check", "revisar / rever / conferir de novo", "l2", ["I always proofread my emails before sending.", "Eu sempre reviso meus e-mails antes de enviar."], { note: "proofread = ler para achar erros; revise = melhorar o texto." }),
    concept("common-errors", "pattern", "I tend to make mistakes with …", "Costumo errar em …", "l2", ["I tend to forget the -s in the third person.", "Costumo esquecer o -s na terceira pessoa."], { note: "Autoconhecimento: conheça seus erros típicos." }),
    concept("debate-open", "phrase", "I'd like to start by saying … / My position is …", "Gostaria de começar dizendo … / Minha posição é …", "l3", ["My position is that homework should be optional.", "Minha posição é que o dever de casa deveria ser opcional."], { note: "Abertura de debate." }),
    concept("rebut", "phrase", "I see your point, but … / That's a fair point; however …", "Entendo seu ponto, mas … / É um bom ponto; no entanto …", "l3", ["That's a fair point; however, the cost is too high.", "É um bom ponto; no entanto, o custo é alto demais."], { note: "Réplica educada em debates." }),
    concept("debate-close", "phrase", "In conclusion, … / To sum up, …", "Em conclusão, … / Em resumo, …", "l3", ["In conclusion, the benefits outweigh the risks.", "Em conclusão, os benefícios superam os riscos."]),
    concept("keep-learning", "phrase", "keep up with / get used to / look up", "acompanhar / acostumar-se / procurar (palavra)", "l4", ["I look up new words and review them every week.", "Procuro palavras novas e reviso toda semana."], { tags: ["phrasal-verb"], note: "Phrasal verbs úteis para falar de estudo." }),
    concept("goal-reflection", "pattern", "When I started, I could barely …; now I can …", "Quando comecei, eu mal conseguia …; agora consigo …", "l4", ["When I started, I could barely order food; now I can talk for ten minutes.", "Quando comecei, mal conseguia pedir comida; agora consigo conversar por dez minutos."], { note: "Reflexão sobre progresso." }),
  ],

  lessons: [
    lesson("l1", {
      title: "Planejar seu estudo",
      objective: "Você vai conseguir montar e explicar um plano de estudo com meta, rotina e forma de checar o progresso.",
      minutes: 10,
      context: { kind: "text", title: "My study plan", lines: [
        { en: "My goal is to hold a ten-minute conversation in English without a script by December.", pt: "Minha meta é manter uma conversa de dez minutos em inglês sem roteiro até dezembro." },
        { en: "First, I'll study thirty minutes every day. Then, I'll keep a notebook of mistakes and review it every Sunday.", pt: "Primeiro, vou estudar trinta minutos por dia. Depois, vou manter um caderno de erros e revisá-lo todo domingo." },
        { en: "To track my progress, I'll record myself once a month.", pt: "Para acompanhar meu progresso, vou me gravar uma vez por mês." },
      ] },
      explanation: {
        summary: "Um plano de estudo bom tem:\n1. **Meta com prazo:** *By December, I'd like to…*\n2. **Rotina:** *I'll study thirty minutes every day.*\n3. **Forma de checar:** *To track my progress, I'll…*\n\nColocações: **set a goal** (estabelecer uma meta), **track progress** (acompanhar o progresso), **keep a routine** (manter uma rotina).",
        details: "Metas vagas (*I want to improve*) não funcionam. Use verbos de ação e números: *I'll learn five new words a day.* Para um plano que depende de condição: *If I miss a day, I'll carry on the next day.* (primeira condicional). E lembre-se: a diferença entre *progresso do curso* e *proficiência comprovada* — só uma conversa real ou um teste externo mostra de verdade o que você consegue fazer.",
        examples: [
          { en: "I set a goal and track my progress every week.", pt: "Estabeleço uma meta e acompanho meu progresso toda semana." },
          { en: "By June, I'd like to read a whole book in English.", pt: "Até junho, gostaria de ler um livro inteiro em inglês." },
          { en: "If I miss a day, I'll catch up on the weekend.", pt: "Se eu perder um dia, compenso no fim de semana." },
        ],
        contrasts: [
          { wrong: "I want to improve my English a lot.", right: "By December, I'd like to hold a ten-minute conversation.", why: "Meta com prazo e medida." },
          { wrong: "I do a goal for this year.", right: "I set a goal for this year.", why: "Colocação: set a goal." },
        ],
      },
      guided: [
        mc("e1", "Which goal is the clearest?", ["By December, I'd like to hold a ten-minute conversation without a script.", "I want to improve.", "I'll study sometimes."], 0, "Meta com prazo e medida.", { c: ["plan-structure"] }),
        match("e2", "Match the collocation to its meaning.", [["set a goal", "estabelecer uma meta"], ["track progress", "acompanhar o progresso"], ["keep a routine", "manter uma rotina"], ["catch up", "compensar o atraso"]],
          "Colocações de planejamento.", { c: ["set-goal"], s: "vocabulary", pt: "Associe a colocação ao significado." }),
        cloze("e3", "To ___ my progress, I'll record myself once a month.", ["track", "check"], "Track progress.", { c: ["set-goal"] }),
      ],
      independent: [
        cloze("e4", "By June, I'd ___ to read a whole book in English.", ["like"], "I'd like to…", { c: ["plan-structure"] }),
        cloze("e5", "I ___ a goal and write it on my wall.", ["set"], "Set a goal.", { c: ["set-goal"], s: "vocabulary", t: [["do", "A colocação natural é set a goal."]] }),
        fix("e6", "I do a goal for this semester.", ["I set a goal for this semester"], "Set a goal.", { c: ["set-goal"], prompt: "Fix the collocation." }),
        dict("e7", "To track my progress, I'll record myself once a month.", "Forma de checar o progresso.", { c: ["set-goal"] }),
        order("e8", "Put the words in order: “Até dezembro, gostaria de conversar sem roteiro.”", "By December, I'd like to talk without a script.", "By + prazo, I'd like to…", { c: ["plan-structure"] }),
      ],
      application: [
        type("e9", "Say in English: “Se eu perder um dia, compenso no fim de semana.”", ["If I miss a day, I'll catch up on the weekend", "If I miss a day, I will catch up on the weekend", "If I miss a day I'll catch up on the weekend"], "Primeira condicional.", { c: ["plan-structure"] }),
        write("e10", "Write your own study plan (4 sentences): a goal with a deadline, a daily routine, what you'll do if you miss a day, and how you'll track progress.",
          { mode: "guided", frame: ["By …, I'd like to …", "Every day, I'll …", "If I miss a day, …", "To track my progress, …"], min: 32, check: ["Meta com prazo.", "Rotina concreta.", "Plano B com if.", "Forma de checar o progresso."], model: "By December, I'd like to hold a ten-minute conversation without a script. Every day, I'll study thirty minutes. If I miss a day, I'll catch up on the weekend. To track my progress, I'll record myself once a month.", c: ["plan-structure", "set-goal"] }),
      ],
      summary: { points: ["Meta com prazo e medida.", "Rotina concreta e plano B.", "set a goal; track progress."], concepts: ["plan-structure", "set-goal"] },
    }),

    lesson("l2", {
      title: "Revisar o próprio texto",
      objective: "Você vai conseguir identificar seus erros típicos e revisar um texto seu.",
      minutes: 10,
      context: { kind: "text", title: "Self-editing notes", lines: [
        { en: "I always proofread my emails before sending them.", pt: "Eu sempre reviso meus e-mails antes de enviar." },
        { en: "I tend to forget the -s in the third person, and I sometimes mix up 'make' and 'do'.", pt: "Costumo esquecer o -s na terceira pessoa e às vezes confundo 'make' e 'do'." },
        { en: "After the first draft, I revise the structure, then I double-check the verbs.", pt: "Depois do primeiro rascunho, reviso a estrutura e depois confiro de novo os verbos." },
      ] },
      explanation: {
        summary: "**Autoedição** em três passes:\n1. **Estrutura:** a tese está clara? Há ligação entre as partes?\n2. **Precisão:** verbos, concordância, preposições, artigos.\n3. **Polimento:** pontuação e ortografia (**proofread**).\n\nConheça seus erros típicos: **I tend to make mistakes with…** (costumo errar em…).",
        details: "*Proofread* = ler para achar erros. *Revise* = melhorar o conteúdo e a organização. Mantenha uma lista pessoal dos seus 5 erros mais frequentes (por exemplo: -s da 3ª pessoa, make/do, artigos, preposições, ordem de palavras) e confira cada um antes de enviar. É o equivalente, na escrita, do caderno de erros do app.",
        examples: [
          { en: "I tend to make mistakes with articles.", pt: "Costumo errar nos artigos." },
          { en: "Please double-check the dates before you send it.", pt: "Por favor, confira as datas de novo antes de enviar." },
          { en: "She revised the report twice.", pt: "Ela revisou o relatório duas vezes." },
        ],
        contrasts: [
          { wrong: "I revised the spelling mistakes only. (when the goal is to improve the structure)", right: "I revised the structure first, then I proofread.", why: "Primeiro conteúdo, depois detalhes." },
          { wrong: "She don't like it. (esquecer o -s)", right: "She doesn't like it.", why: "Terceira pessoa: doesn't." },
        ],
      },
      guided: [
        mc("e1", "You finished a draft. What should you check first?", ["Structure and clarity", "Commas", "The font"], 0, "Conteúdo antes dos detalhes.", { c: ["self-edit"] }),
        match("e2", "Match the action to its meaning.", [["proofread", "ler procurando erros"], ["revise", "melhorar a estrutura e o conteúdo"], ["double-check", "conferir de novo"], ["draft", "primeiro rascunho"]],
          "Verbos de autoedição.", { c: ["self-edit"], s: "vocabulary", pt: "Associe o verbo ao significado." }),
        cloze("e3", "I always ___ my emails before sending them.", ["proofread", "check", "review"], "Proofread = revisar erros.", { c: ["self-edit"] }),
      ],
      independent: [
        cloze("e4", "I ___ to make mistakes with articles.", ["tend"], "Tend to make mistakes.", { c: ["common-errors"] }),
        fix("e5", "She don't like long emails.", ["She doesn't like long emails", "She does not like long emails"], "Terceira pessoa: doesn't.", { c: ["common-errors"], prompt: "Fix the common mistake." }),
        fix("e6", "I did a mistake in the report.", ["I made a mistake in the report"], "Make a mistake.", { c: ["common-errors"], prompt: "Fix the collocation." }),
        dict("e7", "Please double-check the dates before you send it.", "Double-check.", { c: ["self-edit"] }),
        order("e8", "Put the words in order: “Costumo esquecer o -s na terceira pessoa.”", "I tend to forget the -s in the third person.", "I tend to forget…", { c: ["common-errors"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu sempre reviso meus textos antes de enviar.”", ["I always proofread my texts before sending them", "I always revise my texts before sending them", "I always proofread my writing before sending it", "I always check my texts before sending them"], "Proofread.", { c: ["self-edit"] }),
        fix("e10", "Yesterday I go to the office and I meeted my boss.", ["Yesterday I went to the office and I met my boss", "Yesterday I went to the office and met my boss"], "Passados irregulares: went, met.", { c: ["common-errors"], prompt: "Proofread and fix the verbs." }),
        write("e11", "List your three most common mistakes in English and, for each, write the corrected rule in a sentence.",
          { mode: "guided", frame: ["I tend to make mistakes with …", "Correct: …"], min: 25, check: ["Nomeei três erros reais.", "Escrevi a forma correta.", "Usei I tend to."], model: "I tend to forget the -s in the third person. Correct: she works. I tend to confuse make and do. Correct: make a decision, do homework. I tend to forget articles. Correct: I have a car.", c: ["common-errors"] }),
      ],
      summary: { points: ["Estrutura, precisão e polimento.", "proofread × revise.", "Lista pessoal de erros."], concepts: ["self-edit", "common-errors"] },
    }),

    lesson("l3", {
      title: "Debate: posição, réplica e conclusão",
      objective: "Você vai conseguir participar de um debate com turnos, réplicas e síntese.",
      minutes: 10,
      context: { kind: "dialogue", title: "Class debate", lines: [
        { who: "Ana", en: "My position is that schools should ban phones during classes.", pt: "Minha posição é que as escolas deveriam proibir celulares durante as aulas." },
        { who: "Bruno", en: "That's a fair point; however, phones can be useful for research.", pt: "É um bom ponto; no entanto, celulares podem ser úteis para pesquisa." },
        { who: "Ana", en: "I see your point, but a teacher can provide the same information.", pt: "Entendo seu ponto, mas um professor pode fornecer a mesma informação." },
        { who: "Moderador", en: "Thank you both. Ana, would you like to close?", pt: "Obrigado aos dois. Ana, quer encerrar?" },
        { who: "Ana", en: "In conclusion, a ban helps students focus.", pt: "Em conclusão, a proibição ajuda os alunos a se concentrar." },
      ] },
      explanation: {
        summary: "Um debate tem turnos:\n1. **Abertura:** *My position is that…* / *I'd like to start by saying…*\n2. **Réplica:** *I see your point, but…* / *That's a fair point; however,…*\n3. **Fechamento:** *In conclusion,…* / *To sum up,…*\n\nSeja firme na ideia e gentil com a pessoa.",
        details: "Reconhecer um ponto (*That's a fair point*) antes de contra-argumentar torna sua réplica mais forte. Evite: *You're wrong* e *That's stupid*. Para ganhar tempo: *That's an interesting question.* Para pedir a palavra: *May I respond to that?* Ouça com atenção para responder ao argumento do outro, não ao que você esperava ouvir.",
        examples: [
          { en: "I'd like to start by saying that this is a complex issue.", pt: "Gostaria de começar dizendo que este é um assunto complexo." },
          { en: "May I respond to that?", pt: "Posso responder a isso?" },
          { en: "In conclusion, both sides have valid points, but the evidence favors a limited ban.", pt: "Em conclusão, os dois lados têm pontos válidos, mas as evidências favorecem uma proibição limitada." },
        ],
        contrasts: [
          { wrong: "You're wrong and that's stupid.", right: "I see your point, but I disagree because of the cost.", why: "Críticas à ideia, não à pessoa." },
          { wrong: "In conclusion, there is another new reason.", right: "In conclusion, the benefits outweigh the risks.", why: "A conclusão resume, não abre argumento novo." },
        ],
      },
      guided: [
        mc("e1", "Your opponent makes a good point. Choose the best reply.", ["That's a fair point; however, the cost is too high.", "You're wrong.", "I don't care."], 0, "Reconheça, depois contraponha.", { c: ["rebut"], s: "interaction" }),
        match("e2", "Match the phrase to the stage of the debate.", [["My position is that…", "abertura"], ["I see your point, but…", "réplica"], ["May I respond to that?", "pedir a palavra"], ["In conclusion,…", "fechamento"]],
          "Turnos de um debate.", { c: ["debate-open", "rebut", "debate-close"], pt: "Associe a frase à etapa do debate." }),
        cloze("e3", "My ___ is that phones should be banned in class.", ["position"], "My position is that…", { c: ["debate-open"] }),
      ],
      independent: [
        cloze("e4", "That's a fair ___; however, the cost is too high.", ["point"], "That's a fair point.", { c: ["rebut"] }),
        cloze("e5", "In ___, the benefits outweigh the risks.", ["conclusion"], "In conclusion,…", { c: ["debate-close"] }),
        fix("e6", "You are wrong and it is stupid.", ["I see your point, but I disagree"], "Críticas à ideia, não à pessoa.", { c: ["rebut"], prompt: "Rewrite politely." }),
        dict("e7", "May I respond to that?", "Pedir a palavra.", { c: ["debate-open"] }),
        order("e8", "Put the words in order: “Minha posição é que o dever de casa deveria ser opcional.”", "My position is that homework should be optional.", "My position is that…", { c: ["debate-open"] }),
      ],
      application: [
        type("e9", "Reply politely: “Entendo seu ponto, mas discordo por causa do custo.”", ["I see your point, but I disagree because of the cost", "I see your point, but I disagree because of the price", "I see your point but I disagree because of the cost"], "Réplica educada.", { c: ["rebut"] }),
        dialog("e10", "A debate on remote work. You are in favor.", [
          { npc: ["Remote work reduces teamwork. How do you respond?", "O trabalho remoto reduz o trabalho em equipe. Como você responde?"], options: [
            ["That's a fair point; however, video calls and shared documents can keep teams connected.", true, "O moderador anota.", "Reconhece e contrapõe."],
            ["No. You are wrong.", false, "O debate esfria.", "Sem argumento."],
          ] },
          { npc: ["Please give your closing statement.", "Por favor, faça sua declaração final."], options: [
            ["In conclusion, remote work offers flexibility, and with good tools its risks can be managed.", true, "A plateia aplaude.", "Fechamento claro."],
            ["Finally, there is another reason: salaries.", false, "A conclusão abre argumento novo.", "A conclusão resume."],
          ] },
        ], "Debate: réplica e fechamento.", { c: ["rebut", "debate-close"] }),
      ],
      summary: { points: ["Abertura, réplica, fechamento.", "Reconheça antes de contrapor.", "Ideia firme, tom gentil."], concepts: ["debate-open", "rebut", "debate-close"] },
    }),

    lesson("l4", {
      title: "Continuar sozinho",
      objective: "Você vai conseguir descrever seu progresso e seu plano para continuar aprendendo depois do curso.",
      minutes: 9,
      context: { kind: "text", title: "Looking back and forward", lines: [
        { en: "When I started, I could barely order food. Now I can talk about my job for ten minutes.", pt: "Quando comecei, eu mal conseguia pedir comida. Agora consigo falar do meu trabalho por dez minutos." },
        { en: "I look up new words and review them every week. I try to keep up with the news in English.", pt: "Procuro palavras novas e reviso toda semana. Tento acompanhar as notícias em inglês." },
        { en: "I'm getting used to speaking without translating in my head.", pt: "Estou me acostumando a falar sem traduzir na cabeça." },
      ] },
      explanation: {
        summary: "Para falar de **progresso**:\n- **When I started, I could barely…; now I can…**\n\nPhrasal verbs de estudo:\n- **look up** (procurar uma palavra)\n- **keep up with** (acompanhar)\n- **get used to** + verbo-**ing** (acostumar-se)\n- **catch up** (compensar o atraso)",
        details: "Terminar o curso não é terminar o aprendizado. Para manter o nível: ouça e leia em inglês todo dia, fale com alguém ou grave a si mesmo, escreva e revise, e use a revisão espaçada para o vocabulário. E seja honesto: o app mostra seu avanço *no curso*, mas só testes externos e conversas reais mostram sua *proficiência* de fato.",
        examples: [
          { en: "I look up new words and add them to my notebook.", pt: "Procuro palavras novas e as anoto no meu caderno." },
          { en: "I'm getting used to reading in English every day.", pt: "Estou me acostumando a ler em inglês todos os dias." },
          { en: "It's hard to keep up with fast speakers.", pt: "É difícil acompanhar pessoas que falam rápido." },
        ],
        contrasts: [
          { wrong: "I'm used to speak English every day.", right: "I'm used to speaking English every day.", why: "Used to + verbo-ing (costume)." },
          { wrong: "I look up for new words.", right: "I look up new words.", why: "Look up já inclui a ideia de procurar." },
        ],
      },
      guided: [
        mc("e1", "Which sentence describes progress?", ["When I started, I could barely order food; now I can talk for ten minutes.", "I study English.", "I like English."], 0, "Antes e agora.", { c: ["goal-reflection"] }),
        match("e2", "Match the phrasal verb to its meaning.", [["look up", "procurar uma palavra"], ["keep up with", "acompanhar"], ["get used to", "acostumar-se"], ["catch up", "compensar o atraso"]],
          "Phrasal verbs de estudo.", { c: ["keep-learning"], s: "vocabulary", pt: "Associe o phrasal verb ao significado." }),
        cloze("e3", "I ___ up new words and review them every week.", ["look"], "Look up significa procurar uma palavra ou informação.", { c: ["keep-learning"] }),
      ],
      independent: [
        cloze("e4", "I'm getting used ___ speaking without translating.", ["to"], "Get used to + -ing.", { c: ["keep-learning"] }),
        cloze("e5", "When I started, I could ___ order food; now I can talk for ten minutes.", ["barely", "hardly"], "Barely = mal.", { c: ["goal-reflection"] }),
        fix("e6", "I'm used to study at night.", ["I'm used to studying at night"], "Used to + -ing.", { c: ["keep-learning"], prompt: "Fix the mistake." }),
        dict("e7", "I try to keep up with the news in English.", "Keep up with.", { c: ["keep-learning"] }),
        order("e8", "Put the words in order: “Procuro palavras novas toda semana.”", "I look up new words every week.", "Look up + objeto.", { c: ["keep-learning"], extra: ["for"] }),
      ],
      application: [
        write("e9", "Write a short reflection (about 50 words) about your English: where you started, where you are now, and what you will do to keep learning.",
          { mode: "free", min: 38, check: ["Contrastei antes e agora com could barely … now I can.", "Usei um phrasal verb de estudo.", "Disse o que vou fazer para continuar.", "Fui honesto sobre o que ainda falta."], model: "When I started, I could barely order food. Now I can understand simple videos. I still have trouble with fast speakers. To keep learning, I will look up new words, listen to podcasts every day and review my mistakes every Sunday.", c: ["goal-reflection", "keep-learning"] }),
        speak("e10", "Tell someone in 40 seconds how your English has changed and how you plan to continue.", ["When I started, I could barely order food. Now I can talk about my job. I'm getting used to speaking without translating. To keep up, I'll look up new words and practice with a friend every week."],
          { mode: "respond", check: ["Contrastei antes e agora.", "Usei um phrasal verb de estudo.", "Falei do plano para continuar."], c: ["goal-reflection", "keep-learning"] }),
      ],
      summary: { points: ["When I started, I could barely…; now I can…", "look up; keep up with; get used to + -ing.", "Curso ≠ proficiência comprovada."], concepts: ["goal-reflection", "keep-learning"] },
    }),
  ],

  checkpoint: {
    intro: "Final challenge: plan, edit, debate and reflect, with new topics, using everything you have learned.",
    a: [
      mc("q1", "Which is a clear goal?", ["By March, I'd like to give a five-minute presentation in English.", "I want to be better.", "Maybe study sometime."], 0, "Meta com prazo e medida.", { c: ["plan-structure"] }),
      cloze("q2", "To ___ my progress, I'll keep a notebook.", ["track"], "Track progress.", { c: ["set-goal"] }),
      cloze("q3", "I always ___ my reports before sending them.", ["proofread", "check", "review"], "Proofread.", { c: ["self-edit"] }),
      fix("q4", "She don't understand the rule.", ["She doesn't understand the rule", "She does not understand the rule"], "Terceira pessoa: doesn't.", { c: ["common-errors"], prompt: "Fix the common mistake." }),
      type("q5", "Open a debate: “Minha posição é que o transporte deveria ser gratuito.”", ["My position is that transport should be free", "My position is that public transport should be free", "My position is that transportation should be free"], "My position is that…", { c: ["debate-open"] }),
      type("q6", "Reply politely: “É um bom ponto; no entanto, é caro.”", ["That's a fair point; however, it is expensive", "That's a fair point; however, it's expensive", "That's a good point; however, it is expensive", "That is a fair point; however, it is expensive"], "Réplica educada: reconhece o ponto e contrapõe.", { c: ["rebut"] }),
      cloze("q7", "In ___, both sides have valid points.", ["conclusion"], "In conclusion,…", { c: ["debate-close"] }),
      cloze("q8", "I ___ up new words and add them to my notebook.", ["look"], "Look up significa procurar uma palavra ou informação.", { c: ["keep-learning"] }),
      fix("q9", "I'm used to listen to podcasts every day.", ["I'm used to listening to podcasts every day"], "Used to + -ing.", { c: ["keep-learning"], prompt: "Fix the mistake." }),
      listen("q10", "When I started, I could barely read a menu. Now I can read news articles. I'm still working on listening to fast speakers.", "What is still difficult?", ["Listening to fast speakers", "Reading menus", "Reading news"], 0, "Still working on listening to fast speakers.", { c: ["goal-reflection"] }),
    ],
    b: [
      mc("q1", "Which plan has a backup?", ["If I miss a day, I'll catch up on the weekend.", "I'll study every day.", "I'll try."], 0, "Plano B com if.", { c: ["plan-structure"] }),
      cloze("q2", "I set a ___ and write it on my wall.", ["goal"], "Set a goal.", { c: ["set-goal"] }),
      dict("q3", "Please double-check the numbers before you send the report.", "Double-check.", { c: ["self-edit"] }),
      fix("q4", "I did a mistake in the final report.", ["I made a mistake in the final report"], "Make a mistake.", { c: ["common-errors"], prompt: "Fix the collocation." }),
      cloze("q5", "I'd like to start by ___ that this is a complex issue.", ["saying"], "I'd like to start by saying…", { c: ["debate-open"] }),
      type("q6", "Say in English: “Posso responder a isso?”", ["May I respond to that", "Can I respond to that", "Could I respond to that"], "Pedir a palavra.", { c: ["rebut"] }),
      order("q7", "Put the words in order: “Em conclusão, os benefícios superam os riscos.”", "In conclusion, the benefits outweigh the risks.", "In conclusion,…", { c: ["debate-close"] }),
      cloze("q8", "It's hard to ___ up with fast speakers.", ["keep"], "Keep up with.", { c: ["keep-learning"] }),
      type("q9", "Contrast then and now: “Quando comecei, mal conseguia ler; agora consigo ler artigos.”", ["When I started, I could barely read; now I can read articles", "When I started, I could barely read, but now I can read articles", "When I started I could barely read; now I can read articles"], "Could barely… now I can.", { c: ["goal-reflection"] }),
      listen("q10", "That's a fair point; however, the study only included twenty people. In conclusion, we need more evidence.", "What is the speaker's final position?", ["More evidence is needed", "The study is perfect", "The study should be ignored"], 0, "We need more evidence.", { c: ["rebut", "debate-close"] }),
    ],
    production: write("t1", "Final project (about 120 words): choose a topic you care about. Write an argumentative text with a thesis, two supported reasons, a counter-argument with your answer, a conclusion, and one sentence about how you proofread it.",
      { mode: "argument", min: 80, check: ["Abri com uma tese clara (My position / I would argue).", "Dei dois motivos com apoio (for instance).", "Apresentei e respondi a um contra-argumento.", "Concluí sem argumento novo.", "Disse como revisei o texto."],
        model: "My position is that everyone should learn a second language. Firstly, it improves job opportunities; for instance, many companies prefer bilingual employees. Secondly, it helps you understand other cultures. Some people argue that translation apps make learning unnecessary. While it is true that apps are useful, they cannot replace real conversation. In conclusion, learning a language remains a valuable investment. Before sending this text, I proofread it twice and double-checked my verbs, because I tend to forget the -s in the third person.", c: ["debate-open", "rebut", "debate-close", "self-edit"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "O plano de seis meses",
      goal: "Ler um plano de estudo e identificar meta, rotina, plano B e forma de checar.",
      context: { kind: "text", title: "My plan for six months", lines: [
        { en: "My plan for the next six months: I will study thirty minutes a day, and I will keep a notebook of mistakes. Every Sunday I will review it.", pt: "Meu plano para os próximos seis meses: vou estudar trinta minutos por dia e manter um caderno de erros. Todo domingo vou revisá-lo." },
        { en: "If I miss a day, I will not give up; I will simply carry on the next day.", pt: "Se eu perder um dia, não vou desistir; simplesmente continuo no dia seguinte." },
        { en: "By December I would like to hold a ten-minute conversation without a script. To check my progress, I will record myself once a month and compare the recordings.", pt: "Até dezembro gostaria de manter uma conversa de dez minutos sem roteiro. Para checar meu progresso, vou me gravar uma vez por mês e comparar as gravações." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "What is the writer's goal?", ["A ten-minute conversation without a script", "To read ten books", "To pass a test"], 0, "A ten-minute conversation without a script by December.", { c: ["plan-structure"] }),
        rd("r2", PASSAGE, "What will the writer do every Sunday?", ["Review the notebook of mistakes", "Take a test", "Study for two hours"], 0, "Every Sunday I will review it.", { c: ["common-errors"] }),
        rd("r3", PASSAGE, "How will the writer check progress?", ["By recording themselves once a month", "By taking an exam", "By asking a friend"], 0, "I will record myself once a month.", { c: ["set-goal"] }),
        cloze("r4", "If I miss a day, I will not give up; I will simply carry ___ the next day.", ["on"], "Carry on significa continuar, seguir em frente.", { c: ["keep-learning"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Trecho de debate",
      goal: "Acompanhar abertura, réplica e fechamento em um debate.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "My position is that uniforms should be optional. That's a fair point; however, uniforms reduce pressure on students. I see your point, but students can express themselves with clothes. In conclusion, both sides have a point, but I still support the choice.", pt: "Minha posição é que o uniforme deveria ser opcional. É um bom ponto; no entanto, uniformes reduzem a pressão sobre os alunos. Entendo seu ponto, mas os alunos podem se expressar pelas roupas. Em conclusão, os dois lados têm um ponto, mas eu continuo apoiando a escolha." }] },
      exercises: [
        listen("a1", "My position is that uniforms should be optional.", "What is the speaker's position?", ["Uniforms should be optional", "Uniforms should be mandatory", "Uniforms should be banned"], 0, "Uniforms should be optional.", { c: ["debate-open"] }),
        listen("a2", "That's a fair point; however, uniforms reduce pressure on students.", "What does the second speaker do?", ["Acknowledges a point and replies", "Agrees completely", "Changes the topic"], 0, "Fair point; however…", { c: ["rebut"] }),
        dict("a3", "In conclusion, both sides have a point.", "Fechamento.", { c: ["debate-close"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Texto final revisado",
      goal: "Escrever, revisar e entregar um texto argumentativo com três passes de revisão.",
      exercises: [
        write("w1", "Write a short argumentative text (about 80 words) on this topic: 'Should cities invest more in bike lanes?' Then add a line telling how you proofread it (structure, precision, polishing).",
          { mode: "argument", min: 65, check: ["Tese clara.", "Dois argumentos com apoio.", "Contra-argumento respondido.", "Conclusão.", "Linha sobre a revisão."], model: "My position is that cities should invest more in bike lanes. Firstly, bikes reduce traffic and pollution. Secondly, they improve public health; for instance, people who cycle to work exercise every day. Some people argue that lanes take space from cars. While it is true that space is limited, the benefits outweigh the costs. In conclusion, safe bike lanes are a sensible investment. I proofread the text three times: structure, verbs and spelling.", c: ["debate-open", "rebut", "debate-close", "self-edit"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Debate de dois minutos",
      goal: "Defender uma posição, responder a uma objeção e concluir, tudo oralmente.",
      exercises: [
        speak("s1", "Choose a topic (phones in class, remote work or free public transport). In two minutes: state your position, give two reasons, answer one objection, and conclude.", ["My position is that public transport should be free. Firstly, it reduces traffic. Secondly, it helps low-income families. Some people argue it is too expensive. That's a fair point; however, cities already spend on roads. In conclusion, the benefits outweigh the costs."],
          { mode: "respond", check: ["Declarei minha posição.", "Dei dois motivos com marcadores.", "Respondi a uma objeção sem ser rude.", "Concluí sem argumento novo.", "Mantive ritmo e pausas."], c: ["debate-open", "rebut", "debate-close"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão final: seu plano para continuar",
      goal: "Montar seu plano de estudo para depois do curso e apresentá-lo a alguém.",
      exercises: [
        dialog("m1", "A friend asks how you will keep learning English after this course.", [
          { npc: ["What is your plan to keep learning?", "Qual é o seu plano para continuar aprendendo?"], options: [
            ["By December, I'd like to hold a ten-minute conversation. Every day, I'll study thirty minutes and look up new words.", true, "Seu amigo fica impressionado.", "Meta com prazo e rotina."],
            ["I'll study sometimes.", false, "O plano é vago.", "Sem prazo nem medida."],
          ] },
          { npc: ["And how will you know if it's working?", "E como você vai saber se está funcionando?"], options: [
            ["To track my progress, I'll record myself every month and compare the recordings.", true, "Ele sugere que você faça um teste externo também.", "Forma de checar."],
            ["I will feel it.", false, "Sem critério.", "Use gravações, testes ou conversas."],
          ] },
          { npc: ["What if you get busy and miss a week?", "E se você ficar ocupado e perder uma semana?"], options: [
            ["If I miss a week, I won't give up. I'll catch up on the weekend and carry on.", true, "Ele aprova o plano B.", "Primeira condicional e catch up."],
            ["If I will miss, I stop.", false, "Plano ruim e frase errada.", "If I miss, I'll…"],
          ] },
        ], "Apresentar seu plano pós-curso.", { c: ["plan-structure", "set-goal", "keep-learning"] }),
        type("m2", "Say in English: “Quando comecei, mal conseguia entender; agora consigo entender vídeos simples.”", ["When I started, I could barely understand; now I can understand simple videos", "When I started, I could barely understand, but now I can understand simple videos", "When I started I could barely understand; now I can understand simple videos"], "Antes e agora.", { c: ["goal-reflection"] }),
      ],
      outside: {
        title: "Fora do app: seu plano de 90 dias",
        instructions: "Escreva em inglês, em uma página, seu plano para os próximos 90 dias: uma meta com prazo e medida, sua rotina diária, o que fará se perder um dia, como vai checar o progresso (gravação, texto, conversa ou teste externo) e quem pode te ajudar. Cole em um lugar visível. Lembre-se de que concluir as unidades mostra seu avanço no curso; só uma conversa real ou um teste externo mostra sua proficiência de fato.",
        checklist: ["Meta com prazo e medida.", "Rotina diária concreta.", "Plano B para quando eu falhar.", "Forma de checar o progresso fora do app."],
      },
    }),
  },
});
