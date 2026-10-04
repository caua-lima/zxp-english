/** B2 · Unidade 7 — Ler nas entrelinhas: tese, evidência, inferência e síntese. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, rd, speak, type, write } from "../builders";

const PASSAGE = "A recent study claims that students who start school later get better grades. The author argues that sleep is the key factor. However, the study only followed two schools, so the evidence is limited. The writer assumes that parents will accept later schedules, but the article does not mention their opinion. Clearly, the author supports the change, yet a fair reader should ask what the data really shows.";

export default defineUnit({
  id: "b2-u07",

  concepts: [
    concept("claim", "word", "claim / evidence / source", "afirmação / evidência / fonte", "l1", ["The author claims that exercise improves memory.", "O autor afirma que exercício melhora a memória."], { note: "Distinga o que o autor afirma (claim) do que ele prova (evidence)." }),
    concept("bias", "word", "bias / biased / neutral", "viés / tendencioso / neutro", "l1", ["The article seems biased in favor of the company.", "O artigo parece tendencioso a favor da empresa."], { note: "biased não é “viciado”: é tendencioso." }),
    concept("main-idea", "phrase", "The main point is … / The author's purpose is to …", "A ideia central é … / O objetivo do autor é …", "l1", ["The author's purpose is to persuade readers.", "O objetivo do autor é persuadir os leitores."]),
    concept("infer", "phrase", "This suggests that … / We can infer that …", "Isso sugere que … / Podemos inferir que …", "l2", ["This suggests that the company is struggling.", "Isso sugere que a empresa está com dificuldades."], { note: "Inferir é concluir a partir de pistas, sem que o texto diga." }),
    concept("clues-words", "phrase", "hardly / barely / scarcely", "mal, quase não", "l2", ["He barely mentioned the costs.", "Ele mal mencionou os custos."], { note: "Palavras que sugerem sem afirmar." }),
    concept("assume", "word", "assume / take on", "supor / assumir (uma tarefa)", "l2", ["The writer assumes that readers agree.", "O autor supõe que os leitores concordam."], { note: "Falso cognato: assume é supor. “Assumir uma tarefa” é take on.", tags: ["false-friend"] }),
    concept("paraphrase", "phrase", "In other words, … / Put simply, …", "Em outras palavras, … / Dizendo de forma simples, …", "l3", ["In other words, the plan is too risky.", "Em outras palavras, o plano é arriscado demais."], { note: "Reformule com suas palavras; não copie." }),
    concept("reporting-verbs", "word", "argue / suggest / point out / admit", "defender / sugerir / destacar / admitir", "l3", ["The author points out that costs are rising.", "O autor destaca que os custos estão subindo."], { note: "Cada verbo muda a força da afirmação." }),
    concept("summary-structure", "pattern", "The article argues that … It supports this by … However, …", "O artigo defende que … Apoia isso com … No entanto, …", "l4", ["The article argues that cities need more parks.", "O artigo defende que as cidades precisam de mais parques."], { note: "Um resumo tem tese, apoio e limite." }),
    concept("critical-question", "phrase", "How strong is the evidence? / What is missing?", "Quão forte é a evidência? / O que está faltando?", "l4", ["What is missing from this argument?", "O que está faltando neste argumento?"]),
  ],

  lessons: [
    lesson("l1", {
      title: "O que o autor afirma?",
      objective: "Você vai conseguir separar afirmação, evidência e viés em um texto de opinião.",
      minutes: 10,
      context: { kind: "text", title: "A short article", lines: [
        { en: "A recent study claims that students who start school later get better grades.", pt: "Um estudo recente afirma que alunos que começam a escola mais tarde tiram notas melhores." },
        { en: "The author argues that sleep is the key factor.", pt: "O autor defende que o sono é o fator-chave." },
        { en: "However, the study only followed two schools, so the evidence is limited.", pt: "No entanto, o estudo acompanhou apenas duas escolas, então a evidência é limitada." },
      ] },
      explanation: {
        summary: "Ao ler um texto de opinião, separe:\n- **claim** → o que o autor afirma\n- **evidence** → o que sustenta a afirmação (dados, exemplos)\n- **source** → de onde vem a informação\n- **bias** → a inclinação do autor\n\nUm texto **biased** (tendencioso) mostra só um lado.",
        details: "*Claim* não é só “reivindicar”: é afirmar algo que pode ser contestado. Leia perguntando: *Who says this? What is the evidence? Is anything missing?* Para a ideia central, use *The main point is…* ou *The author's purpose is to inform / persuade / criticize.*",
        examples: [
          { en: "The article is biased because it ignores the costs.", pt: "O artigo é tendencioso porque ignora os custos." },
          { en: "The main point is that the city needs more parks.", pt: "A ideia central é que a cidade precisa de mais parques." },
          { en: "The source of the data is not clear.", pt: "A fonte dos dados não é clara." },
        ],
        contrasts: [
          { wrong: "The author is vicious in favor of the company.", right: "The author is biased in favor of the company.", why: "Tendencioso = biased." },
          { wrong: "It is a fact that the plan will fail.", right: "The author claims that the plan will fail.", why: "Claim marca uma afirmação, não um fato." },
        ],
      },
      guided: [
        mc("e1", "“Studies show that coffee improves memory (a survey of 20 people).” The survey of 20 people is the:", ["evidence", "claim", "bias"], 0, "Evidence = o que sustenta a afirmação.", { c: ["claim"] }),
        match("e2", "Match the term to its meaning.", [["claim", "o que o autor afirma"], ["evidence", "o que sustenta a afirmação"], ["source", "de onde vem a informação"], ["bias", "inclinação do autor"]],
          "Quatro termos da leitura crítica.", { c: ["claim", "bias"], s: "vocabulary", pt: "Associe o termo ao significado." }),
        cloze("e3", "The article ignores the costs, so it seems ___ in favor of the plan.", ["biased"], "Biased = tendencioso.", { c: ["bias"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "The author ___ that sleep is the key factor.", ["argues", "claims"], "Argue/claim that…", { c: ["claim"] }),
        cloze("e5", "The ___ point is that cities need more parks.", ["main"], "The main point is…", { c: ["main-idea"] }),
        fix("e6", "The article is vicious in favor of the company.", ["The article is biased in favor of the company"], "Tendencioso = biased.", { c: ["bias"], prompt: "Fix the word." }),
        dict("e7", "The author's purpose is to persuade readers.", "Objetivo do autor.", { c: ["main-idea"] }),
        order("e8", "Put the words in order: “A fonte dos dados não é clara.”", "The source of the data is not clear.", "Source of the data.", { c: ["claim"], extra: ["fount"] }),
      ],
      application: [
        type("e9", "Say in English: “O autor afirma que o exercício melhora a memória.”", ["The author claims that exercise improves memory", "The author claims that exercise improves your memory", "The author argues that exercise improves memory"], "The author claims that…", { c: ["claim"] }),
        write("e10", "Read this sentence and write two lines: 'Everyone knows our product is the best, said the company's own report.' Identify the claim and explain why it might be biased.",
          { mode: "summary", min: 22, check: ["Identifiquei a afirmação (claim).", "Expliquei o viés com biased ou source.", "Usei vocabulário de leitura crítica."], model: "The claim is that the company's product is the best. The source is the company's own report, so it may be biased. There is no independent evidence to support the claim.", c: ["claim", "bias"] }),
      ],
      summary: { points: ["claim = afirmação; evidence = sustento.", "biased = tendencioso.", "The main point is… / The purpose is to…"], concepts: ["claim", "bias", "main-idea"] },
    }),

    lesson("l2", {
      title: "Ler nas entrelinhas",
      objective: "Você vai conseguir inferir o que o texto sugere sem dizer, e usar assume e suggest corretamente.",
      minutes: 10,
      context: { kind: "text", title: "A company announcement", lines: [
        { en: "Our company remains strong. We barely changed our plans this year, and we hardly ever need outside help.", pt: "Nossa empresa continua forte. Mal mudamos nossos planos este ano e quase nunca precisamos de ajuda externa." },
        { en: "The only change is that two managers left in a hurry last month.", pt: "A única mudança é que dois gerentes saíram às pressas no mês passado." },
        { en: "The writer assumes that customers will not worry.", pt: "O autor supõe que os clientes não vão se preocupar." },
      ] },
      explanation: {
        summary: "**Inferir** é concluir a partir de pistas que o texto não declara:\n- **This suggests that…** / **We can infer that…**\n- Pistas: palavras como **barely, hardly, scarcely** (quase não) e detalhes que o autor tenta minimizar\n\nCuidado: **assume** = supor. “Assumir uma tarefa” = **take on**.",
        details: "Um autor que diz *the company remains strong* mas menciona *two managers left in a hurry* sugere um problema. A inferência precisa de **pistas no texto**, não de opinião sua. *Assume* indica uma crença sem provas: *The writer assumes that readers agree.*",
        examples: [
          { en: "The report barely mentions the risks.", pt: "O relatório mal menciona os riscos." },
          { en: "I'll take on the extra work.", pt: "Eu assumo o trabalho extra." },
          { en: "We can infer that the budget was cut.", pt: "Podemos inferir que o orçamento foi cortado." },
        ],
        contrasts: [
          { wrong: "I assumed the project last month. (= assumi a tarefa)", right: "I took on the project last month.", why: "Assumir uma tarefa = take on." },
          { wrong: "The text infers that the company is weak.", right: "The text suggests that the company is weak.", why: "O texto sugere; quem infere é o leitor." },
        ],
      },
      guided: [
        mc("e1", "“Two managers left in a hurry last month.” What does this suggest?", ["There may be a problem in the company.", "The company is growing fast.", "The managers got promoted."], 0, "Inferência a partir da pista.", { c: ["infer"] }),
        mc("e2", "“The writer assumes readers agree.” This means:", ["O autor supõe que os leitores concordam.", "O autor assume a tarefa de convencer.", "O autor pergunta se concordam."], 0, "Assume = supor.", { c: ["assume"], s: "vocabulary" }),
        cloze("e3", "He ___ mentioned the costs. It was almost a secret.", ["barely", "hardly"], "Barely = mal.", { c: ["clues-words"] }),
      ],
      independent: [
        cloze("e4", "This ___ that the company is struggling.", ["suggests"], "This suggests that…", { c: ["infer"] }),
        cloze("e5", "Can I ___ on the new project? I have time this month.", ["take"], "Assumir uma tarefa = take on.", { c: ["assume"], s: "vocabulary", cue: "(assumir)", t: [["assume", "Assume é supor. Assumir uma tarefa = take on."]] }),
        fix("e6", "I assumed the leadership of the team last year.", ["I took on the leadership of the team last year"], "Assumir um cargo = take on.", { c: ["assume"], prompt: "Fix the verb." }),
        dict("e7", "The report barely mentions the risks.", "Barely = mal.", { c: ["clues-words"] }),
        order("e8", "Put the words in order: “Podemos inferir que o orçamento foi cortado.”", "We can infer that the budget was cut.", "We can infer that…", { c: ["infer"] }),
      ],
      application: [
        type("e9", "Say in English: “Isso sugere que a empresa tem problemas.”", ["This suggests that the company has problems", "This suggests that the company is struggling", "That suggests that the company has problems"], "This suggests that…", { c: ["infer"] }),
        speak("e10", "Read an announcement in your mind: 'The event was a success. We barely noticed that half of the seats were empty.' Say what you can infer in two sentences.", ["This suggests that the event was not as successful as the writer says. We can infer that many people did not come."],
          { mode: "respond", check: ["Usei This suggests ou We can infer.", "Apontei a pista (barely, empty seats).", "Contrastei a afirmação com o que a pista sugere."], c: ["infer", "clues-words"] }),
      ],
      summary: { points: ["suggest = o texto; infer = o leitor.", "barely / hardly = pistas de minimização.", "assume = supor; take on = assumir tarefa."], concepts: ["infer", "clues-words", "assume"] },
    }),

    lesson("l3", {
      title: "Dizer com suas palavras",
      objective: "Você vai conseguir parafrasear um trecho e escolher o verbo certo para relatar o que o autor diz.",
      minutes: 10,
      context: { kind: "text", title: "Paraphrasing", lines: [
        { en: "Original: 'The majority of commuters would switch to public transport if fares were reduced.'", pt: "Original: 'A maioria dos passageiros mudaria para o transporte público se as tarifas fossem reduzidas.'" },
        { en: "Paraphrase: In other words, most people would use buses and trains if tickets were cheaper.", pt: "Paráfrase: Em outras palavras, a maioria das pessoas usaria ônibus e trens se as passagens fossem mais baratas." },
        { en: "The author points out that cheaper tickets could change habits, but admits that the plan is expensive.", pt: "O autor destaca que passagens mais baratas poderiam mudar hábitos, mas admite que o plano é caro." },
      ] },
      explanation: {
        summary: "**Parafrasear** é dizer a mesma ideia com outras palavras e outra estrutura.\n- Marcadores: **In other words,…** / **Put simply,…** / **That is to say,…**\n- Verbos para relatar:\n  - **argue** → defender com razões\n  - **suggest** → sugerir (mais fraco)\n  - **point out** → destacar um fato\n  - **admit** → reconhecer algo desfavorável",
        details: "Copiar frases inteiras não é parafrasear. Troque sinônimos, mude a estrutura (voz ativa/passiva, ordem das ideias) e mantenha o sentido. O verbo escolhido já avalia o texto: *The author **admits** that…* mostra que ele cede um ponto, enquanto *The author **claims** that…* sugere dúvida.",
        examples: [
          { en: "Put simply, the plan is too risky.", pt: "Dizendo de forma simples, o plano é arriscado demais." },
          { en: "The writer admits that the data is limited.", pt: "O autor admite que os dados são limitados." },
          { en: "The article suggests that sleep matters.", pt: "O artigo sugere que o sono importa." },
        ],
        contrasts: [
          { wrong: "The author says the data is limited (copiando a frase inteira).", right: "The author admits that the data is limited.", why: "Verbo mais preciso." },
          { wrong: "The author suggests to sleep matters", right: "The author suggests that sleep matters.", why: "Suggest that + frase, sem dois-pontos." },
        ],
      },
      guided: [
        mc("e1", "Which sentence is a better paraphrase of “Most commuters would use public transport if fares fell”?", ["In other words, cheaper tickets would bring more passengers.", "Most commuters would use public transport if fares fell.", "Commuters are cheap."], 0, "Outras palavras, mesmo sentido.", { c: ["paraphrase"] }),
        match("e2", "Match the reporting verb to its force.", [["claim", "afirmação que pode ser contestada"], ["point out", "destacar um fato"], ["admit", "reconhecer algo desfavorável"], ["suggest", "propor ou indicar com cautela"]],
          "O verbo escolhido já avalia o texto.", { c: ["reporting-verbs"], s: "vocabulary", pt: "Associe o verbo ao seu peso." }),
        cloze("e3", "Put ___, the plan is too risky.", ["simply"], "Put simply,…", { c: ["paraphrase"] }),
      ],
      independent: [
        cloze("e4", "In other ___, most people would use buses if tickets were cheaper.", ["words"], "In other words,…", { c: ["paraphrase"] }),
        cloze("e5", "The writer ___ that the data is limited, which weakens his case.", ["admits", "acknowledges"], "Admit = reconhecer algo desfavorável.", { c: ["reporting-verbs"] }),
        fix("e6", "The author suggests to sleep matters.", ["The author suggests that sleep matters"], "Suggest that + frase completa.", { c: ["reporting-verbs"], prompt: "Fix the mistake." }),
        dict("e7", "The author points out that costs are rising.", "Point out that + frase.", { c: ["reporting-verbs"] }),
        type("e8", "Paraphrase with “In other words”: “Prices are going up too fast.”", ["In other words, prices are rising too quickly", "In other words, prices are increasing too fast", "In other words, prices are growing too fast", "In other words, prices are rising too fast"], "Troque o vocabulário.", { c: ["paraphrase"] }),
      ],
      application: [
        write("e9", "Paraphrase in your own words (about 25 words): 'A significant proportion of employees reported higher productivity when allowed to work remotely.'",
          { mode: "summary", min: 12, check: ["Usei outras palavras.", "Usei In other words ou Put simply.", "Mantive o sentido.", "Não copiei a frase inteira."], model: "In other words, many workers got more done when they could work from home.", c: ["paraphrase"] }),
        write("e10", "Report what the author does using three different verbs: 'The author says X. He says that Y might be false. He also says Z.'",
          { mode: "summary", min: 22, check: ["Usei três verbos de relato diferentes.", "Evitei repetir says.", "Cada verbo combina com a força da afirmação."], model: "The author argues that cities need more parks. He suggests that this could improve health. He also admits that the plan is expensive.", c: ["reporting-verbs"] }),
      ],
      summary: { points: ["In other words / Put simply.", "argue, suggest, point out, admit.", "Troque palavras e estrutura."], concepts: ["paraphrase", "reporting-verbs"] },
    }),

    lesson("l4", {
      title: "Resumir e avaliar",
      objective: "Você vai conseguir resumir um texto e avaliar a força do argumento.",
      minutes: 10,
      context: { kind: "text", title: "Summary and evaluation", lines: [
        { en: "The article argues that schools should start later.", pt: "O artigo defende que as escolas deveriam começar mais tarde." },
        { en: "It supports this claim by citing a study of two schools.", pt: "Apoia essa afirmação citando um estudo com duas escolas." },
        { en: "However, the evidence is limited, and the writer does not consider parents' schedules.", pt: "No entanto, a evidência é limitada, e o autor não considera os horários dos pais." },
        { en: "A fair reader should ask: what is missing from this argument?", pt: "Um leitor justo deveria perguntar: o que está faltando neste argumento?" },
      ] },
      explanation: {
        summary: "Um bom **resumo** tem três partes:\n1. **Tese:** *The article argues that…*\n2. **Apoio:** *It supports this by…*\n3. **Limite ou avaliação:** *However, the evidence is…*\n\nPara avaliar: **How strong is the evidence?** / **What is missing?** / **Who benefits?**",
        details: "Resuma em uma fração do tamanho original (cerca de um quarto), sem opinião própria nas partes 1 e 2. A avaliação vem depois e pode usar *limited, convincing, one-sided, outdated, anecdotal.* Evite frases como “I think it's bad”; prefira *The argument is weakened by…*",
        examples: [
          { en: "The article argues that cities need more parks.", pt: "O artigo defende que as cidades precisam de mais parques." },
          { en: "The argument is weakened by a small sample.", pt: "O argumento é enfraquecido por uma amostra pequena." },
          { en: "It is a convincing piece, but it ignores costs.", pt: "É um texto convincente, mas ignora os custos." },
        ],
        contrasts: [
          { wrong: "The article is bad and I hate it.", right: "The argument is weakened by the limited evidence.", why: "Avalie com critérios, não com emoção." },
          { wrong: "The article talks about parks.", right: "The article argues that cities need more parks.", why: "Resuma a tese, não só o tema." },
        ],
      },
      guided: [
        mc("e1", "Which sentence starts a good summary?", ["The article argues that schools should start later.", "I think schools are boring.", "The article is long."], 0, "Comece pela tese.", { c: ["summary-structure"] }),
        match("e2", "Match the part of a summary to a sentence.", [["tese", "The article argues that schools should start later."], ["apoio", "It supports this by citing a study."], ["limite", "However, the evidence is limited."], ["pergunta crítica", "What is missing from this argument?"]],
          "Estrutura de resumo e avaliação.", { c: ["summary-structure", "critical-question"], pt: "Associe a parte à frase." }),
        cloze("e3", "How ___ is the evidence in this article?", ["strong"], "How strong is the evidence?", { c: ["critical-question"] }),
      ],
      independent: [
        cloze("e4", "The article ___ that cities need more parks.", ["argues"], "The article argues that…", { c: ["summary-structure"] }),
        cloze("e5", "The argument is ___ by a very small sample.", ["weakened"], "Weakened by…", { c: ["critical-question"], s: "vocabulary" }),
        fix("e6", "The article talks about that cities need parks.", ["The article argues that cities need parks", "The article says that cities need parks"], "Resuma a tese: argues that.", { c: ["summary-structure"], prompt: "Fix the verb." }),
        dict("e7", "What is missing from this argument?", "Pergunta crítica.", { c: ["critical-question"] }),
        order("e8", "Put the words in order: “Quão forte é a evidência?”", "How strong is the evidence?", "How strong is…?", { c: ["critical-question"], extra: ["much"] }),
      ],
      application: [
        write("e9", "Summarize in 3 sentences (about 40 words): 'Cities with more parks report lower stress. The author, a park designer, says every city needs ten more parks. He does not mention costs.' Include thesis, support and a limit.",
          { mode: "summary", min: 30, check: ["Comecei com The article/author argues that.", "Incluí o apoio.", "Apontei um limite com However ou but.", "Não copiei as frases originais."], model: "The article argues that cities need more parks because residents report lower stress. The author is a park designer, so the argument may be biased. However, he does not mention the costs, which weakens the case.", c: ["summary-structure", "bias"] }),
        speak("e10", "Evaluate an article or video you saw recently in 4 sentences: thesis, support, strength, and one thing that is missing.", ["The video argues that people should sleep eight hours. It supports this by citing a study. The evidence seems convincing. However, it does not mention people who work at night."],
          { mode: "respond", check: ["Resumi a tese.", "Citei o apoio.", "Avaliei a força da evidência.", "Apontei o que está faltando."], c: ["summary-structure", "critical-question"] }),
      ],
      summary: { points: ["Tese, apoio e limite.", "How strong is the evidence?", "Avalie com critérios."], concepts: ["summary-structure", "critical-question"] },
    }),
  ],

  checkpoint: {
    intro: "New texts to read critically: identify claims and bias, infer what is not said, paraphrase, summarize and evaluate.",
    a: [
      mc("q1", "A company writes: 'Our new drink is the healthiest on the market.' This is a:", ["claim", "proven fact", "neutral report"], 0, "Afirmação sem evidência: claim.", { c: ["claim"] }),
      cloze("q2", "The review seems ___ because the reviewer works for the company.", ["biased"], "Tendencioso = biased.", { c: ["bias"], s: "vocabulary" }),
      cloze("q3", "The author's ___ is to persuade readers to recycle.", ["purpose", "aim", "goal"], "The author's purpose is to…", { c: ["main-idea"] }),
      type("q4", "Say in English: “Isso sugere que o orçamento foi reduzido.”", ["This suggests that the budget was reduced", "This suggests that the budget was cut"], "This suggests that…", { c: ["infer"] }),
      fix("q5", "I assumed the new job last month.", ["I took on the new job last month"], "Assumir uma tarefa = take on.", { c: ["assume"], prompt: "Fix the verb." }),
      dict("q6", "The manager barely mentioned the results.", "Barely = mal.", { c: ["clues-words"] }),
      cloze("q7", "In other ___, the project was a failure.", ["words"], "In other words,…", { c: ["paraphrase"] }),
      mc("q8", "Which verb shows that the author gives an unfavorable fact?", ["admits", "claims", "argues"], 0, "Admit = reconhecer algo desfavorável.", { c: ["reporting-verbs"], s: "vocabulary" }),
      order("q9", "Put the words in order: “O artigo defende que as cidades precisam de mais parques.”", "The article argues that cities need more parks.", "The article argues that…", { c: ["summary-structure"] }),
      listen("q10", "The study sounds convincing. However, it only surveyed twenty people, and the authors work for the company that sells the product.", "What is the problem with the study?", ["Small sample and possible bias", "It is too old", "It has too many authors"], 0, "Twenty people and authors work for the company.", { c: ["critical-question", "bias"] }),
    ],
    b: [
      mc("q1", "An article says 'Studies show...' but names no study. The best question is:", ["What is the source?", "Who is the author's friend?", "Why is it so long?"], 0, "Fonte ausente.", { c: ["claim"], s: "reading" }),
      cloze("q2", "The article is ___: it shows only the advantages.", ["one-sided", "biased"], "Mostra um lado só.", { c: ["bias"], s: "vocabulary" }),
      fix("q3", "The author is vicious against the new law.", ["The author is biased against the new law"], "Tendencioso = biased.", { c: ["bias"], prompt: "Fix the word." }),
      cloze("q4", "We can ___ that the company is in trouble from the details.", ["infer"], "We can infer that…", { c: ["infer"] }),
      type("q5", "Say in English: “Eu assumo a responsabilidade por esse projeto.”", ["I'll take on this project", "I will take on this project", "I take on this project", "I'll take on the responsibility for this project", "I will take responsibility for this project"], "Take on / take responsibility.", { c: ["assume"] }),
      cloze("q6", "The reporter ___ mentioned the risks, so readers may not notice them.", ["barely", "hardly"], "Barely/hardly = mal.", { c: ["clues-words"] }),
      type("q7", "Paraphrase with “Put simply”: “The expenditure exceeded the revenue.”", ["Put simply, we spent more than we earned", "Put simply, the company spent more than it earned", "Put simply, costs were higher than income", "Put simply, spending was higher than income"], "Outras palavras.", { c: ["paraphrase"] }),
      dict("q8", "The writer points out that the sample is small.", "Point out that + frase.", { c: ["reporting-verbs"] }),
      order("q9", "Put the words in order: “O argumento é enfraquecido pela falta de dados.”", "The argument is weakened by the lack of data.", "Weakened by…", { c: ["critical-question"], extra: ["strengthened"] }),
      listen("q10", "The article argues that cities need more bike lanes. It supports this by citing a study from Denmark. However, it does not explain whether the results apply to other countries.", "What does the article NOT explain?", ["Whether the results apply elsewhere", "Who wrote the article", "What the study is"], 0, "Does not explain whether the results apply.", { c: ["summary-structure"] }),
    ],
    production: write("t1", "Read this mini-article in your mind: 'The city will build a new stadium. The mayor says it will create 500 jobs and bring millions in tourism. Critics say the money is needed for hospitals. Opening is planned for next year.' Write 80 words: summarize the article (thesis, support), infer one thing it does not say and evaluate the evidence.",
      { mode: "summary", min: 65, check: ["Resumi a tese e o apoio com argues/says.", "Fiz uma inferência com suggests ou we can infer.", "Avaliei a evidência com critérios (limited, biased, missing).", "Usei pelo menos um verbo de relato diferente de say.", "Parafraseei em vez de copiar."],
        model: "The article reports that the city plans to build a stadium. The mayor argues that it will create five hundred jobs and boost tourism. Critics, however, point out that the money is needed for hospitals. The article barely mentions the cost, which suggests that the project may be expensive. In other words, the evidence for the benefits is not clear. The argument seems one-sided because it relies mostly on the mayor's claims. What is missing is independent data about jobs and tourism.", c: ["summary-structure", "infer", "reporting-verbs", "critical-question"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "Estudo sobre o sono",
      goal: "Ler um texto de opinião e distinguir afirmação, evidência, suposição e limite.",
      context: { kind: "text", title: "Later school start times", lines: [
        { en: "A recent study claims that students who start school later get better grades. The author argues that sleep is the key factor.", pt: "Um estudo recente afirma que alunos que começam a escola mais tarde tiram notas melhores. O autor defende que o sono é o fator-chave." },
        { en: "However, the study only followed two schools, so the evidence is limited.", pt: "No entanto, o estudo acompanhou apenas duas escolas, então a evidência é limitada." },
        { en: "The writer assumes that parents will accept later schedules, but the article does not mention their opinion.", pt: "O autor supõe que os pais aceitarão horários mais tardios, mas o artigo não menciona a opinião deles." },
        { en: "Clearly, the author supports the change, yet a fair reader should ask what the data really shows.", pt: "Claramente, o autor apoia a mudança, mas um leitor justo deveria perguntar o que os dados realmente mostram." },
      ] },
      exercises: [
        rd("r1", PASSAGE, "What is the author's main claim?", ["Starting school later improves grades.", "Sleep is not important.", "Parents should decide the schedule."], 0, "Students who start later get better grades.", { c: ["claim"] }),
        rd("r2", PASSAGE, "Why is the evidence limited?", ["The study followed only two schools.", "The study was too old.", "The students were too young."], 0, "The study only followed two schools.", { c: ["critical-question"] }),
        rd("r3", PASSAGE, "What does the writer assume?", ["Parents will accept later schedules.", "Students will sleep more.", "Schools will close."], 0, "The writer assumes that parents will accept…", { c: ["assume"] }),
        cloze("r4", "A fair reader should ask what the data really ___.", ["shows"], "What the data shows.", { c: ["critical-question"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Notícia ou propaganda?",
      goal: "Perceber o objetivo do falante e pistas de viés.",
      context: { kind: "text", title: "Transcrição", lines: [{ en: "Our new vitamins are amazing. Customers love them. In fact, we barely received complaints. Of course, only a small group tried them.", pt: "Nossas novas vitaminas são incríveis. Os clientes adoram. Na verdade, quase não recebemos reclamações. Claro que só um pequeno grupo as experimentou." }] },
      exercises: [
        listen("a1", "Our new vitamins are amazing. Customers love them.", "What is the speaker's purpose?", ["To persuade people to buy", "To inform neutrally", "To criticize the product"], 0, "Linguagem promocional.", { c: ["main-idea"] }),
        listen("a2", "In fact, we barely received complaints. Of course, only a small group tried them.", "What does the last sentence suggest?", ["The evidence is limited", "The product is dangerous", "Everyone tried it"], 0, "Only a small group tried them.", { c: ["infer"] }),
        dict("a3", "We barely received complaints.", "Barely = mal.", { c: ["clues-words"], prompt: "Type what you hear." }),
      ],
    }),
    writing: activity("writing", {
      title: "Resumo e avaliação",
      goal: "Escrever um resumo curto e uma avaliação crítica de um texto.",
      exercises: [
        write("w1", "Summarize this text in 3 sentences (about 45 words) and evaluate it: 'A famous chef says that cooking at home is always healthier than eating out. He sells cookbooks and cooking classes. He did not give any numbers.'",
          { mode: "summary", min: 35, check: ["Resumi a tese com argues/claims.", "Apontei o possível viés.", "Avaliei a evidência.", "Usei In other words ou Put simply, ou um verbo de relato."], model: "The chef claims that cooking at home is always healthier than eating out. However, he sells cookbooks and classes, so he may be biased. He gives no numbers, which means the evidence is weak. In other words, the argument is not convincing.", c: ["summary-structure", "bias", "claim"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Crítica de um minuto",
      goal: "Resumir e avaliar um texto oralmente.",
      exercises: [
        speak("s1", "Choose an article, post or video you saw this week. Summarize it in two sentences, then evaluate its evidence and say what is missing.", ["The video argues that everyone should drink more water. It supports this with a personal story. The evidence is weak, because it is only one case. What is missing is research with many people."],
          { mode: "respond", check: ["Resumi a tese.", "Citei o apoio.", "Avaliei a evidência.", "Apontei o que falta."], c: ["summary-structure", "critical-question"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: relatório de leitura crítica",
      goal: "Discutir um texto com um colega e chegar a uma avaliação comum.",
      exercises: [
        dialog("m1", "A colleague shows you an article claiming that remote work doubles productivity.", [
          { npc: ["This article says remote work doubles productivity. What do you think?", "Este artigo diz que o trabalho remoto dobra a produtividade. O que você acha?"], options: [
            ["It claims that, but I'd ask how strong the evidence is. Who wrote the study?", true, "Seu colega procura a fonte.", "Pergunta crítica."],
            ["It's true. Everyone knows that.", false, "Seu colega concorda sem pensar.", "Aceitou sem checar a evidência."],
          ] },
          { npc: ["The author works for a software company that sells remote tools.", "O autor trabalha para uma empresa de software que vende ferramentas de trabalho remoto."], options: [
            ["That suggests the article may be biased. We should look for independent data.", true, "Ele concorda.", "Inferência e proposta."],
            ["That means the author is lying.", false, "A conclusão é forte demais.", "Sem provas, não afirme mentira."],
          ] },
          { npc: ["How would you summarize it in one line?", "Como você resumiria em uma linha?"], options: [
            ["The article argues that remote work doubles productivity, but its evidence is limited and possibly biased.", true, "Ele anota seu resumo.", "Tese e limite em uma frase."],
            ["It's about remote work.", false, "O resumo não diz nada.", "Resuma a tese, não só o tema."],
          ] },
        ], "Avaliar um artigo com um colega.", { c: ["claim", "bias", "infer", "summary-structure"] }),
        type("m2", "Say in English: “De quem é a fonte desses dados?”", ["What is the source of these data", "What is the source of this data", "Who is the source of this data"], "Source of the data.", { c: ["claim"] }),
      ],
      outside: {
        title: "Fora do app: leitor crítico",
        instructions: "Escolha um texto curto em inglês (notícia, post, artigo) e anote em inglês: a afirmação principal (claim), a evidência, uma possível suposição do autor e uma pista de viés. Resuma em duas frases e diga em voz alta o que está faltando.",
        checklist: ["Identifiquei a afirmação.", "Apontei a evidência.", "Fiz uma inferência.", "Resumi com minhas palavras."],
      },
    }),
  },
});
