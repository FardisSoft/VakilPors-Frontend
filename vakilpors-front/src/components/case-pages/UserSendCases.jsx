import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { Typography, Grid, TextField } from "@mui/material";

const UserSendCases = () => {

  const [users, setUsers] = useState([]);
  const { LawyerId } = useParams();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      const url =  BASE_API_ROUTE + `Document/GetUsersThatLawyerHasAccessToTheirDocuments?lawyerId=${LawyerId}`;
      const token = await getAccessToken();
      try{
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        console.log("success in Getting users : ",response);
        // setUsers(response.data.data);
      }
      catch (error) {
        console.log("error in Getting users : ",error);
      }
    };
    getUsers();
  },[]);

  return (
    <>
    <Helmet>
      <title>کاربران ارسال کننده پرونده</title>
    </Helmet>
    <Grid>

    </Grid>
    </>
  );
}

export default UserSendCases;