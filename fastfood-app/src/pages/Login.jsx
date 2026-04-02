import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(u => u.email === form.email && u.password === form.password);

        if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("token", "fake-jwt-token");
        setUser(foundUser);

        // Redirection selon le rôle
        if (foundUser.role === "gerant") navigate("/dashboard");
        else navigate("/");
        } else {
        setError("Email ou mot de passe incorrect");
        }
    };

    const inputStyle = { width:"100%", padding:"0.5rem", marginBottom:"1rem", borderRadius:"5px", border:"1px solid #ccc" };
    const buttonStyle = { width:"100%", padding:"0.6rem", backgroundColor:"#ff4500", border:"none", borderRadius:"5px", color:"#fff", fontWeight:"bold", cursor:"pointer", marginBottom:"1rem" };
    const signupLinkStyle = { color:"#ff4500", cursor:"pointer", marginLeft:"0.3rem", textDecoration:"underline" };

    return (
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", backgroundImage:'url("/images/fastfood-bg.jpg")', backgroundSize:"cover", backgroundPosition:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:0,left:0,width:"100%",height:"100%", backgroundColor:"rgba(0,0,0,0.6)" }}></div>
        <form onSubmit={handleSubmit} style={{ position:"relative", backgroundColor:"#fff", padding:"2rem", borderRadius:"10px", width:"300px", zIndex:2, boxShadow:"0 0 15px rgba(0,0,0,0.3)", textAlign:"center" }}>
            <h2 style={{ marginBottom:"1rem" }}>Connexion</h2>
            {error && <div style={{color:"red", marginBottom:"1rem"}}>{error}</div>}
            <input style={inputStyle} type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
            <input style={inputStyle} type="password" placeholder="Mot de passe" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
            <button type="submit" style={buttonStyle}>Se connecter</button>

            <div style={{ fontSize:"0.9rem", color:"#555" }}>
            Vous n’avez pas de compte ?
            <span style={signupLinkStyle} onClick={()=>navigate("/register")}>S’inscrire</span>
            </div>
        </form>
        </div>
    );
};

export default Login;