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
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import  NewCase from "../case-pages/Newcase.css";
import { Classes } from "@mui/styles/mergeClasses/mergeClasses";
import { Paper } from "@mui/material";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import useStateRef from 'react-usestateref';
import ReactDOM from 'react-dom';
import { MuiFileInput } from 'mui-file-input'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import jwt from 'jwt-decode';


import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';



import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';



const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  
const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontFamily: "shabnam", fontSize: 14 }} color="text.secondary" gutterBottom>
          مشاوره تلفنی
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="h5" component="div">
          جدایی نادر از سیمین
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1.5 }} color="text.secondary">
          خانواده
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="body2">
            
          حداقل بودجه : 5 میلیون تومان
          <br />
          حداکثر بودجه : 10 میلیون تومان

        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{fontFamily: "shabnam"}} size="small">ویرایش</Button>
      </CardActions>
    </React.Fragment>
  );





const ShowCases = () => {


  const { getAccessToken } = useAuth();


  
  useEffect(() => {
    const GetCases = async () => {
  
      const token = await getAccessToken();
      if(token){
        const tokenData = jwt(token);
        const 
          url = BASE_API_ROUTE + `Document/GetDocumentsByUserId?userId=${tokenData.uid}`;

        try {
          const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
          console.log('response : ',response);
        } catch (error) {
            console.log('error : ',error);
        }
      }
    };
    GetCases();
  }, []);

  




    return(
        <>
        <Helmet>
            <title>پرونده های من</title>
        </Helmet>


        <Grid display={"flex"} flexDirection={"column"} margin={"auto"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgroundColor={'#ABC0C0'}>
            <Grid height={"100%"} width={"90%"} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"2%"} justifyContent={"right"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>
                      
                      
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>

    


            </Grid>
            
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
        </Grid>    

        
        </>
    );
}



export default ShowCases;

