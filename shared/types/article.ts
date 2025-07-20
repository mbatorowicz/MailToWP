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

// Import AIAnalysis type
import { AIAnalysis } from './ai'; 