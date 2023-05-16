import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useStateRef from 'react-usestateref';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import jwt from 'jwt-decode';
import { Box, Grid, Button, Typography, Card, CardActions, CardContent, IconButton, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DownloadForOfflineOutlined, } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HtmlTooltip = styled (({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: '15px',
    border: '1px solid #dadde9',
    fontFamily: 'shabnam',
  },
}));
 
const ShowCases = () => {

  const [Cases, setCases, refCases] = useStateRef([]);
  const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  const { isLawyer } = useParams();

  const getLawyersThatHaveAccessToDoc = async (docId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + `Document/GetLawyersThatHaveAccessToDocument?documentId=${docId}`;
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in getLawyersThatHaveAccessToDoc : ',response);
        return response.data.data;
      } catch (error) {
        console.log('error in getLawyersThatHaveAccessToDoc : ',error);
      }
    }
  };

  const getCases = async () => {
    const token = await getAccessToken();
    if(token){
      const tokenData = jwt(token);
      const url = BASE_API_ROUTE + ( isLawyer == 'true' ? `Document/GetDocumentsThatLawyerHasAccessToByUserId` : `Document/GetDocumentsByUserId?userId=${tokenData.uid}`); 
      const Data = {
        "userId": tokenData.uid,
        "lawyerId": 0
      }
      try {
        const response = await (isLawyer == 'true'? axios.post(url, Data, {headers: {Authorization: `Bearer ${token}`}}) : axios.get(url,{headers: {Authorization: `Bearer ${token}`}}));
        setCases(response.data.data);
        // response.data.data.map(async (casei) => {
        //   const lawyers = await getLawyersThatHaveAccessToDoc(casei.id);
        //   // setCases
        //   console.log(casei.id, lawyers);
        // });
        // console.log('response in getDocument : ',response);
      } catch (error) {
        console.log('error in getDocument : ',error);
      }
    }
  };
  
  useEffect(() => {
    getCases();
  }, []);

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
      rtl:true,
    });
  };
  const showSuccesMessage = (payam) => {
    toast.success(payam, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl:true,
    });
  };

  const handleChooseCase = async (docId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + 'Document/GrantAccessToLawyer';
      const data = {
        "lawyerId": isLawyer.split('_')[1], // or number
        "documentId": docId,
      }
      try {
        const response = await axios.post(url, data, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in GrantAccessToLawyer : ',response);
        showSuccesMessage('پرونده مورد نظر با موفقیت برای وکیل مورد نظر ارسال شد.');
      } catch (error) {
        console.log('error in GrantAccessToLawyer : ',error);
        showErrorMessage('خطا در ارسال پرونده');
      }
    }
  };

  const handleDeleteCase = async (docId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + `Document/DeleteDocument?documentId=${docId}`;
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in deleting case : ',response);
        getCases();
        showSuccesMessage('پرونده مورد نظر با موفقیت حذف شد.');
      } catch (error) {
        console.log('error in deleting case : ',error);
        showErrorMessage('خطا در حذف پرونده');
      }
    }
  };

  const showLawyersThatHaveAccessToDoc = (docId) => {
    return null;
  };

  const card = (casei) => {
    return ( 
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontFamily: "shabnam", fontSize: 14 }} color="text.secondary" gutterBottom>
          عنوان : {casei.title}
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1}} variant="h5" component="div">
          نام : {casei.caseName}
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1 }} color="text.secondary">
          گروه : {casei.documentCategory}
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1}} variant="body2"> 
          حداقل بودجه : {casei.minimumBudget} تومان
          <br />
          حداکثر بودجه : {casei.maximumBudget} تومان
        </Typography>
        <Grid item xs={12} sx={{overflow:'hidden', width: '200px'}}>
          <HtmlTooltip title={<React.Fragment>{casei.description}</React.Fragment>}>
            <Typography fontFamily="shabnam" fontSize="13px" sx={{whiteSpace: 'nowrap',marginBottom: 1,padding: '2px',borderRadius: '7px',textOverflow: 'ellipsis',overflow: 'hidden',}}>
              توضیحات : {casei.description}
            </Typography>
          </HtmlTooltip>
        </Grid>
        <Box backgroundColor={'lightblue'} borderRadius={2}>
          <IconButton size="small">
            <a href={casei.fileUrl == 'null' ? null : casei.fileUrl} download={'download'}>
              <DownloadForOfflineOutlined />
              <span style={{marginLeft:"10px",fontSize:'15px'}}>{'دانلود فایل'}</span>
            </a>
          </IconButton>
        </Box>
        {showLawyersThatHaveAccessToDoc(casei.id)}
      </CardContent>
      {isLawyer == 'false' && 
        <CardActions>
          <Button onClick={()=> navigate(`/new-case/edit_${casei.id}`)} sx={{fontFamily: "shabnam", mb:1}} size="small">ویرایش</Button>
          <Button onClick={()=>handleDeleteCase(casei.id)} sx={{fontFamily: "shabnam", mb:1}} size="small">حذف</Button>
        </CardActions>
      }
      {isLawyer.split('_')[0] == 'choose' && 
        <CardActions>
          <Button variant="contained" onClick={()=>handleChooseCase(casei.id)} sx={{fontFamily: "shabnam", mb:1, width:'100%'}} size="large">ارسال</Button>
        </CardActions>
      }
    </React.Fragment>
    );
  };
  
  const ClickNewCase = () => {
    navigate('/new-case/add');
  };

  return(
      <>
      <Helmet>
          <title>پرونده های من</title>
      </Helmet>
      <Grid display={"flex"} minHeight={'100vh'} alignItems={"center"} justifyContent={"center"} width={"100%"} backgroundColor={'#ABC0C0'}>
        <Grid container direction={{xs:'column',md:'row'}} height={"100%"} width={{xs:'100%',sm:"90%"}} borderRadius={"10px"} paddingY={"50px"} paddingX={{xs:'0px',sm:"10px",md:'50px'}} display={"flex"} m={"2%"} backgroundColor={'white'}>        
          <Grid item xs={12} lg={(isLawyer == 'false') ? 11 : 12}>
            <Grid container direction={"row"} justifyContent={"right"}>
              {refCases.current.length == 0 ? <Typography sx={{fontFamily: "shabnam", fontSize: 24 }}>{isLawyer == 'true' ? 'هنوز پرونده ای برای شما ارسال نشده است.' : 'شما هنوز پرونده‌ ای ایجاد نکرده اید.'}</Typography>
              : 
                refCases.current.map((casei) => 
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{m:"10px"}} variant="outlined">{card(casei)}</Card>
                </Grid>
                )
              }
            </Grid>
          </Grid>
          {isLawyer == 'false' &&
            <Grid item xs={12} lg={1} display={'flex'} alignItems={'center'} justifyContent={'center'} p={'10px'}>
              <Button onClick={ClickNewCase} sx={{width:'90%',height:'100%',fontFamily: "shabnam"}} variant="contained">افزودن پرونده</Button>
            </Grid>
          }
        </Grid>
      </Grid>
      </>
  );
}

export default ShowCases;