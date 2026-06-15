import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardGerant = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  // États pour la modification de produit
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", price: "", category: "", image: null });

  // États pour la modification du restaurant
  const [isEditingResto, setIsEditingResto] = useState(false);
  const [restoForm, setRestoForm] = useState({ name: "", address: "", phone: "", description: "", logo: null });

  // --- FONCTIONS DE RÉCUPÉRATION ---

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Erreur produits", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Erreur commandes", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantInfo = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/my-restaurant", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyRestaurant(response.data);
    } catch (err) {
      console.error("Erreur restaurant", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (activeTab === "produits") fetchProducts();
      if (activeTab === "commandes") fetchOrders();
      if (activeTab === "mon_resto") fetchRestaurantInfo();
    }
  }, [activeTab]);

  // --- GESTION RESTAURANT ---

  const handleUpdateRestaurant = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", restoForm.name);
    formData.append("address", restoForm.address);
    formData.append("phone", restoForm.phone || "");
    formData.append("description", restoForm.description || "");
    if (restoForm.logo) formData.append("logo", restoForm.logo);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://127.0.0.1:8000/api/my-restaurant/update", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      setMyRestaurant(response.data.restaurant);
      setIsEditingResto(false);
      alert("Profil mis à jour !");
    } catch (err) {
      alert("Erreur lors de la mise à jour du restaurant");
    }
  };

  // --- GESTION COMMANDES ---

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); 
      alert("Statut mis à jour !");
    } catch (err) {
      alert("Erreur de mise à jour du statut");
    }
  };

  // --- GESTION PRODUITS ---

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description || "",
      price: Math.floor(product.price),
      category: product.category,
      image: null
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    formData.append("price", editForm.price);
    formData.append("category", editForm.category);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://127.0.0.1:8000/api/products/${editingProduct.id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Produit mis à jour !");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Erreur lors de la modification");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce plat ?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.filter(p => p.id !== productId));
        alert("Produit supprimé !");
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (!user) return <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Veuillez vous connecter</h2>;

  const styles = {
    background: { backgroundImage: 'url("/images/fastfood-bg.jpg")', backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", width: "100%", position: "relative" },
    overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1 },
    sidebar: { position: "fixed", top: 0, left: menuOpen ? "0" : "-300px", width: "300px", height: "100%", backgroundColor: "#fff", padding: "1.5rem", transition: "0.4s", zIndex: 1000 },
    tabItem: { cursor: "pointer", padding: "12px", borderRadius: "8px", marginBottom: "5px", transition: "0.3s", display: "flex", alignItems: "center", gap: "10px", color: "#333", fontWeight: "500" },
    content: { position: "relative", zIndex: 2, padding: "80px 5%", color: "white" },
    card: { backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "20px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", marginBottom: "20px" },
    productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "25px", marginTop: "30px" },
    productCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "15px", padding: "15px", border: "1px solid rgba(212, 175, 55, 0.3)", textAlign: "center" },
    actionBtn: { padding: "10px 20px", backgroundColor: "#D4AF37", color: "black", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
    editBtn: { backgroundColor: "#4A90E2", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginRight: "5px" },
    deleteBtn: { backgroundColor: "#E74C3C", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" },
    statusBtn: { backgroundColor: "#2ECC71", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "0.8rem" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 2000, display: "flex", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: "#111", padding: "30px", borderRadius: "15px", width: "90%", maxWidth: "400px", border: "1px solid #D4AF37" },
    input: { width: "100%", padding: "10px", margin: "10px 0", backgroundColor: "#222", border: "1px solid #444", color: "white", borderRadius: "5px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", color: "white" }
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>

      {/* MODALE MODIFICATION PRODUIT */}
      {editingProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ color: "#D4AF37" }}>Modifier : {editingProduct.name}</h3>
            <form onSubmit={handleUpdateProduct}>
              <input style={styles.input} type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Nom" required />
              <textarea style={styles.input} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} placeholder="Description" />
              <input style={styles.input} type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} placeholder="Prix" required />
              <select style={styles.input} value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                <option value="Plat">Plat</option>
                <option value="Entrée">Entrée</option>
                <option value="Boisson">Boisson</option>
                <option value="Dessert">Dessert</option>
              </select>
              <input style={styles.input} type="file" onChange={e => setEditForm({...editForm, image: e.target.files[0]})} />
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button type="submit" style={styles.actionBtn}>Enregistrer</button>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ ...styles.actionBtn, backgroundColor: "#555", color: "white" }}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOUTON MENU MOBILE */}
      <div style={{ position: "fixed", top: "30px", left: "30px", zIndex: 1100, cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)}>
        <div style={{ width: "30px", height: "3px", background: "#D4AF37", margin: "6px 0" }}></div>
        <div style={{ width: "30px", height: "3px", background: "#D4AF37", margin: "6px 0" }}></div>
        <div style={{ width: "30px", height: "3px", background: "#D4AF37", margin: "6px 0" }}></div>
      </div>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "#D4AF37", marginBottom: "2rem" }}>Mon Resto</h2>
        <div onClick={() => {setActiveTab("accueil"); setMenuOpen(false)}} style={styles.tabItem}>🏠 Accueil</div>
        <div onClick={() => {setActiveTab("produits"); setMenuOpen(false)}} style={styles.tabItem}>🍔 Mes Produits</div>
        <div onClick={() => {setActiveTab("commandes"); setMenuOpen(false)}} style={styles.tabItem}>📦 Mes Commandes</div>
        <div onClick={() => {setActiveTab("mon_resto"); setMenuOpen(false)}} style={styles.tabItem}>🏪 Mon Restaurant</div>
        <hr style={{ margin: "20px 0" }} />
        <div onClick={() => { localStorage.clear(); navigate("/"); }} style={{ ...styles.tabItem, color: "red" }}>Déconnexion</div>
      </div>

      <div style={styles.content}>
        
        {/* ONGLET ACCUEIL */}
        {activeTab === "accueil" && (
          <div style={styles.card}>
            <h1>Bienvenue, {user.name} 👋</h1>
            <p>Gérez votre établissement en toute simplicité.</p>
            <button onClick={() => setActiveTab("produits")} style={styles.actionBtn}>Gérer mon menu</button>
          </div>
        )}

        {/* ONGLET PRODUITS */}
        {activeTab === "produits" && (
          <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Votre Carte</h2>
                <button onClick={() => navigate("/add-product")} style={styles.actionBtn}>+ Ajouter un plat</button>
            </div>
            <div style={styles.productGrid}>
              {products.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <img src={product.image || "/images/default-food.jpg"} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
                  <h4 style={{ color: "#D4AF37", marginTop: "10px", marginBottom: "5px" }}>{product.name}</h4>
                  <p style={{ fontSize: "0.85rem", color: "#D4AF37", margin: "0 0 5px 0", fontStyle: "italic" }}>{product.category}</p>
                  <p style={{ fontSize: "0.8rem", opacity: 0.7, margin: "0 0 10px 0" }}>{product.description}</p>
                  <p style={{ fontWeight: "bold" }}>{Math.floor(product.price)} FCFA</p>
                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => handleEditClick(product)} style={styles.editBtn}>Modifier</button>
                    <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ONGLET COMMANDES */}
        {activeTab === "commandes" && (
          <div style={styles.card}>
            <h2>Commandes reçues</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #D4AF37" }}>
                    <th style={{ padding: "10px" }}>ID</th>
                    <th>Client</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <td style={{ padding: "15px" }}>#{order.id}</td>
                      <td>{order.client_name || "Anonyme"}</td>
                      <td>{order.total} FCFA</td>
                      <td style={{ color: "#D4AF37" }}>{order.status || "En attente"}</td>
                      <td>
                        {order.status !== "Livrée" && (
                          <button onClick={() => updateOrderStatus(order.id, "Livrée")} style={styles.statusBtn}>✓ Valider</button>
                        )}
                      </td>
                    </tr>
                  )) : <tr><td colSpan="5" style={{ padding: "20px" }}>Aucune commande pour le moment.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ONGLET MON RESTAURANT */}
        {activeTab === "mon_resto" && (
          <div style={styles.card}>
            {myRestaurant ? (
              !isEditingResto ? (
                <>
                  <img 
                    src={myRestaurant.logo || "/images/default-logo.png"} 
                    alt="Logo Resto" 
                    style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", border: "3px solid #D4AF37", marginBottom: "20px" }} 
                  />
                  <h1 style={{ color: "#D4AF37" }}>{myRestaurant.name}</h1>
                  <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>{myRestaurant.description || "Aucune description"}</p>
                  <div style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto", backgroundColor: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "10px" }}>
                    <p>📍 <strong>Adresse :</strong> {myRestaurant.address}</p>
                    <p>📞 <strong>Téléphone :</strong> {myRestaurant.phone || "Non renseigné"}</p>
                  </div>
                  <button onClick={() => {
                    setRestoForm({...myRestaurant, logo: null});
                    setIsEditingResto(true);
                  }} style={styles.actionBtn}>Modifier les informations</button>
                </>
              ) : (
                <form onSubmit={handleUpdateRestaurant}>
                  <h3 style={{ color: "#D4AF37" }}>Modifier mon restaurant</h3>
                  <input style={styles.input} type="text" value={restoForm.name} onChange={e => setRestoForm({...restoForm, name: e.target.value})} placeholder="Nom" required />
                  <input style={styles.input} type="text" value={restoForm.address} onChange={e => setRestoForm({...restoForm, address: e.target.value})} placeholder="Adresse" required />
                  <input style={styles.input} type="text" value={restoForm.phone} onChange={e => setRestoForm({...restoForm, phone: e.target.value})} placeholder="Téléphone" />
                  <textarea style={styles.input} value={restoForm.description} onChange={e => setRestoForm({...restoForm, description: e.target.value})} placeholder="Description" />
                  <input style={styles.input} type="file" onChange={e => setRestoForm({...restoForm, logo: e.target.files[0]})} />
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                    <button type="submit" style={styles.actionBtn}>Enregistrer</button>
                    <button type="button" onClick={() => setIsEditingResto(false)} style={{ ...styles.actionBtn, backgroundColor: "#555", color: "white" }}>Annuler</button>
                  </div>
                </form>
              )
            ) : (
              <p>Chargement des informations...</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardGerant;