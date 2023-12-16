import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Box, Button } from '@mui/material';
import UserStyle from './style';
import StyledButton from '../../ButtonComponent';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useParams } from 'react-router-dom';
import Moment from 'moment-jalaali';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const MeetingForm = () => {
  const { refUserRole, getAccessToken } = useAuth();
  const classes = UserStyle();
  const { isLawyer } = useParams();
  const [events, setEvents] = useState([]);
  const [googleCalendarLink, setGoogleCalendarLink] = useState('');
      const navigate = useNavigate();


  const handleAcceptEvent = async (eventId) => {
    try {
      const token = await getAccessToken();
  
      const response = await fetch(`https://api.fardissoft.ir/status/${eventId}?status=1`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
  
      if (response.ok) {
        const eventData = await response.json();
        fetchEvents();
        setGoogleCalendarLink(eventData.googleCalendarLink); // ذخیره کردن لینک Google Calendar در استیت
      } else {
        console.error('Failed to update event status:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };
  
  const handleRejectEvent = async (eventId) => {

    try {
  
      const token = await getAccessToken();
      const response = await fetch(`https://api.fardissoft.ir/status/${eventId}?status=2`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
  
      if (response.ok) {
        // به روزرسانی وضعیت رویداد در کامپوننت
        fetchEvents();
      } else {
        console.error('Failed to update event status:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };

  const handleGoogleCalander = async (eventId) => {

    try {
  
      const token = await getAccessToken();
      const url = `https://api.fardissoft.ir/google-calendar/${eventId}`;
      const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});

      console.log(response);
  
      if (response.status == 200) {
        // fetchEvents();
        // window.location.href(response);
        console.log(response.data);

        window.location = response.data;

      } else {
        console.error('Failed to update event status:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };  

  

  const fetchEvents = async () => {
    try {
      const token = await getAccessToken();
      const response = await fetch('https://api.fardissoft.ir/Event', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };





  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await getAccessToken();
        const response = await fetch('https://api.fardissoft.ir/Event', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Failed to fetch events:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [getAccessToken]);

  return (
    <>
      <Helmet>
        <title>لیست رویدادها</title>
      </Helmet>
      <Grid item xs={12} lg={isLawyer == 'false' ? 11 : 12}>
        <Grid container direction="column">
          <Grid
            container
            item
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mb: '2rem', mt: '2rem', mr: '2.5rem' }}
          >
            <Typography fontFamily={'shabnam'} fontSize={'20px'} fontWeight={'600'}>
              لیست رویدادهای من:
            </Typography>
            <Typography fontFamily={'shabnam'} fontSize={'20px'} fontWeight={'600'} sx={{ ml: '2rem' }}>
              {events.length}
            </Typography>
          </Grid>

          <Box className={classes.tabsContainer}>
            <Grid container spacing={2} alignItems="stretch">
              {events.map((event, index) => (
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
                      <Typography fontFamily={'shabnam'} fontSize={'18px'} fontWeight={'bold'}>
                        {event.title}
                      </Typography>

                      <div>
                          {event.status === 0 && (
                              <div>
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
                                  ></Box>                            
                              </div>
                          )}
                          {event.status === 1 && (
                              <div>
                                  <Box
                                    sx={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      backgroundColor: 'green',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'white',
                                    }}
                                  ></Box>                              
                              </div>
                          )}
                          {event.status === 2 && (
                              <div>
                                  <Box
                                    sx={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      backgroundColor: 'red',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'white',
                                    }}
                                  ></Box>                                 
                              </div>
                          )}                                                                                                                                      
                        </div>


                    </Box>

                    <Typography fontFamily={'shabnam'} fontSize={'16px'} mt={5} mb={1}>
                      تاریخ و ساعت شروع : {Moment(event.startTime).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(event.startTime).format('HH:mm')}
                    </Typography>
                    <Typography fontFamily={'shabnam'} fontSize={'16px'} mb={1}>
                      تاریخ و ساعت خاتمه : {Moment(event.endTime).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(event.endTime).format('HH:mm')}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        p: 1,
                      }}
                    >
                      <Typography fontFamily={'shabnam'} fontSize={'14px'} color={'#555555'}>
                        {event.description}
                      </Typography>
                    </Box>

                    {isLawyer !== 'false' && (
                      <Box sx={{ mt: '20px', display: 'flex', gap: '8px' }}>
                        <StyledButton
                          style={{
                            fontFamily: 'shabnam',
                            maxHeight: '30px',
                            width: '8rem',
                            marginBottom: '1rem',
                            fontSize: '1rem',
                            color: 'primary',
                          }}
                          onClick={() => handleAcceptEvent(event.id)}
                        >
                          <ThumbUpOutlinedIcon style={{ marginLeft: '0.25rem' }} />
                          تایید رویداد
                        </StyledButton>
                        <StyledButton
                        style={{
                          fontFamily: 'shabnam',
                          maxHeight: '30px',
                          width: '8rem',
                          marginBottom: '1rem',
                          fontSize: '1rem',
                          color: 'error',
                        }}
                        onClick={() => handleRejectEvent(event.id)}
                      >
                        <ThumbDownAltOutlinedIcon  style={{ marginLeft: '0.25rem' }} />
                        رد رویداد
                      </StyledButton>
                      </Box>
                    )}

                    {isLawyer === "false" && (
                        <div>
                          {event.status === 0 && (
                              <div>
                                <Typography fontFamily={'shabnam'} fontWeight={"600"} fontSize={'18px'} my={1}>
                                  وضعیت رویداد : در انتظار پاسخ وکیل
                                </Typography>                                
                              </div>
                          )}
                          {event.status === 1 && (
                              <div>
                                <Typography fontFamily={'shabnam'} fontSize={'18px'} fontWeight={"600"} my={1}>
                                  وضعیت رویداد : پذیرفته شده توسط وکیل
                                </Typography>                                
                              </div>
                          )}
                          {event.status === 2 && (
                              <div>
                                <Typography fontFamily={'shabnam'} fontWeight={"600"} fontSize={'18px'} my={1}>
                                  وضعیت رویداد : رد شده توسط وکیل
                                </Typography>                                
                              </div>
                          )}                                                                                                                                      
                        </div>
                    )} 

                    {event.status === 1 && (
                        <div>
                          <StyledButton
                            style={{
                              fontFamily: 'shabnam',
                              maxHeight: '30px',
                              width: '15rem',
                              marginBottom: '1rem',
                              fontSize: '1rem',
                              color: 'error',
                            }}
                            onClick={() => handleGoogleCalander(event.id)}
                          >
                            <Typography>افزودن به GOOGLE CALANDER</Typography>
                            </StyledButton>                                                                                                                                        
                        </div>
                    )}   







                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MeetingForm;