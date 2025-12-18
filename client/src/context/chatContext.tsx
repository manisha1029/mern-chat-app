import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";


interface ChatContextType {
    user: { id: string; name: string; email: string; token: string, pic:string } | null;
    setUser: (user: ChatContextType['user']) => void;
}

interface ChatProviderProps {
    children: ReactNode;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ChatProviderProps) => {
    // Variables.
    const navigate = useNavigate();

    // States.
    const [user, setUser] = useState<ChatContextType['user']>(null);
    console.log("ChatProvider user:", user);

    useEffect(() => {
        const storedUserStr = localStorage.getItem("userInfo");

        if (storedUserStr) {
            const storedUser = JSON.parse(storedUserStr);
            setUser(storedUser);
        } else {
            navigate('/');
        }
    }, []);

    const value = {
        user,
        setUser,
    };
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}

