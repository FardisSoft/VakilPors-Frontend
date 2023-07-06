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
        width: muted ? '40vw' : '85vw',
        height: muted ? '20vh' : '75vh',
        ...(muted && {
          position: 'absolute',
          bottom: '20px',
          left: '5vw',
          zIndex: 2,
          border: '3px solid rgba(25,118,210,0.6)',
          maxWidth: '200px',
        }),
        ...(!muted && {
          position: 'absolute',
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