// Gera os ícones PNG do PWA a partir da marca ZXP English (Z de traço violeta sobre ônix).
// Rodar: node scripts/make-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const Z = (stroke) => `<polyline points="30,47 170,47 30,153 170,153" fill="none" stroke="#9B8CFF" stroke-width="${stroke}" stroke-linejoin="miter" stroke-linecap="butt"/>`;

const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" rx="44" fill="#10100E"/>${Z(34)}</svg>`;
// Maskable: fundo cheio e desenho dentro da zona segura (cerca de 70%).
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#10100E"/><g transform="translate(30 30) scale(0.7)">${Z(34)}</g></svg>`;
// Apple: sem cantos arredondados (o iOS arredonda sozinho).
const apple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#10100E"/><g transform="translate(16 16) scale(0.84)">${Z(34)}</g></svg>`;

mkdirSync("public", { recursive: true });
await sharp(Buffer.from(rounded), { density: 600 }).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(Buffer.from(rounded), { density: 1200 }).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(Buffer.from(maskable), { density: 600 }).resize(512, 512).png().toFile("public/icon-maskable-512.png");
await sharp(Buffer.from(apple), { density: 600 }).resize(180, 180).png().toFile("src/app/apple-icon.png");
console.log("ícones gerados");
