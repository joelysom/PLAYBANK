
import React from "react";
import "../styles/cards.css";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { MdCreditCard, MdOutlineCreditCard, MdLock, MdLocalShipping, MdAdd } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Cards() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // O apelido pode estar em user.displayName ou user.apelido, dependendo do AuthContext
  const apelido = user?.apelido || user?.displayName || user?.email?.split('@')[0] || "Usuário";
  return (
    <div className="cards-page">
      {/* Header */}
      <div className="cards-header">
        <button
          className="icon"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => navigate('/home')}
          aria-label="Voltar para Home"
        >
          <IoArrowBack size={22} />
        </button>
        <h1>Meus cartões</h1>
      </div>

      {/* Cartão físico */}
      <div className="section">
        <p className="section-title">Cartão físico</p>
        <div className="card-item" style={{cursor: 'pointer'}} onClick={() => navigate('/cardstyle')}>
          <MdCreditCard className="card-icon" />
          <div className="card-info">
            <span className="card-name">{apelido}</span>
            <span className="card-number">•••• 9827</span>
          </div>
          <IoArrowForward className="arrow" />
        </div>
      </div>

      {/* Cartões virtuais */}
      <div className="section">
        <p className="section-title">Cartões virtuais</p>

        <div className="card-item">
          <MdOutlineCreditCard className="card-icon" />
          <div className="card-info">
            <span className="card-name">ERRO 404 W.I.P</span>
            <span className="card-number">•••• 4433</span>
          </div>
          <span className="tag">
            Carteira digital <FaWallet className="tag-icon" />
          </span>
          <IoArrowForward className="arrow" />
        </div>

        <div className="card-item">
          <MdOutlineCreditCard className="card-icon" />
          <div className="card-info">
            <span className="card-name">ERRO 404 W.I.P</span>
            <span className="card-number">•••• 5897</span>
          </div>
          <span className="tag">
            Assinaturas <MdLock className="tag-icon" />
          </span>
          <IoArrowForward className="arrow" />
        </div>

        <div className="card-item">
          <MdOutlineCreditCard className="card-icon" />
          <div className="card-info">
            <span className="card-name">ERRO 404 W.I.P</span>
            <span className="card-number">•••• 3849</span>
          </div>
          <span className="tag">
            Delivery <MdLocalShipping className="tag-icon" />
          </span>
          <IoArrowForward className="arrow" />
        </div>
      </div>

      {/* Criar novo */}
      <div className="create-card">
        <MdAdd className="plus-icon" />
        <span>Criar novo cartão virtual</span>
      </div>
    </div>
  );
}

export default Cards;
