import React from 'react';
import { List } from '@mui/material';
import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, onCampaignClick, onEndCampaign, active }) => (
  <List>
    {
      campaigns.map((campaign, k) => (
        <CampaignCard
          key={k}
          active={active}
          campaign={campaign}
          onCampaignClick={() => onCampaignClick(campaign)}
          onEndCampaign={() => onEndCampaign(campaign.campaign_id)}
        />
      ))
    }
  </List>
);

export default CampaignList;
