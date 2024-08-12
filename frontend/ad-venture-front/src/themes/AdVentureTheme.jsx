import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // mode: 'light',
    primary: {
      main: '#fe6cac',
    },
    secondary: {
      main: '#b0a427',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: 'orange',
          "& .MuiInputBase-root, & .MuiInputLabel-root": {
            color: '#8afffe'
          },
          '& .MuiInput-root:hover:before': {
            color: "#f00",
            borderBottom: '2px solid rgba(255, 0, 0, 0.5)'
          },
          '& .MuiInput-root:before': {
            borderBottom: '1px solid rgba(255, 0, 0, 0.5)'
          },
        },

        
        
      },
      
    },
      
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#fe6cac', // Default color of the Radio button
          '&.Mui-checked': {
            color: '#fe6cac', // Color when the Radio button is checked
          },
        },
        colorPrimary: {
          '&.Mui-checked': {
            color: '#fe6cac', // Override the primary color when checked
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#fe6cac', // Color of the label text
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'orange'
        }
      }
    }
  }
});

export default theme;