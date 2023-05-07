import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Rating, Avatar, TextField, Typography, Slide, Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Rate = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const { LawyerId } = useParams();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleRegister = () => {
    alert(`You have registered your comment and rate: ${comment}, ${value}`);
  };

  const handleCancel = () => {
    setValue(0);
    setComment("");
  };

  return (
    <>
    <Helmet>
      <title>Rate Page</title>
    </Helmet>
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Slide in={show} direction="right">
        <Avatar
          alt="User Name"
          src="https://i.pravatar.cc/150?img=1"
          sx={{ width: 56, height: 56 }}
        />
      </Slide>
      <Slide in={show} direction="right">
        <Typography variant="h6" component="div" sx={{ margin: 1 }}>
          User Name
        </Typography>
      </Slide>
      <Slide in={show} direction="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="rate-user"
            value={value}
            onChange={handleChange}
            sx={{ margin: 1 }}
          />
          <Box sx={{ fontSize: "0.8rem", color: "#333" }}>
            {value ? `${value} star${value !== 1 ? "s" : ""}` : "No rating given"}
          </Box>
        </Box>
      </Slide>
      <Slide in={show} direction="up">
        <TextField
          id="comment"
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={handleComment}
          variant="outlined"
          sx={{
            width: "80%",
            // padding: 1,
            // border: `1px solid ${theme.palette.common.white}`,
            // backgroundColor: "#f0f0f0",
          }}
        />
      </Slide>
      <Slide in={show} direction="up">
        <Box sx={{ display: "flex", gap: 2, margin: 2 }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Slide>
    </Grid>
    </>
  );
};

export default Rate;