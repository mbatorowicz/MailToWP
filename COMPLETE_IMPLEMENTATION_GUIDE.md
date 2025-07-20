# KOMPLETNY PRZEWODNIK IMPLEMENTACJI - MAILTOWP V2

## 🎯 CEL PROJEKTU

Aplikacja desktopowa do automatycznego przetwarzania maili Gmail na gotowe artykuły WordPress z inteligentną analizą AI.

## 🛠️ TECHNOLOGIE

### Frontend:
- Electron + React 18 + TypeScript
- Material-UI v5
- Zustand dla state management
- React Beautiful DnD
- Axios dla HTTP

### Backend:
- Node.js + Express
- TypeScript
- Sharp dla obrazów
- OpenAI/Anthropic API
- Google APIs (Gmail)
- Multer dla upload

### Development:
- pnpm workspaces (monorepo)
- Vite dla frontendu
- ts-node dla backendu
- nodemon dla hot reload
- concurrently dla parallel dev

## 📦 KONKRETNE WERSJE ZALEŻNOŚCI

### Root package.json:
```json
{
  "name": "mailtowp-v2",
  "version": "2.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "shared"
  ],
  "scripts": {
    "dev": "concurrently \"pnpm --filter main dev\" \"pnpm --filter renderer dev\" \"pnpm --filter api dev\"",
    "build": "pnpm --filter main build && pnpm --filter renderer build && pnpm --filter api build",
    "start": "pnpm --filter main start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.3.3"
  }
}
```

### Frontend (apps/renderer/package.json):
```json
{
  "name": "renderer",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "zustand": "^4.4.7",
    "react-beautiful-dnd": "^13.1.1",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/react-beautiful-dnd": "^13.1.8",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

### Backend (apps/api/package.json):
```json
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.1",
    "openai": "^4.20.1",
    "googleapis": "^128.0.0",
    "mammoth": "^1.6.0",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2"
  }
}
```

### Main (apps/main/package.json):
```json
{
  "name": "main",
  "version": "1.0.0",
  "main": "dist/main.js",
  "scripts": {
    "dev": "tsc && electron .",
    "build": "tsc",
    "watch": "tsc -w",
    "start": "electron ."
  },
  "dependencies": {
    "electron": "^28.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "electron-builder": "^24.9.1"
  }
}
```

## 🔐 SZCZEGÓŁOWA KONFIGURACJA OAUTH2 DLA GMAIL

### 1. Google Cloud Console Setup:
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

### 2. OAuth2 Flow:
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

### 3. Environment Variables:
```bash
# .env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 4. Google Cloud Console Steps:
1. **Utwórz projekt w Google Cloud Console**
2. **Włącz Gmail API**
3. **Utwórz OAuth 2.0 credentials**
4. **Dodaj authorized redirect URIs:**
   - `http://localhost:3001/api/auth/google/callback`
   - `http://localhost:3001/api/auth/google/callback/desktop`

## 🤖 KONKRETNE PROMPTY DLA AI

### 1. Główny Prompt dla Analizy Maili:
```typescript
// apps/api/src/services/AIService.ts
const MAIN_ANALYSIS_PROMPT = `Jesteś ekspertem w analizie treści maili i tworzeniu artykułów WordPress.

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
```

### 2. Prompt dla Optymalizacji Treści:
```typescript
const CONTENT_OPTIMIZATION_PROMPT = `Jesteś redaktorem treści WordPress. Zoptymalizuj poniższą treść:

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
```

### 3. Prompt dla Analizy Zdjęć:
```typescript
const IMAGE_ANALYSIS_PROMPT = `Przeanalizuj opis zdjęć i wygeneruj odpowiednie alt texty i opisy:

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
```

### 4. Prompt dla SEO:
```typescript
const SEO_PROMPT = `Wygeneruj SEO dla artykułu WordPress:

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
```

### 5. Prompt dla Kategoryzacji:
```typescript
const CATEGORIZATION_PROMPT = `Sklasyfikuj artykuł do odpowiedniej kategorii WordPress:

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

## 🔧 KONFIGURACJA ŚRODOWISKA

### 1. Vite Config (apps/renderer/vite.config.ts):
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../shared')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

### 2. TypeScript Config (apps/renderer/tsconfig.json):
```json
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
      "@/*": ["./src/*"],
      "@shared/*": ["../../shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "../../shared" }]
}
```

