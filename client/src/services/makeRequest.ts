import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export async function get(url:string){
    try {
        const response = await api.get(url);
        console.log('response from get', response?.data);
        return response?.data;
        
    } catch (error:unknown) {
        console.error('Error in GET request:', error);
        throw error;
    }
}