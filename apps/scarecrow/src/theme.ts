import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  props: {
    MuiPaper: {},
    MuiCard: {},
  },
  palette: {
    type: 'dark',
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green.A700,
    },
  },
});

export default theme;