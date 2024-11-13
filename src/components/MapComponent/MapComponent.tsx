/// <reference types="@types/google.maps" />
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pin {
  lat: number;
  lng: number;
  description: string;
}

interface MapComponentProps {
  isAdmin?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ isAdmin = false }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);

  // Inicializar el mapa
  useEffect(() => {
    const initMap = () => {
      const mapInstance = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 12,
        center: { lat: 19.4326, lng: -99.1332 }, // Centro inicial en Ciudad de México
      });
      setMap(mapInstance);
    };

    initMap();
  }, []);

  // Obtener ubicaciones de fotos del backend
  useEffect(() => {
    const fetchPhotoLocations = async () => {
      try {
        const response = await axios.get("/data/get_photo_locations");
        console.log("Datos de ubicaciones recibidos:", response.data);
        setPins(response.data);
      } catch (error) {
        console.error("Error al obtener las ubicaciones de fotos:", error);
      }
    };

    fetchPhotoLocations();
  }, []);

  // Agregar pines al mapa y ajustar los límites del mapa
  useEffect(() => {
    if (map && pins.length > 0) {
      console.log("Agregando pines al mapa...");
      const bounds = new google.maps.LatLngBounds();

      pins.forEach((location: Pin) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.description ,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><strong>${location.description }</strong></div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        // Extender los límites del mapa para incluir este marcador
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));

        console.log("Pin agregado:", location);
      });

      // Ajustar el centro y el zoom del mapa para mostrar todos los pines
      map.fitBounds(bounds);
    }
  }, [map, pins]);

  return (
    <div id="map" style={{ height: "500px", width: "80%", marginLeft: "200px" }}></div>
  );
};

export default MapComponent;
