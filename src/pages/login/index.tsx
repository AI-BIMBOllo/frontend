import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useDataContext } from "@/context/DataContext";
import { API_URL } from "@/config";
    
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useDataContext();
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
        localStorage.setItem('token', data.access_token);
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

  if (user) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src="images/trucks.png" alt="Image" />
        </div>
        <div className={styles.formContainer}>
          <h1>Bienvenido al panel de administrador</h1>
          <h2>Inicié sesión para continuar</h2>
          <p>Ingrese su correo electrónico y contraseña</p>
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formContent}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ingresa nombre de usuario"
                aria-describedby="emailHelp"
              />
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa contraseña"
                required
              />
              <button
                type="submit"
                className={styles.loginButton}
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}


