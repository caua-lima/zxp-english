/** A2 · Unidade 2 — Ontem foi assim: passado simples. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u02",

  concepts: [
    concept("was-were", "pattern", "I was / you were", "eu estava, era / você estava, era", "l1", ["I was at home yesterday.", "Eu estava em casa ontem."], { note: "I/he/she/it was; you/we/they were." }),
    concept("was-neg-q", "pattern", "wasn't / weren't; Was it …?", "não estava; Estava …?", "l1", ["Were you at work? No, I wasn't.", "Você estava no trabalho? Não."]),
    concept("past-markers", "word", "yesterday, last week, two days ago", "ontem, semana passada, dois dias atrás", "l1", ["I saw her two days ago.", "Eu a vi dois dias atrás."]),
    concept("ed-regular", "pattern", "worked, watched, played", "trabalhei, assisti, joguei", "l2", ["We watched a movie last night.", "Assistimos a um filme ontem à noite."], { note: "Verbos regulares: + -ed, igual para todas as pessoas." }),
    concept("ed-spelling", "pattern", "studied, stopped, lived", "grafia do -ed", "l2", ["She studied all night.", "Ela estudou a noite toda."], { note: "study → studied; stop → stopped; live → lived." }),
    concept("went-had", "word", "went, had, was", "fui, tive, estive", "l3", ["I went to the beach.", "Eu fui à praia."], { note: "go → went; have → had." }),
    concept("saw-made", "word", "saw, made, ate, bought, came", "vi, fiz, comi, comprei, vim", "l3", ["She bought a new phone.", "Ela comprou um celular novo."], { note: "see → saw; make → made; eat → ate; buy → bought; come → came." }),
    concept("didnt", "pattern", "I didn't go.", "Eu não fui.", "l4", ["He didn't call me.", "Ele não me ligou."], { note: "Depois de didn't, o verbo volta à forma básica." }),
    concept("did-question", "pattern", "Did you go?", "Você foi?", "l4", ["Where did you go?", "Aonde você foi?"], { note: "Did + sujeito + verbo na forma básica." }),
    concept("short-did", "phrase", "Yes, I did. / No, I didn't.", "Sim. / Não.", "l4", ["— Did you like it? — Yes, I did.", "— Você gostou? — Gostei."]),
  ],

  lessons: [
    lesson("l1", {
      title: "Onde você estava?",
      objective: "Você vai conseguir dizer onde estava e como foi algo, usando was e were.",
      minutes: 8,
      context: { kind: "dialogue", title: "Segunda-feira no trabalho", lines: [
        { who: "Leo", en: "Where were you yesterday?", pt: "Onde você estava ontem?" },
        { who: "Ana", en: "I was at the beach with my family. It was great!", pt: "Eu estava na praia com a minha família. Foi ótimo!" },
        { who: "Leo", en: "Was it hot?", pt: "Estava quente?" },
        { who: "Ana", en: "Yes, it was. But the water wasn't warm. Were you at home?", pt: "Estava. Mas a água não estava quente. Você estava em casa?" },
        { who: "Leo", en: "No, I wasn't. We were at my mother's house.", pt: "Não. Estávamos na casa da minha mãe." },
      ] },
      explanation: {
        summary: "O passado do verbo **to be** tem duas formas:\n- **was** → I, he, she, it\n- **were** → you, we, they\n\nNegativa: **wasn't** / **weren't**. Pergunta: **Was it hot?** **Were you at home?**\n\nMarcadores de passado: **yesterday**, **last night**, **last week**, **two days ago**.",
        details: "**Ago** vem depois do período: *two days ago, a year ago*. **Last** vem antes: *last week, last month*. Não se usa the com last: *last week* (e não “the last week”).",
        examples: [
          { en: "I was tired last night.", pt: "Eu estava cansado ontem à noite." },
          { en: "They were at school.", pt: "Eles estavam na escola." },
          { en: "Was the movie good?", pt: "O filme foi bom?" },
        ],
        contrasts: [
          { wrong: "We was at home.", right: "We were at home.", why: "Com we, you e they: were." },
          { wrong: "I was there two days before.", right: "I was there two days ago.", why: "Para contar o tempo até agora, use ago." },
        ],
      },
      guided: [
        mc("e1", "Choose: “They ___ at school yesterday.”", ["were", "was", "are"], 0, "They → were.", { c: ["was-were"], pt: "Escolha a forma correta." }),
        match("e2", "Associe o marcador ao significado.", [["yesterday", "ontem"], ["last week", "semana passada"], ["last night", "ontem à noite"], ["two days ago", "dois dias atrás"]],
          "Estes marcadores pedem o passado.", { c: ["past-markers"] }),
        cloze("e3", "I ___ at home last night.", ["was"], "Com I, o passado de be é was.", { c: ["was-were"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "The water ___ warm. It was very cold.", ["wasn't", "was not"], "Negativa no singular: wasn't.", { c: ["was-neg-q"] }),
        cloze("e5", "I saw him three days ___.", ["ago"], "Three days ago = três dias atrás.", { c: ["past-markers"], s: "vocabulary" }),
        order("e6", "Put the words in order: “Onde você estava ontem?”", "Where were you yesterday?", "Where + were + you.", { c: ["was-neg-q", "past-markers"], extra: ["was"] }),
        dict("e7", "We were at the beach yesterday.", "We + were.", { c: ["was-were", "past-markers"] }),
        fix("e8", "She were tired last night.", ["She was tired last night"], "She → was.", { c: ["was-were"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e9", "Ask in English: “O filme foi bom?”", ["Was the movie good", "Was the film good"], "Was + sujeito + adjetivo?", { c: ["was-neg-q"], pt: "Pergunte em inglês." }),
        speak("e10", "Diga onde você estava ontem e como foi.", ["Yesterday I was at home. It was a quiet day. I wasn't tired."],
          { mode: "respond", check: ["Usei was com I e it.", "Usei um marcador de passado.", "Incluí uma negativa com wasn't."], c: ["was-were"] }),
      ],
      summary: { points: ["was: I, he, she, it; were: you, we, they.", "wasn't / weren't; Was…? / Were…?", "yesterday, last week, two days ago."], concepts: ["was-were", "was-neg-q", "past-markers"] },
    }),

    lesson("l2", {
      title: "Verbos regulares: -ed",
      objective: "Você vai conseguir contar o que fez usando verbos regulares no passado.",
      minutes: 9,
      context: { kind: "text", title: "O sábado da Bia", lines: [
        { en: "On Saturday I stayed at home in the morning.", pt: "No sábado fiquei em casa de manhã." },
        { en: "I cleaned my room and studied English.", pt: "Limpei meu quarto e estudei inglês." },
        { en: "In the afternoon I played soccer with my friends.", pt: "À tarde joguei futebol com meus amigos." },
        { en: "At night we watched a movie and talked for hours.", pt: "À noite assistimos a um filme e conversamos por horas." },
      ] },
      explanation: {
        summary: "No **passado simples**, verbos regulares ganham **-ed**, e a forma é **igual para todas as pessoas**: *I worked, she worked, they worked.*\n\nGrafia:\n- terminado em e: só **-d** → *live → lived*\n- consoante + y: **-ied** → *study → studied*\n- vogal + consoante forte: dobra → *stop → stopped*",
        details: "O -ed tem três pronúncias. Depois de sons “surdos” (k, p, s, ch): /t/ → *worked, stopped, watched*. Depois de sons “sonoros”: /d/ → *played, cleaned, lived*. Só depois de t ou d vira uma sílaba a mais, /ɪd/ → *wanted, needed, started*.",
        examples: [
          { en: "I worked on Saturday.", pt: "Trabalhei no sábado." },
          { en: "She studied all night.", pt: "Ela estudou a noite toda." },
          { en: "We watched a movie.", pt: "Assistimos a um filme." },
        ],
        contrasts: [
          { wrong: "She workeds yesterday.", right: "She worked yesterday.", why: "No passado não há -s de terceira pessoa." },
          { wrong: "I studyed English.", right: "I studied English.", why: "Consoante + y vira -ied." },
        ],
        tip: "Erro típico de brasileiros: pronunciar *worked* como “uôrked”, com duas sílabas. É uma sílaba só: “uârkt”. A sílaba extra só aparece depois de t e d: *wan-ted*.",
      },
      guided: [
        mc("e1", "Which is the past of “study”?", ["studied", "studyed", "studed"], 0, "Consoante + y: troca por -ied.", { c: ["ed-spelling"], pt: "Qual é o passado de study?" }),
        match("e2", "Associe o verbo ao passado.", [["work", "worked"], ["play", "played"], ["live", "lived"], ["stop", "stopped"], ["watch", "watched"]],
          "Todos regulares, com pequenas diferenças de grafia.", { c: ["ed-regular", "ed-spelling"] }),
        listen("e3", "I watched a movie last night.", "How many syllables does “watched” have?", ["One", "Two", "Three"], 0, "Watched soa “uótcht”: uma sílaba só.", { c: ["ed-regular"], s: "pronunciation", keepOrder: true, pt: "Quantas sílabas tem watched?" }),
      ],
      independent: [
        cloze("e4", "We ___ soccer yesterday.", ["played"], "Play → played.", { c: ["ed-regular"], cue: "(play)" }),
        cloze("e5", "The bus ___ in front of my house.", ["stopped"], "Stop dobra o p: stopped.", { c: ["ed-spelling"], cue: "(stop)" }),
        dict("e6", "I cleaned my room on Saturday.", "Clean → cleaned.", { c: ["ed-regular"] }),
        fix("e7", "He worked yesterday and studyed at night.", ["He worked yesterday and studied at night"], "Study → studied.", { c: ["ed-spelling"], prompt: "Corrija a grafia." }),
      ],
      application: [
        type("e8", "Say in English: “Nós assistimos a um filme ontem à noite.”", ["We watched a movie last night", "We watched a film last night"], "Watch → watched; last night.", { c: ["ed-regular"], pt: "Diga em inglês." }),
        write("e9", "Escreva três frases sobre o seu último fim de semana usando verbos regulares.",
          { frame: ["On Saturday I …ed", "Then I …ed", "At night I …ed"], min: 14, check: ["Usei três verbos com -ed.", "Conferi a grafia (studied, stopped, lived).", "Usei um marcador de tempo."], model: "On Saturday I cleaned my house. Then I walked in the park. At night I watched a movie.", c: ["ed-regular"] }),
      ],
      summary: { points: ["Regulares: verbo + -ed, igual para todos.", "lived, studied, stopped.", "worked = uma sílaba; wanted = duas."], concepts: ["ed-regular", "ed-spelling"] },
    }),

    lesson("l3", {
      title: "Os irregulares que você mais usa",
      objective: "Você vai conseguir contar o que fez usando os verbos irregulares mais frequentes.",
      minutes: 9,
      context: { kind: "dialogue", title: "Como foi o fim de semana?", lines: [
        { who: "Ken", en: "What did you do on Sunday?", pt: "O que você fez no domingo?" },
        { who: "Bia", en: "I went to the market and bought fruit. Then I made lunch.", pt: "Fui à feira e comprei frutas. Depois fiz o almoço." },
        { who: "Ken", en: "Nice. I had a great day. My parents came to my house.", pt: "Legal. Eu tive um dia ótimo. Meus pais vieram à minha casa." },
        { who: "Bia", en: "And at night?", pt: "E à noite?" },
        { who: "Ken", en: "We ate pizza and saw a movie.", pt: "Comemos pizza e vimos um filme." },
      ] },
      explanation: {
        summary: "Muitos dos verbos mais usados são **irregulares**: não levam -ed e precisam ser memorizados.\n\n- **go → went**, **have → had**\n- **see → saw**, **make → made**\n- **eat → ate**, **buy → bought**, **come → came**",
        details: "Outros irregulares frequentes: *do → did, get → got, take → took, say → said, give → gave, know → knew, think → thought*. Como os regulares, a forma é a mesma para todas as pessoas.",
        examples: [
          { en: "I went to the market.", pt: "Fui à feira." },
          { en: "She had a great day.", pt: "Ela teve um dia ótimo." },
          { en: "We ate pizza.", pt: "Comemos pizza." },
        ],
        contrasts: [
          { wrong: "I goed to the beach.", right: "I went to the beach.", why: "Go é irregular: went." },
          { wrong: "She buyed a phone.", right: "She bought a phone.", why: "Buy é irregular: bought." },
        ],
        tip: "**Bought** soa “bót” e **saw** soa “só”: o GH e o W não são pronunciados.",
      },
      guided: [
        mc("e1", "What is the past of “go”?", ["went", "goed", "gone"], 0, "Go → went.", { c: ["went-had"], s: "vocabulary", pt: "Qual é o passado de go?" }),
        match("e2", "Associe o verbo ao passado.", [["have", "had"], ["see", "saw"], ["make", "made"], ["eat", "ate"], ["buy", "bought"], ["come", "came"]],
          "Seis irregulares que aparecem o tempo todo.", { c: ["went-had", "saw-made"] }),
        listen("e3", "She bought a new phone yesterday.", "What did she do?", ["She bought a phone.", "She brought a phone.", "She broke a phone."], 0, "Bought = comprou.", { c: ["saw-made"], pt: "O que ela fez?" }),
      ],
      independent: [
        cloze("e4", "I ___ to the market on Sunday.", ["went"], "Go → went.", { c: ["went-had"], cue: "(go)", t: [["goed", "Go é irregular: went."]] }),
        cloze("e5", "We ___ pizza last night.", ["ate"], "Eat → ate.", { c: ["saw-made"], cue: "(eat)" }),
        cloze("e6", "She ___ a great day.", ["had"], "Have → had.", { c: ["went-had"], cue: "(have)" }),
        fix("e7", "I seed a good movie.", ["I saw a good movie"], "See → saw.", { c: ["saw-made"], prompt: "Corrija o verbo." }),
        dict("e8", "My parents came to my house.", "Come → came.", { c: ["saw-made"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu fiz o almoço e comi com a minha família.”", ["I made lunch and ate with my family", "I made lunch and I ate with my family"], "Make → made; eat → ate.", { c: ["saw-made"], pt: "Diga em inglês." }),
        speak("e10", "Conte quatro coisas que você fez ontem, com verbos irregulares.", ["Yesterday I went to work. I had lunch at noon. I saw a friend. I made dinner at night."],
          { mode: "respond", check: ["Usei went.", "Usei pelo menos três irregulares diferentes.", "Não coloquei -ed em verbo irregular."], c: ["went-had", "saw-made"] }),
      ],
      summary: { points: ["go → went; have → had.", "see → saw; make → made; eat → ate; buy → bought; come → came.", "Irregulares não levam -ed."], concepts: ["went-had", "saw-made"] },
    }),

    lesson("l4", {
      title: "Você foi? Eu não fui.",
      objective: "Você vai conseguir perguntar e negar no passado sem cair em “Did you went?”.",
      minutes: 9,
      context: { kind: "dialogue", title: "Depois da festa", lines: [
        { who: "Ana", en: "Did you go to the party on Friday?", pt: "Você foi à festa na sexta?" },
        { who: "Leo", en: "No, I didn't. I didn't feel well. Did you go?", pt: "Não. Eu não estava me sentindo bem. Você foi?" },
        { who: "Ana", en: "Yes, I did. It was fun!", pt: "Fui. Foi divertido!" },
        { who: "Leo", en: "What did you eat?", pt: "O que vocês comeram?" },
        { who: "Ana", en: "We ate cake, but I didn't drink anything.", pt: "Comemos bolo, mas eu não bebi nada." },
      ] },
      explanation: {
        summary: "No passado, perguntas e negativas usam **did** / **didn't**, e o verbo principal **volta à forma básica**:\n- **Did you go?** (e não “Did you went?”)\n- **I didn't go.** (e não “I didn't went”)\n- **What did you eat?**\n\nRespostas curtas: **Yes, I did.** / **No, I didn't.**",
        details: "O passado já está em **did**. Por isso o outro verbo não muda: *She didn't call*, *Did he buy it?*, *Where did they go?*. A exceção é o verbo to be, que não usa did: *Were you there? I wasn't there.*",
        examples: [
          { en: "Did you like the movie?", pt: "Você gostou do filme?" },
          { en: "I didn't see him.", pt: "Eu não o vi." },
          { en: "Where did you go?", pt: "Aonde você foi?" },
        ],
        contrasts: [
          { wrong: "Did you went to the party?", right: "Did you go to the party?", why: "Depois de did, o verbo fica na forma básica." },
          { wrong: "I didn't saw him.", right: "I didn't see him.", why: "Depois de didn't, forma básica." },
          { wrong: "You went to the party?", right: "Did you go to the party?", why: "A pergunta precisa do auxiliar did." },
        ],
      },
      guided: [
        mc("e1", "Which question is correct?", ["Did you go to the party?", "Did you went to the party?", "You went to the party?"], 0, "Did + sujeito + verbo básico.", { c: ["did-question"], pt: "Qual pergunta está correta?" }),
        match("e2", "Associe a afirmativa à negativa.", [["I went", "I didn't go"], ["She saw", "She didn't see"], ["We ate", "We didn't eat"], ["He bought", "He didn't buy"]],
          "Na negativa o verbo volta à forma básica.", { c: ["didnt"] }),
        cloze("e3", "___ you like the movie?", ["Did"], "Pergunta no passado: Did.", { c: ["did-question"] }),
      ],
      independent: [
        cloze("e4", "I didn't ___ him at the party.", ["see"], "Depois de didn't: forma básica.", { c: ["didnt"], cue: "(see)", t: [["saw", "Depois de didn't, o verbo volta à forma básica: see."]] }),
        order("e5", "Put the words in order: “Aonde você foi ontem?”", "Where did you go yesterday?", "Where + did + you + go.", { c: ["did-question"], extra: ["went"] }),
        fix("e6", "She didn't called me.", ["She didn't call me", "She did not call me"], "Depois de didn't, verbo sem -ed.", { c: ["didnt"], prompt: "Corrija o erro." }),
        dict("e7", "Did you eat? No, I didn't.", "Pergunta com did e resposta curta.", { c: ["did-question", "short-did"] }),
        fix("e8", "Did he bought the tickets?", ["Did he buy the tickets"], "Did + buy.", { c: ["did-question"], prompt: "Corrija a pergunta." }),
      ],
      application: [
        type("e9", "Answer with a short positive answer: “Did you study yesterday?”", ["Yes, I did"], "Yes, I did.", { c: ["short-did"], pt: "Responda com resposta curta afirmativa." }),
        dialog("e10", "Na segunda, uma colega pergunta sobre o seu fim de semana.", [
          { npc: ["Did you have a good weekend?", "Você teve um bom fim de semana?"], options: [
            ["Yes, I did. I went to the beach.", true, "Ela diz: “Lucky you!”", "Resposta curta e passado irregular."],
            ["Yes, I had. I go to the beach.", false, "Soa confuso.", "A resposta curta é Yes, I did; e go no passado é went."],
          ] },
          { npc: ["Did your brother go too?", "Seu irmão foi também?"], options: [
            ["No, he didn't. He didn't want to go.", true, "Ela ri.", "Didn't + verbo na forma básica."],
            ["No, he didn't went.", false, "Ela entende, mas a frase está errada.", "Depois de didn't: go."],
          ] },
        ], "Passado: did nas perguntas, didn't nas negativas, verbo básico.", { c: ["short-did", "didnt"] }),
      ],
      summary: { points: ["Did you go? (nunca “Did you went?”).", "I didn't go.", "Yes, I did. / No, I didn't."], concepts: ["didnt", "did-question", "short-did"] },
    }),
  ],

  checkpoint: {
    intro: "New stories about the past. Watch the irregular verbs and the base form after did and didn't.",
    a: [
      cloze("q1", "My parents ___ at home last night.", ["were"], "Parents = they: were.", { c: ["was-were"], cue: "(be)" }),
      mc("q2", "Choose: “I ___ a great movie last month.”", ["saw", "seed", "see"], 0, "See é irregular: saw.", { c: ["saw-made"] }),
      fix("q3", "Did she came to the meeting?", ["Did she come to the meeting"], "Did + come.", { c: ["did-question"], prompt: "Corrija a pergunta." }),
      order("q4", "Put the words in order: “Eu não comprei o ingresso.”", "I didn't buy the ticket.", "Didn't + verbo básico.", { c: ["didnt"], extra: ["bought"] }),
      dict("q5", "We went to the park yesterday.", "Go → went.", { c: ["went-had", "past-markers"] }),
      type("q6", "Say in English: “Ela trabalhou no domingo.”", ["She worked on Sunday"], "Work → worked.", { c: ["ed-regular"] }),
      cloze("q7", "They ___ in Lima for two years.", ["lived"], "Live → lived.", { c: ["ed-spelling"], cue: "(live)" }),
      listen("q8", "Was the restaurant expensive? No, it wasn't. It was cheap.", "How was the restaurant?", ["Cheap", "Expensive", "Closed"], 0, "No, it wasn't. It was cheap.", { c: ["was-neg-q"] }),
      mc("q9", "Short answer to “Did they call you?”", ["No, they didn't.", "No, they weren't.", "No, they don't."], 0, "A resposta curta repete did.", { c: ["short-did"] }),
      dialog("q10", "You tell a friend about a short trip.", [
        { npc: ["Where did you go last weekend?", "Aonde você foi no fim de semana?"], options: [
          ["I went to the mountains with my sister.", true, "Ele pergunta mais.", "Went."],
          ["I go to the mountains with my sister.", false, "Ele fica em dúvida sobre quando.", "Passado: went."],
        ] },
        { npc: ["Did you take photos?", "Você tirou fotos?"], options: [
          ["Yes, I did, but I didn't post them.", true, "Ele pede para ver.", "Resposta curta e didn't + verbo básico."],
          ["Yes, I took, but I didn't posted them.", false, "Há dois erros.", "Resposta curta: Yes, I did; depois de didn't: post."],
        ] },
      ], "Contar o que fez e responder com did.", { c: ["went-had", "short-did", "didnt"] }),
    ],
    b: [
      cloze("q1", "The movie ___ very long. It was only one hour.", ["wasn't", "was not"], "Negativa no singular.", { c: ["was-neg-q"] }),
      mc("q2", "Choose: “She ___ a sandwich for lunch.”", ["made", "maked", "makes"], 0, "Make é irregular: made.", { c: ["saw-made"] }),
      fix("q3", "We didn't went to school.", ["We didn't go to school", "We did not go to school"], "Didn't + go.", { c: ["didnt"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “O que você comeu?”", "What did you eat?", "What + did + you + eat.", { c: ["did-question"], extra: ["ate"] }),
      dict("q5", "She had a headache last night.", "Have → had.", { c: ["went-had", "past-markers"] }),
      type("q6", "Say in English: “Eu estudei inglês ontem.”", ["I studied English yesterday"], "Study → studied.", { c: ["ed-spelling"] }),
      cloze("q7", "I visited my aunt two weeks ___.", ["ago"], "Two weeks ago.", { c: ["past-markers"], s: "vocabulary" }),
      listen("q8", "I walked to work and I talked to my boss.", "How did the person get to work?", ["On foot", "By bus", "By car"], 0, "Walked = foi a pé.", { c: ["ed-regular"] }),
      mc("q9", "Choose: “___ you at the party?”", ["Were", "Did", "Was"], 0, "Com to be não se usa did; you → were.", { c: ["was-neg-q"] }),
      dialog("q10", "A coworker asks about a meeting you missed.", [
        { npc: ["You weren't at the meeting. Were you sick?", "Você não estava na reunião. Estava doente?"], options: [
          ["No, I wasn't. I was at the dentist.", true, "Ela entende.", "Resposta curta com was."],
          ["No, I didn't. I was at the dentist.", false, "Soa estranho.", "A pergunta é com were: responda com wasn't."],
        ] },
        { npc: ["Did anyone send you the notes?", "Alguém te mandou as anotações?"], options: [
          ["No, nobody sent them. Did you take notes?", true, "Ela manda as dela.", "Sent e pergunta com did."],
          ["No, nobody sended them. Did you took notes?", false, "Há dois erros de passado.", "Send → sent; did + take."],
        ] },
      ], "To be no passado sem did; outros verbos com did.", { c: ["was-neg-q", "did-question"] }),
    ],
    production: write("t1", "Write about your last weekend: where you were, what you did, something you didn't do and how it was.",
      { mode: "free", min: 35, check: ["Usei was ou were.", "Usei pelo menos dois verbos regulares com -ed.", "Usei pelo menos dois irregulares.", "Incluí uma negativa com didn't + verbo básico."],
        model: "Last weekend I was at home on Saturday. I cleaned the house and cooked lunch. On Sunday I went to the beach with my friends. We ate fish and saw a beautiful sunset. I didn't study. It was a great weekend.", c: ["was-were", "ed-regular", "went-had", "didnt"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Diário de viagem",
      goal: "Ler um relato curto no passado e ordenar os acontecimentos.",
      context: { kind: "text", title: "My trip to Salvador", lines: [
        { en: "Last month I went to Salvador with two friends. We stayed in a small hotel near the beach.", pt: "No mês passado fui a Salvador com dois amigos. Ficamos em um hotel pequeno perto da praia." },
        { en: "On the first day we walked in the old town and ate great food. I bought a hat.", pt: "No primeiro dia andamos pelo centro histórico e comemos muito bem. Comprei um chapéu." },
        { en: "On the second day it rained, so we didn't go to the beach. We saw a museum. It was interesting, but the tickets weren't cheap.", pt: "No segundo dia choveu, então não fomos à praia. Vimos um museu. Foi interessante, mas os ingressos não eram baratos." },
      ] },
      exercises: [
        mc("r1", "Where did they stay?", ["In a small hotel", "At a friend's house", "In the old town"], 0, "We stayed in a small hotel.", { c: ["ed-regular"], s: "reading" }),
        mc("r2", "Why didn't they go to the beach on the second day?", ["It rained.", "It was expensive.", "They were tired."], 0, "It rained, so we didn't go to the beach.", { c: ["didnt"], s: "reading" }),
        type("r3", "What did the writer buy? Answer with a full sentence starting with He or She.", ["He bought a hat", "She bought a hat"], "I bought a hat.", { c: ["saw-made"], s: "reading" }),
        cloze("r4", "The tickets ___ cheap.", ["weren't", "were not"], "The tickets weren't cheap.", { c: ["was-neg-q"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Como foi ontem?",
      goal: "Entender um relato falado sobre o dia anterior.",
      context: { kind: "text", title: "Transcrição", lines: [{ who: "Marta", en: "Yesterday I had a long day. I went to work at six, and I didn't have lunch. At night I made soup and watched TV.", pt: "Ontem tive um dia longo. Fui trabalhar às seis e não almocei. À noite fiz sopa e assisti TV." }] },
      exercises: [
        listen("a1", "Yesterday I had a long day. I went to work at six, and I didn't have lunch. At night I made soup and watched TV.", "What time did she go to work?", ["At six", "At seven", "At noon"], 0, "I went to work at six.", { c: ["went-had"], keepOrder: true }),
        listen("a2", "Yesterday I had a long day. I went to work at six, and I didn't have lunch. At night I made soup and watched TV.", "Did she have lunch?", ["No, she didn't.", "Yes, she did.", "She had soup."], 0, "I didn't have lunch.", { c: ["didnt"] }),
        dict("a3", "At night I made soup and watched TV.", "Um irregular (made) e um regular (watched).", { c: ["saw-made", "ed-regular"], prompt: "Type the last sentence." }),
      ],
    }),
    writing: activity("writing", {
      title: "O que eu fiz ontem",
      goal: "Escrever um parágrafo sobre o dia anterior.",
      exercises: [
        write("w1", "Write five sentences about yesterday, from the morning to the night. Include one thing you didn't do.",
          { frame: ["Yesterday I …", "In the afternoon I …", "I didn't …", "At night I …"], min: 25, check: ["Todos os verbos estão no passado.", "Usei pelo menos um irregular.", "Usei didn't + verbo básico."], model: "Yesterday I got up early and went to work. In the afternoon I had a meeting. I didn't eat lunch at home. At night I cooked dinner and called my mother.", c: ["went-had", "didnt"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Meu fim de semana",
      goal: "Contar em voz alta o que fez no fim de semana.",
      exercises: [
        speak("s1", "Tell the story of your last weekend in about 30 seconds.", ["On Saturday I stayed home and cleaned the house. On Sunday I went to my mother's house. We ate lunch together. It was a nice weekend."],
          { mode: "respond", check: ["Usei verbos regulares e irregulares.", "Pronunciei worked/cleaned sem sílaba extra.", "Disse como foi (It was…).", "Ouvi o modelo e comparei."], c: ["ed-regular", "went-had"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: o que aconteceu?",
      goal: "Relatar um problema ocorrido e responder a perguntas sobre ele.",
      exercises: [
        dialog("m1", "You lost your bag yesterday and go to a lost-and-found office.", [
          { npc: ["Hello. How can I help you?", "Olá. Como posso ajudar?"], options: [
            ["Hi. I lost my bag yesterday.", true, "O atendente pega um formulário.", "Lost é o passado de lose."],
            ["Hi. I lose my bag yesterday.", false, "Ele entende, mas o tempo verbal está errado.", "Yesterday pede passado: lost."],
          ] },
          { npc: ["Where were you?", "Onde você estava?"], options: [
            ["I was at the station, near the cafe.", true, "Ele anota o local.", "Was + lugar."],
            ["I were at the station.", false, "Soa errado.", "Com I: was."],
          ] },
          { npc: ["Did you see anyone near your bag?", "Você viu alguém perto da sua bolsa?"], options: [
            ["No, I didn't. I went to buy a ticket and it wasn't there.", true, "Ele procura no sistema.", "Resposta curta e relato no passado."],
            ["No, I didn't saw. I go to buy a ticket.", false, "A frase fica confusa.", "Didn't + see; go → went."],
          ] },
        ], "Relatar um fato passado e responder a perguntas com did.", { c: ["was-were", "short-did", "went-had"] }),
        write("m2", "Write the short report for the form: what you lost, where and when.", { min: 12, check: ["Disse o que perdi.", "Disse onde eu estava.", "Usei verbos no passado."], model: "I lost my black bag yesterday at the station. I was near the cafe at three o'clock.", c: ["was-were", "past-markers"] }),
      ],
      outside: {
        title: "Fora do app: conte o seu dia",
        instructions: "À noite, conte em voz alta, em inglês, cinco coisas que você fez hoje, em ordem. Use pelo menos dois verbos irregulares e uma negativa (“I didn't…”). Se puder, grave no celular e ouça.",
        checklist: ["Contei cinco ações no passado.", "Usei dois irregulares.", "Usei uma negativa com didn't."],
      },
    }),
  },
});
