import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { useAuth } from "../../services/AuthProvider";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import '../../css/premium-page.css';
import { Link } from 'react-router-dom';


const PremiumPage = () => {

    const { ReferenceId } = useParams();
    const { isSuccess } = useParams();
    
    

  return (
    <>
    
    </>
  );
}

export default PremiumPage;