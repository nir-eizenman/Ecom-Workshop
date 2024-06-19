// themes/theme.js

import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4400', // Change primary color
      mainGradient: "linear-gradient(to right, tomato, cyan)",

    },
    secondary: {
      main: '#ff5722', // Change secondary color
    },
    background: {
      // default: 'linear-gradient(45deg, #774bff, #ff6000)', // Change default background color
    },
    text: {
      primary: '#333', // Change primary text color
      secondary: '#666', // Change secondary text color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Change default font family
  },
});

export default theme;
