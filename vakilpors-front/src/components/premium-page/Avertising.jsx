import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Box } from '@mui/material';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import useLawyerShowSearch from '../Lawyer-search-page/useLawyerShowSearch'; // Adjust the path to your hook file
import { BASE_API_ROUTE } from '../../Constants';

const LawyerCard = ({ lawyer }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'rgb(64,64,64)', // Set the background color to brown
        width: 300, // Set the width
        height: 240, // Set the height
    }}>
        <Avatar alt={lawyer.user.name} src={lawyer.user.profileImageUrl} sx={{ width: 100, height: 100, borderRadius: '0%' }} />
        <Typography variant="h6">{lawyer.user.name}</Typography>
        <Rating name="read-only" value={lawyer.user.rating} readOnly />
        <Typography variant="body1">{lawyer.user.bio}</Typography>
        <Typography variant="body2">Job: {lawyer.user.job}</Typography>
    </Box>
);

const Advertising = () => {
    const Pagenumber = 1; // Set your desired page number
    const Pagesize = 5; // Only fetch the first 5 lawyers
    const sort = "Grade"; // Set your desired sort parameter
    const click = true; // Set your desired click state

    const { lawyerdetail1, loading, error, hasMore } = useLawyerShowSearch(Pagenumber, Pagesize, sort, click);
    const [premiumLawyers, setPremiumLawyers] = useState([]);
    const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);

    useEffect(() => {
        console.log('Fetched lawyers:', lawyerdetail1); // Log the fetched lawyers

        const fetchPremiumStatus = async (lawyer) => {
            try {
                const response = await axios.get(`${BASE_API_ROUTE}Premium/GetSubscriptionStatus?lawyerId=${lawyer.id}`);
                console.log('Premium status response:', response); // Log the response
                return response.data.isPremium; // Assuming this returns a boolean
            } catch (error) {
                console.error('Failed to fetch premium status:', error);
            }
        };

        const updatePremiumLawyers = async () => {
            const newPremiumLawyers = [];

            for (const lawyer of lawyerdetail1) {
                if (await fetchPremiumStatus(lawyer)) {
                    newPremiumLawyers.push(lawyer);
                }
            }

            console.log('New premium lawyers:', newPremiumLawyers); // Log the new premium lawyers
            setPremiumLawyers(newPremiumLawyers);
        };

        updatePremiumLawyers();
    }, [lawyerdetail1]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLawyerIndex((prevIndex) => (prevIndex + 1) % premiumLawyers.length);
        }, 3000); // Change lawyer every 3 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, [premiumLawyers.length]);

    return (
        <Paper sx={{
            p: 2,
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'gray', // Set the background color to gray
        }}>
            {premiumLawyers.length > 0 && <LawyerCard lawyer={premiumLawyers[currentLawyerIndex]} />}
        </Paper>
    );
};

export default Advertising;
//dasduisg