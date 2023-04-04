import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import useApiRequestsTokenHandler from "../services/useApiRequestsTokenHandler";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import pic1 from './g1.jpg';
import pic2 from '../css/lawyer.jpg';
import pic3 from './g2.jpg';
import { Box, Grid } from "@mui/material";
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import LinkMUI from '@mui/material/Link';
import DoneIcon from '@mui/icons-material/Done';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import GavelIcon from '@mui/icons-material/Gavel';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PercentIcon from '@mui/icons-material/Percent';


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


    const handleInitializer = () => {
        setProfilePicture(pic1);
        setProfileBackgroundPicture(pic2);
        setOnline(true);
        setName("فلان فلانی");
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
        setAboutMe('سلام من فلان هستم و فلان و فلان جا درس خواندم و فلان جا کار کردم و رو دست من نیومده.')
        setCallingCard(pic3);
        setResumeLink("https://s29.picofile.com/file/8461773392/resume1.pdf.html");
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
        <title>Lawyer Page</title>
    </Helmet>
    <Stack spacing={5} maxWidth="100%">
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid sx={{backgroundImage:`url(${profileBackgroundPicture})`}} display="flex" alignItems="center" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
                        <Avatar alt="Remy Sharp" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
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
                        {gender === "مرد" ? <MaleIcon color="primary" sx={{ml:1}}/> : <FemaleIcon color="primary" sx={{ml:1}}/>}
                        جنسیت : {gender}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        {grade === "یک" ? <LooksOneIcon color="primary" sx={{ml:1}}/> : grade === "دو" ? <LooksTwoIcon color="primary" sx={{ml:1}}/> : <Looks3Icon color="primary" sx={{ml:1}}/>}
                        پایه : {grade}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <CardMembershipIcon color="primary" sx={{ml:1}}/>
                        عضو : {memberOf}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <LocationOnIcon color="primary" sx={{ml:1}}/>
                        شهر : {city}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <BusinessIcon color="primary" sx={{ml:1}}/>
                        ادرس دفتر : {officeAddress}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <VerifiedUserIcon color="primary" sx={{ml:1}}/>
                        شماره پروانه : {licenseNumber}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <WorkHistoryIcon color="primary" sx={{ml:1}}/>
                        سابقه کار : {yearsOfExperience} سال
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <SchoolIcon color="primary" sx={{ml:1}}/>
                        تحصیلات : {education}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <GavelIcon color="primary" sx={{ml:1}}/>
                        تخصص ها  
                    </Typography>
                    {specialties.map((special,index) => <Chip key={index} dir="ltr" sx={{ m: 0.1, fontFamily:"shabnam"  }} label={special} icon={<DoneIcon/>} color="info"/>)}
                </CardContent>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam" }} color="text.secondary">
                        <CoPresentIcon color="primary" sx={{ml:1}}/>
                        تعداد مشاوره ها : {numberOfConsultations}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <QuestionAnswerIcon color="primary" sx={{ml:1}}/>
                        تعداد پاسخ ها به سوالات : {numberOfAnswers}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <ThumbUpAltIcon color="primary" sx={{ml:1}}/>
                        تعداد لایک ها : {numberOfLikes}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <FactCheckIcon color="primary" sx={{ml:1}}/>
                        تعداد پاسخ های تایید شده : {numberOfVerifies}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam"  }} color="text.secondary">
                        <PercentIcon color="primary" sx={{ml:1}}/>
                        درصد پاسخ های تایید شده : {((numberOfVerifies/numberOfAnswers).toFixed(2))*100} %
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
        <Grid container direction={{ xs: 'column', sm: 'row' }} alignItems="stretch">
            <Grid container direction="column" sx={{ minWidth:215 }} display="flex" justifyContent="center" item component={Card} sm>
                <CardContent>
                    <Typography sx={{ alignSelf:"flex-start", m:0, fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                        QR کد وکیل
                    </Typography>
                </CardContent>
                <CardMedia image={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location}&size=200x200`} sx={{ alignSelf:"center", height: 215, width: 215 }} title="QR کد وکیل"/>
            </Grid>
            <Grid item component={Card} sm>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                        درباره من
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontFamily:"shabnam", fontSize:"15px" }} color="text.secondary">
                        {aboutMe}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid container direction="column" display="flex" sx={{ minWidth:215 }} justifyContent="center" item component={Card} sm>
                <CardContent >
                    <Typography sx={{ alignSelf:"flex-start", m: 0, fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
                        کارت ویزیت
                    </Typography>
                </CardContent>
                <CardMedia image={callingCard} sx={{ alignSelf:"center", height: 120, width: 215 }} title="کارت ویزیت"/>
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
        <Stack>
            <Button variant="contained" onClick={handleInitializer}>initialize parameters</Button>
        </Stack>
    </Stack>
    </>
    );    
}
export default LawyerPage;
