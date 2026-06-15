import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Pages Générales ---
import Home from "./pages/Home";

// --- Pages Clients (Gourmets) ---
import ClientRegister from "./pages/ClientRegister";
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard"; // Ta nouvelle page de menu unique

// --- Pages Gérants (Partenaires) ---
import GerantRegister from "./pages/GerantRegister";
import GerantLogin from "./pages/GerantLogin";
import DashboardGerant from "./pages/DashboardGerant";
import CreateRestaurant from "./pages/CreateRestaurant"; 
import AddProduct from "./pages/AddProduct"; 

function App() {
  // Récupération de l'utilisateur stocké dans le navigateur
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* --- ACCUEIL PUBLIC --- */}
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        
        {/* --- FLUX CLIENT (DÉLICES D'ALETTE) --- */}
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client/login" element={<ClientLogin setUser={setUser} />} />
        
        {/* Dashboard Client : C'est ici que le client voit le menu et commande */}
        <Route 
          path="/client/dashboard" 
          element={
            user?.role === 'client' ? (
              <ClientDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/client/login" />
            )
          } 
        />
        
        {/* --- FLUX GÉRANT (PANNEAU D'ADMINISTRATION) --- */}
        <Route path="/gerant/register" element={<GerantRegister />} />
        <Route path="/gerant/login" element={<GerantLogin setUser={setUser} />} />
        
        {/* Tableau de bord Gérant : Pour voir les commandes entrantes */}
        <Route 
          path="/dashboard" 
          element={
            user?.role === 'gerant' ? (
              <DashboardGerant user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/gerant/login" />
            )
          } 
        />

        {/* Gestion du Restaurant (Configuration initiale) */}
        <Route 
          path="/create-restaurant" 
          element={user?.role === 'gerant' ? <CreateRestaurant /> : <Navigate to="/gerant/login" />} 
        />

        {/* Gestion des Plats (Ajouter de nouveaux délices au menu) */}
        <Route 
          path="/add-product" 
          element={user?.role === 'gerant' ? <AddProduct /> : <Navigate to="/gerant/login" />} 
        />
        
        {/* --- SÉCURITÉ --- */}
        {/* Si un client essaie d'aller sur /client/home (ancienne route), on le redirige vers le dashboard */}
        <Route path="/client/home" element={<Navigate to="/client/dashboard" />} />
        
        {/* Route de secours */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;