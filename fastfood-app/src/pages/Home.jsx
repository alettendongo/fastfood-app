import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const styles = {
    container: { width: "100%", height: "100vh", position: "relative", overflow: "hidden", fontFamily: "'Poppins', sans-serif", color: "#FFFFFF" },
    background: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "url('/images/fastfood-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", zIndex: -2 },
    overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)", zIndex: -1 },
    navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 5%", zIndex: 10 },
    logo: { height: "110px", width: "auto", borderRadius: "20px", boxShadow: "0 15px 35px rgba(0,0,0,0.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)", transition: "0.3s" },
    loginBtn: { padding: "0.8rem 2.2rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontWeight: "500", cursor: "pointer", backdropFilter: "blur(10px)", transition: "0.4s" },
    hero: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", width: "90%" },
    slogan: { fontSize: "4.8rem", fontWeight: "700", letterSpacing: "-2.5px", lineHeight: "1", marginBottom: "1.5rem" },
    accent: { color: "#D4AF37" },
    actionBtn: { padding: "1.2rem 3rem", borderRadius: "15px", border: "none", backgroundColor: "#D4AF37", color: "black", fontWeight: "700", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)", transition: "0.3s" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modalCard: { backgroundColor: "#111111", padding: "3.5rem 3rem", borderRadius: "30px", width: "90%", maxWidth: "480px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" },
    roleCard: { display: "flex", alignItems: "center", padding: "1.8rem", margin: "1.2rem 0", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "0.3s", backgroundColor: "rgba(255,255,255,0.02)", textAlign: "left", width: "100%", borderStyle: "solid" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>

      <nav style={styles.navbar}>
        <img src="/images/icon.jpg" alt="Logo" style={styles.logo} onClick={() => navigate("/")} onMouseOver={(e) => e.target.style.transform = "scale(1.05)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}/>
        <button style={styles.loginBtn} onClick={user ? onLogout : () => setShowModal(true)}>
          {user ? `Déconnexion (${user.prenom || user.name})` : "Connexion"}
        </button>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.slogan}>Une plateforme, <br /><span style={styles.accent}>mille saveurs.</span></h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: "3.5rem" }}>Découvrez les meilleures tables ou propulsez votre restaurant vers de nouveaux sommets.</p>
        {!user && <button style={styles.actionBtn} onClick={() => setShowModal(true)}>Commander Maintenant</button>}
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "2.5rem" }}>Bienvenue</h2>
            
            {/* BOUTON ESPACE GOURMET CORRIGÉ ICI */}
            <button 
              style={styles.roleCard} 
              onClick={() => navigate("/client/register")} // Redirige maintenant vers l'inscription client
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D4AF37"} 
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <div style={{ fontSize: "2.5rem", marginRight: "1.5rem" }}>🍱</div>
              <div>
                <div style={{ fontWeight: "600", color: "white" }}>Espace Gourmet</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Je souhaite commander un repas</div>
              </div>
            </button>

            <button 
              style={styles.roleCard} 
              onClick={() => navigate("/gerant/register")} 
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D4AF37"} 
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <div style={{ fontSize: "2.5rem", marginRight: "1.5rem" }}>🏛️</div>
              <div>
                <div style={{ fontWeight: "600", color: "white" }}>Espace Partenaire</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Je souhaite inscrire mon restaurant</div>
              </div>
            </button>
            
            <p onClick={() => setShowModal(false)} style={{ marginTop: "2.5rem", cursor: "pointer", opacity: 0.4 }}>Retour à l'accueil</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;