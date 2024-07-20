import React, { useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';
// import theme from './theme'; // Assume you have a Material UI theme file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'company',
  });

  const navigate = useNavigate();

  const handleSubmit = ({ formData }) => {
    navigate(`/${formData.userType}/home`);
    console.log(formData);
  };

  const schema = {
    title: "Login",
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: 'string', title: 'Email' },
      password: { type: 'string', title: 'Password' }
    }
  };

  const uiSchema = {
    password: {
      "ui:widget": "password"
    }
  };

  return (
    // <ThemeProvider theme={theme}>
      <Container sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 400, mx: 'auto' }}>
          <Paper elevation={6} sx={{ p: 3, textAlign: 'center' }} square={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Login
            </Typography>

            <Form
              schema={schema}
              uiSchema={uiSchema}
              onChange={({ formData }) => setFormData(formData)}
              onSubmit={handleSubmit}
              onError={(errors) => console.log("errors", errors)}
              validator={validator}
              formData={formData}
              
            />
          </Paper>
        </Box>
      </Container>
    // </ThemeProvider>
  );
};

export default Login;
