# ARCHITEKTURA - MAILTOWP V2

## 🏗️ ZASADY ARCHITEKTURY

### 1. Single Source of Truth (Zustand)
- Jeden centralny store dla każdej domeny
- Spójne zarządzanie stanem
- Przewidywalne aktualizacje

### 2. Czysta separacja odpowiedzialności
- Każdy komponent ma jedną funkcję
- Modułowa struktura
- Łatwe testowanie i utrzymanie

### 3. TypeScript strict mode
- Wszystkie typy zdefiniowane upfront
- No any types
- Proper interfaces
- Union types dla state

### 4. RESTful API design
- Spójne endpointy
- Standardowe struktury danych
- Proper HTTP methods

### 5. Modularne komponenty
- Łatwe do testowania
- Reużywalne
- Loose coupling

### 6. Proper error handling
- Obsługa błędów na każdym poziomie
- User-friendly feedback
- Logging dla debug

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

---

**ARCHITEKTURA GOTOWA DO IMPLEMENTACJI!** 🏗️ 