import React from 'react';
import MapComponent from '../MapComponent/MapComponent';
import { Shipment } from './types';


const Popup: React.FC<{ shipment: Shipment | null, onClose: () => void }> = ({ shipment, onClose }) => {
    if (!shipment) return null;
  
    return (
      <div>
        {/* Background overlay */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
            backdropFilter: 'blur(5px)', // Apply blur effect
            zIndex: 999, // Make sure it is below the popup
          }}
          onClick={onClose} // Optional: close popup when clicking the background
        />
        
        {/* Popup content */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000, // Ensure it appears above the overlay
            width: '50%',
            maxHeight: '80%',
            overflowY: 'auto',
          }}
        >
          <button onClick={onClose} style={{ float: 'right', cursor: 'pointer', backgroundColor: 'white', width: '4%'}}>X</button>
          <h1>{shipment.title}</h1>
          <p>Capacidad: {shipment.description.split(': ')[1]}</p>
          <h3 style={{ color: shipment.is_available ? 'green' : 'red' }}>
            {shipment.is_available ? 'Disponible' : 'En uso'}
          </h3>
          <div style={{ height: '300px', marginTop: '10px' }}>
            <MapComponent pins={[{ lat: shipment.lat, lng: shipment.lng, title: shipment.title, description: shipment.description}]} mapContainerId={`popup-map-${shipment.title}`} />
          </div>
        </div>
      </div>
    );
  };

export default Popup;