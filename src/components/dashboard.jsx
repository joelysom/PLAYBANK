
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { FaShoppingCart, FaHistory } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bottom-menu">
      <AiOutlineHome
        className={location.pathname === "/home" ? "active" : ""}
        style={{cursor: 'pointer'}}
        onClick={() => navigate('/home')}
      />
      <GiTwoCoins
        className={location.pathname === "/stockdashboard" ? "active" : ""}
        style={{cursor: 'pointer'}}
        onClick={() => navigate('/stockdashboard')}
      />
      <BsPeopleFill />
      <FaShoppingCart />
      <FaHistory />
    </div>
  );
};

export default Dashboard;
