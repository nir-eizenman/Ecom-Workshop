import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import InfluencerHome from './Influencer/InfluencerHome';
import SignUpInfluencer from './SignUp/SignUpInfluencer'
import AdVentureTheme from './themes/AdVentureTheme'
import { ThemeProvider } from '@mui/material';
import SignUpCompany from './SignUp/SignUpCompany';
import CompanyHome from './Company/CompanyHome';

const App = () => {
  return (
    <ThemeProvider theme={AdVentureTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/company/home" element={<CompanyHome />} />
          <Route path="/influencer/home" element={<InfluencerHome />} />
          <Route path="/signup/influencer" element={<SignUpInfluencer />} />
          <Route path="/signup/company" element={<SignUpCompany />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
