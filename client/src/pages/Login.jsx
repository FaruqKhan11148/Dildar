import './Login.css';

import { useState } from 'react';
import API from '../api/axios';
import {
  useNavigate,
  Link,
  useLocation,
} from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/user/login', {
        email,
        password,
      });

      // SAVE USER DATA
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // GET REDIRECT DATA
      const from = location.state?.from;
      const product = location.state?.product;

      // REDIRECT TO CHECKOUT IF CAME FROM PRODUCT PAGE
      if (from && product) {
        navigate(from, {
          state: {
            product,
          },
        });
      } else {
        // NORMAL LOGIN
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-container">
          <h2 className="admin-title">User Login</h2>

          <div className="login-box">
            <input
              className="login-input"
              type="email"
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

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>

            <p
              style={{
                marginTop: 12,
                color: '#aaa',
                fontSize: 14,
              }}
            >
              Don’t have an account?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#ef4444',
                  fontWeight: 600,
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login; 