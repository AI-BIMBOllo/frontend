import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MultiChart from "@/components/Chart/MultiChart/MultiChart";
import Table from "../Table/Table";
import Filter from "../Filter/Filter";
import { API_URL } from "@/config";
import { ChartData } from "chart.js";

const Request: FC = () => {
  const [data, setData] = useState<any>({ headings: [], rows: [] });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [chartIsFullPaletteCounting, setChartIsFullPaletteCounting] =
    useState<any>();
  const [chartShippedCounting, setChartShippedCounting] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const chartIsFullPaletteCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Cantidad de pedidos por palette completo",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Palette completo",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Pedidos",
        },
      },
    },
  };

  const chartShippedCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Estatus de envío de pedidos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Estatus de envío",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Pedidos",
        },
      },
    },
  };

  useEffect(() => {
    const processIsFullPaletteCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.is_full_palette ? "Sí" : "No"] =
          (acc[item.is_full_palette ? "Sí" : "No"] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Pedidos",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const processShippedCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.shipped ? "Sí" : "No"] =
          (acc[item.shipped ? "Sí" : "No"] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Pedidos",
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
        const response = await axios.get(`${API_URL}/data/request`);
        if (response.status === 200) {
          const origins = {
            headings: [
              { text: "Identificador", object: "identifier" },
              { text: "Pronóstico", object: "forecast_identifier" },
              { text: "Cantidad asignada", object: "asiggned_quantity" },
              { text: "Palette completo", object: "is_full_palette" },
              { text: "Item", object: "item_identifier" },
              { text: "Orden", object: "order_identifier" },
              {
                text: "Cantidad original del pedido",
                object: "original_order_quantity",
              },
              { text: "Paquete", object: "package_identifier" },
              { text: "Cantidad empaquetada", object: "packaged_quantity" },
              { text: "Cantidad solicitada", object: "requested_quantity" },
              { text: "Enviado", object: "shipped" },
              { text: "Registro", object: "creation" },
            ],
            rows: response.data,
          };
          setData(origins);
          setFilteredData(origins.rows);
          setChartIsFullPaletteCounting(
            processIsFullPaletteCounting(response.data)
          );
          setChartShippedCounting(processShippedCounting(response.data));
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
        <h2 style={{ display: "inline" }}>Pedidos</h2>
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
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <MultiChart
                  type="bar"
                  data={chartIsFullPaletteCounting}
                  options={chartIsFullPaletteCountingOptions}
                />
              </div>
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <MultiChart
                  type="bar"
                  data={chartShippedCounting}
                  options={chartShippedCountingOptions}
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

export default Request;
