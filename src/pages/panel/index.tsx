import React, {useEffect, useState} from "react";
import Head from "next/head";
import styles from "./Panel.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import Origin from "@/components/Tables/Origin";
import Item from "@/components/Tables/Item";
import Order from "@/components/Tables/Order";
import Supply from "@/components/Tables/Supply";
import Request from "@/components/Tables/Request";
import Shipment from "@/components/Tables/Shipment";
import Package from "@/components/Tables/Package";
import Forecast from "@/components/Tables/Forecast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "@/config";

export default function PanelPage() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    
    try {
      console.log("Subiendo archivo...");
      const response = await axios.post(`${API_URL}/data/xlsx`, formData, {
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
      alert("Hubo un error al subir el archivo.");
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Panel</title>
      </Head>
      <h1>Panel de Administración</h1>
      
      <section>
        <div className={styles.formContainer}>
          <h5>Procesar archivo Excel</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="file" className={styles.label}>Seleccione la hoja de cálculo:</label>
              <input
                type="file"
                id="file"
                className={styles.inputFile}
                {...register('file', { required: true })}
                accept=".xlsx,.xls"
              />
              {errors.file && <span className={styles.errorMessage}>El archivo XLSX es obligatorio</span>}
            </div>

            <div>
              <button type="submit" className={styles.submitButton}>Subir archivo</button>
            </div>
          </form>
        </div>
      </section>


      <section style={{marginBottom: '50px',}}>
      <Forecast />
      <Shipment />
      <Order />
      <Request />
      <Supply />
      <Item />
      <Origin />
      <Package />
      </section>
    </div>
  );
}
