import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Button, List, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CampaignCard from './CampaignCard';
import { USER_ID } from '../constants';

const InfluencerHome = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5001/api/influencer/${sessionStorage.getItem(USER_ID)}/home`);
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {campaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))}
          </List>
        )}
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
