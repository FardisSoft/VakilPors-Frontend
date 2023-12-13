import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    bar: {
        backgroundColor: "gray",
        height: "auto",
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        animation: "$scroll 15s linear infinite",
    },
    text: {
        color: "white",
        fontSize: "20px",
        margin: theme.spacing(1),
        whiteSpace: "nowrap",
    },
    "@keyframes scroll": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
    },
}));

function MovingTextComponent() {
    const classes = useStyles();
    const [bgColor, setBgColor] = useState("#394240");

    useEffect(() => {
        const colors = ["#42A5F5", "#66BB6A", "#8E24AA", "#FF7043", "#AB47BC", "#7E57C2"];
        let i = 0;
        const colorInterval = setInterval(() => {
            setBgColor(colors[i]);
            i = (i + 1) % colors.length;
        }, 2000); // Change color every 2 seconds

        return () => clearInterval(colorInterval);
    }, []);

    const text = 'استفاده از برنامه پریمیوم هفتگی به شما این امکان را می‌دهد که به طور مداوم با مشتریان جدید ارتباط برقرار کنید. با قیمت مقرون به صرفه و امکانات منحصر به فرد، کسب و کار شما در نتایج جستجو و بخش‌های پیشنهادی به چشم می‌خورد.';

    return (
        <Link to="/PremiumLawyers">
        <AppBar position="static" className={classes.bar} style={{ backgroundColor: bgColor }}>
            <Toolbar className={classes.content}>
                <Typography variant="h6" className={classes.text}>
                    {text}
                </Typography>
            </Toolbar>
        </AppBar>
        </Link>
    );
}

export default MovingTextComponent;
