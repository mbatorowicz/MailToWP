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

import { EmailListResponse, EmailDetailsResponse } from './email';
import { AIAnalysisResponse } from './ai';
import { Article } from './article';
import { WordPressConnectionTest } from './wordpress';

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