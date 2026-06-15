import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, Clock, MapPin, LogOut, ClipboardList, Utensils, Star, Send, XCircle } from "lucide-react";
// Assure-toi que le chemin vers ton image est correct
import burgerImage from "../assets/burger.jpg";

const ClientDashboard = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("Localisation en cours...");

  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://127.0.0.1:8000";
  const userName = user?.prenom || user?.name || "Alette";

  useEffect(() => {
    // Gestion de la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geoRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          setAddress(geoRes.data.display_name.split(',').slice(0, 3).join(', '));
        } catch (err) {
          setAddress("Diamniadio, Sénégal");
        }
      });
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/restaurants/1/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur produits :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchMyOrders();
  }, [token]);

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/client/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyOrders(res.data);
    } catch (err) {
      console.error("Erreur commandes :", err);
    }
  };

  const handleOrder = async (product) => {
    const confirmMsg = `Coucou ${userName} ! ✨\nConfirmez-vous la commande de "${product.name}" pour ${product.price} FCFA ?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.post(`${API_BASE_URL}/api/orders`, {
        restaurant_id: 1,
        total: product.price,
        delivery_address: address,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      alert(`Super choix ${userName} ! 🚀\nVotre commande est en route vers : ${address}`);
      fetchMyOrders();
      setActiveTab("commandes");
    } catch (err) {
      alert("Oups ! Une petite erreur est survenue lors de la commande.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Voulez-vous vraiment annuler cette commande ?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Commande annulée avec succès.");
      fetchMyOrders();
    } catch (err) {
      alert("Impossible d'annuler cette commande.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}/${imagePath}`;
  };

  // --- PALETTE SOMBRE ÉLÉGANTE (MIDNIGHT & GOLD) ---
  const colors = {
    bg: "#0F1115",           
    bgCard: "#1A1D23",       
    headerNav: "#16191E",    
    textMain: "#FFFFFF",     
    textLight: "#9BA3AF",    
    primary: "#D4AF37",      
    border: "#2D323C"        
  };

  const styles = {
    container: { backgroundColor: colors.bg, minHeight: "100vh", color: colors.textMain, fontFamily: "'Poppins', sans-serif" },
    header: { 
      display: "flex", justifyContent: "space-between", alignItems: "center", 
      padding: "15px 8%", backgroundColor: colors.headerNav, 
      borderBottom: `1px solid ${colors.border}`, 
      position: "sticky", top: 0, zIndex: 100 
    },
    brand: { fontSize: "1.8rem", fontWeight: "900", color: colors.primary, margin: 0, letterSpacing: "-1px" },
    nav: { display: "flex", justifyContent: "center", gap: "40px", padding: "18px 0", background: colors.headerNav, borderBottom: `1px solid ${colors.border}` },
    navLink: (active) => ({
      display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600",
      color: active ? colors.primary : colors.textLight, padding: "10px 24px", borderRadius: "30px",
      background: active ? "rgba(212, 175, 55, 0.1)" : "transparent", transition: "all 0.3s ease",
      border: active ? `1px solid ${colors.primary}` : "1px solid transparent"
    }),
    hero: { 
      padding: "80px 8%", textAlign: "left", height: "450px", display: "flex", alignItems: "center",
      backgroundImage: `linear-gradient(to right, ${colors.bg} 40%, transparent), url(${burgerImage})`,
      backgroundSize: "contain", backgroundPosition: "right center", backgroundRepeat: "no-repeat",
      marginBottom: "40px", borderBottom: `1px solid ${colors.border}`
    },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "35px", padding: "0 8% 60px" },
    card: { 
      background: colors.bgCard, borderRadius: "28px", overflow: "hidden", 
      border: `1px solid ${colors.border}`, transition: "transform 0.3s ease"
    },
    cardBody: { padding: "25px" },
    priceTag: { background: colors.primary, color: "#000", padding: "6px 15px", borderRadius: "12px", fontWeight: "900", fontSize: "1rem" },
    btnOrder: { 
      width: "100%", padding: "15px", border: "none", borderRadius: "18px", 
      background: colors.primary, color: "#000", 
      fontWeight: "800", fontSize: "1rem", cursor: "pointer", transition: "0.3s",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
    },
    btnCancel: {
      marginTop: "10px", padding: "8px 12px", border: "1px solid #FF5E5E", borderRadius: "10px",
      background: "transparent", color: "#FF5E5E", fontSize: "0.75rem",
      fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px"
    },
    orderCard: { background: colors.bgCard, padding: "25px", borderRadius: "24px", marginBottom: "20px", border: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
    statusBadge: (status) => ({
      padding: "6px 16px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold",
      background: status === "En attente" ? "rgba(212, 175, 55, 0.1)" : "rgba(0, 255, 102, 0.1)",
      color: status === "En attente" ? colors.primary : "#00FF66",
      border: `1px solid ${status === "En attente" ? "rgba(212, 175, 55, 0.2)" : "rgba(0, 255, 102, 0.2)"}`
    })
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.brand}>DÉLICES D'ALETTE</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textLight, fontSize: "0.8rem", marginTop: "4px" }}>
            <MapPin size={14} color={colors.primary} /> {address}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "700" }}>{userName}</p>
            <p style={{ margin: 0, fontSize: "0.7rem", color: colors.primary }}>MEMBRE VIP</p>
          </div>
          <button onClick={onLogout} style={{ background: "#2A2F3A", border: "none", width: "42px", height: "42px", borderRadius: "14px", cursor: "pointer", color: "#FF5E5E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navLink(activeTab === "menu")} onClick={() => setActiveTab("menu")}>
          <Utensils size={18} /> Menu Gourmet
        </div>
        <div style={styles.navLink(activeTab === "commandes")} onClick={() => setActiveTab("commandes")}>
          <ClipboardList size={18} /> Mes Commandes ({myOrders.length})
        </div>
      </nav>

      {/* ONGLET : MENU */}
      {activeTab === "menu" && (
        <>
          <section style={styles.hero}>
            <div style={{ background: "rgba(0, 0, 0, 0.6)", padding: "40px", borderRadius: "30px", backdropFilter: "blur(8px)", border: `1px solid ${colors.border}` }}>
              <span style={{ color: colors.primary, fontWeight: "700", letterSpacing: "3px", fontSize: "0.8rem", textTransform: "uppercase" }}>Sénégal Gastronomie</span>
              <h2 style={{ fontSize: "3.5rem", fontWeight: "900", margin: "10px 0", lineHeight: 1.1 }}>L'Excellence <br/>dans l'Assiette.</h2>
              <p style={{ color: colors.textLight, maxWidth: "400px", fontSize: "1rem", margin: "20px 0" }}>Des grillades savoureuses aux spécialités locales, découvrez le meilleur de notre terroir.</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: colors.bgCard, padding: "10px 20px", borderRadius: "15px", width: "fit-content" }}>
                <Clock size={18} color={colors.primary} /> <span style={{fontSize: "0.9rem", fontWeight: "600"}}>Prêt en 25 min</span>
              </div>
            </div>
          </section>

          <div style={styles.grid}>
            {loading ? (
              <p style={{gridColumn: '1/-1', textAlign: 'center', color: colors.textLight}}>Chargement de la carte...</p>
            ) : products.map(product => (
              <div key={product.id} style={styles.card}>
                <div style={{ position: "relative", padding: "12px" }}>
                  <img src={getImageUrl(product.image)} alt={product.name} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "20px" }} />
                  <div style={{ position: "absolute", bottom: "25px", right: "25px" }}>
                    <div style={styles.priceTag}>{product.price} <small>FCFA</small></div>
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "1.3rem", fontWeight: "700" }}>{product.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "15px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={colors.primary} color={colors.primary} />)}
                  </div>
                  <p style={{ color: colors.textLight, fontSize: "0.85rem", marginBottom: "25px", height: "40px", overflow: "hidden" }}>{product.description || "Une expérience culinaire unique."}</p>
                  <button style={styles.btnOrder} onClick={() => handleOrder(product)}>
                    Commander maintenant <Send size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ONGLET : COMMANDES */}
      {activeTab === "commandes" && (
        <div style={{ padding: "60px 8%", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "40px" }}>Historique Gourmet</h2>
          {myOrders.length === 0 ? (
            <p style={{textAlign: 'center', color: colors.textLight}}>Aucune commande pour le moment.</p>
          ) : myOrders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ background: "#2A2F3A", padding: "18px", borderRadius: "18px" }}>
                  <ShoppingBag color={colors.primary} size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>Commande #{order.id}</h4>
                  <p style={{ margin: "5px 0", color: colors.textLight, fontSize: "0.8rem" }}>{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                  {order.status === "En attente" && (
                    <button style={styles.btnCancel} onClick={() => handleCancelOrder(order.id)}>
                      <XCircle size={14} /> Annuler
                    </button>
                  )}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: "10px" }}><span style={styles.statusBadge(order.status)}>{order.status}</span></div>
                <span style={{ fontWeight: "900", fontSize: "1.3rem" }}>{order.total} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;