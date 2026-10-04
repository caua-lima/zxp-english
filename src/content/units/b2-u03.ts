/** B2 · Unidade 3 — Hipóteses e arrependimentos: terceira condicional, should have, wish e condicionais mistas. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Ten years ago I was offered a job in Canada. I didn't take it because I was afraid of leaving my family. If I had accepted, I would have learned English much faster. Sometimes I wish I had taken the risk. On the other hand, if I had moved, I wouldn't have met my wife, and I wouldn't be living in this city now. I don't regret staying, but I should have thought about it more carefully.";

export default defineUnit({
  id: "b2-u03",

  concepts: [
    concept("third-cond", "pattern", "If I had known, I would have …", "Se eu tivesse sabido, eu teria …", "l1", ["If I had known, I would have called you.", "Se eu soubesse, teria te ligado."], { note: "If + past perfect, would have + particípio. Fala de um passado que não aconteceu." }),
    concept("wouldve", "sound", "would've / wouldn't have", "teria / não teria", "l1", ["I would've helped you.", "Eu teria te ajudado."], { note: "Na fala, would have soa como “would've”. Na escrita, nunca “would of”.", tags: ["pronunciation"] }),
    concept("should-have", "pattern", "should have / shouldn't have + participle", "deveria ter / não deveria ter + particípio", "l2", ["I should have left earlier.", "Eu deveria ter saído mais cedo."], { note: "Crítica ou arrependimento sobre o passado." }),
    concept("could-have", "pattern", "could have + participle", "poderia ter + particípio", "l2", ["You could have told me!", "Você poderia ter me avisado!"], { note: "Algo que era possível, mas não aconteceu." }),
    concept("wish-had", "pattern", "I wish I had + participle / If only …", "Queria ter … / Ah, se eu tivesse …", "l3", ["I wish I had studied more.", "Queria ter estudado mais."], { note: "wish + past perfect: arrependimento sobre o passado." }),
    concept("regret", "pattern", "regret + verb-ing", "arrepender-se de + verbo", "l3", ["I regret selling my guitar.", "Eu me arrependo de ter vendido meu violão."], { note: "regret + -ing fala de algo já feito." }),
    concept("mixed-cond", "pattern", "If I had …, I would be … now", "Se eu tivesse …, eu estaria … agora", "l4", ["If I had saved money, I would be traveling now.", "Se eu tivesse economizado, estaria viajando agora."], { note: "Condição no passado, resultado no presente." }),
    concept("take-risk", "phrase", "take the risk / miss the chance", "correr o risco / perder a chance", "l4", ["I missed the chance to study abroad.", "Perdi a chance de estudar fora."], { note: "Em inglês não se “runs” um risco: take a risk.", tags: ["collocation"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Se eu tivesse sabido…",
      objective: "Você vai conseguir falar de situações do passado que não aconteceram e de suas consequências imaginadas.",
      minutes: 10,
      context: { kind: "dialogue", title: "After a missed concert", lines: [
        { who: "Luiza", en: "The concert was amazing. Why didn't you come?", pt: "O show foi incrível. Por que você não veio?" },
        { who: "Pedro", en: "I didn't know about it! If I had known, I would have bought a ticket.", pt: "Eu não sabia! Se eu soubesse, teria comprado um ingresso." },
        { who: "Luiza", en: "If you had checked your messages, you would've seen my invitation.", pt: "Se você tivesse olhado suas mensagens, teria visto meu convite." },
        { who: "Pedro", en: "True. If I hadn't lost my phone, none of this would have happened.", pt: "Verdade. Se eu não tivesse perdido meu celular, nada disso teria acontecido." },
      ] },
      explanation: {
        summary: "A **terceira condicional** imagina um **passado diferente**:\n- **If** + past perfect, **would have** + particípio\n- *If I **had known**, I **would have called** you.*\n\nNa realidade: eu não sabia, e não liguei. Não dá mais para mudar.",
        details: "O erro mais comum de brasileiros é colocar *would* na parte do if: “If I would have known”. Depois de if, só **had + particípio**. Na fala, *would have* se reduz a **would've** e *would not have* a **wouldn't have**. Nunca escreva “would of”: é só o som de *would've*.",
        examples: [
          { en: "If it hadn't rained, we would have gone to the beach.", pt: "Se não tivesse chovido, teríamos ido à praia." },
          { en: "She would have passed if she had studied.", pt: "Ela teria passado se tivesse estudado." },
          { en: "What would you have done?", pt: "O que você teria feito?" },
        ],
        contrasts: [
          { wrong: "If I would have known, I would have called.", right: "If I had known, I would have called.", why: "Depois de if: had + particípio, sem would." },
          { wrong: "I would of helped you.", right: "I would have helped you.", why: "Would've se escreve would have." },
        ],
      },
      guided: [
        mc("e1", "“If I had known, I would have bought a ticket.” Did the speaker buy a ticket?", ["No", "Yes", "Maybe"], 0, "A terceira condicional fala do que não aconteceu.", { c: ["third-cond"], keepOrder: true }),
        mc("e2", "Choose: “If you ___ your messages, you would have seen my invitation.”", ["had checked", "would have checked", "checked"], 0, "If + past perfect.", { c: ["third-cond"] }),
        listen("e3", "I would've called you, but I didn't have your number.", "What do you hear after “I”?", ["would have (would've)", "would", "will have"], 0, "Would've é a forma reduzida de would have.", { c: ["wouldve"], s: "pronunciation" }),
      ],
      independent: [
        cloze("e4", "If I had known, I would ___ bought a ticket.", ["have"], "Would have + particípio.", { c: ["third-cond"] }),
        cloze("e5", "If it ___ rained, we would have gone to the beach.", ["hadn't", "had not"], "If + past perfect negativo.", { c: ["third-cond"], cue: "(not)" }),
        fix("e6", "If I would have seen you, I would have said hello.", ["If I had seen you, I would have said hello", "If I had seen you, I would've said hello"], "Sem would depois de if.", { c: ["third-cond"], prompt: "Fix the mistake." }),
        fix("e7", "She would of passed the test.", ["She would have passed the test", "She would've passed the test"], "Escreve-se would have.", { c: ["wouldve"], prompt: "Fix the spelling." }),
        dict("e8", "If you had asked me, I would've helped you.", "Would've = would have.", { c: ["wouldve"], alt: ["If you had asked me, I would have helped you."] }),
      ],
      application: [
        type("e9", "Reality: I didn't study, so I failed. Complete: “If I had studied, …”", ["If I had studied, I would have passed", "If I had studied, I wouldn't have failed", "If I had studied, I would not have failed", "If I had studied, I would've passed"], "Would have + particípio.", { c: ["third-cond"] }),
        speak("e10", "Think of something that went wrong last year. Say two sentences with “If I had… / If I hadn't…”. Pronounce “would've” as one word.", ["If I had left earlier, I would've caught the train. If I hadn't forgotten my wallet, I wouldn't have walked home."],
          { mode: "respond", check: ["Usei if + had + particípio.", "Usei would have + particípio.", "Pronunciei would've de forma reduzida.", "Não coloquei would depois de if."], c: ["third-cond", "wouldve"] }),
      ],
      summary: { points: ["If + had + particípio, would have + particípio.", "Passado que não aconteceu.", "would've se escreve would have."], concepts: ["third-cond", "wouldve"] },
    }),

    lesson("l2", {
      title: "Eu deveria ter…",
      objective: "Você vai conseguir criticar ou lamentar decisões passadas e apontar possibilidades perdidas.",
      minutes: 9,
      context: { kind: "dialogue", title: "After a failed presentation", lines: [
        { who: "Clara", en: "The presentation was a disaster. I should have practiced more.", pt: "A apresentação foi um desastre. Eu deveria ter praticado mais." },
        { who: "Renato", en: "You shouldn't have stayed up so late.", pt: "Você não deveria ter ficado acordada até tão tarde." },
        { who: "Clara", en: "I know. I could have asked you for help.", pt: "Eu sei. Eu poderia ter pedido ajuda a você." },
        { who: "Renato", en: "You could have! I was free all week.", pt: "Poderia mesmo! Eu estava livre a semana toda." },
      ] },
      explanation: {
        summary: "Para olhar para trás:\n- **should have** + particípio → era a coisa certa, mas não foi feita\n- **shouldn't have** + particípio → foi feito, e foi um erro\n- **could have** + particípio → era possível, mas não aconteceu",
        details: "*You should have told me* é uma crítica; dita a si mesmo (*I should have…*), é arrependimento. *You shouldn't have!* também é a resposta educada ao receber um presente. Na fala: **should've**, **could've**, **shouldn't have**. Cuidado: *had to* é obrigação cumprida (*I had to leave*), não arrependimento.",
        examples: [
          { en: "We should have booked a table.", pt: "Deveríamos ter reservado uma mesa." },
          { en: "I shouldn't have said that.", pt: "Eu não deveria ter dito aquilo." },
          { en: "He could have won, but he gave up.", pt: "Ele poderia ter vencido, mas desistiu." },
        ],
        contrasts: [
          { wrong: "I should studied more.", right: "I should have studied more.", why: "Should have + particípio." },
          { wrong: "I should have went earlier.", right: "I should have gone earlier.", why: "Depois de have: particípio (gone)." },
        ],
      },
      guided: [
        mc("e1", "“I shouldn't have eaten so much.” What happened?", ["I ate too much, and I regret it.", "I didn't eat, and I regret it.", "I will eat less."], 0, "Shouldn't have: foi feito, e foi um erro.", { c: ["should-have"] }),
        match("e2", "Match the situation to the comment.", [["I failed the test.", "I should have studied more."], ["I'm exhausted today.", "I shouldn't have stayed up late."], ["You carried it alone?", "You could have asked me for help."], ["We arrived and it was full.", "We should have booked a table."]],
          "Should have, shouldn't have e could have olham para trás.", { c: ["should-have", "could-have"], pt: "Associe a situação ao comentário." }),
        cloze("e3", "I ___ have practiced more. The presentation was a disaster.", ["should"], "Should have + particípio.", { c: ["should-have"] }),
      ],
      independent: [
        cloze("e4", "You ___ have told me! I was free all week.", ["could", "should"], "Era possível: could have.", { c: ["could-have"] }),
        fix("e5", "We should booked the tickets earlier.", ["We should have booked the tickets earlier", "We should've booked the tickets earlier"], "Should have + particípio.", { c: ["should-have"], prompt: "Fix the mistake." }),
        fix("e6", "He could have went to college, but he chose to work.", ["He could have gone to college, but he chose to work"], "Depois de have: particípio (gone).", { c: ["could-have"], prompt: "Fix the verb." }),
        dict("e7", "I shouldn't have said that.", "Shouldn't have + particípio.", { c: ["should-have"], alt: ["I should not have said that."] }),
        order("e8", "Put the words in order: “Ele poderia ter vencido.”", "He could have won.", "Could have + particípio.", { c: ["could-have"], extra: ["win"] }),
      ],
      application: [
        type("e9", "Your friend drove after two beers. Criticize it: “Você não deveria ter dirigido.”", ["You shouldn't have driven", "You should not have driven"], "Shouldn't have + particípio.", { c: ["should-have"] }),
        dialog("e10", "A colleague sent an angry email to a client and now regrets it.", [
          { npc: ["I sent that email without thinking. Now the client is furious.", "Mandei aquele e-mail sem pensar. Agora o cliente está furioso."], options: [
            ["You should have waited until the next day. Still, it can be fixed.", true, "Ele concorda e respira fundo.", "Crítica construtiva com should have."],
            ["You should waited. It's bad.", false, "A frase está errada e não ajuda.", "Should have waited."],
          ] },
          { npc: ["I know. What could I have done differently?", "Eu sei. O que eu poderia ter feito diferente?"], options: [
            ["You could have called him first. A call is harder to misunderstand.", true, "Ele decide ligar agora.", "Could have + particípio aponta a alternativa."],
            ["You could call him yesterday.", false, "Tempo errado.", "Could have called."],
          ] },
        ], "Comentar um erro passado sem destruir a pessoa.", { c: ["should-have", "could-have"] }),
      ],
      summary: { points: ["should have = era o certo, e não foi feito.", "shouldn't have = foi feito, e foi um erro.", "could have = era possível."], concepts: ["should-have", "could-have"] },
    }),

    lesson("l3", {
      title: "Arrependimentos",
      objective: "Você vai conseguir expressar arrependimento sobre o passado com wish, if only e regret.",
      minutes: 9,
      context: { kind: "text", title: "Looking back", lines: [
        { en: "I wish I had learned to play an instrument when I was young.", pt: "Queria ter aprendido a tocar um instrumento quando era jovem." },
        { en: "If only I had listened to my grandmother's stories!", pt: "Ah, se eu tivesse escutado as histórias da minha avó!" },
        { en: "I regret selling my first car.", pt: "Eu me arrependo de ter vendido meu primeiro carro." },
        { en: "But I don't regret moving to this city.", pt: "Mas não me arrependo de ter me mudado para esta cidade." },
      ] },
      explanation: {
        summary: "Três formas de arrependimento:\n- **I wish I had** + particípio: *I wish I had studied more.*\n- **If only I had** + particípio (mais forte, mais emotivo)\n- **I regret** + verbo-**ing**: *I regret selling it.*\n\nCompare com a unidade B1: *I wish I **had** more time* (presente) × *I wish I **had had** more time* (passado).",
        details: "Depois de wish, o verbo recua mais um passo: para falar do passado, usa-se o **past perfect**. Não diga “I wish I would have studied”. Com *regret*, a negativa vai antes do -ing: *I regret not going* (me arrependo de não ter ido).",
        examples: [
          { en: "I wish I hadn't spent all my money.", pt: "Queria não ter gastado todo o meu dinheiro." },
          { en: "If only we had left ten minutes earlier!", pt: "Ah, se tivéssemos saído dez minutos antes!" },
          { en: "She regrets not finishing college.", pt: "Ela se arrepende de não ter terminado a faculdade." },
        ],
        contrasts: [
          { wrong: "I wish I studied more last year.", right: "I wish I had studied more last year.", why: "Arrependimento do passado: past perfect." },
          { wrong: "I regret to sell my car.", right: "I regret selling my car.", why: "Regret + -ing para algo já feito." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I wish I ___ to my teacher last year.”", ["had listened", "listened", "would listen"], 0, "Passado: wish + past perfect.", { c: ["wish-had"] }),
        mc("e2", "“She regrets not finishing college.” What does it mean?", ["Ela não terminou a faculdade e se arrepende.", "Ela terminou a faculdade e se arrepende.", "Ela vai terminar a faculdade."], 0, "Regret not + -ing.", { c: ["regret"] }),
        cloze("e3", "I regret ___ my first car.", ["selling"], "Regret + verbo-ing.", { c: ["regret"], cue: "(sell)" }),
      ],
      independent: [
        cloze("e4", "I wish I ___ learned to play an instrument.", ["had"], "Wish + had + particípio.", { c: ["wish-had"] }),
        cloze("e5", "If ___ I had listened to her!", ["only"], "If only = ah, se…", { c: ["wish-had"] }),
        fix("e6", "I wish I didn't spend all my money yesterday.", ["I wish I hadn't spent all my money yesterday", "I wish I had not spent all my money yesterday"], "Ontem é passado: hadn't spent.", { c: ["wish-had"], prompt: "Fix the mistake." }),
        fix("e7", "I regret to say those words to my brother last night.", ["I regret saying those words to my brother last night"], "Algo já feito: regret + -ing.", { c: ["regret"], prompt: "Fix the mistake." }),
        dict("e8", "I wish I had studied more.", "Arrependimento com wish + past perfect.", { c: ["wish-had"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu me arrependo de não ter viajado mais.”", ["I regret not traveling more", "I regret not travelling more", "I regret not having traveled more", "I regret not having travelled more"], "Regret not + -ing.", { c: ["regret"] }),
        write("e10", "Write three sentences about your past: one with I wish I had, one with If only, and one with I regret or I don't regret.",
          { frame: ["I wish I had …", "If only I had …", "I (don't) regret …-ing …"], min: 24, check: ["Usei wish + had + particípio.", "Usei If only + had + particípio.", "Usei regret + -ing.", "Não escrevi “I wish I would have”."], model: "I wish I had started learning English ten years ago. If only I had saved some money when I was younger! However, I don't regret changing my career, because I am much happier now.", c: ["wish-had", "regret"] }),
      ],
      summary: { points: ["I wish I had + particípio.", "If only… é mais forte.", "regret (not) + -ing."], concepts: ["wish-had", "regret"] },
    }),

    lesson("l4", {
      title: "O passado que explica o presente",
      objective: "Você vai conseguir ligar uma condição passada a um resultado presente e falar de riscos e chances.",
      minutes: 10,
      context: { kind: "text", title: "Two lives", lines: [
        { en: "If I had taken that job in Lisbon, I would be living in Portugal now.", pt: "Se eu tivesse aceitado aquele emprego em Lisboa, estaria morando em Portugal agora." },
        { en: "If I hadn't met Carla, I wouldn't speak Spanish today.", pt: "Se eu não tivesse conhecido a Carla, não falaria espanhol hoje." },
        { en: "I took the risk and opened my own business. I'm glad I didn't miss the chance.", pt: "Corri o risco e abri meu próprio negócio. Fico feliz por não ter perdido a chance." },
      ] },
      explanation: {
        summary: "A **condicional mista** liga:\n- condição no **passado**: *If I **had taken** that job,*\n- resultado no **presente**: *I **would be** living in Portugal now.*\n\nCompare com a terceira: *…I **would have lived** in Portugal* (resultado também passado).",
        details: "A pista são palavras como *now, today, still*: se o resultado é agora, use **would + verbo base** (ou *would be + -ing*). Duas colocações úteis: **take a risk / take the risk** (correr um risco) e **miss the chance / miss an opportunity** (perder a chance). “Lose the chance” e “run a risk” soam estranhos ou raros.",
        examples: [
          { en: "If I had slept well, I wouldn't be so tired now.", pt: "Se eu tivesse dormido bem, não estaria tão cansado agora." },
          { en: "If she hadn't moved, she would still work here.", pt: "Se ela não tivesse se mudado, ainda trabalharia aqui." },
          { en: "Don't miss the chance to see it.", pt: "Não perca a chance de ver." },
        ],
        contrasts: [
          { wrong: "If I had slept well, I wouldn't have been tired now.", right: "If I had slept well, I wouldn't be tired now.", why: "Resultado presente (now): would + verbo base." },
          { wrong: "I lost the chance to travel.", right: "I missed the chance to travel.", why: "A colocação é miss the chance." },
        ],
      },
      guided: [
        mc("e1", "Choose: “If I had saved money, I ___ on vacation now.”", ["would be", "would have been", "had been"], 0, "Resultado agora: would be.", { c: ["mixed-cond"] }),
        match("e2", "Match each condition to its result.", [["If I had studied medicine,", "I would be a doctor now."], ["If we had left earlier,", "we would have arrived on time."], ["If she hadn't moved away,", "she would still live next door."], ["If I had read the question,", "I would have passed the test."]],
          "Resultado agora: would + base. Resultado passado: would have + particípio.", { c: ["mixed-cond", "third-cond"], s: "grammar", pt: "Associe cada condição ao resultado." }),
        cloze("e3", "I ___ the risk and opened my own business.", ["took"], "Take a risk.", { c: ["take-risk"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "If I hadn't met Carla, I ___ speak Spanish today.", ["wouldn't", "would not"], "Resultado presente: wouldn't + verbo base.", { c: ["mixed-cond"] }),
        cloze("e5", "I'm glad I didn't ___ the chance.", ["miss"], "Miss the chance.", { c: ["take-risk"], s: "vocabulary", cue: "(perder)", t: [["lose", "A colocação natural é miss the chance."]] }),
        fix("e6", "If I had slept well, I wouldn't have been so tired now.", ["If I had slept well, I wouldn't be so tired now", "If I had slept well, I would not be so tired now"], "Now pede resultado presente: wouldn't be.", { c: ["mixed-cond"], prompt: "Fix the result." }),
        dict("e7", "If I had taken that job, I would be living in Portugal now.", "Condição passada, resultado presente.", { c: ["mixed-cond"] }),
        fix("e8", "He lost the chance to study abroad.", ["He missed the chance to study abroad", "He missed the opportunity to study abroad"], "Miss the chance.", { c: ["take-risk"], prompt: "Fix the collocation." }),
      ],
      application: [
        type("e9", "Reality: I didn't finish college, so I don't have a degree now. Complete: “If I had finished college, …”", ["If I had finished college, I would have a degree now", "If I had finished college, I would have a degree", "If I had finished college, I'd have a degree now"], "Resultado presente: would have (verbo principal) a degree.", { c: ["mixed-cond"] }),
        speak("e10", "Talk about one decision that changed your life. Say what would be different now if you had decided differently.", ["Five years ago I moved to another city. If I had stayed, I would still be working at the bank. If I hadn't taken the risk, I wouldn't know my best friends."],
          { mode: "respond", check: ["Contei a decisão no passado simples.", "Usei if + had + particípio.", "O resultado está no presente com would + verbo base.", "Usei take the risk ou miss the chance."], c: ["mixed-cond", "take-risk"] }),
      ],
      summary: { points: ["If + had + particípio, would + base (now).", "Terceira: would have + particípio.", "take the risk; miss the chance."], concepts: ["mixed-cond", "take-risk"] },
    }),
  ],

  checkpoint: {
    intro: "New situations about a past that could have been different. Imagine, regret, criticize and connect the past to the present.",
    a: [
      cloze("q1", "If we had left on time, we wouldn't ___ missed the flight.", ["have"], "Wouldn't have + particípio.", { c: ["third-cond"] }),
      fix("q2", "If she would have told me, I would have helped.", ["If she had told me, I would have helped", "If she had told me, I would've helped"], "Sem would depois de if.", { c: ["third-cond"], prompt: "Fix the mistake." }),
      mc("q3", "“You shouldn't have opened that file.” What happened?", ["You opened it, and it was a mistake.", "You didn't open it.", "You may open it later."], 0, "Shouldn't have: foi feito, e foi um erro.", { c: ["should-have"] }),
      dict("q4", "We could have taken a taxi.", "Could have + particípio.", { c: ["could-have"], alt: ["We could've taken a taxi."] }),
      type("q5", "Say in English: “Queria ter comprado aquela casa.”", ["I wish I had bought that house", "I wish I'd bought that house"], "Wish + had + particípio.", { c: ["wish-had"] }),
      cloze("q6", "He regrets ___ his job without a plan.", ["leaving", "quitting"], "Regret + verbo-ing.", { c: ["regret"], cue: "(leave)" }),
      mc("q7", "Choose: “If I had learned to drive, I ___ the bus every day now.”", ["wouldn't take", "wouldn't have taken", "hadn't taken"], 0, "Resultado presente (now): wouldn't take.", { c: ["mixed-cond"] }),
      order("q8", "Put the words in order: “Ela correu o risco e ganhou.”", "She took the risk and won.", "Take the risk.", { c: ["take-risk"], extra: ["ran"] }),
      listen("q9", "I would've gone to the wedding if I hadn't been sick.", "Did the speaker go to the wedding?", ["No, the speaker was sick", "Yes, and got sick there", "Yes, with a friend"], 0, "Would've gone… if I hadn't been sick: não foi.", { c: ["wouldve", "third-cond"] }),
      dialog("q10", "A friend didn't apply for a scholarship and the deadline has passed.", [
        { npc: ["I didn't apply. I thought I had no chance.", "Não me inscrevi. Achei que não tinha chance."], options: [
          ["You should have tried. If you had applied, you might have been selected.", true, "Ele suspira: “I know.”", "Should have e terceira condicional."],
          ["You should tried. If you would have applied, you are selected.", false, "Há três erros.", "Should have tried; if you had applied; would have been."],
        ] },
        { npc: ["I really regret it now.", "Estou muito arrependido agora."], options: [
          ["Don't miss the chance next year. I can help you with the form.", true, "Ele aceita a ajuda.", "Miss the chance; olha para frente."],
          ["Don't lose the risk next year.", false, "A expressão não existe.", "Miss the chance / take the risk."],
        ] },
      ], "Comentar uma oportunidade perdida e apoiar.", { c: ["should-have", "third-cond", "take-risk"] }),
    ],
    b: [
      cloze("q1", "If you ___ told me about the traffic, I would have taken the subway.", ["had"], "If + had + particípio.", { c: ["third-cond"] }),
      mc("q2", "Choose the correct written form.", ["They would have won.", "They would of won.", "They would had won."], 0, "Would have, nunca would of.", { c: ["wouldve"] }),
      fix("q3", "I should have went to the doctor sooner.", ["I should have gone to the doctor sooner", "I should've gone to the doctor sooner"], "Depois de have: particípio (gone).", { c: ["should-have"], prompt: "Fix the verb." }),
      type("q4", "Say in English: “Você poderia ter se machucado!”", ["You could have hurt yourself", "You could've hurt yourself", "You could have gotten hurt", "You could have got hurt"], "Could have + particípio.", { c: ["could-have"] }),
      dict("q5", "If only I had listened to you!", "If only + had + particípio.", { c: ["wish-had"] }),
      fix("q6", "I regret to buy this phone. It broke in a month.", ["I regret buying this phone. It broke in a month"], "Algo já feito: regret + -ing.", { c: ["regret"], prompt: "Fix the mistake." }),
      cloze("q7", "If my parents hadn't moved to Brazil, I ___ speak Portuguese today.", ["wouldn't", "would not"], "Resultado presente: wouldn't + verbo base.", { c: ["mixed-cond"] }),
      cloze("q8", "It was a great opportunity, and I ___ it.", ["missed"], "Miss an opportunity.", { c: ["take-risk"], s: "vocabulary", cue: "(perdi)", t: [["lost", "A colocação natural é miss an opportunity."]] }),
      listen("q9", "We shouldn't have trusted the map. If we had asked someone, we would've found the hotel in ten minutes.", "What was the mistake?", ["Trusting the map", "Asking someone", "Leaving the hotel"], 0, "We shouldn't have trusted the map.", { c: ["should-have", "wouldve"] }),
      dialog("q10", "Your sister sold her apartment last year and prices have doubled.", [
        { npc: ["I wish I hadn't sold it. I'd be rich now!", "Queria não ter vendido. Eu estaria rica agora!"], options: [
          ["Maybe. But if you hadn't sold it, you wouldn't have opened your shop.", true, "Ela reconhece que é verdade.", "Terceira condicional, correta."],
          ["Maybe. But if you wouldn't sold it, you don't open your shop.", false, "A frase está errada.", "If you hadn't sold it, you wouldn't have opened…"],
        ] },
        { npc: ["That's true. I don't regret opening the shop.", "É verdade. Não me arrependo de ter aberto a loja."], options: [
          ["Exactly. You took the risk, and it worked.", true, "Ela sorri.", "Take the risk."],
          ["Exactly. You ran the chance, and it worked.", false, "A colocação não existe.", "Take the risk."],
        ] },
      ], "Consolar alguém: o passado alternativo também tinha um custo.", { c: ["third-cond", "wish-had", "take-risk"] }),
    ],
    production: write("t1", "Write about 90 words about a decision in your life (or an invented one): what you decided, what would have happened if you had chosen differently, how your life would be different now, and whether you regret it.",
      { mode: "free", min: 75, check: ["Contei a decisão no passado simples.", "Usei a terceira condicional (if + had…, would have…).", "Usei uma condicional mista com resultado no presente.", "Usei wish, should have ou regret.", "Não coloquei would depois de if."],
        model: "When I was twenty, I decided not to study abroad because it was too expensive. If I had gone, I would have improved my English much faster, and I would have met people from many countries. On the other hand, if I had left, I wouldn't have started my business, and I wouldn't be working with my brother now. Sometimes I wish I had taken the risk, and I should have looked for a scholarship. However, I don't regret staying, because I am happy with my life today.", c: ["third-cond", "mixed-cond", "wish-had", "regret"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "O emprego no Canadá",
      goal: "Ler um relato de arrependimento e separar fatos reais de hipóteses.",
      context: { kind: "text", title: "The job I didn't take", lines: [
        { en: "Ten years ago I was offered a job in Canada. I didn't take it because I was afraid of leaving my family.", pt: "Dez anos atrás me ofereceram um emprego no Canadá. Não aceitei porque tinha medo de deixar minha família." },
        { en: "If I had accepted, I would have learned English much faster. Sometimes I wish I had taken the risk.", pt: "Se eu tivesse aceitado, teria aprendido inglês muito mais rápido. Às vezes queria ter corrido o risco." },
        { en: "On the other hand, if I had moved, I wouldn't have met my wife, and I wouldn't be living in this city now.", pt: "Por outro lado, se eu tivesse me mudado, não teria conhecido minha esposa e não estaria morando nesta cidade agora." },
        { en: "I don't regret staying, but I should have thought about it more carefully.", pt: "Não me arrependo de ter ficado, mas deveria ter pensado nisso com mais cuidado." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "Did the writer take the job in Canada?", ["No", "Yes", "Only for a year"], 0, "I didn't take it.", { c: ["third-cond"], keepOrder: true }),
        rd("r2", PASSAGE, "Which sentence describes a present result?", ["I wouldn't be living in this city now.", "I would have learned English much faster.", "I wouldn't have met my wife."], 0, "Wouldn't be living… now: resultado presente.", { c: ["mixed-cond"] }),
        rd("r3", PASSAGE, "What is the writer's criticism of himself?", ["He didn't think carefully enough.", "He stayed with his family.", "He married too young."], 0, "I should have thought about it more carefully.", { c: ["should-have"] }),
        cloze("r4", "I don't regret ___, but I should have thought about it more carefully.", ["staying"], "Regret + verbo-ing.", { c: ["regret"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Formas reduzidas",
      goal: "Reconhecer would've, should've e could've na fala.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "I should've called you. I could've come earlier, but I didn't know. If you'd told me, I would've brought the documents.", pt: "Eu deveria ter te ligado. Poderia ter vindo mais cedo, mas não sabia. Se você tivesse me avisado, eu teria trazido os documentos." }] },
      exercises: [
        listen("a1", "I should've called you.", "What is the speaker expressing?", ["Regret about not calling", "A plan to call", "An obligation to call tomorrow"], 0, "Should've called: não ligou, e lamenta.", { c: ["should-have"] }),
        listen("a2", "If you'd told me, I would've brought the documents.", "Did the speaker bring the documents?", ["No", "Yes", "Only some of them"], 0, "Would've brought… if you'd told me: não trouxe.", { c: ["wouldve"], keepOrder: true }),
        dict("a3", "I could've come earlier.", "Could've = could have.", { c: ["could-have"], prompt: "Type what you hear.", alt: ["I could have come earlier."] }),
        dict("a4", "I would've brought the documents.", "Would've = would have.", { c: ["wouldve"], prompt: "Type what you hear.", alt: ["I would have brought the documents."] }),
      ],
    }),
    writing: activity("writing", {
      title: "Carta ao eu do passado",
      goal: "Escrever uma mensagem ao seu eu de dez anos atrás.",
      exercises: [
        write("w1", "Write a short letter (about 60 words) to yourself ten years ago: what you should have done, what you shouldn't have worried about, and one thing you are glad you did.",
          { mode: "free", min: 50, check: ["Usei should have + particípio.", "Usei shouldn't have + particípio.", "Usei wish + had ou if only.", "Citei algo de que não me arrependo.", "Todos os verbos depois de have estão no particípio."], model: "Dear me, you should have started saving money earlier, and you should have spent more time with your grandparents. You shouldn't have worried so much about other people's opinions. I wish you had traveled more before starting to work. However, I am glad you took the risk of changing your course. If you hadn't done that, I wouldn't be happy today.", c: ["should-have", "wish-had", "mixed-cond"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "E se…?",
      goal: "Falar em voz alta sobre três momentos em que algo poderia ter sido diferente.",
      exercises: [
        speak("s1", "Answer out loud: What should you have done differently last year? What would have happened if you had? What would be different now?", ["I should have exercised more last year. If I had gone to the gym, I would've felt better. If I had started then, I would be much healthier now."],
          { mode: "respond", check: ["Usei should have + particípio.", "Usei a terceira condicional.", "Usei uma mista com resultado presente.", "Pronunciei would've e should've de forma reduzida."], c: ["should-have", "third-cond", "mixed-cond", "wouldve"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: revisão de um projeto que falhou",
      goal: "Analisar com um colega o que deu errado e o que poderia ter sido feito.",
      exercises: [
        dialog("m1", "Your team's product launch failed. You and a colleague review what happened.", [
          { npc: ["So, what went wrong?", "Então, o que deu errado?"], options: [
            ["We should have tested the app with real users. If we had done that, we would have found the bugs.", true, "Seu colega concorda e anota.", "Should have e terceira condicional."],
            ["We should test with users. If we would do that, we found the bugs.", false, "Os tempos estão errados.", "Should have tested; if we had done; would have found."],
          ] },
          { npc: ["And the marketing?", "E o marketing?"], options: [
            ["We could have started earlier. We missed the chance to launch before the holidays.", true, "Ele acrescenta a observação.", "Could have; miss the chance."],
            ["We could started earlier. We lost the chance.", false, "Há dois erros.", "Could have started; missed the chance."],
          ] },
          { npc: ["Where would we be now if we had done all that?", "Onde estaríamos agora se tivéssemos feito tudo isso?"], options: [
            ["If we had launched in November, we would be working on version two now.", true, "Ele diz: “Let's do it right next time.”", "Condicional mista."],
            ["If we had launched in November, we would have been working on version two now.", false, "O resultado é presente.", "Now: would be working."],
          ] },
        ], "Revisão de projeto: erros, alternativas e consequências.", { c: ["should-have", "third-cond", "could-have", "mixed-cond"] }),
        type("m2", "Say in English: “Deveríamos ter começado mais cedo.”", ["We should have started earlier", "We should've started earlier", "We should have started sooner"], "Should have + particípio.", { c: ["should-have"] }),
      ],
      outside: {
        title: "Fora do app: três linhas de aprendizado",
        instructions: "Pense em algo recente que não saiu como você queria (uma prova, uma conversa, um projeto). Escreva ou diga em inglês três linhas: o que você deveria ter feito (I should have…), o que teria acontecido (If I had…, I would have…) e o que vai fazer da próxima vez (Next time, I'll…).",
        checklist: ["Usei should have + particípio.", "Usei a terceira condicional sem would depois de if.", "Terminei com um plano para a próxima vez.", "Revisei os particípios."],
      },
    }),
  },
});
