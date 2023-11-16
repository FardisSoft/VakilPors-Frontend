import React from "react";
import { Link } from "react-router-dom";
import "../../css/ShowLawyers.css";
import { BsFillPersonFill, BsPersonWorkspace } from "react-icons/bs";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiRank3, GiConfirmed } from "react-icons/gi";
import { ThemeProvider } from "styled-components";
import { CacheProvider } from "@emotion/react";
import { Avatar, CardContent, Grid, Rating } from "@mui/material";
import { Verified } from "@mui/icons-material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import dlpbp from "../../assests/images/default_lawyer_profile_background_picture.jpg";
import Skeleton from "@mui/material/Skeleton";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
});

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: "15px",
    border: "1px solid #dadde9",
    fontFamily: "shabnam",
  },
}));

const LoadingSkeleton = () => {
  return (
    <div
      style={{ direction: "rtl" }}
    >
      <div class="teachers-list">
        <div class="teacher-item">
          <div class="box-shadow teacher-box-size">
            <div class="img-layer lazy">
              <Grid
                sx={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 250,
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "100%" }}
                  animation="wave"
                />
              </Grid>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <h2 className="align-center">
                <p class="my-1">
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "90%", height: 20 }}
                    style={{ direction: "rtl" }}
                  />
                </p>
              </h2>
              <h2>
                <p class="my-1">
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "80%", height: 15 }}
                    style={{ direction: "rtl" }}
                  />
                </p>
              </h2>
              <h2>
                <p class="my-1">
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "60%", height: 20 }}
                  />
                </p>
              </h2>
              <h2>
                <p class="my-1"></p>
                <a>
                  <p class="my-1">
                    <Skeleton
                      variant="rectangular"
                      width={110}
                      sx={{ width: "50%", height: 15 }}
                    />
                  </p>
                </a>
              </h2>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
