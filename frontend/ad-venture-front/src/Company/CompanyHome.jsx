import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import CampaignList from './CampaignList';
import CampaignFormDialog from './CampaignFormDialog';
import ResultDialog from './ResultDialog';
import { USER_ID, countries } from '../constants';

const scheme = {
  "campaign_name": { type: 'string', label: 'Campaign Name' },
  "budget": { type: 'int', label: 'Budget' },
  "is_active": { type: 'boolean', label: 'Active' },
  "about": { type: 'string', label: 'About' },
  "target_audience": {
    location: {
      type: 'multiselectpercent',
      options: countries,
      label: 'Countries Followers Percentage'
    },
    gender: {
      type: 'percent',
      options: ["male", "female", "other"],
      label: 'Gender'
    },
    age: {
      type: 'percent',
      label: 'Age',
      options: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
    }
  },
  categories: {
    type: 'multiselect',
    label: 'Categories',
    options: ['Sports', 'Fashion', 'Food', 'Travels', 'Books', 'Other']
  },
  campaign_goal: { type: 'string', label: 'Campaign Goal' },
  campaign_objective: {
    reels: { type: 'int', label: 'Reels' },
    posts: { type: 'int', label: 'Posts' },
    stories: { type: 'int', label: 'Stories' }
  }
};

const CompanyHome = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: '',
    budget: '',
    is_active: false,
    about: '',
    target_audience: {
      location: {},
      gender: { male: 0, female: 0, other: 0 },
      age: { '13-17': '0', '18-24': '0', '25-34': '0', '35-44': '0', '45-54': '0', '55-64': '0', '65+': '0' }
    },
    categories: [],
    campaign_goal: '',
    campaign_objective: { reels: 0, posts: 0, stories: 0 }
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [results, setResults] = useState([]);
  const [resultsCampaignId, setResultsCampaignId] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch(`https://api-ad-venture.onrender.com:443/api/company/${sessionStorage.getItem(USER_ID)}/home`);
      const data = await response.json();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCampaign = async () => {
    try {
      const response = await fetch(`https://api-ad-venture.onrender.com:443/api/company/${sessionStorage.getItem(USER_ID)}/home/create`, {
        method: 'POST',
        body: JSON.stringify({
          ...newCampaign,
          is_active: newCampaign.is_active.toString(),
          company_id: sessionStorage.getItem('company_id')
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const campaignsResponse = await fetch(`https://api-ad-venture.onrender.com:443/api/company/${sessionStorage.getItem(USER_ID)}/home`);
        const campaignsData = await campaignsResponse.json();
        setCampaigns(campaignsData);

        setNewCampaign({
          campaign_name: '',
          budget: '',
          is_active: false,
          about: '',
          target_audience: {
            location: {},
            gender: { male: '', female: '', other: '' },
            age: { '13-17': '', '18-24': '', '25-34': '', '35-44': '', '45-54': '', '55-64': '', '65+': '' }
          },
          categories: [],
          campaign_goal: '',
          campaign_objective: { reels: '', posts: '', stories: '' }
        });
        handleClose();
      } else {
        console.error('Failed to create campaign:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleEndCampaign = async (campaignId) => {
    const response = await fetch(`https://api-ad-venture.onrender.com:443/api/company/home/${campaignId}/end`, {
      method: 'POST',
    });

    if (response.ok) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      console.log(`Successfully ended campaign with ID ${campaignId}`);

      const resultResponse = await fetch(`https://api-ad-venture.onrender.com:443/api/company/home/${campaignId}/results`);
      const resultData = await resultResponse.json();

      setResults(resultData.results);
      setResultsCampaignId(campaignId);
      console.log('resultData.campaign_id ' + campaignId);
      setResultOpen(true);
    } else {
      console.error(`Failed to end campaign with ID ${campaignId}:`, response.statusText);
    }
  };

  const handleResultClose = () => {
    setResultOpen(false);
  };

  const handleSelectResult = async (result) => {
    console.log(`Selected result: ${JSON.stringify(result)}`);
    const { result_number } = result;
    console.log('results campaign id ' + resultsCampaignId);
    try {
      const response = await fetch(`https://api-ad-venture.onrender.com:443/api/company/home/${resultsCampaignId}/results/choose`, {
        method: 'POST',
        body: JSON.stringify({ result_number }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Result selection successful');
        setResultOpen(false);
      } else {
        console.error('Failed to select result:', response.statusText);
      }
    } catch (error) {
      console.error('Error selecting result:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Active Campaigns" />
        <Tab label="Inactive Campaigns" />
      </Tabs>

      {tabValue === 0 && (
        <CampaignList
          campaigns={campaigns.filter(c => c.is_active)}
          onCampaignClick={handleCampaignClick}
          onEndCampaign={handleEndCampaign}
          active
        />
      )}
      {tabValue === 1 && (
        <CampaignList
          campaigns={campaigns.filter(c => !c.is_active)}
          onCampaignClick={handleCampaignClick}
          onEndCampaign={handleEndCampaign}
        />
      )}

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

      <ResultDialog
        open={resultOpen}
        onClose={handleResultClose}
        results={results}
        onSelectResult={handleSelectResult}
      />
    </Container>
  );
};

export default CompanyHome;
