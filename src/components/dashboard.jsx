
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { FaShoppingCart, FaHistory } from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="bottom-menu">
      <AiOutlineHome className="active" />
      <GiTwoCoins />
      <BsPeopleFill />
      <FaShoppingCart />
      <FaHistory />
    </div>
  );
};

export default Dashboard;
