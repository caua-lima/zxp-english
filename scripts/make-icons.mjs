// Gera os ícones PNG do PWA a partir do desenho da marca. Rodar: node scripts/make-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const mark = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#5b3df5"/>
  <g transform="translate(${pad} ${pad}) scale(${(512 - 2 * pad) / 48})">
    <path d="M13 13h22l-13 10h11L15 36l5-10h-9z" fill="#ffc21a" stroke="#1a1b2e" stroke-width="2.2" stroke-linejoin="round"/>
  </g>
</svg>`;

const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect x="2" y="2" width="44" height="44" rx="13" fill="#5b3df5" stroke="#1a1b2e" stroke-width="2.5"/>
  <path d="M13 13h22l-13 10h11L15 36l5-10h-9z" fill="#ffc21a" stroke="#1a1b2e" stroke-width="2.2" stroke-linejoin="round"/>
</svg>`;

mkdirSync("public", { recursive: true });
await sharp(Buffer.from(rounded), { density: 600 }).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(Buffer.from(rounded), { density: 1200 }).resize(512, 512).png().toFile("public/icon-512.png");
// Maskable: fundo cheio e desenho dentro da zona segura (80%).
await sharp(Buffer.from(mark(96)), { density: 300 }).resize(512, 512).png().toFile("public/icon-maskable-512.png");
await sharp(Buffer.from(mark(40)), { density: 300 }).resize(180, 180).png().toFile("src/app/apple-icon.png");
console.log("ícones gerados");
