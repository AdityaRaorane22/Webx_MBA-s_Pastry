import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ mobile });  
        navigate("/dashboard"); 
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Try again!");
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
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
        <nav style={{
          display: 'flex',
          gap: '30px'
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>Home</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>Shop</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>About</Link>
          <Link to="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>Contact</Link>
        </nav>
      </header>

      {/* Login Form */}
      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.15)',
          animation: 'fadeIn 0.8s ease forwards'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '28px',
            marginBottom: '30px',
            color: '#333',
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Welcome Back</h2>
          
          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid #ff6b6b',
              borderRadius: '10px',
              padding: '12px 15px',
              marginBottom: '20px',
              color: '#ff6b6b',
              fontSize: '14px',
              animation: 'shake 0.5s ease-in-out'
            }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#555'
            }}>
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <label style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Password
              </label>
              <Link to="/forgot-password" style={{
                fontSize: '13px',
                color: '#ff6b6b',
                textDecoration: 'none'
              }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              marginBottom: '25px'
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
            Login
          </button>
          
          <div style={{
            textAlign: 'center',
            color: '#777',
            fontSize: '14px'
          }}>
            Haven't registered yet?{' '}
            <Link to="/signup" style={{
              color: '#ff6b6b',
              textDecoration: 'none',
              fontWeight: 'bold',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = 'none';
            }}>
              Register now
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Login;