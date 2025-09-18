
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminconsole from "./pages/AdminHome.jsx";
import ConfigPage from "./pages/ConfigPage";
import PixPage from "./pages/PixPage";
import BopitoChat from "./pages/BopitoChat";
import TransferencePix from "./pages/transferencepix";
import PixTransferValue from "./pages/PixTransferValue";
import FaturaPage from "./pages/FaturaPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/pix" element={<PixPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Adminconsole />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/bopito-chat" element={<BopitoChat />} />
            <Route path="/transferencepix" element={<TransferencePix />} />
            <Route path="/pix-transfer-value" element={<PixTransferValue />} />
            <Route path="/fatura" element={<FaturaPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
