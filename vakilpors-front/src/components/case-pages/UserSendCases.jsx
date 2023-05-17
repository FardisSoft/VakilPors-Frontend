import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { Typography, Grid, Avatar, Card, CardContent, CardHeader } from "@mui/material";

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
        // console.log("success in Getting users : ",response);
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
    <Grid container minHeight={'100vh'} direction='column'>
      <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card}>
          <CardHeader titleTypographyProps={{ mx:0, mb:0, mt:'20px', fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} 
          title={users.length == 0 ? 'هنوز پرونده ای برای شما ارسال نشده است.' : "کاربرانی که برای شما پرونده ارسال کرده اند:"}/>
      </Grid>
      {users.map( (user,index) =>
        <Grid key={index} container direction={{ xs: 'column', sm: 'row' }}>
          <Grid display="flex" alignItems={{xs:'center',sm:"flex-start"}} justifyContent={{xs:'center',sm:"flex-start"}} item component={Card}>
            <CardContent>
              <Avatar alt="user profile" sx={{ width: 60, height: 60 }} srcSet={user.profileImageUrl} />
            </CardContent>
          </Grid>
          <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card} sm>
            <CardContent>
              <Typography sx={{fontFamily:"shabnam"}}>{user.name}</Typography>
              <Typography onClick={() => navigate(`/show-cases/true_${user.id}_${LawyerId}`)} sx={{fontFamily:"shabnam", fontSize:'14px', color:'blue', cursor:'pointer'}}>مشاهده پرونده ها</Typography>
            </CardContent>
          </Grid>
        </Grid>
      )}
    </Grid>
    </> 
  );
}

export default UserSendCases;