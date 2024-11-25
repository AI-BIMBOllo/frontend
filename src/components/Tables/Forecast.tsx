import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MultiChart from "@/components/Chart/MultiChart/MultiChart";
import Table from "../Table/Table";
import Filter from "../Filter/Filter";
import { API_URL } from "@/config";
import { ChartData } from "chart.js";

const Forecast: FC = () => {
  const [data, setData] = useState<any>({ headings: [], rows: [] });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [chartDataCounting, setChartDataCounting] = useState<any>();
  const [chartDataError, setChartDataError] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(true);

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
        text: "Cantidad de pronósticos por mes",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mes",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Pronósticos",
        },
      },
    },
  };

  const chartErrorOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Error en pronósticos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Día",
        },
      },
      y: {
        title: {
          display: true,
          text: "Error",
        },
      },
    },
  };

  useEffect(() => {
    const processDataCountingErrors = (data: any[]): ChartData<any> => {
      const labels: string[] = Array.from(
        new Set(
          data.map(
            (item) => new Date(item.creation).toISOString().split("T")[0]
          )
        )
      );

      return {
        labels,
        datasets: [
          {
            label: "Error en Solicitudes",
            data: data
              .filter((item) => item.is_request === true)
              .map((item) => item.error),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Error en Suministros",
            data: data
              .filter((item) => item.is_request === false)
              .map((item) => item.error),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const processDataCounting = (data: any[]): ChartData<any> => {
      const monthData: any[] = Array.from({ length: 12 }, () => ({
        true: 0,
        false: 0,
      }));
      data.forEach((item) => {
        const month = new Date(item.creation).getMonth(); // Extraer el mes
        monthData[month][String(item.is_request) as keyof any] += 1;
      });
      const labels: string[] = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Solicitudes",
            data: monthData.map((month) => month.true),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Cantidad de Suministros",
            data: monthData.map((month) => month.false),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const loadData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/forecast`);
        if (response.status === 200) {
          const forecasts = {
            headings: [
              { text: "Identificador", object: "identifier" },
              { text: "Error", object: "error" },
              { text: "Solicitud", object: "is_request" },
              { text: "Registro", object: "creation" },
            ],
            rows: response.data,
          };
          setData(forecasts);
          setChartDataCounting(processDataCounting(response.data));
          setChartDataError(processDataCountingErrors(response.data));
          setFilteredData(forecasts.rows);
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
        <h2 style={{ display: "inline" }}>Pronósticos</h2>
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
                  type="line"
                  data={chartDataError}
                  options={chartErrorOptions}
                />
              </div>
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <MultiChart
                  type="bar"
                  data={chartDataCounting}
                  options={chartCountingOptions}
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

export default Forecast;
