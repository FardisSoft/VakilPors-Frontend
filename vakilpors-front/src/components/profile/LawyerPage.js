import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BASE_API_ROUTE } from '../../Constants';
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Badge, styled, Avatar, Rating, Typography, Chip } from '@mui/material';
import { Stack, Grid } from "@mui/material";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import LinkMUI from '@mui/material/Link';
import {Done, Female, Male, CardMembership, LocationOn, Business, VerifiedUser, WorkHistory,
    School, Gavel, CoPresent, QuestionAnswer, ThumbUpAlt, FactCheck, Percent, Verified } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import jwt from 'jwt-decode';
import dlpbp from '../../assests/images/default_lawyer_profile_background_picture.jpg';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
});
// mui rtl

const LawyerPage = () => {

    const [profilePicture, setProfilePicture] = useState();
    const [profileBackgroundPicture, setProfileBackgroundPicture] = useState();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState(0);
    const [numberOfRates, setNumberOfRates] = useState(0);
    const [city, setCity] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [numberOfConsultations, setNumberOfConsultations] = useState(0);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [numberOfVerifies, setNumberOfVerifies] = useState(0);
    const [aboutMe, setAboutMe] = useState('');
    const [callingCard, setCallingCard] = useState();
    const [resumeLink, setResumeLink] = useState('');
    const [ratesList, setRatesList] = useState([]);
    const [isVerified, setIsVerified] = useState(false);

    const { LawyerId } = useParams();
    const [ lawyerUserId, setLawyerUserId] = useState();
    const [ watcherUserId, setWatcherUserId] = useState();
    const { getAccessToken, refUserRole } = useAuth();
    const navigate = useNavigate();

    const handleInitializerWithAPI = (data) => {
        setAboutMe(data.aboutMe);
        setCallingCard(data.callingCardImageUrl);
        setCity(data.city);
        setEducation(data.education);
        setLicenseNumber(data.parvandeNo);
        setOfficeAddress(data.officeAddress);
        setProfilePicture(data.user.profileImageUrl);
        setResumeLink(data.resumeLink);
        setSpecialties((data.specialties && data.specialties!='null') ? data.specialties.split('/') : []);
        setTitle(data.title);
        setYearsOfExperience(data.yearsOfExperience);
        setName(data.user.name);
        setGender(data.gender);
        setProfileBackgroundPicture(data.profileBackgroundPictureUrl);
        setNumberOfConsultations(data.numberOfConsultations);
        setNumberOfAnswers(data.numberOfAnswers);
        setNumberOfLikes(data.numberOfLikes);
        setNumberOfVerifies(data.numberOfVerifies);
        setIsVerified(data.isVerified);
    };

    // khoda vakili alireza ro .....
    const calculateRateAverage = (rateslist) => {
        setNumberOfRates(rateslist.length);
        let ave = 0.0;
        rateslist.map((ratei) => {
            ave = ave + ratei.rateNum;
        });
        setRate(rateslist.length == 0 ? 0 : (ave/rateslist.length).toFixed(2));
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessToken();
            const url = BASE_API_ROUTE + `Lawyer/GetLawyerById?lawyerId=${LawyerId}`;
            try {
                const response = await axios.get(url);
                // console.log('response in getting laywer data : ',response);
                handleInitializerWithAPI(response.data.data);
                setLawyerUserId(response.data.data.user.id);
            } catch (error) {
                console.log('error in getting lawyer data : ',error);
            }
            if(token){
                setWatcherUserId(jwt(token).uid);
                const urlRate = BASE_API_ROUTE + `Rate/GetAllRates?lawyer_id=${LawyerId}`;
                try {
                    const responseRate = await axios.get(urlRate, {headers: {Authorization: `Bearer ${token}`}});
                    // console.log('response in getting laywer rates : ',responseRate);
                    setRatesList(responseRate.data);
                    calculateRateAverage(responseRate.data);
                } catch (error) {
                    if(error.response.data.Message != 'NO RATES FOUND!'){
                        console.log('error in getting lawyer rates : ',error);
                    }
                }
            }
        };
        fetchData();
    }, []);

    const handleChatStart = async () => {
        const token = await getAccessToken();
        if(!token){
            console.log('login required');
            navigate("/Login");
        }
        else{
            const url = BASE_API_ROUTE + `Chat/StartChat?recieverUserId=${lawyerUserId}`;
            try { 
                const response = await axios.post(url,'', {headers: {Authorization: `Bearer ${token}`}});
                // console.log('response in starting chat : ', response);
                navigate("/chatPage");
            } catch (error) {
                console.log('error in starting chat : ', error);
            }
        }
    };

    const handleSendCase = () => {
        navigate(`/show-cases/choose_${LawyerId}`);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
    }));

    return (
    <>
    <Helmet>
        <title>پروفایل عمومی وکیل</title>
    </Helmet>
    <ThemeProvider theme={theme}>
    <CacheProvider value={cacheRtl}>
    <Stack spacing={5} maxWidth="100%" margin={2}>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid sx={{backgroundImage:`url(${profileBackgroundPicture?profileBackgroundPicture:dlpbp})`,
            backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
                        <Avatar alt="lawyer profile" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
                    </StyledBadge>
                </CardContent>
            </Grid>
            <Grid sx={{ border: "none", boxShadow: "none" }} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <Typography sx={{fontFamily:"shabnam"}}>{name}</Typography>
                    <Typography sx={{fontFamily:"shabnam"}}>{title}</Typography>
                    <Rating dir="rtl" name="lawyer rating" value={rate} precision={0.05} readOnly/>
                    <Typography sx={{fontSize:"12px", fontFamily:"shabnam"}}> میانگین امتیاز {rate} بر اساس {numberOfRates} نظر </Typography>
                </CardContent>
            </Grid>
            <Grid sx={{ border: "none", boxShadow: "none" }} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <Grid container direction={'column'}>
                        <Button disabled={!(refUserRole.current == "User" && watcherUserId != lawyerUserId)}
                        variant="contained" onClick={handleChatStart} sx={{fontFamily:"shabnam", mb:'10px'}}>
                            درخواست چت آنلاین</Button>
                        <Button disabled={!(refUserRole.current == "User" && watcherUserId != lawyerUserId)}
                        variant="contained" onClick={handleSendCase} sx={{fontFamily:"shabnam"}}>
                            ارسال پرونده</Button>
                    </Grid>
                </CardContent>
            </Grid>
        </Grid>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid item component={Card} sm>
                <CardContent>
                    {isVerified && <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Verified color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تایید شده توسط وکیل پرس
                    </Typography>}
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        {gender === "مرد" ? <Male color="primary" sx={{mr:1,position:'relative',top:3}}/> : ( gender === "زن" ? <Female color="primary" sx={{mr:1,position:'relative',top:3}}/> : <><Female color="primary" sx={{mr:-1}}/><Male color="primary" sx={{mr:1,position:'relative',top:3}}/></>)}
                        جنسیت : {gender}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <CardMembership color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        عنوان : {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <LocationOn color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        شهر : {city}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Business color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        ادرس دفتر : {officeAddress}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <VerifiedUser color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        شماره پروانه : {licenseNumber}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <WorkHistory color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        سابقه کار : {yearsOfExperience} سال
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <School color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تحصیلات : {education}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Gavel color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تخصص ها  
                    </Typography>
                    {specialties.map((special,index) => <Chip key={index} dir="rtl" sx={{ m: 0.1, fontFamily:"shabnam"  }} label={special} icon={<Done/>} color="info"/>)}
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <CoPresent color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تعداد مشاوره ها : {numberOfConsultations}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <QuestionAnswer color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تعداد پاسخ ها به سوالات : {numberOfAnswers}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <ThumbUpAlt color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تعداد لایک ها : {numberOfLikes}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <FactCheck color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        تعداد پاسخ های تایید شده : {numberOfVerifies}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Percent color="primary" sx={{mr:1,position:'relative',top:3}}/>
                        درصد پاسخ های تایید شده : {numberOfAnswers!=0 ? ((numberOfVerifies/numberOfAnswers).toFixed(2))*100 : 0} %
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid container direction="column" sx={{ minWidth:215 }} display="flex" justifyContent="center" item component={Card} sm>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="QR کد وکیل"/>
                <CardMedia image={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location}&size=200x200`} sx={{ alignSelf:"center", height: 180, width: 180, mb:2 }} title="QR کد وکیل"/>
            </Grid>
            <Grid item component={Card} sm>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="درباره من"/>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam", fontSize:"15px" }} color="text.secondary">
                        {aboutMe}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid container direction="column" display="flex" sx={{ minWidth:215 }} justifyContent="center" item component={Card} sm>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ویزیت "/>
                <CardMedia image={callingCard || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 167, width: 300 }} title="کارت ویزیت"/>
                <CardContent >
                    <Grid container direction="row">
                        <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                            رزومه
                        </Typography>
                        <Typography sx={{ ml:4, fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                            <LinkMUI href={resumeLink}>دانلود رزومه</LinkMUI>
                        </Typography>
                    </Grid>
                </CardContent>
            </Grid>
        </Grid>
        <Grid container direction='column'>
            <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card}>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="نظرات کاربران"/>
            </Grid>
            {ratesList.map((ratei,index) => 
                <Grid key={index} container direction={{ xs: 'column', sm: 'row' }}>
                    <Grid display="flex" alignItems={{xs:'center',sm:"flex-start"}} justifyContent={{xs:'center',sm:"flex-start"}} item component={Card}>
                        <CardContent>
                            <Avatar alt="user profile" sx={{ width: 60, height: 60 }} srcSet={ratei.user.profileImageUrl} />
                        </CardContent>
                    </Grid>
                    <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card} sm>
                        <CardContent>
                            <Typography sx={{fontFamily:"shabnam"}}>{ratei.user.name}</Typography>
                            <Rating dir="rtl" name="user rating" value={ratei.rateNum} precision={0.5} readOnly/>
                            <Typography sx={{fontFamily:"shabnam"}}>{ratei.comment}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            )}
        </Grid>
    </Stack>
    </CacheProvider>
    </ThemeProvider>
    </> 
    );    
}
export default LawyerPage;
