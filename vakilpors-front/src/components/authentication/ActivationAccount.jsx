import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { toast } from 'react-toastify';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import lawOnline from '../../assests/images/law-online.jpg';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    typography: {
        fontFamily: 'shabnam',
    },
});
const theme = createTheme({
    direction: 'rtl',
});
// mui rtl

const ActivationAccount = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [ActivationCode, setActivationCode] = useState(''); 
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(''); 
    const { phoneNumber } = useParams();

    const { login } = useAuth();
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

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

    const showSuccesMessage = (message) => {
        toast.success(message, {
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

    const handleApi = async () => {
        const url = BASE_API_ROUTE + `Auth/activateaccount`;
        const data = {
            "phoneNumber": phoneNumber,
            "code": ActivationCode,
        }
        try{
            const Response = await axios.post(url, data);            
        }
        catch (error) {
            showErrorMessage("فعالسازی حساب کاربری با خطا مواجه شد");
            console.log('error in activating account : ,',error);
        }
        try{
            const success = await login(phoneNumber, password);
            if(success === "success"){
                showSuccesMessage('حساب کاربری شما با موفقیت فعال شد.');
                await delay(5000);
                navigate('/');
            }
            else{
                showErrorMessage('ورود با خطا مواجه گردید.')
            }
        }
        catch (error) {
            showErrorMessage("ورود با خطا مواجه شد");
            console.log('error in loging in : ,',error);
        }
    };

    return (
    <>
    <Helmet>
        <title>Activation Acoount</title>
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
    backgroundImage:`url(${lawOnline})`,
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
                    <Typography sx={{ fontFamily:"shabnam", fontSize:"21px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>فعال کردن حساب کاربری</Typography>
                </Grid>
            </Slide>
            <Slide in={show} direction="left">
                <TextField
                label='رمز عبور'
                variant="outlined"
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>)
                }}
                inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                sx={{
                    mt: "20px",
                    width: {xs:'100%',sm:'80%'},
                    padding: 0,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    mb: '10px',
                    borderRadius:"5px",
                }}/>
            </Slide>
            <Slide in={show} direction="right">
                <TextField value={ActivationCode} onChange={(e) => setActivationCode(e.target.value)} id="outlined-basic" label="کد تایید" variant="outlined" dir="ltr"
                inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                sx={{
                    mb: "20px",
                    width: {xs:'100%',sm:'80%'},
                    padding: 0,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius:"5px",
                }}/>
            </Slide>
            <Slide in={show} direction="up">
                <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", m: 2, justifyContent:"center" }}>
                    <Button size={'large'} variant="contained" color="primary" sx={{fontsize:"18px",fontFamily:"shabnam"}} onClick={handleApi}>
                    فعالسازی حساب کاربری
                    </Button>
                </Grid>
            </Slide>
        </Grid>
    </Grid>
    </CacheProvider>
    </ThemeProvider>
    </>
    );
}

export default ActivationAccount;
