import React, { useState,useEffect } from 'react';
import useStateRef from 'react-usestateref';
import Button from '@mui/material/Button';
import { MuiFileInput } from 'mui-file-input'
import '../../css/edit_profiles_style.css';
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
  const [defaultTakhasos, setDefaultTakhasos] = useState([]);

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
    if(getdetail && getdetail.specialties){
      const tempList = getdetail.specialties.split('/');
      
      tempList.map((temp) => {
        tt.push({title: temp});
      });
    }
    setDefaultTakhasos(tt);
    console.log(defaultTakhasos);
  }

  const specialtiesList = () => {
   
    return (

      <Autocomplete
        multiple
        id="tags-outlined"
        options={specialtieses}
        getOptionLabel={(option) => option.title}
        defaultValue={defaultTakhasos}
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
      value={getdetail.gender}
      onChange={(event, newValue) => {
        setdetail({
          ...getdetail,
          ['gender']: newValue,
        });
      }}
    // inputValue={inputValue}
    // onInputChange={(event, newInputValue) => {
    //   setInputValue(newInputValue);
    // }}
    id="controllable-states-demo"
    options={genders}
    renderInput={(params) => <TextField {...params} />}
  />
  );
  }


    
  const titleList = () => {

    return (
      <Autocomplete
        value={getdetail.title}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setdetail({
              ...getdetail,
              ['title']: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setdetail({
              ...getdetail,
              ['title']: newValue.inputValue,
            });
          } else if(newValue && newValue.title) {
            setdetail({
              ...getdetail,
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

              <label style={{ position: "relative", top: "5px" }}><p>ایمیل</p></label>
                <input
                  className="input100"
                  type="text"
                  name="user.email"
                  value={getdetail.user ? getdetail.user.email : ''}
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
                  value={getdetail.specialties}
                  onChange={setUserInfo}
                  margin="normal" />
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
