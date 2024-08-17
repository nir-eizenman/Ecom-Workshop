import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Grid, CardMedia, CardActions, Button, Modal, Fab, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ASKING_PRICE, USER_ID } from '../constants';
import CampaignCard from './CampaignCard'; // Import the CampaignCard component
import GradientTypography from '../GradientTypography';

const InfluencerSearch = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    [ASKING_PRICE]: ''
  });
  const [submittedCampaigns, setSubmittedCampaigns] = useState([]); // Track submitted campaigns
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Track snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Track snackbar message

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5001/api/influencer/${sessionStorage.getItem(USER_ID)}/home/explore`);
        const data = await response.json();
        setCampaigns(data.available_campaigns); // Set the campaigns directly from the fetched data
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitBid = async () => {
    const response = await fetch(`http://127.0.0.1:5001/api/influencer/${sessionStorage.getItem(USER_ID)}/home/explore/${selectedCampaign.campaign_id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log(`Successfully applied to ${selectedCampaign.campaign_name} with the following details:`, formData);
      setSubmittedCampaigns([...submittedCampaigns, selectedCampaign.campaign_id]); // Add the campaign to the submitted list
      setSnackbarMessage(`Bid submitted to ${selectedCampaign.campaign_name} with an asking price of ${formData[ASKING_PRICE]}`);
      setSnackbarOpen(true);
    } else {
      console.error('Failed to submit bid:', response.statusText);
    }

    setSelectedCampaign(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/influencer/home');
  };

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <GradientTypography variant="h2" sx={{ mb: 2 }} color1="purple" color2="lightblue">
            Search for New Campaigns
          </GradientTypography>
          <Typography variant="subtitle1" color="textSecondary">
            Browse and apply to new campaigns.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {campaigns.map((campaign, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <CampaignCard 
                  campaign={campaign} 
                  handleApply={() => setSelectedCampaign(campaign)} 
                  disabled={submittedCampaigns.includes(campaign.campaign_id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {selectedCampaign && (
          <Modal
            open={!!selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            aria-labelledby="apply-modal-title"
            aria-describedby="apply-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              m: 'auto'
            }}>
              <Typography id="apply-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Apply to {selectedCampaign.campaign_name}
              </Typography>
              <TextField
                variant="outlined"
                type='number'
                label="Bid"
                name={ASKING_PRICE}
                value={formData[ASKING_PRICE]}
                onChange={handleInputChange}
                sx={{ display: 'block', mb: 2 }} 
                disabled={submittedCampaigns.includes(selectedCampaign.campaign_id)} // Disable if already submitted
              />
              <Button
                variant="contained"
                onClick={submitBid}
                sx={{ mt: 2 }}
                disabled={submittedCampaigns.includes(selectedCampaign.campaign_id)} // Disable if already submitted
              >
                Submit Bid!
              </Button>
            </Box>
          </Modal>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="secondary"
          onClick={handleGoBack}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          size='large'
          variant='extended'
        >
          <ArrowBackIcon />
          Go Back
        </Fab>
      </Box>
    </>
  );
};

export default InfluencerSearch;
