/** B1 · Unidade 7 — Notícias e relatos: voz passiva, discurso indireto, say × tell, actually. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "A new bridge was opened in the city yesterday. It was built in two years and it is used by ten thousand cars a day. According to the mayor, the project was finished early. A resident said that the traffic was much better. Actually, some people are not happy: they told reporters that the toll is too expensive.";

export default defineUnit({
  id: "b1-u07",

  concepts: [
    concept("passive-present", "pattern", "is / are + past participle", "é / são + particípio", "l1", ["Coffee is grown in Brazil.", "O café é cultivado no Brasil."], { note: "Usa-se quando a ação importa mais do que quem a faz." }),
    concept("by-agent", "pattern", "… by + quem faz", "… por + quem faz", "l1", ["The app is used by millions of people.", "O aplicativo é usado por milhões de pessoas."], { note: "Só mencione o agente quando ele for importante." }),
    concept("passive-past", "pattern", "was / were + past participle", "foi / foram + particípio", "l2", ["The museum was built in 1950.", "O museu foi construído em 1950."]),
    concept("was-born", "phrase", "I was born in …", "Eu nasci em …", "l2", ["I was born in Salvador.", "Nasci em Salvador."], { note: "Em inglês, nascer é passivo: was born. Nunca “I born”.", tags: ["chunk"] }),
    concept("said-that", "pattern", "She said (that) she was …", "Ela disse que estava …", "l3", ["He said that he was tired.", "Ele disse que estava cansado."], { note: "Ao relatar, o verbo recua um tempo: am → was, will → would, can → could." }),
    concept("say-tell", "pattern", "say something / tell someone", "dizer algo / dizer a alguém", "l3", ["She told me that she was busy.", "Ela me disse que estava ocupada."], { note: "tell pede a pessoa: told me. say não pede: said that." }),
    concept("told-to", "pattern", "tell / ask someone to do something", "mandar / pedir para alguém fazer algo", "l3", ["The doctor told me to rest.", "O médico me mandou descansar."], { note: "Pedido ou ordem relatados: told/asked + pessoa + to + verbo." }),
    concept("actually", "word", "actually / currently", "na verdade / atualmente", "l4", ["Actually, the meeting is tomorrow.", "Na verdade, a reunião é amanhã."], { note: "Falso cognato: actually não é “atualmente”. Atualmente é currently.", tags: ["false-friend"] }),
    concept("according-to", "phrase", "according to …", "de acordo com …, segundo …", "l4", ["According to the report, sales went up.", "Segundo o relatório, as vendas subiram."], { note: "Não se usa com a própria opinião: nunca “according to me”." }),
  ],

  lessons: [
    lesson("l1", {
      title: "É feito, é usado",
      objective: "Você vai conseguir descrever fatos e processos sem dizer quem faz a ação.",
      minutes: 9,
      context: { kind: "text", title: "Do campo à xícara", lines: [
        { en: "Coffee is grown in more than fifty countries.", pt: "O café é cultivado em mais de cinquenta países." },
        { en: "The beans are picked by hand and then they are dried in the sun.", pt: "Os grãos são colhidos à mão e depois secos ao sol." },
        { en: "Most of the coffee is sold to other countries.", pt: "A maior parte do café é vendida para outros países." },
        { en: "It is drunk by millions of people every morning.", pt: "É bebido por milhões de pessoas toda manhã." },
      ] },
      explanation: {
        summary: "A **voz passiva** põe o foco **no que recebe a ação**:\n- Ativa: *Farmers grow coffee in Brazil.*\n- Passiva: *Coffee **is grown** in Brazil.*\n\nForma no presente: **is / are + particípio** (a terceira forma do verbo: made, used, sold, written).",
        details: "Use a passiva quando quem faz a ação é desconhecido, óbvio ou pouco importante. Se quiser dizer quem faz, use **by**: *The app is used by millions of people.* O verbo be concorda com o sujeito: *the bean **is** picked* × *the beans **are** picked*.",
        examples: [
          { en: "English is spoken here.", pt: "Fala-se inglês aqui." },
          { en: "These phones are made in China.", pt: "Esses celulares são fabricados na China." },
          { en: "The office is cleaned every night.", pt: "O escritório é limpo toda noite." },
        ],
        contrasts: [
          { wrong: "Coffee is grow in Brazil.", right: "Coffee is grown in Brazil.", why: "Passiva pede o particípio." },
          { wrong: "The beans is picked by hand.", right: "The beans are picked by hand.", why: "Sujeito plural: are." },
        ],
      },
      guided: [
        mc("e1", "Choose: “These phones ___ in China.”", ["are made", "is made", "are make"], 0, "Plural + particípio: are made.", { c: ["passive-present"] }),
        match("e2", "Match the verb to its participle.", [["make", "made"], ["grow", "grown"], ["sell", "sold"], ["write", "written"], ["speak", "spoken"]],
          "A passiva sempre usa o particípio.", { c: ["passive-present"], s: "grammar", pt: "Associe o verbo ao particípio." }),
        cloze("e3", "The app is used ___ millions of people.", ["by"], "O agente vem depois de by.", { c: ["by-agent"] }),
      ],
      independent: [
        cloze("e4", "English ___ spoken in many countries.", ["is"], "Sujeito singular: is spoken.", { c: ["passive-present"] }),
        cloze("e5", "The beans are ___ by hand.", ["picked", "collected"], "Are + particípio.", { c: ["passive-present"], cue: "(pick)" }),
        fix("e6", "The office is clean every night by a small team.", ["The office is cleaned every night by a small team"], "Is + particípio: cleaned.", { c: ["passive-present"], prompt: "Fix the verb." }),
        order("e7", "Put the words in order: “O relatório é escrito pelo gerente.”", "The report is written by the manager.", "Is written + by + agente.", { c: ["by-agent"], extra: ["wrote"] }),
        dict("e8", "Coffee is grown in Brazil.", "Is + particípio.", { c: ["passive-present"] }),
      ],
      application: [
        type("e9", "Rewrite in the passive: “Millions of people use this app.”", ["This app is used by millions of people"], "This app is used by…", { c: ["by-agent", "passive-present"] }),
        speak("e10", "Describe a product from your country in three passive sentences: where it is made, how it is sold and who uses it.", ["Cachaca is made in Brazil. It is sold in bottles. It is used by bartenders all over the world."],
          { mode: "respond", check: ["Usei is/are + particípio.", "Usei by para dizer quem usa.", "Fiz três frases."], c: ["passive-present", "by-agent"] }),
      ],
      summary: { points: ["is/are + particípio.", "O foco é o que recebe a ação.", "by + agente, só se for importante."], concepts: ["passive-present", "by-agent"] },
    }),

    lesson("l2", {
      title: "Foi construído, foi fundada",
      objective: "Você vai conseguir contar fatos do passado na voz passiva.",
      minutes: 9,
      context: { kind: "notice", title: "Placa em um museu", lines: [
        { en: "This building was designed by a Brazilian architect.", pt: "Este prédio foi projetado por um arquiteto brasileiro." },
        { en: "It was built in 1950 and it was opened to the public in 1952.", pt: "Foi construído em 1950 e aberto ao público em 1952." },
        { en: "The paintings in this room were donated by local families.", pt: "As pinturas desta sala foram doadas por famílias da região." },
        { en: "The artist was born in Minas Gerais.", pt: "O artista nasceu em Minas Gerais." },
      ] },
      explanation: {
        summary: "Passiva no passado: **was / were + particípio**.\n- *The museum **was built** in 1950.*\n- *The paintings **were donated** by local families.*\n\nE um caso especial: **I was born in…** (nasci em…). Em inglês, nascer é sempre passivo.",
        details: "A passiva no passado aparece muito em notícias, história e placas: *was founded, was discovered, was invented, were stolen, was cancelled*. Para perguntar: *When was it built? Where were you born?*",
        examples: [
          { en: "The company was founded in 1998.", pt: "A empresa foi fundada em 1998." },
          { en: "My wallet was stolen yesterday.", pt: "Minha carteira foi roubada ontem." },
          { en: "Where were you born?", pt: "Onde você nasceu?" },
        ],
        contrasts: [
          { wrong: "I born in Salvador.", right: "I was born in Salvador.", why: "Nascer = be born." },
          { wrong: "The museum was build in 1950.", right: "The museum was built in 1950.", why: "Particípio de build: built." },
        ],
      },
      guided: [
        mc("e1", "Choose: “The company ___ in 1998.”", ["was founded", "founded", "is found"], 0, "Passado passivo: was founded.", { c: ["passive-past"] }),
        mc("e2", "Choose the correct sentence.", ["I was born in Recife.", "I born in Recife.", "I am born in Recife."], 0, "I was born in…", { c: ["was-born"] }),
        cloze("e3", "The paintings ___ donated by local families.", ["were"], "Plural no passado: were.", { c: ["passive-past"] }),
      ],
      independent: [
        cloze("e4", "The museum was ___ in 1950.", ["built", "constructed"], "Particípio de build: built.", { c: ["passive-past"], cue: "(build)" }),
        fix("e5", "My sister born in 2001.", ["My sister was born in 2001"], "Be born: was born.", { c: ["was-born"], prompt: "Fix the mistake." }),
        order("e6", "Put the words in order: “Minha carteira foi roubada ontem.”", "My wallet was stolen yesterday.", "Was + particípio.", { c: ["passive-past"], extra: ["stole"] }),
        dict("e7", "This building was designed by a Brazilian architect.", "Was designed by…", { c: ["passive-past"] }),
        type("e8", "Ask in English: “Onde você nasceu?”", ["Where were you born"], "Where were you born?", { c: ["was-born"] }),
      ],
      application: [
        fix("e9", "The flight cancelled because of the storm.", ["The flight was cancelled because of the storm", "The flight was canceled because of the storm"], "O voo não cancela nada: ele foi cancelado.", { c: ["passive-past"], prompt: "Fix the mistake." }),
        write("e10", "Write three sentences about a place or object you know: when it was built or made, who made it, and one more fact. Add where you were born.",
          { frame: ["… was built / made in …", "It was … by …", "I was born in …"], min: 22, check: ["Usei was/were + particípio.", "Usei by para o agente.", "Escrevi I was born in."], model: "My school was built in 1970. It was designed by a local engineer. The library was renovated last year. I was born in Fortaleza, near that school.", c: ["passive-past", "was-born"] }),
      ],
      summary: { points: ["was/were + particípio.", "I was born in… (nunca I born).", "When was it built?"], concepts: ["passive-past", "was-born"] },
    }),

    lesson("l3", {
      title: "Ela disse que…",
      objective: "Você vai conseguir relatar o que outra pessoa disse ou pediu.",
      minutes: 10,
      context: { kind: "dialogue", title: "Passando um recado", lines: [
        { who: "Igor", en: "Did you talk to Laura?", pt: "Você falou com a Laura?" },
        { who: "Bia", en: "Yes. She said that she was sick.", pt: "Sim. Ela disse que estava doente." },
        { who: "Igor", en: "Is she coming to the meeting?", pt: "Ela vem à reunião?" },
        { who: "Bia", en: "No. She told me that she would work from home.", pt: "Não. Ela me disse que trabalharia de casa." },
        { who: "Igor", en: "And the report?", pt: "E o relatório?" },
        { who: "Bia", en: "She asked me to send it to you.", pt: "Ela me pediu para mandá-lo para você." },
      ] },
      explanation: {
        summary: "Para **relatar** o que alguém disse, o verbo **recua um tempo**:\n- “I **am** sick.” → She said she **was** sick.\n- “I **will** call.” → He said he **would** call.\n- “I **can** help.” → She said she **could** help.\n\n**say** × **tell**:\n- **say** (that) … → *She said that…*\n- **tell** + pessoa → *She told **me** that…*",
        details: "Para relatar um pedido ou ordem: **told / asked + pessoa + to + verbo**: *He told me to wait. She asked us to be quiet.* O negativo é *not to*: *She told me not to worry.* O **that** é opcional na fala.",
        examples: [
          { en: "He said he was tired.", pt: "Ele disse que estava cansado." },
          { en: "They told us that the store was closed.", pt: "Eles nos disseram que a loja estava fechada." },
          { en: "She told me not to worry.", pt: "Ela me disse para não me preocupar." },
        ],
        contrasts: [
          { wrong: "She said me that she was sick.", right: "She told me that she was sick.", why: "Com a pessoa: tell." },
          { wrong: "He told that he was late.", right: "He said that he was late.", why: "Sem a pessoa: say." },
          { wrong: "He told me wait.", right: "He told me to wait.", why: "Told + pessoa + to + verbo." },
        ],
      },
      guided: [
        mc("e1", "Choose: “She ___ me that she was sick.”", ["told", "said", "spoke"], 0, "Com a pessoa (me): told.", { c: ["say-tell"] }),
        match("e2", "Match the direct speech to the report.", [["“I am tired.”", "He said he was tired."], ["“I will call you.”", "He said he would call me."], ["“I can help.”", "He said he could help."], ["“I live in Lima.”", "He said he lived in Lima."]],
          "O verbo recua um tempo.", { c: ["said-that"], s: "grammar", pt: "Associe a fala direta ao relato." }),
        cloze("e3", "He ___ that he was late.", ["said"], "Sem a pessoa: said.", { c: ["say-tell"] }),
      ],
      independent: [
        cloze("e4", "“I am busy.” → She said that she ___ busy.", ["was"], "Am recua para was.", { c: ["said-that"] }),
        cloze("e5", "“I will work from home.” → She said she ___ work from home.", ["would"], "Will recua para would.", { c: ["said-that"] }),
        fix("e6", "The teacher said us that the test was easy.", ["The teacher told us that the test was easy", "The teacher told us the test was easy"], "Com a pessoa (us): told.", { c: ["say-tell"], prompt: "Fix the mistake." }),
        cloze("e7", "The doctor told me ___ rest for a week.", ["to"], "Told + pessoa + to + verbo.", { c: ["told-to"] }),
        dict("e8", "She asked me to send it to you.", "Asked + pessoa + to + verbo.", { c: ["told-to"] }),
      ],
      application: [
        type("e9", "Report it: Ana says, “I can help.” → Ana said that…", ["Ana said that she could help", "Ana said she could help"], "Can recua para could.", { c: ["said-that"] }),
        fix("e10", "My boss told me finish the report today.", ["My boss told me to finish the report today"], "Told me to + verbo.", { c: ["told-to"], prompt: "Fix the mistake." }),
        dialog("e11", "You took a phone message for a colleague.", [
          { npc: ["Did anyone call while I was out?", "Alguém ligou enquanto eu estava fora?"], options: [
            ["Yes, Mr. Costa called. He said that he was at the airport.", true, "Sua colega anota.", "Said that + was."],
            ["Yes, Mr. Costa called. He said me that he is at the airport.", false, "Soa errado.", "Said não leva a pessoa; e o verbo recua."],
          ] },
          { npc: ["Did he leave a message?", "Ele deixou recado?"], options: [
            ["Yes. He asked you to call him back before five.", true, "Ela pega o telefone.", "Asked + pessoa + to + verbo."],
            ["Yes. He asked you call him.", false, "Falta uma palavra.", "Asked you to call."],
          ] },
        ], "Passar um recado: o que a pessoa disse e o que pediu.", { c: ["said-that", "told-to"] }),
      ],
      summary: { points: ["O verbo recua: am→was, will→would, can→could.", "say (that) × tell + pessoa.", "told/asked + pessoa + to + verbo."], concepts: ["said-that", "say-tell", "told-to"] },
    }),

    lesson("l4", {
      title: "Na verdade, segundo a notícia…",
      objective: "Você vai conseguir citar fontes e corrigir informações com naturalidade.",
      minutes: 9,
      context: { kind: "dialogue", title: "Comentando uma notícia", lines: [
        { who: "Leo", en: "According to the news, the new subway line opens in May.", pt: "Segundo o noticiário, a nova linha de metrô abre em maio." },
        { who: "Ana", en: "Actually, I read that it was delayed until August.", pt: "Na verdade, eu li que foi adiada para agosto." },
        { who: "Leo", en: "Really? Where do you currently take the bus?", pt: "Sério? Onde você pega o ônibus atualmente?" },
        { who: "Ana", en: "Two blocks from here. According to my neighbor, the station will be closer.", pt: "A dois quarteirões daqui. Segundo meu vizinho, a estação vai ficar mais perto." },
      ] },
      explanation: {
        summary: "Para **citar a fonte**:\n- **According to** + fonte: *According to the report, sales went up.*\n\nPara **corrigir ou surpreender**:\n- **Actually,** … = na verdade\n\nAtenção: **actually** não é “atualmente”. Para “atualmente”, use **currently** ou **these days**.",
        details: "*According to* serve para outras pessoas e fontes, não para você: diga *In my opinion*, e não “according to me”. *Actually* suaviza uma correção: *Actually, it's on Tuesday* soa mais educado do que *No, it's on Tuesday*.",
        examples: [
          { en: "According to the weather forecast, it will rain.", pt: "Segundo a previsão do tempo, vai chover." },
          { en: "Actually, I'm not from here.", pt: "Na verdade, eu não sou daqui." },
          { en: "I'm currently working on a new project.", pt: "Atualmente estou trabalhando em um projeto novo." },
        ],
        contrasts: [
          { wrong: "Actually, I work in a bank. (= atualmente)", right: "Currently, I work in a bank.", why: "Actually = na verdade." },
          { wrong: "According to me, it's a bad idea.", right: "In my opinion, it's a bad idea.", why: "According to não se usa com a própria opinião." },
        ],
      },
      guided: [
        mc("e1", "What does “actually” mean?", ["Na verdade", "Atualmente", "Finalmente"], 0, "Actually = na verdade.", { c: ["actually"], s: "vocabulary" }),
        mc("e2", "Choose: “___ the report, sales went up.”", ["According to", "According", "In my opinion of"], 0, "According to + fonte.", { c: ["according-to"] }),
        match("e3", "Match the word to its meaning.", [["actually", "na verdade"], ["currently", "atualmente"], ["according to", "segundo"], ["apparently", "pelo visto"]],
          "Quatro palavras frequentes em notícias e conversas.", { c: ["actually", "according-to"], s: "vocabulary", pt: "Associe a palavra ao significado." }),
      ],
      independent: [
        cloze("e4", "___ to the news, the line opens in May.", ["According"], "According to.", { c: ["according-to"] }),
        cloze("e5", "“Is the meeting today?” “___, it's tomorrow.”", ["Actually"], "Corrigindo: actually.", { c: ["actually"], cue: "(na verdade)" }),
        cloze("e6", "She is ___ living in Lisbon, but she will move next year.", ["currently"], "Atualmente = currently.", { c: ["actually"], s: "vocabulary", cue: "(atualmente)", t: [["actually", "Actually é “na verdade”. Atualmente é currently."]] }),
        fix("e7", "According to me, the movie is too long.", ["In my opinion, the movie is too long", "I think the movie is too long"], "Para a própria opinião: In my opinion.", { c: ["according-to"], prompt: "Fix the mistake." }),
        dict("e8", "Actually, I read that it was delayed.", "Actually no começo da frase.", { c: ["actually"] }),
      ],
      application: [
        type("e9", "Say in English: “Segundo a previsão do tempo, vai chover.”", ["According to the weather forecast, it will rain", "According to the weather forecast, it's going to rain", "According to the forecast, it will rain", "According to the weather forecast, it is going to rain"], "According to + fonte.", { c: ["according-to"] }),
        speak("e10", "Tell a piece of news you heard this week: the source, what happened and one thing someone said.", ["According to the local news, a new park was opened downtown. The mayor said that it was a gift for the city. Actually, it cost a lot of money."],
          { mode: "respond", check: ["Citei a fonte com According to.", "Usei uma frase na passiva.", "Relatei uma fala com said that.", "Usei actually com o sentido de “na verdade”."], c: ["according-to", "actually"] }),
      ],
      summary: { points: ["According to + fonte (nunca “according to me”).", "Actually = na verdade.", "Atualmente = currently."], concepts: ["actually", "according-to"] },
    }),
  ],

  checkpoint: {
    intro: "New facts, news and messages. Use the passive, report what people said and quote your sources.",
    a: [
      cloze("q1", "Rice ___ eaten all over Asia.", ["is"], "Singular: is eaten.", { c: ["passive-present"] }),
      mc("q2", "Choose: “The bridge ___ in 2010.”", ["was built", "built", "was build"], 0, "Was + particípio.", { c: ["passive-past"] }),
      fix("q3", "My father born in a small town.", ["My father was born in a small town"], "Be born: was born.", { c: ["was-born"], prompt: "Fix the mistake." }),
      cloze("q4", "“I am hungry.” → Tom said that he ___ hungry.", ["was"], "Am recua para was.", { c: ["said-that"] }),
      mc("q5", "Choose: “The guide ___ us that the tour was two hours long.”", ["told", "said", "talked"], 0, "Com a pessoa (us): told.", { c: ["say-tell"] }),
      dict("q6", "The police told everyone to leave the building.", "Told + pessoa + to + verbo.", { c: ["told-to"] }),
      mc("q7", "“Actually, I don't eat meat.” The speaker is:", ["corrigindo ou esclarecendo algo", "falando do momento atual", "falando do futuro"], 0, "Actually = na verdade.", { c: ["actually"], s: "vocabulary" }),
      type("q8", "Say in English: “Segundo o médico, eu preciso dormir mais.”", ["According to the doctor, I need to sleep more", "According to my doctor, I need to sleep more"], "According to + fonte.", { c: ["according-to"] }),
      order("q9", "Put the words in order: “O prêmio foi ganho por uma estudante.”", "The prize was won by a student.", "Was won + by + agente.", { c: ["by-agent"], extra: ["win"] }),
      listen("q10", "The concert was cancelled. The organizers said that the singer was sick, and they asked people to keep their tickets.", "What should people do with their tickets?", ["Keep them", "Throw them away", "Sell them"], 0, "They asked people to keep their tickets.", { c: ["told-to", "passive-past"] }),
    ],
    b: [
      cloze("q1", "These cars ___ made in Japan.", ["are"], "Plural: are made.", { c: ["passive-present"] }),
      mc("q2", "Choose: “Two paintings ___ from the gallery last night.”", ["were stolen", "was stolen", "stole"], 0, "Plural no passado: were stolen.", { c: ["passive-past"] }),
      type("q3", "Say in English: “Eu nasci em 1995.”", ["I was born in 1995"], "I was born in…", { c: ["was-born"] }),
      cloze("q4", "“I will be late.” → Carla said that she ___ be late.", ["would"], "Will recua para would.", { c: ["said-that"] }),
      fix("q5", "He said me that the bank was closed.", ["He told me that the bank was closed", "He told me the bank was closed", "He said that the bank was closed", "He said the bank was closed"], "Said não leva a pessoa; use told me.", { c: ["say-tell"], prompt: "Fix the mistake." }),
      dict("q6", "My mother asked me to buy some bread.", "Asked + pessoa + to + verbo.", { c: ["told-to"] }),
      cloze("q7", "He used to live in Chile, but he is ___ living in Peru.", ["currently"], "Atualmente = currently.", { c: ["actually"], s: "vocabulary", cue: "(atualmente)", t: [["actually", "Actually é “na verdade”. Atualmente é currently."]] }),
      mc("q8", "Which sentence is correct?", ["According to the newspaper, prices are going up.", "According to me, prices are going up.", "According the newspaper, prices are going up."], 0, "According to + fonte externa.", { c: ["according-to"] }),
      order("q9", "Put the words in order: “Este livro foi escrito por uma médica.”", "This book was written by a doctor.", "Was written + by.", { c: ["by-agent"], extra: ["wrote"] }),
      listen("q10", "The new library was opened on Monday. The director said that it had ten thousand books, and she told visitors to bring an ID.", "What do visitors need to bring?", ["An ID", "A book", "Ten dollars"], 0, "She told visitors to bring an ID.", { c: ["told-to", "passive-past"] }),
    ],
    production: write("t1", "Write a short news report (about 60 words) about something that happened in your city, real or invented. Say what happened (passive), cite a source and report what one person said.",
      { mode: "summary", min: 50, check: ["Usei pelo menos duas frases na passiva.", "Citei uma fonte com According to.", "Relatei uma fala com said that ou told … that, com o verbo recuado.", "Usei say e tell corretamente.", "O texto responde: o quê, onde e quando."],
        model: "A new health center was opened in the north of the city last Friday. It was built in eight months and it is used by three neighborhoods. According to the mayor, two more centers will be built next year. A local nurse said that the old clinic was too small. She told reporters that patients waited for hours.", c: ["passive-past", "according-to", "said-that", "say-tell"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Notícia local",
      goal: "Ler uma notícia curta e separar fatos, fontes e opiniões relatadas.",
      context: { kind: "text", title: "New bridge opens", lines: [
        { en: "A new bridge was opened in the city yesterday. It was built in two years and it is used by ten thousand cars a day.", pt: "Uma nova ponte foi inaugurada na cidade ontem. Foi construída em dois anos e é usada por dez mil carros por dia." },
        { en: "According to the mayor, the project was finished early. A resident said that the traffic was much better.", pt: "Segundo o prefeito, o projeto foi concluído antes do prazo. Um morador disse que o trânsito estava muito melhor." },
        { en: "Actually, some people are not happy: they told reporters that the toll is too expensive.", pt: "Na verdade, algumas pessoas não estão satisfeitas: disseram aos repórteres que o pedágio é caro demais." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "How long did it take to build the bridge?", ["Two years", "Ten years", "One year"], 0, "It was built in two years.", { c: ["passive-past"] }),
        rd("r2", PASSAGE, "Who says the project was finished early?", ["The mayor", "A resident", "The reporters"], 0, "According to the mayor…", { c: ["according-to"] }),
        rd("r3", PASSAGE, "Why are some people unhappy?", ["The toll is too expensive.", "The bridge is too far.", "The traffic is worse."], 0, "They told reporters that the toll is too expensive.", { c: ["say-tell"] }),
        cloze("r4", "The bridge is used ___ ten thousand cars a day.", ["by"], "O agente vem depois de by.", { c: ["by-agent"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Recado na caixa postal",
      goal: "Entender um recado e relatar o que foi dito.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "Hi, this is Marta from the clinic. Your appointment was moved to Thursday at three. The doctor asked you to bring your exams. Actually, please come ten minutes early.", pt: "Oi, aqui é a Marta da clínica. Sua consulta foi transferida para quinta às três. O médico pediu que você traga seus exames. Na verdade, por favor, chegue dez minutos antes." }] },
      exercises: [
        listen("a1", "Hi, this is Marta from the clinic. Your appointment was moved to Thursday at three.", "When is the appointment now?", ["Thursday at three", "Tuesday at three", "Thursday at ten"], 0, "It was moved to Thursday at three.", { c: ["passive-past"] }),
        listen("a2", "The doctor asked you to bring your exams. Actually, please come ten minutes early.", "What did the doctor ask?", ["To bring the exams", "To cancel the appointment", "To call the clinic"], 0, "The doctor asked you to bring your exams.", { c: ["told-to"] }),
        dict("a3", "Your appointment was moved to Thursday.", "Was moved: passiva no passado.", { c: ["passive-past"], prompt: "Type what you hear." }),
        type("a4", "Report the message: Marta said that the appointment ___ moved to Thursday.", ["was", "had been"], "Passiva no passado: was moved.", { c: ["said-that"], s: "listening" }),
      ],
    }),
    writing: activity("writing", {
      title: "Resumo de uma conversa",
      goal: "Escrever um resumo do que foi dito em uma reunião ou conversa.",
      exercises: [
        write("w1", "Write a short summary (about 45 words) of a real or invented conversation with a manager, teacher or doctor: what they said, what they told you and what they asked you to do.",
          { mode: "summary", min: 35, check: ["Usei said that com o verbo recuado.", "Usei told me that.", "Usei asked/told me to + verbo.", "Não escrevi “said me”."], model: "I talked to my manager this morning. She said that the project was going well. She told me that the client wanted a new report by Friday. She asked me to prepare the numbers and she told me not to worry about the presentation.", c: ["said-that", "say-tell", "told-to"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Conte a notícia",
      goal: "Relatar uma notícia em voz alta, com fonte e falas.",
      exercises: [
        speak("s1", "Retell a piece of news in four sentences: what happened, where, according to whom, and what someone said.", ["A new school was opened in my neighborhood. It was built in one year. According to the local paper, it has five hundred students. The principal said that the teachers were very happy."],
          { mode: "respond", check: ["Usei a passiva pelo menos uma vez.", "Citei a fonte com According to.", "Relatei uma fala com said that.", "Ouvi o modelo e comparei."], c: ["passive-past", "according-to", "said-that"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: repassar informações",
      goal: "Repassar a um colega o que foi dito em uma reunião que ele perdeu.",
      exercises: [
        dialog("m1", "A colleague missed this morning's meeting and asks you what happened.", [
          { npc: ["What did I miss?", "O que eu perdi?"], options: [
            ["The launch was moved to next month. The director said that the product wasn't ready.", true, "Seu colega se surpreende.", "Passiva e relato corretos."],
            ["The launch moved to next month. The director said me the product isn't ready.", false, "A informação fica truncada.", "Was moved; said that; verbo recuado."],
          ] },
          { npc: ["Really? I thought everything was fine.", "Sério? Achei que estava tudo certo."], options: [
            ["Actually, two tests failed. According to the engineers, they need three more weeks.", true, "Ele entende a situação.", "Actually para corrigir; according to para a fonte."],
            ["Actually we are testing. According to me, three weeks.", false, "Fica confuso.", "Actually não é “atualmente”; according to pede uma fonte externa."],
          ] },
          { npc: ["Did she say anything about me?", "Ela falou alguma coisa sobre mim?"], options: [
            ["Yes. She asked you to send the new schedule by Friday.", true, "Ele anota: “Got it, thanks.”", "Asked + pessoa + to + verbo."],
            ["Yes. She said you send the schedule.", false, "Ele não entende o que deve fazer.", "Asked you to send."],
          ] },
        ], "Repassar uma reunião: fatos, fontes e pedidos.", { c: ["passive-past", "said-that", "actually", "told-to"] }),
        type("m2", "Report it: The director says, “I will send an email.” → The director said that…", ["The director said that she would send an email", "The director said that he would send an email", "The director said she would send an email", "The director said he would send an email", "The director said that they would send an email"], "Will recua para would.", { c: ["said-that"] }),
      ],
      outside: {
        title: "Fora do app: repórter por um dia",
        instructions: "Escolha uma notícia curta em português (ou algo que alguém te contou hoje) e reconte em inglês em quatro frases: o que aconteceu, segundo quem, o que alguém disse e o que foi pedido. Faça em voz alta ou por escrito.",
        checklist: ["Usei a passiva para contar o fato.", "Citei a fonte com According to.", "Relatei uma fala com said that ou told … that.", "Não usei actually no sentido de “atualmente”."],
      },
    }),
  },
});
