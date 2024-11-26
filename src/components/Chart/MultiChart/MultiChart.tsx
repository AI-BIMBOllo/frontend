import React, { FC } from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import styles from './MultiChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

type ChartType = 'bar' | 'line' | 'radar';

type MultiChartProps<T extends ChartType> = {
    type: T;
    data: ChartData<T, number[], string>;
    options?: object;
};

const defaultBarData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [],
};


const defaultOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Comparison',
        },
    },
};

const MultiChart = <T extends ChartType>({
    type,
    data,
    options = defaultOptions,
}: MultiChartProps<T>) => {
    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <Line
                        data={data as ChartData<'line', number[], string>}
                        options={options}
                    />
                );
            case 'radar':
                return (
                    <Radar
                        data={data as ChartData<'radar', number[], string>}
                        options={options}
                    />
                );
            default:
                return (
                    <Bar
                        data={data as ChartData<'bar', number[], string>}
                        options={options}
                    />
                );
        }
    };

    return <div className={styles.chartContainer}>{renderChart()}</div>;
};

MultiChart.defaultProps = {
    type: 'bar',
    data: defaultBarData,
    options: defaultOptions,
};

export default MultiChart;
