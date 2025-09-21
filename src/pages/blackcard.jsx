
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "../styles/blackcard.css";
import blackcard from "../assets/blackcredit/blackcard.svg";
import mascot from "../assets/blackcredit/mascot.svg";
import iconPlane from "../assets/blackcredit/icon-plane.svg";
import iconGift from "../assets/blackcredit/icon-gift.svg";
import iconShield from "../assets/blackcredit/icon-shield.svg";
import iconConcierge from "../assets/blackcredit/icon-concierge.svg";
import iconLock from "../assets/blackcredit/icon-lock.svg";
import iconCard from "../assets/blackcredit/icon-card.svg";
import iconChat from "../assets/blackcredit/icon-chat.svg";
import iconBill from "../assets/blackcredit/icon-bill.svg";
import iconTerms from "../assets/blackcredit/icon-terms.svg";
import iconLink from "../assets/blackcredit/icon-link.svg";

/*
  Observe:
  - Todas as imagens/icones devem existir em: /assets/blackcredit/...
  - Ex.: /assets/blackcredit/card-front.svg, card-back.svg, mascot.svg, icon-plane.svg, icon-gift.svg, icon-shield.svg, icon-concierge.svg, icon-lock.svg, icon-card.svg, icon-chat.svg, icon-bill.svg, icon-terms.svg, icon-link.svg
*/

export default function BlackCard() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="screen">
        {/* Botão de voltar */}
        <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 10 }}>
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff' }}
            aria-label="Voltar para Home"
          >
            <IoArrowBack size={32} />
          </button>
        </div>
        <header className="hero">
          <h1 className="title">Cartão Black</h1>
          <p className="subtitle">
            Exclusivo para quem transforma cada compra em uma conquista.
          </p>

          <div className="card-and-cta">
            <div className="card-wrap">
              <img
                src={blackcard}
                alt="Cartão Black"
                className="blackcard-img"
              />
            </div>

            <button className="cta">Solicitar Agora</button>

            <img
              src={mascot}
              alt="mascot"
              className="mascot"
            />
          </div>
        </header>

        {/* ...existing code... */}
        <section className="section benefits">
          <h2 className="section-title">BENEFICIOS PREMIUM</h2>
          <div className="benefit-grid">
            <div className="benefit">
              <img src={iconPlane} alt="VIP sala" className="icon" />
              <div className="benefit-text">
                <strong>Salas VIP em aeroportos</strong>
                <span>LoungeKey + Priority Pass</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconGift} alt="seguro viagem" className="icon" />
              <div className="benefit-text">
                <strong>Seguro viagem e proteção</strong>
                <span>Cobertura global</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconShield} alt="cashback" className="icon" />
              <div className="benefit-text">
                <strong>Cashback ou pontos turbinados</strong>
                <span>Ate 3x mais pontos por real gasto</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconConcierge} alt="concierge" className="icon" />
              <div className="benefit-text">
                <strong>Concierge e experiências</strong>
                <span>exclusivas reservas em hotéis, eventos e restaurantes</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section control">
          <h2 className="section-title">CONTROLE E TECNOLOGIA</h2>
          <div className="benefit-grid">
            <div className="benefit">
              <img src={iconLock} alt="segurança" className="icon" />
              <div className="benefit-text">
                <strong>Segurança avançada:</strong>
                <span>autenticação biométrica, bloqueio instantâneo</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconCard} alt="cartao virtual" className="icon" />
              <div className="benefit-text">
                <strong>Cartão virtual instantâneo:</strong>
                <span>disponível no app após aprovação</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconChat} alt="notificacoes" className="icon" />
              <div className="benefit-text">
                <strong>Notificações em tempo real:</strong>
                <span>cada compra, cada detalhe</span>
              </div>
            </div>
            <div className="benefit">
              <img src={iconBill} alt="gestao limites" className="icon" />
              <div className="benefit-text">
                <strong>Gestão de limites e faturas:</strong>
                <span>tudo pelo app, sem burocracia</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section requisites">
          <h2 className="section-title">REQUISITOS</h2>
          <div className="req-grid">
            <div className="req">
              <img src={iconTerms} alt="termos" className="icon-small" />
              <span>Termos e condições</span>
            </div>
            <div className="req">
              <img src={iconLink} alt="link" className="icon-small" />
              <div className="req-text">
                <span>✓ Link para atendimento</span>
                <a href="mailto:meajuda@levelupbank.com" className="email">meajuda@levelupbank.com</a>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer-spacer" />
      </div>
    </div>
  );
}
