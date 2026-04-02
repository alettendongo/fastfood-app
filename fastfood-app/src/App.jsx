import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Logo from "./components/Logo";

import Home from "./pages/Home";

// Anciennes pages (clients)
import Login from "./pages/Login";
import Register from "./pages/Register";

// Nouvelles pages Gérants
import GerantRegister from "./pages/GerantRegister";
import GerantLogin from "./pages/GerantLogin";
import DashboardGerant from "./pages/DashboardGerant";
import GerantProfile from "./pages/GerantProfile";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  return (
    <Router>
      <Logo />
      {/* HEADER SUPPRIMÉ */}

      <Routes>
        {/* Accueil */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* CLIENTS */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* GERANTS */}
        <Route path="/gerant/register" element={<GerantRegister />} />
        <Route path="/gerant/login" element={<GerantLogin setUser={setUser} />} />

        {/* DASHBOARD GERANT */}
        <Route
          path="/dashboard"
          element={user && user.restaurant ? <DashboardGerant /> : <Home />}
        />
        
        <Route path="/profile" element={<GerantProfile />} />
      </Routes>
    </Router>
  );
}

export default App;