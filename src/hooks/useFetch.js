import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar os dados.`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error, setData };
}