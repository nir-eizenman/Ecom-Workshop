import React, {useState} from 'react';
import {
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Typography,
  FormControl,
  Grid,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { genders, interestTypes } from '../constants';

const StyledTextField = styled(TextField)(({theme}) => ({
  '& .MuiTextField-root': {
    margin: 0,
    width: 'auto'
  }
}))



const SignUpInfluencerForm = () => {
  const [formData,
    setFormData] = useState({
    email: '',
    influencer_full_name: '',
    password: '',
    payment_method: '',
    influencer_social_network_links: {
      instagram: ''
    },
    influencer_follower_interest_types: [],
    influencer_followers_location: '',
    influencer_followers_age: '',
    influencer_followers_gender: [],
    influencer_exposure_content: 0,
    influencer_age: 0,
    influencer_gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestChange = (event) => {
    setFormData({
      ...formData,
      influencer_follower_interest_types: event.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/signup/influencer', {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Container sx={{
      p: 2
    }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
          maxWidth: 600,
          mx: 'auto',
          // '& .MuiTextField-root': {
          //   m: 1,
          //   width: '25ch'
          // }
        }}>
          <Paper elevation={6} sx={{
            p: 3
          }} square={false}>
            <Box
              sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography
                variant="h2"
                sx={{
                background: 'linear-gradient(to right, #f00, #9500ff);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Sign Up Influencer
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{
              textAlign: 'center'
            }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  margin='normal'/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_full_name"
                  label="Full Name"
                  value={formData.influencer_full_name}
                  onChange={handleChange}/>
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
                  onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="payment_method"
                  label="Payment Method"
                  value={formData.payment_method}
                  onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_social_network_links.instagram"
                  label="Instagram Link"
                  value={formData.influencer_social_network_links.instagram}
                  onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="interest-label">Follower Interest Types</InputLabel>
                  <Select
                    labelId="interest-label"
                    name="influencer_follower_interest_types"
                    multiple
                    value={formData.influencer_follower_interest_types}
                    onChange={handleInterestChange}
                    renderValue={(selected) => selected.join(', ')}
                    label="Followers Interest Types">
                    {interestTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_followers_location"
                  label="Followers Location"
                  value={formData.influencer_followers_location}
                  onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_followers_age"
                  label="Followers Age"
                  type="number"
                  value={formData.influencer_followers_age}
                  onChange={handleChange}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="followers-gender-label">Followers Gender</InputLabel>
                  <Select
                    labelId="followers-gender-label"
                    name="influencer_followers_gender"
                    multiple
                    value={formData.influencer_followers_gender}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    label="Followers Gender">
                      {
                        genders.map(g => <MenuItem value={g}>{g}</MenuItem>)
                      }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_exposure_content"
                  label="Exposure to Content (%)"
                  type="number"
                  value={formData.influencer_exposure_content}
                  onChange={handleChange}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  name="influencer_age"
                  label="Influencer Age"
                  type="number"
                  value={formData.influencer_age}
                  onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="influencer-gender-label">Influencer Gender</InputLabel>
                  <Select
                    labelId="influencer-gender-label"
                    name="influencer_gender"
                    value={formData.influencer_gender}
                    onChange={handleChange}>
                      {genders.map(g => <MenuItem value={g}>{g}</MenuItem>)}
                    

                  </Select>
                </FormControl>
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

export default SignUpInfluencerForm;
