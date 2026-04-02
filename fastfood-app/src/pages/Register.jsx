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

    const inputStyle = {
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem"
    };

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Inscription Gérants</h2>

        <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Prénom" onChange={e => setForm({...form, prenom: e.target.value})} />
            <input style={inputStyle} placeholder="Nom" onChange={e => setForm({...form, nom: e.target.value})} />
            <input style={inputStyle} placeholder="Téléphone" onChange={e => setForm({...form, telephone: e.target.value})} />
            <input style={inputStyle} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
            <input style={inputStyle} type="password" placeholder="Mot de passe" onChange={e => setForm({...form, password: e.target.value})} />
            <input style={inputStyle} placeholder="Nom du restaurant" onChange={e => setForm({...form, restaurant: e.target.value})} />
            <input style={inputStyle} placeholder="Lieu" onChange={e => setForm({...form, lieu: e.target.value})} />

            <button>S’inscrire</button>
        </form>
        </div>
    );
};

export default GerantRegister;