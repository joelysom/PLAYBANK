
import React, { useState } from "react";
import "./register.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import bot from "../assets/BOT.png";


function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setSuccess("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      let msg = "Erro ao cadastrar usuário.";
      if (err.code === "auth/email-already-in-use") {
        msg = "E-mail já cadastrado.";
      } else if (err.code === "auth/invalid-email") {
        msg = "E-mail inválido.";
      } else if (err.code === "auth/weak-password") {
        msg = "A senha deve ter pelo menos 6 caracteres.";
      }
      setError(msg);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Crie sua Conta</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-continuar">
            Cadastrar
          </button>
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}
        </form>

        <p className="link-login">
          Já tem conta? <a href="/login">Entrar</a>
        </p>
      </div>

      <div className="help-section">
        <div className="help-box">
          <p>
            Precisa de ajuda? <strong>O Upito</strong> vai te ajudar:
          </p>
        </div>
        <img src={bot} alt="Upito" className="mascote" />
      </div>
    </div>
  );
}

export default Register;
