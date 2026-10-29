import rawNoticesData from '@/assets/data/notices.json';
import { ApiError, GetNoticesParams, Notice, PaginatedNotices } from '@/types/notice';
import { simulateNetworkCall } from './mock-api-layer';

export const DEFAULT_PAGE_LIMIT = 10;

const notices: Notice[] = (rawNoticesData as { notices: Notice[] }).notices;

export async function fetchNotices(params?: GetNoticesParams): Promise<PaginatedNotices> {
  return simulateNetworkCall(() => {
    let result = [...notices];

    if (params?.category) {
      result = result.filter((n) => n.category === params.category);
    }
    if (params?.priority) {
      result = result.filter((n) => n.priority === params.priority);
    }
    if (params?.department) {
      result = result.filter((n) => n.department === params.department);
    }

    const page = params?.page ?? 1;
    const limit = params?.limit ?? DEFAULT_PAGE_LIMIT;
    const startIndex = (page - 1) * limit;
    const paginatedItems = result.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < result.length;

    return {
      notices: paginatedItems,
      hasMore,
      total: result.length,
    };
  });
}

export async function fetchNoticeById(id: string): Promise<Notice> {
  return simulateNetworkCall(() => {
    const notice = notices.find((n) => n.id === id);
    if (!notice) {
      const error: ApiError = {
        status: 404,
        message: `Notice with ID "${id}" not found`,
        code: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return notice;
  });
}
