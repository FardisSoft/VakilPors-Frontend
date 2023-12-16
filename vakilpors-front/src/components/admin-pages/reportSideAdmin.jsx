import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthProvider";
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Box, Button } from '@mui/material';
import UserStyle from './style';
import StyledButton from '../ButtonComponent';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Moment from 'moment-jalaali';
import axios from 'axios'; // import axios library

const ReportSideAdmin = () => {
  const { refUserRole, getAccessToken } = useAuth();
  const classes = UserStyle();
  const [reports, setReports] = useState([]); 
  
  const fetchReports = async () => {
    try {
      const response = await axios.get('https://api.fardissoft.ir/Report/GetAll', {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });

      if (response.data.isSuccess) {
        setReports(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://api.fardissoft.ir/Report/GetAll', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}` 
          }
        });

        if (response.data.isSuccess) {
          setReports(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReports(); 
  }, []); 

  const handleDeleteReport = async (reportId) => {
    try {
      const response = await axios.delete(`https://api.fardissoft.ir/Report/DeleteReport?report_id=${reportId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });

      if (response.data.isSuccess) {
        fetchReports();

      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <>
      <Helmet>
        <title>بررسی تخلفات وکلا</title>
      </Helmet>

      <Grid container direction='column'>
        <Grid
          container
          item
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }}
        >
          <Typography fontFamily={'shabnam'} fontSize={'18px'}>
            لیست تخلفات ثبت شده:
          </Typography>

          <Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{ ml: '2rem' }}>
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
                    > {report.user.name}
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
                  > تاریخ کامنت : 
                    {Moment(report.threadComment.createDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(report.threadComment.createDate).format('HH:mm')}
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
                      fontSize={'15px'}
                      color={'#555555'}
                    >
                      توضیحات:  {report.description}
                    </Typography>
                    <Typography
                      mt={1}
                      fontFamily={'shabnam'}
                      fontSize={'20px'}
                      color={'#555555'}
                    >
                      متن کامنت:  {report.threadComment.text}
                    </Typography>                    
                  </Box>
                  <Box sx={{ mt: '20px', display: 'flex', gap: '8px' }}>
                    <StyledButton style={{ fontFamily: 'shabnam', maxHeight: '30px', width: '8rem', marginBottom: '1rem', fontSize: '1rem', color: "primary" }}>
                      <ThumbUpOutlinedIcon style={{ marginLeft: '0.25rem' }} />
                      تایید گزارش
                    </StyledButton>
                    <StyledButton onClick={() => handleDeleteReport(report.id)} style={{ fontFamily: 'shabnam', maxHeight: '30px', width: '8rem', marginBottom: '1rem', fontSize: '1rem', color: "primary" }}>
                      <ThumbDownAltOutlinedIcon style={{ marginLeft: '0.25rem' }} />
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