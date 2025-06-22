"use client"

import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, BriefcaseBusiness, ChevronDown, ChevronUp, LogOut, Menu, MenuIcon, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface UserProps {
  name: string;
  role: string;
}

export default function Header() {
    const {logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<UserProps>({
        name: 'Guest',
        role: 'Visitor'
    });
    
    const handleLogout = async () => {
        try{
            await logout();
            window.location.href = '/login';
        }
        catch(err: any){
            console.log(err);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
        };

        if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);


    return (
        <header className="w-full h-[60px] border-b border-gray-100 shadow-md z-50 bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-5">
                        <div
                        className="flex items-center gap-2 text-indigo-800"
                        >
                            <BriefcaseBusiness className=""/>
                            <p className="text-lg font-bold ">Job Nest</p>
                        </div>
                        {user?.role === "recruiter" && <p className="text-pink-700 font-bold px-3 py-1 rounded-md bg-pink-100">Recruiter view</p>}
                    </div>
                    <div className="flex space-x-8 cursor-pointer">
                        {/* <Menu onClick={() => setIsMenuOpen(prev => !prev)}/> */}
                        <div className="flex items-center gap-2" onClick={() => setIsMenuOpen(prev => !prev)}>
                            <div className="bg-indigo-800 h-6 w-6 flex items-center justify-center rounded-full">
                                <p className="text-sm font-medium text-white">{user?.name.slice(0,1)}</p>
                            </div>
                            <div >
                                <p className="font-medium text-gray-600 selction-none flex gap-2 items-center">
                                    {user?.name || "Guest"}
                                    {isMenuOpen ?  <ChevronUp className="h-5 w-5"/> : <ChevronDown className="h-5 w-5"/>}
                                </p>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen &&
                        <div ref={menuRef} className="fixed min-w-[120px] top-14 right-8 shadow-md z-10 bg-white rounded-md p-1">
                            <p className="text-indigo-800 flex items-center hover:bg-indigo-800/40 p-2 rounded-md cursor-pointer">
                                <Settings className="h-4 w-4 mr-3"/>
                                Settings
                            </p>
                            <p className="text-red-500 flex items-center hover:bg-red-100 p-1.5 rounded-md cursor-pointer" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-3"/>
                                Logout
                            </p>
                        </div>
                    }
                </div>
            </div>
        </header>
    );
}
