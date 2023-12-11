import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Card, Box } from "@mui/material";
import "../../css/Workinfo.css";
import daavi from "../../assests/images/daavi.jpg";
import khanevadeh from "../../assests/images/khanevadeh.jpg";
import melki from "../../assests/images/melki.jpg";
import keifari from "../../assests/images/keifari.jpg";
import sherkat from "../../assests/images/sherkat.jpg";

const Workinfo = () => {
  const items = [
    {
      image: daavi,
      title: "دعاوی حقوقی",
    },
    {
      image: khanevadeh,
      title: "دعاوی خانواده",
    },
    {
      image: melki,
      title: "دعاوی ملکی",
    },
    {
      image: keifari,
      title: "دعاوی کیفری",
    },
    {
      image: sherkat,
      title: "خدمات ثبتی و شرکتی",
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{
            fontSize: "23px",
            fontWeight: 600,
            color: "#1565C0",
            marginTop: "50px",
          }}
        >
          خدمات وکیل پرس
        </div>

        <div style={{ marginTop: "10px", color: "#4a4947", fontSize: "14px" }}>
          گروه وکلا وکیل پرس با بهره گیری از دانش تجربی خود ،شما را در انجام
          امور حقوقی یاری کرده و همواره در جهت احقاق حق راستین موکلان خود می
          کوشند{" "}
        </div>
      </div>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          marginTop: "10px",
        }}
      >
        {items.map((item, index) => (
          <Grid item lg={2.4} md={4} sm={6} xs={12} key={index}>
            <Paper className="work_square">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  style={{
                    height: "100px",
                    width: "90%",
                    marginTop: "15px",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    marginTop: "20px",
                    color: "#1565C0",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  {item.title}
                </div>
                <hr style={{ width: "60%", margin: "10px auto" }} />
                <div
                  style={{
                    width: "80%",
                    margin: "10px auto",
                    textAlign: "center",
                    color:'#6f7275',
                    fontSize:'13px'
                  }}
                >
                  کار های {item.title} خود را به ما بسپارید{" "}
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Workinfo;
