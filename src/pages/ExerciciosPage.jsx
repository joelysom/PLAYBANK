import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/exercicios.css';

// Importando os ícones e imagens
import trophyIcon from '../assets/exercicios/trophy.svg';
import clockIcon from '../assets/exercicios/clock.svg';
import fireIcon from '../assets/exercicios/fire.svg';
import card0Image from '../assets/exercicios/Card_0.svg';
import card1Image from '../assets/exercicios/Card_1.svg';
import card2Image from '../assets/exercicios/Card_2.svg';
import gamesIcon from '../assets/exercicios/games.svg';
import playbankGamesIcon from '../assets/exercicios/PlayBankGames.svg';
import playButtonV2 from '../assets/exercicios/PlayButtonv2.svg';
import closeIcon from '../assets/exercicios/close.svg'; // Ícone de fechar, ajustei o nome para ser mais claro
import logo from '../assets/exercicios/logo.svg'; // Assumi que existe um ícone para a logo

const PaginaExercicios = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="exercicios-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="close-btn" onClick={handleClose}>
          <img src={closeIcon} alt="Fechar" />
        </button>
      </header>

      <main className="container">
        <h1 className="title">Exercicios</h1>
        
        <div className="summary-card">
          <p>Essa semana você fez</p>
          <div className="stats-grid">
            <div className="stat-item">
              <img src={trophyIcon} alt="Troféu" />
              <span>2</span>
              <p>Pontos</p>
            </div>
            <div className="stat-item">
              <img src={clockIcon} alt="Relógio" />
              <span>5</span>
              <p>Minutos</p>
            </div>
            <div className="stat-item">
              <img src={fireIcon} alt="Fogo" />
              <span>210</span>
              <p>Calorias</p>
            </div>
          </div>
        </div>

        <div className="weekly-goal">
          <p>OBJETIVO DA SEMANA</p>
          <div className="day-circles">
            {['sáb.', 'dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.'].map((day, index) => (
              <div key={index} className={`day-circle ${index < 5 ? 'completed' : ''}`}>
                <span className="day-initial">{day}</span>
              </div>
            ))}
            <span className="goal-counter">0/5</span>
          </div>
        </div>

        <div className="challenges-section">
          <h2>Desafios 7x4</h2>
          <div className="challenge-cards">
            <div className="challenge-card">
              <img src={card0Image} alt="Exercícios matinais" className="card-image" />
              <div className="card-text">
                <p>exercicios matinais</p>
              </div>
            </div>
            <div className="challenge-card">
              <img src={card1Image} alt="Exercícios para braço" className="card-image" />
              <div className="card-text">
                <p>exercicios para braço</p>
              </div>
            </div>
            <div className="challenge-card">
              <img src={card2Image} alt="Exercícios para abdomen" className="card-image" />
              <div className="card-text">
                <p>exercicios para abdomen</p>
              </div>
            </div>
          </div>
        </div>

<div className="games-portal">
  <div className="games-header">
    <p>Portal de Games</p>
  </div>
  <div className="games-content">
    <div className="game-images">
      <img 
        src={gamesIcon} 
        alt="Games" 
        style={{
          width: '130px',
          height: 'auto',
          maxWidth: '100%',
          border: 'none',
          boxShadow: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
          position: 'relative',
          left: '20px',
          top: '10px'
        }}
      />
    </div>
    <div className="playbank-section" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', width: '100%'}}>
      <img 
        src={playButtonV2} 
        alt="PlayBank Play" 
        style={{
          width: 160,
          height: 160,
          maxWidth: '100%',
          display: 'block',
          objectFit: 'contain',
          position: 'relative',
          right: '20px',
          bottom: '10px'
        }}
      />
    </div>
  </div>
</div>

      </main>
    </div>
  );
};

export default PaginaExercicios;
