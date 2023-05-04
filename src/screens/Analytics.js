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
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import Layout from '../components/Layout';
import LineChartStacked from '../components/StackedLineChart';


function Analytics() {
    const navigate = useNavigate();
    const location = useLocation();

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
                        
                        <LineChartStacked />
                    </h1>
                </div>

                <div style={styles.rightSide}>
                    <PieChart />
                    <BarChart />
                </div>
                
            </div>

        </Layout>
    );
}

export default Analytics;