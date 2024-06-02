import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Reset() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();  // Ensure token is retrieved from URL params

  useEffect(() => {
    console.log("Token from URL params:", token); // Log the token to verify it's being captured
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:8080/reset", {
        token,
        password,
      });
      const data = response.data;

      if (data.message === "Password reset successful") {
        navigate("/");
      } else {
        setMessage(data.message || "Something went wrong, try again later");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Something went wrong, try again later");
      } else {
        setMessage("Something went wrong, try again later");
      }
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
