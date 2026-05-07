import React, { useEffect, useRef, useState } from "react";
import "./Reels.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaRegBookmark, FaRegComment, FaHome, FaBookmark } from "react-icons/fa";

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://food-reel-backend-ifnf.onrender.com/api/food", {
        withCredentials: true,
      })
      .then((res) => {
        setVideos(res.data.foodItems);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const setVideoRef = (id, el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  // 🔥 Auto play/pause (Insta behavior)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);


async function handleLike(videoid){
  try {
    const response = await axios.post("https://food-reel-backend-ifnf.onrender.com/api/food/like", { foodId : videoid }, { withCredentials: true });
    if (response.data.like) {
      console.log("video liked");
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === videoid
            ? { ...v, likes: v.likesCount ? v.likesCount + 1 : (v.likesCount === 0 ? 1 : 1) }
            : v
        )
      );
    } else {
      console.log("video unliked");
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === videoid
            ? { ...v, likes: v.likesCount && v.likesCount > 0 ? v.likesCount - 1 : 0 }
            : v
        )
      );
    }
  } catch (err) {
    console.error("Like error:", err);
  }
}
async function saveVideo(videoId){

  const response = await axios.post("http://localhost:3000/api/food/save", {foodId:videoId},{withCredentials:true})



  if(response.data.save){
    console.log("video saved");
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v._id === videoId
          ? { ...v, savesCount: v.savesCount ? v.savesCount + 1 : (v.savesCount === 0 ? 1 : 1) }
          : v
      )
    );
  }else{
    console.log("video unsaved");
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v._id === videoId
          ? { ...v, savesCount: v.savesCount && v.savesCount > 0 ? v.savesCount - 1 : 0 }
          : v
      )
    )
  }
}

  return (
  <div className="mobile-frame">
    <div className="reels-container">
      <div className="reels-scroll">

        {videos.map((video) => (
          <div className="reel" key={video._id}>

            {/* VIDEO */}
            <video
              ref={(el) => setVideoRef(video._id, el)}
              src={video.video}
              className="reel-video"
              muted
              loop
              playsInline
            />

            {/* RIGHT SIDE ACTIONS */}
            <div  className="reel-actions">
              <div onClick={() => handleLike(video._id)} className="action">
                <FaHeart  />
                <span>{video.likesCount ?? video.likes ?? 0 }</span>
                
              </div>

              <div className="action">
                <FaRegComment />
                <span>0</span>
                
              </div>

              <div onClick={() => saveVideo(video._id)} className="action">
                <FaRegBookmark />
                <span>{video.savesCount ?? video.bookmarks ?? 0 }</span>
              </div>
            </div>

            {/* BOTTOM INFO */}
            <div className="reel-info">
              <p className="desc">{video.description}</p>

              <Link
                className="store-btn"
                to={`/food-partner/${video.foodPartner}`}
              >
                Visit Store
              </Link>
            </div>

          </div>
        ))}

      </div>

      {/* 🔻 Bottom Navigation */}
      <div className="bottom-nav">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => {
            setActiveTab("home");
            navigate("/");
          }}
        >
          <FaHome />
        </button>

        <button
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => {
            setActiveTab("saved");
            navigate("/saved");
          }}
        >
          <FaBookmark />
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Reels;
