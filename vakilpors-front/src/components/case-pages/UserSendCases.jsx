import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { Typography, Grid, TextField, Avatar, Card, CardContent } from "@mui/material";

const UserSendCases = () => {

  const [users, setUsers] = useState([]);
  const { LawyerId } = useParams();
  const { getAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const url =  BASE_API_ROUTE + `Document/GetUsersThatLawyerHasAccessToTheirDocuments?lawyerId=${LawyerId}`;
      const token = await getAccessToken();
      try{
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        console.log("success in Getting users : ",response);
        setUsers(response.data.data);
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
    <Grid container display={'flex'} minHeight={'100vh'}>
      {users.map( (user,index) =>
        <Grid key={index} container direction={{ xs: 'column', sm: 'row' }}>
          <Grid onClick={() => navigate(`/show-cases/true_${user.id}`)} display="flex" alignItems={{xs:'center',sm:"flex-start"}} justifyContent={{xs:'center',sm:"flex-start"}} item component={Card} sx={{cursor:'pointer'}}>
            <CardContent>
              <Avatar alt="user profile" sx={{ width: 60, height: 60 }} srcSet={user.profileImageUrl} />
              <Typography sx={{fontFamily:"shabnam"}}>{user.name}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      )}
    </Grid>
    </>
  );
}

export default UserSendCases;