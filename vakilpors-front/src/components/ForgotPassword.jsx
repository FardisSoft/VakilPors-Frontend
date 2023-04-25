import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import '../css/login-page-main-style.css';
import '../css/login-page-util-style.css';
import { FaEye } from 'react-icons/fa';
import showPwdImg from '../assests/images/show-password.svg';
import hidePwdImg from '../assests/images/hide-password.svg';
import { useAuth } from "../services/AuthProvider";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";


const ForgotPassword = () => {

    return (
        <>
        <Helmet>
            <title>Forgot Password</title>
        </Helmet>
        

        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor = {'#ABC0C0'}>
            <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} xs={4} spacing={5} alignSelf={"center"} backgroundColor = {'white'}>


            <Typography sx={{fontFamily:"shabnam" ,}}>فراموشی رمز عبور</Typography>
     

            <TextField sx={{mt:"50px", mb:"50px"}} id="outlined-basic" label="شماره موبایل" variant="outlined" dir="ltr"/>


            <br></br>
            <br></br>
            <br></br>

            <Button variant="contained" disableElevation>
                ارسال کد تایید
            </Button>

            </Grid>
            
        </Grid>
        
        

        </>
    );

}


export default ForgotPassword;
