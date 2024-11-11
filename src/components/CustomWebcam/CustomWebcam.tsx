import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const CustomWebcam = () => {
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
        },
        [webcamRef]
    );

  return (
    <div className="container">
      <Webcam
        ref={webcamRef}
        audio={false}
        height={600}
        width={600}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {image && <img src={image} alt="Screenshot" />}
    </div>
  );
};

export default CustomWebcam;