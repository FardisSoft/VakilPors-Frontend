import React, { useState, useEffect } from "react";
import useStateRef from "react-usestateref";
import { Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import "../../css/newprofile.css";
import { Helmet } from "react-helmet-async";
import jwt from "jwt-decode";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { updateUser } from "../../services/userService";
import { BASE_API_ROUTE } from "../../Constants";
import { toast } from "react-toastify";
import StyledButton from "../ButtonComponent";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ReactLoading from "react-loading";

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

const Call_Edit_User_Profile = () => {
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [loading, setloading] = useState(false);
  const [base64code, setbase64code] = useState("");

  const { getAccessToken } = useAuth();
  const descriptionUser =
    "کاربر گرامی! در این قسمت می‌توانید تمامی اطلاعات کاربری خود را به‌روزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";

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

  const handleAvatarChange = (file) => {
    setdetail({
      ...refdetail.current,
      ["profileImage"]: file,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url =
          BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        try {
          const response = await axios.get(url);
          // console.log('response in getting user data : ', response);
          setdetail(response.data.data);
          console.log(response.data.data.profileImageUrl);
        } catch (error) {
          console.log("error in getting user data : ", error);
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
      console.log(key);
      formData.append(
        key,
        refdetail.current[key] == null ? "" : refdetail.current[key]
      );
    }
    try {
      const success = await updateUser(formData);
      setloading(false);
      showSuccesMessage("اطلاعات شما با موفقیت تغییر کرد.");
    } catch (error) {
      console.log("error in updating user data : ", error);
      setloading(false);
      showErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
    }
  };

  const setUserInfo = (event) => {
    setdetail({
      ...refdetail.current,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        console.log(fileString);
        // setdetail((prevDetail) => ({
        //   ...prevDetail,
        //   profileImageUrl: URL.createObjectURL(file),
        // }));
        setdetail({
          ...refdetail.current,
          ["profileImage"]: file,
        });
        setdetail({
          ...refdetail.current,
          profileImageUrl: URL.createObjectURL(file),
        });
        console.log(URL.createObjectURL(file));
        onLoad(fileString);
      };

      reader.readAsDataURL(file);
    }
  };

  const onLoad = (fileString) => {
    console.log(fileString);
    setbase64code(fileString);
  };

  return (
    <>
      <Helmet>
        <title>ویرایش اطلاعات کاربر</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <div className="page-content1">
            <div className="form-v4-content1">
              <div className="form-left1">
                <h2>ویرایش اطلاعات کاربری</h2>
                <p
                  className="text-1"
                  style={{ lineHeight: "2", textAlign: "justify" }}
                >
                  {descriptionUser}
                </p>
              </div>
              <form className="form-detail" id="myform">
                <h2 style={{ textAlign: "center" }}>اطلاعات فردی</h2>
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
                    src={refdetail.current.profileImageUrl}
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
                      onChange={handleChange}
                      hidden
                      accept=".jpg,.jpeg,.png"
                    />
                  </Button>
                </div>
                <div className="form-group" style={{ marginTop: "35px" }}>
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="نام و نام خانوادگی"
                      variant="outlined"
                      size="small"
                      name="name"
                      value={refdetail.current.name}
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
                      name="email"
                      value={refdetail.current.email}
                      onChange={setUserInfo}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ width: "100%", marginTop: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      label="شغل"
                      variant="outlined"
                      name="job"
                      value={refdetail.current.job}
                      onChange={setUserInfo}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div style={{ width: "100%", marginTop: "20px" }}>
                    <TextField
                      id="outlined-multiline"
                      label="بیوگرافی"
                      multiline
                      rows={3}
                      variant="outlined"
                      type="text"
                      name="bio"
                      value={refdetail.current.bio}
                      onChange={setUserInfo}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className="form-row-last"
                >
                  <StyledButton
                    style={{
                      marginTop: "20px",
                      fontFamily: "shabnam",
                      width: "10rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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

export default Call_Edit_User_Profile;
