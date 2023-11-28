import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '80px', // Adjust the height as needed
        overflow: 'hidden',
        backgroundColor: '#394240', // Replace with your desired background color
        borderRadius: '8px',
    },
    movingBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'gray', // Replace with your desired bar color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        overflow: 'hidden', // Hide content that overflows
        borderRadius: '8px',
    },
    textContainer: {
        whiteSpace: 'nowrap', // Prevent text from wrapping
        animation: '$marquee 40s linear infinite', // Adjust the animation duration for slower movement
        color: '#ffffff', // Replace with your desired text color
        textAlign: 'center',
        width: '200%', // Double the width for continuous scrolling effect
        fontFamily: 'Shabnam, sans-serif', // Use Shabnam font
    },
    text: {
        display: 'inline-block',
        color:'black',
        padding: '0 10px', // Add padding for better visibility
        fontSize: '18px', // Adjust the font size as needed
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

const MovingBarComponent = () => {
    const classes = useStyles();
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    useEffect(() => {
        // Change background color every 3 seconds for a more dynamic effect
        const interval = setInterval(() => {
            setBackgroundColor(getRandomColor());
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    function getRandomColor() {
        const colors = ['#FF8A65', '#90A4AE', '#FFD54F', '#81C784']; // Add your desired vibrant colors
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const fullText =
        'استفاده از برنامه پریمیوم هفتگی به شما این امکان را می‌دهد که به طور مداوم با مشتریان جدید ارتباط برقرار کنید. با قیمت مقرون به صرفه و امکانات منحصر به فرد، کسب و کار شما در نتایج جستجو و بخش‌های پیشنهادی به چشم می‌خورد. این برنامه امکاناتی همچون قرار دادن لیست ویژه، نمایش تبلیغات در صفحات با ترافیک بالا، گزارش تحلیلی از کلیک‌ها و تاثیرات، و خلاقیت‌های سفارشی برای تبلیغات موثر را فراهم می‌کند.' +

        'هر روز با مشتریان محلی در تماس بودن نقش اساسی در رشد کسب و کار شما دارد. با برنامه روزانه، لیست کسب و کار شما به مدت 24 ساعت در سایت ما به صورت برجسته نمایش داده می‌شود، تا به حداکثر دیده شدن برسد. این فرصت را از دست ندهید و از تبلیغات روزانه برای جذب مشتریان جدید بهره مند شوید. این برنامه همچنین از امکاناتی همچون قرار دادن لیست ویژه، نمایش تبلیغات در صفحات با ترافیک بالا، گزارش تحلیلی از کلیک‌ها و تاثیرات، و خلاقیت‌های سفارشی برای تبلیغات موثر بهره می‌برد.';
    const initialText = fullText + ' '; // Add an extra space for a smoother transition

    // Use Link component for navigation
    const navigateToPage = () => {
        // Replace '/PremiumLawyers' with your desired page URL
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
