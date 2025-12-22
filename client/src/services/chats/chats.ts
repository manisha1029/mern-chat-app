import { getWithAuth, postWithAuth } from "../makeRequest";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export const searchUsers = async (
  searchQuery: string,
  token: string
): Promise<User[]> => {
  return await getWithAuth<User[]>(`/auth?search=${searchQuery}`, token);
};

export const accessChat = async (userId: string, token: string) => {
    const data = {userId}
  return await postWithAuth("/chat", data, token);
};
