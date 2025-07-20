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