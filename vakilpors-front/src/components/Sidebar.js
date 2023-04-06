import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Badge, Avatar, Grid } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';

import pic1 from '../assests/images/profileTest.jpg';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open',})
(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const Sidebar = (props) => {

  const links = [
    {name:'صفحه اصلی', icon:HomeOutlinedIcon, url:'/'},
    {name:'پروفایل شخصی', icon:ManageAccountsOutlinedIcon, url:'/'},
    {name:'پروفایل عمومی', icon:AccountCircleOutlinedIcon, url:'/LawyerPage'},
    {name:'جست و جوی وکیل', icon:PersonSearchOutlinedIcon, url:'/'},
    {name:'فروم', icon:ForumOutlinedIcon, url:'/'},
    {name:'شرایط سایت', icon:PolicyOutlinedIcon, url:'/Policy'},
    {name:'تماس با ما', icon:CallOutlinedIcon, url:'/'},
    {name:'ثبت نام', icon:AppRegistrationOutlinedIcon, url:'/Register'},
    {name:'ورود', icon:LoginOutlinedIcon, url:'/Login'},
    {name:'خروج از حساب', icon:LogoutOutlinedIcon, url:'/'}
  ];

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(pic1);
  const [online, setOnline] = useState(true);
  const [name, setName] = useState('فلان فلانی');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} sx={{ ...(open && { display: 'none' }) }}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap sx={{mr:5, fontFamily:"shabnam"}} component="div">
            وکیل پرس
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="persistent" anchor="right" open={open} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {width: drawerWidth,},}}>
        <DrawerHeader>
          <IconButton sx={{pr:23.5, borderRadius:2, backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}}} onClick={handleDrawerClose}>
            {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
            <ChevronRightIcon sx={{color:"white"}} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Grid container direction="column" display="flex" alignItems="center" justifyContent="center" sx={{mt:2,mb:2}}>
          <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
            <Avatar alt="profile picture" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
          </StyledBadge>
          <Typography sx={{fontFamily:"shabnam", mt:1}}>{name}</Typography>
        </Grid>
        <Divider />
        <List>
          {links.map((linki,index) => (
            <ListItem key={index} component={Link} to={linki.url} disablePadding>
              <ListItemButton sx={props.pageName === linki.name && {backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}}}>
                <ListItemIcon>
                  <linki.icon color="primary" sx={props.pageName === linki.name && {color:"white"}} />
                </ListItemIcon>
                <Typography fontFamily="shabnam" sx={props.pageName === linki.name && {color:"white"}} >{linki.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main>
        <DrawerHeader/>
        <props.component/>
      </Main>
    </Box>
  );
}

export default Sidebar;