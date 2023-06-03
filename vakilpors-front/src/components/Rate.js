import React, { useState, useEffect } from 'react';
import { Grid, Rating, Avatar, TextField, Typography, Slide, Button } from '@mui/material';
import { Card, CardContent } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import smilinglawyer from '../assests/images/lawyer_smiler.jpg';
import { toast } from 'react-toastify';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
});
// mui rtl

const showSuccesMessage = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    rtl:true,
  });
};

const Rate = () => {
  const [value, setValue] = useState(0.0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [isFirstRate, setIsFirstRate] = useState(false);

  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState();
  const [profileBackgroundPicture, setProfileBackgroundPicture] = useState();

  const { LawyerId } = useParams();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    setShow(true);
    const getLawyerData = async () => {
      const url = BASE_API_ROUTE + `Lawyer/GetLawyerById?lawyerId=${LawyerId}`;
      try {
        const response = await axios.get(url);
        setName(response.data.data.user.name);
        setProfileBackgroundPicture(response.data.data.profileBackgroundPictureUrl);
        setProfilePicture(response.data.data.user.profileImageUrl);
      } catch (error) {
        console.log('error in getting lawyer data : ',error);
      }
    };
    const getRateData = async () => {
      const url = BASE_API_ROUTE + `Rate/GetRate?laywer_id=${LawyerId}`;
      const token = await getAccessToken();
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in getting rate data : ',response);
        setValue(response.data.rateNum);
        setComment(response.data.comment);
      } catch (error) {
        if(error.response.data == 'Not found!!'){
          setIsFirstRate(true);
        }
        console.log('error in getting rate data : ',error);
      }
    };
    getLawyerData();
    getRateData();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleRegister = async () => {
    if(comment.trim() == '')
      return;
    const url = BASE_API_ROUTE + (isFirstRate ? `Rate/AddRate?laywer_id=${LawyerId}` : `Rate/UpdateRate?laywer_id=${LawyerId}`);
    const token = await getAccessToken();
    const data = {
      "id": 0,
      "comment": comment,
      "rateNum": Number(value)
    };
    try {
      const response = await (isFirstRate ? axios.post(url, data, {headers: {Authorization: `Bearer ${token}`}})
        : axios.put(url, data, {headers: {Authorization: `Bearer ${token}`}}));
      // console.log('response in adding/updating rate : ',response);
      setIsFirstRate(false);
      showSuccesMessage('نظر شما ثبت شد');
    } catch (error) {
      console.log('error in adding/updating rate : ',error);
    }
  };

  const handleCancel = () => {
    setValue(0);
    setComment("");
  };

  return (
    <>
    <Helmet>
      <title>نظر</title>
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
          // backgroundColor: "#ABC0C0",
          backgroundImage:`url(${smilinglawyer})`,
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
            // backgroundColor: "transparent",
            borderRadius: '20px',
            width: {xs:'90%',sm:'70%'}}}>
          <Slide in={show} direction="right">
            <Grid container width={{xs:'100%',sm:'80%'}} alignItems="stretch">
              <Grid sx={{backgroundColor:'rgba(0,0,0,0)',backgroundImage:`url(${profileBackgroundPicture})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} display="flex" alignItems="center" justifyContent="center" item component={Card} xs>
                <CardContent>
                  <Avatar alt={name} sx={{ width: 80, height: 80 }} src={profilePicture} />
                </CardContent>
              </Grid>
            </Grid>
          </Slide>
          <Slide in={show} direction="right">
            <Grid width={{xs:'100%',sm:'80%'}} sx={{display: "flex", alignItems: "center", justifyContent:"center",backgroundColor: 'rgba(255,255,255,0.5)',}}>
              <Typography sx={{ color:"black", fontFamily:"shabnam", fontSize:"23px", margin: 1 }}>{name}</Typography>
            </Grid>
          </Slide>
          <Slide in={show} direction="left">
            <Grid container width={{xs:'100%',sm:'80%'}} direction={{xs:'column',sm:'row'}} sx={{ display: "flex", alignItems: "center", justifyContent:"center", pb:'10px',backgroundColor: 'rgba(255,255,255,0.5)', }}>
              <Typography ml={'5px'} sx={{  color:"black", fontSize: "18px", color: "#333", fontFamily: "shabnam" }}>
                {value ? `${value} ستاره` : "چند ستاره می‌دهید؟"}
              </Typography>
              <Rating
                size='large'
                precision={0.5}
                name="rate-user"
                dir='rtl'
                value={value}
                onChange={handleChange}
                sx={{position:'relative', top:'6px'}}/>
            </Grid>
          </Slide>
          <Slide in={show} direction="up">
            <TextField
            id="comment"
            label="نظر خود را بنویسید"
            multiline
            rows={5}
            value={comment}
            onChange={handleComment}
            variant="outlined"
            inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",
            // color: "rgb(25,117,210)",
            color:"black",
           } }}
            InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px", color:"black", } }}
            sx={{
              width: {xs:'100%',sm:'80%'},
              padding: 1,
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: '0 0 7px 7px',
              // ":focus-within":{padding:0},
            }}/>
          </Slide>
          <Slide in={show} direction="up">
            <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", gap: 2, m: 2, justifyContent:"center" }}>
              <Button size={'large'} variant="contained" color="primary" sx={{fontsize:"18px",fontFamily:"shabnam"}} onClick={handleRegister}>
                {isFirstRate? 'ثبت نظر' : 'ویرایش نظر' }
              </Button>
              <Button size={'large'} variant="outlined" color="secondary" sx={{fontsize:"18px",fontFamily:"shabnam"}} onClick={handleCancel}>
                انصراف
              </Button>
            </Grid>
          </Slide>
        </Grid>
      </Grid>
    </CacheProvider>
    </ThemeProvider>
    </>
  );
};

export default Rate;