import React, { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Peer from 'peerjs';
import * as signalR from '@microsoft/signalr';
import { Box, Grid, IconButton } from '@mui/material';
import { CallEnd } from '@mui/icons-material';
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';

const VideoCall = () => {

  const [connection, setConnection, refConnection] = useStateRef(null);
  const [userId, setUserId, refUserId] = useStateRef(null);
  const [localStream, setLocalStream, refLocalStream] = useStateRef(null);
  const [peers, setPeers, refPeers] = useStateRef({});
  const videoRef = useRef(null);

  const { getAccessToken } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const doEveryThing = async () => {
      const token = await getAccessToken();
      if(token){
        startCall(token);
      }
    };
    doEveryThing();
  }, []);

  const startCall = (token) => {

    setConnection( new signalR.HubConnectionBuilder()
      .withUrl(BASE_API_ROUTE + "meetingHub",{
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build()
    );

    const myPeer = new Peer();
    myPeer.on('open', id => {
      setUserId(id);
      const start = async () => {
        try {
          await refConnection.current.start();
          console.log("SignalR Connected. and room id is : ", roomId);
        } catch (err) {
          console.log('error in connecting SignalR : ',err);
        }
        try {
          await refConnection.current.invoke('JoinMeeting', roomId, refUserId.current);
          console.log('user with userId : ',refUserId.current,' joined meeting with id : ',roomId);
        } catch (err) {
          console.log('error in joining room : ',err);
        }
      };
      start();
    });

    refConnection.current.on('UserConnected',id => {
      console.log('user connected : ',id);
      if(refUserId.current === id) return;
      connectNewUser(id, refLocalStream.current);
    });

    refConnection.current.on('UserDisconnected',id => {
      console.log('user disconnected : ',id);
      if(refPeers.current[id]) refPeers.current[id].close();
    });

    myPeer.on('call', call => {
      call.answer(refLocalStream.current);
      const userVideo = document.createElement('video');
      userVideo.style.width = window.innerWidth < 576 ? '90%' : '40%';
      userVideo.style.height = window.innerWidth < 576 ? '60%' : '50%';
      userVideo.style.objectFit = 'cover';
      userVideo.style.margin = '12px';
      userVideo.style.borderRadius = '10px';

      call.on('stream', userVideoStream => {
        addVideoStream(userVideo, userVideoStream);
      });
    });

    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoRef.current.appendChild(video);
    };

    const connectNewUser = (userId, localStream) => {
      const userVideo = document.createElement('video');
      userVideo.style.width = window.innerWidth < 576 ? '90%' : '40%';
      userVideo.style.height = window.innerWidth < 576 ? '60%' : '50%';
      userVideo.style.objectFit = 'cover';
      userVideo.style.margin = '12px';
      userVideo.style.borderRadius = '10px';

      const call = myPeer.call(userId, localStream);
      call.on('stream', userVideoStream => {
        addVideoStream(userVideo, userVideoStream);
      });
      call.on('close', () => {
        userVideo.remove();
      });
      setPeers({
        ...refPeers.current,
        [userId] : call
      });
    };

    const connectMe = async () => {
      const myVideo = document.createElement('video');
      myVideo.muted = true;
      myVideo.style.width = window.innerWidth < 576 ? '90%' : '40%';
      myVideo.style.height = window.innerWidth < 576 ? '60%' : '50%';
      myVideo.style.objectFit = 'cover';
      myVideo.style.margin = '12px';
      myVideo.style.borderRadius = '10px';

      navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
      }).then(stream => {
        addVideoStream(myVideo,stream);
        setLocalStream(stream);
      }).catch(err => console.log('error in getting camera and microphone : ',err));
    };

    connectMe();

  };

  const endCall = () => {
    refConnection.current.stop();
    navigate('/chatPage');
  };

  return (
    <>
    <Helmet>
      <title>تماس تصویری</title>
    </Helmet>
    <Grid display={"flex"} flexDirection={"column"} minHeight={'100vh'} alignItems={"center"} justifyContent={"center"} width={"100%"} backgroundColor={'#ABC0C0'}>
      <Grid ref={videoRef} container direction={{xs:'column', sm:"row"}} display={"flex"} alignItems={"center"} justifyContent={"center"} width={{xs:'97%',sm:"90%"}} borderRadius={"10px"} paddingY={"40px"} paddingX={{xs:'10px',sm:"20px",md:'50px'}} m={'2%'} backgroundColor={'white'}>
      </Grid>
      <Grid margin={'10px'}>
        <Box backgroundColor='red' width={'44px'} borderRadius={'25px'} padding={'5px'}>
          <IconButton size="small" onClick={endCall}>
            <CallEnd sx={{color:'white'}}/>
          </IconButton>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default VideoCall;