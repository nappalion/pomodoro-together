import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Focus Time by Days of Week',
      },
    },
  };



const PieChart = (props) => {
  const {userData} = props;
  
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Focus minutes by day of the week',
        data: userData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(128, 128, 128, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(128, 128, 128, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }


  return (
    <div>

      <div style={props.style}>
        <Pie data = {data} options = {options}>
        </Pie>
      </div>

    </div>
  )
}

export default PieChart
