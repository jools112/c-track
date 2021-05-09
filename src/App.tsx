import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CalendarNav } from './pages/main/CalendarNav';
import { DaySummary } from './pages/main/DaySummary';
import { ConnectedSearchBar } from './pages/main/SearchBar';
import { searchBarReducer } from './store/searchBar/searchBarReducer';

function App() {
  return (
    <div className="App">
      <ConnectedSearchBar stringProp="ost"></ConnectedSearchBar>
      <DaySummary stringProp="spenat" />
      <CalendarNav stringProp="mjölk" />
    </div>
  );
}

export default App;
