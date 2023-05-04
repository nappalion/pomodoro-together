import React from 'react'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  const options = {//chart options
    scales: {
      y: {
        beginAtZero: true //y axis starts at 0
      }
    },

    plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Focus Time: Last 10 Days',
        },
      },
  }

const data = {
labels: ['2023-04-26','2023-04-27','2023-04-28','2023-04-29', '2023-04-30','2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],//x axis
datasets: [
    {
    label: 'Minutes', //label of each line/dataset
    data: [2, 10, 5, 3, 2, 4, 15, 20, 0, 9],//y axis (usage of timer)
    backgroundColor: 'aqua',//color of label of line
    borderColor: 'black',//color of line
    tension: 0.2//how bendy the line is
    }

]
}

const LineChart = () => {



return (
    <div>
      <h1>
        UsageOverTime
      </h1>

      <div>
        <Line
          data = {data}
          options = {options}
        ></Line>
      </div>
    </div>
  )
}

export default LineChart
