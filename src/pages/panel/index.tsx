import React, {useEffect, useState} from "react";
import Head from "next/head";
import styles from "./Panel.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import Table from "@/components/Table/Table";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function PanelPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [originData, setOriginData] = useState<any>([]);

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

  useEffect(()=>{
    const loadData = async() => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/data/origin');
  
        if (response.status === 200) {
          const origins = {
            headings: [ { text: "Origen", object: "origen" }, { text: "Nombre", object: "nombre_origen" }, { text: "Registro", object: "creation" }],
            rows: response?.data
          }
          setOriginData(origins);
        }
      } catch (error) {
      }
    }
    loadData();

  }, []);

  return (
    <div>
      <Head>
        <title>Panel</title>
      </Head>
      <h1 onClick={()=>console.log(originData)}>Panel</h1>
      
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
        <Table headings={originData.headings} rows={originData.rows} footers={[]}/>
      </section>

      {/* Componente del Mapa */}
      {/*<MapComponent isAdmin={true} />*/}
    </div>
  );
}
