import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from "./theme";
import Routes from "./routes";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
