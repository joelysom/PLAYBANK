import React, { useState, useRef } from "react";
import styles from "./content.module.css";
import "../styles/loading.css";
import { FaRocket, FaPiggyBank, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { BiSolidCoupon } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { FaShoppingCart, FaCreditCard, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

import logo from "../assets/logomini.svg";
import card0 from "../assets/card_0.svg";
import card1 from "../assets/card_1.svg";
import pixIcon from "../assets/icon/Pix.svg";

const formatMoney = (value) => {
  if (typeof value !== 'number') return '0,00';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const Content = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const optionsRef = useRef(null);

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

  // Garantir que o carrossel inicie no começo (PIX visível)
  useEffect(() => {
    if (optionsRef.current) {
      optionsRef.current.scrollLeft = 0;
    }
  }, []);
  
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
  <div className={styles.content}>
      {/* Header */}
  <div className={styles.header}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="logo" className={styles.logo} onClick={handleLogoClick} />
          <div className={`${styles["logout-menu"]} ${showMenu ? styles.show : ""}`}>
            <div className={styles["menu-item"]} onClick={() => navigate('/config')}>
              <FaCog /> Configurações
            </div>
            <div className={styles["menu-item"]} onClick={logout}>
              <FaSignOutAlt /> Sair
            </div>
          </div>
        </div>
        <div className={styles["user-info"]}>
          <p>Bem vindo, 
            {!userData ? (
              <span className="loading-shimmer" style={{width: "100px", display: "inline-block"}}></span>
            ) : (
              <span>{userData.apelido || userData.nomeCompleto}</span>
            )}
          </p>
          <p>
            Seus PlayPoints: 
            {!userData ? (
              <span className="loading-shimmer" style={{width: "40px", display: "inline-block"}}></span>
            ) : (
              <span>0</span>
            )}
            <small>Conquiste mais pontos!</small>
          </p>
        </div>
      </div>

      {/* Saldo */}
  <div className={styles.saldo}>
        <p>Saldo em conta</p>
        {!userData ? (
          <h2><span className="loading-shimmer large"></span></h2>
        ) : (
          <h2>R$ {formatMoney(userData.saldo)}</h2>
        )}
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`} onClick={() => navigate('/cards')}>cartões</button>
        <button className={styles.tab}>historico</button>
      </div>

      {/* Opções */}
      <div className={styles["options-wrapper"]}>
        <div 
          className={styles.options}
          ref={optionsRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          style={{scrollBehavior: 'smooth'}}
        >
          <div onClick={() => navigate('/pix')} style={{cursor: 'pointer'}}>
            <img src={pixIcon} alt="PIX" style={{width: 22, height: 22, marginBottom: 2}} />
            <p>PIX</p>
          </div>
          <div className={styles.highlight}><RiBankFill /><p>PIX.CRED <span>Até 12x</span></p></div>
          <div><FaPiggyBank /><p>TRANSFERÊNCIA</p></div>
          <div><FaShoppingCart /><p>BOLETO</p></div>
          <div><BiSolidCoupon /><p>CUPONS</p></div>
          <div><FaHistory /><p>HISTÓRICO</p></div>
        </div>
      </div>

      {/* Fatura */}
  <div className={styles.fatura} style={{cursor: 'pointer'}} onClick={() => navigate('/fatura')}>
        <p>Fatura</p>
        {!userData ? (
          <>
            <h2><span className="loading-shimmer large"></span></h2>
            <p className="detalhes">
              Venc: <b><span className="loading-shimmer" style={{width: "60px", display: "inline-block"}}></span></b>
              <span>|</span>
              Limite disponível: <b><span className="loading-shimmer" style={{width: "80px", display: "inline-block"}}></span></b>
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
      <div className={styles.shortcuts}>
        <div className={styles["icon-btn"]}><FaPiggyBank /></div>
        <div className={styles["icon-btn"]} onClick={() => navigate('/investdashboard')} style={{cursor: 'pointer'}}><FaRocket /></div>
      </div>

  {/* Banners */}
  <div className="card" style={{cursor: 'pointer'}} onClick={() => navigate('/blackcard')}><img src={card0} alt="card 0" /></div>
  <h3 className={styles["card-title"]}>Ser PlayBank é saber que</h3>
  <div className="card" style={{cursor: 'pointer'}} onClick={() => navigate('/exercicios')}><img src={card1} alt="card 1" /></div>
  {/* Dashboard removido daqui */}
    </div>
  );
};

export default Content;
