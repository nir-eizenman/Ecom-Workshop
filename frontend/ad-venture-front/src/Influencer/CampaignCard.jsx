import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CampaignCard = ({ campaign }) => {
  return (
    <Card elevation={6} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {campaign.campaign_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          About: {campaign.about}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Budget: ${campaign.budget}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Campaign Goal: {campaign.campaign_goal}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Categories: {campaign.categories.join(', ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Active: {campaign.is_active ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Created On: {new Date(campaign.create_time).toLocaleDateString()}
        </Typography>
        
        <Typography variant="h6" sx={{ mt: 2 }}>
          Target Audience
        </Typography>
        <Grid container spacing={1}>
          {Object.keys(campaign.target_audience.age).map(ageRange => (
            <Grid item xs={6} key={ageRange}>
              <Typography variant="body2" color="textSecondary">
                Age {ageRange}: {campaign.target_audience.age[ageRange]}%
              </Typography>
            </Grid>
          ))}
          {Object.keys(campaign.target_audience.gender).map(gender => (
            <Grid item xs={6} key={gender}>
              <Typography variant="body2" color="textSecondary">
                Gender {gender}: {campaign.target_audience.gender[gender]}%
              </Typography>
            </Grid>
          ))}
          {Object.keys(campaign.target_audience.location).map(location => (
            <Grid item xs={6} key={location}>
              <Typography variant="body2" color="textSecondary">
                Location {location}: {campaign.target_audience.location[location]}%
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        <Typography variant="h6" sx={{ mt: 2 }}>
          Campaign Objectives
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Posts: {campaign.campaign_objective.posts}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Reels: {campaign.campaign_objective.reels}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              Stories: {campaign.campaign_objective.stories}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
