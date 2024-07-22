import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  CardContent,
  CardMedia
} from '@mui/material';
import GeneralForm from '../GeneralForm';

const scheme = {
  "campaign_name": { type: 'string', label: 'Campaign Name' },
  "budget": { type: 'int', label: 'Budget' },
  "is_active": { type: 'boolean', label: 'Active' },
  "about": { type: 'string', label: 'About' },
  "target_audience": {
    location: {
      type: 'multiselectpercent',
      options: ['Israel', 'Egypt', 'Jordan', 'Italy', 'France', 'Narnia', 'Wakanda'],
      label: 'Countries Followers Percentage'
    },
    "gender": {
      type: 'percent',
      options: ["male", "female", "other"],
      label: 'Gender'
    },
    "age": {
      type: 'percent',
      label: 'Age',
      options: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
    }
  },
  "categories": {
    type: 'multiselect',
    label: 'Categories',
    options: ['Sports', 'Fashion', 'Food', 'Travels', 'Books', 'Other']
  },
  "campaign_goal": { type: 'string', label: 'Campaign Goal' },
  "campaign_objective": {
    "reels": { type: 'int', label: 'Reels' },
    "posts": { type: 'int', label: 'Posts' },
    "stories": { type: 'int', label: 'Stories' }
  }
};

const CompanyHome = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [bidOpen, setBidOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: '',
    budget: '',
    is_active: false,
    about: '',
    target_audience: {
      location: {},
      gender: { male: '', female: '', other: '' },
      age: { '13-17': '', '18-24': '', '25-34': '', '35-44': '', '45-54': '', '55-64': '', '65+': '' }
    },
    categories: [],
    campaign_goal: '',
    campaign_objective: { reels: 0, posts: 0, stories: 0 }
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch('http://127.0.0.1:5001/api/company/home');
      const data = await response.json();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBidClose = () => {
    setBidOpen(false);
    setSelectedCampaign(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    if (section && field) {
      setNewCampaign((prevCampaign) => ({
        ...prevCampaign,
        [section]: {
          ...prevCampaign[section],
          [field]: value
        }
      }));
    } else {
      setNewCampaign({
        ...newCampaign,
        [name]: value
      });
    }
  };

  const handleAddCampaign = () => {
    setCampaigns([
      ...campaigns, {
        id: campaigns.length + 1,
        name: newCampaign.campaign_name,
        description: newCampaign.about,
        maxPayment: newCampaign.budget,
        category: newCampaign.categories,
        productImage: '', // Add a default or input for the image if needed
        bids: []
      }
    ]);
    fetch('http://127.0.0.1:5001/api/company/home/create', {
      method: 'POST',
      body: JSON.stringify({ ...newCampaign, is_active: newCampaign.is_active.toString() }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.text())
      .then(resp => console.log(resp));

    setNewCampaign({
      campaign_name: '',
      budget: '',
      is_active: false,
      about: '',
      target_audience: {
        location: {},
        gender: { male: '', female: '', other: '' },
        age: { '13-17': '', '18-24': '', '25-34': '', '35-44': '', '45-54': '', '55-64': '', '65+': '' }
      },
      categories: [],
      campaign_goal: '',
      campaign_objective: { reels: '', posts: '', stories: '' }
    });
    handleClose();
  };

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    setBidOpen(true);
  };

  const handleSelectBid = (bid) => {
    setSelectedBid(bid);
    console.log(`Selected bid from ${bid.influencer} for ${selectedCampaign.name} with bid amount ${bid.bid}`);
    // Implement bid selection logic here
  };

  const handleEndCampaign = async (campaignId) => {
    const response = await fetch(`http://127.0.0.1:5001/api/company/home/${campaignId}/end`, {
      method: 'POST',
    });

    if (response.ok) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      console.log(`Successfully ended campaign with ID ${campaignId}`);
    } else {
      console.error(`Failed to end campaign with ID ${campaignId}:`, response.statusText);
    }
  };

  return (
    <Container sx={{ p: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            background: 'linear-gradient(to right, #f00, #9500ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Sign Up Influencer
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome to your company dashboard. Manage your campaigns below.
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Campaigns
      </Typography>
      <List>
        {campaigns.map((campaign) => (
          <Card
            elevation={6}
            sx={{ m: 3 }}
            key={campaign.id}
            fullWidth
          >
            <ButtonBase
              onClick={() => handleCampaignClick(campaign)}
              sx={{ width: '100%' }}
            >
              <ListItem fullWidth>
                <CardContent>
                  <ListItemText
                    primary={campaign.name}
                    secondary={campaign.description}
                    primaryTypographyProps={{ fontSize: '2vw' }}
                    secondaryTypographyProps={{ fontSize: '1vw' }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Max Payment: {campaign.maxPayment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {campaign.category}
                  </Typography>
                  {campaign.productImage && (
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={campaign.productImage}
                      alt={campaign.name}
                    />
                  )}
                </CardContent>
              </ListItem>
            </ButtonBase>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEndCampaign(campaign.id)}
              sx={{ m: 2 }}
            >
              End Campaign
            </Button>
          </Card>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Campaign
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new campaign.
          </DialogContentText>
          <GeneralForm schema={scheme} formData={newCampaign} setFormData={setNewCampaign} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCampaign} color="primary">
            Add Campaign
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={bidOpen} onClose={handleBidClose}>
        <DialogTitle>Bids for {selectedCampaign?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Review and manage bids from influencers for this campaign.
          </DialogContentText>
          {selectedCampaign?.bids.map((bid) => (
            <Paper
              elevation={3}
              sx={{ p: 2, mb: 2 }}
              key={bid.id}
            >
              <Typography variant="subtitle1">
                Influencer: {bid.influencer}
              </Typography>
              <Typography variant="body1">
                Bid Amount: {bid.bid}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSelectBid(bid)}
              >
                Select
              </Button>
            </Paper>
          ))}
          {selectedCampaign?.bids.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No bids available for this campaign.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBidClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyHome;
