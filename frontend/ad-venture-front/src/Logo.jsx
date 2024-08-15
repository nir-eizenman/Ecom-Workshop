import React from 'react';
import { Box } from '@mui/material';
import logo from './assets/logo-no-background-cropped (2).svg'; // Adjust the path as per your project structure

const Logo = ({ sx, imgStyle }) => {
  return (
    <Box sx={sx}>
      <img src={logo} alt="Logo" style={imgStyle} />
    </Box>
  );
};

export default Logo;
