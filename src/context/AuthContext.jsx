import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [usersDB, setUsersDB] = useState({});

    // Load DB and Session on mount
    useEffect(() => {
        try {
            const db = localStorage.getItem('usersDB');
            if (db) setUsersDB(JSON.parse(db));

            const session = localStorage.getItem('currentUser');
            if (session) {
                // Verify user exists in db
                const parsedDb = db ? JSON.parse(db) : {};
                if (parsedDb[session]) {
                    setCurrentUser(session);
                } else {
                    localStorage.removeItem('currentUser');
                }
            }
        } catch (error) {
            console.error("Failed to load user data", error);
            // reset gracefully
            setUsersDB({});
        }
    }, []);

    // Sync DB changes to localStorage
    useEffect(() => {
        if (Object.keys(usersDB).length > 0) {
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
        }
    }, [usersDB]);

    const signUp = async (username, password) => {
        const usernameLower = username.toLowerCase();
        if (usersDB[usernameLower]) {
            throw new Error("Username already exists.");
        }

        const hashed = await hashPassword(password);
        
        setUsersDB(prev => ({
            ...prev,
            [usernameLower]: {
                username: usernameLower,
                passwordHash: hashed,
                cart: [],
                orderHistory: []
            }
        }));

        setCurrentUser(usernameLower);
        localStorage.setItem('currentUser', usernameLower);
        return true;
    };

    const signIn = async (username, password) => {
        const usernameLower = username.toLowerCase();
        const user = usersDB[usernameLower];

        if (!user) {
            throw new Error("Invalid username or password.");
        }

        const hashed = await hashPassword(password);
        if (user.passwordHash !== hashed) {
            throw new Error("Invalid username or password.");
        }

        setCurrentUser(usernameLower);
        localStorage.setItem('currentUser', usernameLower);
        return true;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const getUserData = (username) => {
        return usersDB[username] || null;
    };

    const updateUserData = (username, data) => {
        setUsersDB(prev => ({
            ...prev,
            [username]: {
                ...prev[username],
                ...data
            }
        }));
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            signUp, 
            signIn, 
            logout, 
            getUserData, 
            updateUserData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
