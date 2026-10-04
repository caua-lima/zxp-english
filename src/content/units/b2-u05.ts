/** B2 · Unidade 5 — Formal ou informal? Registro, pedidos e recusas delicados, negociação. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Dear Ms. Carter, I am writing to request a change to our delivery schedule. I was wondering if you could postpone the next delivery by one week. Unfortunately, our warehouse will be closed for repairs. We would be happy to accept a larger order in March, as long as the price remains the same. I believe this is a sensible solution for both companies. I look forward to hearing from you. Kind regards, Daniel Rocha";

export default defineUnit({
  id: "b2-u05",

  concepts: [
    concept("register", "pattern", "Dear … / Hi …; I would like / I want", "formal / informal", "l1", ["Dear Mr. Lee, I would like to request a refund.", "Prezado Sr. Lee, gostaria de solicitar um reembolso."], { note: "O registro depende de quem lê, do meio e do que está em jogo." }),
    concept("formal-verbs", "word", "postpone / put off; request / ask for; discover / find out", "adiar; solicitar / pedir; descobrir", "l1", ["We need to postpone the meeting.", "Precisamos adiar a reunião."], { note: "Phrasal verbs soam informais; os verbos de origem latina, formais.", tags: ["phrasal-verb"] }),
    concept("look-forward", "phrase", "I look forward to hearing from you.", "Aguardo seu retorno.", "l1", ["I look forward to meeting you.", "Aguardo ansiosamente nosso encontro."], { note: "look forward to + verbo-ing (to aqui é preposição).", tags: ["chunk"] }),
    concept("would-you-mind", "pattern", "Would you mind + verb-ing …?", "Você se importaria de …?", "l2", ["Would you mind closing the window?", "Você se importaria de fechar a janela?"], { note: "Para aceitar, responde-se “No, not at all.”" }),
    concept("wondering-if", "pattern", "I was wondering if you could …", "Eu queria saber se você poderia …", "l2", ["I was wondering if you could help me.", "Eu queria saber se você poderia me ajudar."], { note: "O passado aqui não é tempo: é distância e delicadeza." }),
    concept("im-afraid", "phrase", "I'm afraid … / Unfortunately, …", "Receio que … / Infelizmente, …", "l3", ["I'm afraid I can't make it on Friday.", "Receio não poder ir na sexta."], { note: "Aqui afraid não é medo: anuncia uma má notícia." }),
    concept("id-love-but", "phrase", "I'd love to, but …", "Eu adoraria, mas …", "l3", ["I'd love to, but I already have plans.", "Eu adoraria, mas já tenho compromisso."], { note: "Recusa em três passos: apreço, motivo, alternativa." }),
    concept("what-if-we", "phrase", "What if we …? / How about …-ing?", "E se nós …? / Que tal …?", "l4", ["What if we split the cost?", "E se dividíssemos o custo?"], { note: "Propostas em uma negociação. What if we + passado simples." }),
    concept("as-long-as", "phrase", "as long as / provided that", "desde que, contanto que", "l4", ["I can work on Saturday as long as I get Monday off.", "Posso trabalhar no sábado desde que eu folgue na segunda."], { note: "Aceita com uma condição." }),
    concept("sensible", "word", "sensible / sensitive", "sensato / sensível", "l4", ["That's a sensible decision.", "É uma decisão sensata."], { note: "Falso cognato: sensible é sensato. Sensível é sensitive.", tags: ["false-friend"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "A mesma mensagem, dois registros",
      objective: "Você vai conseguir reconhecer e produzir a versão formal e a informal de uma mesma mensagem.",
      minutes: 10,
      context: { kind: "text", title: "Two emails, one request", lines: [
        { en: "Hi Tom, can we put off the meeting until Friday? I need to find out a few things first. Thanks!", pt: "Oi, Tom, dá para adiar a reunião para sexta? Preciso descobrir umas coisas antes. Valeu!" },
        { en: "Dear Mr. Evans, I would like to request that we postpone the meeting until Friday.", pt: "Prezado Sr. Evans, gostaria de solicitar que adiemos a reunião para sexta-feira." },
        { en: "I need to obtain further information beforehand. I look forward to hearing from you.", pt: "Preciso obter mais informações antes. Aguardo seu retorno." },
      ] },
      explanation: {
        summary: "O **registro** muda com o leitor:\n\n- Saudação: *Hi Tom* → **Dear Mr. Evans**\n- Pedido: *Can we…?* → **I would like to request…**\n- Verbos: *put off* → **postpone**; *find out* → **discover / obtain**; *ask for* → **request**\n- Fecho: *Thanks!* → **I look forward to hearing from you. Kind regards,**",
        details: "Formal não é “difícil”: é sem contrações (*I would*, não *I'd*), com frases completas e verbos de origem latina. Informal usa phrasal verbs, contrações e frases curtas. Errar para o lado formal quase nunca ofende; errar para o informal pode ofender. Atenção: depois de **look forward to** vem verbo-**ing**: *to hearing*, não “to hear”.",
        examples: [
          { en: "Could you let me know by Friday?", pt: "Você pode me avisar até sexta? (neutro)" },
          { en: "Please inform me by Friday.", pt: "Favor informar-me até sexta. (formal)" },
          { en: "We regret to inform you that the event has been cancelled.", pt: "Lamentamos informar que o evento foi cancelado." },
        ],
        contrasts: [
          { wrong: "I look forward to hear from you.", right: "I look forward to hearing from you.", why: "Look forward to + -ing." },
          { wrong: "Dear Mr. Evans, I wanna put off the meeting.", right: "Dear Mr. Evans, I would like to postpone the meeting.", why: "Não se misturam registros." },
        ],
      },
      guided: [
        mc("e1", "Which sentence is more formal?", ["I would like to request a refund.", "I want my money back.", "Can I get a refund?"], 0, "I would like to request é a forma formal.", { c: ["register"] }),
        match("e2", "Match the informal verb to its formal partner.", [["put off", "postpone"], ["find out", "discover"], ["ask for", "request"], ["get", "obtain"], ["tell", "inform"]],
          "Phrasal verb (informal) e verbo de origem latina (formal).", { c: ["formal-verbs"], s: "vocabulary", pt: "Associe o verbo informal ao formal." }),
        cloze("e3", "I look forward to ___ from you.", ["hearing"], "Look forward to + -ing.", { c: ["look-forward"], cue: "(hear)" }),
      ],
      independent: [
        cloze("e4", "Dear Ms. Silva, I would like to ___ a meeting with you next week.", ["request", "arrange", "schedule"], "Registro formal: request.", { c: ["formal-verbs"], cue: "(ask for)" }),
        fix("e5", "I look forward to meet you next week.", ["I look forward to meeting you next week"], "Look forward to + -ing.", { c: ["look-forward"], prompt: "Fix the mistake." }),
        type("e6", "Make it formal: “We have to put off the launch.” (use postpone)", ["We have to postpone the launch", "We need to postpone the launch", "We must postpone the launch"], "Put off → postpone.", { c: ["formal-verbs"] }),
        mc("e7", "You are writing to a client you have never met. Choose the opening.", ["Dear Mr. Santos,", "Hey Santos!", "Yo!"], 0, "Primeiro contato profissional: Dear + título + sobrenome.", { c: ["register"] }),
        dict("e8", "I would like to request a refund.", "Pedido formal, sem contração.", { c: ["register"] }),
      ],
      application: [
        type("e9", "Make it informal for a friend: “I would like to postpone our dinner.” Start with “Can we…”", ["Can we put off our dinner", "Can we put off dinner", "Can we put our dinner off"], "Postpone → put off.", { c: ["formal-verbs"] }),
        write("e10", "Write the same request twice: first to a friend, then to a manager you don't know. Request: change the meeting from Monday to Wednesday.",
          { mode: "guided", frame: ["Hi …, can we …? Thanks!", "Dear …, I would like to … I look forward to …"], min: 30, check: ["A versão informal usa saudação e verbo informais.", "A versão formal usa Dear, I would like to e verbo formal.", "Usei look forward to + -ing.", "Não misturei os registros."], model: "Hi Ana, can we put off the meeting until Wednesday? Monday is crazy for me. Thanks! Dear Ms. Costa, I would like to request that we postpone the meeting until Wednesday. I look forward to hearing from you. Kind regards, Paulo.", c: ["register", "formal-verbs", "look-forward"] }),
      ],
      summary: { points: ["Formal: Dear, I would like to, sem contrações.", "put off → postpone; ask for → request.", "look forward to + -ing."], concepts: ["register", "formal-verbs", "look-forward"] },
    }),

    lesson("l2", {
      title: "Pedidos delicados",
      objective: "Você vai conseguir pedir favores grandes ou delicados sem soar impositivo.",
      minutes: 9,
      context: { kind: "dialogue", title: "Asking a busy colleague", lines: [
        { who: "Nora", en: "Sorry to bother you. Would you mind checking this report?", pt: "Desculpe incomodar. Você se importaria de revisar este relatório?" },
        { who: "Alex", en: "No, not at all. When do you need it?", pt: "Não, de forma alguma. Para quando você precisa?" },
        { who: "Nora", en: "I was wondering if you could do it by tomorrow.", pt: "Eu queria saber se você poderia fazer até amanhã." },
        { who: "Alex", en: "Tomorrow is tight, but I'll try.", pt: "Amanhã é apertado, mas vou tentar." },
      ] },
      explanation: {
        summary: "Quanto maior o favor, mais **indireto** o pedido:\n- *Can you…?* → *Could you…?* → **Would you mind + -ing…?** → **I was wondering if you could…**\n\nPara aceitar um *Would you mind…?*: **No, not at all.** / **Of course not.**\n(“Yes” significaria “sim, eu me importo”.)",
        details: "Em *I was wondering if you could…*, o passado não indica tempo: cria distância e deixa a pessoa livre para recusar. Depois de *if*, a ordem é de afirmação: *if you could help*, e não “if could you help”. Para pedir permissão: *Would you mind if I opened the window?*",
        examples: [
          { en: "Would you mind waiting a moment?", pt: "Você se importaria de esperar um momento?" },
          { en: "I was wondering if I could leave early today.", pt: "Eu queria saber se poderia sair mais cedo hoje." },
          { en: "Would you mind if I sat here?", pt: "Você se importa se eu me sentar aqui?" },
        ],
        contrasts: [
          { wrong: "Would you mind to close the window?", right: "Would you mind closing the window?", why: "Mind + verbo-ing." },
          { wrong: "I was wondering if could you help me.", right: "I was wondering if you could help me.", why: "Depois de if: ordem de afirmação." },
        ],
      },
      guided: [
        mc("e1", "Someone asks: “Would you mind opening the door?” You are happy to do it. You say:", ["No, not at all.", "Yes, I would.", "Yes, of course I mind."], 0, "Aceitar = “não, não me importo”.", { c: ["would-you-mind"], s: "interaction" }),
        match("e2", "Match the request to the situation where it fits best.", [["Can you pass the salt?", "um amigo, à mesa"], ["Could you send me the file?", "um colega, pedido comum"], ["Would you mind covering my shift?", "um colega, favor trabalhoso"], ["I was wondering if you could write me a reference letter.", "um superior, favor importante"]],
          "Quanto maior o favor e a distância, mais indireto o pedido.", { c: ["wondering-if", "would-you-mind"], pt: "Associe o pedido à situação em que ele cabe melhor." }),
        cloze("e3", "Would you mind ___ this report?", ["checking", "reviewing", "reading"], "Mind + verbo-ing.", { c: ["would-you-mind"], cue: "(check)" }),
      ],
      independent: [
        cloze("e4", "I was ___ if you could do it by tomorrow.", ["wondering"], "I was wondering if…", { c: ["wondering-if"] }),
        fix("e5", "Would you mind to send me the file again?", ["Would you mind sending me the file again"], "Mind + verbo-ing.", { c: ["would-you-mind"], prompt: "Fix the mistake." }),
        fix("e6", "I was wondering if could you lend me your notes.", ["I was wondering if you could lend me your notes"], "Depois de if: sujeito + could.", { c: ["wondering-if"], prompt: "Fix the word order." }),
        dict("e7", "Would you mind waiting a moment?", "Mind + verbo-ing.", { c: ["would-you-mind"] }),
        order("e8", "Put the words in order: “Eu queria saber se você poderia me ajudar.”", "I was wondering if you could help me.", "I was wondering if + sujeito + could.", { c: ["wondering-if"] }),
      ],
      application: [
        type("e9", "Ask a stranger politely to move their bag: “Você se importaria de tirar sua bolsa?”", ["Would you mind moving your bag"], "Would you mind + -ing?", { c: ["would-you-mind"] }),
        type("e10", "Ask your manager delicately for Friday off. Start with “I was wondering if…”", ["I was wondering if I could take Friday off", "I was wondering if I could have Friday off", "I was wondering if I could take the day off on Friday"], "I was wondering if I could…", { c: ["wondering-if"] }),
        speak("e11", "Make three requests out loud, from small to big: borrow a pen, get help with a report, leave work two hours early. Soften your voice on the biggest one.", ["Could I borrow your pen? Would you mind helping me with this report? I was wondering if I could leave two hours early today."],
          { mode: "respond", check: ["Usei uma forma mais indireta para o pedido maior.", "Usei Would you mind + -ing.", "Usei I was wondering if + sujeito + could.", "Meu tom ficou mais suave no pedido maior."], c: ["would-you-mind", "wondering-if"] }),
      ],
      summary: { points: ["Would you mind + -ing? → No, not at all.", "I was wondering if you could…", "Quanto maior o favor, mais indireto."], concepts: ["would-you-mind", "wondering-if"] },
    }),

    lesson("l3", {
      title: "Dizer não sem fechar portas",
      objective: "Você vai conseguir recusar convites e pedidos com delicadeza.",
      minutes: 9,
      context: { kind: "dialogue", title: "Two refusals", lines: [
        { who: "Mel", en: "Can you join us for dinner on Friday?", pt: "Você pode jantar com a gente na sexta?" },
        { who: "Gui", en: "I'd love to, but I already have plans. How about Saturday?", pt: "Eu adoraria, mas já tenho compromisso. Que tal sábado?" },
        { who: "Chefe", en: "Could you finish the report today?", pt: "Você conseguiria terminar o relatório hoje?" },
        { who: "Gui", en: "I'm afraid that won't be possible. Unfortunately, I'm still waiting for the numbers. I can send it tomorrow morning.", pt: "Receio que não seja possível. Infelizmente, ainda estou esperando os números. Posso mandar amanhã cedo." },
      ] },
      explanation: {
        summary: "Uma recusa educada tem três passos:\n1. **Apreço ou aviso:** *I'd love to, but…* / *I'm afraid…* / *Unfortunately,…*\n2. **Motivo curto:** *I already have plans.*\n3. **Alternativa:** *How about Saturday?* / *I can send it tomorrow.*\n\nUm “No” seco ou um “I can't” sem mais nada soam ríspidos em inglês.",
        details: "*I'm afraid* aqui não tem nada a ver com medo: prepara o ouvinte para uma resposta negativa (*I'm afraid not*). Em contextos formais: *Unfortunately, I am unable to attend.* / *I regret that I cannot accept.* Não precisa de justificativas longas; uma linha basta.",
        examples: [
          { en: "I'm afraid I can't make it on Friday.", pt: "Receio não poder ir na sexta." },
          { en: "Unfortunately, the room is already booked.", pt: "Infelizmente, a sala já está reservada." },
          { en: "Thanks for asking, but I'll have to pass this time.", pt: "Obrigado por perguntar, mas vou ter que recusar desta vez." },
        ],
        contrasts: [
          { wrong: "No, I can't.", right: "I'm afraid I can't. I have another meeting.", why: "Aviso + motivo suavizam a recusa." },
          { wrong: "I'd love, but I'm busy.", right: "I'd love to, but I'm busy.", why: "Mantém-se o to: I'd love to." },
        ],
      },
      guided: [
        mc("e1", "A colleague invites you to a party you can't attend. Choose the best answer.", ["I'd love to, but I'm away that weekend. Next time?", "No.", "I don't want to."], 0, "Apreço, motivo e alternativa.", { c: ["id-love-but"], s: "interaction" }),
        mc("e2", "“I'm afraid the manager is not available.” The speaker is:", ["giving bad news politely", "scared of the manager", "inviting you to wait"], 0, "I'm afraid anuncia uma má notícia.", { c: ["im-afraid"] }),
        match("e3", "Match the step to the phrase.", [["apreço", "I'd love to, but…"], ["aviso de má notícia", "I'm afraid…"], ["motivo", "I already have plans."], ["alternativa", "How about next week?"]],
          "Os passos de uma recusa educada.", { c: ["id-love-but", "im-afraid"], pt: "Associe o passo à frase." }),
      ],
      independent: [
        cloze("e4", "I'm ___ that won't be possible.", ["afraid"], "I'm afraid… anuncia a recusa.", { c: ["im-afraid"] }),
        cloze("e5", "I'd love ___, but I already have plans.", ["to"], "I'd love to, but…", { c: ["id-love-but"] }),
        cloze("e6", "___, the room is already booked.", ["Unfortunately"], "Unfortunately, + má notícia.", { c: ["im-afraid"], cue: "(infelizmente)" }),
        fix("e7", "I'd love, but I have to work late.", ["I'd love to, but I have to work late"], "Mantém-se o to.", { c: ["id-love-but"], prompt: "Fix the mistake." }),
        dict("e8", "I'm afraid I can't make it on Friday.", "I'm afraid + recusa.", { c: ["im-afraid"] }),
      ],
      application: [
        type("e9", "Refuse politely: “Infelizmente, não posso participar da reunião.”", ["Unfortunately, I can't attend the meeting", "Unfortunately, I cannot attend the meeting", "Unfortunately, I can't join the meeting", "Unfortunately, I am unable to attend the meeting", "Unfortunately I can't attend the meeting"], "Unfortunately, I can't…", { c: ["im-afraid"] }),
        dialog("e10", "Your manager asks you to work on Sunday. You can't.", [
          { npc: ["We need someone at the event on Sunday. Can you do it?", "Precisamos de alguém no evento no domingo. Você pode?"], options: [
            ["I'm afraid I can't this Sunday. It's my mother's birthday.", true, "Ela entende.", "Aviso e motivo curto."],
            ["No, I can't. Sunday is my day.", false, "O tom fica ríspido.", "Falta suavizar com I'm afraid."],
          ] },
          { npc: ["I see. That's a problem for us.", "Entendo. Isso é um problema para nós."], options: [
            ["I could cover Saturday instead, or I could come next Sunday.", true, "Ela aceita o sábado.", "Oferece uma alternativa."],
            ["Sorry. Not my problem.", false, "A relação fica abalada.", "Uma alternativa preserva a relação."],
          ] },
        ], "Recusar um pedido de um superior com educação.", { c: ["im-afraid", "id-love-but"] }),
      ],
      summary: { points: ["I'd love to, but… / I'm afraid… / Unfortunately,…", "Motivo curto.", "Ofereça uma alternativa."], concepts: ["im-afraid", "id-love-but"] },
    }),

    lesson("l4", {
      title: "Negociar",
      objective: "Você vai conseguir propor, impor condições e chegar a um acordo sensato.",
      minutes: 10,
      context: { kind: "dialogue", title: "Negotiating a deadline", lines: [
        { who: "Cliente", en: "We need the website by the end of the month.", pt: "Precisamos do site até o fim do mês." },
        { who: "Bia", en: "I'm afraid that's too soon. What if we delivered the main pages first?", pt: "Receio que seja cedo demais. E se entregássemos as páginas principais primeiro?" },
        { who: "Cliente", en: "That could work, as long as the online store is ready by the 15th.", pt: "Pode funcionar, desde que a loja online fique pronta até o dia 15." },
        { who: "Bia", en: "We can do that, provided that you send us the photos this week.", pt: "Conseguimos, contanto que vocês nos enviem as fotos esta semana." },
        { who: "Cliente", en: "That sounds sensible. Let's meet halfway.", pt: "Parece sensato. Vamos chegar a um meio-termo." },
      ] },
      explanation: {
        summary: "Negociar é trocar **propostas** e **condições**:\n- Propor: **What if we** + passado? / **How about** + -ing?\n- Condicionar: **as long as** / **provided that** + presente\n- Fechar: **Let's meet halfway.** / **That sounds sensible.**\n\nAtenção: **sensible** = sensato. “Sensível” é **sensitive**.",
        details: "*What if we delivered…?* usa o passado para soar como hipótese, não como exigência. *As long as* e *provided that* têm o mesmo sentido; o segundo é mais formal. Depois deles, usa-se o presente mesmo falando do futuro: *as long as you send*, não “will send”.",
        examples: [
          { en: "How about meeting on Thursday instead?", pt: "Que tal nos reunirmos na quinta, em vez disso?" },
          { en: "You can borrow the car as long as you bring it back by six.", pt: "Você pode pegar o carro desde que devolva até as seis." },
          { en: "She's very sensitive to criticism.", pt: "Ela é muito sensível a críticas." },
        ],
        contrasts: [
          { wrong: "It was a sensible moment for the family. (= sensível)", right: "It was a sensitive moment for the family.", why: "Sensível = sensitive." },
          { wrong: "I'll do it as long as you will pay today.", right: "I'll do it as long as you pay today.", why: "Depois de as long as: presente." },
        ],
      },
      guided: [
        mc("e1", "“That's a sensible plan.” What does it mean?", ["É um plano sensato.", "É um plano sensível.", "É um plano secreto."], 0, "Sensible = sensato.", { c: ["sensible"], s: "vocabulary" }),
        match("e2", "Match the phrase to its role in a negotiation.", [["What if we…?", "fazer uma proposta"], ["as long as…", "impor uma condição"], ["I'm afraid that's too soon.", "recusar uma oferta"], ["Let's meet halfway.", "buscar um meio-termo"]],
          "Proposta, condição, recusa e acordo.", { c: ["what-if-we", "as-long-as"], pt: "Associe a frase ao papel na negociação." }),
        cloze("e3", "What ___ we delivered the main pages first?", ["if"], "What if we + passado?", { c: ["what-if-we"] }),
      ],
      independent: [
        cloze("e4", "That could work, as ___ as the store is ready by the 15th.", ["long"], "As long as = desde que.", { c: ["as-long-as"] }),
        cloze("e5", "My skin is very ___; I can't use that soap.", ["sensitive"], "Sensível = sensitive.", { c: ["sensible"], s: "vocabulary", cue: "(sensível)", t: [["sensible", "Sensible é “sensato”. Sensível é sensitive."]] }),
        fix("e6", "I'll sign the contract as long as you will reduce the price.", ["I'll sign the contract as long as you reduce the price", "I will sign the contract as long as you reduce the price"], "Depois de as long as: presente.", { c: ["as-long-as"], prompt: "Fix the mistake." }),
        dict("e7", "What if we split the cost?", "Proposta com What if we…?", { c: ["what-if-we"] }),
        order("e8", "Put the words in order: “Que tal nos reunirmos na quinta?”", "How about meeting on Thursday?", "How about + verbo-ing?", { c: ["what-if-we"], extra: ["to"] }),
      ],
      application: [
        type("e9", "Accept with a condition: “Posso trabalhar no sábado, desde que eu folgue na segunda.”", ["I can work on Saturday as long as I get Monday off", "I can work on Saturday as long as I have Monday off", "I can work on Saturday provided that I get Monday off", "I can work on Saturday, as long as I get Monday off", "I can work on Saturday as long as I take Monday off"], "As long as + presente.", { c: ["as-long-as"] }),
        type("e10", "Praise a decision: “Foi uma decisão sensata.”", ["It was a sensible decision", "That was a sensible decision"], "Sensato = sensible.", { c: ["sensible"] }),
        dialog("e11", "You are negotiating the price of a used car.", [
          { npc: ["The price is eight thousand. It's a fair price.", "O preço é oito mil. É um preço justo."], options: [
            ["I'm afraid that's above my budget. What if we agreed on seven thousand?", true, "O vendedor pensa.", "Recusa suave e contraproposta."],
            ["Too expensive. Seven thousand or nothing.", false, "O vendedor se fecha.", "Ultimato não é negociação."],
          ] },
          { npc: ["Seven is too low. I could do seven and a half.", "Sete é pouco. Eu poderia fazer sete e meio."], options: [
            ["That sounds sensible, as long as you include the new tires.", true, "Ele aceita: “Deal.”", "Aceita com condição."],
            ["That sounds sensitive, as long as you will include the tires.", false, "Há dois erros.", "Sensible; as long as you include."],
          ] },
        ], "Negociar: recusar, propor e condicionar.", { c: ["what-if-we", "as-long-as", "sensible"] }),
      ],
      summary: { points: ["What if we + passado? / How about + -ing?", "as long as / provided that + presente.", "sensible = sensato; sensitive = sensível."], concepts: ["what-if-we", "as-long-as", "sensible"] },
    }),
  ],

  checkpoint: {
    intro: "New requests, refusals and negotiations. Choose the right register for each person and situation.",
    a: [
      mc("q1", "You write to a hotel to complain. Choose the best opening.", ["Dear Sir or Madam, I am writing to complain about my stay.", "Hey guys, your hotel is awful.", "Yo, I want my money."], 0, "Reclamação formal: Dear Sir or Madam, I am writing to…", { c: ["register"] }),
      type("q2", "Make it formal: “I need to find out the price.” (use discover)", ["I need to discover the price", "I would like to discover the price"], "Find out → discover.", { c: ["formal-verbs"] }),
      fix("q3", "We look forward to receive your reply.", ["We look forward to receiving your reply"], "Look forward to + -ing.", { c: ["look-forward"], prompt: "Fix the mistake." }),
      cloze("q4", "Would you mind ___ me your email address again?", ["giving", "sending", "telling"], "Mind + verbo-ing.", { c: ["would-you-mind"], cue: "(give)" }),
      order("q5", "Put the words in order: “Eu queria saber se você poderia me emprestar seu carro.”", "I was wondering if you could lend me your car.", "I was wondering if + sujeito + could.", { c: ["wondering-if"] }),
      dict("q6", "I'm afraid the director is out of the office today.", "I'm afraid anuncia a má notícia.", { c: ["im-afraid"] }),
      cloze("q7", "“Do you want to come to the beach on Sunday?” “I'd love ___, but I have to study.”", ["to"], "I'd love to, but…", { c: ["id-love-but"] }),
      cloze("q8", "You can use my laptop as long ___ you don't install anything.", ["as"], "As long as + presente.", { c: ["as-long-as"] }),
      mc("q9", "“Be careful what you say; he is very sensitive.” He is:", ["sensível", "sensato", "sensacional"], 0, "Sensitive = sensível.", { c: ["sensible"], s: "vocabulary" }),
      listen("q10", "The price is a little high for us. What if we ordered two hundred units instead of one hundred? Could you give us a discount then?", "What does the speaker propose?", ["A bigger order in exchange for a discount", "A smaller order", "Cancelling the order"], 0, "What if we ordered two hundred units…?", { c: ["what-if-we"] }),
    ],
    b: [
      mc("q1", "You text a close friend to cancel lunch. Choose the best message.", ["Hi! Sorry, can we put off lunch? Something came up.", "Dear Friend, I regret to inform you that I must postpone.", "I hereby request a new date."], 0, "Com um amigo: informal e direto.", { c: ["register"] }),
      cloze("q2", "Due to the storm, the airline had to ___ all flights until Monday.", ["postpone", "delay"], "Registro formal: postpone.", { c: ["formal-verbs"], cue: "(put off)" }),
      dict("q3", "I look forward to working with you.", "Look forward to + -ing.", { c: ["look-forward"] }),
      fix("q4", "Would you mind to wait outside for a moment?", ["Would you mind waiting outside for a moment"], "Mind + verbo-ing.", { c: ["would-you-mind"], prompt: "Fix the mistake." }),
      fix("q5", "I was wondering if could I pay next week.", ["I was wondering if I could pay next week"], "Depois de if: sujeito + could.", { c: ["wondering-if"], prompt: "Fix the word order." }),
      type("q6", "Give bad news politely: “Receio que não tenhamos mais ingressos.”", ["I'm afraid we don't have any more tickets", "I'm afraid we have no more tickets", "I'm afraid we don't have any tickets left", "I'm afraid we have no tickets left", "I am afraid we have no more tickets"], "I'm afraid + má notícia.", { c: ["im-afraid"] }),
      mc("q7", "Choose the most polite refusal.", ["I'd love to, but I'm working that night. Maybe next week?", "No way.", "I don't feel like it."], 0, "Apreço, motivo e alternativa.", { c: ["id-love-but"], s: "interaction" }),
      order("q8", "Put the words in order: “E se dividíssemos a conta?”", "What if we split the bill?", "What if we + passado?", { c: ["what-if-we"] }),
      cloze("q9", "Buying a cheaper car was a ___ choice. You saved a lot of money.", ["sensible", "wise", "smart"], "Sensato = sensible.", { c: ["sensible"], s: "vocabulary", cue: "(sensata)", t: [["sensitive", "Sensitive é “sensível”. Sensato é sensible."]] }),
      listen("q10", "We can extend the contract for another year, provided that the monthly fee stays the same.", "What is the condition?", ["The fee must not change", "The contract must be shorter", "The fee must go up"], 0, "Provided that the monthly fee stays the same.", { c: ["as-long-as"] }),
    ],
    production: write("t1", "Write a formal email of about 90 words to a supplier or landlord: explain a problem, make a delicate request, refuse one thing politely and propose a compromise with a condition.",
      { mode: "free", min: 75, check: ["Abri com Dear … e fechei com uma fórmula formal.", "Fiz o pedido com I was wondering if ou Would you mind.", "Recusei algo com I'm afraid ou Unfortunately.", "Propus um meio-termo com as long as ou provided that.", "Não usei contrações nem phrasal verbs informais."],
        model: "Dear Mr. Almeida, I am writing about the rent increase you proposed last week. Unfortunately, I am unable to accept an increase of twenty percent, as my salary has not changed this year. I was wondering if you could consider a smaller increase. I would be happy to sign a two-year contract, provided that the increase is limited to eight percent. I believe this would be a sensible solution for both of us. I look forward to hearing from you. Kind regards, Marina Lopes", c: ["register", "wondering-if", "im-afraid", "as-long-as", "look-forward"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "E-mail a uma fornecedora",
      goal: "Ler um e-mail formal e identificar o pedido, a justificativa e a contrapartida.",
      context: { kind: "message", title: "Email to a supplier", lines: [
        { en: "Dear Ms. Carter, I am writing to request a change to our delivery schedule.", pt: "Prezada Sra. Carter, escrevo para solicitar uma alteração em nosso cronograma de entregas." },
        { en: "I was wondering if you could postpone the next delivery by one week. Unfortunately, our warehouse will be closed for repairs.", pt: "Gostaria de saber se seria possível adiar a próxima entrega em uma semana. Infelizmente, nosso depósito estará fechado para reparos." },
        { en: "We would be happy to accept a larger order in March, as long as the price remains the same.", pt: "Teremos prazer em aceitar um pedido maior em março, desde que o preço permaneça o mesmo." },
        { en: "I believe this is a sensible solution for both companies. I look forward to hearing from you. Kind regards, Daniel Rocha", pt: "Acredito que esta seja uma solução sensata para as duas empresas. Aguardo seu retorno. Atenciosamente, Daniel Rocha" },
      ] },
      exercises: [
        rd("r1", PASSAGE, "What is Daniel asking for?", ["A one-week delay in the delivery", "A lower price", "A new supplier"], 0, "Postpone the next delivery by one week.", { c: ["formal-verbs"] }),
        rd("r2", PASSAGE, "Why does he need it?", ["The warehouse will be closed for repairs.", "The company has no money.", "The order was wrong."], 0, "Our warehouse will be closed for repairs.", { c: ["im-afraid"] }),
        rd("r3", PASSAGE, "What does he offer in exchange, and on what condition?", ["A larger order in March, if the price stays the same", "A higher price in March", "A smaller order, if delivery is faster"], 0, "A larger order… as long as the price remains the same.", { c: ["as-long-as"] }),
        cloze("r4", "I believe this is a ___ solution for both companies.", ["sensible"], "Sensato = sensible.", { c: ["sensible"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Formal ou informal?",
      goal: "Identificar o registro e a intenção de quem fala.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "Would you mind turning down the music? I'd love to, but my roommate is having a party. I was wondering if you could ask him, then. I'm afraid he never listens to me.", pt: "Você se importaria de abaixar a música? Eu adoraria, mas meu colega de apartamento está dando uma festa. Eu queria saber se você poderia pedir a ele, então. Receio que ele nunca me escute." }] },
      exercises: [
        listen("a1", "Would you mind turning down the music?", "What does the speaker want?", ["Less noise", "More music", "To join the party"], 0, "Turning down the music = abaixar a música.", { c: ["would-you-mind"] }),
        listen("a2", ["I was wondering if you could ask him, then.", "I'm afraid he never listens to me."], "What is the answer to the request?", ["A polite no", "A clear yes", "A new question"], 0, "I'm afraid… anuncia a recusa.", { c: ["im-afraid"] }),
        dict("a3", "I was wondering if you could ask him.", "I was wondering if + sujeito + could.", { c: ["wondering-if"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "De informal para formal",
      goal: "Reescrever uma mensagem informal em registro formal.",
      exercises: [
        write("w1", "Rewrite this message for a client you don't know (about 50 words): “Hi! Sorry, can't make the meeting tomorrow. Can we put it off till Thursday? Also, send me the contract pls. Thanks!”",
          { mode: "free", min: 40, check: ["Usei Dear … e um fecho formal.", "Troquei put off por postpone.", "Recusei com Unfortunately ou I'm afraid.", "Pedi o contrato com Would you mind ou I was wondering if.", "Não usei contrações nem abreviações."], model: "Dear Mr. Ferreira, Unfortunately, I am unable to attend the meeting tomorrow. I was wondering if we could postpone it until Thursday. Would you mind sending me a copy of the contract in the meantime? I apologize for the inconvenience and I look forward to hearing from you. Kind regards, Julia Prado", c: ["register", "formal-verbs", "wondering-if", "look-forward"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Dois tons",
      goal: "Fazer o mesmo pedido em voz alta para duas pessoas diferentes.",
      exercises: [
        speak("s1", "You need to change a meeting time. Say it first to a friend, then to an important client. Change your words and your tone.", ["Hey, can we move our lunch to two? Something came up. Good morning, Ms. Park. I was wondering if we could move our meeting to two o'clock. I'm afraid I have another appointment at one."],
          { mode: "respond", check: ["A primeira versão soou informal e direta.", "A segunda usou I was wondering if ou Would you mind.", "Justifiquei com I'm afraid ou Unfortunately.", "Mudei o tom de voz entre as duas."], c: ["register", "wondering-if", "im-afraid"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: negociar um prazo",
      goal: "Negociar um prazo com um cliente: recusar, propor, condicionar e fechar.",
      exercises: [
        dialog("m1", "A client wants a translation of 80 pages in two days.", [
          { npc: ["We need the full translation by Wednesday.", "Precisamos da tradução completa até quarta-feira."], options: [
            ["I'm afraid that won't be possible. It's eighty pages, and quality matters.", true, "O cliente pergunta o que é possível.", "Recusa suave com motivo."],
            ["Impossible. Forget it.", false, "O cliente se irrita.", "Sem suavização nem alternativa."],
          ] },
          { npc: ["What can you do, then?", "O que você consegue fazer, então?"], options: [
            ["What if we delivered the first forty pages on Wednesday and the rest on Friday?", true, "O cliente considera.", "Proposta com What if we + passado."],
            ["What if we will deliver forty pages Wednesday?", false, "A estrutura está errada.", "What if we delivered…?"],
          ] },
          { npc: ["That could work. But the price stays the same?", "Pode funcionar. Mas o preço continua o mesmo?"], options: [
            ["Yes, as long as you send us the final text today. That seems sensible for both sides.", true, "Ele confirma: “Agreed.”", "Condição e fechamento."],
            ["Yes, as long as you will send. It's sensitive.", false, "Há dois erros.", "As long as you send; sensible."],
          ] },
        ], "Negociação de prazo: recusar, propor e condicionar.", { c: ["im-afraid", "what-if-we", "as-long-as", "sensible"] }),
        type("m2", "Close the email. Write: “Aguardo seu retorno.”", ["I look forward to hearing from you", "I look forward to your reply", "Looking forward to hearing from you"], "I look forward to hearing from you.", { c: ["look-forward"] }),
      ],
      outside: {
        title: "Fora do app: um e-mail de verdade",
        instructions: "Pegue uma mensagem real que você escreveu em português para pedir algo (ao trabalho, a uma loja, ao condomínio). Reescreva-a em inglês formal: saudação, pedido indireto, motivo curto, alternativa ou condição e fecho. Depois, leia em voz alta e confira: há alguma contração ou phrasal verb informal?",
        checklist: ["Usei Dear … e um fecho formal.", "Fiz o pedido de forma indireta.", "Incluí uma condição ou alternativa.", "Revisei contrações e verbos informais."],
      },
    }),
  },
});
