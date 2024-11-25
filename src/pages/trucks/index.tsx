import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "./TrucksPage.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import Popup from "../../components/Popup/Popup";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { API_URL } from "@/config";

interface Shipment {
    lat: number;
    lng: number;
    title: string;
    description: string;
    is_available: boolean;
    capacity: number;
  }

  const ShipmentTable: React.FC<{ data: Shipment[], onRowClick: (shipment: Shipment) => void, onFilterChange: (capacity: number | null) => void }> = ({ data, onRowClick, onFilterChange }) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value === "all" ? null : parseInt(event.target.value, 10);
      onFilterChange(value);
    };
  
    return (
      <div style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>CAJAS</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="capacity-filter" style={{ marginRight: '10px' }}>Filtrar por capacidad:</label>
          <select id="capacity-filter" onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
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
    const [filteredData, setFilteredData] = useState<Shipment[]>([]);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
    const [filterCapacity, setFilterCapacity] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/data/shipment");
          if (response.status === 200) {
            const formattedData = response.data.map((item: any) => ({
              lat: item.latitude,
              lng: item.longitude,
              title: item.denomination,
              description: `Capacidad: ${item.capacity}`,
              capacity: item.capacity,
              is_available: item.is_available
            }));
            setMapData(formattedData);
            setFilteredData(formattedData);
          }
        } catch (error: any) {
          console.error("Error fetching shipments:", error.message);
        }
      };
  
      fetchData();
    }, []);

        // Websocket connection
        let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
        useEffect(() => {
          // Connect to the server
          socket = io(API_URL);
          // Listen for events
          socket.on('connect', () => {
            console.log('Connected to server');
          });
          socket.on('disconnect', () => {
            console.log('Disconnected from server');
          });
          socket.on('mapa', async () => {
            try {
              // Reutilizar fetchData para obtener los datos actualizados
              const response = await axios.get("http://localhost:5000/data/shipment");
              if (response.status === 200) {
                const formattedData = response.data.map((item: any) => ({
                  lat: item.latitude,
                  lng: item.longitude,
                  title: item.denomination,
                  description: `Capacidad: ${item.capacity}`,
                  capacity: item.capacity,
                  is_available: item.is_available
                }));
                setMapData(formattedData); // Actualiza todos los datos del mapa
                setFilteredData(formattedData); // Aplica el filtro actual
              }
            } catch (error: any) {
              console.error("Error fetching updated map data:", error.message);
            }
          });
          return () => {
            // Disconnect from the server
            socket.disconnect();
          };
        }, []);
  
    const handleFilterChange = (capacity: number | null) => {
      setFilterCapacity(capacity);
      if (capacity === null) {
        setFilteredData(mapData);
      } else {
        setFilteredData(mapData.filter(item => item.capacity === capacity));
      }
    };
  
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
            <MapComponent pins={filteredData} mapContainerId="main-map"/>
          </div>
          <div className={styles.tableContainer} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <ShipmentTable data={filteredData} onRowClick={handleRowClick} onFilterChange={handleFilterChange} />
          </div>
        </div>
        {selectedShipment && <Popup shipment={selectedShipment} onClose={handleClosePopup} />}
      </>
    );
  }
  
