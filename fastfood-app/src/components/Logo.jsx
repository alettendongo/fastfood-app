import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 🔥 Si on est sur la page Home → ne rien afficher
    if (location.pathname === "/") {
        return null;
    }

    const logoStyle = {
        position: "fixed",
        top: "10px",
        left: "20px",
        height: "60px",
        zIndex: 1000,
        cursor: "pointer",
    };

    return (
        <img
            src="/images/icon.jpg"
            alt="logo"
            style={logoStyle}
            onClick={() => navigate("/")}
        />
    );
};

export default Logo;