### 3. Electron Config (apps/main/electron-builder.json):
```json
{
  "appId": "com.mailtowp.app",
  "productName": "MailToWP v2",
  "directories": {
    "output": "dist"
  },
  "files": [
    "dist/**/*",
    "node_modules/**/*"
  ],
  "mac": {
    "category": "public.app-category.productivity"
  },
  "win": {
    "target": "nsis"
  },
  "linux": {
    "target": "AppImage"
  }
}
```

## 📁 STRUKTURA PROJEKTU

```
MailToWP-v2/
├── apps/
│   ├── main/           # Electron main process
│   ├── renderer/       # React frontend
│   └── api/           # Express backend
├── shared/
│   ├── types/         # TypeScript interfaces
│   ├── constants/     # Stałe aplikacji
│   └── utils/         # Współdzielone funkcje
├── docs/              # Dokumentacja
└── scripts/           # Build scripts
```

## 🏗️ ZASADY ARCHITEKTURY

- **Single Source of Truth** (Zustand) - jeden centralny store
- **Czysta separacja odpowiedzialności** - każdy komponent ma jedną funkcję
- **TypeScript strict mode** - wszystkie typy zdefiniowane upfront
- **RESTful API design** - spójne endpointy i struktury danych
- **Modularne komponenty** - łatwe do testowania i utrzymania
- **Proper error handling** - obsługa błędów na każdym poziomie

## 📋 PLAN IMPLEMENTACJI (7 dni)

### Dzień 1: Podstawy i Setup
- Setup projektu z pnpm workspaces
- Wszystkie typy TypeScript
- Store architecture (Zustand)
- Podstawowy UI z zakładkami

### Dzień 2: Gmail Integration
- Backend Gmail service z OAuth2
- Frontend Gmail components
- Error handling i loading states

### Dzień 3: AI Integration
- Backend AI service (OpenAI/Claude)
- Frontend AI components
- Content extraction (.docx, PDF)

### Dzień 4: Image Processing
- Backend Image service z Sharp
- Frontend Image components
- Drag & drop functionality

### Dzień 5: Article Management
- Backend Article service
- Frontend Article components
- Export system

### Dzień 6: WordPress Integration
- Backend WordPress service
- Frontend WordPress components
- Configuration management

### Dzień 7: Polish & Testing
- Error handling
- Performance optimization
- Testing
- Documentation

## 🔑 KLUCZOWE TYPY DANYCH

### Email Types:
```typescript
interface Email {
  id: string;
  subject: string;
  sender: string;
  date: Date;
  content: string;
  attachments: Attachment[];
  isRead: boolean;
}

interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  isImage: boolean;
}

interface EmailFilters {
  showUnreadOnly: boolean;
  search?: string;
  sender?: string;
}
```

### AI Types:
```typescript
interface AIAnalysis {
  emailId: string;
  type: 'main_content' | 'instructions' | 'images_only' | 'mixed';
  confidence: number;
  mainContent?: string;
  instructions?: string;
  imageInstructions?: ImageInstruction[];
  suggestedPosition: number;
}

interface ImageInstruction {
  imageName: string;
  instruction: string;
  position: 'top' | 'middle' | 'bottom' | 'inline';
}

interface AIAnalysisRequest {
  emails: Email[];
  prompt?: string;
}
```

### Article Types:
```typescript
interface Article {
  id: string;
  title: string;
  content: string;
  images: ProcessedImage[];
  metadata: ArticleMetadata;
  createdAt: Date;
  updatedAt: Date;
}

interface ProcessedImage {
  id: string;
  originalName: string;
  processedName: string;
  path: string;
  size: number;
  width: number;
  height: number;
  position: number;
}

interface ArticleMetadata {
  estimatedReadTime: number;
  wordCount: number;
  imageCount: number;
  tags: string[];
  category?: string;
}
```

### WordPress Types:
```typescript
interface WordPressConfig {
  url: string;
  username: string;
  password: string;
}

interface WordPressPost {
  id: number;
  url: string;
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'private';
  featuredImageId?: number;
  galleryImageIds: number[];
}

interface WordPressMedia {
  id: number;
  url: string;
  title: string;
  altText?: string;
}
```

## 🗂️ API ENDPOINTS

