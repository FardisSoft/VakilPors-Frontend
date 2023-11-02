import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input'
import '../../css/signup-and-profile-edit-pages-style.css';
import { Helmet } from 'react-helmet-async';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../context/AuthProvider";
import { updateUser } from '../../services/userService';
import { BASE_API_ROUTE } from '../../Constants';
import { toast } from 'react-toastify';
import StyledButton from '../ButtonComponent';



const Call_Edit_User_Profile = () => {

  const [getdetail, setdetail, refdetail] = useStateRef({});
  const { getAccessToken } = useAuth();
  const descriptionUser = "کاربر گرامی! در این قسمت می‌توانید تمامی اطلاعات کاربری خود را به‌روزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";

  const showErrorMessage = (errorMessage) => {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl:true,
    });
  };
  const showSuccesMessage = (payam) => {
    toast.success(payam, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl:true,
    });
  };
  
  const handleAvatarChange = (file) => {
    setdetail({
        ...refdetail.current,
        ['profileImage']: file,
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        try { 
          const response = await axios.get(url);
          // console.log('response in getting user data : ', response);
          setdetail(response.data.data);
        } catch (error) {
          console.log('error in getting user data : ', error);
        }
      }
    };

    fetchData();
  }, []);

  const updateuser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in refdetail.current) {
      formData.append(key, refdetail.current[key] == null ? '' : refdetail.current[key]);
    }
    try {
      const success = await updateUser(formData);
      showSuccesMessage("اطلاعات شما با موفقیت تغییر کرد.");
    } catch (error) {
      console.log('error in updating user data : ',error);
      showErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
    }
  };

  const setUserInfo = (event) => {
    setdetail({
      ...refdetail.current,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>ویرایش اطلاعات کاربر</title>
      </Helmet>
      <div className="page-content" >
        <div className="form-v4-content">
          <div className="form-left">
            <h2>ویرایش اطلاعات کاربری</h2>
            <p className="text-1">{descriptionUser}</p>
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
                  value={refdetail.current.name}
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
                  value={refdetail.current.email}
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
                  value={refdetail.current.job}
                  onChange={setUserInfo} />
              </div>
              <div className="form-row form-row-1" >
                <label style={{ position: "relative", top: "5px" }}><p>بیوگرافی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="bio"
                  value={refdetail.current.bio}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.profileImage} inputProps={{style: {padding: "20px 10px"}}} onChange={handleAvatarChange} />
              </div>
            </div>
            <div className="form-row-last">
              {/* <Button sx={{marginTop:'20px',fontFamily:'shabnam'}} type="submit" variant="contained" color="primary"  onClick={updateuser}>
                ثبت اطلاعات
              </Button> */}
              <StyledButton style={{marginTop:'20px', fontFamily:'shabnam', width: '10rem' }} type="submit"  onClick={updateuser}>
                ثبت اطلاعات
              </StyledButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Call_Edit_User_Profile;
