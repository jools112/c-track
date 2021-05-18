import React from 'react';
import './App.css';
import { CalendarNav } from './pages/main/CalendarNav';
import { ConnectedDaySummary } from './pages/main/DaySummary';
import { ConnectedSearchBar } from './pages/main/SearchBar';

function App() {
  return (
    <div className="App">
      <ConnectedSearchBar stringProp="SearchBar placeholder"></ConnectedSearchBar>
      <ConnectedDaySummary />
      <br />
      <CalendarNav stringProp="Calendar Nav placeholder" />
    </div>
  );
}

export default App;
