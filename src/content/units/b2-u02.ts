/** B2 · Unidade 2 — Narrativas complexas: past perfect e relações temporais. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "When I got to the station, the train had already left. I had checked the timetable the night before, but the company had changed it that morning. By the time the next train arrived, I had been there for two hours. It turned out that my meeting had been cancelled anyway, so I carried on to the city and spent the day at a museum.";

export default defineUnit({
  id: "b2-u02",

  concepts: [
    concept("past-perfect", "pattern", "had + past participle", "tinha + particípio", "l1", ["When I arrived, the movie had started.", "Quando cheguei, o filme já tinha começado."], { note: "Mostra o que aconteceu antes de outro momento do passado." }),
    concept("had-vs-did", "pattern", "had left / left", "tinha saído / saiu", "l1", ["When I called, she had left. / When I called, she left.", "Quando liguei, ela já tinha saído. / Quando liguei, ela saiu."], { note: "had left: antes da ligação. left: depois da ligação." }),
    concept("already-never-before", "pattern", "had already / had never … before", "já tinha / nunca tinha … antes", "l2", ["I had never seen snow before.", "Eu nunca tinha visto neve antes."], { note: "already e never ficam entre had e o particípio." }),
    concept("had-short", "sound", "I'd / she'd / hadn't", "eu tinha / ela tinha / não tinha", "l2", ["She'd left before I arrived.", "Ela tinha saído antes de eu chegar."], { note: "'d pode ser had ou would: depois de 'd + particípio, é had.", tags: ["pronunciation"] }),
    concept("by-the-time", "phrase", "by the time …", "quando … (já)", "l3", ["By the time we arrived, the store had closed.", "Quando chegamos, a loja já tinha fechado."], { note: "by the time + passado simples, + past perfect." }),
    concept("until-as-soon", "pattern", "until / as soon as / after", "até / assim que / depois que", "l3", ["I didn't leave until I had finished.", "Não saí até ter terminado."]),
    concept("after-ing", "pattern", "after + verb-ing / having + participle", "depois de + verbo", "l3", ["After finishing the report, I went home.", "Depois de terminar o relatório, fui para casa."], { note: "Mesmo sujeito nas duas ações." }),
    concept("turn-out", "phrase", "It turned out (that) …", "Acabou que … / No fim, descobriu-se que …", "l4", ["It turned out that he was right.", "No fim, ele estava certo."], { tags: ["phrasal-verb"] }),
    concept("carry-on", "phrase", "carry on", "continuar, seguir em frente", "l4", ["We carried on walking in the rain.", "Continuamos andando na chuva."], { note: "carry on + verbo-ing.", tags: ["phrasal-verb"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "O passado antes do passado",
      objective: "Você vai conseguir mostrar qual de dois acontecimentos passados veio primeiro.",
      minutes: 10,
      context: { kind: "text", title: "A bad morning", lines: [
        { en: "When I got to the bus stop, the bus had left.", pt: "Quando cheguei ao ponto, o ônibus já tinha saído." },
        { en: "I looked for my phone, but I had forgotten it at home.", pt: "Procurei meu celular, mas eu o tinha esquecido em casa." },
        { en: "When I finally arrived at work, the meeting had started.", pt: "Quando finalmente cheguei ao trabalho, a reunião já tinha começado." },
      ] },
      explanation: {
        summary: "O **past perfect** (**had + particípio**) marca o que aconteceu **antes** de outro ponto do passado:\n- *When I arrived, the movie **had started**.* (o filme começou antes)\n\nCompare:\n- *When I arrived, the movie **started**.* (cheguei, e então começou)",
        details: "Use o past perfect quando a ordem da narrativa **não** é a ordem dos fatos. Se você conta tudo em sequência, o passado simples basta: *I woke up, had breakfast and left.* A forma é a mesma para todas as pessoas: *I had, she had, they had*. Negativa: **hadn't**. Pergunta: **Had you…?**",
        examples: [
          { en: "She was tired because she hadn't slept well.", pt: "Ela estava cansada porque não tinha dormido bem." },
          { en: "Had you met him before the party?", pt: "Você já o conhecia antes da festa?" },
          { en: "I realized I had left my keys inside.", pt: "Percebi que tinha deixado as chaves lá dentro." },
        ],
        contrasts: [
          { wrong: "When I arrived, the bus has left.", right: "When I arrived, the bus had left.", why: "Antes de um ponto do passado: had, não has." },
          { wrong: "I had woke up late.", right: "I had woken up late.", why: "Had + particípio (woken)." },
        ],
      },
      guided: [
        mc("e1", "“When I got home, my sister had cooked dinner.” What happened first?", ["She cooked dinner.", "I got home.", "Both at the same time."], 0, "Had cooked veio antes de got home.", { c: ["past-perfect"], keepOrder: true }),
        mc("e2", "“When the guests arrived, we ate.” Did they eat before the guests arrived?", ["No, they ate after the guests arrived.", "Yes, they had finished eating.", "We can't know."], 0, "Dois passados simples: ações em sequência.", { c: ["had-vs-did"], keepOrder: true }),
        cloze("e3", "When I got to the bus stop, the bus ___ left.", ["had"], "Antes de eu chegar: had left.", { c: ["past-perfect"] }),
      ],
      independent: [
        cloze("e4", "I looked for my phone, but I had ___ it at home.", ["forgotten", "left"], "Had + particípio.", { c: ["past-perfect"], cue: "(forget)" }),
        fix("e5", "She was tired because she didn't sleep well the night before.", ["She was tired because she hadn't slept well the night before", "She was tired because she had not slept well the night before"], "A noite mal dormida veio antes: hadn't slept.", { c: ["had-vs-did"], prompt: "Rewrite with the past perfect." }),
        fix("e6", "When we arrived, the concert has already started.", ["When we arrived, the concert had already started"], "Ponto de referência no passado: had.", { c: ["past-perfect"], prompt: "Fix the mistake." }),
        dict("e7", "When I finally arrived at work, the meeting had started.", "Had started: antes de eu chegar.", { c: ["past-perfect"] }),
        order("e8", "Put the words in order: “Percebi que tinha deixado as chaves lá dentro.”", "I realized I had left my keys inside.", "Realized (depois) + had left (antes).", { c: ["past-perfect"], extra: ["have"] }),
      ],
      application: [
        type("e9", "The sequence was: 1) the store closed; 2) we arrived. Complete: “When we arrived, the store…”", ["When we arrived, the store had closed", "When we arrived, the store had already closed"], "A loja fechou antes: had closed.", { c: ["had-vs-did"] }),
        speak("e10", "Tell about a bad morning in three sentences. In each one, use “when” and show what had happened before.", ["When I woke up, my alarm had stopped. When I got to the kitchen, my brother had finished the coffee. When I arrived at work, everyone had gone to a meeting."],
          { mode: "respond", check: ["Usei had + particípio nas três frases.", "Em cada frase, ficou claro o que veio antes.", "Não usei has no lugar de had."], c: ["past-perfect", "had-vs-did"] }),
      ],
      summary: { points: ["had + particípio = antes de outro passado.", "Dois passados simples = em sequência.", "hadn't / Had you…?"], concepts: ["past-perfect", "had-vs-did"] },
    }),

    lesson("l2", {
      title: "Já tinha, nunca tinha",
      objective: "Você vai conseguir falar de experiências anteriores a um momento do passado e reconhecer as formas contraídas.",
      minutes: 9,
      context: { kind: "dialogue", title: "Talking about a first trip abroad", lines: [
        { who: "Vera", en: "Was that your first time on a plane?", pt: "Foi sua primeira vez em um avião?" },
        { who: "Hugo", en: "Yes! I'd never flown before. I was terrified.", pt: "Foi! Eu nunca tinha voado antes. Estava apavorado." },
        { who: "Vera", en: "Had you already learned some English?", pt: "Você já tinha aprendido um pouco de inglês?" },
        { who: "Hugo", en: "I'd studied for a year, but I hadn't spoken to a real person yet.", pt: "Eu tinha estudado por um ano, mas ainda não tinha falado com uma pessoa de verdade." },
      ] },
      explanation: {
        summary: "Com o past perfect, três palavras aparecem o tempo todo:\n- **had already** + particípio: *I had already eaten.*\n- **had never** + particípio + **before**: *I had never flown before.*\n- **hadn't** + particípio + **yet**: *I hadn't finished yet.*\n\nNa fala, **had** vira **'d**: *I'd, she'd, they'd.*",
        details: "A contração **'d** pode ser *had* ou *would*. A pista está no que vem depois: **'d + particípio** = had (*I'd seen*); **'d + verbo base** = would (*I'd see*). Na fala rápida, o 'd quase desaparece; é o particípio que avisa que se trata do past perfect.",
        examples: [
          { en: "She'd already left when I called.", pt: "Ela já tinha saído quando liguei." },
          { en: "It was the best meal I had ever eaten.", pt: "Foi a melhor refeição que eu já tinha comido." },
          { en: "We hadn't met before that day.", pt: "Não nos conhecíamos antes daquele dia." },
        ],
        contrasts: [
          { wrong: "I never had flown before.", right: "I had never flown before.", why: "Never fica entre had e o particípio." },
          { wrong: "I'd went there twice.", right: "I'd been there twice.", why: "Depois de 'd (had): particípio." },
        ],
      },
      guided: [
        mc("e1", "In “I'd seen that movie before”, what is 'd?", ["had", "would", "did"], 0, "'d + particípio (seen) = had.", { c: ["had-short"], s: "grammar" }),
        mc("e2", "In “I'd see a doctor if I were you”, what is 'd?", ["would", "had", "did"], 0, "'d + verbo base (see) = would.", { c: ["had-short"], s: "grammar" }),
        cloze("e3", "I had ___ flown before. I was terrified.", ["never"], "Had never + particípio + before.", { c: ["already-never-before"] }),
      ],
      independent: [
        cloze("e4", "When the waiter came, we had ___ decided what to order.", ["already"], "Had already + particípio.", { c: ["already-never-before"] }),
        fix("e5", "I never had seen such a big city before.", ["I had never seen such a big city before", "I'd never seen such a big city before"], "Never entre had e o particípio.", { c: ["already-never-before"], prompt: "Fix the word order." }),
        listen("e6", "She'd finished the report before lunch.", "What do you hear: “she had” or “she would”?", ["She had", "She would", "She did"], 0, "'d + finished (particípio) = had.", { c: ["had-short"], s: "pronunciation" }),
        dict("e7", "I'd never flown before.", "I'd = I had; never + particípio.", { c: ["already-never-before"], alt: ["I had never flown before."] }),
        cloze("e8", "I'd studied for a year, but I ___ spoken to a real person yet.", ["hadn't", "had not"], "Negativa: hadn't + particípio.", { c: ["past-perfect"] }),
      ],
      application: [
        type("e9", "Say in English: “Foi a melhor comida que eu já tinha comido.”", ["It was the best food I had ever eaten", "It was the best food I'd ever eaten", "It was the best food that I had ever eaten"], "The best… I had ever + particípio.", { c: ["already-never-before"] }),
        write("e10", "Write about a “first time” in your life (first job, first trip, first day at school): three sentences about what you had or hadn't done before that day.",
          { frame: ["Before that day, I had never …", "I had already …", "I hadn't … yet."], min: 24, check: ["Usei had never … before.", "Usei had already.", "Usei hadn't … yet.", "Todos os verbos depois de had estão no particípio."], model: "Before my first day at work, I had never worn a suit. I had already studied the company website and the products. However, I hadn't met any of my colleagues yet, so I was very nervous.", c: ["already-never-before", "past-perfect"] }),
      ],
      summary: { points: ["had already / had never … before / hadn't … yet.", "'d + particípio = had.", "'d + verbo base = would."], concepts: ["already-never-before", "had-short"] },
    }),

    lesson("l3", {
      title: "Amarrando o tempo",
      objective: "Você vai conseguir ligar acontecimentos com by the time, until, as soon as e after.",
      minutes: 10,
      context: { kind: "text", title: "Moving day", lines: [
        { en: "By the time the truck arrived, we had packed everything.", pt: "Quando o caminhão chegou, já tínhamos embalado tudo." },
        { en: "We didn't stop until we had carried the last box.", pt: "Não paramos até termos carregado a última caixa." },
        { en: "As soon as we had finished, it started to rain.", pt: "Assim que terminamos, começou a chover." },
        { en: "After cleaning the old apartment, we returned the keys.", pt: "Depois de limpar o apartamento antigo, devolvemos as chaves." },
      ] },
      explanation: {
        summary: "Conectores de tempo que pedem atenção ao tempo verbal:\n- **By the time** + passado simples, + **past perfect**\n- **until** / **as soon as** / **after** + past perfect (a ação concluída primeiro)\n- **After** + verbo-**ing** (mesmo sujeito): *After finishing, I left.*",
        details: "*By the time* destaca que algo já estava concluído quando o outro fato aconteceu. Com *after*, o past perfect é opcional, pois a ordem já está clara: *After I finished / had finished, I left.* A forma mais formal é *Having finished the report, I went home.*",
        examples: [
          { en: "By the time I got there, everyone had gone.", pt: "Quando cheguei lá, todos já tinham ido embora." },
          { en: "She waited until the rain had stopped.", pt: "Ela esperou até a chuva parar." },
          { en: "After talking to her, I felt better.", pt: "Depois de falar com ela, me senti melhor." },
        ],
        contrasts: [
          { wrong: "By the time we arrived, the store closed.", right: "By the time we arrived, the store had closed.", why: "By the time pede o past perfect na outra parte." },
          { wrong: "After to finish the report, I went home.", right: "After finishing the report, I went home.", why: "After + verbo-ing." },
        ],
      },
      guided: [
        mc("e1", "Choose: “By the time the police arrived, the thief ___.”", ["had escaped", "escapes", "has escaped"], 0, "By the time + passado, past perfect.", { c: ["by-the-time"] }),
        match("e2", "Match the connector to its meaning.", [["by the time", "quando (algo já estava concluído)"], ["until", "até"], ["as soon as", "assim que"], ["after + -ing", "depois de + verbo"]],
          "Conectores que organizam o tempo na narrativa.", { c: ["by-the-time", "until-as-soon", "after-ing"], pt: "Associe o conector ao significado." }),
        cloze("e3", "After ___ the old apartment, we returned the keys.", ["cleaning"], "After + verbo-ing.", { c: ["after-ing"], cue: "(clean)" }),
      ],
      independent: [
        cloze("e4", "By the ___ the truck arrived, we had packed everything.", ["time"], "By the time.", { c: ["by-the-time"] }),
        cloze("e5", "We didn't stop ___ we had carried the last box.", ["until", "till"], "Até: until.", { c: ["until-as-soon"] }),
        fix("e6", "After to talk to my manager, I felt better.", ["After talking to my manager, I felt better"], "After + verbo-ing.", { c: ["after-ing"], prompt: "Fix the mistake." }),
        fix("e7", "By the time I got there, everyone went home.", ["By the time I got there, everyone had gone home"], "Eles saíram antes: had gone.", { c: ["by-the-time"], prompt: "Fix the verb." }),
        dict("e8", "As soon as we had finished, it started to rain.", "As soon as + past perfect.", { c: ["until-as-soon"] }),
      ],
      application: [
        type("e9", "Join the two events with “by the time”: 1) The game ended. 2) We found our seats.", ["By the time we found our seats, the game had ended", "The game had ended by the time we found our seats"], "By the time + passado, past perfect.", { c: ["by-the-time"] }),
        type("e10", "Rewrite with “After + -ing”: “I read the contract. Then I signed it.”", ["After reading the contract, I signed it", "After reading the contract I signed it", "I signed the contract after reading it"], "After reading…, I signed it.", { c: ["after-ing"] }),
        speak("e11", "Describe a busy day using by the time, until and after + -ing.", ["By the time I got to the office, the meeting had started. I didn't have lunch until I had finished the report. After leaving work, I went straight to the gym."],
          { mode: "respond", check: ["Usei by the time com past perfect.", "Usei until.", "Usei after + verbo-ing.", "A ordem dos fatos ficou clara."], c: ["by-the-time", "until-as-soon", "after-ing"] }),
      ],
      summary: { points: ["By the time + passado, past perfect.", "until / as soon as + ação concluída.", "After + -ing."], concepts: ["by-the-time", "until-as-soon", "after-ing"] },
    }),

    lesson("l4", {
      title: "A virada da história",
      objective: "Você vai conseguir contar uma história longa com reviravolta, mantendo os tempos coerentes.",
      minutes: 10,
      context: { kind: "text", title: "The lost wallet", lines: [
        { en: "Last month I lost my wallet on the subway. I had just taken out some cash, so I was really upset.", pt: "No mês passado perdi minha carteira no metrô. Eu tinha acabado de sacar dinheiro, então fiquei muito chateado." },
        { en: "I carried on with my day, but I couldn't stop thinking about it.", pt: "Segui com o meu dia, mas não conseguia parar de pensar nisso." },
        { en: "Two days later, a stranger called me. It turned out that she had found the wallet under a seat.", pt: "Dois dias depois, uma desconhecida me ligou. Acabou que ela tinha encontrado a carteira debaixo de um banco." },
        { en: "Nothing was missing. She had even added a note with her phone number.", pt: "Não faltava nada. Ela ainda tinha colocado um bilhete com o telefone dela." },
      ] },
      explanation: {
        summary: "Uma boa história combina três tempos:\n- **passado simples** → a linha principal: *I lost my wallet.*\n- **past continuous** → o cenário: *I was going to work.*\n- **past perfect** → o que veio antes: *I had just taken out some cash.*\n\nDois phrasal verbs de narrativa:\n- **It turned out (that)** … → a revelação\n- **carry on** (+ -ing) → continuar",
        details: "*It turned out* introduz o que se descobriu no fim, muitas vezes ao contrário do esperado: *I thought it was expensive, but it turned out to be free.* *Carry on* é mais informal que *continue*: *Carry on!* (pode continuar!). **Had just** = tinha acabado de.",
        examples: [
          { en: "It turned out that we had met before.", pt: "Acabou que já nos conhecíamos." },
          { en: "The test turned out to be easy.", pt: "A prova acabou sendo fácil." },
          { en: "She carried on working until midnight.", pt: "Ela continuou trabalhando até meia-noite." },
        ],
        contrasts: [
          { wrong: "It turned out that she found the wallet two days before.", right: "It turned out that she had found the wallet two days before.", why: "A descoberta é posterior ao fato: past perfect." },
          { wrong: "We carried on to walk.", right: "We carried on walking.", why: "Carry on + verbo-ing." },
        ],
      },
      guided: [
        mc("e1", "“It turned out that the hotel was closed.” What does it mean?", ["No fim, descobrimos que o hotel estava fechado.", "O hotel virou para o outro lado.", "Decidimos fechar o hotel."], 0, "It turned out = no fim, descobriu-se.", { c: ["turn-out"], s: "vocabulary" }),
        match("e2", "Match the tense to its role in a story.", [["past simple", "a linha principal dos fatos"], ["past continuous", "o cenário, o que estava acontecendo"], ["past perfect", "o que tinha acontecido antes"], ["It turned out…", "a revelação final"]],
          "Cada tempo tem um papel na narrativa.", { c: ["past-perfect", "turn-out"], s: "grammar", pt: "Associe o tempo ao papel na história." }),
        cloze("e3", "We carried ___ walking in the rain.", ["on"], "Carry on = continuar.", { c: ["carry-on"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "It ___ out that she had found the wallet under a seat.", ["turned"], "It turned out that…", { c: ["turn-out"] }),
        fix("e5", "She carried on to work until midnight.", ["She carried on working until midnight"], "Carry on + verbo-ing.", { c: ["carry-on"], prompt: "Fix the mistake." }),
        cloze("e6", "I had ___ taken out some cash, so I was really upset.", ["just"], "Had just = tinha acabado de.", { c: ["past-perfect"], cue: "(tinha acabado de)" }),
        dict("e7", "It turned out that we had met before.", "Revelação + past perfect.", { c: ["turn-out"] }),
        order("e8", "Put the words in order: “Segui com o meu dia.”", "I carried on with my day.", "Carry on with + substantivo.", { c: ["carry-on"], extra: ["in"] }),
      ],
      application: [
        type("e9", "Say in English: “A prova acabou sendo fácil.”", ["The test turned out to be easy", "The exam turned out to be easy", "It turned out that the test was easy", "It turned out the test was easy"], "Turn out to be + adjetivo.", { c: ["turn-out"] }),
        dialog("e10", "A friend asks about your trip, which had a surprise ending.", [
          { npc: ["So what happened at the airport?", "E aí, o que aconteceu no aeroporto?"], options: [
            ["By the time we got to the gate, the plane had already left.", true, "Seu amigo arregala os olhos.", "By the time + past perfect."],
            ["When we got to the gate, the plane has left already.", false, "A ordem dos fatos fica estranha.", "Had left, não has left."],
          ] },
          { npc: ["Oh no! What did you do?", "Ah, não! O que vocês fizeram?"], options: [
            ["We carried on to the counter, and it turned out that they had booked us on the next flight.", true, "Ele ri: “Lucky you!”", "Carry on e turn out + past perfect."],
            ["We carried on to walk and it turned that they booked us.", false, "Há dois erros.", "Carried on walking; it turned out that…"],
          ] },
        ], "Contar uma história com reviravolta.", { c: ["by-the-time", "turn-out", "carry-on"] }),
      ],
      summary: { points: ["Passado simples (linha), continuous (cenário), perfect (antes).", "It turned out that… = a revelação.", "carry on + -ing = continuar."], concepts: ["turn-out", "carry-on"] },
    }),
  ],

  checkpoint: {
    intro: "New stories, told out of order. Keep the sequence of events clear with the past perfect and time connectors.",
    a: [
      cloze("q1", "When I opened the fridge, I saw that someone ___ eaten my cake.", ["had"], "Antes de eu abrir: had eaten.", { c: ["past-perfect"] }),
      mc("q2", "“When the teacher came in, the students stopped talking.” What happened first?", ["The teacher came in.", "The students stopped talking.", "The students had left."], 0, "Dois passados simples: em sequência.", { c: ["had-vs-did"], keepOrder: true }),
      fix("q3", "I never had tried sushi before that night.", ["I had never tried sushi before that night", "I'd never tried sushi before that night"], "Never entre had e o particípio.", { c: ["already-never-before"], prompt: "Fix the word order." }),
      cloze("q4", "By the ___ the ambulance arrived, the man had recovered.", ["time"], "By the time.", { c: ["by-the-time"] }),
      dict("q5", "After leaving the office, I realized I had forgotten my laptop.", "After + -ing; had + particípio.", { c: ["after-ing", "past-perfect"] }),
      type("q6", "Say in English: “No fim, ela estava certa.” (use turn out)", ["It turned out that she was right", "It turned out she was right", "She turned out to be right"], "It turned out that…", { c: ["turn-out"] }),
      cloze("q7", "The music stopped, but they carried ___ dancing.", ["on"], "Carry on + -ing.", { c: ["carry-on"], s: "vocabulary" }),
      mc("q8", "In “They'd sold the house before we called”, 'd means:", ["had", "would", "should"], 0, "'d + particípio (sold) = had.", { c: ["had-short"], s: "grammar" }),
      order("q9", "Put the words in order: “Esperei até o filme ter terminado.”", "I waited until the movie had finished.", "Until + past perfect.", { c: ["until-as-soon"], extra: ["has"] }),
      listen("q10", "By the time Marta got to the party, most people had gone home. It turned out that she had written down the wrong time.", "Why was Marta late?", ["She had the wrong time", "Her car broke down", "She forgot the party"], 0, "She had written down the wrong time.", { c: ["by-the-time", "turn-out"] }),
    ],
    b: [
      cloze("q1", "He couldn't pay because he had ___ his card at home.", ["left", "forgotten"], "Had + particípio.", { c: ["past-perfect"], cue: "(leave)" }),
      mc("q2", "“When I got to the office, my boss had left.” Did I see my boss?", ["No, the boss left before I arrived.", "Yes, the boss left after I arrived.", "We can't know."], 0, "Had left: antes da minha chegada.", { c: ["had-vs-did"], keepOrder: true }),
      cloze("q3", "When we got to the cinema, the movie had ___ started.", ["already", "just"], "Had already + particípio.", { c: ["already-never-before"] }),
      fix("q4", "By the time I found my ticket, the train left.", ["By the time I found my ticket, the train had left"], "O trem saiu antes: had left.", { c: ["by-the-time"], prompt: "Fix the verb." }),
      type("q5", "Rewrite with “After + -ing”: “She finished the course. Then she moved to Lisbon.”", ["After finishing the course, she moved to Lisbon", "After finishing the course she moved to Lisbon", "She moved to Lisbon after finishing the course"], "After finishing…, she moved.", { c: ["after-ing"] }),
      dict("q6", "It turned out that nobody had read the email.", "Revelação + past perfect.", { c: ["turn-out"] }),
      fix("q7", "Despite the noise, he carried on to read.", ["Despite the noise, he carried on reading"], "Carry on + verbo-ing.", { c: ["carry-on"], prompt: "Fix the mistake." }),
      mc("q8", "In “I'd help you if I could”, 'd means:", ["would", "had", "did"], 0, "'d + verbo base (help) = would.", { c: ["had-short"], s: "grammar" }),
      cloze("q9", "As ___ as she had read the message, she called me back.", ["soon"], "As soon as.", { c: ["until-as-soon"] }),
      listen("q10", "Paulo had never driven on the left before. After practicing for an hour in a parking lot, he carried on to the city without any problems.", "What did Paulo do before driving to the city?", ["He practiced in a parking lot", "He took a driving test", "He rented another car"], 0, "After practicing for an hour in a parking lot.", { c: ["after-ing", "already-never-before"] }),
    ],
    production: write("t1", "Tell a true or invented story of about 90 words that does NOT follow chronological order. Start with the most dramatic moment, then explain what had happened before, and end with how it turned out.",
      { mode: "free", min: 75, check: ["Comecei por um momento marcante, não pelo início.", "Usei o past perfect para o que veio antes.", "Usei by the time, until, as soon as ou after + -ing.", "Usei It turned out para a revelação.", "Os tempos verbais ficaram coerentes do começo ao fim."],
        model: "I was standing in front of two hundred people when I realized I had brought the wrong presentation. I had prepared for weeks, but that morning I had copied an old file to my laptop. By the time I noticed, the director had already introduced me. I carried on without slides and simply told the story of the project. After finishing, I expected complaints. It turned out that people had enjoyed it more than a normal presentation, and two of them asked me for advice.", c: ["past-perfect", "by-the-time", "turn-out", "carry-on"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "O trem perdido",
      goal: "Ler uma narrativa fora da ordem cronológica e reconstruir a sequência dos fatos.",
      context: { kind: "text", title: "The missed train", lines: [
        { en: "When I got to the station, the train had already left.", pt: "Quando cheguei à estação, o trem já tinha partido." },
        { en: "I had checked the timetable the night before, but the company had changed it that morning.", pt: "Eu tinha conferido o horário na noite anterior, mas a empresa o tinha alterado naquela manhã." },
        { en: "By the time the next train arrived, I had been there for two hours.", pt: "Quando o trem seguinte chegou, eu já estava lá havia duas horas." },
        { en: "It turned out that my meeting had been cancelled anyway, so I carried on to the city and spent the day at a museum.", pt: "Acabou que minha reunião tinha sido cancelada de qualquer forma, então segui para a cidade e passei o dia em um museu." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "Which event happened first?", ["The writer checked the timetable.", "The writer got to the station.", "The company changed the timetable."], 0, "The night before: é o fato mais antigo.", { c: ["past-perfect"], keepOrder: true }),
        rd("r2", PASSAGE, "Why did the writer miss the train?", ["The timetable had been changed that morning.", "The writer woke up late.", "The station was closed."], 0, "The company had changed it that morning.", { c: ["had-vs-did"] }),
        rd("r3", PASSAGE, "What did the writer discover in the end?", ["The meeting had been cancelled.", "The museum was closed.", "The train was free."], 0, "It turned out that my meeting had been cancelled.", { c: ["turn-out"] }),
        cloze("r4", "By the time the next train arrived, I had ___ there for two hours.", ["been", "waited"], "Had been: past perfect de be.", { c: ["by-the-time"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Uma história contada de trás para frente",
      goal: "Ouvir uma narrativa e identificar a ordem real dos fatos.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "When we arrived at the restaurant, they had given our table to someone else. I'd booked it a week before, but I'd forgotten to confirm. We carried on to a small cafe nearby. It turned out to be the best meal of the trip.", pt: "Quando chegamos ao restaurante, tinham dado nossa mesa a outra pessoa. Eu tinha reservado uma semana antes, mas tinha esquecido de confirmar. Seguimos para um pequeno café ali perto. Acabou sendo a melhor refeição da viagem." }] },
      exercises: [
        listen("a1", "When we arrived at the restaurant, they had given our table to someone else. I'd booked it a week before, but I'd forgotten to confirm.", "Why did they lose the table?", ["The speaker forgot to confirm", "The restaurant was closed", "They arrived a day late"], 0, "I'd forgotten to confirm.", { c: ["had-short"] }),
        listen("a2", "We carried on to a small cafe nearby. It turned out to be the best meal of the trip.", "How was the meal at the cafe?", ["Excellent", "Terrible", "Too expensive"], 0, "It turned out to be the best meal of the trip.", { c: ["turn-out"] }),
        dict("a3", "I'd booked it a week before.", "I'd = I had; booked é particípio.", { c: ["had-short"], prompt: "Type what you hear.", alt: ["I had booked it a week before."] }),
      ],
    }),
    writing: activity("writing", {
      title: "O que tinha acontecido?",
      goal: "Escrever a explicação para uma cena, contando o que veio antes.",
      exercises: [
        write("w1", "Scene: “When I opened the door, the whole apartment was full of water.” Write about 55 words explaining what had happened before and what you did next.",
          { mode: "free", min: 45, check: ["Expliquei as causas com o past perfect.", "Usei by the time, as soon as ou after + -ing.", "Contei o que fiz depois com o passado simples.", "Usei turn out ou carry on."], model: "When I opened the door, the whole apartment was full of water. My neighbor had left the tap running and had gone away for the weekend. By the time I arrived, the water had reached the living room. After calling the building manager, I moved my books to the bed. It turned out that the insurance covered everything.", c: ["past-perfect", "by-the-time", "after-ing"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Uma história com reviravolta",
      goal: "Contar em voz alta uma história de um minuto com final inesperado.",
      exercises: [
        speak("s1", "Tell a one-minute story about something that went wrong and then turned out well. Include what had happened before the problem.", ["Last year I missed a flight. I had set my alarm, but my phone had died during the night. By the time I got to the airport, the gate had closed. I carried on to the counter. It turned out that the next flight was cheaper and faster."],
          { mode: "respond", check: ["Usei o past perfect pelo menos duas vezes.", "Usei by the time ou after + -ing.", "Usei It turned out para o final.", "Pronunciei I'd / had de forma natural.", "Ouvi o modelo e comparei."], c: ["past-perfect", "turn-out", "by-the-time"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: explicar um atraso",
      goal: "Explicar a alguém por que algo deu errado, deixando clara a ordem dos fatos.",
      exercises: [
        dialog("m1", "You arrive late to an important dinner and need to explain what happened.", [
          { npc: ["We were worried! What happened?", "Ficamos preocupados! O que aconteceu?"], options: [
            ["I'm so sorry. By the time I left the office, the last bus had already gone.", true, "Eles entendem.", "By the time + past perfect."],
            ["Sorry. When I left the office, the last bus has gone.", false, "A sequência fica confusa.", "Had gone, não has gone."],
          ] },
          { npc: ["Why didn't you call us?", "Por que você não ligou?"], options: [
            ["I tried, but my battery had died. I hadn't charged my phone the night before.", true, "Alguém oferece um carregador.", "Duas causas anteriores no past perfect."],
            ["I tried, but my battery died before and I don't charged.", false, "A explicação tem erros.", "Had died; hadn't charged."],
          ] },
          { npc: ["So how did you get here?", "E como você chegou aqui?"], options: [
            ["I carried on walking, and it turned out that a colleague was driving this way.", true, "Todos riem aliviados.", "Carry on + -ing; it turned out."],
            ["I carried on to walk and it turned a colleague drove.", false, "Soa estranho.", "Carried on walking; it turned out that…"],
          ] },
        ], "Explicar um atraso com a ordem dos fatos clara.", { c: ["by-the-time", "past-perfect", "turn-out", "carry-on"] }),
        type("m2", "Say in English: “Eu não tinha carregado meu celular.”", ["I hadn't charged my phone", "I had not charged my phone", "I hadn't charged my cell phone"], "Hadn't + particípio.", { c: ["past-perfect"] }),
      ],
      outside: {
        title: "Fora do app: conte de trás para frente",
        instructions: "Pense em algo que aconteceu com você nesta semana. Conte em inglês, em voz alta ou por escrito, começando pelo final ou pelo momento mais marcante e voltando ao que tinha acontecido antes. Use pelo menos três verbos no past perfect e termine com “It turned out that…”.",
        checklist: ["Não comecei pelo início cronológico.", "Usei pelo menos três verbos no past perfect.", "Usei um conector de tempo (by the time, until, after).", "Terminei com It turned out."],
      },
    }),
  },
});
