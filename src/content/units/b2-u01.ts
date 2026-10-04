/** B2 · Unidade 1 — Argumentar: tese, apoio, contraponto e conclusão. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "Should cities ban cars from their centers? I would argue that they should. Firstly, fewer cars mean cleaner air; for instance, pollution fell sharply in cities that tried it. Secondly, streets become safer. Some people argue that shops lose customers. While it is true that some drivers stay away, studies show that pedestrians spend more. Therefore, the ban helps local business. To sum up, the benefits clearly outweigh the costs.";

export default defineUnit({
  id: "b2-u01",

  concepts: [
    concept("signposts", "word", "Firstly, … Secondly, … Finally, …", "Em primeiro lugar, … Em segundo lugar, … Por fim, …", "l1", ["Firstly, it saves money. Secondly, it saves time.", "Em primeiro lugar, economiza dinheiro. Em segundo, economiza tempo."], { note: "Sinalizam a ordem dos argumentos para quem ouve ou lê." }),
    concept("id-argue", "phrase", "I would argue that …", "Eu defenderia que …", "l1", ["I'd argue that remote work improves productivity.", "Eu defenderia que o trabalho remoto melhora a produtividade."], { note: "Apresenta a tese com firmeza, mas sem soar categórico." }),
    concept("for-instance", "phrase", "for instance / such as", "por exemplo / tais como", "l2", ["Some countries, such as Finland, start school later.", "Alguns países, como a Finlândia, começam a escola mais tarde."], { note: "for instance introduz um exemplo completo; such as introduz itens de uma lista." }),
    concept("therefore", "word", "therefore / as a result", "portanto / como resultado", "l2", ["Rents went up. As a result, many families moved.", "Os aluguéis subiram. Como resultado, muitas famílias se mudaram."], { note: "Marcam consequência. Mais formais que so." }),
    concept("raise-issue", "phrase", "raise an issue / make a point", "levantar uma questão / apresentar um argumento", "l2", ["That raises an important issue.", "Isso levanta uma questão importante."], { tags: ["collocation"] }),
    concept("some-argue", "phrase", "Some people argue that …", "Há quem defenda que …", "l3", ["Some people argue that exams are unfair.", "Há quem defenda que as provas são injustas."], { note: "Apresenta a visão contrária antes de responder a ela." }),
    concept("while-true", "pattern", "While it is true that …, …", "Embora seja verdade que …, …", "l3", ["While it's true that cars are convenient, they pollute.", "Embora seja verdade que os carros são práticos, eles poluem."], { note: "Concede um ponto e, em seguida, contrapõe." }),
    concept("nevertheless", "word", "nevertheless / even so", "ainda assim, mesmo assim", "l3", ["The plan is risky. Nevertheless, we should try.", "O plano é arriscado. Ainda assim, devemos tentar."]),
    concept("to-sum-up", "phrase", "To sum up, … / In conclusion, …", "Em resumo, … / Em conclusão, …", "l4", ["To sum up, the benefits outweigh the costs.", "Em resumo, os benefícios superam os custos."]),
    concept("draw-conclusion", "phrase", "draw a conclusion / outweigh", "tirar uma conclusão / superar, pesar mais que", "l4", ["What conclusion can we draw from this?", "Que conclusão podemos tirar disso?"], { note: "Em inglês não se “takes” uma conclusão: draw ou reach a conclusion.", tags: ["collocation"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "Tese e roteiro",
      objective: "Você vai conseguir apresentar uma tese e organizar os argumentos em ordem clara.",
      minutes: 10,
      context: { kind: "text", title: "Opening of a short talk", lines: [
        { en: "Today I'd like to talk about the four-day work week.", pt: "Hoje eu gostaria de falar sobre a semana de trabalho de quatro dias." },
        { en: "I would argue that it benefits both companies and employees.", pt: "Eu defenderia que ela beneficia tanto as empresas quanto os funcionários." },
        { en: "Firstly, people are more rested. Secondly, companies save on costs. Finally, it attracts talent.", pt: "Em primeiro lugar, as pessoas ficam mais descansadas. Em segundo, as empresas economizam custos. Por fim, atrai talentos." },
      ] },
      explanation: {
        summary: "Um argumento claro começa com **tese + roteiro**:\n- **I would argue that** … / **My view is that** … → a tese\n- **Firstly, … Secondly, … Finally, …** → a ordem dos argumentos\n\nNo nível B2, não basta ter opinião: o ouvinte precisa saber **para onde você vai**.",
        details: "*I would argue that* é mais forte e mais formal que *I think*: mostra que você vai sustentar a ideia. Em textos, *First / Firstly* são equivalentes; evite misturar (*Firstly… Second…*). Ao falar, faça uma pausa curta depois de cada marcador: é ela que dá tempo ao ouvinte para acompanhar.",
        examples: [
          { en: "I'd argue that public transport should be free.", pt: "Eu defenderia que o transporte público deveria ser gratuito." },
          { en: "There are two main reasons for this.", pt: "Há dois motivos principais para isso." },
          { en: "Finally, we need to consider the cost.", pt: "Por fim, precisamos considerar o custo." },
        ],
        contrasts: [
          { wrong: "I would argue about that it is good.", right: "I would argue that it is good.", why: "Argue that + frase. Argue about = discutir sobre." },
          { wrong: "At first, it saves money. Second, …", right: "Firstly, it saves money. Secondly, …", why: "At first = no início (e depois mudou). Para listar: firstly." },
        ],
      },
      guided: [
        mc("e1", "Which sentence presents a thesis?", ["I would argue that homework should be optional.", "Firstly, students are tired.", "For instance, in Finland."], 0, "I would argue that… apresenta a posição.", { c: ["id-argue"] }),
        match("e2", "Match the signpost to its job.", [["I would argue that…", "apresentar a tese"], ["Firstly,", "abrir o primeiro argumento"], ["Secondly,", "acrescentar outro argumento"], ["Finally,", "fechar a lista de argumentos"]],
          "Cada marcador avisa ao ouvinte em que parte do argumento você está.", { c: ["signposts", "id-argue"], pt: "Associe o marcador à função." }),
        cloze("e3", "___, people are more rested. Secondly, companies save on costs.", ["Firstly", "First"], "O primeiro argumento: Firstly.", { c: ["signposts"] }),
      ],
      independent: [
        cloze("e4", "I would ___ that the four-day week benefits everyone.", ["argue"], "I would argue that…", { c: ["id-argue"] }),
        fix("e5", "At first, it is cheaper. Secondly, it is faster.", ["Firstly, it is cheaper. Secondly, it is faster", "First, it is cheaper. Second, it is faster", "First, it is cheaper. Secondly, it is faster"], "Para listar argumentos: Firstly / First.", { c: ["signposts"], prompt: "Fix the first signpost." }),
        fix("e6", "I would argue about that schools need more funding.", ["I would argue that schools need more funding", "I'd argue that schools need more funding"], "Argue that + frase, sem about.", { c: ["id-argue"], prompt: "Fix the mistake." }),
        dict("e7", "I would argue that it benefits both companies and employees.", "Tese com I would argue that.", { c: ["id-argue"], alt: ["I'd argue that it benefits both companies and employees."] }),
        cloze("e8", "Firstly, it is cheap. Secondly, it is fast. ___, it is safe.", ["Finally", "Thirdly", "Lastly"], "O último argumento: Finally.", { c: ["signposts"] }),
      ],
      application: [
        type("e9", "Write a thesis in English: “Eu defenderia que as cidades precisam de mais ciclovias.”", ["I would argue that cities need more bike lanes", "I'd argue that cities need more bike lanes", "I would argue that cities need more cycle lanes", "I'd argue that cities need more cycle lanes"], "I would argue that + frase.", { c: ["id-argue"] }),
        speak("e10", "Open a one-minute talk: state a thesis about a topic you care about and announce three reasons. Pause briefly after each signpost.", ["I would argue that everyone should learn to cook. Firstly, it is healthier. Secondly, it is cheaper. Finally, it brings people together."],
          { mode: "respond", check: ["Apresentei a tese com I would argue that.", "Usei Firstly, Secondly e Finally.", "Fiz uma pausa curta depois de cada marcador."], c: ["id-argue", "signposts"] }),
      ],
      summary: { points: ["I would argue that + tese.", "Firstly, Secondly, Finally.", "Pausa depois do marcador ao falar."], concepts: ["signposts", "id-argue"] },
    }),

    lesson("l2", {
      title: "Apoio: exemplos e consequências",
      objective: "Você vai conseguir sustentar um argumento com exemplos e mostrar suas consequências.",
      minutes: 10,
      context: { kind: "text", title: "Developing an argument", lines: [
        { en: "Many cities, such as Paris and Bogota, have closed streets to cars.", pt: "Muitas cidades, como Paris e Bogotá, fecharam ruas para carros." },
        { en: "For instance, Bogota opens its main avenues to cyclists every Sunday.", pt: "Por exemplo, Bogotá abre suas avenidas principais para ciclistas todo domingo." },
        { en: "As a result, thousands of people exercise outdoors. Therefore, the policy also improves public health.", pt: "Como resultado, milhares de pessoas se exercitam ao ar livre. Portanto, a política também melhora a saúde pública." },
        { en: "This raises an important issue: who pays for these changes?", pt: "Isso levanta uma questão importante: quem paga por essas mudanças?" },
      ] },
      explanation: {
        summary: "Um argumento sem apoio é só uma opinião. Para **sustentar**:\n- **For instance,** + frase completa\n- **such as** + exemplos dentro da frase\n\nPara mostrar a **consequência**:\n- **Therefore,** … / **As a result,** …\n\nE duas colocações: **raise an issue** (levantar uma questão), **make a point** (apresentar um argumento).",
        details: "*Therefore* indica uma conclusão lógica; *as a result* indica um efeito concreto. Ambos costumam abrir uma nova frase e ser seguidos de vírgula. *Such as* não vem no início da frase nem seguido de frase completa. E atenção ao verbo: uma questão é *raised*, não “lifted” nem “risen”.",
        examples: [
          { en: "Fruits such as mangoes and papayas grow well here.", pt: "Frutas como manga e mamão crescem bem aqui." },
          { en: "The bus was late. As a result, I missed the meeting.", pt: "O ônibus atrasou. Como resultado, perdi a reunião." },
          { en: "You made a good point.", pt: "Você apresentou um bom argumento." },
        ],
        contrasts: [
          { wrong: "Such as, Bogota opens its avenues.", right: "For instance, Bogota opens its avenues.", why: "Antes de uma frase completa: for instance." },
          { wrong: "This rises an important issue.", right: "This raises an important issue.", why: "Raise (com objeto), não rise." },
        ],
      },
      guided: [
        mc("e1", "Choose: “Many countries, ___ Japan and Germany, recycle most of their waste.”", ["such as", "for instance,", "therefore"], 0, "Lista dentro da frase: such as.", { c: ["for-instance"] }),
        match("e2", "Match the connector to its function.", [["for instance", "introduz um exemplo completo"], ["such as", "introduz itens de uma lista"], ["therefore", "introduz uma conclusão lógica"], ["as a result", "introduz um efeito concreto"]],
          "Cada conector liga as ideias de um jeito.", { c: ["for-instance", "therefore"], pt: "Associe o conector à função." }),
        cloze("e3", "This ___ an important issue: who pays for the changes?", ["raises"], "Raise an issue.", { c: ["raise-issue"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "The factory closed. As a ___, hundreds of people lost their jobs.", ["result", "consequence"], "As a result.", { c: ["therefore"] }),
        cloze("e5", "For ___, Bogota opens its main avenues to cyclists every Sunday.", ["instance", "example"], "For instance, + frase.", { c: ["for-instance"] }),
        fix("e6", "That rises an interesting issue.", ["That raises an interesting issue"], "Raise an issue.", { c: ["raise-issue"], prompt: "Fix the verb." }),
        dict("e7", "Therefore, the policy also improves public health.", "Therefore, + conclusão.", { c: ["therefore"] }),
        order("e8", "Put the words in order: “Você apresentou um bom argumento.”", "You made a good point.", "Make a point.", { c: ["raise-issue"], extra: ["did"] }),
      ],
      application: [
        type("e9", "Complete with a consequence connector: “Prices rose by 20%. ___, many people stopped buying.”", ["Therefore", "As a result", "As a consequence", "Consequently"], "Consequência: Therefore / As a result.", { c: ["therefore"] }),
        write("e10", "Develop this argument in three sentences: “Reading every day improves your English.” Give an example and a consequence.",
          { mode: "argument", frame: ["Reading every day …", "For instance, …", "As a result, … / Therefore, …"], min: 28, check: ["Dei um exemplo com for instance ou such as.", "Mostrei uma consequência com therefore ou as a result.", "Cada conector abre a frase certa."], model: "Reading every day improves your English because you meet new words in context. For instance, a short news article can teach you ten useful expressions. As a result, you start to recognize them when people speak. Therefore, reading also helps your listening.", c: ["for-instance", "therefore"] }),
      ],
      summary: { points: ["For instance, + frase; such as + lista.", "Therefore / As a result = consequência.", "raise an issue; make a point."], concepts: ["for-instance", "therefore", "raise-issue"] },
    }),

    lesson("l3", {
      title: "O outro lado",
      objective: "Você vai conseguir apresentar um contra-argumento, conceder um ponto e responder a ele.",
      minutes: 10,
      context: { kind: "text", title: "Dealing with the other side", lines: [
        { en: "Some people argue that online classes are less effective.", pt: "Há quem defenda que as aulas online são menos eficazes." },
        { en: "While it is true that students can get distracted at home, they also save hours of travel.", pt: "Embora seja verdade que os alunos possam se distrair em casa, eles também economizam horas de deslocamento." },
        { en: "Online classes are not perfect. Nevertheless, they give access to people who live far from schools.", pt: "As aulas online não são perfeitas. Ainda assim, dão acesso a quem mora longe das escolas." },
      ] },
      explanation: {
        summary: "Um bom argumento **não ignora** o outro lado. Três passos:\n1. **Apresentar:** *Some people argue that …*\n2. **Conceder:** *While it is true that …,*\n3. **Responder:** *…, [seu contraponto].* / *Nevertheless, …*\n\nConceder um ponto deixa a sua posição **mais** convincente, não menos.",
        details: "*While* aqui não é “enquanto” (tempo): é concessão, como *although*. *Nevertheless* e *even so* são mais fortes que *however* e mostram que o argumento se mantém apesar da objeção. Outras formas de apresentar o outro lado: *Critics claim that…*, *It is often said that…*",
        examples: [
          { en: "Some people argue that taxes are too high.", pt: "Há quem defenda que os impostos são altos demais." },
          { en: "While it's true that it is expensive, it lasts for years.", pt: "Embora seja verdade que é caro, dura anos." },
          { en: "It was raining. Even so, we went out.", pt: "Estava chovendo. Mesmo assim, saímos." },
        ],
        contrasts: [
          { wrong: "While it is true that it is expensive, but it lasts.", right: "While it is true that it is expensive, it lasts.", why: "Como com although, não se usa but." },
          { wrong: "Some people argue what exams are unfair.", right: "Some people argue that exams are unfair.", why: "Argue that + frase." },
        ],
      },
      guided: [
        mc("e1", "Which sentence introduces the opposite view?", ["Some people argue that zoos are cruel.", "Therefore, zoos are cruel.", "For instance, zoos are cruel."], 0, "Some people argue that… apresenta a visão contrária.", { c: ["some-argue"] }),
        match("e2", "Match the step to the phrase.", [["apresentar o outro lado", "Some people argue that…"], ["conceder um ponto", "While it is true that…"], ["manter a posição", "Nevertheless, …"], ["apresentar a própria tese", "I would argue that…"]],
          "Apresentar, conceder e responder.", { c: ["some-argue", "while-true", "nevertheless"], pt: "Associe o passo à expressão." }),
        cloze("e3", "___ it is true that students can get distracted, they save hours of travel.", ["While", "Although"], "Concessão: While it is true that…", { c: ["while-true"] }),
      ],
      independent: [
        cloze("e4", "Some people ___ that online classes are less effective.", ["argue", "claim", "say", "believe"], "Some people argue that…", { c: ["some-argue"] }),
        cloze("e5", "Online classes are not perfect. ___, they give access to more people.", ["Nevertheless", "Even so", "However", "Nonetheless"], "Mantendo a posição: Nevertheless.", { c: ["nevertheless"] }),
        fix("e6", "While it is true that the plan is risky, but it is necessary.", ["While it is true that the plan is risky, it is necessary"], "Com while de concessão, sem but.", { c: ["while-true"], prompt: "Fix the mistake." }),
        dict("e7", "The plan is risky. Nevertheless, we should try.", "Nevertheless abre a segunda frase.", { c: ["nevertheless"] }),
        order("e8", "Put the words in order: “Há quem defenda que as provas são injustas.”", "Some people argue that exams are unfair.", "Some people argue that + frase.", { c: ["some-argue"] }),
      ],
      application: [
        type("e9", "Concede and answer. Complete: “While it is true that cars are convenient, …” (they pollute the air)", ["While it is true that cars are convenient, they pollute the air", "While it's true that cars are convenient, they pollute the air"], "Concessão + contraponto, sem but.", { c: ["while-true"] }),
        dialog("e10", "You are in a class debate about banning phones at school.", [
          { npc: ["Phones should be banned. Students don't pay attention.", "Os celulares deveriam ser proibidos. Os alunos não prestam atenção."], options: [
            ["While it's true that phones can distract, they are also useful for research.", true, "O colega admite que é verdade.", "Concede e contrapõe."],
            ["No, you're wrong. Phones are good.", false, "O debate vira uma briga.", "Sem concessão nem argumento."],
          ] },
          { npc: ["But some students use them to cheat.", "Mas alguns alunos usam para colar."], options: [
            ["That's a fair point. Nevertheless, a total ban punishes everyone for the actions of a few.", true, "A professora anota seu argumento.", "Reconhece e mantém a posição."],
            ["Nevertheless but it punishes everyone.", false, "A frase fica confusa.", "Nevertheless não se combina com but."],
          ] },
        ], "Debate: conceder e responder.", { c: ["while-true", "nevertheless"] }),
      ],
      summary: { points: ["Some people argue that…", "While it is true that…, (sem but).", "Nevertheless, … mantém a posição."], concepts: ["some-argue", "while-true", "nevertheless"] },
    }),

    lesson("l4", {
      title: "Fechando o argumento",
      objective: "Você vai conseguir concluir um argumento, pesar os dois lados e tirar uma conclusão.",
      minutes: 9,
      context: { kind: "text", title: "Closing paragraph", lines: [
        { en: "To sum up, working four days a week has clear advantages.", pt: "Em resumo, trabalhar quatro dias por semana tem vantagens claras." },
        { en: "The benefits for health and productivity outweigh the costs.", pt: "Os benefícios para a saúde e a produtividade superam os custos." },
        { en: "The conclusion we can draw is simple: companies should at least test the idea.", pt: "A conclusão que podemos tirar é simples: as empresas deveriam ao menos testar a ideia." },
      ] },
      explanation: {
        summary: "Para **concluir**:\n- **To sum up,** … / **In conclusion,** … / **Overall,** …\n- **The benefits outweigh the costs.** (os benefícios pesam mais)\n- **draw / reach a conclusion** (tirar / chegar a uma conclusão)\n\nA conclusão **retoma a tese** com outras palavras e não traz argumento novo.",
        details: "*Outweigh* = pesar mais do que: *The risks outweigh the advantages.* Com *conclusion*, os verbos naturais são **draw**, **reach** e **come to**; “take a conclusion” não existe em inglês. *In conclusion* é mais formal (textos); *To sum up* serve para fala e escrita.",
        examples: [
          { en: "In conclusion, the evidence supports the change.", pt: "Em conclusão, as evidências apoiam a mudança." },
          { en: "We reached the same conclusion.", pt: "Chegamos à mesma conclusão." },
          { en: "Overall, it was a success.", pt: "No geral, foi um sucesso." },
        ],
        contrasts: [
          { wrong: "We can take a conclusion from this.", right: "We can draw a conclusion from this.", why: "A colocação é draw a conclusion." },
          { wrong: "In conclusion, there is also another reason…", right: "In conclusion, the change is worth it.", why: "A conclusão não traz argumento novo." },
        ],
      },
      guided: [
        mc("e1", "Choose the best closing sentence.", ["To sum up, the benefits outweigh the costs.", "Firstly, the benefits outweigh the costs.", "For instance, the benefits."], 0, "To sum up abre a conclusão.", { c: ["to-sum-up"] }),
        mc("e2", "“The risks outweigh the benefits.” What does it mean?", ["Os riscos pesam mais que os benefícios.", "Os riscos são iguais aos benefícios.", "Os benefícios pesam mais que os riscos."], 0, "Outweigh = pesar mais do que.", { c: ["draw-conclusion"], s: "vocabulary" }),
        cloze("e3", "What conclusion can we ___ from this?", ["draw", "reach"], "Draw a conclusion.", { c: ["draw-conclusion"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "To ___ up, working four days a week has clear advantages.", ["sum"], "To sum up.", { c: ["to-sum-up"] }),
        fix("e5", "We can take an important conclusion from the results.", ["We can draw an important conclusion from the results", "We can reach an important conclusion from the results"], "Draw ou reach a conclusion.", { c: ["draw-conclusion"], prompt: "Fix the collocation." }),
        cloze("e6", "In my view, the benefits ___ the costs.", ["outweigh"], "Outweigh = superar.", { c: ["draw-conclusion"], s: "vocabulary", cue: "(superam)" }),
        dict("e7", "In conclusion, the evidence supports the change.", "In conclusion, + frase.", { c: ["to-sum-up"] }),
        order("e8", "Put the words in order: “Chegamos à mesma conclusão.”", "We reached the same conclusion.", "Reach a conclusion.", { c: ["draw-conclusion"], extra: ["took"] }),
      ],
      application: [
        type("e9", "Close an argument. Say: “Em resumo, os benefícios superam os custos.”", ["To sum up, the benefits outweigh the costs", "In conclusion, the benefits outweigh the costs", "In short, the benefits outweigh the costs", "In summary, the benefits outweigh the costs"], "To sum up, the benefits outweigh the costs.", { c: ["to-sum-up", "draw-conclusion"] }),
        speak("e10", "Give a complete 45-second argument about any topic: thesis, two reasons, the other side and a conclusion. Stress the signpost words.", ["I would argue that people should walk more. Firstly, it is free. Secondly, it is good for your heart. Some people argue that it takes too long. Nevertheless, even twenty minutes a day helps. To sum up, the benefits outweigh the costs."],
          { mode: "respond", check: ["Apresentei a tese.", "Dei dois motivos com marcadores.", "Citei o outro lado e respondi.", "Concluí com To sum up ou In conclusion.", "Dei ênfase aos marcadores."], c: ["to-sum-up", "signposts", "some-argue"] }),
      ],
      summary: { points: ["To sum up / In conclusion / Overall.", "draw / reach a conclusion.", "X outweighs Y."], concepts: ["to-sum-up", "draw-conclusion"] },
    }),
  ],

  checkpoint: {
    intro: "New topics to argue about. Organize your ideas, support them, deal with the other side and conclude.",
    a: [
      cloze("q1", "I would ___ that voting should be optional.", ["argue"], "I would argue that…", { c: ["id-argue"] }),
      mc("q2", "Choose: “Some sports, ___ swimming and cycling, are easy on the knees.”", ["such as", "for instance,", "as a result"], 0, "Lista dentro da frase: such as.", { c: ["for-instance"] }),
      fix("q3", "At first, it is unfair. Secondly, it is expensive.", ["Firstly, it is unfair. Secondly, it is expensive", "First, it is unfair. Second, it is expensive", "First, it is unfair. Secondly, it is expensive"], "Para listar argumentos: Firstly.", { c: ["signposts"], prompt: "Fix the first signpost." }),
      cloze("q4", "The road was closed. As a ___, the delivery arrived a day late.", ["result", "consequence"], "As a result.", { c: ["therefore"] }),
      dict("q5", "Some people argue that social media is harmful.", "Apresenta a visão contrária.", { c: ["some-argue"] }),
      cloze("q6", "___ it is true that the test is hard, it is also fair.", ["While", "Although"], "Concessão: While it is true that…", { c: ["while-true"] }),
      mc("q7", "Choose: “The trip was exhausting. ___, I would do it again.”", ["Nevertheless", "Therefore", "For instance"], 0, "Apesar disso: Nevertheless.", { c: ["nevertheless"] }),
      type("q8", "Say in English: “Que conclusão podemos tirar disso?”", ["What conclusion can we draw from this", "What conclusion can we draw from that", "Which conclusion can we draw from this"], "Draw a conclusion.", { c: ["draw-conclusion"] }),
      order("q9", "Put the words in order: “Isso levanta uma questão importante.”", "That raises an important issue.", "Raise an issue.", { c: ["raise-issue"], extra: ["rises"] }),
      listen("q10", "To sum up, I believe the new law will help small businesses. The advantages clearly outweigh the risks.", "What is the speaker's final position?", ["The law is positive overall", "The law is too risky", "The speaker is undecided"], 0, "The advantages outweigh the risks.", { c: ["to-sum-up", "draw-conclusion"] }),
    ],
    b: [
      type("q1", "State a thesis: “Eu defenderia que os museus deveriam ser gratuitos.”", ["I would argue that museums should be free", "I'd argue that museums should be free"], "I would argue that + frase.", { c: ["id-argue"] }),
      cloze("q2", "For ___, Portugal produces most of its electricity from renewable sources on some days.", ["instance", "example"], "For instance, + frase completa.", { c: ["for-instance"] }),
      cloze("q3", "Firstly, the park is safe. ___, it is free. Finally, it is close to the subway.", ["Secondly", "Second"], "O segundo argumento: Secondly.", { c: ["signposts"] }),
      mc("q4", "Choose: “The company lost its biggest client. ___, it had to cut costs.”", ["Therefore", "Such as", "While"], 0, "Consequência lógica: Therefore.", { c: ["therefore"] }),
      order("q5", "Put the words in order: “Há quem defenda que os zoológicos são cruéis.”", "Some people argue that zoos are cruel.", "Some people argue that + frase.", { c: ["some-argue"] }),
      fix("q6", "While it is true that the city is noisy, but it has more jobs.", ["While it is true that the city is noisy, it has more jobs"], "Concessão com while: sem but.", { c: ["while-true"], prompt: "Fix the mistake." }),
      dict("q7", "The evidence is limited. Nevertheless, the trend is clear.", "Nevertheless mantém a posição.", { c: ["nevertheless"] }),
      fix("q8", "After reading the report, I took a different conclusion.", ["After reading the report, I drew a different conclusion", "After reading the report, I reached a different conclusion", "After reading the report, I came to a different conclusion"], "Draw / reach a conclusion.", { c: ["draw-conclusion"], prompt: "Fix the collocation." }),
      mc("q9", "“She made a good point.” What does it mean?", ["Ela apresentou um bom argumento.", "Ela marcou um ponto no jogo.", "Ela chegou no horário."], 0, "Make a point = apresentar um argumento.", { c: ["raise-issue"], s: "vocabulary" }),
      listen("q10", "Some people argue that tourism damages small towns. While that may be true, it also creates jobs. In conclusion, towns should manage tourism, not stop it.", "What does the speaker recommend?", ["Managing tourism", "Stopping tourism", "Ignoring the problem"], 0, "Towns should manage tourism, not stop it.", { c: ["to-sum-up", "some-argue"] }),
    ],
    production: write("t1", "Write an argument of about 90 words: “Should public transport be free?” Include a thesis, two supported reasons, a counter-argument with your answer, and a conclusion.",
      { mode: "argument", min: 75, check: ["Abri com uma tese clara.", "Organizei os motivos com Firstly e Secondly.", "Dei um exemplo ou uma consequência.", "Apresentei o outro lado e respondi a ele.", "Concluí sem trazer argumento novo."],
        model: "I would argue that public transport should be free in large cities. Firstly, it would reduce traffic, because more people would leave their cars at home. Secondly, it would help low-income families; for instance, some workers spend a large part of their salary on bus tickets. Some people argue that it would be too expensive. While it is true that the cost is high, cities already spend billions on roads. To sum up, the benefits for the environment and for workers outweigh the costs.", c: ["id-argue", "signposts", "some-argue", "while-true", "to-sum-up"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Carros fora do centro?",
      goal: "Ler um texto argumentativo e identificar tese, apoio, contra-argumento e conclusão.",
      context: { kind: "text", title: "Should cities ban cars from their centers?", lines: [
        { en: "Should cities ban cars from their centers? I would argue that they should.", pt: "As cidades deveriam proibir carros no centro? Eu defenderia que sim." },
        { en: "Firstly, fewer cars mean cleaner air; for instance, pollution fell sharply in cities that tried it. Secondly, streets become safer.", pt: "Em primeiro lugar, menos carros significam ar mais limpo; por exemplo, a poluição caiu bastante nas cidades que tentaram. Em segundo lugar, as ruas ficam mais seguras." },
        { en: "Some people argue that shops lose customers. While it is true that some drivers stay away, studies show that pedestrians spend more. Therefore, the ban helps local business.", pt: "Há quem defenda que as lojas perdem clientes. Embora seja verdade que alguns motoristas deixam de ir, estudos mostram que os pedestres gastam mais. Portanto, a proibição ajuda o comércio local." },
        { en: "To sum up, the benefits clearly outweigh the costs.", pt: "Em resumo, os benefícios claramente superam os custos." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "What is the writer's thesis?", ["Cities should ban cars from their centers.", "Cars are necessary for shops.", "Pollution is not a real problem."], 0, "I would argue that they should.", { c: ["id-argue"] }),
        rd("r2", PASSAGE, "Which counter-argument does the writer mention?", ["Shops lose customers.", "Buses are too slow.", "Parking is expensive."], 0, "Some people argue that shops lose customers.", { c: ["some-argue"] }),
        rd("r3", PASSAGE, "How does the writer answer it?", ["Pedestrians spend more, so business benefits.", "Shops are not important.", "Drivers will come back later."], 0, "Studies show that pedestrians spend more.", { c: ["while-true"] }),
        type("r4", "Which two-word expression in the text introduces the conclusion? (To ___ ___)", ["To sum up", "sum up"], "To sum up.", { c: ["to-sum-up"], passage: PASSAGE }),
      ],
    }),
    listening: activity("listening", {
      title: "Um argumento em um minuto",
      goal: "Acompanhar a estrutura de um argumento falado pelos marcadores.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "I'd argue that schools should start later. Firstly, teenagers need more sleep. Secondly, tired students learn less. Some people argue that parents start work early. Nevertheless, a later start improves results. To sum up, the change is worth it.", pt: "Eu defenderia que as escolas deveriam começar mais tarde. Em primeiro lugar, adolescentes precisam de mais sono. Em segundo, alunos cansados aprendem menos. Há quem defenda que os pais começam a trabalhar cedo. Ainda assim, começar mais tarde melhora os resultados. Em resumo, a mudança vale a pena." }] },
      exercises: [
        listen("a1", "I'd argue that schools should start later. Firstly, teenagers need more sleep. Secondly, tired students learn less.", "How many reasons does the speaker give?", ["Two", "One", "Three"], 0, "Firstly… Secondly…: dois motivos.", { c: ["signposts"] }),
        listen("a2", "Some people argue that parents start work early. Nevertheless, a later start improves results. To sum up, the change is worth it.", "What is the objection?", ["Parents start work early", "Teachers are tired", "Schools are too far"], 0, "Some people argue that parents start work early.", { c: ["some-argue"] }),
        dict("a3", "To sum up, the change is worth it.", "Conclusão com To sum up.", { c: ["to-sum-up"], prompt: "Type the conclusion." }),
      ],
    }),
    writing: activity("writing", {
      title: "Parágrafo de contra-argumento",
      goal: "Escrever um parágrafo que apresenta e responde a uma objeção.",
      exercises: [
        write("w1", "Your thesis: “Everyone should learn a second language.” Write the counter-argument paragraph (about 55 words): present an objection, concede a point and answer it.",
          { mode: "argument", min: 45, check: ["Apresentei a objeção com Some people argue that.", "Concedi um ponto com While it is true that, sem but.", "Respondi com um contraponto claro.", "Usei nevertheless, therefore ou as a result."], model: "Some people argue that learning a second language is a waste of time because translation apps are everywhere. While it is true that apps are useful for simple tasks, they cannot build real relationships. Nevertheless, the main benefit is not practical: a new language changes how you think. Therefore, the effort is still worth it.", c: ["some-argue", "while-true", "nevertheless"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Um minuto, um argumento",
      goal: "Defender uma posição em voz alta com estrutura completa.",
      exercises: [
        speak("s1", "Choose one: “Homework should be banned”, “Everyone should work from home” or “Cities need fewer cars”. Speak for one minute: thesis, two reasons with support, the other side, conclusion.", ["I would argue that cities need fewer cars. Firstly, the air would be cleaner. Secondly, streets would be safer; for instance, children could walk to school. Some people argue that cars are necessary. Nevertheless, better buses can replace many trips. To sum up, the benefits outweigh the costs."],
          { mode: "respond", check: ["Usei I would argue that.", "Usei Firstly e Secondly.", "Dei um exemplo ou consequência.", "Apresentei e respondi ao outro lado.", "Concluí com To sum up ou In conclusion."], c: ["id-argue", "signposts", "nevertheless", "to-sum-up"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: defender uma proposta",
      goal: "Defender uma proposta diante de alguém que discorda, do começo à conclusão.",
      exercises: [
        dialog("m1", "You propose a monthly “no-meeting day” at work. Your manager is skeptical.", [
          { npc: ["Why do we need a day without meetings?", "Por que precisamos de um dia sem reuniões?"], options: [
            ["I'd argue that it would improve our results. Firstly, people need time to focus. Secondly, we have too many short meetings.", true, "A gerente escuta com atenção.", "Tese e roteiro."],
            ["Because meetings are boring.", false, "Ela não se convence.", "Falta tese e argumento."],
          ] },
          { npc: ["But clients may need us on that day.", "Mas os clientes podem precisar de nós nesse dia."], options: [
            ["That raises a fair issue. While it's true that clients come first, we could keep one person available.", true, "Ela considera a ideia.", "Reconhece, concede e resolve."],
            ["Clients can wait. However but we need focus.", false, "Soa descuidado e a frase está errada.", "Não ignore a objeção; however não se combina com but."],
          ] },
          { npc: ["So what are you asking for, exactly?", "Então o que exatamente você está pedindo?"], options: [
            ["To sum up, I'm asking for a three-month test. Then we can draw a conclusion from the results.", true, "Ela aprova o teste.", "Conclusão clara e pedido concreto."],
            ["In conclusion, there is also another reason I forgot.", false, "Ela perde o fio.", "A conclusão não traz argumento novo."],
          ] },
        ], "Defender uma proposta: tese, concessão e conclusão.", { c: ["id-argue", "raise-issue", "while-true", "to-sum-up", "draw-conclusion"] }),
        type("m2", "Acknowledge an objection politely. Say: “Isso levanta uma questão justa.”", ["That raises a fair issue", "This raises a fair issue", "That raises a fair point", "This raises a fair point"], "That raises a fair issue.", { c: ["raise-issue"] }),
      ],
      outside: {
        title: "Fora do app: argumento em um cartão",
        instructions: "Escolha um tema que importa para você. Escreva em um cartão ou nota apenas o esqueleto em inglês: tese, dois motivos, uma objeção e a conclusão (cinco linhas curtas). Depois, defenda a ideia em voz alta por um minuto olhando só o esqueleto. Grave e ouça: os marcadores estão claros?",
        checklist: ["Escrevi o esqueleto em cinco linhas.", "Falei por cerca de um minuto sem ler frases prontas.", "Usei marcadores para cada parte.", "Respondi a uma objeção."],
      },
    }),
  },
});
