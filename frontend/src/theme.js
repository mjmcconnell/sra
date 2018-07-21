import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#79d3c6"
    },
    secondary: {
      main: "#1976d2"
    },
  },
  typography: {
    fontFamily: "Gotham,sans-serif",
  }
});

export default theme;
