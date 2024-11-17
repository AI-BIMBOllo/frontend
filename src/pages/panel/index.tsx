import React from "react";
import Head from "next/head";
import styles from "./Panel.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function PanelPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data : any) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/data/xlsx', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (response.status === 200) {
        reset();
        alert("Archivo subido con éxito.");
      }
    } catch (error) {
      console.error("Hubo un error al subir el archivo:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Panel</title>
      </Head>
      <h1>Panel</h1>
      
      <section>
        <div className={styles.formContainer}>
          <h6>Subir archivo Excel</h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="file">Seleccione la hoja de cálculo:</label>
              <input
                type="file"
                id="file"
                {...register('file', { required: true })} 
                accept=".xlsx,.xls"
              />
              
              {errors.file && <span style={{color: "red"}}>El archivo es obligatorio</span>}
            </div>

            <div>
              <button type="submit">Subir archivo</button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <div className={styles.mainContent}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#Item</th>
                <th scope="col">Nombre de origen</th>
                <th scope="col">Orden</th>
                <th scope="col">Origen</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Componente del Mapa */}
      {/*<MapComponent isAdmin={true} />*/}
    </div>
  );
}
