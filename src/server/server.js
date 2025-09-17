
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sendToGemini } from "./gemini.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/gemini", async (req, res) => {
	const { message } = req.body;
	if (!message) {
		return res.status(400).json({ error: "Mensagem não fornecida." });
	}
	try {
		const response = await sendToGemini(message);
		res.json({ text: response });
	} catch (err) {
		res.status(500).json({ error: "Erro ao processar a mensagem." });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`API Gemini rodando na porta ${PORT}`);
});
