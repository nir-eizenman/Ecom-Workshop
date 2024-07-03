import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, List, ListItem, ListItemText, Modal, TextField, ListItemSecondaryAction } from '@mui/material';

const InfluencerHome = () => {
  const [currentWorks, setCurrentWorks] = useState([
    { name: 'Current Work 1', description: 'Description of Current Work 1' },
    { name: 'Current Work 2', description: 'Description of Current Work 2' },
  ]);

  const [previousWorks, setPreviousWorks] = useState([
    { name: 'Previous Work 1', description: 'Description of Previous Work 1' },
    { name: 'Previous Work 2', description: 'Description of Previous Work 2' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { name: 'Campaign 1', description: 'Description of Campaign 1' },
    { name: 'Campaign 2', description: 'Description of Campaign 2' },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [bid, setBid] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setOpen(true);
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleBidChange = (e) => {
    setBid(e.target.value);
  };

  const submitBid = () => {
    console.log(`Applying to ${selectedCampaign.name} with a bid of ${bid}`);
    // Implement application submission logic here
    setBid('');
    setSelectedCampaign(null);
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
          Current Works
        </Typography>
        <List>
          {currentWorks.map((work, index) => (
            <ListItem key={index}>
              <ListItemText primary={work.name} secondary={work.description} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Previous Works
        </Typography>
        <List>
          {previousWorks.map((work, index) => (
            <ListItem key={index}>
              <ListItemText primary={work.name} secondary={work.description} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Search for New Opportunities
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <TextField
            variant="outlined"
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
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
            <Typography id="modal-title" variant="h6" component="h2">
              Possible Campaigns
            </Typography>
            <List id="modal-description" sx={{ mt: 2 }}>
              {campaigns.map((campaign, index) => (
                <ListItem key={index}>
                  <ListItemText primary={campaign.name} secondary={campaign.description} />
                  <ListItemSecondaryAction>
                    <Button variant="contained" color="primary" onClick={() => handleApply(campaign)}>
                      Apply
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Paper>

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
              label="Bid"
              value={bid}
              onChange={handleBidChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={submitBid}>
              Submit Bid
            </Button>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default InfluencerHome;
