/*
A menu component that displays buttons on the side of the screen (Groups, Create Group, Analytics, Account, Settings, Logout)
Also displays the user's name and profile picture.
*/

import React from 'react';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import GroupsIcon from '../assets/group-fill.svg';
import CreateGroupIcon from '../assets/user-add-fill.svg';
import AnalyticsIcon from '../assets/bar-chart-fill.svg';
import AccountIcon from '../assets/account-circle-fill.svg';
import SettingsIcon from '../assets/settings-fill.svg';
import LogoutIcon from '../assets/logout-box-line.svg';

function Menu(props) {
  const navigate = useNavigate();

  const styles = {
    screen: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',

      zIndex: 9999,
      display: 'flex',
    },
    menu: {
      flex: 2,
      backgroundColor: 'white',
      boxShadow: '1px 2px 9px #2e2e2e',
      padding: 20
    },
    transparent: {
        flex: 5,
        opacity: 0,
    },
  };


  return (
    <div style={styles.screen}>
        <div style={styles.menu}>
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Groups" onClick={() => navigate('/groups')} icon={GroupsIcon} />
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Create Group" onClick={() => navigate('/create-group')} icon={CreateGroupIcon} />
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Analytics" onClick={() => navigate('/analytics')} icon={AnalyticsIcon} />
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Account" onClick={() => navigate('/account')} icon={AccountIcon} />
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Settings" onClick={() => navigate('/settings')} icon={SettingsIcon} />
            <Button color='white' secondaryColor='#DADADA' fontColor="black" text="Logout" onClick={() => navigate('/')} icon={LogoutIcon} />
        </div>
        <div style={styles.transparent} onClick={() => props.onExit()}/>
    </div>
  );
}

export default Menu;
