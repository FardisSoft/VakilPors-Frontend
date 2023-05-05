import React, { useState } from "react";
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

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';





const AddNewCase = () => {


    return(
        <>
        <Helmet>
            <title>پرونده های من</title>
        </Helmet>
        
        
        
        </>
    );
}




