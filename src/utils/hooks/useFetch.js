import { useState } from 'react';

export const useFetch = (handler) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const invoke = async () => {
    try {
      setLoading(true);
      await handler();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return [invoke, loading, error];
};
