import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Contacts from './Contacts';

const theme = createTheme();

const Dashboard = () => {

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='xl' sx={{ padding: '0px !important' }}>
        <Contacts />
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
