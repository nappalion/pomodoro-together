import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const options = {
  //chart options
  scales: {
    y: {
      beginAtZero: true, //y axis starts at 0
    },
  },

  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Focus Time: Last 10 Days",
    },
  },
};

const LineChart = (props) => {
  const { labels, userData } = props;

  const data = {
    labels: labels, //x axis; list
    datasets: [
      {
        label: "Minutes", //label of each line/dataset
        data: userData, //y axis (usage of timer); list
        backgroundColor: "aqua", //color of label of line
        borderColor: "black", //color of line
        tension: 0.2, //how bendy the line is
      },
    ],
  };

  return (
    <Line data={data} options={options} maintainAspectRatio={false}></Line>
  );
};

export default LineChart;
