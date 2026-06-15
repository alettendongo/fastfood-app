import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // On récupère les plats de ce restaurant spécifique
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error("Erreur chargement menu", err));
    }, [id]);

    const styles = {
        container: { backgroundColor: "#0a0a0a", minHeight: "100vh", color: "#fff", padding: "40px" },
        grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" },
        card: { backgroundColor: "#151515", borderRadius: "15px", padding: "15px", border: "1px solid #333", textAlign: "center" },
        image: { width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" },
        price: { color: "#D4AF37", fontWeight: "bold", fontSize: "1.2rem" }
    };

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: "center", fontSize: "2.5rem" }}>
                La Carte du <span style={{ color: "#D4AF37" }}>Restaurant</span>
            </h2>
            
            <div style={styles.grid}>
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} style={styles.card}>
                            <img src={product.image || "/images/default-food.jpg"} alt={product.name} style={styles.image} />
                            <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
                            <p style={{ fontSize: "0.9rem", color: "#888", minHeight: "40px" }}>{product.description}</p>
                            <p style={styles.price}>{product.price} FCFA</p>
                            <button style={{ marginTop: "15px", padding: "8px 15px", borderRadius: "5px", border: "none", backgroundColor: "#D4AF37", cursor: "pointer", fontWeight: "bold" }}>
                                Ajouter au panier
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", gridColumn: "1 / -1", marginTop: "50px", opacity: 0.5 }}>
                        Ce restaurant n'a pas encore ajouté de plats à sa carte.
                    </p>
                )}
            </div>
        </div>
    );
};

// 🛑 LA LIGNE MANQUANTE ÉTAIT SÛREMENT CELLE-CI :
export default RestaurantMenu;