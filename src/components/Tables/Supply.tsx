import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Table from '../Table/Table';
import Filter from '../Filter/Filter';
import { API_URL } from "@/config";

const Supply: FC = () => {
    const [data, setData] = useState<any>({ headings: [], rows: [] });
    const [filterValue, setFilterValue] = useState<string>("");
    const [filterAttribute, setFilterAttribute] = useState<string>("lpn");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${API_URL}/data/supply`);
                if (response.status === 200) {
                    const origins = {
                        headings: [{ text: "LPN", object: "lpn" },
                            { text: "Recibido", object: "arrived" },
                            { text: "Cantidad", object: "cantidad" },
                            { text: "Carga", object: "carga" },
                            { text: "Creación", object: "creation" },
                            { text: "Fecha de cierre", object: "fecha_de_cierre" },
                            { text: "Fecha de envío", object: "fecha_de_envio" },
                            { text: "Item", object: "item_identifier" },
                            { text: "Latitude", object: "latitude" },
                            { text: "Longitude", object: "longitude" },
                            { text: "Origen", object: "origin_identifier" },
                            { text: "Transporte", object: "shipment_identifier" },
                            { text: "Usuario", object: "user_identifier" }],
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

export default Supply;
