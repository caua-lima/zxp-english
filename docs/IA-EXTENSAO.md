# Extensão opcional com IA (não implementada)

O app **não depende de IA** e não tem chatbot. Esta é uma proposta documentada para o futuro; nada aqui está ativo.

## Princípios
- Opcional e desligada por padrão; o usuário fornece a própria chave, guardada só no aparelho.
- Nenhuma resposta de IA conta como evidência de proficiência nem altera XP, revisão ou progressão.
- Envio de qualquer texto do usuário só após consentimento explícito, mostrando o que será enviado.
- Falha da IA nunca bloqueia o estudo.

## Usos possíveis
1. **Feedback de escrita**: sugerir correções para o texto do usuário, marcado como "sugestão automática, pode conter erros".
2. **Conversa guiada**: simular o diálogo da missão, com instruções para ficar no nível da unidade.
3. **Explicar um erro** do caderno com outros exemplos.

## Contrato proposto (`src/ai`)
```ts
interface AiProvider {
  id: string;
  review(input: { text: string; level: "a1" | "a2" | "b1" | "b2"; goal: string }): Promise<{ suggestions: string[]; disclaimer: string }>;
}
```
O app só deve chamar o provedor após consentimento, e deve exibir sempre o `disclaimer`.
