
import React, { useState, useRef } from "react";
import "../styles/BopitoChat.css";
import { sendToGemini } from "../gemini";
import BOT from "../assets/BOT.png";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";

export default function BopitoChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Eu sou o Bopito, seu assistente IA. Como posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const response = await sendToGemini(input);
      setMessages((msgs) => [...msgs, { sender: "bot", text: response }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Desculpe, houve um erro ao responder." }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="bopito-chat-container bopito-chat-fullscreen">
      <div className="bopito-chat-header">
        <button className="bopito-back-btn" title="Voltar para Configurações" onClick={() => navigate('/config')}>
          <AiOutlineArrowLeft size={24} />
        </button>
        <img src={BOT} alt="Bopito" className="bopito-chat-botimg" />
        <span>Bopito IA</span>
        <button className="bopito-home-btn" title="Ir para Home" onClick={() => navigate('/home')}>
          <AiOutlineHome size={24} />
        </button>
      </div>
      <div className="bopito-chat-messages">
        {messages.map((msg, i) => (
          msg.sender === "bot"
            ? <div key={i} className={`bopito-msg bot`} dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
            : <div key={i} className={`bopito-msg user`}>{msg.text}</div>
        ))}
        {loading && <div className="bopito-msg bot">Bopito está digitando...</div>}
        <div ref={chatEndRef} />
      </div>
      <form className="bopito-chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>Enviar</button>
      </form>
    </div>
  );
}
