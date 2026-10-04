/** A2 · Unidade 4 — Comparar e recomendar. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u04",

  concepts: [
    concept("er-than", "pattern", "cheaper than / bigger than", "mais barato que / maior que", "l1", ["This phone is cheaper than that one.", "Este celular é mais barato que aquele."], { note: "Adjetivos curtos: + -er. big → bigger; easy → easier." }),
    concept("more-than", "pattern", "more expensive than", "mais caro que", "l1", ["The red bag is more expensive than the blue one.", "A bolsa vermelha é mais cara que a azul."], { note: "Adjetivos longos (duas sílabas ou mais): more + adjetivo." }),
    concept("better-worse", "word", "better / worse", "melhor / pior", "l2", ["This hotel is better than the other one.", "Este hotel é melhor que o outro."], { note: "good → better; bad → worse. Nunca “more good”." }),
    concept("as-as", "pattern", "as … as", "tão … quanto", "l2", ["My room is as big as yours.", "Meu quarto é tão grande quanto o seu."]),
    concept("superlative", "pattern", "the cheapest / the most expensive", "o mais barato / o mais caro", "l3", ["It's the most beautiful city in Brazil.", "É a cidade mais bonita do Brasil."]),
    concept("the-best", "word", "the best / the worst", "o melhor / o pior", "l3", ["This is the best pizza in town.", "Esta é a melhor pizza da cidade."]),
    concept("recommend", "phrase", "I'd recommend … / You should try …", "Eu recomendaria … / Você deveria experimentar …", "l4", ["I'd recommend the fish.", "Eu recomendaria o peixe."]),
    concept("why-dont-you", "phrase", "Why don't you …?", "Por que você não …?", "l4", ["Why don't you take the train?", "Por que você não vai de trem?"], { note: "É uma sugestão, não uma pergunta de verdade." }),
    concept("actually", "word", "actually", "na verdade", "l4", ["Actually, I prefer the smaller one.", "Na verdade, prefiro o menor."], { note: "Falso cognato: actually = na verdade. “Atualmente” é currently ou nowadays.", tags: ["false-friend"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Mais barato, mais caro",
      objective: "Você vai conseguir comparar duas coisas.",
      minutes: 9,
      context: { kind: "dialogue", title: "Escolhendo um celular", lines: [
        { who: "Bia", en: "Which phone is better for me?", pt: "Qual celular é melhor para mim?" },
        { who: "Vendedor", en: "The black one is cheaper than the white one, and it's smaller.", pt: "O preto é mais barato que o branco, e é menor." },
        { who: "Bia", en: "And the white one?", pt: "E o branco?" },
        { who: "Vendedor", en: "It's more expensive, but the camera is more powerful.", pt: "É mais caro, mas a câmera é mais potente." },
        { who: "Bia", en: "Is it heavier than the black one?", pt: "Ele é mais pesado que o preto?" },
      ] },
      explanation: {
        summary: "Para comparar duas coisas:\n- Adjetivos **curtos**: **adjetivo + -er + than** → *cheaper than, smaller than*\n- Adjetivos **longos**: **more + adjetivo + than** → *more expensive than*\n\n“Que” na comparação é sempre **than**.",
        details: "Grafia do -er: *big → bigger, hot → hotter* (dobra a consoante); *easy → easier, heavy → heavier* (y vira i); *nice → nicer* (só r). Adjetivos de duas sílabas terminados em -y contam como curtos: *happier, busier*.",
        examples: [
          { en: "My house is smaller than yours.", pt: "Minha casa é menor que a sua." },
          { en: "This book is more interesting than the movie.", pt: "Este livro é mais interessante que o filme." },
          { en: "Today is hotter than yesterday.", pt: "Hoje está mais quente que ontem." },
        ],
        contrasts: [
          { wrong: "It's more cheap than the other.", right: "It's cheaper than the other.", why: "Adjetivo curto usa -er, não more." },
          { wrong: "It's bigger that my car.", right: "It's bigger than my car.", why: "Na comparação, “que” é than." },
        ],
        tip: "**Than** quase não se ouve na fala: soa “dhn”. O que carrega a frase é o adjetivo: *CHEAPer th'n*.",
      },
      guided: [
        mc("e1", "Choose: “This bag is ___ than that one.”", ["cheaper", "more cheap", "cheap"], 0, "Cheap é curto: cheaper.", { c: ["er-than"], pt: "Escolha a forma correta." }),
        match("e2", "Associe o adjetivo ao comparativo.", [["small", "smaller"], ["big", "bigger"], ["easy", "easier"], ["expensive", "more expensive"], ["interesting", "more interesting"]],
          "Curtos com -er; longos com more.", { c: ["er-than", "more-than"] }),
        cloze("e3", "The white phone is ___ expensive than the black one.", ["more"], "Expensive é longo: more expensive.", { c: ["more-than"] }),
      ],
      independent: [
        cloze("e4", "Today is ___ than yesterday.", ["hotter"], "Hot dobra o t: hotter.", { c: ["er-than"], cue: "(hot)" }),
        cloze("e5", "My bag is heavier ___ yours.", ["than"], "Comparação usa than.", { c: ["er-than"] }),
        order("e6", "Put the words in order: “Este livro é mais interessante que o filme.”", "This book is more interesting than the movie.", "More + adjetivo longo + than.", { c: ["more-than"] }),
        fix("e7", "This hotel is more cheap than the other.", ["This hotel is cheaper than the other"], "Cheap é curto: cheaper.", { c: ["er-than"], prompt: "Corrija o erro." }),
        dict("e8", "My house is smaller than yours.", "Small → smaller than.", { c: ["er-than"] }),
      ],
      application: [
        type("e9", "Say in English: “O trem é mais rápido que o ônibus.” (rápido = fast)", ["The train is faster than the bus"], "Fast → faster than.", { c: ["er-than"] }),
        speak("e10", "Compare duas coisas que você conhece bem.", ["My city is smaller than Sao Paulo, but it is more beautiful."],
          { mode: "respond", check: ["Usei -er com adjetivo curto.", "Usei more com adjetivo longo.", "Usei than."], c: ["er-than", "more-than"] }),
      ],
      summary: { points: ["Curto: -er + than.", "Longo: more + adjetivo + than.", "bigger, hotter, easier."], concepts: ["er-than", "more-than"] },
    }),

    lesson("l2", {
      title: "Melhor, pior, tão bom quanto",
      objective: "Você vai conseguir dizer o que é melhor ou pior e quando duas coisas são iguais.",
      minutes: 8,
      context: { kind: "dialogue", title: "Dois restaurantes", lines: [
        { who: "Ken", en: "Is the Italian restaurant better than the Japanese one?", pt: "O restaurante italiano é melhor que o japonês?" },
        { who: "Ana", en: "The food is as good as the Japanese place, but the service is worse.", pt: "A comida é tão boa quanto a do japonês, mas o atendimento é pior." },
        { who: "Ken", en: "And the prices?", pt: "E os preços?" },
        { who: "Ana", en: "It isn't as expensive as the Japanese one.", pt: "Não é tão caro quanto o japonês." },
      ] },
      explanation: {
        summary: "Dois comparativos são irregulares: **good → better** e **bad → worse**.\n\nPara dizer que duas coisas são iguais: **as + adjetivo + as** → *as good as*. Na negativa: **not as … as** (não tão … quanto).",
        details: "*Not as expensive as* é uma forma mais suave de dizer *cheaper than*. Outros irregulares: *far → farther/further*.",
        examples: [
          { en: "This coffee is better than that one.", pt: "Este café é melhor que aquele." },
          { en: "The weather is worse today.", pt: "O tempo está pior hoje." },
          { en: "She is as tall as her mother.", pt: "Ela é tão alta quanto a mãe." },
        ],
        contrasts: [
          { wrong: "This one is more good.", right: "This one is better.", why: "Good tem comparativo irregular: better." },
          { wrong: "He is so tall as me.", right: "He is as tall as me.", why: "A estrutura é as … as." },
        ],
      },
      guided: [
        mc("e1", "Choose: “This pizza is ___ than the other one.”", ["better", "more good", "gooder"], 0, "Good → better.", { c: ["better-worse"] }),
        match("e2", "Associe a frase ao significado.", [["better than", "melhor que"], ["worse than", "pior que"], ["as good as", "tão bom quanto"], ["not as good as", "não tão bom quanto"]],
          "Irregulares e a estrutura as…as.", { c: ["better-worse", "as-as"] }),
        cloze("e3", "The service here is ___ than last year. I'm not happy.", ["worse"], "Bad → worse.", { c: ["better-worse"], cue: "(bad)" }),
      ],
      independent: [
        cloze("e4", "She is as tall ___ her mother.", ["as"], "As + adjetivo + as.", { c: ["as-as"] }),
        order("e5", "Put the words in order: “Não é tão caro quanto o outro.”", "It isn't as expensive as the other one.", "Not as + adjetivo + as.", { c: ["as-as"], extra: ["than"] }),
        fix("e6", "My English is more good now.", ["My English is better now"], "Good → better.", { c: ["better-worse"], prompt: "Corrija o erro." }),
        dict("e7", "The food is as good as before.", "As good as = tão bom quanto.", { c: ["as-as"] }),
      ],
      application: [
        type("e8", "Say in English: “Este hotel é pior que o outro.”", ["This hotel is worse than the other one", "This hotel is worse than the other"], "Bad → worse than.", { c: ["better-worse"] }),
        listen("e9", "The new phone isn't as good as the old one.", "Which phone is better?", ["The old one", "The new one", "They are the same"], 0, "Not as good as = o novo é pior.", { c: ["as-as", "better-worse"] }),
        speak("e10", "Compare dois lugares onde você come.", ["The cafe near my house is better than the one at work. It isn't as expensive."],
          { mode: "respond", check: ["Usei better ou worse.", "Usei as … as ou not as … as.", "Dei um motivo."], c: ["better-worse", "as-as"] }),
      ],
      summary: { points: ["good → better; bad → worse.", "as + adjetivo + as = igual.", "not as … as = menos."], concepts: ["better-worse", "as-as"] },
    }),

    lesson("l3", {
      title: "O melhor de todos",
      objective: "Você vai conseguir dizer o que é o mais, o maior, o melhor de um grupo.",
      minutes: 9,
      context: { kind: "text", title: "Guia de uma cidade", lines: [
        { en: "The Central Market is the oldest building in the city.", pt: "O Mercado Central é o prédio mais antigo da cidade." },
        { en: "The most famous beach is Praia Azul, but it is also the most crowded.", pt: "A praia mais famosa é a Praia Azul, mas é também a mais lotada." },
        { en: "For food, Casa Nina is the best restaurant in town.", pt: "Para comer, a Casa Nina é o melhor restaurante da cidade." },
        { en: "The cheapest way to get around is by bus.", pt: "O jeito mais barato de se locomover é de ônibus." },
      ] },
      explanation: {
        summary: "O **superlativo** destaca um item entre três ou mais:\n- Adjetivos curtos: **the + adjetivo + -est** → *the cheapest, the oldest*\n- Adjetivos longos: **the most + adjetivo** → *the most famous*\n- Irregulares: **the best**, **the worst**",
        details: "Depois do superlativo, o grupo vem com **in** (lugares) ou **of** (conjuntos): *the best in town, the tallest of the three*. Em português dizemos “da cidade”; em inglês é **in** the city.",
        examples: [
          { en: "It's the biggest city in Brazil.", pt: "É a maior cidade do Brasil." },
          { en: "This is the most expensive hotel.", pt: "Este é o hotel mais caro." },
          { en: "She's the best teacher in the school.", pt: "Ela é a melhor professora da escola." },
        ],
        contrasts: [
          { wrong: "It's the most cheap.", right: "It's the cheapest.", why: "Adjetivo curto: -est." },
          { wrong: "The best restaurant of the city.", right: "The best restaurant in the city.", why: "Com lugares, usa-se in." },
        ],
      },
      guided: [
        mc("e1", "Choose: “It's ___ building in the city.”", ["the oldest", "the most old", "older"], 0, "Old é curto: the oldest.", { c: ["superlative"] }),
        match("e2", "Associe o adjetivo ao superlativo.", [["cheap", "the cheapest"], ["big", "the biggest"], ["famous", "the most famous"], ["good", "the best"], ["bad", "the worst"]],
          "-est para curtos, most para longos, e dois irregulares.", { c: ["superlative", "the-best"] }),
        cloze("e3", "Casa Nina is the ___ restaurant in town.", ["best"], "Good → the best.", { c: ["the-best"], cue: "(good)" }),
      ],
      independent: [
        cloze("e4", "It's the ___ beautiful beach in the country.", ["most"], "Beautiful é longo: the most beautiful.", { c: ["superlative"] }),
        cloze("e5", "This is the ___ way to travel. It costs only two dollars.", ["cheapest"], "Cheap → the cheapest.", { c: ["superlative"], cue: "(cheap)" }),
        fix("e6", "It was the most bad day of my life.", ["It was the worst day of my life"], "Bad → the worst.", { c: ["the-best"], prompt: "Corrija o erro." }),
        dict("e7", "It's the biggest city in Brazil.", "Big → the biggest; in + lugar.", { c: ["superlative"] }),
      ],
      application: [
        type("e8", "Say in English: “Ela é a melhor professora da escola.”", ["She is the best teacher in the school", "She's the best teacher in the school", "She is the best teacher at the school", "She's the best teacher at the school"], "The best + substantivo + in + lugar.", { c: ["the-best"] }),
        write("e9", "Escreva três frases sobre a sua cidade usando superlativos.",
          { frame: ["The best … in my city is …", "The most … is …", "The cheapest …"], min: 16, check: ["Usei the antes do superlativo.", "Usei -est ou most corretamente.", "Usei in para o lugar."], model: "The best restaurant in my city is Casa Nina. The most famous place is the old market. The cheapest way to travel is by bus.", c: ["superlative", "the-best"] }),
      ],
      summary: { points: ["the + -est / the most + adjetivo.", "the best, the worst.", "the best in the city (não “of”)."], concepts: ["superlative", "the-best"] },
    }),

    lesson("l4", {
      title: "O que você recomenda?",
      objective: "Você vai conseguir pedir e dar recomendações, justificando a escolha.",
      minutes: 9,
      context: { kind: "dialogue", title: "Planejando um passeio", lines: [
        { who: "Tom", en: "I have one day here. What do you recommend?", pt: "Tenho um dia aqui. O que você recomenda?" },
        { who: "Ana", en: "I'd recommend the old town. It's the most interesting part.", pt: "Eu recomendaria o centro histórico. É a parte mais interessante." },
        { who: "Tom", en: "Is it far? Should I take a taxi?", pt: "É longe? Devo pegar um táxi?" },
        { who: "Ana", en: "Actually, the bus is faster. Why don't you take the number ten?", pt: "Na verdade, o ônibus é mais rápido. Por que você não pega o número dez?" },
        { who: "Tom", en: "Good idea. And you should try the fish there, right?", pt: "Boa ideia. E eu deveria provar o peixe lá, certo?" },
      ] },
      explanation: {
        summary: "Para pedir uma recomendação: **What do you recommend?**\n\nPara recomendar:\n- **I'd recommend the fish.**\n- **You should try the old town.**\n- **Why don't you take the bus?** (sugestão)\n\n**Actually** significa **na verdade**, e serve para corrigir ou contrariar com delicadeza.",
        details: "Para aceitar: *Good idea. / That sounds great.* Para recusar: *Thanks, but I'd prefer…*. Cuidado com o falso cognato: **actually** não é “atualmente”. Atualmente = **currently** ou **nowadays**.",
        examples: [
          { en: "I'd recommend the museum.", pt: "Eu recomendaria o museu." },
          { en: "Why don't you ask at the hotel?", pt: "Por que você não pergunta no hotel?" },
          { en: "Actually, it's closed on Monday.", pt: "Na verdade, fecha na segunda." },
        ],
        contrasts: [
          { wrong: "Actually I live in Rio. (querendo dizer “atualmente”)", right: "Currently I live in Rio.", why: "Actually = na verdade. Para “atualmente”, use currently." },
          { wrong: "Why you don't take the bus?", right: "Why don't you take the bus?", why: "Don't vem antes de you." },
        ],
      },
      guided: [
        mc("e1", "What does “actually” mean?", ["Na verdade", "Atualmente", "Exatamente"], 0, "Actually = na verdade. Atualmente = currently.", { c: ["actually"], s: "vocabulary" }),
        match("e2", "Associe a frase à função.", [["What do you recommend?", "pedir uma recomendação"], ["I'd recommend the fish.", "recomendar"], ["Why don't you take the bus?", "sugerir"], ["Good idea.", "aceitar a sugestão"]],
          "Pedir, recomendar, sugerir e aceitar.", { c: ["recommend", "why-dont-you"] }),
        cloze("e3", "Why ___ you take the train? It's faster.", ["don't"], "Why don't you + verbo?", { c: ["why-dont-you"] }),
      ],
      independent: [
        cloze("e4", "I'd ___ the old town. It's beautiful.", ["recommend"], "I'd recommend = eu recomendaria.", { c: ["recommend"], s: "vocabulary" }),
        order("e5", "Put the words in order: “Por que você não pergunta no hotel?”", "Why don't you ask at the hotel?", "Why don't you + verbo.", { c: ["why-dont-you"], extra: ["to"] }),
        fix("e6", "Why you don't try the fish?", ["Why don't you try the fish"], "Don't antes de you.", { c: ["why-dont-you"], prompt: "Corrija a ordem." }),
        dict("e7", "Actually, the bus is faster.", "Actually no início, corrigindo uma ideia.", { c: ["actually", "er-than"] }),
        type("e8", "Say in English: “Na verdade, eu prefiro o menor.”", ["Actually, I prefer the smaller one", "Actually I prefer the smaller one", "Actually, I prefer the small one"], "Actually = na verdade.", { c: ["actually"] }),
      ],
      application: [
        dialog("e9", "A tourist asks you for advice in your city.", [
          { npc: ["What's the best place to eat here?", "Qual é o melhor lugar para comer aqui?"], options: [
            ["I'd recommend Casa Nina. It's the best restaurant in town.", true, "Ele anota o nome.", "Recomendação com superlativo."],
            ["I recommend you go Casa Nina, is more good.", false, "Ele entende, mas a frase tem erros.", "More good não existe: the best."],
          ] },
          { npc: ["Is it expensive?", "É caro?"], options: [
            ["Actually, it's cheaper than the restaurants near the beach.", true, "Ele fica animado.", "Actually para corrigir a expectativa, e comparativo."],
            ["Actually, I live here.", false, "Ele não entende a relação.", "Não responde à pergunta."],
          ] },
          { npc: ["Great. How do I get there?", "Ótimo. Como eu chego lá?"], options: [
            ["Why don't you take a taxi? It's not far.", true, "Ele agradece.", "Sugestão com Why don't you."],
            ["Why you don't taxi?", false, "Ele demora a entender.", "Why don't you + verbo."],
          ] },
        ], "Recomendar, comparar e sugerir.", { c: ["recommend", "actually", "why-dont-you"] }),
        speak("e10", "Recomende um lugar da sua cidade a um visitante e diga por quê.", ["I'd recommend the old market. It's the most interesting place in town. Why don't you go in the morning?"],
          { mode: "respond", check: ["Usei I'd recommend ou You should.", "Justifiquei com comparativo ou superlativo.", "Fiz uma sugestão com Why don't you."], c: ["recommend", "why-dont-you"] }),
      ],
      summary: { points: ["I'd recommend… / You should try…", "Why don't you…? = sugestão.", "actually = na verdade (não “atualmente”)."], concepts: ["recommend", "why-dont-you", "actually"] },
    }),
  ],

  checkpoint: {
    intro: "New choices to make: compare options, pick the best one and recommend it.",
    a: [
      cloze("q1", "A car is ___ than a bike.", ["faster"], "Fast → faster.", { c: ["er-than"], cue: "(fast)" }),
      mc("q2", "Choose: “This exercise is ___ than the last one.”", ["more difficult", "difficulter", "most difficult"], 0, "Difficult é longo: more difficult.", { c: ["more-than"] }),
      fix("q3", "My new job is more good than the old one.", ["My new job is better than the old one"], "Good → better.", { c: ["better-worse"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “É o hotel mais caro da cidade.”", "It's the most expensive hotel in the city.", "The most + adjetivo + in.", { c: ["superlative"], extra: ["of"] }),
      dict("q5", "Why don't you try the soup?", "Sugestão com Why don't you.", { c: ["why-dont-you"] }),
      type("q6", "Say in English: “Meu irmão é tão alto quanto eu.”", ["My brother is as tall as me", "My brother is as tall as I am"], "As tall as.", { c: ["as-as"] }),
      cloze("q7", "This is the ___ day of the week for me. I hate Mondays.", ["worst"], "Bad → the worst.", { c: ["the-best"], cue: "(bad)" }),
      listen("q8", "Actually, I'd recommend the smaller room. It's quieter.", "Which room does the person recommend?", ["The smaller one", "The bigger one", "The cheaper one"], 0, "I'd recommend the smaller room.", { c: ["recommend", "actually"] }),
      mc("q9", "“Actually, it's not far.” What does the speaker mean?", ["Na verdade, não é longe.", "Atualmente não é longe.", "Exatamente, não é longe."], 0, "Actually = na verdade.", { c: ["actually"], s: "vocabulary" }),
      dialog("q10", "A friend is choosing between two apartments.", [
        { npc: ["Which one should I take?", "Qual eu devo pegar?"], options: [
          ["I'd recommend the first one. It's bigger and cheaper.", true, "Ela concorda.", "Recomendação com dois comparativos."],
          ["I recommend first. Is more big and more cheap.", false, "Ela entende, mas a frase tem erros.", "Bigger e cheaper."],
        ] },
        { npc: ["But the second one is closer to my work.", "Mas o segundo é mais perto do meu trabalho."], options: [
          ["True. Why don't you visit both again?", true, "Ela marca as visitas.", "Sugestão natural."],
          ["Why you don't visit?", false, "A pergunta soa errada.", "Why don't you…"],
        ] },
      ], "Recomendar com comparativos e sugerir.", { c: ["recommend", "er-than", "why-dont-you"] }),
    ],
    b: [
      cloze("q1", "My bag is ___ than yours. I can't carry it.", ["heavier"], "Heavy → heavier.", { c: ["er-than"], cue: "(heavy)" }),
      mc("q2", "Choose: “She's ___ student in the class.”", ["the best", "the better", "the most good"], 0, "Good → the best.", { c: ["the-best"] }),
      fix("q3", "This is the most cheap ticket.", ["This is the cheapest ticket"], "Cheap → the cheapest.", { c: ["superlative"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “O filme não é tão bom quanto o livro.”", "The movie isn't as good as the book.", "Not as good as.", { c: ["as-as"], extra: ["than"] }),
      dict("q5", "I'd recommend the chicken.", "I'd recommend + coisa.", { c: ["recommend"], alt: ["I would recommend the chicken."] }),
      type("q6", "Say in English: “Este exercício é mais fácil que o outro.”", ["This exercise is easier than the other one", "This exercise is easier than the other"], "Easy → easier than.", { c: ["er-than"] }),
      cloze("q7", "The weather is ___ today. It's raining and cold.", ["worse"], "Bad → worse.", { c: ["better-worse"], cue: "(bad)" }),
      listen("q8", "The train is more comfortable than the bus, but it's more expensive.", "What is the problem with the train?", ["It is more expensive.", "It is slower.", "It is less comfortable."], 0, "It's more expensive.", { c: ["more-than"] }),
      mc("q9", "Someone says “Why don't you call her?”. What is it?", ["Uma sugestão", "Uma reclamação", "Uma pergunta sobre o motivo"], 0, "Why don't you…? é uma sugestão.", { c: ["why-dont-you"] }),
      dialog("q10", "At a restaurant, you ask the waiter for advice.", [
        { npc: ["Are you ready to order?", "Prontos para pedir?"], options: [
          ["Not yet. What do you recommend?", true, "O garçom sugere o prato do dia.", "Pediu uma recomendação."],
          ["Not yet. What you recommend?", false, "Ele entende, mas falta o auxiliar.", "What do you recommend?"],
        ] },
        { npc: ["The fish is the most popular dish.", "O peixe é o prato mais pedido."], options: [
          ["Actually, I don't eat fish. Is the pasta as good?", true, "Ele garante que sim.", "Actually para contrariar com delicadeza."],
          ["Actually I eat fish no.", false, "Ele fica confuso.", "A negativa é I don't eat fish."],
        ] },
      ], "Pedir recomendação e responder com actually.", { c: ["recommend", "actually", "as-as"] }),
    ],
    production: write("t1", "Compare two options you know well (two cities, two phones, two jobs…). Say which is better and recommend one to a friend.",
      { mode: "free", min: 40, check: ["Usei pelo menos dois comparativos.", "Usei um superlativo.", "Usei better ou worse.", "Terminei com uma recomendação (I'd recommend / You should / Why don't you)."],
        model: "Recife is bigger than Olinda, and it is more modern. Olinda is smaller, but it is more beautiful and quieter. The food is as good in both cities. For a weekend, Olinda is the best choice. I'd recommend staying there. Why don't you go in January?", c: ["er-than", "superlative", "recommend"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Avaliações de hotéis",
      goal: "Ler avaliações curtas e comparar opções.",
      context: { kind: "text", title: "Three hotels", lines: [
        { who: "Sun Hotel", en: "The cheapest of the three, but the rooms are smaller and the Wi-Fi is worse.", pt: "O mais barato dos três, mas os quartos são menores e o Wi-Fi é pior." },
        { who: "Park Hotel", en: "More expensive than the Sun, with the best breakfast in town.", pt: "Mais caro que o Sun, com o melhor café da manhã da cidade." },
        { who: "Grand Hotel", en: "The most expensive, and actually not as comfortable as the Park.", pt: "O mais caro, e na verdade não tão confortável quanto o Park." },
      ] },
      exercises: [
        mc("r1", "Which hotel is the cheapest?", ["Sun Hotel", "Park Hotel", "Grand Hotel"], 0, "Sun: the cheapest of the three.", { c: ["superlative"], s: "reading", keepOrder: true }),
        mc("r2", "Which hotel is more comfortable: Grand or Park?", ["Park", "Grand", "They are the same"], 0, "Grand is not as comfortable as the Park.", { c: ["as-as"], s: "reading" }),
        type("r3", "What does the Park Hotel have? Complete: the ___ breakfast in town.", ["best"], "The best breakfast in town.", { c: ["the-best"], s: "reading" }),
        cloze("r4", "The Wi-Fi at the Sun Hotel is ___ than at the others.", ["worse"], "The Wi-Fi is worse.", { c: ["better-worse"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Qual você recomenda?",
      goal: "Entender uma recomendação e o motivo.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Which bus should I take, the ten or the twenty?", pt: "Qual ônibus eu devo pegar, o dez ou o vinte?" },
        { who: "B", en: "I'd recommend the twenty. It's faster and it isn't as crowded.", pt: "Eu recomendaria o vinte. É mais rápido e não é tão lotado." },
      ] },
      exercises: [
        listen("a1", ["Which bus should I take, the ten or the twenty?", "I'd recommend the twenty. It's faster and it isn't as crowded."], "Which bus is recommended?", ["20", "10", "12"], 0, "I'd recommend the twenty.", { c: ["recommend"], keepOrder: true }),
        listen("a2", ["Which bus should I take, the ten or the twenty?", "I'd recommend the twenty. It's faster and it isn't as crowded."], "Why?", ["It's faster and less crowded.", "It's cheaper.", "It's more comfortable."], 0, "Faster and not as crowded.", { c: ["er-than", "as-as"] }),
        dict("a3", "It's faster and it isn't as crowded.", "Um comparativo e um not as.", { c: ["er-than", "as-as"], alt: ["It is faster and it is not as crowded."], prompt: "Type the reason." }),
      ],
    }),
    writing: activity("writing", {
      title: "Minha recomendação",
      goal: "Escrever uma recomendação curta e justificada.",
      exercises: [
        write("w1", "A friend is visiting your city for one day. Write a short message recommending what to do and where to eat.",
          { frame: ["I'd recommend …", "It's the … in the city.", "Why don't you …?"], min: 25, check: ["Recomendei com I'd recommend ou You should.", "Usei um superlativo.", "Usei um comparativo.", "Incluí uma sugestão com Why don't you."], model: "Hi! I'd recommend the old market. It's the most interesting place in the city. For lunch, Casa Nina is better than the restaurants near the beach, and it's cheaper. Why don't you go by bus?", c: ["recommend", "superlative"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Qual é melhor?",
      goal: "Comparar duas opções em voz alta e escolher uma.",
      exercises: [
        speak("s1", "Compare two things (two apps, two foods, two places) and say which one you prefer and why.", ["I think the bus is better than the car in my city. It's cheaper and it's faster in the morning. But the car is more comfortable."],
          { mode: "respond", check: ["Usei pelo menos dois comparativos.", "Usei than.", "Disse qual prefiro e por quê.", "Ouvi o modelo e comparei."], c: ["er-than", "better-worse"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: ajudando a escolher",
      goal: "Ajudar um visitante a escolher entre opções, comparando e recomendando.",
      exercises: [
        dialog("m1", "A colleague from abroad asks you where to stay in your city.", [
          { npc: ["I need a hotel for three nights. Downtown or near the beach?", "Preciso de um hotel para três noites. No centro ou perto da praia?"], options: [
            ["I'd recommend downtown. It's cheaper and closer to the office.", true, "Ela gosta da ideia.", "Recomendação com dois comparativos."],
            ["Downtown is more cheap and more close.", false, "Ela entende, mas os comparativos estão errados.", "Cheaper e closer."],
          ] },
          { npc: ["Is downtown as safe as the beach area?", "O centro é tão seguro quanto a região da praia?"], options: [
            ["Actually, it's safer during the day. At night, take a taxi.", true, "Ela agradece o aviso.", "Actually para corrigir a ideia, e um conselho prático."],
            ["Actually I am living downtown.", false, "Ela não entende a relação com a pergunta.", "Actually não é “atualmente”, e a resposta não ajuda."],
          ] },
          { npc: ["Good to know. Where should I eat?", "Bom saber. Onde eu devo comer?"], options: [
            ["Why don't you try Casa Nina? It's the best place in town.", true, "Ela anota o nome.", "Sugestão com superlativo."],
            ["You go Casa Nina, the most good.", false, "A frase soa errada.", "The best."],
          ] },
        ], "Aconselhar: recomendar, comparar, corrigir com actually e sugerir.", { c: ["recommend", "actually", "the-best"] }),
        write("m2", "Write a short note with your three recommendations.", { min: 15, check: ["Dei três recomendações.", "Usei pelo menos um comparativo ou superlativo.", "As frases têm sujeito e verbo."], model: "Stay downtown. It is cheaper than the beach area. Take a taxi at night. Eat at Casa Nina, the best place in town.", c: ["er-than", "the-best"] }),
      ],
      outside: {
        title: "Fora do app: compare antes de escolher",
        instructions: "Da próxima vez que for escolher algo (um produto, um caminho, um filme), compare as opções em inglês, em voz alta ou por escrito: três frases com comparativos e uma com superlativo. Termine com “I'd recommend…”.",
        checklist: ["Fiz três comparações com -er ou more.", "Usei um superlativo.", "Terminei com uma recomendação."],
      },
    }),
  },
});
