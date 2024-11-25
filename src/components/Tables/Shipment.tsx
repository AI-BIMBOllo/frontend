import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MultiChart from "@/components/Chart/MultiChart/MultiChart";
import Table from "../Table/Table";
import Filter from "../Filter/Filter";
import { API_URL } from "@/config";
import { ChartData } from "chart.js";

const Shipment: FC = () => {
  const [data, setData] = useState<any>({ headings: [], rows: [] });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [chartDataCounting, setChartDataCounting] = useState<any>();
  const [chartIsAvailableCounting, setChartIsAvailableCounting] =
    useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const chartCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Cantidad de transportes por capacidad",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Capacidad",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Transportes",
        },
      },
    },
  };

  const chartIsAvailableCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Disponibilidad de transportes",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Estatus de disponibilidad",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Transportes",
        },
      },
    },
  };

  useEffect(() => {
    const processDataCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.capacity] = (acc[item.capacity] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Transportes",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const processIsAvailableCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.is_available ? "Sí" : "No"] =
          (acc[item.is_available ? "Sí" : "No"] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Transportes",
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
        const response = await axios.get(`${API_URL}/data/shipment`);
        if (response.status === 200) {
          const origins = {
            headings: [
              { text: "Identificador", object: "identifier" },
              { text: "Denominación", object: "denomination" },
              { text: "Disponibilidad", object: "is_available" },
              { text: "Capacidad", object: "capacity" },
              { text: "Latitud", object: "latitude" },
              { text: "Longitud", object: "longitude" },
              { text: "Registro", object: "creation" },
            ],
            rows: response.data,
          };
          setData(origins);
          setFilteredData(origins.rows);
          setChartDataCounting(processDataCounting(response.data));
          setChartIsAvailableCounting(
            processIsAvailableCounting(response.data)
          );
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
        <h2 style={{ display: "inline" }}>Transportes</h2>
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
                  data={chartDataCounting}
                  options={chartCountingOptions}
                />
              </div>
              <div style={{ flex: 1, maxWidth: "40%" }}>
                <MultiChart
                  type="bar"
                  data={chartIsAvailableCounting}
                  options={chartIsAvailableCountingOptions}
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

export default Shipment;
