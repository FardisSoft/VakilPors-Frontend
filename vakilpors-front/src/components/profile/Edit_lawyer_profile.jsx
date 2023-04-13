import React, { useState } from 'react';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './css/a.css';
import { Helmet } from 'react-helmet-async';
import { Box, FormControl, FormLabel, Input } from "@mui/material";
import { InputLabel, Select, MenuItem } from '@mui/material';

const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(2),
  },
}));

const ProfileEdit = ({initialUsername, initialEmail, initialGender, initialEducation, initialOfficeAddress, initialTitle, initialCity, initialGrade, initialLicencesNumber, initialMemberOf, initialYearsOfExperience, initialBio, initialImageURL, initialphoneNumber, onSave}) => {

  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";
  const [description, setDescription] = useState(descriptionUser);

  const classes = useStyles();
  const [username, setUsername] = useState(initialUsername);
  const [title, setTitle] = useState(initialTitle);
  const [city, setCity] = useState(initialCity);
  const [grade, setGrade] = useState('');
  const [licencesNumber, setLicencesNumber] = useState(initialLicencesNumber);
  const [MemberOf, setMemberOf] = useState(initialMemberOf);
  const [YearsOfExperience, setYearsOfExperience] = useState(initialYearsOfExperience);
  const [Gender, setGender] = useState(initialGender);
  const [Education, setEducation] = useState(initialEducation);
  const [OfficeAddress, setOfficeAddress] = useState(initialOfficeAddress);
  const [email, setEmail] = useState(initialEmail);
  const [bio, setBio] = useState(initialBio);
  const [phoneNumber, setphoneNumber] = useState(initialphoneNumber);
  const [imageURL, setAvatarUrl] = useState(initialImageURL);


  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({username, email, Gender, Education, OfficeAddress, title, city, grade, licencesNumber, MemberOf, YearsOfExperience, bio, imageURL, phoneNumber});
    setGrade(e.target.value);
    handleSubmit(e.target.files[0]);
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8"/>
        <title>Lawyer Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </Helmet>
    <div className="page-content" onSubmit={handleSubmit}>
      <div className="form-v4-content">
        <div className="form-left">
                <h2>ویرایش اطلاعات کاربری</h2>
                <p className="text-1">{description}</p>
        </div>

          <form className="form-detail" id="myform" onSubmit={handleSubmit}>
          <h2>اطلاعات کاربری</h2>
          
          <div className="form-group">
            <br></br>
            <br></br>
            <br></br>
            
          <div className="form-row form-row-1">
                    <TextField
                      required
                      label="درباره من"
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                      margin="normal"
                    />
           </div>
           <div className="form-row form-row-1">
           <TextField
                required
                label="رشته تحصیلی"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                margin="normal"
              />
           </div>   
           </div>  

           <div className="form-group">
              <div 
              className="form-row form-row-1"
              >
                <TextField
                required
                label="شهر"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                margin="normal"
              />
              </div>
              <div className="form-row form-row-1">
              <TextField
                required
                label="شماره پروانه وکالت"
                value={licencesNumber}
                onChange={(event) => setLicencesNumber(event.target.value)}
                margin="normal"
              />
              </div>
           </div>

           <div className="form-group">
              <div className="form-row form-row-1">
                <TextField
                required
                label="جنسیت"
                value={Gender}
                onChange={(event) => setGender(event.target.value)}
                margin="normal"
              />
              </div>
              <div className="form-row form-row-1">
                <TextField
                required
                label="سابقه فعالیت (سال)"
                value={YearsOfExperience}
                onChange={(event) => setYearsOfExperience(event.target.value)}
                margin="normal"
              />
              </div>
           </div>


           <div className="form-group">
              <div className="form-row form-row-1">
                <TextField
                required
                label="تحصیلات"
                value={Education}
                onChange={(event) => setEducation(event.target.value)}
                margin="normal"
              />
              </div>
              <div className="form-row form-row-1">
                <TextField
                required
                label="آدرس محل کار"
                value={OfficeAddress}
                onChange={(event) => setOfficeAddress(event.target.value)}
                margin="normal"
              />
              </div>
           </div>



           <div className="form-group">
              <div className="form-row form-row-1">

              <Box>
                <FormControl>
                  <FormLabel htmlFor="resume-upload"></FormLabel>
                  <Input sx={{height: '70px'}}
                    type="file"
                    accept=".pdf"
                    id="resume-upload"
                    onChange={handleSubmit}
                  />
                </FormControl>

              </Box>
              </div>      
              
              <div className="form-row form-row-1">
              <br></br> 
              <br></br> 
                <label htmlFor="avatar-input">
                  <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>
                    انتخاب عکس پروفایل
                  </Button>
                </label>
                <input
                id="avatar-input"
                className={classes.input}
                type="file"
                onChange={handleAvatarChange}
              />
              </div>
              </div>

              <div className='form-row'>

                  <FormControl 
              sx={{
                maxWidth: '220px',
                 
              }}
              fullWidth
              >
                    <Select value={grade} label="نوع پروانه وکالت" onChange={handleSubmit} dir='rtl'>
                      <MenuItem value="پایه یک دادگستری">پایه یک دادگستری</MenuItem>
                      <MenuItem value="پایه دو دادگستری">پایه دو دادگستری</MenuItem>
                      <MenuItem value="پایه سه دادگستری">پایه سه دادگستری</MenuItem>
                      <MenuItem value="کانون مشاوران قوه قضائیه">کانون مشاوران قوه قضائیه</MenuItem>
                    </Select>
                  </FormControl>






              </div>






      

            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
              ثبت اطلاعات
            </Button>
            </form>
    </div>
    </div>
    
    
    </>
  );
};

export default ProfileEdit;