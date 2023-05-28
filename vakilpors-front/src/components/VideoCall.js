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
  const [videoStreams, setVideoStreams, refVideoStreams] = useStateRef([]);
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

    const getVideoIndexByUserId = (userId) => {
      return refVideoStreams.current.findIndex((videoStream) => videoStream.userId == userId);
    };

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
      connectNewUser(id);
    });

    refConnection.current.on('UserDisconnected',id => {
      console.log('user disconnected : ',id);
      if(refPeers.current[id]) refPeers.current[id].close();
    });

    myPeer.on('call', call => {
      call.answer(refLocalStream.current);
      call.on('stream', userVideoStream => {
        setVideoStreams([...refVideoStreams.current, {'ref':null, 'src':userVideoStream, 'func':'call', 'userId':refUserId.current}]);
      });
    });

    const connectNewUser = (userId) => {
      const call = myPeer.call(userId, refLocalStream.current);
      call.on('stream', userVideoStream => {
        setVideoStreams([...refVideoStreams.current, {'ref':null, 'src':userVideoStream, 'func':'newu', 'userId':userId}]);
      });
      call.on('close', () => {
        refVideoStreams.current[getVideoIndexByUserId(userId)].ref.remove();
      });
      setPeers({
        ...refPeers.current,
        [userId] : call
      });
    };

    const connectMe = async () => {
      navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
      }).then(stream => {
        setVideoStreams([...refVideoStreams.current, {'ref':null, 'src':stream, 'func':'self', 'userId':refUserId.current}]);
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
      <Grid display={"flex"} flexDirection={{xs:'column',sm:'row'}} width={{xs:'97%',sm:"90%"}} borderRadius={"10px"} paddingY={"40px"} paddingX={{xs:'10px',sm:"20px",md:'50px'}} m={'2%'} justifyContent={"center"} alignSelf={"center"} backgroundColor={'white'}
        sx={{
        display: 'grid',
        gridTemplateColumns: {xs:'repeat(auto-fit, 200)',sm:'repeat(auto-fit, 300)',md:'repeat(auto-fit, 400)'},
        gridAutoRows: {xs:'200',sm:'300',md:'400'},
        gap: '25px',}}
      >
        {refVideoStreams.current.map((videoStream,index) => {
          videoStream.ref = React.createRef();
          return <video key={index} muted={(videoStream.func == 'self')} ref={videoStream.ref}
           width={{xs:'200',sm:'300',md:'400'}} height={{xs:'200',sm:'300',md:'400'}} 
           src={URL.createObjectURL(videoStream.src)} 
           style={{objectFit:'cover'}}
          //  onLoadedMetadata={(video)=>{video.play();}}
           controls>

          </video>
        })}
        {console.log(refVideoStreams.current)}
      </Grid>
    </Grid>
    </>
  );
};

export default VideoCall;