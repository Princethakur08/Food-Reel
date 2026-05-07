import React from 'react';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PartnerLogin() {

 
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(https://food-reel-backend-ifnf.onrender.com/api/auth/food-partner/login",
        {
          email,
          password
        },{
          withCredentials:true
        }
      );

      console.log(res.data);
      navigate("/create-food")

    } catch (err) {
  console.log("ERROR RESPONSE:", err.response?.data);
 
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Partner login</h2>
            <div className="muted">Sign in to your food-partner account</div>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" placeholder="owner@restaurant.com" name='email' />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" placeholder="Your password" name='password' />
          </div>
          <button type="submit" className="btn-primary">Sign in</button>
        </form>
        <div className="foot">New partner? <a className="small-link" href="/food-partner/register">Create account</a></div>
      </div>
    </div>
  );
}
