import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useDataContext } from "@/context/DataContext";
import { API_URL } from "@/config";
    
import styles from "../login/Login.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useDataContext();
  const [formData, setFormData] = React.useState({
    username: '',
    name: '',
    first_lastname: '',
    second_lastname: '',
    email: '',
    phone: '',
    password: '',
    position: 1
  });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.msg || 'Error al registrar');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Login error:', err);
    }
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
        <title>Register</title>
      </Head>
      <section className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src="images/trucks.png" alt="Image" />
        </div>
        <div className={styles.formContainer}>
          <h1>Bienvenido al panel de administrador</h1>
          <h2>Registre su información</h2>
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formContent}>
                <div className="row">
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="username" className="form-label">
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
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="name" className="form-label">
                            Nombre(s)
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Nombre(s)"
                        />
                    </div>
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="name" className="form-label">
                            Primer apellido
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="first_lastname"
                            value={formData.first_lastname}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Primer apellido"
                        />
                    </div>
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="name" className="form-label">
                            Segundo apellido
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="second_lastname"
                            value={formData.second_lastname}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Segundo apellido"
                        />
                    </div>
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className={`${styles.column} col-12 col-md-6`}>
                        <label htmlFor="phone" className="form-label">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Teléfono"
                        />
                    </div>
                    <div className={`${styles.column} col-12`}>
                        <label htmlFor="password" className="form-label">
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
                    </div>
                </div>
              <button
                type="submit"
                className={styles.loginButton}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}


