// src/components/RegistrationForm.jsx
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = 'Username is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      // Using a mock registration endpoint (reqres.in) for demo
      const res = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();
      setSuccess(`Registered! id: ${data.id} — createdAt: ${data.createdAt ?? 'n/a'}`);
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Controlled Registration Form</h3>

      {errors.api && <div className="error">{errors.api}</div>}
      {success && <div className="success">{success}</div>}

      <div>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>

      <div>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <label>Password</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
