import { Briefcase, HelpCircle, Inbox, LayoutDashboard, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserProps {
  name: string;
  role: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProps>({
    name: 'Guest',
    role: 'Visitor'
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    }
  }, []);

  const navItems = [
    { href: "/joblisting", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 mr-3" /> },
    ...(user.role === 'recruiter' 
      ? [{ href: "/add-job", label: "Add new job", icon: <Briefcase className="h-5 w-5 mr-3" /> }]
      : [])
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 h-screen overflow-hidden">
      <div className="h-[60px] border-b border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-600 p-4">Job Board</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <ul className="space-y-1.5">
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href}>
                <div
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? `bg-indigo-600/20 text-indigo-800`
                      : 'hover:bg-indigo-800/40 text-indigo-800'
                  } group cursor-pointer`}
                >
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
    </aside>
  );
}
