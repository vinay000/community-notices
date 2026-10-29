import { useCallback, useEffect, useState } from 'react';

import { fetchNotices } from '@/services/api';
import { ApiError, GetNoticesParams, Notice } from '@/types/notice';
import { getStoredReadIds, storeReadId } from '@/utils/storage';

export function useNotices(params?: GetNoticesParams) {
  const { category, priority, department, limit } = params ?? {};

  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (pageNumber: number) => {
      const [response, readIds] = await Promise.all([
        fetchNotices({ category, priority, department, limit, page: pageNumber, }), getStoredReadIds(),]);
      const readSet = new Set(readIds);

      return {
        notices: response.notices.map((notice) => ({
          ...notice,
          isRead: readSet.has(notice.id),
        })),
        hasMore: response.hasMore,
      };
    },
    [category, priority, department, limit]
  );

  const refetch = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const result = await fetchPage(1);

      setNotices(result.notices);
      setHasMore(result.hasMore);
      setPage(1);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  },
    [fetchPage]
  );

  const loadMore = useCallback(async () => {
    if (isLoading || isRefreshing || isLoadingMore || !hasMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;
      const result = await fetchPage(nextPage);

      setNotices((prev) => [...prev, ...result.notices]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, hasMore, isLoading, isRefreshing, isLoadingMore, fetchPage]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPage(1);

        if (!cancelled) {
          setNotices(result.notices);
          setHasMore(result.hasMore);
          setPage(1);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as ApiError).message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchPage]);

  const markAsRead = useCallback((id: string) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, isRead: true } : notice
      )
    );

    void storeReadId(id);
  }, []);

  const isEmpty = !isLoading && !error && notices.length === 0;

  return {
    notices,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    error,
    isEmpty,
    refetch,
    loadMore,
    markAsRead,
  };
}
