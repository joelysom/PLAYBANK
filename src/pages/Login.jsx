
import React, { useState, useRef } from "react";
import tudum from "../assets/tudum/tudum.mp4";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import bot from "../assets/BOT.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/toast";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // For replaying video if needed
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email === "admin@admin.com" && password === "admin") {
        // Login do admin (sem usar Firebase Auth)
        notifySuccess("Login administrativo realizado com sucesso!");
        navigate("/admin");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      notifySuccess("Login realizado com sucesso!");
      setShowVideo(true);
      setVideoKey(prev => prev + 1); // Forçar reload do vídeo
    } catch (err) {
      let msg = "Erro ao fazer login.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "E-mail/CPF ou senha inválidos.";
      } else if (err.code === "auth/invalid-email") {
        msg = "E-mail inválido.";
      }
      notifyError(msg);
      setError(msg);
    }
  };

  // Handler para quando o vídeo termina
  const handleVideoEnd = () => {
    setShowVideo(false);
    setTimeout(() => navigate("/home"), 100); // Pequeno delay para sumir o vídeo
  };

  // Handler para pular para 3s ao clicar/tocar
  const handleSkip = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime < 3) {
        videoRef.current.currentTime = 3;
      }
    }
  };

  return (
    <div className="login-container">
      {/* Vídeo de login */}
      {showVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'black',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleSkip}
          onTouchStart={handleSkip}
        >
          <video
            key={videoKey}
            ref={videoRef}
            src={tudum}
            autoPlay
            onEnded={handleVideoEnd}
            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
          />
        </div>
      )}

      {/* Logo e título */}
      <div className="login-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="bank-name">LevelUp Bank</h1>
        <p className="subtitle">Suba de nível com seu dinheiro.<br />Faça login para começar.</p>
      </div>

      {/* Formulário */}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          className="input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn-login" type="submit">Entrar</button>
        {error && <div className="login-error">{error}</div>}
        <div className="options">
          <a href="#">Esqueci minha senha</a>
          <a href="#">Entrar com biometria</a>
        </div>
      </form>

      {/* Bot assistente */}
      <div className="bot-section">
        <img src={bot} alt="Assistente BOT" className="bot-img" />
        <div className="bot-msg">Qualquer dúvida, estou aqui!</div>
      </div>

      {/* Cadastro */}
      <div className="register">
        <p>
          Ainda não tem conta? <a href="/register">Criar agora</a>
        </p>
      </div>
    </div>
  );
}
