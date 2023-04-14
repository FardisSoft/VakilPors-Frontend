
import React, { useState } from 'react';
import Display_User_Profile from './Display_User_Profile';


const Call_Display_User_Profile = () => {
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
      <Display_User_Profile username={username} email={email} job={job} bio={bio} imageURL={imageURL} />
    </div>
  );
};



export default Call_Display_User_Profile;