import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography, Button } from '@mui/material';

const BidDialog = ({ open, onClose, selectedCampaign, handleSelectBid }) => (
  <Dialog open={open} onClose={onClose}>
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
          <Button variant="contained" color="primary" onClick={() => handleSelectBid(bid)}>
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
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default BidDialog;
