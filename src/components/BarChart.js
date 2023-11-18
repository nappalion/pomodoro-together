import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Focus Time Leaderboards",
    },
  },
};

const BarChart = (props) => {
  const { labels, userData } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "Top 5 Users",
        data: userData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const styles = {
    chart: {
      width: "100%",
      height: "100%",
    },
  };

  return <Bar options={options} data={data} style={styles.chart} />;
};

export default BarChart;
