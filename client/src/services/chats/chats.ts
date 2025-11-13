import { get } from "../makeRequest";

export function getChats(){
    return get('/chats');
}