/** A1 · Unidade 4 — Minha rotina: presente simples, perguntas e negativas. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u04",

  concepts: [
    concept("get-up", "phrase", "get up / go to bed", "levantar / ir dormir", "l1", ["I get up at seven.", "Eu levanto às sete."], { tags: ["chunk"] }),
    concept("have-meals", "phrase", "have breakfast / lunch / dinner", "tomar café da manhã / almoçar / jantar", "l1", ["We have lunch at home.", "Nós almoçamos em casa."], { tags: ["collocation"] }),
    concept("go-to-work", "phrase", "go to work / go to school", "ir para o trabalho / para a escola", "l1", ["I go to work by bus.", "Eu vou para o trabalho de ônibus."], { tags: ["collocation"] }),
    concept("make-do", "phrase", "make breakfast / do homework", "fazer o café / fazer a lição", "l1", ["I do my homework at night.", "Eu faço minha lição à noite."], { note: "Make = produzir algo (make coffee, make dinner). Do = realizar uma tarefa (do homework, do the dishes).", tags: ["collocation"] }),
    concept("third-s", "pattern", "he works / she studies", "ele trabalha / ela estuda", "l2", ["She works in a bank.", "Ela trabalha em um banco."], { note: "Com he, she e it o verbo ganha -s." }),
    concept("goes-has", "pattern", "goes, does, has, watches", "vai, faz, tem, assiste", "l2", ["He goes to work at eight.", "Ele vai para o trabalho às oito."], { note: "go → goes, do → does, have → has, watch → watches." }),
    concept("dont", "pattern", "I don't work", "eu não trabalho", "l3", ["We don't work on Sunday.", "Nós não trabalhamos no domingo."]),
    concept("doesnt", "pattern", "she doesn't work", "ela não trabalha", "l3", ["He doesn't drink coffee.", "Ele não bebe café."], { note: "Depois de doesn't o verbo volta à forma simples, sem -s." }),
    concept("do-question", "pattern", "Do you work?", "Você trabalha?", "l4", ["Do you study at night?", "Você estuda à noite?"]),
    concept("does-question", "pattern", "Does she work?", "Ela trabalha?", "l4", ["Does he live here?", "Ele mora aqui?"], { note: "Com does, o verbo fica sem -s." }),
    concept("short-do", "phrase", "Yes, I do. / No, she doesn't.", "Sim. / Não.", "l4", ["— Do you cook? — Yes, I do.", "— Você cozinha? — Sim."]),
  ],

  lessons: [
    lesson("l1", {
      title: "O meu dia",
      objective: "Você vai conseguir descrever o que faz em um dia comum.",
      minutes: 8,
      context: { kind: "text", title: "O dia do Leo", lines: [
        { en: "I get up at six. I make breakfast and I have breakfast with my family.", pt: "Eu levanto às seis. Faço o café e tomo café com a minha família." },
        { en: "I go to work by bus. I have lunch at work.", pt: "Vou para o trabalho de ônibus. Almoço no trabalho." },
        { en: "At night, I study English and I do my homework.", pt: "À noite, estudo inglês e faço minha lição." },
        { en: "I go to bed at eleven.", pt: "Vou dormir às onze." },
      ] },
      explanation: {
        summary: "O **presente simples** fala de rotinas e fatos. Com **I, you, we, they**, o verbo fica na forma básica: **I work**, **we study**.\n\nBlocos úteis: **get up** (levantar), **have breakfast/lunch/dinner** (fazer as refeições), **go to work** (ir trabalhar), **go to bed** (ir dormir).",
        details: "Em português usamos “fazer” para quase tudo. Em inglês há dois verbos: **make** quando se produz algo (*make breakfast, make coffee, make a cake*) e **do** quando se realiza uma tarefa (*do homework, do the dishes, do exercise*).",
        examples: [
          { en: "I get up at six.", pt: "Eu levanto às seis." },
          { en: "We have dinner at home.", pt: "Nós jantamos em casa." },
          { en: "I do my homework at night.", pt: "Eu faço minha lição à noite." },
        ],
        contrasts: [
          { wrong: "I make my homework.", right: "I do my homework.", why: "Homework é tarefa: usa do." },
          { wrong: "I take breakfast.", right: "I have breakfast.", why: "Refeições usam have." },
        ],
      },
      guided: [
        mc("e1", "Complete: “I ___ my homework at night.”", ["do", "make", "have"], 0, "Homework é uma tarefa, então usamos do.", { c: ["make-do"], s: "vocabulary", why: [undefined, "Make é para produzir algo, como make coffee.", "Have é para refeições."] }),
        match("e2", "Associe a expressão ao significado.", [["get up", "levantar"], ["have breakfast", "tomar café da manhã"], ["go to work", "ir para o trabalho"], ["go to bed", "ir dormir"], ["make dinner", "fazer o jantar"]],
          "São os blocos básicos para contar o seu dia.", { c: ["get-up", "have-meals", "go-to-work", "make-do"] }),
        cloze("e3", "I ___ up at six.", ["get"], "Get up = levantar.", { c: ["get-up"], s: "vocabulary", tr: "Eu levanto às seis." }),
      ],
      independent: [
        cloze("e4", "We ___ lunch at work.", ["have"], "Refeições usam have: have lunch.", { c: ["have-meals"], s: "vocabulary", tr: "Nós almoçamos no trabalho." }),
        order("e5", "Monte: “Eu vou para o trabalho de ônibus.”", "I go to work by bus.", "Go to work + by + transporte.", { c: ["go-to-work"], extra: ["the"] }),
        dict("e6", "I go to bed at eleven.", "Go to bed = ir dormir.", { c: ["get-up"], alt: ["I go to bed at 11."] }),
        fix("e7", "I make my homework at night.", ["I do my homework at night"], "Tarefas usam do: do my homework.", { c: ["make-do"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e8", "Diga em inglês: “Eu faço o café da manhã.” (preparar)", ["I make breakfast"], "Preparar comida é make: I make breakfast.", { c: ["make-do", "have-meals"], t: [["I do breakfast", "Preparar comida usa make, não do."]] }),
        speak("e9", "Conte três coisas do seu dia em voz alta.", ["I get up at six. I go to work by bus. I go to bed at eleven."],
          { mode: "respond", check: ["Usei três verbos de rotina.", "Não omiti o sujeito I.", "Falei sem parar para traduzir."], c: ["get-up", "go-to-work"] }),
      ],
      summary: { points: ["I/you/we/they + verbo na forma básica.", "Have para refeições; go to work/bed.", "Make produz algo; do realiza uma tarefa."], concepts: ["get-up", "have-meals", "go-to-work", "make-do"] },
    }),

    lesson("l2", {
      title: "Ele trabalha, ela estuda",
      objective: "Você vai conseguir falar da rotina de outra pessoa sem esquecer o -s.",
      minutes: 9,
      context: { kind: "text", title: "O dia da Marta", lines: [
        { en: "Marta gets up at five. She has coffee and goes to work.", pt: "Marta levanta às cinco. Ela toma café e vai para o trabalho." },
        { en: "She works in a hospital. She starts at six.", pt: "Ela trabalha em um hospital. Começa às seis." },
        { en: "At night she watches TV and studies English.", pt: "À noite ela assiste TV e estuda inglês." },
      ] },
      explanation: {
        summary: "Com **he**, **she** e **it**, o verbo no presente simples ganha **-s**: **I work → she works**.\n\nAlguns mudam um pouco mais:\n- **go → goes**, **do → does**\n- **have → has**\n- **watch → watches**, **study → studies**",
        details: "Regras de escrita: verbos terminados em -o, -ch, -sh, -ss, -x levam **-es** (*goes, watches, washes*). Consoante + y vira **-ies** (*study → studies*). Vogal + y só recebe -s (*plays*).",
        examples: [
          { en: "She works in a hospital.", pt: "Ela trabalha em um hospital." },
          { en: "He goes to school by bus.", pt: "Ele vai para a escola de ônibus." },
          { en: "My sister has two jobs.", pt: "Minha irmã tem dois empregos." },
        ],
        contrasts: [
          { wrong: "He go to work at eight.", right: "He goes to work at eight.", why: "Com he, she e it o verbo leva -s ou -es. É o erro mais comum de brasileiros." },
          { wrong: "She haves a car.", right: "She has a car.", why: "Have é irregular: has." },
        ],
        tip: "O **-s** final tem três sons: /s/ em *works*, /z/ em *goes* e *studies*, /ɪz/ em *watches*. O importante é que ele seja ouvido: não engula o final.",
      },
      guided: [
        mc("e1", "Qual frase está correta?", ["He goes to work by car.", "He go to work by car.", "He going to work by car."], 0, "Com he: go → goes.", { c: ["goes-has"], why: [undefined, "Falta o -es de terceira pessoa.", "Going precisa de is e fala de agora, não de rotina."] }),
        match("e2", "Associe a forma de I com a forma de she.", [["I work", "she works"], ["I go", "she goes"], ["I have", "she has"], ["I study", "she studies"], ["I watch", "she watches"]],
          "Com she, o verbo ganha -s, -es ou muda (has).", { c: ["third-s", "goes-has"] }),
        listen("e3", "She works in a hospital.", "Onde ela trabalha?", ["Em um hospital", "Em um hotel", "Em uma escola"], 0, "She works in a hospital.", { c: ["third-s"] }),
      ],
      independent: [
        cloze("e4", "My brother ___ in a bank.", ["works"], "My brother = he: works.", { c: ["third-s"], cue: "(work)", t: [["work", "Com he/she/it o verbo ganha -s: works."]] }),
        cloze("e5", "She ___ to bed at ten.", ["goes"], "Go → goes com she.", { c: ["goes-has"], cue: "(go)", t: [["go", "Com she, go vira goes."]] }),
        fix("e6", "My mother have breakfast at six.", ["My mother has breakfast at six"], "My mother = she: has.", { c: ["goes-has"], prompt: "Corrija o erro." }),
        dict("e7", "He studies English at night.", "Study → studies com he.", { c: ["third-s"] }),
        cloze("e8", "Leo ___ TV after dinner.", ["watches"], "Watch termina em -ch: watches.", { c: ["goes-has"], cue: "(watch)" }),
      ],
      application: [
        type("e9", "Diga em inglês: “Ela trabalha em uma escola.”", ["She works in a school", "She works at a school"], "Com she, o verbo ganha -s: works.", { c: ["third-s"] }),
        write("e10", "Escreva três frases sobre a rotina de uma pessoa que você conhece.",
          { frame: ["He/She gets up at …", "He/She works …", "He/She goes …"], min: 12, check: ["Todos os verbos com he/she têm -s.", "Usei goes ou has corretamente.", "Cada frase tem sujeito."], model: "My sister gets up at six. She works in a store. She goes to bed at ten.", c: ["third-s", "goes-has"] }),
      ],
      summary: { points: ["He/she/it: verbo + s (works).", "go → goes, do → does, have → has, watch → watches, study → studies.", "Pronuncie o -s final."], concepts: ["third-s", "goes-has"] },
    }),

    lesson("l3", {
      title: "Eu não faço isso",
      objective: "Você vai conseguir dizer o que você e outras pessoas não fazem.",
      minutes: 8,
      context: { kind: "dialogue", title: "Hábitos diferentes", lines: [
        { who: "Ana", en: "I don't drink coffee. I drink tea.", pt: "Eu não bebo café. Bebo chá." },
        { who: "Leo", en: "Really? My brother doesn't drink coffee, but he drinks a lot of juice.", pt: "Sério? Meu irmão não bebe café, mas bebe muito suco." },
        { who: "Ana", en: "We don't work on Sunday. And you?", pt: "Nós não trabalhamos no domingo. E vocês?" },
        { who: "Leo", en: "I work on Sunday, but my wife doesn't.", pt: "Eu trabalho no domingo, mas minha esposa não." },
      ] },
      explanation: {
        summary: "Para negar no presente simples, use **don't** ou **doesn't** antes do verbo:\n- **I / you / we / they + don't + verbo**\n- **he / she / it + doesn't + verbo**\n\nDepois de **doesn't**, o verbo **volta à forma básica**: **She doesn't work** (sem -s).",
        details: "Don't = do not; doesn't = does not. O -s da terceira pessoa já está em does, por isso o verbo principal não leva -s de novo.",
        examples: [
          { en: "I don't drink coffee.", pt: "Eu não bebo café." },
          { en: "He doesn't work on Sunday.", pt: "Ele não trabalha no domingo." },
          { en: "They don't live here.", pt: "Eles não moram aqui." },
        ],
        contrasts: [
          { wrong: "She doesn't works here.", right: "She doesn't work here.", why: "Depois de doesn't, verbo sem -s." },
          { wrong: "I no work on Sunday.", right: "I don't work on Sunday.", why: "A negativa precisa de don't." },
        ],
      },
      guided: [
        mc("e1", "Complete: “He ___ drink coffee.”", ["doesn't", "don't", "isn't"], 0, "Com he, a negativa é doesn't.", { c: ["doesnt"], why: [undefined, "Don't é para I, you, we e they.", "Isn't é do verbo to be, não acompanha drink."] }),
        match("e2", "Associe a frase à negativa.", [["I work", "I don't work"], ["She works", "She doesn't work"], ["We study", "We don't study"], ["He goes", "He doesn't go"]],
          "Repare: depois de doesn't, o verbo perde o -s.", { c: ["dont", "doesnt"] }),
        cloze("e3", "We ___ work on Sunday.", ["don't", "do not"], "Com we, a negativa é don't.", { c: ["dont"], tr: "Nós não trabalhamos no domingo." }),
      ],
      independent: [
        cloze("e4", "My wife ___ work on Sunday.", ["doesn't", "does not"], "My wife = she: doesn't.", { c: ["doesnt"], tr: "Minha esposa não trabalha no domingo." }),
        fix("e5", "She doesn't works here.", ["She doesn't work here", "She does not work here"], "Depois de doesn't, o verbo fica sem -s.", { c: ["doesnt"], prompt: "Corrija o erro." }),
        order("e6", "Monte: “Eu não bebo café.”", "I don't drink coffee.", "Don't vem antes do verbo.", { c: ["dont"], extra: ["no"] }),
        dict("e7", "He doesn't live here.", "Doesn't + verbo sem -s.", { c: ["doesnt"], alt: ["He does not live here."] }),
      ],
      application: [
        type("e8", "Diga em inglês: “Eles não estudam à noite.”", ["They don't study at night", "They do not study at night"], "They + don't + verbo.", { c: ["dont"] }),
        dialog("e9", "Um colega oferece algo e pergunta sobre seus hábitos.", [
          { npc: ["Coffee?", "Café?"], options: [
            ["No, thanks. I don't drink coffee.", true, "Ele oferece chá.", "Recusa educada e negativa correta."],
            ["No, thanks. I no drink coffee.", false, "Ele entende, mas a frase está errada.", "A negativa pede don't."],
          ] },
          { npc: ["And your sister?", "E sua irmã?"], options: [
            ["She doesn't drink coffee either.", true, "Ele traz dois chás.", "She + doesn't + verbo sem -s."],
            ["She don't drinks coffee.", false, "Soa bem errado.", "Com she é doesn't, e o verbo fica sem -s."],
          ] },
        ], "Negativas: don't com I/you/we/they; doesn't com he/she/it.", { c: ["dont", "doesnt"] }),
      ],
      summary: { points: ["I/you/we/they + don't + verbo.", "He/she/it + doesn't + verbo (sem -s).", "Nunca “I no work”."], concepts: ["dont", "doesnt"] },
    }),

    lesson("l4", {
      title: "Você trabalha? Ela mora aqui?",
      objective: "Você vai conseguir fazer perguntas sobre rotina e responder com respostas curtas.",
      minutes: 9,
      context: { kind: "dialogue", title: "Entrevista rápida", lines: [
        { who: "Ken", en: "Do you work, Bia?", pt: "Você trabalha, Bia?" },
        { who: "Bia", en: "Yes, I do. I work in a store.", pt: "Sim. Trabalho em uma loja." },
        { who: "Ken", en: "Does your brother work too?", pt: "Seu irmão também trabalha?" },
        { who: "Bia", en: "No, he doesn't. He studies. Where do you live?", pt: "Não. Ele estuda. Onde você mora?" },
        { who: "Ken", en: "I live near the school.", pt: "Moro perto da escola." },
      ] },
      explanation: {
        summary: "Perguntas no presente simples começam com **Do** ou **Does**:\n- **Do + I / you / we / they + verbo?**\n- **Does + he / she / it + verbo?** (verbo sem -s)\n\nRespostas curtas: **Yes, I do.** / **No, I don't.** / **Yes, she does.** / **No, she doesn't.**\n\nCom palavra interrogativa: **Where do you live?** **What does she do?**",
        details: "Não confunda com o verbo to be: *Are you a student?* (to be) mas *Do you study?* (outro verbo). Nunca misture os dois: “Are you work?” não existe.",
        examples: [
          { en: "Do you work?", pt: "Você trabalha?" },
          { en: "Does she live here?", pt: "Ela mora aqui?" },
          { en: "Where do you live?", pt: "Onde você mora?" },
        ],
        contrasts: [
          { wrong: "You work here?", right: "Do you work here?", why: "A pergunta precisa do auxiliar do." },
          { wrong: "Does she works here?", right: "Does she work here?", why: "Com does, o verbo fica sem -s." },
          { wrong: "Where you live?", right: "Where do you live?", why: "Depois da palavra interrogativa vem do." },
        ],
      },
      guided: [
        mc("e1", "Qual pergunta está correta?", ["Does she work here?", "Does she works here?", "Do she work here?"], 0, "Does + she + verbo sem -s.", { c: ["does-question"] }),
        match("e2", "Associe pergunta e resposta curta.", [["Do you work?", "Yes, I do."], ["Does he study?", "No, he doesn't."], ["Do they live here?", "Yes, they do."], ["Does she cook?", "Yes, she does."]],
          "A resposta curta repete o auxiliar da pergunta.", { c: ["short-do", "do-question", "does-question"] }),
        cloze("e3", "___ you study at night?", ["Do"], "Com you, a pergunta começa com Do.", { c: ["do-question"], tr: "Você estuda à noite?" }),
      ],
      independent: [
        cloze("e4", "___ your brother work?", ["Does"], "Your brother = he: Does.", { c: ["does-question"], tr: "Seu irmão trabalha?" }),
        order("e5", "Monte: “Onde você mora?”", "Where do you live?", "Palavra interrogativa + do + sujeito + verbo.", { c: ["do-question"], extra: ["are"] }),
        fix("e6", "Does he works at night?", ["Does he work at night"], "Com does, o verbo fica sem -s.", { c: ["does-question"], prompt: "Corrija o erro." }),
        dict("e7", "Do you work? Yes, I do.", "Pergunta com Do e resposta curta com do.", { c: ["do-question", "short-do"] }),
      ],
      application: [
        type("e8", "Responda com resposta curta negativa: “Does she live here?”", ["No, she doesn't", "No, she does not"], "Resposta curta: No, she doesn't.", { c: ["short-do"] }),
        speak("e9", "Faça três perguntas sobre a rotina de alguém.", ["Do you work? Where do you live? Does your brother study?"],
          { check: ["Comecei as perguntas com Do ou Does.", "Usei Does para a terceira pessoa.", "Subi a entonação no final das perguntas de sim ou não."], c: ["do-question", "does-question"] }),
      ],
      summary: { points: ["Do you…? / Does she…? (verbo sem -s).", "Where do you live? What does he do?", "Yes, I do. / No, she doesn't."], concepts: ["do-question", "does-question", "short-do"] },
    }),
  ],

  checkpoint: {
    intro: "Rotinas de pessoas novas. Atenção ao -s, a don't/doesn't e à ordem das perguntas.",
    a: [
      cloze("q1", "My father ___ at seven.", ["gets up"], "My father = he: gets up.", { c: ["third-s", "get-up"], cue: "(get up)" }),
      mc("q2", "Qual está correta?", ["She doesn't like tea.", "She don't like tea.", "She doesn't likes tea."], 0, "She + doesn't + verbo sem -s.", { c: ["doesnt"] }),
      fix("q3", "He go to school by bus.", ["He goes to school by bus"], "Com he, go vira goes.", { c: ["goes-has"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “O que ela faz?”", "What does she do?", "What + does + she + verbo.", { c: ["does-question"], extra: ["is"] }),
      dict("q5", "We have dinner at eight.", "Refeições usam have.", { c: ["have-meals"], alt: ["We have dinner at 8."] }),
      type("q6", "Diga em inglês: “Eu não trabalho no sábado.”", ["I don't work on Saturday", "I do not work on Saturday", "I don't work on Saturdays", "I do not work on Saturdays"], "I + don't + verbo.", { c: ["dont"] }),
      cloze("q7", "I ___ the dishes after dinner.", ["do"], "Tarefa doméstica: do the dishes.", { c: ["make-do"], s: "vocabulary" }),
      listen("q8", "Does your sister work? No, she doesn't. She studies.", "O que a irmã faz?", ["Estuda", "Trabalha", "Trabalha e estuda"], 0, "No, she doesn't. She studies.", { c: ["short-do", "third-s"] }),
      mc("q9", "Como perguntar “Você mora aqui?”", ["Do you live here?", "Are you live here?", "You live here?"], 0, "Pergunta com do; não se mistura com to be.", { c: ["do-question"] }),
      dialog("q10", "Você conversa com uma nova vizinha.", [
        { npc: ["Do you work near here?", "Você trabalha aqui perto?"], options: [
          ["Yes, I do. I work in a bank.", true, "Ela diz: “Oh, nice!”", "Resposta curta e informação."],
          ["Yes, I am. I work in a bank.", false, "Soa estranho.", "A pergunta é com do; a resposta curta também."],
        ] },
        { npc: ["And your husband?", "E seu marido?"], options: [
          ["He works at home. He doesn't go to an office.", true, "Ela acha interessante.", "Works com -s e doesn't + verbo."],
          ["He work at home. He don't go to an office.", false, "Ela entende com esforço.", "Faltam o -s e doesn't."],
        ] },
      ], "Rotina na terceira pessoa: -s na afirmativa, doesn't na negativa.", { c: ["short-do", "third-s", "doesnt"] }),
    ],
    b: [
      cloze("q1", "Ana ___ English on Monday.", ["studies"], "Study → studies com she.", { c: ["third-s"], cue: "(study)" }),
      mc("q2", "Qual está correta?", ["They don't have a car.", "They doesn't have a car.", "They not have a car."], 0, "Com they, a negativa é don't.", { c: ["dont"] }),
      fix("q3", "Do she work here?", ["Does she work here"], "Com she, a pergunta usa Does.", { c: ["does-question"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Ele não assiste TV.”", "He doesn't watch TV.", "Doesn't + verbo sem -es.", { c: ["doesnt"], extra: ["watches"] }),
      dict("q5", "She goes to work by car.", "Go → goes com she.", { c: ["goes-has", "go-to-work"] }),
      type("q6", "Diga em inglês: “Você trabalha no domingo?”", ["Do you work on Sunday", "Do you work on Sundays"], "Do + you + verbo.", { c: ["do-question"] }),
      cloze("q7", "My mother ___ a cake on Sunday.", ["makes"], "Produzir comida: make; com she, makes.", { c: ["make-do", "third-s"], cue: "(make)" }),
      listen("q8", "I get up at five and I go to bed at ten.", "A que horas a pessoa vai dormir?", ["Às dez", "Às cinco", "Às onze"], 0, "I go to bed at ten.", { c: ["get-up"] }),
      mc("q9", "Resposta curta para “Do they live here?”", ["Yes, they do.", "Yes, they are.", "Yes, they live."], 0, "A resposta curta repete do.", { c: ["short-do"] }),
      dialog("q10", "Em uma entrevista de pesquisa na rua.", [
        { npc: ["Do you have breakfast at home?", "Você toma café da manhã em casa?"], options: [
          ["No, I don't. I have breakfast at work.", true, "A pesquisadora anota.", "Resposta curta e have + refeição."],
          ["No, I don't. I take breakfast at work.", false, "Ela entende, mas não é natural.", "Refeições usam have."],
        ] },
        { npc: ["What does your wife do?", "O que sua esposa faz?"], options: [
          ["She's a nurse. She works at night.", true, "Ela agradece.", "Profissão e rotina com -s."],
          ["She's a nurse. She work at night.", false, "Falta algo na frase.", "Com she: works."],
        ] },
      ], "Have para refeições; -s na terceira pessoa.", { c: ["have-meals", "third-s"] }),
    ],
    production: write("t1", "Descreva a sua rotina e a rotina de outra pessoa. Inclua pelo menos uma negativa.",
      { mode: "free", min: 30, check: ["Contei minha rotina com pelo menos três verbos.", "Usei -s nos verbos da outra pessoa.", "Usei don't ou doesn't.", "Usei have para uma refeição."],
        model: "I get up at six and I have breakfast at home. I go to work by bus. I don't work on Sunday. My sister gets up at eight. She works in a store. She doesn't have lunch at home.", c: ["third-s", "dont", "doesnt"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Um dia na vida de uma enfermeira",
      goal: "Ler um texto sobre a rotina de alguém e localizar horários e hábitos.",
      context: { kind: "text", title: "Marta's day", lines: [
        { en: "Marta is a nurse. She gets up at five and has coffee, but she doesn't have breakfast.", pt: "Marta é enfermeira. Ela levanta às cinco e toma café, mas não toma café da manhã." },
        { en: "She goes to work by bus. She has lunch at the hospital.", pt: "Ela vai para o trabalho de ônibus. Almoça no hospital." },
        { en: "At night she makes dinner and studies English. She doesn't watch TV.", pt: "À noite ela faz o jantar e estuda inglês. Ela não assiste TV." },
      ] },
      exercises: [
        mc("r1", "O que a Marta não faz de manhã?", ["Não toma café da manhã", "Não toma café", "Não levanta cedo"], 0, "She doesn't have breakfast.", { c: ["doesnt", "have-meals"], s: "reading" }),
        cloze("r2", "She goes to work by ___.", ["bus"], "O texto diz: She goes to work by bus.", { c: ["go-to-work"], s: "reading" }),
        type("r3", "O que ela faz à noite, além de estudar? Complete: She ___ dinner.", ["makes"], "She makes dinner: preparar comida usa make.", { c: ["make-do", "third-s"], s: "reading" }),
        type("r4", "Responda com resposta curta: Does Marta watch TV at night?", ["No, she doesn't", "No, she does not"], "O texto diz: She doesn't watch TV.", { c: ["short-do"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Perguntas sobre a rotina",
      goal: "Entender perguntas e respostas curtas sobre hábitos.",
      context: { kind: "dialogue", title: "Transcrição", lines: [
        { who: "A", en: "Do you get up early?", pt: "Você levanta cedo?" },
        { who: "B", en: "Yes, I do. I get up at six. My husband doesn't. He gets up at nine.", pt: "Sim. Levanto às seis. Meu marido não. Ele levanta às nove." },
      ] },
      exercises: [
        listen("a1", ["Do you get up early?", "Yes, I do. I get up at six. My husband doesn't. He gets up at nine."], "A que horas a mulher levanta?", ["Às seis", "Às nove", "Às cinco"], 0, "I get up at six.", { c: ["get-up"], keepOrder: true }),
        listen("a2", ["Do you get up early?", "Yes, I do. I get up at six. My husband doesn't. He gets up at nine."], "O marido levanta cedo?", ["Não", "Sim", "Não é dito"], 0, "My husband doesn't. He gets up at nine.", { c: ["doesnt"], keepOrder: true }),
        dict("a3", "Do you get up early?", "Pergunta com Do no início.", { c: ["do-question", "get-up"], prompt: "Digite a pergunta." }),
      ],
    }),
    writing: activity("writing", {
      title: "Minha rotina em cinco frases",
      goal: "Escrever um parágrafo curto sobre o próprio dia.",
      exercises: [
        write("w1", "Escreva cinco frases sobre o seu dia, do momento em que levanta até a hora de dormir. Inclua algo que você não faz.",
          { frame: ["I get up at …", "I have … at …", "I go to …", "I don't …", "I go to bed at …"], min: 22, check: ["Usei pelo menos quatro verbos de rotina.", "Usei have para uma refeição.", "Incluí uma negativa com don't."], model: "I get up at seven. I have breakfast at home. I go to work by bus. I don't have lunch at work. I go to bed at eleven.", c: ["get-up", "dont"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "A rotina de alguém",
      goal: "Falar da rotina de outra pessoa cuidando do -s.",
      exercises: [
        speak("s1", "Fale da rotina de uma pessoa que você conhece.", ["My mother gets up at six. She works in a school. She doesn't work on Saturday."],
          { mode: "respond", check: ["Pronunciei o -s final dos verbos.", "Usei doesn't + verbo sem -s.", "Falei pelo menos três frases."], c: ["third-s", "doesnt"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: conversa sobre rotina",
      goal: "Perguntar e responder sobre hábitos em uma conversa com um colega novo.",
      exercises: [
        dialog("m1", "No intervalo, um colega estrangeiro puxa conversa.", [
          { npc: ["What do you do?", "O que você faz?"], options: [
            ["I work in a store. And you?", true, "Ele responde: “I'm a student.”", "Respondeu e devolveu a pergunta."],
            ["I'm work in a store.", false, "Ele entende, mas soa errado.", "Não se mistura to be com outro verbo."],
          ] },
          { npc: ["Do you work on Saturday?", "Você trabalha no sábado?"], options: [
            ["Yes, I do, but I don't work on Sunday.", true, "Ele comenta: “Lucky you!”", "Resposta curta e negativa correta."],
            ["Yes, I work, but I no work on Sunday.", false, "A frase fica confusa.", "A negativa pede don't."],
          ] },
          { npc: ["Does your family live here?", "Sua família mora aqui?"], options: [
            ["No, they don't. My mother lives in Recife.", true, "A conversa segue.", "Don't com they e lives com my mother."],
            ["No, they doesn't. My mother live in Recife.", false, "Há dois erros de concordância.", "They + don't; my mother + lives."],
          ] },
        ], "Rotina: do/does nas perguntas, -s na terceira pessoa.", { c: ["short-do", "dont", "third-s"] }),
        write("m2", "Escreva três perguntas que você faria a esse colega sobre a rotina dele.", { min: 12, check: ["Todas começam com Do, Does ou palavra interrogativa + do.", "Nenhuma mistura to be com outro verbo.", "Terminei com ponto de interrogação."], model: "Where do you live? Do you study at night? What does your brother do?", c: ["do-question", "does-question"] }),
      ],
      outside: {
        title: "Fora do app: narre o seu dia",
        instructions: "Hoje, em três momentos (ao levantar, no almoço e antes de dormir), diga em voz alta o que está fazendo como rotina: “I get up at…”, “I have lunch at…”, “I go to bed at…”. Depois diga uma frase sobre alguém da sua casa, com -s.",
        checklist: ["Disse as três frases da minha rotina.", "Disse uma frase na terceira pessoa com -s.", "Usei have para uma refeição."],
      },
    }),
  },
});
