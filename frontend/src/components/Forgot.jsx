import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState(""); // For displaying the reset link

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetLink(""); // Reset the reset link

    try {
      const response = await axios.post("http://localhost:8080/forgot", {
        email,
      });
      const data = response.data;

      if (data.message === "success") {
        setMessage("Password reset link sent to your email");
        setResetLink(`http://localhost:3000/reset/${data.token}`); // Set the reset link
      } else if (data.message === "User not found") {
        setMessage("Email Not Found");
      } else if (data.message === "Valid email is required") {
        setMessage("Enter a Valid Email");
      } else {
        setMessage("Something went wrong, try again");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong, try again");
      }
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
          // Display the reset link
          <button type="submit" style={{ width: "98%" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
