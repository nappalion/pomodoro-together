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
import 'chartjs-adapter-date-fns';
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
          text: 'Week-by-Week Focus Gradient Map',
        },
      },
  }

const data = {
labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],//x axis
datasets: [
    {
    label: 'This Week', //label of each line/dataset
    data: [2, 10, 15, 3, 20, 11, 15],//y axis (usage of timer)
    backgroundColor: 'rgba(0, 0, 0, 1)',//color of label of line
    borderColor: 'rgba(0, 0, 0, 1)',//color of line
    tension: 0.2//how bendy the line is
    },

    {
        label: 'Last Week', //label of each line/dataset
        data: [4, 6, 9, 14, 5, 0, 12],//y axis (usage of timer)
        backgroundColor: 'rgba(0, 0, 0, .3)',//color of label of line
        borderColor: 'rgba(0, 0, 0, .3)',//color of line
        tension: 0.2//how bendy the line is
        },

        {
            label: 'Last-Last Week', //label of each line/dataset
            data: [2, 5, 1, 0, 6, 3, 8],//y axis (usage of timer)
            backgroundColor: 'rgba(0, 0, 0, .1)',//color of label of line
            borderColor: 'rgba(0, 0, 0, .1)',//color of line
            tension: 0.2//how bendy the line is
            }

]
}

const LineChartStacked = () => {



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

export default LineChartStacked
