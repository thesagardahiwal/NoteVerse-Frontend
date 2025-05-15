import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMsg(errorData.message || "Signup failed.");
        return;
      }

      const data = await res.json();
      setSuccessMsg("Signup successful! Redirecting...");
      if (data.token) {
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="card shadow-lg p-5" style={{ width: '100%', maxWidth: '420px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4 text-primary">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm border-0 mb-3">Sign Up</button>
          
          {errorMsg && <div className="alert alert-danger mt-3 shadow-sm">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success mt-3 shadow-sm">{successMsg}</div>}
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-decoration-none text-primary">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
