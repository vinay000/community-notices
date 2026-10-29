import { useCallback, useEffect, useState } from 'react';

import { fetchNoticeById } from '@/services/api';
import { ApiError, Notice } from '@/types/notice';
import { storeReadId } from '@/utils/storage';

export function useNoticeDetail(id?: string) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotice = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchNoticeById(id);
      setNotice(data);
      void storeReadId(id);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadNotice();
  }, [loadNotice]);

  return {
    notice,
    isLoading,
    error,
    refetch: loadNotice,
  };
}
