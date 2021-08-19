import React from 'react';
import './App.css';
import { Header } from './pages/Header';
import { ConnectedCalendarNav } from './pages/main/CalendarNav';
import { ConnectedDaySummary } from './pages/main/DaySummary';
import { ConnectedSearchBar } from './pages/main/SearchBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { palette } from './constants/palette';
import { ConnectedButtonbar } from './pages/main/ButtonBar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.orange
    },
    secondary: {
      main: palette.green
    },
    background: {
      default: palette.grey,
      paper: palette.lighterGrey
    },
    text: {
      primary: palette.white,
      secondary: palette.blue
    }
  }
});

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid container spacing={2}>
            <Header />
            <ConnectedCalendarNav />
            <ConnectedButtonbar />
            <ConnectedSearchBar></ConnectedSearchBar>
            <ConnectedDaySummary />
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default App;
