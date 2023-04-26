import React, { useState,useEffect } from 'react';
import useStateRef from 'react-usestateref';
import Button from '@mui/material/Button';
import { MuiFileInput } from 'mui-file-input'
import '../css/a.css';
import { Select, MenuItem } from '@mui/material';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../../services/AuthProvider";
import { updateLawyer } from '../../../services/userService';
import { Helmet } from 'react-helmet-async';
import { BASE_API_ROUTE } from '../../../Constants';

const Call_Edit_Lawyer_Profile = () => {

  const { getAccessToken } = useAuth();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("red");
  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";  

  const handleAvatarChange = (file) => {
    setdetail({
      ...getdetail,
      ['profileImageUrl']: file,
    });
  };

  const handleBackGroundChange = (file) => {
    setdetail({
      ...getdetail,
      ['profileBackgroundPictureUrl']: file,
    });
  };

  const handleCallingCardChange = (file) => {
    setdetail({
      ...getdetail,
      ['callingCardImageUrl']: file,
    });
  };

  const handleResumeChange = (file) => {
    setdetail({
      ...getdetail,
      ['resumeLink']: file,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url = BASE_API_ROUTE + `Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`;
        try {
          const response = await axios.get(url);
          console.log('response : ', response);
          setdetail(response.data.data);
        } catch (error) {
          console.log('error : ', error);
        }
      }
      if(!token){
        // alert("شما باید ابتدا وارد حساب کاربری خود شوید.");
      }
    };

    fetchData();
  }, []);

  const updateuser = async (event) => {
    event.preventDefault();
    const token = await getAccessToken()
    if(token){
      const tokenData = jwt(token);
      try {
          const success = await updateLawyer(refdetail.current);
          console.log(refdetail.current);
          console.log("success",success);
          setErrorMessage("اطلاعات شما با موفقیت تغییر کرد.");
          setErrorColor("green");
      } catch (error) {
          console.log('error : ',error);
          setErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
          setErrorColor("red");
      }
    }
  };

  const setUserInfo = (event) => {
    event.target.name.includes('user') 
    ? setdetail({
      ...getdetail,
      ['user']: {
        ...getdetail.user,
        [event.target.name.slice(5)]: event.target.value,
      }
    })
    : setdetail({
      ...getdetail,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
    <Helmet>
      <title>edit lawyer page</title>
    </Helmet>
      <div className="page-content" >
        <div className="form-v4-content-ForEdit">
          <div className="form-left">
            <h2>ویرایش اطلاعات کاربری</h2>
            <p className="text-1">{descriptionUser}</p>
          </div>
          <form className="form-detail" id="myform" >
            <h2>اطلاعات کاربری</h2>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>نام و نام خانوادگی</p></label>
                <input
                  className="input100"
                  type="text"
                  name="user.name"
                  value={getdetail.user ? getdetail.user.name : ''}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عنوان</p></label>
                <input
                  className="input100"
                  type="text"
                  name="title"
                  value={getdetail.title}
                  onChange={setUserInfo}
                  margin="normal" />
                {/* <FormControl sx={{ maxWidth: '220px',}} fullWidth>
                  <Select onChange={handleGrade} label="نوع پروانه وکالت" 
                  // onChange={setUserInfo}
                  dir='rtl'>
                    <MenuItem value="پایه یک دادگستری">پایه یک دادگستری</MenuItem>
                    <MenuItem value="پایه دو دادگستری">پایه دو دادگستری</MenuItem>
                    <MenuItem value="پایه سه دادگستری">پایه سه دادگستری</MenuItem>
                    <MenuItem value="کانون مشاوران قوه قضائیه">کانون مشاوران قوه قضائیه</MenuItem>
                  </Select>
                </FormControl> */}
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label style={{ position: "relative", top: "5px" }}><p>درباره من</p></label>
                <input
                  className="input100"
                  type="text"
                  name="aboutMe"
                  value={getdetail.aboutMe}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>استان - شهر</p></label>
                <input
                  className="input100"
                  type="text"
                  name="city"
                  value={getdetail.city}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>شماره پروانه وکالت</p></label>
                <input
                  className="input100"
                  type="text"
                  name="parvandeNo"
                  value={getdetail.parvandeNo}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>ایمیل</p></label>
                <input
                  className="input100"
                  type="text"
                  name="user.email"
                  value={getdetail.user ? getdetail.user.email : ''}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>جنسیت</p></label>
                <input
                  className="input100"
                  type="text"
                  name="gender"
                  value={getdetail.gender}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label style={{ position: "relative", top: "5px" }}><p>تخصص ها</p></label>
                <input
                  className="input100"
                  type="text"
                  name="specialties"
                  value={getdetail.specialties}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>سابقه کار (سال) </p></label>
                <input
                  className="input100"
                  type="text"
                  name="yearsOfExperience"
                  value={getdetail.yearsOfExperience}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>تحصیلات</p></label>
                <input
                  className="input100"
                  type="text"
                  name="education"
                  value={getdetail.education}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label style={{ position: "relative", top: "5px" }}><p>آدرس محل کار</p></label>
                <input
                  className="input100"
                  type="text"
                  name="officeAddress"
                  value={getdetail.officeAddress}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={getdetail.profileImageUrl} onChange={handleAvatarChange} />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پس زمینه پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={getdetail.profileBackgroundPictureUrl} onChange={handleBackGroundChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>کارت ویزیت</p></label>
                <MuiFileInput fullWidth margin='10px' value={getdetail.callingCardImageUrl} onChange={handleCallingCardChange} />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>رزومه</p></label>
                <MuiFileInput fullWidth margin='10px' value={getdetail.resumeLink} onChange={handleResumeChange} />
              </div>
            </div>
            <div className="form-row-last">
              <Button sx={{marginTop:'20px', fontFamily:'shabnam'}} type="submit" variant="contained" color="primary" onClick={updateuser}>
                ثبت اطلاعات
              </Button>
              <label style={{marginTop:'20px'}} className="container"><p className="text" style={{color:errorColor}}>{errorMessage}</p></label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Call_Edit_Lawyer_Profile;
