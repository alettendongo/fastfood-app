import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assure-toi d'avoir fait : npm install axios

const ClientRegister = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // On prépare les données pour l'API Laravel
            const dataToSend = {
                name: `${form.prenom} ${form.nom}`, // Laravel utilise souvent 'name' par défaut
                email: form.email,
                password: form.password,
                role: "client" // On force le rôle client ici
            };

            // Appel à l'API Laravel
            const response = await axios.post("http://127.0.0.1:8000/api/register", dataToSend);

            if (response.status === 201 || response.status === 200) {
                alert("Bienvenue parmi nous ! Connectez-vous pour commander.");
                navigate("/client/login");
            }
        } catch (err) {
            // Gestion des erreurs de validation (ex: email déjà utilisé)
            if (err.response && err.response.data.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError("Erreur lors de l'inscription. Vérifiez votre connexion au serveur.");
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
            padding: "30px",
            borderRadius: "20px",
            width: "380px",
            border: "1px solid #D4AF37",
            boxShadow: "0 15px 50px rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column"
        },
        input: {
            width: "100%",
            height: "45px",
            padding: "0 15px",
            margin: "8px 0",
            backgroundColor: "#151515",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
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
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "15px",
            textTransform: "uppercase"
        },
        errorMsg: {
            color: "#ff4d4d",
            fontSize: "0.85rem",
            marginBottom: "15px",
            textAlign: "center",
            backgroundColor: "rgba(255, 77, 77, 0.1)",
            padding: "10px",
            borderRadius: "5px"
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            <div style={styles.formCard}>
                <h3 style={{ textAlign: "center", margin: "0 0 10px 0", color: "#D4AF37", fontSize: "1.6rem" }}>Espace Gourmet</h3>
                <p style={{ color: "#888", textAlign: "center", fontSize: "0.9rem", marginBottom: "20px" }}>Créez votre compte client</p>
                
                {error && <div style={styles.errorMsg}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input style={styles.input} placeholder="Prénom" required onChange={e => setForm({...form, prenom: e.target.value})} />
                        <input style={styles.input} placeholder="Nom" required onChange={e => setForm({...form, nom: e.target.value})} />
                    </div>
                    <input style={styles.input} type="email" placeholder="Votre email" required onChange={e => setForm({...form, email: e.target.value})} />
                    <input style={styles.input} type="tel" placeholder="Téléphone" required onChange={e => setForm({...form, telephone: e.target.value})} />
                    <input style={styles.input} type="password" placeholder="Mot de passe" required onChange={e => setForm({...form, password: e.target.value})} />
                    
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? "Chargement..." : "S'inscrire"}
                    </button>
                    
                    <p style={{ textAlign: "center", fontSize: "12px", marginTop: "15px", color: "#888" }}>
                        Déjà gourmet ? <span style={{ color: "#D4AF37", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/client/login")}>Se connecter</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ClientRegister;