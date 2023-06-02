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
        width: window.innerWidth < 576 ? (muted ? '50vw' : '70vw') : (muted ? '25vw' : '50vw'),
        height: window.innerWidth < 576 ? (muted ? '50vw' : '70vw') : (muted ? '25vw' : '50vw'),
        objectFit: 'cover',
        margin: '12px',
        borderRadius: '10px',
      }}
    />
  );
};

export default Video;