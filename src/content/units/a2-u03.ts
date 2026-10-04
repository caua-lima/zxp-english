/** A2 · Unidade 3 — Viagens e imprevistos: transporte, hospedagem e resolução de problemas. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a2-u03",

  concepts: [
    concept("ticket-to", "phrase", "a ticket to …", "uma passagem para …", "l1", ["I'd like a ticket to Boston, please.", "Eu queria uma passagem para Boston, por favor."]),
    concept("one-way-return", "word", "one-way / round-trip", "só ida / ida e volta", "l1", ["One-way or round-trip?", "Só ida ou ida e volta?"], { note: "No inglês britânico: single / return." }),
    concept("leave-arrive", "word", "leave / arrive", "sair, partir / chegar", "l1", ["The train leaves at nine and arrives at eleven.", "O trem sai às nove e chega às onze."]),
    concept("get-on-off", "phrase", "get on / get off", "embarcar / desembarcar", "l1", ["Get off at the next stop.", "Desça na próxima parada."], { tags: ["phrasal-verb"] }),
    concept("reservation", "phrase", "I have a reservation.", "Eu tenho uma reserva.", "l2", ["I have a reservation under the name Lima.", "Tenho uma reserva em nome de Lima."]),
    concept("check-in-out", "phrase", "check in / check out", "fazer o check-in / check-out", "l2", ["What time is check-out?", "A que horas é o check-out?"], { tags: ["phrasal-verb"] }),
    concept("included", "phrase", "Is breakfast included?", "O café da manhã está incluído?", "l2", ["Is Wi-Fi included?", "O Wi-Fi está incluído?"]),
    concept("could-i", "phrase", "Could I …, please?", "Eu poderia …, por favor?", "l3", ["Could I have another towel, please?", "Eu poderia ter outra toalha, por favor?"]),
    concept("would-you-mind", "phrase", "Would you mind …-ing?", "Você se importaria de …?", "l3", ["Would you mind closing the window?", "Você se importaria de fechar a janela?"], { note: "Depois de mind, o verbo vai para o -ing." }),
    concept("problem-with", "phrase", "There's a problem with …", "Há um problema com …", "l4", ["There's a problem with my room.", "Há um problema com o meu quarto."]),
    concept("doesnt-work", "phrase", "It doesn't work.", "Não funciona.", "l4", ["The shower doesn't work.", "O chuveiro não funciona."]),
    concept("pick-up", "phrase", "pick up", "buscar, pegar", "l4", ["Where can I pick up my bag?", "Onde posso pegar minha mala?"], { tags: ["phrasal-verb"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Uma passagem, por favor",
      objective: "Você vai conseguir comprar uma passagem e entender horários de partida e chegada.",
      minutes: 9,
      context: { kind: "dialogue", title: "No guichê da estação", lines: [
        { who: "Ana", en: "Hi. I'd like a ticket to Boston, please.", pt: "Oi. Eu queria uma passagem para Boston, por favor." },
        { who: "Atendente", en: "One-way or round-trip?", pt: "Só ida ou ida e volta?" },
        { who: "Ana", en: "Round-trip, please. What time does the next train leave?", pt: "Ida e volta, por favor. A que horas sai o próximo trem?" },
        { who: "Atendente", en: "It leaves at 9:15 from platform four and arrives at 11:30.", pt: "Sai às 9h15 da plataforma quatro e chega às 11h30." },
        { who: "Ana", en: "Where do I get off for the city center?", pt: "Onde eu desço para o centro?" },
        { who: "Atendente", en: "Get off at South Station.", pt: "Desça na South Station." },
      ] },
      explanation: {
        summary: "Para comprar: **I'd like a ticket to Boston, please.** O atendente pergunta **One-way or round-trip?** (só ida ou ida e volta).\n\nHorários: **What time does the train leave?** → **It leaves at 9:15 and arrives at 11:30.**\n\nDois phrasal verbs de transporte: **get on** (embarcar) e **get off** (desembarcar).",
        details: "Para ônibus, trem, metrô e avião usa-se **get on / get off**. Para carro e táxi, **get in / get out of**. Horários fixos usam o presente simples mesmo falando do futuro: *The bus leaves at six.*",
        examples: [
          { en: "A round-trip ticket to Chicago, please.", pt: "Uma passagem de ida e volta para Chicago, por favor." },
          { en: "The bus leaves at six.", pt: "O ônibus sai às seis." },
          { en: "We get off at the next stop.", pt: "Nós descemos na próxima parada." },
        ],
        contrasts: [
          { wrong: "A ticket for Boston.", right: "A ticket to Boston.", why: "Destino usa to." },
          { wrong: "What time leaves the train?", right: "What time does the train leave?", why: "A pergunta precisa de does." },
        ],
      },
      guided: [
        mc("e1", "The clerk asks “One-way or round-trip?”. What is the question about?", ["Só ida ou ida e volta", "Janela ou corredor", "Dinheiro ou cartão"], 0, "One-way = só ida; round-trip = ida e volta.", { c: ["one-way-return"], s: "vocabulary", pt: "Sobre o que é a pergunta do atendente?" }),
        match("e2", "Associe a expressão ao significado.", [["leave", "sair, partir"], ["arrive", "chegar"], ["get on", "embarcar"], ["get off", "desembarcar"], ["platform", "plataforma"]],
          "O vocabulário mínimo de uma estação.", { c: ["leave-arrive", "get-on-off"] }),
        cloze("e3", "I'd like a ticket ___ Miami, please.", ["to"], "Destino usa to.", { c: ["ticket-to"] }),
      ],
      independent: [
        cloze("e4", "The train ___ at nine and arrives at eleven.", ["leaves"], "Sair = leave; com the train: leaves.", { c: ["leave-arrive"], cue: "(leave)" }),
        cloze("e5", "You get ___ at the next stop.", ["off"], "Get off = desembarcar.", { c: ["get-on-off"], s: "vocabulary", tr: "Você desce na próxima parada." }),
        order("e6", "Put the words in order: “A que horas o ônibus sai?”", "What time does the bus leave?", "What time + does + sujeito + leave.", { c: ["leave-arrive"], extra: ["leaves"] }),
        dict("e7", "A round-trip ticket to Boston, please.", "Round-trip = ida e volta.", { c: ["one-way-return", "ticket-to"] }),
        fix("e8", "What time arrives the train?", ["What time does the train arrive"], "Pergunta com does + verbo básico.", { c: ["leave-arrive"], prompt: "Corrija a pergunta." }),
      ],
      application: [
        type("e9", "Ask for a one-way ticket to Lima.", ["I'd like a one-way ticket to Lima, please", "I would like a one-way ticket to Lima, please", "A one-way ticket to Lima, please", "Can I have a one-way ticket to Lima, please", "I'd like a one-way ticket to Lima"], "I'd like a one-way ticket to Lima, please.", { c: ["ticket-to", "one-way-return"], pt: "Peça uma passagem só de ida para Lima." }),
        speak("e10", "Compre uma passagem em voz alta e pergunte o horário.", ["I'd like a round-trip ticket to Boston, please. What time does the train leave?"],
          { check: ["Usei I'd like e please.", "Disse one-way ou round-trip.", "Perguntei o horário com does."], c: ["ticket-to", "leave-arrive"] }),
      ],
      summary: { points: ["A ticket to + destino; one-way ou round-trip.", "What time does it leave / arrive?", "get on / get off."], concepts: ["ticket-to", "one-way-return", "leave-arrive", "get-on-off"] },
    }),

    lesson("l2", {
      title: "Chegando ao hotel",
      objective: "Você vai conseguir fazer o check-in e tirar dúvidas sobre a hospedagem.",
      minutes: 9,
      context: { kind: "dialogue", title: "Na recepção", lines: [
        { who: "Leo", en: "Good evening. I have a reservation under the name Lima.", pt: "Boa noite. Tenho uma reserva em nome de Lima." },
        { who: "Recepcionista", en: "Welcome, Mr. Lima. Two nights, right?", pt: "Bem-vindo, Sr. Lima. Duas noites, certo?" },
        { who: "Leo", en: "Yes. Is breakfast included?", pt: "Sim. O café da manhã está incluído?" },
        { who: "Recepcionista", en: "Yes, it is. It's from seven to ten.", pt: "Está. É das sete às dez." },
        { who: "Leo", en: "Great. And what time is check-out?", pt: "Ótimo. E a que horas é o check-out?" },
        { who: "Recepcionista", en: "At noon. Here is your key.", pt: "Ao meio-dia. Aqui está a sua chave." },
      ] },
      explanation: {
        summary: "No hotel:\n- **I have a reservation under the name …** (tenho uma reserva em nome de…)\n- **Is breakfast included?** (está incluído?)\n- **What time is check-out?**\n\n**Check in** e **check out** são verbos: *I'd like to check in.* Como substantivos, levam hífen: *check-in, check-out*.",
        details: "Outras perguntas úteis: *Is there Wi-Fi in the room?*, *Can I leave my bags here?*, *Do you have a room for tonight?* O recepcionista pode pedir: *Can I see your passport, please?*",
        examples: [
          { en: "I'd like to check in, please.", pt: "Eu queria fazer o check-in, por favor." },
          { en: "Is Wi-Fi included?", pt: "O Wi-Fi está incluído?" },
          { en: "We check out tomorrow at noon.", pt: "Fazemos o check-out amanhã ao meio-dia." },
        ],
        contrasts: [
          { wrong: "I have a reserve.", right: "I have a reservation.", why: "Reserva de hotel é reservation." },
          { wrong: "The breakfast is include?", right: "Is breakfast included?", why: "Pergunta com is na frente, e included com -ed." },
        ],
      },
      guided: [
        mc("e1", "You arrive at the hotel. What do you say first?", ["I have a reservation under the name Costa.", "I have a reserve of Costa.", "What time is check-out?"], 0, "Primeiro você informa a reserva e o nome.", { c: ["reservation"], pt: "Você chega ao hotel. O que diz primeiro?" }),
        match("e2", "Associe a frase ao significado.", [["I'd like to check in.", "Quero fazer o check-in."], ["What time is check-out?", "A que horas é a saída?"], ["Is breakfast included?", "O café está incluído?"], ["Here is your key.", "Aqui está a sua chave."]],
          "As quatro frases mais ouvidas numa recepção.", { c: ["check-in-out", "included"] }),
        listen("e3", "Breakfast is from seven to ten.", "When is breakfast?", ["Das 7h às 10h", "Das 7h às 12h", "Das 6h às 10h"], 0, "From seven to ten.", { c: ["included"], keepOrder: true, pt: "Quando é o café da manhã?" }),
      ],
      independent: [
        cloze("e4", "I have a ___ under the name Lima.", ["reservation"], "Reserva de hotel = reservation.", { c: ["reservation"], s: "vocabulary", t: [["reserve", "Para hotel e restaurante, a palavra é reservation."]] }),
        cloze("e5", "Is breakfast ___?", ["included"], "Included = incluído.", { c: ["included"], s: "vocabulary" }),
        order("e6", "Put the words in order: “A que horas é o check-out?”", "What time is check-out?", "What time + is + check-out.", { c: ["check-in-out"], extra: ["does"] }),
        dict("e7", "I'd like to check in, please.", "Check in como verbo, depois de would like to.", { c: ["check-in-out"], alt: ["I would like to check in, please."] }),
      ],
      application: [
        type("e8", "Ask if Wi-Fi is included.", ["Is Wi-Fi included", "Is wifi included", "Is the Wi-Fi included", "Is the wifi included"], "Is + coisa + included?", { c: ["included"], pt: "Pergunte se o Wi-Fi está incluído." }),
        dialog("e9", "You arrive at a hotel late at night.", [
          { npc: ["Good evening. Can I help you?", "Boa noite. Posso ajudar?"], options: [
            ["Good evening. I have a reservation under the name Souza.", true, "Ela encontra a reserva.", "Informou a reserva e o nome."],
            ["Good night. I want a room.", false, "Ela estranha o cumprimento e procura quartos livres.", "Good night é despedida; e você já tem reserva."],
          ] },
          { npc: ["Yes, here it is. One night. Can I see your passport?", "Sim, aqui está. Uma noite. Posso ver seu passaporte?"], options: [
            ["Sure, here you are. What time is check-out?", true, "Ela responde: “At eleven.”", "Entregou e fez uma pergunta útil."],
            ["Yes, I have.", false, "Ela espera você entregar.", "Here you are é o que se diz ao entregar algo."],
          ] },
        ], "Check-in: reserva, documento e perguntas.", { c: ["reservation", "check-in-out"] }),
      ],
      summary: { points: ["I have a reservation under the name…", "Is breakfast included?", "check in / check out; What time is check-out?"], concepts: ["reservation", "check-in-out", "included"] },
    }),

    lesson("l3", {
      title: "Pedidos delicados",
      objective: "Você vai conseguir pedir algo para você e pedir que alguém faça algo, com educação.",
      minutes: 9,
      context: { kind: "dialogue", title: "No avião", lines: [
        { who: "Bia", en: "Excuse me, could I have some water, please?", pt: "Com licença, eu poderia tomar um pouco de água, por favor?" },
        { who: "Comissário", en: "Of course. Here you are.", pt: "Claro. Aqui está." },
        { who: "Bia", en: "Thank you. Would you mind closing the window? It's very bright.", pt: "Obrigada. Você se importaria de fechar a janela? Está muito claro." },
        { who: "Passageiro", en: "No, not at all.", pt: "Não, de jeito nenhum." },
      ] },
      explanation: {
        summary: "Dois pedidos diferentes:\n- Para **você** fazer ou receber algo: **Could I have…?** / **Could I leave my bag here?**\n- Para **a outra pessoa** fazer algo: **Would you mind closing the window?**\n\nDepois de **mind**, o verbo vai para o **-ing**.",
        details: "Atenção à resposta a *Would you mind…?*: a pergunta é “você se importa?”, então quem aceita responde **No, not at all** ou **Not at all** (não me importo). Responder “Yes” significaria que a pessoa se importa.",
        examples: [
          { en: "Could I have the bill, please?", pt: "Eu poderia receber a conta, por favor?" },
          { en: "Could I leave my bags here?", pt: "Eu poderia deixar minhas malas aqui?" },
          { en: "Would you mind speaking more slowly?", pt: "Você se importaria de falar mais devagar?" },
        ],
        contrasts: [
          { wrong: "Would you mind to close the door?", right: "Would you mind closing the door?", why: "Depois de mind, verbo com -ing." },
          { wrong: "— Would you mind helping me? — Yes.", right: "— Would you mind helping me? — Not at all.", why: "“Yes” significa que a pessoa se importa. Para aceitar: Not at all." },
        ],
      },
      guided: [
        mc("e1", "Someone asks “Would you mind opening the door?”. You are happy to help. What do you say?", ["Not at all.", "Yes, I mind.", "Yes, I would."], 0, "Not at all = não me importo, posso fazer.", { c: ["would-you-mind"], pt: "Alguém pede e você quer ajudar. O que responde?" }),
        match("e2", "Associe o pedido a quem faz a ação.", [["Could I have some water?", "eu recebo algo"], ["Would you mind waiting?", "a outra pessoa espera"], ["Could I sit here?", "eu faço algo"], ["Would you mind helping me?", "a outra pessoa ajuda"]],
          "Could I…? é sobre você; Would you mind…? é sobre o outro.", { c: ["could-i", "would-you-mind"] }),
        cloze("e3", "Would you mind ___ the window?", ["closing"], "Depois de mind: -ing.", { c: ["would-you-mind"], cue: "(close)" }),
      ],
      independent: [
        cloze("e4", "___ I have the bill, please?", ["Could", "Can"], "Could I have…? é o pedido educado.", { c: ["could-i"] }),
        order("e5", "Put the words in order: “Eu poderia deixar minha mala aqui?”", "Could I leave my bag here?", "Could I + verbo.", { c: ["could-i"], extra: ["to"] }),
        fix("e6", "Would you mind to wait a moment?", ["Would you mind waiting a moment"], "Depois de mind: waiting.", { c: ["would-you-mind"], prompt: "Corrija o erro." }),
        dict("e7", "Could I have another towel, please?", "Could I have + coisa + please.", { c: ["could-i"] }),
      ],
      application: [
        type("e8", "Ask a stranger, politely, to speak more slowly. Start with “Would you mind”.", ["Would you mind speaking more slowly", "Would you mind speaking more slowly, please", "Would you mind speaking slowly", "Would you mind speaking slowly, please"], "Would you mind + speaking…?", { c: ["would-you-mind"], pt: "Peça a um desconhecido que fale mais devagar. Comece com Would you mind." }),
        speak("e9", "Faça dois pedidos educados em voz alta.", ["Could I have some water, please? Would you mind closing the door?"],
          { check: ["Usei Could I para algo que eu quero.", "Usei -ing depois de mind.", "Subi a voz no final dos pedidos."], c: ["could-i", "would-you-mind"] }),
      ],
      summary: { points: ["Could I have / leave / sit…?", "Would you mind + verbo-ing?", "Para aceitar: Not at all."], concepts: ["could-i", "would-you-mind"] },
    }),

    lesson("l4", {
      title: "Deu problema",
      objective: "Você vai conseguir explicar um problema em uma viagem e pedir uma solução.",
      minutes: 9,
      context: { kind: "dialogue", title: "Ligando para a recepção", lines: [
        { who: "Leo", en: "Hello, this is room 204. There's a problem with my room.", pt: "Alô, aqui é do quarto 204. Há um problema com o meu quarto." },
        { who: "Recepcionista", en: "I'm sorry to hear that. What's the problem?", pt: "Sinto muito. Qual é o problema?" },
        { who: "Leo", en: "The air conditioning doesn't work, and there are no towels.", pt: "O ar-condicionado não funciona, e não há toalhas." },
        { who: "Recepcionista", en: "I'll send someone right away. Could you wait ten minutes?", pt: "Vou mandar alguém agora mesmo. O senhor poderia esperar dez minutos?" },
        { who: "Leo", en: "Sure. Also, where can I pick up my bag? I left it at the front desk.", pt: "Claro. Além disso, onde posso pegar minha mala? Deixei na recepção." },
      ] },
      explanation: {
        summary: "Para reclamar com educação:\n1. Anuncie: **There's a problem with my room.**\n2. Explique: **The shower doesn't work.** / **There are no towels.**\n3. Peça: **Could you send someone?** / **Could I change rooms?**\n\n**Pick up** = buscar, pegar: *Where can I pick up my bag?*",
        details: "Frases para outras situações: *My flight was canceled* (meu voo foi cancelado), *I missed my bus* (perdi o ônibus), *My bag didn't arrive* (minha mala não chegou). Um falso cognato comum em formulários de viagem e trabalho: **resume** significa “retomar”; “resumo” é **summary**.",
        examples: [
          { en: "There's a problem with the key.", pt: "Há um problema com a chave." },
          { en: "The Wi-Fi doesn't work.", pt: "O Wi-Fi não funciona." },
          { en: "Could I change rooms, please?", pt: "Eu poderia trocar de quarto, por favor?" },
        ],
        contrasts: [
          { wrong: "The shower is not working good.", right: "The shower doesn't work.", why: "A forma simples e natural é doesn't work." },
          { wrong: "I have a problem in my room.", right: "There's a problem with my room.", why: "Problem with + a coisa que tem o problema." },
        ],
      },
      guided: [
        mc("e1", "How do you start a polite complaint?", ["There's a problem with my room.", "Your hotel is terrible.", "I want my money."], 0, "Comece anunciando o problema, sem atacar.", { c: ["problem-with"], pt: "Como começar uma reclamação educada?" }),
        match("e2", "Associe a frase ao significado.", [["It doesn't work.", "Não funciona."], ["There are no towels.", "Não há toalhas."], ["Could you send someone?", "Poderia mandar alguém?"], ["Where can I pick up my bag?", "Onde posso pegar minha mala?"]],
          "Descrever o problema e pedir a solução.", { c: ["doesnt-work", "pick-up"] }),
        cloze("e3", "There's a problem ___ the key.", ["with"], "Problem with + coisa.", { c: ["problem-with"] }),
      ],
      independent: [
        cloze("e4", "The shower doesn't ___.", ["work"], "Doesn't work = não funciona.", { c: ["doesnt-work"], s: "vocabulary" }),
        cloze("e5", "Where can I pick ___ my ticket?", ["up"], "Pick up = buscar.", { c: ["pick-up"], s: "vocabulary" }),
        order("e6", "Put the words in order: “Há um problema com o meu quarto.”", "There's a problem with my room.", "There's a problem with + coisa.", { c: ["problem-with"], extra: ["in"] }),
        dict("e7", "The air conditioning doesn't work.", "Doesn't work para qualquer aparelho.", { c: ["doesnt-work"], alt: ["The air conditioning does not work."] }),
        fix("e8", "Where I can pick up my bag?", ["Where can I pick up my bag"], "Na pergunta, can vem antes do sujeito.", { c: ["pick-up"], prompt: "Corrija a pergunta." }),
      ],
      application: [
        dialog("e9", "The TV and the Wi-Fi in your hotel room are not working.", [
          { npc: ["Front desk. How can I help you?", "Recepção. Como posso ajudar?"], options: [
            ["Hi. There's a problem with my room. The Wi-Fi doesn't work.", true, "O atendente pede o número do quarto.", "Anunciou e explicou o problema."],
            ["Your Wi-Fi is bad. Fix it.", false, "O atendente ajuda, mas fica na defensiva.", "Agressivo demais: descreva o problema."],
          ] },
          { npc: ["I'm sorry. I can send someone in an hour.", "Sinto muito. Posso mandar alguém em uma hora."], options: [
            ["Would you mind sending someone sooner? I need to work.", true, "Ele responde: “I'll try. Ten minutes.”", "Pedido educado e com motivo."],
            ["No. Now.", false, "A conversa fica tensa.", "Explique por que precisa e peça com educação."],
          ] },
        ], "Reclamar com educação: anunciar, explicar e pedir.", { c: ["problem-with", "doesnt-work", "would-you-mind"] }),
        write("e10", "Escreva uma mensagem curta para a recepção relatando um problema e pedindo uma solução.",
          { frame: ["Hello, this is room …", "There's a problem with …", "Could you …?"], min: 16, check: ["Identifiquei o quarto.", "Descrevi o problema com doesn't work ou there is/are no.", "Pedi uma solução com Could you ou Would you mind."], model: "Hello, this is room 310. There's a problem with the shower. It doesn't work. Could you send someone, please?", c: ["problem-with", "doesnt-work"] }),
      ],
      summary: { points: ["There's a problem with…", "It doesn't work. / There are no…", "pick up = buscar."], concepts: ["problem-with", "doesnt-work", "pick-up"] },
    }),
  ],

  checkpoint: {
    intro: "Travel situations you haven't seen yet: buy tickets, check in, ask politely and solve problems.",
    a: [
      cloze("q1", "A one-way ticket ___ Denver, please.", ["to"], "Destino usa to.", { c: ["ticket-to"] }),
      mc("q2", "“Round-trip” means:", ["ida e volta", "só ida", "primeira classe"], 0, "Round-trip = ida e volta.", { c: ["one-way-return"], s: "vocabulary" }),
      fix("q3", "Would you mind to help me?", ["Would you mind helping me"], "Mind + -ing.", { c: ["would-you-mind"], prompt: "Corrija o erro." }),
      order("q4", "Put the words in order: “O chuveiro não funciona.”", "The shower doesn't work.", "Sujeito + doesn't work.", { c: ["doesnt-work"], extra: ["isn't"] }),
      dict("q5", "I have a reservation for two nights.", "Reservation + for + período.", { c: ["reservation"] }),
      type("q6", "Ask what time the bus arrives.", ["What time does the bus arrive"], "What time does + sujeito + arrive?", { c: ["leave-arrive"] }),
      cloze("q7", "We ___ off at the next station.", ["get"], "Get off = descer.", { c: ["get-on-off"], s: "vocabulary" }),
      listen("q8", "Check-out is at eleven, and breakfast is included.", "What is included?", ["Breakfast", "Dinner", "Parking"], 0, "Breakfast is included.", { c: ["included", "check-in-out"] }),
      mc("q9", "You want a second pillow. What do you say?", ["Could I have another pillow, please?", "Would you mind have a pillow?", "I want pillow."], 0, "Could I have…? para algo que você quer.", { c: ["could-i"] }),
      dialog("q10", "Your suitcase did not arrive at the airport.", [
        { npc: ["Baggage service. How can I help?", "Serviço de bagagem. Como posso ajudar?"], options: [
          ["Hello. There's a problem with my bag. It didn't arrive.", true, "A atendente abre um formulário.", "Anunciou e explicou."],
          ["Where is my bag?!", false, "Ela pede calma.", "Comece descrevendo o problema."],
        ] },
        { npc: ["I'm sorry. We can deliver it tomorrow.", "Sinto muito. Podemos entregar amanhã."], options: [
          ["Could I pick it up here instead?", true, "Ela responde: “Yes, after nine.”", "Proposta educada com pick up."],
          ["I pick up here.", false, "Ela não entende se é pergunta.", "Use Could I…?"],
        ] },
      ], "Problema de viagem: descrever e negociar a solução.", { c: ["problem-with", "pick-up", "could-i"] }),
    ],
    b: [
      cloze("q1", "The plane ___ at ten and arrives at noon.", ["leaves"], "Sair = leaves.", { c: ["leave-arrive"], cue: "(leave)" }),
      mc("q2", "At the hotel desk, you say:", ["I'd like to check in, please.", "I'd like to check out the room in.", "I'd like a check."], 0, "Check in = dar entrada.", { c: ["check-in-out"] }),
      fix("q3", "I have a reserve for tonight.", ["I have a reservation for tonight"], "Reserva = reservation.", { c: ["reservation"], prompt: "Corrija a palavra." }),
      order("q4", "Put the words in order: “Você se importaria de esperar?”", "Would you mind waiting?", "Mind + -ing.", { c: ["would-you-mind"], extra: ["to"] }),
      dict("q5", "Where can I pick up my ticket?", "Pick up = buscar.", { c: ["pick-up"] }),
      type("q6", "Ask if parking is included.", ["Is parking included", "Is the parking included"], "Is + coisa + included?", { c: ["included"] }),
      cloze("q7", "There's a problem ___ my reservation.", ["with"], "Problem with.", { c: ["problem-with"] }),
      listen("q8", "One-way or round-trip? One-way, please.", "What ticket does the person want?", ["Só ida", "Ida e volta", "Duas passagens"], 0, "One-way = só ida.", { c: ["one-way-return"] }),
      mc("q9", "On a bus, the driver says “Get on, please.” What should you do?", ["Embarcar", "Descer", "Esperar"], 0, "Get on = embarcar.", { c: ["get-on-off"], s: "vocabulary" }),
      dialog("q10", "The key card to your room stopped working.", [
        { npc: ["Hello again. Is everything okay?", "Olá de novo. Está tudo bem?"], options: [
          ["Not really. My key doesn't work.", true, "A recepcionista testa o cartão.", "Problema descrito com doesn't work."],
          ["My key is not work.", false, "Ela entende, mas a frase está errada.", "Doesn't work."],
        ] },
        { npc: ["Sorry about that. I need a few minutes.", "Desculpe. Preciso de alguns minutos."], options: [
          ["No problem. Could I leave my bags here?", true, "Ela guarda as malas.", "Pedido educado com Could I."],
          ["Would you mind leave my bags?", false, "A frase fica confusa.", "Para algo que você faz: Could I leave…?"],
        ] },
      ], "Descrever o problema e fazer um pedido educado.", { c: ["doesnt-work", "could-i"] }),
    ],
    production: write("t1", "Write an email to a hotel: say you have a reservation, ask two questions about the stay, and make one polite request.",
      { mode: "free", min: 35, check: ["Informei a reserva e o nome.", "Fiz duas perguntas (included, check-out, horário…).", "Fiz um pedido com Could I ou Would you mind.", "Usei please e uma despedida."],
        model: "Hello. I have a reservation for two nights under the name Lima. Is breakfast included? What time is check-in? I arrive late, at eleven. Could I leave my bags at the front desk the next day? Thank you very much.", c: ["reservation", "included", "could-i"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Aviso na estação",
      goal: "Ler avisos de transporte e identificar horários e instruções.",
      context: { kind: "notice", title: "Central Station: today's information", lines: [
        { en: "The 8:40 train to Boston leaves from platform six. It arrives at 10:55.", pt: "O trem das 8h40 para Boston sai da plataforma seis. Chega às 10h55." },
        { en: "The elevator doesn't work today. Please use the stairs.", pt: "O elevador não funciona hoje. Por favor, use as escadas." },
        { en: "Passengers can pick up lost items at the information desk.", pt: "Os passageiros podem retirar itens perdidos no balcão de informações." },
      ] },
      exercises: [
        mc("r1", "What time does the train arrive in Boston?", ["10:55", "8:40", "6:00"], 0, "It arrives at 10:55.", { c: ["leave-arrive"], s: "reading", keepOrder: true }),
        mc("r2", "What is the problem today?", ["The elevator doesn't work.", "The train is late.", "The platform is closed."], 0, "The elevator doesn't work today.", { c: ["doesnt-work"], s: "reading" }),
        type("r3", "Where can passengers pick up lost items? Answer: At the ___ desk.", ["information"], "At the information desk.", { c: ["pick-up"], s: "reading" }),
        cloze("r4", "The train ___ from platform six.", ["leaves"], "The train leaves from platform six.", { c: ["leave-arrive"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Anúncio no aeroporto",
      goal: "Entender um anúncio de embarque e uma mudança.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "Attention, please. Flight 208 to Toronto now leaves from gate twelve, not gate two. Passengers can get on the plane at four thirty.", pt: "Atenção, por favor. O voo 208 para Toronto agora sai do portão doze, não do portão dois. Os passageiros podem embarcar às quatro e meia." }] },
      exercises: [
        listen("a1", "Attention, please. Flight 208 to Toronto now leaves from gate twelve, not gate two. Passengers can get on the plane at four thirty.", "Which gate is correct now?", ["12", "2", "20"], 0, "Gate twelve, not gate two.", { c: ["leave-arrive"], keepOrder: true }),
        listen("a2", "Attention, please. Flight 208 to Toronto now leaves from gate twelve, not gate two. Passengers can get on the plane at four thirty.", "When can passengers get on the plane?", ["4:30", "4:13", "2:30"], 0, "At four thirty.", { c: ["get-on-off"], keepOrder: true }),
        dict("a3", "Passengers can get on the plane at four thirty.", "Get on = embarcar.", { c: ["get-on-off"], alt: ["Passengers can get on the plane at 4:30."], prompt: "Type the last sentence." }),
      ],
    }),
    writing: activity("writing", {
      title: "Mensagem para o hotel",
      goal: "Escrever uma mensagem com perguntas e um pedido antes da chegada.",
      exercises: [
        write("w1", "Write a short message to your hotel before you arrive.",
          { frame: ["I have a reservation …", "Is … included?", "Could I …?"], min: 20, check: ["Mencionei a reserva.", "Perguntei se algo está incluído.", "Fiz um pedido com Could I."], model: "Hello. I have a reservation for Friday under the name Costa. Is breakfast included? Could I check in at ten in the morning? Thank you.", c: ["reservation", "included", "could-i"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "No balcão",
      goal: "Simular a compra de uma passagem e um pedido.",
      exercises: [
        speak("s1", "Role-play at the ticket office: buy a ticket, ask the time, and ask where to get off.", ["Hello. I'd like a one-way ticket to Boston, please. What time does the train leave? Where do I get off for the airport?"],
          { mode: "respond", check: ["Pedi a passagem com to + destino.", "Perguntei o horário com does.", "Usei get off.", "Ouvi o modelo e comparei."], c: ["ticket-to", "get-on-off"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: voo cancelado",
      goal: "Resolver um imprevisto de viagem do começo ao fim.",
      exercises: [
        dialog("m1", "Your flight was canceled and you go to the airline desk.", [
          { npc: ["Next, please. How can I help?", "Próximo, por favor. Como posso ajudar?"], options: [
            ["Hi. There's a problem with my flight. It was canceled.", true, "A atendente pede seu bilhete.", "Descreveu o problema com calma."],
            ["You canceled my flight! Why?", false, "Ela pede que você se acalme.", "Acusar não ajuda; descreva o problema."],
          ] },
          { npc: ["I'm sorry. The next flight leaves tomorrow at seven.", "Sinto muito. O próximo voo sai amanhã às sete."], options: [
            ["Could I have a seat on that flight, please?", true, "Ela reserva o assento.", "Pedido educado com Could I."],
            ["I get on tomorrow.", false, "Ela não sabe se é um pedido.", "Peça com Could I…?"],
          ] },
          { npc: ["Done. Do you need a hotel tonight?", "Feito. Você precisa de hotel hoje à noite?"], options: [
            ["Yes, please. Is breakfast included?", true, "Ela entrega um voucher: “Yes, it is.”", "Aceitou e conferiu o que está incluído."],
            ["Yes. I have a reserve.", false, "Ela procura uma reserva que não existe.", "Você não tem reserva; e a palavra seria reservation."],
          ] },
        ], "Imprevisto: descrever, pedir alternativa e conferir detalhes.", { c: ["problem-with", "could-i", "included"] }),
        write("m2", "Write a message to a friend who is waiting for you: explain the problem and your new arrival time.", { min: 14, check: ["Expliquei o problema.", "Disse o novo horário com leave ou arrive.", "Pedi desculpas ou avisei com educação."], model: "Hi! There's a problem with my flight. It was canceled. I leave tomorrow at seven and arrive at ten. Sorry!", c: ["problem-with", "leave-arrive"] }),
      ],
      outside: {
        title: "Fora do app: planeje uma viagem em inglês",
        instructions: "Entre no site de uma companhia aérea, de trens ou de um hotel em inglês e encontre: um horário de partida, um horário de chegada e se o café da manhã está incluído. Diga as três informações em voz alta, em inglês.",
        checklist: ["Encontrei um horário de partida e um de chegada.", "Verifiquei o que está incluído.", "Disse as informações em voz alta."],
      },
    }),
  },
});
