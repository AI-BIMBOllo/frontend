import { TimeSeries, Stats } from "@/components/Graphs";

export default function Forecast() {
  return (
    <div className="p-4">
      <h1>Predicciones</h1>
      <TimeSeries />
      <Stats />
    </div>
  );
}