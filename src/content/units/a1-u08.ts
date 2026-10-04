/** A1 · Unidade 8 — O que eu sei fazer: can / can't, pedidos e orientações. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u08",

  concepts: [
    concept("can", "pattern", "I can swim.", "Eu sei nadar. / Eu consigo nadar.", "l1", ["She can speak English.", "Ela sabe falar inglês."], { note: "Can é igual para todas as pessoas e o verbo seguinte vem sem to." }),
    concept("cant", "pattern", "I can't drive.", "Eu não sei dirigir.", "l1", ["He can't cook.", "Ele não sabe cozinhar."]),
    concept("ability-verbs", "word", "swim, drive, cook, sing, dance", "nadar, dirigir, cozinhar, cantar, dançar", "l1", ["I can cook, but I can't sing.", "Sei cozinhar, mas não sei cantar."]),
    concept("can-you", "pattern", "Can you swim?", "Você sabe nadar?", "l2", ["Can you speak Spanish?", "Você fala espanhol?"]),
    concept("short-can", "phrase", "Yes, I can. / No, I can't.", "Sim, sei. / Não, não sei.", "l2", ["— Can you drive? — No, I can't.", "— Você dirige? — Não."]),
    concept("play-the", "phrase", "play the guitar / play soccer", "tocar violão / jogar futebol", "l2", ["I can play the guitar.", "Eu sei tocar violão."], { note: "Instrumentos levam the; esportes não.", tags: ["collocation"] }),
    concept("can-you-help", "phrase", "Can you help me, please?", "Você pode me ajudar, por favor?", "l3", ["Excuse me, can you help me?", "Com licença, você pode me ajudar?"]),
    concept("could-you", "phrase", "Could you …, please?", "Você poderia …, por favor?", "l3", ["Could you write that down, please?", "Você poderia anotar isso, por favor?"], { note: "Could é mais educado que can em pedidos." }),
    concept("sure-sorry", "phrase", "Sure. / Sorry, I can't.", "Claro. / Desculpe, não posso.", "l3", ["— Could you help me? — Sure!", "— Você poderia me ajudar? — Claro!"]),
    concept("how-get-to", "phrase", "How do I get to …?", "Como eu chego a …?", "l4", ["How do I get to the station?", "Como eu chego à estação?"]),
    concept("turn-left-right", "phrase", "turn left / turn right", "vire à esquerda / à direita", "l4", ["Turn left at the bank.", "Vire à esquerda no banco."]),
    concept("go-straight", "phrase", "go straight / it's on the left", "siga em frente / fica à esquerda", "l4", ["Go straight for two blocks.", "Siga em frente por dois quarteirões."]),
  ],

  lessons: [
    lesson("l1", {
      title: "Eu sei, eu não sei",
      objective: "Você vai conseguir dizer o que sabe e o que não sabe fazer.",
      minutes: 8,
      context: { kind: "dialogue", title: "Conversa entre colegas", lines: [
        { who: "Bia", en: "I can cook, but I can't drive.", pt: "Eu sei cozinhar, mas não sei dirigir." },
        { who: "Ken", en: "I can drive, but I can't cook!", pt: "Eu sei dirigir, mas não sei cozinhar!" },
        { who: "Bia", en: "My brother can sing and dance.", pt: "Meu irmão sabe cantar e dançar." },
        { who: "Ken", en: "Wow. I can't sing. I can swim very well.", pt: "Uau. Eu não sei cantar. Sei nadar muito bem." },
      ] },
      explanation: {
        summary: "**Can** indica habilidade ou possibilidade: **I can swim** (eu sei nadar). A negativa é **can't** (cannot): **I can't drive**.\n\nDuas regras simples:\n- **Can não muda** com a pessoa: *I can, she can, they can.*\n- O verbo seguinte vem **sem to** e **sem -s**: *She can swim.*",
        details: "Em português usamos “saber” para habilidades; em inglês é **can**, não “know”: *I can swim* (e não “I know swim”). **Very well** vai no fim: *I can swim very well.*",
        examples: [
          { en: "I can cook.", pt: "Eu sei cozinhar." },
          { en: "She can speak English.", pt: "Ela sabe falar inglês." },
          { en: "We can't drive.", pt: "Nós não sabemos dirigir." },
        ],
        contrasts: [
          { wrong: "She cans swim.", right: "She can swim.", why: "Can nunca leva -s." },
          { wrong: "I can to drive.", right: "I can drive.", why: "Depois de can, verbo sem to." },
          { wrong: "I know swim.", right: "I can swim.", why: "Habilidade é can, não know." },
        ],
        tip: "Na fala, **can** afirmativo é fraco e rápido (“kn”): *I c'n SWIM*. **Can't** é forte e mais longo: *I CAN'T swim*. Muitas vezes é a força, mais do que o T, que mostra a negativa.",
      },
      guided: [
        mc("e1", "Qual frase está correta?", ["She can swim.", "She cans swim.", "She can to swim."], 0, "Can não leva -s, e o verbo vem sem to.", { c: ["can"] }),
        match("e2", "Associe o verbo ao significado.", [["swim", "nadar"], ["drive", "dirigir"], ["cook", "cozinhar"], ["sing", "cantar"], ["dance", "dançar"]],
          "Cinco habilidades muito comuns em conversas.", { c: ["ability-verbs"] }),
        cloze("e3", "I ___ drive. I don't have a car.", ["can't", "cannot"], "Quem não sabe: can't.", { c: ["cant"], tr: "Eu não sei dirigir. Não tenho carro." }),
      ],
      independent: [
        cloze("e4", "My sister can ___ very well. She makes great food.", ["cook"], "Quem faz comida ótima sabe cook.", { c: ["ability-verbs"], s: "vocabulary" }),
        order("e5", "Monte: “Ele sabe falar inglês.”", "He can speak English.", "Can + verbo sem to e sem -s.", { c: ["can"], extra: ["to", "speaks"] }),
        fix("e6", "He cans cook.", ["He can cook"], "Can nunca leva -s.", { c: ["can"], prompt: "Corrija o erro." }),
        dict("e7", "I can swim, but I can't sing.", "Can e can't na mesma frase, ligados por but.", { c: ["can", "cant"], alt: ["I can swim, but I cannot sing."] }),
      ],
      application: [
        type("e8", "Diga em inglês: “Eu não sei dançar.”", ["I can't dance", "I cannot dance"], "I can't + verbo.", { c: ["cant", "ability-verbs"], t: [["I don't know dance", "Habilidade usa can: I can't dance."]] }),
        speak("e9", "Diga duas coisas que você sabe fazer e uma que não sabe.", ["I can cook and I can swim. I can't sing."],
          { mode: "respond", check: ["Usei can + verbo sem to.", "Usei can't para a negativa.", "Deixei can fraco e can't forte."], c: ["can", "cant"] }),
      ],
      summary: { points: ["Can + verbo sem to: I can swim.", "Can é igual para todas as pessoas.", "Negativa: can't."], concepts: ["can", "cant", "ability-verbs"] },
    }),

    lesson("l2", {
      title: "Você sabe…?",
      objective: "Você vai conseguir perguntar o que alguém sabe fazer e responder de forma curta.",
      minutes: 8,
      context: { kind: "dialogue", title: "Entrevista para uma banda", lines: [
        { who: "Leo", en: "Can you play the guitar?", pt: "Você sabe tocar violão?" },
        { who: "Ana", en: "Yes, I can. And I can sing.", pt: "Sim, sei. E sei cantar." },
        { who: "Leo", en: "Great! Can you play soccer too?", pt: "Ótimo! Você sabe jogar futebol também?" },
        { who: "Ana", en: "No, I can't. But I can swim!", pt: "Não, não sei. Mas sei nadar!" },
      ] },
      explanation: {
        summary: "Para perguntar, **can** vai para a frente: **Can you swim?** Não se usa do.\n\nRespostas curtas: **Yes, I can.** / **No, I can't.**\n\nCom instrumentos, usa-se **the**: **play the guitar**. Com esportes, não: **play soccer**.",
        details: "Também dá para perguntar com palavras interrogativas: *What can you do?* (O que você sabe fazer?), *What languages can you speak?*",
        examples: [
          { en: "Can you drive?", pt: "Você sabe dirigir?" },
          { en: "Can she speak Spanish?", pt: "Ela fala espanhol?" },
          { en: "I can play the piano.", pt: "Eu sei tocar piano." },
        ],
        contrasts: [
          { wrong: "Do you can swim?", right: "Can you swim?", why: "Com can não se usa do." },
          { wrong: "I can play guitar soccer.", right: "I can play the guitar. / I can play soccer.", why: "Instrumento leva the; esporte não." },
        ],
      },
      guided: [
        mc("e1", "Como perguntar “Você sabe dirigir?”", ["Can you drive?", "Do you can drive?", "You can drive?"], 0, "Can vai para a frente; sem do.", { c: ["can-you"] }),
        match("e2", "Associe pergunta e resposta.", [["Can you cook?", "Yes, I can."], ["Can he drive?", "No, he can't."], ["Can they sing?", "Yes, they can."]],
          "A resposta curta repete can ou can't.", { c: ["short-can", "can-you"] }),
        cloze("e3", "I can play ___ guitar.", ["the"], "Instrumentos levam the.", { c: ["play-the"], tr: "Eu sei tocar violão." }),
      ],
      independent: [
        order("e4", "Monte: “Ela sabe falar espanhol?”", "Can she speak Spanish?", "Can + sujeito + verbo.", { c: ["can-you"], extra: ["does"] }),
        cloze("e5", "— Can you swim? — No, I ___.", ["can't", "cannot"], "Resposta curta negativa: No, I can't.", { c: ["short-can"] }),
        fix("e6", "Do you can play soccer?", ["Can you play soccer"], "Com can, não se usa do.", { c: ["can-you", "play-the"], prompt: "Corrija a pergunta." }),
        dict("e7", "Can you play the piano? Yes, I can.", "Pergunta com can e resposta curta.", { c: ["can-you", "short-can"] }),
        listen("e8", "I can't play the guitar, but I can sing.", "O que a pessoa sabe fazer?", ["Cantar", "Tocar violão", "As duas coisas"], 0, "Can't play the guitar; can sing.", { c: ["cant", "play-the"], s: "pronunciation" }),
      ],
      application: [
        type("e9", "Responda com resposta curta afirmativa: “Can you cook?”", ["Yes, I can"], "Yes, I can.", { c: ["short-can"] }),
        speak("e10", "Faça três perguntas a alguém sobre habilidades.", ["Can you drive? Can you play the guitar? Can you speak Spanish?"],
          { check: ["Comecei todas com Can.", "Não usei do.", "Subi a voz no fim das perguntas."], c: ["can-you"] }),
      ],
      summary: { points: ["Can you…? (sem do).", "Yes, I can. / No, I can't.", "play the guitar; play soccer."], concepts: ["can-you", "short-can", "play-the"] },
    }),

    lesson("l3", {
      title: "Você pode me ajudar?",
      objective: "Você vai conseguir pedir ajuda e favores com educação, e responder a pedidos.",
      minutes: 9,
      context: { kind: "dialogue", title: "Em uma loja", lines: [
        { who: "Ana", en: "Excuse me, can you help me?", pt: "Com licença, você pode me ajudar?" },
        { who: "Vendedor", en: "Sure. What do you need?", pt: "Claro. Do que você precisa?" },
        { who: "Ana", en: "Could you write the price down, please? I can't understand the number.", pt: "Você poderia anotar o preço, por favor? Não consigo entender o número." },
        { who: "Vendedor", en: "Of course. Here you are.", pt: "Claro. Aqui está." },
      ] },
      explanation: {
        summary: "**Can** e **could** também fazem pedidos:\n- **Can you help me, please?** (neutro)\n- **Could you help me, please?** (mais educado)\n\nPara aceitar: **Sure.** / **Of course.** Para recusar com educação: **Sorry, I can't.**",
        details: "Pedidos úteis quando você não entende: *Could you repeat that, please?*, *Could you speak more slowly?*, *Could you write that down?*, *Could you spell that?* Pedir para escrever é uma ótima estratégia com números, nomes e endereços.",
        examples: [
          { en: "Can you help me, please?", pt: "Você pode me ajudar, por favor?" },
          { en: "Could you open the door, please?", pt: "Você poderia abrir a porta, por favor?" },
          { en: "Sorry, I can't. I'm busy.", pt: "Desculpe, não posso. Estou ocupado." },
        ],
        contrasts: [
          { wrong: "Help me!", right: "Can you help me, please?", why: "O imperativo sozinho soa como ordem (ou emergência)." },
          { wrong: "Could you to help me?", right: "Could you help me?", why: "Depois de could, verbo sem to." },
        ],
      },
      guided: [
        mc("e1", "Qual pedido é o mais educado?", ["Could you help me, please?", "Help me.", "You help me."], 0, "Could you…, please? é o mais educado.", { c: ["could-you"] }),
        match("e2", "Associe a frase à função.", [["Can you help me?", "pedir ajuda"], ["Sure.", "aceitar"], ["Sorry, I can't.", "recusar com educação"], ["Could you write that down?", "pedir para anotar"]],
          "Pedir, aceitar e recusar: o trio básico.", { c: ["can-you-help", "sure-sorry", "could-you"] }),
        cloze("e3", "Excuse me, can you ___ me, please?", ["help"], "Help = ajudar.", { c: ["can-you-help"], s: "vocabulary", tr: "Com licença, você pode me ajudar, por favor?" }),
      ],
      independent: [
        cloze("e4", "___ you repeat that, please? (mais educado)", ["Could"], "Could é a forma mais educada.", { c: ["could-you"] }),
        order("e5", "Monte: “Você poderia abrir a porta, por favor?”", "Could you open the door, please?", "Could you + verbo + please.", { c: ["could-you"], extra: ["to"] }),
        dict("e6", "Excuse me, can you help me?", "Chamar a atenção e pedir ajuda.", { c: ["can-you-help"] }),
        fix("e7", "Could you to speak slowly?", ["Could you speak slowly", "Could you speak slowly, please"], "Depois de could, o verbo vem sem to.", { c: ["could-you"], prompt: "Corrija o erro." }),
        type("e8", "Alguém pede um favor e você não pode. Recuse com educação.", ["Sorry, I can't", "Sorry, I cannot", "I'm sorry, I can't", "I am sorry, I can't"], "Sorry, I can't.", { c: ["sure-sorry"] }),
      ],
      application: [
        dialog("e9", "Você está perdido em uma estação e fala com um funcionário.", [
          { npc: ["Yes? Can I help you?", "Sim? Posso ajudar?"], options: [
            ["Yes, please. Could you help me with this ticket?", true, "Ele olha o bilhete.", "Pedido educado e específico."],
            ["Help me with this ticket.", false, "Ele ajuda, mas com cara fechada.", "Soa como ordem; use Could you…?"],
          ] },
          { npc: ["Your train leaves from platform fifteen.", "Seu trem sai da plataforma quinze."], options: [
            ["Sorry, could you write that down, please?", true, "Ele escreve “15” em um papel.", "Pedir para escrever resolve a dúvida entre fifteen e fifty."],
            ["Okay.", false, "Você vai embora sem ter certeza do número.", "Se não entendeu o número, peça para anotar."],
          ] },
        ], "Pedir ajuda e usar a estratégia de pedir para escrever.", { c: ["could-you", "can-you-help"] }),
        write("e10", "Escreva dois pedidos educados que você faria a um colega e uma resposta aceitando.",
          { frame: ["Could you …, please?", "Can you …?", "Sure."], min: 10, check: ["Usei could ou can + verbo sem to.", "Usei please.", "Incluí uma resposta (Sure ou Sorry, I can't)."], model: "Could you help me with this, please? Can you open the window? Sure, no problem.", c: ["could-you", "sure-sorry"] }),
      ],
      summary: { points: ["Can you…? / Could you…, please?", "Sure. / Of course. / Sorry, I can't.", "Estratégia: Could you write that down?"], concepts: ["can-you-help", "could-you", "sure-sorry"] },
    }),

    lesson("l4", {
      title: "Como eu chego lá?",
      objective: "Você vai conseguir pedir e entender orientações simples na rua.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na rua", lines: [
        { who: "Turista", en: "Excuse me, how do I get to the station?", pt: "Com licença, como eu chego à estação?" },
        { who: "Ana", en: "Go straight for two blocks. Then turn left at the bank.", pt: "Siga em frente por dois quarteirões. Depois vire à esquerda no banco." },
        { who: "Turista", en: "Turn left at the bank. And then?", pt: "Virar à esquerda no banco. E depois?" },
        { who: "Ana", en: "The station is on the right, next to the park.", pt: "A estação fica à direita, ao lado do parque." },
      ] },
      explanation: {
        summary: "Para pedir o caminho: **How do I get to the station?**\n\nPara indicar:\n- **Go straight** (siga em frente)\n- **Turn left** / **Turn right** (vire à esquerda / à direita)\n- **It's on the left** / **on the right** (fica à esquerda / à direita)\n- **at the bank**, **for two blocks**",
        details: "Orientações usam o **imperativo**: o verbo sem sujeito (*Go, Turn, Take*). Para conferir se entendeu, repita a instrução: *Turn left at the bank, right?* Outros blocos úteis: *Take the first street on the right*, *It's near here*, *It's far*.",
        examples: [
          { en: "How do I get to the park?", pt: "Como eu chego ao parque?" },
          { en: "Go straight and turn right.", pt: "Siga em frente e vire à direita." },
          { en: "The bank is on the left.", pt: "O banco fica à esquerda." },
        ],
        contrasts: [
          { wrong: "Turn to left.", right: "Turn left.", why: "Turn left e turn right não levam preposição." },
          { wrong: "How I get to the station?", right: "How do I get to the station?", why: "A pergunta precisa de do." },
        ],
      },
      guided: [
        mc("e1", "Como pedir o caminho para a estação?", ["How do I get to the station?", "How I get the station?", "Where I go station?"], 0, "How do I get to + lugar?", { c: ["how-get-to"] }),
        match("e2", "Associe a instrução ao significado.", [["go straight", "siga em frente"], ["turn left", "vire à esquerda"], ["turn right", "vire à direita"], ["it's on the left", "fica à esquerda"]],
          "Com quatro blocos você entende a maioria das orientações.", { c: ["go-straight", "turn-left-right"] }),
        listen("e3", "Go straight and turn right at the bank.", "O que fazer no banco?", ["Virar à direita", "Virar à esquerda", "Seguir em frente"], 0, "Turn right at the bank.", { c: ["turn-left-right"] }),
      ],
      independent: [
        cloze("e4", "Go ___ for two blocks.", ["straight"], "Go straight = siga em frente.", { c: ["go-straight"], s: "vocabulary", tr: "Siga em frente por dois quarteirões." }),
        cloze("e5", "___ left at the pharmacy.", ["Turn"], "Turn left = vire à esquerda.", { c: ["turn-left-right"], s: "vocabulary" }),
        order("e6", "Monte: “Como eu chego ao parque?”", "How do I get to the park?", "How do I get to + lugar?", { c: ["how-get-to"], extra: ["am"] }),
        dict("e7", "Turn left and go straight.", "Dois imperativos ligados por and.", { c: ["turn-left-right", "go-straight"] }),
        fix("e8", "How I get to the bank?", ["How do I get to the bank"], "A pergunta precisa do auxiliar do.", { c: ["how-get-to"], prompt: "Corrija a pergunta." }),
      ],
      application: [
        type("e9", "Diga em inglês: “A farmácia fica à direita.”", ["The pharmacy is on the right", "The pharmacy's on the right"], "It's on the right = fica à direita.", { c: ["go-straight"] }),
        dialog("e10", "Um turista para você na rua e pede ajuda.", [
          { npc: ["Excuse me, how do I get to the supermarket?", "Com licença, como eu chego ao supermercado?"], options: [
            ["Go straight and turn right at the park.", true, "Ele repete a instrução para conferir.", "Imperativos claros."],
            ["You go to straight and turn to right.", false, "Ele entende com esforço.", "Go straight e turn right não levam to."],
          ] },
          { npc: ["Turn right at the park. Is it far?", "Virar à direita no parque. É longe?"], options: [
            ["No, it's near. It's on the left, next to the bank.", true, "Ele agradece: “Thank you so much!”", "Localização com on the left e next to."],
            ["No, it has near.", false, "Ele fica confuso.", "Use to be: it's near."],
          ] },
        ], "Dar orientações: go straight, turn left/right, it's on the…", { c: ["turn-left-right", "go-straight"] }),
      ],
      summary: { points: ["How do I get to…?", "Go straight. Turn left / right.", "It's on the left / on the right."], concepts: ["how-get-to", "turn-left-right", "go-straight"] },
    }),
  ],

  checkpoint: {
    intro: "Habilidades, pedidos e caminhos em situações que você ainda não viu.",
    a: [
      cloze("q1", "My brother ___ swim. He is afraid of water.", ["can't", "cannot"], "Quem tem medo de água não sabe nadar: can't.", { c: ["cant"] }),
      mc("q2", "Qual pergunta está correta?", ["Can she drive?", "Does she can drive?", "Can she drives?"], 0, "Can + sujeito + verbo sem -s.", { c: ["can-you"] }),
      fix("q3", "I can to cook very well.", ["I can cook very well"], "Depois de can, sem to.", { c: ["can"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Você poderia me ajudar, por favor?”", "Could you help me, please?", "Could you + verbo + please.", { c: ["could-you", "can-you-help"], extra: ["to"] }),
      dict("q5", "Go straight and turn left at the park.", "Duas instruções seguidas.", { c: ["go-straight", "turn-left-right"] }),
      type("q6", "Pergunte em inglês: “Como eu chego ao banco?”", ["How do I get to the bank"], "How do I get to + lugar?", { c: ["how-get-to"] }),
      listen("q7", "I can't play the piano.", "A pessoa sabe tocar piano?", ["Não", "Sim", "Só um pouco"], 0, "Can't, forte e longo, é a negativa.", { c: ["cant", "play-the"], s: "pronunciation", keepOrder: true }),
      cloze("q8", "— Can you speak English? — Yes, I ___.", ["can"], "Resposta curta afirmativa: Yes, I can.", { c: ["short-can"] }),
      mc("q9", "Alguém pede um favor e você aceita. O que diz?", ["Sure!", "Sorry, I can't.", "Yes, I do."], 0, "Sure = claro.", { c: ["sure-sorry"] }),
      dialog("q10", "Você está em um hotel e precisa de ajuda.", [
        { npc: ["Good evening. Can I help you?", "Boa noite. Posso ajudar?"], options: [
          ["Yes, please. Could you call a taxi?", true, "O recepcionista pega o telefone.", "Pedido educado."],
          ["Yes. Call a taxi.", false, "Ele chama, mas você soou rude.", "Use Could you…?"],
        ] },
        { npc: ["Sure. Where are you going?", "Claro. Para onde você vai?"], options: [
          ["To the station. Is it far?", true, "Ele responde: “No, it's near.”", "Resposta clara e pergunta útil."],
          ["I can station.", false, "Ele não entende.", "Can precisa de um verbo depois."],
        ] },
      ], "Pedir com Could you e continuar a conversa.", { c: ["could-you", "sure-sorry"] }),
    ],
    b: [
      cloze("q1", "Ana ___ speak three languages. She's very good!", ["can"], "Habilidade: can (sem -s).", { c: ["can"] }),
      mc("q2", "Qual está correta?", ["I can play the guitar.", "I can play guitar the.", "I can to play guitar."], 0, "Instrumento com the; verbo sem to.", { c: ["play-the"] }),
      fix("q3", "Do you can dance?", ["Can you dance"], "Com can não se usa do.", { c: ["can-you"], prompt: "Corrija a pergunta." }),
      order("q4", "Monte: “Vire à direita no supermercado.”", "Turn right at the supermarket.", "Turn right + at + lugar.", { c: ["turn-left-right"], extra: ["to"] }),
      dict("q5", "Can you help me, please?", "Pedido de ajuda neutro e educado.", { c: ["can-you-help"] }),
      type("q6", "Diga em inglês: “Ela não sabe cozinhar.”", ["She can't cook", "She cannot cook"], "She can't + verbo.", { c: ["cant", "ability-verbs"] }),
      listen("q7", "The pharmacy is on the left, next to the bank.", "Onde fica a farmácia?", ["À esquerda", "À direita", "Em frente"], 0, "On the left = à esquerda.", { c: ["go-straight"] }),
      cloze("q8", "— Can they swim? — No, they ___.", ["can't", "cannot"], "Resposta curta negativa.", { c: ["short-can"] }),
      mc("q9", "Você não entendeu um endereço. Qual é a melhor estratégia?", ["Could you write that down, please?", "Yes, I can.", "Turn left."], 0, "Pedir para escrever resolve nomes e números.", { c: ["could-you"] }),
      dialog("q10", "Você pede informação a um policial.", [
        { npc: ["Hello. Do you need help?", "Olá. Precisa de ajuda?"], options: [
          ["Yes, please. How do I get to the museum?", true, "Ele aponta a direção.", "Pergunta de caminho correta."],
          ["Yes. How I get the museum?", false, "Ele entende, mas faltam palavras.", "How do I get to…?"],
        ] },
        { npc: ["Go straight for three blocks. It's on the right.", "Siga em frente por três quarteirões. Fica à direita."], options: [
          ["Go straight for three blocks, on the right. Thank you!", true, "Ele confirma com a cabeça.", "Repetir a instrução confirma que você entendeu."],
          ["Turn left. Thank you!", false, "Ele corrige você.", "Ele disse para seguir em frente, e que fica à direita."],
        ] },
      ], "Pedir o caminho e confirmar repetindo.", { c: ["how-get-to", "go-straight"] }),
    ],
    production: speak("t1", "Grave ou fale: diga três coisas que você sabe fazer, uma que não sabe, e faça um pedido educado a alguém.",
      ["I can cook, I can swim and I can speak Portuguese. I can't play the guitar. Could you help me with my English, please?"],
      { mode: "respond", check: ["Usei can + verbo sem to.", "Usei can't.", "Fiz um pedido com Could you ou Can you.", "Usei please."], c: ["can", "cant", "could-you"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Anúncio de vaga",
      goal: "Ler um anúncio simples e identificar habilidades exigidas.",
      context: { kind: "notice", title: "Help wanted", lines: [
        { en: "We need a person for our cafe near the station.", pt: "Precisamos de uma pessoa para o nosso café perto da estação." },
        { en: "You can cook and you can speak English. You can't be late!", pt: "Você sabe cozinhar e fala inglês. Você não pode se atrasar!" },
        { en: "Can you work on Saturday? Call us or come to the cafe.", pt: "Você pode trabalhar no sábado? Ligue para nós ou venha ao café." },
        { en: "How do you get here? Go straight from the station and turn left at the bank.", pt: "Como chegar aqui? Siga em frente a partir da estação e vire à esquerda no banco." },
      ] },
      exercises: [
        mc("r1", "Que habilidades o anúncio pede?", ["Cozinhar e falar inglês", "Dirigir e cantar", "Nadar e cozinhar"], 0, "You can cook and you can speak English.", { c: ["can", "ability-verbs"], s: "reading" }),
        mc("r2", "Em que dia a pessoa precisa poder trabalhar?", ["Sábado", "Domingo", "Segunda"], 0, "Can you work on Saturday?", { c: ["can-you"], s: "reading" }),
        type("r3", "Para chegar ao café, o que fazer no banco? Responda com duas palavras em inglês.", ["turn left"], "Turn left at the bank.", { c: ["turn-left-right"], s: "reading" }),
        cloze("r4", "Go ___ from the station.", ["straight"], "O anúncio diz: Go straight from the station.", { c: ["go-straight"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Indicações de caminho",
      goal: "Seguir orientações faladas.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Excuse me, how do I get to the park?", pt: "Com licença, como eu chego ao parque?" },
        { who: "B", en: "Go straight, then turn right at the pharmacy. The park is on the left.", pt: "Siga em frente, depois vire à direita na farmácia. O parque fica à esquerda." },
      ] },
      exercises: [
        listen("a1", ["Excuse me, how do I get to the park?", "Go straight, then turn right at the pharmacy. The park is on the left."], "Onde a pessoa deve virar?", ["Na farmácia", "No banco", "No parque"], 0, "Turn right at the pharmacy.", { c: ["turn-left-right"] }),
        listen("a2", ["Excuse me, how do I get to the park?", "Go straight, then turn right at the pharmacy. The park is on the left."], "De que lado fica o parque?", ["À esquerda", "À direita", "Em frente"], 0, "The park is on the left.", { c: ["go-straight"] }),
        dict("a3", "How do I get to the park?", "A pergunta padrão para pedir o caminho.", { c: ["how-get-to"], prompt: "Digite a pergunta." }),
      ],
    }),
    writing: activity("writing", {
      title: "Como chegar à minha casa",
      goal: "Escrever orientações simples para alguém chegar a um lugar.",
      exercises: [
        write("w1", "Escreva como chegar à sua casa a partir de um ponto conhecido (estação, praça, mercado).",
          { frame: ["From the …, go straight …", "Turn … at the …", "My house is on the …"], min: 16, check: ["Usei go straight.", "Usei turn left ou turn right sem preposição.", "Disse de que lado fica."], model: "From the station, go straight for two blocks. Turn right at the supermarket. My house is on the left, next to the pharmacy.", c: ["go-straight", "turn-left-right"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "O que eu sei fazer",
      goal: "Falar das suas habilidades e fazer perguntas a alguém.",
      exercises: [
        speak("s1", "Fale das suas habilidades e pergunte as de outra pessoa.", ["I can cook and I can drive. I can't sing. Can you play the guitar?"],
          { mode: "respond", check: ["Disse duas habilidades com can.", "Disse uma com can't.", "Fiz uma pergunta com Can you.", "Ouvi o modelo e comparei."], c: ["can", "can-you"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: perdido na cidade",
      goal: "Pedir ajuda, entender o caminho e confirmar a informação.",
      exercises: [
        dialog("m1", "Você saiu do metrô e não sabe onde fica o hotel.", [
          { npc: ["Hi! Are you okay?", "Oi! Está tudo bem?"], options: [
            ["Hi. Could you help me, please? How do I get to the Central Hotel?", true, "A pessoa para e pensa.", "Pediu ajuda e fez a pergunta certa."],
            ["Help me. Where hotel?", false, "Ela ajuda, mas você soou brusco.", "Falta educação e estrutura na pergunta."],
          ] },
          { npc: ["Go straight for two blocks and turn left at the supermarket.", "Siga em frente por dois quarteirões e vire à esquerda no supermercado."], options: [
            ["Sorry, could you speak more slowly, please?", true, "Ela repete devagar.", "Estratégia de esclarecimento."],
            ["Yes, I can.", false, "Ela acha que você entendeu, mas você não entendeu.", "Não responde ao que foi dito."],
          ] },
          { npc: ["Go straight... two blocks... turn left at the supermarket. The hotel is on the right.", "Siga em frente... dois quarteirões... vire à esquerda no supermercado. O hotel fica à direita."], options: [
            ["Two blocks, left at the supermarket, on the right. Thank you!", true, "Ela sorri: “That's it!”", "Repetir confirma que você entendeu."],
            ["Thank you. Turn right at the bank.", false, "Ela corrige você.", "A instrução era virar à esquerda no supermercado."],
          ] },
        ], "Pedir ajuda, pedir para repetir e confirmar repetindo.", { c: ["how-get-to", "could-you", "turn-left-right"] }),
        write("m2", "Anote o caminho que você recebeu, em inglês.", { min: 10, check: ["Anotei go straight.", "Anotei onde virar.", "Anotei de que lado fica o hotel."], model: "Go straight two blocks. Turn left at the supermarket. Hotel on the right.", c: ["go-straight", "turn-left-right"] }),
      ],
      outside: {
        title: "Fora do app: guie alguém",
        instructions: "Escolha um caminho que você faz sempre (de casa ao mercado, por exemplo) e descreva-o em voz alta em inglês, com pelo menos três instruções. Se puder, diga também três coisas que você sabe fazer com “I can”.",
        checklist: ["Descrevi um caminho com go straight e turn left/right.", "Disse de que lado fica o destino.", "Disse três frases com I can."],
      },
    }),
  },
});
