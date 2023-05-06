/*
Not a priority screen
User can view their studying stats over the course of a day, week, month, year

*/

import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set, onValue} from "firebase/database";
import { auth } from '../firebaseConfig.js';

import HoverContainer from '../components/HoverContainer';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import Layout from '../components/Layout';
import LineChartStacked from '../components/StackedLineChart';


function Analytics() {
    const navigate = useNavigate();
    const location = useLocation();

    const [labelsLast10Days, setLabelsLast10Days] = useState([]);
    const [userDataLast10Days, setUserDataLast10Days] = useState([]);

    const [userDataCurrWeek, setUserDataCurrWeek] = useState([]);
    const [userDataLastWeek, setUserDataLastWeek] = useState([]);
    const [userDataLastLastWeek, setUserDataLastLastWeek] = useState([]);

    const [labelsUserTotalFocusData, setLabelsUserTotalFocusData] = useState([]);
    const [userTotalFocusData, setUserTotalFocusData] = useState([]);

    const styles = {
        screen: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        leftSide: {
            height: '100vh',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 50
        },
        rightSide: {
            height: '100vh',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 50
        },
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    }

    const getLastTenDays = () => {
        const dates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];
            dates.push(formattedDate);
        }
        return dates;
    }

    const getCurrentWeek = (weekOffset = 0) => {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7;
        const startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 1 + (weekOffset * 7) // add weekOffset * 7 days
        );
      
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          weekDays.push(currentDate.toISOString().split('T')[0]);
        }
      
        return weekDays;
      }
      

    //labels -> list of keys
    //userData -> list of hours for each key

    useEffect(() => {
        const userFocusRef = ref(database, 'users/' + auth.currentUser.uid + '/focusTime/');
        onValue(userFocusRef, (snapshot) => {
          const focusTime = snapshot.val();
          const lastTenDays = getLastTenDays();
          let labelsLast10Days = [];
          let userDataLast10Days = [];
          for (let i = 0; i < lastTenDays.length; i++) {
            labelsLast10Days.push(lastTenDays[i]);
            if (lastTenDays[i] in focusTime) {
              userDataLast10Days.push(focusTime[lastTenDays[i]]);
            }
            else {
              userDataLast10Days.push(0);
            }
          }
          setLabelsLast10Days(labelsLast10Days);
          setUserDataLast10Days(userDataLast10Days);
    
          const currentWeek = getCurrentWeek();
          let userDataCurrWeek = [];
          for (let i = 0; i < currentWeek.length; i++) {
            if (currentWeek[i] in focusTime) {
              userDataCurrWeek.push(focusTime[currentWeek[i]]);
            }
            else {
              userDataCurrWeek.push(0);
            }
          }
          setUserDataCurrWeek(userDataCurrWeek);
    
          const lastWeek = getCurrentWeek(-1);
          let userDataLastWeek = [];
          for (let i = 0; i < lastWeek.length; i++) {
            if (lastWeek[i] in focusTime) {
              userDataLastWeek.push(focusTime[lastWeek[i]]);
            }
            else {
              userDataLastWeek.push(0);
            }
          }
          setUserDataLastWeek(userDataLastWeek);
    
          const lastLastWeek = getCurrentWeek(-2);
          let userDataLastLastWeek = [];
          for (let i = 0; i < lastLastWeek.length; i++) {
            if (lastLastWeek[i] in focusTime) {
              userDataLastLastWeek.push(focusTime[lastLastWeek[i]]);
            }
            else {
              userDataLastLastWeek.push(0);
            }
          }
          setUserDataLastLastWeek(userDataLastLastWeek);
        });
    
        const usersRef = ref(database, 'users/');
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val();
          const sortedUsers = Object.keys(users).sort((a, b) => {
            return users[b].totalFocusTime - users[a].totalFocusTime;
          });
          const top5UserKeys = sortedUsers.slice(0, 5);
          const top5UsersFocusTime = top5UserKeys.map((userKey) => {
            return users[userKey].totalFocusTime;
          });
          const top5Users = top5UserKeys.map((userKey) => {
            return users[userKey].username;
          });
    
          setLabelsUserTotalFocusData(top5Users);
          setUserTotalFocusData(top5UsersFocusTime);
        });
      }, []);
    
    return(
        
        <Layout header="Analytics" style={styles.screen}>


            <div style={styles.container}>
                <HoverContainer width={'70vw'} height={'50vh'}>
                  <LineChart labels={labelsLast10Days} userData={userDataLast10Days}/>
                </HoverContainer>
                
                <HoverContainer width={'70vw'} height={'50vh'}>
                  <LineChartStacked 
                      userDataThisWeek={userDataCurrWeek} 
                      userDataLastWeek={userDataLastWeek} 
                      userDataLastLastWeek={userDataLastLastWeek}
                  />
                </HoverContainer>


                <HoverContainer width={'70vw'} height={'50vh'}>
                  <PieChart userData={userDataCurrWeek}/>
                </HoverContainer>
                
                <HoverContainer width={'70vw'} height={'50vh'}>
                  <BarChart labels={labelsUserTotalFocusData} userData={userTotalFocusData}/>
                </HoverContainer>
            </div>

        </Layout>
    );
}

export default Analytics;