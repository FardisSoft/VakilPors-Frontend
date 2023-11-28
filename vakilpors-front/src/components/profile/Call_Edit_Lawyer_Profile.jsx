import React, { useState, useEffect } from "react";
import useStateRef from "react-usestateref";
import { Helmet } from "react-helmet-async";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button, TextField } from "@mui/material";
import "../../css/profileelawyer.css";
import jwt from "jwt-decode";
import axios from "axios";
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import { updateLawyer } from "../../services/userService";
import { toast } from "react-toastify";
import StyledButton from "../ButtonComponent";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ReactLoading from "react-loading";
// mui rtl
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// mui rtl
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
  typography: {
    fontFamily: "shabnam",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "shabnam",
  },
  direction: "rtl",
});

const filter = createFilterOptions();

const Call_Edit_Lawyer_Profile = () => {
  const navigate = useNavigate();
  const { getAccessToken } = useAuth();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setloading] = useState(false);
  const descriptionUser =
    "کاربر گرامی! در این قسمت می‌توانید تمامی اطلاعات فردی خود را به‌روزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";

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
      rtl: true,
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
      rtl: true,
    });
  };
  const getDefaultTakhasos = (data) => {
    const tt = [];
    data.split("/").map((temp) => {
      tt.push({ title: temp });
    });
    setSpecialties(tt);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        console.log(fileString);
        setdetail({
          ...refdetail.current,
          user: {
            ...refdetail.current.user,
            ["profileImage"]: file,
          },
        });
        setdetail((prevDetail) => ({
          ...prevDetail,
          user: {
            ...prevDetail.user,
            profileImageUrl: URL.createObjectURL(file),
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackGroundChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        console.log(fileString);
        setdetail({
          ...refdetail.current,
          ["profileBackgroundPicture"]: file,
        });
        setdetail({
          ...refdetail.current,
          profileBackgroundPictureUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCallingCardChange = (file) => {
    setdetail({
      ...refdetail.current,
      ["callingCardImage"]: file,
    });
  };

  const handleResumeChange = (file) => {
    setdetail({
      ...refdetail.current,
      ["resume"]: file,
    });
  };

  const handleMelliCardChange = (event) => {
    // setdetail({
    //   ...refdetail.current,
    //   ["nationalCardImage"]: file,
    // });

    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        console.log(fileString);
        setdetail({
          ...refdetail.current,
          ["nationalCardImage"]: file,
        });
        setdetail({
          ...refdetail.current,
          nationalCardImageUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url =
          BASE_API_ROUTE + `Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`;
        try {
          const response = await axios.get(url);
          // console.log('response in getting lawyer data : ', response);
          setdetail(response.data.data);
          console.log(response.data.data.user.profileImageUrl);
          setGender(response.data.data.gender);
          console.log(response.data.data);
          setTitle(response.data.data.title);
          getDefaultTakhasos(response.data.data.specialties);
        } catch (error) {
          console.log("error in getting lawyer data : ", error);
        }
      }
    };
    fetchData();
  }, []);

  const updateuser = async (event) => {
    setloading(true);
    event.preventDefault();
    const formData = new FormData();
    for (const key in refdetail.current) {
      if (key != "user" && key != "specialties") {
        formData.append(
          key,
          refdetail.current[key] == null ? "" : refdetail.current[key]
        );
      }
      if (key == "user")
        for (const keyUser in refdetail.current["user"]) {
          formData.append(
            "user." + keyUser,
            refdetail.current["user"][keyUser] == null
              ? ""
              : refdetail.current["user"][keyUser]
          );
        }
    }
    let specialtiesString = "";
    specialties.map((takh) => {
      specialtiesString =
        specialtiesString == ""
          ? takh.title
          : specialtiesString + "/" + takh.title;
    });
    formData.append("specialties", specialtiesString);
    const token = await getAccessToken();
    if (token) {
      const tokenData = jwt(token);
      try {
        const success = await updateLawyer(formData);
        setloading(false);
        showSuccesMessage("اطلاعات شما با موفقیت تغییر کرد.");
      } catch (error) {
        console.log("error in updating lawyer data : ", error);
        setloading(false);
        showErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
      }
    }
  };

  const setUserInfo = (event) => {
    event.target.name.includes("user")
      ? setdetail({
          ...refdetail.current,
          ["user"]: {
            ...refdetail.current.user,
            [event.target.name.slice(5)]: event.target.value,
          },
        })
      : setdetail({
          ...refdetail.current,
          [event.target.name]: event.target.value,
        });
  };

  return (
    <>
      <Helmet>
        <title>ویرایش اطلاعات وکیل</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <div className="page-content2">
            <div className="form-v4-content2">
              <div className="form-left2">
                <h2 style={{ fontSize: "30px", fontWeight: 700 }}>
                  ویرایش اطلاعات فردی
                </h2>
                <p
                  className="text-1"
                  style={{
                    lineHeight: "2",
                    textAlign: "justify",
                    marginTop: "10px",
                  }}
                >
                  {descriptionUser}
                </p>

                <p
                  className="text-1"
                  style={{
                    lineHeight: "2",
                    textAlign: "justify",
                    marginTop: "10px",
                  }}
                >
                  با رفتن به صفحه زیر نیز می توانید اطلاعات شغلی خود را به روز
                  رسانی کنید.
                </p>

                <div
                  className="form-row-last"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton
                    style={{
                      width: "10rem",
                    }}
                    type="submit"
                    onClick={() => navigate("/editjob_lawyer")}
                  >
                    اطلاعات شغلی
                  </StyledButton>
                </div>
              </div>
              <form className="form-detail" id="myform">
                <h3 style={{ textAlign: "center" }}>اطلاعات فردی</h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    alt="profile"
                    sx={{
                      width: "18vmin",
                      height: "18vmin",
                      borderRadius: "50%",
                    }}
                    src={
                      refdetail.current.user
                        ? refdetail.current.user.profileImageUrl
                        : null
                    }
                  />
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: "#1976D2",
                      borderRadius: "20px",
                      color: "white",
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    sx={{
                      color: "white",
                      width: "100px",
                      mt: 2,
                      height: "40px",
                    }}
                  >
                    انتخاب عکس
                    <input
                      type="file"
                      onChange={handleAvatarChange}
                      hidden
                      accept=".jpg,.jpeg,.png"
                    />
                  </Button>
                </div>
                <div className="form-group2" style={{ marginTop: "25px" }}>
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="نام و نام خانوادگی"
                      variant="outlined"
                      size="small"
                      name="user.name"
                      value={
                        refdetail.current.user
                          ? refdetail.current.user.name
                          : ""
                      }
                      onChange={setUserInfo}
                      fullWidth
                      autoComplete="name"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="ایمیل"
                      variant="outlined"
                      name="user.email"
                      value={
                        refdetail.current.user
                          ? refdetail.current.user.email
                          : ""
                      }
                      onChange={setUserInfo}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div className="form-group2">
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="استان-شهر"
                      variant="outlined"
                      name="city"
                      value={
                        refdetail.current ? refdetail.current.city : ""
                      }
                      onChange={setUserInfo}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="form-row form-row-1">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        جنسیت
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label=" جنسیت"
                        onChange={(event) => {
                          setGender(event.target.value);
                          setdetail({
                            ...refdetail.current,
                            ["gender"]: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value={"مرد"}>مرد</MenuItem>
                        <MenuItem value={"زن"}> زن</MenuItem>
                        <MenuItem value={"سایر"}>سایر</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "20px" }}>
                  <TextField
                    id="outlined-multiline"
                    label="بیوگرافی"
                    multiline
                    rows={2}
                    variant="outlined"
                    type="text"
                    name="aboutMe"
                    value={refdetail.current ? refdetail.current.aboutMe : ""}
                    onChange={setUserInfo}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div
                  style={{ width: "100%", marginTop: "20px", display: "flex" }}
                >
                  <Avatar
                    style={{
                      borderRadius: "10px",
                      width: "150px",
                      height: "90px",
                    }}
                    src={refdetail.current.profileBackgroundPictureUrl}
                    variant="square"
                  />
                  <div
                    style={{
                      marginRight: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        backgroundColor: "#1976D2",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      sx={{
                        color: "white",
                        width: "130px",
                        mt: 1,
                        height: "40px",
                      }}
                    >
                      پس زمینه پروفایل
                      <input
                        type="file"
                        onChange={handleBackGroundChange}
                        hidden
                        accept=".jpg,.jpeg,.png"
                      />
                    </Button>
                    <h3 style={{ marginTop: "8px", fontSize: "0.7rem" }}>
                      می تواند یک عکس پس زمینه برای پروفایل خود انتخاب کنید
                    </h3>
                  </div>
                </div>
{/* 
                <div style={{ marginTop: "5px", display: "flex" }}>
                  <Avatar
                    style={{
                      borderRadius: "10px",
                      width: "150px",
                      height: "90px",
                    }}
                    src={refdetail.current.nationalCardImageUrl}
                    variant="square"
                  />
                  <div
                    style={{
                      marginRight: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        backgroundColor: "#1976D2",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      sx={{
                        color: "white",
                        width: "130px",
                        mt: 1,
                        height: "40px",
                      }}
                    >
                      کارت ملی
                      <input
                        type="file"
                        onChange={handleMelliCardChange}
                        hidden
                        accept=".jpg,.jpeg,.png"
                      />
                    </Button>
                    <h3 style={{ marginTop: "8px", fontSize: "0.7rem" }}>
                      کارت ملی شما در پروفایل شما نمایش داده نخواهد شد و تنها
                      جهت احراز هویت شما توسط ادمین مورد بررسی قرار می گیرد
                    </h3>
                  </div>
                </div> */}
                <div
                  className="form-row-last"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton
                    style={{
                      fontFamily: "shabnam",
                      width: "10rem",
                    }}
                    type="submit"
                    onClick={updateuser}
                  >
                    {!loading && <span>ثبت اطلاعات</span>}
                    {loading && (
                      <div
                        style={{
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ReactLoading type="bubbles" color="#fff" />
                      </div>
                    )}
                  </StyledButton>
                </div>
              </form>
            </div>
          </div>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};

export default Call_Edit_Lawyer_Profile;
