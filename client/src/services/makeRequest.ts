import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export async function get(url: string) {
    try {
        const response = await api.get(url);
        console.log('response from get', response?.data);
        return response?.data;

    } catch (error: unknown) {
        console.error('Error in GET request:', error);
        throw error;
    }
}

export async function post(url: string, data: object) {
    try {
        const response = await api.post(url, data);
        console.log('response from post', response?.data);
        return response?.data;

    } catch (err) {
        const error = err as AxiosError<any>;
        console.error('Error in POST request:', error);
        throw error.response?.data?.message || "Something went wrong";
    }
}

export async function getWithAuth(url: string, token: string) {
    try {
        const response = await api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('response from getWithAuth', response?.data);
        return response?.data;

    } catch (error: unknown) {
        console.error('Error in GET with Auth request:', error);
        throw error;
    }
}

export async function postWithAuth(url: string, data: object, token: string) {
    try {
        const response = await api.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('response from postWithAuth', response?.data);
        return response?.data;

    } catch (err) {
        const error = err as AxiosError<any>;
        console.error('Error in POST with Auth request:', error);
        throw error.response?.data?.message || "Something went wrong";
    }
}