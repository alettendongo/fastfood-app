import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRestaurant = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", address: "", logo: null });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("address", form.address);
        if (form.logo) formData.append("logo", form.logo);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://127.0.0.1:8000/api/restaurants", formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data" 
                }
            });
            alert("Restaurant créé avec succès !");
            navigate("/dashboard"); // Retour au dashboard pour ajouter des plats
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white", padding: "50px" }}>
            <div style={{ maxWidth: "500px", margin: "0 auto", padding: "30px", border: "1px solid #D4AF37", borderRadius: "15px" }}>
                <h2 style={{ color: "#D4AF37" }}>Configurer mon Restaurant</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nom du restaurant" required style={styles.input} 
                           onChange={e => setForm({...form, name: e.target.value})} />
                    <input type="text" placeholder="Adresse" required style={styles.input} 
                           onChange={e => setForm({...form, address: e.target.value})} />
                    <label style={{ display: "block", marginTop: "15px", color: "#888" }}>Logo du restaurant :</label>
                    <input type="file" accept="image/*" style={styles.input} 
                           onChange={e => setForm({...form, logo: e.target.files[0]})} />
                    
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Chargement..." : "Enregistrer mon Restaurant"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    input: { width: "100%", padding: "12px", margin: "10px 0", backgroundColor: "#151515", border: "1px solid #333", color: "white", borderRadius: "8px" },
    button: { width: "100%", padding: "14px", backgroundColor: "#D4AF37", color: "black", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "20px" }
};

export default CreateRestaurant;