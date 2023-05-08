import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useAuth } from "../../context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, TextField, Typography, Slide, Button, InputAdornment, IconButton } from '@mui/material';
import smilinglawyer from '../../assests/images/lawyer_smiler.jpg';
import { Visibility, VisibilityOff } from "@mui/icons-material";

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});
// mui rtl

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("red");
    
    const [getUser, setUser] = useState({
        phoneNumber: "",
        password: ""
    });

    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        setShow(true);
    }, []);

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
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl:true,
            });
    };

    const { login } = useAuth();

    const navigate = useNavigate();

    const createUser = async (event) => {
        event.preventDefault();
        if (!getUser.phoneNumber || !getUser.password) {
            setErrorMessage("لطفا شماره موبایل یا رمز عبور را وارد کنید.");
            return;
        }
        else {
            setErrorMessage(" ");
            const success = await login(getUser);
            if(success === "success"){
                showSuccesMessage("با موفقیت وارد شدید.");
                await delay(1000);
                navigate("/");
                setUser({});
            }
            else{
                showErrorMessage("ورود با خطا مواجه شد.");
            }
        }
    };

    const setUserInfo = (event) => {
        setUser({
            ...getUser,
            [event.target.name]: event.target.value,
        });
    };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
        <Grid container 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage:`url(${smilinglawyer})`,
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover',
          backgroundPosition:'center',
          }}>
            <Grid 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 2,
              padding: 2,
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: '20px',
              width: {xs:'90%',sm:'60%',md:'40%'}}}>
                <Slide in={show} direction="up">
                    <Grid justifyContent={'center'}>
                        <Typography sx={{ fontFamily:"shabnam", fontSize:"21px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>به وکیل پرس خوش آمدید!</Typography>
                    </Grid>
                </Slide>
                <Slide in={show} direction="left">
                    <TextField
                      id="phoneNumber"
                      label="شماره موبایل"
                      type="text"
                      name="phoneNumber"
                      value={getUser.phoneNumber}
                      onChange={setUserInfo}
                      variant="outlined"
                      inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                      InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                      sx={{
                        width: {xs:'100%',sm:'80%'},
                        padding: 0,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        mb: '10px',
                        borderRadius:"5px",
                      }}/>
                </Slide>
                <Slide in={show} direction="right">
                    <TextField
                      id="password"
                      label="رمز عبور"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={getUser.password}
                      onChange={setUserInfo}
                      variant="outlined"
                      InputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",},
                      endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                      }}
                      InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                      sx={{
                        width: {xs:'100%',sm:'80%'},
                        padding: 0,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderRadius:"5px",
                      }}/>
                </Slide>
                <Slide in={show} direction="up">
                    <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", m: 2, justifyContent:"center" }}>
                        <Button size={'large'} variant="contained" color="primary" sx={{fontsize:"18px",fontFamily:"shabnam"}} >
                            ورود
                        </Button>
                    </Grid>
                </Slide>
                <Slide in={show} direction="up">
                    <Grid container direction="column" alignItems="center">
                        <Typography sx={{ color: errorColor }}>{errorMessage}</Typography>
                        <Typography sx={{ textAlign: "center", fontFamily:"shabnam", align:"center", color:"black" }}>
                            اکانت ندارید؟ <Link to="/Register">ثبت نام کنید!</Link>
                        </Typography>
                        <Typography sx={{ textAlign: "center", fontFamily:"shabnam", align:"center", color:"black" }}>
                            <Link to="/Forgot_Password">فراموشی رمز عبور</Link>
                        </Typography>
                    </Grid>
                </Slide>
                <ToastContainer />
            </Grid>
        </Grid>
        </CacheProvider>
        </ThemeProvider>
        </>
    );
}

export default Login;