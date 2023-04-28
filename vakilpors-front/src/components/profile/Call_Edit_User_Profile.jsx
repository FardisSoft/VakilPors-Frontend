import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input'
import '../../css/edit_profiles_style.css';
import { Helmet } from 'react-helmet-async';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../context/AuthProvider";
import { updateUser } from '../../services/userService';
import { BASE_API_ROUTE } from '../../Constants';

const Call_Edit_User_Profile = () => {

  const { getAccessToken } = useAuth();
  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("red");
  const [getdetail, setdetail, refdetail] = useStateRef({});

  // const upLoadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   const url = BASE_API_ROUTE + 'FileTest/Upload';
  //   try{
  //     const response = await axios.post(url,formData,{headers: {
  //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  //         'accept': '*/*'}});
  //     console.log('response in upLoading file : ',response);
  //   } catch(err) {
  //     console.log('error in upLoading file : ',err);
  //   }
  // };
  
  const handleAvatarChange = (file) => {
    setdetail({
        ...getdetail,
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
                  value={getdetail.bio}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={getdetail.profileImageUrl} onChange={handleAvatarChange} />
              </div>
            </div>
            <div className="form-row-last">
              <Button sx={{marginTop:'20px',fontFamily:'shabnam'}} type="submit" variant="contained" color="primary"  onClick={updateuser}>
                ثبت اطلاعات
              </Button>
              <label className="container" style={{marginTop:'20px'}}><p className="text" style={{color:errorColor}}>{errorMessage}</p></label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Call_Edit_User_Profile;
