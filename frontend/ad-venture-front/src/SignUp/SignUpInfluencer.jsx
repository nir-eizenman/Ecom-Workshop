import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Grid } from '@mui/material';

const SignUpInfluencerForm = () => {
  const [formData, setFormData] = useState({
  email: '',
  fullName: '',
  password: '',
  paymentMethod: '',
  socialLinks: '',
  followerInterests: '',
  influencerAge: '',
  influencerGender: '',
  followersLocation: '',
  followersAge: '',
  followersGender: '',
  exposureToContent: '',
  });

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
  };

  return (
  <Container sx={{ p: 2}}>
    <form onSubmit={handleSubmit}>
    <Box 
      sx={{
      maxWidth: 600,
      mx: 'auto',
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Paper elevation={6} sx={{ p: 3}} square={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h2"
          sx={{
            background: 'linear-gradient(to right, #f00, #9500ff);',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Sign Up Influencer
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
          name="fullName"
          label="Full Name"
          value={formData.fullName}
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
          required
          fullWidth
          margin='normal'
          name="socialLinks"
          label="Social Network Links"
          value={formData.socialLinks}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="followerInterests"
          label="Follower Interest Types"
          value={formData.followerInterests}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="followersLocation"
          label="Followers Location"
          value={formData.followersLocation}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="followersAge"
          label="Followers Age"
          value={formData.followersAge}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="followersGender"
          label="Followers Gender"
          value={formData.followersGender}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="exposureToContent"
          label="Exposure to Content (%)"
          value={formData.exposureToContent}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          margin='normal' 
          name="influencerAge"
          label="Influencer Age"
          value={formData.influencerAge}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
          row
          name="influencerGender"
          value={formData.influencerGender}
          onChange={handleChange}
          >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
        <Button type="submit" variant="contained" color="primary">
          SignUp
        </Button>
        </Grid>
      </Grid>
      </Paper>
    </Box>
    </form>
  </Container>
  );
};

export default SignUpInfluencerForm;
