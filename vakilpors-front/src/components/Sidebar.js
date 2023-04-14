import { HomeOutlined, PersonSearchOutlined, ForumOutlined, PolicyOutlined, AppRegistrationOutlined,
       LoginOutlined, LogoutOutlined, ManageAccountsOutlined, AccountCircleOutlined, CallOutlined,
       Menu, ChevronRight } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import useStateRef from "react-usestateref";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Box, Divider, Grid, Drawer } from '@mui/material';
import { Badge, Avatar, Typography, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { List, ListItem, ListItemButton, IconButton, ListItemIcon } from '@mui/material';
import { useAuth } from "../services/AuthProvider";
import jwt from 'jwt-decode';
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';

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

  const { refUserRole, getAccessToken } = useAuth();
  const [lawyerID, setLawyerID, refLawyerID] = useStateRef();
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(pic1);
  const [online, setOnline] = useState(true);
  const [name, setName] = useState('فلان فلانی');
  let tempLinks = [];

  useEffect(() => {
    const sidebarApi = async () => {
      console.log(refUserRole);
      const token = await getAccessToken();
      if(token){
        const tokenData = jwt(token);
        let url = "";
        if(refUserRole.current === "User"){
          url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        }
        if(refUserRole.current === "Vakil"){
          url = BASE_API_ROUTE + `Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`;
        }
        try {
          const response = await axios.get(url);
          if(refUserRole.current === "Vakil"){
            setLawyerID(response.data.data.id);
          }
          console.log('response : ',response);
          handleAPI(response.data.data);
        } catch (error) {
            console.log('error : ',error);
        }
      }
    };
    sidebarApi();
  }, []);

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
        {name:'ویرایش پروفایل', icon:ManageAccountsOutlined, url:'/edit-user'},
        // {name:'مشاهده پروفایل', icon:ManageAccountsOutlined, url:'/user-display-profile'},        
        {name:'جست و جوی وکیل', icon:PersonSearchOutlined, url:'/Lawyer-search-page'},
        {name:'فروم', icon:ForumOutlined, url:'/dashboard'},
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
        {name:'ویرایش پروفایل', icon:ManageAccountsOutlined, url:'/edit_lawyer'},
        {name:'مشاهده پروفایل', icon:AccountCircleOutlined, url:`/LawyerPage/${refLawyerID.current}`},
        {name:'فروم', icon:ForumOutlined, url:'/dashboard'},
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

  const handleAPI = (data) => {
    setProfilePicture(data.profileImageUrl);
    setOnline(true);
    setName(refUserRole.current === "User" ? data.name : data.user.name);
  };

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
              <ListItemButton sx={{ ...( (linki.url == '/' && window.location.href == 'http://localhost:3000/' ? true : window.location.href.includes(linki.url) && linki.url != '/') && {backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}})}}>
                <ListItemIcon>
                  <linki.icon color="primary" sx={{ ...( (linki.url == '/' && window.location.href == 'http://localhost:3000/' ? true : window.location.href.includes(linki.url) && linki.url != '/') && {color:"white"})}} />
                </ListItemIcon>
                <Typography fontFamily="shabnam" sx={{ ...( (linki.url == '/' && window.location.href == 'http://localhost:3000/' ? true : window.location.href.includes(linki.url) && linki.url != '/') && {color:"white"})}} >{linki.name}</Typography>
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