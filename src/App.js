import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';
import Timer from './screens/Timer';

const styles={
  app: {
    backgroundColor: 'white'
  },
}

function App() {
  return (
    <div>
      <header className="App-header" style={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/timer" element={<Timer/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;