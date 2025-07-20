# SZCZEGÓŁOWE KROKI IMPLEMENTACJI

## 🚀 ROZPOCZĘCIE

### Krok 1: Setup projektu
```bash
# Utworzenie struktury
mkdir MailToWP-v2
cd MailToWP-v2
mkdir -p apps/{main,renderer,api} shared/{types,constants,utils} docs scripts

# Inicjalizacja pnpm
pnpm init

# Konfiguracja workspaces
echo 'packages:
  - "apps/*"
  - "shared"' > pnpm-workspace.yaml
```

### Krok 2: Konfiguracja TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["shared/*"],
      "@/*": ["apps/renderer/src/*"]
    }
  },
  "include": ["src"]
}
```

## 📋 FAZA 1: PODSTAWY I SETUP

### 1.1 Konfiguracja Electron
```json
// apps/main/package.json
{
  "name": "main",
  "version": "1.0.0",
  "main": "dist/main.js",
  "scripts": {
    "dev": "tsc && electron .",
    "build": "tsc",
    "watch": "tsc -w"
  },
  "dependencies": {
    "electron": "^28.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 1.2 Konfiguracja React
```json
// apps/renderer/package.json
{
  "name": "renderer",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.0.0",
    "@mui/icons-material": "^5.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "zustand": "^4.0.0",
    "react-beautiful-dnd": "^13.0.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/react-beautiful-dnd": "^13.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### 1.3 Konfiguracja Backend
```json
// apps/api/package.json
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.0.0",
    "cors": "^2.0.0",
    "multer": "^1.0.0",
    "sharp": "^0.32.0",
    "openai": "^4.0.0",
    "googleapis": "^128.0.0",
    "mammoth": "^1.6.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.0.0",
    "@types/cors": "^2.0.0",
    "@types/multer": "^1.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0",
    "nodemon": "^3.0.0"
  }
}
```

### 1.4 Shared Types
```typescript
// shared/types/index.ts
export * from './email';
export * from './ai';
export * from './article';
export * from './wordpress';
export * from './store';
export * from './api';
export * from './ui';
export * from './utils';
```

## 📋 FAZA 2: GMAIL INTEGRATION

### 2.1 Backend Gmail Service
```typescript
// apps/api/src/services/GmailService.ts
import { google } from 'googleapis';
import { Email, Attachment } from '@shared/types';

export class GmailService {
  private gmail: any;
  
  constructor(accessToken: string) {
    this.gmail = google.gmail({ 
      version: 'v1', 
      headers: { Authorization: `Bearer ${accessToken}` } 
    });
  }
  
  async getEmails(filters?: any): Promise<Email[]> {
    try {
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: filters?.query || '',
        maxResults: 50
      });
      
      const emails = await Promise.all(
        response.data.messages?.map(async (msg: any) => {
          const details = await this.gmail.users.messages.get({
            userId: 'me',
            id: msg.id
          });
          return this.parseEmail(details.data);
        }) || []
      );
      
      return emails;
    } catch (error) {
      throw new Error(`Failed to fetch emails: ${error.message}`);
    }
  }
  
  private parseEmail(message: any): Email {
    // Implementation
  }
}
```

### 2.2 Google OAuth2 Setup
```typescript
// apps/api/src/config/google.ts
export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: 'http://localhost:3001/api/auth/google/callback',
  scopes: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify'
  ]
};
```

### 2.3 Google Auth Service
```typescript
// apps/api/src/services/GoogleAuthService.ts
import { google } from 'googleapis';
import { GOOGLE_CONFIG } from '../config/google';

export class GoogleAuthService {
  private oauth2Client: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_CONFIG.clientId,
      GOOGLE_CONFIG.clientSecret,
      GOOGLE_CONFIG.redirectUri
    );
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GOOGLE_CONFIG.scopes,
      prompt: 'consent'
    });
  }

  async getTokensFromCode(code: string): Promise<{
    access_token: string;
    refresh_token: string;
    expiry_date: number;
  }> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
    
    const { credentials } = await this.oauth2Client.refreshAccessToken();
    return credentials.access_token;
  }
}
```

### 2.4 Environment Setup
```bash
# .env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 2.5 Google Cloud Console Steps:
1. **Utwórz projekt w Google Cloud Console**
2. **Włącz Gmail API**
3. **Utwórz OAuth 2.0 credentials**
4. **Dodaj authorized redirect URIs:**
   - `http://localhost:3001/api/auth/google/callback`
   - `http://localhost:3001/api/auth/google/callback/desktop`

