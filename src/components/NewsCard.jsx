import React from "react";
import styles from "../styles/newscard.module.css";

function NewsCard({ title, date, summary }) {
  return (
    <div className={styles.card}>
      <div className={styles.date}>{date}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.summary}>{summary}</div>
    </div>
  );
}

export default NewsCard;
