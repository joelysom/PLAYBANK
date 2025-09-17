import React from "react";
import "../styles/content_home.css";
import { FaRocket, FaPiggyBank, FaHistory } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { BiSolidCoupon } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";

import logo from "../assets/logomini.png";
import card0 from "../assets/card_0.svg";
import card1 from "../assets/card_1.svg";

const Content = () => {
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
        <img src={logo} alt="logo" className="logo" />
        <div className="user-info">
          <p>Sua Colocação: <span>7</span></p>
          <p>
            Seus PlayPoints: <span>5.875</span> 
            <small>Termina em: 4h</small>
          </p>
        </div>
      </div>

      {/* Saldo */}
      <div className="saldo">
        <p>Saldo em conta</p>
        <h2>R$ 1.846,89</h2>
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
        <h2>R$ 432,90</h2>
        <p className="detalhes">
          Venc: <b>12/12</b> <span>|</span> Limite disponível: <b>2.500,00</b>
        </p>
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
