import React, { useState } from 'react';
import Edit_User_Profile from './Edit_User_Profile';



const Call_Edit_User_Profile = () => {
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
          <Edit_User_Profile initialUsername={username} initialEmail={email} initialBio={bio} initialImageURL={imageURL} onSave={handleSave} /> 
        </div>
      );
    };
    
    
    
    export default Call_Edit_User_Profile;