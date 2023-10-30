import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_ROUTE } from "../../Constants";
import { Avatar, Rating, Typography, Chip } from "@mui/material";
import { Stack, Grid } from "@mui/material";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import LinkMUI from "@mui/material/Link";
import { useAuth } from "../../context/AuthProvider";
import jwt from 'jwt-decode';
import { useParams } from "react-router-dom";

const Comment = () => {
  const [ratesList, setRatesList] = useState([]);
  const { getAccessToken, refUserRole } = useAuth();
  const [ watcherUserId, setWatcherUserId] = useState();
  const { LawyerId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        setWatcherUserId(jwt(token).uid);
        const urlRate =
          BASE_API_ROUTE +
          `Rate/GetRatesPaged?lawyerId=${LawyerId}&PageNumber=2&PageSize=5`;
        try {
          const responseRate = await axios.get(urlRate, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log('response in getting laywer rates : ',responseRate);
          setRatesList(responseRate.data.results);
          console.log(responseRate.data.results);
          console.log(LawyerId);
          // console.log('salam')
          // console.log(ratesList)
          // calculateRateAverage(responseRate.data.results);
        } catch (error) {
          if (error.response.data.Message != "NO RATES FOUND!") {
            console.log("error in getting lawyer rates : ", error);
          }
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {ratesList.map((ratei, index) => (
        <Grid key={index} container direction={{ xs: "column", sm: "row" }}>
          <Grid
            display="flex"
            alignItems={{ xs: "center", sm: "flex-start" }}
            justifyContent={{ xs: "center", sm: "flex-start" }}
            item
            component={Card}
          >
            <CardContent>
              <Avatar
                alt="user profile"
                sx={{ width: 60, height: 60 }}
                srcSet={ratei.user.profileImageUrl}
              />
            </CardContent>
          </Grid>
          <Grid
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            item
            component={Card}
            sm
          >
            <CardContent>
              <Typography sx={{ fontFamily: "shabnam" }}>
                {ratei.user.name}
              </Typography>
              <Rating
                dir="rtl"
                name="user rating"
                value={ratei.rateNum}
                precision={0.5}
                readOnly
              />
              <Typography sx={{ fontFamily: "shabnam" }}>
                {ratei.comment}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default Comment;