## 📋 FAZA 3: AI INTEGRATION

### 3.1 Backend AI Service
```typescript
// apps/api/src/services/AIService.ts
import OpenAI from 'openai';
import { AIAnalysis, AIAnalysisRequest } from '@shared/types';

export class AIService {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async analyzeEmails(request: AIAnalysisRequest): Promise<AIAnalysis[]> {
    try {
      const prompt = this.buildPrompt(request.emails);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Jesteś ekspertem w analizie treści maili. Analizujesz maile i określasz ich typ oraz zawartość.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      });
      
      return this.parseAIResponse(response.choices[0].message.content);
    } catch (error) {
      throw new Error(`AI analysis failed: ${error.message}`);
    }
  }
  
  private buildPrompt(emails: Email[]): string {
    // Implementation
  }
  
  private parseAIResponse(response: string): AIAnalysis[] {
    // Implementation
  }
}
```

### 3.2 Konkretne Prompty AI
```typescript
// apps/api/src/constants/aiPrompts.ts

export const MAIN_ANALYSIS_PROMPT = `Jesteś ekspertem w analizie treści maili i tworzeniu artykułów WordPress.

ANALIZUJ MAILE I ODPOWIEDZ W FORMACIE JSON:

{
  "analyses": [
    {
      "emailId": "string",
      "type": "main_content" | "instructions" | "images_only" | "mixed",
      "confidence": number (0-1),
      "mainContent": "string (treść główna do artykułu)",
      "instructions": "string (instrukcje dla redaktora)",
      "imageInstructions": [
        {
          "imageName": "string",
          "instruction": "string",
          "position": "top" | "middle" | "bottom" | "inline",
          "priority": number (1-5)
        }
      ],
      "suggestedPosition": number,
      "tags": ["string"],
      "category": "string"
    }
  ],
  "summary": "string (podsumowanie wszystkich maili)",
  "suggestedTitle": "string",
  "estimatedReadTime": number (w minutach)
}

ZASADY:
1. Analizuj każdy mail osobno
2. Określ typ maila (treść główna/instrukcje/zdjęcia/mieszany)
3. Wyciągnij główną treść do artykułu
4. Zidentyfikuj instrukcje dla zdjęć
5. Zaproponuj tagi i kategorię
6. Oszacuj czas czytania

MAILE DO ANALIZY:
{emails_content}`;

export const CONTENT_OPTIMIZATION_PROMPT = `Jesteś redaktorem treści WordPress. Zoptymalizuj poniższą treść:

ZASADY:
1. Zachowaj główną myśl
2. Popraw gramatykę i styl
3. Dodaj nagłówki H2, H3 gdzie potrzebne
4. Zrób treść bardziej czytelną
5. Dostosuj do SEO
6. Maksymalnie 2000 słów

TREŚĆ DO OPTYMALIZACJI:
{content}

ODPOWIEDZ TYLKO ZOPTYMALIZOWANĄ TREŚCIĄ.`;

export const IMAGE_ANALYSIS_PROMPT = `Przeanalizuj opis zdjęć i wygeneruj odpowiednie alt texty i opisy:

ZASADY:
1. Alt text powinien być opisowy (max 125 znaków)
2. Opis powinien być informacyjny
3. Uwzględnij kontekst artykułu
4. Unikaj słów kluczowych w alt text

ZDJĘCIA:
{images_descriptions}

ODPOWIEDZ W FORMACIE JSON:
{
  "images": [
    {
      "originalName": "string",
      "altText": "string",
      "caption": "string",
      "description": "string"
    }
  ]
}`;

export const SEO_PROMPT = `Wygeneruj SEO dla artykułu WordPress:

TREŚĆ ARTYKUŁU:
{content}

ZASADY:
1. Title tag: 50-60 znaków
2. Meta description: 150-160 znaków
3. Focus keyword: główne słowo kluczowe
4. Secondary keywords: 3-5 dodatkowych słów
5. Opis powinien być zachęcający do kliknięcia

