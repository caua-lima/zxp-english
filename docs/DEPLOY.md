# Deploy na Vercel

O app é estático: não usa banco, variáveis de ambiente nem funções de servidor.

1. Confirme localmente: `npm run typecheck && npm run lint && npm test && npm run test:e2e`.
2. Em vercel.com, **Add New → Project** e importe `caua-lima/zxp-english`.
3. Framework: Next.js (detectado). Build: `next build`. Nenhuma variável de ambiente.
4. Deploy. Cada `git push origin main` gera um novo deploy automaticamente depois de importado.

Observações:
- Este repositório **não** publica nada sozinho; a importação na Vercel é um passo seu.
- O progresso é local ao navegador de cada pessoa: o deploy não guarda dados de ninguém.
- O áudio usa a voz sintética do navegador e funciona melhor no Chrome/Edge/Safari atuais.
- Se a Vercel alertar sobre versão do Node, use 20 ou 22.
- O arquivo `public/sw.js` (service worker) é servido pela Vercel com revalidação; para invalidar caches antigos depois de uma mudança grande, aumente `CACHE` em `sw.js`.
