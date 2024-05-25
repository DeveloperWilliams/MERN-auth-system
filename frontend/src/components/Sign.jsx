import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    if (!name || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", { name, email, password });

      if (response.status === 201) {
        setMessage("Signup successful! Please login.");
      } else {
        setMessage(response.data.error || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("There was an error:", error);
      setMessage("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <>
      <div className="home">
        <form onSubmit={handleSubmit}>
          <h6>Sign Up</h6>
          <div>
            <input
              type="text"
              placeholder="Full Names"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
          {message && <p>{message}</p>}
          <p>
            Having Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Sign;
