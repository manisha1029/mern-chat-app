import { useEffect, useState } from "react";

import { getChats } from "../services/chats/chats";
import { isArrayEmpty } from "../utility";

function Chat() {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

   async function loadChats(){
    try {
        setLoading(true);
        const response = await getChats();
        setChats(response);
    } catch (error:any) {
       setError(error?.message || "Failed to fetch chats");
    } finally {
        setLoading(false);
    }
  }

    useEffect(()=>{
    loadChats();
    }, [])
    

  if (loading) return <p>Loading chats...</p>;
  return (
    <ul>
        {isArrayEmpty(chats) ? 
        <p>No chats found</p>
        : (chats.map((chat:any)=><li key={chat._id}>{chat?.chatName}</li>))}
    </ul>
  )
}

export default Chat;
