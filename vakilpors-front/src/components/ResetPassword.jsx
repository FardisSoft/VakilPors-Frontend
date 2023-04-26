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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../Constants";
import axios from "axios";
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { useParams } from "react-router-dom";



const ForgotPassword = () => {

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );



    const { phoneNumber } = useParams();
    const navigate = useNavigate();

    const [verificationCode, setverificationCode] = useState(''); 

    const [newPassword, setnewPassword] = useState(''); 
    const [confirmPassword, setconfirmPassword] = useState(''); 


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


    const handleSubmit = (event) => {
    
        event.preventDefault()
        if( validateForm() )
            handleApi();
          

    }



    const validateForm = () => {

        if(!(newPassword.length < 31 && newPassword.length > 5 && /^[A-Za-z0-9]*$/.test(newPassword) &&  /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword))){ 
            showErrorMessage("رمز خود را به صورت صحیح وارد کنید ( رمز شما باید بین 6 تا 30 کاراکتر باشد، فقط از اعداد و حروف انگلیسی تشکیل شده باشد و حداقل شامل یک حرف بزرگ و حداقل یک حرف کوچک باشد)");
            return false;
        }
        if(newPassword !== confirmPassword){
            showErrorMessage("رمز با تکرار رمز مطابقت ندارد");
            return false;
        }
        return true;




    }



    
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




    const handleApi = async () => {

        const url = BASE_API_ROUTE + `Auth/resetpassword`;
        console.log(url);
        console.log(phoneNumber);

        const data = {
            "phoneNumber": phoneNumber,
            "code": verificationCode,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
          }



        try{
            const Response = await axios.post(url, data);
            showSuccesMessage();
            await delay(5000);
            navigate("/Login");

        }
        catch (error) {
             showErrorMessage("تغییر رمز عبور با خطا مواجه شد.");

             console.log(error);
             
        }


    }

    
        

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>


            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
                <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>


                    <Typography sx={{ fontFamily: "shabnam", }}>تغییر رمز عبور</Typography>


                    <TextField value={verificationCode} onChange={(e) => setverificationCode(e.target.value)} sx={{ mt: "50px", mb: "30px" }} id="outlined-basic" label="کد تایید" variant="outlined" dir="ltr" />



                    <TextField
                        label='رمز عبور جدید'
                        dir="ltr"
                        sx={{ mb: "30px" }}
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={(e) => setnewPassword(e.target.value)}
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
                            </InputAdornment>
                            )
                        }}
                        />


                    <TextField
                        label= 'تکرار رمز عبور جدید' 
                        dir="ltr"
                        sx={{ mb: "30px" }}
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={(e) => setconfirmPassword(e.target.value)}
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
                            </InputAdornment>
                            )
                        }}
                        />




                    <Button onClick={handleSubmit} variant="contained" disableElevation>
                       تغییر رمز عبور
                    </Button>
                    <ToastContainer />



                </Grid>

            </Grid>



        </>
    );

}


export default ForgotPassword;
