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
        width: window.innerWidth < 576 ? (muted ? '35vw' : '85vw') : (muted ? '10vw' : '50vw'),
        height: window.innerWidth < 576 ? (muted ? '35vw' : '85vw') : (muted ? '10vw' : '30vw'),
        objectFit: 'cover',
        margin: '12px',
        borderRadius: '10px',
      }}
    />
  );
};

export default Video;