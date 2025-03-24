import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

const Signup = () => {
  const [user, setUser] = useState({
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
    country: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "dob") {
      const birthDate = new Date(e.target.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setUser({ ...user, dob: e.target.value, age: age.toString() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user);
      alert("Signup successful!");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="First Name" type="text" name="firstName" value={user.firstName} onChange={handleChange} />
      <InputField label="Middle Name" type="text" name="middleName" value={user.middleName} onChange={handleChange} />
      <InputField label="Last Name" type="text" name="lastName" value={user.lastName} onChange={handleChange} />
      <InputField label="Date of Birth" type="date" name="dob" value={user.dob} onChange={handleChange} />
      <InputField label="Age" type="text" name="age" value={user.age} onChange={handleChange} disabled />
      <label>Gender</label>
      <select name="gender" value={user.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <InputField label="Mobile No" type="text" name="mobile" value={user.mobile} onChange={handleChange} />
      <InputField label="Address Line 1" type="text" name="address1" value={user.address1} onChange={handleChange} />
      <InputField label="Address Line 2" type="text" name="address2" value={user.address2} onChange={handleChange} />
      <InputField label="Landmark" type="text" name="landmark" value={user.landmark} onChange={handleChange} />
      <InputField label="City" type="text" name="city" value={user.city} onChange={handleChange} />
      <InputField label="State" type="text" name="state" value={user.state} onChange={handleChange} />
      <InputField label="Country" type="text" name="country" value={user.country} onChange={handleChange} />
      <InputField label="Password" type="password" name="password" value={user.password} onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
