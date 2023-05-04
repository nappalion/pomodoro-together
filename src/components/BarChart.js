import React from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Focus Time Leaderboards',
      },
    },
  };

  const labels = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Top 5 Users',
        data: [90, 70, 50, 38, 20],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

const BarChart = () => {
  return (
    <div>
      <Bar options={options} data={data} />;
    </div>
  )
}

export default BarChart
