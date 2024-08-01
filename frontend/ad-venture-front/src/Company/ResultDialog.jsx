import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';

const ResultDialog = ({ open, onClose, results, onSelectResult }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Campaign Results</DialogTitle>
      <DialogContent>
        <List>
          {results.map((result, index) => (
            <ListItem button onClick={() => onSelectResult({...result, result_number: index})} key={index}>
              <ListItemText
                primary={`Objective: ${result.campaign_objective}`}
                secondary={`Score: ${result.score}, Cost: ${result.cost}, Influencers: ${result.influencers.map(inf => inf.full_name).join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultDialog;
