import React, { useEffect, useState } from 'react';

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8f0 0%, #ffe6e6 100%)',
      overflow: 'hidden'
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
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
        <nav style={{
          display: 'flex',
          gap: '30px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.2s'
        }}>
          <a href="#" style={{ textDecoration: 'none', color: '#ff6b6b', fontWeight: 'bold' }}>Home</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>Shop</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>About</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555', fontWeight: 'medium' }}>Contact</a>
          <a href="/login" style={{
            textDecoration: 'none',
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
          }}>Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '50px',
        minHeight: '70vh'
      }}>
        <div style={{
          width: '50%',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '0.4s'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2',
            color: '#333'
          }}>Sweet Moments, <span style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Delicious Treats</span></h1>
          
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#666',
            marginBottom: '30px'
          }}>
            Discover our artisan ice creams, cakes, and pastries. We offer both single servings 
            and wholesale options for all your special moments.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px'
          }}>
            <button style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
            }}>Shop Now</button>
            
            <button style={{
              background: 'transparent',
              color: '#ff6b6b',
              border: '2px solid #ff6b6b',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s ease, color 0.3s ease'
            }} onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>Wholesale</button>
          </div>
        </div>
        
        <div style={{
          width: '40%',
          position: 'relative',
          height: '400px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '0.6s'
        }}>
          {/* Ice cream cone animation */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,230,230,0.5) 100%)',
            boxShadow: '0 10px 30px rgba(255, 107, 107, 0.2)',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '220px',
              height: '220px',
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
              borderRadius: '50% 50% 0 0',
              overflow: 'hidden'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%) rotate(180deg)',
              borderLeft: '60px solid transparent',
              borderRight: '60px solid transparent',
              borderBottom: '120px solid #f9d59b',
              zIndex: -1
            }}></div>
            <div style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#ffcad4',
              top: '70px',
              left: '90px',
              boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.5)',
              transform: 'scale(1)',
              animation: 'pulse 3s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ff9a9e',
              top: '130px',
              right: '80px',
              boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.5)',
              animation: 'pulse 4s ease-in-out infinite 1s'
            }}></div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section style={{
        padding: '30px 50px 70px',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1s ease, transform 1s ease',
        transitionDelay: '0.8s'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '32px',
          marginBottom: '40px',
          color: '#333'
        }}>Our Popular <span style={{
          background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Categories</span></h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {['Ice Cream', 'Cakes', 'Pastries', 'Desserts'].map((category, index) => (
            <div key={category} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px 20px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              flex: 1,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${0.8 + (index * 0.2)}s`
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(45deg, #ff6b6b ${index * 10}%, #ffa5a5 ${100 - (index * 10)}%)`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '30px' }}>
                  {index === 0 ? '🍦' : index === 1 ? '🍰' : index === 2 ? '🥐' : '🍮'}
                </span>
              </div>
              <h3 style={{ margin: '0 0 10px', color: '#333' }}>{category}</h3>
              <p style={{ margin: 0, color: '#777', fontSize: '14px' }}>
                Delicious {category.toLowerCase()} made with love
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}