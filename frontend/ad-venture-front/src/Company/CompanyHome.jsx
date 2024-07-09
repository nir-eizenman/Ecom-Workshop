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
  CardMedia
} from '@mui/material';

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
  const [newCampaign, setNewCampaign] = useState({ name: '', description: '', maxPayment: '', category: '', productImage: '' });
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
    setNewCampaign({
      ...newCampaign,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCampaign = () => {
    setCampaigns([
      ...campaigns, {
        id: campaigns.length + 1,
        name: newCampaign.name,
        description: newCampaign.description,
        maxPayment: newCampaign.maxPayment,
        category: newCampaign.category,
        productImage: newCampaign.productImage,
        bids: []
      }
    ]);
    setNewCampaign({ name: '', description: '', maxPayment: '', category: '', productImage: '' });
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
          <TextField
            margin="dense"
            name="maxPayment"
            label="Max Payment"
            type="text"
            fullWidth
            value={newCampaign.maxPayment}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Campaign Category"
            type="text"
            fullWidth
            value={newCampaign.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="productImage"
            label="Product Image URL"
            type="text"
            fullWidth
            value={newCampaign.productImage}
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
