import React, { useState, useEffect } from "react";
import styles from "../styles/stockdashboard.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";

const mockChartData = [
  { time: "10:00", value: 45.5 },
  { time: "11:00", value: 46.0 },
  { time: "12:00", value: 46.5 },
  { time: "13:00", value: 46.2 },
  { time: "14:00", value: 46.8 },
  { time: "15:00", value: 46.4 },
  { time: "16:00", value: 46.81 },
];

const mockNews = [
  { id: 1, title: "BTG Pactual anuncia... crescimento de X%", date: "21/09/2025", summary: "Resumo da notícia 1..." },
  { id: 2, title: "Ibovespa fecha em alta...", date: "21/09/2025", summary: "Resumo da notícia 2..." },
  { id: 3, title: "Mercado espera dados de inflação", date: "20/09/2025", summary: "Resumo da notícia 3..." },
  { id: 4, title: "Ações de bancos pressionadas", date: "20/09/2025", summary: "Resumo da notícia 4..." },
  { id: 5, title: "Setor de energia atrai...", date: "19/09/2025", summary: "Resumo da notícia 5..." },
  { id: 6, title: "Investidores monitoram Fed", date: "19/09/2025", summary: "Resumo da notícia 6..." },
  { id: 7, title: "Novas ofertas públicas em vista", date: "18/09/2025", summary: "Resumo da notícia 7..." },
];

function StockDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // aqui você carregaria dados reais de gráfico, via API
    setData(mockChartData);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ações</h2>

      <div className={styles.cardInvest}>
        <div className={styles.totalInvestido}>Total Investido</div>
        <div className={styles.valor}>R$ 70,00</div>
        <button className={styles.buttonPainel} onClick={() => navigate('/investdashboard')}>Painel de ações</button>
      </div>

      <div className={styles.navButtons}>
        <button className={styles.navButton}>Explorar</button>
        <button className={styles.navButton}>Carteira</button>
        <button className={styles.navButton}>Ordens</button>
      </div>

      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" className={styles.searchInput} />
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#999" />
            <YAxis stroke="#999" domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4caf50" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.newsSection}>
        <h3 className={styles.newsTitle}>Últimas notícias</h3>
        <div className={styles.newsGrid}>
          {mockNews.map(news => (
            <NewsCard key={news.id} title={news.title} date={news.date} summary={news.summary} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockDashboard;
