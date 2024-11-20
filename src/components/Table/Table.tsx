import React, { FC } from 'react';
import styles from './Table.module.css';

type TableProps = {
    headings: { text: string; object: string }[];
    rows: { [key: string]: string | number | undefined }[];
    footers: { [key: string]: string | number | undefined }[];
}

const Table: FC<TableProps> = ({ headings, rows, footers }) => {
    return (
        <>
            <table className={styles.table}>
                {headings && headings.length > 0 && (
                    <thead>
                        <tr>
                            <th>#</th>
                            {headings.map((heading, index) => (
                                <th key={index}>
                                    {heading.text}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                {rows && rows.length > 0 && (
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{rowIndex + 1}</td>
                                {headings.map((heading, colIndex) => (
                                    <td key={colIndex}>
                                        {row[heading.object]}
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
                                        {footer[heading.object]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                )}
            </table>
        </>
    );
};

export default Table;
