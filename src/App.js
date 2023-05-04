import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';
import Timer from './screens/Timer';
import Groups from './screens/Groups';
import CreateGroup from './screens/CreateGroup';
import Analytics from './screens/Analytics';
import Account from './screens/Account';
import Settings from './screens/Settings';
import Signup from './screens/Signup';


const styles={
  app: {
    backgroundColor: 'white',
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },

}

function App() {

  return (
    <div className="App" style={styles.app}>
      <header className="App-header" style={{backgroundColor: 'white'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/timer" element={<Timer/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/create-group" element={<CreateGroup/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;