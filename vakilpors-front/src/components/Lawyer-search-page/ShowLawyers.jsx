import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ShowLawyers.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiRank3 } from "react-icons/gi";
import { ThemeProvider } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { Avatar, CardContent, Grid, Rating } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});




const ShowLawyers = ({ Lawyer }) => {

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 my-5">
            <div class="teachers-list" >
                <div class="teacher-item">
                    <div class="box-shadow teacher-box-size"  >
                        <a class="img-layer lazy">
                            <Grid sx={{
                                backgroundImage: `url(${Lawyer.profileBackgroundPictureUrl})`,
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' , height : 250
                            }} display="flex" alignItems="center" justifyContent="center">
                                <CardContent>

                                    <Avatar alt="lawyer profile" sx={{ width: 80, height: 80 }} srcSet={Lawyer.user.profileImageUrl}/>

                                </CardContent>
                            </Grid>
                        </a>
                        <Link to={`/LawyerPage/${Lawyer.id}`}>
                            <h2 className="align-center">

                                <p class="my-2"><BsFillPersonFill color='black' />    نام و نام خانوادگی :    </p>
                                <a title={Lawyer.user.name}  >
                                    <i class="zmdi zmdi-account mx-3">
                                    </i> {Lawyer.user.name} </a>
                            </h2>
                            <h2>
                                <p class="my-2"><AiOutlineFieldNumber color='black' />  شماره پروانه وکالت: </p>
                                <a title={Lawyer.parvandeNo}  >
                                    <i class="zmdi zmdi-account mx-3">
                                    </i> {Lawyer.parvandeNo} </a>
                            </h2>
                            <h2>
                                <p class="my-2"><GiRank3 color="black" />   رتبه شخص: </p>
                                <ThemeProvider theme={theme}>
                                    <CacheProvider value={cacheRtl}>
                                        <Rating dir="rtl" name="lawyer rating" value={Lawyer.rating} precision={0.05} readOnly />
                                    </CacheProvider>
                                </ThemeProvider>
                                <a title={Lawyer.rating} >
                                    <i class="zmdi zmdi-account mx-3" >
                                    </i>  {Lawyer.rating}</a>
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ShowLawyers;
