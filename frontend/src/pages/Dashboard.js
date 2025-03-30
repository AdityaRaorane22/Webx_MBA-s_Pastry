import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
        const data = await response.json();
        setItems(data);
        const initialQuantities = {};
        data.forEach((item) => (initialQuantities[item._id] = 1));
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
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
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8f0 0%, #ffe6e6 100%)',
      color: '#333'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ff6b6b 0%, #ffa5a5 100%)',
              marginRight: '15px'
            }}></div>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Sweet Delights</h2>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <p style={{ 
            margin: 0,
            color: '#555',
            fontSize: '14px'
          }}>
            Logged in as: <span style={{ fontWeight: 'bold' }}>{user ? user.mobile : "Guest"}</span>
          </p>
          <button
            onClick={() => navigate("/cart")}
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
            }}
          >
            <span style={{ fontSize: '16px' }}>🛒</span> My Cart
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '30px 50px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            margin: 0
          }}>
            Our <span style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Sweet Treats</span>
          </h1>
          
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <button style={{
              background: 'transparent',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '20px',
              color: '#555',
              fontWeight: 'medium',
              cursor: 'pointer'
            }}>All Items</button>
            <button style={{
              background: 'transparent',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '20px',
              color: '#555',
              fontWeight: 'medium',
              cursor: 'pointer'
            }}>Ice Cream</button>
            <button style={{
              background: 'transparent',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '20px',
              color: '#555',
              fontWeight: 'medium',
              cursor: 'pointer'
            }}>Cakes</button>
          </div>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 107, 107, 0.3)',
              borderTop: '3px solid #ff6b6b',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {items.map((item) => (
              <div key={item._id} style={{
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                animation: 'fadeIn 0.5s ease forwards'
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
              }}>
                <div style={{
                  height: '200px',
                  background: `linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Placeholder for item image */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '64px'
                  }}>
                    {item.flavour?.toLowerCase().includes('chocolate') ? '🍫' : 
                      item.flavour?.toLowerCase().includes('vanilla') ? '🍦' : 
                      item.flavour?.toLowerCase().includes('strawberry') ? '🍓' : '🍰'}
                  </div>
                  
                  {item.quantity <= 5 && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 107, 107, 0.9)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Last {item.quantity} remaining!
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    margin: '0 0 10px',
                    fontSize: '20px',
                    color: '#333'
                  }}>{item.name}</h3>
                  
                  <p style={{
                    margin: '0 0 15px',
                    color: '#777',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>{item.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: '#ff6b6b'
                    }}>₹{item.price}</span>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #ddd',
                      borderRadius: '25px',
                      overflow: 'hidden'
                    }}>
                      <button 
                        onClick={() => updateQuantity(item._id, -1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          color: '#ff6b6b',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        padding: '0 10px',
                        fontWeight: 'medium'
                      }}>
                        {quantities[item._id] || 1}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item._id, 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          color: '#ff6b6b',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(item)} 
                    style={{
                      width: '100%',
                      background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;