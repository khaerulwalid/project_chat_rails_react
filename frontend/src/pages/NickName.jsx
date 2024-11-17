import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NickName() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.username = username;
        navigate("/chat");
    }

    return (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-sm sm:w-full"
            >
                <div className="form-group mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nickname
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        id="username"
                        name="username"
                        placeholder="Enter Nickname"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}