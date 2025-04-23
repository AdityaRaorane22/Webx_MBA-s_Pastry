import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { UserProvider, useUser } from "./context/UserContext";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Cart from "./pages/MyCart";
import UpdateProfile from "./pages/UpdateProfile";

function AppContent() {
  const { user } = useUser();  // ✅ get user from custom hook

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/update-profile" element={<UpdateProfile user={user} />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
