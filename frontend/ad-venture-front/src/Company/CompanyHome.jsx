import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CompanyHome = () => {
  const [campaigns, setCampaigns] = useState([
  { name: 'Campaign 1', description: 'Description of Campaign 1' },
  { name: 'Campaign 2', description: 'Description of Campaign 2' },
  ]);

  const [open, setOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', description: '' });

  const handleClickOpen = () => {
  setOpen(true);
  };

  const handleClose = () => {
  setOpen(false);
  };

  const handleChange = (e) => {
  setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  const handleAddCampaign = () => {
  setCampaigns([...campaigns, newCampaign]);
  setNewCampaign({ name: '', description: '' });
  handleClose();
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
      {campaigns.map((campaign, index) => (

        <Paper elevation={6} sx={{m: 3}}>
          <ListItem key={index}>
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
  </Container>
  );
};

export default CompanyHome;
