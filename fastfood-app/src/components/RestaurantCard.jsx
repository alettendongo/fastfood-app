import React from "react";

const RestaurantCard = ({ restaurant, onClick }) => {
    return (
        <div onClick={() => onClick(restaurant.id)} style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem", cursor: "pointer" }}>
        <h2>{restaurant.name}</h2>
        <p>{restaurant.address}</p>
        <p>{restaurant.description}</p>
        </div>
    );
};

export default RestaurantCard;