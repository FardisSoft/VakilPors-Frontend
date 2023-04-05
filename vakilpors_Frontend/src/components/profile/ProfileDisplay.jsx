import React from 'react';

const ProfileDisplay = ({username, email, bio, imageURL}) => {
  return (
    <div className="profile-display">
      <div className="profile-display-image">
        <img src={imageURL} alt="Profile" />
      </div>
      <div className="profile-display-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileDisplay;