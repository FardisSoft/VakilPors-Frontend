import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Box, IconButton, CircularProgress, Button } from '@mui/material';
import Rating from '@material-ui/lab/Rating';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { useNavigate } from "react-router-dom";

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


const LawyerCard = ({ lawyer }) => {
    const navigate = useNavigate();
    const shortDescription = lawyer.aboutMe.split(' ').slice(0, 30).join(' ');
    if (!lawyer) {
        return null; // or some fallback UI
    }
    else{
        return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            m: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'gray', // Set the background color to brown
            color: 'white', // Set the text color to blue
            width: '100%', // Take up full width
            height: 190, // Increase height by 20 pixels
        }}>
            <Avatar alt={lawyer.name} src={lawyer.profileImageUrl} sx={{ width: 85, height: 90, borderRadius: '0%' }} />
            <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{lawyer.user.name}</Typography>
                <Typography variant="body2">عنوان: {lawyer.title ? lawyer.title : "وکیل"}</Typography>
                <Typography variant="body2">شماره پرونده وکالت: {lawyer.licenseNumber}</Typography>
                <Typography variant="body2">توضیحات: {shortDescription}...
                <p></p>
                <Button onClick={() => navigate(`/LawyerPage/${lawyer.id}`)}  style={{ color: 'darkblue' }}>بیشتر</Button> {/* Set the link color to blue */}
                </Typography>
                <ThemeProvider theme={theme}>
                    <CacheProvider value={cacheRtl}>
                        <Rating name="read-only" value={lawyer.rating} readOnly />
                    </CacheProvider>
                </ThemeProvider>
                {/* assax */}
                
            </Box>
        </Box>
    );}

    // Rest of your LawyerCard component...
};

const Advertising = ({ lawyers }) => {
    const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (lawyers.length > 0) {
            const interval = setInterval(() => {
                setCurrentLawyerIndex((prevIndex) => (prevIndex + 1) % lawyers.length);
            }, 3000);

            setIsLoading(false); // Data is loaded
            return () => clearInterval(interval);
        }
    }, [lawyers]);

    return (
        <Paper sx={{
            p: 2,
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'darkcyan',
        }}>
            {isLoading ? (
                <CircularProgress style={{ color: 'white' }} />
            ) : (
                <>
                    {currentLawyerIndex < lawyers.length ? (
                        <LawyerCard lawyer={lawyers[currentLawyerIndex]} />
                    ) : (
                        <p>No lawyers to display</p>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
                        {lawyers.map((lawyer, index) => (
                            <IconButton key={index} onClick={() => setCurrentLawyerIndex(index)} color={index === currentLawyerIndex ? "primary" : "default"}>
                                <span style={{ fontSize: '1.5em' }}>•</span>
                            </IconButton>
                        ))}
                    </Box>
                </>
            )}
        </Paper>
    );
};


export default Advertising;
