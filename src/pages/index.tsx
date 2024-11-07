import React, { useState } from "react";
import Head from "next/head";
import { useDataContext } from "@/context/DataContext";
import Cluster from "@/components/Cluster/Cluster";

export default function Home() {
  const { user, setUser } = useDataContext();

  const [name, setName] = useState("");

  // Add dummy data for testing
  const dummyTables = [
    { id: "1", name: "Users Table" },
    { id: "2", name: "Products Table" },
    { id: "3", name: "Orders Table" },
  ];

  return (
    <>
      <Head>
        <title>AI Bimbollo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container">
        Hola {user?.username}
        <br />
        <br />
        <div className="clusters">
          <Cluster
            title="Test Cluster"
            tables={dummyTables}
            region="us-west-1"
            className="test-cluster"
          />
        </div>
      </section>
    </>
  );
}
