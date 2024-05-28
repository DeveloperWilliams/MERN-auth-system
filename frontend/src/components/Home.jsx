// frontend/src/components/Home.js
import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name, email } = location.state;
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/");
  };

  return (
    <div className="home" style={{ flexDirection: "column", gap: "30px" }}>
      <h2 style={{ fontFamily: "cursive" }}>Welcome, {name}!</h2>
      <p>Your ID: {id}</p>
      <p>Your Email: {email}</p>
      <button
        style={{
          padding: "7px 10px",
          border: "0px",
          backgroundColor: "greenyellow",
          cursor: "pointer",
        }}
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
