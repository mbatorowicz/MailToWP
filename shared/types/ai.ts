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

// Import Email type
import { Email } from './email'; 