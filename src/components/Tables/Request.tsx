import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Table from '../Table/Table';
import Filter from '../Filter/Filter';
import { API_URL } from "@/config";

const Request: FC = () => {
    const [data, setData] = useState<any>({ headings: [], rows: [] });
    const [filterValue, setFilterValue] = useState<string>("");
    const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${API_URL}/data/request`);
                if (response.status === 200) {
                    const origins = {
                        headings: [{ text: "Identificador", object: "identifier" },
                            { text: "Cantidad asignada", object: "asiggned_quantity" },
                            { text: "Registro", object: "creation" },
                            { text: "Es paleta completa", object: "is_full_palette" },
                            { text: "Item", object: "item_identifier" },
                            { text: "Orden", object: "order_identifier" },
                            { text: "Cantidad original del pedido", object: "original_order_quantity" },
                            { text: "Identificador del paquete", object: "package_identifier" },
                            { text: "Cantidad empaquetada", object: "packaged_quantity" },
                            { text: "Cantidad solicitada", object: "requested_quantity" },
                            { text: "Enviado", object: "shipped" }],
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
            <Filter 
                attributes={data.headings} 
                setFilterValue={setFilterValue} 
                setFilterAttribute={setFilterAttribute}
            />
            <Table headings={data.headings} rows={filteredData} footers={[]} />
        </>
    );
};

export default Request;
