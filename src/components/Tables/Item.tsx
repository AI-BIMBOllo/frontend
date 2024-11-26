import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MultiChart from "@/components/Chart/MultiChart/MultiChart";
import Table from "../Table/Table";
import Filter from "../Filter/Filter";
import { API_URL } from "@/config";
import { ChartData } from "chart.js";

const Item: FC = () => {
  const [data, setData] = useState<any>({ headings: [], rows: [] });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [chartDataCupoCounting, setChartDataCupoCounting] = useState<any>();
  const [chartDataOrganizacionCounting, setChartDataOrganizacionCounting] =
    useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const chartCupoCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Cantidad de productos por cupo",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Cupo",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Productos",
        },
      },
    },
  };

  const chartOrganizacionCountingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Cantidad de productos por organización",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Organización",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Productos",
        },
      },
    },
  };

  useEffect(() => {
    const processDataCupoCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.cupo] = (acc[item.cupo] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Productos",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const processDataOrganizacionCounting = (data: any[]): ChartData<"bar"> => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.organizacion] = (acc[item.organizacion] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
      const dataValues = labels.map((label) => counts[label]);

      return {
        labels,
        datasets: [
          {
            label: "Cantidad de Productos",
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
        const response = await axios.get(`${API_URL}/data/item`);
        if (response.status === 200) {
          const origins = {
            headings: [
              { text: "Identificador", object: "identifier" },
              { text: "Producto", object: "producto" },
              { text: "Organización", object: "organizacion" },
              { text: "Descripción", object: "denomination" },
              { text: "Cupo", object: "cupo" },
              { text: "Activo disponible", object: "active_disponible" },
              { text: "Activo asignado", object: "active_asignado" },
              { text: "Activo total", object: "active_total" },
              { text: "Reserva recibido", object: "reserved_recibido" },
              { text: "Reserva ubicado", object: "reserved_ubicado" },
              {
                text: "Reserva parcialmente asignado",
                object: "reserved_parcialmente_asignado",
              },
              { text: "Reserva asignado", object: "reserved_asignado" },
              { text: "Reserva perdido", object: "reserved_perdido" },
              { text: "Reserva total", object: "reserved_total" },
              { text: "OBLPN picking", object: "oblpn_picking" },
              { text: "OBLPN empacado", object: "oblpn_empacado" },
              { text: "OBLPN cargado", object: "oblpn_cargado" },
              { text: "OBLPN total", object: "oblpn_total" },
              { text: "UOM total", object: "uom_total" },
              { text: "Total de piezas", object: "total_piezas" },
              { text: "Registro", object: "creation" },
            ],
            rows: response.data,
          };
          setData(origins);
          setFilteredData(origins.rows);
          setChartDataCupoCounting(processDataCupoCounting(response.data));
          setChartDataOrganizacionCounting(
            processDataOrganizacionCounting(response.data)
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
        <h2 style={{ display: "inline" }}>Productos</h2>
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
                  data={chartDataCupoCounting}
                  options={chartCupoCountingOptions}
                />
              </div>
              <div style={{ flex: 1, maxWidth: "40%" }}>
                <MultiChart
                  type="bar"
                  data={chartDataOrganizacionCounting}
                  options={chartOrganizacionCountingOptions}
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

export default Item;
