
import React, { useEffect, useState } from "react";
import "../styles/transferencepix.css";
import { FaArrowLeft, FaUserFriends, FaClock, FaSearch } from "react-icons/fa";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const TransferencePix = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allContacts, setAllContacts] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      // Exclui administradores e o próprio usuário logado
      const q = query(usersRef, where("role", "!=", "admin"));
      const snapshot = await getDocs(q);
      const users = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.uid !== user?.uid) {
          users.push({
            initials: (data.nomeCompleto || "U").split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(),
            name: data.nomeCompleto || data.email,
            uid: data.uid,
            email: data.email
          });
        }
      });
      setAllContacts(users);
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    // Busca contatos recentes do Firestore
    async function fetchRecent() {
      if (!user) return;
      const db = getFirestore();
      const ref = doc(db, "recentPixContacts", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setRecentContacts(snap.data().contacts || []);
      } else {
        setRecentContacts([]);
      }
    }
    fetchRecent();
  }, [user]);

  const filteredContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectContact = async (contact) => {
    // Buscar dados completos do usuário selecionado
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(query(usersRef, where("uid", "==", contact.uid)));
    let fullData = contact;
    snapshot.forEach(doc => {
      fullData = { ...doc.data(), ...contact };
    });
    navigate("/pix-transfer-value", { state: { contact: fullData } });
  };

  return (
    <div className="transferencepix">
      {/* Header */}
      <div className="tp-header">
        <button className="tp-back" onClick={() => navigate('/pix')}>
          <FaArrowLeft />
        </button>
      </div>

      {/* Campo de busca */}
      <div className="tp-search-section">
        <h2>Para quem você quer transferir?</h2>
        <div className="tp-search-wrapper">
          <FaSearch className="tp-search-icon" />
          <input
            type="text"
            placeholder="Nome, CPF/CNPJ ou chave Pix"
            className="tp-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Recent contacts */}
      {recentContacts.length > 0 && (
        <div className="tp-frequent">
          <p className="tp-section-title">
            <FaClock className="tp-icon" /> Seus contatos recentes
          </p>
          <div className="tp-frequent-list">
            {recentContacts.map((contact, idx) => (
              <div key={contact.uid || idx} className="tp-contact-circle" onClick={() => handleSelectContact(contact)} style={{cursor: 'pointer'}}>
                <div className="tp-avatar">{(contact.apelido || contact.name || contact.email || "U").split(" ").map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
                <span>{contact.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All contacts */}
      <div className="tp-all">
        <p className="tp-section-title">
          <FaUserFriends className="tp-icon" /> Todos os seus contatos
        </p>
        <div className="tp-all-list">
          {filteredContacts.map((contact, idx) => (
            <div key={contact.uid || idx} className="tp-all-item" onClick={() => handleSelectContact(contact)} style={{cursor: 'pointer'}}>
              <div className="tp-avatar">{contact.initials}</div>
              <span>{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferencePix;
