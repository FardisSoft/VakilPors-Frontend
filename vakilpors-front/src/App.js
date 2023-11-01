import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import landing_page from './assests/images/default_lawyer_profile_background_picture.jpg';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

// import { useCountUp } from 'react-countup';

import MKBox from "../src/components/landing/MKBox";
import MKTypography from "../src/components/landing/MKTypography";


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
  typography: {
    fontFamily: 'shabnam',
  },
});
// mui rtl

const App = () => {
  const navigate = useNavigate();

  // const lawyersCountUpProps = useCountUp({
  //   end: 100, // Replace with the actual number of lawyers
  //   duration: 2, // Duration in seconds
  // });

  // const casesCountUpProps = useCountUp({
  //   end: 500, // Replace with the actual number of successful cases
  //   duration: 2, // Duration in seconds
  // });

  // const experienceCountUpProps = useCountUp({
  //   end: 10, // Replace with the actual number of years of experience
  //   duration: 2, // Duration in seconds
  // });



  return (
    <>
      <Helmet>
        <title>وکیل پرس</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        
      <CacheProvider value={cacheRtl}>
{/* 
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${landing_page})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Material Kit 2 React{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Free & Open Source Web UI Kit built over ReactJS &amp; MUI. Join over 1.6 million
              developers around the world.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>  */}

       <Grid sx={{flexGrow: 1,height: '100vh',backgroundImage: `url(${landing_page})`,backgroundSize: 'cover',
                backgroundPosition: 'center',paddingTop:12,boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',}}>
      <Grid container justifyContent="start" alignItems="start">
        <Grid item xs={12} sm={8} md={6} sx={{mx: '10px',}}>
          <Typography variant="h2" align="center" sx={{mb:'30px',fontSize: {xs:'30px',sm:'50px'},color: '#fff',textShadow: '2px 2px #000',}}>
            از وکیل پرس بپرس!
          </Typography>
          <Typography variant="h5" align="center" sx={{mb:'30px',fontSize: {xs:'20px',sm:'30px'},color: '#fff',textShadow: '2px 2px #000',}}>
            گرفتن جواب سوال حقوقی و وکیل برای هر پرونده ای مثل آب خوردن!
          </Typography>
          <Grid align='center'>
            <Button variant="contained" size='large' color="primary" onClick={()=>navigate("/Lawyer-search-page")}>
              جست و جوی وکلا
            </Button>
            <Button variant="contained" sx={{ml:'20px'}} size='large' color="primary" onClick={()=>navigate("/Forum")}>
              فروم عمومی
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

{/* 
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card>
          <Typography variant="h4" align="center">
            {lawyersCountUpProps.countUp}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Number of Lawyers
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <Typography variant="h4" align="center">
            {casesCountUpProps.countUp}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Number of Successful Cases
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <Typography variant="h4" align="center">
            {experienceCountUpProps.countUp}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Years of Experience
          </Typography>
        </Card>
      </Grid>
    </Grid> */}






    </CacheProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
