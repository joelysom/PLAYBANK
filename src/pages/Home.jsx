import React from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import MentorCard from "../components/MentorCard";
import "../styles/Home.css";
import logo from "../assets/LOGO.png";

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        {/* Cabeçalho */}
        <header className="home-header">
          <div className="logo-wrapper">
            <img src={logo} alt="Conecta Senac" className="logo-img" />
            <span className="logo-text">Conecta Senac</span>
          </div>
          <input type="text" placeholder="Buscar" className="search" />
        </header>

        <div className="section-list">
          {/* Quem você conhece */}
          <div className="section-block">
            <h2 className="section-title">Quem você conhece</h2>
            <div className="usercard-grid">
              <UserCard name="Luiza Maía" description="Formada em 2022" button="Conectar" avatarUrl="/assets/avatar1.png" />
              <UserCard name="João Silva" description="Estudante de TI" button="Conectar" avatarUrl="/assets/avatar2.png" />
            </div>
          </div>

          {/* Recomendações */}
          <div className="section-block">
            <h2 className="section-title">Recomendações</h2>
            <UserCard name="Clara Souza" description="Desenvolvedora" button="Mensagem" avatarUrl="/assets/avatar3.png" />
          </div>

          {/* Mentorias */}
          <div className="section-block mentor-block">
            <MentorCard text="Encontre um mentor" />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Home;
