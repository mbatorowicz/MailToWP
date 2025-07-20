import { Email, EmailFilters } from './email';
import { AIAnalysis } from './ai';
import { Article, ProcessedImage } from './article';
import { WordPressConfig, WordPressCategory, WordPressTag, WordPressUser, WordPressPost } from './wordpress';

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