import React from 'react';
import { Box, AppBar, Toolbar, IconButton, ButtonBase, Typography } from '@mui/material';
import { ArrowBack, Gradient, Logout } from '@mui/icons-material';

import { styled, keyframes } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import InfluencerHome from './Influencer/InfluencerHome';
import SignUpInfluencer from './SignUp/SignUpInfluencer';
import AdVentureTheme from './themes/AdVentureTheme';
import { ThemeProvider } from '@mui/material';
import SignUpCompany from './SignUp/SignUpCompany';
import CompanyHome from './Company/CompanyHome';
import InfluencerSearch from './Influencer/InfluencerSearch';
import Logo from './Logo';
import { MaximizeSharp } from '@mui/icons-material';
import { EMAIL, USER_ID } from './constants';
import GradientTypography from './GradientTypography';

const gradientAnimation = keyframes`
  0% { background-position: 0% 10%; }
  50% { background-position: 100% 0%; }
  100% { background-position: 0% 10%; }
`;

const InstagramBox = styled(Box)({
  width: '100%',
  minHeight: '100%',
  background: 'linear-gradient(45deg, #3948f9 0%,  #fe6cab 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 8s infinite linear`,
});

const App = () => {
  return (
    <ThemeProvider theme={AdVentureTheme}>
      <Router>
        <InstagramBox>
          <ConditionalAppBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company/home" element={<CompanyHome />} />
            <Route path="/influencer/home" element={<InfluencerHome />} />
            <Route path="/influencer/search" element={<InfluencerSearch />} />
            <Route path="/signup/influencer" element={<SignUpInfluencer />} />
            <Route path="/signup/company" element={<SignUpCompany />} />
          </Routes>
        </InstagramBox>
      </Router>
    </ThemeProvider>
  );
};


const ConditionalAppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const noAppBarRoutes = ['/login', '/signup/influencer', '/signup/company'];

  // Function to handle "Go Back" button click
  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  // Function to handle "Log Out" button click
  const handleLogout = () => {

    navigate('/login'); // Redirects to the login page
    sessionStorage.clear();
  };

  // Show AppBar only on routes that are not in the noAppBarRoutes array
  if (!noAppBarRoutes.includes(location.pathname)) {
    return (
      <AppBar position="static" sx={{ backgroundColor: '#2a29cc', opacity: 0.5, pb: '0.5rem', pt: '0.5rem' }} elevation={0}>
        <Toolbar>
          <Logo imgStyle={{ maxHeight: '4rem' }} />
          <GradientTypography variant='h4' sx={{flexGrow: 1, ml: 3}} color1="white" color2="lightgrey">
            {sessionStorage.getItem(EMAIL)}
          </GradientTypography>
          <ButtonBase size='large' edge="start" color="inherit" onClick={handleGoBack} aria-label="go back" sx={{color: 'aliceblue', ml: 3, mr: 3, transform: 'scale(1.5)'}}>
            <ArrowBack />
          </ButtonBase>
          <ButtonBase size='large' edge="end" color="inherit" onClick={handleLogout} aria-label="log out"  sx={{color: 'aliceblue', ml: 3, mr: 3, transform: 'scale(1.5)'}}>
            <Logout />
          </ButtonBase>
        </Toolbar>
      </AppBar>
    );
  }
  return null;
};

export default App;
