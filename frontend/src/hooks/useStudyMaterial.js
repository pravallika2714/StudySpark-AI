import { useState, useCallback, useEffect } from 'react';
import { generateStudyMaterial } from '../services/api';

const SESSION_KEY = 'studyspark_session';

export default function useStudyMaterial() {
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.status || 'idle';
    }
    return 'idle';
  });
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.data || null;
    }
    return null;
  });
  
  const [error, setError] = useState(null);
  
  const [lastInput, setLastInput] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.lastInput || '';
    }
    return '';
  });

  // Save to local storage whenever session state changes
  useEffect(() => {
    // Only save if we are in success or idle state to avoid saving mid-load
    if (status === 'success' || status === 'idle') {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        status,
        data,
        lastInput
      }));
    }
  }, [status, data, lastInput]);

  const generate = useCallback(async (notes) => {
    setLastInput(notes);
    setStatus('loading');
    setError(null);

    try {
      const result = await generateStudyMaterial(notes);
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return {
    status,
    data,
    error,
    lastInput,
    generate,
    reset
  };
}
