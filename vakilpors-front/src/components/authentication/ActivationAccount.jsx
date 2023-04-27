import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import Login from "./Login";
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";




const ActivationAccount = () => {


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


    const { login } = useAuth();
    //const [password, setPassword] = useState("");

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [ActivationCode, setActivationCode] = useState(''); 
    const [password, setPassword] = useState(''); 
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
        toast.success('حساب کاربری شما با موفقیت فعال شد.', {
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
         console.log(url);
         console.log(phoneNumber);
         console.log(ActivationCode);

         const data = {
             "phoneNumber": phoneNumber,
             "code": ActivationCode,
           }

         try{
             const Response = await axios.post(url, data);
             
             console.log(ActivationCode);
             console.log(phoneNumber);
             console.log(password);

             const success = await login({ "phoneNumber": phoneNumber, "password": password});
             
             console.log(phoneNumber);
             //const success = "success";
             if(success === "success"){
                console.log("oke va oke mesle gole");
                showSuccesMessage();
                await delay(5000);
                navigate('/');
             }
             else{
                //setErrorColor("red");
                //setErrorMessage("ورود با خطا مواجه شد.");
                showErrorMessage('ورود با خطا مواجه گردید.')
             }
            
         }
         catch (error) {
              showErrorMessage("فعالسازی حساب کاربری با خطا مواجه شد");

              console.log(error);

         }

     }


    return (
    <>
    <Helmet>
        <title>Activation Acoount</title>
    </Helmet>


    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
                <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
                    <Typography sx={{ fontFamily: "shabnam", }}>فعال کردن حساب کاربری</Typography>
                    
                    <TextField
                        label='رمز عبور'
                        dir="ltr"
                        sx={{ mb: "30px" , mt: "30px"}}
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
                            </InputAdornment>
                            )
                        }}
                        />




                    <TextField value={ActivationCode} onChange={(e) => setActivationCode(e.target.value)} sx={{ mb: "50px" }} id="outlined-basic" label="کد تایید" variant="outlined" dir="ltr" />
                    

                    
                    <Button onClick={handleApi} variant="contained" disableElevation>
                       فعالسازی حساب کاربری
                    </Button>
                    <ToastContainer />

                </Grid>

    </Grid>


    </>
    );





}


export default ActivationAccount;
