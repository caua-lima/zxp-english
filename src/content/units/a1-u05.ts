/** A1 · Unidade 5 — Horas, datas e compromissos. */
import { activity, cloze, concept, defineUnit, dialog, dict, fix, lesson, listen, match, mc, order, speak, type, write } from "../builders";

export default defineUnit({
  id: "a1-u05",

  concepts: [
    concept("what-time", "phrase", "What time is it?", "Que horas são?", "l1", ["Excuse me, what time is it?", "Com licença, que horas são?"]),
    concept("oclock", "phrase", "It's seven o'clock.", "São sete horas.", "l1", ["It's nine o'clock.", "São nove horas."], { note: "O'clock só para hora cheia." }),
    concept("half-past", "phrase", "half past / a quarter past / a quarter to", "e meia / e quinze / quinze para", "l1", ["It's half past eight.", "São oito e meia."]),
    concept("at-time", "pattern", "at seven / at night", "às + hora", "l1", ["The class starts at ten.", "A aula começa às dez."]),
    concept("days", "word", "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "segunda a domingo", "l2", ["I work from Monday to Friday.", "Eu trabalho de segunda a sexta."], { note: "Dias da semana e meses sempre com letra maiúscula." }),
    concept("on-day", "pattern", "on Monday / on July 10", "na/no + dia", "l2", ["See you on Friday.", "Até sexta."]),
    concept("in-month", "pattern", "in March / in the morning", "em + mês; de manhã", "l2", ["My birthday is in March.", "Meu aniversário é em março."], { note: "in the morning, in the afternoon, in the evening; mas at night." }),
    concept("always-never", "word", "always / never", "sempre / nunca", "l3", ["I never drink coffee at night.", "Eu nunca bebo café à noite."]),
    concept("usually-sometimes", "word", "usually / sometimes / often", "geralmente / às vezes / com frequência", "l3", ["She usually gets up early.", "Ela geralmente levanta cedo."]),
    concept("freq-position", "pattern", "I always get up early. / I'm always late.", "posição do advérbio de frequência", "l3", ["He is never late.", "Ele nunca se atrasa."], { note: "Antes do verbo principal; depois do verbo to be." }),
    concept("are-you-free", "phrase", "Are you free on Friday?", "Você está livre na sexta?", "l4", ["Are you free on Saturday morning?", "Você está livre no sábado de manhã?"]),
    concept("lets-meet", "phrase", "Let's meet at six.", "Vamos nos encontrar às seis.", "l4", ["Let's meet at the station at six.", "Vamos nos encontrar na estação às seis."]),
  ],

  lessons: [
    lesson("l1", {
      title: "Que horas são?",
      objective: "Você vai conseguir perguntar e dizer as horas e a que horas algo acontece.",
      minutes: 9,
      context: { kind: "dialogue", title: "No ponto de ônibus", lines: [
        { who: "Ana", en: "Excuse me, what time is it?", pt: "Com licença, que horas são?" },
        { who: "Homem", en: "It's half past seven.", pt: "São sete e meia." },
        { who: "Ana", en: "Thanks. What time is the bus?", pt: "Obrigada. A que horas é o ônibus?" },
        { who: "Homem", en: "It comes at a quarter to eight.", pt: "Ele vem às quinze para as oito." },
      ] },
      explanation: {
        summary: "Para perguntar as horas: **What time is it?** A resposta começa com **It's**:\n- **It's seven o'clock** (hora cheia)\n- **It's half past seven** (7h30)\n- **It's a quarter past seven** (7h15)\n- **It's a quarter to eight** (7h45)\n\nPara dizer quando algo acontece, use **at**: **at seven**, **at half past nine**.",
        details: "Há uma forma mais simples e muito usada: dizer os números em sequência. **7:30** = *seven thirty*; **7:15** = *seven fifteen*; **7:45** = *seven forty-five*. As duas formas estão certas. **a.m.** é antes do meio-dia e **p.m.** depois.",
        examples: [
          { en: "It's nine o'clock.", pt: "São nove horas." },
          { en: "It's half past ten.", pt: "São dez e meia." },
          { en: "The class starts at eight.", pt: "A aula começa às oito." },
        ],
        contrasts: [
          { wrong: "They are seven o'clock.", right: "It's seven o'clock.", why: "Para horas, o sujeito é sempre it." },
          { wrong: "The class starts in eight.", right: "The class starts at eight.", why: "Hora exata usa at." },
        ],
        tip: "**Thirteen** e **thirty** se distinguem pela sílaba forte: thirTEEN / THIRty. O mesmo vale para fourteen/forty e fifteen/fifty.",
      },
      guided: [
        mc("e1", "Como se diz “São oito e meia”?", ["It's half past eight.", "It's eight and half.", "They are half past eight."], 0, "Meia hora depois: half past + hora. O sujeito é it.", { c: ["half-past"] }),
        match("e2", "Associe a hora à forma falada.", [["7:00", "seven o'clock"], ["7:15", "a quarter past seven"], ["7:30", "half past seven"], ["7:45", "a quarter to eight"]],
          "Past conta depois da hora; to conta o que falta para a próxima.", { c: ["oclock", "half-past"] }),
        listen("e3", "It's a quarter to nine.", "Que horas são?", ["8:45", "9:15", "9:45"], 0, "A quarter to nine: faltam quinze para as nove, 8:45.", { c: ["half-past"], keepOrder: true }),
      ],
      independent: [
        cloze("e4", "What ___ is it?", ["time"], "A pergunta fixa é What time is it?", { c: ["what-time"], s: "vocabulary", tr: "Que horas são?" }),
        cloze("e5", "The class starts ___ ten.", ["at"], "Hora exata usa at.", { c: ["at-time"], tr: "A aula começa às dez." }),
        dict("e6", "It's seven o'clock.", "Hora cheia: número + o'clock.", { c: ["oclock"], alt: ["It is seven o'clock.", "It's 7 o'clock."] }),
        type("e7", "Diga em inglês: “São nove e meia.”", ["It's half past nine", "It is half past nine", "It's nine thirty", "It is nine thirty"], "Half past nine ou nine thirty.", { c: ["half-past"] }),
        fix("e8", "I get up in six.", ["I get up at six"], "Hora exata pede at.", { c: ["at-time"], prompt: "Corrija a preposição." }),
      ],
      application: [
        order("e9", "Monte a pergunta: “Que horas são?”", "What time is it?", "What time + is + it.", { c: ["what-time"], extra: ["are"] }),
        speak("e10", "Pergunte as horas e responda.", ["Excuse me, what time is it? It's half past seven."],
          { check: ["Fiz a pergunta completa.", "Respondi começando com It's.", "Repeti duas vezes."], c: ["what-time", "half-past"] }),
      ],
      summary: { points: ["What time is it? → It's…", "o'clock, half past, a quarter past, a quarter to.", "at + hora."], concepts: ["what-time", "oclock", "half-past", "at-time"] },
    }),

    lesson("l2", {
      title: "Dias, meses e as preposições certas",
      objective: "Você vai conseguir dizer em que dia ou mês algo acontece usando on e in.",
      minutes: 8,
      context: { kind: "message", title: "Mensagens sobre a agenda", lines: [
        { who: "Leo", en: "My English class is on Monday and Wednesday.", pt: "Minha aula de inglês é na segunda e na quarta." },
        { who: "Bia", en: "I study in the morning. And my birthday is in March!", pt: "Eu estudo de manhã. E meu aniversário é em março!" },
        { who: "Leo", en: "Mine is on July 10. I usually work at night.", pt: "O meu é em 10 de julho. Eu geralmente trabalho à noite." },
      ] },
      explanation: {
        summary: "Três preposições de tempo:\n- **at** + hora: *at eight*; e também *at night*\n- **on** + dia ou data: *on Monday*, *on July 10*\n- **in** + mês, ano ou parte do dia: *in March*, *in 2026*, *in the morning*",
        details: "Dias: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Meses: January, February, March, April, May, June, July, August, September, October, November, December. Sempre com maiúscula.",
        examples: [
          { en: "See you on Friday.", pt: "Até sexta." },
          { en: "My birthday is in March.", pt: "Meu aniversário é em março." },
          { en: "I study in the morning.", pt: "Eu estudo de manhã." },
        ],
        contrasts: [
          { wrong: "I work in Monday.", right: "I work on Monday.", why: "Dia da semana usa on." },
          { wrong: "I sleep in the night.", right: "I sleep at night.", why: "Night é exceção: at night." },
        ],
      },
      guided: [
        mc("e1", "Complete: “My class is ___ Tuesday.”", ["on", "in", "at"], 0, "Dia da semana usa on.", { c: ["on-day"], why: [undefined, "In é para meses, anos e partes do dia.", "At é para horas."] }),
        match("e2", "Associe a preposição ao uso.", [["at", "seven o'clock"], ["on", "Monday"], ["in", "March"]],
          "At para hora, on para dia, in para mês.", { c: ["at-time", "on-day", "in-month"] }),
        match("e3", "Associe o dia ao significado.", [["Monday", "segunda-feira"], ["Wednesday", "quarta-feira"], ["Friday", "sexta-feira"], ["Saturday", "sábado"], ["Sunday", "domingo"]],
          "Dias da semana têm sempre letra maiúscula em inglês.", { c: ["days"] }),
      ],
      independent: [
        cloze("e4", "My birthday is ___ June.", ["in"], "Mês usa in.", { c: ["in-month"], tr: "Meu aniversário é em junho." }),
        cloze("e5", "See you ___ Friday!", ["on"], "Dia usa on.", { c: ["on-day"], tr: "Até sexta!" }),
        dict("e6", "I work from Monday to Friday.", "From… to… marca o intervalo de dias.", { c: ["days"] }),
        fix("e7", "I study in Saturday.", ["I study on Saturday", "I study on Saturdays"], "Dia da semana pede on.", { c: ["on-day", "days"], prompt: "Corrija a preposição." }),
      ],
      application: [
        type("e8", "Diga em inglês: “Eu estudo de manhã.”", ["I study in the morning"], "Parte do dia: in the morning.", { c: ["in-month"] }),
        listen("e9", "The meeting is on Thursday at three.", "Quando é a reunião?", ["Quinta, às três", "Terça, às três", "Quinta, às treze"], 0, "Thursday = quinta-feira; at three = às três.", { c: ["days", "at-time"] }),
      ],
      summary: { points: ["at + hora (e at night).", "on + dia ou data.", "in + mês, ano, parte do dia."], concepts: ["days", "on-day", "in-month"] },
    }),

    lesson("l3", {
      title: "Sempre, às vezes, nunca",
      objective: "Você vai conseguir dizer com que frequência faz as coisas.",
      minutes: 8,
      context: { kind: "dialogue", title: "Hábitos de fim de semana", lines: [
        { who: "Ken", en: "I always get up late on Sunday.", pt: "Eu sempre levanto tarde no domingo." },
        { who: "Bia", en: "Not me. I usually go to the beach in the morning.", pt: "Eu não. Geralmente vou à praia de manhã." },
        { who: "Ken", en: "Do you work on Saturday?", pt: "Você trabalha no sábado?" },
        { who: "Bia", en: "Sometimes. But I'm never late!", pt: "Às vezes. Mas eu nunca me atraso!" },
      ] },
      explanation: {
        summary: "Advérbios de frequência, do mais para o menos frequente: **always** (sempre), **usually** (geralmente), **often** (com frequência), **sometimes** (às vezes), **never** (nunca).\n\nPosição: **antes do verbo principal** (*I always get up early*) e **depois do verbo to be** (*I'm never late*).",
        details: "**Never** já é negativo: não use don't com ele. *I never drink coffee* (e não “I don't never”). **Sometimes** também pode abrir a frase: *Sometimes I work on Saturday.*",
        examples: [
          { en: "I always have breakfast.", pt: "Eu sempre tomo café da manhã." },
          { en: "She is usually at home at night.", pt: "Ela geralmente está em casa à noite." },
          { en: "We never work on Sunday.", pt: "Nós nunca trabalhamos no domingo." },
        ],
        contrasts: [
          { wrong: "I get up always early.", right: "I always get up early.", why: "O advérbio vem antes do verbo principal." },
          { wrong: "I don't never drink coffee.", right: "I never drink coffee.", why: "Never já nega; duas negativas não combinam." },
        ],
      },
      guided: [
        mc("e1", "Qual frase está correta?", ["I always get up early.", "I get always up early.", "Always I get up early."], 0, "O advérbio vem antes do verbo principal.", { c: ["freq-position"] }),
        match("e2", "Associe o advérbio ao significado.", [["always", "sempre"], ["usually", "geralmente"], ["sometimes", "às vezes"], ["never", "nunca"]],
          "Quatro advérbios cobrem quase tudo no dia a dia.", { c: ["always-never", "usually-sometimes"] }),
        cloze("e3", "I ___ drink coffee at night. I don't like it.", ["never"], "Quem não gosta, nunca bebe: never.", { c: ["always-never"], s: "vocabulary" }),
      ],
      independent: [
        order("e4", "Monte: “Ela geralmente levanta cedo.”", "She usually gets up early.", "Sujeito + advérbio + verbo.", { c: ["freq-position", "usually-sometimes"] }),
        cloze("e5", "He is ___ late. He arrives on time every day.", ["never"], "Com to be, o advérbio vem depois: He is never late.", { c: ["always-never", "freq-position"], s: "vocabulary" }),
        fix("e6", "I go sometimes to the beach.", ["I sometimes go to the beach", "Sometimes I go to the beach"], "O advérbio vem antes do verbo principal (ou no início).", { c: ["freq-position", "usually-sometimes"], prompt: "Corrija a ordem." }),
        dict("e7", "I always have breakfast at home.", "Always antes do verbo have.", { c: ["always-never"] }),
      ],
      application: [
        type("e8", "Diga em inglês: “Eu geralmente estudo à noite.”", ["I usually study at night"], "I + usually + verbo.", { c: ["usually-sometimes"] }),
        speak("e9", "Diga três hábitos seus com frequências diferentes.", ["I always have breakfast. I sometimes work on Saturday. I never get up late."],
          { mode: "respond", check: ["Usei três advérbios diferentes.", "Coloquei o advérbio antes do verbo.", "Não usei don't com never."], c: ["freq-position"] }),
      ],
      summary: { points: ["always > usually > often > sometimes > never.", "Antes do verbo principal; depois do verbo to be.", "Never já é negativo."], concepts: ["always-never", "usually-sometimes", "freq-position"] },
    }),

    lesson("l4", {
      title: "Vamos marcar?",
      objective: "Você vai conseguir combinar um encontro: propor dia, hora e lugar e confirmar.",
      minutes: 9,
      context: { kind: "dialogue", title: "Combinando um café", lines: [
        { who: "Leo", en: "Are you free on Friday?", pt: "Você está livre na sexta?" },
        { who: "Ana", en: "In the morning, no. But I'm free in the afternoon.", pt: "De manhã, não. Mas estou livre à tarde." },
        { who: "Leo", en: "Great. Let's meet at four at the cafe.", pt: "Ótimo. Vamos nos encontrar às quatro no café." },
        { who: "Ana", en: "Perfect. See you on Friday at four!", pt: "Perfeito. Até sexta às quatro!" },
      ] },
      explanation: {
        summary: "Para combinar algo:\n- Perguntar disponibilidade: **Are you free on Friday?**\n- Propor: **Let's meet at four.** (Let's + verbo = vamos…)\n- Perguntar o horário: **What time?**\n- Confirmar: **See you on Friday at four.**",
        details: "Para recusar com educação: **Sorry, I'm busy on Friday.** Para propor outra opção: **How about Saturday?** A ordem natural é dia e depois hora: *on Friday at four*.",
        examples: [
          { en: "Are you free on Saturday?", pt: "Você está livre no sábado?" },
          { en: "Let's meet at six.", pt: "Vamos nos encontrar às seis." },
          { en: "Sorry, I'm busy. How about Sunday?", pt: "Desculpe, estou ocupado. Que tal domingo?" },
        ],
        contrasts: [
          { wrong: "Let's to meet at six.", right: "Let's meet at six.", why: "Depois de Let's, o verbo vem sem to." },
          { wrong: "Are you free in Friday?", right: "Are you free on Friday?", why: "Dia da semana usa on." },
        ],
      },
      guided: [
        mc("e1", "Como propor um encontro às seis?", ["Let's meet at six.", "Let's to meet at six.", "We meet in six."], 0, "Let's + verbo sem to; hora com at.", { c: ["lets-meet"] }),
        match("e2", "Associe a frase à função.", [["Are you free on Friday?", "perguntar se a pessoa pode"], ["Let's meet at four.", "propor um horário"], ["Sorry, I'm busy.", "recusar com educação"], ["See you on Friday!", "confirmar e se despedir"]],
          "Cada frase cumpre um passo do combinado.", { c: ["are-you-free", "lets-meet"] }),
        cloze("e3", "Are you ___ on Saturday?", ["free"], "Free = livre, disponível.", { c: ["are-you-free"], s: "vocabulary", tr: "Você está livre no sábado?" }),
      ],
      independent: [
        cloze("e4", "___ meet at the station.", ["Let's"], "Let's + verbo = vamos…", { c: ["lets-meet"], tr: "Vamos nos encontrar na estação." }),
        order("e5", "Monte: “Você está livre na sexta?”", "Are you free on Friday?", "Are you free + on + dia.", { c: ["are-you-free", "on-day"], extra: ["in"] }),
        dict("e6", "Let's meet at six.", "Let's + meet + at + hora.", { c: ["lets-meet"], alt: ["Let's meet at 6."] }),
        fix("e7", "Let's to meet on Monday.", ["Let's meet on Monday"], "Depois de Let's não se usa to.", { c: ["lets-meet"], prompt: "Corrija o erro." }),
      ],
      application: [
        dialog("e8", "Uma colega quer marcar um estudo em grupo.", [
          { npc: ["Are you free on Wednesday?", "Você está livre na quarta?"], options: [
            ["Sorry, I'm busy on Wednesday. How about Thursday?", true, "Ela olha a agenda: “Thursday is fine.”", "Recusou com educação e propôs outro dia."],
            ["No.", false, "Ela fica sem graça.", "Seco demais: explique e proponha outra opção."],
          ] },
          { npc: ["Thursday is fine. What time?", "Quinta pode ser. A que horas?"], options: [
            ["Let's meet at seven.", true, "Ela confirma: “See you on Thursday at seven!”", "Proposta clara com Let's e at."],
            ["Let's to meet in seven.", false, "Ela entende, mas a frase tem dois erros.", "Sem to depois de Let's; hora com at."],
          ] },
        ], "Combinar: disponibilidade, proposta e confirmação.", { c: ["are-you-free", "lets-meet"] }),
        type("e9", "Pergunte em inglês se a pessoa está livre no domingo.", ["Are you free on Sunday"], "Are you free on + dia?", { c: ["are-you-free"] }),
        write("e10", "Escreva uma mensagem curta marcando um encontro: pergunte se a pessoa está livre, proponha hora e lugar.",
          { frame: ["Are you free on …?", "Let's meet at …"], min: 10, check: ["Perguntei a disponibilidade.", "Usei Let's + verbo sem to.", "Usei on para o dia e at para a hora."], model: "Hi! Are you free on Saturday? Let's meet at ten at the cafe.", c: ["are-you-free", "lets-meet"] }),
      ],
      summary: { points: ["Are you free on Friday?", "Let's meet at four (sem to).", "Recusar e propor: Sorry, I'm busy. How about…?"], concepts: ["are-you-free", "lets-meet"] },
    }),
  ],

  checkpoint: {
    intro: "Horários, dias e combinados em situações novas.",
    a: [
      listen("q1", "It's half past two.", "Que horas são?", ["2:30", "2:15", "1:30"], 0, "Half past two = duas e meia.", { c: ["half-past"], keepOrder: true }),
      cloze("q2", "The movie starts ___ nine.", ["at"], "Hora exata usa at.", { c: ["at-time"] }),
      cloze("q3", "We have a test ___ Monday.", ["on"], "Dia da semana usa on.", { c: ["on-day"] }),
      fix("q4", "She gets always up at six.", ["She always gets up at six"], "O advérbio vem antes do verbo principal.", { c: ["freq-position"], prompt: "Corrija a ordem." }),
      order("q5", "Monte: “Vamos nos encontrar às oito.”", "Let's meet at eight.", "Let's + verbo + at + hora.", { c: ["lets-meet"], extra: ["to"] }),
      dict("q6", "Excuse me, what time is it now?", "A pergunta das horas, com now no final.", { c: ["what-time"] }),
      mc("q7", "“I never eat meat.” O que a pessoa diz?", ["Que nunca come carne", "Que sempre come carne", "Que às vezes come carne"], 0, "Never = nunca.", { c: ["always-never"], s: "vocabulary" }),
      type("q8", "Diga em inglês: “Meu aniversário é em maio.”", ["My birthday is in May"], "Mês usa in.", { c: ["in-month"] }),
      mc("q9", "Qual dia vem depois de Tuesday?", ["Wednesday", "Thursday", "Monday"], 0, "Monday, Tuesday, Wednesday.", { c: ["days"], s: "vocabulary" }),
      dialog("q10", "Um amigo liga para combinar um jantar.", [
        { npc: ["Are you free on Saturday night?", "Você está livre no sábado à noite?"], options: [
          ["Yes, I am. What time?", true, "Ele propõe um horário.", "Confirmou e perguntou a hora."],
          ["Yes, I do. What time?", false, "Soa estranho.", "A pergunta é com to be: Yes, I am."],
        ] },
        { npc: ["Let's meet at eight.", "Vamos nos encontrar às oito."], options: [
          ["Great. See you on Saturday at eight!", true, "Combinado.", "Confirmação com dia e hora."],
          ["Great. See you in Saturday in eight!", false, "Ele entende, mas as preposições estão erradas.", "On para dia, at para hora."],
        ] },
      ], "Confirmar com on + dia e at + hora.", { c: ["are-you-free", "on-day", "at-time"] }),
    ],
    b: [
      listen("q1", "It's a quarter past six.", "Que horas são?", ["6:15", "6:45", "5:45"], 0, "A quarter past six = seis e quinze.", { c: ["half-past"], keepOrder: true }),
      cloze("q2", "I was born ___ 1998.", ["in"], "Ano usa in.", { c: ["in-month"] }),
      cloze("q3", "It's ten ___. (10:00)", ["o'clock"], "Hora cheia: o'clock.", { c: ["oclock"], s: "vocabulary" }),
      fix("q4", "I don't never work at night.", ["I never work at night"], "Never já é negativo: não use don't.", { c: ["always-never"], prompt: "Corrija o erro." }),
      order("q5", "Monte: “Eu geralmente almoço em casa.”", "I usually have lunch at home.", "Advérbio antes do verbo principal.", { c: ["usually-sometimes", "freq-position"] }),
      dict("q6", "Are you free on Sunday?", "Pergunta de disponibilidade.", { c: ["are-you-free"] }),
      mc("q7", "Qual está correta?", ["He is always happy.", "He always is happy.", "Always he is happy."], 0, "Com to be, o advérbio vem depois do verbo.", { c: ["freq-position"] }),
      type("q8", "Diga em inglês: “A aula começa às sete.”", ["The class starts at seven", "The class starts at 7", "The lesson starts at seven"], "At + hora.", { c: ["at-time"] }),
      mc("q9", "Qual dia vem antes de Friday?", ["Thursday", "Tuesday", "Saturday"], 0, "Wednesday, Thursday, Friday.", { c: ["days"], s: "vocabulary" }),
      dialog("q10", "Você precisa marcar uma consulta por telefone.", [
        { npc: ["We have a time on Tuesday at ten. Is that okay?", "Temos um horário na terça às dez. Pode ser?"], options: [
          ["Sorry, I'm busy in the morning. How about the afternoon?", true, "A atendente procura outro horário.", "Explicou e propôs alternativa."],
          ["No, I busy.", false, "Ela não entende bem.", "Falta o verbo: I'm busy."],
        ] },
        { npc: ["How about three o'clock?", "Que tal às três?"], options: [
          ["Perfect. See you on Tuesday at three.", true, "Consulta marcada.", "Confirmação completa."],
          ["Perfect. Let's to meet.", false, "Fica vago.", "Sem to depois de Let's, e faltou confirmar dia e hora."],
        ] },
      ], "Recusar com educação, propor e confirmar.", { c: ["lets-meet", "on-day"] }),
    ],
    production: write("t1", "Descreva sua semana: o que você faz em quais dias e horários, e com que frequência.",
      { mode: "free", min: 30, check: ["Usei at, on e in corretamente.", "Usei pelo menos dois advérbios de frequência.", "Coloquei o advérbio antes do verbo.", "Citei pelo menos dois dias da semana."],
        model: "I work from Monday to Friday. I always get up at six. On Wednesday I study English at seven. I usually go to the beach on Saturday in the morning. I never work on Sunday.", c: ["on-day", "at-time", "freq-position"] }),
  },

  activities: {
    reading: activity("reading", {
      title: "A agenda da semana",
      goal: "Ler uma agenda simples e encontrar dias, horas e frequência.",
      context: { kind: "list", title: "Bia's week", lines: [
        { en: "Monday and Wednesday: English class at seven in the evening.", pt: "Segunda e quarta: aula de inglês às sete da noite." },
        { en: "Friday: dinner with Leo at half past eight.", pt: "Sexta: jantar com o Leo às oito e meia." },
        { en: "Saturday: I usually go to the beach in the morning.", pt: "Sábado: geralmente vou à praia de manhã." },
        { en: "Sunday: I never work. I always have lunch with my parents.", pt: "Domingo: nunca trabalho. Sempre almoço com meus pais." },
      ] },
      exercises: [
        mc("r1", "Quando é a aula de inglês?", ["Segunda e quarta, às sete", "Terça e quinta, às sete", "Sexta, às oito e meia"], 0, "Monday and Wednesday at seven.", { c: ["days", "at-time"], s: "reading" }),
        mc("r2", "A que horas é o jantar com o Leo?", ["8:30", "8:15", "7:30"], 0, "Half past eight = 8:30.", { c: ["half-past"], s: "reading", keepOrder: true }),
        type("r3", "Com que frequência a Bia trabalha no domingo? Responda com uma palavra em inglês.", ["never"], "I never work.", { c: ["always-never"], s: "reading" }),
        cloze("r4", "On Saturday she ___ goes to the beach in the morning.", ["usually"], "O texto diz: I usually go to the beach.", { c: ["usually-sometimes"], s: "reading" }),
      ],
    }),
    listening: activity("listening", {
      title: "Recado na caixa postal",
      goal: "Entender dia, hora e lugar em um recado falado.",
      context: { kind: "text", title: "Transcrição", lines: [{ who: "Leo", en: "Hi, Ana. Are you free on Thursday? Let's meet at half past six at the station. See you!", pt: "Oi, Ana. Você está livre na quinta? Vamos nos encontrar às seis e meia na estação. Até!" }] },
      exercises: [
        listen("a1", "Hi, Ana. Are you free on Thursday? Let's meet at half past six at the station. See you!", "Em que dia é o encontro?", ["Quinta", "Terça", "Sexta"], 0, "Thursday = quinta-feira.", { c: ["days"] }),
        listen("a2", "Hi, Ana. Are you free on Thursday? Let's meet at half past six at the station. See you!", "A que horas?", ["6:30", "6:15", "7:30"], 0, "Half past six = seis e meia.", { c: ["half-past"], keepOrder: true }),
        dict("a3", "Are you free on Thursday?", "Pergunta de disponibilidade com on + dia.", { c: ["are-you-free", "on-day"], prompt: "Digite a pergunta do recado." }),
      ],
    }),
    writing: activity("writing", {
      title: "Marcando por mensagem",
      goal: "Escrever uma mensagem combinando dia, hora e lugar.",
      exercises: [
        write("w1", "Escreva uma mensagem para um amigo marcando um encontro nesta semana.",
          { frame: ["Hi! Are you free on …?", "Let's meet at … at …", "See you …"], min: 14, check: ["Perguntei a disponibilidade.", "Propus dia, hora e lugar.", "Usei on, at e Let's corretamente."], model: "Hi, Leo! Are you free on Saturday? Let's meet at ten at the cafe. See you on Saturday!", c: ["are-you-free", "lets-meet"] }),
      ],
    }),
    speaking: activity("speaking", {
      title: "Minha semana em voz alta",
      goal: "Falar dos seus dias, horários e hábitos.",
      exercises: [
        speak("s1", "Conte o que você faz durante a semana, com dias, horas e frequência.", ["I work from Monday to Friday. I always get up at six. On Saturday I usually study in the morning."],
          { mode: "respond", check: ["Citei dias e horas.", "Usei at, on e in.", "Usei dois advérbios de frequência.", "Ouvi o modelo e comparei."], c: ["on-day", "freq-position"] }),
      ],
    }),
    mission: activity("mission", {
      title: "Missão: marcar e remarcar",
      goal: "Combinar um compromisso e resolver um conflito de horário.",
      exercises: [
        dialog("m1", "Você liga para um salão para marcar um horário.", [
          { npc: ["Good morning. How can I help you?", "Bom dia. Como posso ajudar?"], options: [
            ["Hi. Are you open on Saturday?", true, "A atendente responde: “Yes, from nine to five.”", "Pergunta clara com on + dia."],
            ["Hi. You open in Saturday?", false, "Ela entende com esforço.", "Faltou o verbo, e dia usa on."],
          ] },
          { npc: ["Yes. Is ten o'clock okay?", "Sim. Às dez horas pode ser?"], options: [
            ["Sorry, I'm busy at ten. How about half past eleven?", true, "Ela confere a agenda.", "Recusou e propôs outro horário."],
            ["No, I can't.", false, "Ela espera, sem saber o que propor.", "Faltou sugerir outra opção."],
          ] },
          { npc: ["Half past eleven is fine. See you on Saturday.", "Onze e meia está bem. Até sábado."], options: [
            ["Great. Thank you. See you on Saturday!", true, "Horário marcado.", "Confirmação e agradecimento."],
            ["Good night.", false, "Ela estranha: ainda é de manhã.", "Despedida inadequada para o horário."],
          ] },
        ], "Perguntar, negociar o horário e confirmar.", { c: ["on-day", "half-past", "at-time"] }),
        write("m2", "Escreva o lembrete que você anotaria na agenda, em inglês.", { min: 6, check: ["Tem o dia.", "Tem a hora.", "Usei on e at."], model: "Hair salon on Saturday at half past eleven.", c: ["on-day", "at-time"] }),
      ],
      outside: {
        title: "Fora do app: sua agenda em inglês",
        instructions: "Escreva três compromissos reais desta semana em inglês, com dia e hora (por exemplo: “Dentist on Tuesday at three”). Depois leia os três em voz alta.",
        checklist: ["Escrevi três compromissos com on + dia e at + hora.", "Li os três em voz alta.", "Disse as horas sem traduzir palavra por palavra."],
      },
    }),
  },
});
