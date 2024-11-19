/// <reference types="@types/google.maps" />
import React, { useEffect, useState } from "react";

interface Pin {
  lat: number;
  lng: number;
  title: string;
  description: string;
  is_available?: boolean; // Make this optional since we're defaulting to blue icon
}

interface MapComponentProps {
  pins: Pin[];
  mapContainerId: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ pins, mapContainerId }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      const mapInstance = new google.maps.Map(
        document.getElementById(mapContainerId) as HTMLElement,
        {
          zoom: 12,
          center: { lat: 19.4326, lng: -99.1332 }, // Initial center (Mexico City)
        }
      );
      setMap(mapInstance);
    };

    initMap();
  }, [mapContainerId]);

  useEffect(() => {
    if (map && pins.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      pins.forEach((location: Pin) => {
        // Set the default blue icon from Google Maps
        let markerIcon = "https://i.postimg.cc/28YD8NM2/Blue-Icon-Map.png"; // Blue marker by default

        // Conditional logic if `is_available` exists
        if (location.is_available !== undefined) {
          markerIcon = location.is_available
            ? "https://i.postimg.cc/4NjphwvL/Green-Icon-Map.png" // Green icon if available
            : "https://i.postimg.cc/k4xJMQNp/Red-Icon-Map.png";   // Red icon if not available
        }

        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title,
          label: {
            text: location.title,
            color: "black",
          },
          icon: {
            url: markerIcon, 
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div>${location.description}</div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      });

      map.fitBounds(bounds);
    }
  }, [map, pins]);

  return <div id={mapContainerId} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapComponent;
