import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  ButtonBase, 
  Button, 
  CircularProgress
} from '@mui/material';


const Result = ({campaign_id}) => {
  const [ loading, setLoading ] = useState(true)
  const [ result, setResult ] = useState({})


  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true)
      const response = await fetch(`http://127.0.0.1:5001/api/company/home/${campaign_id}/results`)
      const { results } = await response.json()
      setResult(results.find(({ chosen }) => chosen))
      setLoading(false)
    }
    fetchResult()
  }, [])
  if (loading) return <CircularProgress/>
  else if (result === undefined) return (
    <Typography variant='h5'>
      Inactive Campaign, No Results
    </Typography>
  )
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' >
          Campaign Objective: {result.campaign_objective}
        </Typography>
        {
          result.influencers.map(influencer => (
            <>
              <Typography variant='body1' component="div">
                Full Name: {influencer.full_name}
              </Typography>
              <Typography variant='body1' component="div">
                Salary: {influencer.salary}
              </Typography>
            </>
          ))
        }
        <Typography variant="h5" component="div">
          Cost: {result.cost}
        </Typography>
      </CardContent>
    </Card>
  )
}

const CampaignCard = ({ campaign, onEndCampaign, active=false }) => {


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
          <Typography variant="body1" color="textSecondary">
            About: {campaign.about}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Budget: {campaign.budget}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Categories: {campaign.categories.join(', ')}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Objective: Posts: {campaign.campaign_objective.posts}, Reels: {campaign.campaign_objective.reels}, Stories: {campaign.campaign_objective.stories}
          </Typography>
          {!active && <Typography variant="body1" color="textSecondary">
            Campaign Result:
          </Typography> }

          {!active && <Result 
            campaign_id={campaign.campaign_id}
          />}

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
      {active && <Button
        variant="contained"
        color="secondary"
        onClick={() => onEndCampaign(campaign.id)}
        sx={{ m: 2 }}
      >
        End Campaign
      </Button>}
    </Card>
  );
};

export default CampaignCard;
