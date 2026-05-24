import './Login.css';

import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log('Sending signup request...');

      const { data } = await API.post(
        '/user/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/');
    } catch (e) {
      console.log('🔥 ERROR:', e.response?.data || e.message);
      alert(e.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <div className="admin-container">
          <h2 className="admin-title">User Signup</h2>

          <div className="login-box">
            <input
              className="login-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={handleSignup}>
              Sign Up
            </button>

            <p style={{ marginTop: 12, color: '#aaa', fontSize: 14 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#ef4444', fontWeight: 600 }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
