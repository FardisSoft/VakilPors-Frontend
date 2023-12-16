import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  CardContent,
  Rating,
  CircularProgress,
} from "@mui/material";
import dlpbp from "../../assests/images/default_lawyer_profile_background_picture.jpg";
import "../../css/BestLawyer.css";
import useLawyerShowSearch from "../Lawyer-search-page/useLawyerShowSearch";

const BestLawyer = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (newIndex) => {
    setActiveSlide(newIndex);
  };

  const { lawyerdetail1, loading, error, hasMore } = useLawyerShowSearch(
    1,
    5,
    "Rating",
    false
  );
  console.log(lawyerdetail1);

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
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "blue" }} />
        </div>
      )}
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
        {lawyerdetail1.map((Lawyer, index) => (
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
                backgroundImage: `url(${
                  Lawyer.profileBackgroundPictureUrl
                    ? Lawyer.profileBackgroundPictureUrl
                    : dlpbp
                })`,
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
                <Avatar
                  srcSet={Lawyer.user.profileImageUrl}
                  sx={{ width: 80, height: 80 }}
                />
              </CardContent>
            </Grid>
            <Link to={`/LawyerPage/${Lawyer.id}`}>
              <Typography
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  fontWeight: "600",
                }}
              >
                {Lawyer.user.name}
              </Typography>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  fontWeight: "400",
                }}
              >
                {Lawyer.title ? Lawyer.title : "وکیل"}{" "}
              </div>
              <Rating
                dir="rtl"
                name="lawyer rating"
                value={Lawyer.rating}
                precision={0.05}
                readOnly
                style={{ marginTop: "10px", marginRight: "10px" }}
              />
            </Link>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default BestLawyer;
