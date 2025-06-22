"use client";
import React, { useState, createContext, useContext } from 'react';
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
      >
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
