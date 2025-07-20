import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Paper } from '@mui/material';
import Layout from './components/Layout.tsx';

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MailToWP v2
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Layout />
        </Paper>
      </Container>
    </Box>
  );
};

export default App; 