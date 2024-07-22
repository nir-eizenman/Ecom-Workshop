import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Modal, Fab, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ASKING_PRICE } from '../constants';

const InfluencerSearch = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    [ASKING_PRICE]: ''
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch('http://127.0.0.1:5001/api/influencer/home/explore');
      const data = await response.json();
      const mappedData = data.map(campaign => ({
        id: campaign._id.$oid,
        name: campaign.campaign_name,
        maxPayment: campaign.budget,
        category: campaign.categories.join(', '),
        productImage: 'https://via.placeholder.com/150',
        description: campaign.about,
      }));
      setCampaigns(mappedData);
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
    const response = await fetch(`http://127.0.0.1:5001/api/influencer/home/explore/${selectedCampaign.id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log(`Successfully applied to ${selectedCampaign.name} with the following details:`, formData);
      // Handle success, such as showing a notification or updating the UI
    } else {
      console.error('Failed to submit bid:', response.statusText);
      // Handle error, such as showing an error message
    }

    setSelectedCampaign(null);
  };

  const handleGoBack = () => {
    navigate('/influencer/home');
  };

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Search for New Campaigns
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Browse and apply to new campaigns.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item key={campaign.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.productImage}
                  alt={campaign.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {campaign.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Max Payment: {campaign.maxPayment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {campaign.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {campaign.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => setSelectedCampaign(campaign)}>
                    Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

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
            }}>
              <Typography id="apply-modal-title" variant="h6" component="h2">
                Apply to {selectedCampaign.name}
              </Typography>
              <Typography id="apply-modal-description" sx={{ mt: 2, mb: 2 }}>
                {selectedCampaign.description}
              </Typography>
              <TextField
                variant="outlined"
                type='number'
                label="Bid"
                name={ASKING_PRICE}
                value={formData[ASKING_PRICE]}
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={submitBid} sx={{ mt: 2 }}>
                Submit Bid!
              </Button>
            </Box>
          </Modal>
        )}
      </Container>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="secondary"
          onClick={handleGoBack}
          sx={{
            position: 'absolute',
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
