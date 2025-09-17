
import React, { useState } from "react";
import "./register.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bot from "../assets/BOT.png";
import { notifySuccess, notifyError, notifyInfo } from "../utils/toast";

function Register() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Account credentials
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  // Step 2 - Personal information
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [apelido, setApelido] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [identificacao, setIdentificacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  
  // Status messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault();
    setError("");
    
    if (senha !== confirmarSenha) {
      notifyError("As senhas não coincidem!");
      setError("As senhas não coincidem!");
      return;
    }
    
    if (senha.length < 6) {
      notifyError("A senha deve ter pelo menos 6 caracteres.");
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    
    notifyInfo("Ótimo! Agora vamos completar seu perfil.");
    setCurrentStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nomeCompleto || !apelido || !dataNascimento) {
      setError("Por favor, preencha os campos obrigatórios.");
      return;
    }

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      
      const userData = {
        nomeCompleto,
        apelido,
        dataNascimento,
        genero,
        identificacao,
        telefone,
        curso,
        instituicao,
        cidade,
        estado,
        saldo: 500, // Crédito inicial
        limiteCredito: 500, // Limite de crédito inicial
        createdAt: new Date(),
        lastLogin: new Date(),
        status: "ativo",
        role: "user",
        historico: [],
        fatura: {
          valor: 0,
          vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias a partir de hoje
          status: "em_aberto"
        },
        preferencias: {
          tema: "claro",
          notificacoes: true
        }
      };

      // Salvar dados no Firestore
      try {
        const db = getFirestore();
        await setDoc(doc(db, "users", userCredential.user.uid), {
          ...userData,
          uid: userCredential.user.uid, // Adicionar o UID do usuário
          email: email, // Adicionar o email
          saldo: 500, // Garantir que o saldo inicial seja 500
          limiteCredito: 500, // Garantir que o limite inicial seja 500
          fatura: {
            valor: 0,
            vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "em_aberto"
          }
        });
        
        // Verificar se os dados foram salvos corretamente
        const savedData = await getDoc(doc(db, "users", userCredential.user.uid));
        console.log("Dados salvos:", savedData.data());
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
        throw error;
      }

      notifySuccess("Conta criada com sucesso!");
      setSuccess("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      let msg = "Erro ao cadastrar usuário.";
      if (err.code === "auth/email-already-in-use") {
        msg = "E-mail já cadastrado.";
      } else if (err.code === "auth/invalid-email") {
        msg = "E-mail inválido.";
      }
      setError(msg);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>{currentStep === 1 ? "Crie sua Conta" : "Complete seu Perfil"}</h1>
        
        {currentStep === 1 ? (
          <form onSubmit={handleNextStep}>
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
              Próximo
            </button>
            {error && <div className="register-error">{error}</div>}
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nome Completo *"
                value={nomeCompleto}
                onChange={e => setNomeCompleto(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Apelido / Nome de usuário *"
                value={apelido}
                onChange={e => setApelido(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="date"
                placeholder="Data de Nascimento *"
                value={dataNascimento}
                onChange={e => setDataNascimento(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <select
                value={genero}
                onChange={e => setGenero(e.target.value)}
              >
                <option value="">Selecione o Gênero (opcional)</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_informar">Prefiro não informar</option>
              </select>
            </div>
            <div className="input-group">
              <select
                value={identificacao}
                onChange={e => setIdentificacao(e.target.value)}
              >
                <option value="">Como se identifica? (opcional)</option>
                <option value="cis">Cisgênero</option>
                <option value="trans">Transgênero</option>
                <option value="outro">Outro</option>
                <option value="nao_informar">Prefiro não informar</option>
              </select>
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Curso (opcional)"
                value={curso}
                onChange={e => setCurso(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Instituição / Faculdade (opcional)"
                value={instituicao}
                onChange={e => setInstituicao(e.target.value)}
              />
            </div>
            <div className="input-group location-group">
              <input
                type="text"
                placeholder="Cidade (opcional)"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
              />
              <input
                type="text"
                placeholder="Estado (opcional)"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="button" className="btn-voltar" onClick={() => setCurrentStep(1)}>
                Voltar
              </button>
              <button type="submit" className="btn-continuar">
                Finalizar Cadastro
              </button>
            </div>
            {error && <div className="register-error">{error}</div>}
            {success && <div className="register-success">{success}</div>}
          </form>
        )}

        {currentStep === 1 && (
          <p className="link-login">
            Já tem conta? <a href="/login">Entrar</a>
          </p>
        )}
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
