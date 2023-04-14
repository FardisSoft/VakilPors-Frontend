import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './css/a.css';
import { Helmet } from 'react-helmet-async';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../services/AuthProvider";

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

const ProfileEdit = ({ initialUsername, initialEmail, initialJob, initialBio, initialImageURL, initialphoneNumber, onSave }) => {

  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";
  const [description, setDescription] = useState(descriptionUser);
  const { refUserRole, getAccessToken } = useAuth();


  const classes = useStyles();

  const [getdetail, setdetail] = useState([]);
  const [username, setUsername] = useState(initialUsername);
  const [job, setJob] = useState(initialJob);
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
    onSave({ username, email, job, bio, imageURL, phoneNumber });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(refUserRole);
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        let url = "";
        if (refUserRole.current === "User") {
          url = `https://api.fardissoft.ir/Customer/GetUserById?userId=${tokenData.uid}`;
        }
        if (refUserRole.current === "Vakil") {
          url = `https://api.fardissoft.ir/Lawyer/GetLawyerById?lawyerId=${tokenData.uid}`;
        }
        try {
          const response = await axios.get(url);
          console.log('response : ', response);
          setdetail(response.data.data);
        } catch (error) {
          console.log('error : ', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
    { }
      <div className="page-content" onSubmit={handleSubmit} >
        <div className="form-v4-content-ForEdit">
          <div className="form-left">
            <h2>ویرایش اطلاعات کاربری</h2>
            <p className="text-1">{description}</p>
          </div>

          <form className="form-detail" id="myform" onSubmit={handleSubmit}>
            <h2>اطلاعات کاربری</h2>

            <div className="form-group">

              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "18px" }}>نام و نام خانوادگی</label>
                <TextField
                  required
                  value={getdetail.name}
                  onChange={(event) => setUsername(event.target.value)}
                  margin="normal"
                />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "18px" }}>ایمیل</label>
                <TextField
                  required
                  value={getdetail.email}
                  onChange={(event) => setEmail(event.target.value)}
                  margin="normal"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "18px" }}>شغل</label>
                <TextField
                  required
                  value={getdetail.job}
                  onChange={(event) => setJob(event.target.value)}
                  margin="normal"
                />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "18px" }}>شماره همراه</label>
                <TextField
                  required
                  value={getdetail.phoneNumber}
                  onChange={(event) => setphoneNumber(event.target.value)}
                  margin="normal"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1" >
                <label style={{ position: "relative", top: "18px" }}>بیوگرافی</label>
                <TextField
                  value={""}
                  onChange={(event) => setBio(event.target.value)}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </div>

              <div className="form-row form-row-1">
                <br></br>
                <label htmlFor="avatar-input">
                  <Button onChange={handleAvatarChange} variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                  <p style={{color : "white", position : "relative", right :"8px"}}>انتخاب عکس پروفایل</p>
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
