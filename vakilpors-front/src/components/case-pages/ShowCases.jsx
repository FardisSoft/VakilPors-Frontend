import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStateRef from 'react-usestateref';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import jwt from 'jwt-decode';

 
const ShowCases = () => {


  const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  
  const { isLawyer } = useParams();

  const [Cases, setCases, refCases] = useStateRef('');


  
  useEffect(() => {
    const GetCases = async () => {
  
      const token = await getAccessToken();
      if(token){
        const tokenData = jwt(token);
        // console.log('isLawyer: ',isLawyer);
        const url = BASE_API_ROUTE + ( isLawyer == 'true' ? `Document/GetDocumentsThatLawyerHasAccessToByUserId` : `Document/GetDocumentsByUserId?userId=${tokenData.uid}`); 
        const Data = {
          "userId": tokenData.uid,
          "lawyerId": 0
        }

        // console.log('url: ',url);
        // console.log(Data);
        

        try {
          
          const response = await (isLawyer == 'true'? axios.post(url, Data, {headers: {Authorization: `Bearer ${token}`}}) : axios.get(url,{headers: {Authorization: `Bearer ${token}`}}));
          setCases(response.data.data);
          // console.log(refCases.current);
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

            </Grid>
        </Grid>    

        
        </>
    );
}



export default ShowCases;

