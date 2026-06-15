import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const GerantLogin = ({ setUser }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Appel à ton API Laravel
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: form.email,
                password: form.password
            });

            // Si la connexion réussit
            if (response.data.token) {
                const userData = response.data.user;
                
                // Stockage sécurisé du token et des infos
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(userData));
                
                // Mise à jour de l'état global de l'app
                setUser(userData);

                // --- LOGIQUE DE REDIRECTION INTELLIGENTE ---
                // On vérifie si le gérant a déjà créé son restaurant
                if (response.data.hasRestaurant) {
                    // S'il a déjà un resto, on l'envoie sur son Dashboard
                    navigate("/dashboard"); 
                } else {
                    // S'il n'a pas encore de resto, on l'envoie obligatoirement le CRÉER d'abord
                    navigate("/create-restaurant");
                }
            }
        } catch (err) {
            // Gestion des erreurs
            if (err.response && err.response.status === 401) {
                setError("Email inconnu ou mot de passe incorrect.");
            } else {
                setError("Erreur de connexion au serveur. Vérifiez que Laravel est lancé.");
            }
        } finally {
            setLoading(false);
        }
    };

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
            position: "fixed", 
            top: 0, left: 0 
        },
        overlay: { 
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
            backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1 
        },
        formCard: { 
            position: "relative", zIndex: 2, 
            backgroundColor: "#0a0a0a", 
            padding: "40px 30px", 
            borderRadius: "20px", 
            width: "360px", 
            border: "1px solid #D4AF37", 
            boxShadow: "0 15px 50px rgba(0,0,0,0.9)", 
            textAlign: "center" 
        },
        input: { 
            width: "100%", 
            height: "45px", 
            padding: "0 15px", 
            margin: "10px 0", 
            backgroundColor: "#151515", 
            border: "1px solid #333", 
            borderRadius: "8px", 
            color: "#fff", 
            boxSizing: "border-box", 
            outline: "none" 
        },
        button: { 
            width: "100%", 
            padding: "14px", 
            backgroundColor: loading ? "#888" : "#D4AF37", 
            color: "#000", 
            border: "none", 
            borderRadius: "8px", 
            fontWeight: "800", 
            cursor: loading ? "not-allowed" : "pointer", 
            marginTop: "20px",
            transition: "0.3s"
        },
        errorMsg: { 
            color: "#ff4d4d", 
            fontSize: "0.85rem", 
            marginBottom: "15px", 
            backgroundColor: "rgba(255, 77, 77, 0.1)", 
            padding: "10px", 
            borderRadius: "5px" 
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            <div style={styles.formCard}>
                <h3 style={{ color: "#D4AF37", fontSize: "1.8rem", margin: "0 0 10px 0" }}>Espace Gérant</h3>
                <p style={{ color: "#888", marginBottom: "25px" }}>Connectez-vous pour gérer votre établissement</p>

                {error && <div style={styles.errorMsg}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Adresse email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Mot de passe"
                        required
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button 
                        style={styles.button} 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p style={{ marginTop: "20px", color: "#666", fontSize: "0.85rem" }}>
                    Vous n'êtes pas gérant ? 
                    <span 
                        onClick={() => navigate("/client/login")}
                        style={{ color: "#D4AF37", cursor: "pointer", marginLeft: "5px" }}
                    >
                        Espace Client
                    </span>
                </p>
            </div>
        </div>
    );
};

export default GerantLogin;