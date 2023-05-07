import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Rate = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const { LawyerId } = useParams();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
    <Helmet>
      <title>Rate Page</title>
    </Helmet>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Avatar
        alt="User Name"
        src="https://i.pravatar.cc/150?img=1"
        sx={{ width: 56, height: 56 }}
      />
      <Typography variant="h6" component="div" sx={{ margin: 1 }}>
        User Name
      </Typography>
      <Rating
        name="rate-user"
        value={value}
        onChange={handleChange}
        sx={{ margin: 1 }}
      />
      <TextField
        id="comment"
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={handleComment}
        variant="outlined"
        sx={{ width: "80%" }}
      />
    </Box>
    </>
  );
};

export default Rate;