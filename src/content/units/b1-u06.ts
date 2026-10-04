/** B1 · Unidade 6 — E se…? Situações imaginárias, conselhos e desejos (second conditional, wish). */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "If I won a lot of money, I wouldn't stop working. I would work fewer hours and I would travel twice a year. I wish I had more free time now. If I were younger, I would study music, but I don't regret my choices.";

export default defineUnit({
  id: "b1-u06",

  concepts: [
    concept("second-cond", "pattern", "If I had …, I would …", "Se eu tivesse …, eu …ria", "l1", ["If I had more time, I would learn to cook.", "Se eu tivesse mais tempo, aprenderia a cozinhar."], { note: "If + passado simples, would + verbo base. Fala de algo imaginário agora." }),
    concept("would-base", "pattern", "would / wouldn't + verbo base", "…ria / não …ria", "l1", ["I'd buy a house near the beach.", "Eu compraria uma casa perto da praia."], { note: "I'd = I would. Nunca would depois de if." }),
    concept("if-i-were", "phrase", "If I were you, I would …", "Se eu fosse você, eu …", "l2", ["If I were you, I'd talk to her.", "Se eu fosse você, eu falaria com ela."], { note: "Com if, usa-se were para todas as pessoas.", tags: ["chunk"] }),
    concept("what-would-you-do", "phrase", "What would you do if …?", "O que você faria se …?", "l2", ["What would you do if you lost your passport?", "O que você faria se perdesse o passaporte?"]),
    concept("wish-past", "pattern", "I wish I had … / I wish I were …", "Queria ter … / Queria ser …", "l3", ["I wish I had a bigger apartment.", "Queria ter um apartamento maior."], { note: "wish + passado simples: desejo sobre o presente." }),
    concept("wish-could", "pattern", "I wish I could …", "Queria poder …", "l3", ["I wish I could play the guitar.", "Queria saber tocar violão."]),
    concept("first-vs-second", "pattern", "If I have … I will … / If I had … I would …", "possibilidade real × situação imaginária", "l4", ["If it rains, I'll stay home. If I were rich, I'd travel more.", "Se chover, fico em casa. Se eu fosse rico, viajaria mais."]),
    concept("could-result", "pattern", "If …, I could …", "Se …, eu poderia …", "l4", ["If I spoke French, I could work in Paris.", "Se eu falasse francês, poderia trabalhar em Paris."]),
    concept("pretend", "word", "pretend / intend", "fingir / pretender", "l4", ["He pretended to be asleep.", "Ele fingiu que estava dormindo."], { note: "Falso cognato: pretend é fingir. “Pretender” é intend ou plan to.", tags: ["false-friend"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Se eu tivesse…",
      objective: "Você vai conseguir falar de situações imaginárias no presente.",
      minutes: 10,
      context: { kind: "dialogue", title: "Sonhando acordado", lines: [
        { who: "Nina", en: "What would you do if you had a year off?", pt: "O que você faria se tivesse um ano de folga?" },
        { who: "Caio", en: "If I had a year off, I would travel around South America.", pt: "Se eu tivesse um ano de folga, viajaria pela América do Sul." },
        { who: "Nina", en: "I'd stay home and write a book. I wouldn't travel much.", pt: "Eu ficaria em casa e escreveria um livro. Não viajaria muito." },
        { who: "Caio", en: "If we didn't have to work, life would be very different!", pt: "Se a gente não tivesse que trabalhar, a vida seria muito diferente!" },
      ] },
      explanation: {
        summary: "A **segunda condicional** fala de algo **imaginário ou improvável** agora:\n- **If** + passado simples, **would** + verbo base\n- *If I **had** more time, I **would learn** to cook.*\n\nO verbo está no passado, mas o sentido é **presente**: eu não tenho tempo agora.",
        details: "**Would** não muda com a pessoa e contrai para **'d**: *I'd, you'd, she'd*. A negativa é **wouldn't**. Nunca coloque would na parte do if: “If I would have time” está errado. A ordem pode inverter: *I would learn to cook if I had more time* (sem vírgula).",
        examples: [
          { en: "If I lived near the beach, I'd swim every day.", pt: "Se eu morasse perto da praia, nadaria todo dia." },
          { en: "She wouldn't work here if she had a choice.", pt: "Ela não trabalharia aqui se tivesse escolha." },
          { en: "What would you buy if you had the money?", pt: "O que você compraria se tivesse o dinheiro?" },
        ],
        contrasts: [
          { wrong: "If I would have time, I would help.", right: "If I had time, I would help.", why: "Depois de if: passado simples, sem would." },
          { wrong: "If I had a car, I will drive to work.", right: "If I had a car, I would drive to work.", why: "Situação imaginária pede would." },
        ],
      },
      guided: [
        mc("e1", "Choose: “If I ___ more time, I would learn to cook.”", ["had", "have", "would have"], 0, "If + passado simples.", { c: ["second-cond"] }),
        mc("e2", "“If I lived near the beach, I'd swim every day.” Does the speaker live near the beach?", ["No", "Yes", "We can't know"], 0, "A segunda condicional fala de algo que não é real agora.", { c: ["second-cond"], keepOrder: true }),
        match("e3", "Match the two halves.", [["If I had a car,", "I would drive to work."], ["If she spoke Spanish,", "she would apply for the job."], ["If we didn't work,", "we would travel more."], ["If it weren't so far,", "I would visit you."]],
          "If + passado, would + verbo base.", { c: ["second-cond", "would-base"], s: "grammar", pt: "Associe as duas metades." }),
      ],
      independent: [
        cloze("e4", "If I had a year off, I ___ travel around South America.", ["would", "'d"], "Resultado imaginário: would.", { c: ["would-base"] }),
        cloze("e5", "If we ___ have to work, life would be very different.", ["didn't", "did not"], "If + passado simples negativo.", { c: ["second-cond"], cue: "(not)" }),
        fix("e6", "If I would have more money, I would move.", ["If I had more money, I would move", "If I had more money, I'd move"], "Sem would depois de if.", { c: ["second-cond"], prompt: "Fix the mistake." }),
        order("e7", "Put the words in order: “Eu compraria uma casa perto da praia.”", "I would buy a house near the beach.", "Would + verbo base.", { c: ["would-base"], extra: ["to"] }),
        dict("e8", "If I had more time, I would learn to cook.", "If + passado, would + base.", { c: ["second-cond"], alt: ["If I had more time, I'd learn to cook."] }),
      ],
      application: [
        type("e9", "Say in English: “Ela não trabalharia aqui se tivesse escolha.”", ["She wouldn't work here if she had a choice", "She would not work here if she had a choice", "If she had a choice, she wouldn't work here", "If she had a choice, she would not work here"], "Wouldn't + verbo base.", { c: ["would-base", "second-cond"] }),
        speak("e10", "What would you do if you had a year off? Say three sentences.", ["If I had a year off, I would travel around Brazil. I would visit my family in the north. I wouldn't check my email."],
          { mode: "respond", check: ["Usei if + passado simples.", "Usei would + verbo base.", "Incluí uma frase com wouldn't."], c: ["second-cond", "would-base"] }),
      ],
      summary: { points: ["If + passado simples, would + verbo base.", "O sentido é presente e imaginário.", "Sem would depois de if."], concepts: ["second-cond", "would-base"] },
    }),

    lesson("l2", {
      title: "Se eu fosse você",
      objective: "Você vai conseguir dar conselhos e perguntar o que alguém faria.",
      minutes: 9,
      context: { kind: "dialogue", title: "Um conselho", lines: [
        { who: "Duda", en: "My boss offered me a job in another city. What would you do?", pt: "Meu chefe me ofereceu uma vaga em outra cidade. O que você faria?" },
        { who: "Paulo", en: "If I were you, I'd ask for more details first.", pt: "Se eu fosse você, pediria mais detalhes primeiro." },
        { who: "Duda", en: "And if the salary were the same?", pt: "E se o salário fosse o mesmo?" },
        { who: "Paulo", en: "Then I wouldn't accept. Moving is expensive.", pt: "Aí eu não aceitaria. Mudar-se é caro." },
      ] },
      explanation: {
        summary: "Para **dar conselho**:\n- **If I were you, I would** + verbo base\n- **I wouldn't** + verbo base (eu não faria isso)\n\nPara **pedir**:\n- **What would you do?**\n- **What would you do if** + passado?",
        details: "Na condicional, o verbo be vira **were** para todas as pessoas: *If I were, if she were, if it were*. Na fala informal você ouvirá “If I was”, mas *If I were you* é uma expressão fixa. É um conselho mais suave do que *You should…*.",
        examples: [
          { en: "If I were you, I wouldn't sign it.", pt: "Se eu fosse você, não assinaria." },
          { en: "What would you do if you lost your job?", pt: "O que você faria se perdesse o emprego?" },
          { en: "If he were here, he would know the answer.", pt: "Se ele estivesse aqui, saberia a resposta." },
        ],
        contrasts: [
          { wrong: "If I was you, I will talk to her.", right: "If I were you, I would talk to her.", why: "Expressão fixa com were e would." },
          { wrong: "What you would do?", right: "What would you do?", why: "Na pergunta, would vem antes do sujeito." },
        ],
      },
      guided: [
        mc("e1", "Choose: “If I ___ you, I'd ask for more details.”", ["were", "am", "would be"], 0, "If I were you.", { c: ["if-i-were"] }),
        mc("e2", "“If I were you, I wouldn't sign it.” What is the speaker doing?", ["Giving advice", "Describing the past", "Making a promise"], 0, "If I were you = conselho.", { c: ["if-i-were"] }),
        order("e3", "Put the words in order: “O que você faria?”", "What would you do?", "Would antes do sujeito.", { c: ["what-would-you-do"] }),
      ],
      independent: [
        cloze("e4", "If I ___ you, I would call the bank.", ["were"], "If I were you.", { c: ["if-i-were"] }),
        cloze("e5", "What ___ you do if you lost your passport?", ["would"], "What would you do if…?", { c: ["what-would-you-do"] }),
        fix("e6", "What you would do if you won the lottery?", ["What would you do if you won the lottery"], "Would antes do sujeito.", { c: ["what-would-you-do"], prompt: "Fix the question." }),
        dict("e7", "If I were you, I'd talk to her.", "Conselho com If I were you.", { c: ["if-i-were"], alt: ["If I were you, I would talk to her."] }),
        fix("e8", "If I were you, I will not accept the offer.", ["If I were you, I wouldn't accept the offer", "If I were you, I would not accept the offer"], "Com If I were you, usa-se would.", { c: ["if-i-were"], prompt: "Fix the mistake." }),
      ],
      application: [
        type("e9", "Ask in English: “O que você faria se perdesse o emprego?”", ["What would you do if you lost your job"], "What would you do if + passado?", { c: ["what-would-you-do"] }),
        dialog("e10", "A friend has a problem and asks for advice.", [
          { npc: ["My landlord wants to raise the rent by 30%. What would you do?", "Meu senhorio quer aumentar o aluguel em 30%. O que você faria?"], options: [
            ["If I were you, I'd try to negotiate first.", true, "Seu amigo gosta da ideia.", "Conselho suave com If I were you."],
            ["If I was you, I will negotiate.", false, "Ele entende, mas a frase está errada.", "If I were you, I would…"],
          ] },
          { npc: ["And if he said no?", "E se ele dissesse não?"], options: [
            ["Then I would look for another apartment. I wouldn't pay that much.", true, "Ele começa a procurar.", "Would e wouldn't."],
            ["Then I look another apartment.", false, "Soa como um fato, não um conselho.", "Falta would e a preposição for."],
          ] },
        ], "Pedir e dar conselho sobre uma situação imaginada.", { c: ["if-i-were", "what-would-you-do"] }),
      ],
      summary: { points: ["If I were you, I would…", "I wouldn't… = eu não faria.", "What would you do if + passado?"], concepts: ["if-i-were", "what-would-you-do"] },
    }),

    lesson("l3", {
      title: "Quem me dera: I wish",
      objective: "Você vai conseguir falar do que gostaria que fosse diferente agora.",
      minutes: 9,
      context: { kind: "text", title: "Domingo à noite", lines: [
        { en: "I wish I had one more day off.", pt: "Queria ter mais um dia de folga." },
        { en: "I wish I lived closer to work.", pt: "Queria morar mais perto do trabalho." },
        { en: "I wish I could sleep until ten tomorrow.", pt: "Queria poder dormir até as dez amanhã." },
        { en: "I wish it weren't so cold.", pt: "Queria que não estivesse tão frio." },
      ] },
      explanation: {
        summary: "**I wish** expressa um desejo sobre algo que **não é verdade agora**:\n- **I wish I had** … (queria ter)\n- **I wish I were** … (queria ser/estar)\n- **I wish I could** … (queria poder/saber)\n\nComo na segunda condicional, o verbo vai para o **passado**, mas o sentido é presente.",
        details: "Compare: *I hope I pass the test* (é possível) × *I wish I spoke Japanese* (não falo). Depois de wish também se usa **were** para todas as pessoas: *I wish it were Friday*. Não use would para falar de você mesmo: “I wish I would have” está errado.",
        examples: [
          { en: "I wish I spoke Japanese.", pt: "Queria falar japonês." },
          { en: "She wishes she had a garden.", pt: "Ela queria ter um jardim." },
          { en: "I wish I could help you.", pt: "Queria poder te ajudar." },
        ],
        contrasts: [
          { wrong: "I wish I have more time.", right: "I wish I had more time.", why: "Depois de wish: passado." },
          { wrong: "I wish I can swim.", right: "I wish I could swim.", why: "Can vira could." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I wish I ___ more time.”", ["had", "have", "will have"], 0, "Wish + passado simples.", { c: ["wish-past"] }),
        mc("e2", "“I wish I spoke Japanese.” Does the speaker speak Japanese?", ["No", "Yes", "A little"], 0, "Wish fala do que não é verdade.", { c: ["wish-past"], keepOrder: true }),
        match("e3", "Match the situation to the wish.", [["My apartment is small.", "I wish I had a bigger apartment."], ["I can't drive.", "I wish I could drive."], ["It's Monday.", "I wish it were Friday."], ["I live far away.", "I wish I lived closer."]],
          "O desejo é o contrário da situação real.", { c: ["wish-past", "wish-could"], pt: "Associe a situação ao desejo." }),
      ],
      independent: [
        cloze("e4", "I wish I ___ sleep until ten tomorrow.", ["could"], "Wish + could.", { c: ["wish-could"] }),
        cloze("e5", "I wish I ___ closer to work.", ["lived"], "Wish + passado simples.", { c: ["wish-past"], cue: "(live)" }),
        fix("e6", "I wish I can play the guitar.", ["I wish I could play the guitar"], "Can vira could depois de wish.", { c: ["wish-could"], prompt: "Fix the mistake." }),
        dict("e7", "I wish I had one more day off.", "Wish + had.", { c: ["wish-past"] }),
        order("e8", "Put the words in order: “Queria poder te ajudar.”", "I wish I could help you.", "I wish I could + verbo base.", { c: ["wish-could"], extra: ["can"] }),
      ],
      application: [
        type("e9", "Say in English: “Queria ter um jardim.”", ["I wish I had a garden"], "I wish I had…", { c: ["wish-past"] }),
        write("e10", "Write three wishes about your life now: one with had, one with could and one with were or another verb.",
          { frame: ["I wish I had …", "I wish I could …", "I wish …"], min: 18, check: ["Usei o passado depois de wish.", "Usei could, e não can.", "Os três desejos são sobre o presente."], model: "I wish I had more time to read. I wish I could speak English without thinking. I wish my family lived in the same city.", c: ["wish-past", "wish-could"] }),
      ],
      summary: { points: ["I wish + passado = desejo sobre o presente.", "can → could.", "were para todas as pessoas."], concepts: ["wish-past", "wish-could"] },
    }),

    lesson("l4", {
      title: "Real ou imaginário?",
      objective: "Você vai conseguir escolher entre a primeira e a segunda condicional e usar could no resultado.",
      minutes: 10,
      context: { kind: "text", title: "Dois planos", lines: [
        { en: "If I get the promotion, I'll buy a new computer. (It's possible: the interview is on Friday.)", pt: "Se eu conseguir a promoção, compro um computador novo. (É possível: a entrevista é sexta.)" },
        { en: "If I owned the company, I'd give everyone Fridays off. (I'm only imagining.)", pt: "Se eu fosse dono da empresa, daria a sexta de folga a todos. (Só estou imaginando.)" },
        { en: "If I spoke French, I could work in Paris.", pt: "Se eu falasse francês, poderia trabalhar em Paris." },
        { en: "My brother pretends to like his job, but he intends to leave next year.", pt: "Meu irmão finge gostar do emprego, mas pretende sair no ano que vem." },
      ] },
      explanation: {
        summary: "Escolha conforme a **chance real**:\n- **Possível:** If + presente, **will** → *If it rains, I'll stay home.*\n- **Imaginário:** If + passado, **would** → *If I were rich, I'd travel more.*\n\nNo resultado imaginário, **could** = poderia: *If I had a car, I could visit you.*",
        details: "A mesma ideia pode mudar de condicional conforme a sua visão: quem comprou um bilhete pode dizer *If I win…*; quem só sonha diz *If I won…*. Atenção ao falso cognato: **pretend** é fingir; para “pretender”, use **intend to** ou **plan to**.",
        examples: [
          { en: "If I see him, I'll tell him.", pt: "Se eu o vir, aviso." },
          { en: "If I saw a ghost, I would run.", pt: "Se eu visse um fantasma, correria." },
          { en: "I intend to finish the course this year.", pt: "Pretendo terminar o curso este ano." },
        ],
        contrasts: [
          { wrong: "I pretend to travel in July. (= pretendo)", right: "I intend to travel in July.", why: "Pretend é fingir." },
          { wrong: "If I had a car, I can visit you.", right: "If I had a car, I could visit you.", why: "Resultado imaginário: could." },
        ],
      },
      guided: [
        mc("e1", "You have a job interview tomorrow. Which sentence fits?", ["If I get the job, I'll celebrate.", "If I got the job, I'd celebrate.", "If I would get the job, I celebrate."], 0, "É uma possibilidade real: primeira condicional.", { c: ["first-vs-second"] }),
        mc("e2", "“He pretended to be sick.” What did he do?", ["Fingiu estar doente", "Pretendeu ficar doente", "Ficou doente"], 0, "Pretend = fingir.", { c: ["pretend"], s: "vocabulary" }),
        match("e3", "Real possibility or imagination?", [["If it rains, I'll take a taxi.", "possibilidade real"], ["If I were a bird, I'd fly south.", "pura imaginação"], ["If she calls, I'll tell you.", "pode acontecer hoje"], ["If I had a million dollars, I'd retire.", "improvável agora"]],
          "Presente + will para o possível; passado + would para o imaginário.", { c: ["first-vs-second"], s: "grammar", pt: "Possibilidade real ou imaginação?" }),
      ],
      independent: [
        cloze("e4", "If I spoke French, I ___ work in Paris.", ["could", "would"], "Resultado imaginário: could ou would.", { c: ["could-result"] }),
        cloze("e5", "I ___ to finish the course this year.", ["intend", "plan"], "Pretender = intend to.", { c: ["pretend"], s: "vocabulary", cue: "(pretendo)", t: [["pretend", "Pretend é fingir. Para “pretender”, use intend ou plan."]] }),
        fix("e6", "If I had a car, I can visit you every week.", ["If I had a car, I could visit you every week"], "Resultado imaginário: could.", { c: ["could-result"], prompt: "Fix the mistake." }),
        cloze("e7", "If I ___ the company, I'd give everyone Fridays off.", ["owned", "ran"], "Imaginário: if + passado.", { c: ["first-vs-second"], cue: "(own)" }),
        dict("e8", "If I spoke French, I could work in Paris.", "If + passado, could + base.", { c: ["could-result"] }),
      ],
      application: [
        type("e9", "Say in English: “Ele fingiu que não me viu.”", ["He pretended he didn't see me", "He pretended not to see me", "He pretended that he didn't see me", "He pretended he did not see me"], "Pretend = fingir.", { c: ["pretend"] }),
        fix("e10", "If I will have time tomorrow, I would call you.", ["If I have time tomorrow, I'll call you", "If I have time tomorrow, I will call you"], "Amanhã é possível: if + presente, will.", { c: ["first-vs-second"], prompt: "It's a real plan for tomorrow. Fix the sentence." }),
        speak("e11", "Say one real plan and one imaginary situation about your life.", ["If I finish work early today, I'll go to the gym. If I lived in another country, I could learn a new language."],
          { mode: "respond", check: ["A frase real usa presente + will.", "A frase imaginária usa passado + would ou could.", "As duas situações são claramente diferentes."], c: ["first-vs-second", "could-result"] }),
      ],
      summary: { points: ["Possível: if + presente, will.", "Imaginário: if + passado, would/could.", "pretend = fingir; pretender = intend."], concepts: ["first-vs-second", "could-result", "pretend"] },
    }),
  ],

  checkpoint: {
    intro: "New imaginary situations, advice and wishes. Decide what is real and what is only imagined.",
    a: [
      cloze("q1", "If I ___ a bigger kitchen, I would cook more.", ["had"], "If + passado simples.", { c: ["second-cond"], cue: "(have)" }),
      mc("q2", "Choose the advice.", ["If I were you, I'd see a doctor.", "If I am you, I see a doctor.", "If I would be you, I'd see a doctor."], 0, "If I were you, I'd…", { c: ["if-i-were"] }),
      fix("q3", "I wish I have a dog.", ["I wish I had a dog"], "Wish + passado simples.", { c: ["wish-past"], prompt: "Fix the mistake." }),
      dict("q4", "What would you do if you found a wallet?", "What would you do if + passado?", { c: ["what-would-you-do"] }),
      type("q5", "Say in English: “Queria poder ficar mais.”", ["I wish I could stay longer", "I wish I could stay more"], "I wish I could…", { c: ["wish-could"] }),
      mc("q6", "The weather forecast says 80% chance of rain. Choose:", ["If it rains, we'll cancel the picnic.", "If it rained, we'd cancel the picnic.", "If it will rain, we cancel the picnic."], 0, "Possibilidade real: primeira condicional.", { c: ["first-vs-second"] }),
      order("q7", "Put the words in order: “Eu não diria isso.”", "I wouldn't say that.", "Wouldn't + verbo base.", { c: ["would-base"], extra: ["to"] }),
      cloze("q8", "If we had a bigger budget, we ___ hire two more people.", ["could", "would"], "Resultado imaginário: could ou would.", { c: ["could-result"] }),
      mc("q9", "“She pretends to understand.” What does it mean?", ["Ela finge entender.", "Ela pretende entender.", "Ela precisa entender."], 0, "Pretend = fingir.", { c: ["pretend"], s: "vocabulary" }),
      dialog("q10", "A colleague is thinking about quitting to open a cafe.", [
        { npc: ["I'm tired of this job. What would you do?", "Estou cansado deste emprego. O que você faria?"], options: [
          ["If I were you, I'd save some money first.", true, "Ele concorda que é prudente.", "Conselho com If I were you."],
          ["If I would be you, I save money.", false, "A frase está errada.", "If I were you, I would…"],
        ] },
        { npc: ["I wish I had more courage.", "Queria ter mais coragem."], options: [
          ["If you had a clear plan, you would feel safer.", true, "Ele decide escrever um plano.", "Segunda condicional correta."],
          ["If you will have a plan, you feel safer.", false, "Soa estranho.", "If + passado, would."],
        ] },
      ], "Aconselhar alguém sobre uma mudança.", { c: ["if-i-were", "second-cond", "wish-past"] }),
    ],
    b: [
      cloze("q1", "If she ___ in Rio, she would go to the beach every weekend.", ["lived"], "If + passado simples.", { c: ["second-cond"], cue: "(live)" }),
      mc("q2", "Choose the correct question.", ["What would you do if you were the boss?", "What you would do if you are the boss?", "What will you do if you were the boss?"], 0, "What would you do if + passado?", { c: ["what-would-you-do"] }),
      fix("q3", "I wish I can travel more.", ["I wish I could travel more"], "Can vira could depois de wish.", { c: ["wish-could"], prompt: "Fix the mistake." }),
      dict("q4", "If I were you, I wouldn't buy that car.", "Conselho negativo.", { c: ["if-i-were"], alt: ["If I were you, I would not buy that car."] }),
      type("q5", "Say in English: “Queria que fosse sexta-feira.”", ["I wish it were Friday", "I wish it was Friday"], "I wish it were…", { c: ["wish-past"] }),
      mc("q6", "You have no plans to move abroad; you are only dreaming. Choose:", ["If I moved abroad, I'd miss my family.", "If I move abroad, I'll miss my family.", "If I would move abroad, I miss my family."], 0, "Só imaginação: segunda condicional.", { c: ["first-vs-second"] }),
      order("q7", "Put the words in order: “Ela ajudaria você.”", "She would help you.", "Would + verbo base.", { c: ["would-base"], extra: ["helps"] }),
      cloze("q8", "If I had the day off, I ___ go with you, but I have to work.", ["could", "would"], "Resultado imaginário: could ou would.", { c: ["could-result"] }),
      cloze("q9", "We ___ to open a second store next year.", ["intend", "plan"], "Pretender = intend to.", { c: ["pretend"], s: "vocabulary", cue: "(pretendemos)", t: [["pretend", "Pretend é fingir. Use intend ou plan."]] }),
      dialog("q10", "A friend is unhappy with where they live.", [
        { npc: ["I wish I lived in a quieter place.", "Queria morar em um lugar mais tranquilo."], options: [
          ["Where would you live if you could choose?", true, "Ele pensa em uma cidade pequena.", "Pergunta imaginária correta."],
          ["Where you will live if you can choose?", false, "A pergunta está errada.", "Where would you live if you could…"],
        ] },
        { npc: ["Maybe a small town near the mountains. But my job is here.", "Talvez uma cidade pequena perto das montanhas. Mas meu emprego é aqui."], options: [
          ["If you worked from home, you could live anywhere.", true, "Ele decide falar com o chefe.", "If + passado, could."],
          ["If you work from home, you could lived anywhere.", false, "Mistura de tempos.", "Worked… could live."],
        ] },
      ], "Conversar sobre um desejo e imaginar uma solução.", { c: ["what-would-you-do", "could-result", "wish-past"] }),
    ],
    production: write("t1", "Write about 60 words: “If I could change one thing about my city, …” Say what you would change, why, and what would be different. Include one wish.",
      { mode: "argument", min: 50, check: ["Usei if + passado e would no resultado.", "Não coloquei would depois de if.", "Incluí um desejo com I wish + passado.", "Expliquei o motivo.", "Descrevi o que seria diferente."],
        model: "If I could change one thing about my city, I would improve public transport. The main reason is that people spend hours in traffic every day. If we had more subway lines, we could get home earlier and the air would be cleaner. I wish the city had safe bike lanes too. Life would be much calmer.", c: ["second-cond", "would-base", "wish-past", "could-result"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Se eu ganhasse muito dinheiro",
      goal: "Ler um texto sobre situações imaginárias e separar o que é real do que é imaginado.",
      context: { kind: "text", title: "A daydream", lines: [
        { en: "If I won a lot of money, I wouldn't stop working. I would work fewer hours and I would travel twice a year.", pt: "Se eu ganhasse muito dinheiro, não pararia de trabalhar. Trabalharia menos horas e viajaria duas vezes por ano." },
        { en: "I wish I had more free time now.", pt: "Queria ter mais tempo livre agora." },
        { en: "If I were younger, I would study music, but I don't regret my choices.", pt: "Se eu fosse mais novo, estudaria música, mas não me arrependo das minhas escolhas." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "Would the writer stop working?", ["No, but they would work fewer hours.", "Yes, immediately.", "Yes, after a year."], 0, "I wouldn't stop working. I would work fewer hours.", { c: ["would-base"] }),
        rd("r2", PASSAGE, "Does the writer have a lot of free time now?", ["No", "Yes", "The text doesn't say"], 0, "I wish I had more free time: não tem.", { c: ["wish-past"], keepOrder: true }),
        cloze("r3", "If I ___ younger, I would study music.", ["were", "was"], "If I were…", { c: ["if-i-were"], s: "reading" }),
        type("r4", "Complete from the text: If I won a lot of money, I ___ stop working.", ["wouldn't", "would not"], "Wouldn't + verbo base.", { c: ["would-base"], passage: PASSAGE }),
      ],
    }),
    listening: activity("listening", {
      title: "Conselhos no rádio",
      goal: "Entender um problema e o conselho dado.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "My roommate never cleans the kitchen. I wish I could live alone, but I can't afford it. If I were you, I would make a cleaning schedule and talk to him calmly.", pt: "Meu colega de apartamento nunca limpa a cozinha. Queria poder morar sozinho, mas não tenho dinheiro. Se eu fosse você, faria uma escala de limpeza e falaria com ele com calma." }] },
      exercises: [
        listen("a1", "My roommate never cleans the kitchen. I wish I could live alone, but I can't afford it.", "Why doesn't the speaker live alone?", ["It is too expensive", "They don't want to", "The roommate is a friend"], 0, "I can't afford it.", { c: ["wish-could"] }),
        listen("a2", "If I were you, I would make a cleaning schedule and talk to him calmly.", "What is the advice?", ["Make a schedule and talk calmly", "Move out immediately", "Clean everything alone"], 0, "Make a cleaning schedule and talk to him calmly.", { c: ["if-i-were"] }),
        dict("a3", "I wish I could live alone.", "I wish I could + verbo base.", { c: ["wish-could"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Uma resposta com conselho",
      goal: "Responder por escrito a alguém que pede conselho.",
      exercises: [
        write("w1", "A friend writes: “I hate my job, but it pays well. What would you do?” Reply in about 45 words with advice.",
          { mode: "free", min: 35, check: ["Usei If I were you, I would.", "Dei pelo menos dois conselhos.", "Usei wouldn't em uma frase.", "Não coloquei would depois de if."], model: "If I were you, I wouldn't quit right now. I would look for a new job first and save some money. If I found something interesting, I would talk to my family and then decide. I wish I could give you a simple answer, but it is a big decision.", c: ["if-i-were", "would-base", "second-cond"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Três situações imaginárias",
      goal: "Responder em voz alta a perguntas com “What would you do if…?”.",
      exercises: [
        speak("s1", "Answer out loud: What would you do if you found a phone on the street? What would you do if you could live anywhere? What do you wish you could do?", ["If I found a phone on the street, I would try to call the owner. If I could live anywhere, I'd live near the sea. I wish I could play the piano."],
          { mode: "respond", check: ["Respondi às três perguntas.", "Usei would + verbo base.", "Usei I wish I could.", "Ouvi o modelo e comparei."], c: ["second-cond", "what-would-you-do", "wish-could"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: aconselhar um amigo",
      goal: "Ouvir um problema, perguntar, aconselhar e imaginar consequências.",
      exercises: [
        dialog("m1", "A friend received an offer to study abroad for a year.", [
          { npc: ["I got the scholarship, but I'm scared. What would you do?", "Consegui a bolsa, mas estou com medo. O que você faria?"], options: [
            ["If I were you, I would go. It's a great chance.", true, "Seu amigo sorri, ainda inseguro.", "Conselho direto e gentil."],
            ["If I was you, I will go.", false, "Ele entende, mas a frase está errada.", "If I were you, I would…"],
          ] },
          { npc: ["But I'd miss my family. I wish they could come with me.", "Mas eu sentiria falta da minha família. Queria que eles pudessem vir comigo."], options: [
            ["I understand. If you called them every week, it would be easier.", true, "Ele concorda.", "Segunda condicional para imaginar a solução."],
            ["If you will call them, it is easier.", false, "Soa estranho.", "If + passado, would."],
          ] },
          { npc: ["And if I don't like it there?", "E se eu não gostar de lá?"], options: [
            ["If you don't like it, you'll come back. It's only a year.", true, "Ele decide aceitar.", "Possibilidade real: primeira condicional."],
            ["If you didn't like it, you come back.", false, "Mistura de tempos.", "If you don't… you'll…"],
          ] },
        ], "Aconselhar: imaginar, sugerir e tranquilizar.", { c: ["if-i-were", "second-cond", "first-vs-second"] }),
        type("m2", "Say in English: “Se eu fosse você, eu aceitaria.”", ["If I were you, I would accept", "If I were you, I'd accept", "If I were you, I would accept it", "If I were you, I'd accept it"], "If I were you, I would…", { c: ["if-i-were"] }),
      ],
      outside: {
        title: "Fora do app: três “e se”",
        instructions: "Escreva ou diga em voz alta três frases sobre a sua vida: uma possibilidade real para esta semana (If I…, I'll…), uma situação imaginária (If I…, I would…) e um desejo (I wish I…). Se puder, pergunte a alguém: “What would you do if you had a year off?”.",
        checklist: ["Fiz uma frase real com will.", "Fiz uma frase imaginária com would.", "Fiz um desejo com I wish + passado.", "Não usei would depois de if."],
      },
    }),
  },
});
