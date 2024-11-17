import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ws = new WebSocket("ws://localhost:3000/cable");

function Chat() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [guid, setGuid] = useState("");
    const messagesContainer = document.getElementById("messages");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");

        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate("/");
        }

        ws.onopen = () => {
            console.log("Connected to websocket server");
            setGuid(Math.random().toString(36).substring(2, 15));

            ws.send(
                JSON.stringify({
                    command: "subscribe",
                    identifier: JSON.stringify({
                        id: guid,
                        channel: "MessagesChannel",
                    })
                })
            )
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.type === "ping") return;
            if (data.type === "welcome") return;
            if (data.type === "confirm_subscription") return;

            const message = data.message;
            setMessagesAndScrolDown([...messages, message]);
        }

        fetchMessages();
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = e.target.message.value;
        e.target.message.value = "";

        await fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body, username }),
        });
    };

    const fetchMessages = async () => {
        const response = await fetch("http://localhost:3000/messages");
        const data = await response.json();
        setMessagesAndScrolDown(data);
    }

    const setMessagesAndScrolDown = (data) => {
        setMessages(data);
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    return (
        <div className="flex w-[100%] md:w-[50%] mx-auto flex-col h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">

            <header className="flex items-center justify-between p-4 bg-blue-500 text-white shadow-md">
                <h1 className="text-lg font-bold">Chat Application</h1>
                <p>Welcome, {username}!</p>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                    <div
                        className={`p-3 bg-white shadow-md rounded-lg border border-blue-200 w-[80%] ${localStorage.getItem("username") === message?.username ? 'ml-auto' : ''}`}
                        key={index}
                    >
                        <strong className="text-blue-700">{message?.username}:</strong>{" "}
                        <span>{message.body}</span>
                    </div>
                ))}
            </div>

            <form
                className="sticky bottom-0 bg-white p-4 shadow-md border-t border-blue-200"
                onSubmit={handleSubmit}
            >
                <div className="flex gap-2">
                    <input
                        className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        type="text"
                        name="message"
                        placeholder="Type your message"
                        required
                    />
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Chat
