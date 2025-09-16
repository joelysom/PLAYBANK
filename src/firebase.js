// Importa SDKs que vamos usar
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuração gerada no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAf1UfDcJQK-bmrc7hbl5cLq_LPdjbLAuI",
  authDomain: "playbank-5b183.firebaseapp.com",
  projectId: "playbank-5b183",
  storageBucket: "playbank-5b183.firebasestorage.app",
  messagingSenderId: "238600451145",
  appId: "1:238600451145:web:97e3e169b383c3bf7fbb98",
  measurementId: "G-60WZ0Q8N7S"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const db = getFirestore(app);     // Banco de dados
export const auth = getAuth(app);        // Autenticação
export const storage = getStorage(app);  // Uploads (imagens, etc.)
