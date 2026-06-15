import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", description: "", price: "", category: "Plat", image: null });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description || "");
        formData.append("price", form.price);
        formData.append("category", form.category);
        
        // On n'ajoute l'image que si elle existe
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://127.0.0.1:8000/api/products", formData, {
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });

            alert(response.data.message);
            navigate("/dashboard");
        } catch (err) {
            // Affiche l'erreur précise de Laravel (ex: "The image failed to upload")
            const errorMsg = err.response?.data?.message || "Erreur lors de l'ajout du produit";
            alert("Erreur : " + errorMsg);
            console.error("Détails de l'erreur:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white", padding: "50px" }}>
            <div style={{ maxWidth: "500px", margin: "0 auto", background: "#111", padding: "30px", borderRadius: "15px" }}>
                <h2 style={{ color: "#D4AF37" }}>Ajouter un plat au menu</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nom du plat" required style={styles.input} 
                           onChange={e => setForm({...form, name: e.target.value})} />
                    
                    <textarea placeholder="Description / Ingrédients" style={styles.input} 
                              onChange={e => setForm({...form, description: e.target.value})} />
                    
                    <input type="number" placeholder="Prix (FCFA)" required style={styles.input} 
                           onChange={e => setForm({...form, price: e.target.value})} />
                    
                    <select style={styles.input} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="Plat">Plat</option>
                        <option value="Entrée">Entrée</option>
                        <option value="Boisson">Boisson</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <label style={{display: 'block', margin: '10px 0', color: '#888'}}>Image du produit :</label>
                    <input type="file" accept="image/*" style={styles.input} 
                           onChange={e => setForm({...form, image: e.target.files[0]})} />
                    
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Chargement..." : "Ajouter le produit"}
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

export default AddProduct;