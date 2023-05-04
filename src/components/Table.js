/*
This is the place to create a table to hold rows

*/

import React from 'react';
import GroupSettingsIcon from '../assets/settings-fill.svg'
import RemoveGroupIcon from '../assets/delete-bin-fill.svg'

function Table(props) {
    const {style, data, headerText } = props;

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
        console.log(item.name)
    })

    return(
        <div style={style}>
            <span style={styles.categoryText}>{headerText}</span>
            <table style={styles.table}>
                <thead style={styles.header}>
                    <tr>
                        <th>Name</th>
                        <th>Users Online</th>
                        {/*empty columns for buttons*/}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr style={styles.row} key={index}>
                            <td >{item.name}</td>
                            <td >{Object.keys(item.users).length} / 50</td>
                            <td>
                                <img style={styles.icon} src={GroupSettingsIcon} />
                            </td>
                            <td>
                                <img style={styles.icon} src={RemoveGroupIcon} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;