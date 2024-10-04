import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";

import "@/assets/styles/globals.css";
require('bootstrap/dist/css/bootstrap.min.css');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
