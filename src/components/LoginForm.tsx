"use client"
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
    const { login, loading} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 p-6 xs:w-full">
            <h2 className="text-3xl text-center font-bold mb-4">Welcome Octopus!</h2>
            <div className="mb-4">
                <label className="block font-semibold text-gray-700">E-mail address* (emilys)</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2 p-2 w-full border rounded focus:outline-none focus:border-green-500"
                    placeholder="Enter your username"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold text-gray-700">Password* (emilyspass)</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 w-full border rounded focus:outline-none focus:border-green-500"
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`${loading ? "bg-gray-500" : "bg-green-600"} w-full py-2  text-white rounded `}
            >
                {loading ? "Please Wait..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;
