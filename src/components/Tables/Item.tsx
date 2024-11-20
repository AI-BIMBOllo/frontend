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
                        headings: [{ text: "Organización", object: "organizacion" }, { text: "Producto", object: "producto" }, { text: "Descripción", object: "denomination" }, { text: "Cupo", object: "cupo" }, { text: "Cupo", object: "cupo" }],
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

export default Item;
