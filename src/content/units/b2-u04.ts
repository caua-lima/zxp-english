/** B2 · Unidade 4 — Certeza e nuance: dedução, graus de certeza e atenuação (hedging). */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "The office was empty when I arrived this morning. The lights were on, so someone must have come in earlier. Marta's coat was on her chair, so she can't have gone far. She might be in a meeting on the third floor. People in this company tend to start early, and the manager is likely to arrive soon. It seems that everyone is, to some extent, avoiding the broken elevator.";

export default defineUnit({
  id: "b2-u04",

  concepts: [
    concept("must-be", "pattern", "must be / can't be", "deve ser / não pode ser", "l1", ["She must be tired. She can't be at home.", "Ela deve estar cansada. Ela não pode estar em casa."], { note: "Dedução sobre o presente. O contrário de must be (dedução) é can't be, não mustn't be." }),
    concept("might-be", "pattern", "might / may / could be", "pode ser, talvez seja", "l1", ["He might be in a meeting.", "Ele pode estar em reunião."], { note: "Possibilidade, sem certeza." }),
    concept("must-have", "pattern", "must have / can't have / might have + participle", "deve ter / não pode ter / pode ter + particípio", "l2", ["She must have forgotten.", "Ela deve ter esquecido."], { note: "Dedução sobre o passado." }),
    concept("had-to", "pattern", "had to / must have", "teve que / deve ter", "l2", ["He had to leave early. / He must have left early.", "Ele teve que sair cedo. / Ele deve ter saído cedo."], { note: "had to = obrigação no passado. must have = dedução sobre o passado." }),
    concept("probably", "word", "definitely / probably / possibly", "com certeza / provavelmente / possivelmente", "l3", ["She will probably come. She probably won't come.", "Ela provavelmente virá. Ela provavelmente não virá."], { note: "Depois de will; antes de won't." }),
    concept("likely-to", "pattern", "be likely / unlikely to", "ser provável / improvável que", "l3", ["Prices are likely to rise.", "É provável que os preços subam."], { note: "be likely to + verbo base." }),
    concept("seems-to", "pattern", "seem / appear to + verb", "parecer + verbo", "l4", ["The plan seems to work.", "O plano parece funcionar."], { note: "Também: It seems that… / It appears that…" }),
    concept("tend-to", "pattern", "tend to + verb", "tender a, costumar", "l4", ["People tend to underestimate costs.", "As pessoas tendem a subestimar os custos."], { note: "Generaliza sem afirmar que é sempre assim." }),
    concept("to-some-extent", "phrase", "to some extent / in most cases", "até certo ponto / na maioria dos casos", "l4", ["To some extent, I agree.", "Até certo ponto, eu concordo."], { note: "Limita o alcance de uma afirmação." }),
  ],

  lessons: [
    lesson("l1", {
      title: "Deve ser, não pode ser",
      objective: "Você vai conseguir tirar conclusões sobre o presente a partir de pistas.",
      minutes: 9,
      context: { kind: "dialogue", title: "At a colleague's desk", lines: [
        { who: "Rui", en: "Where's Helena? Her computer is on.", pt: "Cadê a Helena? O computador dela está ligado." },
        { who: "Sofia", en: "She must be in the building, then.", pt: "Então ela deve estar no prédio." },
        { who: "Rui", en: "She can't be at lunch. It's only ten o'clock.", pt: "Ela não pode estar no almoço. São só dez horas." },
        { who: "Sofia", en: "She might be in the meeting room, or she could be talking to the director.", pt: "Ela pode estar na sala de reunião, ou pode estar falando com o diretor." },
      ] },
      explanation: {
        summary: "Para **deduzir** algo sobre o presente:\n- **must be** → tenho quase certeza de que **é**\n- **can't be** → tenho quase certeza de que **não é**\n- **might / may / could be** → é **possível**\n\nAqui *must* não é obrigação: é conclusão lógica.",
        details: "O oposto de *must be* (dedução) é **can't be**, e não “mustn't be” (*mustn't* é proibição). Para ações em andamento: *She must be working. He might be sleeping.* Evite *can* para possibilidade de um caso específico: diga *It might be true*, e não “It can be true”.",
        examples: [
          { en: "You've been driving all day. You must be exhausted.", pt: "Você dirigiu o dia todo. Deve estar exausto." },
          { en: "That can't be right. Check it again.", pt: "Isso não pode estar certo. Confira de novo." },
          { en: "It may be a mistake.", pt: "Pode ser um engano." },
        ],
        contrasts: [
          { wrong: "It's only ten. She mustn't be at lunch.", right: "It's only ten. She can't be at lunch.", why: "Dedução negativa: can't be." },
          { wrong: "She must to be in the building.", right: "She must be in the building.", why: "Modal + verbo base, sem to." },
        ],
      },
      guided: [
        mc("e1", "The lights are off and nobody answers the door. Choose:", ["They must be out.", "They can't be out.", "They must be home."], 0, "As pistas indicam que saíram: must be out.", { c: ["must-be"] }),
        match("e2", "Match the phrase to the degree of certainty.", [["It must be true.", "quase certeza de que sim"], ["It might be true.", "é possível"], ["It can't be true.", "quase certeza de que não"], ["It is true.", "é um fato"]],
          "Os modais graduam a certeza.", { c: ["must-be", "might-be"], pt: "Associe a frase ao grau de certeza." }),
        cloze("e3", "She ___ be at lunch. It's only ten o'clock.", ["can't", "cannot"], "Dedução negativa: can't be.", { c: ["must-be"] }),
      ],
      independent: [
        cloze("e4", "Her computer is on, so she ___ be in the building.", ["must"], "Conclusão lógica: must be.", { c: ["must-be"] }),
        cloze("e5", "I'm not sure where he is. He ___ be in the meeting room.", ["might", "may", "could"], "Possibilidade: might be.", { c: ["might-be"] }),
        fix("e6", "He ate an hour ago. He mustn't be hungry.", ["He ate an hour ago. He can't be hungry"], "Dedução negativa: can't be.", { c: ["must-be"], prompt: "Fix the modal." }),
        dict("e7", "She might be in the meeting room.", "Possibilidade com might.", { c: ["might-be"] }),
        order("e8", "Put the words in order: “Isso não pode estar certo.”", "That can't be right.", "Can't be + adjetivo.", { c: ["must-be"], extra: ["to"] }),
      ],
      application: [
        type("e9", "Your friend ran a marathon this morning. Deduce: “Você deve estar exausto.”", ["You must be exhausted", "You must be very tired"], "Must be + adjetivo.", { c: ["must-be"] }),
        type("e10", "You don't know why the store is closed. Say: “Pode ser feriado.”", ["It might be a holiday", "It may be a holiday", "It could be a holiday"], "Possibilidade: might / may / could be.", { c: ["might-be"] }),
        speak("e11", "Look around you (or imagine a neighbor's house). Make three deductions: one with must be, one with can't be and one with might be.", ["The window is open, so someone must be home. It can't be the children, because they are at school. It might be the grandmother."],
          { mode: "respond", check: ["Usei must be para uma quase certeza.", "Usei can't be para uma dedução negativa.", "Usei might be para uma possibilidade.", "Dei a pista que justifica cada dedução."], c: ["must-be", "might-be"] }),
      ],
      summary: { points: ["must be = quase certeza.", "can't be = quase certeza de que não.", "might / may / could be = possível."], concepts: ["must-be", "might-be"] },
    }),

    lesson("l2", {
      title: "O que deve ter acontecido",
      objective: "Você vai conseguir deduzir o que aconteceu no passado e distinguir dedução de obrigação.",
      minutes: 10,
      context: { kind: "dialogue", title: "A missing package", lines: [
        { who: "Ivo", en: "My package isn't here. The tracking says “delivered”.", pt: "Meu pacote não está aqui. O rastreio diz “entregue”." },
        { who: "Nara", en: "The courier must have left it with a neighbor.", pt: "O entregador deve ter deixado com um vizinho." },
        { who: "Ivo", en: "He can't have left it at the door. I was home all day.", pt: "Ele não pode ter deixado na porta. Fiquei em casa o dia todo." },
        { who: "Nara", en: "He might have gone to the wrong building. Last week I had to pick mine up at the post office.", pt: "Ele pode ter ido ao prédio errado. Na semana passada eu tive que buscar o meu nos correios." },
      ] },
      explanation: {
        summary: "Dedução sobre o **passado**: modal + **have** + particípio.\n- **must have** left → deve ter deixado\n- **can't have** left → não pode ter deixado\n- **might have** gone → pode ter ido\n\nNão confunda:\n- **had to** + verbo → **obrigação** que aconteceu\n- **must have** + particípio → **dedução**",
        details: "*He had to leave early* = ele precisou sair cedo (fato). *He must have left early* = eu concluo que ele saiu cedo (suposição). Na fala: **must've**, **might've**, **can't have**. *Couldn't have* também serve para a dedução negativa.",
        examples: [
          { en: "The ground is wet. It must have rained.", pt: "O chão está molhado. Deve ter chovido." },
          { en: "She can't have forgotten. I reminded her twice.", pt: "Ela não pode ter esquecido. Eu a lembrei duas vezes." },
          { en: "I had to work on Saturday.", pt: "Tive que trabalhar no sábado." },
        ],
        contrasts: [
          { wrong: "The ground is wet. It had to rain.", right: "The ground is wet. It must have rained.", why: "É dedução, não obrigação." },
          { wrong: "She must have forgot.", right: "She must have forgotten.", why: "Depois de have: particípio." },
        ],
      },
      guided: [
        mc("e1", "The ground is wet this morning. Choose:", ["It must have rained last night.", "It had to rain last night.", "It must rain last night."], 0, "Dedução sobre o passado: must have + particípio.", { c: ["must-have"] }),
        mc("e2", "“I had to pick it up at the post office.” This is:", ["an obligation that happened", "a guess about the past", "a plan for the future"], 0, "Had to = obrigação no passado.", { c: ["had-to"] }),
        cloze("e3", "The courier must ___ left it with a neighbor.", ["have"], "Must have + particípio.", { c: ["must-have"] }),
      ],
      independent: [
        cloze("e4", "He ___ have left it at the door. I was home all day.", ["can't", "couldn't", "cannot"], "Dedução negativa: can't have.", { c: ["must-have"] }),
        cloze("e5", "The bus didn't come, so I ___ to walk to work.", ["had"], "Obrigação no passado: had to.", { c: ["had-to"] }),
        fix("e6", "She isn't answering. She must have forgot her phone.", ["She isn't answering. She must have forgotten her phone", "She isn't answering. She must've forgotten her phone"], "Depois de have: particípio (forgotten).", { c: ["must-have"], prompt: "Fix the verb." }),
        fix("e7", "There are footprints in the garden. Someone had to come in last night.", ["There are footprints in the garden. Someone must have come in last night"], "É dedução: must have come.", { c: ["had-to"], prompt: "Fix it: this is a deduction." }),
        dict("e8", "He might have gone to the wrong building.", "Might have + particípio.", { c: ["must-have"] }),
      ],
      application: [
        type("e9", "Your colleague looks very happy after the interview. Deduce: “Deve ter ido bem.”", ["It must have gone well", "It must've gone well"], "Must have gone.", { c: ["must-have"] }),
        dialog("e10", "You and a friend find the restaurant closed, although you had a reservation.", [
          { npc: ["It's closed! But I booked a table.", "Está fechado! Mas eu reservei uma mesa."], options: [
            ["They must have made a mistake with the date.", true, "Seu amigo confere a mensagem.", "Dedução sobre o passado."],
            ["They had to make a mistake with the date.", false, "Soa como obrigação.", "Dedução: must have made."],
          ] },
          { npc: ["The confirmation says today. Maybe there was an emergency.", "A confirmação diz hoje. Talvez tenha havido uma emergência."], options: [
            ["Yes, something might have happened in the kitchen. Let's call them.", true, "Vocês ligam e descobrem um problema elétrico.", "Possibilidade no passado."],
            ["Yes, something might happened.", false, "Falta uma palavra.", "Might have happened."],
          ] },
        ], "Deduzir o que aconteceu a partir de pistas.", { c: ["must-have", "had-to"] }),
      ],
      summary: { points: ["must / can't / might have + particípio.", "had to = obrigação; must have = dedução.", "Particípio depois de have."], concepts: ["must-have", "had-to"] },
    }),

    lesson("l3", {
      title: "Provavelmente",
      objective: "Você vai conseguir graduar a certeza sobre o futuro com advérbios e com be likely to.",
      minutes: 9,
      context: { kind: "text", title: "Forecast for the company", lines: [
        { en: "Sales will definitely grow this year.", pt: "As vendas com certeza vão crescer este ano." },
        { en: "We will probably open a second store in June.", pt: "Provavelmente abriremos uma segunda loja em junho." },
        { en: "We probably won't hire new people before that.", pt: "Provavelmente não contrataremos pessoas novas antes disso." },
        { en: "Costs are likely to rise, and prices are unlikely to fall.", pt: "É provável que os custos subam e improvável que os preços caiam." },
      ] },
      explanation: {
        summary: "Escala de certeza:\n- **definitely** (100%) → **probably** → **possibly / perhaps** → **probably not** → **definitely not**\n\nPosição:\n- depois de **will**: *She **will probably** come.*\n- antes de **won't**: *She **probably won't** come.*\n\nOutra estrutura: **be likely / unlikely to** + verbo.",
        details: "*Likely* é adjetivo: *It is likely to rain* = *It will probably rain.* Também: *It's likely that prices will rise.* *Perhaps* e *maybe* ficam no início da frase: *Maybe she'll come.* Não confunda *maybe* (advérbio) com *may be* (modal + verbo).",
        examples: [
          { en: "I'll definitely be there.", pt: "Com certeza estarei lá." },
          { en: "He probably won't agree.", pt: "Ele provavelmente não vai concordar." },
          { en: "The meeting is unlikely to finish before six.", pt: "É improvável que a reunião termine antes das seis." },
        ],
        contrasts: [
          { wrong: "She won't probably come.", right: "She probably won't come.", why: "Probably vem antes de won't." },
          { wrong: "It is likely that rain.", right: "It is likely to rain.", why: "Be likely to + verbo base." },
        ],
      },
      guided: [
        mc("e1", "Choose the correct sentence.", ["He probably won't agree.", "He won't probably agree.", "He probably doesn't will agree."], 0, "Probably antes de won't.", { c: ["probably"] }),
        order("e2", "Put the words in order: “Ela provavelmente virá.”", "She will probably come.", "Will + probably + verbo.", { c: ["probably"] }),
        cloze("e3", "Costs are likely ___ rise next year.", ["to"], "Be likely to + verbo.", { c: ["likely-to"] }),
      ],
      independent: [
        cloze("e4", "We will ___ open a second store in June. It's almost certain.", ["probably", "definitely"], "Will + probably.", { c: ["probably"] }),
        fix("e5", "They won't probably finish today.", ["They probably won't finish today"], "Probably antes de won't.", { c: ["probably"], prompt: "Fix the word order." }),
        cloze("e6", "Prices are ___ to fall. Nobody expects that.", ["unlikely"], "Improvável: unlikely to.", { c: ["likely-to"], cue: "(improvável)" }),
        dict("e7", "The meeting is unlikely to finish before six.", "Be unlikely to + verbo.", { c: ["likely-to"] }),
        type("e8", "Rewrite with “likely”: “It will probably rain tomorrow.”", ["It is likely to rain tomorrow", "It's likely to rain tomorrow", "It is likely that it will rain tomorrow"], "It is likely to rain.", { c: ["likely-to"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu com certeza estarei lá.”", ["I will definitely be there", "I'll definitely be there"], "Will + definitely.", { c: ["probably"] }),
        write("e10", "Write four predictions about your next twelve months, each with a different degree of certainty.",
          { mode: "guided", frame: ["I will definitely …", "I will probably …", "I probably won't …", "I am likely / unlikely to …"], min: 28, check: ["Usei definitely e probably na posição correta.", "Usei probably won't (e não won't probably).", "Usei be likely ou unlikely to + verbo."], model: "I will definitely finish this English course. I will probably travel to the coast in January. I probably won't change jobs this year. I am unlikely to buy a car, because prices are too high.", c: ["probably", "likely-to"] }),
      ],
      summary: { points: ["will probably / probably won't.", "be likely / unlikely to + verbo.", "definitely → probably → possibly."], concepts: ["probably", "likely-to"] },
    }),

    lesson("l4", {
      title: "Sem soar categórico",
      objective: "Você vai conseguir atenuar afirmações para soar preciso e menos categórico.",
      minutes: 10,
      context: { kind: "text", title: "From a report", lines: [
        { en: "Customers tend to buy more at the end of the month.", pt: "Os clientes tendem a comprar mais no fim do mês." },
        { en: "The new layout seems to increase sales.", pt: "O novo layout parece aumentar as vendas." },
        { en: "It appears that younger customers prefer the app.", pt: "Parece que os clientes mais jovens preferem o aplicativo." },
        { en: "To some extent, the results depend on the weather.", pt: "Até certo ponto, os resultados dependem do clima." },
      ] },
      explanation: {
        summary: "**Hedging** é atenuar para dizer só o que você pode sustentar:\n- **tend to** + verbo → costuma, mas não sempre\n- **seem / appear to** + verbo → é o que os dados sugerem\n- **It seems / appears that** …\n- **to some extent**, **in most cases**, **generally** → limitam o alcance\n\nCompare: *Men drive faster* (categórico) × *Men **tend to** drive faster* (preciso).",
        details: "Em inglês acadêmico e profissional, afirmações absolutas (*always, never, everyone, proves*) soam ingênuas ou arrogantes. Atenuar não é insegurança: é rigor. Mas não exagere: uma camada de atenuação por frase basta (*It seems that it might possibly…* é demais).",
        examples: [
          { en: "The data suggests that the campaign worked.", pt: "Os dados sugerem que a campanha funcionou." },
          { en: "In most cases, the problem is the battery.", pt: "Na maioria dos casos, o problema é a bateria." },
          { en: "He appears to be the right person for the job.", pt: "Ele parece ser a pessoa certa para a vaga." },
        ],
        contrasts: [
          { wrong: "Customers tend buying more at the end of the month.", right: "Customers tend to buy more at the end of the month.", why: "Tend to + verbo base." },
          { wrong: "It seems to that the plan works.", right: "It seems that the plan works.", why: "It seems that + frase; ou The plan seems to work." },
        ],
      },
      guided: [
        mc("e1", "Which sentence is more careful (hedged)?", ["Teenagers tend to sleep less than they need.", "Teenagers never sleep enough.", "All teenagers sleep badly."], 0, "Tend to generaliza sem absolutizar.", { c: ["tend-to"] }),
        match("e2", "Match the categorical sentence to its hedged version.", [["This proves the theory.", "This seems to support the theory."], ["Everyone prefers the app.", "Most users tend to prefer the app."], ["The problem is the battery.", "In most cases, the problem is the battery."], ["I agree.", "To some extent, I agree."]],
          "A versão atenuada afirma só o que se pode sustentar.", { c: ["seems-to", "tend-to", "to-some-extent"], pt: "Associe a frase categórica à versão atenuada." }),
        cloze("e3", "The new layout seems ___ increase sales.", ["to"], "Seem to + verbo.", { c: ["seems-to"] }),
      ],
      independent: [
        cloze("e4", "People ___ to underestimate how long a project takes.", ["tend"], "Tend to + verbo.", { c: ["tend-to"] }),
        cloze("e5", "To some ___, the results depend on the weather.", ["extent", "degree"], "To some extent.", { c: ["to-some-extent"] }),
        fix("e6", "Customers tend buying more in December.", ["Customers tend to buy more in December"], "Tend to + verbo base.", { c: ["tend-to"], prompt: "Fix the mistake." }),
        type("e7", "Hedge this sentence with “seems to”: “The new medicine works.”", ["The new medicine seems to work"], "Seems to + verbo base.", { c: ["seems-to"] }),
        dict("e8", "It appears that younger customers prefer the app.", "It appears that + frase.", { c: ["seems-to"] }),
      ],
      application: [
        type("e9", "Limit the claim. Say: “Na maioria dos casos, o problema é a bateria.”", ["In most cases, the problem is the battery", "In most cases the problem is the battery"], "In most cases, …", { c: ["to-some-extent"] }),
        write("e10", "Rewrite these three categorical sentences so they sound careful: “Brazilians love soccer. Rich people are unhappy. Technology makes life better.”",
          { mode: "guided", min: 20, check: ["Usei tend to.", "Usei seem to, appear to ou It seems that.", "Usei to some extent, in most cases ou generally.", "Não usei mais de uma atenuação por frase."], model: "Brazilians tend to love soccer. It seems that money does not always bring happiness. To some extent, technology makes life better, although it also creates new problems.", c: ["tend-to", "seems-to", "to-some-extent"] }),
        speak("e11", "Describe a habit of people in your city or country without being categorical. Use tend to, seem to and in most cases. Stress the hedging words lightly.", ["People in my city tend to have dinner late. They seem to prefer small restaurants. In most cases, families eat together on Sundays."],
          { mode: "respond", check: ["Usei tend to.", "Usei seem to ou It seems that.", "Usei in most cases ou to some extent.", "Evitei always, never e everyone."], c: ["tend-to", "seems-to", "to-some-extent"] }),
      ],
      summary: { points: ["tend to + verbo.", "seem / appear to; It seems that…", "to some extent; in most cases."], concepts: ["seems-to", "tend-to", "to-some-extent"] },
    }),
  ],

  checkpoint: {
    intro: "New clues, new forecasts and new claims. Decide how sure you are and say exactly that.",
    a: [
      mc("q1", "She has just won the lottery. Choose:", ["She must be thrilled.", "She can't be thrilled.", "She must to be thrilled."], 0, "Quase certeza: must be.", { c: ["must-be"] }),
      cloze("q2", "That ___ be Paulo's car. His is red, and this one is blue.", ["can't", "cannot"], "Dedução negativa: can't be.", { c: ["must-be"] }),
      type("q3", "You don't know why the internet is slow. Say: “Pode ser o roteador.”", ["It might be the router", "It may be the router", "It could be the router"], "Possibilidade: might be.", { c: ["might-be"] }),
      fix("q4", "The cake is gone. The children must have ate it.", ["The cake is gone. The children must have eaten it"], "Depois de have: particípio (eaten).", { c: ["must-have"], prompt: "Fix the verb." }),
      mc("q5", "“The road was closed, so we had to turn back.” This is:", ["an obligation", "a deduction", "a prediction"], 0, "Had to = obrigação no passado.", { c: ["had-to"] }),
      order("q6", "Put the words in order: “Eles provavelmente não virão.”", "They probably won't come.", "Probably antes de won't.", { c: ["probably"] }),
      cloze("q7", "The company is ___ to announce the results on Friday. Everyone expects it.", ["likely"], "Be likely to + verbo.", { c: ["likely-to"] }),
      dict("q8", "Small companies tend to react faster.", "Tend to + verbo.", { c: ["tend-to"] }),
      cloze("q9", "The plan ___ to work, but we need more data.", ["seems", "appears"], "Seems to + verbo.", { c: ["seems-to"] }),
      listen("q10", "Nobody has seen Daniel today. His car isn't in the parking lot, so he can't have come by car. He might have taken the day off.", "What does the speaker think about Daniel?", ["He possibly took the day off", "He definitely came by car", "He is certainly in a meeting"], 0, "He might have taken the day off.", { c: ["must-have", "might-be"] }),
    ],
    b: [
      mc("q1", "He has three jobs and two small children. Choose:", ["He must be very busy.", "He can't be very busy.", "He must being busy."], 0, "Quase certeza: must be.", { c: ["must-be"] }),
      fix("q2", "You just had lunch. You mustn't be hungry already.", ["You just had lunch. You can't be hungry already"], "Dedução negativa: can't be.", { c: ["must-be"], prompt: "Fix the modal." }),
      cloze("q3", "Take an umbrella. It ___ rain later, but I'm not sure.", ["might", "may", "could"], "Possibilidade: might.", { c: ["might-be"] }),
      type("q4", "The door was locked and the window is broken. Deduce: “Alguém deve ter entrado pela janela.”", ["Someone must have come in through the window", "Somebody must have come in through the window", "Someone must have entered through the window", "Someone must have gotten in through the window", "Someone must have got in through the window"], "Must have + particípio.", { c: ["must-have"] }),
      cloze("q5", "My flight was cancelled, so I ___ to sleep at the airport.", ["had"], "Obrigação no passado: had to.", { c: ["had-to"] }),
      fix("q6", "We won't definitely move this year.", ["We definitely won't move this year"], "O advérbio vem antes de won't.", { c: ["probably"], prompt: "Fix the word order." }),
      dict("q7", "Interest rates are unlikely to fall this year.", "Be unlikely to + verbo.", { c: ["likely-to"] }),
      fix("q8", "Tourists tend visiting the same three places.", ["Tourists tend to visit the same three places"], "Tend to + verbo base.", { c: ["tend-to"], prompt: "Fix the mistake." }),
      mc("q9", "“To some extent, I agree with you.” The speaker:", ["agrees partly", "agrees completely", "disagrees completely"], 0, "To some extent = até certo ponto.", { c: ["to-some-extent"] }),
      listen("q10", "The results are not final. It appears that the new method is faster, and in most cases it is also cheaper.", "How sure is the speaker?", ["Careful, not completely sure", "Completely sure", "Sure that the method fails"], 0, "It appears that… in most cases: afirmação atenuada.", { c: ["seems-to", "to-some-extent"] }),
    ],
    production: write("t1", "Look at this scene and write about 80 words: “You come home and find the front door open, a cup of warm coffee on the table and your dog missing.” Deduce what must, might and can't have happened, and say what will probably happen next.",
      { mode: "free", min: 65, check: ["Usei must have para a dedução mais provável.", "Usei might have para uma possibilidade.", "Usei can't have para descartar uma hipótese.", "Usei probably ou likely para o que vem a seguir.", "Dei as pistas que justificam cada dedução."],
        model: "The coffee is still warm, so someone must have been here a few minutes ago. It can't have been a thief, because nothing is missing and thieves don't usually make coffee. My sister has a key, so she might have come to visit. The dog isn't here, so she must have taken him for a walk. She probably forgot to close the door. They are likely to come back soon, so I will wait before calling anyone.", c: ["must-have", "might-be", "probably", "likely-to"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "O escritório vazio",
      goal: "Ler uma cena e distinguir fatos, deduções fortes e meras possibilidades.",
      context: { kind: "text", title: "An empty office", lines: [
        { en: "The office was empty when I arrived this morning. The lights were on, so someone must have come in earlier.", pt: "O escritório estava vazio quando cheguei hoje de manhã. As luzes estavam acesas, então alguém deve ter chegado mais cedo." },
        { en: "Marta's coat was on her chair, so she can't have gone far. She might be in a meeting on the third floor.", pt: "O casaco da Marta estava na cadeira dela, então ela não pode ter ido longe. Ela pode estar em uma reunião no terceiro andar." },
        { en: "People in this company tend to start early, and the manager is likely to arrive soon.", pt: "As pessoas nesta empresa tendem a começar cedo, e é provável que o gerente chegue logo." },
        { en: "It seems that everyone is, to some extent, avoiding the broken elevator.", pt: "Parece que todos estão, até certo ponto, evitando o elevador quebrado." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "Which of these is a fact, not a deduction?", ["The lights were on.", "Someone came in earlier.", "Marta is in a meeting."], 0, "As luzes acesas são o que o narrador viu.", { c: ["must-have"] }),
        rd("r2", PASSAGE, "How sure is the writer that Marta is in a meeting?", ["Not sure: it is only a possibility.", "Completely sure.", "Sure that she is not."], 0, "She might be in a meeting.", { c: ["might-be"] }),
        rd("r3", PASSAGE, "Why does the writer think Marta is near?", ["Her coat is on her chair.", "Her computer is on.", "She sent a message."], 0, "Her coat was on her chair, so she can't have gone far.", { c: ["must-have"] }),
        cloze("r4", "People in this company ___ to start early.", ["tend"], "Tend to + verbo.", { c: ["tend-to"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Certeza na voz",
      goal: "Perceber o grau de certeza de quem fala.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "The train will definitely be late. It probably won't arrive before nine. It might be a signal problem. They must have had an accident on the line.", pt: "O trem com certeza vai atrasar. Provavelmente não chega antes das nove. Pode ser um problema de sinalização. Deve ter havido um acidente na linha." }] },
      exercises: [
        listen("a1", "The train will definitely be late. It probably won't arrive before nine.", "What is the speaker completely sure about?", ["The train will be late", "It will arrive at nine", "It will arrive before nine"], 0, "Definitely: certeza total do atraso.", { c: ["probably"] }),
        listen("a2", "It might be a signal problem.", "Is the speaker sure about the cause?", ["No, it is only a possibility", "Yes, completely", "Yes, they saw it"], 0, "Might be: possibilidade.", { c: ["might-be"] }),
        dict("a3", "It probably won't arrive before nine.", "Probably antes de won't.", { c: ["probably"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Relatório cuidadoso",
      goal: "Escrever um parágrafo de relatório sem afirmações categóricas.",
      exercises: [
        write("w1", "Write a careful paragraph (about 60 words) reporting these raw notes: “Sales up 12% after new website. Younger customers buy on phone. Older customers still call. Not enough data yet.”",
          { mode: "summary", min: 50, check: ["Usei seem to, appear to ou It seems that.", "Usei tend to.", "Usei likely ou probably para o que vem a seguir.", "Limitei uma afirmação com to some extent ou in most cases.", "Deixei claro que os dados ainda são insuficientes."], model: "Sales rose by 12% after the new website was launched, so the change seems to have had a positive effect. Younger customers tend to buy on their phones, while older customers, in most cases, still prefer to call. However, we do not have enough data yet. The trend is likely to continue, but it is too early to draw a firm conclusion.", c: ["seems-to", "tend-to", "likely-to", "to-some-extent"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Detetive por um minuto",
      goal: "Fazer deduções em voz alta a partir de pistas.",
      exercises: [
        speak("s1", "Scene: your neighbor's mailbox is full, the plants are dry and the car hasn't moved for a week. Speak for 45 seconds: what must, might and can't be happening? Stress the modal to show how sure you are.", ["They must be away. They can't be at home, because the plants are dry. They might be on vacation. They must have left in a hurry. They will probably come back next week."],
          { mode: "respond", check: ["Usei must para a dedução mais forte.", "Usei can't para descartar algo.", "Usei might para uma possibilidade.", "Usei must have ou might have para o passado.", "Dei ênfase ao modal conforme a certeza."], c: ["must-be", "might-be", "must-have", "probably"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: investigar um problema",
      goal: "Discutir as causas de um problema sem afirmar mais do que você sabe.",
      exercises: [
        dialog("m1", "The company website went down last night. You discuss it with the technical lead.", [
          { npc: ["The site was offline for two hours. Any idea why?", "O site ficou fora do ar por duas horas. Alguma ideia do motivo?"], options: [
            ["It can't have been the server, because the logs are clean. It might have been the update we installed.", true, "Ela abre o histórico de atualizações.", "Descarta uma hipótese e propõe outra."],
            ["It was the update. I'm sure.", false, "Ela pede provas que você não tem.", "Sem evidência, a afirmação categórica é arriscada."],
          ] },
          { npc: ["The update was installed at ten. The site went down at eleven.", "A atualização foi instalada às dez. O site caiu às onze."], options: [
            ["Then the update must have caused it. These problems tend to appear under heavy traffic.", true, "Ela concorda com o raciocínio.", "Dedução forte com base na pista; tend to."],
            ["Then the update had to cause it. These problems tend appearing.", false, "Há dois erros.", "Must have caused; tend to appear."],
          ] },
          { npc: ["Will it happen again?", "Vai acontecer de novo?"], options: [
            ["It probably won't, but it's likely to return if we don't fix the code. To some extent, we were lucky.", true, "Ela agenda a correção.", "Certeza graduada, sem exagero."],
            ["It won't probably, but it's likely return.", false, "A ordem e a estrutura estão erradas.", "Probably won't; likely to return."],
          ] },
        ], "Investigar um problema: descartar, deduzir e prever com cautela.", { c: ["must-have", "tend-to", "probably", "likely-to"] }),
        type("m2", "Report carefully. Say: “Parece que a atualização causou o problema.”", ["It seems that the update caused the problem", "It appears that the update caused the problem", "The update seems to have caused the problem", "It seems the update caused the problem"], "It seems that + frase.", { c: ["seems-to"] }),
      ],
      outside: {
        title: "Fora do app: três graus de certeza",
        instructions: "Escolha uma notícia ou uma situação do seu dia. Diga ou escreva em inglês três frases sobre ela, cada uma com um grau de certeza: algo que deve ter acontecido (must have), algo que pode ter acontecido (might have) e algo que provavelmente vai acontecer (will probably / is likely to). Depois, releia uma afirmação categórica que você escreveu recentemente e atenue-a.",
        checklist: ["Fiz uma dedução forte com must have.", "Fiz uma hipótese com might have.", "Fiz uma previsão com probably ou likely.", "Atenuei uma afirmação categórica."],
      },
    }),
  },
});
