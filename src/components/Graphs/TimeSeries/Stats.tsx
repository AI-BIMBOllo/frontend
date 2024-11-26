import { API_URL } from "@/config";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  ScriptableLineSegmentContext,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

// Register required chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Stats() {
  const [chartData, setChartData] = useState(null);

  // Function to dynamically set colors based on the value
  function colorize(ctx: { parsed: { y: number } }) {
    const v = ctx.parsed.y;
    return v < -2000 ? "#D60000"  // Dark red for large negative
      : v < -1000 ? "#F46300"     // Orange for medium negative
        : v < 500 ? "#44DE28"    // Green for small negative & positive
          : v < 1000 ? "#F46300"  // Orange for medium positive
            : "#D60000";        // Dark red for large positive
  }

  function skipped(ctx: ScriptableLineSegmentContext, defaultColor: number[]): number[] | undefined {
    return ctx.p0.skip || ctx.p1.skip ? defaultColor : undefined;
  }

  function getColorBasedOnSegment(ctx: ScriptableLineSegmentContext, defaultColor: string): string | undefined {
    if (ctx.p0.skip || ctx.p1.skip) return 'rgba(0, 0, 0, 0.2)';
    return ctx.p0.parsed.y < ctx.p1.parsed.y ? defaultColor : undefined;
  }

  useEffect(() => {
    // Fetch data from the Flask API when the component mounts
    const fetchChartData = async () => {
      try {
        const response = await fetch(`${API_URL}/forecast/request/error`);
        const data = await response.json();
        console.log(data);
        
        // Set the chart data state
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);


  // DEBUG values || Change with real data from axios API call
  // const chartData = {
  //   labels: ["Lun 11-11-24", "Mar 12-11-24", "Mie 13-11-24", "Jue 14-11-24", "Vie 15-11-24", "Sab 16-11-24", "Dom 17-11-24"],
  //   absoluteError: [500, 900, null, 2100, 230, 1700, 2150],
  //   realError: [500, -900, null, -2100, 230, -1700, 2150],
  //   averageError: [500,700,700,1166.67,932.5,1086,1263.33],
  //   topTenDays: [{ date: "Jue 14-11-24", error: 81 }, { date: "Vie 15-11-24", error: 56 }, { date: "Dom 17-11-24", error: 40 }],
  // }

  if (!chartData) {
    // Show a loading state while data is being fetched
    return <div>Loading...</div>;
  }


  return (
    <>
      <h3>Métricas y análisis</h3>
      <p>En esta sección se presentan las métricas y análisis de las predicciones realizadas por el sistema.</p>
      <div className="d-flex flex-fill">
        <div className="w-75">
          <Line
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Error absoluto",
                  data: chartData.absoluteError,
                  backgroundColor: "#111",
                  fill: false,
                  pointRadius: 4,
                  cubicInterpolationMode: "monotone",
                  tension: 0.4,
                  borderColor: 'rgb(75, 192, 192)',
                  segment: {
                    borderColor: (ctx) =>
                      getColorBasedOnSegment(ctx, 'rgb(192, 75, 75)'),
                    borderDash: (ctx) => skipped(ctx, [6, 6]),
                  },
                  spanGaps: true,
                },
                {
                  label: "Error absoluto promedio",
                  data: chartData.averageError,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderWidth: 6,
                  fill: false,
                  pointRadius: 0,
                  cubicInterpolationMode: "monotone",
                  tension: 0.4,
                  borderColor: 'rgb(75, 192, 192)',
                  segment: {
                    borderColor: (ctx) =>
                      getColorBasedOnSegment(ctx, 'rgb(192, 75, 75)'),
                    borderDash: (ctx) => skipped(ctx, [6, 6]),
                  },
                  spanGaps: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Error en las predicciones por día",
                },
              },
              scales: {
                x: {
                  type: "category",
                  display: true,
                  title: {
                    display: true,
                    text: "Fecha",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Valor del Error",
                  },
                },
              },
            }}
          />
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Error absoluto",
                  backgroundColor: (context) => colorize(context),
                  borderColor: (context) => colorize(context),
                  borderWidth: 1,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: chartData.absoluteError,
                },
                {
                  label: "Error real",
                  backgroundColor: (context) => colorize(context),
                  borderColor: (context) => colorize(context),
                  borderWidth: 1,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: chartData.realError,
                },
                {
                  label: "Error absoluto promedio",
                  backgroundColor: (context) => colorize(context),
                  borderColor: "#000",
                  borderWidth: 4,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: chartData.averageError,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Error en las predicciones por día",
                },
              },
              scales: {
                x: {
                  type: "category",
                  display: true,
                  title: {
                    display: true,
                    text: "Fecha",
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Valor del Error",
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-25 pe-4">
          <h5>Días con mayor error</h5>
          <ol className="list-unstyled">
            {chartData.topTenDays.map((day, index) => (
              <li
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
                key={index}
              >
                <span><strong>{index + 1}</strong>. {day.date}</span><strong>{day.error}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
