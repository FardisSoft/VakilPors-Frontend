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

const Lawyer_search_page = () => {
  const Pagesize = 6;
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        BASE_API_ROUTE +
          `Lawyer/GetAllPaged?PageNumber=${Pagenum}&PageSize=${Pagesize}&sort=${sort}`
      );
      const data = await response.json();
      setlawyerdetail(data.data.results);
      console.log(data.data.results);
    };
    fetchData();
  }, [Pagenum, Pagesize, sort]);

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
    setsort("ParvandeNo");
    setPagenum(1);
    setclick(!click);
  };

  const handleSortBylikes = () => {
    setsort("NumberOfLikes");
    setPagenum(1);
    setclick(!click);
  };
  const handleSortByoldest = () => {
    setsort("Id");
    setPagenum(1);
    setclick(!click);
  };

  return (
    <>
      <Helmet>
        <title>جست و جوی وکلا</title>
      </Helmet>
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
                <Button
                  onClick={handleSortBygrade}
                  sx={{
                    my: -1,
                    color: "white",
                    display: "block",
                    fontFamily: "shabnam",
                  }}
                >
                  امتياز
                </Button>
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
                <Button
                  onClick={handleSortBygrade}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "shabnam",
                  }}
                >
                  امتياز
                </Button>
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
            <div>{loading && <MapSkeleton />}</div>
            <div className="row">
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
    </>
  );
};

export default Lawyer_search_page;
