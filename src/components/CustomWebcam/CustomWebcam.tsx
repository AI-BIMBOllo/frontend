import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const CustomWebcam = () => {
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc);

    // Obtener la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Enviar solo la ubicación al backend
          try {
            await axios.post("/data/add_photo_location", {
              lat,
              lng,
            });
            alert("Ubicación enviada con éxito");
          } catch (error) {
            console.error("Error al enviar la ubicación:", error);
            alert("Error al enviar la ubicación");
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          alert("No se pudo obtener la ubicación");
        }
      );
    } else {
      alert("La geolocalización no es compatible con este navegador");
    }
  }, [webcamRef]);

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
