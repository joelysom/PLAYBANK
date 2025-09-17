import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { firebaseConfig } from "./firebase";

// Inicializa FirebaseApp (usa a mesma config do seu firebase.js)
const firebaseApp = initializeApp(firebaseConfig, "gemini-app");
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

export async function sendToGemini(message) {
  try {
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (err) {
    return "Desculpe, não consegui responder agora.";
  }
}