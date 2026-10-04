/** A2 · Unidade 7 — Saúde e conselhos: should, obrigação e permissão. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u07",

  concepts: [
    concept("have-a-headache", "phrase", "I have a headache / a cold / a fever.", "Estou com dor de cabeça / resfriado / febre.", "l1", ["I have a sore throat.", "Estou com dor de garganta."], { note: "Sintomas levam a: a headache, a cold, a cough.", tags: ["collocation"] }),
    concept("hurts", "pattern", "My back hurts.", "Minhas costas doem.", "l1", ["My feet hurt.", "Meus pés doem."], { note: "Singular: hurts. Plural: hurt." }),
    concept("i-feel", "phrase", "I feel sick / tired / better.", "Estou me sentindo mal / cansado / melhor.", "l1", ["I don't feel well.", "Não estou me sentindo bem."]),
    concept("should", "pattern", "You should rest.", "Você deveria descansar.", "l2", ["You should see a doctor.", "Você deveria ir ao médico."], { note: "should + verbo sem to." }),
    concept("shouldnt", "pattern", "You shouldn't work today.", "Você não deveria trabalhar hoje.", "l2", ["You shouldn't drink coffee at night.", "Você não deveria beber café à noite."]),
    concept("take-medicine", "phrase", "take medicine / see a doctor / get some rest", "tomar remédio / ir ao médico / descansar", "l2", ["Take this medicine twice a day.", "Tome este remédio duas vezes ao dia."], { tags: ["collocation"] }),
    concept("have-to", "pattern", "I have to work.", "Eu tenho que trabalhar.", "l3", ["She has to take the medicine.", "Ela tem que tomar o remédio."]),
    concept("dont-have-to", "pattern", "You don't have to pay.", "Você não precisa pagar.", "l3", ["You don't have to come early.", "Você não precisa vir cedo."], { note: "Não é proibição: é falta de obrigação." }),
    concept("mustnt", "pattern", "You mustn't smoke here.", "É proibido fumar aqui.", "l3", ["You mustn't drive after this medicine.", "Você não pode dirigir depois deste remédio."], { note: "Mustn't = proibido. Diferente de don't have to." }),
    concept("may-i", "phrase", "Can I …? / May I …?", "Posso …?", "l4", ["May I come in?", "Posso entrar?"], { note: "May é mais formal que can." }),
    concept("allowed", "phrase", "You can't park here.", "Não é permitido estacionar aqui.", "l4", ["You can't use your phone in here.", "Não pode usar o celular aqui dentro."]),
  ],

  lessons: [
    lesson("l1", {
      title: "O que você está sentindo?",
      objective: "Você vai conseguir descrever sintomas simples.",
      minutes: 8,
      context: { kind: "dialogue", title: "Ligando para o trabalho", lines: [
        { who: "Leo", en: "Hi, Ana. I can't come to work today. I don't feel well.", pt: "Oi, Ana. Não posso ir trabalhar hoje. Não estou me sentindo bem." },
        { who: "Ana", en: "Oh no. What's the matter?", pt: "Ah, não. O que houve?" },
        { who: "Leo", en: "I have a headache and a fever. And my throat hurts.", pt: "Estou com dor de cabeça e febre. E minha garganta dói." },
        { who: "Ana", en: "You sound terrible. Do you have a cold?", pt: "Sua voz está péssima. Você está resfriado?" },
        { who: "Leo", en: "I think so. I feel very tired.", pt: "Acho que sim. Estou muito cansado." },
      ] },
      explanation: {
        summary: "Para falar de sintomas:\n- **I have a** headache / cold / fever / cough.\n- **My** back **hurts**. / **My** feet **hurt**.\n- **I feel** sick / tired / dizzy. **I don't feel well.**\n\nA pergunta de quem quer ajudar: **What's the matter?** ou **What's wrong?**",
        details: "Em português dizemos “estou com dor de cabeça”; em inglês é **have**, e com artigo: *I have **a** headache*. Outros: *a stomachache* (dor de barriga), *a toothache* (dor de dente), *a sore throat* (dor de garganta).",
        examples: [
          { en: "I have a cold.", pt: "Estou resfriado." },
          { en: "My head hurts.", pt: "Minha cabeça dói." },
          { en: "She feels sick.", pt: "Ela está passando mal." },
        ],
        contrasts: [
          { wrong: "I have headache.", right: "I have a headache.", why: "O sintoma pede o artigo a." },
          { wrong: "I am with fever.", right: "I have a fever.", why: "“Estar com” é have em inglês." },
        ],
        tip: "**Headache** soa “réd-eik”: o CH tem som de K. O mesmo em **stomachache** (“stâmak-eik”).",
      },
      guided: [
        mc("e1", "Which is correct?", ["I have a headache.", "I have headache.", "I am with headache."], 0, "Sintoma: have + a.", { c: ["have-a-headache"] }),
        match("e2", "Associe o sintoma ao significado.", [["a headache", "dor de cabeça"], ["a cold", "resfriado"], ["a fever", "febre"], ["a cough", "tosse"], ["a sore throat", "dor de garganta"]],
          "Cinco problemas comuns, todos com a.", { c: ["have-a-headache"] }),
        cloze("e3", "My back ___.", ["hurts"], "Back é singular: hurts.", { c: ["hurts"], cue: "(hurt)" }),
      ],
      independent: [
        cloze("e4", "I don't ___ well today.", ["feel"], "I don't feel well.", { c: ["i-feel"], s: "vocabulary" }),
        cloze("e5", "I have ___ fever.", ["a"], "O sintoma leva artigo: a fever.", { c: ["have-a-headache"] }),
        order("e6", "Put the words in order: “Meus pés doem.”", "My feet hurt.", "Feet é plural: hurt.", { c: ["hurts"], extra: ["hurts"] }),
        dict("e7", "I have a cold and I feel tired.", "Um sintoma com have e outro com feel.", { c: ["have-a-headache", "i-feel"] }),
        fix("e8", "I am with a headache.", ["I have a headache"], "“Estar com” = have.", { c: ["have-a-headache"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e9", "Say in English: “Minha garganta dói.”", ["My throat hurts"], "Throat é singular: hurts.", { c: ["hurts"] }),
        speak("e10", "Explique em voz alta que você está doente e descreva três sintomas.", ["I don't feel well. I have a headache and a cough. My throat hurts."],
          { mode: "respond", check: ["Usei have + a com um sintoma.", "Usei hurts ou hurt.", "Usei feel."], c: ["have-a-headache", "hurts", "i-feel"] }),
      ],
      summary: { points: ["I have a headache / a cold / a fever.", "My back hurts. / My feet hurt.", "I feel sick. / I don't feel well."], concepts: ["have-a-headache", "hurts", "i-feel"] },
    }),

    lesson("l2", {
      title: "Você deveria…",
      objective: "Você vai conseguir pedir e dar conselhos.",
      minutes: 9,
      context: { kind: "dialogue", title: "Conselho de amiga", lines: [
        { who: "Leo", en: "I have a terrible cough. What should I do?", pt: "Estou com uma tosse terrível. O que eu devo fazer?" },
        { who: "Ana", en: "You should see a doctor. And you shouldn't go to work.", pt: "Você deveria ir ao médico. E não deveria ir trabalhar." },
        { who: "Leo", en: "Should I take some medicine?", pt: "Devo tomar algum remédio?" },
        { who: "Ana", en: "Yes, but ask the doctor first. And you should get some rest.", pt: "Sim, mas pergunte ao médico antes. E você deveria descansar." },
      ] },
      explanation: {
        summary: "Para aconselhar: **should + verbo** e **shouldn't + verbo**.\n- *You should see a doctor.*\n- *You shouldn't work today.*\n\nPara pedir conselho: **What should I do?** / **Should I…?**\n\nBlocos úteis: **take medicine**, **see a doctor**, **get some rest**.",
        details: "Should é igual para todas as pessoas e não leva to: *She should rest*. Para suavizar: *I think you should…* ou *Maybe you should…*. Em inglês se “toma” remédio com **take**, não com “drink”.",
        examples: [
          { en: "You should drink more water.", pt: "Você deveria beber mais água." },
          { en: "He shouldn't eat so much sugar.", pt: "Ele não deveria comer tanto açúcar." },
          { en: "What should I do?", pt: "O que eu devo fazer?" },
        ],
        contrasts: [
          { wrong: "You should to rest.", right: "You should rest.", why: "Depois de should, verbo sem to." },
          { wrong: "I drank a medicine.", right: "I took some medicine.", why: "Remédio se toma com take." },
        ],
      },
      guided: [
        mc("e1", "Your friend has a fever. What is good advice?", ["You should see a doctor.", "You should to see a doctor.", "You shouldn't rest."], 0, "Should + verbo sem to.", { c: ["should"] }),
        match("e2", "Associe a expressão ao significado.", [["take medicine", "tomar remédio"], ["see a doctor", "ir ao médico"], ["get some rest", "descansar"], ["drink water", "beber água"]],
          "As ações mais comuns em conselhos de saúde.", { c: ["take-medicine"] }),
        cloze("e3", "You ___ go to work today. Stay home.", ["shouldn't", "should not"], "Conselho negativo: shouldn't.", { c: ["shouldnt"] }),
      ],
      independent: [
        cloze("e4", "You should ___ this medicine twice a day.", ["take"], "Take medicine.", { c: ["take-medicine"], s: "vocabulary" }),
        order("e5", "Put the words in order: “O que eu devo fazer?”", "What should I do?", "What + should + I + do.", { c: ["should"], extra: ["to"] }),
        fix("e6", "She should to drink more water.", ["She should drink more water"], "Should + verbo sem to.", { c: ["should"], prompt: "Corrija o erro." }),
        dict("e7", "You shouldn't drink coffee at night.", "Conselho negativo.", { c: ["shouldnt"], alt: ["You should not drink coffee at night."] }),
        cloze("e8", "You look tired. You should get some ___.", ["rest"], "Get some rest = descansar.", { c: ["take-medicine"], s: "vocabulary" }),
      ],
      application: [
        type("e9", "Give advice in English: “Você deveria ir ao médico.”", ["You should see a doctor", "You should go to the doctor", "You should see the doctor"], "You should see a doctor.", { c: ["should", "take-medicine"] }),
        dialog("e10", "A colleague complains at work.", [
          { npc: ["My back hurts so much today.", "Minhas costas estão doendo demais hoje."], options: [
            ["I'm sorry. You should see a doctor.", true, "Ela concorda.", "Empatia e conselho."],
            ["You should to work more.", false, "Ela se irrita.", "Sem to, e o conselho não ajuda."],
          ] },
          { npc: ["Maybe. Should I take a painkiller?", "Talvez. Devo tomar um analgésico?"], options: [
            ["Yes, but you shouldn't carry heavy things today.", true, "Ela agradece.", "Conselho negativo útil."],
            ["Yes, you shouldn't to rest.", false, "O conselho fica sem sentido.", "Sem to; e descansar ajudaria."],
          ] },
        ], "Aconselhar com should e shouldn't.", { c: ["should", "shouldnt"] }),
      ],
      summary: { points: ["should / shouldn't + verbo sem to.", "What should I do?", "take medicine, see a doctor, get some rest."], concepts: ["should", "shouldnt", "take-medicine"] },
    }),

    lesson("l3", {
      title: "Tenho que, não preciso, não posso",
      objective: "Você vai conseguir diferenciar obrigação, falta de obrigação e proibição.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na farmácia", lines: [
        { who: "Farmacêutico", en: "You have to take this twice a day, with food.", pt: "Você tem que tomar isto duas vezes ao dia, com comida." },
        { who: "Ana", en: "Do I have to finish the box?", pt: "Tenho que terminar a caixa?" },
        { who: "Farmacêutico", en: "Yes, you do. And you mustn't drive after taking it.", pt: "Sim. E você não pode dirigir depois de tomar." },
        { who: "Ana", en: "OK. Do I have to pay now?", pt: "Certo. Tenho que pagar agora?" },
        { who: "Farmacêutico", en: "No, you don't have to. You can pay at the desk.", pt: "Não precisa. Você pode pagar no caixa." },
      ] },
      explanation: {
        summary: "Três ideias diferentes:\n- **have to** = obrigação: *I have to work.* (com she/he: **has to**)\n- **don't have to** = **não é necessário**: *You don't have to pay.*\n- **mustn't** = **é proibido**: *You mustn't smoke here.*",
        details: "A armadilha: **don't have to** NÃO significa “não pode”. *You don't have to come* = você não precisa vir (mas pode). *You mustn't come* = você não pode vir. **Must** também existe para obrigação forte (*You must wear a seat belt*), mas no dia a dia *have to* é mais comum.",
        examples: [
          { en: "I have to get up early tomorrow.", pt: "Tenho que acordar cedo amanhã." },
          { en: "You don't have to wait.", pt: "Você não precisa esperar." },
          { en: "You mustn't park here.", pt: "É proibido estacionar aqui." },
        ],
        contrasts: [
          { wrong: "You don't have to smoke here. (querendo proibir)", right: "You mustn't smoke here.", why: "Don't have to = não precisa. Para proibir: mustn't." },
          { wrong: "She have to work.", right: "She has to work.", why: "Com she: has to." },
        ],
      },
      guided: [
        mc("e1", "“You don't have to pay.” What does it mean?", ["Você não precisa pagar.", "É proibido pagar.", "Você tem que pagar."], 0, "Don't have to = não é necessário.", { c: ["dont-have-to"] }),
        match("e2", "Associe a frase ao significado.", [["I have to go.", "obrigação"], ["You don't have to go.", "não é necessário"], ["You mustn't go.", "é proibido"]],
          "Três ideias que o português às vezes mistura.", { c: ["have-to", "dont-have-to", "mustnt"] }),
        cloze("e3", "She ___ to take the medicine every day.", ["has"], "Com she: has to.", { c: ["have-to"], cue: "(have)" }),
      ],
      independent: [
        cloze("e4", "It's free. You ___ have to pay.", ["don't", "do not"], "Não é necessário: don't have to.", { c: ["dont-have-to"] }),
        cloze("e5", "You ___ drive after this medicine. It's dangerous.", ["mustn't", "must not"], "Proibição: mustn't.", { c: ["mustnt"] }),
        order("e6", "Put the words in order: “Tenho que acordar cedo amanhã.”", "I have to get up early tomorrow.", "Have to + verbo.", { c: ["have-to"] }),
        fix("e7", "He have to see a doctor.", ["He has to see a doctor"], "Com he: has to.", { c: ["have-to"], prompt: "Corrija o erro." }),
        dict("e8", "You don't have to wait.", "Falta de obrigação.", { c: ["dont-have-to"], alt: ["You do not have to wait."] }),
      ],
      application: [
        type("e9", "Say in English: “É proibido fumar aqui.” Start with “You”.", ["You mustn't smoke here", "You must not smoke here", "You can't smoke here", "You cannot smoke here"], "You mustn't smoke here.", { c: ["mustnt"] }),
        listen("e10", "You don't have to come tomorrow, but you can if you want.", "Is the person obliged to come?", ["No, it is optional.", "Yes, it is necessary.", "No, it is forbidden."], 0, "Don't have to = opcional.", { c: ["dont-have-to"] }),
      ],
      summary: { points: ["have to / has to = obrigação.", "don't have to = não precisa.", "mustn't = proibido."], concepts: ["have-to", "dont-have-to", "mustnt"] },
    }),

    lesson("l4", {
      title: "Posso?",
      objective: "Você vai conseguir pedir permissão e entender o que é e não é permitido.",
      minutes: 8,
      context: { kind: "dialogue", title: "Na clínica", lines: [
        { who: "Bia", en: "Excuse me, may I come in?", pt: "Com licença, posso entrar?" },
        { who: "Médica", en: "Yes, of course. Please sit down.", pt: "Sim, claro. Sente-se, por favor." },
        { who: "Bia", en: "Can I use my phone here?", pt: "Posso usar o celular aqui?" },
        { who: "Médica", en: "I'm afraid you can't. But you can use it in the waiting room.", pt: "Infelizmente não pode. Mas pode usar na sala de espera." },
      ] },
      explanation: {
        summary: "Para pedir permissão: **Can I…?** (neutro) ou **May I…?** (mais formal e educado).\n\nRespostas: **Yes, of course.** / **Sure.** / **I'm afraid you can't.**\n\nPara dizer o que não é permitido: **You can't park here.**",
        details: "**I'm afraid…** é um jeito educado de dar uma resposta negativa (não tem a ver com medo). Em avisos, aparecem formas como *No parking*, *No smoking*, *Staff only*.",
        examples: [
          { en: "May I ask a question?", pt: "Posso fazer uma pergunta?" },
          { en: "Can I sit here?", pt: "Posso sentar aqui?" },
          { en: "You can't take photos in the museum.", pt: "Não pode tirar fotos no museu." },
        ],
        contrasts: [
          { wrong: "I can use the bathroom?", right: "Can I use the bathroom?", why: "Na pergunta, can vem antes de I." },
          { wrong: "May I to sit here?", right: "May I sit here?", why: "Depois de may, verbo sem to." },
        ],
      },
      guided: [
        mc("e1", "Which is the most formal way to ask for permission?", ["May I come in?", "I come in?", "Can I to come in?"], 0, "May I…? é a forma mais formal.", { c: ["may-i"] }),
        match("e2", "Associe a frase à função.", [["May I sit here?", "pedir permissão"], ["Yes, of course.", "permitir"], ["I'm afraid you can't.", "negar com educação"], ["You can't park here.", "informar uma regra"]],
          "Pedir, permitir, negar e informar.", { c: ["may-i", "allowed"] }),
        cloze("e3", "___ I ask a question?", ["May", "Can"], "May I…? ou Can I…?", { c: ["may-i"] }),
      ],
      independent: [
        cloze("e4", "You ___ take photos in here. It's not allowed.", ["can't", "cannot"], "Não permitido: can't.", { c: ["allowed"] }),
        order("e5", "Put the words in order: “Posso usar o seu celular?”", "Can I use your phone?", "Can + I + verbo.", { c: ["may-i"], extra: ["to"] }),
        fix("e6", "May I to open the window?", ["May I open the window"], "May + verbo sem to.", { c: ["may-i"], prompt: "Corrija o erro." }),
        dict("e7", "You can't park here.", "Regra: can't + verbo.", { c: ["allowed"], alt: ["You cannot park here."] }),
      ],
      application: [
        type("e8", "Ask formally: “Posso entrar?”", ["May I come in", "Can I come in"], "May I come in?", { c: ["may-i"] }),
        speak("e9", "Peça permissão para três coisas diferentes.", ["May I come in? Can I sit here? May I ask a question?"],
          { check: ["Usei May I ou Can I.", "O verbo veio sem to.", "Subi a voz no final."], c: ["may-i"] }),
        write("e10", "Escreva três regras de um lugar que você conhece (trabalho, escola, academia).",
          { frame: ["You have to …", "You can't …", "You don't have to …"], min: 15, check: ["Uma obrigação com have to.", "Uma proibição com can't ou mustn't.", "Algo não obrigatório com don't have to."], model: "You have to wear shoes in the gym. You can't use your phone in the pool. You don't have to bring a towel.", c: ["have-to", "allowed", "dont-have-to"] }),
      ],
      summary: { points: ["Can I…? / May I…?", "Yes, of course. / I'm afraid you can't.", "You can't + verbo para regras."], concepts: ["may-i", "allowed"] },
    }),
  ],

  checkpoint: {
    intro: "New health and rule situations: describe a problem, give advice, and say what is necessary or forbidden.",
    a: [
      cloze("q1", "I have ___ stomachache.", ["a"], "Sintoma com a.", { c: ["have-a-headache"] }),
      mc("q2", "“You mustn't touch that.” means:", ["É proibido tocar.", "Não precisa tocar.", "Você deveria tocar."], 0, "Mustn't = proibido.", { c: ["mustnt"] }),
      fix("q3", "You should to sleep more.", ["You should sleep more"], "Should + verbo sem to.", { c: ["should"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Você não precisa esperar aqui.”", "You don't have to wait here.", "Don't have to + verbo.", { c: ["dont-have-to"], extra: ["mustn't"] }),
      dict("q5", "My head hurts and I feel sick.", "Hurts no singular e feel + adjetivo.", { c: ["hurts", "i-feel"] }),
      type("q6", "Ask for advice: “O que eu devo fazer?”", ["What should I do"], "What should I do?", { c: ["should"] }),
      cloze("q7", "My sister ___ to work on Sunday.", ["has"], "Com sister: has to.", { c: ["have-to"], cue: "(have)" }),
      listen("q8", "You shouldn't eat so much sugar. You should eat more fruit.", "What is the advice?", ["Eat less sugar and more fruit.", "Eat more sugar.", "Stop eating fruit."], 0, "Shouldn't eat sugar; should eat fruit.", { c: ["shouldnt"] }),
      mc("q9", "You want to open a window in a meeting. You say:", ["May I open the window?", "I open the window.", "You open the window!"], 0, "Pedir permissão: May I…?", { c: ["may-i"] }),
      dialog("q10", "At a pharmacy abroad.", [
        { npc: ["Hello. How can I help you?", "Olá. Como posso ajudar?"], options: [
          ["I have a sore throat and a cough.", true, "A farmacêutica pega um xarope.", "Sintomas com have + a."],
          ["I am with sore throat.", false, "Ela entende com esforço.", "Use have + a."],
        ] },
        { npc: ["Take this three times a day. And you mustn't drink alcohol.", "Tome isto três vezes ao dia. E você não pode beber álcool."], options: [
          ["OK. Do I have to take it with food?", true, "Ela explica.", "Pergunta com have to."],
          ["OK. I mustn't take it?", false, "Ela se preocupa.", "Você entendeu ao contrário: mustn't é sobre o álcool."],
        ] },
      ], "Descrever sintomas e entender instruções.", { c: ["have-a-headache", "mustnt", "have-to"] }),
    ],
    b: [
      cloze("q1", "My eyes ___.", ["hurt"], "Eyes é plural: hurt.", { c: ["hurts"], cue: "(hurt)" }),
      mc("q2", "“You don't have to bring anything.” means:", ["Não precisa trazer nada.", "É proibido trazer algo.", "Você deve trazer algo."], 0, "Don't have to = não é necessário.", { c: ["dont-have-to"] }),
      fix("q3", "I have cold.", ["I have a cold"], "O sintoma leva artigo: a cold.", { c: ["have-a-headache"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Você não deveria trabalhar hoje.”", "You shouldn't work today.", "Shouldn't + verbo.", { c: ["shouldnt"], extra: ["to"] }),
      dict("q5", "You have to take this medicine with food.", "Obrigação e take medicine.", { c: ["have-to", "take-medicine"] }),
      type("q6", "Say in English: “Não estou me sentindo bem.”", ["I don't feel well", "I do not feel well", "I'm not feeling well", "I am not feeling well"], "I don't feel well.", { c: ["i-feel"] }),
      cloze("q7", "You look tired. You should ___ a doctor.", ["see"], "See a doctor.", { c: ["take-medicine"], s: "vocabulary" }),
      listen("q8", "I'm afraid you can't park here. It's for doctors only.", "Can the person park there?", ["No", "Yes", "Only at night"], 0, "I'm afraid you can't.", { c: ["allowed"], keepOrder: true }),
      mc("q9", "Which sentence gives permission?", ["Yes, of course.", "I'm afraid you can't.", "You mustn't."], 0, "Yes, of course.", { c: ["may-i"] }),
      dialog("q10", "A friend sends you a message: she is sick.", [
        { npc: ["I feel terrible. I have a fever.", "Estou péssima. Estou com febre."], options: [
          ["Oh no! You should stay in bed and drink water.", true, "Ela agradece.", "Empatia e conselho."],
          ["You must to work.", false, "Ela fica chateada.", "Sem to, e não é um bom conselho."],
        ] },
        { npc: ["But I have to work tomorrow.", "Mas tenho que trabalhar amanhã."], options: [
          ["You shouldn't go. You don't have to answer emails today.", true, "Ela decide descansar.", "Conselho negativo e falta de obrigação."],
          ["You mustn't to go.", false, "A frase está errada.", "Mustn't sem to; e o conselho seria shouldn't."],
        ] },
      ], "Aconselhar alguém doente.", { c: ["should", "shouldnt", "dont-have-to"] }),
    ],
    production: write("t1", "A friend writes: “I always feel tired and I have headaches.” Reply with advice: three things they should or shouldn't do, and one thing they have to do.",
      { mode: "free", min: 35, check: ["Mostrei empatia.", "Dei pelo menos dois conselhos com should.", "Usei shouldn't.", "Usei have to ou don't have to."],
        model: "I'm sorry you don't feel well. You should sleep eight hours and drink more water. You shouldn't use your phone at night. I think you have to see a doctor about the headaches. You don't have to do everything alone. Call me!", c: ["should", "shouldnt", "have-to"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Bula simplificada",
      goal: "Ler instruções de um remédio e identificar obrigações e proibições.",
      context: { kind: "notice", title: "How to take this medicine", lines: [
        { en: "Take one tablet twice a day. You have to take it with food.", pt: "Tome um comprimido duas vezes ao dia. É preciso tomar com comida." },
        { en: "You mustn't drive or drink alcohol.", pt: "Você não pode dirigir nem beber álcool." },
        { en: "You don't have to keep it in the fridge.", pt: "Não é necessário guardar na geladeira." },
        { en: "If you feel dizzy or your stomach hurts, you should call a doctor.", pt: "Se sentir tontura ou dor de estômago, você deve ligar para um médico." },
      ] },
      exercises: [
        mc("r1", "How often should you take the tablet?", ["Twice a day", "Once a day", "Three times a day"], 0, "Twice a day.", { c: ["take-medicine"], s: "reading" }),
        mc("r2", "What is forbidden?", ["Driving", "Eating", "Keeping it in the fridge"], 0, "You mustn't drive.", { c: ["mustnt"], s: "reading" }),
        type("r3", "Do you have to keep it in the fridge? Answer with a short answer.", ["No, you don't", "No, you do not", "No, I don't", "No, I do not"], "You don't have to keep it in the fridge.", { c: ["dont-have-to"], s: "reading" }),
        cloze("r4", "If your stomach hurts, you ___ call a doctor.", ["should"], "You should call a doctor.", { c: ["should"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Na consulta",
      goal: "Entender sintomas e recomendações.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "Paciente", en: "I have a cough and my chest hurts.", pt: "Estou com tosse e meu peito dói." },
        { who: "Médica", en: "You should rest for three days. You don't have to take antibiotics.", pt: "Você deve descansar por três dias. Não precisa tomar antibiótico." },
      ] },
      exercises: [
        listen("a1", ["I have a cough and my chest hurts.", "You should rest for three days. You don't have to take antibiotics."], "What is the patient's problem?", ["A cough and chest pain", "A headache", "A fever"], 0, "I have a cough and my chest hurts.", { c: ["have-a-headache", "hurts"] }),
        listen("a2", ["I have a cough and my chest hurts.", "You should rest for three days. You don't have to take antibiotics."], "Does the patient need antibiotics?", ["No", "Yes", "Only at night"], 0, "You don't have to take antibiotics.", { c: ["dont-have-to"], keepOrder: true }),
        dict("a3", "You should rest for three days.", "Conselho com should.", { c: ["should"], alt: ["You should rest for 3 days."], prompt: "Type the doctor's advice." }),
      ],
    }),
    writing: activity("writing", {
      title: "Mensagem avisando que está doente",
      goal: "Escrever uma mensagem ao trabalho ou à escola explicando que não pode ir.",
      exercises: [
        write("w1", "Write a message to your manager or teacher: you are sick and can't come today.",
          { frame: ["I'm sorry, but …", "I have …", "I have to …"], min: 20, check: ["Expliquei que não posso ir.", "Descrevi pelo menos dois sintomas.", "Disse o que tenho que fazer (see a doctor, rest…)."], model: "Good morning. I'm sorry, but I can't come to work today. I have a fever and my throat hurts. I have to see a doctor this morning. I'll send you an update.", c: ["have-a-headache", "have-to"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Dando conselhos",
      goal: "Aconselhar alguém em voz alta.",
      exercises: [
        speak("s1", "Your friend is very stressed. Give four pieces of advice.", ["You should sleep more. You shouldn't work on weekends. You should exercise. You don't have to answer messages at night."],
          { mode: "respond", check: ["Usei should pelo menos duas vezes.", "Usei shouldn't.", "Usei don't have to.", "Ouvi o modelo e comparei."], c: ["should", "shouldnt", "dont-have-to"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: consulta médica no exterior",
      goal: "Explicar o que sente, entender as instruções e confirmar o que é obrigatório.",
      exercises: [
        dialog("m1", "You are sick on a trip and go to a clinic.", [
          { npc: ["Good morning. What's the matter?", "Bom dia. O que você está sentindo?"], options: [
            ["I don't feel well. I have a fever and my head hurts.", true, "A médica examina você.", "Sintomas descritos com clareza."],
            ["I am bad. I am with fever.", false, "Ela entende com dificuldade.", "Use I don't feel well e I have a fever."],
          ] },
          { npc: ["You have the flu. You should rest and drink a lot of water.", "Você está com gripe. Deve descansar e beber muita água."], options: [
            ["Do I have to take any medicine?", true, "Ela receita um remédio.", "Pergunta útil com have to."],
            ["I must to take medicine?", false, "A pergunta soa errada.", "Do I have to…?"],
          ] },
          { npc: ["Yes, this one. And you mustn't travel for two days.", "Sim, este. E você não pode viajar por dois dias."], options: [
            ["I see. So I can't fly tomorrow. Thank you, doctor.", true, "Ela confirma.", "Repetir a regra mostra que você entendeu."],
            ["OK, I don't have to travel.", false, "Ela corrige você: é proibido, não opcional.", "Mustn't é proibição."],
          ] },
        ], "Consulta: sintomas, instruções e proibições.", { c: ["i-feel", "have-to", "mustnt"] }),
        write("m2", "Write a note to yourself with the doctor's instructions.", { min: 12, check: ["Anotei o que devo fazer.", "Anotei o que é proibido.", "Usei should, have to ou mustn't."], model: "I should rest and drink water. I have to take the medicine. I mustn't travel for two days.", c: ["should", "mustnt"] }),
      ],
      outside: {
        title: "Fora do app: regras ao seu redor",
        instructions: "Procure três avisos ou regras no seu dia (no trânsito, no trabalho, em um prédio) e diga cada um em inglês com have to, can't ou mustn't. Depois dê um conselho de saúde para si mesmo com should.",
        checklist: ["Disse três regras em inglês.", "Usei mustn't ou can't para uma proibição.", "Dei um conselho com should."],
      },
    }),
  },
});
