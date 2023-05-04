/*
This is the place to create a table to hold rows

*/

import React from 'react';
import GroupSettingsIcon from '../assets/settings-fill.svg'
import RemoveGroupIcon from '../assets/delete-bin-fill.svg'
import { useNavigate } from 'react-router-dom';

import { database } from "../firebaseConfig.js"
import { auth } from '../firebaseConfig.js';
import { ref, child, get, set, onValue} from "firebase/database";

function Table(props) {
    const navigate = useNavigate();

    const {style, data, headerText, noIcons } = props;

    const styles = {
        row: {
            color: 'black',
            flex: 1,
            textAlign: 'left',
            fontSize: 20,
            backgroundColor: '#F3F3F3',
            borderBottom: '1px solid #C0BABA'
        },
        categoryText: {
            color: 'black', 
            textAlign: 'start',
            fontSize: 20,
            paddingBottom: 15,
        },
        icon: {
            width: 25,
            marginLeft: 10,
            marginRight: 10,
            
        },
        header: {
            backgroundColor: '#E2EFF8',
            color: 'black',
            flex: 1,
            textAlign: 'left',
            fontSize: 20,
        },
        table: {
            borderCollapse: 'collapse'
        }
    }

    data.map((item, index) => {
        console.log(item)
    })

    function handleRowClick(groupId) {
        const currUserId = auth.currentUser.uid;
        set(ref(database, 'users/' + currUserId + "/currGroup/"), groupId);
        navigate('/timer')
    }

    return(
        <div style={style}>
            <span style={styles.categoryText}>{headerText}</span>
            <table style={styles.table}>
                <thead style={styles.header}>
                    <tr>
                        <th>Name</th>
                        <th>Users</th>
                        {/*empty columns for buttons*/}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr onClick={()=> handleRowClick(item.groupKey)} style={styles.row} key={index}>
                            <td >{item.name}</td>
                            <td >{Object.keys(item.users).length} / {item.roomCapacity}</td>
                            <td>
                                {!noIcons && <img style={styles.icon} src={GroupSettingsIcon} />}
                            </td>
                            <td>
                                { !noIcons && <img style={styles.icon} src={RemoveGroupIcon} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;