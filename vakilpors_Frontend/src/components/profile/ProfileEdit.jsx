
import React, { useState } from 'react';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>


const ProfileEdit = ({initialUsername, initialEmail, initialBio, initialImageURL, onSave}) => {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [bio, setBio] = useState(initialBio);
  const [imageURL, setImageURL] = useState(initialImageURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({username, email, bio, imageURL});
  };

  return (
    <form className="profile-edit" onSubmit={handleSubmit}>
      <div className="profile-edit-image">
        <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
      </div>
      <div className="profile-edit-info">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileEdit;