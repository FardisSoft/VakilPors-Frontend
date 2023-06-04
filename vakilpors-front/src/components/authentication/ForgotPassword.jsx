import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { Grid, Slide, TextField, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { toast } from 'react-toastify';
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
    const [isSMS, setisSMS] = useState('');
    
    const [forgotType, setForgotType] = useState('phone'); // 'phone' or 'email'
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        setShow(true);
    }, []);

    const showErrorMessage = () => {
        toast.error('شماره تلفن یا ایمیل صحیح نمی باشد', {
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
        toast.success(`کد فراموشی رمز به ${forgotType === 'phone' ? 'شماره موبایل' : 'ایمیل'} شما ارسال شد`, {
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
        try {
            let url = BASE_API_ROUTE + 'Auth/forgetpassword?';
            if (forgotType === 'phone') {
                url += `PhoneNumber=${phoneNumber.trim()}&useSms=true`;
                setisSMS(true);
            } else {
                url += `Email=${encodeURIComponent(phoneNumber.trim())}&useSms=false`;
                setisSMS(false);
            }
            console.log("url: ",url);
            const response = await axios.get(url);
            showSuccesMessage();
            await delay(5000);
            navigate(`/Reset_Password/${encodeURIComponent(phoneNumber)}/${isSMS ? "true" : "false"}`);
        } catch (error) {
            showErrorMessage();
            console.log('error in forgot password : ',error);
        }
    };

    return (
        <>
        <Helmet>
            <title>فراموشی رمز</title>
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
                    <ToggleButtonGroup
                        value={forgotType}
                        exclusive
                        onChange={(event,option) => {
                            setForgotType(option);
                        }}
                        aria-label="forgot password type"
                        sx={{ margin: '10px 0' }}
                    >
                        <ToggleButton sx={{ fontFamily:"shabnam", fontSize:'17px' }} value="phone" aria-label="phone forgot password">
                            با شماره تلفن همراه
                        </ToggleButton>
                        <ToggleButton sx={{ fontFamily:"shabnam", fontSize:'17px' }} value="email" aria-label="email forgot password">
                            با ایمیل
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Slide>
                <Slide in={show} direction="right">
                    <TextField
                        label={forgotType === 'phone' ? 'شماره تلفن همراه' : 'ایمیل'}
                        variant="outlined"
                        type={forgotType === 'phone' ? 'tel' : 'email'}
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        dir="rtl"
                        inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                        InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                        sx={{
                            width: {xs:'100%',sm:'80%'},
                            padding: 0,
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            margin: '10px 0',
                            borderRadius:"5px",
                        }}
                    />
                </Slide>
                <Slide in={show} direction="up">
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: "rgb(25,117,210)", color: "white", margin: '10px 0', fontFamily:"shabnam"}}
                        onClick={handleApi}
                    >
                        درخواست کد فراموشی
                    </Button>
                </Slide>
            </Grid>
        </Grid>
        </CacheProvider>
        </ThemeProvider>
        </>
    );
};

export default ForgotPassword;