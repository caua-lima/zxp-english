/** A1 · Unidade 6 — Casa e lugares: there is / there are e preposições de lugar. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u06",

  concepts: [
    concept("rooms", "word", "kitchen, bedroom, bathroom, living room", "cozinha, quarto, banheiro, sala", "l1", ["The kitchen is small.", "A cozinha é pequena."]),
    concept("furniture", "word", "bed, table, chair, sofa, fridge", "cama, mesa, cadeira, sofá, geladeira", "l1", ["There is a sofa in the living room.", "Há um sofá na sala."]),
    concept("there-is", "pattern", "There is a …", "Há / Tem um(a) …", "l1", ["There is a table in the kitchen.", "Há uma mesa na cozinha."], { note: "Para dizer que algo existe. Forma curta: There's." }),
    concept("there-are", "pattern", "There are two …", "Há / Tem dois …", "l1", ["There are two bedrooms.", "Há dois quartos."]),
    concept("there-neg", "pattern", "There isn't a … / There aren't any …", "Não há …", "l2", ["There aren't any chairs.", "Não há cadeiras."]),
    concept("is-there", "pattern", "Is there a …? / Are there any …?", "Há …? / Tem …?", "l2", ["Is there a bathroom here?", "Tem banheiro aqui?"]),
    concept("in-on-under", "word", "in, on, under", "em/dentro, sobre, embaixo", "l3", ["The keys are on the table.", "As chaves estão em cima da mesa."]),
    concept("next-between", "word", "next to, between, behind, in front of", "ao lado de, entre, atrás, em frente a", "l3", ["The bank is next to the pharmacy.", "O banco fica ao lado da farmácia."]),
    concept("where-is", "phrase", "Where is the …? / Where are the …?", "Onde está/estão …?", "l3", ["Where are my keys?", "Onde estão minhas chaves?"]),
    concept("places", "word", "bank, supermarket, pharmacy, park, station", "banco, supermercado, farmácia, parque, estação", "l4", ["The supermarket is near my house.", "O supermercado fica perto da minha casa."]),
    concept("near-here", "phrase", "Is there a … near here?", "Tem … aqui perto?", "l4", ["Is there a pharmacy near here?", "Tem farmácia aqui perto?"]),
    concept("there-vs-have", "pattern", "there is / there are x have", "há x ter", "l4", ["There is a park in my city.", "Tem um parque na minha cidade."], { note: "Em português “tem” serve para os dois. Em inglês, existência é there is/are; posse é have." }),
  ],

  lessons: [
    lesson("l1", {
      title: "O que há na casa",
      objective: "Você vai conseguir descrever uma casa dizendo o que há em cada cômodo.",
      minutes: 8,
      context: { kind: "text", title: "Anúncio de apartamento", lines: [
        { en: "This apartment is small but nice.", pt: "Este apartamento é pequeno, mas agradável." },
        { en: "There are two bedrooms and there is one bathroom.", pt: "Há dois quartos e há um banheiro." },
        { en: "In the kitchen, there is a fridge and a table.", pt: "Na cozinha há uma geladeira e uma mesa." },
        { en: "There is a sofa in the living room.", pt: "Há um sofá na sala." },
      ] },
      explanation: {
        summary: "Para dizer que algo **existe** em um lugar, use **there is** (singular) e **there are** (plural):\n- **There is a sofa** in the living room.\n- **There are two bedrooms.**\n\nCômodos: **kitchen**, **bedroom**, **bathroom**, **living room**. Móveis: **bed**, **table**, **chair**, **sofa**, **fridge**.",
        details: "A forma curta de there is é **there's**. There are não tem forma curta escrita. Numa lista, o verbo concorda com o primeiro item: *There is a table and two chairs.*",
        examples: [
          { en: "There is a table in the kitchen.", pt: "Há uma mesa na cozinha." },
          { en: "There are four chairs.", pt: "Há quatro cadeiras." },
          { en: "There's a bed in the bedroom.", pt: "Há uma cama no quarto." },
        ],
        contrasts: [
          { wrong: "Have a sofa in the living room.", right: "There is a sofa in the living room.", why: "“Tem um sofá” no sentido de existir é there is, não have." },
          { wrong: "There is two bedrooms.", right: "There are two bedrooms.", why: "Plural pede there are." },
        ],
        tip: "Na fala, **there's a** fica fraco e rápido: “dhérza”. O importante é o substantivo que vem depois.",
      },
      guided: [
        mc("e1", "Complete: “___ two bedrooms.”", ["There are", "There is", "Have"], 0, "Two bedrooms é plural: there are.", { c: ["there-are"], why: [undefined, "There is é para singular.", "Have indica posse, e ainda faltaria o sujeito."] }),
        match("e2", "Associe a palavra ao significado.", [["kitchen", "cozinha"], ["bedroom", "quarto"], ["bathroom", "banheiro"], ["living room", "sala"], ["fridge", "geladeira"], ["chair", "cadeira"]],
          "Quatro cômodos e dois móveis muito usados.", { c: ["rooms", "furniture"] }),
        cloze("e3", "There ___ a fridge in the kitchen.", ["is"], "A fridge é singular: there is.", { c: ["there-is"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "There ___ four chairs.", ["are"], "Four chairs é plural: there are.", { c: ["there-are"], cue: "(be)" }),
        cloze("e5", "We cook in the ___.", ["kitchen"], "O lugar onde se cozinha é a kitchen.", { c: ["rooms"], s: "vocabulary", tr: "Nós cozinhamos na cozinha." }),
        dict("e6", "There is a sofa in the living room.", "There is + singular + lugar.", { c: ["there-is", "furniture"], alt: ["There's a sofa in the living room."] }),
        fix("e7", "Have a table in the kitchen.", ["There is a table in the kitchen", "There's a table in the kitchen"], "Existência usa there is, não have.", { c: ["there-is", "there-vs-have"], prompt: "Corrija o erro." }),
        cloze("e8", "I sleep in my ___.", ["bed"], "Dormimos na bed (cama).", { c: ["furniture"], s: "vocabulary", tr: "Eu durmo na minha cama." }),
      ],
      application: [
        type("e9", "Diga em inglês: “Há dois banheiros.”", ["There are two bathrooms", "There are 2 bathrooms"], "Plural: there are.", { c: ["there-are", "rooms"] }),
        speak("e10", "Descreva sua casa em três frases.", ["There are two bedrooms. There is a small kitchen. There is a sofa in the living room."],
          { mode: "respond", check: ["Usei there is para singular.", "Usei there are para plural.", "Citei pelo menos dois cômodos."], c: ["there-is", "there-are"] }),
      ],
      summary: { points: ["There is + singular; there are + plural.", "Existência não usa have.", "kitchen, bedroom, bathroom, living room."], concepts: ["rooms", "furniture", "there-is", "there-are"] },
    }),

    lesson("l2", {
      title: "Tem ou não tem?",
      objective: "Você vai conseguir perguntar se algo existe em um lugar e dizer que não há.",
      minutes: 8,
      context: { kind: "dialogue", title: "Visitando um apartamento", lines: [
        { who: "Ana", en: "Is there a fridge in the kitchen?", pt: "Tem geladeira na cozinha?" },
        { who: "Corretor", en: "Yes, there is. But there isn't a table.", pt: "Sim, tem. Mas não tem mesa." },
        { who: "Ana", en: "Are there any chairs?", pt: "Tem cadeiras?" },
        { who: "Corretor", en: "No, there aren't any chairs.", pt: "Não, não tem cadeiras." },
      ] },
      explanation: {
        summary: "**Negativa:** **There isn't a…** (singular) / **There aren't any…** (plural).\n\n**Pergunta:** o verbo vem primeiro: **Is there a…?** / **Are there any…?**\n\n**Respostas curtas:** **Yes, there is.** / **No, there isn't.** / **Yes, there are.** / **No, there aren't.**",
        details: "**Any** aparece em perguntas e negativas com plural: *Are there any chairs? There aren't any chairs.* Em frases afirmativas usa-se **some**: *There are some chairs.*",
        examples: [
          { en: "Is there a bathroom here?", pt: "Tem banheiro aqui?" },
          { en: "There isn't a sofa.", pt: "Não há sofá." },
          { en: "Are there any chairs?", pt: "Tem cadeiras?" },
        ],
        contrasts: [
          { wrong: "There is a bathroom?", right: "Is there a bathroom?", why: "Na pergunta, is vem antes de there." },
          { wrong: "There no is a table.", right: "There isn't a table.", why: "A negativa é isn't ou aren't." },
        ],
      },
      guided: [
        mc("e1", "Como perguntar “Tem um banheiro aqui?”", ["Is there a bathroom here?", "There is a bathroom here?", "Have a bathroom here?"], 0, "Na pergunta, is vem antes de there.", { c: ["is-there"] }),
        match("e2", "Associe a frase ao significado.", [["Is there a table?", "Tem uma mesa?"], ["There isn't a table.", "Não tem mesa."], ["Are there any chairs?", "Tem cadeiras?"], ["There aren't any chairs.", "Não tem cadeiras."]],
          "Pergunta com o verbo na frente; negativa com isn't ou aren't.", { c: ["is-there", "there-neg"] }),
        cloze("e3", "There ___ a sofa in this room.", ["isn't", "is not"], "Negativa no singular: there isn't.", { c: ["there-neg"], tr: "Não há sofá nesta sala." }),
      ],
      independent: [
        cloze("e4", "___ there any chairs?", ["Are"], "Chairs é plural: Are there…?", { c: ["is-there"] }),
        order("e5", "Monte: “Não tem cadeiras.”", "There aren't any chairs.", "There aren't any + plural.", { c: ["there-neg"], extra: ["isn't"] }),
        fix("e6", "There is a fridge in the kitchen?", ["Is there a fridge in the kitchen"], "Pergunta: Is there…?", { c: ["is-there"], prompt: "Transforme em pergunta correta." }),
        dict("e7", "There isn't a table.", "Negativa no singular.", { c: ["there-neg"], alt: ["There is not a table."] }),
      ],
      application: [
        type("e8", "Responda com resposta curta afirmativa: “Is there a bed?”", ["Yes, there is"], "Resposta curta: Yes, there is.", { c: ["is-there"] }),
        dialog("e9", "Você liga para um hotel antes de reservar.", [
          { npc: ["Hello, can I help you?", "Olá, posso ajudar?"], options: [
            ["Yes, please. Is there a fridge in the room?", true, "A atendente confere.", "Pergunta correta com Is there."],
            ["Yes, please. Have a fridge in the room?", false, "Ela demora para entender.", "Existência é there is; a pergunta é Is there…?"],
          ] },
          { npc: ["Yes, there is. But there isn't a kitchen.", "Sim, tem. Mas não tem cozinha."], options: [
            ["Okay. Are there any chairs?", true, "Ela responde: “Yes, there are two.”", "Plural com Are there any."],
            ["Okay. Is there any chairs?", false, "Ela entende, mas a frase está errada.", "Chairs é plural: Are there."],
          ] },
        ], "Perguntar o que há: Is there a…? / Are there any…?", { c: ["is-there", "there-neg"] }),
      ],
      summary: { points: ["There isn't a… / There aren't any…", "Is there a…? / Are there any…?", "Yes, there is. / No, there aren't."], concepts: ["there-neg", "is-there"] },
    }),

    lesson("l3", {
      title: "Onde está?",
      objective: "Você vai conseguir dizer onde uma coisa está em relação a outra.",
      minutes: 9,
      context: { kind: "dialogue", title: "Procurando as chaves", lines: [
        { who: "Leo", en: "Where are my keys?", pt: "Onde estão minhas chaves?" },
        { who: "Ana", en: "Are they on the table?", pt: "Estão em cima da mesa?" },
        { who: "Leo", en: "No. And they aren't in my bag.", pt: "Não. E não estão na minha bolsa." },
        { who: "Ana", en: "Look! They're under the sofa, next to your phone.", pt: "Olha! Estão embaixo do sofá, ao lado do seu celular." },
      ] },
      explanation: {
        summary: "Para perguntar o lugar: **Where is…?** (singular) / **Where are…?** (plural).\n\nPreposições de lugar:\n- **in** = dentro de, em\n- **on** = sobre, em cima de\n- **under** = embaixo de\n- **next to** = ao lado de\n- **between** = entre\n- **behind** = atrás de\n- **in front of** = em frente a",
        details: "**In** é para dentro de um espaço (*in the bag, in the kitchen*). **On** é para superfícies (*on the table, on the wall*). Atenção: *in front of* significa “em frente a”, não “na frente” no sentido de “do outro lado da rua” (isso é *across from*).",
        examples: [
          { en: "The keys are on the table.", pt: "As chaves estão em cima da mesa." },
          { en: "The cat is under the bed.", pt: "O gato está embaixo da cama." },
          { en: "The chair is between the bed and the door.", pt: "A cadeira está entre a cama e a porta." },
        ],
        contrasts: [
          { wrong: "The keys are in the table.", right: "The keys are on the table.", why: "Em cima de uma superfície é on." },
          { wrong: "Where is my keys?", right: "Where are my keys?", why: "Keys é plural: are." },
        ],
      },
      guided: [
        mc("e1", "As chaves estão em cima da mesa. Qual frase descreve isso?", ["The keys are on the table.", "The keys are in the table.", "The keys are under the table."], 0, "Sobre uma superfície: on.", { c: ["in-on-under"], s: "vocabulary" }),
        match("e2", "Associe a preposição ao significado.", [["in", "dentro de"], ["on", "em cima de"], ["under", "embaixo de"], ["next to", "ao lado de"], ["between", "entre"], ["behind", "atrás de"]],
          "Seis preposições resolvem quase todas as localizações.", { c: ["in-on-under", "next-between"] }),
        listen("e3", "Your phone is under the sofa.", "Onde está o celular?", ["Embaixo do sofá", "Em cima do sofá", "Ao lado do sofá"], 0, "Under = embaixo de.", { c: ["in-on-under"] }),
      ],
      independent: [
        cloze("e4", "The cat is ___ the bed. (embaixo)", ["under"], "Under = embaixo de.", { c: ["in-on-under"], s: "vocabulary" }),
        cloze("e5", "The bank is next ___ the pharmacy.", ["to"], "A expressão é next to.", { c: ["next-between"], s: "vocabulary", tr: "O banco fica ao lado da farmácia." }),
        order("e6", "Monte: “Onde estão minhas chaves?”", "Where are my keys?", "Keys é plural: Where are…?", { c: ["where-is"], extra: ["is"] }),
        fix("e7", "Where is my glasses?", ["Where are my glasses"], "Glasses é plural: Where are…?", { c: ["where-is"], prompt: "Corrija o erro." }),
        dict("e8", "The chair is between the bed and the door.", "Between = entre duas coisas.", { c: ["next-between"] }),
      ],
      application: [
        type("e9", "Diga em inglês: “Onde está o banheiro?”", ["Where is the bathroom", "Where's the bathroom"], "Singular: Where is…?", { c: ["where-is"] }),
        speak("e10", "Diga onde estão três coisas no lugar em que você está agora.", ["My phone is on the table. My bag is under the chair. The door is behind me."],
          { mode: "respond", check: ["Usei três preposições diferentes.", "Usei is para singular.", "Falei olhando para os objetos, sem traduzir."], c: ["in-on-under", "next-between"] }),
      ],
      summary: { points: ["Where is…? / Where are…?", "in, on, under.", "next to, between, behind, in front of."], concepts: ["in-on-under", "next-between", "where-is"] },
    }),

    lesson("l4", {
      title: "Tem um banco aqui perto?",
      objective: "Você vai conseguir perguntar por lugares próximos e não confundir “tem” (existir) com “ter” (possuir).",
      minutes: 9,
      context: { kind: "dialogue", title: "Na rua", lines: [
        { who: "Turista", en: "Excuse me, is there a pharmacy near here?", pt: "Com licença, tem farmácia aqui perto?" },
        { who: "Ana", en: "Yes, there is. It's next to the bank.", pt: "Sim, tem. Fica ao lado do banco." },
        { who: "Turista", en: "And is there a supermarket?", pt: "E tem supermercado?" },
        { who: "Ana", en: "There are two. One is in front of the park.", pt: "Tem dois. Um fica em frente ao parque." },
      ] },
      explanation: {
        summary: "Para perguntar por um lugar próximo: **Is there a … near here?**\n\nLugares: **bank**, **supermarket**, **pharmacy**, **park**, **station**.\n\nAtenção ao “tem” do português:\n- **existir** → **there is / there are**: *There is a park in my city.*\n- **possuir** → **have / has**: *I have a car.*",
        details: "Teste rápido: se dá para trocar “tem” por “existe” ou “há”, use **there is/are**. Se dá para trocar por “possui”, use **have/has**. *Tem um banco na rua* = existe → *There is a bank on the street.*",
        examples: [
          { en: "Is there a bank near here?", pt: "Tem um banco aqui perto?" },
          { en: "There are two parks in my city.", pt: "Tem dois parques na minha cidade." },
          { en: "My city has a big station.", pt: "Minha cidade tem uma estação grande." },
        ],
        contrasts: [
          { wrong: "In my street has a bank.", right: "There is a bank on my street.", why: "Existência usa there is. Have precisa de um sujeito que possui." },
          { wrong: "Have many people here.", right: "There are many people here.", why: "“Tem muita gente” = existem pessoas: there are." },
        ],
      },
      guided: [
        mc("e1", "Como se diz “Tem um parque na minha cidade”?", ["There is a park in my city.", "Have a park in my city.", "It has a park in my city."], 0, "Existência usa there is.", { c: ["there-vs-have"], why: [undefined, "Have sozinho não indica existência e ainda falta sujeito.", "It has indicaria que “isso” possui um parque."] }),
        match("e2", "Associe o lugar ao significado.", [["bank", "banco"], ["supermarket", "supermercado"], ["pharmacy", "farmácia"], ["park", "parque"], ["station", "estação"]],
          "Lugares que você mais vai procurar em uma cidade.", { c: ["places"] }),
        cloze("e3", "Is there a pharmacy ___ here?", ["near"], "Near here = aqui perto.", { c: ["near-here"], s: "vocabulary", tr: "Tem farmácia aqui perto?" }),
      ],
      independent: [
        cloze("e4", "I buy food at the ___.", ["supermarket"], "Compramos comida no supermarket.", { c: ["places"], s: "vocabulary", tr: "Eu compro comida no supermercado." }),
        fix("e5", "Have two banks on this street.", ["There are two banks on this street"], "Existência no plural: there are.", { c: ["there-vs-have"], prompt: "Corrija o erro." }),
        order("e6", "Monte: “Tem um banco aqui perto?”", "Is there a bank near here?", "Is there a + lugar + near here?", { c: ["near-here"], extra: ["have"] }),
        dict("e7", "Is there a supermarket near here?", "Pergunta por um lugar próximo.", { c: ["near-here", "places"] }),
      ],
      application: [
        type("e8", "Diga em inglês: “Tem muitos parques na minha cidade.”", ["There are many parks in my city", "There are a lot of parks in my city"], "Existência no plural: there are.", { c: ["there-vs-have"], t: [["Have many parks in my city", "“Tem” no sentido de existir é there are."]] }),
        dialog("e9", "Um turista pede ajuda a você na rua.", [
          { npc: ["Excuse me, is there a station near here?", "Com licença, tem uma estação aqui perto?"], options: [
            ["Yes, there is. It's behind the supermarket.", true, "Ele agradece e segue.", "Resposta curta e localização."],
            ["Yes, has. It's behind the supermarket.", false, "Ele fica em dúvida.", "A resposta curta é Yes, there is."],
          ] },
          { npc: ["Thank you! And a bank?", "Obrigado! E um banco?"], options: [
            ["There are two banks next to the park.", true, "Ele sorri: “Perfect!”", "There are + plural + localização."],
            ["Have two banks next to the park.", false, "Ele entende, mas a frase está errada.", "Existência é there are."],
          ] },
        ], "Indicar lugares: there is/are + preposição de lugar.", { c: ["near-here", "there-vs-have"] }),
        write("e10", "Escreva três frases sobre o que há perto da sua casa.",
          { frame: ["There is a … near my house.", "There are …", "The … is next to …"], min: 14, check: ["Usei there is ou there are (não have).", "Usei pelo menos uma preposição de lugar.", "Citei dois lugares."], model: "There is a supermarket near my house. There are two banks. The pharmacy is next to the park.", c: ["there-vs-have", "places"] }),
      ],
      summary: { points: ["Is there a … near here?", "“Tem” = existir → there is/are.", "“Tem” = possuir → have/has."], concepts: ["places", "near-here", "there-vs-have"] },
    }),
  ],

  checkpoint: {
    intro: "Casas e bairros novos. Diga o que há, onde está e pergunte por lugares.",
    a: [
      cloze("q1", "There ___ three bedrooms in the house.", ["are"], "Plural: there are.", { c: ["there-are"], cue: "(be)" }),
      mc("q2", "“Tem uma geladeira na cozinha?”", ["Is there a fridge in the kitchen?", "Has a fridge in the kitchen?", "There is a fridge in the kitchen?"], 0, "Pergunta: Is there…?", { c: ["is-there"] }),
      fix("q3", "The book is in the table.", ["The book is on the table"], "Sobre uma superfície usa-se on.", { c: ["in-on-under"], prompt: "Corrija a preposição." }),
      order("q4", "Monte: “Não tem mesa na sala.”", "There isn't a table in the living room.", "Negativa no singular: there isn't a.", { c: ["there-neg", "rooms"], extra: ["aren't"] }),
      dict("q5", "The pharmacy is next to the bank.", "Next to = ao lado de.", { c: ["next-between", "places"] }),
      type("q6", "Pergunte em inglês: “Onde estão as cadeiras?”", ["Where are the chairs"], "Plural: Where are…?", { c: ["where-is"] }),
      cloze("q7", "Is there a park ___ here?", ["near"], "Near here = aqui perto.", { c: ["near-here"], s: "vocabulary" }),
      listen("q8", "There is a bed and there are two chairs.", "O que há no quarto?", ["Uma cama e duas cadeiras", "Duas camas e uma cadeira", "Uma cama e uma mesa"], 0, "A bed (uma) e two chairs (duas).", { c: ["furniture", "there-is"] }),
      mc("q9", "Qual frase fala de existência corretamente?", ["There are many shops here.", "Have many shops here.", "It have many shops here."], 0, "Existência: there are.", { c: ["there-vs-have"] }),
      dialog("q10", "Você mostra sua casa a um amigo.", [
        { npc: ["Nice house! Is there a bathroom here?", "Casa bonita! Tem banheiro aqui?"], options: [
          ["Yes, there is. It's next to the kitchen.", true, "Ele encontra o banheiro.", "Resposta curta e localização."],
          ["Yes, it has. It's next to the kitchen.", false, "Ele entende, mas soa errado.", "Resposta curta: Yes, there is."],
        ] },
        { npc: ["And where are the bedrooms?", "E onde ficam os quartos?"], options: [
          ["There are two bedrooms behind the living room.", true, "Ele acha a casa ótima.", "There are + plural + behind."],
          ["There is two bedrooms in front the living room.", false, "A frase tem dois erros.", "Plural pede are; a expressão é in front of."],
        ] },
      ], "Descrever a casa com there is/are e preposições.", { c: ["is-there", "there-are", "next-between"] }),
    ],
    b: [
      cloze("q1", "There ___ a big table in the kitchen.", ["is"], "Singular: there is.", { c: ["there-is"], cue: "(be)" }),
      mc("q2", "“Tem cadeiras?”", ["Are there any chairs?", "Is there any chairs?", "There are any chairs?"], 0, "Plural: Are there any…?", { c: ["is-there"] }),
      fix("q3", "In my city has a big park.", ["There is a big park in my city"], "Existência usa there is.", { c: ["there-vs-have"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “O gato está embaixo da mesa.”", "The cat is under the table.", "Under = embaixo de.", { c: ["in-on-under"], extra: ["on"] }),
      dict("q5", "There aren't any parks here.", "Negativa no plural com any.", { c: ["there-neg"], alt: ["There are not any parks here."] }),
      type("q6", "Pergunte em inglês: “Tem um banco aqui perto?”", ["Is there a bank near here"], "Is there a … near here?", { c: ["near-here"] }),
      cloze("q7", "The park is ___ the bank and the station. (entre)", ["between"], "Between = entre.", { c: ["next-between"], s: "vocabulary" }),
      listen("q8", "The supermarket is in front of the station.", "Onde fica o supermercado?", ["Em frente à estação", "Atrás da estação", "Ao lado da estação"], 0, "In front of = em frente a.", { c: ["next-between", "places"] }),
      mc("q9", "Qual é o cômodo onde há uma cama?", ["bedroom", "bathroom", "kitchen"], 0, "Bed + room = bedroom.", { c: ["rooms"], s: "vocabulary" }),
      dialog("q10", "Você chega a um albergue e pergunta sobre o quarto.", [
        { npc: ["Here is your room.", "Aqui está o seu quarto."], options: [
          ["Thanks. Is there a fridge?", true, "A atendente responde: “No, there isn't.”", "Pergunta correta."],
          ["Thanks. Have a fridge?", false, "Ela demora a entender.", "Pergunta de existência: Is there…?"],
        ] },
        { npc: ["No, there isn't. But there is one in the kitchen.", "Não tem. Mas tem uma na cozinha."], options: [
          ["Okay. Where is the kitchen?", true, "Ela aponta: “Next to the bathroom.”", "Where is + singular."],
          ["Okay. Where are the kitchen?", false, "Ela entende, mas a frase está errada.", "Kitchen é singular: Where is."],
        ] },
      ], "Perguntar o que há e onde fica.", { c: ["is-there", "where-is"] }),
    ],
    production: write("t1", "Descreva a sua casa ou o seu bairro: o que há, o que não há e onde ficam as coisas.",
      { mode: "free", min: 30, check: ["Usei there is e there are.", "Usei uma negativa (there isn't / there aren't any).", "Usei pelo menos três preposições de lugar.", "Não usei have para existência."],
        model: "There are two bedrooms in my house. There is a small kitchen next to the living room. There isn't a table in the kitchen. Near my house there is a supermarket. The pharmacy is between the bank and the park.", c: ["there-is", "there-neg", "next-between"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Anúncio de aluguel",
      goal: "Ler um anúncio de apartamento e identificar o que há e onde fica.",
      context: { kind: "notice", title: "Apartment for rent", lines: [
        { en: "Small apartment near the station. There are two bedrooms and one bathroom.", pt: "Apartamento pequeno perto da estação. Há dois quartos e um banheiro." },
        { en: "There is a fridge in the kitchen, but there isn't a table.", pt: "Há uma geladeira na cozinha, mas não há mesa." },
        { en: "There is a supermarket next to the building. There aren't any parks near here.", pt: "Há um supermercado ao lado do prédio. Não há parques aqui perto." },
      ] },
      exercises: [
        mc("r1", "Quantos quartos há?", ["Dois", "Um", "Três"], 0, "There are two bedrooms.", { c: ["there-are", "rooms"], s: "reading", keepOrder: true }),
        mc("r2", "O que NÃO há na cozinha?", ["Mesa", "Geladeira", "Nada"], 0, "There isn't a table.", { c: ["there-neg"], s: "reading" }),
        type("r3", "Onde fica o supermercado? Complete: It is ___ the building. (duas palavras)", ["next to"], "There is a supermarket next to the building.", { c: ["next-between"], s: "reading" }),
        type("r4", "Responda com resposta curta: Are there any parks near here?", ["No, there aren't", "No, there are not"], "O anúncio diz: There aren't any parks near here.", { c: ["is-there", "there-neg"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Pedindo informação",
      goal: "Entender indicações simples de lugar.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Excuse me, is there a bank near here?", pt: "Com licença, tem um banco aqui perto?" },
        { who: "B", en: "Yes, there is. It's between the pharmacy and the supermarket.", pt: "Sim, tem. Fica entre a farmácia e o supermercado." },
      ] },
      exercises: [
        listen("a1", ["Excuse me, is there a bank near here?", "Yes, there is. It's between the pharmacy and the supermarket."], "O que a pessoa procura?", ["Um banco", "Uma farmácia", "Um supermercado"], 0, "Is there a bank near here?", { c: ["near-here", "places"] }),
        listen("a2", ["Excuse me, is there a bank near here?", "Yes, there is. It's between the pharmacy and the supermarket."], "Onde fica?", ["Entre a farmácia e o supermercado", "Atrás da farmácia", "Em frente ao supermercado"], 0, "Between = entre.", { c: ["next-between"] }),
        dict("a3", "Is there a bank near here?", "Pergunta por um lugar próximo.", { c: ["near-here"], prompt: "Digite a pergunta." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meu anúncio",
      goal: "Escrever um anúncio curto descrevendo uma casa.",
      exercises: [
        write("w1", "Escreva um anúncio de aluguel para a sua casa (ou uma casa imaginária).",
          { frame: ["There are … bedrooms.", "There is a … in the …", "There isn't a …", "Near the house there is …"], min: 20, check: ["Usei there is e there are.", "Incluí algo que não há.", "Disse o que há por perto."], model: "Nice house near the park. There are three bedrooms and two bathrooms. There is a big table in the kitchen. There isn't a sofa. Near the house there is a supermarket.", c: ["there-is", "there-are"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Tour pela casa",
      goal: "Descrever os cômodos da sua casa em voz alta.",
      exercises: [
        speak("s1", "Faça um tour pela sua casa: diga o que há em dois cômodos e onde ficam.", ["This is my kitchen. There is a fridge next to the door. There are two chairs. The bedroom is behind the living room."],
          { mode: "respond", check: ["Usei there is e there are.", "Usei duas preposições de lugar.", "Falei pelo menos quatro frases.", "Ouvi o modelo e comparei."], c: ["there-is", "next-between"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: achando o caminho",
      goal: "Pedir e dar informações de localização na rua.",
      exercises: [
        dialog("m1", "Você está em uma cidade nova e precisa de uma farmácia.", [
          { npc: ["Hi! Can I help you?", "Oi! Posso ajudar?"], options: [
            ["Yes, please. Is there a pharmacy near here?", true, "Ela pensa um pouco.", "Pergunta padrão por um lugar."],
            ["Yes, please. Where has a pharmacy?", false, "Ela entende com dificuldade.", "A forma certa é Is there a pharmacy…?"],
          ] },
          { npc: ["Yes, there is one behind the station.", "Sim, tem uma atrás da estação."], options: [
            ["Sorry? Behind the station?", true, "Ela confirma: “Yes, behind the station.”", "Conferir a informação é uma boa estratégia."],
            ["Good night.", false, "Ela estranha.", "Não responde à informação recebida."],
          ] },
          { npc: ["Yes. And there's a supermarket next to it.", "Sim. E tem um supermercado ao lado."], options: [
            ["Great, thank you very much!", true, "Ela responde: “You're welcome!”", "Agradecimento adequado."],
            ["I have a supermarket.", false, "Ela não entende.", "Have indicaria que você possui um supermercado."],
          ] },
        ], "Perguntar por lugares, confirmar e agradecer.", { c: ["near-here", "next-between"] }),
        write("m2", "Escreva as indicações que você recebeu, para não esquecer.", { min: 10, check: ["Citei os dois lugares.", "Usei behind e next to.", "Usei there is ou is."], model: "The pharmacy is behind the station. There is a supermarket next to it.", c: ["next-between", "places"] }),
      ],
      outside: {
        title: "Fora do app: descreva onde você está",
        instructions: "Olhe ao redor e diga em voz alta cinco frases em inglês: três com there is/are e duas dizendo onde algo está. Se tiver alguém por perto, peça que a pessoa esconda um objeto e descreva onde ele está.",
        checklist: ["Disse três frases com there is ou there are.", "Disse duas frases com preposições de lugar.", "Não usei have para existência."],
      },
    }),
  },
});
