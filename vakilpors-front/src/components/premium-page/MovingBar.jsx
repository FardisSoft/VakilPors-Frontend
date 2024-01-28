import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Fullscreen } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    bar: {
        height: "70px",
        width: '100%',
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        overflow: "hidden",
    },
    textContainer: {
        background: "#394240",
        padding: theme.spacing(2),
        borderRadius: "20px",
    },
    text: {
        color: "white",
        fontSize: "20px",
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: '9px',
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
        }, 2000);

        return () => clearInterval(colorInterval);
    }, []);

    // const text = 'استفاده از برنامه هفتگی پریمیوم به شما این امکان را می‌دهد که به طور مداوم با مشتریان جدید ارتباط برقرار کنید. با قیمت مقرون به صرفه ، کسب و کار شما در نتایج جستجو و بخش‌های پیشنهادی بیشتر به چشم می‌خورد.';
    const text = '';
    return (
        <Link to="/PremiumLawyers">
            <AppBar position="static" className={classes.bar} style={{ backgroundColor: bgColor }}>
                <Toolbar className={classes.content}>
                    <Paper className={classes.textContainer} style={{ backgroundColor: bgColor }}>
                        <Typography variant="h6" className={classes.text}>
                            {text}
                        </Typography>
                    </Paper>
                </Toolbar>
            </AppBar>
        </Link>
    );
}

export default MovingTextComponent;