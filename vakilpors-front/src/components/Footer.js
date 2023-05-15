import { HomeOutlined, } from "@mui/icons-material";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Container } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../assests/images/logoFS.jpg';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    }
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    }
  },
}));

const Footer = () => {

  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <footer style={{backgroundColor: 'rgb(25,118,210)'}}>
      <Container maxWidth="lg">
        <Grid py={1} display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
          <Link href="#" color="inherit" underline="none">
            <img src={logo} style={{width:'80px',height:'80px'}}/>
            Fardis Soft
          </Link>
          <Box component="nav" className={classes.footerNav}>
            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>صفحه اصلی</Link>
            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>شرایط سایت</Link>
            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>تماس با ما</Link>
          </Box>
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>تمامی حقوق برای فردیس سافت محفوظ است.</Typography>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;