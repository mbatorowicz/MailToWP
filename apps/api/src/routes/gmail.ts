import express from 'express';
import { GmailService } from '../services/GmailService';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();
const gmailService = new GmailService();

// Get authentication URL
router.get('/auth/url', (_req, res) => {
  try {
    const authUrl = gmailService.getAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Handle OAuth callback
router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const success = await gmailService.handleCallback(code);
    if (success) {
      res.redirect('http://localhost:3000/oauth-success');
    } else {
      res.redirect('http://localhost:3000/oauth-error');
    }
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect('http://localhost:3000/oauth-error');
  }
});

// Check authentication status
router.get('/auth/status', (_req, res) => {
  const isAuthenticated = gmailService.isAuthenticated();
  res.json({ isAuthenticated });
});

// Get emails
router.get('/emails', async (_req, res) => {
  try {
    const emails = await gmailService.getEmails();
    res.json({ emails });
  } catch (error) {
    res.status(401).json({ error: 'Not authenticated or failed to fetch emails' });
  }
});

// Save credentials
router.post('/credentials', (req, res) => {
  try {
    const { client_id, client_secret, redirect_uri } = req.body;
    
    if (!client_id || !client_secret || !redirect_uri) {
      return res.status(400).json({ error: 'Missing required credentials' });
    }

    const credentials = { client_id, client_secret, redirect_uri };
    const credentialsPath = path.join(__dirname, '../../gmail_credentials.json');
    
    fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));
    
    res.json({ message: 'Credentials saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save credentials' });
  }
});

// Get saved credentials
router.get('/credentials', (_req, res) => {
  try {
    const credentialsPath = path.join(__dirname, '../../gmail_credentials.json');
    
    if (!fs.existsSync(credentialsPath)) {
      return res.status(404).json({ error: 'No credentials found' });
    }

    const content = fs.readFileSync(credentialsPath, 'utf8');
    const credentials = JSON.parse(content);
    
    res.json({ credentials });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load credentials' });
  }
});

// Logout
router.post('/auth/logout', (_req, res) => {
  try {
    gmailService.logout();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to logout' });
  }
});

export default router; 