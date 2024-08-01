import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import { USER_TYPE } from './constants';


const schema = {
  'email': {label: 'Username', type: 'email'},
  'password': {label: 'Password', type: 'password'},
  [USER_TYPE]: {options: ['company', 'influencer'], label: 'User Type', type: 'radio'}
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    [USER_TYPE]: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("HIII")
    await fetch('http://localhost:5001/api/login', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: "include"
    })

    await navigate(`/${formData[USER_TYPE]}/home`);
    console.log(formData);
  };

  return (
    // <ThemeProvider theme={theme}>
      <Container sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 400, mx: 'auto' }}>
          <Paper elevation={6} sx={{ p: 3, textAlign: 'center' }} square={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Login
            </Typography>
            <GeneralForm
              schema={schema}
              formData={formData}
              setFormData={setFormData}
            />
            <Button variant='outlined' onClick={handleSubmit}>
              Login
            </Button>
          </Paper>
        </Box>
      </Container>
    // </ThemeProvider>
  );
};

export default Login;
