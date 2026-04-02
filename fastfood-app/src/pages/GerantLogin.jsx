import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GerantLogin = ({ setUser }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const gerants = JSON.parse(localStorage.getItem("gerants") || "[]");

        const found = gerants.find(
        g => g.email === form.email && g.password === form.password
        );

        if (found) {
        localStorage.setItem("user", JSON.stringify(found));
        setUser(found);
        navigate("/dashboard");
        } else {
        setError("Email ou mot de passe incorrect");
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url("/images/fastfood-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)"
    };

    const formStyle = {
        position: "relative",
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        width: "320px",
        zIndex: 2,
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        textAlign: "center"
    };

    const inputStyle = {
        width: "100%",
        padding: "0.6rem",
        marginBottom: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc"
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.7rem",
        backgroundColor: "#ff4500",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "1rem"
    };

    const linkStyle = {
        color: "#ff4500",
        cursor: "pointer",
        marginLeft: "0.3rem",
        textDecoration: "underline"
    };

    return (
        <div style={backgroundStyle}>
        <div style={overlayStyle}></div>

        <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "1.5rem" }}>Connexion Gérant</h2>

            {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>
                {error}
            </p>
            )}

            <input
            style={inputStyle}
            type="email"
            placeholder="Adresse mail"
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            />

            <input
            style={inputStyle}
            type="password"
            placeholder="Mot de passe"
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            />

            <button style={buttonStyle}>Se connecter</button>

            <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Vous n’avez pas de compte ?
            <span style={linkStyle} onClick={() => navigate("/gerant/register")}>
                S’inscrire
            </span>
            </p>
        </form>
        </div>
    );
};

export default GerantLogin;