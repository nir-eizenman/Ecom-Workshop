import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';

const CompanyHome = () => {
  // Mock data for campaigns and bids
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      name: 'Campaign 1', 
      description: 'Description of Campaign 1', 
      bids: [
        { id: 1, influencer: 'Influencer 1', bid: '1000' },
        { id: 2, influencer: 'Influencer 2', bid: '1200' },
      ] 
    },
    { 
      id: 2, 
      name: 'Campaign 2', 
      description: 'Description of Campaign 2', 
      bids: [
        { id: 3, influencer: 'Influencer 3', bid: '800' },
        { id: 4, influencer: 'Influencer 4', bid: '950' },
      ] 
    },
  ]);

  const [open, setOpen] = useState(false);
  const [bidOpen, setBidOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', description: '' });
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

  const handleChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  const handleAddCampaign = () => {
    setCampaigns([
      ...campaigns,
      { id: campaigns.length + 1, name: newCampaign.name, description: newCampaign.description, bids: [] }
    ]);
    setNewCampaign({ name: '', description: '' });
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          Company Home
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
          <Paper elevation={6} sx={{ m: 3 }} key={campaign.id} onClick={() => handleCampaignClick(campaign)}>
            <ListItem>
              <ListItemText
                primary={campaign.name}
                secondary={campaign.description}
              />
            </ListItem>
          </Paper>
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
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Campaign Name"
            type="text"
            fullWidth
            value={newCampaign.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Campaign Description"
            type="text"
            fullWidth
            value={newCampaign.description}
            onChange={handleChange}
          />
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
            <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={bid.id}>
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
