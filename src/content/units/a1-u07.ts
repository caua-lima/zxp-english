/** A1 · Unidade 7 — Comida e compras: pedir, preços e preferências. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u07",

  concepts: [
    concept("food", "word", "bread, rice, chicken, fish, cheese, fruit", "pão, arroz, frango, peixe, queijo, fruta", "l1", ["I eat rice and chicken.", "Eu como arroz e frango."]),
    concept("drinks", "word", "water, juice, coffee, tea, milk", "água, suco, café, chá, leite", "l1", ["A glass of water, please.", "Um copo de água, por favor."]),
    concept("i-like", "pattern", "I like … / I don't like …", "Eu gosto de … / não gosto de …", "l1", ["I like fruit.", "Eu gosto de fruta."], { note: "Like não leva preposição: I like coffee (e não “like of”)." }),
    concept("do-you-like", "pattern", "Do you like …?", "Você gosta de …?", "l1", ["Do you like fish?", "Você gosta de peixe?"]),
    concept("id-like", "phrase", "I'd like …", "Eu gostaria de … / Eu quero …", "l2", ["I'd like a coffee, please.", "Eu queria um café, por favor."], { note: "I'd like = I would like. Mais educado que I want." }),
    concept("can-i-have", "phrase", "Can I have …, please?", "Pode me ver …, por favor?", "l2", ["Can I have the menu, please?", "Pode me trazer o cardápio, por favor?"]),
    concept("anything-else", "phrase", "Anything else? / That's all.", "Mais alguma coisa? / Só isso.", "l2", ["— Anything else? — No, that's all, thanks.", "— Mais alguma coisa? — Não, só isso, obrigado."]),
    concept("how-much", "phrase", "How much is it? / How much are they?", "Quanto custa? / Quanto custam?", "l3", ["How much is this bread?", "Quanto custa este pão?"]),
    concept("price", "pattern", "It's five dollars.", "São cinco dólares.", "l3", ["It's ten dollars and fifty cents.", "São dez dólares e cinquenta centavos."]),
    concept("cheap-expensive", "word", "cheap / expensive", "barato / caro", "l3", ["This cheese is expensive.", "Este queijo é caro."]),
    concept("prefer", "pattern", "I prefer tea to coffee.", "Eu prefiro chá a café.", "l4", ["I prefer fish to chicken.", "Prefiro peixe a frango."]),
    concept("favorite", "word", "my favorite …", "meu … favorito", "l4", ["Pizza is my favorite food.", "Pizza é minha comida favorita."], { note: "Grafia britânica: favourite. As duas são aceitas." }),
    concept("lunch-snack", "word", "lunch / snack", "almoço / lanche", "l4", ["I have a snack at four.", "Eu faço um lanche às quatro."], { note: "Falso cognato: lunch é almoço. Lanche é snack.", tags: ["false-friend"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Eu gosto, eu não gosto",
      objective: "Você vai conseguir dizer do que gosta e não gosta de comer e beber.",
      minutes: 8,
      context: { kind: "dialogue", title: "No almoço", lines: [
        { who: "Bia", en: "Do you like fish?", pt: "Você gosta de peixe?" },
        { who: "Ken", en: "Yes, I do. I like fish and rice.", pt: "Gosto. Gosto de peixe e arroz." },
        { who: "Bia", en: "I don't like fish. I like chicken and cheese.", pt: "Eu não gosto de peixe. Gosto de frango e queijo." },
        { who: "Ken", en: "And to drink? Juice or water?", pt: "E para beber? Suco ou água?" },
        { who: "Bia", en: "Water, please. I don't like juice.", pt: "Água, por favor. Não gosto de suco." },
      ] },
      explanation: {
        summary: "Para falar de gostos: **I like…** / **I don't like…** / **Do you like…?**\n\nComidas: **bread**, **rice**, **chicken**, **fish**, **cheese**, **fruit**. Bebidas: **water**, **juice**, **coffee**, **tea**, **milk**.",
        details: "Em português dizemos “gostar **de**”. Em inglês **like** não leva preposição: *I like coffee*. Com he e she: *She likes tea* / *She doesn't like tea*. Para falar de algo em geral, não se usa the: *I like fruit* (e não “the fruit”).",
        examples: [
          { en: "I like bread and cheese.", pt: "Eu gosto de pão e queijo." },
          { en: "I don't like milk.", pt: "Eu não gosto de leite." },
          { en: "Do you like tea?", pt: "Você gosta de chá?" },
        ],
        contrasts: [
          { wrong: "I like of coffee.", right: "I like coffee.", why: "Like não leva preposição." },
          { wrong: "I no like fish.", right: "I don't like fish.", why: "A negativa pede don't." },
        ],
      },
      guided: [
        mc("e1", "Qual frase está correta?", ["I like coffee.", "I like of coffee.", "I like the coffee in general."], 0, "Like vem direto antes da coisa de que se gosta.", { c: ["i-like"] }),
        match("e2", "Associe a comida ao significado.", [["bread", "pão"], ["rice", "arroz"], ["chicken", "frango"], ["fish", "peixe"], ["cheese", "queijo"], ["fruit", "fruta"]],
          "Seis alimentos básicos do dia a dia.", { c: ["food"] }),
        match("e3", "Associe a bebida ao significado.", [["water", "água"], ["juice", "suco"], ["tea", "chá"], ["milk", "leite"]],
          "As bebidas mais pedidas.", { c: ["drinks"] }),
      ],
      independent: [
        cloze("e4", "I ___ like fish.", ["don't", "do not"], "Negativa: don't + like.", { c: ["i-like"], tr: "Eu não gosto de peixe." }),
        cloze("e5", "A glass of ___, please. (água)", ["water"], "Water = água.", { c: ["drinks"], s: "vocabulary" }),
        order("e6", "Monte: “Você gosta de queijo?”", "Do you like cheese?", "Do + you + like + comida.", { c: ["do-you-like", "food"], extra: ["of"] }),
        dict("e7", "I like chicken and rice.", "Like + comida, sem preposição.", { c: ["i-like", "food"] }),
        fix("e8", "I like of juice.", ["I like juice"], "Sem preposição depois de like.", { c: ["i-like", "drinks"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e9", "Pergunte em inglês: “Você gosta de chá?”", ["Do you like tea"], "Do you like + coisa?", { c: ["do-you-like"] }),
        speak("e10", "Diga duas coisas de que gosta e uma de que não gosta.", ["I like bread and cheese. I don't like fish."],
          { mode: "respond", check: ["Usei I like sem preposição.", "Usei don't na negativa.", "Citei três alimentos ou bebidas."], c: ["i-like"] }),
      ],
      summary: { points: ["I like… / I don't like… / Do you like…?", "Like não leva preposição.", "bread, rice, chicken, fish, cheese, fruit; water, juice, coffee, tea, milk."], concepts: ["food", "drinks", "i-like", "do-you-like"] },
    }),

    lesson("l2", {
      title: "Eu queria um café, por favor",
      objective: "Você vai conseguir pedir comida e bebida de forma educada.",
      minutes: 9,
      context: { kind: "dialogue", title: "No café", lines: [
        { who: "Atendente", en: "Hi! What would you like?", pt: "Oi! O que você gostaria?" },
        { who: "Leo", en: "I'd like a coffee, please.", pt: "Eu queria um café, por favor." },
        { who: "Atendente", en: "Anything else?", pt: "Mais alguma coisa?" },
        { who: "Leo", en: "Can I have a cheese sandwich, please?", pt: "Pode me ver um sanduíche de queijo, por favor?" },
        { who: "Atendente", en: "Sure. Anything else?", pt: "Claro. Mais alguma coisa?" },
        { who: "Leo", en: "No, that's all. Thank you.", pt: "Não, só isso. Obrigado." },
      ] },
      explanation: {
        summary: "Duas formas educadas de pedir:\n- **I'd like a coffee, please.**\n- **Can I have a coffee, please?**\n\nO atendente costuma perguntar **What would you like?** e **Anything else?** Para encerrar: **No, that's all, thanks.**",
        details: "**I'd like** é a forma curta de **I would like**. **I want** existe, mas soa direto demais num pedido a um atendente. O **please** no fim faz diferença em inglês.",
        examples: [
          { en: "I'd like a tea, please.", pt: "Eu queria um chá, por favor." },
          { en: "Can I have some water, please?", pt: "Pode me trazer água, por favor?" },
          { en: "That's all, thanks.", pt: "Só isso, obrigado." },
        ],
        contrasts: [
          { wrong: "I want a coffee.", right: "I'd like a coffee, please.", why: "I want não é errado, mas soa seco. I'd like + please é o padrão educado." },
          { wrong: "I like a coffee, please.", right: "I'd like a coffee, please.", why: "I like fala de gosto em geral; para pedir, é I'd like." },
        ],
        tip: "Em pedidos e perguntas de sim ou não, a voz **sobe** no final: *Can I have a coffee, please?* ↗",
      },
      guided: [
        mc("e1", "Qual é a forma mais educada de pedir um café?", ["I'd like a coffee, please.", "I like a coffee.", "Give me a coffee."], 0, "I'd like + please é o pedido educado.", { c: ["id-like"], why: [undefined, "I like fala de gosto, não faz pedido.", "Give me soa como ordem."] }),
        match("e2", "Associe a frase a quem a diz.", [["What would you like?", "atendente, anotando o pedido"], ["I'd like a tea, please.", "cliente, pedindo"], ["Anything else?", "atendente, perguntando se há mais"], ["That's all, thanks.", "cliente, encerrando o pedido"]],
          "Um pedido tem sempre esses quatro momentos.", { c: ["id-like", "anything-else"] }),
        listen("e3", "Can I have a glass of water, please?", "O que a pessoa pede?", ["Um copo de água", "Um copo de suco", "Uma xícara de chá"], 0, "A glass of water = um copo de água.", { c: ["can-i-have", "drinks"] }),
      ],
      independent: [
        cloze("e4", "I'd ___ a sandwich, please.", ["like"], "I'd like = eu gostaria de.", { c: ["id-like"], tr: "Eu queria um sanduíche, por favor." }),
        cloze("e5", "Can I ___ the menu, please?", ["have"], "Can I have…? = Pode me trazer…?", { c: ["can-i-have"], tr: "Pode me trazer o cardápio, por favor?" }),
        order("e6", "Monte o pedido: “Pode me ver um suco, por favor?”", "Can I have a juice, please?", "Can I have + pedido + please.", { c: ["can-i-have"], extra: ["like"] }),
        dict("e7", "Anything else? No, that's all.", "Pergunta do atendente e resposta para encerrar.", { c: ["anything-else"], alt: ["Anything else? No, that is all."] }),
        fix("e8", "I like a coffee, please.", ["I'd like a coffee, please", "I would like a coffee, please"], "Para pedir: I'd like.", { c: ["id-like"], prompt: "Transforme em um pedido correto." }),
      ],
      application: [
        dialog("e9", "Você está em uma lanchonete no exterior.", [
          { npc: ["Hello! What would you like?", "Olá! O que você gostaria?"], options: [
            ["I'd like a chicken sandwich, please.", true, "O atendente anota.", "Pedido educado."],
            ["I want chicken.", false, "Ele anota, mas com cara fechada.", "Direto demais: faltou I'd like e please."],
            ["I like chicken.", false, "Ele espera você pedir.", "Isso só diz que você gosta de frango."],
          ] },
          { npc: ["Anything else?", "Mais alguma coisa?"], options: [
            ["Can I have a juice, please?", true, "Ele traz o suco.", "Segundo pedido com Can I have."],
            ["Yes, I do.", false, "Ele não entende.", "Não responde à pergunta."],
          ] },
          { npc: ["Sure. Anything else?", "Claro. Mais alguma coisa?"], options: [
            ["No, that's all, thank you.", true, "Ele fecha o pedido.", "Encerrou o pedido com educação."],
            ["No.", false, "Soa ríspido.", "Um that's all, thanks deixa a resposta educada."],
          ] },
        ], "Pedir, acrescentar e encerrar: I'd like, Can I have, That's all.", { c: ["id-like", "can-i-have", "anything-else"] }),
        type("e10", "O atendente pergunta “Anything else?”. Diga que é só isso e agradeça.", ["No, that's all, thanks", "No, that's all, thank you", "That's all, thanks", "That's all, thank you", "No, that is all, thanks", "No, that is all, thank you"], "No, that's all, thanks.", { c: ["anything-else"] }),
      ],
      summary: { points: ["I'd like…, please. / Can I have…, please?", "Anything else? → That's all, thanks.", "I like = gosto; I'd like = pedido."], concepts: ["id-like", "can-i-have", "anything-else"] },
    }),

    lesson("l3", {
      title: "Quanto custa?",
      objective: "Você vai conseguir perguntar preços, entender a resposta e comentar se é caro ou barato.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na feira", lines: [
        { who: "Ana", en: "How much is this cheese?", pt: "Quanto custa este queijo?" },
        { who: "Vendedor", en: "It's twelve dollars.", pt: "São doze dólares." },
        { who: "Ana", en: "That's expensive! How much are the apples?", pt: "Está caro! Quanto custam as maçãs?" },
        { who: "Vendedor", en: "They're three dollars. Very cheap!", pt: "Três dólares. Bem barato!" },
      ] },
      explanation: {
        summary: "Para perguntar o preço: **How much is it?** (uma coisa) / **How much are they?** (várias).\n\nResposta: **It's twelve dollars.** / **They're three dollars.**\n\nPara comentar: **cheap** (barato) e **expensive** (caro).",
        details: "Dezenas: twenty (20), thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90), a hundred (100). Números compostos levam hífen: twenty-five. Preços com centavos: **$4.50** = *four fifty* ou *four dollars and fifty cents*.",
        examples: [
          { en: "How much is this bread?", pt: "Quanto custa este pão?" },
          { en: "It's two dollars.", pt: "São dois dólares." },
          { en: "How much are the oranges?", pt: "Quanto custam as laranjas?" },
        ],
        contrasts: [
          { wrong: "How much costs this?", right: "How much is this?", why: "A pergunta de preço mais comum usa to be. (Com cost seria: How much does this cost?)" },
          { wrong: "How much is the apples?", right: "How much are the apples?", why: "Plural pede are." },
        ],
        tip: "**FIFty** (50) tem a força no começo; **fifTEEN** (15), no fim. Se não tiver certeza, repita o número perguntando: *Fifteen? One-five?*",
      },
      guided: [
        mc("e1", "Como perguntar o preço de várias maçãs?", ["How much are the apples?", "How much is the apples?", "How many is the apples?"], 0, "Plural: How much are…?", { c: ["how-much"] }),
        match("e2", "Associe o número à palavra.", [["20", "twenty"], ["30", "thirty"], ["50", "fifty"], ["80", "eighty"], ["100", "a hundred"]],
          "Dezenas terminam em -ty.", { c: ["price"], s: "vocabulary" }),
        listen("e3", "It's fifteen dollars.", "Quanto custa?", ["$15", "$50", "$5"], 0, "Fifteen, com a força no final, é 15.", { c: ["price"], s: "pronunciation", keepOrder: true }),
      ],
      independent: [
        cloze("e4", "How ___ is this cheese?", ["much"], "Preço: How much…?", { c: ["how-much"], tr: "Quanto custa este queijo?" }),
        cloze("e5", "Twelve dollars for a sandwich? That's ___!", ["expensive"], "Muito dinheiro por pouco: expensive (caro).", { c: ["cheap-expensive"], s: "vocabulary" }),
        dict("e6", "It's twenty dollars.", "It's + número + dollars.", { c: ["price"], alt: ["It is twenty dollars.", "It's 20 dollars."] }),
        fix("e7", "How much is the oranges?", ["How much are the oranges"], "Oranges é plural: are.", { c: ["how-much"], prompt: "Corrija o erro." }),
        cloze("e8", "Only one dollar? That's very ___.", ["cheap"], "Pouco dinheiro: cheap (barato).", { c: ["cheap-expensive"], s: "vocabulary" }),
      ],
      application: [
        type("e9", "Pergunte em inglês: “Quanto custa este pão?”", ["How much is this bread"], "How much is + coisa no singular.", { c: ["how-much"] }),
        speak("e10", "Pergunte dois preços e reaja a um deles.", ["How much is this cheese? How much are the apples? That's expensive!"],
          { check: ["Usei is para singular e are para plural.", "Reagi com cheap ou expensive.", "Subi a voz no final das perguntas."], c: ["how-much", "cheap-expensive"] }),
      ],
      summary: { points: ["How much is it? / How much are they?", "It's ten dollars.", "cheap x expensive."], concepts: ["how-much", "price", "cheap-expensive"] },
    }),

    lesson("l4", {
      title: "Prefiro isto àquilo",
      objective: "Você vai conseguir dizer o que prefere e qual é a sua comida favorita.",
      minutes: 8,
      context: { kind: "dialogue", title: "Combinando o que comer", lines: [
        { who: "Ken", en: "What's your favorite food?", pt: "Qual é a sua comida favorita?" },
        { who: "Bia", en: "Pizza! But for lunch I prefer rice and chicken.", pt: "Pizza! Mas no almoço prefiro arroz e frango." },
        { who: "Ken", en: "I prefer fish to chicken. Do you have a snack in the afternoon?", pt: "Eu prefiro peixe a frango. Você faz um lanche à tarde?" },
        { who: "Bia", en: "Yes, I usually have fruit and tea.", pt: "Sim, geralmente como fruta e tomo chá." },
      ] },
      explanation: {
        summary: "Para preferências: **I prefer tea to coffee** (prefiro chá a café). Para o favorito: **My favorite food is pizza**.\n\nCuidado com um falso cognato: **lunch** é **almoço**. “Lanche” é **snack**.",
        details: "Refeições: **breakfast** (café da manhã), **lunch** (almoço), **dinner** (jantar), **snack** (lanche). A grafia britânica é **favourite**; as duas são corretas.",
        examples: [
          { en: "I prefer juice to milk.", pt: "Prefiro suco a leite." },
          { en: "My favorite drink is coffee.", pt: "Minha bebida favorita é café." },
          { en: "I have a snack at four.", pt: "Eu faço um lanche às quatro." },
        ],
        contrasts: [
          { wrong: "I prefer tea than coffee.", right: "I prefer tea to coffee.", why: "Com prefer, a comparação usa to." },
          { wrong: "I have a lunch at four.", right: "I have a snack at four.", why: "Lunch é o almoço. O lanche da tarde é snack." },
        ],
      },
      guided: [
        mc("e1", "O que significa “lunch”?", ["Almoço", "Lanche", "Jantar"], 0, "Lunch é almoço. Lanche é snack.", { c: ["lunch-snack"], s: "vocabulary" }),
        match("e2", "Associe a frase ao significado.", [["I prefer tea to coffee.", "Prefiro chá a café."], ["My favorite food is fish.", "Minha comida favorita é peixe."], ["I have a snack at four.", "Faço um lanche às quatro."], ["I have lunch at noon.", "Almoço ao meio-dia."]],
          "Preferência, favorito e as duas refeições que mais confundem.", { c: ["prefer", "favorite", "lunch-snack"] }),
        cloze("e3", "I prefer fish ___ chicken.", ["to"], "Prefer X to Y.", { c: ["prefer"], tr: "Prefiro peixe a frango." }),
      ],
      independent: [
        cloze("e4", "Pizza is my ___ food.", ["favorite", "favourite"], "Favorite = favorito(a).", { c: ["favorite"], s: "vocabulary", tr: "Pizza é minha comida favorita." }),
        order("e5", "Monte: “Prefiro suco a leite.”", "I prefer juice to milk.", "Prefer + X + to + Y.", { c: ["prefer"], extra: ["than"] }),
        fix("e6", "I prefer water than juice.", ["I prefer water to juice"], "Com prefer, use to.", { c: ["prefer"], prompt: "Corrija o erro." }),
        dict("e7", "My favorite drink is coffee.", "My favorite + coisa + is.", { c: ["favorite"] }),
        type("e8", "Diga em inglês: “Eu faço um lanche à tarde.”", ["I have a snack in the afternoon"], "Lanche = snack; refeições usam have.", { c: ["lunch-snack"], t: [["I have a lunch in the afternoon", "Lunch é almoço. Para lanche, use snack."]] }),
      ],
      application: [
        listen("e9", "I usually have lunch at one and a snack at five.", "O que a pessoa faz às cinco?", ["Faz um lanche", "Almoça", "Janta"], 0, "A snack at five = um lanche às cinco.", { c: ["lunch-snack"] }),
        write("e10", "Escreva três frases: sua comida favorita, uma preferência e o que você come no lanche.",
          { frame: ["My favorite food is …", "I prefer … to …", "For a snack, I have …"], min: 14, check: ["Usei favorite.", "Usei prefer … to ….", "Usei snack para lanche."], model: "My favorite food is pizza. I prefer juice to coffee. For a snack, I have fruit and cheese.", c: ["favorite", "prefer", "lunch-snack"] }),
      ],
      summary: { points: ["I prefer X to Y.", "My favorite food is…", "lunch = almoço; snack = lanche."], concepts: ["prefer", "favorite", "lunch-snack"] },
    }),
  ],

  checkpoint: {
    intro: "Restaurante, mercado e conversas sobre comida, em situações novas.",
    a: [
      mc("q1", "Você quer pedir um chá. O que diz?", ["I'd like a tea, please.", "I like tea.", "I'm a tea, please."], 0, "Pedido: I'd like + please.", { c: ["id-like"] }),
      cloze("q2", "How much ___ the bananas?", ["are"], "Bananas é plural: are.", { c: ["how-much"], cue: "(be)" }),
      fix("q3", "She like of rice.", ["She likes rice"], "Com she: likes; e sem preposição.", { c: ["i-like"], prompt: "Corrija os erros." }),
      order("q4", "Monte: “Pode me ver um café, por favor?”", "Can I have a coffee, please?", "Can I have + pedido + please.", { c: ["can-i-have"], extra: ["like"] }),
      dict("q5", "I prefer water to juice.", "Prefer X to Y.", { c: ["prefer", "drinks"] }),
      type("q6", "Diga em inglês: “Eu não gosto de leite.”", ["I don't like milk", "I do not like milk"], "I don't like + coisa.", { c: ["i-like", "drinks"] }),
      listen("q7", "It's forty dollars.", "Quanto custa?", ["$40", "$14", "$4"], 0, "Forty, com força no começo, é 40.", { c: ["price"], s: "pronunciation", keepOrder: true }),
      cloze("q8", "Sixty dollars for a pizza? That's too ___!", ["expensive"], "Muito caro: expensive.", { c: ["cheap-expensive"], s: "vocabulary" }),
      mc("q9", "“I have a snack at three.” O que a pessoa faz às três?", ["Um lanche", "O almoço", "O jantar"], 0, "Snack = lanche.", { c: ["lunch-snack"], s: "vocabulary" }),
      dialog("q10", "Você está em um restaurante com um amigo estrangeiro.", [
        { npc: ["Are you ready to order?", "Prontos para pedir?"], options: [
          ["Yes. I'd like the fish with rice, please.", true, "O garçom anota.", "Pedido educado e claro."],
          ["Yes. I like the fish.", false, "O garçom espera o pedido.", "I like fala de gosto; para pedir, I'd like."],
        ] },
        { npc: ["And to drink?", "E para beber?"], options: [
          ["Can I have some water, please?", true, "Ele traz a água.", "Can I have + please."],
          ["Water!", false, "Soa rude.", "Falta a estrutura do pedido e o please."],
        ] },
      ], "Pedidos educados com I'd like e Can I have.", { c: ["id-like", "can-i-have"] }),
    ],
    b: [
      mc("q1", "O atendente pergunta “Anything else?”. Você não quer mais nada. O que diz?", ["No, that's all, thanks.", "No, I don't.", "Yes, I do."], 0, "That's all, thanks encerra o pedido.", { c: ["anything-else"] }),
      cloze("q2", "How much ___ this bread?", ["is"], "Bread é singular: is.", { c: ["how-much"], cue: "(be)" }),
      fix("q3", "I prefer chicken than fish.", ["I prefer chicken to fish"], "Prefer X to Y.", { c: ["prefer"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Você gosta de frango?”", "Do you like chicken?", "Do you like + comida?", { c: ["do-you-like", "food"], extra: ["of"] }),
      dict("q5", "I'd like a cheese sandwich, please.", "Pedido educado com I'd like.", { c: ["id-like", "food"], alt: ["I would like a cheese sandwich, please."] }),
      type("q6", "Diga em inglês: “Minha fruta favorita é a maçã.” (maçã = apple)", ["My favorite fruit is apple", "My favorite fruit is the apple", "My favourite fruit is apple", "My favorite fruit is apples"], "My favorite + coisa + is…", { c: ["favorite"] }),
      listen("q7", "They're two dollars and fifty cents.", "Quanto custam?", ["$2.50", "$2.15", "$12.50"], 0, "Two dollars and fifty cents = 2,50.", { c: ["price"], keepOrder: true }),
      cloze("q8", "Only fifty cents? That's ___!", ["cheap"], "Pouco dinheiro: cheap.", { c: ["cheap-expensive"], s: "vocabulary" }),
      mc("q9", "Qual é uma bebida?", ["tea", "bread", "cheese"], 0, "Tea = chá.", { c: ["drinks"], s: "vocabulary" }),
      dialog("q10", "Você está em uma padaria.", [
        { npc: ["Good morning! Can I help you?", "Bom dia! Posso ajudar?"], options: [
          ["Good morning. How much is this cake?", true, "A atendente responde o preço.", "Pergunta de preço correta."],
          ["Good morning. How much costs this cake?", false, "Ela entende, mas a frase está errada.", "Use How much is…?"],
        ] },
        { npc: ["It's eight dollars.", "São oito dólares."], options: [
          ["Okay. I'd like one, please.", true, "Ela embrulha o bolo.", "Pedido educado."],
          ["Okay. I like one.", false, "Ela fica esperando.", "Para pedir, I'd like."],
        ] },
      ], "Perguntar o preço e fazer o pedido.", { c: ["how-much", "id-like"] }),
    ],
    production: speak("t1", "Simule um pedido completo em um café: cumprimente, peça uma comida e uma bebida, pergunte o preço e encerre.",
      ["Good morning. I'd like a cheese sandwich, please. Can I have a coffee, too? How much is it? That's all, thank you."],
      { mode: "respond", check: ["Cumprimentei.", "Usei I'd like ou Can I have.", "Perguntei o preço com How much.", "Encerrei com That's all e agradeci."], c: ["id-like", "how-much", "anything-else"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "O cardápio do dia",
      goal: "Ler um cardápio simples e localizar itens e preços.",
      context: { kind: "notice", title: "Today's menu", lines: [
        { en: "Chicken with rice: nine dollars.", pt: "Frango com arroz: nove dólares." },
        { en: "Fish with salad: fourteen dollars.", pt: "Peixe com salada: quatorze dólares." },
        { en: "Cheese sandwich: five dollars. Fruit salad: four dollars.", pt: "Sanduíche de queijo: cinco dólares. Salada de frutas: quatro dólares." },
        { en: "Drinks: water, juice, coffee or tea: two dollars.", pt: "Bebidas: água, suco, café ou chá: dois dólares." },
      ] },
      exercises: [
        mc("r1", "Qual é o prato mais caro?", ["Fish with salad", "Chicken with rice", "Cheese sandwich"], 0, "Fourteen dollars é o maior preço.", { c: ["cheap-expensive", "price"], s: "reading" }),
        mc("r2", "Quanto custa uma bebida?", ["$2", "$4", "$5"], 0, "Drinks: two dollars.", { c: ["price"], s: "reading", keepOrder: true }),
        type("r3", "Qual é a opção mais barata para comer? Escreva o nome do prato em inglês.", ["fruit salad"], "Fruit salad custa four dollars, o menor preço entre as comidas.", { c: ["food"], s: "reading" }),
        cloze("r4", "The cheese sandwich is five dollars. It's ___. (barato)", ["cheap"], "Cinco dólares é pouco: cheap.", { c: ["cheap-expensive"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Um pedido no balcão",
      goal: "Entender um pedido e o valor total.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "Cliente", en: "I'd like a chicken sandwich and a juice, please.", pt: "Eu queria um sanduíche de frango e um suco, por favor." },
        { who: "Atendente", en: "Anything else?", pt: "Mais alguma coisa?" },
        { who: "Cliente", en: "No, that's all. How much is it?", pt: "Não, só isso. Quanto é?" },
        { who: "Atendente", en: "It's eleven dollars.", pt: "São onze dólares." },
      ] },
      exercises: [
        listen("a1", ["I'd like a chicken sandwich and a juice, please.", "Anything else?", "No, that's all. How much is it?", "It's eleven dollars."], "O que o cliente pede para beber?", ["Suco", "Água", "Café"], 0, "A chicken sandwich and a juice.", { c: ["drinks"] }),
        listen("a2", ["I'd like a chicken sandwich and a juice, please.", "Anything else?", "No, that's all. How much is it?", "It's eleven dollars."], "Quanto custa o pedido?", ["$11", "$7", "$12"], 0, "It's eleven dollars.", { c: ["price"], keepOrder: true }),
        dict("a3", "How much is it?", "A pergunta de preço mais curta.", { c: ["how-much"], prompt: "Digite a pergunta do cliente sobre o valor." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meu pedido por mensagem",
      goal: "Escrever um pedido de comida por mensagem.",
      exercises: [
        write("w1", "Escreva uma mensagem para um restaurante pedindo comida para entrega: uma comida, uma bebida e uma pergunta sobre o preço.",
          { frame: ["Hello! I'd like …", "Can I have …?", "How much …?"], min: 14, check: ["Usei I'd like.", "Usei please.", "Perguntei o preço com How much."], model: "Hello! I'd like a chicken sandwich, please. Can I have a juice, too? How much is it?", c: ["id-like", "how-much"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Meus gostos",
      goal: "Falar do que gosta, prefere e come em cada refeição.",
      exercises: [
        speak("s1", "Fale dos seus gostos: algo de que gosta, algo de que não gosta, uma preferência e sua comida favorita.", ["I like rice and chicken. I don't like fish. I prefer juice to coffee. My favorite food is pizza."],
          { mode: "respond", check: ["Usei I like e I don't like.", "Usei prefer … to ….", "Disse minha comida favorita.", "Ouvi o modelo e comparei."], c: ["i-like", "prefer", "favorite"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: compras no mercado",
      goal: "Perguntar preços, escolher e pagar.",
      exercises: [
        dialog("m1", "Você está em um mercado e fala com o vendedor.", [
          { npc: ["Hello! Can I help you?", "Olá! Posso ajudar?"], options: [
            ["Yes, please. How much is this cheese?", true, "Ele confere a etiqueta.", "Pergunta de preço no singular."],
            ["Yes, please. How much are this cheese?", false, "Ele entende, mas soa errado.", "Cheese é singular: is."],
          ] },
          { npc: ["It's eighteen dollars.", "São dezoito dólares."], options: [
            ["That's expensive. How much are the apples?", true, "Ele mostra as maçãs.", "Comentou o preço e perguntou por outro item."],
            ["That's cheap. I don't want.", false, "Ele fica confuso.", "Dezoito dólares por um queijo é caro, e falta o objeto de want."],
          ] },
          { npc: ["They're two dollars.", "Dois dólares."], options: [
            ["Great. I'd like four apples, please.", true, "Ele pesa as maçãs.", "Pedido educado."],
            ["Great. I like four apples.", false, "Ele espera você pedir.", "Para pedir, I'd like."],
          ] },
        ], "Comprar: perguntar preço, comentar e pedir.", { c: ["how-much", "cheap-expensive", "id-like"] }),
        write("m2", "Escreva sua lista de compras com quatro itens, em inglês.", { min: 4, check: ["Tem quatro itens.", "Usei palavras de comida ou bebida em inglês.", "Conferi a grafia."], model: "bread, cheese, apples, milk", c: ["food", "drinks"] }),
      ],
      outside: {
        title: "Fora do app: nomeie o que você come",
        instructions: "Na próxima refeição, diga em voz alta o que há no prato em inglês e complete: “I like…”, “I don't like…” e “My favorite food is…”. Se for comprar algo, diga para si mesmo o preço em inglês.",
        checklist: ["Nomeei pelo menos três alimentos ou bebidas.", "Disse uma frase com I like e uma com I don't like.", "Disse um preço em inglês."],
      },
    }),
  },
});
