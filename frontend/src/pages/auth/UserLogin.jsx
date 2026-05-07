import React from 'react';
import '../../styles/auth.css';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {

  const navigate = useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("http://localhost:3000/api/auth/user/login",
        {
          email,
          password
        },{
          withCredentials:true
        }
      );

      console.log(res.data);
      navigate("/")

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Welcome back</h2>
            <div className="muted">Sign in to your FoodReel account</div>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" placeholder="you@company.com" name='email' />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input name='password' className="input" type="password" placeholder="Your password" />
          </div>
          <button type="submit" className="btn-primary">Sign in</button>
        </form>
        <div className="foot">New here? <a className="small-link" href="/user/register">Create account</a></div>
      </div>
    </div>
  );
}
