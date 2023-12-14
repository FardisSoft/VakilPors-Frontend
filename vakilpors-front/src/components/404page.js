import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Slide } from '@mui/material';
import lawOnline from '../assests/images/law-online.jpg';
import _404styles from '../css/404styles.css';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import StyledButton from './ButtonComponent';
import Lottie from 'react-lottie';
import animationData from "../assests/lotttie-animations/Animation-404-3.json";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const NotFound = () => {

    const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

    const navigate = useNavigate();

  return (
    <>

    <Grid container 
    sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundPosition:'center',
        }}>
        <Grid 
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
        padding: 2,
        borderRadius: '20px',
            width: {xs:'90%',sm:'60%',md:'40%'}}}>
            <Slide in={show} direction="left">
                <Grid justifyContent={'center'}>
                <Lottie options={defaultOptions}
                  height={400}
                  width={400}
                  />
                </Grid>
            </Slide>
            <Slide in={show} direction="right">
                <Grid justifyContent={'center'}>
                    <Typography sx={{ fontFamily:"shabnam", fontSize:"30px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(00,00,99)" }}>صفحه مورد نظر یافت نشد یا وجود ندارد...</Typography>
                </Grid>
            </Slide>
            <StyledButton  style={{marginLeft:'20px', fontFamily:"Shabnam"}} onClick={()=>navigate("/")}>
              رفتن به صفحه اصلی
              </StyledButton>
        </Grid>
    </Grid>
    </>
  );
}
export default NotFound;
