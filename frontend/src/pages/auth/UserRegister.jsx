

import React from 'react';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("http://localhost:3000/api/auth/user/register",
        {
          fullname,
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
            <h2>Create an account</h2>
            <div className="muted">Sign up as a FoodReel user</div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input name="fullname" className="input" placeholder="Jane Doe" />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input name="email" className="input" type="email" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input name="password" className="input" type="password" />
          </div>

          <button type="submit" className="btn-primary">
            Create account
          </button>
        </form>

        <div className="foot">
          Already have an account? 
          <a className="small-link" href="/user/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}