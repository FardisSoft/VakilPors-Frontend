import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useStateRef from 'react-usestateref';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import jwt from 'jwt-decode';
import { Grid, TextField, Button, Typography, Card, CardActions, CardContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const ShowCases = () => {

  const [Cases, setCases, refCases] = useStateRef([]);
  const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  const { isLawyer } = useParams();
  
  useEffect(() => {
    const GetCases = async () => {
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
          // console.log('response in getDocument : ',response);
        } catch (error) {
          console.log('error in getDocument : ',error);
        }
      }
    };
    GetCases();
  }, []);

  const card = (casei) => {
    return ( 
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontFamily: "shabnam", fontSize: 14 }} color="text.secondary" gutterBottom>
          {casei.title}
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="h5" component="div">
          {casei.caseName}
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1.5 }} color="text.secondary">
          {casei.documentCategory}
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="body2"> 
          حداقل بودجه :{casei.minimumBudget} تومان
          <br />
          حداکثر بودجه : {casei.maximumBudget} تومان
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=> navigate(`/new-case/edit_${casei.id}`)} sx={{fontFamily: "shabnam"}} size="small">ویرایش</Button>
      </CardActions>
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
      <Grid display={"flex"} flexDirection={"column"} margin={"auto"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgroundColor={'#ABC0C0'}>
        <Grid height={"100%"} width={"90%"} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"2%"} justifyContent={"right"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>        
          <Grid container direction={"row"}  sx={{ minWidth: 275 }}>
            {refCases.current && refCases.current.map((casei) => 
              <Card sx={{mx:"10px" ,height: "300px"}} variant="outlined">{card(casei)}</Card>
            )}
          </Grid>
          <Button onClick={ClickNewCase} sx={{fontFamily: "shabnam"}} variant="contained">افزودن پرونده</Button>
        </Grid>
      </Grid>
      </>
  );
}

export default ShowCases;