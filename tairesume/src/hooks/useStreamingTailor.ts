'use client';

import { useState, useCallback, useRef } from 'react';

interface UseStreamingTailorReturn {
  output: string;
  isStreaming: boolean;
  error: string | null;
  startTailor: (body: {
    resume: string;
    jobDescription: string;
    selectedProjects: { name: string; desc: string; skills: string[] }[];
    model: 'standard' | 'advanced';
  }) => Promise<void>;
  reset: () => void;
}

export function useStreamingTailor(): UseStreamingTailorReturn {
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startTailor = useCallback(async (body: {
    resume: string;
    jobDescription: string;
    selectedProjects: { name: string; desc: string; skills: string[] }[];
    model: 'standard' | 'advanced';
  }) => {
    // Abort any existing request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setOutput('');
    setIsStreaming(true);
    setError(null);

    try {
      const response = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setOutput(accumulated);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setOutput('');
    setIsStreaming(false);
    setError(null);
  }, []);

  return { output, isStreaming, error, startTailor, reset };
}
