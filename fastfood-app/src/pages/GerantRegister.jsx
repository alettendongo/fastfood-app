import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GerantRegister = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        prenom: "",
        nom: "",
        telephone: "",
        email: "",
        password: "",
        restaurant: "",
        lieu: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const gerants = JSON.parse(localStorage.getItem("gerants") || "[]");

        gerants.push(form);

        localStorage.setItem("gerants", JSON.stringify(gerants));

        alert("Inscription réussie !");
        navigate("/gerant/login");
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
        width: "350px",
        zIndex: 2,
        boxShadow: "0 0 20px rgba(0,0,0,0.3)"
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
        marginTop: "0.5rem"
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
            <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Inscription Gérant
            </h2>

            <input style={inputStyle} placeholder="Prénom" onChange={e => setForm({...form, prenom: e.target.value})} />
            <input style={inputStyle} placeholder="Nom" onChange={e => setForm({...form, nom: e.target.value})} />
            <input style={inputStyle} placeholder="Téléphone" onChange={e => setForm({...form, telephone: e.target.value})} />
            <input style={inputStyle} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
            <input style={inputStyle} type="password" placeholder="Mot de passe" onChange={e => setForm({...form, password: e.target.value})} />
            <input style={inputStyle} placeholder="Nom du restaurant" onChange={e => setForm({...form, restaurant: e.target.value})} />
            <input style={inputStyle} placeholder="Lieu" onChange={e => setForm({...form, lieu: e.target.value})} />

            <button style={buttonStyle}>S’inscrire</button>

            <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
            Déjà un compte ?
            <span style={linkStyle} onClick={() => navigate("/gerant/login")}>
                Se connecter
            </span>
            </p>
        </form>
        </div>
    );
};

export default GerantRegister;