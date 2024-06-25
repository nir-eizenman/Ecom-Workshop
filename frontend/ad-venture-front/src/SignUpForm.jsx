import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Sign Up Influencer</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="paymentMethod"
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="socialLinks"
            label="Social Network Links"
            value={formData.socialLinks}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="followerInterests"
            label="Follower Interest Types"
            value={formData.followerInterests}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="followersLocation"
            label="Followers Location"
            value={formData.followersLocation}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="followersAge"
            label="Followers Age"
            value={formData.followersAge}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="followersGender"
            label="Followers Gender"
            value={formData.followersGender}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="exposureToContent"
            label="Exposure to Content (%)"
            value={formData.exposureToContent}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
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

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            SignUp
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpInfluencerForm;






