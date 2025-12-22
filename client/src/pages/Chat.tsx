import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { useChat } from "@/context/chatContext";
import { isArrayEmpty } from "../utility";
import SideBar from "@/components/SideBar/SideBar";
import MyChat from "@/components/Chat/MyChat";
import ChatBox from "@/components/Chat/ChatBox";

function Chat() {
  const { user } = useChat();
  
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

   async function loadChats(){
   
  }

    useEffect(()=>{
    // loadChats();
    }, [])
    

  if (loading) return <p>Loading chats...</p>;
  return (
   <div style={{width:'100%'}}>
    {/* Sidebar */}
    {user && <SideBar/>}
    {/* Chat Area */}
    <Box display="flex" flexDirection="column" alignItems="center" width="75%" height="100vh" padding="10px">
      {user && <MyChat/>}
      {user && <ChatBox/>}
    </Box>
   </div>
  )
}

export default Chat;
