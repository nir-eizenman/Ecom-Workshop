import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button,
  CircularProgress
} from '@mui/material';
import GeneralForm from '../GeneralForm';

const CampaignFormDialog = ({ open, onClose, onAddCampaign, scheme, newCampaign, setNewCampaign }) => {
  const [loading, setLoading] = useState(false)

  const _onAddCampaign = async () => {
    setLoading(true);
    await onAddCampaign();
    setLoading(false);
  }
  return (
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
        <Button onClick={_onAddCampaign} color="primary" disabled={loading}>
          {loading ? <CircularProgress/> : 'Add Campaign' }
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default CampaignFormDialog;
