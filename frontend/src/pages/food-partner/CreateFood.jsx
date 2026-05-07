import React, { useState,useEffect } from "react";
import axios from "axios";
import "./CreateFood.css";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';




const CreateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video") {
      setFormData({ ...formData, video: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
  return () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, [previewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("video", formData.video);

    try {
      const res = await axios.post(
        "https://food-reel-backend-ifnf.onrender.com/api/food",
        data,
        { withCredentials: true }
      );
navigate("/");
      console.log(res.data);
      alert("Food uploaded successfully 🚀");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  


  return (
    <div className="create-page">
      <div className="create-card">
        <h2>Create Food Reel</h2>

        <form onSubmit={handleSubmit} className="create-form">

          {/* Video Upload */}
          <label className="upload-box">
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              hidden
            />

            {formData.video ? (
              <div className="preview-container">
                <video
                  src={previewUrl}
                  autoPlay
                  loop
                  muted
                />

                <div className="video-actions">
                  {/* Change */}
                  <label className="change-btn">
                    Change
                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={handleChange}
                      hidden
                    />
                  </label>

                  {/* Delete */}
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      setFormData({ ...formData, video: null })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>

                <p>Tap to upload video</p>
                <span>MP4, MOV supported</span>
              </div>
            )}
          </label>

          {/* Name */}
          <div className="form-group">
            <label>Food Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Cheese Pizza"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write something about this food..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFood;


