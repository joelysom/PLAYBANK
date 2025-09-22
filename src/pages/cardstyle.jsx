
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cardstyle.css";
import logo from "../assets/logomini.svg";
import iconClose from "../assets/creditstyle/icon-close.svg";
import cardSample from "../assets/creditstyle/card-sample.svg";
import sugKpop from "../assets/creditstyle/sug-kpop.svg";
import sugHeart from "../assets/creditstyle/sug-heart.svg";
import sugStar from "../assets/creditstyle/sug-star.svg";
import sugMoon from "../assets/creditstyle/sug-moon.svg";

export default function CardStyle() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="screen">
        {/* Header com logo e botão fechar */}
        <header className="header">
          <img
            src={logo}
            alt="logo"
            className="logo"
          />
          <button className="close-btn" onClick={() => navigate('/cards')}>
            <img src={iconClose} alt="fechar" />
          </button>
        </header>

        {/* Título */}
        <h1 className="title">Escolha o estilo do cartão</h1>

        {/* Preview do cartão */}
        <div className="card-preview">
          <img
            src={cardSample}
            alt="Cartão personalizado"
            className="card-img"
          />
        </div>

        {/* Botões de opções */}
        <div className="options">
          <button className="opt-btn">CORES</button>
          <button className="opt-btn">IMAGEM</button>
          <button className="opt-btn">NOME</button>
        </div>

        {/* Seção de sugestões */}
        <section className="suggestions">
          <h2 className="suggest-title">SUGESTÕES</h2>
          <p className="suggest-subtitle">Escolha uma estampa popular</p>

          <div className="suggest-grid">
            <div className="suggest-card">
              <img
                src={sugKpop}
                alt="Kpop"
                className="sug-img"
              />
            </div>

            <div className="suggest-card">
              <img
                src={sugHeart}
                alt="Coração"
                className="sug-img"
              />
            </div>

            <div className="suggest-card">
              <img
                src={sugStar}
                alt="Estrela"
                className="sug-img"
              />
            </div>

            <div className="suggest-card">
              <img
                src={sugMoon}
                alt="Lua"
                className="sug-img"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
