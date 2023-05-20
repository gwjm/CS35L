import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((body) => {
                setData(body);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error }
}

export default useFetch;