import React from "react";
import Head from "next/head";
import { useDataContext } from "@/context/DataContext";

export default function LoginPage() {
  const { user, setUser } = useDataContext();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="container">
        <h1>Login</h1>
      </section>
    </>
  );
}
