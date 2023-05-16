import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import landing_page from './assests/images/default_lawyer_profile_background_picture.jpg';

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
  return (
    <>
      <Helmet>
        <title>Vakil Pors</title>
      </Helmet>
      <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
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
              چت عمومی
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </CacheProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
