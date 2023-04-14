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
import { updateUser } from '../../services/userService';

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

  const updateuser = async (event) => {
    event.preventDefault();
    console.log(getdetail);
    const token = await getAccessToken()
    const tokenData = jwt(token);
    try {
      const success = await updateUser(getdetail, tokenData.uid);
  } catch (error) {
      console.log('error : ',error);
  }
    // console.log(localStorage.getItem('accessToken'),"\n refresh : ", localStorage.getItem('refreshToken'));
    // console.log("main role : ", refUserRole.current);
  };

  const setUserInfo = (event) => {
    setdetail({
      ...getdetail,
      [event.target.name]: event.target.value,
    });
  };

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
                <label style={{ position: "relative", top: "5px" }}><p>نام و نام خانوادگی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  required
                  value={getdetail.name}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>ایمیل</p></label>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  required
                  value={getdetail.email}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>شغل</p></label>
                <input
                  className="input100"
                  type="text"
                  name="job"
                  value={getdetail.job}
                  onChange={setUserInfo} />

              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>شماره همراه</p></label>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  required
                  value={getdetail.phoneNumber}
                  onChange={setdetail.phoneNumber}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1" >
                <label style={{ position: "relative", top: "5px" }}><p>بیوگرافی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  required
                  value={getdetail.bio}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>

              <div className="form-row form-row-1">
                <br></br>
                <label htmlFor="avatar-input">
                  <Button onChange={handleAvatarChange} variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    <p style={{ color: "white", position: "relative", right: "8px" }}>انتخاب عکس پروفایل</p>
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

            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} onClick={updateuser}>
              ثبت اطلاعات
            </Button>
          </form>
        </div>
      </div>


    </>
  );
};

export default ProfileEdit;
