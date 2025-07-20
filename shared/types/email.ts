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