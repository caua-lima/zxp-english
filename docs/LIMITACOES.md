# Limitações reais

- **Sem revisão humana especializada** do conteúdo ([REVISAO-EDITORIAL.md](REVISAO-EDITORIAL.md)).
- **Sem sincronização entre aparelhos**: o progresso é local; use o backup JSON para mover.
- **Áudio sintético**: usa a voz do navegador; qualidade e sotaque variam por sistema. Não há gravação de referência nativa.
- **Sem reconhecimento de fala**: a fala é gravada e **autoavaliada**; o app não corrige pronúncia.
- **Respostas abertas** (escrita/fala) não são corrigidas automaticamente.
- **Respostas digitadas**: a lista de respostas aceitas é finita; respostas válidas não previstas podem ser marcadas como erro.
- Progresso no curso não é prova de proficiência CEFR.
- Testado em Chromium (celular emulado); outros navegadores e leitores de tela reais não foram testados.
- Cinco avisos "high" do `npm audit` na cadeia de dev do ESLint (não afetam o site publicado).
