/** B1 · Unidade 3 — O que vai acontecer: previsões e condicionais frequentes. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "b1-u03",

  concepts: [
    concept("might", "pattern", "It might rain.", "Pode ser que chova.", "l1", ["I might be late tomorrow.", "Talvez eu me atrase amanhã."], { note: "might / may + verbo: possibilidade, sem certeza." }),
    concept("probably", "word", "will probably / probably won't", "provavelmente vai / provavelmente não vai", "l1", ["She'll probably come.", "Ela provavelmente vem."], { note: "Probably vem depois de will e antes de won't." }),
    concept("first-cond", "pattern", "If it rains, I'll stay home.", "Se chover, eu fico em casa.", "l2", ["If you study, you'll pass.", "Se você estudar, vai passar."], { note: "If + presente simples, will + verbo." }),
    concept("if-present", "pattern", "if I go (not “if I will go”)", "depois de if, presente simples", "l2", ["If I see her, I'll tell her.", "Se eu a vir, eu aviso."], { note: "Nunca will logo depois de if nesse tipo de frase." }),
    concept("unless", "word", "unless", "a menos que / a não ser que", "l3", ["I'll go unless it rains.", "Eu vou, a menos que chova."], { note: "unless = if… not." }),
    concept("as-soon-as", "phrase", "as soon as", "assim que", "l3", ["I'll call you as soon as I arrive.", "Te ligo assim que eu chegar."]),
    concept("when-future", "pattern", "When I arrive, I'll call.", "Quando eu chegar, eu ligo.", "l3", ["Before you leave, turn off the lights.", "Antes de sair, apague as luzes."], { note: "Depois de when, before, after, as soon as: presente simples, mesmo falando do futuro." }),
    concept("make-decision", "phrase", "make a decision", "tomar uma decisão", "l4", ["We need to make a decision today.", "Precisamos tomar uma decisão hoje."], { tags: ["collocation"] }),
    concept("take-chance", "phrase", "take a chance / take a risk", "arriscar, aproveitar a chance", "l4", ["Sometimes you have to take a chance.", "Às vezes você tem que arriscar."], { tags: ["collocation"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Talvez, provavelmente, com certeza",
      objective: "Você vai conseguir fazer previsões com diferentes graus de certeza.",
      minutes: 9,
      context: { kind: "dialogue", title: "Planejando o fim de semana", lines: [
        { who: "Ana", en: "Do you think it will rain on Saturday?", pt: "Você acha que vai chover no sábado?" },
        { who: "Leo", en: "It might rain in the morning, but it will probably be sunny in the afternoon.", pt: "Pode chover de manhã, mas provavelmente vai fazer sol à tarde." },
        { who: "Ana", en: "Will your sister come?", pt: "Sua irmã vem?" },
        { who: "Leo", en: "She probably won't. She may have to work.", pt: "Provavelmente não. Talvez ela tenha que trabalhar." },
      ] },
      explanation: {
        summary: "Graus de certeza sobre o futuro:\n- **will** = certeza ou previsão firme\n- **will probably** = bem provável\n- **might / may** = possível, mas incerto\n- **probably won't** = pouco provável\n- **won't** = certeza de que não",
        details: "**Probably** fica **depois** de will, mas **antes** de won't: *She'll probably come* / *She probably won't come*. Might e may são iguais para todas as pessoas e não levam to: *It might rain*. Não existe “will might”.",
        examples: [
          { en: "I might go to the party.", pt: "Talvez eu vá à festa." },
          { en: "They'll probably win.", pt: "Eles provavelmente vão ganhar." },
          { en: "He probably won't call.", pt: "Ele provavelmente não vai ligar." },
        ],
        contrasts: [
          { wrong: "It might to rain.", right: "It might rain.", why: "Might + verbo sem to." },
          { wrong: "She won't probably come.", right: "She probably won't come.", why: "Probably vem antes de won't." },
          { wrong: "Maybe I will might go.", right: "I might go.", why: "Um modal de cada vez." },
        ],
      },
      guided: [
        mc("e1", "Which sentence shows the speaker is NOT sure?", ["I might go to the party.", "I will go to the party.", "I won't go to the party."], 0, "Might = possibilidade, sem certeza.", { c: ["might"] }),
        match("e2", "Match the sentence to the degree of certainty.", [["It will rain.", "certeza"], ["It will probably rain.", "bem provável"], ["It might rain.", "possível"], ["It probably won't rain.", "pouco provável"]],
          "Do mais certo ao menos provável.", { c: ["might", "probably"], pt: "Associe a frase ao grau de certeza." }),
        cloze("e3", "Take an umbrella. It ___ rain later.", ["might", "may"], "Possibilidade: might ou may.", { c: ["might"] }),
      ],
      independent: [
        cloze("e4", "She'll ___ be late. She always is.", ["probably"], "Bem provável: will probably.", { c: ["probably"] }),
        order("e5", "Put the words in order: “Ele provavelmente não vem.”", "He probably won't come.", "Probably antes de won't.", { c: ["probably"] }),
        fix("e6", "I might to stay home tonight.", ["I might stay home tonight"], "Might + verbo sem to.", { c: ["might"], prompt: "Fix the mistake." }),
        dict("e7", "It will probably be sunny in the afternoon.", "Will + probably + verbo.", { c: ["probably"], alt: ["It'll probably be sunny in the afternoon."] }),
      ],
      application: [
        type("e8", "Say in English: “Talvez eu me atrase.”", ["I might be late", "I may be late"], "I might be late.", { c: ["might"] }),
        speak("e9", "Make four predictions about next week with different degrees of certainty.", ["I'll work on Monday. I'll probably go to the gym. I might see my parents. I probably won't travel."],
          { mode: "respond", check: ["Usei will para algo certo.", "Usei might ou may para algo incerto.", "Coloquei probably na posição certa."], c: ["might", "probably"] }),
      ],
      summary: { points: ["might / may + verbo = talvez.", "will probably x probably won't.", "Sem to depois de might."], concepts: ["might", "probably"] },
    }),

    lesson("l2", {
      title: "Se chover, eu fico",
      objective: "Você vai conseguir falar de consequências prováveis com o primeiro condicional.",
      minutes: 10,
      context: { kind: "dialogue", title: "Antes de uma prova", lines: [
        { who: "Bia", en: "If I don't pass this exam, I'll have to take it again in July.", pt: "Se eu não passar nesta prova, vou ter que fazer de novo em julho." },
        { who: "Ken", en: "Don't worry. If you study tonight, you'll be fine.", pt: "Não se preocupe. Se você estudar hoje à noite, vai dar certo." },
        { who: "Bia", en: "What will you do if you finish early?", pt: "O que você vai fazer se terminar cedo?" },
        { who: "Ken", en: "If I finish early, I'll wait for you outside.", pt: "Se eu terminar cedo, espero você lá fora." },
      ] },
      explanation: {
        summary: "O **primeiro condicional** fala de situações **possíveis** no futuro e de sua consequência:\n\n**If + presente simples, will + verbo**\n\n- *If it **rains**, I**'ll stay** home.*\n- *If you **study**, you**'ll pass**.*\n\nA ordem pode inverter, sem vírgula: *I'll stay home if it rains.*",
        details: "O erro típico de brasileiros é usar will nas duas partes, porque em português dizemos “se chover” com sentido de futuro. Em inglês, **depois de if vem o presente**: *If I go*, nunca “If I will go”. No lugar de will, podem aparecer might, can ou um imperativo: *If you see him, tell him.*",
        examples: [
          { en: "If we leave now, we'll catch the train.", pt: "Se sairmos agora, pegamos o trem." },
          { en: "She won't come if she's tired.", pt: "Ela não vem se estiver cansada." },
          { en: "What will you do if it rains?", pt: "O que você vai fazer se chover?" },
        ],
        contrasts: [
          { wrong: "If it will rain, I'll stay home.", right: "If it rains, I'll stay home.", why: "Depois de if, presente simples." },
          { wrong: "If you study, you pass.", right: "If you study, you'll pass.", why: "A consequência futura pede will." },
        ],
        tip: "O **'ll** é quase inaudível: *I'll stay* soa “ail stei”. Preste atenção a ele para distinguir de *I stay*.",
      },
      guided: [
        mc("e1", "Choose: “If it ___ tomorrow, we'll cancel the picnic.”", ["rains", "will rain", "rained"], 0, "Depois de if: presente simples.", { c: ["if-present"] }),
        match("e2", "Match the condition to its result.", [["If you study,", "you'll pass."], ["If we leave now,", "we'll catch the train."], ["If she's tired,", "she won't come."], ["If I see him,", "I'll tell him."]],
          "If + presente; will no resultado.", { c: ["first-cond"], s: "grammar", pt: "Associe a condição ao resultado." }),
        cloze("e3", "If you study tonight, you ___ be fine.", ["will", "'ll"], "A consequência: will.", { c: ["first-cond"] }),
      ],
      independent: [
        cloze("e4", "If I ___ early, I'll wait for you.", ["finish"], "Depois de if: presente simples.", { c: ["if-present"], cue: "(finish)", t: [["will finish", "Depois de if, use o presente simples: finish."]] }),
        order("e5", "Put the words in order: “Se sairmos agora, pegamos o trem.”", "If we leave now, we'll catch the train.", "If + presente, will + verbo.", { c: ["first-cond"] }),
        fix("e6", "If it will be sunny, we'll go to the beach.", ["If it is sunny, we'll go to the beach", "If it's sunny, we'll go to the beach"], "Depois de if, presente: is.", { c: ["if-present"], prompt: "Fix the mistake." }),
        dict("e7", "If I see her, I'll tell her.", "If + presente; will no resultado.", { c: ["first-cond", "if-present"], alt: ["If I see her, I will tell her."] }),
        cloze("e8", "She ___ come if she's tired.", ["won't", "will not"], "Consequência negativa: won't.", { c: ["first-cond"] }),
      ],
      application: [
        type("e9", "Say in English: “Se eu tiver tempo, eu te ligo.”", ["If I have time, I'll call you", "If I have time, I will call you", "I'll call you if I have time", "I will call you if I have time"], "If I have time, I'll call you.", { c: ["first-cond", "if-present"], t: [["If I will have time, I'll call you", "Depois de if, presente simples: If I have time."]] }),
        write("e10", "Write three sentences about possible situations this week and their consequences.",
          { frame: ["If I …, I'll …", "If it …, we'll …", "I won't … if …"], min: 20, check: ["Usei o presente depois de if.", "Usei will ou won't na consequência.", "Não usei will depois de if."], model: "If I finish work early, I'll go to the gym. If it rains on Saturday, we'll stay home. I won't go out if I'm tired.", c: ["first-cond", "if-present"] }),
      ],
      summary: { points: ["If + presente, will + verbo.", "Nunca will logo depois de if.", "A ordem pode inverter: I'll stay if it rains."], concepts: ["first-cond", "if-present"] },
    }),

    lesson("l3", {
      title: "A menos que, assim que, quando",
      objective: "Você vai conseguir usar unless e orações de tempo sobre o futuro.",
      minutes: 9,
      context: { kind: "message", title: "Mensagens antes de uma viagem", lines: [
        { who: "Leo", en: "I'll call you as soon as I land.", pt: "Te ligo assim que eu pousar." },
        { who: "Ana", en: "OK. When you arrive at the hotel, send me a photo!", pt: "Tá. Quando chegar ao hotel, me manda uma foto!" },
        { who: "Leo", en: "I will, unless the Wi-Fi is terrible.", pt: "Mando, a menos que o Wi-Fi esteja péssimo." },
        { who: "Ana", en: "Before you leave, check your passport.", pt: "Antes de sair, confira seu passaporte." },
      ] },
      explanation: {
        summary: "**Unless** = **a menos que** (if… not): *I'll go **unless** it rains* = I'll go if it doesn't rain.\n\nDepois de **when**, **as soon as** (assim que), **before** e **after**, usa-se o **presente simples**, mesmo falando do futuro:\n- *I'll call you **as soon as I arrive**.*\n- ***When I get** home, I'll cook.*",
        details: "A lógica é a mesma do if: a parte da condição ou do tempo fica no presente; a outra recebe will. Em português usamos o futuro do subjuntivo (“quando eu chegar”); em inglês basta o presente: *when I arrive*.",
        examples: [
          { en: "We'll be late unless we hurry.", pt: "Vamos nos atrasar, a menos que a gente se apresse." },
          { en: "I'll text you when I leave.", pt: "Te mando mensagem quando eu sair." },
          { en: "As soon as she arrives, we'll start.", pt: "Assim que ela chegar, começamos." },
        ],
        contrasts: [
          { wrong: "When I will arrive, I'll call you.", right: "When I arrive, I'll call you.", why: "Depois de when (futuro), presente simples." },
          { wrong: "I'll go unless it doesn't rain.", right: "I'll go unless it rains.", why: "Unless já é negativo." },
        ],
      },
      guided: [
        mc("e1", "“I'll go unless it rains.” This means:", ["Eu vou, se não chover.", "Eu vou, se chover.", "Eu não vou."], 0, "Unless = a menos que.", { c: ["unless"] }),
        match("e2", "Match the connector to its meaning.", [["unless", "a menos que"], ["as soon as", "assim que"], ["when", "quando"], ["before", "antes de"]],
          "Conectores de condição e de tempo.", { c: ["unless", "as-soon-as", "when-future"], pt: "Associe o conector ao significado." }),
        cloze("e3", "I'll call you as ___ as I land.", ["soon"], "As soon as = assim que.", { c: ["as-soon-as"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "When I ___ home, I'll cook dinner.", ["get", "arrive"], "Depois de when: presente simples.", { c: ["when-future"], cue: "(get)", t: [["will get", "Depois de when com sentido de futuro, presente simples."]] }),
        cloze("e5", "We'll miss the bus ___ we hurry.", ["unless"], "A menos que: unless.", { c: ["unless"] }),
        fix("e6", "As soon as she will arrive, we'll start.", ["As soon as she arrives, we'll start", "As soon as she arrives, we will start"], "Depois de as soon as: presente.", { c: ["as-soon-as", "when-future"], prompt: "Fix the mistake." }),
        dict("e7", "I'll text you when I leave.", "Will na principal; presente depois de when.", { c: ["when-future"], alt: ["I will text you when I leave."] }),
        order("e8", "Put the words in order: “Antes de sair, confira seu passaporte.”", "Before you leave, check your passport.", "Before + presente; imperativo.", { c: ["when-future"] }),
      ],
      application: [
        type("e9", "Say in English: “Eu te aviso assim que eu souber.”", ["I'll tell you as soon as I know", "I will tell you as soon as I know", "I'll let you know as soon as I know", "As soon as I know, I'll tell you"], "I'll tell you as soon as I know.", { c: ["as-soon-as"] }),
        listen("e10", "I won't go to the party unless you come with me.", "In which case will the person go?", ["If the other person comes too.", "If the other person stays home.", "In any case."], 0, "Unless you come = só se você vier.", { c: ["unless"] }),
      ],
      summary: { points: ["unless = if… not.", "when / as soon as / before + presente simples.", "Will fica na outra parte da frase."], concepts: ["unless", "as-soon-as", "when-future"] },
    }),

    lesson("l4", {
      title: "Decisões e riscos",
      objective: "Você vai conseguir discutir uma decisão, pesando condições e consequências.",
      minutes: 9,
      context: { kind: "dialogue", title: "Uma proposta de emprego", lines: [
        { who: "Ana", en: "I got a job offer in another city. I have to make a decision by Friday.", pt: "Recebi uma proposta de emprego em outra cidade. Tenho que tomar uma decisão até sexta." },
        { who: "Leo", en: "What will you do if you accept?", pt: "O que você vai fazer se aceitar?" },
        { who: "Ana", en: "If I accept, I'll have to move. I might not like the city.", pt: "Se eu aceitar, vou ter que me mudar. Pode ser que eu não goste da cidade." },
        { who: "Leo", en: "True. But if you don't take a chance, you'll never know.", pt: "Verdade. Mas se você não arriscar, nunca vai saber." },
      ] },
      explanation: {
        summary: "Para falar de decisões:\n- **make a decision** (tomar uma decisão; nunca “take a decision” no inglês americano)\n- **take a chance** / **take a risk** (arriscar)\n\nE para pesar opções, o primeiro condicional: *If I accept, I'll have to move. If I don't, I'll stay here.*",
        details: "Outros blocos úteis: *think it over* (pensar com calma), *the pros and cons* (os prós e contras), *It depends on…* (depende de…). Para pedir tempo: *I need to think about it.*",
        examples: [
          { en: "I need to make a decision soon.", pt: "Preciso tomar uma decisão logo." },
          { en: "She decided to take a chance.", pt: "Ela decidiu arriscar." },
          { en: "It depends on the salary.", pt: "Depende do salário." },
        ],
        contrasts: [
          { wrong: "I need to do a decision.", right: "I need to make a decision.", why: "Decision combina com make." },
          { wrong: "It depends of the price.", right: "It depends on the price.", why: "Depend pede on." },
        ],
      },
      guided: [
        mc("e1", "Choose: “We have to ___ a decision today.”", ["make", "do", "have"], 0, "Make a decision.", { c: ["make-decision"], s: "vocabulary" }),
        match("e2", "Match the expression to its meaning.", [["make a decision", "tomar uma decisão"], ["take a chance", "arriscar"], ["think it over", "pensar com calma"], ["It depends on…", "Depende de…"]],
          "Vocabulário para discutir escolhas.", { c: ["make-decision", "take-chance"], pt: "Associe a expressão ao significado." }),
        cloze("e3", "If you don't take a ___, you'll never know.", ["chance", "risk"], "Take a chance = arriscar.", { c: ["take-chance"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "I have to ___ a decision by Friday.", ["make"], "Make a decision.", { c: ["make-decision"], s: "vocabulary" }),
        fix("e5", "She needs to do a decision soon.", ["She needs to make a decision soon"], "Make a decision.", { c: ["make-decision"], prompt: "Fix the verb." }),
        order("e6", "Put the words in order: “Se eu aceitar, vou ter que me mudar.”", "If I accept, I'll have to move.", "If + presente, will + verbo.", { c: ["first-cond"] }),
        dict("e7", "Sometimes you have to take a chance.", "Take a chance.", { c: ["take-chance"] }),
      ],
      application: [
        dialog("e8", "A friend can't decide whether to study abroad.", [
          { npc: ["I don't know what to do. It's so expensive.", "Não sei o que fazer. É tão caro."], options: [
            ["If you get a scholarship, it will be much easier.", true, "Ela diz que vai pesquisar.", "Primeiro condicional para mostrar um caminho."],
            ["If you will get a scholarship, it is easier.", false, "A frase soa errada.", "If + presente; will no resultado."],
          ] },
          { npc: ["And if I don't like it there?", "E se eu não gostar de lá?"], options: [
            ["You might not like it, but if you don't take a chance, you'll never know.", true, "Ela sorri.", "Might e take a chance."],
            ["You must like it.", false, "Ela se sente pressionada.", "Reconheça a dúvida: you might not like it."],
          ] },
        ], "Ajudar a decidir: condições, possibilidades e riscos.", { c: ["first-cond", "might", "take-chance"] }),
        type("e9", "Say in English: “Depende do preço.”", ["It depends on the price"], "It depends on.", { c: ["make-decision"], t: [["It depends of the price", "Depend pede a preposição on."]] }),
        speak("e10", "Talk about a decision you need to make: say the options and what will happen in each case.", ["I have to make a decision about my vacation. If I travel, I'll spend a lot of money. If I stay home, I might be bored. I'll probably take a chance."],
          { mode: "respond", check: ["Usei make a decision.", "Usei dois primeiros condicionais.", "Usei might ou probably."], c: ["make-decision", "first-cond"] }),
      ],
      summary: { points: ["make a decision; take a chance / a risk.", "It depends on…", "Pesar opções com If…, I'll…"], concepts: ["make-decision", "take-chance"] },
    }),
  ],

  checkpoint: {
    intro: "Predictions and conditions in new situations. Remember: present after if, when and as soon as.",
    a: [
      cloze("q1", "If she ___ the bus, she'll be late.", ["misses"], "Depois de if: presente; com she, misses.", { c: ["if-present"], cue: "(miss)" }),
      mc("q2", "Choose: “I'm not sure. I ___ go, but I haven't decided.”", ["might", "will", "won't"], 0, "Sem certeza: might.", { c: ["might"] }),
      fix("q3", "When I will finish, I'll call you.", ["When I finish, I'll call you", "When I finish, I will call you"], "Depois de when: presente.", { c: ["when-future"], prompt: "Fix the mistake." }),
      order("q4", "Put the words in order: “Ela provavelmente vai ganhar.”", "She will probably win.", "Will + probably.", { c: ["probably"] }),
      dict("q5", "We'll be late unless we leave now.", "Unless = a menos que.", { c: ["unless"], alt: ["We will be late unless we leave now."] }),
      type("q6", "Say in English: “Se chover, eu fico em casa.”", ["If it rains, I'll stay home", "If it rains, I will stay home", "If it rains, I'll stay at home", "I'll stay home if it rains"], "If it rains, I'll stay home.", { c: ["first-cond"] }),
      cloze("q7", "It's a big risk, but I want to ___ a chance.", ["take"], "Take a chance.", { c: ["take-chance"], s: "vocabulary" }),
      listen("q8", "I'll send you the file as soon as I get to the office.", "When will the person send the file?", ["Right after arriving at the office", "Before leaving home", "Tomorrow"], 0, "As soon as I get to the office.", { c: ["as-soon-as"] }),
      mc("q9", "Which is correct?", ["I need to make a decision.", "I need to do a decision.", "I need to make a decide."], 0, "Make a decision.", { c: ["make-decision"], s: "vocabulary" }),
      dialog("q10", "You and a colleague plan an outdoor event.", [
        { npc: ["What will we do if it rains?", "O que vamos fazer se chover?"], options: [
          ["If it rains, we'll move everything inside.", true, "Ela concorda com o plano B.", "Primeiro condicional correto."],
          ["If it will rain, we move inside.", false, "A estrutura está errada.", "If + presente, will + verbo."],
        ] },
        { npc: ["Do you think many people will come?", "Você acha que vem muita gente?"], options: [
          ["They'll probably come, unless the weather is terrible.", true, "Ela fica mais tranquila.", "Probably e unless."],
          ["They won't probably come unless not rain.", false, "A frase está confusa.", "Probably antes de won't; unless já é negativo."],
        ] },
      ], "Planejar com condições e probabilidades.", { c: ["first-cond", "probably", "unless"] }),
    ],
    b: [
      cloze("q1", "If you ___ me, I'll help you.", ["call"], "Depois de if: presente.", { c: ["if-present"], cue: "(call)" }),
      mc("q2", "Choose: “He ___ pass. He hasn't studied at all.”", ["probably won't", "won't probably", "will probably"], 0, "Probably antes de won't.", { c: ["probably"] }),
      fix("q3", "I'll wait here until you will come back.", ["I'll wait here until you come back", "I will wait here until you come back"], "Depois de until: presente.", { c: ["when-future"], prompt: "Fix the mistake." }),
      order("q4", "Put the words in order: “Eu vou, a menos que chova.”", "I'll go unless it rains.", "Unless + presente.", { c: ["unless"], extra: ["doesn't"] }),
      dict("q5", "If you call her tonight, she'll be happy.", "If + presente; will no resultado.", { c: ["first-cond"], alt: ["If you call her tonight, she will be happy."] }),
      type("q6", "Say in English: “Pode ser que eu chegue atrasado.”", ["I might be late", "I may be late", "I might arrive late", "I may arrive late"], "I might be late.", { c: ["might"] }),
      cloze("q7", "As ___ as I know, I'll tell you.", ["soon"], "As soon as.", { c: ["as-soon-as"], s: "vocabulary" }),
      listen("q8", "If I get the job, I'll move to Lisbon. If I don't, I'll stay here.", "What happens if the person doesn't get the job?", ["They stay.", "They move to Lisbon.", "They look for another job."], 0, "If I don't, I'll stay here.", { c: ["first-cond"] }),
      mc("q9", "“It depends ___ the weather.”", ["on", "of", "from"], 0, "Depend on.", { c: ["make-decision"] }),
      dialog("q10", "A coworker is afraid to ask for a raise.", [
        { npc: ["I want to ask for a raise, but I'm nervous.", "Quero pedir um aumento, mas estou nervoso."], options: [
          ["If you don't ask, you won't get it.", true, "Ele ri: “That's true.”", "Primeiro condicional negativo."],
          ["If you won't ask, you don't get.", false, "A frase soa errada.", "If + presente; will no resultado."],
        ] },
        { npc: ["What if my boss says no?", "E se meu chefe disser não?"], options: [
          ["She might say no, but you should take a chance.", true, "Ele decide tentar.", "Might e take a chance."],
          ["She will say no, don't make a chance.", false, "Isso o desanima e a expressão está errada.", "Take a chance."],
        ] },
      ], "Encorajar com condições e possibilidades.", { c: ["first-cond", "might", "take-chance"] }),
    ],
    production: write("t1", "You have to choose between two options (two jobs, two courses or two cities). Write about 60 words: describe the options, what will happen in each case, and what you will probably do.",
      { mode: "argument", min: 50, check: ["Apresentei as duas opções.", "Usei pelo menos dois primeiros condicionais.", "Usei might ou probably.", "Usei unless, when ou as soon as.", "Terminei dizendo o que provavelmente vou fazer."],
        model: "I have to make a decision about my studies. If I do the course in the morning, I'll have to change my job. If I study at night, I'll be tired, but I'll keep my salary. I might ask my manager for a new schedule. Unless she says no, I'll probably study in the morning. As soon as I know, I'll enroll.", c: ["first-cond", "might", "make-decision"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Previsão do tempo",
      goal: "Ler uma previsão e identificar graus de certeza e condições.",
      context: { kind: "text", title: "Weekend forecast", lines: [
        { en: "Saturday will be sunny in the morning, but it might rain in the afternoon.", pt: "O sábado será ensolarado de manhã, mas pode chover à tarde." },
        { en: "Sunday will probably be cloudy. It probably won't rain, but take a jacket.", pt: "O domingo provavelmente será nublado. Provavelmente não vai chover, mas leve um casaco." },
        { en: "If you go to the beach, go early. As soon as the wind changes, the sea will get rough.", pt: "Se for à praia, vá cedo. Assim que o vento mudar, o mar vai ficar agitado." },
      ] },
      exercises: [
        mc("r1", "When might it rain?", ["Saturday afternoon", "Saturday morning", "Sunday morning"], 0, "It might rain in the afternoon (Saturday).", { c: ["might"], s: "reading" }),
        mc("r2", "How sure is the forecast about Sunday rain?", ["It is unlikely.", "It is certain.", "It is very likely."], 0, "It probably won't rain.", { c: ["probably"], s: "reading" }),
        type("r3", "Complete the advice from the text: “If you go to the beach, ___ early.”", ["go"], "If you go to the beach, go early.", { c: ["first-cond"], s: "reading" }),
        cloze("r4", "As ___ as the wind changes, the sea will get rough.", ["soon"], "As soon as.", { c: ["as-soon-as"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Combinando com condições",
      goal: "Entender um combinado que depende de condições.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Are you coming to dinner on Friday?", pt: "Você vem jantar na sexta?" },
        { who: "B", en: "I might be late. If I finish work at six, I'll be there at seven. I'll text you as soon as I leave.", pt: "Talvez eu me atrase. Se eu sair do trabalho às seis, chego às sete. Te mando mensagem assim que eu sair." },
      ] },
      exercises: [
        listen("a1", ["Are you coming to dinner on Friday?", "I might be late. If I finish work at six, I'll be there at seven. I'll text you as soon as I leave."], "Is the person sure to arrive on time?", ["No", "Yes", "They are not coming"], 0, "I might be late.", { c: ["might"], keepOrder: true }),
        listen("a2", ["Are you coming to dinner on Friday?", "I might be late. If I finish work at six, I'll be there at seven. I'll text you as soon as I leave."], "When will the person send a message?", ["When leaving work", "At seven", "After dinner"], 0, "As soon as I leave.", { c: ["as-soon-as"] }),
        dict("a3", "If I finish work at six, I'll be there at seven.", "Primeiro condicional.", { c: ["first-cond"], alt: ["If I finish work at 6, I'll be there at 7.", "If I finish work at six, I will be there at seven."], prompt: "Type the conditional sentence." }),
      ],
    }),
    writing: activity("writing", {
      title: "Plano A e plano B",
      goal: "Escrever um plano com alternativas.",
      exercises: [
        write("w1", "Write a message to a friend about a plan for Saturday, with a plan B if something goes wrong.",
          { frame: ["If the weather is good, we'll …", "If it rains, we'll …", "I'll … as soon as …"], min: 30, check: ["Usei dois primeiros condicionais.", "Usei as soon as ou when + presente.", "Usei might ou probably.", "Não usei will depois de if."], model: "Hi! Here's the plan for Saturday. If the weather is good, we'll go to the beach at nine. If it rains, we'll watch a movie at my place. It will probably be sunny. I'll message you as soon as I wake up!", c: ["first-cond", "as-soon-as"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "E se…?",
      goal: "Falar de planos e de suas condições.",
      exercises: [
        speak("s1", "Talk about your plans for next month and what they depend on.", ["Next month I'll probably travel. If I have enough money, I'll go to the coast. If I don't, I'll stay home. I might visit my cousin."],
          { mode: "respond", check: ["Usei dois primeiros condicionais.", "Usei probably ou might.", "Depois de if, usei o presente.", "Ouvi o modelo e comparei."], c: ["first-cond", "probably", "might"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: negociando condições",
      goal: "Combinar algo com alguém, deixando claras as condições.",
      exercises: [
        dialog("m1", "You are negotiating a delivery date with a supplier.", [
          { npc: ["When do you need the order?", "Para quando você precisa do pedido?"], options: [
            ["If you send it by Friday, we'll pay ten percent more.", true, "Ele se interessa.", "Condição e benefício claros."],
            ["If you will send by Friday, we pay more.", false, "Ele pede que você repita.", "If + presente; will no resultado."],
          ] },
          { npc: ["Friday might be difficult. We have a lot of work.", "Sexta pode ser difícil. Temos muito trabalho."], options: [
            ["I understand. What will you need to make it possible?", true, "Ele pede a confirmação hoje.", "Reconheceu a dificuldade e buscou a condição."],
            ["You must. No Friday, no deal.", false, "A conversa fica tensa.", "Negociar é explorar condições."],
          ] },
          { npc: ["If you confirm today, we'll start tomorrow.", "Se você confirmar hoje, começamos amanhã."], options: [
            ["Great. I'll confirm as soon as I talk to my manager.", true, "Ele aguarda.", "As soon as + presente."],
            ["Great. I'll confirm as soon as I will talk.", false, "Há um erro de tempo verbal.", "As soon as + presente."],
          ] },
        ], "Negociar com condições claras.", { c: ["first-cond", "might", "as-soon-as"] }),
        write("m2", "Write the confirmation email in three sentences, stating the conditions.", { min: 25, check: ["Confirmei o prazo.", "Declarei a condição com if.", "Fechei com educação."], model: "Hello. We confirm the order. If you deliver it by Friday, we will pay ten percent more. I'll send the payment as soon as we receive the products.", c: ["first-cond", "as-soon-as"] }),
      ],
      outside: {
        title: "Fora do app: suas decisões em inglês",
        instructions: "Pense em uma decisão real que você precisa tomar. Escreva ou diga em inglês: as duas opções, o que acontece em cada caso (If I…, I'll…) e o que você provavelmente vai fazer. Use pelo menos uma vez unless e as soon as.",
        checklist: ["Descrevi duas opções com o primeiro condicional.", "Usei unless e as soon as.", "Disse o que provavelmente vou fazer."],
      },
    }),
  },
});
