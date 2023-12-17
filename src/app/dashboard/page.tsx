'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
    LineElement,
  ArcElement,
  
} from "chart.js";
import { Line,Pie } from "react-chartjs-2";// Replace with your chart library


// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
    LineElement,
    ArcElement


);
const Page = () => {
    // Your chart data and options
    const chartData = {
    labels: ['June', 'July', 'August', 'September', 'October', 'November'],
    datasets: [
        {
            label: 'Summary',
            data: [4,5,10,1,4,5],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
    };
    
    

    const chartOptions = {
    scales: {
            y: {
            type: 'linear' as const,
            beginAtZero: true,
            
        },
    },
    };
    
    // Pie chart data and options
    const pieChartData = {
        labels: ['Call center', 'Passenger', 'Driver'],
        datasets: [
            {
                label: 'Summary',
                data: [4, 54, 13],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Summary Trip</h1>
            <Line data={chartData} options={chartOptions} />
            <hr />
            <h1>Summary User</h1>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
    );
};

export default Page;
