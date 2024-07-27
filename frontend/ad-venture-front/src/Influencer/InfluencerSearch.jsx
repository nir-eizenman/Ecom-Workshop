import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Modal, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

=======
import { Container, Box, Typography, Grid, CardMedia, CardActions, Button, Modal, Fab, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ASKING_PRICE } from '../constants';
import CampaignCard from './CampaignCard'; // Import the CampaignCard component
>>>>>>> Stashed changes

const InfluencerSearch = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([
    { name: 'Campaign 1', maxPayment: '1000', category: 'Beauty', productImage: 'https://via.placeholder.com/150', description: 'Description of Campaign 1' },
    { name: 'Campaign 2', maxPayment: '1200', category: 'Fitness', productImage: 'https://via.placeholder.com/150', description: 'Description of Campaign 2' },
    { name: 'Campaign 3', maxPayment: '900', category: 'Health', productImage: 'https://via.placeholder.com/150', description: 'Description of Campaign 3' },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [bidDetails, setBidDetails] = useState({
    number_of_stories: '',
    number_of_posts: '',
    number_of_reels: '',
    minimum_asking_price: ''
  });

<<<<<<< Updated upstream
  const handleApply = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const submitBid = ({ formData }) => {
    console.log(`Applying to ${selectedCampaign.name} with the following details:`, formData);
    // Implement application submission logic here
    setBidDetails({
      number_of_stories: '',
      number_of_posts: '',
      number_of_reels: '',
      minimum_asking_price: ''
    });
=======
  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch('http://127.0.0.1:5001/api/influencer/home/explore');
      const data = await response.json();
      setCampaigns(data.available_campaigns); // Set the campaigns directly from the fetched data
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
    const response = await fetch(`http://127.0.0.1:5001/api/influencer/home/explore/${selectedCampaign.company_id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log(`Successfully applied to ${selectedCampaign.campaign_name} with the following details:`, formData);
    } else {
      console.error('Failed to submit bid:', response.statusText);
    }

>>>>>>> Stashed changes
    setSelectedCampaign(null);
  };

  const handleGoBack = () => {
    navigate('/influencer/home');
  };

  const schema = {
    title: "Example Form",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: { type: "string", title: "First Name" },
      lastName: { type: "string", title: "Last Name" },
      age: { type: "number", title: "Age" },
      bio: { type: "string", title: "Biography" }
    }
  };
  
  const uiSchema = {
    age: {
      "ui:widget": "updown"
    },
    bio: {
      "ui:widget": "textarea"
    }
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
<<<<<<< Updated upstream
          {campaigns.map((campaign, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
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
                  <Button size="small" color="primary" onClick={() => handleApply(campaign)}>
                    Apply
                  </Button>
                </CardActions>
              </Card>
=======
          {campaigns.map((campaign) => (
            <Grid item key={campaign.company_id} xs={12} sm={6} md={4}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt={campaign.campaign_name}
              />
              <CampaignCard campaign={campaign} />
              <CardActions>
                <Button size="small" color="primary" onClick={() => setSelectedCampaign(campaign)}>
                  Apply
                </Button>
              </CardActions>
>>>>>>> Stashed changes
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
                Apply to {selectedCampaign.campaign_name}
              </Typography>
<<<<<<< Updated upstream

=======
              <CampaignCard campaign={selectedCampaign} />
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
>>>>>>> Stashed changes
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
