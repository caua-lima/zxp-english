/** B1 · Unidade 5 — Opiniões: dar opinião, concordar, discordar com educação e ponderar. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Many companies now let people work from home. In my opinion, this is a good change. Although some people feel lonely, most workers save time and money. However, it is not perfect: on the other hand, it can be hard to separate work from family life.";

export default defineUnit({
  id: "b1-u05",

  concepts: [
    concept("in-my-opinion", "phrase", "I think … / In my opinion, …", "Eu acho … / Na minha opinião, …", "l1", ["In my opinion, the city needs more parks.", "Na minha opinião, a cidade precisa de mais parques."], { note: "Não diga “In my opinion, I think”: escolha um dos dois." }),
    concept("seems", "phrase", "It seems to me that …", "Parece-me que …", "l1", ["It seems to me that prices are higher this year.", "Parece-me que os preços estão mais altos este ano."], { note: "Forma mais cautelosa de opinar." }),
    concept("agree", "phrase", "I agree (with you)", "Concordo (com você)", "l2", ["I agree with you about the price.", "Concordo com você sobre o preço."], { note: "Agree já é verbo: nunca “I am agree”.", tags: ["chunk"] }),
    concept("disagree-politely", "phrase", "I see your point, but …", "Entendo seu ponto, mas …", "l2", ["I see your point, but I'm not sure it's safe.", "Entendo seu ponto, mas não tenho certeza de que é seguro."]),
    concept("sympathetic", "word", "sympathetic / friendly", "compreensivo, solidário / simpático", "l2", ["My boss was very sympathetic when I was sick.", "Meu chefe foi muito compreensivo quando fiquei doente."], { note: "Falso cognato: sympathetic não é “simpático”. Simpático é friendly ou nice.", tags: ["false-friend"] }),
    concept("although", "word", "although", "embora, apesar de que", "l3", ["Although it was expensive, we bought it.", "Embora fosse caro, nós compramos."], { note: "although + frase completa (sujeito + verbo)." }),
    concept("however", "word", "however", "no entanto, porém", "l3", ["The hotel was nice. However, the food was terrible.", "O hotel era bom. No entanto, a comida era péssima."], { note: "Começa uma nova frase e é seguido de vírgula." }),
    concept("other-hand", "phrase", "on the one hand … on the other hand …", "por um lado … por outro lado …", "l4", ["On the other hand, the rent is cheaper.", "Por outro lado, o aluguel é mais barato."]),
    concept("main-reason", "phrase", "The main reason is that …", "O principal motivo é que …", "l4", ["The main reason is that it saves time.", "O principal motivo é que economiza tempo."]),
    concept("advantage", "word", "advantage / disadvantage", "vantagem / desvantagem", "l4", ["One advantage of living downtown is the transport.", "Uma vantagem de morar no centro é o transporte."], { note: "advantage of + -ing ou substantivo." }),
  ],

  lessons: [
    lesson("l1", {
      title: "O que você acha?",
      objective: "Você vai conseguir pedir e dar opiniões com diferentes graus de certeza.",
      minutes: 9,
      context: { kind: "dialogue", title: "No intervalo do trabalho", lines: [
        { who: "Bia", en: "What do you think about the new schedule?", pt: "O que você acha do novo horário?" },
        { who: "Sam", en: "I think it's better. In my opinion, starting at ten is perfect.", pt: "Acho que é melhor. Na minha opinião, começar às dez é perfeito." },
        { who: "Bia", en: "Really? It seems to me that we'll finish too late.", pt: "Sério? Parece-me que vamos terminar tarde demais." },
        { who: "Sam", en: "Maybe. How do you feel about working on Saturdays?", pt: "Talvez. O que você acha de trabalhar aos sábados?" },
        { who: "Bia", en: "I don't think it's a good idea.", pt: "Não acho que seja uma boa ideia." },
      ] },
      explanation: {
        summary: "Para **pedir** opinião:\n- **What do you think about** …?\n- **How do you feel about** + -ing?\n\nPara **dar** opinião, do mais direto ao mais cauteloso:\n- **I think** …\n- **In my opinion,** …\n- **It seems to me that** …",
        details: "Para negar uma opinião, o inglês nega o **think**: *I don't think it's a good idea* (e não “I think it isn't a good idea”, que é possível, mas soa mais duro). A pergunta é *What do you think?*, nunca “How do you think?”. Depois de *about*, o verbo vai para o -ing.",
        examples: [
          { en: "What do you think about this plan?", pt: "O que você acha deste plano?" },
          { en: "I don't think it's fair.", pt: "Não acho que seja justo." },
          { en: "It seems to me that he's right.", pt: "Parece-me que ele tem razão." },
        ],
        contrasts: [
          { wrong: "How do you think about it?", right: "What do you think about it?", why: "A pergunta de opinião usa what." },
          { wrong: "In my opinion, I think it's good.", right: "In my opinion, it's good.", why: "As duas expressões juntas são redundantes." },
        ],
      },
      guided: [
        mc("e1", "Choose the correct question.", ["What do you think about the plan?", "How do you think about the plan?", "What you think about the plan?"], 0, "What do you think about…?", { c: ["in-my-opinion"] }),
        match("e2", "Match the phrase to how strong it is.", [["I'm sure that…", "certeza total"], ["I think…", "opinião direta"], ["It seems to me that…", "opinião cautelosa"], ["I don't think…", "opinião negativa"]],
          "Você escolhe a expressão conforme a certeza.", { c: ["in-my-opinion", "seems"], pt: "Associe a expressão ao grau de certeza." }),
        cloze("e3", "In my ___, starting at ten is perfect.", ["opinion", "view"], "In my opinion.", { c: ["in-my-opinion"] }),
      ],
      independent: [
        cloze("e4", "It ___ to me that we'll finish too late.", ["seems"], "It seems to me that…", { c: ["seems"] }),
        fix("e5", "I think it isn't a good idea to wait. (soften it)", ["I don't think it's a good idea to wait", "I do not think it is a good idea to wait", "I don't think it is a good idea to wait"], "O natural é negar o think.", { c: ["in-my-opinion"], prompt: "Rewrite with “I don't think”." }),
        order("e6", "Put the words in order: “Parece-me que ele tem razão.”", "It seems to me that he's right.", "It seems to me that + frase.", { c: ["seems"] }),
        dict("e7", "What do you think about the new schedule?", "Pergunta de opinião.", { c: ["in-my-opinion"] }),
        fix("e8", "In my opinion, I think the price is fair.", ["In my opinion, the price is fair", "I think the price is fair"], "Use só uma das expressões.", { c: ["in-my-opinion"], prompt: "Remove the repetition." }),
      ],
      application: [
        type("e9", "Say in English, cautiously: “Parece-me que os preços estão mais altos.”", ["It seems to me that prices are higher", "It seems to me that the prices are higher", "It seems to me prices are higher"], "It seems to me that…", { c: ["seems"] }),
        speak("e10", "Give your opinion about working from home in three sentences.", ["I think working from home is great. In my opinion, people save a lot of time. However, it seems to me that some people feel lonely."],
          { mode: "respond", check: ["Usei I think ou In my opinion.", "Usei It seems to me that.", "Não juntei as duas expressões na mesma frase."], c: ["in-my-opinion", "seems"] }),
      ],
      summary: { points: ["What do you think about…?", "I think / In my opinion / It seems to me that.", "Negue o think: I don't think…"], concepts: ["in-my-opinion", "seems"] },
    }),

    lesson("l2", {
      title: "Concordo, mas…",
      objective: "Você vai conseguir concordar e discordar sem parecer rude.",
      minutes: 10,
      context: { kind: "dialogue", title: "Reunião de equipe", lines: [
        { who: "Rita", en: "I think we should cancel the event.", pt: "Acho que devemos cancelar o evento." },
        { who: "Joe", en: "I agree with you. It's too expensive.", pt: "Concordo com você. É caro demais." },
        { who: "Mia", en: "I see your point, but I'm not sure about that. People are excited.", pt: "Entendo seu ponto, mas não tenho certeza disso. As pessoas estão animadas." },
        { who: "Rita", en: "That's true. The team was very sympathetic when we had problems last year.", pt: "É verdade. A equipe foi muito compreensiva quando tivemos problemas no ano passado." },
        { who: "Joe", en: "I'm afraid I disagree. We can't afford it.", pt: "Receio que eu discorde. Não temos como pagar." },
      ] },
      explanation: {
        summary: "**Concordar:**\n- **I agree (with you).** / **That's true.** / **Exactly.**\n\n**Discordar com educação:**\n- **I see your point, but** …\n- **I'm not sure about that.**\n- **I'm afraid I disagree.**\n\nAtenção: **agree** é verbo. Diga *I agree*, nunca “I am agree”.",
        details: "Em inglês, um “I disagree” seco pode soar agressivo. Reconhecer primeiro o ponto do outro (*I see your point*) suaviza a discordância. E cuidado com **sympathetic**: significa compreensivo, solidário. Para “simpático”, use **friendly** ou **nice**.",
        examples: [
          { en: "I agree with you about the price.", pt: "Concordo com você sobre o preço." },
          { en: "Do you agree?", pt: "Você concorda?" },
          { en: "The new teacher is very friendly.", pt: "O novo professor é muito simpático." },
        ],
        contrasts: [
          { wrong: "I'm agree with you.", right: "I agree with you.", why: "Agree é verbo; não leva am." },
          { wrong: "Are you agree?", right: "Do you agree?", why: "Pergunta com do." },
          { wrong: "The waiter was very sympathetic. (= simpático)", right: "The waiter was very friendly.", why: "Sympathetic = compreensivo." },
        ],
      },
      guided: [
        mc("e1", "Choose the correct sentence.", ["I agree with you.", "I'm agree with you.", "I am agree you."], 0, "Agree é verbo.", { c: ["agree"] }),
        mc("e2", "“She was very sympathetic.” What does it mean?", ["Ela foi muito compreensiva.", "Ela foi muito simpática.", "Ela foi muito engraçada."], 0, "Sympathetic = compreensivo, solidário.", { c: ["sympathetic"], s: "vocabulary" }),
        match("e3", "Is it agreeing or disagreeing?", [["That's true.", "concordar"], ["Exactly.", "concordar totalmente"], ["I'm not sure about that.", "discordar com cuidado"], ["I'm afraid I disagree.", "discordar com educação"]],
          "Há formas suaves de discordar.", { c: ["agree", "disagree-politely"], pt: "É concordar ou discordar?" }),
      ],
      independent: [
        fix("e4", "I'm agree with your idea.", ["I agree with your idea"], "Agree é verbo: I agree, sem am.", { c: ["agree"], prompt: "Fix the mistake." }),
        cloze("e5", "I see your ___, but I'm not sure it's safe.", ["point"], "I see your point, but…", { c: ["disagree-politely"] }),
        cloze("e6", "The new neighbor is very ___; she always says hello and smiles.", ["friendly", "nice"], "Simpático = friendly ou nice.", { c: ["sympathetic"], s: "vocabulary", cue: "(simpática)", t: [["sympathetic", "Sympathetic é compreensivo; para “simpático”, use friendly ou nice."]] }),
        dict("e7", "I see your point, but I'm not sure about that.", "Discordância educada.", { c: ["disagree-politely"] }),
        type("e8", "Ask in English: “Você concorda comigo?”", ["Do you agree with me"], "Do you agree with me?", { c: ["agree"], t: [["Are you agree with me", "Agree é verbo: a pergunta usa do."]] }),
      ],
      application: [
        cloze("e9", "When I lost my job, my friends were very ___ and listened to me.", ["sympathetic", "supportive", "understanding"], "Compreensivos, solidários: sympathetic.", { c: ["sympathetic"], s: "vocabulary", cue: "(compreensivos)" }),
        dialog("e10", "A colleague gives an opinion you don't share.", [
          { npc: ["I think we should work on Saturdays to finish faster.", "Acho que devemos trabalhar aos sábados para terminar mais rápido."], options: [
            ["I see your point, but I'm not sure about that. People need to rest.", true, "Ele pensa e responde: “Fair enough.”", "Reconhece o ponto e discorda com cuidado."],
            ["No. You are wrong.", false, "O clima fica tenso.", "Direto demais; soa rude."],
          ] },
          { npc: ["OK. But we need to finish by Friday. Do you agree?", "OK. Mas precisamos terminar até sexta. Você concorda?"], options: [
            ["Yes, I agree with you about that.", true, "Ele sorri.", "Agree como verbo."],
            ["Yes, I'm agree.", false, "Ele entende, mas é um erro comum.", "I agree, sem am."],
          ] },
        ], "Discordar e concordar com naturalidade.", { c: ["disagree-politely", "agree"] }),
      ],
      summary: { points: ["I agree (nunca I am agree).", "I see your point, but… suaviza a discordância.", "sympathetic = compreensivo; simpático = friendly."], concepts: ["agree", "disagree-politely", "sympathetic"] },
    }),

    lesson("l3", {
      title: "Although e however",
      objective: "Você vai conseguir contrastar ideias em uma mesma frase ou entre duas frases.",
      minutes: 9,
      context: { kind: "text", title: "Avaliação de um restaurante", lines: [
        { en: "Although the restaurant was full, we got a table quickly.", pt: "Embora o restaurante estivesse cheio, conseguimos uma mesa rápido." },
        { en: "The food was excellent. However, the service was slow.", pt: "A comida estava excelente. No entanto, o atendimento foi lento." },
        { en: "I would go back, although it is a little expensive.", pt: "Eu voltaria, embora seja um pouco caro." },
      ] },
      explanation: {
        summary: "Dois jeitos de contrastar:\n- **Although** + frase, + frase (tudo em **uma** frase): *Although it was raining, we went out.*\n- Frase. **However,** + frase (em **duas** frases): *It was raining. However, we went out.*\n\n**But** também contrasta, mas é mais simples e fica no meio da frase.",
        details: "Não use *although* e *but* juntos: “Although it was late, but we stayed” está errado. Escolha um. *However* costuma abrir a segunda frase e é seguido de vírgula. *Though* é a versão informal de although.",
        examples: [
          { en: "Although he's young, he has a lot of experience.", pt: "Embora seja jovem, ele tem muita experiência." },
          { en: "The apartment is small. However, it's very bright.", pt: "O apartamento é pequeno. No entanto, é muito claro." },
          { en: "I like the job, although the salary is low.", pt: "Gosto do emprego, embora o salário seja baixo." },
        ],
        contrasts: [
          { wrong: "Although it was late, but we stayed.", right: "Although it was late, we stayed.", why: "Although e but não aparecem juntos." },
          { wrong: "The food was good, however the service was slow.", right: "The food was good. However, the service was slow.", why: "However abre uma nova frase." },
        ],
      },
      guided: [
        mc("e1", "Choose: “___ it was raining, we went for a walk.”", ["Although", "However", "Because"], 0, "Although + frase, frase.", { c: ["although"] }),
        mc("e2", "Choose: “The hotel was cheap. ___, it was very clean.”", ["However", "Although", "Because"], 0, "Nova frase: However,", { c: ["however"] }),
        match("e3", "Match the two halves.", [["Although he's young,", "he has a lot of experience."], ["The car is old. However,", "it works perfectly."], ["Although the test was hard,", "I passed."], ["I was tired. However,", "I finished the report."]],
          "Although junta as duas ideias; However separa.", { c: ["although", "however"], s: "grammar", pt: "Associe as duas metades." }),
      ],
      independent: [
        cloze("e4", "___ the restaurant was full, we got a table quickly.", ["Although", "Though", "Even though"], "Although + frase.", { c: ["although"] }),
        cloze("e5", "The food was excellent. ___, the service was slow.", ["However"], "However, + nova frase.", { c: ["however"] }),
        fix("e6", "Although it was late, but we stayed.", ["Although it was late, we stayed"], "Although já faz o contraste: sem but.", { c: ["although"], prompt: "Fix the mistake." }),
        order("e7", "Put the words in order: “Embora seja jovem, ele tem muita experiência.”", "Although he's young, he has a lot of experience.", "Although + frase, + frase.", { c: ["although"], extra: ["but"] }),
        dict("e8", "The apartment is small. However, it's very bright.", "Duas frases com however.", { c: ["however"], alt: ["The apartment is small. However, it is very bright."] }),
      ],
      application: [
        type("e9", "Join with although: “The salary is low. I like the job.”", ["Although the salary is low, I like the job", "I like the job although the salary is low", "I like the job, although the salary is low"], "Although the salary is low, I like the job.", { c: ["although"] }),
        write("e10", "Write a short review (three sentences) of a place you visited, with one although and one however.",
          { frame: ["Although …, …", "… . However, …"], min: 22, check: ["Usei although em uma única frase, sem but.", "Usei However abrindo uma nova frase, com vírgula.", "Dei uma opinião final."], model: "Although the museum was crowded, I enjoyed the visit. The paintings were beautiful. However, the tickets were expensive, so I would go on a free day.", c: ["although", "however"] }),
      ],
      summary: { points: ["Although + frase, frase (sem but).", "Frase. However, frase.", "Though é a forma informal."], concepts: ["although", "however"] },
    }),

    lesson("l4", {
      title: "Prós, contras e motivos",
      objective: "Você vai conseguir justificar uma opinião e pesar vantagens e desvantagens.",
      minutes: 10,
      context: { kind: "text", title: "Morar no centro ou no subúrbio?", lines: [
        { en: "On the one hand, living downtown is convenient. One advantage is the public transport.", pt: "Por um lado, morar no centro é prático. Uma vantagem é o transporte público." },
        { en: "On the other hand, the rent is high and the streets are noisy.", pt: "Por outro lado, o aluguel é alto e as ruas são barulhentas." },
        { en: "I prefer the suburbs. The main reason is that I need a quiet place to study.", pt: "Eu prefiro o subúrbio. O principal motivo é que preciso de um lugar tranquilo para estudar." },
      ] },
      explanation: {
        summary: "Para **pesar** dois lados:\n- **On the one hand,** … **On the other hand,** …\n- **One advantage / disadvantage of** + -ing **is** …\n\nPara **justificar**:\n- **The main reason is that** …\n- **That's why** … (é por isso que)",
        details: "Uma opinião bem construída tem: posição (*I prefer…*), motivo (*The main reason is that…*), o outro lado (*On the other hand…*) e conclusão. *On the other hand* pode aparecer sozinho, sem o *on the one hand* antes.",
        examples: [
          { en: "One disadvantage of driving is the traffic.", pt: "Uma desvantagem de dirigir é o trânsito." },
          { en: "The main reason is that it's cheaper.", pt: "O principal motivo é que é mais barato." },
          { en: "It's far. That's why I take the bus.", pt: "É longe. É por isso que pego o ônibus." },
        ],
        contrasts: [
          { wrong: "In the other hand, it's expensive.", right: "On the other hand, it's expensive.", why: "A preposição é on." },
          { wrong: "One advantage of live here is the beach.", right: "One advantage of living here is the beach.", why: "Depois de of, verbo no -ing." },
        ],
      },
      guided: [
        mc("e1", "Choose: “___ the other hand, the rent is high.”", ["On", "In", "At"], 0, "On the other hand.", { c: ["other-hand"] }),
        match("e2", "Match the phrase to its function.", [["One advantage is…", "apontar um ponto positivo"], ["One disadvantage is…", "apontar um ponto negativo"], ["The main reason is that…", "justificar"], ["On the other hand,…", "mostrar o outro lado"]],
          "Cada expressão tem um papel no argumento.", { c: ["advantage", "main-reason", "other-hand"], pt: "Associe a expressão à função." }),
        cloze("e3", "The main ___ is that I need a quiet place.", ["reason"], "The main reason is that…", { c: ["main-reason"] }),
      ],
      independent: [
        cloze("e4", "One ___ of living downtown is the public transport.", ["advantage", "benefit"], "Ponto positivo: advantage.", { c: ["advantage"], s: "vocabulary" }),
        cloze("e5", "On the other ___, the streets are noisy.", ["hand"], "On the other hand.", { c: ["other-hand"] }),
        fix("e6", "One advantage of work at night is the silence.", ["One advantage of working at night is the silence"], "Of + -ing.", { c: ["advantage"], prompt: "Fix the mistake." }),
        dict("e7", "The main reason is that it saves time.", "The main reason is that + frase.", { c: ["main-reason"] }),
        order("e8", "Put the words in order: “Por outro lado, o aluguel é mais barato.”", "On the other hand, the rent is cheaper.", "On the other hand, + frase.", { c: ["other-hand"], extra: ["in"] }),
      ],
      application: [
        type("e9", "Say in English: “O principal motivo é que é mais barato.”", ["The main reason is that it's cheaper", "The main reason is that it is cheaper", "The main reason is it's cheaper"], "The main reason is that…", { c: ["main-reason"] }),
        speak("e10", "Should people study online or in a classroom? Give your opinion with one advantage, one disadvantage and your main reason.", ["I prefer studying online. One advantage is that I save time. On the other hand, one disadvantage is that I study alone. The main reason is that my schedule is very busy."],
          { mode: "respond", check: ["Dei minha posição.", "Citei uma vantagem e uma desvantagem.", "Usei On the other hand.", "Usei The main reason is that."], c: ["advantage", "other-hand", "main-reason"] }),
      ],
      summary: { points: ["On the one hand… On the other hand…", "advantage / disadvantage of + -ing.", "The main reason is that…"], concepts: ["other-hand", "main-reason", "advantage"] },
    }),
  ],

  checkpoint: {
    intro: "New discussions: give your opinion, react to other people's opinions and weigh both sides.",
    a: [
      fix("q1", "Are you agree with the decision?", ["Do you agree with the decision"], "Agree é verbo: do you agree?", { c: ["agree"], prompt: "Fix the mistake." }),
      mc("q2", "Choose: “___ she studied a lot, she failed the test.”", ["Although", "However", "Because"], 0, "Although + frase, frase.", { c: ["although"] }),
      cloze("q3", "It ___ to me that the meeting was too long.", ["seems"], "It seems to me that…", { c: ["seems"] }),
      dict("q4", "On the other hand, the tickets are cheaper in March.", "On the other hand.", { c: ["other-hand"] }),
      type("q5", "Say in English: “Na minha opinião, o filme é longo demais.”", ["In my opinion, the movie is too long", "In my opinion the movie is too long", "In my opinion, the film is too long"], "In my opinion, …", { c: ["in-my-opinion"] }),
      mc("q6", "Your friend says: “My doctor was very sympathetic.” The doctor was:", ["compreensivo", "simpático", "antipático"], 0, "Sympathetic = compreensivo.", { c: ["sympathetic"], s: "vocabulary" }),
      order("q7", "Put the words in order: “Uma desvantagem de dirigir é o trânsito.”", "One disadvantage of driving is the traffic.", "Disadvantage of + -ing.", { c: ["advantage"] }),
      cloze("q8", "The phone is cheap. ___, the battery is terrible.", ["However"], "However, + nova frase.", { c: ["however"] }),
      listen("q9", "I love this city. The main reason is that my whole family lives here.", "Why does the speaker love the city?", ["Their family lives there", "It is cheap", "The weather is good"], 0, "The main reason is that my whole family lives here.", { c: ["main-reason"] }),
      dialog("q10", "A friend wants to buy a very expensive phone.", [
        { npc: ["I think this phone is worth it. What do you think?", "Acho que esse celular vale a pena. O que você acha?"], options: [
          ["I see your point, but it seems to me that it's too expensive.", true, "Ele pensa de novo.", "Discordância educada e cautelosa."],
          ["I'm not agree. It's a bad idea.", false, "Ele fica na defensiva.", "I don't agree; e soa duro."],
        ] },
        { npc: ["But the camera is amazing!", "Mas a câmera é incrível!"], options: [
          ["That's true. However, you can find a similar camera for half the price.", true, "Ele pede o nome do outro modelo.", "Concorda em parte e contrasta."],
          ["That's true, although but it's expensive.", false, "A frase fica confusa.", "Although e but não ficam juntos."],
        ] },
      ], "Reagir a uma opinião: concordar em parte e contrastar.", { c: ["disagree-politely", "however", "seems"] }),
    ],
    b: [
      fix("q1", "I'm agree with my sister about the trip.", ["I agree with my sister about the trip"], "Agree é verbo: I agree, sem am.", { c: ["agree"], prompt: "Fix the mistake." }),
      mc("q2", "Choose: “The course is difficult. ___, I'm learning a lot.”", ["However", "Although", "Because of"], 0, "Nova frase: However,", { c: ["however"] }),
      cloze("q3", "___ the bus was late, I arrived on time.", ["Although", "Though", "Even though"], "Although + frase.", { c: ["although"] }),
      dict("q4", "I don't think it's a good idea.", "Negue o think.", { c: ["in-my-opinion"], alt: ["I do not think it is a good idea.", "I don't think it is a good idea."] }),
      type("q5", "Say in English: “Entendo seu ponto, mas não concordo.”", ["I see your point, but I don't agree", "I see your point, but I disagree", "I see your point but I don't agree", "I see your point but I disagree", "I see your point, but I do not agree"], "I see your point, but…", { c: ["disagree-politely"] }),
      mc("q6", "Which word means “simpático”?", ["friendly", "sympathetic", "pathetic"], 0, "Simpático = friendly.", { c: ["sympathetic"], s: "vocabulary" }),
      order("q7", "Put the words in order: “O principal motivo é que eu preciso de silêncio.”", "The main reason is that I need silence.", "The main reason is that + frase.", { c: ["main-reason"] }),
      cloze("q8", "One ___ of public transport is the low cost.", ["advantage", "benefit"], "Ponto positivo: advantage.", { c: ["advantage"], s: "vocabulary" }),
      listen("q9", "On the one hand, the job pays well. On the other hand, I would have to move to another city.", "What is the negative side?", ["Moving to another city", "The salary", "The schedule"], 0, "On the other hand, I would have to move.", { c: ["other-hand"] }),
      dialog("q10", "Your manager proposes meetings every morning.", [
        { npc: ["I think daily meetings will help the team. Do you agree?", "Acho que reuniões diárias vão ajudar a equipe. Você concorda?"], options: [
          ["I agree that communication is important. However, daily meetings take a lot of time.", true, "Ela pergunta o que você sugere.", "Concorda em parte e contrasta com however."],
          ["I'm afraid I'm disagree.", false, "Soa errado.", "I'm afraid I disagree."],
        ] },
        { npc: ["What would you suggest, then?", "O que você sugere, então?"], options: [
          ["In my opinion, two meetings a week are enough. The main reason is that we need time to work.", true, "Ela decide testar por um mês.", "Opinião e motivo."],
          ["In my opinion, I think two.", false, "Ela pede o motivo.", "Redundante e sem justificativa."],
        ] },
      ], "Discordar de um gestor com educação e propor uma alternativa.", { c: ["agree", "however", "main-reason"] }),
    ],
    production: write("t1", "Write an opinion paragraph (about 60 words): Is it better to live in a big city or in a small town? Give your position, one reason, the other side and a conclusion.",
      { mode: "argument", min: 50, check: ["Dei minha posição com I think ou In my opinion.", "Justifiquei com The main reason is that.", "Mostrei o outro lado com On the other hand, although ou however.", "Não escrevi “I am agree” nem “although… but”.", "Fechei com uma conclusão."],
        model: "In my opinion, it is better to live in a small town. The main reason is that life is calmer and cheaper. One advantage is that people know each other. On the other hand, there are fewer jobs and fewer things to do. Although I like big cities for vacation, I prefer a quiet place for everyday life.", c: ["in-my-opinion", "main-reason", "other-hand", "although"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Trabalhar de casa: sim ou não?",
      goal: "Ler um texto de opinião e separar a posição, os motivos e as ressalvas.",
      context: { kind: "text", title: "Opinion: working from home", lines: [
        { en: "Many companies now let people work from home. In my opinion, this is a good change.", pt: "Muitas empresas agora deixam as pessoas trabalhar de casa. Na minha opinião, é uma boa mudança." },
        { en: "Although some people feel lonely, most workers save time and money.", pt: "Embora algumas pessoas se sintam sozinhas, a maioria dos trabalhadores economiza tempo e dinheiro." },
        { en: "However, it is not perfect: on the other hand, it can be hard to separate work from family life.", pt: "No entanto, não é perfeito: por outro lado, pode ser difícil separar o trabalho da vida em família." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "What is the writer's position?", ["Working from home is a good change.", "Working from home is a mistake.", "The writer has no opinion."], 0, "In my opinion, this is a good change.", { c: ["in-my-opinion"] }),
        rd("r2", PASSAGE, "Which problem does the writer admit?", ["It is hard to separate work and family life.", "Workers spend more money.", "Companies pay less."], 0, "On the other hand, it can be hard to separate work from family life.", { c: ["other-hand"] }),
        cloze("r3", "___ some people feel lonely, most workers save time and money.", ["Although", "Though", "Even though"], "Although + frase.", { c: ["although"], s: "reading" }),
        type("r4", "Which word in the text introduces the sentence “it is not perfect”?", ["However"], "However, it is not perfect.", { c: ["however"], passage: PASSAGE }),
      ],
    }),
    listening: activity("listening", {
      title: "Duas opiniões",
      goal: "Entender quem concorda, quem discorda e por quê.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "I think the new park is a great idea. I agree, but it seems to me that the city should fix the streets first. That's true. However, parks are important for children.", pt: "Acho que o novo parque é uma ótima ideia. Concordo, mas me parece que a cidade deveria consertar as ruas primeiro. É verdade. No entanto, parques são importantes para as crianças." }] },
      exercises: [
        listen("a1", ["I think the new park is a great idea.", "I agree, but it seems to me that the city should fix the streets first."], "What does the second speaker want first?", ["Better streets", "A bigger park", "More schools"], 0, "The city should fix the streets first.", { c: ["seems"] }),
        listen("a2", "That's true. However, parks are important for children.", "Does the speaker completely change their mind?", ["No, they still defend the park", "Yes, they give up the park", "They don't answer"], 0, "That's true. However… mantém a posição.", { c: ["however"], keepOrder: true }),
        dict("a3", "I agree, but the city should fix the streets first.", "I agree, sem am.", { c: ["agree"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Comentário em uma discussão",
      goal: "Responder a uma opinião por escrito, concordando em parte.",
      exercises: [
        write("w1", "Someone wrote: “Children should not use phones before they are 12.” Reply in about 45 words: agree or disagree politely and give a reason.",
          { mode: "argument", min: 35, check: ["Reconheci o ponto da outra pessoa.", "Dei minha opinião sem “I am agree”.", "Justifiquei com um motivo.", "Usei although ou however."], model: "I see your point, but I'm not sure about that. Although phones can be a problem, they are also useful for school and for safety. In my opinion, parents should control the time, not ban the phone. The main reason is that children need to learn to use technology.", c: ["disagree-politely", "although", "main-reason"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Um minuto de opinião",
      goal: "Defender uma opinião em voz alta por cerca de um minuto.",
      exercises: [
        speak("s1", "Choose one topic and speak for about a minute: public transport, online shopping or social media. Give your opinion, one advantage, one disadvantage and your conclusion.", ["In my opinion, online shopping is very practical. One advantage is that I can compare prices. On the other hand, I can't see the product. Although there are risks, I think it is a good option."],
          { mode: "respond", check: ["Dei uma posição clara.", "Citei uma vantagem e uma desvantagem.", "Usei pelo menos um conector de contraste.", "Falei sem ler o tempo todo."], c: ["in-my-opinion", "advantage", "other-hand"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: decidir em grupo",
      goal: "Participar de uma decisão em grupo: opinar, discordar com educação e chegar a um acordo.",
      exercises: [
        dialog("m1", "You and two friends are choosing where to spend the holiday.", [
          { npc: ["I think we should go to the beach. What do you think?", "Acho que devemos ir à praia. O que você acha?"], options: [
            ["I see your point, but it seems to me that the beach will be very crowded.", true, "Seu amigo concorda que pode lotar.", "Opinião cautelosa e educada."],
            ["No, beach is bad idea.", false, "Seu amigo fica chateado.", "Seco demais e com erro de artigo."],
          ] },
          { npc: ["OK, so what do you suggest?", "Certo, então o que você sugere?"], options: [
            ["In my opinion, the mountains are better. The main reason is that the hotels are cheaper there.", true, "Eles pedem mais detalhes.", "Posição com motivo."],
            ["In my opinion, I think mountains because cheap.", false, "A ideia fica confusa.", "Redundância e frase incompleta."],
          ] },
          { npc: ["But it's a long drive. That's a disadvantage.", "Mas a viagem de carro é longa. Isso é uma desvantagem."], options: [
            ["That's true. However, we can stop on the way. Do you agree?", true, "Todos concordam: “Deal!”", "Reconhece, contrasta e busca acordo."],
            ["Although it's long, but it's fine. Are you agree?", false, "Soa estranho.", "Sem but depois de although; do you agree."],
          ] },
        ], "Decisão em grupo com opinião, motivo e acordo.", { c: ["seems", "main-reason", "however", "agree"] }),
        type("m2", "Close the discussion. Say: “Então todos nós concordamos.”", ["So we all agree", "So, we all agree", "Then we all agree", "So we all agree, then"], "So we all agree.", { c: ["agree"] }),
      ],
      outside: {
        title: "Fora do app: opinião em três movimentos",
        instructions: "Escolha um assunto do seu dia (uma notícia, uma decisão do trabalho, um filme). Em voz alta ou por escrito, faça três movimentos em inglês: sua opinião, o outro lado e sua conclusão. Se puder, peça a opinião de alguém com “What do you think?”.",
        checklist: ["Dei minha opinião com uma das três expressões.", "Mostrei o outro lado com although, however ou on the other hand.", "Dei um motivo.", "Não usei “I am agree”."],
      },
    }),
  },
});
