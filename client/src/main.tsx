import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { ChatProvider } from './context/chatContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />Ï
      </ChakraProvider>
    </ChatProvider>,
  </BrowserRouter>
)
