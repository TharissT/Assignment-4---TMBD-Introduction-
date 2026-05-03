import { API_KEY } from '@/core/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTmdb = <T>(url: string, params: Record<string, unknown> = {}, deps: unknown[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);

    axios
      .get<T>(url, { params: { api_key: API_KEY, ...params } })
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return { data, loading, error };
};
