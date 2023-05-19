import React, { useState, useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import { useNavigate } from "react-router-dom";
import Peer from 'peerjs';
import { Grid } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import { Helmet } from 'react-helmet-async';
import * as signalR from '@microsoft/signalr';

const VideoCall = () => {

  const [connection, setConnection] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [peers, setPeers] = useState({});
  const videoRef = useRef(null);

  const { getAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect( () => {
    const doEveryThing = async () => {
      const token = await getAccessToken();
      if(token){
        startCall(token);
      }
      else{
        console.log('login required');
        navigate("/Login");
      }
    };
    doEveryThing();
  }, []);

  const startCall = (token) => {

    setConnection( new signalR.HubConnectionBuilder()
      .withUrl(BASE_API_ROUTE + "meeting",{
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build()
    );

    const myPeer = new Peer();
    myPeer.on('open',id => {
      setUserId(id);
      const start = async () => {
        try {
          await connection.start();
          console.log("SignalR Connected.");
          await connection.invoke('JoinRoom', roomId, userId);
        } catch (err) {
          console.log('error in connecting SignalR : ',err);
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

    connection.on('user-connected',id => {
      if(userId === id) return;
      console.log('user connected : ',id);
      connectNewUser(id, localStream);
    });

    connection.on('user-disconnected',id => {
      console.log('user disconnected : ',id);
      if(peers[id]) peers[id].close();
    });

    myPeer.on('call', call => {
      call.answer(localStream);
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
        ...peers,
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