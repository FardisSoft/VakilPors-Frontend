import React, { useState,useEffect } from 'react';
import useStateRef from 'react-usestateref';
import Button from '@mui/material/Button';
import { MuiFileInput } from 'mui-file-input';
import '../../css/signup-and-profile-edit-pages-style.css';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../context/AuthProvider";
import { updateLawyer } from '../../services/userService';
import { Helmet } from 'react-helmet-async';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { BASE_API_ROUTE } from '../../Constants';

const filter = createFilterOptions();

const Call_Edit_Lawyer_Profile = () => {
  const { getAccessToken } = useAuth();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("red");
  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";  
  const [defaultTakhasos, setDefaultTakhasos, refDefaultTakhasos] = useStateRef([]);

  const titles = [
    { title: 'وکیل پایه یک دادگستری' },
    { title: 'وکیل پایه دو دادگستری' },
    { title: 'وکیل پایه سه دادگستری' },
    { title: 'وکیل کانون مشاوران قوه قضائیه' },
    { title: 'کارشناس حقوقی'},
    { title: 'کارآموز وکالت' },
    
  ];

  const genders = ['مرد', 'زن', 'سایر'];

  const specialtieses = [
    { title: 'ثبت احوال' },
    { title: 'بیمه' },
    { title: 'ملکی' },
    { title: 'مالیات' },
    { title: 'شرکت ها' },
    { title: 'انحصار وراثت' },
    { title: 'دیوان عدالت اداری' },
    { title: 'مالکیت معنوی' },
    { title: 'بین الملل' },
    { title: 'اداره کار' },
    { title: 'جرایم اینترنتی' },
    { title: 'قراردها' },
    { title: 'وصول مطالبات' },
    { title: 'خانواده' },
    { title: 'کیفری (جرائم)' },
    { title: 'اجرای احکام' },
    { title: 'جرایم علیه اشخاص' },
    { title: 'جرایم علیه اموال' },
    { title: 'جرایم علیه امنیت کشور' },
    { title: 'اموال و مالکیت' },
    { title: 'ثبت اسناد' },
    { title: 'داوری' },
    { title: 'سربازی و نظام وظیفه' },
  ];

  const getDefaultTakhasos = () => {
    const tt = [];
    if(refdetail.current && refdetail.current.specialties){
      const tempList = refdetail.current.specialties.split('/');
      
      tempList.map((temp) => {
        tt.push({title: temp});
      });
    }
    setDefaultTakhasos(tt);
    // console.log(refDefaultTakhasos.current);
  }

  const specialtiesList = () => { 
    return (
      <Autocomplete
        multiple
        id="tags-outlined"
        options={specialtieses}
        getOptionLabel={(option) => option.title}
        defaultValue={refDefaultTakhasos.current}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="تخصص ها"
          />
        )}
      />
    );
  }

  const genderList = () => {
    return (
      <Autocomplete
        value={refdetail.current.gender}
        onChange={(event, newValue) => {
          setdetail({
            ...refdetail.current,
            ['gender']: newValue,
          });
        }}
        // inputValue={refdetail.current.gender}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id="controllable-states-demo"
        options={genders}
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}}>{option}</li>}
        renderInput={(params) => <TextField id='genderList' {...params} />}
      />
    );
  }

  const titleList = () => {
    return (
      <Autocomplete
        value={refdetail.current.title}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setdetail({
              ...refdetail.current,
              ['title']: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setdetail({
              ...refdetail.current,
              ['title']: newValue.inputValue,
            });
          } else if(newValue && newValue.title) {
            setdetail({
              ...refdetail.current,
              ['title']: newValue.title,
            });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={titles}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField sx={{border:"none"}}{...params}/>
        )}
      />
    );
  };

  const handleAvatarChange = (file) => {
    setdetail({
      ...refdetail.current,
      ['user']: {
        ...refdetail.current.user,
        ['profileImage']: file,
      }
    });
  };

  const handleBackGroundChange = (file) => {
    setdetail({
      ...refdetail.current,
      ['profileBackgroundPicture']: file,
    });
  };

  const handleCallingCardChange = (file) => {
    setdetail({
      ...refdetail.current,
      ['callingCardImage']: file,
    });
  };

  const handleResumeChange = (file) => {
    setdetail({
      ...refdetail.current,
      ['resume']: file,
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
          getDefaultTakhasos();
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
    console.log(refdetail.current);
    const formData = new FormData();
    for (const key in refdetail.current) {
      if(key != 'user'){
        formData.append(key, refdetail.current[key] == null ? '' : refdetail.current[key]);
      }
      if(key == 'user')
        for (const keyUser in refdetail.current['user']){
          formData.append('user.' + keyUser, refdetail.current['user'][keyUser] == null ? '' : refdetail.current['user'][keyUser]);
        }
    }
    const token = await getAccessToken();
    if(token){
      const tokenData = jwt(token);
      try {
          const success = await updateLawyer(formData);
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
      ...refdetail.current,
      ['user']: {
        ...refdetail.current.user,
        [event.target.name.slice(5)]: event.target.value,
      }
    })
    : setdetail({
      ...refdetail.current,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
    <Helmet>
      <title>edit lawyer page</title>
    </Helmet>
      <div className="page-content" >
        <div className="form-v4-content">
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
                  value={refdetail.current.user ? refdetail.current.user.name : ''}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">

              <label style={{ position: "relative", top: "5px" }}><p>ایمیل</p></label>
                <input
                  className="input100"
                  type="text"
                  name="user.email"
                  value={refdetail.current.user ? refdetail.current.user.email : ''}
                  onChange={setUserInfo}
                  margin="normal" />

              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label style={{ position: "relative", top: "5px" }}><p>درباره من</p></label>
                <input
                  className="input100"
                  type="text"
                  name="aboutMe"
                  value={refdetail.current.aboutMe}
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
                  value={refdetail.current.city}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>شماره پروانه وکالت</p></label>
                <input
                  className="input100"
                  type="text"
                  name="parvandeNo"
                  value={refdetail.current.parvandeNo}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عنوان</p></label>
                {titleList()}
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>جنسیت</p></label>
                {genderList()}
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label style={{ position: "relative", top: "5px" }}><p>تخصص ها</p></label>
                <input
                  className="input100"
                  type="text"
                  name="specialties"
                  value={refdetail.current.specialties}
                  onChange={setUserInfo}
                  margin="normal" />
                {/* {specialtiesList()} */}
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>سابقه کار (سال) </p></label>
                <input
                  className="input100"
                  type="text"
                  name="yearsOfExperience"
                  value={refdetail.current.yearsOfExperience}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>تحصیلات</p></label>
                <input
                  className="input100"
                  type="text"
                  name="education"
                  value={refdetail.current.education}
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
                  value={refdetail.current.officeAddress}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.user ? refdetail.current.user.profileImage : null} inputProps={{style: {padding: "20px 10px"}}} onChange={handleAvatarChange} />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>عکس پس زمینه پروفایل</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.profileBackgroundPicture} inputProps={{style: {padding: "20px 10px"}}} onChange={handleBackGroundChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>کارت ویزیت</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.callingCardImage} inputProps={{style: {padding: "20px 10px"}}} onChange={handleCallingCardChange} />
              </div>
              <div className="form-row form-row-1">
                <label style={{ position: "relative", top: "5px" }}><p>رزومه</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.resume} inputProps={{style: {padding: "20px 10px"}}} onChange={handleResumeChange} />
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
