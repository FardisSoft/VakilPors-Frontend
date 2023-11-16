import React from "react";
import { Avatar, CardContent, Grid, Rating } from "@mui/material";
import {Typography, Chip } from "@mui/material";
import { Card } from "@mui/material";

const ShowComment = ({ratei,index}) => {
  return (
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
  );
};

export default ShowComment;
