import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { notifySuccess, notifyError } from "../utils/toast";
import './AdminHome.css';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      notifyError('Erro ao carregar usuários');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setEditedUser({...user});
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', editedUser.id);
      await updateDoc(userRef, editedUser);
      notifySuccess('Dados atualizados com sucesso!');
      setShowModal(false);
      fetchUsers(); // Recarrega a lista de usuários
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      notifyError('Erro ao salvar alterações');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </header>

      <div className="users-list">
        <h2>Usuários Cadastrados</h2>
        <div className="users-grid">
          {users.map(user => (
            <div key={user.id} className="user-card" onClick={() => handleUserClick(user)}>
              <h3>{user.nomeCompleto}</h3>
              <p>Apelido: {user.apelido}</p>
              <p>Saldo: R$ {user.saldo?.toFixed(2)}</p>
              <p>Limite: R$ {user.limiteCredito?.toFixed(2)}</p>
              <button className="edit-button">
                <FaEdit /> Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && editedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Editar Usuário</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Nome Completo:</label>
                <input
                  type="text"
                  value={editedUser.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Apelido:</label>
                <input
                  type="text"
                  value={editedUser.apelido}
                  onChange={(e) => handleInputChange('apelido', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Saldo:</label>
                  <input
                    type="number"
                    value={editedUser.saldo}
                    onChange={(e) => handleInputChange('saldo', Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Limite de Crédito:</label>
                  <input
                    type="number"
                    value={editedUser.limiteCredito}
                    onChange={(e) => handleInputChange('limiteCredito', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-mail:</label>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Telefone:</label>
                  <input
                    type="tel"
                    value={editedUser.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cidade:</label>
                  <input
                    type="text"
                    value={editedUser.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Estado:</label>
                  <input
                    type="text"
                    value={editedUser.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={editedUser.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="ativo">Ativo</option>
                  <option value="bloqueado">Bloqueado</option>
                  <option value="suspenso">Suspenso</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                <FaTimes /> Cancelar
              </button>
              <button className="save-button" onClick={handleSaveChanges}>
                <FaSave /> Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
