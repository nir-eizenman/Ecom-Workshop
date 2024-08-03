import React from 'react';
import { Card, CardContent, CardMedia, Typography, ButtonBase, Button } from '@mui/material';

const CampaignCard = ({ campaign, onCampaignClick, onEndCampaign }) => {
  return (
    <Card elevation={6} sx={{ m: 3 }}>
      {/* <ButtonBase
        onClick={() => onCampaignClick(campaign)}
        sx={{ width: '100%' }}
      > */}
        <CardContent>
          <Typography variant="h5" component="div">
            {campaign.campaign_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {campaign.about}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Budget: {campaign.budget}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Categories: {campaign.categories.join(', ')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Objective: Posts - {campaign.campaign_objective.posts}, Reels - {campaign.campaign_objective.reels}, Stories - {campaign.campaign_objective.stories}
          </Typography>
          {campaign.productImage && (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={campaign.productImage}
              alt={campaign.campaign_name}
            />
          )}
        </CardContent>
      {/* </ButtonBase> */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onEndCampaign(campaign.id)}
        sx={{ m: 2 }}
      >
        End Campaign
      </Button>
    </Card>
  );
};

export default CampaignCard;
