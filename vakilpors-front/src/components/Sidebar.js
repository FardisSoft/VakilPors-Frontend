import {
  HomeOutlined,
  PersonSearchOutlined,
  ForumOutlined,
  PolicyOutlined,
  AppRegistrationOutlined,
  LoginOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
  AccountCircleOutlined,
  CallOutlined,
  ChevronRight,
  ChatOutlined,
  DashboardOutlined,
  AssignmentOutlined,
  WalletOutlined,
  AssignmentTurnedInOutlined,
  AssessmentOutlined,
  Gavel,
  LiveHelpOutlined,
  PaidOutlined,
  ArrowDropDown,
  WorkspacePremium,
  GroupIcon
} from "@mui/icons-material";
import MovingBar from "../components/premium-page/MovingBar";
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from "@mui/icons-material/Menu";
// import { WorkspacePremium } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import useStateRef from "react-usestateref";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  Drawer,
  Badge,
  Avatar,
  Typography,
  Toolbar,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import jwt from "jwt-decode";
import axios from "axios";
import { BASE_API_ROUTE } from "../Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

let drawerWidth = 240;

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: "15px",
    border: "1px solid #dadde9",
    fontFamily: "shabnam",
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          overflow: "overlay", // Prevent scrollbars
          height: "100vh",
        },
      },
    },
  },
});

