import React, { useEffect } from "react";
import "../styles/home.css";
import Content from "../components/content";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <Content />
    </div>
  );
};

export default Home;
