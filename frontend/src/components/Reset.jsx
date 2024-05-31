import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Reset() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Retrieve token from URL params

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:8080/reset", {
        token, // Send token with request
        password,
      });
      const data = response.data;

      if (data.message === "success") {
        navigate("/login");
      } else {
        setMessage("Something went wrong, try again later");
      }
    } catch (error) {
      setMessage("Something went wrong, try again later");
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <h6>Reset Password</h6>
        <div>
          <input
            type="password"
            placeholder="Your New Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {message && <p>{message}</p>}
          <button type="submit" style={{ width: "98%" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
