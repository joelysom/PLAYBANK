import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";

// Importando os SVGs
import transferirIcon from "../assets/pixicons/transferir.svg";
import programarIcon from "../assets/pixicons/programar.svg";
import qrcodeIcon from "../assets/pixicons/qrcode.svg";
import copiaEcolaIcon from "../assets/pixicons/copiaecola.svg";
import cobrarIcon from "../assets/pixicons/cobrar.svg";
import depositarIcon from "../assets/pixicons/depositar.svg";
import pixNoCreditoIcon from "../assets/pixicons/pixnocredito.svg";
import pixPorVozIcon from "../assets/pixicons/pixporvoz.svg";

import "../styles/pix.css";

export default function PixPage() {
  const navigate = useNavigate();
  const handleTransferirClick = () => {
    navigate('/transferencepix');
  };
  return (
    <div className="pix-container">
      {/* Header */}
      <header className="pix-header">
        <div className="pix-logo"></div>
        <button className="pix-back" onClick={() => navigate('/home')}>
          <IoChevronBack size={22} />
        </button>
      </header>

      <h1 className="pix-title">Área Pix</h1>

      {/* Input */}
      <input
        className="pix-input"
        type="text"
        placeholder="Digite tudo: chave e valor"
      />

      {/* Ações principais */}
      <div className="pix-actions">
        <div className="pix-action" onClick={handleTransferirClick} style={{cursor: 'pointer'}}>
          <img src={transferirIcon} alt="Transferir" width="28" />
          <span>Transferir</span>
        </div>
        <div className="pix-action">
          <img src={programarIcon} alt="Programar" width="28" />
          <span>Programar</span>
        </div>
        <div className="pix-action">
          <img src={qrcodeIcon} alt="QR Code" width="28" />
          <span>Ler QR code</span>
        </div>
        <div className="pix-action">
          <img src={copiaEcolaIcon} alt="Copia e Cola" width="28" />
          <span>Pix Copia e Cola</span>
        </div>
        <div className="pix-action">
          <img src={cobrarIcon} alt="Cobrar" width="28" />
          <span>Cobrar</span>
        </div>
        <div className="pix-action">
          <img src={depositarIcon} alt="Depositar" width="28" />
          <span>Depositar</span>
        </div>
        <div className="pix-action">
          <img src={pixNoCreditoIcon} alt="Pix no Crédito" width="28" />
          <span>Pix no crédito</span>
        </div>
        <div className="pix-action">
          <img src={pixPorVozIcon} alt="Pix por Voz" width="28" />
          <span>Pix por voz</span>
        </div>
      </div>

      {/* Card Promo */}
      <div className="pix-card">
        Pix no crédito: Transfira até R$ 500 sem usar o saldo da sua conta
      </div>

      {/* Preferências */}
      <div className="pix-preferences">
        <h2>Preferências</h2>
        <ul>
          <li>
            <MdAttachMoney size={22} />
            <span>Pix automático</span>
          </li>
          <li>
            <BsShieldCheck size={22} />
            <span>Registrar ou trazer chaves</span>
          </li>
          <li>
            <AiFillSetting size={22} />
            <span>Meus limites</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
