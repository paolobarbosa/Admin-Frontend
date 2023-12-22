import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/dashboard-content.css';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


const Subjects = () => {
    const data = {
        labels: ['English', 'Thai', 'Math', 'EFL'],
        datasets: [
            {
                label: 'Total Number of Downloads',
                data: [200, 150, 140, 120],
                backgroundColor: ['#4747A7', '#0065BE', '#0091B9', '#00A2A6'],
                borderColor: ['#4747A7', '#0065BE', '#0091B9', '#00A2A6'],
                borderWidth: 2,
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                color: '#000000', 
                anchor: 'end',
                align: 'right', 
                formatter: (value, context) => {
                    return value;
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 250, 
            },
        }
    };
    

    return (
        <>
            <h2 className="heading">Subjects</h2>
            <h6 className="subheading">Monthly Downloads</h6>
            <Bar data={data} options={options} />
        </>
    );
}

export default Subjects;