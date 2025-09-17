import React, { useState } from "react";
import "../styles/content_home.css";
import "../styles/loading.css";
import { FaRocket, FaPiggyBank, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { BiSolidCoupon } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

import logo from "../assets/logomini.png";
import card0 from "../assets/card_0.svg";
import card1 from "../assets/card_1.svg";

const formatMoney = (value) => {
  if (typeof value !== 'number') return '0,00';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const Content = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            console.log("Dados do usuário:", userDoc.data()); // Para debug
            setUserData(userDoc.data());
          } else {
            console.log("Documento do usuário não encontrado");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);
  
  const handleLogoClick = () => {
    setShowMenu(!showMenu);
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e) => {
    const ele = e.currentTarget;
    const startX = e.pageX - ele.offsetLeft;
    const scrollLeft = ele.scrollLeft;

    const handleMouseMove = (e) => {
      const x = e.pageX - ele.offsetLeft;
      const scroll = x - startX;
      ele.scrollLeft = scrollLeft - scroll;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="content">

      {/* Header */}
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" onClick={handleLogoClick} />
          <div className={`logout-menu ${showMenu ? 'show' : ''}`}>
            <div className="menu-item" onClick={logout}>
              <FaSignOutAlt /> Sair
            </div>
          </div>
        </div>
        <div className="user-info">
          <p>Bem vindo, 
            {!userData ? (
              <span><div className="loading-shimmer" style={{width: "100px", display: "inline-block"}}></div></span>
            ) : (
              <span>{userData.apelido || userData.nomeCompleto}</span>
            )}
          </p>
          <p>
            Seus PlayPoints: 
            {!userData ? (
              <span><div className="loading-shimmer" style={{width: "40px", display: "inline-block"}}></div></span>
            ) : (
              <span>0</span>
            )}
            <small>Conquiste mais pontos!</small>
          </p>
        </div>
      </div>

      {/* Saldo */}
      <div className="saldo">
        <p>Saldo em conta</p>
        {!userData ? (
          <h2><div className="loading-shimmer large"></div></h2>
        ) : (
          <h2>R$ {formatMoney(userData.saldo)}</h2>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab active">cartões</button>
        <button className="tab">historico</button>
      </div>

      {/* Opções */}
      <div className="options-wrapper">
        <div 
          className="options"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          <div><FaCreditCard /><p>PIX</p></div>
          <div className="highlight"><RiBankFill /><p>PIX.CRED <span>Até 12x</span></p></div>
          <div><FaPiggyBank /><p>TRANSFERÊNCIA</p></div>
          <div><FaShoppingCart /><p>BOLETO</p></div>
          <div><BiSolidCoupon /><p>CUPONS</p></div>
          <div><FaHistory /><p>HISTÓRICO</p></div>
        </div>
      </div>

      {/* Fatura */}
      <div className="fatura">
        <p>Fatura</p>
        {!userData ? (
          <>
            <h2><div className="loading-shimmer large"></div></h2>
            <p className="detalhes">
              Venc: <b><div className="loading-shimmer" style={{width: "60px", display: "inline-block"}}></div></b>
              <span>|</span>
              Limite disponível: <b><div className="loading-shimmer" style={{width: "80px", display: "inline-block"}}></div></b>
            </p>
          </>
        ) : (
          <>
            <h2>R$ {formatMoney(userData.fatura?.valor)}</h2>
            <p className="detalhes">
              Venc: <b>{userData?.fatura?.vencimento ? new Date(userData.fatura.vencimento.seconds * 1000).toLocaleDateString('pt-BR') : '--/--'}</b>
              <span>|</span>
              Limite disponível: <b>R$ {formatMoney(userData.limiteCredito)}</b>
            </p>
          </>
        )}
      </div>

      {/* Shortcuts */}
      <div className="shortcuts">
        <div className="icon-btn"><FaPiggyBank /></div>
        <div className="icon-btn"><FaRocket /></div>
      </div>

      {/* Banners */}
      <div className="card"><img src={card0} alt="card 0" /></div>
      <h3 className="card-title">Ser PlayBank é saber que</h3>
      <div className="card"><img src={card1} alt="card 1" /></div>

      {/* Bottom Menu */}
      <div className="bottom-menu">
        <AiOutlineHome className="active" />
        <GiTwoCoins />
        <BsPeopleFill />
        <FaShoppingCart />
        <FaHistory />
      </div>
    </div>
  );
};

export default Content;