ODPOWIEDZ W FORMACIE JSON:
{
  "seoTitle": "string",
  "seoDescription": "string",
  "focusKeyword": "string",
  "secondaryKeywords": ["string"],
  "estimatedReadTime": number
}`;

export const CATEGORIZATION_PROMPT = `Sklasyfikuj artykuł do odpowiedniej kategorii WordPress:

TREŚĆ ARTYKUŁU:
{content}

DOSTĘPNE KATEGORIE:
{categories}

ZASADY:
1. Wybierz najbardziej pasującą kategorię
2. Jeśli żadna nie pasuje, zaproponuj nową
3. Uwzględnij główny temat artykułu
4. Weź pod uwagę target audience

ODPOWIEDZ W FORMACIE JSON:
{
  "category": "string",
  "suggestedNewCategory": "string (opcjonalnie)",
  "confidence": number (0-1)
}`;
```

### 3.2 Frontend AI Components
```typescript
// apps/renderer/src/components/AIAnalysisPanel.tsx
import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useAIStore } from '../stores/aiStore';

export const AIAnalysisPanel: React.FC = () => {
  const { analyses, isAnalyzing, analyzeEmails } = useAIStore();
  
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Analiza AI
      </Typography>
      
      {isAnalyzing && (
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress size={20} />
          <Typography>Analizuję maile...</Typography>
        </Box>
      )}
      
      {analyses.map((analysis) => (
        <Box key={analysis.emailId} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            Email {analysis.emailId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Typ: {analysis.type} (pewność: {analysis.confidence}%)
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};
```

## 📋 FAZA 4: IMAGE PROCESSING

### 4.1 Backend Image Service
```typescript
// apps/api/src/services/ImageService.ts
import sharp from 'sharp';
import { ProcessedImage } from '@shared/types';

export class ImageService {
  async processImage(buffer: Buffer, options?: any): Promise<ProcessedImage> {
    try {
      const processed = await sharp(buffer)
        .rotate() // Auto-rotate based on EXIF
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
      
      return {
        id: this.generateId(),
        originalName: options?.filename || 'image.jpg',
        processedName: `galeria_${this.generateNumber()}.jpg`,
        path: `/processed/${this.generateId()}.jpg`,
        size: processed.length,
        width: 1920,
        height: Math.round((1920 * buffer.height) / buffer.width),
        position: 0
      };
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private generateNumber(): string {
    return String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  }
}
```

### 4.2 Frontend Image Components
```typescript
// apps/renderer/src/components/ImageGallery.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { ProcessedImage } from '@shared/types';

interface ImageGalleryProps {
  images: ProcessedImage[];
  onReorder: (newOrder: ProcessedImage[]) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onReorder }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={2}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ cursor: 'grab' }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={image.path}
                      alt={image.originalName}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="caption">
                        {image.processedName}
                      </Typography>
                    </Box>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
```

## 📋 FAZA 5: ARTICLE MANAGEMENT

### 5.1 Backend Article Service
```typescript
// apps/api/src/services/ArticleService.ts
import { Article, ArticleCreateRequest, ProcessedImage } from '@shared/types';

export class ArticleService {
  async createArticle(request: ArticleCreateRequest): Promise<Article> {
    try {
      const content = await this.assembleContent(request.analyses, request.images);
      
      const article: Article = {
        id: this.generateId(),
        title: this.generateTitle(request.analyses),
        content,
        images: request.images,
        metadata: this.generateMetadata(request.analyses, request.images),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return article;
    } catch (error) {
      throw new Error(`Article creation failed: ${error.message}`);
    }
  }
  
  private async assembleContent(analyses: AIAnalysis[], images: ProcessedImage[]): Promise<string> {
    // Implementation
  }
  
  private generateTitle(analyses: AIAnalysis[]): string {
    // Implementation
  }
  
  private generateMetadata(analyses: AIAnalysis[], images: ProcessedImage[]): ArticleMetadata {
    // Implementation
  }
}
```

### 5.2 Frontend Article Components
```typescript
// apps/renderer/src/components/ArticlePreview.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Article } from '@shared/types';

interface ArticlePreviewProps {
  article: Article | null;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  if (!article) return null;
  
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Czas czytania: {article.metadata.estimatedReadTime} min
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Słowa: {article.metadata.wordCount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zdjęcia: {article.metadata.imageCount}
        </Typography>
      </Box>
      
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </Paper>
  );
};
```

