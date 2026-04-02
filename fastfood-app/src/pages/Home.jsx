import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const containerStyle = {
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  };

  const bgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  };

  const logoStyle = {
    height: "70px",
    width: "auto",
    objectFit: "contain",
  };

  
  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
  };

  const buttonStyle = {
    padding: "0.5rem 1.2rem",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#fff",
    color: "#ff9800",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "all 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "1px solid #fff",
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };
  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, buttonStyle);
  };

  return (
    <div style={containerStyle}>
      {/* Image de fond */}
      <img src="/images/fastfood-bg.jpg" alt="background" style={bgStyle} />

      {/* Logo et boutons directement sur le fond */}
      <div style={topBarStyle}>
        {/* Logo avec texte */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/icon.jpg" alt="logo" style={logoStyle} />
          
        </div>

        {/* Boutons */}
        {!user ? (
          <div style={buttonContainerStyle}>
            <button
              style={buttonStyle}
              onClick={() => navigate("/gerant/register")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Gérants
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/client")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Clients
            </button>
          </div>
        ) : (
          <div style={buttonContainerStyle}>
            <span style={{ fontWeight: "bold", fontSize: "1rem", color: "#fff" }}>{user.name}</span>
            <button
              style={buttonStyle}
              onClick={onLogout}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Deconnexion
            </button>
          </div>
        )}
      </div>

      {/* Ici tu peux ajouter ton contenu centré sur l'image de fond */}
      {/* Exemple :
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '2rem', textAlign: 'center' }}>
        Bienvenue chez FastFood
      </div>
      */}
    </div>
  );
};

export default Home;