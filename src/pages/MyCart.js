import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

export default function MyCart() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user || !user.mobile) return;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${user.mobile}`);
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleConfirmDelivery = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/confirm-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: user.mobile, items: cartItems })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert("Delivery confirmed! Your order has been initiated. We will contact you within 24 hours for payment details.");
        setCartItems([]); // Clear cart after confirmation
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Failed to confirm delivery:", error);
      alert("Failed to confirm delivery. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>My Cart</h2>
      <p>Logged in as: {user ? user.mobile : "Guest"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Price:</strong> {item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>No items in your cart.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <button 
          onClick={handleConfirmDelivery} 
          style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}
        >
          Confirm Delivery
        </button>
      )}
    </div>
  );
}
