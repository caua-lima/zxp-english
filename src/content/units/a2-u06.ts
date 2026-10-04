/** A2 · Unidade 6 — Planos e intenções: going to, will e planos combinados. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u06",

  concepts: [
    concept("going-to", "pattern", "I'm going to study.", "Eu vou estudar.", "l1", ["We're going to travel in July.", "Vamos viajar em julho."], { note: "be + going to + verbo: plano já decidido." }),
    concept("going-to-q", "pattern", "Are you going to …? / I'm not going to …", "Você vai …? / Não vou …", "l1", ["What are you going to do?", "O que você vai fazer?"]),
    concept("will-decide", "pattern", "I'll have the fish.", "Vou querer o peixe. (decisão na hora)", "l2", ["OK, I'll call her now.", "Tá, vou ligar para ela agora."], { note: "will + verbo: decisão tomada no momento da fala." }),
    concept("will-offer", "pattern", "I'll help you. / I'll call you.", "Eu te ajudo. / Eu te ligo.", "l2", ["Don't worry, I'll help you.", "Não se preocupe, eu te ajudo."], { note: "Ofertas e promessas usam will." }),
    concept("wont", "pattern", "I won't forget.", "Não vou esquecer.", "l2", ["I won't be late.", "Não vou me atrasar."], { note: "won't = will not." }),
    concept("arrangement", "pattern", "I'm meeting Ana at six.", "Vou encontrar a Ana às seis. (combinado)", "l3", ["We're having dinner with them on Friday.", "Vamos jantar com eles na sexta."], { note: "Presente contínuo + hora/dia = compromisso marcado." }),
    concept("future-markers", "word", "tomorrow, next week, in two days, tonight", "amanhã, semana que vem, em dois dias, hoje à noite", "l3", ["See you next week.", "Até a semana que vem."]),
    concept("i-think-will", "pattern", "I think it will rain.", "Acho que vai chover.", "l4", ["I don't think she'll come.", "Acho que ela não vem."], { note: "Previsões e opiniões sobre o futuro: will." }),
    concept("make-plan", "phrase", "make a plan / do a course", "fazer um plano / fazer um curso", "l4", ["I'm going to do a cooking course.", "Vou fazer um curso de culinária."], { tags: ["collocation"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "O que você vai fazer?",
      objective: "Você vai conseguir falar de planos e intenções com going to.",
      minutes: 9,
      context: { kind: "dialogue", title: "Planos para as férias", lines: [
        { who: "Ken", en: "What are you going to do on your vacation?", pt: "O que você vai fazer nas férias?" },
        { who: "Bia", en: "I'm going to visit my grandparents. Then we're going to travel to the coast.", pt: "Vou visitar meus avós. Depois vamos viajar para o litoral." },
        { who: "Ken", en: "Are you going to drive?", pt: "Vocês vão de carro?" },
        { who: "Bia", en: "No, we aren't going to drive. We're going to take the bus.", pt: "Não, não vamos de carro. Vamos de ônibus." },
      ] },
      explanation: {
        summary: "Para **planos e intenções** já decididos, use **be + going to + verbo**:\n- *I'm going to study tonight.*\n- *She's going to buy a car.*\n\nNegativa: **I'm not going to…** Pergunta: **Are you going to…?** / **What are you going to do?**",
        details: "É parecido com o nosso “vou + verbo”. Só não esqueça o verbo **to be**: *I'm going to*, e não “I going to”. Na fala informal, *going to* vira **gonna**: *I'm gonna call you*. Entenda quando ouvir, mas escreva *going to*.",
        examples: [
          { en: "I'm going to cook tonight.", pt: "Vou cozinhar hoje à noite." },
          { en: "They're going to move in May.", pt: "Eles vão se mudar em maio." },
          { en: "Are you going to call him?", pt: "Você vai ligar para ele?" },
        ],
        contrasts: [
          { wrong: "I going to study.", right: "I'm going to study.", why: "Falta o verbo to be." },
          { wrong: "I'm going study.", right: "I'm going to study.", why: "Depois de going vem to." },
        ],
        tip: "**Gonna** não é erro: é como *going to* soa na fala rápida. *I'm gonna study* = *I'm going to study*.",
      },
      guided: [
        mc("e1", "Which sentence is correct?", ["I'm going to study tonight.", "I going to study tonight.", "I'm going study tonight."], 0, "be + going to + verbo.", { c: ["going-to"], pt: "Qual frase está correta?" }),
        match("e2", "Associe a frase ao significado.", [["I'm going to travel.", "Vou viajar."], ["I'm not going to travel.", "Não vou viajar."], ["Are you going to travel?", "Você vai viajar?"], ["What are you going to do?", "O que você vai fazer?"]],
          "Afirmativa, negativa e perguntas com going to.", { c: ["going-to", "going-to-q"] }),
        cloze("e3", "She ___ going to buy a car.", ["is", "'s"], "Com she: is going to.", { c: ["going-to"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "We're going ___ take the bus.", ["to"], "Going to + verbo.", { c: ["going-to"] }),
        order("e5", "Put the words in order: “O que você vai fazer?”", "What are you going to do?", "What + are + you + going to + do.", { c: ["going-to-q"], extra: ["will"] }),
        fix("e6", "He going to visit his parents.", ["He is going to visit his parents", "He's going to visit his parents"], "Falta o verbo to be: He is going to.", { c: ["going-to"], prompt: "Corrija o erro." }),
        dict("e7", "Are you going to drive?", "Pergunta com going to.", { c: ["going-to-q"] }),
      ],
      application: [
        type("e8", "Say in English: “Eu não vou trabalhar amanhã.”", ["I'm not going to work tomorrow", "I am not going to work tomorrow"], "I'm not going to + verbo.", { c: ["going-to-q"] }),
        speak("e9", "Conte três planos seus para o fim de semana.", ["I'm going to clean my house. I'm going to visit my mother. I'm not going to work."],
          { mode: "respond", check: ["Usei be + going to nas três frases.", "Incluí uma negativa.", "Não esqueci o to."], c: ["going-to"] }),
      ],
      summary: { points: ["be + going to + verbo = plano decidido.", "I'm not going to…; Are you going to…?", "gonna = going to na fala."], concepts: ["going-to", "going-to-q"] },
    }),

    lesson("l2", {
      title: "Decidi agora: I'll…",
      objective: "Você vai conseguir tomar decisões na hora, oferecer ajuda e prometer com will.",
      minutes: 9,
      context: { kind: "dialogue", title: "No restaurante", lines: [
        { who: "Garçom", en: "Are you ready to order?", pt: "Prontos para pedir?" },
        { who: "Ana", en: "Yes. I'll have the chicken, please.", pt: "Sim. Vou querer o frango, por favor." },
        { who: "Leo", en: "Oh no, I forgot my wallet!", pt: "Ah não, esqueci a carteira!" },
        { who: "Ana", en: "Don't worry. I'll pay.", pt: "Não se preocupe. Eu pago." },
        { who: "Leo", en: "Thanks! I won't forget it next time. I'll pay you back tomorrow.", pt: "Obrigado! Não vou esquecer da próxima vez. Te devolvo amanhã." },
      ] },
      explanation: {
        summary: "**Will + verbo** (forma curta **'ll**) serve para:\n- **decisões tomadas agora**: *I'll have the chicken.*\n- **ofertas**: *I'll help you.*\n- **promessas**: *I'll call you tomorrow.*\n\nNegativa: **won't** (will not): *I won't forget.*",
        details: "Compare: *I'm going to buy a car* (já decidi antes) x *OK, I'll buy it* (decidi agora). Will é igual para todas as pessoas e o verbo vem sem to: *She'll come*, nunca “She wills come” ou “She'll to come”.",
        examples: [
          { en: "I'll have a coffee, please.", pt: "Vou querer um café, por favor." },
          { en: "I'll open the door for you.", pt: "Eu abro a porta para você." },
          { en: "We won't be late.", pt: "Não vamos nos atrasar." },
        ],
        contrasts: [
          { wrong: "I pay! (oferecendo)", right: "I'll pay!", why: "Em português usamos o presente; em inglês, a oferta pede will." },
          { wrong: "I'll to call you.", right: "I'll call you.", why: "Depois de will, verbo sem to." },
        ],
        tip: "O **'ll** é fraco: *I'll* soa quase “ail”, *we'll* soa “uíl”. Treine ouvir essa diferença: *I call* x *I'll call*.",
      },
      guided: [
        mc("e1", "Your friend's bag is heavy. What do you say?", ["I'll carry it for you.", "I carry it for you.", "I'm carry it for you."], 0, "Oferta feita na hora: will.", { c: ["will-offer"], pt: "A mala do seu amigo está pesada. O que você diz?" }),
        match("e2", "Associe a frase ao uso de will.", [["I'll have the soup.", "decisão na hora"], ["I'll help you.", "oferta"], ["I'll call you tomorrow.", "promessa"], ["I won't tell anyone.", "promessa negativa"]],
          "Will: decidir, oferecer e prometer.", { c: ["will-decide", "will-offer", "wont"] }),
        cloze("e3", "Don't worry. I ___ pay.", ["will", "'ll"], "Oferta: I'll pay.", { c: ["will-offer"] }),
      ],
      independent: [
        cloze("e4", "I ___ forget your birthday. I promise!", ["won't", "will not"], "Promessa negativa: won't.", { c: ["wont"] }),
        order("e5", "Put the words in order: “Vou querer o peixe, por favor.”", "I'll have the fish, please.", "I'll have + pedido.", { c: ["will-decide"], extra: ["to"] }),
        fix("e6", "I'll to call you tonight.", ["I'll call you tonight", "I will call you tonight"], "Will + verbo sem to.", { c: ["will-offer"], prompt: "Corrija o erro." }),
        dict("e7", "I'll have the chicken, please.", "Decisão na hora, ao pedir.", { c: ["will-decide"], alt: ["I will have the chicken, please."] }),
        listen("e8", "I'll call you tomorrow.", "When will the person call?", ["Tomorrow", "Today", "Every day"], 0, "I'll call = vou ligar (futuro).", { c: ["will-offer"], s: "pronunciation" }),
      ],
      application: [
        type("e9", "The phone is ringing and you decide to answer. Say: “Eu atendo.”", ["I'll get it", "I'll answer it", "I will get it", "I will answer it", "I'll answer"], "Decisão na hora: I'll get it.", { c: ["will-decide"], pt: "O telefone toca e você decide atender." }),
        dialog("e10", "You are at a friend's house, helping before a party.", [
          { npc: ["There are no drinks! What can we do?", "Não tem bebida! O que a gente faz?"], options: [
            ["I'll go to the store.", true, "Ela agradece.", "Decisão e oferta na hora."],
            ["I go to the store.", false, "Soa como hábito, não como oferta.", "Para oferecer: I'll go."],
          ] },
          { npc: ["Thanks! But please don't be late.", "Obrigada! Mas, por favor, não se atrase."], options: [
            ["I won't be late. I'll be back in ten minutes.", true, "Ela fica tranquila.", "Promessas com won't e will."],
            ["I don't be late.", false, "A frase está errada.", "Promessa negativa: I won't be late."],
          ] },
        ], "Oferecer e prometer com will e won't.", { c: ["will-offer", "wont"] }),
      ],
      summary: { points: ["I'll… para decisão na hora, oferta e promessa.", "won't = will not.", "going to = já planejado; will = decidido agora."], concepts: ["will-decide", "will-offer", "wont"] },
    }),

    lesson("l3", {
      title: "Já está combinado",
      objective: "Você vai conseguir falar de compromissos marcados usando o presente contínuo.",
      minutes: 8,
      context: { kind: "dialogue", title: "Conferindo a agenda", lines: [
        { who: "Leo", en: "Are you free tomorrow night?", pt: "Você está livre amanhã à noite?" },
        { who: "Ana", en: "Sorry, I'm meeting my sister at seven.", pt: "Desculpe, vou encontrar minha irmã às sete." },
        { who: "Leo", en: "And next week?", pt: "E na semana que vem?" },
        { who: "Ana", en: "I'm working on Monday, but I'm not doing anything on Tuesday.", pt: "Trabalho na segunda, mas não tenho nada na terça." },
        { who: "Leo", en: "Great. We're having dinner on Tuesday, then.", pt: "Ótimo. Então jantamos na terça." },
      ] },
      explanation: {
        summary: "Para **compromissos já combinados** (com hora, lugar ou pessoa), o inglês usa o **presente contínuo** com um marcador de futuro:\n- *I'm meeting my sister at seven.*\n- *We're having dinner on Tuesday.*\n\nMarcadores: **tomorrow**, **tonight**, **next week**, **in two days**.",
        details: "É o que se diz olhando a agenda. *I'm going to meet her* também está certo; o contínuo só reforça que já está marcado. **In two days** = daqui a dois dias. **Next** não leva the nem preposição: *next week*, e não “in the next week”.",
        examples: [
          { en: "I'm flying to Lima on Friday.", pt: "Viajo para Lima na sexta." },
          { en: "What are you doing tonight?", pt: "O que você vai fazer hoje à noite?" },
          { en: "She's starting a new job next month.", pt: "Ela começa um emprego novo no mês que vem." },
        ],
        contrasts: [
          { wrong: "I meet my sister tomorrow.", right: "I'm meeting my sister tomorrow.", why: "Compromisso pessoal marcado: presente contínuo." },
          { wrong: "See you in the next week.", right: "See you next week.", why: "Next week não leva in nem the." },
        ],
      },
      guided: [
        mc("e1", "You have a doctor's appointment tomorrow at ten. What do you say?", ["I'm seeing the doctor tomorrow at ten.", "I see the doctor tomorrow at ten.", "I seeing the doctor tomorrow."], 0, "Compromisso marcado: presente contínuo.", { c: ["arrangement"], pt: "Você tem consulta amanhã às dez. O que diz?" }),
        match("e2", "Associe o marcador ao significado.", [["tomorrow", "amanhã"], ["tonight", "hoje à noite"], ["next week", "semana que vem"], ["in two days", "daqui a dois dias"]],
          "Marcadores que levam a frase para o futuro.", { c: ["future-markers"] }),
        cloze("e3", "We ___ having dinner on Tuesday.", ["are", "'re"], "Com we: are having.", { c: ["arrangement"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "I'm flying to Lima ___ week.", ["next"], "Next week = semana que vem.", { c: ["future-markers"], s: "vocabulary" }),
        order("e5", "Put the words in order: “O que você vai fazer hoje à noite?”", "What are you doing tonight?", "What + are + you + doing + marcador.", { c: ["arrangement", "future-markers"], extra: ["do"] }),
        dict("e6", "I'm meeting my sister at seven.", "Compromisso com hora marcada.", { c: ["arrangement"], alt: ["I am meeting my sister at seven.", "I'm meeting my sister at 7."] }),
        fix("e7", "See you in the next week.", ["See you next week"], "Next week, sem in nem the.", { c: ["future-markers"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e8", "Say in English: “Ela começa um emprego novo amanhã.”", ["She is starting a new job tomorrow", "She's starting a new job tomorrow", "She starts a new job tomorrow"], "She's starting… tomorrow.", { c: ["arrangement"] }),
        speak("e9", "Diga três compromissos que você tem nos próximos dias.", ["I'm working tomorrow. I'm meeting a friend on Friday. I'm visiting my parents next week."],
          { mode: "respond", check: ["Usei o presente contínuo.", "Incluí um marcador de futuro em cada frase.", "Usei on para dias."], c: ["arrangement", "future-markers"] }),
      ],
      summary: { points: ["Presente contínuo + marcador = compromisso marcado.", "tomorrow, tonight, next week, in two days.", "next week sem the e sem in."], concepts: ["arrangement", "future-markers"] },
    }),

    lesson("l4", {
      title: "O que você acha que vai acontecer?",
      objective: "Você vai conseguir fazer previsões e falar de planos de estudo e de vida.",
      minutes: 9,
      context: { kind: "dialogue", title: "Planos para o ano", lines: [
        { who: "Ken", en: "Do you think you'll pass the exam?", pt: "Você acha que vai passar na prova?" },
        { who: "Bia", en: "I think so. I'm going to do an English course in January.", pt: "Acho que sim. Vou fazer um curso de inglês em janeiro." },
        { who: "Ken", en: "Good idea. I don't think it will be easy.", pt: "Boa ideia. Acho que não vai ser fácil." },
        { who: "Bia", en: "I know. So I'm going to make a study plan.", pt: "Eu sei. Por isso vou fazer um plano de estudos." },
      ] },
      explanation: {
        summary: "Para **previsões e opiniões** sobre o futuro, use **will**, muitas vezes com **I think**:\n- *I think it will rain.*\n- *I don't think she'll come.* (acho que ela não vem)\n\nE para planos: **make a plan** (fazer um plano) e **do a course** (fazer um curso).",
        details: "Em inglês a negação vai no *think*: diz-se **I don't think it will rain**, e não “I think it won't rain” (possível, mas menos natural). Respostas curtas: **I think so** / **I don't think so**.",
        examples: [
          { en: "I think you'll like it.", pt: "Acho que você vai gostar." },
          { en: "I don't think they'll win.", pt: "Acho que eles não vão ganhar." },
          { en: "We need to make a plan.", pt: "Precisamos fazer um plano." },
        ],
        contrasts: [
          { wrong: "I'm going to make a course.", right: "I'm going to do a course.", why: "Curso é do: do a course." },
          { wrong: "I think that it rains tomorrow.", right: "I think it will rain tomorrow.", why: "Previsão pede will." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I'm going to ___ a cooking course.”", ["do", "make", "have got"], 0, "Do a course.", { c: ["make-plan"], s: "vocabulary" }),
        match("e2", "Associe a frase ao significado.", [["I think it will rain.", "Acho que vai chover."], ["I don't think it will rain.", "Acho que não vai chover."], ["I think so.", "Acho que sim."], ["I don't think so.", "Acho que não."]],
          "Previsões com I think + will.", { c: ["i-think-will"] }),
        cloze("e3", "I think you ___ like this movie.", ["will", "'ll"], "Previsão: will.", { c: ["i-think-will"] }),
      ],
      independent: [
        cloze("e4", "We need to ___ a plan before the trip.", ["make"], "Make a plan.", { c: ["make-plan"], s: "vocabulary" }),
        order("e5", "Put the words in order: “Acho que ela não vem.”", "I don't think she will come.", "A negação fica em think.", { c: ["i-think-will"], extra: ["won't"] }),
        fix("e6", "I'm going to make an English course.", ["I'm going to do an English course", "I am going to do an English course", "I'm going to take an English course"], "Do (ou take) a course.", { c: ["make-plan"], prompt: "Corrija o verbo." }),
        dict("e7", "I don't think it will be easy.", "Previsão negativa: I don't think + will.", { c: ["i-think-will"], alt: ["I do not think it will be easy."] }),
      ],
      application: [
        type("e8", "Say in English: “Acho que vai chover amanhã.”", ["I think it will rain tomorrow", "I think it'll rain tomorrow", "I think it's going to rain tomorrow", "I think it is going to rain tomorrow"], "I think it will rain tomorrow.", { c: ["i-think-will"] }),
        write("e9", "Escreva três frases sobre o seu próximo ano: um plano, um curso ou objetivo e uma previsão.",
          { frame: ["Next year I'm going to …", "I'm going to do …", "I think …"], min: 18, check: ["Usei going to para o plano.", "Usei do a course ou make a plan.", "Usei I think + will para a previsão."], model: "Next year I'm going to travel to Chile. I'm going to do a Spanish course first. I think it will be a great year.", c: ["going-to", "make-plan", "i-think-will"] }),
      ],
      summary: { points: ["I think it will… / I don't think it will…", "I think so. / I don't think so.", "make a plan; do a course."], concepts: ["i-think-will", "make-plan"] },
    }),
  ],

  checkpoint: {
    intro: "Plans, decisions and predictions in new situations. Choose the right future form.",
    a: [
      cloze("q1", "We ___ going to move next month.", ["are", "'re"], "We + are going to.", { c: ["going-to"], cue: "(be)" }),
      mc("q2", "The waiter is waiting. You decide now. What do you say?", ["I'll have the soup.", "I'm having the soup next week.", "I have the soup."], 0, "Decisão na hora: I'll have.", { c: ["will-decide"] }),
      fix("q3", "I think it rains tomorrow.", ["I think it will rain tomorrow", "I think it'll rain tomorrow"], "Previsão: will.", { c: ["i-think-will"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Vou encontrar o Leo na sexta.”", "I'm meeting Leo on Friday.", "Compromisso: presente contínuo.", { c: ["arrangement"], extra: ["will"] }),
      dict("q5", "I won't be late.", "Promessa negativa.", { c: ["wont"], alt: ["I will not be late."] }),
      type("q6", "Ask in English: “Você vai viajar?” (plan)", ["Are you going to travel"], "Are you going to + verbo?", { c: ["going-to-q"] }),
      cloze("q7", "See you ___ week!", ["next"], "Next week.", { c: ["future-markers"], s: "vocabulary" }),
      listen("q8", "It's cold in here. I'll close the window.", "What is the person going to do?", ["Close the window", "Open the window", "Leave the room"], 0, "I'll close the window.", { c: ["will-offer"] }),
      mc("q9", "Which is correct?", ["I'm going to do a course.", "I'm going to make a course.", "I'm going to do a plan."], 0, "Do a course; make a plan.", { c: ["make-plan"] }),
      dialog("q10", "A colleague talks to you on Friday afternoon.", [
        { npc: ["What are you doing this weekend?", "O que você vai fazer neste fim de semana?"], options: [
          ["I'm visiting my parents on Saturday.", true, "Ela comenta: “Nice!”", "Compromisso marcado."],
          ["I visit my parents on Saturday.", false, "Soa como hábito.", "Para um plano marcado: I'm visiting."],
        ] },
        { npc: ["I need help with my move on Sunday.", "Preciso de ajuda com a minha mudança no domingo."], options: [
          ["I'll help you. What time?", true, "Ela agradece muito.", "Oferta na hora com will."],
          ["I help you. What time?", false, "Não soa como oferta.", "Oferta: I'll help you."],
        ] },
      ], "Planos marcados no contínuo; ofertas com will.", { c: ["arrangement", "will-offer"] }),
    ],
    b: [
      cloze("q1", "She ___ going to study medicine.", ["is", "'s"], "She + is going to.", { c: ["going-to"], cue: "(be)" }),
      mc("q2", "Your friend can't open a jar. You say:", ["I'll open it for you.", "I open it for you.", "I'm opening it tomorrow."], 0, "Oferta: will.", { c: ["will-offer"] }),
      fix("q3", "I'm going study tonight.", ["I'm going to study tonight", "I am going to study tonight"], "Going to + verbo.", { c: ["going-to"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Acho que você vai gostar.”", "I think you will like it.", "I think + will.", { c: ["i-think-will"], extra: ["are"] }),
      dict("q5", "What are you doing tomorrow night?", "Pergunta sobre um plano para amanhã à noite.", { c: ["arrangement", "future-markers"] }),
      type("q6", "Promise: “Eu não vou contar para ninguém.”", ["I won't tell anyone", "I will not tell anyone", "I won't tell anybody"], "I won't tell anyone.", { c: ["wont"] }),
      cloze("q7", "The course starts ___ two days.", ["in"], "In two days = daqui a dois dias.", { c: ["future-markers"] }),
      listen("q8", "We aren't going to drive. We're going to take the train.", "How are they going to travel?", ["By train", "By car", "By bus"], 0, "We're going to take the train.", { c: ["going-to-q"] }),
      mc("q9", "“Do you think he'll come?” A natural short answer is:", ["I don't think so.", "I don't think.", "I think no."], 0, "I don't think so.", { c: ["i-think-will"] }),
      dialog("q10", "At a cafe with a friend who is planning the year.", [
        { npc: ["I want to learn something new this year.", "Quero aprender algo novo este ano."], options: [
          ["Why don't you do a course? I'm going to do one too.", true, "Ele gosta da ideia.", "Do a course e going to."],
          ["Why don't you make a course? I going to do one.", false, "Há dois erros.", "Do a course; I'm going to."],
        ] },
        { npc: ["Good idea. Shall we order?", "Boa ideia. Vamos pedir?"], options: [
          ["Yes. I'll have a tea.", true, "Ele chama o garçom.", "Decisão na hora."],
          ["Yes. I'm going to have a tea next.", false, "Soa estranho para um pedido.", "No pedido: I'll have."],
        ] },
      ], "Planos com going to; decisões na hora com will.", { c: ["make-plan", "will-decide"] }),
    ],
    production: write("t1", "Write about your plans: something already decided for next month, an arrangement for this week, and one prediction about your future.",
      { mode: "free", min: 35, check: ["Usei going to para um plano decidido.", "Usei o presente contínuo para um compromisso marcado.", "Usei I think + will para a previsão.", "Usei marcadores de futuro."],
        model: "Next month I'm going to start a new course. I'm going to study three times a week. This Friday I'm meeting my teacher at six. I think it will be difficult, but I won't stop. In a year, I think I'll speak much better.", c: ["going-to", "arrangement", "i-think-will"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "E-mail de um amigo",
      goal: "Ler planos de alguém e distinguir intenções, compromissos e previsões.",
      context: { kind: "message", title: "News from Tom", lines: [
        { who: "Tom", en: "Hi! Big news: I'm going to move to Canada in March.", pt: "Oi! Novidade: vou me mudar para o Canadá em março." },
        { who: "Tom", en: "I'm flying to Toronto on March 3. My cousin is meeting me at the airport.", pt: "Viajo para Toronto em 3 de março. Meu primo vai me buscar no aeroporto." },
        { who: "Tom", en: "I think it will be very cold, but I'll buy a good coat. I won't forget to write!", pt: "Acho que vai estar muito frio, mas vou comprar um bom casaco. Não vou esquecer de escrever!" },
      ] },
      exercises: [
        mc("r1", "What is Tom going to do in March?", ["Move to Canada", "Visit his cousin for a week", "Start a course"], 0, "I'm going to move to Canada in March.", { c: ["going-to"], s: "reading" }),
        mc("r2", "Who is meeting Tom at the airport?", ["His cousin", "His friend", "Nobody"], 0, "My cousin is meeting me at the airport.", { c: ["arrangement"], s: "reading" }),
        type("r3", "What does Tom think about the weather? Complete: He thinks it ___ be very cold.", ["will"], "I think it will be very cold.", { c: ["i-think-will"], s: "reading" }),
        cloze("r4", "Tom promises: “I ___ forget to write!”", ["won't"], "I won't forget to write.", { c: ["wont"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Planos para o sábado",
      goal: "Entender planos e uma decisão tomada na hora.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "What are you doing on Saturday?", pt: "O que você vai fazer no sábado?" },
        { who: "B", en: "I'm going to paint my room. It's a lot of work.", pt: "Vou pintar meu quarto. Dá muito trabalho." },
        { who: "A", en: "I'm free. I'll help you!", pt: "Estou livre. Eu te ajudo!" },
      ] },
      exercises: [
        listen("a1", ["What are you doing on Saturday?", "I'm going to paint my room. It's a lot of work.", "I'm free. I'll help you!"], "What is the plan for Saturday?", ["To paint a room", "To buy paint", "To go out"], 0, "I'm going to paint my room.", { c: ["going-to"] }),
        listen("a2", ["What are you doing on Saturday?", "I'm going to paint my room. It's a lot of work.", "I'm free. I'll help you!"], "What does the friend offer?", ["To help", "To pay", "To drive"], 0, "I'll help you!", { c: ["will-offer"] }),
        dict("a3", "I'm free. I'll help you!", "Oferta decidida na hora.", { c: ["will-offer"], alt: ["I am free. I will help you!"], prompt: "Type the offer." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meus planos",
      goal: "Escrever uma mensagem contando planos para o fim de semana.",
      exercises: [
        write("w1", "Write a message to a friend about your weekend plans and invite them to one activity.",
          { frame: ["On Saturday I'm going to …", "On Sunday I'm …ing …", "I think it will …"], min: 22, check: ["Usei going to.", "Usei o contínuo para algo marcado.", "Fiz uma previsão ou promessa com will."], model: "Hi! On Saturday I'm going to clean my apartment. On Sunday I'm having lunch with my parents at one. I think it will be sunny. Do you want to come? I'll cook!", c: ["going-to", "arrangement"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "O próximo ano",
      goal: "Falar de planos e previsões para o próximo ano.",
      exercises: [
        speak("s1", "Talk about next year: two plans and one prediction.", ["Next year I'm going to change jobs. I'm going to do an English course. I think it will be a good year."],
          { mode: "respond", check: ["Usei going to duas vezes.", "Usei I think + will.", "Não esqueci o verbo to be.", "Ouvi o modelo e comparei."], c: ["going-to", "i-think-will"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: organizando uma viagem em grupo",
      goal: "Combinar tarefas e horários com outras pessoas.",
      exercises: [
        dialog("m1", "You and two friends are planning a short trip.", [
          { npc: ["So, what's the plan for Saturday?", "Então, qual é o plano para sábado?"], options: [
            ["We're going to leave at seven and drive to the coast.", true, "Todos concordam.", "Plano decidido com going to."],
            ["We leave at seven and are drive.", false, "A frase fica confusa.", "We're going to leave…"],
          ] },
          { npc: ["Who is buying the food?", "Quem vai comprar a comida?"], options: [
            ["I'll do it. I'll go to the store tonight.", true, "Um amigo agradece.", "Oferta e decisão na hora."],
            ["I do it. I go tonight.", false, "Soa como hábito.", "Oferta: I'll do it."],
          ] },
          { npc: ["Do you think it will rain?", "Você acha que vai chover?"], options: [
            ["I don't think so, but I'll take an umbrella.", true, "O grupo ri.", "Previsão e decisão com will."],
            ["I think no, I take an umbrella.", false, "Não é natural.", "I don't think so; I'll take."],
          ] },
        ], "Planejar em grupo: going to, will e I think.", { c: ["going-to", "will-offer", "i-think-will"] }),
        write("m2", "Write the plan in three lines for the group chat.", { min: 14, check: ["Escrevi a hora de saída.", "Disse quem faz o quê.", "Usei formas de futuro."], model: "We're going to leave at seven. I'll buy the food tonight. Ana is driving.", c: ["going-to", "arrangement"] }),
      ],
      outside: {
        title: "Fora do app: sua semana em inglês",
        instructions: "Olhe sua agenda real e diga em voz alta, em inglês: dois compromissos marcados (I'm …ing on …), dois planos (I'm going to …) e uma previsão (I think it will …). Se puder, escreva uma promessa para alguém com I'll… ou I won't….",
        checklist: ["Disse dois compromissos no presente contínuo.", "Disse dois planos com going to.", "Fiz uma previsão ou promessa com will."],
      },
    }),
  },
});
