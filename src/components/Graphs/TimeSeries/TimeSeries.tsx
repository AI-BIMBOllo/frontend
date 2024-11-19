import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { API_URL } from '@/config';

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TimeSeries() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the Flask API when the component mounts
    const fetchChartData = async () => {
      try {
        const response = await fetch(`${API_URL}/forecast/request?n_days=30`);
        const data = await response.json();
        console.log('Fetched chart data:', data);
        
        // Set the chart data state
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (!chartData) {
    // Show a loading state while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Time Series</h1>
      <Line
        data={chartData}  // Pass the fetched data to the chart component
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Demanda de Takis Fuego en los siguientes 30 días',
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              type: 'category',
              display: true,
              title: {
                display: true,
                text: 'Fecha',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad',
              },
            },
          },
        }}
      />
    </div>
  );
}
