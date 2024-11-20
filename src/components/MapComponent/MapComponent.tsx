/// <reference types="@types/google.maps" />
import React, { useEffect, useRef } from "react";

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
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(
        document.getElementById(mapContainerId) as HTMLElement,
        {
          zoom: 12,
          center: { lat: 19.4326, lng: -99.1332 }, // Default center (Mexico City)
        }
      );
    }
  }, [mapContainerId]);

  useEffect(() => {
    if (mapRef.current) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Create LatLngBounds to adjust the map view to the markers
      const bounds = new google.maps.LatLngBounds();

      // Add new markers based on filtered pins
      pins.forEach((location: Pin) => {
        // Determine marker icon based on availability
        let markerIcon = "https://i.postimg.cc/28YD8NM2/Blue-Icon-Map.png"; // Default blue icon
        if (location.is_available !== undefined) {
          markerIcon = location.is_available
            ? "https://i.postimg.cc/4NjphwvL/Green-Icon-Map.png" // Green icon if available
            : "https://i.postimg.cc/k4xJMQNp/Red-Icon-Map.png"; // Red icon if not available
        }

        // Create marker
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapRef.current,
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

        // Extend the bounds to include this marker's position
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div>${location.description}</div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapRef.current, marker);
        });

        // Store the marker for cleanup
        markersRef.current.push(marker);
      });

      // Adjust the map to fit the bounds if there are any pins
      if (pins.length > 0) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [pins]); // Re-render markers whenever `pins` changes

  return <div id={mapContainerId} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapComponent;
