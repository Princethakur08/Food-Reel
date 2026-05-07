import React from 'react';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PartnerRegister() {

  
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    

    try {
      const res = await axios.post("https://food-reel-backend-ifnf.onrender.com/api/auth/food-partner/register",
        {
          businessName,
          address,
          email,
          password
        },{
          withCredentials:true
        }
      );

      console.log(res.data);
      navigate("/create-food")

    } catch (err) {
  console.log("ERROR FULL:", err);
  console.log("ERROR RESPONSE:", err.response);
}
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="logo" aria-hidden />
          <div>
            <h2>Partner sign up</h2>
            <div className="muted">Create a food-partner account</div>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Business name</label>
            <input className="input" placeholder="My Pizza Place" name='businessName'/>
          </div>

          <div className="form-row">
            <label>Address</label>
            <input className="input" type="address" placeholder="sanjay colony,sec-23,Faridabad" name='address' />
          </div>

          <div className="form-row">
            <label>Contact email</label>
            <input className="input" type="email" placeholder="owner@restaurant.com" name='email' />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" placeholder="Create a password" name='password' />
          </div>
          <button type="submit"  className="btn-primary">Create partner account</button>
        </form>
        <div className="foot">Already partner? <a className="small-link" href="/food-partner/login">Sign in</a></div>
      </div>
    </div>
  );
}
