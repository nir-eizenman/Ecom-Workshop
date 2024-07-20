import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';


const schema = {
  'email': {label: 'Username', type: 'email'},
  'password': {label: 'Password', type: 'password'},
  'userType': {options: ['Company', 'Influencer'], label: 'User Type', type: 'radio'}
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'company',
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/${formData.userType}/home`);
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
