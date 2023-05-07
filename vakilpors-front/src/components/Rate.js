import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Rating, Avatar, TextField, Typography, Slide, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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

const Rate = () => {
  const [value, setValue] = useState(0.0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const { LawyerId } = useParams();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleRegister = () => {
    alert(`You have registered your comment and rate: ${comment}, ${value}`);
  };

  const handleCancel = () => {
    setValue(0);
    setComment("");
  };

  return (
    <>
    <Helmet>
      <title>Rate Page</title>
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
          backgroundColor: "#ABC0C0",}}>
        <Grid 
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 2,
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: '20px',
            width: {xs:'90%',sm:'70%'}}}>
          <Slide in={show} direction="right">
            <Avatar
              alt="User Name"
              src="https://i.pravatar.cc/150?img=1"
              sx={{ width: 60, height: 60 }}/>
          </Slide>
          <Slide in={show} direction="right">
            <Typography sx={{ fontFamily:"shabnam", fontSize:"20px", margin: 1 }}>فلانی</Typography>
          </Slide>
            <Slide in={show} direction="left">
              <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", alignItems: "center", justifyContent:"center", mb:'10px' }}>
                <Typography ml={'5px'} sx={{ fontSize: "13px", color: "#333", fontFamily: "shabnam" }}>
                  {value ? `${value} ستاره` : "چند ستاره می‌دهید؟"}
                </Typography>
                <Rating
                  precision={0.5}
                  name="rate-user"
                  dir='rtl'
                  value={value}
                  onChange={handleChange}
                  sx={{position:'relative', top:'3px'}}/>
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
              inputProps={{ dir: "rtl" }}
              InputLabelProps={{ align: "right", dir: "rtl" }}
              sx={{
                width: {xs:'100%',sm:'80%'},
                padding: 0,
                fontFamily:"shabnam",
                // ":focus-within":{padding:0},
              }}/>
            </Slide>
            <Slide in={show} direction="up">
              <Grid container direction={{xs:'column',sm:'row'}} sx={{ display: "flex", gap: 2, m: 2, justifyContent:"center" }}>
                <Button variant="contained" color="primary" sx={{fontFamily:"shabnam"}} onClick={handleRegister}>
                  ثبت نظر
                </Button>
                <Button variant="outlined" color="secondary" sx={{fontFamily:"shabnam"}} onClick={handleCancel}>
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