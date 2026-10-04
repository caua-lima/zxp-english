/** A2 · Unidade 5 — Quanto? Quantos? Contáveis, incontáveis e quantidades. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u05",

  concepts: [
    concept("countable", "pattern", "an apple / two apples", "contáveis: têm plural", "l1", ["I need three eggs.", "Preciso de três ovos."]),
    concept("uncountable", "pattern", "water, rice, money, bread", "incontáveis: sem plural, sem a/an", "l1", ["We need rice and milk.", "Precisamos de arroz e leite."], { note: "Não se diz “a rice” nem “two breads”." }),
    concept("some", "word", "some", "um pouco de / alguns", "l2", ["There is some milk in the fridge.", "Tem um pouco de leite na geladeira."], { note: "Em frases afirmativas e em ofertas ou pedidos." }),
    concept("any", "word", "any", "nenhum / algum (negativas e perguntas)", "l2", ["We don't have any eggs.", "Não temos ovos."]),
    concept("how-many", "phrase", "How many …?", "Quantos …? (contáveis)", "l3", ["How many eggs do we need?", "De quantos ovos precisamos?"]),
    concept("how-much-q", "phrase", "How much …?", "Quanto …? (incontáveis)", "l3", ["How much sugar do you want?", "Quanto açúcar você quer?"]),
    concept("a-lot-of", "phrase", "a lot of / many / much", "muito(s)", "l3", ["She drinks a lot of water.", "Ela bebe muita água."], { note: "A lot of serve para os dois tipos. Many: contáveis. Much: incontáveis, sobretudo em negativas e perguntas." }),
    concept("containers", "phrase", "a bottle of, a cup of, a slice of, a bag of", "uma garrafa de, uma xícara de, uma fatia de, um saco de", "l4", ["A bottle of water, please.", "Uma garrafa de água, por favor."], { tags: ["collocation"] }),
    concept("a-few-little", "phrase", "a few / a little", "alguns / um pouco de", "l4", ["I have a few questions.", "Tenho algumas perguntas."], { note: "A few + contável; a little + incontável." }),
    concept("information", "word", "information, advice, news", "informação, conselho, notícia", "l4", ["I need some information.", "Preciso de algumas informações."], { note: "São incontáveis: nunca “informations” ou “an advice”." }),
  ],

  lessons: [
    lesson("l1", {
      title: "Dá para contar ou não?",
      objective: "Você vai conseguir tratar corretamente substantivos contáveis e incontáveis.",
      minutes: 8,
      context: { kind: "dialogue", title: "Fazendo a lista de compras", lines: [
        { who: "Ana", en: "What do we need for the cake?", pt: "Do que precisamos para o bolo?" },
        { who: "Leo", en: "We need three eggs, an orange and a banana.", pt: "Precisamos de três ovos, uma laranja e uma banana." },
        { who: "Ana", en: "And flour, sugar and milk.", pt: "E farinha, açúcar e leite." },
        { who: "Leo", en: "Do we have butter? I need bread too.", pt: "Temos manteiga? Preciso de pão também." },
      ] },
      explanation: {
        summary: "Substantivos **contáveis** têm singular e plural e aceitam a/an e números: **an egg**, **three eggs**.\n\nSubstantivos **incontáveis** não têm plural e não aceitam a/an: **water**, **rice**, **sugar**, **milk**, **bread**, **money**.",
        details: "Alguns incontáveis surpreendem quem fala português: **bread**, **money**, **furniture**, **luggage**, **homework**. Com eles, o verbo fica no singular: *The money is on the table.*",
        examples: [
          { en: "I need an egg.", pt: "Preciso de um ovo." },
          { en: "We need rice.", pt: "Precisamos de arroz." },
          { en: "The bread is fresh.", pt: "O pão está fresco." },
        ],
        contrasts: [
          { wrong: "I need a bread.", right: "I need bread. / I need some bread.", why: "Bread é incontável: sem a." },
          { wrong: "The moneys are here.", right: "The money is here.", why: "Money não tem plural e pede verbo no singular." },
        ],
      },
      guided: [
        mc("e1", "Which word is uncountable?", ["rice", "egg", "banana"], 0, "Rice não tem plural nem aceita a/an.", { c: ["uncountable"], pt: "Qual palavra é incontável?" }),
        match("e2", "Associe a palavra ao tipo.", [["egg", "contável: an egg"], ["water", "incontável: some water"], ["apple", "contável: two apples"], ["money", "incontável: sem plural"]],
          "Contáveis têm plural; incontáveis não.", { c: ["countable", "uncountable"], s: "grammar" }),
        cloze("e3", "We need three ___.", ["eggs"], "Contável no plural: eggs.", { c: ["countable"], cue: "(egg)" }),
      ],
      independent: [
        cloze("e4", "The money ___ on the table.", ["is"], "Money é incontável: verbo no singular.", { c: ["uncountable"], cue: "(be)" }),
        fix("e5", "I need a bread.", ["I need bread", "I need some bread"], "Bread é incontável.", { c: ["uncountable"], prompt: "Corrija o erro." }),
        dict("e6", "We need three eggs and milk.", "Um contável no plural e um incontável.", { c: ["countable", "uncountable"], alt: ["We need 3 eggs and milk."] }),
        order("e7", "Put the words in order: “Preciso de uma laranja e duas bananas.”", "I need an orange and two bananas.", "An antes de som de vogal; plural com -s.", { c: ["countable"] }),
      ],
      application: [
        type("e8", "Say in English: “O arroz está pronto.” (pronto = ready)", ["The rice is ready"], "Rice é incontável: is.", { c: ["uncountable"] }),
        speak("e9", "Diga o que você precisa comprar: três contáveis e três incontáveis.", ["I need four eggs, two apples and an onion. I also need rice, milk and bread."],
          { mode: "respond", check: ["Usei plural ou a/an com os contáveis.", "Não usei a nem plural com os incontáveis.", "Citei seis itens."], c: ["countable", "uncountable"] }),
      ],
      summary: { points: ["Contáveis: a/an, números, plural.", "Incontáveis: sem a/an, sem plural, verbo no singular.", "bread, money, rice, water são incontáveis."], concepts: ["countable", "uncountable"] },
    }),

    lesson("l2", {
      title: "Some e any",
      objective: "Você vai conseguir dizer o que há e o que não há usando some e any.",
      minutes: 8,
      context: { kind: "dialogue", title: "Abrindo a geladeira", lines: [
        { who: "Leo", en: "Is there any milk?", pt: "Tem leite?" },
        { who: "Ana", en: "Yes, there's some milk, but there aren't any eggs.", pt: "Tem um pouco de leite, mas não tem ovos." },
        { who: "Leo", en: "Do we have any cheese?", pt: "Temos queijo?" },
        { who: "Ana", en: "No, we don't have any. Would you like some juice?", pt: "Não, não temos. Você quer um pouco de suco?" },
      ] },
      explanation: {
        summary: "**Some** e **any** indicam quantidade indefinida:\n- **some** em frases **afirmativas**: *There is some milk.*\n- **any** em **negativas** e **perguntas**: *There aren't any eggs. Is there any cheese?*\n\nEm **ofertas e pedidos**, usa-se **some**: *Would you like some juice? Can I have some water?*",
        details: "Os dois funcionam com contáveis no plural e com incontáveis: *some apples, some rice; any apples, any rice*. Sozinho, **any** pode substituir o substantivo: *We don't have any.*",
        examples: [
          { en: "I have some friends in Lima.", pt: "Tenho alguns amigos em Lima." },
          { en: "We don't have any bread.", pt: "Não temos pão." },
          { en: "Would you like some coffee?", pt: "Quer um pouco de café?" },
        ],
        contrasts: [
          { wrong: "There isn't some milk.", right: "There isn't any milk.", why: "Em negativas, any." },
          { wrong: "Would you like any coffee? (oferta)", right: "Would you like some coffee?", why: "Em ofertas, some soa mais natural." },
        ],
      },
      guided: [
        mc("e1", "Choose: “We don't have ___ eggs.”", ["any", "some", "a"], 0, "Negativa: any.", { c: ["any"] }),
        match("e2", "Associe a frase ao uso.", [["There is some milk.", "afirmativa"], ["There isn't any milk.", "negativa"], ["Is there any milk?", "pergunta"], ["Would you like some milk?", "oferta"]],
          "Some em afirmativas e ofertas; any em negativas e perguntas.", { c: ["some", "any"], s: "grammar" }),
        cloze("e3", "There is ___ juice in the fridge.", ["some"], "Afirmativa: some.", { c: ["some"] }),
      ],
      independent: [
        cloze("e4", "Is there ___ cheese?", ["any"], "Pergunta: any.", { c: ["any"] }),
        cloze("e5", "Would you like ___ tea?", ["some"], "Oferta: some.", { c: ["some"] }),
        fix("e6", "I don't have some money.", ["I don't have any money", "I do not have any money"], "Negativa pede any.", { c: ["any"], prompt: "Corrija o erro." }),
        dict("e7", "There's some milk, but there aren't any eggs.", "Some na afirmativa, any na negativa.", { c: ["some", "any"], alt: ["There is some milk, but there aren't any eggs."] }),
      ],
      application: [
        type("e8", "Offer someone some water.", ["Would you like some water"], "Would you like some…?", { c: ["some"], pt: "Ofereça água a alguém." }),
        dialog("e9", "You are cooking with a friend and checking what you have.", [
          { npc: ["Do we have any tomatoes?", "Temos tomates?"], options: [
            ["Yes, we have some.", true, "Ele pega os tomates.", "Afirmativa com some."],
            ["Yes, we have any.", false, "Soa errado.", "Em afirmativas, some."],
          ] },
          { npc: ["And onions?", "E cebolas?"], options: [
            ["No, we don't have any onions.", true, "Ele anota na lista.", "Negativa com any."],
            ["No, we don't have some onions.", false, "Ele entende, mas a frase está errada.", "Em negativas, any."],
          ] },
        ], "Some em afirmativas; any em negativas e perguntas.", { c: ["some", "any"] }),
      ],
      summary: { points: ["some: afirmativas, ofertas e pedidos.", "any: negativas e perguntas.", "Funcionam com plurais e incontáveis."], concepts: ["some", "any"] },
    }),

    lesson("l3", {
      title: "Quanto e quantos",
      objective: "Você vai conseguir perguntar quantidades e dizer se é muito ou pouco.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na cozinha", lines: [
        { who: "Bia", en: "How many eggs do we need?", pt: "De quantos ovos precisamos?" },
        { who: "Ken", en: "Four. And how much sugar?", pt: "Quatro. E quanto açúcar?" },
        { who: "Bia", en: "Not much. But we need a lot of flour.", pt: "Pouco. Mas precisamos de muita farinha." },
        { who: "Ken", en: "There aren't many apples. Is that okay?", pt: "Não há muitas maçãs. Tudo bem?" },
      ] },
      explanation: {
        summary: "Para perguntar a quantidade:\n- **How many** + contável no plural: *How many eggs?*\n- **How much** + incontável: *How much sugar?*\n\nPara dizer “muito”:\n- **a lot of** serve para tudo: *a lot of eggs, a lot of sugar*\n- **many** + contáveis; **much** + incontáveis (sobretudo em negativas e perguntas)",
        details: "Na fala afirmativa, *a lot of* é o mais natural: *I have a lot of work*. *Much* em afirmativas soa formal. Nas negativas: *I don't have much time; There aren't many people.*",
        examples: [
          { en: "How many people are coming?", pt: "Quantas pessoas vêm?" },
          { en: "How much time do we have?", pt: "Quanto tempo temos?" },
          { en: "I don't have much money.", pt: "Não tenho muito dinheiro." },
        ],
        contrasts: [
          { wrong: "How much eggs?", right: "How many eggs?", why: "Eggs é contável: how many." },
          { wrong: "How many money?", right: "How much money?", why: "Money é incontável: how much." },
        ],
      },
      guided: [
        mc("e1", "Choose: “How ___ sugar do you want?”", ["much", "many", "a lot"], 0, "Sugar é incontável: how much.", { c: ["how-much-q"] }),
        match("e2", "Associe a pergunta ao substantivo.", [["How many", "eggs"], ["How much", "water"], ["How many people", "are coming?"], ["How much time", "do we have?"]],
          "Many para contáveis; much para incontáveis.", { c: ["how-many", "how-much-q"], s: "grammar" }),
        cloze("e3", "How ___ apples do we have?", ["many"], "Apples é contável.", { c: ["how-many"] }),
      ],
      independent: [
        cloze("e4", "She drinks a ___ of water every day.", ["lot"], "A lot of = muito(a).", { c: ["a-lot-of"], s: "vocabulary" }),
        cloze("e5", "I don't have ___ time today.", ["much"], "Time é incontável; negativa: much.", { c: ["a-lot-of"] }),
        order("e6", "Put the words in order: “Quanto dinheiro você tem?”", "How much money do you have?", "How much + incontável + do you…", { c: ["how-much-q"], extra: ["many"] }),
        fix("e7", "How much people live here?", ["How many people live here"], "People é contável (plural).", { c: ["how-many"], prompt: "Corrija o erro." }),
        dict("e8", "There aren't many apples.", "Many em negativa com contável.", { c: ["a-lot-of"], alt: ["There are not many apples."] }),
      ],
      application: [
        type("e9", "Ask in English: “Quanto açúcar você quer?”", ["How much sugar do you want"], "Sugar é incontável: How much.", { c: ["how-much-q"] }),
        listen("e10", "How much milk do we have? Not much. But we have a lot of juice.", "What do they have a lot of?", ["Juice", "Milk", "Water"], 0, "A lot of juice.", { c: ["a-lot-of", "how-much-q"] }),
      ],
      summary: { points: ["How many + contável; How much + incontável.", "a lot of serve para os dois.", "not many / not much."], concepts: ["how-many", "how-much-q", "a-lot-of"] },
    }),

    lesson("l4", {
      title: "Uma garrafa de, um pouco de",
      objective: "Você vai conseguir pedir quantidades precisas e lidar com palavras como information e advice.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na padaria", lines: [
        { who: "Cliente", en: "Can I have a bottle of water and two slices of cake, please?", pt: "Pode me ver uma garrafa de água e duas fatias de bolo, por favor?" },
        { who: "Atendente", en: "Sure. Would you like a cup of coffee too?", pt: "Claro. Quer uma xícara de café também?" },
        { who: "Cliente", en: "Yes, with a little milk. And I need some information: do you sell bread?", pt: "Quero, com um pouco de leite. E preciso de uma informação: vocês vendem pão?" },
        { who: "Atendente", en: "Yes, but we only have a few rolls left.", pt: "Sim, mas só nos restam alguns pãezinhos." },
      ] },
      explanation: {
        summary: "Para “contar” incontáveis, use um **recipiente ou medida**: **a bottle of water**, **a cup of coffee**, **a slice of cake**, **a bag of rice**.\n\nPequenas quantidades:\n- **a few** + contável: *a few questions*\n- **a little** + incontável: *a little milk*\n\n**Information**, **advice** e **news** são incontáveis.",
        details: "Para um item só: *a piece of information, a piece of advice*. Para vários: *some information*. O verbo fica no singular: *The news is good.* Mais medidas: *a glass of juice, a can of soda, a kilo of rice, a loaf of bread*.",
        examples: [
          { en: "Two cups of tea, please.", pt: "Duas xícaras de chá, por favor." },
          { en: "I have a few friends here.", pt: "Tenho alguns amigos aqui." },
          { en: "Can I give you some advice?", pt: "Posso te dar um conselho?" },
        ],
        contrasts: [
          { wrong: "I need some informations.", right: "I need some information.", why: "Information é incontável: sem -s." },
          { wrong: "Can you give me an advice?", right: "Can you give me some advice?", why: "Advice não aceita an." },
          { wrong: "a few milk", right: "a little milk", why: "Milk é incontável: a little." },
        ],
        tip: "**Of** quase some na fala: *a cup of coffee* soa “a cúp’v cófi”.",
      },
      guided: [
        mc("e1", "Which is correct?", ["I need some information.", "I need some informations.", "I need an information."], 0, "Information é incontável.", { c: ["information"] }),
        match("e2", "Associe a medida ao produto.", [["a bottle of", "water"], ["a cup of", "coffee"], ["a slice of", "cake"], ["a bag of", "rice"]],
          "Medidas tornam os incontáveis “contáveis”.", { c: ["containers"] }),
        cloze("e3", "Coffee with a ___ milk, please.", ["little"], "Milk é incontável: a little.", { c: ["a-few-little"] }),
      ],
      independent: [
        cloze("e4", "I have a ___ questions about the hotel.", ["few"], "Questions é contável: a few.", { c: ["a-few-little"] }),
        cloze("e5", "Two ___ of water, please.", ["bottles"], "Duas garrafas: bottles.", { c: ["containers"], cue: "(bottle)" }),
        fix("e6", "Can you give me an advice?", ["Can you give me some advice", "Can you give me a piece of advice"], "Advice é incontável.", { c: ["information"], prompt: "Corrija o erro." }),
        dict("e7", "A cup of coffee and a slice of cake, please.", "Duas medidas com of.", { c: ["containers"] }),
        type("e8", "Say in English: “Preciso de algumas informações.”", ["I need some information"], "Some information, sem -s.", { c: ["information"], t: [["I need some informations", "Information não tem plural."]] }),
      ],
      application: [
        dialog("e9", "At a tourist office, you ask for help.", [
          { npc: ["Good morning. How can I help?", "Bom dia. Como posso ajudar?"], options: [
            ["Good morning. I need some information about buses.", true, "A atendente pega um folheto.", "Some information."],
            ["Good morning. I need some informations about buses.", false, "Ela entende, mas a palavra está errada.", "Information não tem plural."],
          ] },
          { npc: ["Of course. Do you have a few minutes?", "Claro. Você tem alguns minutos?"], options: [
            ["Yes, I have a little time before my train.", true, "Ela explica as linhas.", "A little + time."],
            ["Yes, I have a few time.", false, "Soa errado.", "Time é incontável: a little."],
          ] },
        ], "Information e advice sem plural; a few e a little.", { c: ["information", "a-few-little"] }),
        write("e10", "Escreva o seu pedido em um café, com três itens e medidas.",
          { frame: ["Can I have a … of …", "and two … of …", "with a little …"], min: 14, check: ["Usei pelo menos duas medidas com of.", "Usei a little ou a few corretamente.", "Usei please."], model: "Can I have a cup of tea and two slices of cake, please? With a little sugar.", c: ["containers", "a-few-little"] }),
      ],
      summary: { points: ["a bottle of, a cup of, a slice of, a bag of.", "a few + contável; a little + incontável.", "information, advice, news: incontáveis."], concepts: ["containers", "a-few-little", "information"] },
    }),
  ],

  checkpoint: {
    intro: "Shopping, cooking and asking for information in new situations.",
    a: [
      cloze("q1", "There isn't ___ sugar in the kitchen.", ["any"], "Negativa: any.", { c: ["any"] }),
      mc("q2", "Choose: “How ___ chairs do we need?”", ["many", "much", "any"], 0, "Chairs é contável.", { c: ["how-many"] }),
      fix("q3", "She gave me a good advice.", ["She gave me good advice", "She gave me some good advice", "She gave me a good piece of advice"], "Advice é incontável.", { c: ["information"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Você quer um pouco de chá?”", "Would you like some tea?", "Oferta com some.", { c: ["some"], extra: ["any"] }),
      dict("q5", "I have a few questions.", "A few + contável.", { c: ["a-few-little"] }),
      type("q6", "Ask in English: “Quanto tempo nós temos?”", ["How much time do we have"], "Time é incontável.", { c: ["how-much-q"] }),
      cloze("q7", "A ___ of bread, please. (fatia)", ["slice"], "A slice of bread.", { c: ["containers"], s: "vocabulary" }),
      listen("q8", "We have a lot of rice, but we don't have any beans.", "What is missing?", ["Beans", "Rice", "Nothing"], 0, "We don't have any beans.", { c: ["any", "a-lot-of"] }),
      mc("q9", "Which is correct?", ["The money is in my bag.", "The moneys are in my bag.", "A money is in my bag."], 0, "Money: incontável, singular.", { c: ["uncountable"] }),
      dialog("q10", "You are at a market stall.", [
        { npc: ["What would you like?", "O que você gostaria?"], options: [
          ["I'd like some tomatoes and a bag of rice, please.", true, "O vendedor separa os itens.", "Some + plural; a bag of + incontável."],
          ["I'd like any tomatoes and a rice.", false, "Ele entende com dificuldade.", "Em pedidos, some; rice não aceita a."],
        ] },
        { npc: ["How many tomatoes?", "Quantos tomates?"], options: [
          ["Just a few. Four or five.", true, "Ele pesa os tomates.", "A few + contável."],
          ["Just a little.", false, "Ele fica em dúvida.", "Tomatoes é contável: a few."],
        ] },
      ], "Pedir com some e medidas; a few para contáveis.", { c: ["some", "containers", "a-few-little"] }),
    ],
    b: [
      cloze("q1", "I'd like ___ water, please.", ["some"], "Pedido: some.", { c: ["some"] }),
      mc("q2", "Choose: “How ___ money do you need?”", ["much", "many", "few"], 0, "Money é incontável.", { c: ["how-much-q"] }),
      fix("q3", "We need two breads.", ["We need two loaves of bread", "We need bread", "We need some bread"], "Bread é incontável.", { c: ["uncountable"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “Não há muitas pessoas aqui.”", "There aren't many people here.", "Many em negativa com contável.", { c: ["a-lot-of"], extra: ["much"] }),
      dict("q5", "Two bottles of water, please.", "Medida no plural + of.", { c: ["containers"], alt: ["2 bottles of water, please."] }),
      type("q6", "Ask in English: “Quantos ovos nós temos?”", ["How many eggs do we have"], "Eggs é contável.", { c: ["how-many"] }),
      cloze("q7", "Coffee with a ___ sugar, please.", ["little"], "Sugar é incontável: a little.", { c: ["a-few-little"] }),
      listen("q8", "Is there any cheese? Yes, there's some in the fridge.", "Where is the cheese?", ["In the fridge", "On the table", "There isn't any"], 0, "There's some in the fridge.", { c: ["some", "any"] }),
      mc("q9", "Which is correct?", ["The news is good.", "The news are good.", "A news is good."], 0, "News é incontável: singular.", { c: ["information"] }),
      dialog("q10", "A guest arrives at your home.", [
        { npc: ["Thank you for inviting me!", "Obrigado por me convidar!"], options: [
          ["You're welcome. Would you like some coffee?", true, "Ele aceita.", "Oferta com some."],
          ["You're welcome. Do you like any coffee?", false, "A pergunta soa estranha.", "Para oferecer: Would you like some…?"],
        ] },
        { npc: ["Yes, please. Do you have any sugar?", "Sim, por favor. Você tem açúcar?"], options: [
          ["Sorry, I don't have any. But I have some honey.", true, "Ele aceita o mel.", "Any na negativa; some na afirmativa."],
          ["Sorry, I don't have some.", false, "Ele entende, mas soa errado.", "Negativa: any."],
        ] },
      ], "Oferecer com some; negar com any.", { c: ["some", "any"] }),
    ],
    production: write("t1", "Write your shopping list for a small party and a short message asking a friend to buy three things, with quantities.",
      { mode: "free", min: 35, check: ["Usei contáveis no plural e incontáveis sem plural.", "Usei some e any corretamente.", "Usei pelo menos duas medidas (a bottle of, a bag of…).", "Usei a few ou a little."],
        model: "For the party we need some bread, a lot of ice and a few snacks. We don't have any juice. Can you buy three bottles of juice, two bags of ice and a little cheese? I have some cake at home. Thank you!", c: ["some", "any", "containers"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Receita de panqueca",
      goal: "Ler uma receita simples e identificar ingredientes e quantidades.",
      context: { kind: "list", title: "Easy pancakes", lines: [
        { en: "You need two eggs, a cup of milk and a cup of flour.", pt: "Você precisa de dois ovos, uma xícara de leite e uma xícara de farinha." },
        { en: "Add a little sugar and some butter. Don't use much salt.", pt: "Acrescente um pouco de açúcar e manteiga. Não use muito sal." },
        { en: "This makes a few small pancakes, enough for two people.", pt: "Isso rende algumas panquecas pequenas, o suficiente para duas pessoas." },
      ] },
      exercises: [
        mc("r1", "How many eggs do you need?", ["Two", "One", "Three"], 0, "You need two eggs.", { c: ["how-many"], s: "reading", keepOrder: true }),
        mc("r2", "How much salt should you use?", ["Not much", "A lot", "None"], 0, "Don't use much salt.", { c: ["a-lot-of"], s: "reading" }),
        type("r3", "Complete with the measure from the recipe: a ___ of milk.", ["cup"], "A cup of milk.", { c: ["containers"], s: "reading" }),
        cloze("r4", "Add a ___ sugar.", ["little"], "A little sugar.", { c: ["a-few-little"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "O que falta comprar",
      goal: "Entender o que há e o que falta em casa.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Do we need anything from the store?", pt: "Precisamos de alguma coisa do mercado?" },
        { who: "B", en: "Yes. We have some rice, but we don't have any milk. And buy a few apples.", pt: "Sim. Temos arroz, mas não temos leite. E compre algumas maçãs." },
      ] },
      exercises: [
        listen("a1", ["Do we need anything from the store?", "Yes. We have some rice, but we don't have any milk. And buy a few apples."], "What do they already have?", ["Rice", "Milk", "Apples"], 0, "We have some rice.", { c: ["some"] }),
        listen("a2", ["Do we need anything from the store?", "Yes. We have some rice, but we don't have any milk. And buy a few apples."], "How many apples should the person buy?", ["A few", "A lot", "None"], 0, "Buy a few apples.", { c: ["a-few-little"] }),
        dict("a3", "We don't have any milk.", "Negativa com any.", { c: ["any"], alt: ["We do not have any milk."], prompt: "Type the sentence about milk." }),
      ],
    }),
    writing: activity("writing", {
      title: "Lista e recado",
      goal: "Escrever uma lista de compras com quantidades.",
      exercises: [
        write("w1", "Write a note for someone who is going shopping for you: what you have, what you don't have and what to buy.",
          { frame: ["We have some …", "We don't have any …", "Please buy … of …"], min: 20, check: ["Usei some em afirmativa.", "Usei any em negativa.", "Indiquei quantidades com medidas."], model: "We have some rice and a little cheese. We don't have any eggs. Please buy six eggs, two bottles of milk and a bag of sugar.", c: ["some", "any", "containers"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "O que tem na sua cozinha",
      goal: "Descrever o que há e o que falta, com quantidades.",
      exercises: [
        speak("s1", "Say what there is in your kitchen right now and what you need to buy.", ["There is some rice and a lot of water. There aren't any eggs. I need a few tomatoes and a bottle of milk."],
          { mode: "respond", check: ["Usei some e any.", "Usei a lot of ou a few/a little.", "Citei pelo menos uma medida.", "Ouvi o modelo e comparei."], c: ["some", "any", "a-lot-of"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: compras para um jantar",
      goal: "Fazer compras negociando quantidades e pedindo informação.",
      exercises: [
        dialog("m1", "You are buying food for a dinner with friends.", [
          { npc: ["Hi there. What do you need today?", "Olá. Do que você precisa hoje?"], options: [
            ["I need some cheese and a few tomatoes, please.", true, "A vendedora pergunta a quantidade.", "Some + incontável; a few + contável."],
            ["I need a cheese and a little tomatoes.", false, "Ela entende, mas soa errado.", "Cheese é incontável; tomatoes pede a few."],
          ] },
          { npc: ["How much cheese?", "Quanto queijo?"], options: [
            ["Not much. About 200 grams.", true, "Ela corta o queijo.", "Not much para incontável."],
            ["Not many.", false, "Ela estranha.", "Cheese é incontável: not much."],
          ] },
          { npc: ["Anything else?", "Mais alguma coisa?"], options: [
            ["Yes. Do you have any fresh bread? And I need some information about delivery.", true, "Ela mostra os pães e explica a entrega.", "Any na pergunta; some information."],
            ["Yes. Do you have some informations?", false, "Ela não entende o pedido.", "Information não tem plural."],
          ] },
        ], "Quantidades certas: some, any, a few, much.", { c: ["some", "how-much-q", "information"] }),
        write("m2", "Write the final shopping list with quantities.", { min: 10, check: ["Listei pelo menos quatro itens.", "Indiquei quantidade ou medida em cada um.", "Não pluralizei incontáveis."], model: "200 grams of cheese, a few tomatoes, two loaves of bread, a bottle of juice.", c: ["containers", "uncountable"] }),
      ],
      outside: {
        title: "Fora do app: sua geladeira em inglês",
        instructions: "Abra a geladeira ou a despensa e diga em voz alta, em inglês, cinco coisas que há (com some, a lot of, a few, a little) e três que não há (com any). Depois escreva a lista do que falta, com medidas.",
        checklist: ["Disse cinco frases com there is/are + quantidade.", "Disse três frases negativas com any.", "Escrevi a lista com medidas."],
      },
    }),
  },
});
