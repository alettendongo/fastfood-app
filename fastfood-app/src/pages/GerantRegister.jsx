import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // N'oublie pas : npm install axios

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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // On prépare les données pour Laravel
            // On combine prenom et nom pour le champ 'name' requis par Laravel
            const dataToSend = {
                name: `${form.prenom} ${form.nom}`,
                email: form.email,
                password: form.password,
                role: "gerant", // On définit le rôle ici
                // Optionnel : tu peux ajouter telephone et restaurant si tu as ajouté ces colonnes dans ta migration users
                telephone: form.telephone,
                restaurant: form.restaurant,
                lieu: form.lieu
            };

            const response = await axios.post("http://127.0.0.1:8000/api/register", dataToSend);

            if (response.status === 201 || response.status === 200) {
                alert("Inscription réussie ! Veuillez vous connecter.");
                navigate("/gerant/login");
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                // Récupère le premier message d'erreur de Laravel (ex: email déjà pris)
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError(err.response?.data?.message || "Erreur lors de l'inscription. Vérifiez votre serveur.");
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
            height: "42px",
            padding: "0 15px",
            margin: "6px 0",
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
            marginBottom: "10px",
            textAlign: "center",
            backgroundColor: "rgba(255, 77, 77, 0.1)",
            padding: "8px",
            borderRadius: "5px"
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            <div style={styles.formCard}>
                <h3 style={{ textAlign: "center", margin: "0 0 20px 0", color: "#D4AF37", fontSize: "1.4rem" }}>Espace Gérant</h3>
                
                {error && <div style={styles.errorMsg}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input style={styles.input} placeholder="Prénom" required onChange={e => setForm({...form, prenom: e.target.value})} />
                        <input style={styles.input} placeholder="Nom" required onChange={e => setForm({...form, nom: e.target.value})} />
                    </div>
                    <input style={styles.input} type="email" placeholder="Email professionnel" required onChange={e => setForm({...form, email: e.target.value})} />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input style={styles.input} type="tel" placeholder="Téléphone" required onChange={e => setForm({...form, telephone: e.target.value})} />
                        <input style={styles.input} type="password" placeholder="Mot de passe" required onChange={e => setForm({...form, password: e.target.value})} />
                    </div>
                    <div style={{ borderTop: "1px solid #222", margin: "15px 0", paddingTop: "15px" }}>
                        <input style={styles.input} placeholder="Nom du restaurant" required onChange={e => setForm({...form, restaurant: e.target.value})} />
                        <input style={styles.input} placeholder="Lieu" required onChange={e => setForm({...form, lieu: e.target.value})} />
                    </div>
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? "Inscription en cours..." : "Valider l'inscription"}
                    </button>
                    <p style={{ textAlign: "center", fontSize: "12px", marginTop: "15px", color: "#888" }}>
                        Déjà inscrit ? <span style={{ color: "#D4AF37", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/gerant/login")}>Connexion</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default GerantRegister;