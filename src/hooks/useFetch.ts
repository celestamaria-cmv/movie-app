import { useEffect, useState } from "react";

function useFetch<T>(fetchFunction: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, deps);

  return { data, loading, error };
}

export default useFetch;