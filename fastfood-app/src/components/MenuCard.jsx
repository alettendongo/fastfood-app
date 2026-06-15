import React from "react";

const MenuCard = ({ item }) => {
    return (
        <div style={{ border: "1px solid #eee", padding: "0.5rem", margin: "0.5rem" }}>
        <h3>{item.name} - ${item.price}</h3>
        <p>{item.description}</p>
        </div>
    );
};

export default MenuCard;