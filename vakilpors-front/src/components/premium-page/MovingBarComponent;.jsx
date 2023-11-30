import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '80px',
        overflow: 'hidden',
        backgroundColor: '#394240',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    movingBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '8px',
    },
    textContainer: {
        whiteSpace: 'nowrap',
        animation: '$marquee 20s linear infinite',
        color: '#ffffff',
        textAlign: 'center',
        width: '200%',
        fontFamily: 'Vazir, sans-serif', // Use 'Vazir' font
        fontSize: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    text: {
        display: 'inline-block',
        color: 'black',
        padding: '0 10px',
    },
    '@keyframes marquee': {
        '0%': {
            transform: 'translateX(100%)',
        },
        '100%': {
            transform: 'translateX(-100%)',
        },
    },
}));

const MovingBarComponent = ({ fullText }) => {
    const classes = useStyles();
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    useEffect(() => {
        // Change background color every 3 seconds for a more dynamic effect
        const interval = setInterval(() => {
            setBackgroundColor(getRandomColor());
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    function getRandomColor() {
        const colors = [
             // Base color (gray)
            '#42A5F5', // Blue
            '#66BB6A', // Green
            '#8E24AA', // Purple
        ];

        const randomIndex = Math.floor(Math.random() * (colors.length - 1));
        return colors[randomIndex];
    }

    const initialText = fullText + ' ';

    const navigateToPage = () => {
        window.location.href = '/PremiumLawyers';
    };

    return (
        <div
            className={classes.container}
            style={{ backgroundColor: 'gray' }}
            onClick={navigateToPage}
        >
            <div className={classes.movingBar}>
                <Card>
                    <CardContent style={{ backgroundColor }}>
                        <div className={classes.textContainer}>
                            <Typography variant="h5" className={classes.text}>
                                {initialText}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MovingBarComponent;
