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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
  parent?: number;
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
  avatar?: string;
}

export interface WordPressUploadResponse {
  id: number;
  url: string;
  altText?: string;
  caption?: string;
  description?: string;
  mediaType: string;
  mimeType: string;
  sizes: {
    thumbnail?: string;
    medium?: string;
    large?: string;
    full?: string;
  };
}

export interface WordPressPublishRequest {
  title: string;
  content: string;
  excerpt?: string;
  status: 'publish' | 'draft' | 'private' | 'pending';
  categories?: number[];
  tags?: number[];
  featuredImageId?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface WordPressPublishResponse {
  success: boolean;
  postId?: number;
  url?: string;
  error?: string;
}
```

## 🖼️ IMAGE TYPES

```typescript
// shared/types/image.ts

export interface ImageProcessingOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  optimize: boolean;
  generateThumbnails: boolean;
  watermark?: WatermarkOptions;
}

export interface WatermarkOptions {
  text?: string;
  imagePath?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity: number;
  fontSize?: number;
  color?: string;
}

export interface ImageProcessingResult {
  original: ImageInfo;
  processed: ImageInfo;
  thumbnails: ImageInfo[];
  metadata: ImageMetadata;
}

export interface ImageInfo {
  path: string;
  filename: string;
  size: number;
  width: number;
  height: number;
  format: string;
  mimeType: string;
  hasAlpha: boolean;
  isOpaque: boolean;
  orientation?: number;
}

export interface ImageMetadata {
  exif?: Record<string, any>;
  iptc?: Record<string, any>;
  xmp?: Record<string, any>;
  icc?: Record<string, any>;
}

export interface ImageUploadRequest {
  file: File;
  options?: ImageProcessingOptions;
  altText?: string;
  caption?: string;
}

export interface ImageUploadResponse {
  success: boolean;
  image?: ProcessedImage;
  error?: string;
}

