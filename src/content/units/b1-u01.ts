/** B1 · Unidade 1 — Contando histórias: passado simples e contínuo. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "b1-u01",

  concepts: [
    concept("past-cont", "pattern", "I was working.", "Eu estava trabalhando.", "l1", ["It was raining all morning.", "Estava chovendo a manhã toda."], { note: "was/were + verbo-ing: ação em andamento no passado." }),
    concept("past-cont-q", "pattern", "What were you doing?", "O que você estava fazendo?", "l1", ["What were you doing at eight?", "O que você estava fazendo às oito?"]),
    concept("when-interrupt", "pattern", "I was cooking when the phone rang.", "Eu estava cozinhando quando o telefone tocou.", "l2", ["She was sleeping when I arrived.", "Ela estava dormindo quando cheguei."], { note: "Contínuo = cenário; simples = o que interrompe." }),
    concept("while", "word", "while", "enquanto", "l2", ["While I was waiting, I read a book.", "Enquanto eu esperava, li um livro."], { note: "While + ação longa (contínuo); when + ação pontual (simples)." }),
    concept("sequencers", "word", "first, then, after that, finally", "primeiro, depois, em seguida, por fim", "l3", ["First we ate, then we went out.", "Primeiro comemos, depois saímos."]),
    concept("suddenly", "word", "suddenly", "de repente", "l3", ["Suddenly, the lights went out.", "De repente, as luzes se apagaram."]),
    concept("set-off", "phrase", "set off", "partir, sair (em viagem)", "l4", ["We set off at six in the morning.", "Partimos às seis da manhã."], { tags: ["phrasal-verb"] }),
    concept("end-up", "phrase", "end up", "acabar (indo, fazendo)", "l4", ["We ended up sleeping in the car.", "Acabamos dormindo no carro."], { note: "end up + verbo-ing ou + lugar.", tags: ["phrasal-verb"] }),
    concept("what-happened", "phrase", "What happened next? / Really?", "E o que aconteceu depois? / Sério?", "l4", ["No way! What happened next?", "Não acredito! E depois?"]),
  ],

  lessons: [
    lesson("l1", {
      title: "O que estava acontecendo",
      objective: "Você vai conseguir descrever o cenário de uma história: o que estava acontecendo em certo momento do passado.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na delegacia", lines: [
        { who: "Policial", en: "What were you doing at nine o'clock last night?", pt: "O que você estava fazendo às nove horas ontem à noite?" },
        { who: "Leo", en: "I was watching a movie at home. My wife was working in the other room.", pt: "Eu estava assistindo a um filme em casa. Minha esposa estava trabalhando no outro cômodo." },
        { who: "Policial", en: "Were the neighbors making noise?", pt: "Os vizinhos estavam fazendo barulho?" },
        { who: "Leo", en: "No, they weren't. It was raining, so everything was quiet.", pt: "Não. Estava chovendo, então estava tudo quieto." },
      ] },
      explanation: {
        summary: "O **passado contínuo** mostra uma ação **em andamento** em um momento do passado: **was / were + verbo-ing**.\n\n- *I **was watching** a movie.*\n- *They **were talking**.*\n\nPergunta: **What were you doing at nine?** Negativa: **wasn't / weren't + -ing**.",
        details: "É o tempo do “cenário” de uma história: o clima, o que as pessoas faziam, o que se ouvia. Verbos de estado (know, want, like) continuam sem -ing: *I knew the answer*, e não “I was knowing”.",
        examples: [
          { en: "At eight I was having dinner.", pt: "Às oito eu estava jantando." },
          { en: "It was raining.", pt: "Estava chovendo." },
          { en: "We weren't sleeping.", pt: "Não estávamos dormindo." },
        ],
        contrasts: [
          { wrong: "I was watch a movie.", right: "I was watching a movie.", why: "Depois de was/were, o verbo precisa do -ing." },
          { wrong: "They was talking.", right: "They were talking.", why: "Com they: were." },
        ],
      },
      guided: [
        mc("e1", "Choose the sentence that describes an action in progress in the past.", ["I was reading at ten.", "I read at ten.", "I am reading at ten."], 0, "Was + -ing: ação em andamento naquele momento.", { c: ["past-cont"], pt: "Escolha a frase que descreve uma ação em andamento no passado." }),
        match("e2", "Match the sentence halves.", [["I was", "watching a movie."], ["They were", "making noise."], ["It wasn't", "raining."], ["What were you", "doing?"]],
          "Was com I/he/she/it; were com you/we/they.", { c: ["past-cont", "past-cont-q"], s: "grammar", pt: "Associe as metades das frases." }),
        cloze("e3", "My wife ___ working in the other room.", ["was"], "My wife = she: was.", { c: ["past-cont"], cue: "(be)" }),
      ],
      independent: [
        cloze("e4", "What ___ you doing at nine?", ["were"], "Com you: were.", { c: ["past-cont-q"], cue: "(be)" }),
        cloze("e5", "It was ___ all morning.", ["raining"], "Was + raining.", { c: ["past-cont"], cue: "(rain)" }),
        order("e6", "Put the words in order: “O que você estava fazendo ontem à noite?”", "What were you doing last night?", "What + were + you + doing.", { c: ["past-cont-q"], extra: ["did"] }),
        dict("e7", "I was watching a movie at home.", "Was + watching.", { c: ["past-cont"] }),
        fix("e8", "We was waiting for the bus.", ["We were waiting for the bus"], "Com we: were.", { c: ["past-cont"], prompt: "Fix the mistake." }),
      ],
      application: [
        type("e9", "Answer about a scene: “Às sete eu estava jantando.” Say it in English.", ["At seven I was having dinner", "I was having dinner at seven", "At seven I was eating dinner", "I was eating dinner at seven"], "I was having dinner at seven.", { c: ["past-cont"] }),
        speak("e10", "Describe what was happening at home at eight o'clock last night.", ["At eight o'clock last night I was cooking dinner. My brother was watching TV. It wasn't raining."],
          { mode: "respond", check: ["Usei was/were + -ing.", "Descrevi pelo menos duas ações em andamento.", "Incluí uma negativa."], c: ["past-cont"] }),
      ],
      summary: { points: ["was / were + verbo-ing = ação em andamento no passado.", "What were you doing…?", "É o tempo do cenário de uma história."], concepts: ["past-cont", "past-cont-q"] },
    }),

    lesson("l2", {
      title: "Quando, de repente…",
      objective: "Você vai conseguir combinar o que estava acontecendo com o que aconteceu, usando when e while.",
      minutes: 9,
      context: { kind: "text", title: "Um susto na cozinha", lines: [
        { en: "I was cooking dinner when the phone rang.", pt: "Eu estava fazendo o jantar quando o telefone tocou." },
        { en: "While I was talking to my mother, I smelled something strange.", pt: "Enquanto eu falava com a minha mãe, senti um cheiro estranho." },
        { en: "The rice was burning! I ran to the kitchen and turned off the stove.", pt: "O arroz estava queimando! Corri para a cozinha e desliguei o fogão." },
      ] },
      explanation: {
        summary: "Numa narrativa, os dois tempos trabalham juntos:\n- **passado contínuo** = ação longa, o cenário: *I **was cooking**…*\n- **passado simples** = o fato que acontece ou interrompe: *…when the phone **rang**.*\n\n**When** costuma vir antes da ação pontual. **While** (enquanto) vem antes da ação longa.",
        details: "Ações em sequência usam só o passado simples: *I ran to the kitchen and turned off the stove.* Duas ações longas ao mesmo tempo usam dois contínuos: *While I was cooking, he was setting the table.*",
        examples: [
          { en: "She was sleeping when I arrived.", pt: "Ela estava dormindo quando cheguei." },
          { en: "While we were walking, it started to rain.", pt: "Enquanto caminhávamos, começou a chover." },
          { en: "I was driving when I saw the accident.", pt: "Eu estava dirigindo quando vi o acidente." },
        ],
        contrasts: [
          { wrong: "I cooked when the phone was ringing.", right: "I was cooking when the phone rang.", why: "A ação longa vai no contínuo; a interrupção, no simples." },
          { wrong: "While I arrived, she was sleeping.", right: "When I arrived, she was sleeping.", why: "Chegar é pontual: when. While pede uma ação longa." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I was driving when I ___ the accident.”", ["saw", "was seeing", "see"], 0, "A ação pontual que interrompe vai no passado simples.", { c: ["when-interrupt"] }),
        match("e2", "Match each part to its role in the story.", [["I was cooking", "cenário (ação longa)"], ["the phone rang", "fato que interrompe"], ["while", "enquanto + ação longa"], ["when", "quando + ação pontual"]],
          "Contínuo para o cenário; simples para o fato.", { c: ["when-interrupt", "while"], s: "grammar", pt: "Associe cada parte ao seu papel na história." }),
        cloze("e3", "___ I was talking to my mother, I smelled something strange.", ["While"], "While + ação longa.", { c: ["while"] }),
      ],
      independent: [
        cloze("e4", "She ___ sleeping when I arrived.", ["was"], "Ação longa: was sleeping.", { c: ["when-interrupt"], cue: "(be)" }),
        cloze("e5", "While we were walking, it ___ to rain.", ["started", "began"], "O fato pontual: started.", { c: ["when-interrupt", "while"], cue: "(start)" }),
        fix("e6", "I was cooking when the phone was ringing.", ["I was cooking when the phone rang"], "A interrupção vai no passado simples: rang.", { c: ["when-interrupt"], prompt: "Fix the tense." }),
        dict("e7", "I was driving when I saw the accident.", "Contínuo + when + simples.", { c: ["when-interrupt"] }),
        order("e8", "Put the words in order: “Enquanto eu esperava, li um livro.”", "While I was waiting, I read a book.", "While + contínuo; depois o simples.", { c: ["while"], extra: ["when"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu estava dormindo quando você ligou.”", ["I was sleeping when you called", "I was asleep when you called"], "I was sleeping when you called.", { c: ["when-interrupt"] }),
        write("e10", "Write three sentences about a moment when something interrupted you.",
          { frame: ["I was …ing when …", "While I was …, …", "Then I …"], min: 18, check: ["Usei o contínuo para a ação longa.", "Usei o simples para a interrupção.", "Usei when ou while corretamente."], model: "I was studying when the lights went out. While I was looking for a candle, my phone rang. Then I sat down and waited.", c: ["when-interrupt", "while"] }),
      ],
      summary: { points: ["Contínuo = cenário; simples = fato.", "when + ação pontual; while + ação longa.", "Ações em sequência: só passado simples."], concepts: ["when-interrupt", "while"] },
    }),

    lesson("l3", {
      title: "Primeiro, depois, de repente",
      objective: "Você vai conseguir organizar uma história em ordem, com palavras que guiam quem ouve.",
      minutes: 8,
      context: { kind: "text", title: "A viagem que deu errado", lines: [
        { en: "First, we missed the bus to the airport.", pt: "Primeiro, perdemos o ônibus para o aeroporto." },
        { en: "Then we took a taxi, but the traffic was terrible.", pt: "Depois pegamos um táxi, mas o trânsito estava horrível." },
        { en: "After that, we ran to the gate. Suddenly, I realized I didn't have my passport.", pt: "Em seguida, corremos até o portão. De repente, percebi que estava sem o passaporte." },
        { en: "Finally, my sister found it in her bag. We were the last people on the plane.", pt: "Por fim, minha irmã o encontrou na bolsa dela. Fomos os últimos a embarcar." },
      ] },
      explanation: {
        summary: "Palavras que organizam uma narrativa:\n- **First** (primeiro)\n- **Then** / **After that** (depois, em seguida)\n- **Suddenly** (de repente): marca a surpresa\n- **Finally** / **In the end** (por fim)",
        details: "No início da frase, costumam ser seguidas de vírgula: *Suddenly, the door opened.* **Then** em geral dispensa a vírgula. Evite repetir “and… and… and”: troque por *then, after that, later*. Para tempo decorrido: *an hour later, the next day*.",
        examples: [
          { en: "First, I called the hotel.", pt: "Primeiro, liguei para o hotel." },
          { en: "Then I waited for an hour.", pt: "Depois esperei por uma hora." },
          { en: "Finally, they answered.", pt: "Por fim, atenderam." },
        ],
        contrasts: [
          { wrong: "After, we went home.", right: "After that, we went home.", why: "Sozinho, o natural é after that (ou then)." },
          { wrong: "In the final, we found it.", right: "In the end, we found it. / Finally, we found it.", why: "“No final” é in the end ou finally." },
        ],
      },
      guided: [
        mc("e1", "Which word introduces a surprise in a story?", ["Suddenly", "First", "Finally"], 0, "Suddenly = de repente.", { c: ["suddenly"], s: "vocabulary" }),
        match("e2", "Match the word to its position in a story.", [["First", "o começo"], ["Then", "o passo seguinte"], ["Suddenly", "a surpresa"], ["Finally", "o desfecho"]],
          "Quatro marcadores dão forma a qualquer narrativa.", { c: ["sequencers", "suddenly"], pt: "Associe a palavra à sua posição na história." }),
        cloze("e3", "___, we missed the bus. Then we took a taxi.", ["First"], "First abre a sequência.", { c: ["sequencers"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "We waited two hours. ___, the plane left.", ["Finally"], "Finally fecha a sequência.", { c: ["sequencers"], s: "vocabulary" }),
        cloze("e5", "I was walking home. ___, I heard a loud noise.", ["Suddenly"], "Suddenly marca a surpresa.", { c: ["suddenly"], s: "vocabulary" }),
        fix("e6", "After, we ran to the gate.", ["After that, we ran to the gate", "Then we ran to the gate"], "After that ou Then.", { c: ["sequencers"], prompt: "Fix the connector." }),
        dict("e7", "First we ate, then we went out.", "Dois marcadores de sequência.", { c: ["sequencers"] }),
      ],
      application: [
        order("e8", "Put the words in order: “De repente, as luzes se apagaram.”", "Suddenly, the lights went out.", "Suddenly no início, com vírgula.", { c: ["suddenly"] }),
        type("e9", "Complete the story with one word: “We looked everywhere. ___, we found the keys in the car.” (por fim)", ["Finally", "In the end", "Eventually"], "Finally ou In the end.", { c: ["sequencers"] }),
        speak("e10", "Tell a short story about a day when something went wrong, using four sequence words.", ["First, I woke up late. Then I missed the bus. Suddenly, it started to rain. Finally, I arrived at work at ten."],
          { mode: "respond", check: ["Usei First e Finally.", "Usei Then ou After that.", "Usei Suddenly para a surpresa.", "Mantive os verbos no passado."], c: ["sequencers", "suddenly"] }),
      ],
      summary: { points: ["First → Then / After that → Finally.", "Suddenly marca a virada da história.", "After that, e não “After,” sozinho."], concepts: ["sequencers", "suddenly"] },
    }),

    lesson("l4", {
      title: "E aí, o que aconteceu?",
      objective: "Você vai conseguir contar uma história com phrasal verbs comuns e reagir à história de outra pessoa.",
      minutes: 9,
      context: { kind: "dialogue", title: "Contando o fim de semana", lines: [
        { who: "Ken", en: "We set off for the beach at six, but the car broke down.", pt: "Partimos para a praia às seis, mas o carro quebrou." },
        { who: "Bia", en: "Really? What happened next?", pt: "Sério? E o que aconteceu depois?" },
        { who: "Ken", en: "We were waiting on the road when a farmer stopped to help.", pt: "Estávamos esperando na estrada quando um agricultor parou para ajudar." },
        { who: "Bia", en: "No way! Did you get to the beach?", pt: "Não acredito! Vocês chegaram à praia?" },
        { who: "Ken", en: "No. We ended up having lunch at his farm. It was the best day of the trip!", pt: "Não. Acabamos almoçando na fazenda dele. Foi o melhor dia da viagem!" },
      ] },
      explanation: {
        summary: "Dois phrasal verbs de narrativa:\n- **set off** = partir, sair em viagem: *We set off at six.*\n- **end up** = acabar (de um jeito não planejado): *We ended up having lunch there.*\n\nE, para ser um bom ouvinte: **Really?**, **No way!**, **What happened next?**, **And then?**",
        details: "**End up** vem seguido de verbo com -ing (*ended up staying*) ou de lugar (*ended up in a small town*). Outros phrasal verbs comuns em histórias: *break down* (quebrar, de carro), *find out* (descobrir), *turn out* (acabar se revelando).",
        examples: [
          { en: "We set off early in the morning.", pt: "Partimos de manhã cedo." },
          { en: "I ended up walking home.", pt: "Acabei voltando a pé para casa." },
          { en: "Really? What happened next?", pt: "Sério? E depois?" },
        ],
        contrasts: [
          { wrong: "We ended up to sleep in the car.", right: "We ended up sleeping in the car.", why: "End up + verbo-ing." },
          { wrong: "We set off to six.", right: "We set off at six.", why: "Horário usa at." },
        ],
        tip: "Em **phrasal verbs**, a força recai sobre a partícula: *set OFF*, *end UP*. Isso ajuda a ouvi-los na fala rápida.",
      },
      guided: [
        mc("e1", "“We ended up staying at home.” What does it mean?", ["Acabamos ficando em casa.", "Terminamos de ficar em casa.", "Paramos de ficar em casa."], 0, "End up = acabar fazendo algo, sem ter planejado.", { c: ["end-up"], s: "vocabulary" }),
        match("e2", "Match the expression to its meaning.", [["set off", "partir"], ["end up", "acabar (fazendo)"], ["What happened next?", "E depois?"], ["No way!", "Não acredito!"]],
          "Dois phrasal verbs e duas reações de ouvinte.", { c: ["set-off", "end-up", "what-happened"], pt: "Associe a expressão ao significado." }),
        cloze("e3", "We set ___ at six in the morning.", ["off"], "Set off = partir.", { c: ["set-off"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "The restaurant was closed, so we ended up ___ pizza at home.", ["eating", "having"], "End up + verbo-ing.", { c: ["end-up"], cue: "(eat)" }),
        order("e5", "Put the words in order: “E o que aconteceu depois?”", "What happened next?", "What + happened + next.", { c: ["what-happened"], extra: ["did"] }),
        fix("e6", "We ended up to walk home.", ["We ended up walking home"], "End up + -ing.", { c: ["end-up"], prompt: "Fix the mistake." }),
        dict("e7", "We set off early, but the car broke down.", "Set off e break down no passado.", { c: ["set-off"] }),
      ],
      application: [
        type("e8", "A friend is telling a story and stops. Ask what happened after that.", ["What happened next", "And what happened next", "What happened then", "And then what happened", "What happened after that"], "What happened next?", { c: ["what-happened"], pt: "Um amigo conta uma história e para. Pergunte o que aconteceu depois." }),
        dialog("e9", "A colleague tells you about a terrible trip.", [
          { npc: ["We set off at five, and the train was two hours late.", "Saímos às cinco, e o trem atrasou duas horas."], options: [
            ["Oh no! What happened next?", true, "Ela continua a história.", "Reação de ouvinte e pergunta."],
            ["OK.", false, "Ela perde o ânimo de contar.", "Mostre interesse com uma reação."],
          ] },
          { npc: ["We missed our flight and ended up sleeping at the airport.", "Perdemos o voo e acabamos dormindo no aeroporto."], options: [
            ["Really? That sounds awful. Did you get a new flight?", true, "Ela ri e conta o final.", "Empatia e nova pergunta."],
            ["You ended up to sleep?", false, "A pergunta soa errada.", "End up + sleeping."],
          ] },
        ], "Ouvir uma história: reagir e pedir a continuação.", { c: ["what-happened", "end-up"] }),
        speak("e10", "Tell a story of a trip or a day out using “set off” and “ended up”.", ["We set off at seven. It was raining, so we couldn't go to the beach. We ended up visiting a small museum."],
          { mode: "respond", check: ["Usei set off no passado.", "Usei ended up + -ing ou lugar.", "A história tem começo, meio e fim."], c: ["set-off", "end-up"] }),
      ],
      summary: { points: ["set off = partir.", "end up + -ing = acabar fazendo.", "Really? No way! What happened next?"], concepts: ["set-off", "end-up", "what-happened"] },
    }),
  ],

  checkpoint: {
    intro: "New stories. Set the scene with the past continuous, tell the events with the past simple, and keep the order clear.",
    a: [
      cloze("q1", "At midnight we ___ still dancing.", ["were"], "We + were + -ing.", { c: ["past-cont"], cue: "(be)" }),
      mc("q2", "Choose: “I ___ a shower when the doorbell rang.”", ["was taking", "took", "take"], 0, "Ação em andamento interrompida.", { c: ["when-interrupt"] }),
      fix("q3", "While I arrived, they were eating.", ["When I arrived, they were eating"], "Ação pontual: when.", { c: ["while", "when-interrupt"], prompt: "Fix the connector." }),
      order("q4", "Put the words in order: “O que você estava fazendo às dez?”", "What were you doing at ten?", "What + were + you + doing.", { c: ["past-cont-q"], extra: ["did"] }),
      dict("q5", "Suddenly, everyone stopped talking.", "Suddenly + passado simples.", { c: ["suddenly"] }),
      type("q6", "Say in English: “Acabamos pegando um táxi.”", ["We ended up taking a taxi", "We ended up getting a taxi"], "End up + -ing.", { c: ["end-up"] }),
      cloze("q7", "First we had lunch. ___ that, we went for a walk.", ["After"], "After that.", { c: ["sequencers"], s: "vocabulary" }),
      listen("q8", "I was walking to work when I saw an old friend. We ended up having coffee.", "What did they do in the end?", ["They had coffee.", "They went to work.", "They walked home."], 0, "We ended up having coffee.", { c: ["end-up", "when-interrupt"] }),
      mc("q9", "“We set off at dawn.” means:", ["Partimos ao amanhecer.", "Chegamos ao amanhecer.", "Dormimos ao amanhecer."], 0, "Set off = partir.", { c: ["set-off"], s: "vocabulary" }),
      dialog("q10", "A friend starts telling you what happened on the bus.", [
        { npc: ["I was reading on the bus when a man sat next to me and started crying.", "Eu estava lendo no ônibus quando um homem sentou ao meu lado e começou a chorar."], options: [
          ["Really? What happened next?", true, "Ela continua.", "Interesse e pedido de continuação."],
          ["I was read too.", false, "Ela fica confusa.", "Não é uma reação à história, e falta o -ing."],
        ] },
        { npc: ["I asked if he was okay. He said he was just very happy.", "Perguntei se ele estava bem. Ele disse que só estava muito feliz."], options: [
          ["No way! Why was he so happy?", true, "Ela conta o final.", "Reação e pergunta no passado."],
          ["No way! Why is he happy tomorrow?", false, "A pergunta não faz sentido no tempo.", "A história está no passado."],
        ] },
      ], "Reagir a uma história e pedir mais.", { c: ["what-happened", "past-cont"] }),
    ],
    b: [
      cloze("q1", "It ___ snowing when we left the house.", ["was"], "It + was + -ing.", { c: ["past-cont"], cue: "(be)" }),
      mc("q2", "Choose: “While she ___, the phone rang three times.”", ["was sleeping", "slept", "sleeps"], 0, "While + ação longa.", { c: ["while"] }),
      fix("q3", "I was fall asleep when the movie started.", ["I was falling asleep when the movie started"], "Was + falling.", { c: ["past-cont"], prompt: "Fix the mistake." }),
      order("q4", "Put the words in order: “Por fim, encontramos o hotel.”", "Finally, we found the hotel.", "Finally + passado simples.", { c: ["sequencers"], extra: ["while"] }),
      dict("q5", "We were having dinner when the lights went out.", "Cenário no contínuo, fato no simples.", { c: ["when-interrupt"] }),
      type("q6", "Say in English: “Partimos às oito.”", ["We set off at eight", "We set off at 8"], "Set off + at + hora.", { c: ["set-off"] }),
      cloze("q7", "I was cooking. ___, I smelled smoke.", ["Suddenly"], "A surpresa: Suddenly.", { c: ["suddenly"], s: "vocabulary" }),
      listen("q8", "First we got lost. Then it started to rain. Finally, a taxi stopped.", "What happened last?", ["A taxi stopped.", "They got lost.", "It started to rain."], 0, "Finally, a taxi stopped.", { c: ["sequencers"] }),
      mc("q9", "Someone says “And then?”. What do they want?", ["A continuação da história", "Que você pare", "Que você repita"], 0, "And then? = e depois?", { c: ["what-happened"] }),
      dialog("q10", "You tell a neighbor why you arrived late.", [
        { npc: ["You're late! What happened?", "Você está atrasado! O que houve?"], options: [
          ["I was driving home when my car broke down.", true, "Ela pergunta o que você fez.", "Cenário no contínuo e fato no simples."],
          ["I drove home when my car was breaking down.", false, "A ordem dos tempos confunde.", "A ação longa é dirigir; quebrar é o fato pontual."],
        ] },
        { npc: ["Oh no. What did you do?", "Ah, não. O que você fez?"], options: [
          ["First I called a mechanic. Then I waited an hour. I ended up walking.", true, "Ela oferece ajuda.", "Sequência clara e end up + -ing."],
          ["I ended up to walk, first.", false, "A frase fica confusa.", "End up + walking; e first vem no início."],
        ] },
      ], "Contar um imprevisto em ordem.", { c: ["when-interrupt", "sequencers", "end-up"] }),
    ],
    production: write("t1", "Tell a true or invented story (about 60 words) about something unexpected that happened to you. Set the scene, tell the events in order and say how it ended.",
      { mode: "free", min: 50, check: ["Descrevi o cenário com o passado contínuo.", "Contei os fatos com o passado simples.", "Usei when ou while.", "Usei pelo menos três marcadores (First, Then, Suddenly, Finally).", "Disse como terminou (ended up, in the end, finally)."],
        model: "Last year I was traveling alone in Minas. It was raining and I was looking for my hotel. Suddenly, my phone died. First, I asked a woman for help. Then she called her son, who was working nearby. He drove me to the hotel. In the end, I ended up having dinner with their family. It was the best night of the trip.", c: ["past-cont", "when-interrupt", "sequencers"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Uma história curta",
      goal: "Ler uma narrativa e distinguir cenário, fatos e ordem dos acontecimentos.",
      context: { kind: "text", title: "The wrong train", lines: [
        { en: "It was a cold morning and I was running to the station. People were pushing to get on the train.", pt: "Era uma manhã fria e eu estava correndo para a estação. As pessoas se empurravam para embarcar." },
        { en: "I got on and sat down. While I was reading the news, I noticed the names of the stations were strange.", pt: "Embarquei e me sentei. Enquanto lia as notícias, percebi que os nomes das estações eram estranhos." },
        { en: "Suddenly, I understood: I was on the wrong train. I got off at the next stop and ended up arriving two hours late.", pt: "De repente, entendi: eu estava no trem errado. Desci na parada seguinte e acabei chegando duas horas atrasado." },
      ] },
      exercises: [
        mc("r1", "What was the writer doing when he noticed the problem?", ["Reading the news", "Running to the station", "Talking to someone"], 0, "While I was reading the news, I noticed…", { c: ["while"], s: "reading" }),
        mc("r2", "What was the problem?", ["He was on the wrong train.", "The train was late.", "He lost his ticket."], 0, "I was on the wrong train.", { c: ["suddenly"], s: "reading" }),
        type("r3", "How did it end? Complete: He ended up ___ two hours late.", ["arriving"], "Ended up arriving two hours late.", { c: ["end-up"], s: "reading" }),
        cloze("r4", "People ___ pushing to get on the train.", ["were"], "People were pushing.", { c: ["past-cont"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "O que aconteceu na festa",
      goal: "Acompanhar uma história falada e sua sequência.",
      context: { kind: "text", title: "Transcrição", lines: [{ who: "Ana", en: "We were dancing when the music stopped. First, everyone laughed. Then the lights went out. Finally, we ended up singing in the dark.", pt: "Estávamos dançando quando a música parou. Primeiro, todo mundo riu. Depois as luzes se apagaram. Por fim, acabamos cantando no escuro." }] },
      exercises: [
        listen("a1", "We were dancing when the music stopped. First, everyone laughed. Then the lights went out. Finally, we ended up singing in the dark.", "What were they doing when the music stopped?", ["Dancing", "Singing", "Eating"], 0, "We were dancing when the music stopped.", { c: ["when-interrupt"] }),
        listen("a2", "We were dancing when the music stopped. First, everyone laughed. Then the lights went out. Finally, we ended up singing in the dark.", "What happened at the end?", ["They sang in the dark.", "They went home.", "The music came back."], 0, "We ended up singing in the dark.", { c: ["end-up", "sequencers"] }),
        dict("a3", "We were dancing when the music stopped.", "Contínuo + when + simples.", { c: ["when-interrupt"], prompt: "Type the first sentence." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meu pequeno conto",
      goal: "Escrever uma narrativa curta e organizada.",
      exercises: [
        write("w1", "Write a short story (about 50 words) that starts with: “It was late and I was walking home when…”",
          { mode: "free", min: 45, check: ["Mantive o cenário no passado contínuo.", "Contei os fatos no passado simples.", "Usei pelo menos três marcadores de sequência.", "A história tem um final."], model: "It was late and I was walking home when I heard a small sound. First, I looked around, but the street was empty. Then I saw a kitten under a car. It was crying. I picked it up and, in the end, I ended up taking it home. Now it sleeps on my bed.", c: ["when-interrupt", "sequencers"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Conte uma história",
      goal: "Contar uma história de cerca de 40 segundos em voz alta.",
      exercises: [
        speak("s1", "Tell a story about a trip, a party or a problem. Set the scene, give the events in order and finish with how it ended.", ["Last month I was driving to my parents' house. It was raining a lot. Suddenly, I saw a dog on the road. I stopped the car. Then I called a friend. We ended up finding the owner."],
          { mode: "respond", check: ["Descrevi o cenário com was/were + -ing.", "Usei o passado simples para os fatos.", "Usei marcadores de sequência.", "Dei um final à história.", "Ouvi o modelo e comparei."], c: ["past-cont", "sequencers", "end-up"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: relatando um incidente",
      goal: "Relatar com clareza o que aconteceu, respondendo a perguntas.",
      exercises: [
        dialog("m1", "You saw a small accident and a police officer asks you questions.", [
          { npc: ["What were you doing when it happened?", "O que você estava fazendo quando aconteceu?"], options: [
            ["I was waiting for the bus across the street.", true, "O policial anota.", "Cenário no passado contínuo."],
            ["I waited the bus.", false, "Ele não sabe se você viu o momento.", "Ação em andamento: I was waiting for."],
          ] },
          { npc: ["And what did you see?", "E o que você viu?"], options: [
            ["A car was turning left when a motorbike hit it.", true, "Ele pede mais detalhes.", "Contínuo para a ação longa, simples para o impacto."],
            ["A car turned when a motorbike was hitting.", false, "A ordem fica confusa.", "A batida é o fato pontual."],
          ] },
          { npc: ["What happened next?", "E o que aconteceu depois?"], options: [
            ["First, both drivers got out. Then someone called an ambulance. Nobody was hurt in the end.", true, "Ele agradece o relato.", "Sequência clara com marcadores."],
            ["After, drivers get out, and call.", false, "Os tempos e conectores estão errados.", "After that; verbos no passado."],
          ] },
        ], "Relatar: cenário, fato e sequência.", { c: ["past-cont", "when-interrupt", "sequencers"] }),
        write("m2", "Write your short written statement for the report.", { min: 25, check: ["Disse onde eu estava e o que fazia.", "Descrevi o que aconteceu, em ordem.", "Usei verbos no passado."], model: "I was waiting for the bus when I saw the accident. A car was turning left and a motorbike hit it. Then both drivers got out. Nobody was hurt.", c: ["when-interrupt", "sequencers"] }),
      ],
      outside: {
        title: "Fora do app: conte uma história real",
        instructions: "Escolha algo inesperado que aconteceu com você e conte em inglês, em voz alta, em cerca de um minuto. Grave no celular se puder. Depois ouça e verifique: há cenário (was/were + -ing), fatos (passado simples) e pelo menos três marcadores de sequência?",
        checklist: ["Contei uma história de cerca de um minuto.", "Usei o passado contínuo para o cenário.", "Usei três marcadores de sequência.", "Ouvi a gravação ou repeti a história uma segunda vez."],
      },
    }),
  },
});
