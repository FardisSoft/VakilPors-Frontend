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
import { Box, Grid } from "@mui/material";
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const LawyerPage = () => {

    const [profilePicture, setProfilePicture] = useState();
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

    const handleInitializer = () => {
        setProfilePicture(pic1);
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
        <Stack>
            <Box sx={{height: 30}}></Box>
        </Stack>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid>
                <Box sx={{ width: 20 }}></Box>
            </Grid>
            <Grid>
                <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
                    <Avatar alt="Remy Sharp" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
                </StyledBadge>
            </Grid>
            <Grid>
                <Box sx={{ width: 10 }}></Box>
            </Grid>
            <Grid>
                <p>{name}</p>
                <p>{title}</p>
                <Rating dir="ltr" name="lawyer rating" value={rate} precision={0.5} readOnly/>
                <span style={{display:"inline !important", fontSize:"12px", fontFamily:"shabnam", position:"relative", top:"-7px"}}> میانگین امتیاز {rate} بر اساس {numberOfRates} نظر </span>
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid>
                <Button variant="contained">درخواست چت آنلاین</Button>
            </Grid>
            <Grid>
                <Box sx={{ width: 50 }}></Box>
            </Grid>
        </Grid>
        <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Stack direction="column"  alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 1, sm: 2, md: 3 }}>
                <p>شهر : {city}</p>
                <p>پایه {grade}</p>
                <p>شماره پروانه : {licenseNumber}</p>
                <p>عضو : {memberOf}</p>
                <p>ادرس دفتر : {officeAddress}</p>
            </Stack>
            <Divider/>
            <Stack direction="column"  alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 1, sm: 2, md: 3 }}>
                <p>جنسیت : {gender}</p>
                <p>سابقه کار : {yearsOfExperience} سال</p>
                <p>تحصیلات : {education}</p>
                <p>تخصص ها : </p>
                <ul>
                    {specialties.map((special) => <li>{special}</li>)}
                </ul>
            </Stack>
            <Divider/>
            <Stack direction="column"  alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 1, sm: 2, md: 3 }}>
                <p>تعداد مشاوره ها : {numberOfConsultations}</p>
                <p>تعداد پاسخ ها به سوالات : {numberOfAnswers}</p>
                <p>تعداد لایک ها : {numberOfLikes}</p>
                <p>تعداد پاسخ های تایید شده : {numberOfVerifies}</p>
                <p>نسبت پاسخ های تایید شده به کل پاسخ ها : {numberOfVerifies/numberOfAnswers}</p>
            </Stack>
        </Stack>
        <Stack>
            <Button variant="contained" onClick={handleInitializer}>initialize parameters</Button>
        </Stack>
    </Stack>
    </>
    );    
}
export default LawyerPage;
