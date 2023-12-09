// // App.jsx
// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Grid, Typography, Button } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import rtlPlugin from 'stylis-plugin-rtl';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { createTheme } from '@mui/material/styles';
// import { ThemeProvider } from '@mui/material/styles';
// import Advertising from './components/premium-page/Avertising'; // Import the Advertising component
// import landing_page from './assests/images/default_lawyer_profile_background_picture.jpg';
// import lawer1 from './assests/images/lawer1.jpg';
// import lawer2 from './assests/images/lawer2.jpg';
// import { useState, useEffect } from 'react';
// import { makeStyles } from "@mui/styles";

// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Lawyer_4 from "../src/assests/images/Lawyer_4.jpeg"

// import landing_css from "../src/css/landing.css"

// import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import CountUp from 'react-countup';
// import TypeAnimation from 'react-type-animation';

// import GavelRoundedIcon from '@mui/icons-material/GavelRounded';

// import { Card, Box } from '@mui/material';

// import axios from 'axios';
// import { BASE_API_ROUTE } from './Constants';
// import StyledButton from './components/ButtonComponent';
// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [rtlPlugin],
// });
// const theme = createTheme({
//   direction: 'rtl',
//   typography: {
//     fontFamily: 'shabnam',
//   },
// });

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && (
//         <Box sx={{ fontFamily: 'Shabnam', fontWeight: 'bold', margin: '10px' }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   card: {
//     padding: theme.spacing(2),
//     borderRadius: theme.spacing(2),
//     transition: 'border-color 0.3s ease-in-out',
//     '&:hover': {
//       borderColor: "gray",
//       boxShadow: '0 0 8px gray', // افزایش ضخامت بوردر در هاور
//     },
//     '&:not(:last-child)': {
//       marginBottom: theme.spacing(2),
//     },
//   },
// }));

// const App = () => {

//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const navigate = useNavigate();
//   const [lawyers, setLawyers] = useState([]);

//   const [expandedPanel, setExpandedPanel] = useState(null);

//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpandedPanel(isExpanded ? panel : null);
//   };

//   const handleButtonClick = (description) => {
//     console.log(description);
//     // انجام عملیات مورد نیاز برای دکمه
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const response = await axios.get(`${BASE_API_ROUTE}Lawyer/GetAll`);
//         console.log(response);
//         if (response.data) {
//           const randomNumber = Math.floor(Math.random() * 100) + 1;
//           setLawyers(response.data.data.slice(randomNumber, randomNumber+10)); // Only take the first 10 lawyers
//         }
//       } catch (error) {
//         console.error('Failed to fetch lawyers:', error);
//       }
//     };

//     fetchLawyers();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>وکیل پرس</title>
//       </Helmet>
//       <ThemeProvider theme={theme}>
//         <CacheProvider value={cacheRtl}>
//           <Grid sx={{
//             flexGrow: 1, height: '96vh', backgroundImage: `url(${landing_page})`, backgroundSize: 'cover',
//             backgroundPosition: 'center', display: "grid", paddingTop: 12, placeItems: "center", boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
//             backgroundSize: 'cover', borderBottomRightRadius: '5%', borderBottomLeftRadius: '5%',
//           }}>

//             <Grid container justifyContent="start" alignItems="start">
//               <Grid item xs={12} sm={8} md={6} sx={{ mx: '10px', }}>
//                 <Typography variant="h2" align="center" sx={{ mb: '30px', fontSize: { xs: '30px', sm: '50px' }, color: '#fff', textShadow: '2px 2px #000',  fontFamily: "Shabnam"}}>
//                   از وکیل پرس بپرس!
//                 </Typography>
//                 <Typography variant="h5" align="center" sx={{ mb: '30px', fontSize: { xs: '20px', sm: '30px' }, color: '#fff', textShadow: '2px 2px #000',  fontFamily: "Shabnam"}}>
//                   گرفتن جواب سوال حقوقی و وکیل برای هر پرونده ای مثل آب خوردن!
//                 </Typography>
//                 <Grid container direction="row" justifyContent="center" alignItems="center">
//                   <StyledButton onClick={() => navigate("/Lawyer-search-page")}>
//                   جست و جوی وکلا
//                   </StyledButton>
//                   <StyledButton style={{ marginRight: '2rem' }} onClick={() => navigate("/Forum")}>
//                   فروم عمومی
//                   </StyledButton>
//                 </Grid>

//                 <Advertising lawyers={lawyers} />
//               </Grid>
//             </Grid>
//           </Grid>

//           <Box>
//       <div className="homepage">
//       <div className="wrapper">
//         <div
//         className="container"
//         onMouseOver={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'scale(1)';
//         }}
//         >
//           <CountUp start={100} end={300} duration={3}>
//             {({ countUpRef }) => (
//               <span className="num" data-val="400" ref={countUpRef} />
//             )}
//           </CountUp>
//           <span className="text"
//           >وکیل عضو وکیل‌پرس</span>
//         </div>
//         <div
//         className="container"
//         onMouseOver={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'scale(1)';
//         }}
//         >          <CountUp start={340} end={1100} duration={3}>
//             {({ countUpRef }) => (
//               <span className="num" data-val="340" ref={countUpRef} />
//             )}
//           </CountUp>
//           <span className="text">پرونده موفق</span>
//         </div>
//         <div
//         className="container"
//         onMouseOver={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'scale(1)';
//         }}
//         >          <CountUp start={1} end={2} duration={3}>
//             {({ countUpRef }) => (
//               <span className="num" data-val="225" ref={countUpRef} />
//             )}
//           </CountUp>
//           <span className="text">سال سابقه خدمت‌رسانی</span>
//         </div>
//         <div
//         className="container"
//         onMouseOver={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'scale(1)';
//         }}
//         >          <CountUp start={1} end={280} duration={3}>
//             {({ countUpRef }) => (
//               <span className="num" data-val="280" ref={countUpRef} />
//             )}
//           </CountUp>
//           <span className="text">پرسش و پاسخ</span>
//         </div>
//       </div>
//     </div>
//       </Box>

//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '400px',
//         width: '100%',
//         backgroundColor: '#2C3E50',
//         color: 'white',
//         fontFamily: 'Arial',
//         fontSize: '24px',
//         border: '2px solid #000000',
//         borderRadius: '30px',
//         padding: '2px',
//         overflow: 'hidden',
//         transition: 'box-shadow 0.3s',
//         marginBottom: "20px"
//       }}
//       onMouseOver={(e) => {
//         e.target.style.transform = 'scale(1.01)';
//       }}
//       onMouseOut={(e) => {
//         e.target.style.transform = 'scale(1)';
//       }}
//     >
//       <span style={{fontFamily:"Shabnam", marginRight:"15px", marginLeft:"15px", width: '50%', textAlign: 'center', paddingLeft: '10px' }}>
//         وکیل پرس
//         <br />
//         اطلاع از قوانین جاری، بین المللی، مدنی، مجازات و عمومی توسط وکلای مطرح کشور
//         <br />
//         تنظیم قراردادهای رسمی
//         <br />
//         ارتباط با وکلا
//       </span>
//       <img
//         src={Lawyer_4}
//         alt="عکس"
//         style={{
//           width: '50%',
//           height: '100%',
//           borderRadius: '30px',
//           transition: 'transform 0.3s',
//         }}
//         onMouseOver={(e) => {
//           e.target.style.transform = 'scale(1.15)';
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'scale(1)';
//         }}
//       />
//     </div>

//     <Box
//       sx={{ m:"5px", mb:"50px", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400, borderRadius: '30px', borderColor: 'grey' }}
//       onMouseOver={(e) => {
//         e.target.style.transform = 'scale(1.02)';
//       }}
//       onMouseOut={(e) => {
//         e.target.style.transform = 'scale(1)';
//       }}

//     >
//         <Tabs
//           orientation="vertical"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           aria-label="Vertical tabs example"
//           sx={{
//             borderRadius: '30px',
//             '& .MuiTabs-flexContainer': {
//               flexDirection: 'column',
//             },
//             '& .MuiTab-root': {
//               fontFamily: 'Shabnam',
//               '& .MuiTab-label': {
//                 fontWeight: 'bold',
//               },
//               transition: 'border-right-width 0.3s',
//               '& .MuiButtonBase-root': {
//                 backgroundColor: 'lightgray',
//               },
//               '&:hover': {
//                 borderRightWidth: '8px',
//               },
//             },
//           }}
//         >
//         <Tab label="انتخاب وکیل" {...a11yProps(0)} />
//         <Tab label="ارتباط با وکلا" {...a11yProps(1)} />
//         <Tab label="پرسش و پاسخ عمومی با وکلا" {...a11yProps(2)} />
//         <Tab label="چت آنلاین" {...a11yProps(3)} />
//         <Tab label="تماس تصویری" {...a11yProps(4)} />
//         <Tab label="پاداش برای وکلای فعال" {...a11yProps(5)} />
//       </Tabs>
//       <div
//         style={{
//           borderLeft: '3px solid #2C3E50',
//           height: '100%',
//           marginLeft: '10px',
//         }}
//       ></div>
//             <TabPanel value={value} index={0} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//         شما می‌توانید در وکیل پرس، از میان تمامی وکلای به‌نام کشور، با توجه به نیاز و پرونده خود بهترین انتخاب را داشته باشید:
//         <br />
//         <br />

//         1. برای اینکار باید وارد تب "منو" شوید سپس گزینه "جستجوی وکیل" را بفشارید.
//         <br />
//         2. در این مرحله لیست تمامی وکلا به همراه مشخصات آن‌ها برای شما قابل نمایش هستند.
//         <br />
//         3. با کلیک بر روی نام وکیل، می‌توانید وارد صفحه پروفایل وکیل شوید که شامل تمام مشخصات حقوقی وکیل مدنظر است.

//       <br />
//       <br />
//       انتخاب راحت شما مشتری گرامی باعث می‌شود بهترین انتخاب را از میان وکلای کشور داشته باشید. معمولا در دعاوی حقوقی یکی از مهم‌ترین فاکتورها برای پیروزی انتخاب وکیل مناسب است.
//       پس با وکیل پرس می‌توانی به راحتی و در کمترین زمان بهترین وکیل را بسته به نوع پرونده انتخاب نمایید.

//       </TabPanel>
//       <TabPanel value={value} index={1} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//         اتفاق رایجی که قبل از وکیل پرس می‌افتاد این بود که در زمانی که شما در شرایط اضطرار هستید. ارتباط با وکیل امری سخت بود. یا باید به دفتر حقوقی وکیل مراجعه می‌شد.
//         یا باید شماره تلفن وکیل را به‌دست می آوردند اما با وجود وکیل پرس این ارتباط می‌تواند برخط و آنی و رایگان انجام پذیرد.
//         <br />
//         همانطور که مستحضر هستید زمان مکالمه وکیل و موکل اغلب بسیار طولانی می‌شود که باعث هزینه مخابرات برای اشخاص می‌شد. اما با ارتباط رایگان وکیل پرس می‌تواند در
//         هر لحظه شبانه‌روز، به‌راحتی و با کیفیت تصویر و صوت بالا ارتباط ویدیویی و یا چت آنلاین داشته باشید.
//         <br />
//         <br />
//         برای این‌کار پس از مشخص نمودن وکیل مورد نظر اقدامات زیر را انجام دهید:
//         <br />
//         <br />

//         1. روی نام وکیل مورد نظر کلیک کرده تا وارد صفحه پروفایل وکیل شوید
//         <br />
//         2. گزینه "درخواست چت آنلاین" را بفشارید تا وارد صفحه چت شوید.
//         <br />

//         3. پس از ورود به صفحه چت در صورت تایید وکیل می‌توانید پیام رد و بدل کنید.
//       </TabPanel>
//       <TabPanel value={value} index={2} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//       در صورتی‌که یک پیام عمومی دارید، می‌توانید آن را با وکلایی که در وکیل پرس هستند، در میان بگذارید که ضمن برخورداری از جواب وکلای به‌نام کشور
//       و برطرف شدن ابهام حقوقی، به سایر کابران نیز این امکان را می‌دهد که از تجریه و اطلاعات شما و وکلا بهره‌مند شوند.
//       <br />
//       برای استفاده از این امکان مراحل زیر را انجام دهید:
//       <br />
//       1. رفتن به منو
//       <br />
//       2. فشردن گزینه "فروم"
//       <br />
//       3. در بخش "موضوع جدید" سوال خود را مطرح کنید
//       <br />

//       4. روی دکمه "ساخت موضوع جدید" کلیک کنید تا موضوع ساخته شود.
//       <br />
//       در ضمن می‌توانید در قسمت پایینی پرسش و پاسخ‌های افراد دیگر را مشاهده کنید و بازخورد بدهید.

//       </TabPanel>
//       <TabPanel value={value} index={3} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//         در وکیل‌پرس، امکان این وجود دارد که بتوانید با وکیل مربوطه به صورت برخط و آنی پرسش و پاسخ کتید و در ارتباط باشید.
//         <br />
//       نکته ای که وکیل‌پرس را متمایز می‌کند اینست که چت وکیل‌پرس با اصل محرمانگی داده منطبق است و مجموعه وکیل‌پرس یا هیج شخص ثالت دیگری از محتوای پیام‌ها
//       باخبر نمی‌شود.
//       <br />
//       پس به‌صورت کاملا امن در وکیل‌پرس با وکیل‌تان چت کنید!
//       </TabPanel>
//       <TabPanel value={value} index={4} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//       در وکیل‌پرس، امکان این وجود دارد که بتوانید با وکیل مربوطه به صورت برخط و آنی پرسش و پاسخ تصویری داشته‌باشید و در ارتباط باشید.
//         <br />
//       نکته ای که وکیل‌پرس را متمایز می‌کند اینست که چت وکیل‌پرس با اصل محرمانگی داده منطبق است و مجموعه وکیل‌پرس یا هیج شخص ثالت دیگری از محتوای پیام‌ها
//       باخبر نمی‌شود.
//       <br />
//       پس به‌صورت کاملا امن در وکیل‌پرس با وکیل‌تان به‌صورت تصویری در ارتباط باشید!
//       </TabPanel>
//       <TabPanel value={value} index={5} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
//         اگر وکیل هستید، وکیل‌پرس برای شما امکانی فراهم کرده‌است که ضمن اطلاع‌رسانی عمومی و آگاه‌سازی مردم از مسائل حقوقی و همجنین برندسازی شخصی، بتوانید
//         از این راه کسب درآمد داشته باشید.
//         <br />
//         به این صورت که هر کامنت و شرکت شما در بحث‌های عمومی منجر به پرداخت پاداش از سوی وکیل‌پرس خواهد شد.
//         <br />
//       مزایای وکیل پرس برای وکلا:
//       <br />
//       1. برندسازی شخصی
//       <br />
//       2. کسب درآمد از طریق فوروم
//       <br />
//       3. اطلاع‌رسانی جهت آگاه‌سازی عموم مردم

//       </TabPanel>

//     </Box>

//         </CacheProvider>
//       </ThemeProvider>
//     </>
//   );
// }

// export default App;

// App.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Advertising from "./components/premium-page/Avertising"; // Import the Advertising component
import landing_page from "./assests/images/default_lawyer_profile_background_picture.jpg";
// import landing_page from './assests/images/back1.PNG';
import { Paper } from "@mui/material";

import lawer1 from "./assests/images/lawer1.jpg";
import lawer2 from "./assests/images/lawer2.jpg";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Lawyer_4 from "../src/assests/images/Lawyer_4.jpeg";

import landing_css from "../src/css/landing.css";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CountUp from "react-countup";
import TypeAnimation from "react-type-animation";

import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

import { Card, Box } from "@mui/material";

import axios from "axios";
import { BASE_API_ROUTE } from "./Constants";
import StyledButton from "./components/ButtonComponent";
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);

  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleButtonClick = (description) => {
    console.log(description);
    // انجام عملیات مورد نیاز برای دکمه
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Helmet>
        <title>وکیل پرس</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <Grid
            sx={{
              flexGrow: 1,
              height: "96vh",
              backgroundImage: `url(${landing_page})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              paddingTop: 12,
              placeItems: "center",
              boxShadow: "inset 0 0 0 2000px rgba(3, 144, 252, 0.3)",
              borderRadius: "0px",
            }}
          >
            <Grid container justifyContent="start" alignItems="start">
              <Grid item xs={12} sm={8} md={6} sx={{ mx: "10px" }}>
                <Typography
                  variant="h2"
                  align="center"
                  sx={{
                    mb: "30px",
                    fontSize: { xs: "30px", sm: "50px" },
                    color: "#fff",
                    textShadow: "2px 2px #000",
                    fontFamily: "Shabnam",
                  }}
                >
                  از وکیل پرس بپرس!
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    mb: "30px",
                    fontSize: { xs: "20px", sm: "30px" },
                    color: "#fff",
                    textShadow: "2px 2px #000",
                    fontFamily: "Shabnam",
                  }}
                >
                  گرفتن جواب سوال حقوقی و وکیل برای هر پرونده ای مثل آب خوردن!
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <StyledButton onClick={() => navigate("/Lawyer-search-page")}>
                    جست و جوی وکلا
                  </StyledButton>
                  <StyledButton
                    style={{ marginRight: "2rem" }}
                    onClick={() => navigate("/Forum")}
                  >
                    فروم عمومی
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              gap:'10px'
            }}
          >
            <Paper className="square" sx={{ height: "250px", width: "20%" }}>
              مربع 1
            </Paper>
            <Paper className="square" sx={{ height: "250px", width: "20%" }}>
              مربع 2
            </Paper>
            <Paper className="square" sx={{ height: "250px", width: "20%" }}>
              مربع 3
            </Paper>
            <Paper className="square" sx={{ height: "250px", width: "20%" }}>
              مربع 4
            </Paper>
            <Paper className="square" sx={{ height: "250px", width: "20%" }}>
              مربع 5
            </Paper>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
