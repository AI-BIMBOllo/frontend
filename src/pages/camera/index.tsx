import React from 'react';
import Head from 'next/head';
import { CustomWebcam } from '@/components/CustomWebcam';

export default function CameraPage() {
  return (
    <>
      <Head>
        <title>Camera</title>
      </Head>
      <section className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Camera</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <CustomWebcam />  
        </div>
      </section>
    </>
  );
}
