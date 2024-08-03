import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button, Alert, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import {
  EMAIL, PASSWORD, USER_TYPE, RESULT, MESSAGE, RANDOM_SESSION_TOKEN, USER_ID
} from './constants'; // Adjust the import path according to your project structure

const schema = {
  'email': { label: 'Username', type: 'email' },
  'password': { label: 'Password', type: 'password' },
  'userType': { options: ['company', 'influencer'], label: 'User Type', type: 'radio' }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'company',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api-ad-venture.onrender.com:443/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [EMAIL]: formData.email,
          [PASSWORD]: formData.password,
          [USER_TYPE]: formData.userType
        }),
      });

      const data = await response.json();
      console.log('data', data);

      if (data[RESULT]) {
        sessionStorage.setItem(USER_TYPE, data[USER_TYPE]);
        sessionStorage.setItem(RANDOM_SESSION_TOKEN, data[RANDOM_SESSION_TOKEN]);
        sessionStorage.setItem(USER_ID, data[USER_ID]);
        console.log(data[USER_ID]);
        navigate(`/${formData.userType}/home`);
      } else {
        setError(data[MESSAGE]);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
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
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?
              <div></div>
              <Link href="/signup/company" sx={{ ml: 1 }}>Sign up as company</Link>{' '}
              |{' '}
              <Link href="/signup/influencer" sx={{ ml: 1 }}>Sign up as influencer</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
