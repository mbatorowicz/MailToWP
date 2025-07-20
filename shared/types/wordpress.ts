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