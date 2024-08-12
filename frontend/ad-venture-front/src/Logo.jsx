import React from 'react';
import { Box } from '@mui/material';
import logo from './assets/logo-no-background-cropped (2).svg'; // Adjust the path as per your project structure

const Logo = () => {
  return (
    <Box sx={{ maxWidth: '600px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={logo} alt="Logo" style={{width: '100%'}} />
    </Box>
  );
};

export default Logo;
