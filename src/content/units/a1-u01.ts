/**
 * A1 · Unidade 1 — Olá! Primeiros contatos
 * Unidade de referência: define o padrão de qualidade das demais.
 */
import {
  activity, cloze, combos, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write,
} from "../builders";

export default defineUnit({
  id: "a1-u01",

  concepts: [
    // Lição 1
    concept("hi-hello", "phrase", "Hi / Hello", "Oi / Olá", "l1", ["Hello, Ana!", "Olá, Ana!"], { note: "Servem a qualquer hora do dia." }),
    concept("good-morning", "phrase", "Good morning", "Bom dia", "l1", ["Good morning, Leo!", "Bom dia, Leo!"]),
    concept("good-afternoon", "phrase", "Good afternoon", "Boa tarde", "l1", ["Good afternoon, Mr. Lee.", "Boa tarde, Sr. Lee."]),
    concept("good-evening", "phrase", "Good evening", "Boa noite (ao chegar)", "l1", ["Good evening, everyone.", "Boa noite a todos."]),
    concept("good-night", "phrase", "Good night", "Boa noite (ao se despedir)", "l1", ["Good night, Mom!", "Boa noite, mãe!"], { note: "Só para se despedir, antes de dormir ou ao sair à noite." }),
    concept("how-are-you", "phrase", "How are you?", "Como você está?", "l1", ["Hi, Ana! How are you?", "Oi, Ana! Como você está?"]),
    concept("fine-thanks", "phrase", "I'm fine, thanks.", "Estou bem, obrigado(a).", "l1", ["I'm fine, thanks. And you?", "Estou bem, obrigado(a). E você?"]),
    concept("bye", "phrase", "Bye / See you later", "Tchau / Até mais", "l1", ["Bye! See you later!", "Tchau! Até mais!"]),
    // Lição 2
    concept("my-name-is", "pattern", "My name is …", "Meu nome é …", "l2", ["My name is Leo.", "Meu nome é Leo."]),
    concept("im-name", "pattern", "I'm …", "Eu sou …", "l2", ["I'm Ana.", "Eu sou a Ana."], { note: "I'm = I am. Forma curta e comum para dizer o nome." }),
    concept("whats-your-name", "phrase", "What's your name?", "Qual é o seu nome?", "l2", ["Hi! What's your name?", "Oi! Qual é o seu nome?"]),
    concept("nice-to-meet-you", "phrase", "Nice to meet you.", "Prazer em conhecer você.", "l2", ["Nice to meet you, Leo.", "Prazer em conhecer você, Leo."]),
    concept("you-too", "phrase", "Nice to meet you too.", "Prazer em conhecer você também.", "l2", ["— Nice to meet you. — Nice to meet you too.", "— Prazer. — O prazer é meu também."]),
    // Lição 3
    concept("how-do-you-spell", "phrase", "How do you spell …?", "Como você soletra …?", "l3", ["How do you spell your name?", "Como você soletra seu nome?"]),
    concept("letter-sounds", "sound", "Nomes das letras (E, I, G, J)", "Nomes das letras em inglês", "l3", ["E = “ii”, I = “ai”, G = “djii”, J = “djêi”", "Atenção às letras que mais confundem"], { tags: ["pronunciation"] }),
    concept("double-letter", "phrase", "double L, double N…", "dois L, dois N…", "l3", ["Anna: A, double N, A.", "Anna: A, N dobrado, A."]),
    // Lição 4
    concept("sorry-pardon", "phrase", "Sorry? / Pardon?", "Como? (pedir para repetir)", "l4", ["Sorry? I don't understand.", "Como? Não entendo."]),
    concept("repeat-please", "phrase", "Can you repeat that, please?", "Você pode repetir, por favor?", "l4", ["Can you repeat that, please?", "Você pode repetir, por favor?"]),
    concept("speak-slowly", "phrase", "Can you speak more slowly, please?", "Pode falar mais devagar, por favor?", "l4", ["Can you speak more slowly, please?", "Pode falar mais devagar, por favor?"]),
    concept("dont-understand", "pattern", "I don't understand.", "Eu não entendo.", "l4", ["I'm sorry, I don't understand.", "Desculpe, eu não entendo."], { note: "Negativa: don't + verbo. Nunca “I no understand”." }),
    concept("what-does-mean", "pattern", "What does … mean?", "O que … significa?", "l4", ["What does “late” mean?", "O que “late” significa?"]),
    concept("how-do-you-say", "pattern", "How do you say … in English?", "Como se diz … em inglês?", "l4", ["How do you say “obrigado” in English?", "Como se diz “obrigado” em inglês?"]),
    concept("thank-you", "phrase", "Thank you / Thanks", "Obrigado(a)", "l4", ["Thank you very much!", "Muito obrigado(a)!"]),
    concept("youre-welcome", "phrase", "You're welcome.", "De nada.", "l4", ["— Thanks! — You're welcome.", "— Obrigado! — De nada."]),
  ],

  lessons: [
    // ------------------------------------------------------------------ L1
    lesson("l1", {
      title: "Oi, olá, bom dia",
      objective: "Você vai conseguir cumprimentar e se despedir de alguém, escolhendo a expressão certa para o momento do dia.",
      minutes: 8,
      context: {
        kind: "dialogue",
        title: "Pela manhã, no trabalho",
        lines: [
          { who: "Ana", en: "Good morning, Leo!", pt: "Bom dia, Leo!" },
          { who: "Leo", en: "Good morning, Ana. How are you?", pt: "Bom dia, Ana. Como você está?" },
          { who: "Ana", en: "I'm fine, thanks. And you?", pt: "Estou bem, obrigada. E você?" },
          { who: "Leo", en: "Fine, thanks. See you later!", pt: "Bem, obrigado. Até mais tarde!" },
          { who: "Ana", en: "Bye!", pt: "Tchau!" },
        ],
      },
      explanation: {
        summary:
          "O cumprimento muda conforme o momento do dia: **Good morning** (de manhã), **Good afternoon** (à tarde) e **Good evening** (ao chegar, no fim da tarde ou à noite). **Hi** e **Hello** servem a qualquer hora.\n\nPara perguntar como alguém está, use **How are you?** A resposta mais comum é curta: **I'm fine, thanks. And you?**",
        details:
          "**Good night** é só despedida: você diz antes de dormir ou ao sair à noite, nunca ao chegar. Para chegar à noite, use **Good evening**.\n\n**Bye** é informal; **Goodbye** é um pouco mais formal; **See you later** e **See you tomorrow** são muito comuns entre conhecidos. A pergunta **How are you?** costuma ser só um cumprimento, não um convite para contar a vida.",
        examples: [
          { en: "Good morning!", pt: "Bom dia!" },
          { en: "Good afternoon, Mr. Silva.", pt: "Boa tarde, Sr. Silva.", note: "Mr. = senhor. Soa um pouco mais formal." },
          { en: "Hi! How are you?", pt: "Oi! Como você está?" },
          { en: "See you tomorrow!", pt: "Até amanhã!" },
        ],
        contrasts: [
          { wrong: "Good night, Ana! (ao chegar à noite)", right: "Good evening, Ana!", why: "Good night é despedida. Para cumprimentar à noite, use Good evening." },
          { wrong: "How you are?", right: "How are you?", why: "Na pergunta, o verbo (are) vem antes do sujeito (you)." },
        ],
        tip: "Na fala, **How are you?** vira algo como “hau-ar-iu”: as palavras se juntam. Não precisa separar cada uma.",
      },
      guided: [
        mc("e1", "Ana chega ao trabalho às 8 da manhã. O que ela diz?", ["Good morning!", "Good afternoon!", "Good night!", "Goodbye!"], 0,
          "De manhã usamos Good morning. Good night é despedida e Goodbye é para sair.",
          { c: ["good-morning"], s: "vocabulary", why: [undefined, "Afternoon é a tarde (depois do meio-dia).", "Good night é só despedida, antes de dormir.", "Goodbye é para se despedir, não para chegar."] }),
        match("e2", "Associe cada cumprimento ao momento em que ele é usado.",
          [["Good morning", "De manhã"], ["Good afternoon", "À tarde"], ["Good evening", "Ao chegar à noite"], ["Good night", "Ao se despedir à noite"]],
          "Morning, afternoon e evening são cumprimentos de chegada. Night é despedida.",
          { c: ["good-morning", "good-afternoon", "good-evening", "good-night"], h: ["Night = despedida. Evening = chegada."] }),
        mc("e3", "Releia o diálogo acima. Como a Ana está?", ["Ela está bem.", "Ela está cansada.", "Ela está atrasada."], 0,
          "Ana diz “I'm fine, thanks”, que significa “Estou bem, obrigada”.",
          { c: ["fine-thanks"], s: "reading", ctx: true }),
      ],
      independent: [
        cloze("e4", "Good ___, Mr. Silva! (são 3 da tarde)", ["afternoon"], "Às 3 da tarde, usamos Good afternoon.",
          { c: ["good-afternoon"], s: "vocabulary", tr: "Boa tarde, Sr. Silva!", h: ["Começa com “after…”"] }),
        order("e5", "Monte a pergunta: “Como você está?”", "How are you?", "Na pergunta, o verbo are vem antes de you: How are you?",
          { c: ["how-are-you"], extra: ["is"], t: [["How you are?", "Na pergunta, o verbo vem antes do sujeito: How are you?"]] }),
        dict("e6", "Good evening. How are you?", "Era Good evening (cumprimento de quem chega à noite) seguido de How are you?",
          { c: ["good-evening", "how-are-you"], prompt: "Ouça e digite o que ouviu.", alt: ["Good evening, how are you"] }),
        type("e7", "Alguém pergunta “How are you?”. Responda que está bem e agradeça.",
          combos(["I'm fine", "I am fine", "Fine", "I'm good", "I am good", "Good"], ["thanks", "thank you"], ["", "and you"]),
          "Uma boa resposta é curta: I'm fine, thanks. (And you?)",
          { c: ["fine-thanks", "how-are-you"], s: "vocabulary", h: ["Duas ideias: “estou bem” + “obrigado”."] }),
        dict("e11", "Hi, Leo! Good morning.", "Hi é um cumprimento informal e serve a qualquer hora; Good morning é o cumprimento da manhã.",
          { c: ["hi-hello", "good-morning"], prompt: "Ouça e digite o que ouviu.", alt: ["Hello, Leo! Good morning", "Hi Leo good morning"] }),
        cloze("e8", "Good ___, Mom! (você vai dormir)", ["night"], "Antes de dormir, a despedida é Good night.",
          { c: ["good-night"], s: "vocabulary", tr: "Boa noite, mãe!" }),
      ],
      application: [
        dialog("e9", "São 9 da manhã e você encontra sua professora no corredor.", [
          {
            npc: ["Good morning! How are you?", "Bom dia! Como você está?"],
            options: [
              ["Good morning! I'm fine, thanks. And you?", true, "A professora sorri e responde.", "Cumprimento certo para a manhã e resposta educada."],
              ["Good night! I'm fine.", false, "A professora estranha: parece que você está indo dormir.", "Good night é despedida; de manhã use Good morning."],
              ["Bye!", false, "A professora fica sem entender.", "Bye é despedida; ela acabou de cumprimentar você."],
            ],
          },
          {
            npc: ["I'm fine, thanks. See you later!", "Estou bem, obrigada. Até mais tarde!"],
            options: [
              ["Bye! See you later!", true, "Vocês se despedem tranquilamente.", "Despedida adequada."],
              ["Good morning!", false, "Vocês já se cumprimentaram, então soa estranho.", "Ela está se despedindo; responda com uma despedida."],
            ],
          },
        ], "Cumprimente para o momento do dia, responda como está e despeça-se quando a outra pessoa se despedir.",
        { c: ["good-morning", "how-are-you", "fine-thanks", "bye"], s: "interaction" }),
        speak("e10", "Diga em voz alta, como numa conversa de verdade.", ["Good morning! How are you? I'm fine, thanks."],
          { mode: "repeat", check: ["Disse as três frases sem parar para traduzir.", "Fiz uma pequena pausa entre as frases.", "Ouvi o modelo e repeti pelo menos duas vezes."], c: ["good-morning", "how-are-you", "fine-thanks"] }),
      ],
      summary: {
        points: [
          "Good morning, Good afternoon, Good evening: três cumprimentos de chegada. Good night: só despedida.",
          "How are you? → I'm fine, thanks. And you?",
          "Na pergunta o verbo vem antes do sujeito: How are you? (e não “How you are?”).",
        ],
        concepts: ["hi-hello", "good-morning", "good-afternoon", "good-evening", "good-night", "how-are-you", "fine-thanks", "bye"],
      },
    }),

    // ------------------------------------------------------------------ L2
    lesson("l2", {
      title: "Meu nome é…",
      objective: "Você vai conseguir dizer seu nome, perguntar o nome de alguém e reagir quando for apresentado(a).",
      minutes: 8,
      context: {
        kind: "dialogue",
        title: "Na escola de idiomas",
        lines: [
          { who: "Ana", en: "Hi! I'm Ana. What's your name?", pt: "Oi! Eu sou a Ana. Qual é o seu nome?" },
          { who: "Leo", en: "Hello, Ana. My name is Leo.", pt: "Olá, Ana. Meu nome é Leo." },
          { who: "Ana", en: "Nice to meet you, Leo.", pt: "Prazer em conhecer você, Leo." },
          { who: "Leo", en: "Nice to meet you too.", pt: "Prazer em conhecer você também." },
        ],
      },
      explanation: {
        summary:
          "Para dizer seu nome há duas formas: **My name is Leo** e a mais curta e comum na fala, **I'm Leo**.\n\nPara perguntar: **What's your name?** (What's = What is). Quando alguém é apresentado a você, diga **Nice to meet you**, e a outra pessoa responde **Nice to meet you too**.",
        details:
          "**I'm** é a forma curta de **I am**. Você vai estudar o verbo to be com calma na próxima unidade; por enquanto, aprenda como um bloco pronto.\n\nPrimeiro nome basta na maior parte das situações. Em contextos formais, usamos **Mr.** (senhor), **Ms.** (senhora/senhorita) e o sobrenome.",
        examples: [
          { en: "My name is Ana.", pt: "Meu nome é Ana." },
          { en: "I'm Leo.", pt: "Eu sou o Leo." },
          { en: "What's your name?", pt: "Qual é o seu nome?" },
          { en: "Nice to meet you.", pt: "Prazer em conhecer você." },
        ],
        contrasts: [
          { wrong: "My name are Ana.", right: "My name is Ana.", why: "Name é singular, então usamos is. (Detalhes do verbo to be na próxima unidade.)" },
          { wrong: "I am call Ana.", right: "I'm Ana. / My name is Ana.", why: "Não use “call”: em inglês o nome vem direto depois de I'm ou de My name is." },
        ],
        tip: "Pronúncia: **name** soa “neim”. Em **Nice to meet you** o **to** é fraquinho e rápido: “náis tu míit iu”.",
      },
      guided: [
        mc("e1", "Como você pergunta o nome de uma pessoa?", ["What's your name?", "How's your name?", "Who's your name?", "How are you?"], 0,
          "A pergunta pelo nome é What's your name? How are you? pergunta como a pessoa está.",
          { c: ["whats-your-name"], s: "vocabulary", why: [undefined, "Em inglês não se usa how para o nome.", "Who's your name não existe; use What.", "How are you? pergunta como a pessoa está."] }),
        cloze("e2", "My ___ is Leo.", ["name"], "My name is… é a forma completa de dizer o nome.",
          { c: ["my-name-is"], s: "vocabulary", tr: "Meu nome é Leo.", h: ["Quatro letras, começa com n."] }),
        match("e3", "Associe a expressão ao significado.",
          [["My name is Ana.", "Meu nome é Ana."], ["I'm Leo.", "Eu sou o Leo."], ["What's your name?", "Qual é o seu nome?"], ["Nice to meet you.", "Prazer em conhecer você."]],
          "Cada frase é um bloco pronto que você vai usar muito.",
          { c: ["my-name-is", "im-name", "whats-your-name", "nice-to-meet-you"] }),
      ],
      independent: [
        order("e4", "Monte a frase: “Prazer em conhecer você.”", "Nice to meet you", "A ordem é fixa: Nice to meet you.",
          { c: ["nice-to-meet-you"], extra: ["know"] }),
        fix("e5", "My name are Ana.", ["My name is Ana", "My name's Ana"], "Name é singular: My name is Ana.",
          { c: ["my-name-is"], prompt: "Corrija o erro desta frase.", h: ["O erro está no verbo."] }),
        listen("e6", "Hello. My name is Rita. Nice to meet you.", "Qual é o nome da pessoa?", ["Rita", "Tina", "Nina", "Lisa"], 0,
          "Ela diz “My name is Rita”. Repare no som de R no começo.",
          { c: ["my-name-is"], s: "listening" }),
        dict("e10", "I'm Tom. What's your name?", "I'm Tom apresenta quem fala; What's your name? pergunta o nome de quem ouve.",
          { c: ["im-name", "whats-your-name"], prompt: "Ouça e digite o que ouviu.", alt: ["I am Tom. What is your name?"] }),
        type("e7", "Alguém diz “Nice to meet you.” Responda que o prazer também é seu.",
          [...combos(["Nice", "Pleased", "Good"], ["to meet you"], ["too"]), "Nice meeting you too", "You too"],
          "A resposta natural é Nice to meet you too.",
          { c: ["you-too", "nice-to-meet-you"], s: "vocabulary", h: ["Repita a frase e acrescente “too”."] }),
      ],
      application: [
        dialog("e8", "Você chega a uma festa e uma pessoa se apresenta.", [
          {
            npc: ["Hi! I'm Tom. What's your name?", "Oi! Eu sou o Tom. Qual é o seu nome?"],
            options: [
              ["My name is Ana.", true, "Tom sorri: “Nice to meet you, Ana.”", "Você respondeu à pergunta com seu nome."],
              ["Fine, thanks.", false, "Tom fica confuso: ele perguntou seu nome, não como você está.", "Fine, thanks responde a How are you?, não a What's your name?"],
              ["Nice to meet you.", false, "Tom espera o seu nome e continua olhando para você.", "Educado, mas falta o nome. Diga My name is… ou I'm…"],
            ],
          },
          {
            npc: ["Nice to meet you, Ana.", "Prazer em conhecer você, Ana."],
            options: [
              ["Nice to meet you too.", true, "Vocês começam a conversar.", "Resposta natural a uma apresentação."],
              ["Thank you, goodbye.", false, "Tom estranha: a conversa mal começou.", "Despedida cedo demais."],
            ],
          },
        ], "Responda a pergunta com o nome e reaja à apresentação.", { c: ["whats-your-name", "my-name-is", "you-too"], s: "interaction" }),
        write("e9", "Escreva duas frases: diga seu nome e diga que é um prazer conhecer a outra pessoa (Tom).",
          { mode: "guided", frame: ["My name is …", "Nice to meet you, …"], min: 6, check: ["Usei My name is… ou I'm… com meu nome.", "Usei Nice to meet you.", "Comecei cada frase com maiúscula e terminei com ponto."], model: "My name is Ana. Nice to meet you, Tom.", c: ["my-name-is", "nice-to-meet-you"] }),
      ],
      summary: {
        points: [
          "Dizer o nome: My name is Leo. / I'm Leo.",
          "Perguntar o nome: What's your name?",
          "Apresentação: Nice to meet you. → Nice to meet you too.",
        ],
        concepts: ["my-name-is", "im-name", "whats-your-name", "nice-to-meet-you", "you-too"],
      },
    }),

    // ------------------------------------------------------------------ L3
    lesson("l3", {
      title: "Soletrando",
      objective: "Você vai conseguir soletrar seu nome em inglês e entender quando alguém soletra o dele.",
      minutes: 9,
      context: {
        kind: "dialogue",
        title: "Na recepção de um hotel",
        lines: [
          { who: "Recepcionista", en: "What's your name, please?", pt: "Qual é o seu nome, por favor?" },
          { who: "Rafaela", en: "My name is Rafaela Souza.", pt: "Meu nome é Rafaela Souza." },
          { who: "Recepcionista", en: "How do you spell Souza?", pt: "Como se soletra Souza?" },
          { who: "Rafaela", en: "S, O, U, Z, A.", pt: "S, O, U, Z, A." },
          { who: "Recepcionista", en: "Thank you!", pt: "Obrigada!" },
        ],
      },
      explanation: {
        summary:
          "Para pedir que alguém soletre, pergunte **How do you spell your name?** ou **How do you spell that?**\n\nPara soletrar, diga as letras pelos **nomes em inglês**. Quando uma letra se repete, diga **double**: **double L** = LL. Cuidado com as letras que mais confundem brasileiros: **E** soa “ii”, **I** soa “ai”, **G** soa “djii” e **J** soa “djêi”.",
        details:
          "Guia aproximado dos nomes das letras:\n- A “êi” · B “bii” · C “sii” · D “dii” · E “ii”\n- F “éf” · G “djii” · H “êitch” · I “ai” · J “djêi”\n- K “kêi” · L “él” · M “ém” · N “én” · O “ôu”\n- P “pii” · Q “kiu” · R “ar” · S “és” · T “tii”\n- U “iu” · V “vii” · W “dâbliu” · X “écs” · Y “uai” · Z “zii”\n\nNo inglês britânico, Z é “zéd”. As duas formas são corretas.",
        examples: [
          { en: "How do you spell your name?", pt: "Como você soletra seu nome?" },
          { en: "It's S, O, U, Z, A.", pt: "É S, O, U, Z, A." },
          { en: "Anna: A, double N, A.", pt: "Anna: A, N dobrado, A." },
          { en: "Can you spell that, please?", pt: "Você pode soletrar isso, por favor?" },
        ],
        contrasts: [
          { wrong: "How you spell your name?", right: "How do you spell your name?", why: "Perguntas com spell pedem o auxiliar do antes de you. Você verá isso em detalhes na Unidade 4." },
        ],
        tip: "Treine os pares que confundem: **E** (ii) x **I** (ai), **G** (djii) x **J** (djêi), **A** (êi) x **R** (ar). Se o som se confundir, peça: “Can you spell that, please?”.",
      },
      guided: [
        listen("e1", "S, O, U, Z, A", "Você ouve um sobrenome soletrado. Qual é a grafia correta?", ["SOUZA", "SOUSA", "SOOSA", "ZOUSA"], 0,
          "As letras foram S, O, U, Z, A. Atenção: S soa “és” e Z soa “zii”.",
          { c: ["letter-sounds"], s: "pronunciation", keepOrder: true }),
        mc("e2", "Qual letra os falantes de inglês chamam de “ai”?", ["A", "E", "I", "Y"], 2,
          "A letra I soa “ai”. A letra E soa “ii”, A soa “êi” e Y soa “uai”.",
          { c: ["letter-sounds"], s: "pronunciation", keepOrder: true, why: ["A soa “êi”.", "E soa “ii”.", undefined, "Y soa “uai”."] }),
        match("e3", "Associe a letra ao som aproximado do nome dela.",
          [["E", "“ii”"], ["I", "“ai”"], ["G", "“djii”"], ["J", "“djêi”"]],
          "Estes quatro pares são os que mais confundem brasileiros.",
          { c: ["letter-sounds"], s: "pronunciation" }),
      ],
      independent: [
        cloze("e4", "How do you ___ your name?", ["spell"], "Spell é o verbo “soletrar”.",
          { c: ["how-do-you-spell"], s: "vocabulary", tr: "Como você soletra seu nome?", h: ["Começa com “sp…”"] }),
        order("e5", "Monte a pergunta: “Como você soletra seu nome?”", "How do you spell your name?", "How do you spell… é a pergunta padrão para pedir uma grafia.",
          { c: ["how-do-you-spell"], extra: ["are"] }),
        dict("e6", "H, E, L, L, O", "Você ouviu H, E, L, L, O. Duas letras L seguidas.",
          { c: ["letter-sounds", "double-letter"], alt: ["HELLO", "H E L L O", "H-E-L-L-O"], prompt: "Ouça e digite as letras (ou a palavra que elas formam)." }),
        fix("e7", "How you spell your name?", ["How do you spell your name"], "Falta o auxiliar do: How do you spell…?",
          { c: ["how-do-you-spell"], prompt: "Corrija o erro desta pergunta.", h: ["Falta uma palavra entre How e you."] }),
        mc("e10", "Como um falante de inglês costuma soletrar o nome “Anna”?", ["A, double N, A", "A, N, A", "A, twice N, A"], 0,
          "Letra repetida se diz double: A, double N, A. “A, N, A” seria Ana, com um N só.",
          { c: ["double-letter"], s: "pronunciation", why: [undefined, "Assim faltaria um N: seria “Ana”.", "Não se usa twice para soletrar; o natural é double."] }),
      ],
      application: [
        type("e8", "A recepcionista pergunta: “How do you spell your name?”. Seu nome é Tom. Responda soletrando em inglês (digite as letras separadas por hífen).",
          ["T-O-M", "T O M", "T, O, M"], "Você diz as letras uma a uma: T, O, M.",
          { c: ["how-do-you-spell", "letter-sounds"], s: "vocabulary" }),
        speak("e9", "Soletre em voz alta, com os nomes das letras em inglês.", ["My name is Anna. A, double N, A."],
          { mode: "repeat", check: ["Disse cada letra pelo nome em inglês.", "Usei double N em vez de repetir N duas vezes.", "Ouvi o modelo e repeti pelo menos duas vezes."], c: ["double-letter", "letter-sounds"], s: "pronunciation" }),
      ],
      summary: {
        points: [
          "Pedir a grafia: How do you spell your name? / Can you spell that, please?",
          "Soletre pelos nomes das letras em inglês. Cuidado com E (ii) x I (ai) e G (djii) x J (djêi).",
          "Letra repetida: double L, double N…",
        ],
        concepts: ["how-do-you-spell", "letter-sounds", "double-letter"],
      },
    }),

    // ------------------------------------------------------------------ L4
    lesson("l4", {
      title: "Não entendi. Pode repetir?",
      objective: "Você vai conseguir pedir que repitam, falar mais devagar e dizer que não entendeu, sem travar a conversa.",
      minutes: 9,
      context: {
        kind: "dialogue",
        title: "Na secretaria do curso",
        lines: [
          { who: "Secretária", en: "The class starts at nine.", pt: "A aula começa às nove." },
          { who: "Aluno", en: "Sorry? Can you repeat that, please?", pt: "Como? Pode repetir, por favor?" },
          { who: "Secretária", en: "The class starts at nine.", pt: "A aula começa às nove." },
          { who: "Aluno", en: "Can you speak more slowly, please? I don't understand.", pt: "Pode falar mais devagar, por favor? Eu não entendo." },
          { who: "Secretária", en: "Of course! The class... starts... at nine.", pt: "Claro! A aula... começa... às nove." },
          { who: "Aluno", en: "Thank you!", pt: "Obrigado!" },
          { who: "Secretária", en: "You're welcome!", pt: "De nada!" },
        ],
      },
      explanation: {
        summary:
          "Quando você não entende, não fique em silêncio. Use frases de sobrevivência:\n- **Sorry?** ou **Pardon?** (como?)\n- **Can you repeat that, please?** (pode repetir?)\n- **Can you speak more slowly, please?** (mais devagar, por favor)\n- **I don't understand.** (eu não entendo)\n- **What does “late” mean?** (o que significa “late”?)\n- **How do you say “obrigado” in English?**\n\nPara agradecer: **Thank you** / **Thanks**. Resposta: **You're welcome**.",
        details:
          "**Sorry?** com entonação subindo vale como “como?”. **Excuse me** chama a atenção de alguém (“com licença”). **Please** deixa o pedido mais educado e costuma ir no fim.\n\nOutras respostas a Thank you são **No problem** e **My pleasure**.",
        examples: [
          { en: "Can you repeat that, please?", pt: "Você pode repetir, por favor?" },
          { en: "I don't understand.", pt: "Eu não entendo." },
          { en: "What does “late” mean?", pt: "O que “late” significa?" },
          { en: "How do you say “obrigado” in English?", pt: "Como se diz “obrigado” em inglês?" },
        ],
        contrasts: [
          { wrong: "I no understand.", right: "I don't understand.", why: "Em inglês, a negação aqui pede don't antes do verbo. “No” sozinho não funciona nesse lugar." },
        ],
        tip: "Prefira **Sorry?** ou **Pardon?** a só dizer “What?”. Soam mais educados e cabem em qualquer situação.",
      },
      guided: [
        mc("e1", "Você não entendeu o que a pessoa disse. O que você diz?", ["Can you repeat that, please?", "You're welcome.", "Good night.", "Nice to meet you."], 0,
          "Para pedir que repitam, use Can you repeat that, please?",
          { c: ["repeat-please"], s: "vocabulary", why: [undefined, "You're welcome responde a um agradecimento.", "Good night é despedida.", "Nice to meet you é para quando alguém é apresentado a você."] }),
        match("e2", "Associe a expressão ao significado.",
          [["Sorry?", "Como? (pedir para repetir)"], ["I don't understand.", "Eu não entendo."], ["Speak more slowly, please.", "Fale mais devagar, por favor."], ["What does it mean?", "O que isso significa?"], ["How do you say it in English?", "Como se diz isso em inglês?"], ["You're welcome.", "De nada."]],
          "São as frases mais úteis para continuar uma conversa quando algo não ficou claro.",
          { c: ["sorry-pardon", "dont-understand", "speak-slowly", "what-does-mean", "how-do-you-say", "youre-welcome"] }),
        mc("e3", "Releia o diálogo acima. O que a secretária faz depois do pedido do aluno?", ["Fala mais devagar.", "Vai embora.", "Pede desculpas."], 0,
          "Ela diz: “The class... starts... at nine.”, falando bem devagar.",
          { c: ["speak-slowly"], s: "reading", ctx: true }),
      ],
      independent: [
        cloze("e4", "I don't ___.", ["understand"], "I don't understand = eu não entendo. Após don't, o verbo fica na forma simples.",
          { c: ["dont-understand"], s: "vocabulary", tr: "Eu não entendo.", h: ["Começa com “under…”"] }),
        cloze("e5", "What does “late” ___?", ["mean"], "What does X mean? pergunta o significado de uma palavra.",
          { c: ["what-does-mean"], s: "vocabulary", tr: "O que “late” significa?" }),
        cloze("e6", "How do you ___ “obrigado” in English?", ["say"], "How do you say… in English? pergunta como se diz algo.",
          { c: ["how-do-you-say"], s: "vocabulary", tr: "Como se diz “obrigado” em inglês?" }),
        cloze("e7", "Can you speak more ___, please?", ["slowly"], "Slowly significa “devagar”. More slowly = mais devagar.",
          { c: ["speak-slowly"], s: "vocabulary", tr: "Pode falar mais devagar, por favor?", h: ["Vem de slow (lento) + ly."] }),
        dict("e8", "Sorry? Can you repeat that, please?", "Sorry? (com entonação subindo) + Can you repeat that, please? é um pedido de repetição.",
          { c: ["sorry-pardon", "repeat-please"], prompt: "Ouça e digite o que a pessoa disse.", alt: ["Sorry, can you repeat that, please"] }),
        fix("e9", "I no understand.", ["I don't understand", "I do not understand"], "A negação correta é don't antes do verbo: I don't understand.",
          { c: ["dont-understand"], prompt: "Corrija o erro desta frase.", t: [["I no understand", "“No” não nega o verbo aqui. Use don't: I don't understand."]] }),
        type("e10", "Alguém diz “Thank you!”. Responda: “de nada”.",
          ["You're welcome", "You are welcome", "No problem", "My pleasure"], "Você pode dizer You're welcome, No problem ou My pleasure.",
          { c: ["youre-welcome", "thank-you"], s: "vocabulary" }),
      ],
      application: [
        dialog("e11", "Você está em um curso e o professor fala rápido demais.", [
          {
            npc: ["The lesson is on page twelve. Okay?", "A lição está na página doze. Certo?"],
            options: [
              ["Sorry? Can you repeat that, please?", true, "O professor repete mais devagar.", "Você pediu para repetir de forma educada."],
              ["Good morning.", false, "O professor fica sem entender sua resposta.", "Cumprimento fora de hora."],
              ["I'm fine, thanks.", false, "O professor não perguntou como você está.", "Essa é resposta para How are you?"],
            ],
          },
          {
            npc: ["Page... twelve.", "Página... doze."],
            options: [
              ["Thank you!", true, "O professor sorri e continua a aula.", "Agradecer é natural depois da ajuda."],
              ["My name is Ana.", false, "O professor acha que você não ouviu nada.", "Não responde ao que ele disse."],
            ],
          },
        ], "Quando não entende, peça para repetir e agradeça.", { c: ["repeat-please", "thank-you", "sorry-pardon"], s: "interaction" }),
        speak("e12", "Peça ajuda em voz alta, como se estivesse na recepção de um curso.",
          ["Sorry? Can you repeat that, please?", "Can you speak more slowly, please?", "I don't understand."],
          { mode: "respond", check: ["Falei as três frases sem ler a tradução.", "Usei please nos pedidos.", "Ouvi o modelo e comparei o ritmo com o meu."], c: ["repeat-please", "speak-slowly", "dont-understand"] }),
      ],
      summary: {
        points: [
          "Para pedir repetição: Sorry? / Can you repeat that, please?",
          "Para pedir calma: Can you speak more slowly, please? · Para dizer que não entendeu: I don't understand.",
          "Para aprender palavras: What does … mean? / How do you say … in English? · Thank you → You're welcome.",
        ],
        concepts: ["sorry-pardon", "repeat-please", "speak-slowly", "dont-understand", "what-does-mean", "how-do-you-say", "thank-you", "youre-welcome"],
      },
    }),
  ],

  // ===================================================================== CHECKPOINT
  checkpoint: {
    intro:
      "Situações novas, com pessoas e lugares que você ainda não viu. Responda sem pistas: o critério é de acertos independentes. Se não passar, você terá outra versão com perguntas diferentes.",
    a: [
      dict("q1", "Good afternoon, Mr. Lee. See you later!", "Era Good afternoon (tarde) e a despedida See you later.",
        { c: ["good-afternoon", "bye"], alt: ["Good afternoon Mr Lee, see you later"] }),
      mc("q2", "São 11 da noite e você está saindo da casa de um amigo. O que você diz?", ["Good night!", "Good morning!", "Good afternoon!", "Nice to meet you!"], 0,
        "Ao sair à noite, a despedida é Good night.", { c: ["good-night"], s: "vocabulary" }),
      cloze("q3", "Nice to ___ you.", ["meet"], "Nice to meet you é o bloco pronto para apresentações.", { c: ["nice-to-meet-you"], s: "vocabulary", tr: "Prazer em conhecer você." }),
      order("q4", "Monte a pergunta: “Qual é o seu nome?”", "What's your name?", "What's your name? é a pergunta padrão.", { c: ["whats-your-name"], extra: ["is"] }),
      fix("q5", "I am name Carlos.", ["My name is Carlos", "I'm Carlos", "I am Carlos", "My name's Carlos"], "Use My name is Carlos ou I'm Carlos.",
        { c: ["my-name-is", "im-name"], prompt: "Corrija o erro desta frase." }),
      dict("q6", "Hello, my name is Daniel.", "Hello, my name is Daniel.", { c: ["hi-hello", "my-name-is"], alt: ["Hello my name is Daniel", "Hello, my name's Daniel"] }),
      listen("q7", "J, O, H, N", "Que nome foi soletrado?", ["John", "Joan", "Jean", "Dan"], 0,
        "As letras J, O, H, N formam John. Joan seria J, O, A, N.", { c: ["letter-sounds"], s: "pronunciation", keepOrder: true }),
      type("q8", "O atendente fala rápido demais. Peça, com educação, que ele fale mais devagar.",
        ["Can you speak more slowly, please", "Could you speak more slowly, please", "Can you speak slowly, please", "Please speak more slowly", "Speak more slowly, please", "Can you speak more slowly"],
        "O pedido educado é Can you speak more slowly, please?", { c: ["speak-slowly"], s: "vocabulary" }),
      mc("q9", "Você não sabe dizer “obrigado” em inglês. O que pergunta?",
        ["How do you say “obrigado” in English?", "What does “obrigado” mean?", "How do you spell “obrigado”?", "Can you repeat that, please?"], 0,
        "How do you say… in English? serve para descobrir como se diz algo.", { c: ["how-do-you-say"], s: "vocabulary" }),
      dialog("q10", "Você chega à recepção de um curso de inglês.", [
        {
          npc: ["Good morning! What's your name, please?", "Bom dia! Qual é o seu nome, por favor?"],
          options: [
            ["Good morning! My name is Lia.", true, "A recepcionista anota seu nome.", "Cumprimento certo e nome dito com My name is."],
            ["Fine, thanks.", false, "Ela repete a pergunta.", "Fine, thanks responde a How are you?"],
            ["Good night!", false, "Ela fica confusa.", "Good night é despedida, e ainda é manhã."],
          ],
        },
        {
          npc: ["How do you spell Lia?", "Como se soletra Lia?"],
          options: [
            ["L, I, A.", true, "Ela escreve LIA.", "Você soletrou pelos nomes das letras."],
            ["Nice to meet you.", false, "Ela espera a grafia.", "Não responde à pergunta."],
            ["Thank you.", false, "Ela continua esperando.", "Agradecer não responde à pergunta."],
          ],
        },
      ], "Cumprimente, diga o nome e soletre.", { c: ["good-morning", "my-name-is", "how-do-you-spell"], s: "interaction" }),
    ],
    b: [
      dict("q1", "Hello, I'm Marta. Nice to meet you.", "Hello, I'm Marta apresenta a pessoa; Nice to meet you fecha a apresentação.",
        { c: ["im-name", "nice-to-meet-you"], alt: ["Hello, I am Marta. Nice to meet you"] }),
      mc("q2", "Você chega a um evento às 7 da noite. Como cumprimenta?", ["Good evening!", "Good night!", "Good morning!", "Bye!"], 0,
        "Ao chegar à noite, use Good evening. Good night é despedida.", { c: ["good-evening"], s: "vocabulary" }),
      cloze("q3", "How ___ you?", ["are"], "A pergunta é How are you? O verbo are vem antes de you.", { c: ["how-are-you"], tr: "Como você está?" }),
      order("q4", "Monte a resposta: “Prazer em conhecer você também.”", "Nice to meet you too", "A resposta natural é Nice to meet you too.", { c: ["you-too"], extra: ["know"] }),
      fix("q5", "How you are?", ["How are you"], "Na pergunta, are vem antes de you: How are you?", { c: ["how-are-you"], prompt: "Corrija o erro desta pergunta." }),
      dict("q6", "Can you repeat that, please?", "Can you repeat that, please?", { c: ["repeat-please"], alt: ["Can you repeat that please"] }),
      listen("q7", "A, N, N, A", "Que nome foi soletrado?", ["Ana", "Anna", "Anne", "Ann"], 1,
        "A, N, N, A forma Anna, com dois N.", { c: ["double-letter", "letter-sounds"], s: "pronunciation", keepOrder: true }),
      type("q8", "Alguém diz “Thanks!”. Responda: “de nada”.", ["You're welcome", "You are welcome", "No problem", "My pleasure"], "You're welcome é a resposta mais comum.",
        { c: ["youre-welcome", "thank-you"], s: "vocabulary" }),
      mc("q9", "Você quer saber o significado da palavra “late”. O que pergunta?",
        ["What does “late” mean?", "How do you spell “late”?", "How are you, “late”?", "What's your name, “late”?"], 0,
        "What does X mean? pergunta o significado.", { c: ["what-does-mean"], s: "vocabulary" }),
      dialog("q10", "Você encontra um vizinho de manhã.", [
        {
          npc: ["Good morning! How are you?", "Bom dia! Como você está?"],
          options: [
            ["I'm fine, thanks. And you?", true, "O vizinho responde com um sorriso.", "Resposta curta e educada."],
            ["Good night!", false, "O vizinho acha estranho.", "Good night é despedida."],
            ["My name is Ana.", false, "O vizinho já sabe seu nome e fica sem entender.", "Não responde a How are you?"],
          ],
        },
        {
          npc: ["I'm fine, thanks. See you later!", "Estou bem, obrigado. Até mais!"],
          options: [
            ["Bye! See you later!", true, "Vocês seguem cada um para o seu lado.", "Despedida natural."],
            ["Nice to meet you.", false, "O vizinho estranha: vocês já se conhecem.", "Essa frase é para apresentações."],
          ],
        },
      ], "Responda à pergunta e despeça-se quando a outra pessoa se despede.", { c: ["how-are-you", "fine-thanks", "bye"], s: "interaction" }),
    ],
    production: write("t1", "Imagine que você está entrando em um curso de inglês. Escreva uma mensagem curta: cumprimente o grupo, diga seu nome, diga que é um prazer e peça que alguém soletre ou repita algo.",
      { mode: "free", min: 12, check: [
          "Cumprimentei de acordo com o momento do dia.",
          "Disse meu nome com My name is… ou I'm….",
          "Usei Nice to meet you.",
          "Usei uma frase de pedido (spell, repeat ou speak slowly).",
        ], model: "Good morning, everyone! My name is Ana. Nice to meet you all. Can you speak more slowly, please?",
        c: ["good-morning", "my-name-is", "nice-to-meet-you"] }),
  },

  // ===================================================================== ATIVIDADES
  activities: {
    reading: activity("reading", {
      title: "Mensagens no grupo do curso",
      goal: "Ler cumprimentos e apresentações escritas e identificar quem diz o quê.",
      context: {
        kind: "message",
        title: "Grupo “English Monday”",
        lines: [
          { who: "Marta", en: "Hi everyone! My name is Marta. I'm in the Monday class. Nice to meet you all!", pt: "Oi, pessoal! Meu nome é Marta. Estou na turma de segunda. Prazer em conhecer vocês!" },
          { who: "Pedro", en: "Good morning, Marta! I'm Pedro. Welcome!", pt: "Bom dia, Marta! Eu sou o Pedro. Bem-vinda!" },
          { who: "Julia", en: "Hello Marta and Pedro! I'm Julia. See you on Monday!", pt: "Olá, Marta e Pedro! Eu sou a Julia. Até segunda!" },
        ],
      },
      exercises: [
        mc("r1", "Em qual turma a Marta está?", ["Na turma de segunda.", "Na turma de sábado.", "Na turma da noite."], 0,
          "Ela escreve “I'm in the Monday class”: turma de segunda.", { c: ["my-name-is"], s: "reading", keepOrder: true }),
        mc("r2", "Que cumprimento o Pedro usa?", ["Good morning", "Good evening", "Good night"], 0,
          "O Pedro começa com Good morning.", { c: ["good-morning"], s: "reading", keepOrder: true }),
        mc("r3", "Quem se despede dizendo “See you on Monday”?", ["Julia", "Pedro", "Marta"], 0,
          "Quem escreve “See you on Monday!” é a Julia.", { c: ["bye"], s: "reading", keepOrder: true }),
        type("r4", "Com que palavra a Marta cumprimenta o grupo? Escreva só o cumprimento.", ["Hi", "Hi everyone"],
          "A Marta começa com Hi, um cumprimento informal que serve a qualquer hora.", { c: ["hi-hello"], s: "reading" }),
        type("r5", "Copie a frase com que a Julia se despede.", ["See you on Monday"],
          "See you on Monday! = Até segunda! See you + dia é uma despedida muito comum.", { c: ["bye"], s: "reading" }),
      ],
    }),

    listening: activity("listening", {
      title: "Uma apresentação por áudio",
      goal: "Entender um cumprimento, um nome soletrado e uma frase de apresentação.",
      context: {
        kind: "text",
        title: "Transcrição (só depois de responder)",
        lines: [
          { who: "Helen", en: "Good evening, everyone. My name is Helen. That's H, E, L, E, N. Nice to meet you.", pt: "Boa noite a todos. Meu nome é Helen. Isso é H, E, L, E, N. Prazer em conhecer vocês." },
        ],
      },
      exercises: [
        listen("a1", "Good evening, everyone. My name is Helen. That's H, E, L, E, N. Nice to meet you.", "Que cumprimento a Helen usou?", ["Good morning", "Good afternoon", "Good evening"], 2,
          "Ela começou com Good evening.", { c: ["good-evening"], keepOrder: true }),
        listen("a2", "Good evening, everyone. My name is Helen. That's H, E, L, E, N. Nice to meet you.", "Como se escreve o nome dela?", ["HELEN", "HELLEN", "ELEN", "HELIN"], 0,
          "As letras foram H, E, L, E, N. Repare que há dois E, e um só L.", { c: ["how-do-you-spell", "letter-sounds"], s: "pronunciation", keepOrder: true }),
        dict("a3", "Nice to meet you.", "Ouça com atenção as três palavras finais.", { c: ["nice-to-meet-you"], alt: ["Nice to meet you all"], prompt: "Digite a última frase da Helen." }),
      ],
    }),

    writing: activity("writing", {
      title: "Escreva sua apresentação",
      goal: "Escrever uma apresentação curta com cumprimento, nome e uma frase educada.",
      exercises: [
        write("w1", "Escreva uma mensagem curta para seu novo grupo de estudo: cumprimente, diga seu nome (ou use Ana) e diga que é um prazer conhecer o grupo.",
          { mode: "guided", frame: ["Good …!", "My name is … / I'm …", "Nice to meet you …"], min: 8,
            check: ["Cumprimentei de acordo com o momento do dia.", "Disse meu nome.", "Usei Nice to meet you.", "Reli o texto e conferi maiúsculas e pontos finais."],
            model: "Good afternoon! I'm Ana. Nice to meet you all.", c: ["good-afternoon", "im-name", "nice-to-meet-you"] }),
      ],
    }),

    speaking: activity("speaking", {
      title: "Apresente-se em voz alta",
      goal: "Falar um cumprimento, seu nome e um pedido de ajuda em cerca de 20 segundos.",
      exercises: [
        speak("s1", "Grave ou fale em voz alta: cumprimente, diga seu nome, soletre-o e diga a frase de prazer em conhecer.",
          ["Good morning! My name is Ana. That's A, N, A. Nice to meet you."],
          { mode: "respond", check: ["Falei sem ler cada palavra.", "Soletrei meu nome com os nomes das letras em inglês.", "Terminei com Nice to meet you.", "Ouvi o modelo e ajustei o ritmo."], c: ["good-morning", "my-name-is", "how-do-you-spell"] }),
      ],
    }),

    mission: activity("mission", {
      title: "Missão: check-in na recepção",
      goal: "Usar cumprimento, nome, soletração e pedidos de ajuda juntos, em uma situação de viagem.",
      exercises: [
        dialog("m1", "Você chega a um hotel em outro país. A recepcionista fala rápido.", [
          {
            npc: ["Good evening! Welcome. What's your name, please?", "Boa noite! Bem-vindo. Qual é o seu nome, por favor?"],
            options: [
              ["Good evening! My name is Rafael Costa.", true, "Ela procura seu nome na lista.", "Cumprimento da noite e nome completo."],
              ["Good morning! My name is Rafael Costa.", false, "Ela estranha: já é noite.", "Se já é noite, use Good evening."],
              ["Thank you.", false, "Ela repete a pergunta.", "Não responde ao que foi perguntado."],
            ],
          },
          {
            npc: ["Sorry, how do you spell Costa?", "Desculpe, como se soletra Costa?"],
            options: [
              ["C, O, S, T, A.", true, "Ela confirma: “Costa, thank you.”", "Soletrou pelos nomes das letras."],
              ["I don't understand.", false, "Ela soletra devagar a pergunta, mas você ainda não respondeu.", "Você entendeu a pergunta; era só soletrar."],
            ],
          },
          {
            npc: ["Your room is on the third floor. Room thirty-two.", "Seu quarto fica no terceiro andar. Quarto trinta e dois."],
            options: [
              ["Sorry? Can you repeat that, please?", true, "Ela repete mais devagar: “Room... thirty-two.”", "Usar a estratégia de esclarecimento resolve a situação."],
              ["Good night!", false, "Ela acha que você está indo embora sem pegar a chave.", "Good night é despedida."],
            ],
          },
        ], "Combine cumprimento, nome, soletração e pedido de repetição.", { c: ["good-evening", "my-name-is", "how-do-you-spell", "repeat-please"], s: "interaction" }),
        write("m2", "Escreva o que você diria na recepção, em três frases: cumprimento, nome e um agradecimento.",
          { mode: "guided", min: 8, check: ["Usei um cumprimento adequado ao horário.", "Disse meu nome.", "Agradeci com Thank you."], model: "Good evening. My name is Rafael. Thank you!", c: ["good-evening", "my-name-is", "thank-you"] }),
      ],
      outside: {
        title: "Fora do app: apresente-se de verdade",
        instructions:
          "Em voz alta, diga para alguém (ou para o espelho): “Good morning! My name is …, that's … (soletre). Nice to meet you.” Se puder, peça a uma pessoa para soletrar o nome dela em inglês e anote. Marque o que você fez; é um autorrelato, o app não confere.",
        checklist: [
          "Disse meu cumprimento, nome e soletração em voz alta.",
          "Usei Sorry? ou Can you repeat that, please? pelo menos uma vez.",
          "Ouvi alguém soletrar um nome em inglês (ou usei um áudio).",
        ],
      },
    }),
  },
});
