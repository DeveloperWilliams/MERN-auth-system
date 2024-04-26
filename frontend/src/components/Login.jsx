import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/style.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", { email, password });
      const data = response.data;

      if (data === "Success") {
        navigate("/");
      } else if (data === "Incorrect") {
        console.log("Incorrect password");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <p>
            Not Having Account <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
