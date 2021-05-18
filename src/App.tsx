import React from 'react';
import './App.css';
import { ConnectedCalendarNav } from './pages/main/CalendarNav';
import { ConnectedDaySummary } from './pages/main/DaySummary';
import { ConnectedSearchBar } from './pages/main/SearchBar';

function App() {
  return (
    <div className="App">
      <ConnectedCalendarNav />
      <ConnectedSearchBar stringProp="SearchBar placeholder"></ConnectedSearchBar>
      <ConnectedDaySummary />
      <br />
    </div>
  );
}

export default App;
