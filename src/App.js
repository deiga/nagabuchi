import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppointmentList from './components/AppointmentList';
import TopBar from './components/TopBar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar />
      <div className="App">
        <AppointmentList></AppointmentList>
      </div>
    </React.Fragment>
  );
}

export default App;
