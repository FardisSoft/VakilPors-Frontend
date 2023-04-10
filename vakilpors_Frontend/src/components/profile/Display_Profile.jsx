
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ProfileDisplay from './ProfileDisplay';
import ProfileEdit from './ProfileEdit';

const Display_Profile = () => {
  const [username, setUsername] = useState('Hesam');
  const [email, setEmail] = useState('Hesam@example.com');
  const [job, setJob] = useState('lawyer')
  const [bio, setBio] = useState('I love coding!');
  const [imageURL, setImageURL] = useState('https://1fid.com/girls-profile-pics/');

  const handleSave = (newData) => {
    setUsername(newData.username);
    setEmail(newData.email);
    setJob(newData.job);
    setBio(newData.bio);
    setImageURL(newData.imageURL);
  };

  return (
    <div>
      <ProfileDisplay username={username} email={email} job={job} bio={bio} imageURL={imageURL} />
    </div>
  );
};



export default Display_Profile;
