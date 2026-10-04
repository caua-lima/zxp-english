/** A2 · Unidade 8 — Convites e experiências: mensagens e introdução ao present perfect. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u08",

  concepts: [
    concept("would-you-like-to", "phrase", "Would you like to …?", "Você gostaria de …?", "l1", ["Would you like to come to dinner?", "Você gostaria de vir jantar?"], { note: "Depois de like vem to + verbo." }),
    concept("do-you-want-to", "phrase", "Do you want to …? / Let's …", "Quer …? / Vamos …", "l1", ["Do you want to watch a movie?", "Quer assistir a um filme?"]),
    concept("id-love-to", "phrase", "I'd love to. / That sounds great.", "Adoraria. / Parece ótimo.", "l2", ["— Dinner on Friday? — I'd love to!", "— Jantar na sexta? — Adoraria!"]),
    concept("sorry-cant", "phrase", "I'm sorry, I can't. Maybe another time.", "Sinto muito, não posso. Quem sabe outra hora.", "l2", ["I'd love to, but I can't on Friday.", "Adoraria, mas na sexta não posso."]),
    concept("have-you-ever", "pattern", "Have you ever …?", "Você já … (alguma vez)?", "l3", ["Have you ever been to Japan?", "Você já foi ao Japão?"]),
    concept("ive-been", "pattern", "I've been to …", "Eu já fui a …", "l3", ["I've been to Chile twice.", "Já fui ao Chile duas vezes."], { note: "have/has + particípio: experiência de vida, sem dizer quando." }),
    concept("ive-never", "pattern", "I've never …", "Eu nunca …", "l3", ["I've never eaten sushi.", "Nunca comi sushi."]),
    concept("short-have", "phrase", "Yes, I have. / No, I haven't.", "Já. / Nunca.", "l3", ["— Have you seen it? — No, I haven't.", "— Você já viu? — Não."]),
    concept("participles", "word", "been, seen, eaten, done, met, tried", "ido/estado, visto, comido, feito, conhecido, experimentado", "l4", ["I've seen that movie.", "Eu já vi esse filme."], { note: "go → been/gone; see → seen; eat → eaten; do → done; meet → met." }),
    concept("pretend", "word", "pretend x intend", "fingir x pretender", "l4", ["I intend to travel next year.", "Pretendo viajar no ano que vem."], { note: "Falso cognato: pretend = fingir. “Pretender” é intend ou plan.", tags: ["false-friend"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Quer vir?",
      objective: "Você vai conseguir convidar alguém, de forma mais ou menos formal.",
      minutes: 8,
      context: { kind: "message", title: "Convites por mensagem", lines: [
        { who: "Leo", en: "Hi, Ana! Do you want to watch a movie tonight?", pt: "Oi, Ana! Quer assistir a um filme hoje à noite?" },
        { who: "Ana", en: "Good idea! Let's go to the cinema near my house.", pt: "Boa ideia! Vamos ao cinema perto da minha casa." },
        { who: "Chefe", en: "Would you like to join us for lunch on Friday?", pt: "Você gostaria de almoçar conosco na sexta?" },
      ] },
      explanation: {
        summary: "Três formas de convidar, da mais informal à mais educada:\n- **Let's go to the beach.** (vamos…)\n- **Do you want to come?** (quer vir?)\n- **Would you like to come?** (gostaria de vir?)\n\nDepois de **want** e **would like** vem **to + verbo**.",
        details: "Com amigos: *Do you want to…?*, *Let's…*, *How about…?*. Em situações formais, com clientes ou pessoas mais velhas: *Would you like to…?* Atenção: *Would you like a coffee?* (oferece algo) x *Would you like to have a coffee?* (convida para uma ação).",
        examples: [
          { en: "Do you want to play soccer on Saturday?", pt: "Quer jogar futebol no sábado?" },
          { en: "Would you like to have dinner with us?", pt: "Gostaria de jantar conosco?" },
          { en: "Let's meet at eight.", pt: "Vamos nos encontrar às oito." },
        ],
        contrasts: [
          { wrong: "Do you want come?", right: "Do you want to come?", why: "Want + to + verbo." },
          { wrong: "Would you like come to my party?", right: "Would you like to come to my party?", why: "Would like + to + verbo." },
        ],
      },
      guided: [
        mc("e1", "Which invitation is more formal?", ["Would you like to join us for lunch?", "Do you want to have lunch?", "Let's have lunch."], 0, "Would you like to…? é a forma mais educada.", { c: ["would-you-like-to"] }),
        match("e2", "Associe o convite ao tom.", [["Let's go!", "informal, entre amigos"], ["Do you want to come?", "neutro, do dia a dia"], ["Would you like to come?", "educado e formal"]],
          "O mesmo convite em três tons.", { c: ["would-you-like-to", "do-you-want-to"] }),
        cloze("e3", "Would you like ___ come to my party?", ["to"], "Would like + to + verbo.", { c: ["would-you-like-to"] }),
      ],
      independent: [
        cloze("e4", "Do you ___ to watch a movie tonight?", ["want"], "Do you want to…?", { c: ["do-you-want-to"], s: "vocabulary" }),
        order("e5", "Put the words in order: “Você gostaria de jantar conosco?”", "Would you like to have dinner with us?", "Would you like to + verbo.", { c: ["would-you-like-to"] }),
        fix("e6", "Do you want come to the beach?", ["Do you want to come to the beach"], "Want + to + verbo.", { c: ["do-you-want-to"], prompt: "Corrija o erro." }),
        dict("e7", "Would you like to come to my party?", "Convite educado.", { c: ["would-you-like-to"] }),
      ],
      application: [
        type("e8", "Invite a friend, informally, to play soccer on Saturday. Start with “Do you want”.", ["Do you want to play soccer on Saturday", "Do you want to play football on Saturday"], "Do you want to + verbo…?", { c: ["do-you-want-to"] }),
        speak("e9", "Convide a mesma pessoa de duas formas: uma informal e uma formal.", ["Do you want to have a coffee? Would you like to have a coffee with me?"],
          { check: ["Usei to depois de want e would like.", "Subi a voz no final.", "Percebi a diferença de tom entre as duas."], c: ["do-you-want-to", "would-you-like-to"] }),
      ],
      summary: { points: ["Let's… / Do you want to…? / Would you like to…?", "want to e would like to + verbo.", "Would you like to é o mais educado."], concepts: ["would-you-like-to", "do-you-want-to"] },
    }),

    lesson("l2", {
      title: "Aceitar e recusar sem ser rude",
      objective: "Você vai conseguir aceitar um convite com entusiasmo e recusar com educação.",
      minutes: 9,
      context: { kind: "dialogue", title: "Dois convites, duas respostas", lines: [
        { who: "Ana", en: "Would you like to come to dinner on Saturday?", pt: "Você gostaria de vir jantar no sábado?" },
        { who: "Ken", en: "I'd love to! What time?", pt: "Adoraria! A que horas?" },
        { who: "Ana", en: "At eight. And you, Bia?", pt: "Às oito. E você, Bia?" },
        { who: "Bia", en: "I'd love to, but I can't. I'm working on Saturday. Maybe another time?", pt: "Adoraria, mas não posso. Vou trabalhar no sábado. Quem sabe outra hora?" },
        { who: "Ana", en: "No problem. How about Sunday?", pt: "Sem problema. Que tal domingo?" },
      ] },
      explanation: {
        summary: "**Aceitar:** **I'd love to.** / **That sounds great.** / **Sure!**\n\n**Recusar com educação**, em três passos:\n1. lamentar: **I'd love to, but…** / **I'm sorry, but…**\n2. dar um motivo: **I'm working on Saturday.**\n3. deixar a porta aberta: **Maybe another time.** / **How about Sunday?**",
        details: "Um “No” sozinho soa ríspido em inglês. O motivo não precisa ser detalhado: *I already have plans* (já tenho planos) resolve. Para agradecer o convite: *Thanks for inviting me.*",
        examples: [
          { en: "That sounds great!", pt: "Parece ótimo!" },
          { en: "I'm sorry, but I can't on Friday.", pt: "Sinto muito, mas na sexta não posso." },
          { en: "Maybe another time.", pt: "Quem sabe outra hora." },
        ],
        contrasts: [
          { wrong: "No, I don't want.", right: "I'd love to, but I can't.", why: "Recusar sem suavizar soa rude." },
          { wrong: "I love to!", right: "I'd love to!", why: "Para aceitar um convite: I'd love to (I would)." },
        ],
      },
      guided: [
        mc("e1", "A coworker invites you to a party, but you can't go. What is the best answer?", ["I'd love to, but I can't. Maybe another time.", "No.", "I don't want."], 0, "Lamentar, recusar e deixar a porta aberta.", { c: ["sorry-cant"] }),
        match("e2", "Associe a resposta à função.", [["I'd love to!", "aceitar"], ["That sounds great.", "aceitar com entusiasmo"], ["I'm sorry, I can't.", "recusar"], ["Maybe another time.", "deixar a porta aberta"]],
          "Aceitar e recusar com educação.", { c: ["id-love-to", "sorry-cant"] }),
        cloze("e3", "I'd ___ to! What time?", ["love"], "I'd love to = adoraria.", { c: ["id-love-to"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "I'm sorry, I can't. Maybe ___ time?", ["another"], "Maybe another time.", { c: ["sorry-cant"], s: "vocabulary" }),
        order("e5", "Put the words in order: “Adoraria, mas não posso.”", "I'd love to, but I can't.", "Lamentar antes de recusar.", { c: ["sorry-cant", "id-love-to"] }),
        dict("e6", "That sounds great. What time?", "Aceitar e perguntar o horário.", { c: ["id-love-to"] }),
        fix("e7", "I love to, but I'm busy.", ["I'd love to, but I'm busy", "I would love to, but I'm busy", "I'd love to, but I am busy"], "I'd love to.", { c: ["id-love-to"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e8", "Refuse politely: say you are sorry and you can't on Friday.", ["I'm sorry, but I can't on Friday", "I'm sorry, I can't on Friday", "Sorry, I can't on Friday", "I am sorry, but I can't on Friday", "I'd love to, but I can't on Friday"], "I'm sorry, but I can't on Friday.", { c: ["sorry-cant"] }),
        dialog("e9", "A neighbor invites you to a barbecue.", [
          { npc: ["We're having a barbecue on Sunday. Would you like to come?", "Vamos fazer um churrasco no domingo. Gostaria de vir?"], options: [
            ["I'd love to! Can I bring something?", true, "Ele diz: “Just bring yourself!”", "Aceitou e ofereceu algo."],
            ["Yes, I like.", false, "Ele entende, mas soa estranho.", "Para aceitar: I'd love to."],
          ] },
          { npc: ["Great. Can your sister come too?", "Ótimo. Sua irmã pode vir também?"], options: [
            ["I'm afraid she can't. She's traveling. Maybe another time.", true, "Ele entende.", "Recusa educada com motivo."],
            ["No, she doesn't want.", false, "Soa rude.", "Suavize e dê um motivo."],
          ] },
        ], "Aceitar com entusiasmo e recusar com educação.", { c: ["id-love-to", "sorry-cant"] }),
      ],
      summary: { points: ["Aceitar: I'd love to. / That sounds great.", "Recusar: I'd love to, but… + motivo.", "Maybe another time. / How about…?"], concepts: ["id-love-to", "sorry-cant"] },
    }),

    lesson("l3", {
      title: "Você já…?",
      objective: "Você vai conseguir perguntar e contar experiências de vida.",
      minutes: 9,
      context: { kind: "dialogue", title: "Conversa no jantar", lines: [
        { who: "Ken", en: "Have you ever been to Japan?", pt: "Você já foi ao Japão?" },
        { who: "Ana", en: "No, I haven't. But I've been to Chile twice. Have you?", pt: "Não. Mas já fui ao Chile duas vezes. E você?" },
        { who: "Ken", en: "Yes, I have. I've never been to Chile, though.", pt: "Já. Mas nunca fui ao Chile." },
        { who: "Ana", en: "Have you ever eaten sushi in Japan?", pt: "Você já comeu sushi no Japão?" },
        { who: "Ken", en: "Yes, I have. It was amazing.", pt: "Já. Foi incrível." },
      ] },
      explanation: {
        summary: "O **present perfect** fala de **experiências de vida**, sem dizer quando aconteceram: **have / has + particípio**.\n\n- **Have you ever been to Japan?** (você já…?)\n- **I've been to Chile.** (já fui)\n- **I've never eaten sushi.** (nunca comi)\n\nRespostas curtas: **Yes, I have.** / **No, I haven't.**",
        details: "Se você disser **quando**, o tempo muda para o passado simples: *I've been to Chile* (em algum momento da vida) x *I went to Chile in 2022* (quando). **Ever** aparece em perguntas; **never** já é negativo, então o verbo fica afirmativo: *I've never been*, e não “I haven't never”.",
        examples: [
          { en: "Have you ever seen snow?", pt: "Você já viu neve?" },
          { en: "She has been to London.", pt: "Ela já foi a Londres." },
          { en: "We've never tried this food.", pt: "Nunca experimentamos esta comida." },
        ],
        contrasts: [
          { wrong: "Did you ever go to Japan?", right: "Have you ever been to Japan?", why: "Experiência de vida, sem data: present perfect." },
          { wrong: "I've been to Chile in 2022.", right: "I went to Chile in 2022.", why: "Com data, use o passado simples." },
        ],
        tip: "**I've** soa “aiv” e **I've been** soa “aiv bin”. O **have** quase some na fala.",
      },
      guided: [
        mc("e1", "How do you ask about a life experience?", ["Have you ever been to Peru?", "Did you ever been to Peru?", "Are you ever go to Peru?"], 0, "Have you ever + particípio?", { c: ["have-you-ever"] }),
        match("e2", "Associe a frase ao significado.", [["Have you ever been to Peru?", "Você já foi ao Peru?"], ["I've been to Peru.", "Já fui ao Peru."], ["I've never been to Peru.", "Nunca fui ao Peru."], ["No, I haven't.", "Não, nunca."]],
          "Perguntar, afirmar, negar e responder.", { c: ["have-you-ever", "ive-been", "ive-never", "short-have"] }),
        cloze("e3", "I've ___ been to Japan. I want to go!", ["never"], "Nunca: never.", { c: ["ive-never"] }),
      ],
      independent: [
        cloze("e4", "___ you ever seen snow?", ["Have"], "Pergunta: Have you ever…?", { c: ["have-you-ever"] }),
        cloze("e5", "She ___ been to London twice.", ["has", "'s"], "Com she: has.", { c: ["ive-been"], cue: "(have)" }),
        order("e6", "Put the words in order: “Você já comeu sushi?”", "Have you ever eaten sushi?", "Have you ever + particípio.", { c: ["have-you-ever"], extra: ["did"] }),
        dict("e7", "I've been to Chile twice.", "Experiência: I've been to + lugar.", { c: ["ive-been"], alt: ["I have been to Chile twice."] }),
        fix("e8", "I've been to Lima in 2020.", ["I went to Lima in 2020"], "Com data: passado simples.", { c: ["ive-been"], prompt: "Corrija o tempo verbal." }),
      ],
      application: [
        type("e9", "Answer with a short negative answer: “Have you ever been to Canada?”", ["No, I haven't", "No, I have not"], "No, I haven't.", { c: ["short-have"] }),
        speak("e10", "Conte duas experiências que você já teve e uma que nunca teve.", ["I've been to Rio many times. I've eaten Japanese food. I've never seen snow."],
          { mode: "respond", check: ["Usei I've + particípio.", "Usei never sem outra negativa.", "Não mencionei data."], c: ["ive-been", "ive-never"] }),
      ],
      summary: { points: ["Have you ever…? para experiências.", "I've been to… / I've never…", "Com data, passado simples."], concepts: ["have-you-ever", "ive-been", "ive-never", "short-have"] },
    }),

    lesson("l4", {
      title: "Particípios e um falso amigo",
      objective: "Você vai conseguir usar os particípios irregulares mais comuns e evitar o erro com pretend.",
      minutes: 9,
      context: { kind: "message", title: "Mensagens entre amigos", lines: [
        { who: "Bia", en: "Have you seen the new Brazilian movie?", pt: "Você já viu o filme brasileiro novo?" },
        { who: "Ken", en: "No, I haven't. Have you met the director?", pt: "Não. Você já conheceu o diretor?" },
        { who: "Bia", en: "Yes! I've met him twice. I've never done an interview, though.", pt: "Já! Conheci ele duas vezes. Mas nunca fiz uma entrevista." },
        { who: "Ken", en: "I intend to watch it this weekend. Have you tried the cafe next to the cinema?", pt: "Pretendo assistir neste fim de semana. Você já experimentou o café ao lado do cinema?" },
      ] },
      explanation: {
        summary: "O present perfect usa o **particípio**. Verbos regulares: igual ao passado (*tried, visited, worked*). Os irregulares precisam ser memorizados:\n- **go → been** (ou gone), **see → seen**\n- **eat → eaten**, **do → done**, **meet → met**\n\nE um falso cognato: **pretend** significa **fingir**. “Pretender” é **intend** ou **plan**.",
        details: "*He's been to Paris* = ele já foi e voltou. *He's gone to Paris* = ele foi e ainda está lá. Outros particípios úteis: *have → had, make → made, take → taken, write → written, read → read*.",
        examples: [
          { en: "I've seen that movie three times.", pt: "Vi esse filme três vezes." },
          { en: "Have you done your homework?", pt: "Você fez sua lição?" },
          { en: "I intend to study abroad.", pt: "Pretendo estudar fora." },
        ],
        contrasts: [
          { wrong: "I've saw that movie.", right: "I've seen that movie.", why: "Depois de have vem o particípio (seen), não o passado (saw)." },
          { wrong: "I pretend to travel next year.", right: "I intend to travel next year.", why: "Pretend = fingir. Para “pretender”, intend ou plan." },
        ],
      },
      guided: [
        mc("e1", "What does “pretend” mean?", ["Fingir", "Pretender", "Preferir"], 0, "Pretend = fingir. Pretender = intend.", { c: ["pretend"], s: "vocabulary" }),
        match("e2", "Associe o verbo ao particípio.", [["see", "seen"], ["eat", "eaten"], ["do", "done"], ["meet", "met"], ["go", "been / gone"]],
          "Cinco particípios irregulares muito usados.", { c: ["participles"] }),
        cloze("e3", "I've ___ that movie twice.", ["seen"], "See → seen.", { c: ["participles"], cue: "(see)", t: [["saw", "Depois de have, use o particípio: seen."]] }),
      ],
      independent: [
        cloze("e4", "Have you ever ___ Japanese food?", ["eaten", "tried"], "Eat → eaten.", { c: ["participles"], cue: "(eat)" }),
        cloze("e5", "I ___ to visit my family next month.", ["intend", "plan"], "Pretender = intend.", { c: ["pretend"], s: "vocabulary", t: [["pretend", "Pretend é fingir. Para “pretender”, use intend ou plan."]] }),
        fix("e6", "I've never did that before.", ["I've never done that before", "I have never done that before"], "Do → done.", { c: ["participles"], prompt: "Corrija o particípio." }),
        dict("e7", "Have you met my sister?", "Meet → met.", { c: ["participles"] }),
      ],
      application: [
        type("e8", "Say in English: “Eu pretendo estudar inglês todo dia.”", ["I intend to study English every day", "I plan to study English every day"], "Intend to + verbo.", { c: ["pretend"], t: [["I pretend to study English every day", "Isso significaria “eu finjo estudar”. Use intend ou plan."]] }),
        listen("e9", "I've never met her, but I've seen her photos.", "Has the person met her?", ["No, never.", "Yes, once.", "Yes, many times."], 0, "I've never met her.", { c: ["participles", "ive-never"] }),
        write("e10", "Escreva três frases: algo que você já viu, algo que nunca fez e algo que pretende fazer.",
          { frame: ["I've seen …", "I've never …", "I intend to …"], min: 15, check: ["Usei particípios corretos.", "Usei never sem outra negativa.", "Usei intend (não pretend)."], model: "I've seen the Amazon River. I've never eaten Thai food. I intend to try it this year.", c: ["participles", "ive-never", "pretend"] }),
      ],
      summary: { points: ["seen, eaten, done, met, been.", "have + particípio (não o passado).", "pretend = fingir; intend = pretender."], concepts: ["participles", "pretend"] },
    }),
  ],

  checkpoint: {
    intro: "New invitations and conversations about life experiences.",
    a: [
      cloze("q1", "Would you like ___ have lunch with us?", ["to"], "Would like + to.", { c: ["would-you-like-to"] }),
      mc("q2", "A friend invites you and you are happy to go. You say:", ["I'd love to!", "I love.", "Yes, I do like."], 0, "I'd love to!", { c: ["id-love-to"] }),
      fix("q3", "Have you ever went to Canada?", ["Have you ever been to Canada"], "Particípio: been.", { c: ["have-you-ever", "participles"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Nunca vi neve.”", "I've never seen snow.", "I've never + particípio.", { c: ["ive-never"], extra: ["saw"] }),
      dict("q5", "Do you want to come with us?", "Convite informal.", { c: ["do-you-want-to"] }),
      type("q6", "Answer with a short positive answer: “Have you ever eaten sushi?”", ["Yes, I have"], "Yes, I have.", { c: ["short-have"] }),
      cloze("q7", "She has ___ to Italy three times.", ["been"], "Go → been.", { c: ["ive-been"], cue: "(go)" }),
      listen("q8", "I'd love to, but I'm working on Sunday. Maybe another time.", "Is the person going?", ["No", "Yes", "Only on Sunday"], 0, "I'd love to, but… = recusa educada.", { c: ["sorry-cant"], keepOrder: true }),
      mc("q9", "“He pretended to be sick.” What did he do?", ["Fingiu estar doente", "Pretendia ficar doente", "Preferiu ficar doente"], 0, "Pretend = fingir.", { c: ["pretend"], s: "vocabulary" }),
      dialog("q10", "A colleague talks to you after a meeting.", [
        { npc: ["We're going out for pizza tonight. Do you want to come?", "Vamos sair para comer pizza hoje. Quer vir?"], options: [
          ["That sounds great! What time?", true, "Ela responde: “At eight.”", "Aceitou com entusiasmo."],
          ["Yes, I want.", false, "Soa incompleto.", "That sounds great / I'd love to."],
        ] },
        { npc: ["Have you ever been to Luigi's?", "Você já foi ao Luigi's?"], options: [
          ["No, I haven't, but I've heard it's good.", true, "Ela diz que você vai adorar.", "Resposta curta e present perfect."],
          ["No, I didn't go never.", false, "A frase tem erros.", "No, I haven't; e nunca duas negativas."],
        ] },
      ], "Aceitar um convite e falar de experiências.", { c: ["id-love-to", "short-have"] }),
    ],
    b: [
      cloze("q1", "Do you want ___ play tennis tomorrow?", ["to"], "Want + to.", { c: ["do-you-want-to"] }),
      mc("q2", "You can't go to a dinner. The most polite answer is:", ["I'm sorry, I can't. Maybe another time.", "No, thanks, I don't want.", "I can't."], 0, "Lamentar e deixar a porta aberta.", { c: ["sorry-cant"] }),
      fix("q3", "I've never ate Indian food.", ["I've never eaten Indian food", "I have never eaten Indian food"], "Eat → eaten.", { c: ["participles"], prompt: "Corrija o particípio." }),
      order("q4", "Put the words in order: “Você já conheceu meu irmão?”", "Have you met my brother?", "Have you + particípio.", { c: ["have-you-ever", "participles"], extra: ["meet"] }),
      dict("q5", "Would you like to join us for dinner?", "Convite formal.", { c: ["would-you-like-to"] }),
      type("q6", "Say in English: “Já fui à Argentina.”", ["I've been to Argentina", "I have been to Argentina"], "I've been to + lugar.", { c: ["ive-been"] }),
      cloze("q7", "— Have you seen this? — No, I ___.", ["haven't", "have not"], "No, I haven't.", { c: ["short-have"] }),
      listen("q8", "Have you ever tried Mexican food? Yes, I have. I love it.", "Has the person tried Mexican food?", ["Yes", "No", "Never"], 0, "Yes, I have.", { c: ["have-you-ever"], keepOrder: true }),
      mc("q9", "How do you say “Pretendo viajar”?", ["I intend to travel.", "I pretend to travel.", "I pretend travel."], 0, "Pretender = intend.", { c: ["pretend"], s: "vocabulary" }),
      dialog("q10", "You receive an invitation from your manager.", [
        { npc: ["Would you like to come to the team dinner on Thursday?", "Você gostaria de vir ao jantar da equipe na quinta?"], options: [
          ["I'd love to, thank you. Where is it?", true, "Ela manda o endereço.", "Aceitou com educação."],
          ["I love to. Where?", false, "Soa estranho.", "I'd love to."],
        ] },
        { npc: ["At Sakura. Have you ever eaten there?", "No Sakura. Você já comeu lá?"], options: [
          ["No, I've never been there. I intend to try the sushi.", true, "Ela recomenda um prato.", "Never + particípio; intend."],
          ["No, I never went. I pretend to try the sushi.", false, "Ela estranha: “pretend”?", "Pretend é fingir."],
        ] },
      ], "Aceitar um convite formal e falar de experiência.", { c: ["id-love-to", "ive-never", "pretend"] }),
    ],
    production: write("t1", "Write two short messages: (1) invite a friend to something this weekend; (2) reply to an invitation you can't accept, politely, and mention an experience (“I've never…” or “I've been…”).",
      { mode: "free", min: 40, check: ["Convidei com Do you want to ou Would you like to.", "Recusei com educação: lamentei, dei motivo e propus outra data.", "Usei o present perfect para uma experiência.", "Usei to depois de want / would like."],
        model: "Hi, Leo! Do you want to go to the beach on Saturday? Let's leave at nine. — Hi, Ana! Thanks for inviting me to the concert. I'd love to, but I can't on Friday. I'm working late. I've never seen that band, so maybe another time? How about next month?", c: ["do-you-want-to", "sorry-cant", "ive-never"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Convite por e-mail",
      goal: "Ler um convite e identificar o evento, a data e o que é pedido.",
      context: { kind: "message", title: "Invitation", lines: [
        { who: "Marta", en: "Hi everyone! I'm having a birthday dinner on Saturday at eight. Would you like to come?", pt: "Oi, pessoal! Vou fazer um jantar de aniversário no sábado às oito. Gostariam de vir?" },
        { who: "Marta", en: "It's at Casa Nina. Have you ever been there? The fish is great.", pt: "É na Casa Nina. Vocês já foram lá? O peixe é ótimo." },
        { who: "Marta", en: "Please tell me by Thursday. If you can't come, maybe another time!", pt: "Por favor, me avisem até quinta. Se não puderem, fica para outra hora!" },
      ] },
      exercises: [
        mc("r1", "What is the event?", ["A birthday dinner", "A work meeting", "A concert"], 0, "I'm having a birthday dinner.", { c: ["would-you-like-to"], s: "reading" }),
        mc("r2", "When should people answer?", ["By Thursday", "By Saturday", "Today"], 0, "Please tell me by Thursday.", { c: ["sorry-cant"], s: "reading" }),
        type("r3", "Copy Marta's question about the restaurant.", ["Have you ever been there"], "Have you ever been there?", { c: ["have-you-ever"], s: "reading" }),
        cloze("r4", "Would you like ___ come?", ["to"], "Would you like to come?", { c: ["would-you-like-to"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Um convite ao telefone",
      goal: "Entender um convite e a resposta.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Do you want to go to the museum on Sunday?", pt: "Quer ir ao museu no domingo?" },
        { who: "B", en: "I'd love to! I've never been there.", pt: "Adoraria! Nunca fui lá." },
      ] },
      exercises: [
        listen("a1", ["Do you want to go to the museum on Sunday?", "I'd love to! I've never been there."], "Where does the person want to go?", ["To the museum", "To the cinema", "To the beach"], 0, "Go to the museum.", { c: ["do-you-want-to"] }),
        listen("a2", ["Do you want to go to the museum on Sunday?", "I'd love to! I've never been there."], "Has the other person been there before?", ["No, never", "Yes, once", "Yes, many times"], 0, "I've never been there.", { c: ["ive-never"] }),
        dict("a3", "I'd love to! I've never been there.", "Aceitar e contar uma experiência.", { c: ["id-love-to", "ive-never"], alt: ["I would love to! I have never been there."], prompt: "Type the answer." }),
      ],
    }),
    writing: activity("writing", {
      title: "Convite e resposta",
      goal: "Escrever um convite e uma recusa educada.",
      exercises: [
        write("w1", "Write an invitation to a friend for an event next week. Include day, time and place.",
          { frame: ["Would you like to …?", "It's on … at …", "Let me know …"], min: 20, check: ["Convidei com Would you like to ou Do you want to.", "Disse dia, hora e lugar.", "Pedi uma resposta."], model: "Hi, Bia! Would you like to come to my house for dinner next Friday? It's at eight. I'm going to cook fish. Let me know by Wednesday!", c: ["would-you-like-to"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Minhas experiências",
      goal: "Falar de experiências de vida e fazer perguntas.",
      exercises: [
        speak("s1", "Talk about your experiences: two things you have done, one you have never done, and ask a question with “Have you ever”.", ["I've been to the beach in Bahia. I've eaten very good fish there. I've never traveled by plane. Have you ever been to Bahia?"],
          { mode: "respond", check: ["Usei I've + particípio duas vezes.", "Usei I've never.", "Fiz uma pergunta com Have you ever.", "Ouvi o modelo e comparei."], c: ["ive-been", "ive-never", "have-you-ever"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: organizando um encontro",
      goal: "Convidar, lidar com uma recusa e combinar outra data.",
      exercises: [
        dialog("m1", "You want to organize a dinner with two colleagues from abroad.", [
          { npc: ["Hi! How are things?", "Oi! Como vão as coisas?"], options: [
            ["Good, thanks. Would you like to have dinner on Friday?", true, "Ela olha a agenda.", "Convite educado."],
            ["Good. You come dinner Friday.", false, "Ela entende, mas soa como ordem.", "Would you like to…?"],
          ] },
          { npc: ["I'd love to, but I can't on Friday. I'm traveling.", "Adoraria, mas na sexta não posso. Vou viajar."], options: [
            ["No problem. How about Saturday?", true, "Ela aceita o sábado.", "Propôs outra data."],
            ["Why not?", false, "Ela fica sem graça.", "Insistir no motivo soa invasivo."],
          ] },
          { npc: ["Saturday is perfect. Where shall we go?", "Sábado está perfeito. Aonde vamos?"], options: [
            ["Have you ever tried Brazilian barbecue? I know a great place.", true, "Ela fica animada: “No, I haven't!”", "Pergunta de experiência para sugerir um lugar."],
            ["Did you ever tried barbecue?", false, "A pergunta soa errada.", "Have you ever tried…?"],
          ] },
        ], "Convidar, aceitar a recusa e reorganizar.", { c: ["would-you-like-to", "sorry-cant", "have-you-ever"] }),
        write("m2", "Write the confirmation message with day, time and place.", { min: 12, check: ["Confirmei o dia e a hora.", "Disse o lugar.", "Fechei com uma frase simpática."], model: "Great! Dinner on Saturday at eight, at Fogo Vivo. See you there!", c: ["do-you-want-to"] }),
      ],
      outside: {
        title: "Fora do app: um convite de verdade",
        instructions: "Escreva em inglês um convite real para alguém (mesmo que você traduza depois) e uma lista de cinco experiências: três com “I've…” e duas com “I've never…”. Leia tudo em voz alta.",
        checklist: ["Escrevi um convite com dia, hora e lugar.", "Escrevi três frases com I've + particípio.", "Escrevi duas frases com I've never."],
      },
    }),
  },
});
