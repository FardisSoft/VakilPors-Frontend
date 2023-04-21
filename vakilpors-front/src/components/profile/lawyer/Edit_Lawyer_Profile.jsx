import React, { useState,useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../css/a.css';
import { Box, FormControl, FormLabel, Input } from "@mui/material";
import { InputLabel, Select, MenuItem } from '@mui/material';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useAuth } from "../../../services/AuthProvider";
import { updateLawyer } from '../../../services/userService';


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


const Edit_Lawyer_Profile = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("red");

  const descriptionUser = "کاربر گرامی ! در این قسمت می توانید تمامی اطلاعات کاربری خود را بروزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";
  const [description, setDescription] = useState(descriptionUser);

  const classes = useStyles();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const { refUserRole, getAccessToken } = useAuth();

  const [username, setUsername] = useState();
  const [title, setTitle] = useState();
  const [StudyField, setStudyField] = useState();
  const [specialTies, setSpecialTies] = useState();
  const [city, setCity] = useState();
  const [grade, setGrade] = useState('');
  const [licencesNumber, setLicencesNumber] = useState();
  const [MemberOf, setMemberOf] = useState();
  const [YearsOfExperience, setYearsOfExperience] = useState();
  const [Gender, setGender] = useState();
  const [Education, setEducation] = useState();
  const [OfficeAddress, setOfficeAddress] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [ProfileURL, setProfileUrl] = useState();
  const [ProfileBackgroundURL, setProfileBackgroundurl] = useState();
  const [CallingCardUrl, setCallingCardUrl] = useState();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setdetail({
          ...getdetail,
          //[user.profileImageUrl]: reader.result,
        });
        //setdetail(reader.result);
      };
    }
  };

  const handleBackGroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileBackgroundurl(reader.result);
      };
    }
  };

  const handleCallingCardChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCallingCardUrl(reader.result);
      };
    }
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
          url = `https://api.fardissoft.ir/Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`
        }
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
      <div className="page-content" >
        <div className="form-v4-content-ForEdit">
          <div className="form-left">
            <h2>ویرایش اطلاعات کاربری</h2>
            <p className="text-1">{description}</p>
          </div>

          <form className="form-detail" id="myform" >
            <h2>اطلاعات کاربری</h2>

            <div className="form-group">
              <br></br>
              <br></br>
              <br></br>

              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>درباره من</p></label>
                <input
                  className="input100"
                  type="text"
                  name="aboutMe"
                  required
                  value={getdetail.aboutMe}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>عنوان</p></label>
                <input
                  className="input100"
                  type="text"
                  name="title"
                  required
                  value={getdetail.title}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>

            <div className="form-group">
              <div
                className="form-row form-row-1"
              >
                  <label style={{ position: "relative", top: "5px" }}><p>شهر</p></label>
                <input
                  className="input100"
                  type="text"
                  name="city"
                  required
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
                  required
                  value={getdetail.parvandeNo}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>تیتر</p></label>
                <input
                  className="input100"
                  type="text"
                  name="title"
                  required
                  value={getdetail.title}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>

              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>تخصص ها</p></label>
                <input
                  className="input100"
                  type="text"
                  name="specialties"
                  required
                  value={getdetail.specialties}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>




            <div className="form-group">
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>جنسیت</p></label>
                <input
                  className="input100"
                  type="text"
                  name="gender"
                  required
                  value={getdetail.gender}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>سابقه کار (سال) </p></label>
                <input
                  className="input100"
                  type="text"
                  name="yearsOfExperience"
                  required
                  value={getdetail.yearsOfExperience}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>


            <div className="form-group">
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>تحصیلات</p></label>
                <input
                  className="input100"
                  type="text"
                  name="education"
                  required
                  value={getdetail.education}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
              <div className="form-row form-row-1">
              <label style={{ position: "relative", top: "5px" }}><p>آدرس محل کار</p></label>
                <input
                  className="input100"
                  type="text"
                  name="officeAddress"
                  required
                  value={getdetail.officeAddress}
                  onChange={setUserInfo}
                  margin="normal" />
              </div>
            </div>



            <div className="form-group">
              <div className="form-row form-row-1">
              <label htmlFor="avatar-input">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    انتخاب عکس پیش‌زمینه
                  </Button>
              </label>
              <input
                  id="avatar-input"
                  className={classes.input}
                  type="file"
                  onChange={handleBackGroundChange}
                />
              </div>

              <div className="form-row form-row-1">
                <label htmlFor="avatar-input">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
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

            <div className="form-group">
            <div className="form-row form-row-1">
              <label htmlFor="avatar-input">
                  <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    انتخاب عکس کارت ویزیت
                  </Button>
              </label>
              <input
                  id="avatar-input"
                  className={classes.input}
                  type="file"
                  onChange={handleCallingCardChange}
                />
              </div>

              <div className="form-row form-row-1">
                <Box>
                  <FormControl>

                    <FormLabel htmlFor="resume-upload">آپلود رزومه (PDF):</FormLabel>

                    <FormLabel htmlFor="resume-upload"></FormLabel>
                    <Input sx={{ height: '70px' }}
                      type="file"
                      accept=".pdf"
                      id="resume-upload"
                      // onChange={setUserInfo}
                    />
                  </FormControl>

                </Box>

              </div>
            </div>





            <div className='form-row'>

              <FormControl
                sx={{
                  maxWidth: '220px',

                }}
                fullWidth
              >
                <Select value={grade} label="نوع پروانه وکالت" 
                // onChange={setUserInfo}
                 dir='rtl'>
                  <MenuItem value="پایه یک دادگستری">پایه یک دادگستری</MenuItem>
                  <MenuItem value="پایه دو دادگستری">پایه دو دادگستری</MenuItem>
                  <MenuItem value="پایه سه دادگستری">پایه سه دادگستری</MenuItem>
                  <MenuItem value="کانون مشاوران قوه قضائیه">کانون مشاوران قوه قضائیه</MenuItem>
                </Select>
              </FormControl>
              






            </div>







            <br></br>
            <br></br>
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} onClick={updateuser}>
              ثبت اطلاعات
            </Button>
            <label className="container"><p className="text" style={{color:errorColor}}>{errorMessage}</p></label>
          </form>
        </div>
      </div>


    </>
  );
};

export default Edit_Lawyer_Profile;
