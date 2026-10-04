/** A2 · Unidade 1 — Agora e sempre: presente contínuo e contraste com hábitos. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u01",

  concepts: [
    concept("ing-now", "pattern", "I'm working.", "Estou trabalhando.", "l1", ["She's cooking dinner.", "Ela está fazendo o jantar."], { note: "am/is/are + verbo com -ing." }),
    concept("ing-spelling", "pattern", "making, running, studying", "grafia do -ing", "l1", ["He's running in the park.", "Ele está correndo no parque."], { note: "make → making (cai o e); run → running (dobra a consoante)." }),
    concept("right-now", "word", "now / right now / at the moment", "agora / neste momento", "l1", ["I'm busy at the moment.", "Estou ocupado no momento."]),
    concept("ing-neg", "pattern", "I'm not working.", "Não estou trabalhando.", "l2", ["They aren't listening.", "Eles não estão ouvindo."]),
    concept("ing-question", "pattern", "Are you working?", "Você está trabalhando?", "l2", ["Is she sleeping?", "Ela está dormindo?"]),
    concept("what-doing", "phrase", "What are you doing?", "O que você está fazendo?", "l2", ["Hi! What are you doing?", "Oi! O que você está fazendo?"]),
    concept("habit-vs-now", "pattern", "I work x I'm working", "hábito x agora", "l3", ["I usually walk, but today I'm taking the bus.", "Geralmente vou a pé, mas hoje estou indo de ônibus."]),
    concept("time-markers", "word", "every day, usually x now, today", "todo dia, geralmente x agora, hoje", "l3", ["She works every day.", "Ela trabalha todo dia."]),
    concept("state-verbs", "pattern", "I know / I want / I like (no -ing)", "verbos de estado não levam -ing", "l4", ["I want a coffee now.", "Quero um café agora."], { note: "know, want, like, need, understand, believe ficam no presente simples." }),
    concept("temporary", "pattern", "I'm staying with a friend this week.", "Estou ficando na casa de um amigo esta semana.", "l4", ["She's working from home these days.", "Ela está trabalhando de casa ultimamente."]),
  ],

  lessons: [
    lesson("l1", {
      title: "O que está acontecendo agora",
      objective: "Você vai conseguir dizer o que você e outras pessoas estão fazendo neste momento.",
      minutes: 9,
      context: { kind: "message", title: "Mensagens em família", lines: [
        { who: "Mãe", en: "Where is everyone?", pt: "Cadê todo mundo?" },
        { who: "Bia", en: "I'm studying in my room.", pt: "Estou estudando no meu quarto." },
        { who: "Davi", en: "I'm making a sandwich. Dad is running in the park.", pt: "Estou fazendo um sanduíche. O pai está correndo no parque." },
        { who: "Mãe", en: "OK. I'm coming home now.", pt: "Tá. Estou indo para casa agora." },
      ] },
      explanation: {
        summary: "O **presente contínuo** fala do que está acontecendo **agora**: **am / is / are + verbo com -ing**.\n\n- I **am working** → I'm working\n- She **is cooking** → She's cooking\n- They **are playing** → They're playing\n\nMarcadores: **now**, **right now**, **at the moment**.",
        details: "Grafia do -ing:\n- verbo terminado em **e**: cai o e → *make → making, come → coming*\n- consoante + vogal + consoante em sílaba forte: dobra a última → *run → running, sit → sitting, swim → swimming*\n- os demais: só acrescenta → *study → studying, play → playing*",
        examples: [
          { en: "I'm studying English.", pt: "Estou estudando inglês." },
          { en: "He's making dinner.", pt: "Ele está fazendo o jantar." },
          { en: "We're watching a movie right now.", pt: "Estamos assistindo a um filme agora." },
        ],
        contrasts: [
          { wrong: "I studying now.", right: "I'm studying now.", why: "Falta o verbo to be antes do -ing." },
          { wrong: "She is make dinner.", right: "She is making dinner.", why: "Depois de is, o verbo precisa do -ing." },
        ],
        tip: "O **-ing** final é fraco: *working* soa “uârkin”, sem um G forte no fim.",
      },
      guided: [
        mc("e1", "Which sentence is correct?", ["She is cooking now.", "She cooking now.", "She is cook now."], 0, "Precisamos de is + verbo com -ing.", { c: ["ing-now"], pt: "Qual frase está correta?" }),
        match("e2", "Associe o verbo à forma com -ing.", [["make", "making"], ["run", "running"], ["study", "studying"], ["swim", "swimming"], ["come", "coming"]],
          "Cai o e final; dobra a consoante em run e swim; study só ganha -ing.", { c: ["ing-spelling"], s: "grammar" }),
        cloze("e3", "I ___ studying in my room.", ["am", "'m"], "Com I: am + -ing.", { c: ["ing-now"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "Dad is ___ in the park.", ["running"], "Run dobra o n: running.", { c: ["ing-spelling"], cue: "(run)" }),
        cloze("e5", "I can't talk. I'm busy at the ___.", ["moment"], "At the moment = neste momento.", { c: ["right-now"], s: "vocabulary" }),
        order("e6", "Put the words in order: “Estamos assistindo a um filme agora.”", "We are watching a movie now.", "Sujeito + are + verbo-ing.", { c: ["ing-now", "right-now"] }),
        dict("e7", "She's making a sandwich.", "She's + making (make perde o e).", { c: ["ing-now", "ing-spelling"], alt: ["She is making a sandwich."] }),
        fix("e8", "He working right now.", ["He is working right now", "He's working right now"], "Falta o verbo to be: He is working.", { c: ["ing-now", "right-now"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e9", "Say in English: “Estou fazendo o jantar.”", ["I am making dinner", "I'm making dinner", "I am cooking dinner", "I'm cooking dinner"], "I'm + making/cooking + dinner.", { c: ["ing-now"], pt: "Diga em inglês." }),
        speak("e10", "Diga três coisas que estão acontecendo ao seu redor agora.", ["I'm studying English. I'm sitting at a table. It's raining right now."],
          { mode: "respond", check: ["Usei am/is/are antes do verbo.", "Usei -ing nos três verbos.", "Usei now ou right now pelo menos uma vez."], c: ["ing-now"] }),
      ],
      summary: { points: ["am/is/are + verbo-ing para o que acontece agora.", "making, running, studying: atenção à grafia.", "now, right now, at the moment."], concepts: ["ing-now", "ing-spelling", "right-now"] },
    }),

    lesson("l2", {
      title: "O que você está fazendo?",
      objective: "Você vai conseguir perguntar e negar ações em andamento.",
      minutes: 8,
      context: { kind: "dialogue", title: "Ao telefone", lines: [
        { who: "Leo", en: "Hi, Ana! What are you doing?", pt: "Oi, Ana! O que você está fazendo?" },
        { who: "Ana", en: "I'm cooking. Are you working?", pt: "Estou cozinhando. Você está trabalhando?" },
        { who: "Leo", en: "No, I'm not. I'm not working today.", pt: "Não. Não estou trabalhando hoje." },
        { who: "Ana", en: "Is your brother sleeping?", pt: "Seu irmão está dormindo?" },
        { who: "Leo", en: "No, he isn't. He's playing video games.", pt: "Não. Ele está jogando videogame." },
      ] },
      explanation: {
        summary: "**Negativa:** to be + **not** + verbo-ing: **I'm not working**, **she isn't sleeping**, **they aren't listening**.\n\n**Pergunta:** to be na frente: **Are you working?** **Is he sleeping?**\n\nA pergunta mais útil de todas: **What are you doing?**",
        details: "Respostas curtas usam só o verbo to be: *Yes, I am. / No, I'm not. / Yes, he is. / No, he isn't.* Não se usa do nem does no presente contínuo.",
        examples: [
          { en: "What are you doing?", pt: "O que você está fazendo?" },
          { en: "I'm not working today.", pt: "Não estou trabalhando hoje." },
          { en: "Is she sleeping?", pt: "Ela está dormindo?" },
        ],
        contrasts: [
          { wrong: "Do you working?", right: "Are you working?", why: "No contínuo, a pergunta é com to be, não com do." },
          { wrong: "What you are doing?", right: "What are you doing?", why: "To be vem antes do sujeito." },
        ],
      },
      guided: [
        mc("e1", "How do you ask “O que você está fazendo?”", ["What are you doing?", "What do you doing?", "What you are doing?"], 0, "What + are + you + doing?", { c: ["what-doing"], pt: "Como perguntar “O que você está fazendo?”" }),
        match("e2", "Associe pergunta e resposta.", [["Are you working?", "No, I'm not."], ["Is he sleeping?", "Yes, he is."], ["What are you doing?", "I'm cooking."], ["Are they listening?", "No, they aren't."]],
          "Perguntas de sim ou não pedem resposta curta com to be.", { c: ["ing-question", "what-doing", "ing-neg"] }),
        cloze("e3", "He ___ sleeping. He's playing video games.", ["isn't", "is not"], "Negativa com he: isn't + -ing.", { c: ["ing-neg"] }),
      ],
      independent: [
        cloze("e4", "___ you listening to me?", ["Are"], "Com you: Are you + -ing?", { c: ["ing-question"] }),
        order("e5", "Put the words in order: “O que você está fazendo?”", "What are you doing?", "What + are + you + doing.", { c: ["what-doing"], extra: ["do"] }),
        fix("e6", "Do you working today?", ["Are you working today"], "Pergunta no contínuo: Are you…?", { c: ["ing-question"], prompt: "Corrija a pergunta." }),
        dict("e7", "I'm not working today.", "I'm not + verbo-ing.", { c: ["ing-neg"], alt: ["I am not working today."] }),
      ],
      application: [
        type("e8", "Ask your friend in English: “O que você está fazendo?”", ["What are you doing"], "What + are + you + doing?", { c: ["what-doing", "ing-question"], pt: "Pergunte ao seu amigo, em inglês." }),
        dialog("e9", "Um amigo liga no meio da tarde.", [
          { npc: ["Hey! What are you doing?", "Ei! O que você está fazendo?"], options: [
            ["I'm studying for a test. And you?", true, "Ele responde: “I'm watching TV.”", "Contínuo correto e pergunta de volta."],
            ["I study for a test.", false, "Ele entende, mas a frase fala de hábito.", "Para agora, use I'm studying."],
          ] },
          { npc: ["Are you coming to the party tonight?", "Você vem para a festa hoje à noite?"], options: [
            ["No, I'm not. I'm staying home.", true, "Ele lamenta.", "Resposta curta e explicação no contínuo."],
            ["No, I don't. I stay home.", false, "Soa estranho.", "A pergunta é com are: responda com I'm not."],
          ] },
        ], "Ações em andamento: to be + -ing em perguntas, respostas e negativas.", { c: ["what-doing", "ing-neg"] }),
      ],
      summary: { points: ["Negativa: I'm not / isn't / aren't + -ing.", "Pergunta: Are you…? Is she…?", "What are you doing?"], concepts: ["ing-neg", "ing-question", "what-doing"] },
    }),

    lesson("l3", {
      title: "Sempre x agora",
      objective: "Você vai conseguir escolher entre o presente simples (hábito) e o contínuo (agora).",
      minutes: 9,
      context: { kind: "text", title: "Um dia diferente", lines: [
        { en: "Marta usually takes the bus to work.", pt: "Marta geralmente pega o ônibus para o trabalho." },
        { en: "But today she is walking, because it's a beautiful day.", pt: "Mas hoje ela está indo a pé, porque o dia está lindo." },
        { en: "She works in a hospital every day.", pt: "Ela trabalha em um hospital todos os dias." },
        { en: "Right now she isn't working. She's having lunch in the park.", pt: "Agora ela não está trabalhando. Está almoçando no parque." },
      ] },
      explanation: {
        summary: "Dois tempos, duas ideias:\n- **Presente simples** = hábito, rotina, fato: *She **takes** the bus **every day**.*\n- **Presente contínuo** = agora, hoje, neste momento: *Today she **is walking**.*\n\nOs marcadores ajudam: **usually, always, every day** pedem o simples; **now, today, at the moment** pedem o contínuo.",
        details: "Em português, “estou trabalhando” e “trabalho” às vezes se confundem. Em inglês a diferença é firme: *I work in a bank* (é o meu emprego) x *I'm working now* (neste instante).",
        examples: [
          { en: "I usually drink coffee, but today I'm drinking tea.", pt: "Geralmente bebo café, mas hoje estou bebendo chá." },
          { en: "He plays soccer every Saturday.", pt: "Ele joga futebol todo sábado." },
          { en: "He's playing soccer right now.", pt: "Ele está jogando futebol agora." },
        ],
        contrasts: [
          { wrong: "I'm working in a bank every day.", right: "I work in a bank every day.", why: "Every day indica hábito: presente simples." },
          { wrong: "Look! It rains.", right: "Look! It's raining.", why: "O que acontece agora pede o contínuo." },
        ],
      },
      guided: [
        mc("e1", "Choose: “She ___ the bus every day.”", ["takes", "is taking", "taking"], 0, "Every day = hábito: presente simples.", { c: ["habit-vs-now", "time-markers"], pt: "Escolha a forma correta." }),
        match("e2", "Associe o marcador ao tempo verbal.", [["every day", "presente simples"], ["right now", "presente contínuo"], ["usually", "hábito (simples)"], ["today", "agora (contínuo)"]],
          "Os marcadores indicam se é hábito ou agora.", { c: ["time-markers"], s: "grammar" }),
        cloze("e3", "Look! It ___ raining.", ["is", "'s"], "Algo que acontece agora: is raining.", { c: ["habit-vs-now"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "He ___ soccer every Saturday.", ["plays"], "Every Saturday = hábito: plays.", { c: ["habit-vs-now", "time-markers"], cue: "(play)" }),
        cloze("e5", "I usually drink coffee, but today I ___ drinking tea.", ["am", "'m"], "Today = agora: I am drinking.", { c: ["habit-vs-now"], cue: "(be)" }),
        fix("e6", "I'm getting up at six every day.", ["I get up at six every day"], "Every day pede presente simples.", { c: ["habit-vs-now", "time-markers"], prompt: "Corrija o tempo verbal." }),
        dict("e7", "She usually walks, but today she's driving.", "Hábito no simples, hoje no contínuo.", { c: ["habit-vs-now"], alt: ["She usually walks, but today she is driving."] }),
      ],
      application: [
        type("e8", "Say in English: “Eu trabalho todo dia, mas hoje não estou trabalhando.”", ["I work every day, but today I'm not working", "I work every day, but today I am not working", "I work every day, but I'm not working today", "I work every day, but I am not working today"], "Hábito no simples; hoje no contínuo.", { c: ["habit-vs-now"], pt: "Diga em inglês." }),
        listen("e9", "I usually have lunch at home, but today I'm eating at a restaurant.", "Where is the person having lunch today?", ["At a restaurant", "At home", "At work"], 0, "Today I'm eating at a restaurant.", { c: ["habit-vs-now"], pt: "Onde a pessoa está almoçando hoje?" }),
        speak("e10", "Compare um hábito seu com o que está fazendo agora.", ["I usually study at night, but today I'm studying in the morning."],
          { mode: "respond", check: ["Usei o presente simples para o hábito.", "Usei o contínuo para hoje ou agora.", "Liguei as duas ideias com but."], c: ["habit-vs-now"] }),
      ],
      summary: { points: ["Simples = hábito; contínuo = agora.", "usually, every day → simples.", "now, today, at the moment → contínuo."], concepts: ["habit-vs-now", "time-markers"] },
    }),

    lesson("l4", {
      title: "Verbos que não gostam de -ing",
      objective: "Você vai conseguir evitar o -ing com verbos de estado e falar de situações temporárias.",
      minutes: 9,
      context: { kind: "dialogue", title: "Mudança de planos", lines: [
        { who: "Ken", en: "Where are you living these days?", pt: "Onde você está morando ultimamente?" },
        { who: "Bia", en: "I'm staying with a friend this week. They're painting my apartment.", pt: "Estou ficando na casa de uma amiga esta semana. Estão pintando meu apartamento." },
        { who: "Ken", en: "Do you like it there?", pt: "Você gosta de lá?" },
        { who: "Bia", en: "Yes, I like it. But I want my own bed! I need my things.", pt: "Gosto. Mas quero a minha cama! Preciso das minhas coisas." },
      ] },
      explanation: {
        summary: "Alguns verbos descrevem **estados**, não ações, e **não vão para o -ing**: **know**, **want**, **like**, **need**, **understand**, **believe**.\n\n- *I **want** a coffee now.* (e não “I'm wanting”)\n- *I **don't understand**.* (e não “I'm not understanding”)\n\nJá o contínuo também serve para **situações temporárias**: *I'm staying with a friend **this week**.*",
        details: "Marcadores de situação temporária: **this week**, **this month**, **these days**, **for now**. Compare: *I live in Recife* (permanente) x *I'm living with my parents for now* (temporário).",
        examples: [
          { en: "I know the answer.", pt: "Eu sei a resposta." },
          { en: "She needs help right now.", pt: "Ela precisa de ajuda agora." },
          { en: "We're working from home this month.", pt: "Estamos trabalhando de casa este mês." },
        ],
        contrasts: [
          { wrong: "I'm wanting a coffee.", right: "I want a coffee.", why: "Want é verbo de estado: sem -ing." },
          { wrong: "I'm not understanding.", right: "I don't understand.", why: "Understand não vai para o contínuo." },
        ],
      },
      guided: [
        mc("e1", "Which sentence is correct?", ["I want a coffee now.", "I'm wanting a coffee now.", "I wanting a coffee now."], 0, "Want é verbo de estado: presente simples, mesmo com now.", { c: ["state-verbs"], pt: "Qual frase está correta?" }),
        match("e2", "Associe o verbo ao tipo.", [["know", "estado: sem -ing"], ["cook", "ação: pode ter -ing"], ["need", "estado: nunca -ing"], ["run", "ação: aceita -ing"]],
          "Verbos de estado ficam no presente simples.", { c: ["state-verbs"], s: "grammar" }),
        cloze("e3", "I'm ___ with a friend this week.", ["staying"], "Situação temporária: contínuo.", { c: ["temporary"], cue: "(stay)" }),
      ],
      independent: [
        cloze("e4", "Sorry, I ___ understand. Can you repeat?", ["don't", "do not"], "Understand é de estado: I don't understand.", { c: ["state-verbs"] }),
        fix("e5", "She is needing help now.", ["She needs help now"], "Need é verbo de estado: needs.", { c: ["state-verbs"], prompt: "Corrija o erro." }),
        order("e6", "Put the words in order: “Estamos trabalhando de casa este mês.”", "We are working from home this month.", "Contínuo para situação temporária.", { c: ["temporary"] }),
        dict("e7", "I know the answer, but I need more time.", "Know e need: sem -ing.", { c: ["state-verbs"] }),
        cloze("e8", "He ___ living with his parents for now.", ["is", "'s"], "For now = temporário: is living.", { c: ["temporary"], cue: "(be)" }),
      ],
      application: [
        type("e9", "Say in English: “Eu preciso de ajuda agora.”", ["I need help now", "I need help right now"], "Need não vai para o -ing.", { c: ["state-verbs"], pt: "Diga em inglês.", t: [["I'm needing help now", "Need é verbo de estado: use I need."]] }),
        write("e10", "Escreva três frases: algo temporário na sua vida, algo que você quer agora e algo que você sabe.",
          { frame: ["This week I'm …", "Right now I want …", "I know …"], min: 14, check: ["Usei o contínuo para a situação temporária.", "Usei want sem -ing.", "Usei know sem -ing."], model: "This week I'm working from home. Right now I want a coffee. I know my neighbors very well.", c: ["temporary", "state-verbs"] }),
      ],
      summary: { points: ["know, want, like, need, understand: sem -ing.", "Contínuo para situações temporárias: this week, these days.", "I live (permanente) x I'm living (temporário)."], concepts: ["state-verbs", "temporary"] },
    }),
  ],

  checkpoint: {
    intro: "New situations: say what is happening now, what happens usually, and avoid -ing with state verbs.",
    a: [
      cloze("q1", "Be quiet! The baby ___ sleeping.", ["is", "'s"], "Agora: is sleeping.", { c: ["ing-now"], cue: "(be)" }),
      mc("q2", "Choose: “I ___ to work by bus every day.”", ["go", "am going", "going"], 0, "Every day = hábito.", { c: ["habit-vs-now"] }),
      fix("q3", "I'm knowing the answer.", ["I know the answer"], "Know é verbo de estado.", { c: ["state-verbs"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Ele não está trabalhando hoje.”", "He isn't working today.", "Negativa no contínuo.", { c: ["ing-neg"], extra: ["doesn't"] }),
      dict("q5", "What are you doing right now?", "A pergunta sobre o momento presente.", { c: ["what-doing", "right-now"] }),
      type("q6", "Ask in English: “Você está ouvindo?”", ["Are you listening"], "Are + you + listening?", { c: ["ing-question"] }),
      cloze("q7", "She is ___ in the pool.", ["swimming"], "Swim dobra o m: swimming.", { c: ["ing-spelling"], cue: "(swim)" }),
      listen("q8", "I usually work on Monday, but this week I'm working on Sunday too.", "What is different this week?", ["She is working on Sunday too.", "She isn't working on Monday.", "She is working from home."], 0, "This week I'm working on Sunday too.", { c: ["temporary", "habit-vs-now"] }),
      mc("q9", "Which marker goes with the present simple?", ["every day", "right now", "at the moment"], 0, "Every day indica hábito.", { c: ["time-markers"] }),
      dialog("q10", "Your manager calls you during the day.", [
        { npc: ["Hi. Are you working on the report?", "Oi. Você está trabalhando no relatório?"], options: [
          ["Yes, I am. I'm writing the last page now.", true, "Ela diz: “Great, thanks.”", "Resposta curta e contínuo."],
          ["Yes, I do. I write the last page now.", false, "Soa errado.", "A pergunta é com are; a ação é de agora."],
        ] },
        { npc: ["Do you need anything?", "Você precisa de alguma coisa?"], options: [
          ["Yes, I need the sales numbers.", true, "Ela envia os números.", "Need no presente simples."],
          ["Yes, I'm needing the sales numbers.", false, "Ela entende, mas soa errado.", "Need é verbo de estado."],
        ] },
      ], "Contínuo para a ação em curso; simples para verbos de estado.", { c: ["ing-question", "state-verbs"] }),
    ],
    b: [
      cloze("q1", "They ___ playing in the garden now.", ["are", "'re"], "Com they: are + -ing.", { c: ["ing-now"], cue: "(be)" }),
      mc("q2", "Choose: “Look! That man ___ your bike!”", ["is taking", "takes", "take"], 0, "Look! indica algo acontecendo agora.", { c: ["habit-vs-now"] }),
      fix("q3", "What you are doing?", ["What are you doing"], "To be antes do sujeito.", { c: ["what-doing"], prompt: "Corrija a pergunta." }),
      order("q4", "Put the words in order: “Eu quero um café agora.”", "I want a coffee now.", "Want não leva -ing.", { c: ["state-verbs"], extra: ["wanting"] }),
      dict("q5", "We aren't watching TV.", "Negativa com we: aren't + -ing.", { c: ["ing-neg"], alt: ["We are not watching TV."] }),
      type("q6", "Say in English: “Ela está fazendo um bolo.” (bolo = cake)", ["She is making a cake", "She's making a cake", "She is baking a cake", "She's baking a cake"], "She's making…", { c: ["ing-now", "ing-spelling"] }),
      cloze("q7", "I'm busy at the ___. Can I call you later?", ["moment"], "At the moment = neste momento.", { c: ["right-now"], s: "vocabulary" }),
      listen("q8", "Is your sister working? No, she isn't. She's studying.", "What is the sister doing?", ["Studying", "Working", "Sleeping"], 0, "She's studying.", { c: ["ing-question", "ing-neg"] }),
      mc("q9", "Which sentence describes a temporary situation?", ["I'm living with my aunt this month.", "I live in Brazil.", "I like my city."], 0, "This month + contínuo = temporário.", { c: ["temporary"] }),
      dialog("q10", "A friend sends a voice message.", [
        { npc: ["Hey, where are you? What are you doing?", "Ei, cadê você? O que você está fazendo?"], options: [
          ["I'm at the gym. I'm running.", true, "Ele responde: “Nice!”", "Contínuo com grafia correta."],
          ["I'm at the gym. I run now.", false, "Soa estranho.", "Para agora: I'm running."],
        ] },
        { npc: ["Do you usually go in the morning?", "Você costuma ir de manhã?"], options: [
          ["No, I usually go at night, but today I'm free.", true, "A conversa continua.", "Hábito no simples."],
          ["No, I'm usually going at night.", false, "Ele entende, mas não é natural.", "Usually pede presente simples."],
        ] },
      ], "Agora no contínuo; hábito no simples.", { c: ["habit-vs-now", "time-markers"] }),
    ],
    production: write("t1", "Write a short message to a friend: say where you are and what you are doing now, compare it with what you usually do, and mention something temporary in your life.",
      { mode: "free", min: 30, check: ["Usei o presente contínuo para agora.", "Usei o presente simples para um hábito.", "Mencionei algo temporário (this week, these days).", "Não usei -ing com want, need, know ou like."],
        model: "Hi! I'm at a cafe right now. I'm drinking tea and reading. I usually study at home, but today my house is noisy. This week I'm working from home. I want to see you soon!", c: ["ing-now", "habit-vs-now", "temporary"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Um cartão-postal",
      goal: "Ler uma mensagem de viagem e distinguir o que é de agora do que é habitual.",
      context: { kind: "message", title: "Postcard from Rio", lines: [
        { who: "Tom", en: "Hi! I'm writing from Rio. I'm sitting at a cafe near the beach.", pt: "Oi! Estou escrevendo do Rio. Estou sentado em um café perto da praia." },
        { who: "Tom", en: "It's raining today, so I'm not swimming. I usually swim every morning here.", pt: "Hoje está chovendo, então não estou nadando. Aqui eu geralmente nado toda manhã." },
        { who: "Tom", en: "I'm staying at a small hotel this week. I like it, but I need a bigger room!", pt: "Estou hospedado em um hotel pequeno esta semana. Gosto dele, mas preciso de um quarto maior!" },
      ] },
      exercises: [
        mc("r1", "What is Tom doing right now?", ["Sitting at a cafe", "Swimming", "Sleeping at the hotel"], 0, "I'm sitting at a cafe.", { c: ["ing-now"], s: "reading" }),
        mc("r2", "What does Tom usually do in the morning?", ["He swims.", "He writes postcards.", "He works."], 0, "I usually swim every morning.", { c: ["habit-vs-now"], s: "reading" }),
        type("r3", "Why isn't he swimming today? Complete: Because it is ___.", ["raining"], "It's raining today.", { c: ["ing-now", "ing-spelling"], s: "reading" }),
        cloze("r4", "He ___ a bigger room.", ["needs"], "I need a bigger room → He needs.", { c: ["state-verbs"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Ligação rápida",
      goal: "Entender o que alguém está fazendo e o que costuma fazer.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Hi! Are you busy?", pt: "Oi! Você está ocupado?" },
        { who: "B", en: "A little. I'm making dinner. I usually eat at eight, but today I'm eating early.", pt: "Um pouco. Estou fazendo o jantar. Geralmente como às oito, mas hoje vou comer cedo." },
      ] },
      exercises: [
        listen("a1", ["Hi! Are you busy?", "A little. I'm making dinner. I usually eat at eight, but today I'm eating early."], "What is the person doing?", ["Making dinner", "Eating at a restaurant", "Working"], 0, "I'm making dinner.", { c: ["ing-now"] }),
        listen("a2", ["Hi! Are you busy?", "A little. I'm making dinner. I usually eat at eight, but today I'm eating early."], "What time does the person usually eat?", ["At eight", "At six", "At nine"], 0, "I usually eat at eight.", { c: ["habit-vs-now"], keepOrder: true }),
        dict("a3", "I'm making dinner.", "I'm + making.", { c: ["ing-now", "ing-spelling"], alt: ["I am making dinner."], prompt: "Type the sentence about dinner." }),
      ],
    }),
    writing: activity("writing", {
      title: "Mensagem de status",
      goal: "Escrever uma mensagem dizendo o que está fazendo e o que costuma fazer.",
      exercises: [
        write("w1", "Write a message to your family group: where you are, what you are doing and what is different from your routine today.",
          { frame: ["I'm at …", "I'm …ing", "I usually …, but today …"], min: 18, check: ["Usei o contínuo para agora.", "Usei o simples para o hábito.", "Liguei as ideias com but."], model: "Hi! I'm at the library. I'm studying for a test. I usually study at home, but today my brother is playing music.", c: ["ing-now", "habit-vs-now"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Narrando o momento",
      goal: "Descrever em voz alta o que está acontecendo ao redor.",
      exercises: [
        speak("s1", "Look around and describe four things that are happening now. Then say one thing you usually do at this time.", ["I'm sitting on the sofa. My phone is charging. It's raining. A car is passing. I usually have dinner at this time."],
          { mode: "respond", check: ["Usei am/is/are + -ing.", "Descrevi pelo menos três ações.", "Incluí um hábito no presente simples.", "Ouvi o modelo e comparei."], c: ["ing-now", "habit-vs-now"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: ligação de trabalho",
      goal: "Explicar por telefone o que está fazendo e por que não pode falar agora.",
      exercises: [
        dialog("m1", "A colleague from another country calls you while you are busy.", [
          { npc: ["Hi! Is this a good time?", "Oi! É uma boa hora?"], options: [
            ["Sorry, I'm driving right now. Can I call you later?", true, "Ela diz: “Sure, no problem.”", "Explicou no contínuo e propôs ligar depois."],
            ["Sorry, I drive right now.", false, "Ela entende, mas a frase está errada.", "Agora = I'm driving."],
          ] },
          { npc: ["Sure. What time?", "Claro. A que horas?"], options: [
            ["I usually finish at six. Is half past six okay?", true, "Ela confirma o horário.", "Hábito no simples e proposta de horário."],
            ["I'm usually finishing at six.", false, "Soa estranho.", "Usually pede presente simples."],
          ] },
          { npc: ["Perfect. Do you need the documents now?", "Perfeito. Você precisa dos documentos agora?"], options: [
            ["No, I don't need them now. Thanks!", true, "Ela se despede.", "Need no presente simples."],
            ["No, I'm not needing them.", false, "Ela entende, mas soa errado.", "Need é verbo de estado."],
          ] },
        ], "Explicar a situação atual e combinar depois.", { c: ["ing-now", "habit-vs-now", "state-verbs"] }),
        write("m2", "Write the short text message you would send instead of answering the call.", { min: 10, check: ["Disse o que estou fazendo.", "Propus ligar depois.", "Usei o contínuo."], model: "Sorry, I'm driving right now. I can call you at half past six.", c: ["ing-now"] }),
      ],
      outside: {
        title: "Fora do app: comentarista do seu dia",
        instructions: "Em três momentos de hoje, pare por dez segundos e narre em inglês, em voz alta ou mentalmente, o que você está fazendo (“I'm washing the dishes”) e o que costuma fazer nessa hora (“I usually watch TV”).",
        checklist: ["Narrei três momentos com o presente contínuo.", "Comparei com um hábito no presente simples.", "Não usei -ing com want, need ou know."],
      },
    }),
  },
});
