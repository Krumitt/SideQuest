import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { isDarkMode, toggleDark } = useTheme();
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const username = e.target.elements[0].value;
        const password = e.target.elements[1].value;

        try {
            if (isLogin) {
                await signIn(username, password);
            } else {
                await signUp(username, password);
            }
            navigate('/'); // Go home upon success
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Absolute Toggle Button */}
            <button 
                onClick={toggleDark}
                className="fixed top-4 right-4 z-50 cursor-pointer p-2 rounded-full bg-white/50 hover:bg-white/80 dark:bg-gray-800 dark:hover:bg-gray-700 transition shadow-sm"
            >
                {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>

            {/* Card Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-8 relative">
                <Link to="/" className="absolute top-4 left-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Home
                </Link>

                <div className="flex flex-col items-center mb-8 mt-6">
                    <svg viewBox="0 0 200 200" className="h-14 w-14 mb-3 text-gray-900 dark:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 90 L70 40 L95 65 L115 50 L160 90 L140 85 L115 70 L95 85 L70 60 Z" fill="currentColor" />
                        <path d="M20 110 L70 160 L95 135 L115 150 L160 110 L140 115 L115 130 L95 115 L70 140 Z" fill="currentColor" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{isLogin ? "Welcome Back" : "Create Account"}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {isLogin ? "Sign in to continue your adventure" : "Join us for your next adventure"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                            {errorMsg}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {isLogin ? "Username" : "Choose a Username"}
                        </label>
                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors" placeholder={isLogin ? "Enter your username" : "Choose a username"} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {isLogin ? "Password" : "Create Password"}
                        </label>
                        <input type="password" required minLength="6" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors" placeholder={isLogin ? "Enter your password" : "Create a password"} />
                    </div>

                    <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition mt-4">
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>

                    <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button type="button" onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} className="text-black dark:text-white font-semibold hover:underline">
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
