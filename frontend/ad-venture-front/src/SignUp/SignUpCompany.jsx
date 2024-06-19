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
import { useNavigate } from 'react-router';

const SignUpCompanyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    password: '',
    paymentMethod: '',
    companySiteLink: '',
    aboutUs: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    navigate('/login');

  };

  return (
    <Container  sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
      <Box 
          sx={{
            maxWidth: 600,
            mx: 'auto',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
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
                  name="paymentMethod"
                  label="Payment Method"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin='normal'
                  name="companySiteLink"
                  label="Company Site Link"
                  value={formData.companySiteLink}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin='normal'
                  name="aboutUs"
                  label="About Us"
                  multiline
                  rows={4}
                  value={formData.aboutUs}
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
