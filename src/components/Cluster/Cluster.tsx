import React from 'react';
import styles from './Cluster.module.css';

interface Table {
  id: string;
  name: string;
  // Add other table properties as needed
}

interface ClusterProps {
  title: string;
  tables: Table[];
  region: string;
  className?: string;
}

const Cluster: React.FC<ClusterProps> = ({
  title,
  tables,
  region,
  className
}) => {
  return (
    <div className={`${styles.cluster} ${className || ''}`}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <span className={styles.region}>{region}</span>
      </div>
      
      <div className={styles.tables}>
        {tables.map((table) => (
          <div key={table.id} className={styles.table}>
            {table.name}
            {/* Add more table content/components here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cluster;
