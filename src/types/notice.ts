export type NoticeCategory = 'general' | 'event' | 'service' | 'emergency';
export type NoticePriority = 'normal' | 'high';
export type NoticeDepartment =
  | 'Band Office'
  | 'Recreation'
  | 'Health Centre'
  | 'Emergency Services';

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  priority: NoticePriority;
  department: NoticeDepartment;
  published_at: string;
  expires_at: string | null;
  image_url: string | null;
  isRead?: boolean;
}

export interface GetNoticesParams {
  category?: NoticeCategory;
  priority?: NoticePriority;
  department?: NoticeDepartment;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedNotices {
  notices: Notice[];
  hasMore: boolean;
  total: number;
}

export interface ApiError {
  status: number;
  message: string;
  code: 'SERVER_ERROR' | 'NOT_FOUND';
  timestamp: string;
}
