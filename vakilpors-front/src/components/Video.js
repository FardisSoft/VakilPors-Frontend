import React from 'react';

const Video = ({ stream, muted }) => {

  const refVideo = React.useRef();

  React.useEffect(() => {
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
        width: window.innerWidth < 576 ? '90%' : '40%',
        height: window.innerWidth < 576 ? '60%' : '50%',
        objectFit: 'cover',
        margin: '12px',
        borderRadius: '10px'
      }}
    />
  );
};

export default Video;