import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/style.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // New state for handling messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post("http://localhost:8080/login", { email, password });
      const data = response.data;

      if (data.message === "Success") {
        navigate("/home");
      } else if (data.error === "Incorrect password") {
        setMessage("Incorrect password");
      } else if (data.error === "User not found") {
        setMessage("User not found");
      } else {
        setMessage("An error occurred during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <div className="home">
        <form onSubmit={handleSubmit}>
          <h6>Login</h6>
          <div>
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
          <button type="submit">Login</button>
          {message && <p className="error-message">{message}</p>} {/* Display message */}
          <p>
            Not Having Account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
