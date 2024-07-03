import React , {useEffect, useRef, useState} from 'react'

export default function VideoPlayer(props) {
    const { width, height } = props;
    
    const cloudinaryRef = useRef();
    const videoRef = useRef();


    useEffect(() => {
      if( cloudinaryRef.current ) return;
      cloudinaryRef.current = window.cloudinary;
      cloudinaryRef.current.videoPlayer( videoRef.current, {
          cloud_name: '', // your cloud_name goes here // 
          autoplay: true,
      })
  }, []);

  return (
    <video
        ref = {videoRef}
        data-cld-public-id = {`wwe/${props.questionKey}`}
        width={width}  height={height}
        {... props}
    />
  )
}
