import { useCallback, useState } from "react";
import { RequestConfigType } from "../types/types";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const sendRequest = useCallback(async (
        requestConfig: RequestConfigType,
        applyData: (tasksObj: any) => void
    ) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Something went wrong!');
            }
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    };
};

export default useHttp;