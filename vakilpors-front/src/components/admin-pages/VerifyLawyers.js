import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Typography,Box, Grid, Avatar, Card, CardContent, CardHeader, CardMedia, Button, Link } from "@mui/material";
import LinkMUI from '@mui/material/Link';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from '../../Constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FcMenu, FcNumericalSorting12 } from "react-icons/fc";
import StyledButton from '../ButtonComponent';
import { AiOutlineDownload, AiOutlineCheckCircle } from "react-icons/ai";
import UsersCard from "./UserCard";
import { UserStyle } from "./style";

const VerifyLawyers = () => {

  const [lawyers, setLawyers] = useState([]);
  const classes = UserStyle();


  const { refUserRole, getAccessToken } = useAuth();
  const navigate = useNavigate();


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
      getLawyers();
    }
  }, []);

  const handleVerify = async (lawyerId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + `Lawyer/VerifyLawyer?lawyerId=${lawyerId}`;
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in verifing lawyer : ',response);
        getLawyers();
        showSuccesMessage('مدارک وکیل مورد نظر با موفقیت تایید شد');
      } catch (error) {
        console.log('error in verifing lawyer : ',error);
        showErrorMessage('خطا در تایید مدارک وکیل');
      }
    }
  };

  const unverifiedLawyersCount = lawyers.filter(lawyer => !lawyer.isVerified).length;


  return (
    <>
    {/* <Helmet> */}
      <title>تایید مدارک وکلا</title>
    {/* </Helmet> */}
    <Grid container minHeight={'100vh'} direction='column'>
      <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item>
        <Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }} >
          <FcNumericalSorting12 size={25}/>
          لیست وکلای تایید نشده : 
        </Typography>

        <Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }}>
          {unverifiedLawyersCount}
        </Typography>


        </Grid>

        <Box className={classes.tabsContainer}>
        <Box>
            <Grid container spacing={2} alignItems="stretch">
              {lawyers.map((lawyer,index) => (
                !lawyer.isVerified && 
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <UsersCard
                    name={lawyer.user.name}
                    username={lawyer.title}
                    created_at={lawyer.user.phoneNumber}
                    image_code={lawyer.user.profileImageUrl}
                    device_id={lawyer.id}
                    parvande={lawyer.parvandeNo}
                    lawyers={lawyers}
                    resumeLink={lawyer.resumeLink}
                    callingCardImageUrl={lawyer.callingCardImageUrl}
                    nationalCardImageUrl={lawyer.nationalCardImageUrl}
                  />
                </Grid>
                


              ))}
            </Grid>
          
        </Box>
      </Box>



      </Grid>
 
    </>
  );
};

export default VerifyLawyers;