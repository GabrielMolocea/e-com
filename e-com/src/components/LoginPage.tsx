import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/auth/authSlice";
import { selectAuthToken } from "../redux/selector";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken) || "";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">Login</h1>
                <p className="mb-6 text-gray-500 text-center">Enter your credentials to log in.</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                />
                <button
                    onClick={() => dispatch(login({ username, password }) as any)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-base"
                >
                    Login
                </button>
                {authToken && (
                    <div className="mt-4 text-green-600 font-medium text-center">Logged in!</div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;