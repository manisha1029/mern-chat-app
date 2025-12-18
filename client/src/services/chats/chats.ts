import { getWithAuth } from "../makeRequest";


export const getChats = async (token:string) => {
    return await getWithAuth('/api/chat', token);
}