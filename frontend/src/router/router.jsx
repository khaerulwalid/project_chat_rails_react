import { createBrowserRouter } from "react-router-dom";
import NickName from "../pages/NickName";
import Chat from "../pages/Chat";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NickName />
    },
    {
        path: '/chat',
        element: <Chat />
    }
])