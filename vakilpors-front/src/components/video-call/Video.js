import React, { useEffect, useRef } from 'react';

const Video = ({ stream, muted }) => {

  const refVideo = useRef();

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video 
      ref={refVideo} 
      autoPlay 
      playsInline 
      muted={muted}
      style={{
        // width: window.innerWidth < 576 ? (muted ? '35vw' : '85vw') : (muted ? '10vw' : '50vw'),
        // height: window.innerWidth < 576 ? (muted ? '35vw' : '85vw') : (muted ? '10vw' : '30vw'),
        width: muted ? '40vw' : '85vw',
        height: muted ? '20vh' : '75vh',
        ...(muted && {
          position: 'absolute',
          bottom: '20px',
          left: '5vw',
          display: 'flex',
          zIndex: 2,
          alignSelf: 'flex-end',
          border: '5px solid gold',
          maxWidth: '200px',

        }),
        ...(!muted && {
          position: 'absolute',
          display: 'block',
          alignSelf: 'center',
          zIndex: 1,

        }),
        objectFit: 'cover',
        margin: '12px',
        borderRadius: '10px',
      }}
    />
  );
};

export default Video;