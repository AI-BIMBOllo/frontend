import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";
import Script from "next/script";
import "@/assets/styles/globals.css";
require("bootstrap/dist/css/bootstrap.min.css");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/config";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("mapa", (data) => {
      console.log("Received socket event:", data);
      if (data.message === "Shipment deleted") {
        const denomination = data.shipment_id;
        toast.info(
          <div>
            <strong>{denomination}</strong> ha sido embarcado.
          </div>
        );
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <>
      {/* Cargar Google Maps API */}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADpn5u0K4gEGurw1BAYg-z6Tk6SakF5jg&libraries=places"
        strategy="beforeInteractive"
      />
<<<<<<< Updated upstream
      <Layout>
        <Component {...pageProps} />
      </Layout>
=======
      <DataProvider>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
>>>>>>> Stashed changes
    </>
  );
}
