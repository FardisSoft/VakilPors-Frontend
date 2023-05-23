import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { Grid } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import { Helmet } from 'react-helmet-async';

const VerifyLawyers = () => {

  const { getAccessToken } = useAuth();

  useEffect( () => {
    const getLawyers = async () => {
      
    };
    getLawyers();
  }, []);

  return (
    <>
    <Helmet>
      <title>تایید مدارک وکلا</title>
    </Helmet>
    
    </>
  );
};

export default VerifyLawyers;