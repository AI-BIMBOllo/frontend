import React from 'react';
import Head from 'next/head';
import { useDataContext } from '@/context/DataContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AccountPage() {
  const { user } = useDataContext();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <section className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Account Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <div className="mb-4">
            <label className="font-semibold">Username:</label>
            <p>{user.username}</p>
          </div>
          <div className="mb-4">
            <label className="font-semibold">Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="font-semibold">User ID:</label>
            <p>{user.id}</p>
          </div>
        </div>
      </section>
    </>
  );
}
