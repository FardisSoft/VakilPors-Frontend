import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import { useParams } from 'react-router-dom';


const PremiumPage = () => {

    //const { ReferenceId } = useParams();
    //const { isSuccess } = useParams();
    
    

  return (
    <>
    <Helmet>
      <title>Redirect to premium page</title>
    </Helmet>

    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
      <Grid flexDirection={'column'} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"10%"} justifyContent={"center"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
          <Typography sx={{ fontFamily: "shabnam", }}>در حال انتقال به صفحه اصلی ... </Typography>
            <hr></hr>


      </Grid>

    </Grid>
    

    
    </>
  );
}

export default PremiumPage;