import { makeStyles } from '@mui/styles';
import { CheckCircleOutline } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Clear } from '@mui/icons-material';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';


const useStyles = makeStyles({
  confirmationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  errorIcon: {
    fontSize: '100px',
    color: '#dc3545',
  },
  successIcon: {
    fontSize: '100px',
    color: '#28a745',
  },
  confirmationText: {
    margin: '20px 0',
    color: '#333333',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  referenceText: {
    margin: '10px 0',
    color: '#666666',
    fontSize: '16px',
    textAlign: 'center',
  },
});

function ResponseTransaction(props) {

  const classes = useStyles();
  let { amount, referenceId } = props;
  const queryParameters = new URLSearchParams(window.location.search)
  const ReferenceId = queryParameters.get("ReferenceId")
  const success = queryParameters.get("WasSuccessful")
  const { getAccessToken } = useAuth();


  const icon = success ? (
    <CheckCircleOutline className={classes.successIcon} />
  ) : (
    <Clear className={classes.errorIcon} />
  );

  const confirmationMessage = success
    ? "تراکنش با موفقیت انجام شد!"
    : "تراکنش با خطا مواجه شد!";


  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const showSuccesMessage = (successMessage) => {
    toast.success(successMessage, {
      position: "bottom-right",
      autoClose: 5000,
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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const navigate = useNavigate();

  const directTo = async () => {

    showSuccesMessage('بازگشت به صفحه اصلی...');
    await delay(5000);
    navigate('/PremiumPage');

  }

  return (
    <>
      <Helmet>
        <title>Redirect to premium page</title>
      </Helmet>

      <Grid display={"flex"} flexDirection={"column"} margin={"auto"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgroundColor={'#ABC0C0'}>
        <Grid alignItems={"center"} margin={"auto"} height={"100%"} width={"60%"} flexDirection={'column'} borderRadius={"10px"} padding={"5px"} paddingTop={"5px"} paddingX={"5px"} paddingBottom={"5px"} display={"flex"} position={"relative"} m={"3%"} justifyContent={"center"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
          <hr></hr>
          {icon}
          <div className={classes.confirmationText}>
            {confirmationMessage}
          </div>
          {success && (
            <div className={classes.referenceText}>
              شماره پیگیری: {ReferenceId} <br></br>
              ok ? {success}
            </div>

          )}
          <br></br>
          <button >
          <Link to="/PremiumPage">بازگشت به صفحه اصلی</Link>
          </button>
          <ToastContainer />

        </Grid>
      </Grid>
    </>
  );
}

export default ResponseTransaction;