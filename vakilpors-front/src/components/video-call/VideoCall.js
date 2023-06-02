import React, { useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Peer from 'peerjs';
import * as signalR from '@microsoft/signalr';
import { Box, Grid, IconButton } from '@mui/material';
import { CallEnd, Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from '../../Constants';
import Video from './Video';

const VideoCall = () => {

  const [connection, setConnection, refConnection] = useStateRef(null);
  const [userId, setUserId, refUserId] = useStateRef(null);
  const [localStream, setLocalStream, refLocalStream] = useStateRef(null);
  const [peers, setPeers, refPeers] = useStateRef({});
  const [streams, setStreams, refStreams] = useStateRef([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const { getAccessToken } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const useUserMedia = () => {
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
      }).then(stream => {
        setLocalStream(stream);
        setStreams([stream]);
      }).catch(err => console.log('error in getting camera and microphone : ',err));

      // return () => {
      //   if (refStreams.current) {
      //     refStreams.current.getTracks().forEach(track => track.stop());
      //   }
      // };
    }, []);
  };

  const useSignalRConnection = () => {
    useEffect(() => {
      const connect = async () => {
        const token = await getAccessToken();
        if(token){
          const conn = new signalR.HubConnectionBuilder()
            .withUrl(BASE_API_ROUTE + "meetingHub",{
              accessTokenFactory: () => token,
              withCredentials: false,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
          setConnection(conn);
          conn.start()
            .then(() => console.log("SignalR Connected. and room id is : ", roomId))
            .catch(err => console.log('error in connecting SignalR : ',err));
        }
      };
      if(!refConnection.current) connect();

      // return () => {
      //   refConnection.current.stop();
      //   refConnection.current.off('UserConnected');
      //   refConnection.current.off('UserDisconnected');
      // };
    }, []);
  };

  const usePeerConnections = () => {
    useEffect(() => {
      if (refConnection.current && refLocalStream.current) {
        const myPeer = new Peer();
        myPeer.on('open', id => {
          setUserId(id);
          refConnection.current.invoke('JoinMeeting', roomId, id)
            .then(() => console.log('user with userId : ',id,' joined meeting with id : ',roomId))
            .catch(err => console.log('error in joining room : ',err));
        });
        refConnection.current.on('UserConnected',id => {
          console.log('user connected : ',id);
          if(refUserId.current === id) return;
          // connect new user
          const call = myPeer.call(id, refLocalStream.current, {metadata: { streamId: refLocalStream.current.id }});
          call.on('stream', userVideoStream => {
            if (!refStreams.current.some(streame => streame.id === userVideoStream.id)) {
              setStreams([...refStreams.current, userVideoStream]);
            }
          });
          call.on('close', () => {
            setStreams(refStreams.current.filter(stream => stream.id !== call.metadata.streamId));
          });
          setPeers({
            ...refPeers.current,
            [id] : call
          });
        });
        refConnection.current.on('UserDisconnected',id => {
          console.log('user disconnected : ',id);
          if(refPeers.current[id]) refPeers.current[id].close();
        });
        myPeer.on('call', call => {
          call.answer(refLocalStream.current, {metadata: { streamId: refLocalStream.current.id }});
          call.on('stream', userVideoStream => {
            if (!refStreams.current.some(streame => streame.id === userVideoStream.id)) {
              setStreams([...refStreams.current, userVideoStream]);
            }
          });
        });

        // return () => {
        //   Object.values(refPeers.current).forEach(call => call.close());
        //   myPeer.destroy();
        //   myPeer.off('open');
        //   myPeer.off('call');
        // };
      }
    }, [refConnection.current, refLocalStream.current]);
  };

  const endCall = () => {
    refConnection.current.stop();
    navigate('/chatPage');
  };

  const handleAudioMute = () => {
    setAudioMuted(audioMuted => !audioMuted);
    const audioTrack = refLocalStream.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
    }
  };
  
  const handleVideoMute = () => {
    setVideoMuted(videoMuted => !videoMuted);
    const videoTrack = refLocalStream.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
    }
  };
  
  useUserMedia();
  useSignalRConnection();
  usePeerConnections();

  return (
    <>
    <Helmet>
      <title>تماس تصویری</title>
    </Helmet>
    <Grid display={"flex"} flexDirection={"column"} minHeight={'100vh'} alignItems={"center"} justifyContent={"center"} width={"100%"} backgroundColor={'#ABC0C0'}>
      <Grid container direction={{xs:'column', sm:"row"}} display={"flex"} alignItems={"center"} justifyContent={"center"} width={{xs:'97%',sm:"90%"}} borderRadius={"10px"} paddingY={"40px"} paddingX={{xs:'10px',sm:"20px",md:'50px'}} m={'2%'} backgroundColor={'white'}>
        <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              height: '100%'
        }}>
          {refStreams.current.map((stream,index) => <Video key={index} stream={stream} muted={index === 0} /> )}
        </div>
      </Grid>
      <Grid container direction={'row'} margin={'10px'} display={'flex'} justifyContent={'center'}>
        <Box backgroundColor='red' width={'44px'} borderRadius={'25px'} padding={'5px'} marginX={'10px'}>
          <IconButton size="small" onClick={endCall}>
            <CallEnd sx={{color:'white'}}/>
          </IconButton>
        </Box>
        <Box backgroundColor='rgb(25,118,210)' width={'44px'} borderRadius={'25px'} padding={'5px'} marginX={'10px'}>
          <IconButton size="small" onClick={handleAudioMute}>
            {audioMuted ? <MicOff sx={{color:'white'}}/> : <Mic sx={{color:'white'}}/>}
          </IconButton>
        </Box>
        <Box backgroundColor='rgb(25,118,210)' width={'44px'} borderRadius={'25px'} padding={'5px'} marginX={'10px'}>
          <IconButton size="small" onClick={handleVideoMute}>
            {videoMuted ? <VideocamOff sx={{color:'white'}}/> : <Videocam sx={{color:'white'}}/>}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default VideoCall;