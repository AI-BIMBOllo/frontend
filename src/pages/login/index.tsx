import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useDataContext } from "@/context/DataContext";
import styles from "./Login.module.css";

export default function LoginPage() {
  const { user, setUser } = useDataContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push('/panel'); 
  };

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
          <form onSubmit={handleSubmit}> {/* Attach handleSubmit */}
            <div className={styles.formContent}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Usuario
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Ingresa nombre de usuario"
                aria-describedby="emailHelp"
              />
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ingresa contraseña"
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


