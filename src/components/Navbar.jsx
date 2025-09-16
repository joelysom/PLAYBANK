
import React from "react";
import { MdHome, MdWork, MdPerson } from "react-icons/md";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <button className="nav-btn active"><MdHome style={{marginRight: 6}} /> Início</button>
      <button className="nav-btn"><MdWork style={{marginRight: 6}} /> Vagas</button>
      <button className="nav-btn"><MdPerson style={{marginRight: 6}} /> Perfil</button>
    </nav>
  );
}

export default Navbar;
