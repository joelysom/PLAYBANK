import React from "react";
import "../styles/UserCard.css";

function UserCard({ name, description, button, avatarUrl }) {
  return (
    <div className="user-card">
      <img className="avatar" src={avatarUrl} alt={name} />
      <div className="info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <button className="action-btn">{button}</button>
    </div>
  );
}

export default UserCard;
