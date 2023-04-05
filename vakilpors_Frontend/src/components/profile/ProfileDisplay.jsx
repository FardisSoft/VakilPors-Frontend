import React from 'react';
import '../css/s.css';

const ProfileDisplay = ({username, email, bio, imageURL}) => {
  return (
    <html lang="en" dir="ltr">
      <div class="container">
        <input type="checkbox" id="switch"></input>
        <div class="outer">
          <div class="content">
            <label for="switch">
              <span class="toggle">
                <span class="circle"></span>
              </span>
            </label>
            <div class="image-box">
              <img src={imageURL} alt="Profile" />
            </div>
            <div class="details">
              <div class="name">{username}</div>
              <div class="job">{bio}</div>
              <div class="buttons">
                <p>{email}</p>
                <button>Read More</button>
              </div>
            </div>
            <div class="media-icons">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </div>
    </html>   
  );
};

export default ProfileDisplay;
