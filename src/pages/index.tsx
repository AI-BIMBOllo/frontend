// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import { useDataContext } from "@/context/DataContext";
// import Cluster from "@/components/Cluster/Cluster";
// import { io, Socket } from "socket.io-client";
// import { DefaultEventsMap } from "@socket.io/component-emitter";
// import { API_URL } from "@/config";


// export default function Home() {
//   let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

//   const { user, setUser } = useDataContext();

//   const [name, setName] = useState("");

//   // Websocket connection
//   useEffect(() => {
//     // Connect to the server
//     socket = io(API_URL);
//     // Listen for events
//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });
//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });
//     socket.on('updates', (data) => {
//       console.log('Received response:', data);
//     });
//     return () => {
//       // Disconnect from the server
//       socket.disconnect();
//     };
//   }, []);

//   // Add dummy data for testing
//   const dummyTables = [
//     { id: "1", name: "Users Table" },
//     { id: "2", name: "Products Table" },
//     { id: "3", name: "Orders Table" },
//   ];

//   return (
//     <>
//       <Head>
//         <title>AI Bimbollo</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <section className="container">
//         Hola {user?.username}
//         <br />
//         <br />
//         <div className="clusters">
//           <Cluster
//             title="Test Cluster"
//             tables={dummyTables}
//             region="us-west-1"
//             className="test-cluster"
//           />
//         </div>
//       </section>
//     </>
//   );
// }


import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Add redirect in useEffect
  useEffect(() => {
    router.push('/panel');
  }, [router]);

  // Return null or loading state while redirecting
  return null;
}