export interface ImageGallery {
  id: string;
  name: string;
  images: ProcessedImage[];
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎛️ SETTINGS TYPES

```typescript
// shared/types/settings.ts

export interface AppSettings {
  general: GeneralSettings;
  gmail: GmailSettings;
  ai: AISettings;
  wordpress: WordPressSettings;
  article: ArticleSettings;
  ui: UISettings;
  notifications: NotificationSettings;
}

export interface GeneralSettings {
  language: 'pl' | 'en';
  theme: 'light' | 'dark' | 'auto';
  autoSave: boolean;
  autoSaveInterval: number; // minutes
  maxFileSize: number; // MB
  supportedFormats: string[];
  dataRetention: number; // days
}

export interface GmailSettings {
  autoRefresh: boolean;
  refreshInterval: number; // minutes
  defaultFilters: EmailFilters;
  maxEmailsPerPage: number;
  showUnreadOnly: boolean;
  autoMarkAsRead: boolean;
  downloadAttachments: boolean;
  attachmentSizeLimit: number; // MB
}

export interface AISettings {
  defaultModel: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
  temperature: number;
  maxTokens: number;
  defaultLanguage: 'pl' | 'en';
  autoAnalyze: boolean;
  confidenceThreshold: number;
  promptTemplates: AIPrompt[];
  customPrompts: AIPrompt[];
}

export interface WordPressSettings {
  defaultSite: string;
  autoPublish: boolean;
  defaultStatus: 'publish' | 'draft' | 'private';
  defaultCategory: number;
  defaultTags: number[];
  featuredImageSettings: FeaturedImageSettings;
  seoSettings: SEOSettings;
  contentSettings: ContentSettings;
}

export interface FeaturedImageSettings {
  autoSetFeatured: boolean;
  defaultAltText: string;
  defaultCaption: string;
  resizeForWeb: boolean;
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

export interface SEOSettings {
  autoGenerateTitle: boolean;
  autoGenerateDescription: boolean;
  autoGenerateKeywords: boolean;
  titleTemplate: string;
  descriptionTemplate: string;
  keywordsTemplate: string;
  focusKeyword?: string;
}

export interface ContentSettings {
  autoFormatContent: boolean;
  removeEmailHeaders: boolean;
  addReadMore: boolean;
  defaultExcerptLength: number;
  autoAddTags: boolean;
  autoAddCategories: boolean;
}

export interface ArticleSettings {
  defaultTitle: string;
  defaultCategory: string;
  defaultTags: string[];
  autoGenerateSlug: boolean;
  slugTemplate: string;
  exportFormats: ('html' | 'markdown' | 'json')[];
  defaultExportFormat: 'html' | 'markdown' | 'json';
  imageProcessing: ImageProcessingOptions;
  contentTemplates: ContentTemplate[];
}

export interface ContentTemplate {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
  variables: string[];
}

export interface UISettings {
  sidebarCollapsed: boolean;
  showTooltips: boolean;
  showKeyboardShortcuts: boolean;
  animationsEnabled: boolean;
  compactMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'default' | 'high-contrast' | 'colorblind-friendly';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  soundEnabled: boolean;
  notificationTypes: {
    emailFetched: boolean;
    aiAnalysisComplete: boolean;
    articleCreated: boolean;
    wordpressUploaded: boolean;
    errorOccurred: boolean;
  };
  notificationDuration: number; // seconds
}

export interface SettingsUpdateRequest {
  section: keyof AppSettings;
  settings: Partial<AppSettings[keyof AppSettings]>;
}

export interface SettingsUpdateResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface SettingsExportRequest {
  includeSensitiveData: boolean;
  format: 'json' | 'yaml';
}

export interface SettingsExportResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface SettingsImportRequest {
  data: string;
  format: 'json' | 'yaml';
  overwrite: boolean;
}

export interface SettingsImportResponse {
  success: boolean;
  importedSections: string[];
  errors: string[];
}
```

## 📊 STORE TYPES

```typescript
// shared/types/store.ts

export interface AppState {
  emails: EmailState;
  ai: AIState;
  articles: ArticleState;
  wordpress: WordPressState;
  images: ImageState;
  settings: SettingsState;
  ui: UIState;
}

export interface EmailState {
  emails: Email[];
  selectedEmails: string[];
  filters: EmailFilters;
  loading: boolean;
  error?: string;
  hasMore: boolean;
  total: number;
}

export interface AIState {
  analyses: AIAnalysis[];
  currentAnalysis?: AIAnalysis;
  loading: boolean;
  error?: string;
  progress: number;
  model: string;
  temperature: number;
}

export interface ArticleState {
  articles: Article[];
  currentArticle?: Article;
  drafts: Article[];
  loading: boolean;
  error?: string;
  saving: boolean;
}

export interface WordPressState {
  sites: WordPressConfig[];
  currentSite?: WordPressConfig;
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  users: WordPressUser[];
  loading: boolean;
  error?: string;
  uploading: boolean;
}

export interface ImageState {
  images: ProcessedImage[];
  selectedImages: string[];
  processing: boolean;
  error?: string;
  progress: number;
  galleries: ImageGallery[];
}

export interface SettingsState {
  settings: AppSettings;
  loading: boolean;
  saving: boolean;
  error?: string;
  lastSaved?: Date;
}

export interface UIState {
  currentTab: number;
  sidebarOpen: boolean;
  notifications: Notification[];
  dialogs: DialogProps[];
  loadingStates: Record<string, LoadingState>;
  theme: 'light' | 'dark';
  language: 'pl' | 'en';
}
```

## 🎨 UI TYPES

```typescript
// shared/types/ui.ts

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
  SETTINGS: '/api/settings',
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
  SETTINGS_SAVED: 'Ustawienia zostały zapisane',
} as const;
```

---

**WSZYSTKIE TYPY ZDEFINIOWANE!** 🎯 