
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ProfileDisplay from './ProfileDisplay';
import ProfileEdit from './ProfileEdit';

const Main = () => {
  const [username, setUsername] = useState('Hesam');
  const [email, setEmail] = useState('Hesam@example.com');
  const [bio, setBio] = useState('I love coding!');
  const [imageURL, setImageURL] = useState('https://1fid.com/girls-profile-pics/');

  const handleSave = (newData) => {
    setUsername(newData.username);
    setEmail(newData.email);
    setBio(newData.bio);
    setImageURL(newData.imageURL);
  };

  return (
    <div>
      <ProfileDisplay username={username} email={email} bio={bio} imageURL={imageURL} />
      <ProfileEdit initialUsername={username} initialEmail={email} initialBio={bio} initialImageURL={imageURL} onSave={handleSave} />
    </div>
  );
};



export default Main;