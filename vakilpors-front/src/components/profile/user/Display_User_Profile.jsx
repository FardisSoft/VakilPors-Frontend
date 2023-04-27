import React from 'react';
import '../css/s.css';
import { Link } from 'react-router-dom';


const Display_User_Profile = ({username, email, job, bio, imageURL}) => {
  return (
    <div className="container" lang="en" dir="ltr">
      <input type="checkbox" id="switch"></input>
      <div className="outer">
        <div className="content">
          <label htmlFor="switch">
            <span className="toggle">
              <span className="circle"></span>
            </span>
          </label>
          <div className="image-box">
            <img src={imageURL} alt="Profile" />
          </div>
          <div className="details">
            <div className="name">{username}</div>
            <div className="job">{job}</div>
            <div className="bio">{bio}</div>
            <div className="buttons">
              <p>{email}</p>
              <button type="submit" formaction="/dit"><Link to='/edit'>تغییر مشخصات</Link></button>
              
            </div>
          </div>
          <div className="media-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display_User_Profile;