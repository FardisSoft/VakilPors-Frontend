import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Grid, Avatar, Card, CardContent, CardHeader } from "@mui/material";
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
        console.log('response in getting lawyers : ',response);
        setLawyers(response.data.data);
      } catch (error) {
        console.log('error in getting lawyers : ',error);
      }
    };
    getLawyers();
  }, []);

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
        <Grid key={index} container direction={{ xs: 'column', sm: 'row' }}>
          <Grid display="flex" alignItems={{xs:'center',sm:"flex-start"}} justifyContent={{xs:'center',sm:"flex-start"}} item component={Card}>
            <CardContent>
              <Avatar alt="lawyer profile" sx={{ width: 60, height: 60 }} srcSet={lawyer.user.profileImageUrl} />
            </CardContent>
          </Grid>
          <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card} sm>
            <CardContent>
              <Typography sx={{fontFamily:"shabnam"}}>{lawyer.user.name}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      )}
    </Grid>
    </>
  );
};

export default VerifyLawyers;