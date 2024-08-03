import React, { useState } from 'react';
import {
  Button,
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralForm from '../GeneralForm'; // Make sure to import the GeneralForm component
import { COMPANY_ABOUT_US, COMPANY_NAME, COMPANY_SITE_LINK, EMAIL, PASSWORD } from '../constants';

const schema = {
  [EMAIL]: { type: 'string', label: 'Email' },
  [COMPANY_NAME]: { type: 'string', label: 'Company Name' },
  [PASSWORD]: { type: 'password', label: 'Password' },
  [COMPANY_SITE_LINK]: { type: 'string', label: 'Company Site Link' },
  [COMPANY_ABOUT_US]: { type: 'string', label: 'About Us' }
};

const SignUpCompanyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    password: '',
    company_site_link: '',
    company_about_us: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/signup/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      
      // Save result in localStorage
      sessionStorage.setItem('signupResult', JSON.stringify(result));
      
      // Navigate to another page (e.g., company home page)
      navigate('/company-home');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <Container sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
        >
          <Paper elevation={6} sx={{ p: 3, textAlign: 'center' }} square={false}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  background: 'linear-gradient(to right, #f00, #9500ff);',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Sign Up Company
              </Typography>
            </Box>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center' }}>
              <GeneralForm schema={schema} formData={formData} setFormData={setFormData} />
              <Grid item xs={12} container justifyContent="center">
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
              </Grid>
              <Grid item xs={12} container justifyContent="center" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Already signed up?{' '}
                  <Link href="/login" sx={{ ml: 1 }}>Login here</Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </form>
    </Container>
  );
};

export default SignUpCompanyForm;
