import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import landing_page from './assests/images/default_lawyer_profile_background_picture.jpg';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { BASE_API_ROUTE } from '../src/Constants';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Lawyer_4 from "../src/assests/images/Lawyer_4.jpeg"

import landing_css from "../src/css/landing.css"

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CountUp from 'react-countup';
import TypeAnimation from 'react-type-animation';


import GavelRoundedIcon from '@mui/icons-material/GavelRounded';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Advertising from './components/premium-page/Avertising'; 
import lawer1 from './assests/images/lawer1.jpg';
import lawer2 from './assests/images/lawer2.jpg';
import StyledButton from './components/ButtonComponent';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ fontFamily: 'Shabnam', fontWeight: 'bold', margin: '10px' }}>
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'shabnam',
  },
});


const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    transition: 'border-color 0.3s ease-in-out',
    '&:hover': {
      borderColor: "gray",
      boxShadow: '0 0 8px gray', // افزایش ضخامت بوردر در هاور
    },
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);


  const features = [
    { title: 'امکانات ۱', description: 'توضیحات امکانات ۱' },
    { title: 'امکانات ۲', description: 'توضیحات امکانات ۲' },
    { title: 'امکانات ۳', description: 'توضیحات امکانات ۳' },
  ];

  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleButtonClick = (description) => {
    console.log(description);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(`${BASE_API_ROUTE}Lawyer/GetAll`);
        console.log(response);
        if (response.data) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          setLawyers(response.data.data.slice(randomNumber, randomNumber+10)); // Only take the first 10 lawyers
        }
      } catch (error) {
        console.error('Failed to fetch lawyers:', error);
      }
    };
    
    
    fetchLawyers();
  }, []);


  return (
    <>
      <Helmet>
        <title>وکیل پرس</title>
      </Helmet>
      
      <Grid
        sx={{
          flexGrow: 1,
          height: '94vh',
          backgroundImage: `url(${landing_page})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: 12,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
          borderBottomRightRadius: '15%',
          borderBottomLeftRadius: '15%',
        }}
      >
        <Grid container justifyContent="start" alignItems="start">
          <Grid item xs={12} sm={8} md={6} sx={{ mx: '10px' }}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: '30px',
                fontSize: { xs: '30px', sm: '50px' },
                color: '#fff',
                textShadow: '2px 2px #000',
                fontFamily: "Shabnam"
              }}
            >
              از وکیل پرس بپرس!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: '30px',
                fontSize: { xs: '20px', sm: '30px' },
                color: '#fff',
                textShadow: '2px 2px #000',
                fontFamily: "Shabnam"
              }}
            >
              گرفتن جواب سوال حقوقی و وکیل برای هر پرونده ای مثل آب خوردن!
            </Typography>
            <Grid align="center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate("/Lawyer-search-page")}
              >
                جست و جوی وکلا
              </Button>
              <Button
                variant="contained"
                sx={{ ml: '20px' }}
                size="large"
                color="primary"
                onClick={() => navigate("/Forum")}
              >
                فروم عمومی
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
      <div className="homepage">
      <div className="wrapper">
        <div 
        className="container"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}         
        >
          <CountUp start={100} end={300} duration={3}>
            {({ countUpRef }) => (
              <span className="num" data-val="400" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text"         
          >وکیل عضو وکیل‌پرس</span>
        </div>
        <div 
        className="container"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}         
        >          <CountUp start={340} end={1100} duration={3}>
            {({ countUpRef }) => (
              <span className="num" data-val="340" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">پرونده موفق</span>
        </div>
        <div 
        className="container"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}         
        >          <CountUp start={1} end={2} duration={3}>
            {({ countUpRef }) => (
              <span className="num" data-val="225" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">سال سابقه خدمت‌رسانی</span>
        </div>
        <div 
        className="container"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}         
        >          <CountUp start={1} end={280} duration={3}>
            {({ countUpRef }) => (
              <span className="num" data-val="280" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">پرسش و پاسخ</span>
        </div>
      </div>
    </div>        
      </Box>



    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '100%',
        backgroundColor: '#2C3E50',
        color: 'white',
        fontFamily: 'Arial',
        fontSize: '24px',
        border: '2px solid #000000',
        borderRadius: '30px',
        padding: '2px',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
        marginBottom: "20px"
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.01)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      <span style={{fontFamily:"Shabnam", marginRight:"15px", marginLeft:"15px", width: '50%', textAlign: 'center', paddingLeft: '10px' }}>
        وکیل پرس
        <br />
        اطلاع از قوانین جاری، بین المللی، مدنی، مجازات و عمومی توسط وکلای مطرح کشور
        <br />
        تنظیم قراردادهای رسمی
        <br />
        ارتباط با وکلا
      </span>
      <img
        src={Lawyer_4}
        alt="عکس"
        style={{
          width: '50%',
          height: '100%',
          borderRadius: '30px',
          transition: 'transform 0.3s',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      />
    </div>



    <Box
      sx={{ m:"5px", mb:"50px", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400, borderRadius: '30px', borderColor: 'grey' }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.02)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    
    
    >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRadius: '30px', // تغییر radius
            '& .MuiTabs-flexContainer': {
              flexDirection: 'column',
            },
            '& .MuiTab-root': {
              fontFamily: 'Shabnam', // تغییر فونت به "شبنم"
              '& .MuiTab-label': {
                fontWeight: 'bold', // بولد کردن لیبل
              },
              transition: 'border-right-width 0.3s', // اضافه کردن ترنزیشن
              '& .MuiButtonBase-root': {
                backgroundColor: 'lightgray', // تغییر رنگ پیش زمینه دکمه‌ها به خاکستری کم رنگ
              },
              '&:hover': {
                borderRightWidth: '8px', // تغییر ضخامت خط هاور (به عنوان مثال، 8px)
              },
            },
          }}
        >
        <Tab label="انتخاب وکیل" {...a11yProps(0)} />
        <Tab label="ارتباط با وکلا" {...a11yProps(1)} />
        <Tab label="پرسش و پاسخ عمومی با وکلا" {...a11yProps(2)} />
        <Tab label="چت آنلاین" {...a11yProps(3)} />
        <Tab label="تماس تصویری" {...a11yProps(4)} />
        <Tab label="پاداش برای وکلای فعال" {...a11yProps(5)} />
      </Tabs>
      <div
        style={{
          borderLeft: '3px solid #2C3E50',
          height: '100%',
          marginLeft: '10px',
        }}
      ></div>
      <TabPanel value={value} index={0} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
  شما می‌توانید در وکیل پرس، از میان تمامی وکلای به‌نام کشور، با توجه به نیاز و پرونده خود بهترین انتخاب را داشته باشید:
  <br />
  <br />

  
  1. برای اینکار باید وارد تب "منو" شوید سپس گزینه "جستجوی وکیل" را بفشارید.
  <br />
   2. در این مرحله لیست تمامی وکلا به همراه مشخصات آن‌ها برای شما قابل نمایش هستند.
   <br />
   3. با کلیک بر روی نام وکیل، می‌توانید وارد صفحه پروفایل وکیل شوید که شامل تمام مشخصات حقوقی وکیل مدنظر است.

<br /> 
<br /> 
 انتخاب راحت شما مشتری گرامی باعث می‌شود بهترین انتخاب را از میان وکلای کشور داشته باشید. معمولا در دعاوی حقوقی یکی از مهم‌ترین فاکتورها برای پیروزی انتخاب وکیل مناسب است.
پس با وکیل پرس می‌توانی به راحتی و در کمترین زمان بهترین وکیل را بسته به نوع پرونده انتخاب نمایید.


</TabPanel>
<TabPanel value={value} index={1} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
  اتفاق رایجی که قبل از وکیل پرس می‌افتاد این بود که در زمانی که شما در شرایط اضطرار هستید. ارتباط با وکیل امری سخت بود. یا باید به دفتر حقوقی وکیل مراجعه می‌شد.
  یا باید شماره تلفن وکیل را به‌دست می آوردند اما با وجود وکیل پرس این ارتباط می‌تواند برخط و آنی و رایگان انجام پذیرد.
  <br />
  همانطور که مستحضر هستید زمان مکالمه وکیل و موکل اغلب بسیار طولانی می‌شود که باعث هزینه مخابرات برای اشخاص می‌شد. اما با ارتباط رایگان وکیل پرس می‌تواند در 
  هر لحظه شبانه‌روز، به‌راحتی و با کیفیت تصویر و صوت بالا ارتباط ویدیویی و یا چت آنلاین داشته باشید.
  <br />
  <br />
  برای این‌کار پس از مشخص نمودن وکیل مورد نظر اقدامات زیر را انجام دهید:
  <br />
  <br />

  1. روی نام وکیل مورد نظر کلیک کرده تا وارد صفحه پروفایل وکیل شوید
  <br />
  2. گزینه "درخواست چت آنلاین" را بفشارید تا وارد صفحه چت شوید.
  <br />
  
  3. پس از ورود به صفحه چت در صورت تایید وکیل می‌توانید پیام رد و بدل کنید.
</TabPanel>
<TabPanel value={value} index={2} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
در صورتی‌که یک پیام عمومی دارید، می‌توانید آن را با وکلایی که در وکیل پرس هستند، در میان بگذارید که ضمن برخورداری از جواب وکلای به‌نام کشور 
و برطرف شدن ابهام حقوقی، به سایر کابران نیز این امکان را می‌دهد که از تجریه و اطلاعات شما و وکلا بهره‌مند شوند.
<br />
برای استفاده از این امکان مراحل زیر را انجام دهید:
<br />
1. رفتن به منو
<br />
2. فشردن گزینه "فروم"
<br />
3. در بخش "موضوع جدید" سوال خود را مطرح کنید
<br />

4. روی دکمه "ساخت موضوع جدید" کلیک کنید تا موضوع ساخته شود.
<br />
در ضمن می‌توانید در قسمت پایینی پرسش و پاسخ‌های افراد دیگر را مشاهده کنید و بازخورد بدهید.

</TabPanel>
<TabPanel value={value} index={3} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
  در وکیل‌پرس، امکان این وجود دارد که بتوانید با وکیل مربوطه به صورت برخط و آنی پرسش و پاسخ کتید و در ارتباط باشید.
  <br />
نکته ای که وکیل‌پرس را متمایز می‌کند اینست که چت وکیل‌پرس با اصل محرمانگی داده منطبق است و مجموعه وکیل‌پرس یا هیج شخص ثالت دیگری از محتوای پیام‌ها 
باخبر نمی‌شود.
<br />
پس به‌صورت کاملا امن در وکیل‌پرس با وکیل‌تان چت کنید!
</TabPanel>
<TabPanel value={value} index={4} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
در وکیل‌پرس، امکان این وجود دارد که بتوانید با وکیل مربوطه به صورت برخط و آنی پرسش و پاسخ تصویری داشته‌باشید و در ارتباط باشید.
  <br />
نکته ای که وکیل‌پرس را متمایز می‌کند اینست که چت وکیل‌پرس با اصل محرمانگی داده منطبق است و مجموعه وکیل‌پرس یا هیج شخص ثالت دیگری از محتوای پیام‌ها 
باخبر نمی‌شود.
<br />
پس به‌صورت کاملا امن در وکیل‌پرس با وکیل‌تان به‌صورت تصویری در ارتباط باشید!
</TabPanel>
<TabPanel value={value} index={5} sx={{ fontFamily: 'Shabnam', fontWeight: 'bold' }}>
  اگر وکیل هستید، وکیل‌پرس برای شما امکانی فراهم کرده‌است که ضمن اطلاع‌رسانی عمومی و آگاه‌سازی مردم از مسائل حقوقی و همجنین برندسازی شخصی، بتوانید 
  از این راه کسب درآمد داشته باشید.
  <br />
  به این صورت که هر کامنت و شرکت شما در بحث‌های عمومی منجر به پرداخت پاداش از سوی وکیل‌پرس خواهد شد.
  <br />
مزایای وکیل پرس برای وکلا:
<br />
1. برندسازی شخصی
<br />
2. کسب درآمد از طریق فوروم
<br />
3. اطلاع‌رسانی جهت آگاه‌سازی عموم مردم


  </TabPanel>

</Box>







  </>
);

}

export default App;