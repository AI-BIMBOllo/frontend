import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";
import { DataProvider } from "@/context/DataContext";
import Script from "next/script";
import "@/assets/styles/globals.css";
require("bootstrap/dist/css/bootstrap.min.css");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Cargar Google Maps API */}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADpn5u0K4gEGurw1BAYg-z6Tk6SakF5jg&libraries=places"
        strategy="beforeInteractive"
      />
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  );
}
