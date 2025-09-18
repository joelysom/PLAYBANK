import React, { useEffect, useState } from "react";
import logoMini from "../assets/logomini.svg";
import cartaoImg from "../assets/images/cartao.svg";
import "../styles/FaturaPage.css";
import { IoClose } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getFirestore, doc, getDoc } from "firebase/firestore";


const FaturaPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
      setLoading(false);
    }
    fetchUserData();
  }, [user]);

  // Fatura e limite
  const limite = userData?.limiteCredito || 1000;
  const faturaValor = userData?.fatura?.valor || 0;
  const disponivel = limite - faturaValor;
  const vencimento = userData?.fatura?.vencimento ? new Date(userData.fatura.vencimento.seconds * 1000).toLocaleDateString('pt-BR') : '--/--';
  const ultimos4 = userData?.cartaoFinal || '3466';
  const historico = userData?.fatura?.historico || [];

  return (
    <div className="fatura-container">
      {/* Header */}
      <div className="fatura-header">
        <div className="fatura-logo">
          <img src={logoMini} alt="Logo" />
        </div>
        <IoClose className="fatura-close" onClick={() => navigate('/home')} />
      </div>

      {/* Limite */}
      <div className="fatura-limite">
        <h3>Gerenciar Cartão</h3>
        <p>
          Limite único: <strong>R$ {limite.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong>
        </p>
        <div className="fatura-progress">
          <span>{faturaValor.toLocaleString('pt-BR', {minimumFractionDigits:2})} Utilizado</span>
          <span>{disponivel.toLocaleString('pt-BR', {minimumFractionDigits:2})} Disponível</span>
          <div className="fatura-bar">
            <div className="fatura-bar-fill" style={{width: `${Math.min(100, (faturaValor/limite)*100)}%`}}></div>
          </div>
        </div>
      </div>

      {/* Cartão */}
      <div className="fatura-card-section">
        <h3>Cartão</h3>
        <div className="fatura-card">
          <div className="fatura-card-info">
            <p>Final {ultimos4}</p>
            <h2>R$ {faturaValor.toLocaleString('pt-BR', {minimumFractionDigits:2})}</h2>
            <p>Fatura vence em:<br />{vencimento}</p>
          </div>
          <div className="fatura-card-img">
            <img src={cartaoImg} alt="Cartão" />
          </div>
        </div>
        <button className="fatura-historico">HISTÓRICO DE FATURAS</button>
      </div>

      {/* Fatura atual */}
      <div className="fatura-lista">
        <h3>FATURA ATUAL</h3>
        {loading && <div>Carregando...</div>}
        {!loading && historico.length === 0 && (
          <div style={{color: '#aaa', margin: '16px 0'}}>Nenhuma compra recente.</div>
        )}
        {!loading && historico.map((item, idx) => (
          <div className="fatura-item" key={idx}>
            <span className="fatura-dia">{item.dia || '--'}</span>
            <div className="fatura-desc">
              {item.icon === 'shopping' && <FaShoppingBag className="fatura-icon" />}
              <span>{item.descricao}</span>
              <p>R$ {Number(item.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaturaPage;
