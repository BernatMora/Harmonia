import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Default fetcher for queries
export const defaultQueryFn = async ({ queryKey }: { queryKey: any[] }): Promise<any> => {
  const url = Array.isArray(queryKey) ? queryKey[0] : queryKey;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  
  return response.json();
};

queryClient.setQueryDefaults([], { queryFn: defaultQueryFn });

// Helper for API requests (POST, PATCH, DELETE)
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};