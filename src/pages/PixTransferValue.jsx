import React, { useState, useEffect } from "react";
import styles from "../styles/pixtransfervalue.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "../context/AuthContext.jsx";
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function maskCPF(cpf) {
  if (!cpf || cpf.length < 5) return "***.***.***-**";
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6).replace(/\d/g, "*")}.${cpf
    .slice(6, 9)
    .replace(/\d/g, "*")}-${cpf.slice(-2)}`;
}

function formatMoneyInput(value) {
  let v = value.replace(/\D/g, "");
  if (!v) return "";
  v = (parseInt(v, 10) / 100).toFixed(2) + "";
  return v.replace(".", ",");
}

function formatMoneyDisplay(value) {
  if (value === null || value === undefined || value === "") return "R$ 0,00";
  // Se for string, tenta converter para número
  let num = typeof value === "string" ? Number(value.replace(/\./g, '').replace(',', '.')) : value;
  if (isNaN(num)) return "R$ 0,00";
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


const PixTransferValue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state || {};
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const [credito, setCredito] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();
      setSaldo(data?.saldo ?? 0);
      setCredito(data?.credito ?? 0);
    }
    fetchUserData();
  }, [user]);

  if (!contact) {
    return <div style={{ padding: 32 }}>Usuário não selecionado.</div>;
  }

  // Permitir editar valor diretamente no display
  const handleValueClick = () => {
    const input = document.getElementById("pixtv-value-input");
    if (input) input.focus();
  };

  const handleInput = (e) => setValor(formatMoneyInput(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let vstr = valor.replace(/\./g, "").replace(/,([^,]*)$/, ".$1");
    let v = parseFloat(vstr);
    if (isNaN(v) || v <= 0) {
      setError("Digite um valor válido.");
      return;
    }
    if (saldo !== null && v > saldo) {
      setError("Saldo insuficiente.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const saldoAtual = userSnap.data().saldo || 0;

      let vstr = valor.replace(/\./g, "").replace(/,([^,]*)$/, ".$1");
      let v = parseFloat(vstr);
      if (v > saldoAtual) {
        setError("Saldo insuficiente.");
        setLoading(false);
        return;
      }
      await updateDoc(userRef, { saldo: saldoAtual - v });

      const destRef = doc(db, "users", contact.uid);
      const destSnap = await getDoc(destRef);
      const saldoDest = destSnap.data().saldo || 0;
      await updateDoc(destRef, { saldo: saldoDest + v });

      // Salvar transferência recente para o usuário logado
      const recentRef = doc(db, "recentPixContacts", user.uid);
      let prev = [];
      try {
        const recentSnap = await getDoc(recentRef);
        if (recentSnap.exists()) {
          prev = recentSnap.data().contacts || [];
        }
      } catch {}
      // Remove duplicatas e mantém o mais recente no topo
      const newContact = {
        uid: contact.uid,
        name: contact.nomeCompleto || contact.name || contact.email,
        email: contact.email,
        apelido: contact.apelido || "",
      };
      const filtered = prev.filter(c => c.uid !== contact.uid);
      const updated = [newContact, ...filtered].slice(0, 5); // Máx 5 recentes
      try {
        await updateDoc(recentRef, { contacts: updated });
      } catch (e) {
        // Se não existe, cria
        await setDoc(recentRef, { contacts: updated });
      }

      toast.success("Transferência realizada com sucesso!");
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setError("Erro ao transferir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className={styles.pixtransfervalueContainer}>
      {/* Header */}
      <div className={styles.pixtvHeader}>
        <button onClick={() => navigate("/pix")} className={styles.pixtvBack}>
          <IoChevronBack />
        </button>
        <div>
          <p className={styles.pixtvSubtitle}>Transferir para</p>
          <h2 className={styles.pixtvContact}>
            {contact.nomeCompleto || contact.name}
          </h2>
        </div>
      </div>

      {/* Valor */}
      <form onSubmit={handleSubmit} className={styles.pixtvForm} autoComplete="off">
        <div
          className={styles.pixtvValue}
          onClick={handleValueClick}
          style={{ cursor: "pointer" }}
        >
          {valor ? formatMoneyDisplay(valor) : "R$ 0,00"}
        </div>
        <input
          id="pixtv-value-input"
          type="text"
          inputMode="numeric"
          placeholder="Digite o valor"
          value={valor}
          onChange={handleInput}
          className={styles.pixtvInput}
          maxLength={9}
          autoFocus={valor === ""}
        />
        {error && <div className={styles.pixtvError}>{error}</div>}
      </form>

  <hr className={styles.pixtvDivider} />

      {/* Pagando com */}
      <div className={styles.pixtvSection}>
        <p className={styles.pixtvLabel}>Pagando com</p>
        <div className={styles.pixtvCards}>
          <div className={`${styles.pixtvCard} ${styles.selected}`}>
            <p className={styles.pixtvCardTitle}>Saldo PlayBank</p>
            <p className={styles.pixtvCardSub}>
              Atual: {saldo !== null ? formatMoneyDisplay(saldo) : "..."}
            </p>
          </div>
          <div className={styles.pixtvCard}>
            <p className={styles.pixtvCardTitle}>Cartão PlayBank</p>
            <p className={styles.pixtvCardSub}>
              Limite: {credito !== null ? formatMoneyDisplay(credito) : "..."}
            </p>
          </div>
        </div>
      </div>

      {/* Aba Destinatário */}
      <div className={styles.pixtvUserinfo}>
        <h3>Destinatário</h3>
        <p>
          <b>Nome:</b> {contact.nomeCompleto || contact.name}
        </p>
        <p>
          <b>Email:</b> {contact.email}
        </p>
        <p>
          <b>Localidade:</b> {contact.cidade || "-"} / {contact.estado || "-"}
        </p>
        <p>
          <b>CPF:</b> {maskCPF(contact.cpf || "***********")}
        </p>
      </div>

      {/* Botão fixo */}
      <div className={styles.pixtvFooter}>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.pixtvBtn}
          disabled={loading}
        >
          Continuar com saldo
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.pixtransfervalueModalBg}>
          <div className={styles.pixtransfervalueModal}>
            <h3>Confirmar transferência?</h3>
            <p>
              Valor: <b>{formatMoneyDisplay(valor)}</b>
            </p>
            <p>
              Para: <b>{contact.nomeCompleto || contact.name}</b>
            </p>
            <div className={styles.pixtransfervalueModalBtns}>
              <button
                onClick={handleConfirm}
                className={styles.pixtransfervalueBtn}
                disabled={loading}
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.pixtransfervalueBtn}
                style={{ background: "#888" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PixTransferValue;
