import './AdminLogin.css';
import { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

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

      console.log('FULL RESPONSE:', response);
      console.log('TOKEN:', token);

      if (!token) {
        alert('Login failed: No token received');
        return;
      }

      localStorage.setItem('adminToken', token);

      console.log('NAVIGATING NOW');

      // 🔥 safer redirect (avoids React route guard issues)
      window.location.href = '/admin/orders';

    } catch (err) {
      console.log('LOGIN ERROR:', err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
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
  );
}

export default AdminLogin;