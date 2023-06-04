import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Slide } from '@mui/material';
import lawOnline from '../../assests/images/law-online.jpg';
import _404styles from '../../css/404styles.css';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

    const navigate = useNavigate();

  return (
    <>
    <Helmet>
      <title>404</title>
    </Helmet>
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
        borderRadius: '20px',
            width: {xs:'90%',sm:'60%',md:'40%'}}}>
            <Slide in={show} direction="left">
                <Grid justifyContent={'center'}>
                <section class="error-container">
                    <span>4</span>
                    <span><span class="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                </Grid>
            </Slide>
            <Slide in={show} direction="right">
                <Grid justifyContent={'center'}>
                    <Typography sx={{ fontFamily:"shabnam", fontSize:"30px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(00,00,99)" }}>صفحه مورد نظر یافت نشد یا وجود ندارد</Typography>
                </Grid>
            </Slide>
            <Button variant="contained" sx={{ml:'20px', fontFamily:"Shabnam"}} size='large' color="primary" onClick={()=>navigate("/")}>رفتن به صفحه اصلی</Button>
        </Grid>
    </Grid>
    </>
  );
}
export default NotFound;
