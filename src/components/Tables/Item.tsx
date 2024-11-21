import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Table from '../Table/Table';
import Filter from '../Filter/Filter';
import { API_URL } from "@/config";

const Item: FC = () => {
    const [data, setData] = useState<any>({ headings: [], rows: [] });
    const [filterValue, setFilterValue] = useState<string>("");
    const [filterAttribute, setFilterAttribute] = useState<string>("producto");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${API_URL}/data/item`);
                if (response.status === 200) {
                    const origins = {
                        headings: [{ text: "Producto", object: "producto" }, { text: "Organización", object: "organizacion" }, { text: "Descripción", object: "denomination" }, { text: "Cupo", object: "cupo" }, { text: "Activo disponible", object: "active_disponible" }, { text: "Activo asignado", object: "active_asignado" }, { text: "Activo total", object: "active_total" }, { text: "Reserva recibido", object: "reserved_recibido" }, { text: "Reserva ubicado", object: "reserved_ubicado" }, { text: "Reserva parcialmente asignado", object: "reserved_parcialmente_asignado" }, { text: "Reserva asignado", object: "reserved_asignado" }, { text: "Reserva perdido", object: "reserved_perdido" }, { text: "Reserva total", object: "reserved_total" }, { text: "OBLPN picking", object: "oblpn_picking" }, { text: "OBLPN empacado", object: "oblpn_empacado" }, { text: "OBLPN cargado", object: "oblpn_cargado" }, { text: "OBLPN total", object: "oblpn_total" }, { text: "UOM total", object: "uom_total" }, { text: "Total de piezas", object: "total_piezas" }, { text: "Registro", object: "creation" }],
                        rows: response.data
                    };
                    setData(origins);
                    setFilteredData(origins.rows);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (filterAttribute && filterValue) {
            const filtered = data.rows.filter((row: any) => 
                row[filterAttribute] && row[filterAttribute].toString().toLowerCase().includes(filterValue.toString().toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data.rows);
        }
    }, [filterValue, filterAttribute, data.rows]);

    return (
        <>
            <h2>Productos</h2>
            <Filter 
                attributes={data.headings} 
                setFilterValue={setFilterValue} 
                setFilterAttribute={setFilterAttribute}
            />
            <Table headings={data.headings} rows={filteredData} footers={[]} />
        </>
    );
};

export default Item;
