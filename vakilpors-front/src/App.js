import { Helmet } from 'react-helmet-async';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: 'url("/assests/image/landing_page.jpeg")', // replace with your own image file path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(12, 0, 8),
    boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 0, 6),
    },
  },
  title: {
    fontWeight: 700,
    color: '#fff',
    textShadow: '2px 2px #000',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },
  subtitle: {
    color: '#fff',
    textShadow: '2px 2px #000',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  button: {
    marginRight: theme.spacing(2),
    textTransform: 'none',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();
}
const App = () => {
  return (
    <>
      <Helmet>
        <title>Vakil Pors</title>
      </Helmet>
      <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h2" align="center" className={classes.title}>
            Find the Right Lawyer for Your Needs
          </Typography>
          <Typography variant="h5" align="center" className={classes.subtitle}>
            Connect with the top lawyers in your area
          </Typography>
          <Grid container justify="center">
            <Button variant="contained" color="primary" className={classes.button}>
              Browse Lawyers
            </Button>
            <Button variant="outlined" color="primary" className={classes.button}>
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </>
  );
}

export default App;
