import './AdminLogin.css';
import { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post('/admin/login', {
        email,
        password,
      });

      const token = response.data?.token;
      console.log("the token after the admin login : " + token);

      if (!token) {
        alert('Login failed: No token received');
        return;
      }

      localStorage.setItem('adminToken', token);

      // better than window.location
      window.location.href = '/admin/orders';
    } catch (err) {
      console.log('LOGIN ERROR:', err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-container login-container">
          <h2 className="admin-title">Admin Login</h2>

          <div className="login-box">
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

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLogin;
