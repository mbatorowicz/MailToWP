# WSZYSTKIE TYPY TYPESCRIPT - MAILTOWP V2

## 📧 EMAIL TYPES

```typescript
// shared/types/email.ts

export interface Email {
  id: string;
  subject: string;
  sender: string;
  date: Date;
  content: string;
  attachments: Attachment[];
  isRead: boolean;
}

export interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  isImage: boolean;
}

export interface EmailFilters {
  showUnreadOnly: boolean;
  search?: string;
  sender?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  hasMore: boolean;
}

export interface EmailDetailsResponse {
  email: Email;
  fullContent: string;
  attachments: Attachment[];
}
```

## 🤖 AI TYPES

```typescript
// shared/types/ai.ts

export interface AIAnalysis {
  emailId: string;
  type: 'main_content' | 'instructions' | 'images_only' | 'mixed';
  confidence: number;
  mainContent?: string;
  instructions?: string;
  imageInstructions?: ImageInstruction[];
  suggestedPosition: number;
  tags?: string[];
  category?: string;
}

export interface ImageInstruction {
  imageName: string;
  instruction: string;
  position: 'top' | 'middle' | 'bottom' | 'inline';
  priority: number;
}

export interface AIAnalysisRequest {
  emails: Email[];
  prompt?: string;
  options?: AIAnalysisOptions;
}

export interface AIAnalysisOptions {
  model?: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
  temperature?: number;
  maxTokens?: number;
  language?: 'pl' | 'en';
}

export interface AIAnalysisResponse {
  analyses: AIAnalysis[];
  summary: string;
  suggestedTitle?: string;
  estimatedReadTime: number;
}

export interface AIPrompt {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 📄 ARTICLE TYPES

```typescript
// shared/types/article.ts

export interface Article {
  id: string;
  title: string;
  content: string;
  images: ProcessedImage[];
  metadata: ArticleMetadata;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface ProcessedImage {
  id: string;
  originalName: string;
  processedName: string;
  path: string;
  size: number;
  width: number;
  height: number;
  position: number;
  isFeatured: boolean;
  altText?: string;
  caption?: string;
}

export interface ArticleMetadata {
  estimatedReadTime: number;
  wordCount: number;
  imageCount: number;
  tags: string[];
  category?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: ProcessedImage;
}

export interface ArticleCreateRequest {
  analyses: AIAnalysis[];
  images: ProcessedImage[];
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
}

export interface ArticleExportRequest {
  articleId: string;
  format: 'html' | 'markdown' | 'json';
  includeImages: boolean;
  exportPath?: string;
}

export interface ArticleExportResponse {
  success: boolean;
  filePath: string;
  metadata: ArticleExportMetadata;
}

export interface ArticleExportMetadata {
  exportedAt: Date;
  format: string;
  fileSize: number;
  imageCount: number;
}
```

## 🌐 WORDPRESS TYPES

```typescript
// shared/types/wordpress.ts

export interface WordPressConfig {
  url: string;
  username: string;
  password: string;
  siteName?: string;
  apiVersion?: string;
}

export interface WordPressPost {
  id: number;
  url: string;
  title: string;
  content: string;
  excerpt?: string;
  status: 'publish' | 'draft' | 'private' | 'pending';
  featuredImageId?: number;
  galleryImageIds: number[];
  categories: number[];
  tags: number[];
  author: number;
  date: Date;
  modified: Date;
  slug: string;
}

export interface WordPressMedia {
  id: number;
  url: string;
  title: string;
  altText?: string;
  caption?: string;
  description?: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  uploadedAt: Date;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface WordPressUser {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string[];
  capabilities: string[];
}

export interface WordPressConnectionTest {
  success: boolean;
  message: string;
  user?: WordPressUser;
  siteInfo?: {
    name: string;
    description: string;
    url: string;
    version: string;
  };
}
```

## 📊 STORE TYPES

```typescript
// shared/types/store.ts

export interface EmailStore {
  emails: Email[];
  selectedEmails: string[];
  isLoading: boolean;
  error: string | null;
  filters: EmailFilters;
  hasMore: boolean;
  
  fetchEmails: (filters?: EmailFilters) => Promise<void>;
  loadMoreEmails: () => Promise<void>;
  selectEmail: (id: string) => void;
  deselectEmail: (id: string) => void;
  clearSelection: () => void;
  updateFilters: (filters: Partial<EmailFilters>) => void;
  clearError: () => void;
}

export interface AIStore {
  analyses: AIAnalysis[];
  isAnalyzing: boolean;
  prompt: string;
  error: string | null;
  currentPromptId: string | null;
  
