import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientLogin = ({ setUser }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // APPEL À L'API LARAVEL
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: form.email,
                password: form.password
            });

            if (response.data.token) {
                // 1. Stockage des informations dans le navigateur
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                // 2. Mise à jour de l'état global de l'application
                setUser(response.data.user);
                
                // 3. REDIRECTION SELON LE RÔLE
                if (response.data.user.role === 'client') {
                    // Redirection directe vers la page de commande du restaurant unique
                    navigate("/client/dashboard"); 
                } else if (response.data.user.role === 'gerant') {
                    // Vers le panneau de gestion du restaurant
                    navigate("/dashboard"); 
                }
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Email ou mot de passe incorrect.");
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
            fontSize: "14px",
            boxSizing: "border-box",
            outline: "none",
            transition: "0.3s border-color"
        },
        button: {
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#888" : "#D4AF37",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontWeight: "800",
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "20px",
            textTransform: "uppercase",
            transition: "0.3s",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)"
        },
        errorMsg: {
            color: "#ff4d4d",
            fontSize: "0.85rem",
            marginBottom: "15px",
            backgroundColor: "rgba(255, 77, 77, 0.1)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid rgba(255, 77, 77, 0.2)"
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            <div style={styles.formCard}>
                <h3 style={{ margin: "0 0 10px 0", color: "#D4AF37", fontSize: "1.8rem", fontWeight: "900" }}>
                    DÉLICES D'ALETTE
                </h3>
                <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "25px" }}>
                    Connectez-vous pour savourer l'excellence.
                </p>

                {error && <div style={styles.errorMsg}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Votre email"
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
                        onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                        {loading ? "Vérification..." : "Se connecter"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: "13px", marginTop: "25px", color: "#888" }}>
                    Pas encore membre ? 
                    <span 
                        style={{ color: "#D4AF37", cursor: "pointer", fontWeight: "bold", marginLeft: "5px" }} 
                        onClick={() => navigate("/client/register")}
                    >
                        Créer un compte
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ClientLogin;