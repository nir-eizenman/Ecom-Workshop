<<<<<<< Updated upstream
import React, { useState } from 'react';
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
  TextField,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import GeneralForm from '../GeneralForm'
=======
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import CampaignList from './CampaignList';
import CampaignFormDialog from './CampaignFormDialog';
import BidDialog from './BidDialog';
>>>>>>> Stashed changes

const scheme = {
  "campaign_name": {type: 'string', label: 'Campaign Name'},
  "budget": {type: 'int', label: 'Budget'},
  "is_active": {type: 'boolean', label: 'Active'},
  "about": {type: 'string', label: 'About'},
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
      options: ["13-17", "18-24",  "25-34", "35-44", "45-54", "55-64", "65+"]
    }
  },
  "categories": {
    type: 'multiselect',
    label: 'Categories',
    options: ['Sports', 'Fashion', 'Food', 'Travels', 'Books', 'Other']
  },
  // "company_id": {type: 'string', label},
  "campaign_goal": {type: 'string', label: 'Campaign Goal'},
  "campaign_objective": { 
    "reels": {type: 'int', label: 'Reels'}, 
    "posts": {type: 'int', label: 'Posts'}, 
    "stories": {type: 'int', label: 'Stories'} 
  }
}

const CompanyHome = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Campaign 1',
      description: 'Description of Campaign 1',
      maxPayment: '1500',
      category: 'Fashion',
      productImage: 'https://ynet-pic1.yit.co.il/cdn-cgi/image/format=auto/picserver5/crop_images/2024/07/03/BJbZiulXwA/BJbZiulXwA_0_49_1000_563_0_medium.jpg',
      bids: [
        { id: 1, influencer: 'Influencer 1', bid: '1000' },
        { id: 2, influencer: 'Influencer 2', bid: '1200' }
      ]
    },
    {
      id: 2,
      name: 'Campaign 2',
      description: 'Description of Campaign 2',
      maxPayment: '2000',
      category: 'Tech',
      productImage: '',
      bids: [
        { id: 3, influencer: 'Influencer 3', bid: '800' },
        { id: 4, influencer: 'Influencer 4', bid: '950' }
      ]
    }
  ]);

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
      age: { '13-17': '', '18-24': '', '25-34': '', '35-44': '', '45-54': '', '55-64': '', '65+': '' },
    },
    categories: [],
    // company_id: '',
    campaign_goal: '',
    campaign_objective: { reels: 0, posts: 0, stories: 0 }
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);

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

<<<<<<< Updated upstream
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewCampaign({
      ...newCampaign,
      [name]: checked
    });
  };

=======
>>>>>>> Stashed changes
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
    fetch('http://127.0.0.1:5000/api/company/home/create', {
      method: 'POST',
<<<<<<< Updated upstream
      body: JSON.stringify({...newCampaign, is_active: newCampaign.is_active.toString()}),
=======
      body: JSON.stringify({ ...newCampaign, is_active: newCampaign.is_active.toString(), company_id: '123' }),
>>>>>>> Stashed changes
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.text())
      .then(resp => console.log(resp))
      
    setNewCampaign({
      campaign_name: '',
      budget: '',
      is_active: false,
      about: '',
      target_audience: {
         
        location: {},
        gender: { male: '', female: '', other: '' },
        age: { '13-17': '', '18-24': '', '25-34': '', '35-44': '', '45-54': '', '55-64': '', '65+': '' },
      },
      categories: [],
      // company_id: '',
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
          Let's Get Famous!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome to your company dashboard. Manage your campaigns below.
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Campaigns
      </Typography>
<<<<<<< Updated upstream
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
          </Card>
        ))}
      </List>
=======
      <CampaignList
        campaigns={campaigns}
        onCampaignClick={handleCampaignClick}
        onEndCampaign={handleEndCampaign}
      />
>>>>>>> Stashed changes
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Campaign
        </Button>
      </Box>

      <CampaignFormDialog
        open={open}
        onClose={handleClose}
        onAddCampaign={handleAddCampaign}
        scheme={scheme}
        newCampaign={newCampaign}
        setNewCampaign={setNewCampaign}
      />

      {/* <BidDialog
        open={bidOpen}
        onClose={handleBidClose}
        selectedCampaign={selectedCampaign}
        handleSelectBid={handleSelectBid}
      /> */}
    </Container>
  );
};

export default CompanyHome;
