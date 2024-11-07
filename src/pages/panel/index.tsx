import React from "react";
import Head from "next/head";
import styles from "./Panel.module.css";

export default function PanelPage() {
  return (
    <div>
      <Head>
        <title>Panel</title>
      </Head>
      <h1>Panel</h1>
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
    </div>
  );
}
