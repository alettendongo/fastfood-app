import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GerantProfile = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        prenom: userData?.prenom || "",
        nom: userData?.nom || "",
        email: userData?.email || "",
        restaurant: userData?.restaurant || "",
        latitude: userData?.latitude || 14.714,
        longitude: userData?.longitude || -17.180,
    });

    const [isEditing, setIsEditing] = useState(false);
    <MapContainer
        center={[form.latitude, form.longitude]}
        zoom={15}
        style={{ height: "200px", borderRadius: "10px", marginBottom: "10px" }}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[form.latitude, form.longitude]}>
            <Popup>{form.restaurant}</Popup>
        </Marker>
    </MapContainer>
    const [message, setMessage] = useState("");

    if (!userData) return <h2>Veuillez vous connecter</h2>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(form));
        setMessage("Informations mises à jour ✅");
        setIsEditing(false);
    };

    return (
        <div style={containerStyle}>
        <button onClick={() => navigate("/dashboard")} style={backBtn}>
            ← Retour
        </button>

        <div style={cardStyle}>
            <h1 style={{ textAlign: "center" }}>Mon Profil</h1>

            {!isEditing ? (
            <>
                <p><strong>Prénom :</strong> {form.prenom}</p>
                <p><strong>Nom :</strong> {form.nom}</p>
                <p><strong>Email :</strong> {form.email}</p>
                <p><strong>Restaurant :</strong> {form.restaurant}</p>
                <p><strong>Latitude :</strong> {form.latitude}</p>
                <p><strong>Longitude :</strong> {form.longitude}</p>

                <button onClick={() => setIsEditing(true)} style={buttonStyle}>
                Modifier
                </button>
            </>
            ) : (
            <form onSubmit={handleSubmit}>
                <input name="prenom" value={form.prenom} onChange={handleChange} style={inputStyle}/>
                <input name="nom" value={form.nom} onChange={handleChange} style={inputStyle}/>
                <input name="email" value={form.email} onChange={handleChange} style={inputStyle}/>
                <input name="restaurant" value={form.restaurant} onChange={handleChange} style={inputStyle}/>
                <input name="latitude" value={form.latitude} onChange={handleChange} style={inputStyle}/>
                <input name="longitude" value={form.longitude} onChange={handleChange} style={inputStyle}/>

                <button type="submit" style={buttonStyle}>Enregistrer</button>
            </form>
            )}

            {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}
        </div>
        </div>
    );
    };

    /* Styles */
    const containerStyle = {
    minHeight: "100vh",
    backgroundImage: 'url("/images/fastfood-bg.jpg")',
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    };

    const cardStyle = {
    background: "#fff",
    padding: "2rem",
    borderRadius: "15px",
    width: "450px",
    };

    const backBtn = {
    position: "fixed",
    top: "20px",
    left: "20px",
    background: "#ff9800",
    color: "#fff",
    padding: "10px",
    border: "none",
    };

    const inputStyle = {
    display: "block",
    margin: "10px 0",
    width: "100%",
    padding: "10px",
    };

    const buttonStyle = {
    background: "#ff9800",
    color: "#fff",
    padding: "10px",
    border: "none",
    width: "100%",
};

export default GerantProfile;