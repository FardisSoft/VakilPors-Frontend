// import { useState, useEffect, useRef, useCallback } from "react";
// import Search from "./Search";
// import { getAlllawyer } from "../../services/userService";
// import ShowLawyers from "./ShowLawyers";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import "../../css/Main_ShowLawyer.css";
// import axios from "axios";
// import Sort from "./Sort";
// import PremiumCard from "../premium-page/PremiumCards";
// import { BASE_API_ROUTE } from "../../Constants";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { Dialog, DialogContent, Grid } from "@mui/material";
// import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import { Select } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Modal } from "@mui/material";
// import useLawyerShowSearch from "./useLawyerShowSearch";

// import { useAuth } from "../../context/AuthProvider";

// const useStyles = makeStyles((theme) => ({
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     gap: theme.spacing(1),
//   },
//   starIcon: {
//     color: "#FFD700", // رنگ طلایی
//   },
//   modalContent: {
//     display: "flex",
//     flexDirection: "column",
//     gap: theme.spacing(2),
//     padding: theme.spacing(2),
//     borderRadius: theme.spacing(2),
//     maxWidth: 400,
//     margin: "0 auto",
//     backgroundColor: "#fff",
//   },
// }));

// const Lawyer_search_page = () => {
//   const Pagesize = 12;
//   const [lawyerdetail, setLawyerdetail] = useState([]);
//   const [filteredLawyers, setFilteredLawyers] = useState([]);
//   const [LawyerQuery, setLawyerQuery] = useState({ text: "" });
//   const classes = useStyles();
//   const [Pagenum, setPagenum] = useState(1);
//   const [sort, setsort] = useState("");
//   const [click, setclick] = useState(false);

//   const { refUserRole } = useAuth();

//   const { lawyerdetail1, loading, error, hasMore } = useLawyerShowSearch(
//     Pagenum,
//     Pagesize,
//     sort,
//     click
//   );
//   console.log(lawyerdetail1, hasMore, error, loading);

//   const [open, setOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     Rating: "",
//     Title: "",
//     Name: "",
//     City: "",
//     MemberOf: "",
//     LicenseNumber: "",
//     Gender: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async () => {
//     try {
//       const apiUrl = "https://api.fardissoft.ir/Lawyer/GetAllPaged";
//       const response = await axios.get(apiUrl, { params: filters });
//       const data = response.data;
//       console.log(data);
//       setLawyerdetail(data.data.results);
//     } catch (error) {
//       console.error(error);
//     }
//     setOpen(false);
//   };

//   useEffect(() => {
//     console.log("Lawyer Data ::://:: ", lawyerdetail);
//     setFilteredLawyers(lawyerdetail);
//   }, [lawyerdetail]);

//   useEffect(() => {
//     console.log("filteredLawyers ::://:: ", filteredLawyers);
//   }, [filteredLawyers]);

//   const settings = ["Profile", "Account", "Dashboard", "Logout"];

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(BASE_API_ROUTE + "Lawyer/GetAll");
//       const data = await response.json();
//       setLawyerdetail(data.data);
//     };
//     fetchData();
//   }, []);

//   const observer = useRef();

//   const lastLawyerelement = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           console.log("visible");
//           setPagenum((prevpagenum) => prevpagenum + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//       console.log(node);
//     },
//     [loading, hasMore]
//   );

//   const LawyerSearch = (event) => {
//     setLawyerQuery({ ...LawyerQuery, text: event.target.value });
//     console.log(event.target.value);

//     const allLawyers = lawyerdetail.filter((Lawyer) => {
//       return Lawyer.user.name
//         .toLowerCase()
//         .includes(event.target.value.toLowerCase());
//     });
//     setLawyerdetail(allLawyers);
//   };

//   const handleSortBygrade = () => {
//     setsort("Grade");
//     setPagenum(1);
//     setclick(!click);
//   };

//   const handleSortByparvandeNo = () => {
//     setsort("LicenseNumber");
//     setPagenum(1);
//     setclick(!click);
//   };

//   const handleSortBylikes = () => {
//     setsort("Rating");
//     setPagenum(1);
//     setclick(!click);
//   };
//   const handleSortByoldest = () => {
//     setsort("Id");
//     setPagenum(1);
//     setclick(!click);
//   };
//   const LawyerContainerRef = useRef();
//   return (
//     <>
//       <Helmet>
//         <title>جست و جوی وکلا</title>
//       </Helmet>
//       <Grid>
//         <div class="Main_contain">
//           <Search LawyerSearch={LawyerSearch} LawyerQuery={LawyerQuery} />
//           {refUserRole.current === "User" && <PremiumCard />}
//           <AppBar
//             position="relative"
//             style={{
//               borderBottomRightRadius: "30px",
//               borderBottomLeftRadius: "30px",
//               height: "70px",
//               backgroundColor: "#012780",
//             }}
//           >
//             <Container maxWidth="xl">
//               <Toolbar>
//                 <Typography variant="h9">مرتب سازی بر اساس</Typography>

