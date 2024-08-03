import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
  InputLabel,
  CircularProgress,
  Link
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { countries, genders, interestTypes } from '../constants';
import GeneralForm from '../GeneralForm';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: 0,
    width: 'auto'
  }
}));

const schema = {
  "email": {type: 'string', label: 'EMail'},
  "full_name": {type: 'string', label: "Full Name"},
  "password": {type: 'password', label: 'Password'},
  "gender": {type: 'select', label: 'Gender', options: ['Female', 'Male', 'Other']},
  
  "age": {type: 'int', label: 'Age'},
  "instagram": {
    "url": {type: 'string', label: "URL"},
    "username": {type: 'string', label: 'Instagram Username'},
    "followers_interests": {
      type: 'multiselect', 
      label: 'Followers\' Interests', 
      options: [
      "technology",
      "lifestyle",
      "travel"
      ]
    },
    "followers_location": {
      type: 'multiselectpercent',
      label: 'Followers Locations',
      options: countries
    },
    "gender_stats": {
      type: 'percent',
      label: "Gender Distribution",
      options: genders
    },
    "age_stats": {
      type: 'percent',
      label: 'Age Distribution',
      options: [
        "13-17",
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55-64",
        "65+"
      ] 
    },
    "accounts_reached_30": {type: "int", label: 'Reaching-30 Accounts'},
    "followers_count": {type: 'int', label: "Followers Count"}
  }
}

const SignUpInfluencerForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    gender: '',
    // payment_method: '',
    // influencer_social_network_links: {
    //   instagram: ''
    // },
    instagram: {
      url: "",
      username: "",
      followers_interests: [],
      followers_location: {},
      gender_stats: {},
      age_stats: {},
      accounts_reached_30: 0,
      followers_count: 0
    }
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleInterestChange = (event) => {
    setFormData({
      ...formData,
      influencer_follower_interest_types: event.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api-ad-venture.onrender.com:443/api/signup/influencer', {
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
    } finally {
      setLoading(false);
      navigate('/login')
    }
  };

  return (
    <Container sx={{ p: 2 }}>

      {/* <form onSubmit={handleSubmit}> */}
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Paper elevation={6} sx={{ p: 3 }} square={false}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3
              }}
            >
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
              <GeneralForm schema={schema} setFormData={setFormData} formData={formData} />

              {/* <Grid item xs={12} container justifyContent="center"> */}
                <Button type="submit" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
              {/* </Grid> */}
              {/* <Grid item xs={12} container justifyContent="center" sx={{ mt: 2 }}> */}
                <Typography variant="body2">
                  Already signed up?{' '}
                  <Link href="/login" sx={{ ml: 1 }}>Login here</Link>
                </Typography>
              {/* </Grid> */}
            {/* </Grid> */}
          </Paper>
        </Box>
    </Container>
  );
};

export default SignUpInfluencerForm;