const Sidebar = (props) => {
  const { refUserRole, refIsLoggedIn, getAccessToken, logout } = useAuth();
  const [lawyerID, setLawyerID, refLawyerID] = useStateRef();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [profilePicture, setProfilePicture] = useState();
  const [online, setOnline] = useState(true);
  const [name, setName] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  let tempLinks = [];
  const navigate = useNavigate();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const showSuccesMessage = (payam) => {
    toast.success(payam, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  useEffect(() => {
    const sidebarApi = async () => {
      window.addEventListener("resize", updateSize);

      const token = await getAccessToken();
      if (token) {
        // staticits ip send
        if (refUserRole.current != "Admin") {
          const urlIp = BASE_API_ROUTE + "Statistics/AddVisit";
          try {
            const response = await axios.get(urlIp, {
              headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('response in sending IP : ',response);
          } catch (error) {
            console.log("error in sending IP : ", error);
          }
        }
        // rest
        const tokenData = jwt(token);
        let url =
          BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        if (refUserRole.current === "Vakil") {
          url =
            BASE_API_ROUTE + `Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`;
        }
        try {
          const response = await axios.get(url);
          if (refUserRole.current === "Vakil") {
            setLawyerID(response.data.data.id);
          }
          // console.log('response in getting user data : ',response);
          handleAPI(response.data.data);
        } catch (error) {
          console.log("error in getting user data : ", error);
        }
      }
      if (!token) {
        console.log("login required");
        if (!props.homePage) navigate("/Login");
      }
    };
    sidebarApi();
  }, [refIsLoggedIn.current]);

  switch (refUserRole.current) {
    case null: // guest user
      tempLinks = [
        { name: "صفحه اصلی", icon: HomeOutlined, url: "/" },
        { name: "شرایط سایت", icon: PolicyOutlined, url: "/Policy" },
        { name: "تماس با ما", icon: CallOutlined, url: "/contactUs" },
        { name: "قانون اساسی", icon: Gavel, url: "/AsasiLaw" },
        { name: "ثبت نام", icon: AppRegistrationOutlined, url: "/Register" },
        { name: "ورود", icon: LoginOutlined, url: "/Login" },
      ];
      break;

    case "User":
      tempLinks = [
        { name: "صفحه اصلی", icon: HomeOutlined, url: "/" },
        {
          name: "ویرایش پروفایل",
          icon: ManageAccountsOutlined,
          url: "/edit-user",
        },
        {
          name: "جست و جوی وکلا",
          icon: PersonSearchOutlined,
          url: "/Lawyer-search-page",
        },
        { name: "فروم", icon: ForumOutlined, url: "/Forum" },
        { name: "چت انلاین", icon: ChatOutlined, url: "/chatPage" },
        { name: "داشبورد", icon: DashboardOutlined, url: "/PremiumPage" },
        {
          name: "پرونده های من",
          icon: AssignmentOutlined,
          url: `/show-cases/${false}`,
        },
        {
          name: "لیست جلسات با وکلا",
          icon: PersonSearchOutlined,
          url: `/create-meet/${false}`,
        },
        { name: "کیف پول", icon: WalletOutlined, url: `/wallet` },
        { name: "شرایط سایت", icon: PolicyOutlined, url: "/Policy" },
        { name: "قانون اساسی", icon: Gavel, url: "/AsasiLaw" },
        { name: "تماس با ما", icon: CallOutlined, url: "/contactUs" },
      ];
      break;

    case "Vakil":
      tempLinks = [
        { name: "صفحه اصلی", icon: HomeOutlined, url: "/" },
        {
          name: "ویرایش پروفایل",
          icon: ManageAccountsOutlined,
          url: "/edit_lawyer",
        },
        {
          name: "مشاهده پروفایل",
          icon: AccountCircleOutlined,
          url: `/LawyerPage/${refLawyerID.current}`,
        },
        {
          name: "لیست جلسات موکلان",
          icon: PersonSearchOutlined,
          url: `/create-meet/${true}`,
        },
        {
          name: "جست و جوی وکلا",
          icon: PersonSearchOutlined,
          url: "/Lawyer-search-page",
        },
        { name: "فروم", icon: ForumOutlined, url: "/Forum" },
        { name: "چت انلاین", icon: ChatOutlined, url: "/chatPage" },
        {
          name: "پرونده های من",
          icon: AssignmentOutlined,
          url: `/user-send-cases/${refLawyerID.current}`,
        },
        { name: "کیف پول", icon: WalletOutlined, url: "/wallet" },
        { name: "شرایط سایت", icon: PolicyOutlined, url: "/Policy" },
        { name: "قانون اساسی", icon: Gavel, url: "/AsasiLaw" },
        { name: "تماس با ما", icon: CallOutlined, url: "/contactUs" },
      ];
      break;

    case "Admin":
      tempLinks = [
        // {name:'صفحه اصلی', icon:HomeOutlined, url:'/'},
        // {name:'ویرایش اطلاعات', icon:ManageAccountsOutlined, url:'/edit-user'},
        // {name:'جست و جوی وکلا', icon:PersonSearchOutlined, url:'/Lawyer-search-page'},
        // {name:'فروم', icon:ForumOutlined, url:'/Forum'},
        // {name:'چت انلاین', icon:ChatOutlined, url:'/chatPage'},
        // {name:'تایید مدارک وکلا', icon:AssignmentTurnedInOutlined, url:'/VerifyLawyers'},
        // {name:'آمار سایت', icon:AssessmentOutlined, url:'/Statistics'},
        // {name:'تراکنش های مالی', icon:PaidOutlined, url:'/HandleTransactions'},
        // {name:'بررسی تخلفات وکلا', icon:ReportOutlinedIcon, url:'/ReportValidation'},
        // {name:'شرایط سایت', icon:PolicyOutlined, url:'/Policy'},
        // {name:'قانون اساسی', icon:Gavel, url:'/AsasiLaw'},
        // {name:'تماس با ما', icon:CallOutlined, url:'/contactUs'},
        { name: "صفحه اصلی", icon: HomeOutlined, url: "/" },
        {
          name: "ویرایش اطلاعات",
          icon: ManageAccountsOutlined,
          url: "/edit-user",
        },
        {
          name: "مدیریت کاربران",
          icon: PeopleIcon,
          url: "/AllUsers",
        },
        {
          name: "جست و جوی وکلا",
          icon: PersonSearchOutlined,
          url: "/Lawyer-search-page",
        },
        { name: "فروم", icon: ForumOutlined, url: "/Forum" },
        { name: "چت انلاین", icon: ChatOutlined, url: "/chatPage" },
        {
          name: "تایید مدارک وکلا",
          icon: AssignmentTurnedInOutlined,
          url: "/VerifyLawyers",
        },

        {
          name:'بررسی تخلفات وکلا',
          icon:ReportOutlinedIcon,
          url:'/ReportValidation'
        },


        { name: "آمار سایت", icon: AssessmentOutlined, url: "/Statistics" },
        {
          name: "تراکنش های مالی",
          icon: PaidOutlined,
          url: "/HandleTransactions",
        },
        { name: "پریمیوم", icon: WorkspacePremium, url: "/PremiumLawyers", color: "purple" },
        { name: "شرایط سایت", icon: PolicyOutlined, url: "/Policy" },
        { name: "قانون اساسی", icon: Gavel, url: "/AsasiLaw" },
        { name: "تماس با ما", icon: CallOutlined, url: "/contactUs" },
      ];
      break;

    default:
      console.log("wrong user role");
  }
  const links = tempLinks;

  const handleAPI = (data) => {
    setProfilePicture(
      refUserRole.current === "Vakil"
        ? data.user.profileImageUrl
        : data.profileImageUrl
    );
    setOnline(true);
    setName(refUserRole.current === "Vakil" ? data.user.name : data.name);
    setIsPremium(refUserRole.current === "User" ? data.isPremium : false);
  };

  const updateSize = () => {
    setOpen(false);
    if (window.innerWidth >= 600) {
      drawerWidth = 240;
    }
    if (window.innerWidth < 600) {
      drawerWidth = "100vw";
    }
  };

  const logoutHandler = async () => {
    showSuccesMessage("شما از حساب کاربری خود خارج شدید.");
    await delay(3000);
    logout();
    navigate("/Login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDropDownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            open={open}
            sx={{ width: open ? `calc(100vw - ${drawerWidth}px)` : "100vw" }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Grid
                container
                direction={"row"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{ mr: 5, fontFamily: "shabnam" }}
                  component="div"
                >
                  وکیل پرس
                </Typography>
                {refUserRole.current != null && (
                  <Box display={"flex"} flexDirection={"row"}>
                    <ArrowDropDown
                      color="primary"
                      onClick={handleDropDownClick}
                      sx={{
                        color: "white",
                        position: "relative",
                        top: "9px",
                        left: "15px",
                        cursor: "pointer",
                      }}
                    />
                    {window.innerWidth > 450 && (
                      <>
                        <Typography
                          onClick={handleDropDownClick}
                          sx={{
                            fontFamily: "shabnam",
                            position: "relative",
                            top: "9px",
                            left: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {name}
                        </Typography>
                        {isPremium && (
                          <StyledTooltip
                            title={
                              <React.Fragment>{"کاربر پرمیوم"}</React.Fragment>
                            }
                          >
                            <WorkspacePremium
                              sx={{
                                position: "relative",
                                top: "10px",
                                right: "-15px",
                                color: "purple",
                                backgroundColor: "gold",
                                borderRadius: "12px",
                                padding: "1px",
                                width: "23px",
                                mr: "10px",
                              }}
                            />
                          </StyledTooltip>
                        )}
                      </>
                    )}
                    <Avatar
                      alt="profile picture"
                      sx={{ width: 40, height: 40 }}
                      srcSet={profilePicture}
                    />
                  </Box>
                )}
              </Grid>
            </Toolbar>
          </AppBar>

          <React.Fragment>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleDropDownClose}
              onClick={handleDropDownClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {refUserRole.current == "User" && (
                <>
                  <MenuItem onClick={() => navigate("/edit-user")}>
                    <ListItemIcon>
                      <ManageAccountsOutlined color="primary" />
                    </ListItemIcon>
                    <Typography fontFamily="shabnam">
                      {"ویرایش پروفایل"}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/PremiumPage")}>
                    <ListItemIcon>
                      <DashboardOutlined color="primary" />
                    </ListItemIcon>
                    <Typography fontFamily="shabnam">{"داشبورد"}</Typography>
                  </MenuItem>
                </>
              )}
              {refUserRole.current == "Vakil" && (
                <>
                  <MenuItem onClick={() => navigate("/edit_lawyer")}>
                    <ListItemIcon>
                      <ManageAccountsOutlined color="primary" />
                    </ListItemIcon>
                    <Typography fontFamily="shabnam">
                      {"ویرایش پروفایل"}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      navigate(`/LawyerPage/${refLawyerID.current}`)
                    }
                  >
                    <ListItemIcon>
                      <AccountCircleOutlined color="primary" />
                    </ListItemIcon>
                    <Typography fontFamily="shabnam">
                      {"مشاهده پروفایل"}
                    </Typography>
                  </MenuItem>
                </>
              )}
              <Divider />
              <MenuItem onClick={logoutHandler}>
                <ListItemIcon>
                  <LogoutOutlined color="primary" />
                </ListItemIcon>
                <Typography fontFamily="shabnam">خروج از حساب</Typography>
              </MenuItem>
            </Menu>
          </React.Fragment>

          <Drawer
            variant="persistent"
            anchor="right"
            open={open}
            sx={{
              width: drawerWidth == 240 || open ? drawerWidth : 0,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth == 240 || open ? drawerWidth : 0,
              },
            }}
          >
            <DrawerHeader>
              <IconButton
                sx={{
                  width: drawerWidth,
                  borderRadius: 2,
                  backgroundColor: "rgb(25,118,210)",
                  ":hover": { backgroundColor: "rgba(25,118,210,0.7)" },
                }}
                onClick={handleDrawerClose}
              >
                <ChevronRight
                  sx={{
                    position: "relative",
                    right: drawerWidth == 240 ? 90 : "-45vw",
                    color: "white",
                  }}
                />
              </IconButton>
            </DrawerHeader>
            <Divider />
            {refUserRole.current && (
              <Grid
                container
                direction="column"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ pt: 2, pb: 2 }}
                // backgroundColor={isPremium?'gold':'white'}
                borderRadius={"10px"}
              >
                <StyledBadge
                  invisible={!online}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  variant="dot"
                >
                  <Avatar
                    alt="profile picture"
                    sx={{ width: 60, height: 60 }}
                    srcSet={profilePicture}
                  />
                </StyledBadge>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography sx={{ fontFamily: "shabnam", mt: 1 }}>
                    {name}
                  </Typography>
                  {isPremium && (
                    <StyledTooltip
                      title={<React.Fragment>{"کاربر پرمیوم"}</React.Fragment>}
                    >
                      <WorkspacePremium
                        sx={{
                          position: "relative",
                          top: "10px",
                          right: "-5px",
                          color: "purple",
                          backgroundColor: "gold",
                          borderRadius: "12px",
                          padding: "1px",
                          width: "23px",
                          mr: "10px",
                        }}
                      />
                    </StyledTooltip>
                  )}
                </Box>
              </Grid>
            )}
            <Divider />
            <List sx={{ flex: "1 1 auto", overflow: "overlay" }}>
              {links.map((linki, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={linki.url}
                  onClick={handleDrawerClose}
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      ...((linki.url == "/" && props.homePage
                        ? true
                        : window.location.href.includes(linki.url) &&
                          linki.url != "/") && {
                        backgroundColor: "rgb(25,118,210)",
                        ":hover": { backgroundColor: "rgba(25,118,210,0.7)" },
                      }),
                    }}
                  >
                    <ListItemIcon>
                      <linki.icon
                        color="primary"
                        sx={{
                          ...((linki.url == "/" && props.homePage
                            ? true
                            : window.location.href.includes(linki.url) &&
                              linki.url != "/") && { color: "white" }),
                        }}
                      />
                    </ListItemIcon>
                    <Typography
                      fontFamily="shabnam"
                      sx={{
                        color: "black",
                        ...((linki.url == "/" && props.homePage
                          ? true
                          : window.location.href.includes(linki.url) &&
                            linki.url != "/") && { color: "white" }),
                      }}
                    >
                      {linki.name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
              {refUserRole.current && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={
                        "https://api.fardissoft.ir/File/Download?key=c19e4286-5f70-4544-87bb-eda9098a7e65"
                      }
                    >
                      <ListItemIcon>
                        <LiveHelpOutlined color="primary" />
                      </ListItemIcon>
                      <Typography fontFamily="shabnam">
                        دانلود راهنمای سایت
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={logoutHandler}>
                      <ListItemIcon>
                        <LogoutOutlined color="primary" />
                      </ListItemIcon>
                      <Typography fontFamily="shabnam">خروج از حساب</Typography>
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Drawer>
          
          <Main
            onClick={handleDrawerClose}
            open={open}
            sx={{ padding: "0 !important" }}
          >
            <DrawerHeader />
            <Box >
            {/* Add the MovingBar component at the bottom of the content */}
            <MovingBar />
          </Box>
            <props.component />
            <Footer />
            
          </Main>
          
          <ToastContainer />
          
        </Box>
        
      </div>
      
    </ThemeProvider>
    
    
  </>

  );
};

export default Sidebar;
