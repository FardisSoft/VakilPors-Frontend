import React, { useState,useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { Helmet } from 'react-helmet-async';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Button, Chip, TextField } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import '../../css/signup-and-profile-edit-pages-style.css';
import jwt from 'jwt-decode';
import axios from 'axios';
import { BASE_API_ROUTE } from '../../Constants';
import { useAuth } from "../../context/AuthProvider";
import { updateLawyer } from '../../services/userService';
import { toast } from 'react-toastify';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
});
// mui rtl

const filter = createFilterOptions();

const Call_Edit_Lawyer_Profile = () => {
  const { getAccessToken } = useAuth();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [gender, setGender] = useState('');
  const [title, setTitle] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";  

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

  const getDefaultTakhasos = (data) => {
    const tt = [];
    data.split('/').map((temp) => {
      tt.push({title: temp});
    });
    setSpecialties(tt);
  };

  const specialtiesList = () => {
    return (
      <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={specialtieses}
        getOptionLabel={(option) => option.title}
        defaultValue={specialties}
        value={specialties}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setSpecialties({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setSpecialties({
              title: newValue.inputValue,
            });
          } else {
            setSpecialties(newValue);
          }
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="filled" color='primary' dir="rtl" sx={{ fontFamily:"shabnam" }} label={option.title} {...getTagProps({ index })} />
          ))
        }
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}}>{option.title}</li>}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField className='NoBorder' {...params} placeholder="تخصص ها"/>
        )}
      />
      </CacheProvider>
      </ThemeProvider>
    );
  };

  const genderList = () => {
    return (
      <Autocomplete
        value={gender}
        onChange={(event, newValue) => {
          setGender(newValue);
          setdetail({
            ...refdetail.current,
            ['gender']: newValue,
          });
        }}
        id="controllable-states-demo"
        options={genders}
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}}>{option}</li>}
        renderInput={(params) => <TextField className='NoBorder' {...params} />}
      />
    );
  };

  const titleList = () => {
    return (
      <Autocomplete
        value={title}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTitle(newValue);
            setdetail({
              ...refdetail.current,
              ['title']: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setTitle(newValue.inputValue);
            setdetail({
              ...refdetail.current,
              ['title']: newValue.inputValue,
            });
          } else if(newValue && newValue.title) {
            setTitle(newValue.title);
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
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}} >{option.title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField className='NoBorder' {...params}/>
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
          // console.log('response in getting lawyer data : ', response);
          setdetail(response.data.data);
          setGender(response.data.data.gender);
          setTitle(response.data.data.title);
          getDefaultTakhasos(response.data.data.specialties);
        } catch (error) {
          console.log('error in getting lawyer data : ', error);
        }
      }
    };
    fetchData();
  }, []);

  const updateuser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in refdetail.current) {
      if(key != 'user' && key != 'specialties'){
        formData.append(key, refdetail.current[key] == null ? '' : refdetail.current[key]);
      }
      if(key == 'user')
        for (const keyUser in refdetail.current['user']){
          formData.append('user.' + keyUser, refdetail.current['user'][keyUser] == null ? '' : refdetail.current['user'][keyUser]);
        }
    }
    let specialtiesString = '';
    specialties.map((takh) => {
      specialtiesString = specialtiesString == '' ? takh.title : ( specialtiesString + '/' + takh.title );
    });
    formData.append('specialties', specialtiesString);
    const token = await getAccessToken();
    if(token){
      const tokenData = jwt(token);
      try {
          const success = await updateLawyer(formData);
          // console.log("success in updating lawyer data : ",success);
          showSuccesMessage("اطلاعات شما با موفقیت تغییر کرد.");
      } catch (error) {
          console.log('error in updating lawyer data : ',error);
          showErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
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
                {specialtiesList()}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Call_Edit_Lawyer_Profile;
