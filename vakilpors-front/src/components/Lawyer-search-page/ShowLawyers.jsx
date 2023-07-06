import React from "react";
import { Link } from 'react-router-dom';
import '../../css/ShowLawyers.css';
import { BsFillPersonFill, BsPersonWorkspace } from 'react-icons/bs';
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiRank3, GiConfirmed } from "react-icons/gi";
import { ThemeProvider } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { Avatar, CardContent, Grid, Rating } from '@mui/material';
import { Verified } from '@mui/icons-material';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import dlpbp from '../../assests/images/default_lawyer_profile_background_picture.jpg';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});

const StyledTooltip = styled (({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} arrow/>
  ))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
	  backgroundColor: '#f5f5f9',
	  color: 'rgba(0, 0, 0, 0.87)',
	  maxWidth: 300,
	  fontSize: '15px',
	  border: '1px solid #dadde9',
	  fontFamily: 'shabnam',
	},
  }));


const ShowLawyers = ({ Lawyer }) => {

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 my-5">
            <div class="teachers-list" >
                <div class="teacher-item">
                    <div class="box-shadow teacher-box-size"  >
                        <a class="img-layer lazy">

                            <Grid sx={{
                                backgroundImage: `url(${Lawyer.profileBackgroundPictureUrl ? Lawyer.profileBackgroundPictureUrl : dlpbp})`,
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: 250
                            }} display="flex" alignItems="center" justifyContent="center">
                                <CardContent>

                                    <Avatar alt="lawyer profile" sx={{ width: 80, height: 80 }} srcSet={Lawyer.user.profileImageUrl} />

                                </CardContent>
                            </Grid>
                            {/* {Lawyer.isVerified ? (
                                <>
                                    <p class="my-0 mx-1">
                                        <GiConfirmed color='green' size={15}></GiConfirmed>

                                    </p>
                                </>
                            ) : (
                                <p></p>
                            )} */}
                        </a>

                        <Link to={`/LawyerPage/${Lawyer.id}`}>
                            <h2 className="align-center">

                                <p class="my-1">
                                    <BsFillPersonFill color='black' size={'20px'} />    نام و نام خانوادگی :    </p>
                                <a title={Lawyer.user.name}  >
                                    <i class="zmdi zmdi-account mx-3">
                                    </i> {Lawyer.user.name} {Lawyer.isVerified && 
                                        <StyledTooltip title={<React.Fragment>{'تایید شده توسط وکیل پرس'}</React.Fragment>}>
                                            <Verified color='primary'/>
                                        </StyledTooltip>
                                    } </a>
                            </h2>
                            <h2>
                                <p class="my-1">
                                    <BsPersonWorkspace color='black' size={'20px'} /> عنوان : </p>
                                <a title={Lawyer.title}  >
                                    <i class="zmdi zmdi-account mx-3">
                                    </i> {Lawyer.title} </a>
                            </h2>
                            <h2>
                                <p class="my-1">
                                    <AiOutlineFieldNumber color='black' size={'20px'} />  شماره پروانه وکالت : </p>
                                <a title={Lawyer.parvandeNo}  >
                                    <i class="zmdi zmdi-account mx-3">
                                    </i> {Lawyer.parvandeNo} </a>
                            </h2>
                            <h2>
                                <p class="my-2">
                                    <GiRank3 color="black" size={'20px'} />   میانگین امتیاز : </p>
                                <ThemeProvider theme={theme} >
                                    <CacheProvider value={cacheRtl}>
                                        <Rating dir="rtl" name="lawyer rating" value={Lawyer.rating} precision={0.05} readOnly />
                                    </CacheProvider>
                                </ThemeProvider>
                            </h2>
                            <br />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ShowLawyers;
