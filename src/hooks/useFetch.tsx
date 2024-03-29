import { useEffect, useState } from 'react';

const useFetch = (endpoint: string) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const url = process.env.REACT_APP_API + endpoint;
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(url);
        const { data } = await response.json();
        setData(data);
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      setError(error as Error);
    }
  }, [url]);

  // refetch data
  const reFetch = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
