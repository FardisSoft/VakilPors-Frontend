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

    const myVideo = document.createElement('video');
    myVideo.muted = true;
    myVideo.style.width = '100%';
    myVideo.style.height = '100%';
    myVideo.style.objectFit = 'cover';

    navigator.mediaDevices.getUserMedia({
      audio : true,
      video : true,
    }).then(stream => {
      addVideoStream(myVideo,stream);
      setLocalStream(stream);
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
      userVideo.style.width = '100%';
      userVideo.style.height = '100%';
      userVideo.style.objectFit = 'cover';
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
      userVideo.style.width = '100%';
      userVideo.style.height = '100%';
      userVideo.style.objectFit = 'cover';
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

  };

  return (
    <>
    <Helmet>
      <title>تماس تصویری</title>
    </Helmet>
    <Grid ref={videoRef} sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 300px)',
      gridAutoRows: '300px',
      gap: '25px',
    }}>

    </Grid>
    </>
  );
};

export default VideoCall;