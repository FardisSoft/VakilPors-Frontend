import { HomeOutlined, PersonSearchOutlined, ForumOutlined, PolicyOutlined, AppRegistrationOutlined,
       LoginOutlined, LogoutOutlined, ManageAccountsOutlined, AccountCircleOutlined, CallOutlined,
       Menu, ChevronRight } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Box, Divider, Grid, Drawer } from '@mui/material';
import { Badge, Avatar, Typography, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { List, ListItem, ListItemButton, IconButton, ListItemIcon } from '@mui/material';
import { useAuth } from "../services/AuthProvider";

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

  const { refUserRole } = useAuth();
  let tempLinks = [];
  switch( refUserRole.current ){
    
    case null: // guest user
      tempLinks = [
        {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/'},
        {name:'ثبت نام', icon:AppRegistrationOutlined, url:'/Register'},
        {name:'ورود', icon:LoginOutlined, url:'/Login'}
      ];
      break;
    
    case "User":
      tempLinks = [
        {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        {name:'پروفایل شخصی', icon:ManageAccountsOutlined, url:'/'},
        {name:'جست و جوی وکیل', icon:PersonSearchOutlined, url:'/'},
        // {name:'پروفایل عمومی وکیل', icon:AccountCircleOutlined, url:'/LawyerPage'},
        {name:'فروم', icon:ForumOutlined, url:'/'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/'},
        {name:'ثبت نام', icon:AppRegistrationOutlined, url:'/Register'},
        {name:'ورود', icon:LoginOutlined, url:'/Login'},
        {name:'خروج از حساب', icon:LogoutOutlined, url:'/'}
      ];
      break;
    
    case "Vakil":
      tempLinks = [
        {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        {name:'پروفایل شخصی', icon:ManageAccountsOutlined, url:'/'},
        {name:'پروفایل عمومی', icon:AccountCircleOutlined, url:'/LawyerPage'},
        {name:'فروم', icon:ForumOutlined, url:'/'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/'},
        {name:'ثبت نام', icon:AppRegistrationOutlined, url:'/Register'},
        {name:'ورود', icon:LoginOutlined, url:'/Login'},
        {name:'خروج از حساب', icon:LogoutOutlined, url:'/'}
      ];
      break;
    
    default:
      console.log("wrong user role");
  }

  const links = tempLinks;

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(pic1);
  const [online, setOnline] = useState(true);
  const [name, setName] = useState('فلان فلانی');
  const [pageName, setPageName, refPageName] = useStateRef('');

  useEffect(() => {
    const getPageName = async () => {
      let pname = window.location.href.split('/');
      pname = '/' + pname[pname.length - 1];
      setPageName(pname);
    };
    getPageName();
  }, [window.location.href]);

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
            <Menu/>
          </IconButton>
          <Typography variant="h6" noWrap sx={{mr:5, fontFamily:"shabnam"}} component="div">
            وکیل پرس
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="persistent" anchor="right" open={open} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {width: drawerWidth,},}}>
        <DrawerHeader>
          <IconButton sx={{pr:23.5, borderRadius:2, backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}}} onClick={handleDrawerClose}>
            <ChevronRight sx={{color:"white"}} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        { props.userRole !== "unknown" && <Grid container direction="column" display="flex" alignItems="center" justifyContent="center" sx={{mt:2,mb:2}}>
          <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
            <Avatar alt="profile picture" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
          </StyledBadge>
          <Typography sx={{fontFamily:"shabnam", mt:1}}>{name}</Typography>
        </Grid>}
        <Divider />
        <List>
          {links.map((linki,index) => (
            <ListItem key={index} component={Link} to={linki.url} disablePadding>
              <ListItemButton sx={{ ...(refPageName.current === linki.url && {backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}})}}>
                <ListItemIcon>
                  <linki.icon color="primary" sx={{ ...(refPageName.current === linki.url && {color:"white"})}} />
                </ListItemIcon>
                <Typography fontFamily="shabnam" sx={{ ...(refPageName.current === linki.url && {color:"white"})}} >{linki.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main sx={{padding:'0 !important'}}>
        <DrawerHeader/>
        <props.component/>
      </Main>
    </Box>
  );
}

export default Sidebar;