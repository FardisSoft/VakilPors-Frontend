// import { Helmet } from "react-helmet-async";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Advertising from "./components/premium-page/Advertising"; // Import the Advertising component
//import landing_page from "./assests/images/default_lawyer_profile_background_picture.jpg";
import landing_page from "./assests/images/back3.jpg";
import { Paper } from "@mui/material";

import lawer1 from "./assests/images/lawer1.jpg";
import lawer2 from "./assests/images/lawer2.jpg";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Lawyer_4 from "../src/assests/images/Lawyer_4.jpeg";
import Typical from "react-typical";
import landing_css from "../src/css/landing.css";
import "../src/css/header.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CountUp from "react-countup";
import TypeAnimation from "react-type-animation";

import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

import { Card, Box } from "@mui/material";

import axios from "axios";
import { BASE_API_ROUTE } from "./Constants";
import StyledButton from "./components/ButtonComponent";
import Header from "./components/Header/Header";
import Workinfo from "./components/Workinfo/Workinfo";
import About from "./components/About/About";
import BestLawyer from "./components/BestLawyer/BestLawyer";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ fontFamily: "Shabnam", fontWeight: "bold", margin: "10px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    transition: "border-color 0.3s ease-in-out",
    "&:hover": {
      borderColor: "gray",
      boxShadow: "0 0 8px gray", // افزایش ضخامت بوردر در هاور
    },
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const App = () => {

  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(`${BASE_API_ROUTE}Lawyer/GetAll`);
        console.log(response);
        if (response.data) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          setLawyers(response.data.data.slice(randomNumber, randomNumber + 10)); // Only take the first 10 lawyers
        }
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
          <Header />
          <Workinfo />
          <About/>
          <Advertising lawyers={lawyers}/>
          <BestLawyer/>
      </ThemeProvider>
    </>
  );
};

export default App;
