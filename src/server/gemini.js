const SYSTEM_PROMPT = `
Você é Bopito, um assistente virtual do PlayBank, um banco digital para jovens e adolescentes.
Responda sempre de forma amigável, educativa, clara e segura.
Nunca peça dados sensíveis como CPF, número de conta ou senhas.
Explique termos bancários de forma simples e incentive educação financeira.
Seja sempre breve, objetivo e use linguagem simples e curta, adequada para jovens. Responda em no máximo 3 frases curtas.
`;

import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyBzD4imKvc9yyWchF7Knf1EE7SXp9kRKf0" })],
  model: gemini15Flash
});

export async function sendToGemini(message) {
  try {
    const prompt = `${SYSTEM_PROMPT}\nUsuário: ${message}`;
    const { text } = await ai.generate(prompt);
    return text;
  } catch (err) {
    return 'Desculpe, não consegui responder agora.';
  }
}
