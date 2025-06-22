"use client";
import React from 'react';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
export default function JobBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">{children}</main>
        </div>
      </div>
  );
}
