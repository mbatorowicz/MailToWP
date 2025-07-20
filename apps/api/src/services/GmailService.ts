import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

interface GmailCredentials {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

interface GmailToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export class GmailService {
  private oauth2Client: any;
  private credentialsPath: string;
  private tokenPath: string;

  constructor() {
    this.credentialsPath = path.join(__dirname, '../../gmail_credentials.json');
    this.tokenPath = path.join(__dirname, '../../gmail_token.json');
    this.initializeOAuth2Client();
  }

  private initializeOAuth2Client() {
    try {
      const credentials = this.loadCredentials();
      this.oauth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uri
      );
    } catch (error) {
      console.log('No credentials found, OAuth2 client not initialized');
    }
  }

  private loadCredentials(): GmailCredentials {
    if (!fs.existsSync(this.credentialsPath)) {
      throw new Error('Credentials file not found');
    }
    const content = fs.readFileSync(this.credentialsPath, 'utf8');
    return JSON.parse(content);
  }

  private loadToken(): GmailToken | null {
    if (!fs.existsSync(this.tokenPath)) {
      return null;
    }
    const content = fs.readFileSync(this.tokenPath, 'utf8');
    return JSON.parse(content);
  }

  private saveToken(token: GmailToken) {
    fs.writeFileSync(this.tokenPath, JSON.stringify(token, null, 2));
  }

  public getAuthUrl(): string {
    if (!this.oauth2Client) {
      throw new Error('OAuth2 client not initialized');
    }

    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  public async handleCallback(code: string): Promise<boolean> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      this.saveToken(tokens as GmailToken);
      return true;
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      return false;
    }
  }

  public isAuthenticated(): boolean {
    try {
      const token = this.loadToken();
      if (!token) return false;

      this.oauth2Client.setCredentials(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getEmails(maxResults: number = 10): Promise<any[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    
    try {
      const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults: maxResults
      });

      const messages = response.data.messages || [];
      const emails = [];

      for (const message of messages) {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!
        });
        emails.push(email.data);
      }

      return emails;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  }

  public logout(): void {
    try {
      if (fs.existsSync(this.tokenPath)) {
        fs.unlinkSync(this.tokenPath);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
} 