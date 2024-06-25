import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, Grid, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', searchQuery);
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
            fullWidth
            name="search"
            label="Search for new works"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InfluencerHome;
