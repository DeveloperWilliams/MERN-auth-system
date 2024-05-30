import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const Logout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get('http://localhost:8080/protected', {
          headers: { Authorization: token },
        });
      } catch (error) {
        console.error('Error during token verification:', error);
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="home" style={{ flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ fontFamily: 'cursive' }}>Welcome, {name}!</h2>
      <p>Your ID: {id}</p>
      <p>Your Email: {email}</p>
      <button
        style={{
          padding: '7px 10px',
          border: '0px',
          backgroundColor: 'greenyellow',
          cursor: 'pointer',
        }}
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
