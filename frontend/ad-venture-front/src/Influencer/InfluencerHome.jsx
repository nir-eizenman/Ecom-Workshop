import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Button, List, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CampaignCard from './CampaignCard';
import { USER_ID } from '../constants';
import GradientTypography from '../GradientTypography';

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
        <GradientTypography variant="h2" sx={{ mb: 2 }} color1="#ff12ed" color2="#ff8d5e">
          Influencer Home
        </GradientTypography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your current and previous works, and search for new opportunities.
        </Typography>
      </Box>

      <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
        <GradientTypography variant="h4" sx={{ mb: 2 }} color1="#ff12ed" color2="#ff8d5e">
          Current Campaigns
        </GradientTypography>
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

      {/* <Paper elevation={6} sx={{ p: 3, mb: 4 }}> */}

        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}> */}
          <Button 
            variant="contained" 
            sx={{background: 'white', display: 'block', margin: 'auto', }} 
            onClick={handleSearch}
          >
            <GradientTypography variant="h4" sx={{  }} color1="#12d4ff" color2="#ff00ff">
              Search for New Opportunities
            </GradientTypography>
          </Button>
        {/* </Box> */}
      {/* </Paper> */}
    </Container>
  );
};

export default InfluencerHome;