## 📋 FAZA 6: WORDPRESS INTEGRATION

### 6.1 Backend WordPress Service
```typescript
// apps/api/src/services/WordPressService.ts
import axios from 'axios';
import { WordPressConfig, WordPressPost, WordPressMedia } from '@shared/types';

export class WordPressService {
  private config: WordPressConfig;
  
  constructor(config: WordPressConfig) {
    this.config = config;
  }
  
  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.config.url}/wp-json/wp/v2/users/me`, {
        auth: {
          username: this.config.username,
          password: this.config.password
        }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  
  async uploadMedia(file: Buffer, filename: string): Promise<WordPressMedia> {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([file]), filename);
      
      const response = await axios.post(
        `${this.config.url}/wp-json/wp/v2/media`,
        formData,
        {
          auth: {
            username: this.config.username,
            password: this.config.password
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      throw new Error(`Media upload failed: ${error.message}`);
    }
  }
  
  async createPost(post: Partial<WordPressPost>): Promise<WordPressPost> {
    try {
      const response = await axios.post(
        `${this.config.url}/wp-json/wp/v2/posts`,
        post,
        {
          auth: {
            username: this.config.username,
            password: this.config.password
          }
        }
      );
      
      return response.data;
    } catch (error) {
      throw new Error(`Post creation failed: ${error.message}`);
    }
  }
}
```

### 6.2 Frontend WordPress Components
```typescript
// apps/renderer/src/components/WordPressConfig.tsx
import React from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useWordPressStore } from '../stores/wordpressStore';

export const WordPressConfig: React.FC = () => {
  const { config, updateConfig, saveConfig, testConnection, isConnected, error } = useWordPressStore();
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Konfiguracja WordPress
      </Typography>
      
      <TextField
        fullWidth
        label="WordPress URL"
        value={config?.url || ''}
        onChange={(e) => updateConfig({ url: e.target.value })}
        margin="normal"
        helperText="np. https://mojastrona.pl"
      />
      
      <TextField
        fullWidth
        label="Username"
        value={config?.username || ''}
        onChange={(e) => updateConfig({ username: e.target.value })}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={config?.password || ''}
        onChange={(e) => updateConfig({ password: e.target.value })}
        margin="normal"
        helperText="Użyj App Password dla bezpieczeństwa"
      />
      
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={saveConfig}>
          Zapisz konfigurację
        </Button>
        <Button 
          variant="contained" 
          onClick={testConnection}
          color={isConnected ? 'success' : 'primary'}
        >
          Test połączenia
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
```

## 📋 FAZA 7: POLISH & TESTING

### 7.1 Error Boundary
```typescript
// apps/renderer/src/components/ErrorBoundary.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="error">
            Coś poszło nie tak
          </Typography>
          <Button onClick={() => window.location.reload()}>
            Odśwież aplikację
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

### 7.2 Performance Hooks
```typescript
// apps/renderer/src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## 🎯 FINALNE KRYTERIA SUKCESU

### Funkcjonalność:
- ✅ Gmail connection działa stabilnie
- ✅ AI analysis daje dobre wyniki
- ✅ Image processing działa poprawnie
- ✅ Article creation działa
- ✅ WordPress upload działa
- ✅ Export system działa
- ✅ Error handling działa

### Performance:
- ✅ Aplikacja ładuje się szybko
- ✅ Operacje są responsywne
- ✅ Memory usage jest akceptowalne
- ✅ Network requests są zoptymalizowane
- ✅ Image processing jest wydajne
- ✅ UI jest płynne

### UX/UI:
- ✅ Interface jest intuicyjny
- ✅ Loading states są jasne
- ✅ Error messages są pomocne
- ✅ Drag & drop działa płynnie
- ✅ Responsive design
- ✅ Accessibility compliance
- ✅ Dark/light mode

### Code Quality:
- ✅ TypeScript strict mode
- ✅ No any types
- ✅ Proper error handling
- ✅ Clean code principles
- ✅ Proper documentation
- ✅ Consistent naming
- ✅ Modular architecture

---

**GOTOWY DO IMPLEMENTACJI!** 🚀 