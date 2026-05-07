import React, { useState, useEffect } from 'react';
import '../../styles/saved.css'
import axios from 'axios'

export default function Saved() {
  const [savedVideos, setSavedVideos] = useState([]);



  useEffect(() => {
    const response = axios.get("https://food-reel-backend-ifnf.onrender.com/api/food/saved", { withCredentials: true })
      .then(response => {
        const savedFoods = response.data.savedFoods.map((item) => ({

          id: item._id,
          description: item.food.description,
          videoUrl: item.food.videoUrl,
          likeCount: item.food.likeCount,
          saveCount: item.food.saveCount
        })
        )
        setSavedVideos(savedFoods);
      })
  }, [])

  return (
    <div className="saved-page">
      <h2>Saved Reels</h2>
      <div className="saved-list">
        {/* Render saved items here */}
        {savedVideos.length === 0 ? (
          <p>No saved reels yet.</p>
        ) : (
          savedVideos.map((v) => (
            <video key={v.id} src={v.videoUrl} />
          ))
        )}
      </div>
    </div>
  );
}
