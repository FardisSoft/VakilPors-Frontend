import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Box,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import Rating from "@material-ui/lab/Rating";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Slider from "react-slick";
import '../../css/Advertising.css'

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "shabnam",
  },
});

const LawyerCard = ({ lawyer }) => {
  console.log(lawyer);
  const navigate = useNavigate();
  const shortDescription = lawyer.aboutMe.split(" ").slice(0, 100).join(" ");
  if (!lawyer) {
    return null; // or some fallback UI
  } else {
    return (
      <>
        <Paper
          style={{
            height: "380px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
          className="Adver_paper"
        >
          <div style={{ margin: "10px", display: "flex" }}>
            <Avatar
              alt={lawyer.name}
              src={lawyer.profileImageUrl}
              sx={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <div>
              <Typography
                style={{ margin: "10px", color: "#727572", fontWeight: "600" }}
              >
                {lawyer.user.name}
              </Typography>
              <Typography
                style={{
                  marginTop: "-1px",
                  marginRight: "10px",
                  color: "#727572",
                  fontSize: "13px",
                }}
              >
                عنوان: {lawyer.title ? lawyer.title : "وکیل"}
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{ fontSize: "13px", borderRadius: "10px" }}
              onClick={() => navigate(`/LawyerPage/${lawyer.id}`)}
            >
              مشاهده پروفایل
            </Button>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              lineHeight: "2",
              marginTop: "10px",
              color: "#7d7c79",
            }}
            className="Adver_about"
          >
            {lawyer.aboutMe}
          </div>
        </Paper>
      </>
    );
  }

  // Rest of your LawyerCard component...
};

const Advertising = ({ lawyers }) => {
  const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    if (lawyers.length > 0) {
      const interval = setInterval(() => {
        setCurrentLawyerIndex((prevIndex) => (prevIndex + 1) % lawyers.length);
      },2000 );
      setIsLoading(false); // Data is loaded
      return () => clearInterval(interval);
    }
  }, [lawyers]);

  return (
    <>
      <Grid
        container
        spacing={4}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Grid item lg={4} md={4} sm={12}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <div style={{ display: "flex" }}>
              <EmojiEventsIcon sx={{ fontSize: "100px", color: "#1565C0" }} />
              <div
                style={{
                  fontSize: "48px",
                  marginRight: "10px",
                  fontWeight: "600",
                  color: "#2A2D53",
                }}
              >
                وکیل های کار درست ما
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={8} md={8} sm={12}>
          <Paper
            sx={{
              p: 2,
              m: 2,
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              borderRadius: 2,
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #00a8ff, #00416d)",
              borderRadius: "10px",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress style={{ color: "white" }} />
              </div>
            ) : (
              <>
                {currentLawyerIndex < lawyers.length ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    {/* <div >
                      <Slider {...settings}>
                        {lawyers.map((lawyer, index) => (
                          <div key={index}>
                            <LawyerCard lawyer={lawyers[index]} />
                          </div>
                        ))}
                      </Slider>

                    </div> */}
                    <LawyerCard lawyer={lawyers[currentLawyerIndex]} />
                  </div>
                ) : (
                  <p>No lawyers to display</p>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  {lawyers.map((lawyer, index) => (
                    <IconButton
                      key={index}
                      onClick={() => setCurrentLawyerIndex(index)}
                      color={
                        index === currentLawyerIndex ? "primary" : "default"
                      }
                    >
                      <span style={{ fontSize: "1.5em" }}>•</span>
                    </IconButton>
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Advertising;
