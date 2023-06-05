import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Avatar, Card, CardContent, CardHeader, CardMedia, Button } from "@mui/material";
import LinkMUI from '@mui/material/Link';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from '../../Constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const HandleTransactions = () => {

  const [transactions, setTransactions] = useState([]);

  const { refUserRole, getAccessToken } = useAuth();
  const navigate = useNavigate();

  const getTransactions = async () => {
    if (refUserRole.current && refUserRole.current !== "Admin") {
      navigate('*');
    }
    const url = BASE_API_ROUTE + 'Wallet/GetWithdrawTransactions';
    try {
      const response = await axios.get(url);
      console.log('response in getting transactions : ',response);
      // setTransactions(response.data.data);
    } catch (error) {
      console.log('error in getting transactions : ',error);
    }
  };

  const showSuccesMessage = (successMessage) => {
    toast.success(successMessage, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const showErrorMessage = (errorMessage) => {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  useEffect( () => {
    getTransactions();
  }, []);

  const handlePayment = async (transactionId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + `Wallet/PayWithdraw?transactionId=${transactionId}`;
      try {
        const response = await axios.post(url, '', {headers: {Authorization: `Bearer ${token}`}});
        console.log('response in PayWithdraw : ',response);
        getTransactions();
        showSuccesMessage('تایید پرداخت تراکنش با موفقیت انجام شد.');
      } catch (error) {
        console.log('error in PayWithdraw : ',error);
        showErrorMessage('خطا در تایید پرداخت تراکنش');
      }
    }
  };

  return (
    <>
    <Helmet>
      <title>تراکنش های مالی</title>
    </Helmet>
    <Grid container minHeight={'100vh'} direction='column'>
      <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card}>
          <CardHeader titleTypographyProps={{ mx:0, mb:0, mt:'20px', fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} 
          title={'لیست درخواست های برداشت از حساب وکلا (درخواست های پرداخت نشده) : '}/>
      </Grid>
      {transactions.map( (transaction,index) =>
        !transaction.isVerified && 
        <Grid key={index} container direction={{ xs: 'column', sm: 'row' }} marginBottom={'20px'}>
          <Grid item component={Card}>
            <CardContent>
              <Grid container direction={{xs: 'row', sm: 'column'}} display='flex' justifyContent={'space-between'} alignItems={'center'}>
                <Avatar alt="transaction profile" sx={{ width: 60, height: 60, mb: {xs:0,sm:'20px'}}} srcSet={transaction.user.profileImageUrl} />
                <Button variant="contained" onClick={()=>handleVerify(transaction.id)} sx={{fontFamily:"shabnam",maxHeight:'40px',mb: {xs:0,sm:'20px'}}}>
                  تایید مدارک
                </Button>
                <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                  <LinkMUI href={transaction.resumeLink}>دانلود رزومه</LinkMUI>
                </Typography>
              </Grid>
            </CardContent>                    
          </Grid>
          <Grid container direction={'column'} item component={Card} sm>
            <CardContent>
              <Grid container direction={{xs: 'column', sm: 'row'}} display='flex' justifyContent={{xs:'flex-start',sm:'space-between'}} alignItems={{xs:'flex-start',sm:'space-between'}}>
                <Typography sx={{fontFamily:"shabnam"}}>{'نام : '+transaction.user.name}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'عنوان : '+transaction.title}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'شماره پرونده : '+transaction.parvandeNo}</Typography>
                <Typography sx={{fontFamily:"shabnam"}}>{'شماره موبایل : '+transaction.user.phoneNumber}</Typography>
              </Grid>
            </CardContent>
            <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ویزیت "/>
            <CardMedia image={transaction.callingCardImageUrl || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 167, width: 300 }} title="کارت ویزیت"/>
            <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ملی "/>
            <CardMedia image={transaction.nationalCardImageUrl || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 167, width: 300, mb: '20px' }} title="کارت ملی"/>
          </Grid>
        </Grid>
      )}
    </Grid>
    </>
  );
};

export default HandleTransactions;