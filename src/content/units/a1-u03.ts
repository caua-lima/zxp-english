/** A1 · Unidade 3 — Família e pessoas: possessivos e descrições simples. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u03",

  concepts: [
    concept("family", "word", "mother, father, sister, brother, son, daughter", "mãe, pai, irmã, irmão, filho, filha", "l1", ["This is my sister.", "Esta é minha irmã."]),
    concept("parents", "word", "parents", "pais (pai e mãe)", "l1", ["My parents are from Bahia.", "Meus pais são da Bahia."], { note: "Falso cognato: parents = pais. “Parentes” é relatives.", tags: ["false-friend"] }),
    concept("my-your", "pattern", "my / your", "meu, minha / seu, sua", "l1", ["Is this your brother?", "Este é seu irmão?"]),
    concept("this-is", "phrase", "This is my …", "Este(a) é meu/minha …", "l1", ["This is my father.", "Este é meu pai."]),
    concept("his-her", "pattern", "his / her", "dele / dela", "l2", ["Her name is Ana.", "O nome dela é Ana."], { note: "His = dele (de um homem). Her = dela (de uma mulher)." }),
    concept("our-their", "pattern", "our / their", "nosso(a) / deles, delas", "l2", ["Their house is big.", "A casa deles é grande."]),
    concept("poss-s", "pattern", "Ana's brother", "o irmão da Ana", "l3", ["This is Leo's car.", "Este é o carro do Leo."], { note: "Nome + 's + coisa possuída. A ordem é inversa à do português." }),
    concept("have-has", "pattern", "I have / She has", "eu tenho / ela tem", "l3", ["She has two brothers.", "Ela tem dois irmãos."], { note: "Com he, she e it: has." }),
    concept("look-adj", "word", "tall, short, young, old", "alto, baixo, jovem, velho", "l4", ["My father is tall.", "Meu pai é alto."]),
    concept("person-adj", "word", "friendly, funny, quiet, kind", "simpático, engraçado, quieto, gentil", "l4", ["Her mother is very kind.", "A mãe dela é muito gentil."]),
    concept("adj-noun", "pattern", "a tall man", "um homem alto", "l4", ["She's a funny person.", "Ela é uma pessoa engraçada."], { note: "O adjetivo vem antes do substantivo e não vai para o plural." }),
  ],

  lessons: [
    lesson("l1", {
      title: "Esta é minha família",
      objective: "Você vai conseguir apresentar membros da sua família usando my e your.",
      minutes: 8,
      context: { kind: "dialogue", title: "Mostrando uma foto", lines: [
        { who: "Bia", en: "This is my family. This is my mother, and this is my father.", pt: "Esta é minha família. Esta é minha mãe, e este é meu pai." },
        { who: "Ken", en: "Is this your sister?", pt: "Esta é sua irmã?" },
        { who: "Bia", en: "Yes, she is. And this is my brother, Davi.", pt: "Sim, é. E este é meu irmão, Davi." },
        { who: "Ken", en: "Your parents are very young!", pt: "Seus pais são muito jovens!" },
      ] },
      explanation: {
        summary: "Para apresentar alguém, use **This is my…**: **This is my mother**.\n\n**My** = meu, minha, meus, minhas. **Your** = seu, sua, seus, suas. Em inglês eles não mudam com gênero nem número.\n\nFamília: **mother** (mãe), **father** (pai), **sister** (irmã), **brother** (irmão), **son** (filho), **daughter** (filha), **parents** (pais).",
        details: "Formas carinhosas: **mom** e **dad**. Avós: **grandmother** e **grandfather**. Marido e esposa: **husband** e **wife**.",
        examples: [
          { en: "This is my brother.", pt: "Este é meu irmão." },
          { en: "Is this your daughter?", pt: "Esta é sua filha?" },
          { en: "My parents are from Bahia.", pt: "Meus pais são da Bahia." },
        ],
        contrasts: [
          { wrong: "My parents are my cousins and uncles.", right: "My relatives are my cousins and uncles.", why: "Parents significa só pai e mãe. Parentes em geral são relatives." },
          { wrong: "This is the my mother.", right: "This is my mother.", why: "Não se usa the antes de my, your etc." },
        ],
        tip: "**Mother** e **father** têm o som de TH suave: a ponta da língua toca os dentes de cima, como um D mais leve.",
      },
      guided: [
        mc("e1", "O que significa “parents”?", ["Pai e mãe", "Todos os parentes", "Primos"], 0, "Parents são só o pai e a mãe. Parentes em geral são relatives.", { c: ["parents"], s: "vocabulary" }),
        match("e2", "Associe a palavra ao significado.", [["mother", "mãe"], ["father", "pai"], ["sister", "irmã"], ["brother", "irmão"], ["daughter", "filha"], ["son", "filho"]],
          "São os seis parentes mais próximos.", { c: ["family"] }),
        cloze("e3", "This is ___ mother. (minha)", ["my"], "My = meu, minha. Não muda com o gênero.", { c: ["my-your", "this-is"], s: "vocabulary" }),
      ],
      independent: [
        cloze("e4", "Is this ___ brother? (seu)", ["your"], "Your = seu, sua.", { c: ["my-your"], s: "vocabulary", tr: "Este é seu irmão?" }),
        order("e5", "Monte: “Esta é minha irmã.”", "This is my sister.", "Apresentação: This is my + pessoa.", { c: ["this-is", "family"], extra: ["the"] }),
        dict("e6", "This is my father.", "Apresentação com This is my + parente.", { c: ["this-is", "family"] }),
        type("e7", "Diga em inglês: “Meus pais são do Brasil.”", ["My parents are from Brazil"], "Pais (pai e mãe) = parents: My parents are from Brazil.",
          { c: ["parents", "my-your"], t: [["My fathers are from Brazil", "Fathers seria “dois pais homens”. Pai e mãe juntos são parents."]] }),
      ],
      application: [
        fix("e8", "This is the my son.", ["This is my son"], "Não se usa the junto com my.", { c: ["this-is"], prompt: "Corrija o erro." }),
        dialog("e8b", "Um colega pergunta sobre a foto da sua família.", [
          { npc: ["Who is this?", "Quem é este?"], options: [
            ["This is my brother. He is twenty.", true, "Seu colega sorri.", "This is my + parentesco."],
            ["This is the my brother.", false, "Seu colega entende, mas soa errado.", "Não se usa the junto com my."],
          ] },
          { npc: ["And these people?", "E estas pessoas?"], options: [
            ["These are my parents.", true, "Ele comenta que eles parecem simpáticos.", "Parents = pai e mãe; no plural, These are."],
            ["This is my parents.", false, "Soa estranho.", "Com mais de uma pessoa: These are."],
          ] },
        ], "Apresentar a família em uma conversa curta.", { c: ["this-is", "parents"] }),
        speak("e9", "Apresente três pessoas da sua família em voz alta.", ["This is my mother. This is my father. This is my sister."],
          { check: ["Usei This is my para cada pessoa.", "Pronunciei o TH de mother e father com a língua nos dentes.", "Repeti pelo menos duas vezes."], c: ["this-is"] }),
      ],
      summary: { points: ["Apresentar: This is my mother.", "My e your não mudam com gênero nem número.", "Parents = pai e mãe (não “parentes”)."], concepts: ["family", "parents", "my-your", "this-is"] },
    }),

    lesson("l2", {
      title: "Dele, dela, nosso, deles",
      objective: "Você vai conseguir dizer de quem é algo usando his, her, our e their.",
      minutes: 8,
      context: { kind: "text", title: "A família do Davi", lines: [
        { en: "This is Davi. His sister is Bia.", pt: "Este é o Davi. A irmã dele é a Bia." },
        { en: "This is Ana. Her brother is a doctor.", pt: "Esta é a Ana. O irmão dela é médico." },
        { en: "We live in Recife. Our house is small.", pt: "Nós moramos em Recife. Nossa casa é pequena." },
        { en: "Our neighbors are nice. Their dog is very funny.", pt: "Nossos vizinhos são legais. O cachorro deles é muito engraçado." },
      ] },
      explanation: {
        summary: "O possessivo depende de **quem possui**, não da coisa possuída:\n- **his** = dele (de um homem)\n- **her** = dela (de uma mulher)\n- **our** = nosso, nossa\n- **their** = deles, delas",
        details: "Em português dizemos “a irmã dele”; em inglês o possessivo vem antes: **his sister**. Para coisas e animais, usa-se **its**: *The dog and its toy*.",
        examples: [
          { en: "His name is Davi.", pt: "O nome dele é Davi." },
          { en: "Her brother is a doctor.", pt: "O irmão dela é médico." },
          { en: "Their dog is funny.", pt: "O cachorro deles é engraçado." },
        ],
        contrasts: [
          { wrong: "Ana and his brother.", right: "Ana and her brother.", why: "Ana é mulher, então o possessivo é her, mesmo que o irmão seja homem." },
          { wrong: "The house of they.", right: "Their house.", why: "Use o possessivo antes do substantivo." },
        ],
        tip: "**Their** (deles) e **there** (lá) soam igual. O contexto mostra qual é.",
      },
      guided: [
        mc("e1", "Complete: “This is Ana. ___ brother is a doctor.”", ["Her", "His", "Their"], 0, "Ana é mulher: her brother.", { c: ["his-her"], why: [undefined, "His é para um homem.", "Their é para mais de uma pessoa."] }),
        match("e2", "Associe o possessivo ao significado.", [["his", "dele"], ["her", "dela"], ["our", "nosso / nossa"], ["their", "deles / delas"]],
          "O possessivo acompanha quem possui.", { c: ["his-her", "our-their"] }),
        cloze("e3", "We live in Recife. ___ house is small.", ["Our"], "We corresponde a our: Our house.", { c: ["our-their"], tr: "Nós moramos em Recife. Nossa casa é pequena." }),
      ],
      independent: [
        cloze("e4", "This is Davi. ___ sister is Bia.", ["His"], "Davi é homem: his sister.", { c: ["his-her"], tr: "Este é o Davi. A irmã dele é a Bia." }),
        cloze("e5", "My neighbors are nice. ___ dog is funny.", ["Their"], "Neighbors = they → their.", { c: ["our-their"], tr: "Meus vizinhos são legais. O cachorro deles é engraçado." }),
        dict("e6", "Her name is Ana.", "Her = dela. O possessivo vem antes do substantivo.", { c: ["his-her"] }),
        fix("e7", "Maria and his mother are teachers.", ["Maria and her mother are teachers"], "Maria é mulher: her mother.", { c: ["his-her"], prompt: "Corrija o erro." }),
      ],
      application: [
        type("e8", "Diga em inglês: “A casa deles é pequena.”", ["Their house is small"], "Their + coisa possuída: Their house is small.", { c: ["our-their"] }),
        listen("e9", "This is Leo and his daughter.", "Quem aparece com o Leo?", ["A filha dele", "A filha dela", "A irmã dele"], 0, "His daughter = a filha dele.", { c: ["his-her", "family"] }),
      ],
      summary: { points: ["His = dele; her = dela.", "Our = nosso; their = deles.", "O possessivo vem antes do substantivo e concorda com quem possui."], concepts: ["his-her", "our-their"] },
    }),

    lesson("l3", {
      title: "O irmão da Ana, e quem tem o quê",
      objective: "Você vai conseguir indicar posse com 's e dizer quantos irmãos ou filhos alguém tem.",
      minutes: 9,
      context: { kind: "dialogue", title: "Conversa sobre famílias", lines: [
        { who: "Ken", en: "Is this Bia's brother?", pt: "Este é o irmão da Bia?" },
        { who: "Ana", en: "Yes. Bia has one brother and one sister.", pt: "Sim. A Bia tem um irmão e uma irmã." },
        { who: "Ken", en: "I have two brothers. Do you have a sister?", pt: "Eu tenho dois irmãos. Você tem irmã?" },
        { who: "Ana", en: "No, but I have a daughter. This is my daughter's school.", pt: "Não, mas tenho uma filha. Esta é a escola da minha filha." },
      ] },
      explanation: {
        summary: "Para dizer “de alguém”, o inglês usa **'s** depois do nome: **Bia's brother** = o irmão da Bia.\n\nPara posse e família, o verbo é **have**: **I have two brothers**. Com **he**, **she** e **it**, vira **has**: **She has one sister**.",
        details: "Cuidado para não confundir: em **Bia's brother**, o 's indica posse; em **Bia's a student**, o 's é a forma curta de is. Com nomes no plural terminados em s, só o apóstrofo: **my parents' house**.",
        examples: [
          { en: "This is Leo's car.", pt: "Este é o carro do Leo." },
          { en: "I have two brothers.", pt: "Eu tenho dois irmãos." },
          { en: "She has a daughter.", pt: "Ela tem uma filha." },
        ],
        contrasts: [
          { wrong: "The brother of Bia.", right: "Bia's brother.", why: "Com pessoas, o natural é nome + 's." },
          { wrong: "She have two brothers.", right: "She has two brothers.", why: "Com he, she e it o verbo é has." },
        ],
      },
      guided: [
        mc("e1", "Como se diz “o carro do Leo”?", ["Leo's car", "The car of Leo", "Leo car"], 0, "Nome + 's + coisa: Leo's car.", { c: ["poss-s"] }),
        match("e2", "Associe ao significado.", [["Ana's mother", "a mãe da Ana"], ["my sister's school", "a escola da minha irmã"], ["I have a son.", "Eu tenho um filho."], ["He has a son.", "Ele tem um filho."]],
          "O 's indica posse; have e has indicam o que se tem.", { c: ["poss-s", "have-has"] }),
        cloze("e3", "Bia ___ one brother.", ["has"], "Bia = she, então has.", { c: ["have-has"], cue: "(have)", tr: "A Bia tem um irmão." }),
      ],
      independent: [
        cloze("e4", "I ___ two sisters.", ["have"], "Com I, o verbo é have.", { c: ["have-has"], cue: "(have)", tr: "Eu tenho duas irmãs." }),
        order("e5", "Monte: “Esta é a casa do meu pai.”", "This is my father's house.", "Possuidor + 's + coisa: my father's house.", { c: ["poss-s"], extra: ["of"] }),
        fix("e6", "My brother have a car.", ["My brother has a car"], "My brother = he: has.", { c: ["have-has"], prompt: "Corrija o erro." }),
        dict("e7", "She has two brothers.", "She + has: terceira pessoa.", { c: ["have-has", "family"], alt: ["She has 2 brothers."] }),
      ],
      application: [
        type("e8", "Diga em inglês: “o irmão da Ana”.", ["Ana's brother"], "Nome + 's + pessoa: Ana's brother.", { c: ["poss-s"], t: [["The brother of Ana", "Entende-se, mas com pessoas o natural é Ana's brother."]] }),
        write("e9", "Escreva três frases sobre a sua família: quantos irmãos ou filhos você tem e o nome de alguém.",
          { frame: ["I have …", "My …'s name is …"], min: 10, check: ["Usei have ou has corretamente.", "Usei 's para indicar posse pelo menos uma vez.", "Não usei “of” para pessoas."], model: "I have one brother and two sisters. My brother's name is Davi. He has a daughter.", c: ["have-has", "poss-s"] }),
      ],
      summary: { points: ["Posse com pessoas: Bia's brother.", "I/you/we/they have; he/she/it has.", "'s pode ser posse (Bia's car) ou is (Bia's here)."], concepts: ["poss-s", "have-has"] },
    }),

    lesson("l4", {
      title: "Como ela é?",
      objective: "Você vai conseguir descrever a aparência e o jeito de uma pessoa com frases curtas.",
      minutes: 9,
      context: { kind: "dialogue", title: "Falando de um professor novo", lines: [
        { who: "Bia", en: "Our new teacher is Mr. Lee. He's tall and very friendly.", pt: "Nosso professor novo é o Sr. Lee. Ele é alto e muito simpático." },
        { who: "Ken", en: "Is he old?", pt: "Ele é velho?" },
        { who: "Bia", en: "No, he isn't. He's a young man. And he's funny!", pt: "Não. Ele é um homem jovem. E ele é engraçado!" },
        { who: "Ken", en: "Nice. My teacher is quiet, but she's very kind.", pt: "Que bom. Minha professora é quieta, mas é muito gentil." },
      ] },
      explanation: {
        summary: "Descrevemos com **to be + adjetivo**: **He's tall**. Antes de um substantivo, o adjetivo vem **na frente**: **a tall man**.\n\nAparência: **tall** (alto), **short** (baixo), **young** (jovem), **old** (velho). Jeito: **friendly** (simpático), **funny** (engraçado), **quiet** (quieto), **kind** (gentil).",
        details: "O adjetivo não tem plural: **two tall men** (nunca “talls”). **Very** intensifica: *very kind*. Para ligar ideias opostas, **but**: *quiet but kind*.",
        examples: [
          { en: "He's tall and friendly.", pt: "Ele é alto e simpático." },
          { en: "She's a young woman.", pt: "Ela é uma mulher jovem." },
          { en: "My brothers are funny.", pt: "Meus irmãos são engraçados." },
        ],
        contrasts: [
          { wrong: "He's a man tall.", right: "He's a tall man.", why: "O adjetivo vem antes do substantivo." },
          { wrong: "They are talls.", right: "They are tall.", why: "Adjetivos não têm plural em inglês." },
        ],
        tip: "Vogal curta e vogal longa mudam a palavra: **ship** (navio) e **sheep** (ovelha); **live** e **leave**. A longa dura mais e a boca fica mais esticada.",
      },
      guided: [
        mc("e1", "Qual frase está correta?", ["He's a tall man.", "He's a man tall.", "He's a talls man."], 0, "O adjetivo vem antes do substantivo e não tem plural.", { c: ["adj-noun"] }),
        match("e2", "Associe o adjetivo ao significado.", [["tall", "alto"], ["short", "baixo"], ["young", "jovem"], ["old", "velho"], ["kind", "gentil"], ["funny", "engraçado"]],
          "Quatro adjetivos de aparência e dois de personalidade.", { c: ["look-adj", "person-adj"] }),
        listen("e3", "She's quiet, but she's very kind.", "Como ela é?", ["Quieta, mas muito gentil.", "Alta e engraçada.", "Jovem e simpática."], 0, "Quiet = quieta; kind = gentil.", { c: ["person-adj"] }),
      ],
      independent: [
        cloze("e4", "My father isn't short. He's ___.", ["tall"], "O oposto de short (baixo) é tall (alto).", { c: ["look-adj"], s: "vocabulary" }),
        cloze("e5", "She makes everyone laugh. She's very ___.", ["funny"], "Quem faz todo mundo rir é funny.", { c: ["person-adj"], s: "vocabulary", tr: "Ela faz todo mundo rir. Ela é muito engraçada." }),
        order("e6", "Monte: “Ela é uma mulher jovem.”", "She's a young woman.", "Adjetivo antes do substantivo: a young woman.", { c: ["adj-noun", "look-adj"] }),
        fix("e7", "My sisters are talls.", ["My sisters are tall"], "Adjetivos não vão para o plural: tall.", { c: ["adj-noun", "look-adj"], prompt: "Corrija o erro." }),
        dict("e8", "He's young and friendly.", "Dois adjetivos ligados por and.", { c: ["look-adj", "person-adj"], alt: ["He is young and friendly."] }),
      ],
      application: [
        type("e9", "Diga em inglês: “Ele é um homem gentil.”", ["He is a kind man", "He's a kind man"], "Adjetivo antes do substantivo: a kind man.", { c: ["adj-noun", "person-adj"] }),
        speak("e10", "Descreva uma pessoa da sua família em voz alta.", ["My mother is short and very kind. She's a funny person."],
          { mode: "respond", check: ["Usei pelo menos dois adjetivos.", "Coloquei o adjetivo antes do substantivo.", "Não pluralizei adjetivos."], c: ["adj-noun"] }),
      ],
      summary: { points: ["To be + adjetivo: He's tall.", "Adjetivo antes do substantivo: a tall man.", "Adjetivos não têm plural."], concepts: ["look-adj", "person-adj", "adj-noun"] },
    }),
  ],

  checkpoint: {
    intro: "Pessoas e famílias que você ainda não conhece. Use possessivos, have/has e adjetivos.",
    a: [
      cloze("q1", "This is Paula. ___ husband is a driver.", ["Her"], "Paula é mulher: her husband.", { c: ["his-her"] }),
      mc("q2", "“My parents live in Lima.” Quem mora em Lima?", ["O pai e a mãe", "Os primos", "Todos os parentes"], 0, "Parents = pai e mãe.", { c: ["parents"], s: "vocabulary" }),
      fix("q3", "He have three sons.", ["He has three sons"], "Com he, o verbo é has.", { c: ["have-has"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Este é o cachorro do Tom.”", "This is Tom's dog.", "Nome + 's + coisa.", { c: ["poss-s", "this-is"], extra: ["of"] }),
      dict("q5", "Their daughter is very tall.", "Their = deles; adjetivo depois de is.", { c: ["our-their", "look-adj"] }),
      type("q6", "Diga em inglês: “uma mulher simpática”.", ["a friendly woman"], "Adjetivo antes do substantivo.", { c: ["adj-noun", "person-adj"] }),
      cloze("q7", "We have a small car. ___ car is old.", ["Our"], "We corresponde a our: Our car.", { c: ["our-their"] }),
      listen("q8", "This is my brother. He's short and funny.", "Como é o irmão?", ["Baixo e engraçado", "Alto e quieto", "Jovem e gentil"], 0, "Short = baixo; funny = engraçado.", { c: ["look-adj", "family"] }),
      mc("q9", "Qual está correta?", ["Is this your son?", "Is this the your son?", "This is your son is?"], 0, "Pergunta com is no início, sem the antes de your.", { c: ["my-your"] }),
      dialog("q10", "Um colega vê uma foto na sua mesa.", [
        { npc: ["Who is this?", "Quem é esta?"], options: [
          ["This is my sister. Her name is Lia.", true, "Ele sorri: “She looks nice.”", "Apresentou e usou her corretamente."],
          ["This is my sister. His name is Lia.", false, "Ele fica confuso.", "Para uma mulher, o possessivo é her."],
        ] },
        { npc: ["Does she have children?", "Ela tem filhos?"], options: [
          ["Yes, she has a son.", true, "A conversa continua.", "She + has."],
          ["Yes, she have a son.", false, "Ele entende, mas soa errado.", "Com she, o verbo é has."],
        ] },
      ], "Possessivo conforme a pessoa e has com she.", { c: ["his-her", "have-has"] }),
    ],
    b: [
      cloze("q1", "This is Marcos. ___ wife is a nurse.", ["His"], "Marcos é homem: his wife.", { c: ["his-her"] }),
      mc("q2", "Como se diz “a filha da Rita”?", ["Rita's daughter", "The daughter of Rita", "Rita daughter"], 0, "Nome + 's + pessoa.", { c: ["poss-s"] }),
      fix("q3", "They are olds.", ["They are old", "They're old"], "Adjetivo não tem plural.", { c: ["adj-noun", "look-adj"], prompt: "Corrija o erro." }),
      order("q4", "Monte: “Meus pais são jovens.”", "My parents are young.", "Parents = pai e mãe.", { c: ["parents", "look-adj"], extra: ["fathers"] }),
      dict("q5", "I have one sister.", "Com I, o verbo é have.", { c: ["have-has", "family"], alt: ["I have 1 sister."] }),
      type("q6", "Diga em inglês: “A casa deles é velha.”", ["Their house is old"], "Their + substantivo.", { c: ["our-their"] }),
      cloze("q7", "My mother ___ four brothers.", ["has"], "My mother = she: has.", { c: ["have-has"], cue: "(have)" }),
      listen("q8", "Our teacher is quiet but very kind.", "Como é a professora?", ["Quieta, mas gentil", "Engraçada e alta", "Velha e baixa"], 0, "Quiet = quieta; kind = gentil.", { c: ["person-adj", "our-their"] }),
      mc("q9", "Qual está correta?", ["She's a kind person.", "She's a person kind.", "She's kinds."], 0, "Adjetivo antes do substantivo.", { c: ["adj-noun"] }),
      dialog("q10", "Você apresenta um amigo à sua família.", [
        { npc: ["Is this your father?", "Este é seu pai?"], options: [
          ["Yes. This is my father, and this is my mother.", true, "Eles se cumprimentam.", "Apresentação com This is my."],
          ["Yes. This is the my father.", false, "Soa estranho.", "Não se usa the antes de my."],
        ] },
        { npc: ["Your parents are very friendly!", "Seus pais são muito simpáticos!"], options: [
          ["Thank you! My father is funny, too.", true, "Todos riem.", "Agradeceu e descreveu."],
          ["Thank you! My fathers is funny.", false, "Ele não entende.", "Use father no singular com is."],
        ] },
      ], "Apresentar com This is my e descrever com adjetivos.", { c: ["this-is", "parents"] }),
    ],
    production: write("t1", "Descreva duas pessoas da sua família: quem são, o que têm (irmãos, filhos) e como são.",
      { mode: "free", min: 25, check: ["Usei possessivos (my, his, her).", "Usei have ou has corretamente.", "Usei pelo menos três adjetivos.", "Coloquei os adjetivos antes dos substantivos."],
        model: "My mother is Rita. She is short and very kind. She has two sisters. My brother is Davi. His wife is a nurse. He is tall and funny.", c: ["his-her", "have-has", "adj-noun"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "A árvore da família Lima",
      goal: "Ler um texto curto sobre uma família e identificar relações e características.",
      context: { kind: "text", title: "The Lima family", lines: [
        { en: "Carlos and Rita are Bia's parents. They have three children: Bia, Davi and Lia.", pt: "Carlos e Rita são os pais da Bia. Eles têm três filhos: Bia, Davi e Lia." },
        { en: "Davi is tall and quiet. His sister Lia is short and very funny.", pt: "Davi é alto e quieto. A irmã dele, Lia, é baixa e muito engraçada." },
        { en: "Rita's mother lives with them. She is old, but she is very friendly.", pt: "A mãe da Rita mora com eles. Ela é idosa, mas é muito simpática." },
      ] },
      exercises: [
        mc("r1", "Quantos filhos Carlos e Rita têm?", ["Três", "Dois", "Quatro"], 0, "They have three children.", { c: ["have-has"], s: "reading", keepOrder: true }),
        mc("r2", "Como é a Lia?", ["Baixa e engraçada", "Alta e quieta", "Velha e simpática"], 0, "Lia is short and very funny.", { c: ["look-adj", "person-adj"], s: "reading" }),
        type("r3", "Quem mora com a família? Responda com duas palavras em inglês e o 's.", ["Rita's mother"], "Rita's mother lives with them.", { c: ["poss-s"], s: "reading" }),
        cloze("r4", "Davi is tall. ___ sister Lia is short.", ["His"], "Davi é homem: his sister.", { c: ["his-her"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Descrição de uma família",
      goal: "Entender quem é quem e como as pessoas são.",
      context: { kind: "text", title: "Transcrição", lines: [{ who: "Tom", en: "I have one brother. His name is Sam. He's tall and funny. Our parents are from Canada.", pt: "Eu tenho um irmão. O nome dele é Sam. Ele é alto e engraçado. Nossos pais são do Canadá." }] },
      exercises: [
        listen("a1", "I have one brother. His name is Sam. He's tall and funny. Our parents are from Canada.", "Quantos irmãos o Tom tem?", ["Um", "Dois", "Nenhum"], 0, "I have one brother.", { c: ["have-has"], keepOrder: true }),
        listen("a2", "I have one brother. His name is Sam. He's tall and funny. Our parents are from Canada.", "Como é o Sam?", ["Alto e engraçado", "Baixo e quieto", "Jovem e gentil"], 0, "He's tall and funny.", { c: ["look-adj"] }),
        dict("a3", "Our parents are from Canada.", "Our = nossos; parents = pai e mãe.", { c: ["our-their", "parents"], prompt: "Digite a última frase." }),
      ],
    }),
    writing: activity("writing", {
      title: "Legenda para uma foto de família",
      goal: "Escrever uma legenda de quatro frases apresentando e descrevendo pessoas.",
      exercises: [
        write("w1", "Imagine uma foto da sua família. Escreva a legenda: apresente duas pessoas e descreva cada uma.",
          { frame: ["This is my …", "His/Her name is …", "He/She is …"], min: 14, check: ["Apresentei com This is my.", "Usei his ou her conforme a pessoa.", "Descrevi com pelo menos dois adjetivos."], model: "This is my mother. Her name is Rita. She is short and kind. This is my brother. He is tall and funny.", c: ["this-is", "his-her"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Fale da sua família",
      goal: "Descrever a família em cerca de 30 segundos.",
      exercises: [
        speak("s1", "Diga quantos irmãos você tem e descreva uma pessoa da família.", ["I have two sisters. My mother is short and very kind. Her name is Rita."],
          { mode: "respond", check: ["Usei have.", "Usei um possessivo (my, his, her).", "Descrevi com dois adjetivos.", "Ouvi o modelo e comparei."], c: ["have-has", "person-adj"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: conhecendo a família anfitriã",
      goal: "Entender e responder perguntas sobre família em uma chegada a uma casa de intercâmbio.",
      exercises: [
        dialog("m1", "Você chega à casa da família que vai hospedar você.", [
          { npc: ["Welcome! This is my husband, Paul, and this is our son, Max.", "Bem-vindo! Este é meu marido, Paul, e este é nosso filho, Max."], options: [
            ["Nice to meet you. Your son is very tall!", true, "Eles riem: “Yes, he is!”", "Cumprimentou e descreveu com adjetivo."],
            ["Nice to meet you. Your son is very talls!", false, "Eles entendem, mas soa errado.", "Adjetivo não tem plural."],
          ] },
          { npc: ["Do you have brothers or sisters?", "Você tem irmãos ou irmãs?"], options: [
            ["Yes, I have one brother. His name is Davi.", true, "Ela pergunta mais sobre ele.", "Have + possessivo correto."],
            ["Yes, I has one brother.", false, "Ela corrige com delicadeza.", "Com I, o verbo é have."],
          ] },
        ], "Apresentações de família usam possessivos, have e adjetivos.", { c: ["have-has", "his-her"] }),
        write("m2", "Escreva uma mensagem curta para a família anfitriã apresentando a sua família.", { min: 12, check: ["Disse quantos irmãos ou filhos tenho.", "Usei um possessivo.", "Descrevi alguém."], model: "I have one brother and one sister. My parents are from Recife. My mother is very kind.", c: ["have-has", "parents"] }),
      ],
      outside: {
        title: "Fora do app: descreva alguém de verdade",
        instructions: "Pegue uma foto de família ou de amigos e, em voz alta, apresente duas pessoas em inglês: quem são, o que têm e como são.",
        checklist: ["Apresentei duas pessoas com This is my.", "Usei his ou her corretamente.", "Usei pelo menos três adjetivos."],
      },
    }),
  },
});
