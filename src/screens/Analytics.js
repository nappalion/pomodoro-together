/*
Not a priority screen
User can view their studying stats over the course of a day, week, month, year

*/

import React, { useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";


import TimerGroup from '../components/TimerGroup';
import UserTimer from '../components/UserTimer'


import Layout from '../components/Layout';

//import './App.css';
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Analytics() {
    const navigate = useNavigate();
    const location = useLocation();

    const data = {
        labels: ['2023-04-30','2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],//x axis
        datasets: [
          {
            label: 'usage in seconds', //label of each line
            data: [2, 10, 5, 3, 2],//y axis
            backgroundColor: 'aqua',//color of label 
            borderColor: 'black',//color of line
            tension: 0.2
          }
    
        ]
      }

      const options = {//chart options
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true //y axis starts at 0
          }
        }
      }

    const styles = {
        screen: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        leftSide: {
            flex: 2,
            display: 'flex',
            alignItems: 'center',

        },
        rightSide: {
            flex: 1,
        },
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },


    }

    return(
        
        <Layout style={styles.screen}>


            <div style={styles.container}>
                <div style={styles.leftSide}> 
                    <h1>
                        Usage Over Time
                    </h1>

                    <div>
            <Line
                data = {data}
                options = {options}
            ></Line>
      </div>
                </div>

                <div style={styles.rightSide}>
                    
                </div>
                
            </div>

        </Layout>
    );
}

export default Analytics;