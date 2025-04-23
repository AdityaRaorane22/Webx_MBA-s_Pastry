import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    gender: "",
    mobile: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    country: ""
  });

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUser = async () => {
      if (!user || !user.mobile) {
        setError("Missing mobile number. Please log in again.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/get-user-by-mobile/${user.mobile}`);
        const fetchedUser = res.data.user;

        const { _id, password, ...userWithoutIdAndPassword } = fetchedUser;

        setUser(fetchedUser);
        setFormData((prev) => ({
          ...prev,
          ...userWithoutIdAndPassword
        }));
        setError(null);
      } catch (err) {
        setError("Failed to fetch user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.mobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User ID missing. Cannot update profile.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE_URL}/update-profile/${user._id}`, formData);
      alert(res.data.msg || "Profile updated!");
      setError(null);
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-profile-wrapper">
      <style>{`
        .update-profile-wrapper {
          max-width: 600px;
          margin: 30px auto;
          padding: 30px;
          background: linear-gradient(135deg, #fff8f0 0%, #ffe6e6 100%);
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', sans-serif;
        }
        .update-profile-wrapper h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #4b2c4e;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
          color: #4b2c4e;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
        }
        .form-group input:focus {
          border-color: #c084fc;
        }
        .error-message {
          color: red;
          text-align: center;
          margin-bottom: 15px;
        }
        .loading-message {
          text-align: center;
          color: #555;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: rgb(242, 103, 103);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-btn:hover {
          background-color: rgb(220, 28, 60);
        }
      `}</style>

      <h2>Update Profile</h2>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type={key === "dob" ? "date" : "text"}
              name={key}
              value={value || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
