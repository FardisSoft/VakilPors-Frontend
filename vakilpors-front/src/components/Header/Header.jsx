import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import landing_page from "../../assests/images/back3.jpg";
import { Paper } from "@mui/material";
import Typical from "react-typical";
import "../../css/header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Grid
        sx={{
          height: "96vh",
          backgroundImage: `url(${landing_page})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
          boxShadow: "inset 0 0 0 2000px rgba(3, 144, 252, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-10%",
          }}
        >
          <h2 className="header_name">
            <Typical
              steps={["از وکیل پرس بپرس", 2000]}
              loop={Infinity}
              wrapper="p"
            />
          </h2>
          <div style={{ marginTop: "30px" }} className="header_des1">
            گرفتن جواب سوالات حقوقی مثل آب خوردن!
          </div>
          <div style={{ marginTop: "15px" }} className="header_des1">
            بهترین وکیل ها رو از اینجا انتخاب کن
          </div>
          <button
            onClick={() => navigate("/Lawyer-search-page")}
            className="home-banner__start-btn"
          >
            <span className="home-banner__start-btn-highlight">
              وکیل ها رو از اینجا مشاهده کن{" "}
            </span>
          </button>
        </div>
      </Grid>
    </div>
  );
};

export default Header;
