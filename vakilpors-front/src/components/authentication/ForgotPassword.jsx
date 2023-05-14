import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";

const ForgotPassword = () => {

    const [phoneNumber, setPhoneNumber] = useState(''); 
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    
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
            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
                <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
                    <Typography sx={{ fontFamily: "shabnam", }}>فراموشی رمز عبور</Typography>
                    <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ mt: "50px", mb: "50px" }} id="outlined-basic" label="شماره موبایل" variant="outlined" dir="ltr" />
                    <Button onClick={handleApi} variant="contained" disableElevation>
                        ارسال کد تایید
                    </Button>
                    <ToastContainer />
                </Grid>
            </Grid>
        </>
    );
}

export default ForgotPassword;