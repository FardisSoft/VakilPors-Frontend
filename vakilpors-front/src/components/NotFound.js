import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <>
    <Helmet>
      <title>404</title>
    </Helmet>
    <Grid> 
      <Typography>404</Typography>
      <br/>
      <Typography fontFamily={'shabnam'}>صفحه مورد نظر یافت نشد</Typography>
    </Grid>
    </>
  );
}

export default NotFound;
