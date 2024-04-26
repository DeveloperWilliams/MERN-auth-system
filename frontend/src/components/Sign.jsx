import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/style.css";
import axios from "axios";

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(name, email, password);
      axios.post("http://localhost:8080/signup", { name, email, password });
      if (res.json === "success") {
      }
    } catch (error) {
      (error) => {
        console.log("There was an error");
      };
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
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Register</button>
          <p>
            Having Account <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Sign;
