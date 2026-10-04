/** B1 · Unidade 2 — Já aconteceu? Present perfect em contraste com o passado simples. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "b1-u02",

  concepts: [
    concept("for-since", "word", "for / since", "há (duração) / desde (ponto de partida)", "l1", ["I've worked here for two years.", "Trabalho aqui há dois anos."], { note: "for + duração (for two years); since + início (since 2020)." }),
    concept("how-long", "phrase", "How long have you …?", "Há quanto tempo você …?", "l1", ["How long have you lived here?", "Há quanto tempo você mora aqui?"]),
    concept("lived-for", "pattern", "I've lived here for three years.", "Moro aqui há três anos.", "l1", ["She has known him since school.", "Ela o conhece desde a escola."], { note: "Algo que começou no passado e continua: present perfect, não presente simples." }),
    concept("already", "word", "already", "já", "l2", ["I've already eaten.", "Eu já comi."], { note: "Em afirmativas, entre have e o particípio." }),
    concept("yet", "word", "yet", "ainda (não) / já (em perguntas)", "l2", ["I haven't finished yet.", "Ainda não terminei."], { note: "No fim de negativas e perguntas." }),
    concept("just", "word", "just", "acabar de", "l2", ["She has just left.", "Ela acabou de sair."]),
    concept("pp-vs-past", "pattern", "I've seen it. x I saw it yesterday.", "experiência ou resultado x momento definido", "l3", ["I've been to Lima. I went there in 2019.", "Já fui a Lima. Fui lá em 2019."], { note: "Com um momento definido (yesterday, in 2019, last week), passado simples." }),
    concept("when-did", "phrase", "When did you …?", "Quando você …?", "l3", ["When did you start?", "Quando você começou?"], { note: "When pede passado simples." }),
    concept("eventually", "word", "eventually", "no fim das contas, por fim", "l4", ["Eventually, we found the house.", "Por fim, achamos a casa."], { note: "Falso cognato: “eventualmente” é occasionally ou possibly.", tags: ["false-friend"] }),
    concept("been-gone", "pattern", "has been to x has gone to", "já foi (e voltou) x foi (e está lá)", "l4", ["She's gone to the bank.", "Ela foi ao banco (e ainda não voltou)."]),
  ],

  lessons: [
    lesson("l1", {
      title: "Há quanto tempo?",
      objective: "Você vai conseguir dizer há quanto tempo algo acontece, sem cair em “I live here for 3 years”.",
      minutes: 9,
      context: { kind: "dialogue", title: "Conhecendo um novo vizinho", lines: [
        { who: "Tom", en: "How long have you lived in this building?", pt: "Há quanto tempo você mora neste prédio?" },
        { who: "Ana", en: "I've lived here for three years. And you?", pt: "Moro aqui há três anos. E você?" },
        { who: "Tom", en: "I've been here since March. I've known the owner since school.", pt: "Estou aqui desde março. Conheço o dono desde a escola." },
        { who: "Ana", en: "Really? I've worked with his sister for a long time.", pt: "Sério? Trabalho com a irmã dele há muito tempo." },
      ] },
      explanation: {
        summary: "Para algo que **começou no passado e continua até agora**, o inglês usa o **present perfect**, não o presente:\n- *I**'ve lived** here **for** three years.* (moro aqui há três anos)\n\n- **for** + duração: *for two hours, for a long time*\n- **since** + ponto de partida: *since 2020, since March, since I was a child*\n\nA pergunta: **How long have you…?**",
        details: "É um dos erros mais comuns de brasileiros, porque em português usamos o presente (“moro há três anos”). Em inglês, *I live here for three years* está errado. Com verbos de estado (know, be, have), é sempre present perfect simples: *I've known her for years.*",
        examples: [
          { en: "I've worked here since 2021.", pt: "Trabalho aqui desde 2021." },
          { en: "We've been friends for ten years.", pt: "Somos amigos há dez anos." },
          { en: "How long has she had that car?", pt: "Há quanto tempo ela tem esse carro?" },
        ],
        contrasts: [
          { wrong: "I live here for three years.", right: "I've lived here for three years.", why: "Começou no passado e continua: present perfect." },
          { wrong: "I've worked here since two years.", right: "I've worked here for two years.", why: "Duração usa for; since marca o início." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I ___ here for five years.” (and I still live here)", ["have lived", "live", "am living"], 0, "Começou no passado e continua: present perfect.", { c: ["lived-for"] }),
        match("e2", "Match the time expression with for or since.", [["for", "two years"], ["since", "2020"], ["for a", "long time"], ["since I", "was a child"]],
          "For + duração; since + ponto de partida.", { c: ["for-since"], s: "grammar", pt: "Associe a expressão de tempo a for ou since." }),
        cloze("e3", "I've been here ___ March.", ["since"], "March é o ponto de partida: since.", { c: ["for-since"] }),
      ],
      independent: [
        cloze("e4", "We've been friends ___ ten years.", ["for"], "Ten years é duração: for.", { c: ["for-since"] }),
        order("e5", "Put the words in order: “Há quanto tempo você mora aqui?”", "How long have you lived here?", "How long + have + you + particípio.", { c: ["how-long"], extra: ["do"] }),
        fix("e6", "I work here for three years.", ["I have worked here for three years", "I've worked here for three years"], "Continua até agora: present perfect.", { c: ["lived-for"], prompt: "Fix the tense." }),
        dict("e7", "I've known her since school.", "Know + since: present perfect.", { c: ["lived-for", "for-since"], alt: ["I have known her since school."] }),
        cloze("e8", "How ___ have you had this phone?", ["long"], "How long…?", { c: ["how-long"] }),
      ],
      application: [
        type("e9", "Say in English: “Estudo inglês há dois anos.”", ["I've studied English for two years", "I have studied English for two years", "I've been studying English for two years", "I have been studying English for two years"], "I've studied English for two years.", { c: ["lived-for", "for-since"], t: [["I study English for two years", "Em inglês, o que continua até agora pede present perfect."]] }),
        speak("e10", "Say three things about your life with for or since.", ["I've lived in this city for ten years. I've had this job since 2022. I've known my best friend for a long time."],
          { mode: "respond", check: ["Usei have + particípio nas três frases.", "Usei for com duração.", "Usei since com um ponto de partida."], c: ["lived-for", "for-since"] }),
      ],
      summary: { points: ["I've lived here for 3 years (não “I live”).", "for + duração; since + início.", "How long have you…?"], concepts: ["for-since", "how-long", "lived-for"] },
    }),

    lesson("l2", {
      title: "Já, ainda não, acabei de",
      objective: "Você vai conseguir dizer o que já foi feito, o que ainda falta e o que acabou de acontecer.",
      minutes: 9,
      context: { kind: "dialogue", title: "Antes de sair de viagem", lines: [
        { who: "Leo", en: "Have you packed your bag yet?", pt: "Você já fez a mala?" },
        { who: "Ana", en: "Yes, I've already packed. But I haven't found my passport yet.", pt: "Já fiz. Mas ainda não achei meu passaporte." },
        { who: "Leo", en: "I've just seen it on the kitchen table!", pt: "Acabei de ver em cima da mesa da cozinha!" },
        { who: "Ana", en: "Great. Has the taxi arrived yet?", pt: "Ótimo. O táxi já chegou?" },
        { who: "Leo", en: "Not yet.", pt: "Ainda não." },
      ] },
      explanation: {
        summary: "Três palavrinhas que acompanham o present perfect:\n- **already** (já): em afirmativas, antes do particípio → *I've **already** eaten.*\n- **yet** (ainda / já): no **fim** de negativas e perguntas → *I haven't finished **yet**. Have you finished **yet**?*\n- **just** (acabar de): antes do particípio → *She has **just** left.*",
        details: "Em português “já” serve para afirmar e perguntar. Em inglês se separa: *already* afirma, *yet* pergunta. A resposta curta mais comum é **Not yet** (ainda não).",
        examples: [
          { en: "I've already seen that movie.", pt: "Já vi esse filme." },
          { en: "Have you eaten yet?", pt: "Você já comeu?" },
          { en: "We've just arrived.", pt: "Acabamos de chegar." },
        ],
        contrasts: [
          { wrong: "I haven't finished already.", right: "I haven't finished yet.", why: "Em negativas, yet." },
          { wrong: "I just have arrived.", right: "I've just arrived.", why: "Just vem depois de have." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I haven't done my homework ___.”", ["yet", "already", "just"], 0, "Negativa: yet, no fim.", { c: ["yet"] }),
        match("e2", "Match the word to its meaning and position.", [["already", "já (afirmativas)"], ["yet", "ainda / já (negativas e perguntas)"], ["just", "acabar de"], ["Not yet.", "Ainda não."]],
          "Cada palavra tem seu lugar na frase.", { c: ["already", "yet", "just"], pt: "Associe a palavra ao significado." }),
        cloze("e3", "She has ___ left. You missed her by one minute.", ["just"], "Acabou de sair: just.", { c: ["just"] }),
      ],
      independent: [
        cloze("e4", "I've ___ packed my bag. Everything is ready.", ["already"], "Já fiz: already.", { c: ["already"] }),
        cloze("e5", "Has the taxi arrived ___?", ["yet"], "Pergunta: yet no fim.", { c: ["yet"] }),
        order("e6", "Put the words in order: “Acabamos de chegar.”", "We've just arrived.", "Have + just + particípio.", { c: ["just"] }),
        fix("e7", "I haven't seen the email already.", ["I haven't seen the email yet", "I have not seen the email yet"], "Negativa: yet.", { c: ["yet"], prompt: "Fix the mistake." }),
        dict("e8", "I've already eaten, thanks.", "Already entre have e o particípio.", { c: ["already"], alt: ["I have already eaten, thanks."] }),
      ],
      application: [
        type("e9", "Ask in English: “Você já terminou?”", ["Have you finished yet", "Have you already finished"], "Have you finished yet?", { c: ["yet"] }),
        dialog("e10", "Your manager checks on your tasks.", [
          { npc: ["Have you sent the report yet?", "Você já mandou o relatório?"], options: [
            ["Yes, I've just sent it.", true, "Ela agradece.", "Just para algo recém-feito."],
            ["Yes, I just have sent it.", false, "A ordem está errada.", "I've just sent it."],
          ] },
          { npc: ["Great. And the invoice?", "Ótimo. E a fatura?"], options: [
            ["Not yet. I haven't received the numbers yet.", true, "Ela promete enviar os números.", "Not yet e yet no fim da negativa."],
            ["I haven't received already.", false, "Soa errado.", "Negativa pede yet."],
          ] },
        ], "Status de tarefas: already, yet e just.", { c: ["just", "yet"] }),
      ],
      summary: { points: ["already: afirmativas, antes do particípio.", "yet: fim de negativas e perguntas.", "just = acabar de."], concepts: ["already", "yet", "just"] },
    }),

    lesson("l3", {
      title: "I've seen x I saw",
      objective: "Você vai conseguir escolher entre o present perfect e o passado simples.",
      minutes: 10,
      context: { kind: "dialogue", title: "Falando de viagens", lines: [
        { who: "Ken", en: "Have you ever been to Peru?", pt: "Você já foi ao Peru?" },
        { who: "Bia", en: "Yes, I have. I went there in 2019.", pt: "Já. Fui lá em 2019." },
        { who: "Ken", en: "When did you go? In the summer?", pt: "Quando você foi? No verão?" },
        { who: "Bia", en: "No, I went in July. I've been to Chile too, but I've never visited Argentina.", pt: "Não, fui em julho. Já fui ao Chile também, mas nunca visitei a Argentina." },
      ] },
      explanation: {
        summary: "A pergunta-chave é: **a frase diz quando?**\n- **Sem momento definido** (experiência, resultado, algo que continua) → **present perfect**: *I've been to Peru.*\n- **Com momento definido** (yesterday, in 2019, last week, when I was a child) → **passado simples**: *I went there in 2019.*\n\n**When…?** sempre pede passado simples: *When did you go?*",
        details: "É comum a conversa começar no present perfect (a experiência) e passar para o passado simples (os detalhes): *Have you seen the movie? — Yes, I saw it last week. It was great.* Com **today, this week, this year**, se o período ainda não terminou, usa-se present perfect: *I've had three coffees today.*",
        examples: [
          { en: "I've lost my keys.", pt: "Perdi minhas chaves.", note: "Sem data: o resultado importa agora (ainda estão perdidas)." },
          { en: "I lost my keys yesterday.", pt: "Perdi minhas chaves ontem." },
          { en: "When did you arrive?", pt: "Quando você chegou?" },
        ],
        contrasts: [
          { wrong: "I've seen him yesterday.", right: "I saw him yesterday.", why: "Yesterday é momento definido: passado simples." },
          { wrong: "When have you arrived?", right: "When did you arrive?", why: "When pede passado simples." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I ___ her last week.”", ["saw", "have seen", "see"], 0, "Last week é momento definido: passado simples.", { c: ["pp-vs-past"] }),
        match("e2", "Match the time expression with the tense it needs.", [["yesterday", "passado simples"], ["never", "present perfect"], ["in 2019", "passado simples (data)"], ["so far", "present perfect (até agora)"]],
          "Momento definido pede passado simples.", { c: ["pp-vs-past"], s: "grammar", pt: "Associe a expressão ao tempo verbal." }),
        cloze("e3", "When ___ you go to Peru?", ["did"], "When pede passado simples.", { c: ["when-did"] }),
      ],
      independent: [
        cloze("e4", "I've ___ to Chile, but I've never visited Argentina.", ["been"], "Experiência sem data: I've been.", { c: ["pp-vs-past"], cue: "(be)" }),
        cloze("e5", "We ___ to the beach last weekend.", ["went"], "Last weekend: passado simples.", { c: ["pp-vs-past"], cue: "(go)" }),
        fix("e6", "I've met him in 2018.", ["I met him in 2018"], "Com data: passado simples.", { c: ["pp-vs-past"], prompt: "Fix the tense." }),
        fix("e7", "When have you started this job?", ["When did you start this job"], "When + did.", { c: ["when-did"], prompt: "Fix the question." }),
        dict("e8", "I've been to Peru. I went there in 2019.", "Experiência no perfect; detalhe com data no simples.", { c: ["pp-vs-past"], alt: ["I have been to Peru. I went there in 2019."] }),
      ],
      application: [
        type("e9", "Say in English: “Eu já vi esse filme. Vi na semana passada.”", ["I've seen that movie. I saw it last week", "I have seen that movie. I saw it last week", "I've already seen that movie. I saw it last week", "I've seen this movie. I saw it last week"], "I've seen that movie. I saw it last week.", { c: ["pp-vs-past"] }),
        listen("e10", "I've lost my wallet. I had it this morning at the cafe.", "When did the person last have the wallet?", ["This morning", "Last night", "They don't know"], 0, "I had it this morning.", { c: ["pp-vs-past"] }),
      ],
      summary: { points: ["Sem momento definido → present perfect.", "Com momento definido → passado simples.", "When did you…? (sempre simples)."], concepts: ["pp-vs-past", "when-did"] },
    }),

    lesson("l4", {
      title: "Eventually, been e gone",
      objective: "Você vai conseguir evitar um falso cognato perigoso e diferenciar “has been” de “has gone”.",
      minutes: 8,
      context: { kind: "dialogue", title: "Procurando uma colega", lines: [
        { who: "Leo", en: "Where's Marta? I haven't seen her today.", pt: "Cadê a Marta? Não a vi hoje." },
        { who: "Ana", en: "She's gone to the bank. She'll be back soon.", pt: "Ela foi ao banco. Volta logo." },
        { who: "Leo", en: "Has she been to the new office yet?", pt: "Ela já foi ao escritório novo?" },
        { who: "Ana", en: "Yes, she's been there twice. She got lost the first time, but eventually she found it.", pt: "Já, esteve lá duas vezes. Ela se perdeu da primeira vez, mas por fim encontrou." },
      ] },
      explanation: {
        summary: "Dois pontos finos:\n- **has been to** = foi **e voltou** (experiência): *She's been to Paris.*\n- **has gone to** = foi **e ainda está lá**: *She's gone to the bank.*\n\nE um falso cognato: **eventually** significa **por fim, no fim das contas**. Não é “eventualmente”.",
        details: "“Eventualmente” (de vez em quando) é **occasionally** ou **sometimes**. “Eventualmente” no sentido de “talvez” é **possibly**. Exemplo: *Eventually, I got the job* = no fim, consegui o emprego.",
        examples: [
          { en: "He's gone to lunch.", pt: "Ele saiu para almoçar (e não voltou ainda)." },
          { en: "I've been to that restaurant.", pt: "Já fui a esse restaurante." },
          { en: "Eventually, the bus arrived.", pt: "Por fim, o ônibus chegou." },
        ],
        contrasts: [
          { wrong: "I eventually go to the gym. (de vez em quando)", right: "I occasionally go to the gym.", why: "Eventually = por fim. De vez em quando = occasionally." },
          { wrong: "I've gone to Japan twice. (e você está aqui)", right: "I've been to Japan twice.", why: "Se você já voltou, é been." },
        ],
      },
      guided: [
        mc("e1", "What does “eventually” mean?", ["Por fim, no fim das contas", "De vez em quando", "Talvez"], 0, "Eventually = por fim.", { c: ["eventually"], s: "vocabulary" }),
        match("e2", "Match the sentence to the situation.", [["She's gone to the bank.", "ela ainda está lá"], ["She's been to the bank.", "ela já foi e voltou"], ["Eventually, she found it.", "por fim, encontrou"], ["She occasionally forgets.", "de vez em quando esquece"]],
          "Been x gone, e eventually x occasionally.", { c: ["been-gone", "eventually"], pt: "Associe a frase à situação." }),
        cloze("e3", "Marta isn't here. She's ___ to the bank.", ["gone"], "Ainda está lá: gone.", { c: ["been-gone"] }),
      ],
      independent: [
        cloze("e4", "I've ___ to Rio three times. I love it.", ["been"], "Já fui e voltei: been.", { c: ["been-gone"] }),
        cloze("e5", "We waited for an hour. ___, the doctor called us.", ["Eventually", "Finally"], "Por fim: Eventually.", { c: ["eventually"], s: "vocabulary" }),
        fix("e6", "I've gone to London twice, and I loved it.", ["I've been to London twice, and I loved it", "I have been to London twice, and I loved it"], "Se você voltou: been.", { c: ["been-gone"], prompt: "Fix the participle." }),
        dict("e7", "Eventually, we found the house.", "Eventually = por fim.", { c: ["eventually"] }),
      ],
      application: [
        type("e8", "Say in English: “De vez em quando eu trabalho no sábado.”", ["I occasionally work on Saturday", "I sometimes work on Saturday", "Occasionally I work on Saturday", "Sometimes I work on Saturday", "I occasionally work on Saturdays", "I sometimes work on Saturdays"], "Occasionally ou sometimes.", { c: ["eventually"], t: [["I eventually work on Saturday", "Eventually significa “por fim”. Para “de vez em quando”, use occasionally ou sometimes."]] }),
        speak("e9", "Tell a short story with a difficult start and a good ending, using “eventually”.", ["I wanted to learn to drive. I failed the test twice. Eventually, I passed, and I've been driving for five years."],
          { mode: "respond", check: ["Usei eventually no sentido de “por fim”.", "Usei o passado simples para os fatos.", "Fechei com o present perfect para o que continua."], c: ["eventually", "lived-for"] }),
        write("e10", "Write three sentences: a place you have been to, a person who has gone somewhere and is not back, and something that eventually worked out.",
          { frame: ["I've been to …", "… has gone to …", "Eventually, …"], min: 18, check: ["Usei been para experiência.", "Usei gone para quem ainda está lá.", "Usei eventually como “por fim”."], model: "I've been to Salvador twice. My brother has gone to the supermarket. Eventually, I found a job I like.", c: ["been-gone", "eventually"] }),
      ],
      summary: { points: ["has been to = foi e voltou; has gone to = ainda está lá.", "eventually = por fim.", "eventualmente = occasionally / possibly."], concepts: ["eventually", "been-gone"] },
    }),
  ],

  checkpoint: {
    intro: "New conversations about life and work. Decide each time: does the sentence say when?",
    a: [
      cloze("q1", "I've had this car ___ 2018.", ["since"], "Ponto de partida: since.", { c: ["for-since"] }),
      mc("q2", "Choose: “She ___ in Lisbon for ten years, and she still lives there.”", ["has lived", "lived", "lives"], 0, "Continua: present perfect.", { c: ["lived-for"] }),
      fix("q3", "I've finished the course last month.", ["I finished the course last month"], "Last month: passado simples.", { c: ["pp-vs-past"], prompt: "Fix the tense." }),
      order("q4", "Put the words in order: “Você já almoçou?”", "Have you had lunch yet?", "Yet no fim da pergunta.", { c: ["yet"], extra: ["already"] }),
      dict("q5", "They've just arrived at the airport.", "Just entre have e o particípio.", { c: ["just"], alt: ["They have just arrived at the airport."] }),
      type("q6", "Ask in English: “Quando você chegou?”", ["When did you arrive"], "When + did.", { c: ["when-did"] }),
      cloze("q7", "He isn't here. He's ___ to the dentist.", ["gone"], "Ainda está lá: gone.", { c: ["been-gone"] }),
      listen("q8", "I've already paid the bill, but I haven't received the receipt yet.", "What is still missing?", ["The receipt", "The payment", "The bill"], 0, "I haven't received the receipt yet.", { c: ["already", "yet"] }),
      mc("q9", "“Eventually, they agreed.” means:", ["Por fim, concordaram.", "De vez em quando, concordavam.", "Talvez concordem."], 0, "Eventually = por fim.", { c: ["eventually"], s: "vocabulary" }),
      dialog("q10", "A recruiter interviews you.", [
        { npc: ["How long have you worked in sales?", "Há quanto tempo você trabalha com vendas?"], options: [
          ["I've worked in sales for six years.", true, "Ela anota.", "Present perfect + for."],
          ["I work in sales since six years.", false, "Soa errado.", "I've worked… for six years."],
        ] },
        { npc: ["And when did you start at your current company?", "E quando você começou na empresa atual?"], options: [
          ["I started in 2022.", true, "Ela segue para a próxima pergunta.", "Com data: passado simples."],
          ["I've started in 2022.", false, "O tempo verbal está errado.", "Data definida: I started."],
        ] },
      ], "Duração no perfect; data no passado simples.", { c: ["how-long", "lived-for", "pp-vs-past"] }),
    ],
    b: [
      cloze("q1", "We've known each other ___ a long time.", ["for"], "Duração: for.", { c: ["for-since"] }),
      mc("q2", "Choose: “I ___ breakfast at seven this morning.”", ["had", "have had", "have"], 0, "At seven this morning: momento definido.", { c: ["pp-vs-past"] }),
      fix("q3", "How long do you know her?", ["How long have you known her"], "How long + present perfect.", { c: ["how-long", "lived-for"], prompt: "Fix the question." }),
      order("q4", "Put the words in order: “Ainda não terminei.”", "I haven't finished yet.", "Yet no fim.", { c: ["yet"], extra: ["already"] }),
      dict("q5", "I've already read that book.", "Already antes do particípio.", { c: ["already"], alt: ["I have already read that book."] }),
      type("q6", "Say in English: “Ela acabou de sair.”", ["She has just left", "She's just left"], "Has just + particípio.", { c: ["just"] }),
      cloze("q7", "I've ___ to that museum many times. It's great.", ["been"], "Experiência: been.", { c: ["been-gone"] }),
      listen("q8", "When did you move here? I moved in January. I've been here for six months.", "How long has the person been there?", ["Six months", "Since June", "One year"], 0, "For six months.", { c: ["when-did", "for-since"] }),
      mc("q9", "How do you say “de vez em quando” in English?", ["occasionally", "eventually", "actually"], 0, "Occasionally.", { c: ["eventually"], s: "vocabulary" }),
      dialog("q10", "You meet an old friend by chance.", [
        { npc: ["I haven't seen you for ages! Where have you been?", "Faz séculos que não te vejo! Por onde você andou?"], options: [
          ["I've been in Curitiba. I moved there in 2021.", true, "Ele se surpreende.", "Perfect para o período; simples para a data."],
          ["I've been in Curitiba. I've moved there in 2021.", false, "O segundo tempo está errado.", "Com data: I moved."],
        ] },
        { npc: ["Wow. Have you found a job there yet?", "Uau. Você já achou emprego lá?"], options: [
          ["Yes, eventually. It took a year, but I've just started at a bank.", true, "Ele dá os parabéns.", "Eventually = por fim; just para o recente."],
          ["Yes, eventually I work there sometimes.", false, "Ele não entende.", "Eventually não é “de vez em quando”."],
        ] },
      ], "Colocar o papo em dia com perfect e passado simples.", { c: ["pp-vs-past", "eventually", "just"] }),
    ],
    production: write("t1", "Write a short professional or personal bio (about 60 words): how long you have lived or worked somewhere, something you have already done, something you haven't done yet, and one past event with a date.",
      { mode: "free", min: 50, check: ["Usei for ou since com o present perfect.", "Usei already ou just.", "Usei yet em uma negativa.", "Usei o passado simples com uma data ou momento definido.", "Não escrevi “I live/work here for…”."],
        model: "I've lived in Recife for twelve years and I've worked as a nurse since 2018. I started my first job in 2016, at a small clinic. I've already finished two courses in emergency care, but I haven't studied abroad yet. I've just started learning English seriously, and eventually I want to work in another country.", c: ["lived-for", "already", "yet", "pp-vs-past"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Perfil profissional",
      goal: "Ler um perfil e separar o que continua do que já terminou.",
      context: { kind: "text", title: "About Marta", lines: [
        { en: "Marta has been a nurse for fifteen years. She has worked at City Hospital since 2015.", pt: "Marta é enfermeira há quinze anos. Trabalha no City Hospital desde 2015." },
        { en: "She studied in Recife and moved to Sao Paulo in 2012.", pt: "Ela estudou em Recife e se mudou para São Paulo em 2012." },
        { en: "She has already trained more than fifty students, but she hasn't written a book yet. She has just started a master's degree.", pt: "Ela já treinou mais de cinquenta alunos, mas ainda não escreveu um livro. Acabou de começar um mestrado." },
      ] },
      exercises: [
        mc("r1", "How long has Marta been a nurse?", ["Fifteen years", "Since 2012", "Fifty years"], 0, "For fifteen years.", { c: ["for-since"], s: "reading" }),
        mc("r2", "Which event is finished and has a date?", ["She moved to Sao Paulo in 2012.", "She has worked at City Hospital.", "She has trained students."], 0, "Moved… in 2012: passado simples com data.", { c: ["pp-vs-past"], s: "reading" }),
        type("r3", "What hasn't she done yet? Complete: She hasn't ___ a book yet.", ["written"], "She hasn't written a book yet.", { c: ["yet"], s: "reading" }),
        cloze("r4", "She has ___ started a master's degree.", ["just"], "She has just started.", { c: ["just"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Novidades no trabalho",
      goal: "Entender o que já foi feito e o que falta.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Have you finished the presentation yet?", pt: "Você já terminou a apresentação?" },
        { who: "B", en: "I've already written the text, but I haven't added the photos yet. I started yesterday.", pt: "Já escrevi o texto, mas ainda não coloquei as fotos. Comecei ontem." },
      ] },
      exercises: [
        listen("a1", ["Have you finished the presentation yet?", "I've already written the text, but I haven't added the photos yet. I started yesterday."], "What has the person already done?", ["Written the text", "Added the photos", "Finished everything"], 0, "I've already written the text.", { c: ["already"] }),
        listen("a2", ["Have you finished the presentation yet?", "I've already written the text, but I haven't added the photos yet. I started yesterday."], "When did the person start?", ["Yesterday", "Today", "Last week"], 0, "I started yesterday.", { c: ["pp-vs-past"] }),
        dict("a3", "I haven't added the photos yet.", "Negativa com yet no fim.", { c: ["yet"], alt: ["I have not added the photos yet."], prompt: "Type the sentence about the photos." }),
      ],
    }),
    writing: activity("writing", {
      title: "Atualização de status",
      goal: "Escrever um e-mail curto dizendo o que já foi feito e o que falta.",
      exercises: [
        write("w1", "Write a short status update to your manager or teacher about a task: what you have already done, what you haven't done yet and when you started.",
          { frame: ["I've already …", "I haven't … yet.", "I started … on …"], min: 30, check: ["Usei already em afirmativa.", "Usei yet em negativa.", "Usei o passado simples com um momento definido.", "O texto é claro e educado."], model: "Hi, Carla. Here's my update. I've already written the first two sections of the report. I haven't checked the numbers yet. I started on Monday, and I've just received the data from sales. I'll send everything on Friday.", c: ["already", "yet", "pp-vs-past"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Há quanto tempo?",
      goal: "Falar sobre a própria trajetória com for, since e datas.",
      exercises: [
        speak("s1", "Talk about your life: where you have lived, how long you have studied or worked, and when two important things happened.", ["I've lived in this city since 2015. I've worked in the same company for four years. I started studying English in January. I got married in 2020."],
          { mode: "respond", check: ["Usei present perfect com for ou since.", "Usei passado simples com datas.", "Não disse “I live/work here for”.", "Ouvi o modelo e comparei."], c: ["lived-for", "pp-vs-past"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: entrevista de imigração",
      goal: "Responder a perguntas sobre tempo, experiências e datas com precisão.",
      exercises: [
        dialog("m1", "At the airport, an officer asks you questions.", [
          { npc: ["Have you been to this country before?", "Você já esteve neste país antes?"], options: [
            ["Yes, I have. I came here in 2023.", true, "O agente pergunta o motivo.", "Resposta curta no perfect; data no simples."],
            ["Yes, I've come here in 2023.", false, "O tempo verbal está errado.", "Com data: I came."],
          ] },
          { npc: ["How long have you worked for your company?", "Há quanto tempo você trabalha na sua empresa?"], options: [
            ["I've worked there for five years.", true, "Ele confere seus documentos.", "Present perfect + for."],
            ["I work there since five years.", false, "Ele pede que você repita.", "I've worked there for five years."],
          ] },
          { npc: ["Have you booked a hotel yet?", "Você já reservou um hotel?"], options: [
            ["Yes, I've already booked one. Here's the confirmation.", true, "Ele carimba o passaporte.", "Already em afirmativa."],
            ["Yes, I booked yet.", false, "A frase está errada.", "Yet é para negativas e perguntas."],
          ] },
        ], "Responder com precisão: experiência, duração e status.", { c: ["pp-vs-past", "lived-for", "already"] }),
        write("m2", "Write three sentences about yourself that you could say in an interview.", { min: 18, check: ["Uma frase com for ou since.", "Uma frase com data no passado simples.", "Uma frase com already, yet ou just."], model: "I've worked as a designer for six years. I finished university in 2017. I've just completed an English course.", c: ["lived-for", "pp-vs-past"] }),
      ],
      outside: {
        title: "Fora do app: sua linha do tempo",
        instructions: "Desenhe uma linha do tempo da sua vida com cinco eventos. Para cada um, diga em voz alta uma frase em inglês: com data, use o passado simples (I moved in 2019); para o que continua, use o present perfect (I've lived here since 2019).",
        checklist: ["Marquei cinco eventos na linha do tempo.", "Disse frases com data no passado simples.", "Disse frases com for ou since no present perfect."],
      },
    }),
  },
});
