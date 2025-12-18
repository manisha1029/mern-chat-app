import {post} from '../makeRequest';

export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
    avatar?: File | null;
}) => {
    return await post('/auth/register', userData);
}

export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    return await post('/auth/login', credentials);
}