/** B1 · Unidade 4 — Trabalho, estudos e entrevistas: descrever funções e explicar processos. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "b1-u04",

  concepts: [
    concept("responsible-for", "phrase", "I'm responsible for …", "Sou responsável por …", "l1", ["I'm responsible for customer support.", "Sou responsável pelo atendimento ao cliente."], { note: "responsible for + substantivo ou verbo-ing.", tags: ["collocation"] }),
    concept("deal-with", "phrase", "deal with", "lidar com", "l1", ["I deal with suppliers every day.", "Lido com fornecedores todos os dias."], { tags: ["phrasal-verb"] }),
    concept("work-as", "phrase", "work as / work for / work in", "trabalhar como / para / em (área)", "l1", ["She works as a designer for a bank.", "Ela trabalha como designer em um banco."], { tags: ["collocation"] }),
    concept("who-clause", "pattern", "the person who …", "a pessoa que …", "l2", ["She's the manager who hired me.", "Ela é a gerente que me contratou."], { note: "who para pessoas." }),
    concept("which-that", "pattern", "a tool that … / which …", "uma ferramenta que …", "l2", ["It's an app that tracks expenses.", "É um aplicativo que controla gastos."], { note: "that ou which para coisas." }),
    concept("good-at", "phrase", "I'm good at …-ing", "Sou bom em …", "l3", ["I'm good at solving problems.", "Sou bom em resolver problemas."], { note: "good at + verbo-ing ou substantivo." }),
    concept("experience-in", "phrase", "I have experience in …", "Tenho experiência em …", "l3", ["I have five years of experience in sales.", "Tenho cinco anos de experiência em vendas."]),
    concept("college", "word", "college / high school", "faculdade / ensino médio", "l3", ["I studied engineering in college.", "Estudei engenharia na faculdade."], { note: "Falso cognato: college é faculdade. “Colégio” é high school.", tags: ["false-friend"] }),
    concept("process-steps", "word", "first, next, once, finally", "primeiro, em seguida, assim que, por fim", "l4", ["Once the payment is confirmed, we ship the order.", "Assim que o pagamento é confirmado, enviamos o pedido."]),
    concept("make-sure", "phrase", "make sure", "certificar-se, garantir", "l4", ["Make sure the file is saved.", "Certifique-se de que o arquivo está salvo."], { tags: ["collocation"] }),
  ],

  lessons: [
    lesson("l1", {
      title: "O que eu faço",
      objective: "Você vai conseguir descrever seu trabalho ou estudo e suas responsabilidades.",
      minutes: 9,
      context: { kind: "dialogue", title: "Em um evento de networking", lines: [
        { who: "Tom", en: "So, what do you do?", pt: "E então, o que você faz?" },
        { who: "Ana", en: "I work as a project manager for a software company.", pt: "Trabalho como gerente de projetos em uma empresa de software." },
        { who: "Tom", en: "What does that involve?", pt: "O que isso envolve?" },
        { who: "Ana", en: "I'm responsible for planning the projects, and I deal with clients every day.", pt: "Sou responsável por planejar os projetos e lido com clientes todos os dias." },
        { who: "Tom", en: "I work in finance. I'm in charge of a small team.", pt: "Eu trabalho na área financeira. Coordeno uma equipe pequena." },
      ] },
      explanation: {
        summary: "Para descrever o trabalho:\n- **work as** + cargo: *I work as a nurse.*\n- **work for** + empresa: *I work for a bank.*\n- **work in** + área: *I work in sales.*\n- **I'm responsible for** + -ing ou substantivo\n- **I deal with** + pessoas ou problemas\n- **I'm in charge of** = coordeno",
        details: "A pergunta padrão é **What do you do?** (o que você faz?), e não “What's your job?”. Para estudantes: *I'm studying law* / *I'm a law student*. Depois de preposição (for, of, with), o verbo vai para o -ing: *responsible for training new staff*.",
        examples: [
          { en: "I work as a teacher.", pt: "Trabalho como professor." },
          { en: "He's responsible for training new staff.", pt: "Ele é responsável por treinar funcionários novos." },
          { en: "We deal with complaints.", pt: "Nós lidamos com reclamações." },
        ],
        contrasts: [
          { wrong: "I work like a teacher.", right: "I work as a teacher.", why: "Cargo usa as. “Like” seria “parecido com”." },
          { wrong: "I'm responsible to plan the projects.", right: "I'm responsible for planning the projects.", why: "Responsible for + -ing." },
        ],
      },
      guided: [
        mc("e1", "Choose: “I work ___ a nurse.”", ["as", "like", "for"], 0, "Cargo: work as.", { c: ["work-as"] }),
        match("e2", "Match the phrase to what follows it.", [["I work as", "a designer"], ["I work for", "a large bank"], ["I work in", "marketing"], ["I'm responsible for", "training new staff"], ["I deal with", "customers"]],
          "Cada preposição pede um tipo de complemento.", { c: ["work-as", "responsible-for", "deal-with"], pt: "Associe a expressão ao que vem depois." }),
        cloze("e3", "I'm responsible ___ planning the projects.", ["for"], "Responsible for.", { c: ["responsible-for"] }),
      ],
      independent: [
        cloze("e4", "I ___ with clients every day.", ["deal"], "Deal with = lidar com.", { c: ["deal-with"], s: "vocabulary" }),
        cloze("e5", "She's responsible for ___ new staff.", ["training"], "Depois de for: -ing.", { c: ["responsible-for"], cue: "(train)" }),
        order("e6", "Put the words in order: “Ela trabalha como designer em um banco.”", "She works as a designer for a bank.", "As + cargo; for + empresa.", { c: ["work-as"], extra: ["like"] }),
        fix("e7", "I work like an engineer.", ["I work as an engineer"], "Cargo usa as.", { c: ["work-as"], prompt: "Fix the mistake." }),
        dict("e8", "I deal with suppliers every day.", "Deal with + pessoas.", { c: ["deal-with"] }),
      ],
      application: [
        type("e9", "Ask someone about their job with the standard question.", ["What do you do", "What do you do for a living"], "What do you do?", { c: ["work-as"], pt: "Pergunte a alguém sobre o trabalho, com a pergunta padrão." }),
        speak("e10", "Describe your job or studies in three sentences.", ["I work as an accountant for a small company. I'm responsible for the monthly reports. I deal with suppliers and banks."],
          { mode: "respond", check: ["Usei work as, for ou in.", "Usei responsible for + -ing ou substantivo.", "Usei deal with."], c: ["work-as", "responsible-for", "deal-with"] }),
      ],
      summary: { points: ["work as (cargo), for (empresa), in (área).", "responsible for + -ing.", "deal with = lidar com."], concepts: ["responsible-for", "deal-with", "work-as"] },
    }),

    lesson("l2", {
      title: "A pessoa que, a coisa que",
      objective: "Você vai conseguir dar mais informação sobre pessoas e coisas com who, which e that.",
      minutes: 9,
      context: { kind: "text", title: "Apresentando a equipe", lines: [
        { en: "This is Carla. She's the engineer who designed our new app.", pt: "Esta é a Carla. Ela é a engenheira que projetou nosso novo aplicativo." },
        { en: "It's an app that helps people save money.", pt: "É um aplicativo que ajuda as pessoas a economizar." },
        { en: "The team that works with her is in Lisbon.", pt: "A equipe que trabalha com ela fica em Lisboa." },
        { en: "The report which I sent you explains everything.", pt: "O relatório que eu te enviei explica tudo." },
      ] },
      explanation: {
        summary: "As **orações relativas** dizem **de quem ou de que** estamos falando:\n- **who** → pessoas: *the engineer **who** designed the app*\n- **that** / **which** → coisas: *an app **that** helps people*\n\nEm português é sempre “que”; em inglês é preciso escolher.",
        details: "Na fala, **that** também é aceito para pessoas: *the person that called*. Quando o pronome é o objeto da oração, pode ser omitido: *the report (that) I sent you*. Não repita o sujeito depois de who/that: “the woman who she called” está errado.",
        examples: [
          { en: "He's the colleague who helped me.", pt: "Ele é o colega que me ajudou." },
          { en: "I need a tool that works offline.", pt: "Preciso de uma ferramenta que funcione sem internet." },
          { en: "The email I sent was wrong.", pt: "O e-mail que mandei estava errado." },
        ],
        contrasts: [
          { wrong: "The man which called is my boss.", right: "The man who called is my boss.", why: "Pessoa: who." },
          { wrong: "She's the manager who she hired me.", right: "She's the manager who hired me.", why: "Não se repete o sujeito depois de who." },
        ],
      },
      guided: [
        mc("e1", "Choose: “She's the engineer ___ designed our app.”", ["who", "which", "what"], 0, "Pessoa: who.", { c: ["who-clause"] }),
        match("e2", "Match the two halves.", [["The colleague who", "helped me is on vacation."], ["An app that", "tracks expenses."], ["The city which", "I visited was beautiful."], ["A manager who", "listens to the team."]],
          "Who para pessoas; that/which para coisas.", { c: ["who-clause", "which-that"], s: "grammar", pt: "Associe as duas metades." }),
        cloze("e3", "I need a tool ___ works offline.", ["that", "which"], "Coisa: that ou which.", { c: ["which-that"] }),
      ],
      independent: [
        cloze("e4", "He's the teacher ___ taught me English.", ["who", "that"], "Pessoa: who.", { c: ["who-clause"] }),
        fix("e5", "The woman which called is my manager.", ["The woman who called is my manager", "The woman that called is my manager"], "Pessoa: who.", { c: ["who-clause"], prompt: "Fix the relative pronoun." }),
        order("e6", "Put the words in order: “É um aplicativo que ajuda as pessoas a economizar.”", "It's an app that helps people save money.", "An app + that + verbo.", { c: ["which-that"] }),
        dict("e7", "She's the manager who hired me.", "Who + verbo, sem repetir o sujeito.", { c: ["who-clause"] }),
        fix("e8", "This is the report that it explains the results.", ["This is the report that explains the results", "This is the report which explains the results"], "Não se repete o sujeito depois de that.", { c: ["which-that"], prompt: "Fix the mistake." }),
      ],
      application: [
        type("e9", "Say in English: “Ele é o colega que me ajudou.”", ["He is the colleague who helped me", "He's the colleague who helped me", "He is the colleague that helped me", "He's the colleague that helped me"], "The colleague who helped me.", { c: ["who-clause"] }),
        write("e10", "Write three sentences describing a person and two things from your work or studies, using who and that.",
          { frame: ["… is the person who …", "It's a … that …", "The … that I … is …"], min: 22, check: ["Usei who para a pessoa.", "Usei that ou which para as coisas.", "Não repeti o sujeito depois do pronome."], model: "Carla is the person who trains new employees. We use a system that saves every document. The project that I manage is almost finished.", c: ["who-clause", "which-that"] }),
      ],
      summary: { points: ["who → pessoas.", "that / which → coisas.", "Sem repetir o sujeito depois de who/that."], concepts: ["who-clause", "which-that"] },
    }),

    lesson("l3", {
      title: "Na entrevista",
      objective: "Você vai conseguir falar de formação, experiência e pontos fortes em uma entrevista.",
      minutes: 10,
      context: { kind: "dialogue", title: "Entrevista de emprego", lines: [
        { who: "Entrevistadora", en: "Tell me about your background.", pt: "Fale sobre a sua trajetória." },
        { who: "Leo", en: "I studied business in college, and I have six years of experience in sales.", pt: "Estudei administração na faculdade e tenho seis anos de experiência em vendas." },
        { who: "Entrevistadora", en: "What are your strengths?", pt: "Quais são seus pontos fortes?" },
        { who: "Leo", en: "I'm good at solving problems, and I'm good with people.", pt: "Sou bom em resolver problemas e me dou bem com pessoas." },
        { who: "Entrevistadora", en: "Can you give me an example?", pt: "Pode me dar um exemplo?" },
        { who: "Leo", en: "Sure. Last year I dealt with a client who wanted to cancel a contract, and I found a solution.", pt: "Claro. No ano passado lidei com um cliente que queria cancelar um contrato e encontrei uma solução." },
      ] },
      explanation: {
        summary: "Blocos para entrevistas:\n- **I studied … in college.** (faculdade)\n- **I have … years of experience in …**\n- **I'm good at** + verbo-ing: *I'm good at solving problems.*\n- **For example, …** para sustentar o que você diz\n\nAtenção: **college** = faculdade. “Colégio” é **high school**.",
        details: "Uma boa resposta de entrevista tem três partes: a afirmação (*I'm good at…*), um exemplo no passado (*Last year I…*) e o resultado (*…so we kept the client*). Para pontos a melhorar: *I'm working on my public speaking.*",
        examples: [
          { en: "I have experience in customer service.", pt: "Tenho experiência em atendimento ao cliente." },
          { en: "She's good at managing teams.", pt: "Ela é boa em gerenciar equipes." },
          { en: "I went to college in Recife.", pt: "Fiz faculdade em Recife." },
        ],
        contrasts: [
          { wrong: "I'm good in solve problems.", right: "I'm good at solving problems.", why: "Good at + verbo-ing." },
          { wrong: "I studied in a college when I was 12.", right: "I went to school when I was 12.", why: "College é faculdade; aos 12 anos é school." },
          { wrong: "I have experience with five years.", right: "I have five years of experience.", why: "A ordem é years of experience." },
        ],
      },
      guided: [
        mc("e1", "What does “college” mean?", ["Faculdade", "Colégio (ensino médio)", "Colega"], 0, "College = faculdade. Colégio = high school.", { c: ["college"], s: "vocabulary" }),
        match("e2", "Match the interview phrase to its meaning.", [["my background", "minha trajetória"], ["my strengths", "meus pontos fortes"], ["I'm good at…", "sou bom em…"], ["years of experience", "anos de experiência"]],
          "Vocabulário básico de entrevistas.", { c: ["good-at", "experience-in"], pt: "Associe a frase ao significado." }),
        cloze("e3", "I'm good ___ solving problems.", ["at"], "A preposição é at: good at + -ing.", { c: ["good-at"] }),
      ],
      independent: [
        cloze("e4", "I have six years of experience ___ sales.", ["in"], "Experience in + área.", { c: ["experience-in"] }),
        cloze("e5", "She's good at ___ teams.", ["managing", "leading"], "Good at + -ing.", { c: ["good-at"], cue: "(manage)" }),
        fix("e6", "I'm good in speak with clients.", ["I'm good at speaking with clients", "I am good at speaking with clients", "I'm good at speaking to clients"], "Good at + -ing.", { c: ["good-at"], prompt: "Fix the mistake." }),
        dict("e7", "I studied business in college.", "In college = na faculdade.", { c: ["college"] }),
        order("e8", "Put the words in order: “Tenho cinco anos de experiência em vendas.”", "I have five years of experience in sales.", "Years of experience in + área.", { c: ["experience-in"] }),
      ],
      application: [
        type("e9", "Say in English: “Estudei engenharia na faculdade.”", ["I studied engineering in college", "I studied engineering at college", "I studied engineering at university", "I studied engineering in university"], "I studied engineering in college.", { c: ["college"] }),
        dialog("e10", "You are in a job interview.", [
          { npc: ["What are you good at?", "No que você é bom?"], options: [
            ["I'm good at organizing projects. For example, last year I planned an event for 200 people.", true, "A entrevistadora anota.", "Afirmação e exemplo concreto."],
            ["I'm good in organize.", false, "Ela espera mais.", "Good at + -ing, e faltou um exemplo."],
          ] },
          { npc: ["And what experience do you have?", "E que experiência você tem?"], options: [
            ["I have four years of experience in logistics.", true, "Ela pergunta sobre o último emprego.", "Estrutura correta."],
            ["I have experience of four years on logistics.", false, "Ela entende, mas soa estranho.", "Four years of experience in."],
          ] },
        ], "Responder em entrevistas: afirmar, exemplificar e quantificar.", { c: ["good-at", "experience-in"] }),
      ],
      summary: { points: ["good at + -ing.", "… years of experience in …", "college = faculdade; high school = colégio."], concepts: ["good-at", "experience-in", "college"] },
    }),

    lesson("l4", {
      title: "Como funciona: explicando um processo",
      objective: "Você vai conseguir explicar um processo passo a passo.",
      minutes: 9,
      context: { kind: "text", title: "Como processamos um pedido", lines: [
        { en: "First, the customer places an order on the website.", pt: "Primeiro, o cliente faz um pedido no site." },
        { en: "Next, we check the stock and make sure the address is correct.", pt: "Em seguida, verificamos o estoque e conferimos se o endereço está correto." },
        { en: "Once the payment is confirmed, we pack the products.", pt: "Assim que o pagamento é confirmado, embalamos os produtos." },
        { en: "Finally, we ship the order and send a tracking code.", pt: "Por fim, enviamos o pedido e mandamos um código de rastreio." },
      ] },
      explanation: {
        summary: "Para explicar um processo, use o **presente simples** e marcadores de etapa:\n- **First,** …\n- **Next,** / **Then** / **After that,** …\n- **Once** + etapa concluída (assim que)\n- **Finally,** …\n\n**Make sure** (certifique-se de que) destaca uma checagem importante.",
        details: "Ao dar instruções diretamente a alguém, use o imperativo: *First, open the app. Then, enter your password.* **Once** equivale a *as soon as* e é muito usado em procedimentos: *Once you finish, save the file.*",
        examples: [
          { en: "First, turn on the machine.", pt: "Primeiro, ligue a máquina." },
          { en: "Make sure the door is closed.", pt: "Certifique-se de que a porta está fechada." },
          { en: "Once you finish, save the file.", pt: "Assim que terminar, salve o arquivo." },
        ],
        contrasts: [
          { wrong: "Be sure that you saved? (como instrução)", right: "Make sure you save the file.", why: "A expressão natural é make sure." },
          { wrong: "Once you will finish, call me.", right: "Once you finish, call me.", why: "Depois de once, presente simples." },
        ],
      },
      guided: [
        mc("e1", "Which word means “assim que” in a process?", ["Once", "First", "Finally"], 0, "Once = assim que.", { c: ["process-steps"], s: "vocabulary" }),
        match("e2", "Match the marker to its place in a process.", [["First,", "a etapa inicial"], ["Next,", "a etapa seguinte"], ["Once…,", "depois que algo se conclui"], ["Finally,", "a etapa final"]],
          "Marcadores organizam o processo para quem ouve.", { c: ["process-steps"], pt: "Associe o marcador à posição no processo." }),
        cloze("e3", "___ sure the address is correct.", ["Make"], "Make sure.", { c: ["make-sure"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "___ the payment is confirmed, we pack the products.", ["Once"], "Once = assim que.", { c: ["process-steps"] }),
        order("e5", "Put the words in order: “Certifique-se de que a porta está fechada.”", "Make sure the door is closed.", "Make sure + frase.", { c: ["make-sure"] }),
        fix("e6", "Once you will finish, save the file.", ["Once you finish, save the file"], "Depois de once: presente.", { c: ["process-steps"], prompt: "Fix the mistake." }),
        dict("e7", "First, we check the stock. Next, we pack the products.", "Dois marcadores de etapa.", { c: ["process-steps"] }),
      ],
      application: [
        type("e8", "Give an instruction in English: “Certifique-se de que o arquivo está salvo.”", ["Make sure the file is saved", "Make sure that the file is saved"], "Make sure the file is saved.", { c: ["make-sure"] }),
        speak("e9", "Explain how to do something you know well (make coffee, send a file, book a ticket) in four steps.", ["First, open the app. Next, choose the date. Once you select the seat, pay with your card. Finally, make sure you receive the confirmation email."],
          { mode: "respond", check: ["Usei First e Finally.", "Usei Next, Then ou After that.", "Usei Once ou make sure.", "Os passos estão em ordem lógica."], c: ["process-steps", "make-sure"] }),
        write("e10", "Write the steps of a process from your work or daily life (four steps).",
          { mode: "guided", frame: ["First, …", "Next, …", "Once …, …", "Finally, …"], min: 30, check: ["Usei quatro marcadores de etapa.", "Usei o presente simples ou o imperativo.", "Incluí uma checagem com make sure."], model: "First, I read the customer's email. Next, I check the order in the system. Once I find the problem, I call the warehouse. Finally, I reply to the customer and make sure the problem is solved.", c: ["process-steps", "make-sure"] }),
      ],
      summary: { points: ["First → Next → Once… → Finally.", "Presente simples ou imperativo.", "make sure = certificar-se."], concepts: ["process-steps", "make-sure"] },
    }),
  ],

  checkpoint: {
    intro: "New workplaces and interviews. Describe roles, add detail with who and that, and explain how things work.",
    a: [
      cloze("q1", "He works ___ a chef in a hotel.", ["as"], "Cargo: as.", { c: ["work-as"] }),
      mc("q2", "Choose: “This is the software ___ we use for invoices.”", ["that", "who", "what"], 0, "Coisa: that.", { c: ["which-that"] }),
      fix("q3", "I'm responsible for to answer emails.", ["I'm responsible for answering emails", "I am responsible for answering emails"], "For + -ing.", { c: ["responsible-for"], prompt: "Fix the mistake." }),
      order("q4", "Put the words in order: “Sou bom em resolver problemas.”", "I'm good at solving problems.", "Good at + -ing.", { c: ["good-at"], extra: ["in"] }),
      dict("q5", "Once the order is ready, we call the customer.", "Once + presente.", { c: ["process-steps"] }),
      type("q6", "Say in English: “Tenho três anos de experiência em marketing.”", ["I have three years of experience in marketing", "I have 3 years of experience in marketing"], "Years of experience in.", { c: ["experience-in"] }),
      cloze("q7", "Our team has to ___ with difficult customers.", ["deal"], "Deal with.", { c: ["deal-with"], s: "vocabulary" }),
      listen("q8", "She's the woman who interviewed me. She studied law in college.", "What did she study?", ["Law", "Business", "Medicine"], 0, "She studied law in college.", { c: ["who-clause", "college"] }),
      mc("q9", "“Make sure the lights are off.” What should you do?", ["Conferir se as luzes estão apagadas", "Acender as luzes", "Consertar as luzes"], 0, "Make sure = certificar-se.", { c: ["make-sure"] }),
      dialog("q10", "A new colleague asks about your team.", [
        { npc: ["Who should I talk to about my contract?", "Com quem devo falar sobre meu contrato?"], options: [
          ["Talk to Marta. She's the person who deals with contracts.", true, "Ele agradece.", "Who + deal with."],
          ["Talk to Marta. She's the person which deal with contracts.", false, "Soa errado.", "Pessoa: who; e deals."],
        ] },
        { npc: ["And how do I ask for vacation?", "E como eu peço férias?"], options: [
          ["First, fill in the form. Then send it to your manager. Make sure you do it a month before.", true, "Ele anota os passos.", "Processo claro com marcadores."],
          ["You fill, send, a month.", false, "Ele fica perdido.", "Faltam os marcadores e a estrutura."],
        ] },
      ], "Indicar a pessoa certa e explicar um processo.", { c: ["who-clause", "deal-with", "process-steps"] }),
    ],
    b: [
      cloze("q1", "I work ___ a small company in Recife.", ["for", "at"], "Empresa: work for.", { c: ["work-as"] }),
      mc("q2", "Choose: “He's the doctor ___ treated my father.”", ["who", "which", "where"], 0, "Pessoa: who.", { c: ["who-clause"] }),
      fix("q3", "I have experience of two years on teaching.", ["I have two years of experience in teaching"], "Two years of experience in.", { c: ["experience-in"], prompt: "Fix the mistake." }),
      order("q4", "Put the words in order: “Estudei direito na faculdade.”", "I studied law in college.", "In college = na faculdade.", { c: ["college"], extra: ["school"] }),
      dict("q5", "I'm responsible for training new staff.", "Responsible for + -ing.", { c: ["responsible-for"], alt: ["I am responsible for training new staff."] }),
      type("q6", "Say in English: “Ela é boa em gerenciar pessoas.”", ["She is good at managing people", "She's good at managing people"], "Good at + -ing.", { c: ["good-at"] }),
      cloze("q7", "First, log in. ___, choose your project.", ["Next", "Then"], "Etapa seguinte: Next ou Then.", { c: ["process-steps"] }),
      listen("q8", "Make sure you save the document before you close the program.", "What must you do first?", ["Save the document", "Close the program", "Print the document"], 0, "Make sure you save… before you close.", { c: ["make-sure"] }),
      mc("q9", "“I deal with suppliers.” means:", ["Eu lido com fornecedores.", "Eu negocio preços.", "Eu concordo com fornecedores."], 0, "Deal with = lidar com.", { c: ["deal-with"], s: "vocabulary" }),
      dialog("q10", "An interviewer asks about your studies and strengths.", [
        { npc: ["Where did you study?", "Onde você estudou?"], options: [
          ["I went to college in Curitiba. I studied design.", true, "Ele pergunta sobre os projetos.", "College = faculdade."],
          ["I made college in Curitiba.", false, "Soa estranho.", "Went to college / studied in college."],
        ] },
        { npc: ["What makes you a good candidate?", "O que faz de você um bom candidato?"], options: [
          ["I'm good at working under pressure, and I have experience in e-commerce.", true, "Ele pede um exemplo.", "Good at + -ing; experience in."],
          ["I'm good in work, and I have experience on e-commerce.", false, "Há dois erros de preposição.", "Good at; experience in."],
        ] },
      ], "Entrevista: formação e pontos fortes.", { c: ["college", "good-at", "experience-in"] }),
    ],
    production: speak("t1", "Answer this interview question out loud (about 45 seconds): “Tell me about yourself and what you do.” Mention your studies, your role, one responsibility, one strength with an example.",
      ["I studied business in college. I work as a project manager for a software company. I'm responsible for planning the projects. I'm good at solving problems. For example, last month I dealt with a client who wanted to cancel, and I found a solution."],
      { mode: "respond", check: ["Disse onde estudei ou o que estudo.", "Descrevi meu papel com work as/for/in.", "Citei uma responsabilidade com responsible for.", "Citei um ponto forte com good at.", "Dei um exemplo concreto."], c: ["work-as", "responsible-for", "good-at"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Anúncio de vaga",
      goal: "Ler um anúncio de emprego e identificar requisitos e responsabilidades.",
      context: { kind: "notice", title: "We're hiring: Customer Support Analyst", lines: [
        { en: "We are looking for a person who enjoys helping people and solving problems.", pt: "Procuramos uma pessoa que goste de ajudar pessoas e resolver problemas." },
        { en: "You will be responsible for answering emails and you will deal with customers from different countries.", pt: "Você será responsável por responder e-mails e vai lidar com clientes de diferentes países." },
        { en: "We need someone who has at least two years of experience in customer service. A college degree is not required.", pt: "Precisamos de alguém com pelo menos dois anos de experiência em atendimento. Diploma de faculdade não é exigido." },
      ] },
      exercises: [
        mc("r1", "What will the person be responsible for?", ["Answering emails", "Hiring staff", "Designing the website"], 0, "Responsible for answering emails.", { c: ["responsible-for"], s: "reading" }),
        mc("r2", "Is a college degree necessary?", ["No", "Yes", "Only for managers"], 0, "A college degree is not required.", { c: ["college"], s: "reading", keepOrder: true }),
        type("r3", "How much experience is needed? Complete: at least two years of experience ___ customer service.", ["in"], "Experience in customer service.", { c: ["experience-in"], s: "reading" }),
        cloze("r4", "We are looking for a person ___ enjoys helping people.", ["who", "that"], "A person who enjoys…", { c: ["who-clause"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Explicando um procedimento",
      goal: "Acompanhar as etapas de um processo falado.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "First, enter your employee number. Next, choose the dates. Once your manager approves, you will receive an email. Make sure you check your inbox.", pt: "Primeiro, digite seu número de funcionário. Em seguida, escolha as datas. Assim que seu gestor aprovar, você receberá um e-mail. Certifique-se de conferir sua caixa de entrada." }] },
      exercises: [
        listen("a1", "First, enter your employee number. Next, choose the dates. Once your manager approves, you will receive an email. Make sure you check your inbox.", "What is the first step?", ["Enter your employee number", "Choose the dates", "Check your inbox"], 0, "First, enter your employee number.", { c: ["process-steps"] }),
        listen("a2", "First, enter your employee number. Next, choose the dates. Once your manager approves, you will receive an email. Make sure you check your inbox.", "When will you receive an email?", ["After the manager approves", "Before choosing the dates", "Immediately"], 0, "Once your manager approves.", { c: ["process-steps"] }),
        dict("a3", "Make sure you check your inbox.", "Make sure + frase.", { c: ["make-sure"], prompt: "Type the last instruction." }),
      ],
    }),
    writing: activity("writing", {
      title: "Meu perfil profissional",
      goal: "Escrever um resumo profissional de cerca de 50 palavras.",
      exercises: [
        write("w1", "Write a short professional summary for a profile page: your studies, your role, your responsibilities and one strength.",
          { mode: "free", min: 40, check: ["Disse meu cargo com work as.", "Usei responsible for + -ing.", "Usei good at + -ing ou experience in.", "Usei pelo menos uma oração com who ou that."], model: "I work as a nurse for a public hospital in Recife. I studied nursing in college and I have eight years of experience in emergency care. I'm responsible for training the new nurses who join our team. I'm good at staying calm in situations that are difficult.", c: ["work-as", "responsible-for", "experience-in"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Explique seu trabalho",
      goal: "Explicar em voz alta o que você faz e como uma tarefa funciona.",
      exercises: [
        speak("s1", "Explain your job or studies to someone who knows nothing about the area: what you do and how one typical task works.", ["I work as a teacher. I'm responsible for two classes. First, I plan the lesson. Next, I prepare the materials. Once the class finishes, I make sure every student understood."],
          { mode: "respond", check: ["Descrevi o que faço.", "Expliquei uma tarefa em etapas.", "Usei pelo menos três marcadores de etapa.", "Ouvi o modelo e comparei."], c: ["work-as", "process-steps"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: primeira entrevista em inglês",
      goal: "Passar por uma entrevista curta: apresentação, experiência, exemplo e pergunta final.",
      exercises: [
        dialog("m1", "You are in an online interview for a job abroad.", [
          { npc: ["Thanks for joining. Could you tell me about your background?", "Obrigada por participar. Pode me falar da sua trajetória?"], options: [
            ["Sure. I studied engineering in college and I have five years of experience in logistics.", true, "A entrevistadora acena.", "Formação e experiência, em ordem."],
            ["Yes. I made college and work five years.", false, "Ela pede mais clareza.", "Studied… in college; five years of experience."],
          ] },
          { npc: ["What were you responsible for in your last job?", "Pelo que você era responsável no último emprego?"], options: [
            ["I was responsible for planning deliveries, and I dealt with the drivers who work for us.", true, "Ela pede um exemplo.", "Responsible for + -ing; who."],
            ["I was responsible to plan, and I deal with drivers which work.", false, "Há vários erros.", "For + -ing; dealt; who."],
          ] },
          { npc: ["Can you give me an example of a problem you solved?", "Pode dar um exemplo de um problema que você resolveu?"], options: [
            ["Yes. Last year a supplier was late. First, I called other suppliers. Then I changed the route. In the end, we delivered on time.", true, "Ela diz: “That's a great example.”", "Exemplo em etapas com resultado."],
            ["Yes, I'm good at problems.", false, "Ela espera o exemplo.", "Faltou o exemplo concreto."],
          ] },
        ], "Entrevista: trajetória, responsabilidades e exemplo.", { c: ["experience-in", "responsible-for", "process-steps"] }),
        write("m2", "Write two questions you would ask the interviewer at the end.", { min: 14, check: ["Fiz duas perguntas completas.", "As perguntas são sobre a vaga ou a empresa.", "Usei a ordem correta de pergunta."], model: "What does a typical day look like in this role? Who will I work with on the team?", c: ["who-clause"] }),
      ],
      outside: {
        title: "Fora do app: seu discurso de um minuto",
        instructions: "Prepare e diga em voz alta a sua resposta a “Tell me about yourself”: formação, o que faz, uma responsabilidade, um ponto forte com exemplo. Cronometre: cerca de um minuto. Grave, ouça e repita uma vez melhorando um ponto.",
        checklist: ["Falei por cerca de um minuto.", "Incluí formação, função, responsabilidade e ponto forte.", "Dei um exemplo concreto.", "Gravei ou repeti para melhorar."],
      },
    }),
  },
});
