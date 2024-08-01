import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import GeneralForm from '../GeneralForm';

const CampaignFormDialog = ({ open, onClose, onAddCampaign, scheme, newCampaign, setNewCampaign }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Create a New Campaign</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please fill in the details of the new campaign.
      </DialogContentText>
      <GeneralForm schema={scheme} formData={newCampaign} setFormData={setNewCampaign} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onAddCampaign} color="primary">
        Add Campaign
      </Button>
    </DialogActions>
  </Dialog>
);

export default CampaignFormDialog;
