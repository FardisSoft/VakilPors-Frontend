import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardHeader, Button } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from '../../Constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import Moment from 'moment-jalaali';

const HandleTransactions = () => {

  const [transactions, setTransactions] = useState([]);

  const { refUserRole, getAccessToken } = useAuth();
  const navigate = useNavigate();

  const getTransactions = async () => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + 'Wallet/GetWithdrawTransactions';
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in getting transactions : ',response);
        setTransactions(response.data.data);
      } catch (error) {
        console.log('error in getting transactions : ',error);
      }
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
    if (refUserRole.current && refUserRole.current !== "Admin") {
      navigate('*');
    }
    else{
      getTransactions();
    }
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
    <Grid minHeight={'100vh'} width={'100%'} display="flex" justifyContent={'center'}>
      <Grid container width={{xs:'100%',md:'70%'}} direction='column' display="flex" alignItems={'center'}>
        <Grid item component={Card} marginBottom={'20px'}>
            <CardHeader titleTypographyProps={{ mx:0, mb:0, mt:'20px', fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} 
            title={'لیست درخواست های برداشت از حساب وکلا (درخواست های پرداخت نشده) : '}/>
        </Grid>
        {transactions.map( (transaction,index) =>
          (transaction.isWithdraw && !transaction.isPaid) && 
          <Grid key={index} container direction={{ xs: 'column', sm: 'row' }} marginBottom={'20px'}>
            <Grid item component={Card} sm>
              <CardContent>
                <Grid container direction={{xs: 'column', sm: 'row'}} display='flex' justifyContent={{xs:'flex-start',sm:'space-between'}} alignItems={{xs:'flex-start',sm:'space-between'}}>
                  <Typography sx={{fontFamily:"shabnam"}}>{'مبلغ : '+transaction.amount}</Typography>
                  <Typography sx={{fontFamily:"shabnam"}}>{'شماره کارت : '+transaction.description.replace('برداشت از کیف پول، شماره کارت:','')}</Typography>
                  <Typography sx={{fontFamily:"shabnam"}}>{'تاریخ ' + Moment(transaction.date).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(transaction.date).format('HH:mm')}</Typography>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item component={Card}>
              <CardContent>
                <Button variant="contained" onClick={()=>handlePayment(transaction.id)} sx={{fontFamily:"shabnam",maxHeight:'40px'}}>
                  پرداخت شد
                </Button>
              </CardContent>                    
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
    </>
  );
};

export default HandleTransactions;