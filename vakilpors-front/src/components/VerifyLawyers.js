import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Grid, Avatar, Card, CardContent, CardHeader, CardMedia, Button } from "@mui/material";
import LinkMUI from '@mui/material/Link';
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import axios from 'axios';

const VerifyLawyers = () => {

  const [lawyers, setLawyers] = useState([]);

  const { getAccessToken } = useAuth();

  useEffect( () => {
    const getLawyers = async () => {
      const url = BASE_API_ROUTE + 'Lawyer/GetAll';
      try {
        const response = await axios.get(url);
        // console.log('response in getting lawyers : ',response);
        setLawyers(response.data.data);
      } catch (error) {
        console.log('error in getting lawyers : ',error);
      }
    };
    getLawyers();
  }, []);

  const handleVerify = async (lawyerId) => {
    
  };

  return (
    <>
    <Helmet>
      <title>تایید مدارک وکلا</title>
    </Helmet>
    <Grid container minHeight={'100vh'} direction='column'>
      <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card}>
          <CardHeader titleTypographyProps={{ mx:0, mb:0, mt:'20px', fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} 
          title={'لیست وکلای تایید نشده : '}/>
      </Grid>
      {lawyers.map( (lawyer,index) =>
        !lawyer.isAuthorized && 
        <Grid key={index} container direction={{ xs: 'column', sm: 'row' }} marginBottom={'20px'}>
          <Grid item component={Card}>
            <CardContent>
              <Grid container direction={{xs: 'row', sm: 'column'}} display='flex' justifyContent={'space-between'} alignItems={'center'}>
                <Avatar alt="lawyer profile" sx={{ width: 60, height: 60, mb: {xs:0,sm:'20px'}}} srcSet={lawyer.user.profileImageUrl} />
                <Button variant="contained" onClick={()=>handleVerify(lawyer.id)} sx={{fontFamily:"shabnam",maxHeight:'40px',mb: {xs:0,sm:'20px'}}}>
                  تایید مدارک
                </Button>
                <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                  <LinkMUI href={lawyer.resumeLink}>دانلود رزومه</LinkMUI>
                </Typography>
              </Grid>
            </CardContent>                    
          </Grid>
          <Grid container direction={'column'} item component={Card} sm>
            <CardContent>
              <Grid container direction={{xs: 'column', sm: 'row'}} display='flex' justifyContent={{xs:'flex-start',sm:'space-between'}} alignItems={{xs:'flex-start',sm:'space-between'}}>
                <Typography sx={{fontFamily:"shabnam"}}>{'نام : '+lawyer.user.name}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'عنوان : '+lawyer.title}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'شماره پرونده : '+lawyer.parvandeNo}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'شماره موبایل : '+lawyer.user.phoneNumber}</Typography>
              </Grid>
            </CardContent>
            <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ویزیت "/>
            <CardMedia image={lawyer.callingCardImageUrl || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 167, width: 300 }} title="کارت ویزیت"/>
            <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ملی "/>
            <CardMedia image={lawyer.callingCardImageUrl || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 167, width: 300, mb: '20px' }} title="کارت ملی"/>
          </Grid>
        </Grid>
      )}
    </Grid>
    </>
  );
};

export default VerifyLawyers;