import React, {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { CheckCircleOutline, Clear } from '@mui/icons-material';
import { Grid, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

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

function ResponseTransaction() {

  const classes = useStyles();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const ReferenceId = queryParameters.get("ReferenceId");
  const success = queryParameters.get("WasSuccessful");

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const showSuccesMessage = (successMessage) => {
    toast.success(successMessage, {
      position: "bottom-right",
      autoClose: 7000,
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
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  useEffect(() => {
    const handleThisPage = async () => {
      const show = () => {
        success ? showSuccesMessage('تراکنش موفق. در حال انتقال به کیف پول...')
        : showErrorMessage('تراکنش ناموفق. در حال انتقال به کیف پول...');
      }
      const go = async () => {
        if(success) {
          await delay(7000);
          navigate('/wallet');
        }
        if(!success) {
          await delay(7000);
          navigate('/wallet');
        }
      };
      show();
      await delay(100);
      await go();
    };
    handleThisPage();
  }, []);

  const icon = success ? (
    <CheckCircleOutline className={classes.successIcon} />
  ) : (
    <Clear className={classes.errorIcon} />
  );

  const confirmationMessage = success ? "تراکنش با موفقیت انجام شد!" : "تراکنش با خطا مواجه شد!";

  return (
    <>
      <Helmet>
        <title>نتیجه تراکنش</title>
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
          <Button onClick={()=>navigate('/wallet')}>
            <Typography fontFamily={'shabnam'}>کیف پول</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ResponseTransaction;