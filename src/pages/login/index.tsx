import React from "react";
import Head from "next/head";
import { useDataContext } from "@/context/DataContext";
import { API_URL } from "@/config";

export default function LoginPage() {
  const { setUser } = useDataContext();
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Update user context with all required fields from the API response
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email
        });
        // Redirect to home or dashboard
        window.location.href = '/';
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Login error:', err);
    }
  };

  const handleSubmitDummy = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    setUser({
      id: "123",
      username: formData.username,
      email: "user@example.com"
    });
    localStorage.setItem('token', 'dummy-token-123');
    localStorage.setItem('user', JSON.stringify({
      id: "123",
      username: formData.username,
      email: "user@example.com"
    }));
    window.location.href = '/';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="container">
        <h1>Login</h1>
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmitDummy} className="flex flex-col gap-4 max-w-sm">
          <div>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}
