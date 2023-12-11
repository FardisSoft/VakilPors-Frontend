import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  CardContent,
  Rating,
} from "@mui/material";
import dlpbp from "../../assests/images/default_lawyer_profile_background_picture.jpg";
import "../../css/BestLawyer.css";

const BestLawyer = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (newIndex) => {
    setActiveSlide(newIndex);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "600",
          color: "#1565C0",
        }}
      >
        پر امتیازترین وکیل ها
      </div>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          display: "flex",
          gap: "10",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Paper
            style={{
              height: "300px",
              marginBottom: "20px",
              borderRadius: "10px",
              marginRight: "10px",
            }}
            className="Best_paper"
          >
            <Grid
              sx={{
                backgroundImage: `url(${dlpbp})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 160,
                borderRadius: "10px",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CardContent>
                <Avatar alt="lawyer profile" sx={{ width: 80, height: 80 }} />
              </CardContent>
            </Grid>
            <Typography
              style={{
                marginTop: "10px",
                marginRight: "10px",
                fontWeight: "600",
              }}
            >
              فاطمه عسکری
            </Typography>
            <div
              style={{
                marginTop: "10px",
                marginRight: "10px",
                fontWeight: "400",
              }}
            >
              وکیل دادگستری
            </div>
            <Rating
              dir="rtl"
              name="lawyer rating"
              value={3}
              precision={0.05}
              readOnly
              style={{marginTop:"10px",marginRight:'10px'}}
            />
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default BestLawyer;
