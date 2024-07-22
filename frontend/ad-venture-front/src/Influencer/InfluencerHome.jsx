import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InfluencerHome = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch('http://127.0.0.1:5001/api/influencer/home');
      const data = await response.json();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  const handleSearch = () => {
    navigate('/influencer/search');
  };

  return (
    <Container sx={{ p: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Influencer Home
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your current and previous works, and search for new opportunities.
        </Typography>
      </Box>

      <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Current Campaigns
        </Typography>
        <List>
          {campaigns.map((campaign, index) => (
            <ListItem key={index}>
              <ListItemText primary={campaign.campaign_name} secondary={campaign.about} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Search for New Opportunities
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InfluencerHome;
