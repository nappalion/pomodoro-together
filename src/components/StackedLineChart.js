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
//import 'chartjs-adapter-date-fns';
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
      text: "Week-by-Week Focus Gradient Map",
    },
  },
};

const LineChartStacked = (props) => {
  const { userDataThisWeek, userDataLastWeek, userDataLastLastWeek } = props;

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //x axis
    datasets: [
      {
        label: "This Week", //label of each line/dataset
        data: userDataThisWeek, //y axis (usage of timer)
        backgroundColor: "rgba(0, 0, 0, 1)", //color of label of line
        borderColor: "rgba(0, 0, 0, 1)", //color of line
        tension: 0.2, //how bendy the line is
      },

      {
        label: "Last Week", //label of each line/dataset
        data: userDataLastWeek, //y axis (usage of timer)
        backgroundColor: "rgba(0, 0, 0, .3)", //color of label of line
        borderColor: "rgba(0, 0, 0, .3)", //color of line
        tension: 0.2, //how bendy the line is
      },

      {
        label: "Last-Last Week", //label of each line/dataset
        data: userDataLastLastWeek, //y axis (usage of timer)
        backgroundColor: "rgba(0, 0, 0, .1)", //color of label of line
        borderColor: "rgba(0, 0, 0, .1)", //color of line
        tension: 0.2, //how bendy the line is
      },
    ],
  };

  const styles = {
    chart: {
      width: "100%",
      height: "100%",
    },
  };

  return <Line data={data} options={options} style={styles.chart}></Line>;
};

export default LineChartStacked;
