import React from 'react';
import { Container, Typography, Button, Card, CardContent, Grid, Paper, Avatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './css/Advertising.css';

const LawyerCard = ({ lawyer }) => (
    <Card>
        <CardContent>
            <Avatar alt={lawyer.name} src={lawyer.image} />
            <Typography variant="h5">{lawyer.name}</Typography>
            <Rating name="read-only" value={lawyer.rating} readOnly />
            <Typography variant="body1">{lawyer.description}</Typography>
            <Typography variant="body2">Number of Wins: {lawyer.wins}</Typography>
            <Button variant="contained" color="primary">
                Contact
            </Button>
        </CardContent>
    </Card>
);

const AdvertisingPage = () => {
    const lawyers = [
        { name: 'Lawyer 1', description: 'Specializes in corporate law.', image: '/path/to/image1.jpg', rating: 4, wins: 100 },
        { name: 'Lawyer 2', description: 'Expert in criminal law.', image: '/path/to/image2.jpg', rating: 5, wins: 150 },
        // Add more lawyers here...
    ];

    return (
        <div className="root">
            <Container>
                <Typography variant="h4">Meet our Lawyers</Typography>
                <Grid container spacing={3}>
                    {lawyers.map((lawyer) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <LawyerCard key={lawyer.name} lawyer={lawyer} />
                        </Grid>
                    ))}
                </Grid>
                <Paper className="paper">
                    <Typography variant="h6">Advertise Here</Typography>
                </Paper>
            </Container>
        </div>
    );
};

export default AdvertisingPage;
