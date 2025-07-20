import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import { Save, Logout, Settings } from '@mui/icons-material';

interface GmailCredentials {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

const SettingsTab: React.FC = () => {
  const [credentials, setCredentials] = useState<GmailCredentials>({
    client_id: '',
    client_secret: '',
    redirect_uri: 'http://localhost:3002/oauth/callback'
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadCredentials();
    checkAuthStatus();
  }, []);

  const loadCredentials = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/gmail/credentials');
      if (response.ok) {
        const data = await response.json();
        setCredentials(data.credentials);
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/gmail/auth/status');
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const handleSaveCredentials = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('http://localhost:3002/api/gmail/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Credentials saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save credentials' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving credentials' });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('http://localhost:3002/api/gmail/auth/url');
      const data = await response.json();
      
      window.location.href = data.authUrl;
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to get authentication URL' });
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('http://localhost:3002/api/gmail/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setMessage({ type: 'success', text: 'Logged out successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to logout' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error during logout' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
        Settings
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Gmail Credentials */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gmail Credentials
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your Google Cloud Console OAuth2 credentials
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Client ID"
                value={credentials.client_id}
                onChange={(e) => setCredentials({ ...credentials, client_id: e.target.value })}
                fullWidth
                size="small"
              />
              <TextField
                label="Client Secret"
                value={credentials.client_secret}
                onChange={(e) => setCredentials({ ...credentials, client_secret: e.target.value })}
                fullWidth
                size="small"
                type="password"
              />
              <TextField
                label="Redirect URI"
                value={credentials.redirect_uri}
                onChange={(e) => setCredentials({ ...credentials, redirect_uri: e.target.value })}
                fullWidth
                size="small"
                helperText="Default: http://localhost:3002/oauth/callback"
              />

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveCredentials}
                disabled={loading || !credentials.client_id || !credentials.client_secret}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={20} /> : 'Save Credentials'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Authentication Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Authentication Status
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Status:
              </Typography>
              <Typography
                variant="body1"
                color={isAuthenticated ? 'success.main' : 'error.main'}
                fontWeight="medium"
              >
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!isAuthenticated ? (
                <Button
                  variant="contained"
                  onClick={handleAuth}
                  disabled={loading}
                  sx={{ bgcolor: 'primary.main' }}
                >
                  {loading ? <CircularProgress size={20} /> : 'Authenticate Gmail'}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Logout'}
                </Button>
              )}
            </Box>

            {!isAuthenticated && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Instructions:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  1. Save your credentials first
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  2. Click "Authenticate Gmail" to authorize
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  3. You'll be redirected to Google for authorization
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsTab; 