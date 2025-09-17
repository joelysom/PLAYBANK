import React, { useState, useEffect } from "react";
import "../styles/ConfigPage.css";
import { FaUser, FaShieldAlt, FaGift, FaLock, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import BOT from "../assets/BOT.png";
import { useAuth } from "../context/AuthContext.jsx";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ConfigPage() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);
  return (
    <div className="config-container">
      <header className="user-header">
        <div className="user-avatar">
          {userData?.nomeCompleto?.charAt(0) || '👤'}
        </div>
        <div className="user-info">
          <h2>{userData?.nomeCompleto || 'Carregando...'}</h2>
          <p>Banco 032</p>
          <p>agência 0001 Cc {user?.uid?.slice(-8) || '--------'} - 0</p>
          <span>@{userData?.apelido || 'usuario'}</span>
        </div>
      </header>

      <main className="menu-options">
        <button className="menu-btn">
          <FaUser className="icon" /> Dados Pessoais
        </button>
        <button className="menu-btn">
          <FaShieldAlt className="icon" /> Central de Segurança
        </button>
        <button className="menu-btn">
          <FaGift className="icon" /> Indique e Ganhe
        </button>
        <button className="menu-btn">
          <FaLock className="icon" /> Privacidade
        </button>
        <button className="menu-btn">
          <FaQuestionCircle className="icon" /> Central de Ajuda
        </button>
        <button className="menu-btn" onClick={() => { 
          logout();
          navigate('/login');
        }}>
          <FaSignOutAlt className="icon" /> Sair da Conta
        </button>
      </main>

      <footer className="bopito-card">
        <img src={BOT} alt="Bopito" className="bopito-img" />
        <button className="bopito-btn">Fale com Bopito</button>
      </footer>
    </div>
  );
}
