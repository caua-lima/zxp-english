/** B1 · Unidade 8 — Conversas mais longas: manter o assunto, parafrasear e resolver mal-entendidos. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Hi Rafa! It was great talking to you on Saturday. By the way, I think there was a misunderstanding: I didn't mean that your idea was bad. What I meant was that we need more time. Anyway, the trip sounds amazing. Let's keep in touch, and let me know the dates.";

export default defineUnit({
  id: "b1-u08",

  concepts: [
    concept("sounds", "phrase", "That sounds + adjective", "Parece … / Que …", "l1", ["That sounds amazing!", "Parece incrível!"], { note: "Reação ao que a pessoa contou. sounds + adjetivo, sem like." }),
    concept("how-come", "phrase", "How come?", "Como assim? Por quê?", "l1", ["How come you moved?", "Por que você se mudou?"], { note: "Informal. Depois de how come, a ordem é de afirmação: how come you moved." }),
    concept("by-the-way", "phrase", "By the way, …", "A propósito, …", "l1", ["By the way, how is your sister?", "A propósito, como está sua irmã?"], { note: "Introduz um assunto novo." }),
    concept("kind-of", "phrase", "It's a kind of …", "É um tipo de …", "l2", ["It's a kind of bread with cheese.", "É um tipo de pão com queijo."], { note: "Serve para explicar algo cujo nome você não sabe." }),
    concept("use-to-explain", "phrase", "It's something you use to …", "É uma coisa que se usa para …", "l2", ["It's something you use to open bottles.", "É uma coisa que se usa para abrir garrafas."], { note: "use to + verbo, ou use for + verbo-ing." }),
    concept("i-mean", "phrase", "What I mean is … / I mean, …", "O que eu quero dizer é … / Quer dizer, …", "l2", ["What I mean is that we need more time.", "O que eu quero dizer é que precisamos de mais tempo."]),
    concept("didnt-catch", "phrase", "Sorry, I didn't catch that.", "Desculpe, não entendi (não ouvi direito).", "l3", ["Sorry, I didn't catch your name.", "Desculpe, não entendi seu nome."], { tags: ["chunk"] }),
    concept("do-you-mean", "phrase", "Do you mean …? / So you're saying …", "Você quer dizer …? / Então você está dizendo …", "l3", ["Do you mean this Friday or next Friday?", "Você quer dizer esta sexta ou a próxima?"]),
    concept("anyway", "word", "Anyway, …", "Enfim, … / De qualquer forma, …", "l4", ["Anyway, I should get going.", "Enfim, preciso ir."], { note: "Volta ao assunto principal ou encerra a conversa." }),
    concept("keep-in-touch", "phrase", "Let's keep in touch.", "Vamos manter contato.", "l4", ["It was nice talking to you. Let's keep in touch.", "Foi bom falar com você. Vamos manter contato."], { tags: ["chunk"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Mantendo a conversa viva",
      objective: "Você vai conseguir reagir, fazer perguntas de continuação e mudar de assunto.",
      minutes: 9,
      context: { kind: "dialogue", title: "Reencontro em um café", lines: [
        { who: "Lia", en: "I moved to Curitiba last year.", pt: "Eu me mudei para Curitiba no ano passado." },
        { who: "Beto", en: "Really? How come?", pt: "Sério? Por quê?" },
        { who: "Lia", en: "I got a job at a design studio.", pt: "Consegui um emprego em um estúdio de design." },
        { who: "Beto", en: "That sounds great! What's it like?", pt: "Que ótimo! Como é?" },
        { who: "Lia", en: "Busy, but fun. By the way, are you still playing in the band?", pt: "Corrido, mas divertido. A propósito, você ainda toca na banda?" },
      ] },
      explanation: {
        summary: "Uma conversa longa precisa de três movimentos:\n- **Reagir:** *Really? That sounds great / awful / interesting.*\n- **Aprofundar:** *How come? What's it like? What happened next?*\n- **Mudar de assunto:** *By the way, …*",
        details: "Depois de **sounds** vem um adjetivo: *That sounds fun.* Com substantivo, use *sounds like*: *That sounds like a good plan.* **How come** é informal e não inverte: *How come you left?* (compare: *Why did you leave?*).",
        examples: [
          { en: "That sounds terrible. Are you OK?", pt: "Que horror. Você está bem?" },
          { en: "How come you didn't call?", pt: "Por que você não ligou?" },
          { en: "By the way, did you get my message?", pt: "A propósito, você recebeu minha mensagem?" },
        ],
        contrasts: [
          { wrong: "That sounds like great.", right: "That sounds great.", why: "Com adjetivo, sem like." },
          { wrong: "How come did you move?", right: "How come you moved?", why: "How come não usa did nem inversão." },
        ],
      },
      guided: [
        mc("e1", "A friend says: “I passed my driving test!” Choose a natural reaction.", ["That sounds great! Congratulations!", "By the way, congratulations.", "How come great?"], 0, "Reação: That sounds + adjetivo.", { c: ["sounds"], s: "interaction" }),
        match("e2", "Match the phrase to what it does.", [["Really?", "mostrar surpresa"], ["How come?", "perguntar o motivo"], ["What's it like?", "pedir uma descrição"], ["By the way,", "mudar de assunto"]],
          "Cada expressão move a conversa de um jeito.", { c: ["how-come", "by-the-way"], pt: "Associe a expressão à função." }),
        cloze("e3", "That ___ amazing! Tell me more.", ["sounds"], "That sounds + adjetivo.", { c: ["sounds"] }),
      ],
      independent: [
        cloze("e4", "By the ___, are you still playing in the band?", ["way"], "By the way.", { c: ["by-the-way"] }),
        fix("e5", "How come did you change jobs?", ["How come you changed jobs"], "How come + ordem de afirmação.", { c: ["how-come"], prompt: "Fix the question." }),
        fix("e6", "That sounds like interesting.", ["That sounds interesting"], "Com adjetivo, sem like.", { c: ["sounds"], prompt: "Fix the mistake." }),
        dict("e7", "By the way, how is your sister?", "By the way introduz um assunto novo.", { c: ["by-the-way"] }),
        order("e8", "Put the words in order: “Por que você não ligou?”", "How come you didn't call?", "How come + sujeito + verbo.", { c: ["how-come"], extra: ["did"] }),
      ],
      application: [
        type("e9", "A friend says: “My flight was cancelled and I slept at the airport.” React with “terrible”.", ["That sounds terrible"], "That sounds terrible.", { c: ["sounds"], pt: "Reaja usando “terrible”." }),
        dialog("e10", "You meet an old classmate on the street.", [
          { npc: ["I just came back from six months in Canada.", "Acabei de voltar de seis meses no Canadá."], options: [
            ["Really? That sounds amazing! What was it like?", true, "Ele se anima e conta mais.", "Reage e pede detalhes."],
            ["OK.", false, "A conversa morre.", "Sem reação nem pergunta, a conversa não anda."],
          ] },
          { npc: ["Cold, but beautiful. I worked at a ski resort.", "Frio, mas lindo. Trabalhei em uma estação de esqui."], options: [
            ["How come you chose Canada?", true, "Ele explica que tem um primo lá.", "How come + ordem de afirmação."],
            ["How come did you chose Canada?", false, "Ele entende, mas a pergunta está errada.", "Sem did depois de how come."],
          ] },
        ], "Manter a conversa: reagir e aprofundar.", { c: ["sounds", "how-come"] }),
      ],
      summary: { points: ["That sounds + adjetivo.", "How come + ordem de afirmação.", "By the way muda de assunto."], concepts: ["sounds", "how-come", "by-the-way"] },
    }),

    lesson("l2", {
      title: "Quando falta a palavra",
      objective: "Você vai conseguir explicar o que quer dizer mesmo sem saber a palavra exata.",
      minutes: 10,
      context: { kind: "dialogue", title: "Em uma loja de utilidades", lines: [
        { who: "Cliente", en: "I'm looking for a… sorry, I don't know the word in English.", pt: "Estou procurando um… desculpe, não sei a palavra em inglês." },
        { who: "Atendente", en: "No problem. What is it like?", pt: "Sem problema. Como é?" },
        { who: "Cliente", en: "It's a kind of tool. It's something you use to open bottles of wine.", pt: "É um tipo de ferramenta. É uma coisa que se usa para abrir garrafas de vinho." },
        { who: "Atendente", en: "Oh, a corkscrew!", pt: "Ah, um saca-rolhas!" },
        { who: "Cliente", en: "Yes! I mean, a simple one. Nothing expensive.", pt: "Isso! Quer dizer, um simples. Nada caro." },
      ] },
      explanation: {
        summary: "Não saber uma palavra não precisa travar a conversa. **Parafraseie**:\n- **It's a kind of** + categoria: *It's a kind of fruit.*\n- **It's something you use to** + verbo: *…to cut paper.*\n- **It's the place where** … / **the person who** …\n\nPara se explicar melhor: **I mean, …** ou **What I mean is …**",
        details: "Parafrasear é uma estratégia de falantes fluentes, não um sinal de fraqueza. Você também pode usar *It's like…* (é como…) e *It's the opposite of…* (é o oposto de…). Outra forma: *use for + -ing* → *It's used for opening bottles.*",
        examples: [
          { en: "It's a kind of soup with beans.", pt: "É um tipo de sopa com feijão." },
          { en: "It's something you use to dry your hair.", pt: "É uma coisa que se usa para secar o cabelo." },
          { en: "What I mean is that it's too early.", pt: "O que eu quero dizer é que é cedo demais." },
        ],
        contrasts: [
          { wrong: "It's a kind bread.", right: "It's a kind of bread.", why: "Kind of + substantivo." },
          { wrong: "It's something you use for open bottles.", right: "It's something you use to open bottles.", why: "Use to + verbo, ou use for + -ing." },
        ],
      },
      guided: [
        mc("e1", "You forgot the word “umbrella”. What can you say?", ["It's something you use when it rains.", "It's rain.", "I don't know, sorry, bye."], 0, "Parafraseie em vez de desistir.", { c: ["use-to-explain"], s: "interaction" }),
        match("e2", "Match the description to the object.", [["It's something you use to cut paper.", "scissors"], ["It's a kind of big spoon for soup.", "ladle"], ["It's the place where you wash clothes.", "laundry room"], ["It's something you use to dry your hair.", "hair dryer"]],
          "Descrever a função resolve a falta da palavra.", { c: ["use-to-explain", "kind-of"], s: "vocabulary", pt: "Associe a descrição ao objeto." }),
        cloze("e3", "It's a kind ___ tool.", ["of"], "A kind of + substantivo.", { c: ["kind-of"] }),
      ],
      independent: [
        cloze("e4", "It's something you use ___ open bottles.", ["to"], "Use to + verbo.", { c: ["use-to-explain"] }),
        cloze("e5", "What I ___ is that we need more time.", ["mean"], "What I mean is…", { c: ["i-mean"] }),
        fix("e6", "It's a kind bread with cheese inside.", ["It's a kind of bread with cheese inside"], "A kind of + substantivo.", { c: ["kind-of"], prompt: "Fix the mistake." }),
        dict("e7", "It's something you use to cut paper.", "Paráfrase pela função.", { c: ["use-to-explain"] }),
        order("e8", "Put the words in order: “O que eu quero dizer é que é cedo demais.”", "What I mean is that it's too early.", "What I mean is that + frase.", { c: ["i-mean"] }),
      ],
      application: [
        type("e9", "Explain “pao de queijo” to a foreigner. Start with: It's a kind of…", ["It's a kind of bread with cheese", "It's a kind of cheese bread", "It's a kind of bread made with cheese", "It's a kind of small bread with cheese"], "It's a kind of bread with cheese.", { c: ["kind-of"] }),
        fix("e10", "I mean is that the price is too high.", ["What I mean is that the price is too high", "I mean, the price is too high", "I mean that the price is too high"], "What I mean is that… ou I mean, …", { c: ["i-mean"], prompt: "Fix the sentence." }),
        speak("e11", "Explain three things without saying their names: a fridge, a pharmacy and a dentist.", ["It's something you use to keep food cold. It's the place where you buy medicine. It's the person who takes care of your teeth."],
          { mode: "respond", check: ["Usei It's something you use to.", "Usei the place where ou the person who.", "Não disse o nome dos três itens."], c: ["use-to-explain", "kind-of"] }),
      ],
      summary: { points: ["It's a kind of…", "It's something you use to + verbo.", "What I mean is… para se explicar melhor."], concepts: ["kind-of", "use-to-explain", "i-mean"] },
    }),

    lesson("l3", {
      title: "Acho que houve um mal-entendido",
      objective: "Você vai conseguir pedir repetição, checar se entendeu e desfazer um mal-entendido.",
      minutes: 10,
      context: { kind: "dialogue", title: "Marcando uma reunião por telefone", lines: [
        { who: "Kate", en: "Can we meet next Friday at fifteen past?", pt: "Podemos nos reunir na próxima sexta, e quinze?" },
        { who: "Davi", en: "Sorry, I didn't catch that. Could you say it again?", pt: "Desculpe, não entendi. Pode repetir?" },
        { who: "Kate", en: "Next Friday, at a quarter past two.", pt: "Na próxima sexta, às duas e quinze." },
        { who: "Davi", en: "Do you mean this Friday, the 12th?", pt: "Você quer dizer esta sexta, dia 12?" },
        { who: "Kate", en: "No, that's not what I meant. I meant the 19th.", pt: "Não, não foi isso que eu quis dizer. Eu quis dizer dia 19." },
        { who: "Davi", en: "So you're saying the 19th at 2:15. Got it.", pt: "Então você está dizendo dia 19, às 14h15. Entendi." },
      ] },
      explanation: {
        summary: "Quando você **não ouviu**:\n- **Sorry, I didn't catch that.**\n- **Could you say that again?**\n\nPara **checar** se entendeu:\n- **Do you mean** …?\n- **So you're saying** …\n\nPara **corrigir** um mal-entendido:\n- **That's not what I meant. I meant** …",
        details: "Checar o entendimento repetindo com suas palavras é a técnica mais segura em datas, horários, valores e nomes. *I don't understand* é correto, mas *I didn't catch that* indica que o problema foi ouvir, e soa mais natural. Para pedir que falem mais devagar: *Could you speak more slowly, please?*",
        examples: [
          { en: "Sorry, I didn't catch your name.", pt: "Desculpe, não entendi seu nome." },
          { en: "Do you mean the red one?", pt: "Você quer dizer o vermelho?" },
          { en: "I think there was a misunderstanding.", pt: "Acho que houve um mal-entendido." },
        ],
        contrasts: [
          { wrong: "Sorry, I didn't catched that.", right: "Sorry, I didn't catch that.", why: "Depois de didn't: verbo base." },
          { wrong: "What do you want to say?", right: "What do you mean?", why: "“Querer dizer” é mean." },
        ],
      },
      guided: [
        mc("e1", "You didn't hear the price. What do you say?", ["Sorry, I didn't catch that.", "That's not what I meant.", "By the way, how much?"], 0, "Não ouvi: I didn't catch that.", { c: ["didnt-catch"], s: "interaction" }),
        match("e2", "Match the phrase to the situation.", [["I didn't catch that.", "você não ouviu direito"], ["Do you mean…?", "você quer confirmar"], ["That's not what I meant.", "a pessoa entendeu errado"], ["Could you speak more slowly?", "a pessoa fala rápido demais"]],
          "Cada problema de comunicação tem sua frase.", { c: ["didnt-catch", "do-you-mean"], pt: "Associe a frase à situação." }),
        cloze("e3", "Do you ___ this Friday or next Friday?", ["mean"], "Do you mean…?", { c: ["do-you-mean"] }),
      ],
      independent: [
        cloze("e4", "Sorry, I didn't ___ that. Could you say it again?", ["catch", "get"], "I didn't catch that.", { c: ["didnt-catch"] }),
        fix("e5", "Sorry, I didn't catched your name.", ["Sorry, I didn't catch your name"], "Depois de didn't, o verbo fica na base.", { c: ["didnt-catch"], prompt: "Fix the mistake." }),
        cloze("e6", "So you're ___ that the meeting is on the 19th.", ["saying"], "So you're saying…", { c: ["do-you-mean"] }),
        dict("e7", "Do you mean this Friday or next Friday?", "Checando o entendimento.", { c: ["do-you-mean"] }),
        type("e8", "Ask in English: “O que você quer dizer?”", ["What do you mean"], "What do you mean?", { c: ["do-you-mean"], t: [["What do you want to say", "Em inglês, “querer dizer” é mean: What do you mean?"]] }),
      ],
      application: [
        type("e9", "Someone speaks too fast. Ask politely with “could”.", ["Could you speak more slowly, please", "Could you speak more slowly", "Could you speak slower, please", "Could you speak slower", "Could you please speak more slowly"], "Could you speak more slowly, please?", { c: ["didnt-catch"], pt: "A pessoa fala rápido demais. Peça com educação usando “could”." }),
        dialog("e10", "You are booking a table by phone.", [
          { npc: ["We have a table at seven thirty or at eight fifteen.", "Temos uma mesa às sete e meia ou às oito e quinze."], options: [
            ["Sorry, I didn't catch the second time. Could you say it again?", true, "A atendente repete devagar.", "Pede a repetição do trecho exato."],
            ["What?", false, "Soa rude.", "Use Sorry, I didn't catch that."],
          ] },
          { npc: ["Eight fifteen. A quarter past eight.", "Oito e quinze."], options: [
            ["So you're saying 8:15 tonight. Do you mean inside or outside?", true, "Ela confirma: “Inside.”", "Confirma e pergunta o que falta."],
            ["You want to say 8:15?", false, "Ela entende, mas não é natural.", "Do you mean…? / So you're saying…"],
          ] },
        ], "Reserva por telefone: pedir repetição e confirmar.", { c: ["didnt-catch", "do-you-mean"] }),
      ],
      summary: { points: ["Sorry, I didn't catch that.", "Do you mean…? / So you're saying…", "That's not what I meant. I meant…"], concepts: ["didnt-catch", "do-you-mean"] },
    }),

    lesson("l4", {
      title: "Enfim… encerrando bem",
      objective: "Você vai conseguir voltar ao assunto, encerrar uma conversa com educação e combinar o próximo contato.",
      minutes: 9,
      context: { kind: "dialogue", title: "Fim de uma longa conversa", lines: [
        { who: "Marc", en: "…and that's how I lost my luggage twice.", pt: "…e foi assim que perdi minha bagagem duas vezes." },
        { who: "Sara", en: "Unbelievable! Anyway, about the project: can you send me the file?", pt: "Inacreditável! Enfim, sobre o projeto: você pode me mandar o arquivo?" },
        { who: "Marc", en: "Sure. I'll send it tonight.", pt: "Claro. Mando hoje à noite." },
        { who: "Sara", en: "Great. Anyway, I should get going. It was nice talking to you.", pt: "Ótimo. Enfim, preciso ir. Foi bom falar com você." },
        { who: "Marc", en: "You too. Let's keep in touch!", pt: "Igualmente. Vamos manter contato!" },
      ] },
      explanation: {
        summary: "**Anyway,** tem dois usos:\n- voltar ao assunto principal: *Anyway, about the project…*\n- sinalizar o fim: *Anyway, I should get going.*\n\nPara **encerrar**:\n- **I should get going.** / **I have to run.**\n- **It was nice talking to you.**\n- **Let's keep in touch.** / **Talk to you soon.**",
        details: "Em inglês, encerrar de repente soa frio. O normal é uma sequência: sinal (*Anyway…*), motivo (*I should get going*), elogio (*It was nice talking to you*) e próximo passo (*Let's keep in touch* / *I'll text you*). Use *It was nice meeting you* só no primeiro encontro.",
        examples: [
          { en: "Anyway, what were you saying?", pt: "Enfim, o que você estava dizendo?" },
          { en: "I have to run. Talk to you soon!", pt: "Tenho que correr. Até breve!" },
          { en: "Let's keep in touch.", pt: "Vamos manter contato." },
        ],
        contrasts: [
          { wrong: "It was nice talk to you.", right: "It was nice talking to you.", why: "Nice + verbo-ing." },
          { wrong: "Let's keep the contact.", right: "Let's keep in touch.", why: "A expressão fixa é keep in touch." },
        ],
      },
      guided: [
        mc("e1", "You want to end a conversation politely. Choose:", ["Anyway, I should get going. It was nice talking to you.", "By the way, goodbye.", "I mean, stop talking."], 0, "Sinal + motivo + elogio.", { c: ["anyway"], s: "interaction" }),
        match("e2", "Match the closing phrase to its meaning.", [["I should get going.", "preciso ir"], ["Let's keep in touch.", "vamos manter contato"], ["Talk to you soon.", "até breve"], ["It was nice talking to you.", "foi bom falar com você"]],
          "Frases para fechar a conversa.", { c: ["keep-in-touch", "anyway"], pt: "Associe a frase ao significado." }),
        cloze("e3", "Let's keep in ___!", ["touch", "contact"], "Keep in touch.", { c: ["keep-in-touch"] }),
      ],
      independent: [
        cloze("e4", "___, about the project: can you send me the file?", ["Anyway", "Anyhow"], "Anyway volta ao assunto.", { c: ["anyway"] }),
        fix("e5", "It was nice talk to you.", ["It was nice talking to you"], "Nice + verbo-ing.", { c: ["keep-in-touch"], prompt: "Fix the mistake." }),
        order("e6", "Put the words in order: “Enfim, preciso ir.”", "Anyway, I should get going.", "Anyway + I should get going.", { c: ["anyway"] }),
        dict("e7", "It was nice talking to you. Let's keep in touch.", "Encerramento educado.", { c: ["keep-in-touch"] }),
      ],
      application: [
        type("e8", "Say in English: “Vamos manter contato.”", ["Let's keep in touch", "Let us keep in touch"], "Let's keep in touch.", { c: ["keep-in-touch"] }),
        type("e9", "Return to the main topic. Say: “Enfim, o que você estava dizendo?”", ["Anyway, what were you saying", "Anyway what were you saying"], "Anyway, what were you saying?", { c: ["anyway"] }),
        write("e10", "Write the end of a conversation with a friend (four short lines): return to a topic, say you need to go, say something nice and plan the next contact.",
          { mode: "guided", frame: ["Anyway, …", "I should …", "It was …", "Let's … / I'll …"], min: 22, check: ["Usei Anyway.", "Dei um motivo para sair.", "Usei It was nice talking to you.", "Combinei o próximo contato."], model: "Anyway, send me the photos when you can. I should get going because my bus leaves in ten minutes. It was really nice talking to you. Let's keep in touch, and I'll text you on Sunday.", c: ["anyway", "keep-in-touch"] }),
      ],
      summary: { points: ["Anyway volta ao assunto ou sinaliza o fim.", "I should get going. It was nice talking to you.", "Let's keep in touch."], concepts: ["anyway", "keep-in-touch"] },
    }),
  ],

  checkpoint: {
    intro: "New, longer conversations. Keep them going, explain yourself when a word is missing and solve misunderstandings.",
    a: [
      mc("q1", "A colleague says: “I'm going to run a marathon next month.” Choose the best reaction.", ["That sounds hard! How long have you been training?", "Anyway, goodbye.", "I didn't catch that marathon."], 0, "Reagir e aprofundar.", { c: ["sounds"], s: "interaction" }),
      fix("q2", "How come did she leave the party early?", ["How come she left the party early"], "How come + ordem de afirmação.", { c: ["how-come"], prompt: "Fix the question." }),
      cloze("q3", "It's a ___ of jacket for the rain.", ["kind", "type", "sort"], "A kind of + substantivo.", { c: ["kind-of"] }),
      type("q4", "You forgot the word “key”. Complete: It's something you use ___ open a door.", ["to"], "Use to + verbo.", { c: ["use-to-explain"] }),
      dict("q5", "Sorry, I didn't catch the address.", "Não ouvi: I didn't catch…", { c: ["didnt-catch"] }),
      order("q6", "Put the words in order: “Você quer dizer o azul?”", "Do you mean the blue one?", "Do you mean…?", { c: ["do-you-mean"], extra: ["say"] }),
      cloze("q7", "___ the way, did you talk to the landlord?", ["By"], "By the way.", { c: ["by-the-way"] }),
      cloze("q8", "That's not what I meant. What I ___ is that the plan needs more detail.", ["mean"], "What I mean is…", { c: ["i-mean"] }),
      listen("q9", "Anyway, I have to run. It was nice talking to you. Let's keep in touch.", "What is the speaker doing?", ["Ending the conversation", "Starting a new topic", "Asking for repetition"], 0, "Anyway, I have to run: encerramento.", { c: ["anyway", "keep-in-touch"] }),
      dialog("q10", "A hotel receptionist gives you instructions very fast.", [
        { npc: ["Breakfast is on the mezzanine from six thirty to ten.", "O café da manhã é no mezanino, das seis e meia às dez."], options: [
          ["Sorry, I didn't catch that. Where is breakfast?", true, "Ela repete: “On the mezzanine.”", "Pede a repetição do ponto exato."],
          ["I don't catched. Repeat.", false, "Soa rude e está errado.", "I didn't catch that. Could you…?"],
        ] },
        { npc: ["On the mezzanine.", "No mezanino."], options: [
          ["Do you mean the floor between the lobby and the first floor?", true, "Ela confirma: “Exactly.”", "Confirma parafraseando."],
          ["What do you want to say with mezzanine?", false, "Ela entende, mas não é natural.", "What do you mean by…? / Do you mean…?"],
        ] },
      ], "Entender instruções: pedir repetição e confirmar com paráfrase.", { c: ["didnt-catch", "do-you-mean"] }),
    ],
    b: [
      mc("q1", "A friend says: “My car broke down on the highway last night.” Choose the best reaction.", ["That sounds awful! What happened next?", "By the way, nice car.", "Let's keep in touch."], 0, "Reagir e aprofundar.", { c: ["sounds"], s: "interaction" }),
      order("q2", "Put the words in order: “Por que você está tão cansado?”", "How come you're so tired?", "How come + sujeito + verbo.", { c: ["how-come"], extra: ["are"] }),
      fix("q3", "It's a kind fruit from the north of Brazil.", ["It's a kind of fruit from the north of Brazil"], "A kind of + substantivo.", { c: ["kind-of"], prompt: "Fix the mistake." }),
      cloze("q4", "It's something you ___ to carry water on a hike.", ["use"], "Something you use to + verbo.", { c: ["use-to-explain"] }),
      type("q5", "You didn't hear the phone number. Say: “Desculpe, não entendi o número.”", ["Sorry, I didn't catch the number", "Sorry, I didn't get the number", "Sorry, I did not catch the number", "I'm sorry, I didn't catch the number"], "Sorry, I didn't catch the number.", { c: ["didnt-catch"] }),
      cloze("q6", "So you're ___ that I need a new password?", ["saying"], "So you're saying…", { c: ["do-you-mean"] }),
      dict("q7", "By the way, did you get my email?", "By the way introduz um assunto novo.", { c: ["by-the-way"] }),
      mc("q8", "Choose: “No, that's not right. ___ is that we should wait.”", ["What I mean", "What I say", "How I mean"], 0, "What I mean is that…", { c: ["i-mean"] }),
      listen("q9", "That's a long story! Anyway, back to the budget: we still need two thousand dollars.", "What does the speaker do with “anyway”?", ["Returns to the main topic", "Says goodbye", "Asks a question"], 0, "Anyway, back to the budget.", { c: ["anyway"] }),
      dialog("q10", "A coworker understood your message the wrong way.", [
        { npc: ["So you think my report is bad?", "Então você acha que meu relatório está ruim?"], options: [
          ["No, that's not what I meant. What I mean is that it needs one more example.", true, "Ele relaxa.", "Desfaz o mal-entendido e reformula."],
          ["No. You don't understand me.", false, "O clima piora.", "Culpar o outro não ajuda; reformule."],
        ] },
        { npc: ["Oh, OK. I see.", "Ah, certo. Entendi."], options: [
          ["Great. Anyway, I have to run. It was nice talking to you.", true, "Ele agradece o retorno.", "Encerramento educado."],
          ["Great. It was nice talk. Keep the contact.", false, "Soa estranho.", "Nice talking to you; keep in touch."],
        ] },
      ], "Desfazer um mal-entendido e encerrar bem.", { c: ["i-mean", "anyway", "keep-in-touch"] }),
    ],
    production: speak("t1", "Record yourself for about a minute: tell a friend about something that happened to you this month. Start with a greeting, tell the story, explain one thing whose name you don't know in English, and end the conversation politely.",
      ["Hi! By the way, something funny happened last week. I went to a store to buy a tool. I didn't know the word, so I said it's something you use to fix a bike. Anyway, I should get going. It was nice talking to you."],
      { mode: "respond", check: ["Mudei de assunto ou introduzi o tema com By the way.", "Contei a história em sequência.", "Parafraseei com It's a kind of ou It's something you use to.", "Encerrei com Anyway e It was nice talking to you.", "Falei por cerca de um minuto."], c: ["by-the-way", "use-to-explain", "anyway", "keep-in-touch"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Mensagem depois de uma conversa",
      goal: "Ler uma mensagem que desfaz um mal-entendido e identificar a intenção de cada parte.",
      context: { kind: "message", title: "Message from Julia", lines: [
        { en: "Hi Rafa! It was great talking to you on Saturday.", pt: "Oi, Rafa! Foi ótimo falar com você no sábado." },
        { en: "By the way, I think there was a misunderstanding: I didn't mean that your idea was bad. What I meant was that we need more time.", pt: "A propósito, acho que houve um mal-entendido: eu não quis dizer que sua ideia era ruim. O que eu quis dizer foi que precisamos de mais tempo." },
        { en: "Anyway, the trip sounds amazing. Let's keep in touch, and let me know the dates.", pt: "Enfim, a viagem parece incrível. Vamos manter contato, e me avise das datas." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "Why is Julia writing?", ["To clear up a misunderstanding", "To cancel the trip", "To criticize Rafa's idea"], 0, "I think there was a misunderstanding.", { c: ["i-mean"] }),
        rd("r2", PASSAGE, "What did Julia really mean on Saturday?", ["They need more time.", "The idea was bad.", "The trip is too expensive."], 0, "What I meant was that we need more time.", { c: ["i-mean"] }),
        rd("r3", PASSAGE, "How does Julia feel about the trip?", ["Excited", "Worried", "Not interested"], 0, "The trip sounds amazing.", { c: ["sounds"] }),
        cloze("r4", "Let's keep in ___, and let me know the dates.", ["touch", "contact"], "Keep in touch.", { c: ["keep-in-touch"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Conversa com ruído",
      goal: "Acompanhar uma conversa em que alguém pede repetição e confirma a informação.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "The train leaves from platform nine. Sorry, I didn't catch that. Do you mean platform five? No, nine. It's the one next to the cafe. Got it, thanks. By the way, is there a restroom there?", pt: "O trem sai da plataforma nove. Desculpe, não entendi. Você quer dizer plataforma cinco? Não, nove. É a que fica ao lado do café. Entendi, obrigado. A propósito, tem banheiro lá?" }] },
      exercises: [
        listen("a1", ["The train leaves from platform nine.", "Sorry, I didn't catch that. Do you mean platform five?", "No, nine. It's the one next to the cafe."], "Which platform is correct?", ["Nine", "Five", "Nineteen"], 0, "A correção vem em seguida: No, nine.", { c: ["do-you-mean"] }),
        listen("a2", "Got it, thanks. By the way, is there a restroom there?", "What does the speaker ask about after “by the way”?", ["A restroom", "A cafe", "A ticket"], 0, "By the way, is there a restroom there?", { c: ["by-the-way"] }),
        dict("a3", "Sorry, I didn't catch that.", "Pedido de repetição.", { c: ["didnt-catch"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Desfazendo um mal-entendido por escrito",
      goal: "Escrever uma mensagem para esclarecer o que você quis dizer.",
      exercises: [
        write("w1", "A friend thought you didn't want to go to their party. Write a message (about 45 words) to explain what you meant and end in a friendly way.",
          { mode: "free", min: 35, check: ["Disse que houve um mal-entendido.", "Usei What I meant was ou I mean.", "Reagi com That sounds + adjetivo ou algo gentil.", "Encerrei com um próximo passo."], model: "Hi Bruno! I think there was a misunderstanding. I didn't mean that I don't want to go. What I meant was that I work until eight on Saturday, so I will arrive late. The party sounds great. Anyway, save me a piece of cake! Talk to you soon.", c: ["i-mean", "sounds", "anyway"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "O jogo da palavra proibida",
      goal: "Explicar cinco coisas em voz alta sem dizer o nome delas.",
      exercises: [
        speak("s1", "Explain these without saying the word: a wallet, an elevator, a nurse, a suitcase, a bakery.", ["It's something you use to carry money. It's a kind of machine that takes you up and down. It's the person who helps doctors. It's something you use to carry clothes on a trip. It's the place where you buy bread."],
          { mode: "respond", check: ["Expliquei as cinco coisas.", "Usei It's something you use to.", "Usei It's a kind of, the place where ou the person who.", "Não disse nenhuma das cinco palavras."], c: ["use-to-explain", "kind-of"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: uma conversa completa",
      goal: "Conduzir uma conversa do começo ao fim: reagir, explicar, checar e encerrar.",
      exercises: [
        dialog("m1", "You are talking to a foreign visitor at a friend's barbecue.", [
          { npc: ["I've been in Brazil for two weeks. I'm traveling by bus.", "Estou no Brasil há duas semanas. Estou viajando de ônibus."], options: [
            ["That sounds fun! How come you chose to travel by bus?", true, "Ela ri e conta que tem medo de avião.", "Reage e aprofunda."],
            ["That sounds like fun. How come did you chose bus?", false, "Ela entende, mas a pergunta está errada.", "How come you chose…"],
          ] },
          { npc: ["What's that thing on the grill? The white one.", "O que é aquilo na grelha? O branco."], options: [
            ["It's a kind of cheese. It's something you grill and eat on a stick.", true, "Ela quer provar.", "Paráfrase com kind of."],
            ["It's cheese of grill. I don't know.", false, "Ela continua sem entender.", "It's a kind of cheese…"],
          ] },
          { npc: ["It looks delicious. Thanks for explaining!", "Parece delicioso. Obrigada por explicar!"], options: [
            ["Anyway, I should get going. It was nice talking to you. Let's keep in touch!", true, "Vocês trocam contatos.", "Encerramento completo."],
            ["Bye.", false, "A conversa termina de forma seca.", "Sinalize, elogie e combine o contato."],
          ] },
        ], "Conversa completa: reagir, parafrasear e encerrar.", { c: ["sounds", "how-come", "kind-of", "keep-in-touch"] }),
        type("m2", "You don't know the word “corkscrew”. Explain it: It's something you use…", ["It's something you use to open bottles", "It's something you use to open wine bottles", "It's something you use to open bottles of wine", "It's something you use to open a bottle of wine", "It's something you use to open wine"], "It's something you use to open bottles.", { c: ["use-to-explain"] }),
      ],
      outside: {
        title: "Fora do app: cinco minutos sem travar",
        instructions: "Fale sozinho em inglês por cinco minutos sobre a sua semana (ou converse com alguém, se puder). Regra: quando faltar uma palavra, não pare e não troque para o português; parafraseie com “It's a kind of…” ou “It's something you use to…”. Ao final, anote as palavras que faltaram e procure-as.",
        checklist: ["Falei por cinco minutos.", "Parafraseei pelo menos duas vezes em vez de parar.", "Usei By the way ou Anyway para organizar a fala.", "Anotei as palavras que faltaram."],
      },
    }),
  },
});
