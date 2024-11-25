import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MultiChart from "@/components/Chart/MultiChart/MultiChart";
import Table from "../Table/Table";
import Filter from "../Filter/Filter";
import { API_URL } from "@/config";
import { ChartData } from "chart.js";

const Supply: FC = () => {
  const [data, setData] = useState<any>({ headings: [], rows: [] });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [chartShipmentCounting, setChartShipmentCounting] = useState<any>();
  const [chartArrivedCounting, setChartArrivedCounting] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const chartShipmentCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Cantidad de suministros por transporte",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Transporte",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Suministros",
        },
      },
    },
  };

  const chartArrivedCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Estatus de recepción de suministros",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Estatus de recepción",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Suministros",
        },
      },
    },
  };

  useEffect(() => {
    const processShipmentCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.shipment_identifier ?? "Ninguno"] =
          (acc[item.shipment_identifier ?? "Ninguno"] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Suministros",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const processArrivedCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.arrived ? "Sí" : "No"] =
          (acc[item.arrived ? "Sí" : "No"] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Suministros",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const loadData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/supply`);
        if (response.status === 200) {
          const origins = {
            headings: [
              { text: "Identificador", object: "identifier" },
              { text: "LPN", object: "lpn" },
              { text: "Pronóstico", object: "forecast_identifier" },
              { text: "Recibido", object: "arrived" },
              { text: "Cantidad", object: "cantidad" },
              { text: "Carga", object: "carga" },
              { text: "Fecha de cierre", object: "fecha_de_cierre" },
              { text: "Fecha de envío", object: "fecha_de_envio" },
              { text: "Item", object: "item_identifier" },
              { text: "Latitude", object: "latitude" },
              { text: "Longitude", object: "longitude" },
              { text: "Origen", object: "origin_identifier" },
              { text: "Transporte", object: "shipment_identifier" },
              { text: "Usuario", object: "user_identifier" },
              { text: "Registro", object: "creation" },
            ],
            rows: response.data,
          };
          setData(origins);
          setFilteredData(origins.rows);
          setChartShipmentCounting(processShipmentCounting(response.data));
          setChartArrivedCounting(processArrivedCounting(response.data));
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (filterAttribute && filterValue) {
      const filtered = data.rows.filter(
        (row: any) =>
          row[filterAttribute] &&
          row[filterAttribute]
            .toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data.rows);
    }
  }, [filterValue, filterAttribute, data.rows]);

  return (
    <>
      <div style={{ display: "block", marginTop: "50px" }}>
        <h2 style={{ display: "inline" }}>Suministros</h2>
        <button
          onClick={toggleVisible}
          style={{
            marginLeft: "15px",
            padding: "4px 8px",
            fontSize: "14px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isVisible ? "Ocultar" : "Mostrar"}
        </button>
        {isVisible && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, maxWidth: "60%" }}>
                <MultiChart
                  type="bar"
                  data={chartShipmentCounting}
                  options={chartShipmentCountingOptions}
                />
              </div>
              <div style={{ flex: 1, maxWidth: "40%" }}>
                <MultiChart
                  type="bar"
                  data={chartArrivedCounting}
                  options={chartArrivedCountingOptions}
                />
              </div>
            </div>
            <h4>Registros</h4>
            <Filter
              attributes={data.headings}
              setFilterValue={setFilterValue}
              setFilterAttribute={setFilterAttribute}
            />
            <Table headings={data.headings} rows={filteredData} footers={[]} />
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default Supply;
