import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Table from '../Table/Table';
import Filter from '../Filter/Filter';
import { API_URL } from "@/config";

const Shipment: FC = () => {
    const [data, setData] = useState<any>({ headings: [], rows: [] });
    const [filterValue, setFilterValue] = useState<string>("");
    const [filterAttribute, setFilterAttribute] = useState<string>("identifier");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${API_URL}/data/shipment`);
                if (response.status === 200) {
                    const origins = {
                        headings: [{ text: "Identificador", object: "identifier" },
                            { text: "Denominación", object: "denomination" },
                            { text: "Disponibilidad", object: "is_available" },
                            { text: "Capacidad", object: "capacity" },
                            { text: "Latitud", object: "latitude" },
                            { text: "Longitud", object: "longitude" },
                            { text: "Registro", object: "creation" }],
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

export default Shipment;
