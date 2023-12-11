import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import about from "../../assests/images/about2.jpg";
import "../../css/About.css";
import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {
  Aos.init({ duration: 600 });
  return (
    <div>
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
          <img
            src={about}
            style={{
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item lg={8} md={8} sm={12}>
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className="About_des"
          >
            <div
              style={{ marginTop: "10px", color: "#7d7c79", fontWeight: "600" }}
            >
              درباره ما
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "600",
                color: "#1565C0",
              }}
            >
              درباره وکیل پرس
            </div>
            <div
              style={{
                width: "80%",
                lineHeight: "2",
                textAlign: "justify",
                marginTop: "10px",
                color: "#7d7c79",
              }}
            >
              سایت وکیل پرس با هدف کمک به پیشبرد پرونده‌های حقوقی زده شده است.
              ما بهترین وکیل‌ها و متخصصان حقوقی را در تیم خود داریم که با تجربه
              و تخصص خود، در ارائه خدمات حقوقی برتر و بهترین نتایج برای
              موکلانمان تلاش می‌کنند. تیم ما تشکیل شده از وکلا و متخصصان حقوقی
              با سابقه و تجربه گسترده در زمینه‌های مختلف حقوقی از جمله دعاوی
              حقوقی، دعاوی خانواده، دعاوی ملکی و دعاوی کیفری است. این تخصص‌ها و
              دانش تیم ما به مشتریانمان امکان می‌دهد تا خدماتی کیفی و حرفه‌ای
              دریافت کنند. ما متعهدیم تا به مشتریانمان در رسیدگی به
              پرونده‌هایشان کمک کنیم و بهترین راه‌حل‌های حقوقی را ارائه دهیم تا
              به نتایج موفقیت‌آمیز برسند.
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
