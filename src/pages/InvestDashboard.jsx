import React, { useState, useEffect } from "react";
import styles from "../styles/investdashboard.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

// SVGs
import logo from "../assets/logomini.svg";
import close from "../assets/invest/close.svg";
import btg from "../assets/invest/btg.svg";
import b3 from "../assets/invest/b3.svg";

const mockChartData = [
  { time: "10:00", value: 45.5 },
  { time: "11:00", value: 46.0 },
  { time: "12:00", value: 46.5 },
  { time: "13:00", value: 46.2 },
  { time: "14:00", value: 46.8 },
  { time: "15:00", value: 46.4 },
  { time: "16:00", value: 46.81 },
];


function InvestDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui entraria chamada para API real
    setData(mockChartData);
  }, []);

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <img src={logo} alt="logo" className={styles.logo} />
        <img
          src={close}
          alt="fechar"
          className={styles.close}
          style={{cursor: 'pointer'}}
          onClick={() => navigate('/home')}
        />
      </div>

      <h2 className={styles.title}>Ações</h2>

      {/* Card de Investimento */}
      <div className={styles.cardInvest}>
        <div className={styles.totalInvestido}>Total Investido</div>
        <div className={styles.investRow}>
          <button className={styles.buttonInvest}>Investir</button>
          <div className={styles.valor}>R$ 70,00</div>
        </div>
      </div>

      {/* Navegação */}
      <div className={styles.navButtons}>
        <button className={styles.navButton}>Explorar</button>
        <button className={styles.navButton}>Carteira</button>
        <button className={styles.navButton}>Ordens</button>
      </div>

      {/* Busca */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" className={styles.searchInput} />
      </div>

      {/* Lista de ativos */}
      <div className={styles.assetList}>
        <div className={styles.assetItem}>
          <img src={b3} alt="B3" className={styles.assetIcon} />
          <div className={styles.assetInfo}>
            <span className={styles.assetName}>BTG</span>
            <span className={styles.assetPrice}>R$:46,97 BRL.</span>
          </div>
          <span className={styles.assetChangePos}>+0,93 (2,02%) Hoje</span>
        </div>

        <div className={styles.assetItem}>
          <img src={btg} alt="Ibovespa" className={styles.assetIcon} />
          <div className={styles.assetInfo}>
            <span className={styles.assetName}>Ibovespa</span>
            <span className={styles.assetPrice}>R$:46,97 BRL.</span>
          </div>
          <span className={styles.assetChangePos}>+1.423,97 (0,99%) Hoje</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#bbb" />
            <YAxis stroke="#bbb" domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Botão buscar */}
      <div className={styles.bottomSearch}>
        <button className={styles.navButton}>Buscar</button>
      </div>
    </div>
  );
}

export default InvestDashboard;
