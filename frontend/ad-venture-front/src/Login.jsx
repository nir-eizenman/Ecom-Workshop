import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import {
  EMAIL, PASSWORD, USER_TYPE, RESULT, MESSAGE, RANDOM_SESSION_TOKEN,
} from './constants'; // Adjust the import path according to your project structure

const schema = {
  'email': { label: 'Username', type: 'email' },
  'password': { label: 'Password', type: 'password' },
  'userType': { options: ['Company', 'Influencer'], label: 'User Type', type: 'radio' }
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'company',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [EMAIL]: formData.email,
          [PASSWORD]: formData.password,
        }),
      });

      const data = await response.json();

      if (data[RESULT]) {
        // Store the user type and session token received from the server in localStorage
        localSession.setItem(USER_TYPE, data[USER_TYPE]);
        localSession.setItem(RANDOM_SESSION_TOKEN, data[RANDOM_SESSION_TOKEN]);
        localSession.setItem(USER_ID, data[RANDOM_SESSION_TOKEN]);

        navigate(`/${data[USER_TYPE]}/home`);
        console.log(formData);
      } else {
        setError(data[MESSAGE]);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <Container sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Paper elevation={6} sx={{ p: 3, textAlign: 'center' }} square={false}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Login
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
  );
};

export default Login;
