/** B2 · Unidade 6 — Reuniões e entrevistas: participar, apresentar e responder com exemplos. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Good morning, everyone. Today I'll talk about our results in three parts. First, sales; then costs; finally, next steps. Let's start with sales. As you can see on this slide, we met our target in the second quarter. That brings me to costs. To sum up, we are on track, but we must reach a consensus on the budget before the deadline.";

export default defineUnit({
  id: "b2-u06",

  concepts: [
    concept("jump-in", "phrase", "Sorry to interrupt, but … / If I could just add …", "Desculpe interromper, mas … / Se eu puder acrescentar …", "l1", ["Sorry to interrupt, but could I add something?", "Desculpe interromper, mas posso acrescentar algo?"], { note: "Interromper com educação: peça licença antes de falar." }),
    concept("clarify", "phrase", "Could you clarify …? / What do you mean by …?", "Você poderia esclarecer …? / O que você quer dizer com …?", "l1", ["Could you clarify what you mean by 'soon'?", "Você poderia esclarecer o que quer dizer com 'em breve'?"]),
    concept("move-on", "phrase", "Let's move on to … / Let's get back to …", "Vamos passar para … / Vamos voltar a …", "l1", ["Let's move on to the next item.", "Vamos passar para o próximo item."], { note: "Quem conduz a reunião usa essas frases para organizar o tempo." }),
    concept("agenda-structure", "phrase", "I'll talk about three things. First, … Then, … Finally, …", "Vou falar de três coisas.", "l2", ["I'll talk about three things.", "Vou falar de três coisas."], { note: "Anuncie a estrutura no início da apresentação." }),
    concept("slide-refer", "phrase", "As you can see on this slide, … / This brings me to …", "Como vocês podem ver neste slide, … / Isso me leva a …", "l2", ["This brings me to my next point.", "Isso me leva ao meu próximo ponto."], { note: "Conecta as partes da apresentação." }),
    concept("meet-deadline", "phrase", "meet a deadline / reach a consensus", "cumprir um prazo / chegar a um consenso", "l2", ["We must meet the deadline.", "Precisamos cumprir o prazo."], { tags: ["collocation"], note: "Em inglês, o prazo se “encontra” (meet), não se “cumpre”." }),
    concept("star-method", "pattern", "Situation, Task, Action, Result", "Situação, tarefa, ação, resultado", "l3", ["I led the project, and as a result sales grew by ten percent.", "Liderei o projeto e, como resultado, as vendas cresceram dez por cento."], { note: "Estrutura para contar experiências em entrevistas." }),
    concept("tell-me-about", "phrase", "Tell me about a time when … / Can you give an example?", "Conte-me sobre uma vez em que … / Pode dar um exemplo?", "l3", ["Tell me about a time when you solved a problem.", "Conte-me sobre uma vez em que você resolveu um problema."]),
    concept("weakness-answer", "phrase", "I used to …, but now I …", "Eu costumava …, mas agora …", "l4", ["I used to avoid public speaking, but now I practice every week.", "Eu evitava falar em público, mas agora pratico toda semana."], { note: "Mostra um ponto fraco e o que foi feito para melhorá-lo." }),
    concept("ask-back", "phrase", "Do you have any questions for us?", "Você tem alguma pergunta para nós?", "l4", ["What does a typical day look like in this role?", "Como é um dia típico nessa função?"], { note: "Prepare sempre duas perguntas para o final da entrevista." }),
  ],

  lessons: [
    lesson("l1", {
      title: "Falar numa reunião",
      objective: "Você vai conseguir interromper, pedir esclarecimento e conduzir a pauta de uma reunião.",
      minutes: 10,
      context: { kind: "dialogue", title: "Weekly team meeting", lines: [
        { who: "Carla", en: "So, the launch will be delayed by a few weeks.", pt: "Então o lançamento será adiado por algumas semanas." },
        { who: "Diego", en: "Sorry to interrupt, but could you clarify what you mean by 'a few weeks'?", pt: "Desculpe interromper, mas você poderia esclarecer o que quer dizer com 'algumas semanas'?" },
        { who: "Carla", en: "Good question. Probably three or four.", pt: "Boa pergunta. Provavelmente três ou quatro." },
        { who: "Chefe", en: "Thanks, Carla. Let's move on to the budget.", pt: "Obrigado, Carla. Vamos passar para o orçamento." },
      ] },
      explanation: {
        summary: "Três ferramentas de reunião:\n- **Interromper:** *Sorry to interrupt, but…* / *If I could just add something…*\n- **Esclarecer:** *Could you clarify…?* / *What do you mean by…?*\n- **Conduzir:** *Let's move on to…* / *Let's get back to…*",
        details: "Interromper sem pedir licença soa rude em inglês. Use *Sorry to interrupt, but* (mais direto) ou *If I could just add…* (mais suave). Quem conduz a reunião usa *Let's move on* para mudar de item e *Let's get back to the point* quando o assunto se perde.",
        examples: [
          { en: "If I could just add one thing, the deadline is Friday.", pt: "Se eu puder acrescentar uma coisa, o prazo é sexta." },
          { en: "Could you clarify that last point?", pt: "Você poderia esclarecer esse último ponto?" },
          { en: "Let's get back to the agenda.", pt: "Vamos voltar à pauta." },
        ],
        contrasts: [
          { wrong: "Stop. You are wrong.", right: "Sorry to interrupt, but I see it differently.", why: "Peça licença e suavize." },
          { wrong: "What means 'soon'?", right: "What do you mean by 'soon'?", why: "A pergunta usa do you mean." },
        ],
      },
      guided: [
        mc("e1", "You want to add a comment while someone is talking. Choose:", ["Sorry to interrupt, but could I add something?", "Stop talking.", "I add something now."], 0, "Peça licença antes de falar.", { c: ["jump-in"], s: "interaction" }),
        match("e2", "Match the phrase to its purpose.", [["Sorry to interrupt, but…", "interromper com educação"], ["Could you clarify…?", "pedir esclarecimento"], ["Let's move on to…", "mudar de item da pauta"], ["Let's get back to…", "voltar ao assunto principal"]],
          "Interromper, esclarecer e conduzir.", { c: ["jump-in", "clarify", "move-on"], pt: "Associe a frase ao objetivo." }),
        cloze("e3", "Could you ___ what you mean by 'a few weeks'?", ["clarify", "explain"], "Could you clarify…?", { c: ["clarify"] }),
      ],
      independent: [
        cloze("e4", "Sorry to ___, but I have a question.", ["interrupt"], "Sorry to interrupt, but…", { c: ["jump-in"] }),
        cloze("e5", "Thanks, everyone. Let's ___ on to the budget.", ["move"], "Let's move on to…", { c: ["move-on"] }),
        fix("e6", "What means 'soon' exactly?", ["What do you mean by 'soon' exactly", "What do you mean by soon exactly"], "Em inglês: What do you mean by…?", { c: ["clarify"], prompt: "Fix the question." }),
        dict("e7", "Let's get back to the agenda.", "Voltando à pauta.", { c: ["move-on"] }),
        order("e8", "Put the words in order: “Se eu puder acrescentar uma coisa.”", "If I could just add one thing.", "If I could just add…", { c: ["jump-in"], extra: ["would"] }),
      ],
      application: [
        type("e9", "Ask for clarification: “Você poderia esclarecer esse último ponto?”", ["Could you clarify that last point", "Could you clarify the last point", "Could you clarify that last point, please"], "Could you clarify…?", { c: ["clarify"] }),
        speak("e10", "Simulate a meeting: interrupt politely, ask for clarification and then move the meeting on. Three sentences.", ["Sorry to interrupt, but could I add something? Could you clarify what you mean by 'next month'? Thanks, everyone. Let's move on to the budget."],
          { mode: "respond", check: ["Interrompi com Sorry to interrupt.", "Pedi esclarecimento com Could you clarify.", "Usei Let's move on to.", "Meu tom ficou educado."], c: ["jump-in", "clarify", "move-on"] }),
      ],
      summary: { points: ["Sorry to interrupt, but…", "Could you clarify…?", "Let's move on / get back to…"], concepts: ["jump-in", "clarify", "move-on"] },
    }),

    lesson("l2", {
      title: "Apresentar com estrutura",
      objective: "Você vai conseguir fazer uma apresentação curta, anunciando e ligando as partes.",
      minutes: 10,
      context: { kind: "text", title: "Opening of a presentation", lines: [
        { en: "Good morning, everyone. Today I'll talk about our results in three parts.", pt: "Bom dia a todos. Hoje vou falar sobre nossos resultados em três partes." },
        { en: "First, sales; then costs; finally, next steps.", pt: "Primeiro, as vendas; depois os custos; por fim, os próximos passos." },
        { en: "As you can see on this slide, we met our target in the second quarter. That brings me to costs.", pt: "Como vocês podem ver neste slide, atingimos a meta no segundo trimestre. Isso me leva aos custos." },
        { en: "To sum up, we are on track, but we must reach a consensus on the budget before the deadline.", pt: "Em resumo, estamos no caminho certo, mas precisamos chegar a um consenso sobre o orçamento antes do prazo." },
      ] },
      explanation: {
        summary: "Uma apresentação clara tem:\n1. **Abertura e roteiro:** *Today I'll talk about three things…*\n2. **Ligações:** *As you can see on this slide…* / *That brings me to…*\n3. **Fechamento:** *To sum up,…*\n\nColocações de trabalho: **meet a deadline** (cumprir um prazo), **reach a consensus** (chegar a um consenso), **meet a target** (atingir uma meta).",
        details: "Em inglês, o prazo e a meta são “encontrados” (*meet*), e o consenso é “alcançado” (*reach*). Fale mais devagar do que o normal e faça pausas depois de cada marcador: é o que dá ritmo à apresentação. Evite ler o slide palavra por palavra.",
        examples: [
          { en: "We need to meet the deadline.", pt: "Precisamos cumprir o prazo." },
          { en: "This brings me to my next point.", pt: "Isso me leva ao meu próximo ponto." },
          { en: "We finally reached a consensus.", pt: "Por fim, chegamos a um consenso." },
        ],
        contrasts: [
          { wrong: "We fulfilled the deadline.", right: "We met the deadline.", why: "A colocação natural é meet a deadline." },
          { wrong: "We arrived to a consensus.", right: "We reached a consensus.", why: "Reach a consensus." },
        ],
      },
      guided: [
        mc("e1", "Which sentence opens a presentation well?", ["Today I'll talk about three things.", "Sorry to interrupt, but…", "Do you have any questions for us?"], 0, "A abertura anuncia o roteiro.", { c: ["agenda-structure"] }),
        match("e2", "Match the collocation to its meaning.", [["meet a deadline", "cumprir um prazo"], ["reach a consensus", "chegar a um consenso"], ["meet a target", "atingir uma meta"], ["bring up a point", "levantar um ponto"]],
          "Colocações comuns no trabalho.", { c: ["meet-deadline"], s: "vocabulary", pt: "Associe a colocação ao significado." }),
        cloze("e3", "As you can see on this ___, sales grew in the second quarter.", ["slide", "chart", "graph"], "As you can see on this slide…", { c: ["slide-refer"] }),
      ],
      independent: [
        cloze("e4", "That ___ me to my next point: costs.", ["brings"], "That brings me to…", { c: ["slide-refer"] }),
        cloze("e5", "We must ___ the deadline on Friday.", ["meet"], "Meet a deadline.", { c: ["meet-deadline"], s: "vocabulary", t: [["fulfill", "A colocação natural é meet a deadline."]] }),
        fix("e6", "We arrived to a consensus after two hours.", ["We reached a consensus after two hours"], "Reach a consensus.", { c: ["meet-deadline"], prompt: "Fix the collocation." }),
        dict("e7", "Today I'll talk about our results in three parts.", "Abertura com roteiro.", { c: ["agenda-structure"] }),
        order("e8", "Put the words in order: “Isso me leva aos custos.”", "That brings me to costs.", "That brings me to…", { c: ["slide-refer"], extra: ["takes"] }),
      ],
      application: [
        type("e9", "Say in English: “Precisamos cumprir o prazo.”", ["We need to meet the deadline", "We must meet the deadline", "We have to meet the deadline"], "Meet the deadline.", { c: ["meet-deadline"] }),
        write("e10", "Write the opening (4 sentences) of a two-minute presentation about a project at work or school: greeting, roteiro in three parts, and a link to the first part.",
          { mode: "guided", frame: ["Good morning, everyone. Today I'll talk about …", "First, …; then …; finally, …", "Let's start with …"], min: 28, check: ["Cumprimentei a audiência.", "Anunciei três partes.", "Usei First, then, finally.", "Fiz uma ligação para a primeira parte."], model: "Good morning, everyone. Today I'll talk about our new study group in three parts. First, why we started; then what we did; finally, what we plan next. Let's start with why we started.", c: ["agenda-structure", "slide-refer"] }),
      ],
      summary: { points: ["Abra com o roteiro.", "As you can see… / That brings me to…", "meet a deadline; reach a consensus."], concepts: ["agenda-structure", "slide-refer", "meet-deadline"] },
    }),

    lesson("l3", {
      title: "Contar sua experiência",
      objective: "Você vai conseguir responder a perguntas de entrevista com exemplos concretos.",
      minutes: 10,
      context: { kind: "dialogue", title: "Behavioral interview", lines: [
        { who: "Entrevistadora", en: "Tell me about a time when you solved a difficult problem.", pt: "Conte-me sobre uma vez em que você resolveu um problema difícil." },
        { who: "Teo", en: "Last year our biggest client threatened to leave. My task was to understand why.", pt: "No ano passado nosso maior cliente ameaçou sair. Minha tarefa era entender por quê." },
        { who: "Teo", en: "I called the client, listened carefully and then proposed a new support plan.", pt: "Liguei para o cliente, ouvi com atenção e depois propus um novo plano de suporte." },
        { who: "Teo", en: "As a result, the client stayed, and our support score rose by ten percent.", pt: "Como resultado, o cliente ficou e nossa nota de suporte subiu dez por cento." },
        { who: "Entrevistadora", en: "Can you give another example?", pt: "Pode dar outro exemplo?" },
      ] },
      explanation: {
        summary: "Para perguntas do tipo **Tell me about a time when…**, conte em quatro passos (método **STAR**):\n- **Situation:** o contexto\n- **Task:** sua responsabilidade\n- **Action:** o que você fez (verbos no passado)\n- **Result:** o resultado, de preferência com número",
        details: "Use **I**, e não “we”, para a parte da ação: o entrevistador quer saber o que *você* fez. Para o resultado, *As a result,…* e números tornam a resposta convincente. Duas frases curtas por passo bastam; respostas de mais de dois minutos cansam o ouvinte.",
        examples: [
          { en: "My task was to reduce delivery time.", pt: "Minha tarefa era reduzir o prazo de entrega." },
          { en: "I organized a weekly review, and as a result errors fell by half.", pt: "Organizei uma revisão semanal e, como resultado, os erros caíram pela metade." },
          { en: "Can you give an example?", pt: "Pode dar um exemplo?" },
        ],
        contrasts: [
          { wrong: "We did everything and it worked.", right: "I organized the schedule, and it worked.", why: "Diga o que você fez." },
          { wrong: "Result: good.", right: "As a result, sales grew by ten percent.", why: "Resultado concreto, com número." },
        ],
      },
      guided: [
        mc("e1", "Which part of a STAR answer is “I called the client and proposed a new plan”?", ["Action", "Situation", "Result"], 0, "O que você fez = Action.", { c: ["star-method"] }),
        match("e2", "Match the STAR step to a sentence.", [["Situation", "Our biggest client threatened to leave."], ["Task", "My task was to understand why."], ["Action", "I called the client and listened."], ["Result", "As a result, the client stayed."]],
          "Quatro passos de uma boa resposta.", { c: ["star-method"], pt: "Associe o passo à frase." }),
        cloze("e3", "Tell me about a ___ when you solved a problem.", ["time"], "Tell me about a time when…", { c: ["tell-me-about"] }),
      ],
      independent: [
        cloze("e4", "My ___ was to reduce delivery time.", ["task"], "Task = a responsabilidade.", { c: ["star-method"] }),
        cloze("e5", "I organized a weekly review, and as a ___, errors fell by half.", ["result"], "As a result, + resultado.", { c: ["star-method"] }),
        fix("e6", "We did everything alone, and the client stayed.", ["I did everything alone, and the client stayed"], "Na ação, diga I.", { c: ["star-method"], prompt: "Fix: say what YOU did." }),
        dict("e7", "Tell me about a time when you solved a difficult problem.", "Pergunta comportamental.", { c: ["tell-me-about"] }),
        order("e8", "Put the words in order: “Pode dar um exemplo?”", "Can you give an example?", "Pedido de exemplo.", { c: ["tell-me-about"], extra: ["do"] }),
      ],
      application: [
        type("e9", "Say in English: “Minha tarefa era entender por quê.”", ["My task was to understand why"], "My task was to + verbo.", { c: ["star-method"] }),
        speak("e10", "Answer out loud in 40 seconds: Tell me about a time when you solved a problem. Use Situation, Task, Action and Result.", ["Last year our website crashed before a sale. My task was to fix it quickly. I called the technical team, found the error and restarted the server. As a result, the site was online in one hour."],
          { mode: "respond", check: ["Descrevi a situação.", "Disse qual era minha tarefa.", "Contei minhas ações no passado com I.", "Dei um resultado concreto."], c: ["star-method", "tell-me-about"] }),
      ],
      summary: { points: ["STAR: Situation, Task, Action, Result.", "Use I para a ação.", "Resultado com número."], concepts: ["star-method", "tell-me-about"] },
    }),

    lesson("l4", {
      title: "Pontos fracos e perguntas finais",
      objective: "Você vai conseguir falar de um ponto a melhorar e fechar a entrevista com boas perguntas.",
      minutes: 9,
      context: { kind: "dialogue", title: "End of the interview", lines: [
        { who: "Entrevistadora", en: "What is your biggest weakness?", pt: "Qual é o seu maior ponto fraco?" },
        { who: "Teo", en: "I used to avoid public speaking, but now I practice with a colleague every week.", pt: "Eu evitava falar em público, mas agora pratico com um colega toda semana." },
        { who: "Entrevistadora", en: "Do you have any questions for us?", pt: "Você tem alguma pergunta para nós?" },
        { who: "Teo", en: "Yes. What does a typical day look like in this role? And how do you measure success?", pt: "Sim. Como é um dia típico nessa função? E como vocês medem o sucesso?" },
      ] },
      explanation: {
        summary: "**Ponto fraco:** seja honesto e mostre progresso.\n- **I used to** + verbo, **but now I** + verbo\n- *I'm still working on…*\n\n**Perguntas finais:** sempre tenha duas.\n- *What does a typical day look like?*\n- *How do you measure success in this role?*",
        details: "Evite pontos fracos “disfarçados” como *I work too hard*: soam falsos. Escolha algo real e que você já esteja melhorando. No fim da entrevista, dizer “no questions” parece desinteresse; perguntar sobre rotina, equipe e métricas mostra preparo.",
        examples: [
          { en: "I used to be late with reports, but now I plan my week.", pt: "Eu atrasava relatórios, mas agora planejo minha semana." },
          { en: "I'm still working on my presentation skills.", pt: "Ainda estou trabalhando minhas habilidades de apresentação." },
          { en: "How would you describe the team culture?", pt: "Como você descreveria a cultura da equipe?" },
        ],
        contrasts: [
          { wrong: "I have no weaknesses.", right: "I'm still working on my public speaking.", why: "Honestidade com progresso." },
          { wrong: "No, I have no questions.", right: "Yes, what does a typical day look like?", why: "Perguntar mostra interesse." },
        ],
      },
      guided: [
        mc("e1", "Which is the best answer to “What is your biggest weakness?”", ["I used to avoid public speaking, but now I practice every week.", "I have no weaknesses.", "I work too hard."], 0, "Honesto e com progresso.", { c: ["weakness-answer"] }),
        mc("e2", "Which is a good question to ask at the end?", ["What does a typical day look like in this role?", "How much can I leave early?", "No questions."], 0, "Pergunta sobre rotina mostra interesse.", { c: ["ask-back"], s: "interaction" }),
        cloze("e3", "I ___ to avoid public speaking, but now I practice every week.", ["used"], "Used to + verbo.", { c: ["weakness-answer"] }),
      ],
      independent: [
        cloze("e4", "I used to be late with reports, but now I ___ my week.", ["plan"], "Now + presente simples.", { c: ["weakness-answer"] }),
        fix("e5", "I am used to avoid public speaking, but now I practice.", ["I used to avoid public speaking, but now I practice"], "Hábito passado: used to + verbo.", { c: ["weakness-answer"], prompt: "Fix the mistake." }),
        cloze("e6", "How do you ___ success in this role?", ["measure"], "Measure success.", { c: ["ask-back"], s: "vocabulary" }),
        dict("e7", "What does a typical day look like in this role?", "Pergunta final.", { c: ["ask-back"] }),
        order("e8", "Put the words in order: “Ainda estou trabalhando nisso.”", "I'm still working on it.", "Still working on.", { c: ["weakness-answer"], extra: ["am"] }),
      ],
      application: [
        type("e9", "Ask one smart closing question about the team: “Como você descreveria a cultura da equipe?”", ["How would you describe the team culture", "How would you describe the culture of the team"], "How would you describe…?", { c: ["ask-back"] }),
        dialog("e10", "You are at the end of an interview.", [
          { npc: ["What is something you want to improve?", "O que você quer melhorar?"], options: [
            ["I used to be shy in meetings, but now I prepare one comment before each meeting.", true, "Ela sorri.", "Ponto fraco com progresso."],
            ["Nothing. I'm perfect.", false, "Ela estranha.", "Falta honestidade."],
          ] },
          { npc: ["Do you have any questions for us?", "Você tem alguma pergunta para nós?"], options: [
            ["Yes. What does success look like in the first six months?", true, "Ela responde com entusiasmo.", "Pergunta sobre metas."],
            ["No, thanks.", false, "Parece pouco interessado.", "Faça ao menos uma pergunta."],
          ] },
        ], "Fechar a entrevista com honestidade e curiosidade.", { c: ["weakness-answer", "ask-back"] }),
      ],
      summary: { points: ["I used to…, but now I…", "I'm still working on…", "Tenha duas perguntas finais."], concepts: ["weakness-answer", "ask-back"] },
    }),
  ],

  checkpoint: {
    intro: "New workplace situations: take part in a meeting, present clearly and answer interview questions with examples.",
    a: [
      mc("q1", "While a colleague is speaking, you want to add something. Choose:", ["Sorry to interrupt, but may I add a point?", "Wait! Be quiet.", "Now I speak."], 0, "Interromper com licença.", { c: ["jump-in"], s: "interaction" }),
      cloze("q2", "Could you ___ what you mean by 'soon'?", ["clarify"], "Could you clarify…?", { c: ["clarify"] }),
      order("q3", "Put the words in order: “Vamos passar para o próximo item.”", "Let's move on to the next item.", "Let's move on to…", { c: ["move-on"], extra: ["pass"] }),
      type("q4", "Open a presentation: “Hoje vou falar sobre três coisas.”", ["Today I'll talk about three things", "Today I will talk about three things", "Today I am going to talk about three things"], "Abertura com roteiro.", { c: ["agenda-structure"] }),
      cloze("q5", "As you can see on this chart, sales ___ in March.", ["grew", "rose", "increased"], "Como vocês podem ver neste gráfico…", { c: ["slide-refer"] }),
      fix("q6", "We fulfilled the deadline on Friday.", ["We met the deadline on Friday"], "Meet a deadline.", { c: ["meet-deadline"], prompt: "Fix the collocation." }),
      mc("q7", "In a STAR answer, “As a result, sales grew by 8%” is the:", ["Result", "Task", "Situation"], 0, "O resultado.", { c: ["star-method"] }),
      dict("q8", "Tell me about a time when you worked in a team.", "Pergunta comportamental.", { c: ["tell-me-about"] }),
      cloze("q9", "I used to avoid meetings, but now I ___ in every one.", ["speak", "participate", "take part"], "Now + presente.", { c: ["weakness-answer"] }),
      listen("q10", "Before we finish, does anyone have questions? Yes. What does a typical day look like for this team?", "What does the person want to know?", ["What a typical day is like", "The salary", "The holidays"], 0, "What does a typical day look like?", { c: ["ask-back"] }),
    ],
    b: [
      mc("q1", "You don't understand a colleague's term. Choose:", ["Could you clarify what you mean by 'sync'?", "What means sync?", "I don't care."], 0, "Pedir esclarecimento.", { c: ["clarify"], s: "interaction" }),
      cloze("q2", "Sorry to ___, but I'd like to add something.", ["interrupt"], "Sorry to interrupt.", { c: ["jump-in"] }),
      dict("q3", "Let's get back to the main point.", "Voltar à pauta.", { c: ["move-on"] }),
      order("q4", "Put the words in order: “Isso me leva ao meu próximo ponto.”", "This brings me to my next point.", "This brings me to…", { c: ["slide-refer"], extra: ["takes"] }),
      type("q5", "Say in English: “Conseguimos chegar a um consenso.”", ["We reached a consensus", "We managed to reach a consensus", "We were able to reach a consensus"], "Reach a consensus.", { c: ["meet-deadline"] }),
      cloze("q6", "We need to ___ the target by December.", ["meet", "reach", "hit"], "Meet / reach a target.", { c: ["meet-deadline"], s: "vocabulary" }),
      fix("q7", "We solved the problem alone, and the client stayed.", ["I solved the problem alone, and the client stayed"], "Na ação, diga I.", { c: ["star-method"], prompt: "Fix: say what YOU did." }),
      cloze("q8", "Can you give an ___ of a time you led a project?", ["example"], "Give an example.", { c: ["tell-me-about"] }),
      fix("q9", "I am used to be nervous, but now I prepare.", ["I used to be nervous, but now I prepare"], "Used to + verbo.", { c: ["weakness-answer"], prompt: "Fix the mistake." }),
      listen("q10", "I used to avoid public speaking, but now I practice with a colleague every week. As a result, I feel more confident.", "What improved?", ["The speaker's confidence", "The colleague's salary", "The company's results"], 0, "I feel more confident.", { c: ["weakness-answer", "star-method"] }),
    ],
    production: speak("t1", "Record about 90 seconds: introduce yourself, answer 'Tell me about a time when you worked under pressure' using STAR, and finish with one question for the interviewer.",
      ["Hello, I'm Marina. Tell me about a time when I worked under pressure: last year our system failed before a big event. My task was to restore it. I called the vendor, tested two solutions and chose the safer one. As a result, the event started on time. Do you have any questions for me? Yes, what does a typical day look like in this role?"],
      { mode: "respond", check: ["Me apresentei.", "Usei os quatro passos STAR.", "Falei do que eu fiz com I.", "Terminei com uma boa pergunta.", "Falei com ritmo claro, sem pressa."], c: ["star-method", "ask-back"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Roteiro de uma apresentação",
      goal: "Ler o início de uma apresentação e reconhecer a estrutura e as ligações entre as partes.",
      context: { kind: "text", title: "Quarterly results", lines: [
        { en: "Good morning, everyone. Today I'll talk about our results in three parts. First, sales; then costs; finally, next steps.", pt: "Bom dia a todos. Hoje vou falar sobre nossos resultados em três partes. Primeiro, as vendas; depois os custos; por fim, os próximos passos." },
        { en: "Let's start with sales. As you can see on this slide, we met our target in the second quarter.", pt: "Vamos começar pelas vendas. Como vocês podem ver neste slide, atingimos a meta no segundo trimestre." },
        { en: "That brings me to costs. To sum up, we are on track, but we must reach a consensus on the budget before the deadline.", pt: "Isso me leva aos custos. Em resumo, estamos no caminho certo, mas precisamos chegar a um consenso sobre o orçamento antes do prazo." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "How many parts will the talk have?", ["Three", "Two", "Four"], 0, "Today I'll talk about… in three parts.", { c: ["agenda-structure"] }),
        rd("r2", PASSAGE, "What happened in the second quarter?", ["The target was met.", "Costs increased.", "The budget was cut."], 0, "We met our target in the second quarter.", { c: ["meet-deadline"] }),
        rd("r3", PASSAGE, "What must the team still do?", ["Reach a consensus on the budget", "Hire new people", "Cancel the project"], 0, "We must reach a consensus on the budget.", { c: ["meet-deadline"] }),
        cloze("r4", "That ___ me to costs.", ["brings"], "That brings me to…", { c: ["slide-refer"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Trecho de reunião",
      goal: "Acompanhar quem interrompe, quem esclarece e como a reunião é conduzida.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "The report will be ready soon. Sorry to interrupt, but could you clarify what you mean by soon? By Thursday. Thanks. Let's move on to the next item.", pt: "O relatório estará pronto em breve. Desculpe interromper, mas você poderia esclarecer o que quer dizer com em breve? Até quinta. Obrigado. Vamos passar para o próximo item." }] },
      exercises: [
        listen("a1", "The report will be ready soon. Sorry to interrupt, but could you clarify what you mean by soon?", "What does the second speaker want to know?", ["When exactly the report will be ready", "Who wrote the report", "How long the report is"], 0, "Clarify what you mean by soon.", { c: ["clarify"] }),
        listen("a2", "By Thursday. Thanks. Let's move on to the next item.", "What happens next?", ["The meeting moves to another item", "The meeting ends", "The report is cancelled"], 0, "Let's move on to the next item.", { c: ["move-on"] }),
        dict("a3", "Sorry to interrupt, but could you clarify that?", "Interrupção educada.", { c: ["jump-in"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Resposta de entrevista por escrito",
      goal: "Escrever uma resposta STAR para uma pergunta comportamental.",
      exercises: [
        write("w1", "Write a STAR answer (about 70 words) to: 'Tell me about a time when you helped a team reach a goal.'",
          { mode: "free", min: 45, check: ["Descrevi a situação.", "Disse qual era minha tarefa.", "Contei minhas ações com I no passado.", "Dei um resultado concreto com As a result."], model: "Last year our study group was failing a project. My task was to organize the work. I created a shared schedule, divided the tasks and held a ten-minute meeting every Monday. As a result, we finished two days before the deadline and received the highest grade in the class.", c: ["star-method"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Mini apresentação",
      goal: "Fazer uma apresentação de um minuto com abertura, partes e fechamento.",
      exercises: [
        speak("s1", "Give a one-minute presentation about a hobby or a project. Open with your agenda, link the parts and close with To sum up.", ["Good morning, everyone. Today I'll talk about my running routine in three parts. First, why I started; then my training plan; finally, my goals. Let's start with why I started. That brings me to my plan. To sum up, running has changed my week."],
          { mode: "respond", check: ["Anunciei três partes.", "Usei Let's start with e That brings me to.", "Fechei com To sum up.", "Falei com pausas depois dos marcadores."], c: ["agenda-structure", "slide-refer"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: entrevista completa",
      goal: "Passar por uma entrevista curta: apresentar-se, contar uma experiência, falar de um ponto fraco e fazer perguntas.",
      exercises: [
        dialog("m1", "You are in a final-round job interview.", [
          { npc: ["Tell me about a time when you handled a conflict at work.", "Conte-me sobre uma vez em que você lidou com um conflito no trabalho."], options: [
            ["Last year two colleagues disagreed about priorities. My task was to find a solution. I organized a meeting, listened to both sides and proposed a shared plan. As a result, the project finished on time.", true, "Ela anota.", "Resposta STAR completa."],
            ["We solved it. It was fine.", false, "Ela pede detalhes.", "Faltam ação e resultado."],
          ] },
          { npc: ["And what is something you want to improve?", "E o que você quer melhorar?"], options: [
            ["I used to be shy in meetings, but now I prepare one comment before each meeting.", true, "Ela concorda com a cabeça.", "Ponto fraco com progresso."],
            ["I don't have anything to improve.", false, "Ela estranha.", "Sem honestidade."],
          ] },
          { npc: ["Do you have any questions for us?", "Você tem alguma pergunta para nós?"], options: [
            ["Yes. What does success look like in this role in the first six months?", true, "Ela agradece a pergunta.", "Pergunta que mostra preparo."],
            ["No, thank you.", false, "Parece pouco interessado.", "Faça ao menos uma pergunta."],
          ] },
        ], "Entrevista completa: conflito, ponto fraco e perguntas finais.", { c: ["star-method", "weakness-answer", "ask-back"] }),
        type("m2", "Say in English: “Posso acrescentar uma coisa?”", ["Could I add something", "Can I add something", "May I add something", "Could I just add something", "If I could just add something"], "Pedido educado.", { c: ["jump-in"] }),
      ],
      outside: {
        title: "Fora do app: ensaio de entrevista",
        instructions: "Escolha uma pergunta comportamental (por exemplo, 'Tell me about a time when you solved a problem'). Escreva as quatro partes STAR em inglês, uma frase por parte, e diga em voz alta. Grave, ouça e repita uma vez, cortando o que for desnecessário. Prepare também duas perguntas para fazer no final.",
        checklist: ["Escrevi Situation, Task, Action e Result.", "Falei em primeira pessoa na ação.", "Gravei e ouvi.", "Preparei duas perguntas finais."],
      },
    }),
  },
});
