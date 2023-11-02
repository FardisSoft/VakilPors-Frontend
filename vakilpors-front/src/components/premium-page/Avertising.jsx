import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Box, IconButton, CircularProgress } from '@mui/material';
import Rating from '@material-ui/lab/Rating';
// import LawyerCard from './LaweyerCard';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { Link } from 'react-router-dom';

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

const LawyerCard = ({ lawyer }) => (
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
        <Avatar alt={lawyer.name} src={lawyer.profileImageUrl} sx={{ width: 80, height: 80, borderRadius: '0%' }} />
        <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{lawyer.name}</Typography>
            <Typography variant="body2">Title: {lawyer.title ? lawyer.title : "وکیل"}</Typography>
            <Typography variant="body2">License Number: {lawyer.licenseNumber}</Typography>
            <Typography variant="body2">Description: {lawyer.aboutMe}</Typography>
            <ThemeProvider theme={theme}>
                <CacheProvider value={cacheRtl}>
                    <Rating name="read-only" value={lawyer.rating} readOnly />
                </CacheProvider>
            </ThemeProvider>
            <p></p>
            <Link to={`/LawyerPage/${lawyer.id}`} style={{ color: 'darkblue' }}>View Profile</Link> {/* Set the link color to blue */}
        </Box>
    </Box>
);

const Advertising = ({ lawyers }) => {
    const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);
    console.log(lawyers);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLawyerIndex((prevIndex) => (prevIndex + 1) % lawyers.length);
        }, 3000); // Change lawyer every 3 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, [lawyers.length]);

    return (
        <Paper sx={{
            p: 2,
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'darkcyan', // Set the background color to gray
        }}>
            {lawyers.length > 0 ?  (
                <LawyerCard lawyer={lawyers[currentLawyerIndex]} />
            ) : (
                <CircularProgress style={{color: 'white' }}/> // Show loading spinner if lawyers are still being fetched
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
                {lawyers.map((lawyer, index) => (
                    <IconButton key={index} onClick={() => setCurrentLawyerIndex(index)} color={index === currentLawyerIndex ? "primary" : "default"}>
                        <span style={{ fontSize: '1.5em' }}>•</span>
                    </IconButton>
                ))}
            </Box>
        </Paper>
    );
};

export default Advertising;
