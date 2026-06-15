import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GerantRegister = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", email: "", password: "", restaurant: "", lieu: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const gerants = JSON.parse(localStorage.getItem("gerants") || "[]");
        gerants.push(form);
        localStorage.setItem("gerants", JSON.stringify(gerants));
        alert("Inscription réussie !");
        navigate("/gerant/login");
    };

    // --- DESIGN ULTRA SERRÉ ---
    const styles = {
        background: {
            backgroundImage: 'url("/images/fastfood-bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Poppins', sans-serif",
            margin: 0,
            padding: 0,
            overflow: "hidden"
        },
        overlay: {
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)", // Plus sombre pour réduire l'impression de grandeur
            zIndex: 1
        },
        formCard: {
            position: "relative",
            zIndex: 2,
            backgroundColor: "#000", // Noir pur pour bien délimiter la carte
            padding: "15px", // Padding minimaliste
            borderRadius: "15px",
            width: "300px", // LARGEUR FIXE TRÈS PETITE
            border: "1px solid #D4AF37",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
            color: "#fff"
        },
        input: {
            width: "100%",
            height: "35px", // HAUTEUR FIXE RÉDUITE
            padding: "0 10px",
            margin: "4px 0",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "12px", // Police plus petite
            boxSizing: "border-box",
            outline: "none"
        },
        button: {
            width: "100%",
            height: "40px",
            backgroundColor: "#D4AF37",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "13px",
            cursor: "pointer",
            marginTop: "10px",
            textTransform: "uppercase"
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            
            <div style={styles.formCard}>
                <h4 style={{ textAlign: "center", margin: "0 0 10px 0", color: "#D4AF37", fontSize: "1rem" }}>
                    Inscription Pro
                </h4>

                <form onSubmit={handleSubmit}>
                    {/* Ligne 1 : Prénom / Nom */}
                    <div style={{ display: "flex", gap: "5px" }}>
                        <input style={styles.input} placeholder="Prénom" onChange={e => setForm({...form, prenom: e.target.value})} />
                        <input style={styles.input} placeholder="Nom" onChange={e => setForm({...form, nom: e.target.value})} />
                    </div>
                    
                    {/* Ligne 2 : Email */}
                    <input style={styles.input} type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
                    
                    {/* Ligne 3 : Tel / Pass */}
                    <div style={{ display: "flex", gap: "5px" }}>
                        <input style={styles.input} type="tel" placeholder="Tel" onChange={e => setForm({...form, telephone: e.target.value})} />
                        <input style={styles.input} type="password" placeholder="Pass" onChange={e => setForm({...form, password: e.target.value})} />
                    </div>
                    
                    {/* Séparation */}
                    <div style={{ borderTop: "1px solid #222", margin: "8px 0", paddingTop: "8px" }}>
                        <input style={styles.input} placeholder="Restaurant" onChange={e => setForm({...form, restaurant: e.target.value})} />
                        <input style={styles.input} placeholder="Lieu" onChange={e => setForm({...form, lieu: e.target.value})} />
                    </div>

                    <button style={styles.button}>S'inscrire</button>
                    
                    <p style={{ textAlign: "center", fontSize: "11px", marginTop: "12px", color: "#666" }}>
                        Déjà un compte ? <span style={{ color: "#D4AF37", cursor: "pointer" }} onClick={() => navigate("/gerant/login")}>Se connecter</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default GerantRegister;