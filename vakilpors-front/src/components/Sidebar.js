import { HomeOutlined, PersonSearchOutlined, ForumOutlined, PolicyOutlined, AppRegistrationOutlined,
       LoginOutlined, LogoutOutlined, ManageAccountsOutlined, AccountCircleOutlined, CallOutlined,
       Menu, ChevronRight, ChatOutlined, Dashboard } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import useStateRef from "react-usestateref";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { Box, Divider, Grid, Drawer } from '@mui/material';
import { Badge, Avatar, Typography, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { List, ListItem, ListItemButton, IconButton, ListItemIcon } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import jwt from 'jwt-decode';
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let drawerWidth = 240;

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
    width: `calc(100% - ${drawerWidth})`,
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

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          overflow: 'overlay', // Prevent scrollbars
          height: '100vh'
        },
      },
    },
  },
});

const Sidebar = (props) => {

  const { refUserRole, refIsLoggedIn, getAccessToken, logout } = useAuth();
  const [lawyerID, setLawyerID, refLawyerID] = useStateRef();
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [online, setOnline] = useState(true);
  const [name, setName] = useState('');
  let tempLinks = [];
  const navigate = useNavigate();

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);


  const showSuccesMessage = (payam) => {
    toast.success(payam, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl:true,
        });
};

  useEffect(() => {
    const sidebarApi = async () => {
  
      window.addEventListener('resize', updateSize);

      // console.log("az too sidebar : ",refUserRole);
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
      if(!token){
        console.log('login required');
        navigate("/Login");
      }
    };
    sidebarApi();
  }, [refIsLoggedIn.current]);

  switch( refUserRole.current ){
    
    case null: // guest user
      tempLinks = [
        {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/contactUs'},
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
        {name:'فروم', icon:ForumOutlined, url:'/Forum'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/contactUs'},
        {name:'چت انلاین', icon:ChatOutlined, url:'/chatPage'},
        {name:'داشبورد', icon:Dashboard, url:'/PremiumPage'},
      ];
      break;
    
    case "Vakil":
      tempLinks = [
        {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        {name:'ویرایش پروفایل', icon:ManageAccountsOutlined, url:'/edit_lawyer'},
        {name:'مشاهده پروفایل', icon:AccountCircleOutlined, url:`/LawyerPage/${refLawyerID.current}`},
        {name:'جست و جوی وکلا', icon:PersonSearchOutlined, url:'/Lawyer-search-page'},
        {name:'فروم', icon:ForumOutlined, url:'/Forum'},
        {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        {name:'تماس با ما', icon:CallOutlined, url:'/contactUs'},
        {name:'چت انلاین', icon:ChatOutlined, url:'/chatPage'},
      ];
      break;
    
    default:
      console.log("wrong user role");
  }
  const links = tempLinks;

  const handleAPI = (data) => {
    setProfilePicture(refUserRole.current === "User" ? data.profileImageUrl : data.user.profileImageUrl);
    setOnline(true);
    setName(refUserRole.current === "User" ? data.name : data.user.name);
  };

  const updateSize = () => {
    setOpen(false);
    if(window.innerWidth >= 600){
      drawerWidth = 240;
    }
    if(window.innerWidth < 600){
      drawerWidth = '100vw';
    }
  }

  const logoutHandler = async () => {
    showSuccesMessage('شما از حساب کاربری خود خارج شدید.')
    await delay(5000);
    logout();
    navigate('/Login');
  }

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
    <ThemeProvider theme={theme}>
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
      
      <Drawer variant="persistent" anchor="right" open={open} sx={{ width: drawerWidth == 240 || open ? drawerWidth : 0 , flexShrink: 0, '& .MuiDrawer-paper': {width: drawerWidth == 240 || open ? drawerWidth : 0,}}}>
        <DrawerHeader>
          <IconButton sx={{width:drawerWidth, borderRadius:2, backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}}} onClick={handleDrawerClose}>
            <ChevronRight sx={{position:"relative",right:drawerWidth == 240 ? 90 : '-45vw',color:"white"}} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        { refUserRole.current && <Grid container direction="column" display="flex" alignItems="center" justifyContent="center" sx={{mt:2,mb:2}}>
          <StyledBadge invisible={!online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} variant="dot">
            <Avatar alt="profile picture" sx={{ width: 60, height: 60 }} srcSet={profilePicture} />
          </StyledBadge>
          <Typography sx={{fontFamily:"shabnam", mt:1}}>{name}</Typography>
        </Grid>}
        <Divider />
        <List sx={{flex: '1 1 auto', overflow: 'overlay'}}>
          {links.map((linki,index) => (
            <ListItem key={index} component={Link} to={linki.url} onClick={handleDrawerClose} disablePadding>
              <ListItemButton sx={{ ...( (linki.url == '/' && props.homePage ? true : window.location.href.includes(linki.url) && linki.url != '/') && {backgroundColor:"rgb(25,118,210)", ":hover":{backgroundColor:"rgba(25,118,210,0.7)"}})}}>
                <ListItemIcon>
                  <linki.icon color="primary" sx={{ ...( (linki.url == '/' && props.homePage ? true : window.location.href.includes(linki.url) && linki.url != '/') && {color:"white"})}} />
                </ListItemIcon>
                <Typography fontFamily="shabnam" sx={{color:'black', ...( (linki.url == '/' && props.homePage ? true : window.location.href.includes(linki.url) && linki.url != '/') && {color:"white"})}} >{linki.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
          {refUserRole.current && <ListItem disablePadding>
            <ListItemButton onClick={logoutHandler}>
            
              <ListItemIcon>
                <LogoutOutlined color="primary" />
              </ListItemIcon>
              <Typography fontFamily="shabnam" >خروج از حساب</Typography>
            </ListItemButton>
          </ListItem>}
        </List>
      </Drawer>

      <Main onClick={handleDrawerClose} open={open} sx={{padding:'0 !important'}}>
        <DrawerHeader/>
        <props.component/>
      </Main>
      <ToastContainer />
    </Box>
    </ThemeProvider>
  );
}

export default Sidebar;