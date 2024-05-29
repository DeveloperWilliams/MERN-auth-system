// frontend/Forgot.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/forgot", {
        email,
      });
      const data = response.data;

      if (data.message === "success") {
        navigate(`/reset/${data.userId}`, { state: { email: data.email } });
      }if (data.message === "Email not found") {
        setMessage("Email Not Found");
      } else {
        setMessage("Something went wrong, try again");
      }
    } catch (error) {
      setMessage("Something went wrong, try again");
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <h6>Forgot Password</h6>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <p>{message}</p>}
          <button type="submit" style={{ width: "98%" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