  analyzeEmails: (emailIds: string[]) => Promise<void>;
  updatePrompt: (prompt: string) => void;
  savePrompt: () => Promise<void>;
  loadPrompt: (promptId: string) => Promise<void>;
  clearAnalyses: () => void;
  clearError: () => void;
}

export interface ArticleStore {
  currentArticle: Article | null;
  processedImages: ProcessedImage[];
  exportPath: string;
  isCreating: boolean;
  isExporting: boolean;
  error: string | null;
  
  createArticle: (emailIds: string[]) => Promise<void>;
  updateImageOrder: (newOrder: ProcessedImage[]) => void;
  updateImageMetadata: (imageId: string, metadata: Partial<ProcessedImage>) => void;
  exportArticle: (format?: string) => Promise<void>;
  uploadToWordPress: () => Promise<WordPressPost>;
  clearArticle: () => void;
  clearError: () => void;
}

export interface WordPressStore {
  config: WordPressConfig | null;
  isConnected: boolean;
  isUploading: boolean;
  error: string | null;
  categories: WordPressCategory[];
  tags: WordPressTag[];
  currentUser?: WordPressUser;
  
  updateConfig: (config: Partial<WordPressConfig>) => void;
  saveConfig: () => void;
  loadConfig: () => void;
  testConnection: () => Promise<boolean>;
  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  clearError: () => void;
}

export interface UIStore {
  activeTab: string;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  language: 'pl' | 'en';
  
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'pl' | 'en') => void;
}
```

## 🗂️ API TYPES

```typescript
// shared/types/api.ts

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface EmailAPIResponse extends APIResponse<EmailListResponse> {}
export interface EmailDetailsAPIResponse extends APIResponse<EmailDetailsResponse> {}
export interface AIAnalysisAPIResponse extends APIResponse<AIAnalysisResponse> {}
export interface ArticleAPIResponse extends APIResponse<Article> {}
export interface WordPressAPIResponse extends APIResponse<WordPressConnectionTest> {}

export interface APIError {
  code: string;
  message: string;
  details?: any;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
```

## 🎨 UI TYPES

```typescript
// shared/types/ui.ts

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  component: React.ComponentType;
  disabled?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface DialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: 'warning' | 'error' | 'info';
}
```

## 🛠️ UTILS TYPES

```typescript
// shared/types/utils.ts

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
}

export interface ImageInfo {
  width: number;
  height: number;
  format: string;
  hasAlpha: boolean;
  isOpaque: boolean;
  orientation?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
  cleanupInterval?: number;
}

export interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

export interface EventEmitter {
  on: (event: string, listener: (...args: any[]) => void) => void;
  off: (event: string, listener: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
  once: (event: string, listener: (...args: any[]) => void) => void;
}
```

## 🔧 CONSTANTS

```typescript
// shared/constants/index.ts

export const APP_NAME = 'MailToWP v2';
export const APP_VERSION = '2.0.0';

export const API_ENDPOINTS = {
  EMAILS: '/api/emails',
  AI: '/api/ai',
  ARTICLES: '/api/articles',
  WORDPRESS: '/api/wordpress',
  IMAGES: '/api/images',
} as const;

export const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
] as const;

export const SUPPORTED_DOCUMENT_FORMATS = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
  'text/html',
] as const;

export const IMAGE_PROCESSING_OPTIONS = {
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  QUALITY: 85,
  FORMAT: 'jpeg',
} as const;

export const AI_MODELS = {
  GPT_4: 'gpt-4',
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  CLAUDE_3: 'claude-3-sonnet-20240229',
} as const;

export const WORDPRESS_POST_STATUS = {
  PUBLISH: 'publish',
  DRAFT: 'draft',
  PRIVATE: 'private',
  PENDING: 'pending',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LANGUAGES = {
  POLISH: 'pl',
  ENGLISH: 'en',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Błąd połączenia z serwerem',
  UNAUTHORIZED: 'Brak autoryzacji',
  FORBIDDEN: 'Brak uprawnień',
  NOT_FOUND: 'Nie znaleziono',
  VALIDATION_ERROR: 'Błąd walidacji',
  UNKNOWN_ERROR: 'Nieznany błąd',
} as const;

export const SUCCESS_MESSAGES = {
  EMAILS_FETCHED: 'Maile zostały pobrane',
  AI_ANALYSIS_COMPLETED: 'Analiza AI zakończona',
  ARTICLE_CREATED: 'Artykuł został utworzony',
  ARTICLE_EXPORTED: 'Artykuł został wyeksportowany',
  WORDPRESS_UPLOADED: 'Artykuł został wysłany do WordPress',
  CONFIG_SAVED: 'Konfiguracja została zapisana',
} as const;
```

---

**WSZYSTKIE TYPY ZDEFINIOWANE!** 🎯 