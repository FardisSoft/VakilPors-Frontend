import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Slide } from '@mui/material';
import lawOnline from '../assests/images/law-online.jpg';

const NotFound = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

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
        backgroundColor: "white",
        borderRadius: '20px',
            width: {xs:'90%',sm:'60%',md:'40%'}}}>
            <Slide in={show} direction="left">
                <Grid justifyContent={'center'}>
                    <Typography sx={{ fontFamily:"shabnam", fontSize:"40px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>404</Typography>
                </Grid>
            </Slide>
            <Slide in={show} direction="right">
                <Grid justifyContent={'center'}>
                    <Typography sx={{ fontFamily:"shabnam", fontSize:"21px", fontWeight:"bold", align:"center",mb:"10px",color:"rgb(25,117,210)" }}>صفحه مورد نظر یافت نشد</Typography>
                </Grid>
            </Slide>
        </Grid>
    </Grid>
    </>
  );
}

export default NotFound;
