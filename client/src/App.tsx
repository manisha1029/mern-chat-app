import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import "./app.css"

function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chats" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  )
}

export default App