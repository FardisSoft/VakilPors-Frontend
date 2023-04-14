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
import useStateRef from 'react-usestateref';

import pic1 from '../assests/images/profileTest.jpg';
import pic2 from '../assests/images/lawyer.jpg';
import pic3 from '../assests/images/callingCardTest.jpg';

const LawyerPage = () => {

    const [profilePicture, setProfilePicture, refProfilePicture] = useStateRef();
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


    const handleInitializer = () => {
        setProfilePicture(pic1);
        setProfileBackgroundPicture(pic2);
        setOnline(true);
        setName("موسی صالحی");
        setTitle("وکیل پایه یک مرکز وکلای قوه‌قضاییه");
        setRate(4.5);
        setNumberOfRates(100);
        setCity('تهران - تهران');
        setGrade('یک');
        setLicenseNumber(12345);
        setMemberOf('کانون وکلای قوه قضائیه');
        setSpecialties(['خانواده', 'مواد مخدر', 'املاک']);
        setYearsOfExperience(3);
        setGender('مرد');
        setEducation('کارشناسی حقوق');
        setOfficeAddress('تهران - دانشگاه علم و صنعت - دانشکده کامپیوتر');
        setNumberOfConsultations(120);
        setNumberOfAnswers(350);
        setNumberOfLikes(580);
        setNumberOfVerifies(290);
        setAboutMe('سلام من فلانی هستم و فلان جا درس خواندم و فلان جا کار کردم.')
        setCallingCard(pic3);
        setResumeLink("https://s29.picofile.com/file/8461773392/resume1.pdf.html");
        setRatesList([
            { profilePicture:pic1, name:"محمد", rate:0, comment:"بسیار بد" },
            { profilePicture:pic2, name:"ali", rate:3.5, comment:"khoob bood" },
            { profilePicture:pic3, name:"رضا", rate:1, comment:"عدم پاسخ گویی" }
        ]);
    };

    const handleInitializerWithAPI = (data) => {
        setAboutMe(data.aboutMe);
        setCallingCard(data.callingCardImageUrl);
        setCity(data.city);
        setEducation(data.education);
        setGrade(data.grade == 0 ? 'یک' : data.grade == 1 ? 'دو' : 'سه');
        setLicenseNumber(data.licenseNumber);
        setMemberOf(data.memberOf);
        setOfficeAddress(data.officeAddress);
        setProfilePicture(data.user.profileImageUrl);
        setRate(data.rating);
        setResumeLink(data.resumeLink);
        setSpecialties(data.specialties.split('/'));
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
        setOnline(data.user.isActive); // not exactly the same
    };

    useEffect(() => {
        const fetchData = async () => {
            const respons = await fetch('../assests/images/profileTest.jpg');
            const blob = await respons.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                // setProfilePicture("data:image/jpg;base64,"+"PCFET0NUWVBFIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiIgZGlyPSJydGwiPg0KICA8aGVhZD4NCiAgICA8bWV0YSBjaGFyc2V0PSJ1dGYtOCIgLz4NCiAgICA8bGluayByZWw9Imljb24iIGhyZWY9Ii9mYXZpY29uLmljbyIgLz4NCiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEiIC8+DQogICAgPG1ldGEgbmFtZT0idGhlbWUtY29sb3IiIGNvbnRlbnQ9IiMwMDAwMDAiIC8+DQogICAgPG1ldGENCiAgICAgIG5hbWU9ImRlc2NyaXB0aW9uIg0KICAgICAgY29udGVudD0iV2ViIHNpdGUgY3JlYXRlZCB1c2luZyBjcmVhdGUtcmVhY3QtYXBwIg0KICAgIC8+DQogICAgPGxpbmsgcmVsPSJhcHBsZS10b3VjaC1pY29uIiBocmVmPSIvbG9nbzE5Mi5wbmciIC8+DQogICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSIuL2Nzcy9ib290c3RyYXAubWluLmNzcyIgLz4NCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Ii4vY3NzL2Jvb3RzdHJhcC5ydGwubWluLmNzcyIgLz4NCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Ii4vY3NzL2Jvb3RzdHJhcC5ydGwubWluLmpzIiAvPg0KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iLi9jc3MvZm9udHN0eWxlcy5jc3MiIC8+DQogICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSIuL2Nzcy9saW5lLWF3ZXNvbWUuY3NzIiAvPg0KICAgIDxsaW5rIHJlbD0ibWFuaWZlc3QiIGhyZWY9Ii9tYW5pZmVzdC5qc29uIiAvPg0KDQogICAgPHRpdGxlPlJlYWN0IEFwcDwvdGl0bGU+DQogIDxzY3JpcHQgZGVmZXIgc3JjPSIvc3RhdGljL2pzL2J1bmRsZS5qcyI+PC9zY3JpcHQ+PC9oZWFkPg0KICA8Ym9keT4NCiAgICA8bm9zY3JpcHQ+WW91IG5lZWQgdG8gZW5hYmxlIEphdmFTY3JpcHQgdG8gcnVuIHRoaXMgYXBwLjwvbm9zY3JpcHQ+DQogICAgPGRpdiBpZD0icm9vdCI+PC9kaXY+DQogIDwvYm9keT4NCjwvaHRtbD4NCg==");
                // setProfilePicture("data:image/jpeg;base64,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");
                console.log(refProfilePicture.current);
            };
            const url = BASE_API_ROUTE + `Lawyer/GetLawyerById?lawyerId=${3}`;
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
            <Grid sx={{backgroundImage:`url(${profileBackgroundPicture})`}} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
                        <Avatar alt="lawyer profile" sx={{ width: 60, height: 60 }} srcSet={refProfilePicture.current} />
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
                    <Button variant="contained">درخواست چت آنلاین</Button>
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
        {/* <Stack>
            <Button variant="contained" onClick={handleInitializer}>initialize parameters</Button>
        </Stack> */}
    </Stack>
    </>
    );    
}
export default LawyerPage;
