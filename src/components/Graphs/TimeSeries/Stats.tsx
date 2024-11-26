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
import { Bar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

// Register required chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Stats() {
  // Function to dynamically set colors based on the value
  function colorize(ctx: { parsed: { y: number } }) {
    const v = ctx.parsed.y;
    return v < -50 ? "#D60000"  // Dark red for large negative
      : v < -25 ? "#F46300"     // Orange for medium negative
        : v < 25 ? "#44DE28"    // Green for small negative & positive
          : v < 50 ? "#F46300"  // Orange for medium positive
            : "#D60000";        // Dark red for large positive
  }

  function skipped(ctx: ScriptableLineSegmentContext, defaultColor: number[]): number[] | undefined {
    return ctx.p0.skip || ctx.p1.skip ? defaultColor : undefined;
  }

  function getColorBasedOnSegment(ctx: ScriptableLineSegmentContext, defaultColor: string): string | undefined {
    if (ctx.p0.skip || ctx.p1.skip) return 'rgba(0, 0, 0, 0.2)';
    return ctx.p0.parsed.y < ctx.p1.parsed.y ? defaultColor : undefined;
  }


  // DEBUG values || Change with real data from axios API call
  const data = {
    labels: ["Lun 11-11-24", "Mar 12-11-24", "Mie 13-11-24", "Jue 14-11-24", "Vie 15-11-24", "Sab 16-11-24", "Dom 17-11-24"],
    absoluteError: [35, 10, null, 81, 56, 20, 40],
    realError: [35, -10, 40, -81, 56, -20, 40],
    averageError: [21, 17, null, 26, 25, 16, 16],
    topTenDays: [{ date: "Jue 14-11-24", error: 81 }, { date: "Vie 15-11-24", error: 56 }, { date: "Dom 17-11-24", error: 40 }],
  }


  return (
    <>
      <h3>Métricas y análisis</h3>
      <p>En esta sección se presentan las métricas y análisis de las predicciones realizadas por el sistema.</p>
      <div className="d-flex flex-fill">
        <div className="w-75">
          <Line
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: "Error absoluto",
                  data: data.absoluteError,
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
                  data: data.averageError,
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
              labels: data.labels,
              datasets: [
                {
                  label: "Error absoluto",
                  backgroundColor: (context) => colorize(context),
                  borderColor: (context) => colorize(context),
                  borderWidth: 1,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: data.absoluteError,
                },
                {
                  label: "Error real",
                  backgroundColor: (context) => colorize(context),
                  borderColor: (context) => colorize(context),
                  borderWidth: 1,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: data.realError,
                },
                {
                  label: "Error absoluto promedio",
                  backgroundColor: (context) => colorize(context),
                  borderColor: "#000",
                  borderWidth: 4,
                  hoverBackgroundColor: (context) => colorize(context),
                  hoverBorderColor: (context) => colorize(context),
                  data: data.averageError,
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
            {data.topTenDays.map((day, index) => (
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
