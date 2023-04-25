import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import { Button, Badge, styled, Avatar, Rating, Typography, Chip } from '@mui/material';
import { Stack, Grid } from "@mui/material";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import LinkMUI from '@mui/material/Link';
import {Done, Female, Male, LooksOne, LooksTwo, Looks3, CardMembership, LocationOn, 
    Business, VerifiedUser, WorkHistory, School, Gavel, CoPresent, QuestionAnswer,
    ThumbUpAlt, FactCheck, Percent } from '@mui/icons-material';
import { useParams } from "react-router-dom";

const LawyerPage = () => {

    const [profilePicture, setProfilePicture] = useState();
    const [profileBackgroundPicture, setProfileBackgroundPicture] = useState();
    const [online, setOnline] = useState(false);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState(0);
    const [numberOfRates, setNumberOfRates] = useState(0);
    const [city, setCity] = useState('');
    const [grade, setGrade] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [memberOf, setMemberOf] = useState('');
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

    const { LawyerId } = useParams();

    const handleInitializerWithAPI = (data) => {
        setAboutMe(data.aboutMe);
        setCallingCard(data.callingCardImageUrl);
        setCity(data.city);
        setEducation(data.education);
        setGrade(data.grade == 0 ? 'یک' : data.grade == 1 ? 'دو' : 'سه');
        setLicenseNumber(data.parvandeNo);
        setMemberOf(data.memberOf);
        setOfficeAddress(data.officeAddress);
        setProfilePicture(data.user.profileImageUrl);
        setRate(data.rating);
        setResumeLink(data.resumeLink);
        setSpecialties(data.specialties ? data.specialties.split('/') : []);
        setTitle(data.title);
        setYearsOfExperience(data.yearsOfExperience);
        setName(data.user.name);
        setGender(data.gender);
        setProfileBackgroundPicture(data.profileBackgroundPictureUrl);
        setNumberOfRates(data.numberOfRates);
        setNumberOfConsultations(data.numbereOfConsulations);
        setNumberOfAnswers(data.numberOfAnswers);
        setNumberOfLikes(data.numberOfLikes);
        setNumberOfVerifies(data.numberOfVerifies);
        setRatesList(data.ratesList);
        setOnline(!data.user.isActive); // not exactly the same
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = BASE_API_ROUTE + `Lawyer/GetLawyerById?lawyerId=${LawyerId}`;
            try {
                const response = await axios.get(url);
                console.log('response : ',response);
                handleInitializerWithAPI(response.data.data);
            } catch (error) {
                console.log('error : ',error);
            }
        };
        fetchData();
    }, []);

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
        <title>Lawyer Page</title>
    </Helmet>
    <Stack spacing={5} maxWidth="100%" margin={2}>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid sx={{backgroundImage:`url(${profileBackgroundPicture})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
                        <Avatar alt="lawyer profile" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
                    </StyledBadge>
                </CardContent>
            </Grid>
            <Grid sx={{ border: "none", boxShadow: "none" }} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <Typography sx={{fontFamily:"shabnam"}}>{name}</Typography>
                    <Typography sx={{fontFamily:"shabnam"}}>{title}</Typography>
                    <Rating dir="ltr" name="lawyer rating" value={rate} precision={0.5} readOnly/>
                    <Typography sx={{fontSize:"12px", fontFamily:"shabnam"}}> میانگین امتیاز {rate} بر اساس {numberOfRates} نظر </Typography>
                </CardContent>
            </Grid>
            <Grid sx={{ border: "none", boxShadow: "none" }} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <Button variant="contained" sx={{fontFamily:"shabnam"}}>درخواست چت آنلاین</Button>
                </CardContent>
            </Grid>
        </Grid>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        {gender === "مرد" ? <Male color="primary" sx={{ml:1}}/> : <Female color="primary" sx={{ml:1}}/>}
                        جنسیت : {gender}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        {grade === "یک" ? <LooksOne color="primary" sx={{ml:1}}/> : grade === "دو" ? <LooksTwo color="primary" sx={{ml:1}}/> : <Looks3 color="primary" sx={{ml:1}}/>}
                        پایه : {grade}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <CardMembership color="primary" sx={{ml:1}}/>
                        عضو : {memberOf}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <LocationOn color="primary" sx={{ml:1}}/>
                        شهر : {city}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Business color="primary" sx={{ml:1}}/>
                        ادرس دفتر : {officeAddress}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <VerifiedUser color="primary" sx={{ml:1}}/>
                        شماره پروانه : {licenseNumber}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <WorkHistory color="primary" sx={{ml:1}}/>
                        سابقه کار : {yearsOfExperience} سال
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <School color="primary" sx={{ml:1}}/>
                        تحصیلات : {education}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Gavel color="primary" sx={{ml:1}}/>
                        تخصص ها  
                    </Typography>
                    {specialties.map((special,index) => <Chip key={index} dir="ltr" sx={{ m: 0.1, fontFamily:"shabnam"  }} label={special} icon={<Done/>} color="info"/>)}
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <CoPresent color="primary" sx={{ml:1}}/>
                        تعداد مشاوره ها : {numberOfConsultations}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <QuestionAnswer color="primary" sx={{ml:1}}/>
                        تعداد پاسخ ها به سوالات : {numberOfAnswers}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <ThumbUpAlt color="primary" sx={{ml:1}}/>
                        تعداد لایک ها : {numberOfLikes}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <FactCheck color="primary" sx={{ml:1}}/>
                        تعداد پاسخ های تایید شده : {numberOfVerifies}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <Percent color="primary" sx={{ml:1}}/>
                        درصد پاسخ های تایید شده : {((numberOfVerifies/numberOfAnswers).toFixed(2))*100} %
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
                <CardMedia image={callingCard || "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"} sx={{ alignSelf:"center", height: 120, width: 215 }} title="کارت ویزیت"/>
                <CardContent >
                    <Grid container direction="row">
                        <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                            رزومه
                        </Typography>
                        <Typography sx={{ mr:4, fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
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
                            <Avatar alt="user profile" sx={{ width: 60, height: 60 }} srcSet={ratei.profilePicture} />
                        </CardContent>
                    </Grid>
                    <Grid display="flex" alignItems="flex-start" justifyContent="flex-start" item component={Card} sm>
                        <CardContent>
                            <Typography sx={{fontFamily:"shabnam"}}>{ratei.name}</Typography>
                            <Rating dir="ltr" name="user rating" value={ratei.rate} precision={0.5} readOnly/>
                            <Typography sx={{fontFamily:"shabnam"}}>{ratei.comment}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            )}
        </Grid>
    </Stack>
    </>
    );    
}
export default LawyerPage;
