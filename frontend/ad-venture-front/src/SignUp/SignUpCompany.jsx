import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpCompanyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    password: '',
    payment_method: '',
    company_site_link: '',
    company_about_us: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/signup/company', {
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
      localStorage.setItem('signupResult', JSON.stringify(result));
      
      // Navigate to another page (e.g., company home page)
      navigate('/company-home');
    } catch (error) {
      console.error('Error:', error);
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="company_name"
                  label="Company Name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="payment_method"
                  label="Payment Method"
                  value={formData.payment_method}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin='normal'
                  name="company_site_link"
                  label="Company Site Link"
                  value={formData.company_site_link}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin='normal'
                  name="company_about_us"
                  label="About Us"
                  multiline
                  rows={4}
                  value={formData.company_about_us}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </form>
    </Container>
  );
};

export default SignUpCompanyForm;