//                 <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//                   {/* <Button
//                     onClick={handleSortBygrade}
//                     sx={{
//                       my: -1,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     امتياز
//                   </Button> */}
//                   <Button
//                     onClick={handleSortByparvandeNo}
//                     sx={{
//                       my: -1,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     شماره پرونده
//                   </Button>
//                   <Button
//                     onClick={handleSortBylikes}
//                     sx={{
//                       my: -1,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     تعداد لايك كاربران
//                   </Button>
//                   <Button
//                     onClick={handleSortByoldest}
//                     sx={{
//                       my: -1,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     قدیمی ترین وکلای وکیل پرس
//                   </Button>
//                 </Box>

//                 <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//                   {/* <Button
//                     onClick={handleSortBygrade}
//                     sx={{
//                       my: 2,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     امتياز
//                   </Button> */}
//                   <Button
//                     onClick={handleSortByparvandeNo}
//                     sx={{
//                       my: 2,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     شماره پرونده
//                   </Button>
//                   <Button
//                     onClick={handleSortBylikes}
//                     sx={{
//                       my: 2,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     تعداد لايك كاربران
//                   </Button>
//                   <Button
//                     onClick={handleSortByoldest}
//                     sx={{
//                       my: 2,
//                       color: "white",
//                       display: "block",
//                       fontFamily: "shabnam",
//                     }}
//                   >
//                     قدیمی ترین وکلای وکیل پرس
//                   </Button>
//                 </Box>

//                 <div>
//                   <Button
//                     sx={{
//                       background: "white",
//                       color: "black",
//                       borderRadius: "20px",
//                       border: "1px solid black",
//                       "&:hover": { background: "white" },
//                     }}
//                     variant="contained"
//                     onClick={handleOpen}
//                   >
//                     <Typography sx={{ fontFamily: "shabnam" }}>
//                       <FilterAltRoundedIcon /> فیلتر
//                     </Typography>
//                   </Button>
//                   <Modal open={open} onClose={handleClose}>
//                     <Box className={classes.modalContent}>
//                       <DialogContent
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 2,
//                           borderRadius: "20px",
//                         }}
//                       >
//                         <TextField
//                           label="نام و نام خانوادگی"
//                           name="Name"
//                           value={filters.Name}
//                           onChange={handleChange}
//                         />
//                         <TextField
//                           label="تیتر"
//                           name="Title"
//                           value={filters.Title}
//                           onChange={handleChange}
//                           sx={{ direction: "rtl" }}
//                         />
//                         <TextField
//                           label="گروه"
//                           name="MemberOf"
//                           value={filters.MemberOf}
//                           onChange={handleChange}
//                         />
//                         <TextField
//                           label="شماره پروانه"
//                           name="LicenseNumber"
//                           value={filters.LicenseNumber}
//                           onChange={handleChange}
//                         />
//                         <TextField
//                           label="شهر"
//                           name="City"
//                           value={filters.City}
//                           onChange={handleChange}
//                         />
//                         <TextField
//                           label="جنسیت"
//                           name="Gender"
//                           value={filters.Gender}
//                           onChange={handleChange}
//                         />
//                         <div className={classes.ratingContainer}>
//                           <Select
//                             value={filters.Rating}
//                             onChange={handleChange}
//                             name="Rating"
//                             displayEmpty
//                             inputProps={{ "aria-label": "Rating" }}
//                             style={{ minWidth: 320 }}
//                           >
//                             <MenuItem
//                               sx={{ fontFamily: "shabnam" }}
//                               value=""
//                               disabled
//                             >
//                               امتیاز
//                             </MenuItem>
//                             <MenuItem value="1">
//                               <StarRoundedIcon className={classes.starIcon} />
//                             </MenuItem>
//                             <MenuItem value="2">
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                             </MenuItem>
//                             <MenuItem value="3">
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                             </MenuItem>
//                             <MenuItem value="4">
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                             </MenuItem>
//                             <MenuItem value="5">
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                               <StarRoundedIcon className={classes.starIcon} />
//                             </MenuItem>
//                           </Select>
//                         </div>
//                         <Button variant="contained" onClick={handleSubmit}>
//                           <Typography sx={{ fontFamily: "shabnam" }}>
//                             <FilterAltRoundedIcon /> اعمال فیلتر
//                           </Typography>
//                         </Button>
//                       </DialogContent>
//                     </Box>
//                   </Modal>
//                 </div>
//               </Toolbar>
//             </Container>
//           </AppBar>

//           <section className="container">
//             <div class="contain">
//               <div className="row">
//                 {filteredLawyers.length > 0 ? (
//                   filteredLawyers.map((Lawyer) => (
//                     <ShowLawyers Lawyer={Lawyer} />
//                   ))
//                 ) : (
//                   <div className="text-center py-5"></div>
//                 )}
//               </div>
//             </div>
//           </section>
//         </div>
//       </Grid>
//     </>
//   );
// };

// export default Lawyer_search_page;