### Email Endpoints:
```
GET    /api/emails              # Lista maili
GET    /api/emails/:id          # Szczegóły maila
GET    /api/emails/:id/attachments/:attachmentId  # Pobierz załącznik
```

### AI Endpoints:
```
POST   /api/ai/analyze          # Analiza maili
GET    /api/ai/prompt           # Pobierz prompt
POST   /api/ai/prompt           # Zapisz prompt
```

### Article Endpoints:
```
POST   /api/articles/create     # Utwórz artykuł
POST   /api/articles/export     # Eksportuj artykuł
```

### WordPress Endpoints:
```
POST   /api/wordpress/test      # Test połączenia
POST   /api/wordpress/upload    # Upload artykułu
```

## 📊 STORE ARCHITEKTURA (ZUSTAND)

### Email Store:
```typescript
interface EmailStore {
  emails: Email[];
  selectedEmails: string[];
  isLoading: boolean;
  error: string | null;
  filters: EmailFilters;
  
  fetchEmails: (filters?: EmailFilters) => Promise<void>;
  selectEmail: (id: string) => void;
  deselectEmail: (id: string) => void;
  clearSelection: () => void;
}
```

### AI Store:
```typescript
interface AIStore {
  analyses: AIAnalysis[];
  isAnalyzing: boolean;
  prompt: string;
  error: string | null;
  
  analyzeEmails: (emailIds: string[]) => Promise<void>;
  updatePrompt: (prompt: string) => void;
  savePrompt: () => Promise<void>;
}
```

### Article Store:
```typescript
interface ArticleStore {
  currentArticle: Article | null;
  processedImages: ProcessedImage[];
  exportPath: string;
  isCreating: boolean;
  isExporting: boolean;
  
  createArticle: (emailIds: string[]) => Promise<void>;
  updateImageOrder: (newOrder: ProcessedImage[]) => void;
  exportArticle: (format?: string) => Promise<void>;
  uploadToWordPress: () => Promise<WordPressPost>;
}
```

### WordPress Store:
```typescript
interface WordPressStore {
  config: WordPressConfig | null;
  isConnected: boolean;
  isUploading: boolean;
  error: string | null;
  
  updateConfig: (config: Partial<WordPressConfig>) => void;
  saveConfig: () => void;
  loadConfig: () => void;
  testConnection: () => Promise<boolean>;
}
```

## 🎨 KOMPONENTY UI

### Layout Components:
- `App.tsx` - Główny komponent
- `Layout.tsx` - Layout z zakładkami
- `Header.tsx` - Nagłówek z tytułem i kontrolkami

### Email Components:
- `EmailList.tsx` - Lista maili z filtrowaniem
- `EmailItem.tsx` - Pojedynczy mail
- `GmailConnectButton.tsx` - Przycisk połączenia

### AI Components:
- `AIAnalysisPanel.tsx` - Panel analizy AI
- `PromptEditor.tsx` - Edytor promptu
- `AILoadingOverlay.tsx` - Animacja AI

### Article Components:
- `ArticlePreview.tsx` - Podgląd artykułu
- `ImageGallery.tsx` - Galeria zdjęć z drag & drop
- `ExportPanel.tsx` - Panel eksportu

### WordPress Components:
- `WordPressConfig.tsx` - Konfiguracja WordPress
- `WordPressUpload.tsx` - Upload do WordPress

## ⚙️ ZASADY KODOWANIA

### TypeScript:
- Strict mode zawsze
- No any types
- Proper interfaces
- Union types dla state

### React:
- Functional components
- Hooks only
- Proper dependency arrays
- Memoization gdzie potrzebne

### Error Handling:
- Try-catch everywhere
- Proper error messages
- User-friendly feedback
- Logging dla debug

### Performance:
- Lazy loading
- Memoization
- Debouncing
- Proper cleanup

## 🎯 KRYTERIA SUKCESU

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

## 🚨 WAŻNE ZASADY

1. **Trzymaj się planu** - nie zmieniaj podejścia gdy coś nie działa
2. **TypeScript strict mode** - wszystkie typy muszą być zdefiniowane
3. **Single Source of Truth** - jeden store dla każdej domeny
4. **Proper error handling** - obsługa błędów na każdym poziomie
5. **Clean code** - czytelny, maintainable kod
6. **Testuj każdą fazę** - nie przechodź dalej bez sprawdzenia

---

**GOTOWY DO IMPLEMENTACJI!** 🚀 