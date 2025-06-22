"use client";
import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setError('');

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        try {
            await login(email, password);
            window.location.href = '/joblisting';
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome to MyJob</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border borde rounded-lg focus:outline-none focus:border-indigo-500 transition-shadow"
              placeholder="e.g., user@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border borde rounded-lg focus:outline-none focus:border-indigo-500 transition-shadow"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
         <div className="text-center mt-4 text-sm text-gray-500">
            <p className="font-semibold">Test Credentials:</p>
            <p>recruiter@example.com</p>
            <p>applicant@example.com</p>
            <p>(Password for both: password123)</p>
        </div>
      </div>
    </div>
  );
}

