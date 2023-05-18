import React, {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline, Clear } from '@mui/icons-material';
import { Grid, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function ResponseTransaction() {

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

  // useEffect(() => {
  //   const go = async () => {
  //     if(success) {
  //       showSuccesMessage('تراکنش موفق. در حال انتقال به کیف پول...');
  //       await delay(7000);
  //       navigate('/wallet');
  //     }
  //     if(!success) {
  //       showErrorMessage('تراکنش ناموفق. در حال انتقال به کیف پول...');
  //       await delay(7000);
  //       navigate('/wallet');
  //     }
  //   }
  //   go();
  // }, []);

  return (
    <>
      <Helmet>
        <title>نتیجه تراکنش</title>
      </Helmet>
      <Grid display={"flex"} flexDirection={"column"} margin={"auto"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgroundColor={'#ABC0C0'}>
        <Grid alignItems={"center"} margin={"auto"} height={"100%"} width={"60%"} flexDirection={'column'} borderRadius={"10px"} padding={"5px"} paddingTop={"5px"} paddingX={"5px"} paddingBottom={"5px"} display={"flex"} position={"relative"} m={"3%"} justifyContent={"center"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
          {success ? <CheckCircleOutline sx={{width:'50px',height:'50px',color:'#28a745'}}/> : <Clear sx={{width:'50px',height:'50px',color:'#dc3545'}}/> }
          <Typography sx={{margin: '20px 0',
                          color: '#333333',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontFamily: 'shabnam',}}>
            {success ? "تراکنش با موفقیت انجام شد!" : "تراکنش با خطا مواجه شد!"}
          </Typography>
          {success && 
          <Typography sx={{margin: '10px 0',
                          color: '#666666',
                          fontSize: '16px',
                          textAlign: 'center',
                          fontFamily: 'shabnam',}}>
            شماره پیگیری: {ReferenceId}
          </Typography>
          }
          <br></br>
          <Button variant="contained" onClick={()=>navigate('/wallet')}>
            <Typography fontFamily={'shabnam'}>کیف پول</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ResponseTransaction;