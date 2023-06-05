import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Typography, Grid, TextField, Slide } from "@mui/material";
import { toast } from 'react-toastify';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { useParams } from "react-router-dom";
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

    const { phoneNumber } = useParams();
    const { isSMS } = useParams();
    
    const [verificationCode, setverificationCode] = useState(''); 
    const [newPassword, setnewPassword] = useState(''); 
    const [confirmPassword, setconfirmPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    useEffect(() => {
        setShow(true);
    }, []);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if( validateForm() )
            handleApi();
    };

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
    };

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
        const data = {
            "phoneNumber": phoneNumber,
            "email": phoneNumber,
            "code": verificationCode,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword,
            "usePhoneNumber": isSMS == 'true'
        }
        try{
            const Response = await axios.post(url, data);
            console.log("urlo bebeinnn :::");
            console.log(url);
            console.log("data ro bbin : ");
            console.log(data);

            showSuccesMessage();
            await delay(5000);
            navigate("/Login");
        }
        catch (error) {
            showErrorMessage("تغییر رمز عبور با خطا مواجه شد.");
            console.log('error in reseting password : ',error);
            console.log("urlo bebeinnn :::");
            console.log(url);
            console.log("data ro bbin : ");
            console.log(data);

        }
    };

    return (
        <>
        <Helmet>
            <title>تغییر رمز</title>
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
                        <Typography sx={{ fontFamily:"shabnam", fontSize:"21px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>تغییر رمز عبور</Typography>
                    </Grid>
                </Slide>
                <Slide in={show} direction="left">
                    <TextField value={verificationCode} onChange={(e) => setverificationCode(e.target.value)} id="outlined-basic" label="کد تایید" variant="outlined" dir="ltr"
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
                    label='رمز عبور جدید'
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
                    inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                    InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                    sx={{
                        mb: "10px",
                        width: {xs:'100%',sm:'80%'},
                        padding: 0,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderRadius:"5px",
                    }}/>
                </Slide>
                <Slide in={show} direction="left">
                    <TextField
                    label= 'تکرار رمز عبور جدید' 
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
                    inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                    InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
                    sx={{
                        mb: "20px",
                        width: {xs:'100%',sm:'80%'},
                        padding: 0,
                        backgroundColor:'rgba(255,255,255,0.5)', 
                        borderRadius:'5px', }}/>
                </Slide> 
                <Slide in={show} direction='up'> 
                    <Grid container direction={{xs:'column',sm:'row'}} 
                    sx={{ display: 'flex', m: 2, justifyContent:'center' }}> 
                        <Button size={'large'} variant='contained' color='primary' 
                        sx={{fontsize:'18px',fontFamily:"shabnam"}} onClick={handleSubmit}>
                        تغییر رمز عبور
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

export default ForgotPassword;