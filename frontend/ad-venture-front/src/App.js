import React, {MuiThemeProvider} from 'react';
import {Box} from '@mui/material'
import {styled, keyframes} from '@mui/material/styles'
// import { createTheme } from '@mui/system'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import InfluencerHome from './Influencer/InfluencerHome';
import SignUpInfluencer from './SignUp/SignUpInfluencer'
import AdVentureTheme from './themes/AdVentureTheme'
import { ThemeProvider } from '@mui/material';
import SignUpCompany from './SignUp/SignUpCompany';
import CompanyHome from './Company/CompanyHome';
import InfluencerSearch from './Influencer/InfluencerSearch';


const gradientAnimation = keyframes`
    0%{background-position:0% 10%}
    50%{background-position:100% 0%}
    100%{background-position:0% 10%}
`;

const InstagramBox = styled(Box)({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, #3948f9 0%,  #fe6cab 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 8s infinite linear`,
});

const App = () => {
  return (
    <ThemeProvider theme={AdVentureTheme}>
      <InstagramBox>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company/home" element={<CompanyHome />} />
            <Route path="/influencer/home" element={<InfluencerHome />} />
            <Route path="/influencer/search" element={<InfluencerSearch />} />
            <Route path="/signup/influencer" element={<SignUpInfluencer />} />
            <Route path="/signup/company" element={<SignUpCompany />} />
          </Routes>
        </Router>
      </InstagramBox>
    </ThemeProvider>
  );
};

export default App;
