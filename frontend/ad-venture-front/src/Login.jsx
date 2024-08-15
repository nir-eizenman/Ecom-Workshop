import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button, Alert, Link, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import {
  EMAIL, PASSWORD, USER_TYPE, RESULT, MESSAGE, RANDOM_SESSION_TOKEN, USER_ID
} from './constants'; // Adjust the import path according to your project structure
import Logo from './Logo';
import AdVentureTheme from './themes/AdVentureTheme'
import { ThemeProvider } from '@mui/material/styles';




const CustomText = styled('div')({
  letterSpacing: '1em',
  fontSize: '3rem',
  color: 'transparent',
  background: 'linear-gradient(45deg, #3948f9 0%, #fe6cab 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

// import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
    0%{background-position:0% 10%}
    50%{background-position:100% 0%}
    100%{background-position:0% 10%}
`;

const InstagramBox = styled(Box)({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, #3948f9 0%,  #fe6cab 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 8s infinite linear`,
});
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
      const response = await fetch('http://127.0.0.1:5001/api/login', {
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
        sessionStorage.setItem(EMAIL, formData[EMAIL]);
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
    <ThemeProvider theme={AdVentureTheme}>

    {/* <InstagramBox> */}
      <Container sx={{ p: 2, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',  }} maxWidth={false}>
        {/* Left Side - Logo */}
        <Box sx={{ gridColumn: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Logo 
            sx={{ maxWidth: '600px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
            imgStyle={{maxWidth: '100%'}}
          />
        </Box>

        {/* Right Side - Login */}
        <Box sx={{ gridColumn: '2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 400, mx: 'auto' }}>
            <Paper  sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(0, 0 ,0, 0)' }} elevation={0} square={true}>
              <CustomText>
                LOGIN
              </CustomText>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <GeneralForm
                schema={schema}
                formData={formData}
                setFormData={setFormData}
                // style={}
              />
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                disabled={loading}
                size='large'
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
        </Box>
      </Container>
    {/* </InstagramBox> */}
    </ThemeProvider>

  );
};

export default Login;
