import React from 'react';
import { Box, Typography, Avatar, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

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
        backgroundColor: '#8B4513', // Set the background color to brown
        color: '#87CEFA', // Set the text color to blue
        width: '100%', // Take up full width
        height: 190, // Increase height by 20 pixels
    }}>
        <Avatar alt={lawyer.user.name} src={lawyer.profileImageUrl} sx={{ width: 80, height: 80, borderRadius: '0%' }} />
        <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{lawyer.user.name}</Typography>
            <Typography variant="body2">Title: {lawyer.title ? lawyer.title : "وکیل"}</Typography>
            <Typography variant="body2">License Number: {lawyer.licenseNumber}</Typography>
            <Typography variant="body2">Description: {lawyer.aboutMe}</Typography>
            <ThemeProvider theme={theme}>
                <CacheProvider value={cacheRtl}>
                    <Rating name="read-only" value={lawyer.rating} readOnly />
                </CacheProvider>
            </ThemeProvider>
            <p></p>
            <Link to={`/LawyerPage/${lawyer.id}`} style={{ color: '#87CEFA' }}>View Profile</Link> {/* Set the link color to blue */}
        </Box>
    </Box>
);

export default LawyerCard;