import { useState, useEffect, useRef, useCallback } from "react";
import Search from "./Search";
import { getAlllawyer } from "../../services/userService";
import ShowLawyers from "./ShowLawyers";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../../css/Main_ShowLawyer.css";
import axios from "axios";
import Sort from "./Sort";
import PremiumCard from "../premium-page/PremiumCards";
import { BASE_API_ROUTE } from "../../Constants";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../../context/AuthProvider";
import useLawyerShowSearch from "./useLawyerShowSearch";
import LoadingSkeleton from "./LoadingSkeleton";
import MapSkeleton from "./MapSkeleton";
import Grid from "@mui/material/Unstable_Grid2";

const Lawyer_search_page = () => {
  const Pagesize = 12;
  const [lawyerdetail, setlawyerdetail] = useState([]);
  const [LawyerQuery, setLawyerQuery] = useState({ text: "" });

  const { refUserRole } = useAuth();

  const [Pagenum, setPagenum] = useState(1);
  const [sort, setsort] = useState("");
  const [click, setclick] = useState(false);

  const { lawyerdetail1, loading, error, hasMore } = useLawyerShowSearch(
    Pagenum,
    Pagesize,
    sort,
    click
  );
  console.log(lawyerdetail1, hasMore, error, loading);

  const observer = useRef();

  const lastLawyerelement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPagenum((prevpagenum) => prevpagenum + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const LawyerSearch = (event) => {
    setLawyerQuery({ ...LawyerQuery, text: event.target.value });
    console.log(event.target.value);

    const allLawyers = lawyerdetail.filter((Lawyer) => {
      return Lawyer.user.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setlawyerdetail(allLawyers);
  };

  const handleSortBygrade = () => {
    setsort("Grade");
    setPagenum(1);
    setclick(!click);
  };

  const handleSortByparvandeNo = () => {
    setsort("LicenseNumber");
    setPagenum(1);
    setclick(!click);
  };

  const handleSortBylikes = () => {
    setsort("Rating");
    setPagenum(1);
    setclick(!click);
  };
  const handleSortByoldest = () => {
    setsort("Id");
    setPagenum(1);
    setclick(!click);
  };
  const LawyerContainerRef = useRef();
  return (
    <>
      <Helmet>
        <title>جست و جوی وکلا</title>
      </Helmet>
      <Grid>
        <div class="Main_contain">
          <Search LawyerSearch={LawyerSearch} LawyerQuery={LawyerQuery} />
          {refUserRole.current === "User" && <PremiumCard />}
          <AppBar
            position="relative"
            style={{
              borderBottomRightRadius: "30px",
              borderBottomLeftRadius: "30px",
              height: "70px",
              backgroundColor: "#012780",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar>
                <Typography variant="h9">مرتب سازی بر اساس</Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  {/* <Button
                    onClick={handleSortBygrade}
                    sx={{
                      my: -1,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    امتياز
                  </Button> */}
                  <Button
                    onClick={handleSortByparvandeNo}
                    sx={{
                      my: -1,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    شماره پرونده
                  </Button>
                  <Button
                    onClick={handleSortBylikes}
                    sx={{
                      my: -1,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    تعداد لايك كاربران
                  </Button>
                  <Button
                    onClick={handleSortByoldest}
                    sx={{
                      my: -1,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    قدیمی ترین وکلای وکیل پرس
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {/* <Button
                    onClick={handleSortBygrade}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    امتياز
                  </Button> */}
                  <Button
                    onClick={handleSortByparvandeNo}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    شماره پرونده
                  </Button>
                  <Button
                    onClick={handleSortBylikes}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    تعداد لايك كاربران
                  </Button>
                  <Button
                    onClick={handleSortByoldest}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "shabnam",
                    }}
                  >
                    قدیمی ترین وکلای وکیل پرس
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }}></IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  ></Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <section className="container">
            <div class="contain">
              <div>
                {loading && (
                  <>
                    {/* {LawyerContainerRef.current && hasMore && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: LawyerContainerRef.current.innerHTML,
                        }}
                      />
                    )} */}
                    <MapSkeleton />
                  </>
                )}
              </div>
              <div className="row" ref={LawyerContainerRef}>
                {lawyerdetail1.length > 0 && !loading && (
                  <>
                    {lawyerdetail1.map((Lawyer, index) => {
                      if (lawyerdetail1.length === index + 1) {
                        return (
                          <div ref={lastLawyerelement}>
                            <ShowLawyers Lawyer={Lawyer} />
                          </div>
                        );
                      } else {
                        return <ShowLawyers Lawyer={Lawyer} />;
                      }
                    })}
                  </>
                  
                )}
                {lawyerdetail1.length === 0 && (
                  <div className="text-center py-5"></div>
                )}
              </div>
              <div
                style={{ textAlign: "center", fontSize: 30, direction: "ltr" }}
              ></div>
            </div>
          </section>
        </div>
      </Grid>
    </>
  );
};

export default Lawyer_search_page;
