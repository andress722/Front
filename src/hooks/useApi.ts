import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
  data: any; // ajuste o tipo de acordo com a resposta da API
  error: Error | null;
  loading: boolean;
}

const useApi = (url: string): ApiResponse => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useApi;
