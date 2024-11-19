import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "./TrucksPage.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import Popup from "../../components/Popup/Popup";

interface Shipment {
    lat: number;
    lng: number;
    title: string;
    description: string;
    is_available: boolean;
  }

  const ShipmentTable: React.FC<{ data: Shipment[], onRowClick: (shipment: Shipment) => void }> = ({ data, onRowClick }) => {
    return (
      <div style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>CAJAS</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid black', padding: '8px', textAlign: 'left' }}>Numero Caja</th>
              <th style={{ borderBottom: '2px solid black', padding: '8px', textAlign: 'left' }}>Capacidad</th>
              <th style={{ borderBottom: '2px solid black', padding: '8px', textAlign: 'left' }}>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((shipment, index) => (
              <tr key={index} onClick={() => onRowClick(shipment)} style={{ cursor: 'pointer' }}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{shipment.title}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{shipment.description.split(': ')[1]}</td>
                <td
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                    color: shipment.is_available ? 'green' : 'red',
                  }}
                >
                  {shipment.is_available ? 'Disponible' : 'En uso'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default function TrucksPage() {
    const [mapData, setMapData] = useState<Shipment[]>([]);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  
    useEffect(() => {
      console.log("Fetching data...");
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/data/shipment");
          console.log("Resultado Shipments:", response.data);
          if (response.status === 200) {
            const formattedData = response.data.map((item: any) => ({
              lat: item.latitude,
              lng: item.longitude,
              title: item.denomination,
              description: `Capacidad: ${item.capacity}`,
              is_available: item.is_available
            }));
            setMapData(formattedData);
          }
        } catch (error: any) {
          console.error("Error fetching shipments:", error.message);
        }
      };
  
      fetchData();
    }, []);
  
    const handleRowClick = (shipment: Shipment) => {
      setSelectedShipment(shipment);
    };
  
    const handleClosePopup = () => {
      setSelectedShipment(null);
    };

    return (
      <>
        <Head>
          <title>Trucks Page</title>
        </Head>
        <div className={styles.container} style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div className={styles.mapContainer}>
            <MapComponent pins={mapData} mapContainerId="main-map"/>
          </div>
          <div className={styles.tableContainer} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <ShipmentTable data={mapData} onRowClick={handleRowClick} />
          </div>
        </div>
        {selectedShipment && <Popup shipment={selectedShipment} onClose={handleClosePopup} />}
      </>
    );
}
