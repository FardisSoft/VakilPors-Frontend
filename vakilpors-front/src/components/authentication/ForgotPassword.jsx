import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
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

const ForgotPassword = () => {

    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    
    useEffect(() => {
        setShow(true);
    }, []);

    const showErrorMessage = () => {
        toast.error('شماره تلفن صحیح نمی باشد', {
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

    const showSuccesMessage = () => {
        toast.success('کد فراموشی رمز به شماره تماس شما ارسال شد', {
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
        const url = BASE_API_ROUTE + `Auth/forgetpassword?PhoneNumber=${phoneNumber.trim()}`;
        try{
            const response = await axios.get(url);
            showSuccesMessage();
            await delay(5000);
            navigate(`/Reset_Password/${phoneNumber}`);

        } catch (error) {
            showErrorMessage();
            console.log('error in forgot password : ',error);
        }
    };

    return (
        <>
        <Helmet>
            <title>Forgot Password</title>
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
                        <Typography sx={{ fontFamily:"shabnam", fontSize:"21px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>فراموشی رمز عبور</Typography>
                    </Grid>
                </Slide>
                <Slide in={show} direction="left">
                    <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} id="outlined-basic" label="شماره موبایل" variant="outlined" dir="ltr"
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
                <Slide in={show} direction="up">
                    <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", m: 2, justifyContent:"center" }}>
                        <Button size={'large'} variant="contained" color="primary" sx={{fontsize:"18px",fontFamily:"shabnam"}} onClick={handleApi}>
                            ارسال کد تایید
                        </Button>
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

export default ForgotPassword;