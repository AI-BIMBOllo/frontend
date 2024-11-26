import React, { FC } from 'react';
import styles from './Filter.module.css';

type FilterProps = {
    attributes: { text: string; object: string }[];
    setFilterValue: (value: string) => void;
    setFilterAttribute: (attribute: string) => void;
}

const Filter: FC<FilterProps> = ({ attributes = [], setFilterValue, setFilterAttribute }) => {
    return (
        <div className={styles.filterContainer}>
            <input 
                type="text" 
                placeholder="Buscar..."
                className={styles.filterInput} 
                onChange={(e) => setFilterValue(e.target.value)} 
            />
            <select 
                className={styles.filterSelect} 
                onChange={(e) => setFilterAttribute(e.target.value)}
            >
                {attributes.map((heading, index) => (
                    <option key={index} value={heading.object}>
                        {heading.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
