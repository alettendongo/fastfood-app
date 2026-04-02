import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ AJOUT

const DashboardGerant = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // ✅ AJOUT

  const [activeTab, setActiveTab] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return <h2>Veuillez vous connecter</h2>;

  const backgroundStyle = {
    backgroundImage: 'url("/images/fastfood-bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: menuOpen ? "0" : "-300px",
    width: "300px",
    height: "100%",
    backgroundColor: "#fff",
    padding: "1.5rem",
    transition: "0.3s",
    zIndex: 1000,
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
  };

  const menuHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    height: "40px",
    filter: "invert(42%) sepia(87%) saturate(5000%) hue-rotate(5deg)",
  };

  const hamburgerStyle = {
    position: "fixed",
    top: "60px",
    left: "20px",
    cursor: "pointer",
    zIndex: 1100,
  };

  const lineStyle = {
    width: "25px",
    height: "3px",
    background: "#fff",
    margin: "5px 0",
  };

  // ✅ MENU ITEM CORRIGÉ
  const menuItem = (label, key, icon) => (
    <div
      onClick={() => {
        if (key === "info") {
          navigate("/profile"); // 🔥 REDIRECTION
        } else {
          setActiveTab(key);
        }
        setMenuOpen(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "18px",
        margin: "1rem 0",
        cursor: "pointer",
        fontWeight: "bold",
        color: activeTab === key ? "#ff9800" : "#333",
        backgroundColor:
          activeTab === key ? "rgba(255,152,0,0.1)" : "transparent",
        padding: "10px",
        borderRadius: "8px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255,152,0,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor =
          activeTab === key
            ? "rgba(255,152,0,0.1)"
            : "transparent")
      }
    >
      <img src={icon} alt={label} style={{ height: "24px" }} />
      {label}
    </div>
  );

  return (
    <div style={backgroundStyle}>
      {!menuOpen && (
        <div style={hamburgerStyle} onClick={() => setMenuOpen(true)}>
          <div style={lineStyle}></div>
          <div style={lineStyle}></div>
          <div style={lineStyle}></div>
        </div>
      )}

      <div style={sidebarStyle}>
        <div style={menuHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/images/icon.jpg" alt="logo" style={logoStyle} />
            <h2>Menus</h2>
          </div>

          <span
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </span>
        </div>

        {/* ✅ MENU */}
        {menuItem("Accueil", "accueil", "/images/home-icon.jpg")}
        {menuItem("Mes informations", "info", "/images/info-icon.jpg")}
        {menuItem("Produits", "produits", "/images/food-icon.jpg")}
        {menuItem("Commandes", "commandes", "/images/order-icon.jpg")}
        {menuItem("Contact", "contact", "/images/contact-icon.jpg")}
      </div>

      <div style={{ minHeight: "100vh" }}>
        {activeTab === "accueil" && <div style={{ height: "100vh" }} />}

        {/* ❌ ON PEUT SUPPRIMER ÇA SI TU VEUX */}
        {activeTab === "info" && (
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.9)" }}>
            <h1>Bienvenue {user.prenom} 👋</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardGerant;