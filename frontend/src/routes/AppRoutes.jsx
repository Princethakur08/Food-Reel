import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Genral/Home'
 import Saved from '../pages/Genral/Saved';

import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/"element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />}  />
          <Route path="/saved" element={<Saved />} />
      </Routes>
 
    </Router>
  )
}

export default AppRoutes
