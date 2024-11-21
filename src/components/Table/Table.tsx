import React, { FC, useState } from 'react';
import styles from './Table.module.css';

type TableProps = {
    headings: { text: string; object: string }[];
    rows: { [key: string]: any }[];
    footers: { [key: string]: any }[];
}

const Table: FC<TableProps> = ({ headings, rows, footers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;

    // Calcular el índice de las filas actuales
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

    // Manejar el cambio de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    {headings && headings.length > 0 && (
                        <thead>
                            <tr>
                                <th>No.</th>
                                {headings.map((heading, index) => (
                                    <th key={index}>
                                        {heading.text}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    {currentRows && currentRows.length > 0 && (
                        <tbody>
                            {currentRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{indexOfFirstRow + rowIndex + 1}</td>
                                    {headings.map((heading, colIndex) => (
                                        <td key={colIndex}>
                                            {row[heading.object] !== undefined && row[heading.object] !== null  
                                                ? (typeof row[heading.object] === "boolean" 
                                                    ? (row[heading.object] ? "Sí" : "No") 
                                                    : heading.object === "creation" && !isNaN(Date.parse(row[heading.object])) 
                                                        ? new Date(row[heading.object]).toLocaleString('es-ES', {
                                                            day: '2-digit', 
                                                            month: '2-digit', 
                                                            year: '2-digit', 
                                                            hour: '2-digit', 
                                                            minute: '2-digit', 
                                                            second: '2-digit'
                                                        }) 
                                                        : row[heading.object]) 
                                                : "NA"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {footers && footers.length > 0 && (
                        <tfoot>
                            {footers.map((footer, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{rowIndex + 1}</td>
                                    {headings.map((heading, colIndex) => (
                                        <td key={colIndex}>
                                            {footer[heading.object] !== undefined && footer[heading.object] !== null  
                                                ? (typeof footer[heading.object] === "boolean" 
                                                    ? (footer[heading.object] ? "Sí" : "No") 
                                                    : heading.object === "creation" && !isNaN(Date.parse(footer[heading.object])) 
                                                        ? new Date(footer[heading.object]).toLocaleString('es-ES', {
                                                            day: '2-digit', 
                                                            month: '2-digit', 
                                                            year: '2-digit', 
                                                            hour: '2-digit', 
                                                            minute: '2-digit', 
                                                            second: '2-digit'
                                                        }) 
                                                        : footer[heading.object]) 
                                                : "NA"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    )}
                </table>
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? styles.active : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Table;
