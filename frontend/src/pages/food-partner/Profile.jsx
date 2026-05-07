import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {
    const {id} = useParams()
    
 const [profile, setProfile] = useState(null)
 const [videos, setVideos] = useState([])



 useEffect(() =>{
 axios.get(`https://food-reel-backend-ifnf.onrender.com/api/food-partner/${id}`,{withCredentials: true })



 .then(response =>{
    setProfile(response.data.foodPartner)
    setVideos(response.data.foodPartner.foodItems)
 })
 },[id])
console.log("ID:", id);

  return (
     <div className="container">
      <div className="card">

        {/* 🔹 Top Section */}
        <div className="top-section">
          <div aria-hidden="true" >
            <img className="profile"  src="https://media.istockphoto.com/id/1457876584/photo/portrait-of-a-young-woman-cooking-food-in-the-kitchen-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=5nJ1gECB2oH4vl6qNkCgvysIZfl2o_IACr4iu0ghiW8=" alt="profilephoto" />
          </div>

          <div className="info">
            <div className="business">{profile?.businessName}</div>
            <div className="address">{profile?.address}</div>
          </div>
        </div>

        {/* 🔹 Stats */}
        <div className="stats">
          <div className="stat-box">
            <p>Total Meals</p>
            <h3>{profile?.totalMeals}</h3>
          </div>
          <div className="stat-box">
            <p>Customers</p>
            <h3>{profile?.customerserved}</h3>
          </div>
        </div>

        <hr />

        {/* 🔹 Video Grid */}
        <div className="grid">
          {videos.map((v) => (
            <div key={v.id} className="video-box">
              
             <video src={v.video} 
             muted
              style={{ objectFit: 'cover', width:"100%", height:"100%" }} 
             ></video>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Profile
