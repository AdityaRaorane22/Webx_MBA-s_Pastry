import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
        const data = await response.json();
        setItems(data);
        const initialQuantities = {};
        data.forEach((item) => (initialQuantities[item._id] = 1));
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const addToCart = async (item) => {
    if (!user || !user.mobile) {
      alert("Please log in first.");
      return;
    }

    const orderData = {
      mobile: user.mobile,
      name: item.name,
      description: item.description,
      price: item.price,
      flavour: item.flavour,
      image: item.image,
      quantity: quantities[item._id],
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/save-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Welcome to Dashboard</h2>
        <button onClick={() => navigate("/cart")} style={{ backgroundColor: "blue", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}>
          My Cart
        </button>
      </div>
      <p>Logged in as: {user ? user.mobile : "Guest"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {items.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => updateQuantity(item._id, -1)} style={{ padding: "5px 10px", cursor: "pointer" }}>-</button>
              <span>{quantities[item._id] || 1}</span>
              <button onClick={() => updateQuantity(item._id, 1)} style={{ padding: "5px 10px", cursor: "pointer" }}>+</button>
            </div>
            {item.quantity <= 5 && (
              <p style={{ color: "red", fontWeight: "bold" }}>Last {item.quantity} remaining!</p>
            )}
            <button onClick={() => addToCart(item)} style={{ backgroundColor: "green", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", marginTop: "10px" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
