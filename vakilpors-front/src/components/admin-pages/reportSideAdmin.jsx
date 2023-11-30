import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthProvider";
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Box, Button } from '@mui/material';
import UserStyle from './style';
import StyledButton from '../ButtonComponent';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const ReportSideAdmin = () => {
  const { refUserRole, getAccessToken } = useAuth();
  const classes = UserStyle();

  // مجموعه داده ریپورت‌ها
  const reports = [
    {
      offenderName: 'نام متخلف ۱',
      reporterName: 'نام گزارش دهنده ۱',
      description: 'توضیحات گزارش دهنده ۱',
    },
    {
      offenderName: 'نام متخلف ۲',
      reporterName: 'نام گزارش دهنده ۲',
      description: 'توضیحات گزارش دهنده ۲',
    },
    // ... ادامه لیست ریپورت‌ها
  ];

  return (
    <>
      <Helmet>
        <title>بررسی تخلفات وکلا</title>
      </Helmet>

      <Grid container minHeight={'100vh'} direction='column'>
        <Grid
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          item
        >
          <Typography
            fontFamily={'shabnam'}
            fontSize={'18px'}
            sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }}
          >
            لیست تخلفات ثبت شده :
          </Typography>

          <Typography
            fontFamily={'shabnam'}
            fontSize={'18px'}
            sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }}
          >
            {reports.length}
          </Typography>
        </Grid>

        <Box className={classes.tabsContainer}>
          <Grid container spacing={2} alignItems="stretch">
            {reports.map((report, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      fontFamily={'shabnam'}
                      fontSize={'18px'}
                      fontWeight={'bold'}
                    >
                      {report.offenderName}
                    </Typography>
                    <Box
                      sx={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'blue',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                    </Box>
                  </Box>
                  <Typography
                    fontFamily={'shabnam'}
                    fontSize={'16px'}
                    my={2}
                  >
                    {report.reporterName}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      p: 1,
                    }}
                  >
                    <Typography
                      fontFamily={'shabnam'}
                      fontSize={'14px'}
                      color={'#555555'}
                    >
                      {report.description}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: '20px', display: 'flex', gap: '8px' }}>
                  <StyledButton style={{fontFamily:"shabnam", maxHeight:'30px', width: '8rem', marginBottom: '1rem', fontSize: '1rem', color:"primary" }}>
                        <ThumbUpOutlinedIcon style={{ marginLeft: '0.25rem'}}/>
                        تایید گزارش
                    </StyledButton>
                    <StyledButton style={{fontFamily:"shabnam", maxHeight:'30px', width: '8rem', marginBottom: '1rem', fontSize: '1rem', color:"primary" }}>
                        <ThumbDownAltOutlinedIcon style={{ marginLeft: '0.25rem'}}/>
                        رد گزارش
                    </StyledButton>

                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default ReportSideAdmin;