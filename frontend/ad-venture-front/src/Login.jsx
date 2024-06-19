import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'company',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${formData.userType}/home`)
    console.log(formData);
  };

  return (
    <Container sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box 
        sx={{
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Paper elevation={6} sx={{ p: 3, textAlign: 'center' }} square={false}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am a</FormLabel>
                  <RadioGroup
                    row
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="company" control={<Radio />} label="Company" />
                    <FormControlLabel value="influencer" control={<Radio />} label="Influencer" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
