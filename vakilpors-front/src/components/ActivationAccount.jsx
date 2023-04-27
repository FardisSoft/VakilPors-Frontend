import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import '../css/login-page-main-style.css';
import '../css/login-page-util-style.css';
import { useAuth } from "../services/AuthProvider";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";



const ActivationAccount = () => {

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [ActivationCode, setActivationCode] = useState(''); 
    const { phoneNumber } = useParams();

    const navigate = useNavigate();
    
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

    const showSuccesMessage = () => {
        toast.success('رمز عبور با موفقیت تغییر کرد', {
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

    // const handleApi = async () => {

    //     const url = BASE_API_ROUTE + `Auth/activateaccount`;
    //     console.log(url);
    //     console.log(phoneNumber);

    //     const data = {
    //         "phoneNumber": phoneNumber,
    //         "code": ActivationCode,
    //       }



    //     try{
    //         const Response = await axios.post(url, data);
    //         showSuccesMessage();
    //         await delay(5000);
    //         navigate("/Login");

    //     }
    //     catch (error) {
    //          showErrorMessage("تغییر رمز عبور با خطا مواجه شد.");

    //          console.log(error);

    //     }


    //}


    return (
    <>
    <Helmet>
        <title>Activation Acoount</title>
    </Helmet>


    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
                <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>


                    <Typography sx={{ fontFamily: "shabnam", }}>فعال کردن حساب کاربری</Typography>

                    
                    <TextField value={ActivationCode} onChange={(e) => setActivationCode(e.target.value)} sx={{ mt: "50px", mb: "50px" }} id="outlined-basic" label="کد تایید" variant="outlined" dir="ltr" />


                    <Button variant="contained" disableElevation>
                        فعال کردن حساب کاربری
                    </Button>
                    <ToastContainer />

                </Grid>

    </Grid>


    </>
    );





}


export default ActivationAccount;
