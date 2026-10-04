/** A1 · Unidade 2 — Quem sou eu: informações pessoais e o verbo to be. */
import { activity, cloze, combos, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u02",

  concepts: [
    concept("i-am", "pattern", "I am / I'm", "eu sou / eu estou", "l1", ["I'm a student.", "Eu sou estudante."]),
    concept("you-are", "pattern", "You are / You're", "você é / você está", "l1", ["You're my friend.", "Você é meu amigo."]),
    concept("im-from", "pattern", "I'm from …", "Eu sou de …", "l1", ["I'm from Brazil.", "Eu sou do Brasil."]),
    concept("where-from", "phrase", "Where are you from?", "De onde você é?", "l1", ["Where are you from, Ana?", "De onde você é, Ana?"]),
    concept("he-she-is", "pattern", "He is / She is / It is", "ele é / ela é / isso é", "l2", ["She's a doctor.", "Ela é médica."], { note: "Com he, she e it o verbo é is." }),
    concept("a-an", "pattern", "a teacher / an engineer", "um(a) + profissão", "l2", ["He's an engineer.", "Ele é engenheiro."], { note: "Em inglês a profissão leva a/an. Use an antes de som de vogal." }),
    concept("jobs", "word", "teacher, doctor, student, nurse, driver", "professor, médico, estudante, enfermeiro, motorista", "l2", ["My sister is a nurse.", "Minha irmã é enfermeira."]),
    concept("be-not", "pattern", "am not / isn't / aren't", "não sou / não é / não são", "l3", ["He isn't a teacher.", "Ele não é professor."]),
    concept("be-question", "pattern", "Are you …? / Is she …?", "Você é …? / Ela é …?", "l3", ["Is she from Peru?", "Ela é do Peru?"], { note: "Na pergunta, o verbo vem antes do sujeito." }),
    concept("short-answer", "phrase", "Yes, I am. / No, I'm not.", "Sim, sou. / Não, não sou.", "l3", ["— Are you a student? — Yes, I am.", "— Você é estudante? — Sim, sou."]),
    concept("age-be", "pattern", "I'm 20 years old.", "Eu tenho 20 anos.", "l4", ["She's thirty years old.", "Ela tem trinta anos."], { note: "Idade usa to be, nunca have." }),
    concept("how-old", "phrase", "How old are you?", "Quantos anos você tem?", "l4", ["How old is your brother?", "Quantos anos seu irmão tem?"]),
    concept("we-they-are", "pattern", "We are / They are", "nós somos / eles são", "l4", ["We're from Brazil.", "Nós somos do Brasil."]),
  ],

  lessons: [
    lesson("l1", {
      title: "Eu sou, você é",
      objective: "Você vai conseguir dizer de onde é e perguntar de onde a outra pessoa é.",
      minutes: 8,
      context: {
        kind: "dialogue",
        title: "No primeiro dia do curso",
        lines: [
          { who: "Ken", en: "Hi! I'm Ken. I'm from Japan.", pt: "Oi! Eu sou o Ken. Sou do Japão." },
          { who: "Bia", en: "Nice to meet you, Ken. I'm Bia.", pt: "Prazer, Ken. Eu sou a Bia." },
          { who: "Ken", en: "Where are you from, Bia?", pt: "De onde você é, Bia?" },
          { who: "Bia", en: "I'm from Brazil. You're a new student, right?", pt: "Sou do Brasil. Você é aluno novo, certo?" },
          { who: "Ken", en: "Yes, I am.", pt: "Sim, sou." },
        ],
      },
      explanation: {
        summary:
          "O verbo **to be** significa “ser” e “estar”. Com **I** usamos **am**; com **you** usamos **are**.\n\n- **I am** → **I'm**\n- **You are** → **You're**\n\nPara dizer sua origem: **I'm from Brazil**. Para perguntar: **Where are you from?**",
        details: "Em inglês o sujeito nunca some. Em português dizemos “Sou do Brasil”; em inglês é obrigatório dizer **I**: *I'm from Brazil*. Países e nacionalidades sempre levam letra maiúscula.",
        examples: [
          { en: "I'm from Brazil.", pt: "Eu sou do Brasil." },
          { en: "You're from Japan.", pt: "Você é do Japão." },
          { en: "Where are you from?", pt: "De onde você é?" },
        ],
        contrasts: [
          { wrong: "Am from Brazil.", right: "I'm from Brazil.", why: "O sujeito I é obrigatório em inglês." },
          { wrong: "Where you are from?", right: "Where are you from?", why: "Na pergunta, are vem antes de you." },
        ],
        tip: "Na fala, **I'm** soa “aim” e **you're** soa quase “iór”. As formas curtas são as mais comuns em conversas.",
      },
      guided: [
        mc("e1", "Complete: “___ from Brazil.”", ["I'm", "I", "Am"], 0, "Precisamos do sujeito e do verbo juntos: I'm (I am) from Brazil.",
          { c: ["i-am", "im-from"], why: [undefined, "Falta o verbo: I am.", "Falta o sujeito I."] }),
        match("e2", "Associe a frase ao significado.",
          [["I'm from Brazil.", "Eu sou do Brasil."], ["You're a student.", "Você é estudante."], ["Where are you from?", "De onde você é?"], ["I'm Bia.", "Eu sou a Bia."]],
          "I'm = eu sou; You're = você é; Where are you from? pergunta a origem.", { c: ["i-am", "you-are", "im-from", "where-from"] }),
        cloze("e3", "You ___ a new student.", ["are", "'re"], "Com you, o verbo to be é are.", { c: ["you-are"], cue: "(be)", tr: "Você é um aluno novo." }),
      ],
      independent: [
        cloze("e4", "I ___ from Peru.", ["am", "'m"], "Com I, o verbo to be é am.", { c: ["i-am"], cue: "(be)", tr: "Eu sou do Peru." }),
        order("e5", "Monte a pergunta: “De onde você é?”", "Where are you from?", "A pergunta é Where are you from?, com are antes de you.", { c: ["where-from"], extra: ["is"] }),
        dict("e6", "I'm from Brazil. Where are you from?", "Primeiro a pessoa diz a origem, depois pergunta a sua.", { c: ["im-from", "where-from"], alt: ["I am from Brazil. Where are you from?"] }),
        fix("e7", "Am from Japan.", ["I am from Japan", "I'm from Japan"], "Em inglês o sujeito não pode ser omitido: I'm from Japan.", { c: ["im-from", "i-am"], prompt: "Corrija o erro desta frase." }),
      ],
      application: [
        type("e8", "Alguém pergunta “Where are you from?”. Responda que você é do Brasil.", ["I'm from Brazil", "I am from Brazil"], "A resposta completa é I'm from Brazil.", { c: ["im-from"] }),
        speak("e9", "Apresente-se em voz alta com nome e origem.", ["Hi! I'm Bia. I'm from Brazil. Where are you from?"],
          { check: ["Disse I'm, sem omitir o sujeito.", "Fiz a pergunta Where are you from?", "Repeti pelo menos duas vezes."], c: ["im-from"] }),
      ],
      summary: {
        points: ["I am → I'm; You are → You're.", "Origem: I'm from Brazil. Pergunta: Where are you from?", "O sujeito nunca é omitido em inglês."],
        concepts: ["i-am", "you-are", "im-from", "where-from"],
      },
    }),

    lesson("l2", {
      title: "Ele é, ela é: profissões",
      objective: "Você vai conseguir dizer o que outra pessoa faz, usando he is e she is.",
      minutes: 8,
      context: {
        kind: "text",
        title: "Bia apresenta a família",
        lines: [
          { en: "This is my family.", pt: "Esta é a minha família." },
          { en: "My mother is a nurse. She's from Bahia.", pt: "Minha mãe é enfermeira. Ela é da Bahia." },
          { en: "My father is an engineer. He's very funny.", pt: "Meu pai é engenheiro. Ele é muito engraçado." },
          { en: "My brother is a student. He's at school now.", pt: "Meu irmão é estudante. Ele está na escola agora." },
        ],
      },
      explanation: {
        summary:
          "Com **he** (ele), **she** (ela) e **it** (isso, para coisas) o verbo to be é **is**: **He is → He's**, **She is → She's**, **It is → It's**.\n\nAo dizer a profissão, o inglês usa **a** ou **an**: **She's a nurse**, **He's an engineer**.",
        details: "Use **an** quando a palavra seguinte começa com som de vogal: *an engineer, an actor, an artist*. Nos outros casos, **a**: *a teacher, a doctor, a driver*. O que conta é o som, não a letra.",
        examples: [
          { en: "She's a nurse.", pt: "Ela é enfermeira." },
          { en: "He's an engineer.", pt: "Ele é engenheiro." },
          { en: "My brother is a student.", pt: "Meu irmão é estudante." },
        ],
        contrasts: [
          { wrong: "She is nurse.", right: "She is a nurse.", why: "Profissão no singular pede a ou an." },
          { wrong: "He are a doctor.", right: "He is a doctor.", why: "Com he, she e it o verbo é is." },
        ],
        tip: "**He** começa com som de H soprado, como em “rato”. Sem o H, vira outra palavra.",
      },
      guided: [
        mc("e1", "Complete: “My mother ___ a nurse.”", ["is", "are", "am"], 0, "My mother = she, então usamos is.", { c: ["he-she-is"], why: [undefined, "Are é para you, we e they.", "Am é só para I."] }),
        match("e2", "Associe a profissão ao significado.",
          [["a teacher", "professor(a)"], ["a doctor", "médico(a)"], ["a nurse", "enfermeiro(a)"], ["a driver", "motorista"], ["a student", "estudante"]],
          "Estas são cinco profissões e ocupações muito comuns.", { c: ["jobs"] }),
        mc("e3", "Qual frase está correta?", ["He's an engineer.", "He's a engineer.", "He's engineer."], 0, "Engineer começa com som de vogal, então usamos an.", { c: ["a-an"] }),
      ],
      independent: [
        cloze("e4", "She's ___ teacher.", ["a"], "Teacher começa com som de consoante: a teacher.", { c: ["a-an", "jobs"], tr: "Ela é professora." }),
        cloze("e5", "My father ___ a driver.", ["is", "'s"], "My father = he, então o verbo é is.", { c: ["he-she-is", "jobs"], cue: "(be)", tr: "Meu pai é motorista." }),
        dict("e6", "She is a doctor.", "She is + a + profissão.", { c: ["he-she-is", "jobs"], alt: ["She's a doctor."] }),
        fix("e7", "He is nurse.", ["He is a nurse", "He's a nurse"], "Falta o artigo: He is a nurse.", { c: ["a-an"], prompt: "Corrija o erro desta frase." }),
      ],
      application: [
        dialog("e8", "Um colega pergunta sobre a sua família.", [
          { npc: ["What does your sister do?", "O que sua irmã faz?"], options: [
            ["She's a teacher.", true, "Ele acena: “Oh, nice!”", "She's + a + profissão."],
            ["She are teacher.", false, "Ele entende, mas a frase soa errada.", "Com she usamos is, e a profissão pede a."],
            ["I'm from Brazil.", false, "Ele repete a pergunta.", "Isso responde de onde você é, não a profissão dela."],
          ] },
        ], "Para falar da profissão de alguém: She's / He's + a/an + profissão.", { c: ["he-she-is", "a-an"] }),
        write("e9", "Escreva duas frases sobre duas pessoas que você conhece: quem são e o que fazem.",
          { frame: ["My mother is …", "My friend is …"], min: 8, check: ["Usei is com he ou she.", "Usei a ou an antes da profissão.", "Comecei as frases com letra maiúscula."], model: "My mother is a teacher. My friend Leo is an engineer.", c: ["he-she-is", "a-an"] }),
      ],
      summary: {
        points: ["He is → He's; She is → She's; It is → It's.", "Profissão leva artigo: a teacher, an engineer.", "An antes de som de vogal."],
        concepts: ["he-she-is", "a-an", "jobs"],
      },
    }),

    lesson("l3", {
      title: "Não sou, você é?",
      objective: "Você vai conseguir negar e fazer perguntas de sim ou não com o verbo to be.",
      minutes: 9,
      context: {
        kind: "dialogue",
        title: "Na recepção de um evento",
        lines: [
          { who: "Atendente", en: "Are you Mr. Costa?", pt: "Você é o Sr. Costa?" },
          { who: "Leo", en: "No, I'm not. I'm Leo Lima.", pt: "Não, não sou. Eu sou Leo Lima." },
          { who: "Atendente", en: "Is she your teacher?", pt: "Ela é sua professora?" },
          { who: "Leo", en: "Yes, she is. She isn't from Brazil. She's from Canada.", pt: "Sim, é. Ela não é do Brasil. Ela é do Canadá." },
        ],
      },
      explanation: {
        summary:
          "Para **negar**, coloque **not** depois do verbo: **I'm not**, **you aren't**, **he isn't**.\n\nPara **perguntar**, o verbo vai para a frente: **Are you…?**, **Is she…?**\n\nRespostas curtas: **Yes, I am.** / **No, I'm not.** / **Yes, she is.** / **No, she isn't.**",
        details: "Na resposta curta afirmativa não se usa contração: diz-se **Yes, I am**, e não “Yes, I'm”. Isn't = is not; aren't = are not. Não existe forma curta para am not: diz-se **I'm not**.",
        examples: [
          { en: "I'm not a doctor.", pt: "Eu não sou médico." },
          { en: "Is he from Japan?", pt: "Ele é do Japão?" },
          { en: "No, he isn't.", pt: "Não, não é." },
        ],
        contrasts: [
          { wrong: "You are a student?", right: "Are you a student?", why: "Em perguntas, o verbo to be vem antes do sujeito." },
          { wrong: "I no am a teacher.", right: "I'm not a teacher.", why: "A negação é com not depois do verbo." },
        ],
      },
      guided: [
        mc("e1", "Como perguntar “Você é estudante?”", ["Are you a student?", "You are a student?", "Is you a student?"], 0, "O verbo vem antes do sujeito: Are you…?", { c: ["be-question"] }),
        match("e2", "Associe pergunta e resposta curta.",
          [["Are you a nurse?", "No, I'm not."], ["Is he a driver?", "Yes, he is."], ["Is she from Peru?", "No, she isn't."]],
          "A resposta curta repete o sujeito e o verbo da pergunta.", { c: ["short-answer", "be-question", "be-not"] }),
        cloze("e3", "She ___ from Brazil. She's from Canada.", ["isn't", "is not"], "Para negar com she: isn't (is not).", { c: ["be-not"], tr: "Ela não é do Brasil. Ela é do Canadá." }),
      ],
      independent: [
        order("e4", "Monte a pergunta: “Ele é seu professor?”", "Is he your teacher?", "Na pergunta, is vem antes de he.", { c: ["be-question"], extra: ["are"] }),
        cloze("e5", "— Are you from Japan? — No, I'm ___.", ["not"], "A resposta curta negativa com I é No, I'm not.", { c: ["short-answer", "be-not"] }),
        dict("e6", "Are you a student? Yes, I am.", "Pergunta com are no início e resposta curta sem contração.", { c: ["be-question", "short-answer"] }),
        fix("e7", "You are a doctor?", ["Are you a doctor"], "Pergunta com to be: o verbo vem primeiro. Are you a doctor?", { c: ["be-question"], prompt: "Transforme em uma pergunta correta." }),
      ],
      application: [
        type("e8", "Alguém pergunta “Are you a teacher?”. Você não é. Dê a resposta curta.", ["No, I'm not", "No, I am not"], "A resposta curta negativa é No, I'm not.", { c: ["short-answer"] }),
        dialog("e9", "Você chega a um curso e a secretária confere seus dados.", [
          { npc: ["Are you a new student?", "Você é aluno novo?"], options: [
            ["Yes, I am.", true, "Ela marca seu nome na lista.", "Resposta curta afirmativa correta."],
            ["Yes, I'm.", false, "Ela entende, mas soa incompleto.", "Na resposta curta afirmativa não se usa contração."],
          ] },
          { npc: ["Is your teacher Mr. Lee?", "Seu professor é o Sr. Lee?"], options: [
            ["No, he isn't. My teacher is Ms. Park.", true, "Ela corrige a ficha.", "Negou e deu a informação certa."],
            ["No, he aren't.", false, "Ela fica em dúvida.", "Com he, a negativa é isn't."],
          ] },
        ], "Respostas curtas repetem o verbo: Yes, I am. / No, he isn't.", { c: ["short-answer", "be-not"] }),
      ],
      summary: {
        points: ["Negativa: I'm not, you aren't, he/she isn't.", "Pergunta: Are you…? Is she…?", "Respostas curtas: Yes, I am. / No, I'm not."],
        concepts: ["be-not", "be-question", "short-answer"],
      },
    }),

    lesson("l4", {
      title: "Idade: eu tenho 20 anos",
      objective: "Você vai conseguir dizer e perguntar a idade sem cair no erro “I have 20 years”.",
      minutes: 9,
      context: {
        kind: "dialogue",
        title: "Preenchendo um cadastro",
        lines: [
          { who: "Atendente", en: "How old are you?", pt: "Quantos anos você tem?" },
          { who: "Bia", en: "I'm twenty years old.", pt: "Eu tenho vinte anos." },
          { who: "Atendente", en: "And your brothers?", pt: "E seus irmãos?" },
          { who: "Bia", en: "They're twelve and fifteen. We're from Recife.", pt: "Eles têm doze e quinze. Nós somos de Recife." },
        ],
      },
      explanation: {
        summary:
          "Em inglês, idade se diz com **to be**: **I'm twenty years old** ou só **I'm twenty**. A pergunta é **How old are you?**\n\nCom **we** (nós) e **they** (eles/elas) o verbo é **are**: **We're**, **They're**.",
        details: "Números de 1 a 20: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty. Depois: thirty (30), forty (40), fifty (50).",
        examples: [
          { en: "I'm twenty years old.", pt: "Eu tenho vinte anos." },
          { en: "How old is she?", pt: "Quantos anos ela tem?" },
          { en: "They're fifteen.", pt: "Eles têm quinze anos." },
        ],
        contrasts: [
          { wrong: "I have 20 years.", right: "I'm 20 years old.", why: "Idade usa to be. “Have years” é tradução literal do português e não existe em inglês." },
          { wrong: "How many years do you have?", right: "How old are you?", why: "A pergunta de idade é fixa: How old…?" },
        ],
        tip: "Cuidado com a sílaba forte: **thirTEEN** (13) e **THIRty** (30). Em thirteen a força está no fim; em thirty, no começo.",
      },
      guided: [
        mc("e1", "Como se diz “Eu tenho 20 anos”?", ["I'm 20 years old.", "I have 20 years.", "I have 20 years old."], 0, "Idade usa o verbo to be: I'm 20 years old.",
          { c: ["age-be"], why: [undefined, "Tradução literal do português: em inglês não se usa have para idade.", "Mesmo com old, o verbo certo é to be."] }),
        match("e2", "Associe a frase ao significado.",
          [["How old are you?", "Quantos anos você tem?"], ["I'm twenty.", "Eu tenho vinte anos."], ["We're from Recife.", "Nós somos de Recife."], ["They're students.", "Eles são estudantes."]],
          "How old pergunta a idade; we're e they're usam are.", { c: ["how-old", "age-be", "we-they-are"] }),
        listen("e3", "She's thirteen years old.", "Quantos anos ela tem?", ["13", "30", "3"], 0, "Thirteen, com a força no final, é 13. Thirty seria 30.", { c: ["age-be"], s: "pronunciation", keepOrder: true }),
      ],
      independent: [
        cloze("e4", "How ___ are you?", ["old"], "A pergunta de idade é How old are you?", { c: ["how-old"], tr: "Quantos anos você tem?" }),
        cloze("e5", "They ___ twelve and fifteen.", ["are", "'re"], "Com they, o verbo é are.", { c: ["we-they-are", "age-be"], cue: "(be)", tr: "Eles têm doze e quinze anos." }),
        fix("e6", "I have 25 years.", ["I am 25 years old", "I'm 25 years old", "I am 25", "I'm 25"], "Idade usa to be: I'm 25 years old.",
          { c: ["age-be"], prompt: "Corrija o erro desta frase.", t: [["I have 25 years old", "O problema é o verbo: use am, não have."]] }),
        dict("e7", "How old are you? I'm twenty.", "Pergunta com How old e resposta com I'm.", { c: ["how-old", "age-be"], alt: ["How old are you? I am twenty.", "How old are you? I'm 20."] }),
      ],
      application: [
        type("e8", "Diga em inglês: “Nós somos do Brasil.”", ["We are from Brazil", "We're from Brazil"], "Com we usamos are: We're from Brazil.", { c: ["we-they-are"] }),
        speak("e9", "Diga sua idade e pergunte a de outra pessoa.", ["I'm twenty years old. How old are you?"],
          { mode: "respond", check: ["Usei I'm, e não I have.", "Fiz a pergunta How old are you?", "Falei a frase inteira sem pausar para traduzir."], c: ["age-be", "how-old"] }),
      ],
      summary: {
        points: ["Idade: I'm 20 years old. Nunca “I have 20 years”.", "Pergunta: How old are you?", "We are → We're; They are → They're."],
        concepts: ["age-be", "how-old", "we-they-are"],
      },
    }),
  ],

  checkpoint: {
    intro: "Novas pessoas e novas situações. Mostre que consegue usar o verbo to be para falar de origem, profissão e idade.",
    a: [
      cloze("q1", "My sister ___ a doctor.", ["is", "'s"], "My sister = she, então usamos is.", { c: ["he-she-is"], cue: "(be)" }),
      mc("q2", "Um colega pergunta sua idade. Qual é a pergunta dele?", ["How old are you?", "How are you?", "Where are you from?"], 0, "How old are you? pergunta a idade.", { c: ["how-old"] }),
      fix("q3", "She have 30 years.", ["She is 30 years old", "She's 30 years old", "She is 30", "She's 30"], "Idade usa to be: She is 30 years old.", { c: ["age-be"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Você é da Argentina?”", "Are you from Argentina?", "Na pergunta, are vem antes de you.", { c: ["be-question"], extra: ["is"] }),
      dict("q5", "We are from Peru.", "We + are + from + país.", { c: ["we-they-are"], alt: ["We're from Peru."] }),
      cloze("q6", "He's ___ actor.", ["an"], "Actor começa com som de vogal: an actor.", { c: ["a-an"] }),
      type("q7", "Responda negativamente, com resposta curta: “Is he a teacher?”", ["No, he isn't", "No, he is not", "No, he's not"], "A resposta curta negativa é No, he isn't.", { c: ["short-answer", "be-not"] }),
      listen("q8", "I'm from Canada. I'm a nurse.", "Qual é a profissão da pessoa?", ["Enfermeira", "Professora", "Médica"], 0, "Ela diz I'm a nurse: enfermeira.", { c: ["jobs", "im-from"] }),
      mc("q9", "Qual frase está correta?", ["I'm from Chile.", "Am from Chile.", "I from Chile."], 0, "Sujeito e verbo são obrigatórios: I'm from Chile.", { c: ["i-am", "im-from"] }),
      dialog("q10", "Você conhece uma pessoa nova em uma viagem.", [
        { npc: ["Hi! Where are you from?", "Oi! De onde você é?"], options: [
          ["I'm from Brazil. And you?", true, "Ela responde: “I'm from Spain.”", "Origem com I'm from e pergunta de volta."],
          ["I have Brazil.", false, "Ela não entende.", "Origem usa to be + from."],
        ] },
        { npc: ["Are you a student?", "Você é estudante?"], options: [
          ["No, I'm not. I'm a driver.", true, "A conversa continua.", "Resposta curta e informação nova."],
          ["No, I not.", false, "Ela estranha a frase.", "A negativa é I'm not."],
        ] },
      ], "Origem com I'm from; respostas curtas com to be.", { c: ["where-from", "short-answer"] }),
    ],
    b: [
      cloze("q1", "They ___ teachers.", ["are", "'re"], "Com they, o verbo é are.", { c: ["we-they-are"], cue: "(be)" }),
      mc("q2", "Você quer saber a origem de alguém. O que pergunta?", ["Where are you from?", "How old are you?", "What's your name?"], 0, "Where are you from? pergunta a origem.", { c: ["where-from"] }),
      fix("q3", "My brother is engineer.", ["My brother is an engineer", "My brother's an engineer"], "A profissão pede artigo: an engineer.", { c: ["a-an"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Ela não é médica.”", "She isn't a doctor.", "Negativa com she: isn't.", { c: ["be-not"], extra: ["aren't"] }),
      dict("q5", "I'm nineteen years old.", "Idade com I'm + número + years old.", { c: ["age-be"], alt: ["I am nineteen years old.", "I'm 19 years old."] }),
      cloze("q6", "___ she your teacher?", ["Is"], "Pergunta com she começa com Is.", { c: ["be-question"] }),
      type("q7", "Responda afirmativamente, com resposta curta: “Are you from Brazil?”", ["Yes, I am"], "Resposta curta afirmativa: Yes, I am (sem contração).", { c: ["short-answer"], t: [["Yes, I'm", "Na resposta curta afirmativa não se usa a forma contraída."]] }),
      listen("q8", "He's a driver. He's forty years old.", "Quantos anos ele tem?", ["40", "14", "4"], 0, "Forty é 40. Fourteen seria 14.", { c: ["age-be", "he-she-is"], s: "pronunciation", keepOrder: true }),
      mc("q9", "Qual frase está correta?", ["You're my friend.", "You is my friend.", "You am my friend."], 0, "Com you, o verbo é are: You're.", { c: ["you-are"] }),
      dialog("q10", "No trabalho, um visitante faz perguntas sobre sua colega.", [
        { npc: ["Is she the manager?", "Ela é a gerente?"], options: [
          ["No, she isn't. She's a nurse.", true, "Ele agradece a informação.", "Negou e explicou."],
          ["No, she aren't.", false, "Ele franze a testa.", "Com she, a negativa é isn't."],
        ] },
        { npc: ["How old is she?", "Quantos anos ela tem?"], options: [
          ["She's thirty.", true, "Ele anota.", "Idade com to be."],
          ["She has thirty years.", false, "Ele entende, mas soa errado.", "Idade não usa have."],
        ] },
      ], "Negativa com isn't e idade com to be.", { c: ["be-not", "age-be"] }),
    ],
    production: write("t1", "Escreva um parágrafo curto se apresentando: nome, origem, idade e profissão ou ocupação. Depois, uma frase sobre outra pessoa.",
      { mode: "free", min: 20, check: ["Usei I'm para nome, origem e idade.", "Não usei have para idade.", "Usei a/an antes da profissão.", "Falei de outra pessoa com he ou she + is."],
        model: "My name is Bia. I'm from Brazil. I'm twenty years old and I'm a student. My mother is a nurse. She is from Bahia.", c: ["i-am", "age-be", "he-she-is"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Perfis de uma turma",
      goal: "Ler apresentações curtas e encontrar origem, idade e profissão.",
      context: { kind: "text", title: "Meet the class", lines: [
        { who: "Tom", en: "I'm Tom. I'm from Canada. I'm 25 and I'm a driver.", pt: "Eu sou o Tom. Sou do Canadá. Tenho 25 anos e sou motorista." },
        { who: "Mei", en: "My name is Mei. I'm from China. I'm a doctor. I'm not a student.", pt: "Meu nome é Mei. Sou da China. Sou médica. Não sou estudante." },
        { who: "Rui and Sara", en: "We're from Portugal. We're teachers. We're thirty years old.", pt: "Nós somos de Portugal. Somos professores. Temos trinta anos." },
      ] },
      exercises: [
        mc("r1", "De onde o Tom é?", ["Canada", "China", "Portugal"], 0, "Tom diz: I'm from Canada.", { c: ["im-from"], s: "reading", keepOrder: true }),
        mc("r2", "Quem não é estudante?", ["Mei", "Tom", "Rui"], 0, "Mei escreve: I'm not a student.", { c: ["be-not"], s: "reading", keepOrder: true }),
        type("r3", "Quantos anos Rui e Sara têm? Responda com uma frase completa começando por They.", ["They are thirty years old", "They're thirty years old", "They are thirty", "They're thirty", "They are 30", "They're 30", "They are 30 years old", "They're 30 years old"],
          "Eles dizem We're thirty years old, então: They're thirty years old.", { c: ["we-they-are", "age-be"], s: "reading" }),
        type("r4", "Qual é a profissão da Mei? Responda com uma frase completa começando por She.", ["She is a doctor", "She's a doctor"], "Mei diz I'm a doctor, então: She's a doctor.", { c: ["he-she-is", "jobs"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Quem é quem",
      goal: "Entender origem, profissão e idade em uma apresentação falada.",
      context: { kind: "text", title: "Transcrição", lines: [{ who: "Paula", en: "Hello! I'm Paula. I'm from Chile. I'm a teacher. I'm thirty years old.", pt: "Olá! Eu sou a Paula. Sou do Chile. Sou professora. Tenho trinta anos." }] },
      exercises: [
        listen("a1", "Hello! I'm Paula. I'm from Chile. I'm a teacher. I'm thirty years old.", "De onde a Paula é?", ["Chile", "China", "Peru"], 0, "Ela diz I'm from Chile.", { c: ["im-from"], keepOrder: true }),
        listen("a2", "Hello! I'm Paula. I'm from Chile. I'm a teacher. I'm thirty years old.", "Quantos anos ela tem?", ["30", "13", "20"], 0, "Thirty, com a força no começo, é 30.", { c: ["age-be"], keepOrder: true }),
        dict("a3", "I'm a teacher.", "I'm + a + profissão.", { c: ["i-am", "jobs"], alt: ["I am a teacher."], prompt: "Digite a frase sobre a profissão." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meu perfil",
      goal: "Escrever um perfil pessoal de quatro frases.",
      exercises: [
        write("w1", "Escreva seu perfil para o mural da turma: nome, origem, idade e ocupação.",
          { frame: ["I'm …", "I'm from …", "I'm … years old.", "I'm a/an …"], min: 12, check: ["Todas as frases têm sujeito.", "Usei to be para a idade.", "Usei a ou an antes da ocupação."], model: "I'm Leo. I'm from Brazil. I'm twenty-two years old. I'm a student.", c: ["i-am", "age-be"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Apresentação de 20 segundos",
      goal: "Falar nome, origem, idade e ocupação em sequência.",
      exercises: [
        speak("s1", "Fale seu perfil em voz alta e termine com uma pergunta.", ["I'm Leo. I'm from Brazil. I'm twenty-two years old. I'm a student. Where are you from?"],
          { mode: "respond", check: ["Disse a idade com I'm.", "Não omiti o sujeito.", "Terminei com uma pergunta.", "Ouvi o modelo e comparei."], c: ["i-am", "where-from"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: cadastro no hostel",
      goal: "Responder perguntas pessoais em um cadastro falado.",
      exercises: [
        dialog("m1", "Você chega a um hostel e o recepcionista preenche sua ficha.", [
          { npc: ["Where are you from?", "De onde você é?"], options: [
            ["I'm from Brazil.", true, "Ele digita “Brazil”.", "Origem com I'm from."],
            ["Yes, I am.", false, "Ele repete a pergunta.", "Essa é resposta para pergunta de sim ou não."],
          ] },
          { npc: ["How old are you?", "Quantos anos você tem?"], options: [
            ["I'm twenty-four.", true, "Ele preenche a idade.", "Idade com to be."],
            ["I have twenty-four years.", false, "Ele entende, mas corrige você.", "Idade usa to be, não have."],
          ] },
          { npc: ["Are you a student?", "Você é estudante?"], options: [
            ["No, I'm not. I'm a nurse.", true, "Ele entrega a chave.", "Resposta curta e profissão com artigo."],
            ["No, I'm not. I'm nurse.", false, "Ele entende, mas falta algo.", "A profissão pede a: a nurse."],
          ] },
        ], "Origem, idade e profissão: tudo com o verbo to be.", { c: ["im-from", "age-be", "short-answer"] }),
        write("m2", "Preencha por escrito: escreva três frases com sua origem, idade e ocupação.", { min: 8, check: ["Origem com I'm from.", "Idade com I'm.", "Ocupação com a/an."], model: "I'm from Brazil. I'm twenty-four. I'm a nurse.", c: ["im-from", "age-be"] }),
      ],
      outside: {
        title: "Fora do app: apresente alguém",
        instructions: "Escolha uma pessoa que você conhece e diga em voz alta, em inglês, três coisas sobre ela: de onde é, a idade e o que faz. Exemplo: “She's from Minas. She's forty. She's a teacher.”",
        checklist: ["Falei três frases com he ou she + is.", "Disse a idade com to be.", "Usei a ou an antes da profissão."],
      },
    }),
  },
});
