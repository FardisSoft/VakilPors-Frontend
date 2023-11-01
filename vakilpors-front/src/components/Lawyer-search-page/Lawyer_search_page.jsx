import { useState, useEffect } from 'react';
import Search from './Search';
import { getAlllawyer } from "../../services/userService";
import ShowLawyers from './ShowLawyers';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import "../../css/Main_ShowLawyer.css";
import axios from "axios";
import Sort from './Sort';
import PremiumCard from '../premium-page/PremiumCards';
import { BASE_API_ROUTE } from '../../Constants';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


const Lawyer_search_page = () => {

    const [lawyerdetail, setLawyerdetail] = useState([]);
    const [filteredLawyers, setFilteredLawyers] = useState([]);
    const [LawyerQuery, setLawyerQuery] = useState({ text: "" });


    const [filters, setFilters] = useState({
        Rating: '',
        Title: '',
        Name: '',
        City: '',
        MemberOf: '',
        LicenseNumber: '',
        Gender: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };
    
      const handleSubmit = async () => {
        try {
          const apiUrl = 'https://api.fardissoft.ir/Lawyer/GetAllPaged';
          const response = await axios.get(apiUrl, { params: filters });
          const data = response.data;
          console.log(data);
          setLawyerdetail(data.data.results);
        } catch (error) {
          console.error(error);
        }
      };


      useEffect(() => {
        console.log("Lawyer Data ::://:: ", lawyerdetail);
        setFilteredLawyers(lawyerdetail);
      }, [lawyerdetail]);
      
      useEffect(() => {
        console.log("filteredLawyers ::://:: ", filteredLawyers);
      }, [filteredLawyers]);


    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(BASE_API_ROUTE + "Lawyer/GetAll");
          const data = await response.json();
          setLawyerdetail(data.data);
        };
        fetchData();
      }, []);


    const LawyerSearch = (event) => {
        setLawyerQuery({ ...LawyerQuery, text: event.target.value });
        const allLawyers = lawyerdetail.filter((Lawyer) => {
            return Lawyer.user.name
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredLawyers(allLawyers);
    };

    const handleSortBygrade = () => {
      const sorted = [...filteredLawyers].sort((a, b) => a.grade - b.grade);
      setFilteredLawyers(sorted);
    }

    const handleSortByparvandeNo = () => {
        const sorted = [...filteredLawyers].sort((a, b) => a.parvandeNo - b.parvandeNo);
        setFilteredLawyers(sorted);
      }
      
      const handleSortBylikes = () => {
        const sorted = [...filteredLawyers].sort((a, b) => a.numberOfLikes - b.numberOfLikes);
        setFilteredLawyers(sorted);
      }
      const handleSortByoldest = () => {
        const sorted = [...filteredLawyers].sort((a, b) => a.id - b.id);
        setFilteredLawyers(sorted);
      }


    return (
        <>
            <Helmet>
                <title>جست و جوی وکلا</title>
            </Helmet>
            <div class="Main_contain">
                <Search LawyerSearch={LawyerSearch} LawyerQuery={LawyerQuery} />
                <PremiumCard />
                <AppBar position="relative" style={{ borderBottomRightRadius: "30px", borderBottomLeftRadius: "30px", height: "70px", backgroundColor: "#012780" }}>
                    <Container maxWidth="xl">
                        <Toolbar  >

                            <Typography variant="h9">
                                مرتب سازی بر اساس
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                            <Button
                                        onClick={handleSortBygrade}
                                        sx={{ my: -1, color: 'white', display: 'block'}}>
                                        امتياز
                                    </Button>
                                    <Button
                                    onClick={handleSortByparvandeNo}
                                        sx={{ my: -1, color: 'white', display: 'block' }}>
                                        شماره پرونده  
                                    </Button>
                                    <Button
                                       onClick={handleSortBylikes}
                                        sx={{ my: -1, color: 'white', display: 'block' }}>
                                        تعداد لايك كاربران
                                    </Button>
                                    <Button
                                       onClick={handleSortByoldest}
                                        sx={{ my: -1, color: 'white', display: 'block' }}>
                                        قدیمی ترین وکلای وکیل پرس
                                    </Button>
                            </Box>
                            
                    
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        onClick={handleSortBygrade}
                                        sx={{ my: 2, color: 'white', display: 'block'}}>
                                        امتياز
                                    </Button>
                                    <Button
                                    onClick={handleSortByparvandeNo}
                                        sx={{ my: 2, color: 'white', display: 'block' }}>
                                        شماره پرونده  
                                    </Button>
                                    <Button
                                       onClick={handleSortBylikes}
                                        sx={{ my: 2, color: 'white', display: 'block' }}>
                                        تعداد لايك كاربران
                                    </Button>
                                    <Button
                                       onClick={handleSortByoldest}
                                        sx={{ my: 2, color: 'white', display: 'block' }}>
                                        قدیمی ترین وکلای وکیل پرس
                                    </Button>
                                
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton sx={{ p: 0 }}>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"

                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >   
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>


                <div>
      <Button variant="contained" onClick={handleSubmit}>
        فیلتر
      </Button>
      <div>
        <TextField
          label="Rating"
          name="Rating"
          value={filters.Rating}
          onChange={handleChange}
        />
        <TextField
          label="Title"
          name="Title"
          value={filters.Title}
          onChange={handleChange}
        />
        <TextField
          label="Name"
          name="Name"
          value={filters.Name}
          onChange={handleChange}
        />
        <TextField
          label="City"
          name="City"
          value={filters.City}
          onChange={handleChange}
        />
        <TextField
          label="MemberOf"
          name="MemberOf"
          value={filters.MemberOf}
          onChange={handleChange}
        />
        <TextField
          label="LicenseNumber"
          name="LicenseNumber"
          value={filters.LicenseNumber}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name="Gender"
          value={filters.Gender}
          onChange={handleChange}
        />
      </div>
    </div>


                <section className="container" >
                    <div class="contain">
                        <div className="row">
                            {filteredLawyers.length > 0 ? (
                                filteredLawyers.map((Lawyer) => (
                                    <ShowLawyers
                                        Lawyer={Lawyer}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-5"
                                >
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Lawyer_search_page;
