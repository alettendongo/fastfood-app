import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // 1. Récupérer les infos du restaurant spécifique
        // On filtre depuis la liste globale ou on crée une route spécifique
        const resRestos = await axios.get("http://127.0.0.1:8000/api/restaurants");
        const found = resRestos.data.find(r => r.id === parseInt(id));
        setRestaurant(found);

        // 2. Récupérer les produits (menus) de ce restaurant
        const resProducts = await axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/products`);
        setProducts(resProducts.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleOrder = async (product) => {
    if (!window.confirm(`Confirmer la commande de : ${product.name} ?`)) return;

    try {
      await axios.post("http://127.0.0.1:8000/api/orders", {
        restaurant_id: id,
        total: product.price,
        client_name: user.name, // Nom récupéré du localStorage
        status: "En attente",
        delivery_address: "À préciser par téléphone", // Tu pourras ajouter un input plus tard
        client_phone: "Non renseigné"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Commande réussie ! Retrouvez-la dans votre tableau de bord.");
      navigate("/client/dashboard");
    } catch (err) {
      alert("Erreur lors de la commande. Veuillez réessayer.");
    }
  };

  if (loading) return <div style={{ color: "#D4AF37", textAlign: "center", marginTop: "50px" }}>Chargement du menu...</div>;

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white", padding: "30px 5%" }}>
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: "none", border: "1px solid #D4AF37", color: "#D4AF37", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}
      >
        ← Retour aux restaurants
      </button>

      {/* Header Restaurant */}
      {restaurant && (
        <div style={{ textAlign: "center", marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "30px" }}>
          <img 
            src={restaurant.logo || "/images/default-resto.jpg"} 
            alt={restaurant.name} 
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #D4AF37" }}
          />
          <h1 style={{ color: "#D4AF37", fontSize: "2.5rem", margin: "15px 0 5px 0" }}>{restaurant.name}</h1>
          <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>📍 {restaurant.address}</p>
          {restaurant.description && (
            <p style={{ maxWidth: "600px", margin: "15px auto", fontStyle: "italic", color: "#bbb" }}>
              "{restaurant.description}"
            </p>
          )}
        </div>
      )}

      {/* Liste des Produits */}
      <h2 style={{ marginBottom: "25px", borderLeft: "4px solid #D4AF37", paddingLeft: "15px" }}>Menu & Carte</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ background: "#151515", borderRadius: "15px", overflow: "hidden", border: "1px solid #333", display: "flex", flexDirection: "column" }}>
              <img 
                src={product.image || "/images/default-food.jpg"} 
                alt={product.name} 
                style={{ width: "100%", height: "200px", objectFit: "cover" }} 
              />
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ color: "#D4AF37", margin: "0 0 10px 0" }}>{product.name}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#aaa", lineHeight: "1.4" }}>{product.description}</p>
                </div>
                
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{Math.floor(product.price)} FCFA</span>
                  <button 
                    onClick={() => handleOrder(product)}
                    style={{ backgroundColor: "#D4AF37", color: "#000", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "800", cursor: "pointer", transition: "0.3s" }}
                  >
                    Commander
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", opacity: 0.5 }}>Aucun produit disponible pour ce restaurant.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;