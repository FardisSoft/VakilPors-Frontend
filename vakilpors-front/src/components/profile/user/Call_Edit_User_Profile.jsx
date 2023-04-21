import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../css/a.css';
import { Helmet } from 'react-helmet-async';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../../services/AuthProvider";
import { updateUser } from '../../../services/userService';

const Call_Edit_User_Profile = () => {

  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";
  const [description, setDescription] = useState(descriptionUser);
  const { refUserRole, getAccessToken } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("red");


  const [getdetail, setdetail, refdetail] = useStateRef({});
  

  const handleAvatarChange = (event) => {
    console.log('oomad v ',refdetail.current);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setdetail({
          ...getdetail,
          ['profileImageUrl']: reader.result,
        });
      };
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url = `https://api.fardissoft.ir/Customer/GetUserById?userId=${tokenData.uid}`;
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
    console.log(refdetail.current);
    try {
      const success = await updateUser(refdetail.current);
      setErrorMessage("اطلاعات شما با موفقیت تغییر کرد.");
      setErrorColor("green");
    } catch (error) {
        console.log('error : ',error);
        setErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
        setErrorColor("red");
    }
  };

  const setUserInfo = (event) => {
    setdetail({
      ...getdetail,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>edit user profile</title>
      </Helmet>
      <div className="page-content" >
        <div className="form-v4-content-ForEdit">
          <div className="form-left">
            <h2>ویرایش اطلاعات کاربری</h2>
            <p className="text-1">{description}</p>
          </div>

          <form className="form-detail" id="myform">
            <h2>اطلاعات کاربری</h2>

            <div className="form-group">

              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>نام و نام خانوادگی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="name"
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
              <div className="form-row form-row-1" >
                <label style={{ position: "relative", top: "5px" }}><p>بیوگرافی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="bio"
                  // required
                  value={getdetail.bio}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              {/* <div className="form-row form-row-1" >
                <label style={{ position: "relative", top: "5px" }}><p>عکس پروفایل</p></label>
                <input
                  className="input100"
                  type="file"
                  name="profileImageUrl"
                  style={{justifyContent:'center',alignItems:'center'}}
                  value={profileImage}
                  onChange={handleAvatarChange}
                  margin="normal" />
              </div> */}
              {/* <div className="form-row form-row-1">
                <Button variant="contained" color="primary" component="label" startIcon={<CloudUploadIcon sx={{color:"white"}}/>}>
                  <p style={{ color: "white", position: "relative", right: "8px" }}>انتخاب عکس پروفایل</p>
                  <input type="file" hidden id="fileInput" onChange={handleAvatarChange} />
                </Button>
                { refdetail.current.profileImageUrl && <Input htmlFor="fileInput" value={refdetail.current.profileImageUrl.name} disabled /> }
              </div> */}
            </div>

            <div className="form-row-last">
              <Button type="submit" variant="contained" color="primary"  onClick={updateuser}>
                ثبت اطلاعات
              </Button>
              <label className="container"><p className="text" style={{color:errorColor}}>{errorMessage}</p></label>
            </div>
          </form>
        </div>
      </div>


    </>
  );
};

export default Call_Edit_User_Profile;
