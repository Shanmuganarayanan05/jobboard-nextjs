"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    role: 'applicant' | 'recruiter';
    name: string;
    password: string;
}

type SafeUser = Omit<User, 'password'>;

interface AuthContextType {
  user: SafeUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
        const response = await fetch('/models/userdata.json');
        if (!response.ok) {
            throw new Error("Could not fetch user data.");
        }
        const users: User[] = await response.json();
        
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...rest } = foundUser;
            const userToStore: SafeUser = rest;
            setUser(userToStore);
            localStorage.setItem('user', JSON.stringify(userToStore));
            localStorage.setItem('id',JSON.stringify(userToStore?.id))
        } else {
            throw new Error("Invalid email or password.");
        }

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      localStorage.removeItem('jobData');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
