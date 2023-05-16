import React from 'react';
import { Link } from "react-router-dom";
import { Box, Grid, Container, Typography } from '@mui/material';
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

  const classes = useStyles();

  return (
    <footer style={{backgroundColor: 'rgb(25,118,210)'}}>
      <Container maxWidth="lg">
        <Grid py={1} display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
          <img src={logo} style={{width:'80px',height:'80px'}}/>
          <Typography>Fardis Soft</Typography>
          <Box component="nav" className={classes.footerNav}>
            <Link to={'/'} className={classes.footerLink}>صفحه اصلی</Link>
            <Link to={'/Policy'} className={classes.footerLink}>شرایط سایت</Link>
            <Link to={'/contactUs'} className={classes.footerLink}>تماس با ما</Link>
          </Box>
          <Typography fontFamily={'shabnam'} color="textSecondary" component="p" variant="caption" gutterBottom={false}>تمامی حقوق برای Fardis Soft محفوظ است.</Typography>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;