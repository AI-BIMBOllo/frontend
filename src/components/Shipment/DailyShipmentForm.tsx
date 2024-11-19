import { useEffect, useState } from "react";


export default function DailyShipmentForm() {
  const [shipmentTypes, setShipmentTypes] = useState<{ capacity: number; amount: number }[]>([]);

  useEffect(() => {
    setShipmentTypes([
      { capacity: 10, amount: 3 },
      { capacity: 20, amount: 3 },
      { capacity: 30, amount: 3 },
    ]);
  }, []);

  return (
    <form style={{ width: "fit-content" }}>
      <h3>Contenedores a utilizar hoy:</h3>
      {shipmentTypes.map((shipmentType) => (
        <div className="d-flex align-items-center mb-3" key={shipmentType.capacity}>
          <span className="px-md-3 text-center"><strong>Capacidad:</strong> {shipmentType.capacity} T</span>
          <span className="px-md-3 text-center"><strong>Disponibles:</strong> {shipmentType.amount}</span>
          <input
            style={{ maxWidth: "105px" }}
            type="number"
            className="form-control"
            id={`shipment-type-${shipmentType.capacity}`}
            placeholder="Cantidad"
            required
          />
        </div>
      ))}

      <div className="form-group">
        <input
          type="hidden"
          id="shipment-date"
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success">
          Agregar
        </button>
      </div>
    </form>
  )
}
