import React, { useState, useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import Peer from 'peerjs';
import { Grid } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import { Helmet } from 'react-helmet-async';
import * as signalR from '@microsoft/signalr';

const VideoCall = () => {

  const [connection, setConnection, refConnection] = useStateRef(null);
  const [roomId, setRoomId, refRoomId] = useStateRef(null);
  const [userId, setUserId, refUserId] = useStateRef(null);
  const [localStream, setLocalStream, refLocalStream] = useStateRef(null);
  const [peers, setPeers, refPeers] = useStateRef({});
  const videoRef = useRef(null);

  const { getAccessToken } = useAuth();

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
          const url = refConnection.current.connection.transport._webSocket.url;
          const id = url.match(/id=([^&]+)/);
          setRoomId(id ? id[1] : null);
          console.log("SignalR Connected. and room id is : ", refRoomId.current);
        } catch (err) {
          console.log('error in connecting SignalR : ',err);
        }
        try {
          await refConnection.current.invoke('JoinMeeting', refRoomId.current, refUserId.current);
          console.log('user with userId : ',refUserId.current,' joined meeting with id : ',refRoomId.current);
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

  return (
    <>
    <Helmet>
      <title>تماس تصویری</title>
    </Helmet>
    <Grid display={"flex"} flexDirection={"column"} minHeight={'100vh'} alignItems={"center"} justifyContent={"center"} width={"100%"} backgroundColor={'#ABC0C0'}>
      <Grid ref={videoRef} container direction={{xs:'column', sm:"row"}} display={"flex"} alignItems={"center"} justifyContent={"center"} width={{xs:'97%',sm:"90%"}} borderRadius={"10px"} paddingY={"40px"} paddingX={{xs:'10px',sm:"20px",md:'50px'}} m={'2%'} backgroundColor={'white'}>
      </Grid>
    </Grid>
    </>
  );
};

export default VideoCall;