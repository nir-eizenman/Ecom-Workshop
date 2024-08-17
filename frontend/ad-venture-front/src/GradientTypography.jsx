import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const GradientTypography = styled(Typography)(({ color1, color2 }) => ({
  background: `linear-gradient(90deg, ${color1}, ${color2})`, // Customize your gradient here
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));


export default GradientTypography;

