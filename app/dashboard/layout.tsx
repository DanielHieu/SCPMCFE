"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Calendar,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AuthorizedLayoutProps {
  children: ReactNode;
}

export default function AuthorizedLayout({ children }: AuthorizedLayoutProps) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if window is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menu-button");
      if (
        isMobile &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const menuItems = [
    {
      name: 'Tổng quan',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Lịch làm việc',
      href: '/dashboard/schedule',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      name: 'Công việc',
      href: '/dashboard/tasks',
      icon: <CheckSquare className="w-5 h-5" />
    },
    {
      name: 'Đổi mật khẩu',
      href: '/dashboard/change-password',
      icon: <User className="w-5 h-5" />
    }
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  const isActive = (path: string) => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      return pathname === path || pathname.startsWith(`${path}/`);
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu toggle button */}
      <button
        id="menu-button"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md text-slate-700 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for navigation */}
      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r border-gray-200 
          w-64 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo and branding */}
        <div className="px-5 py-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold mr-2">SP</div>
            <span className="text-xl font-bold text-slate-800">SmartParking</span>
          </Link>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm font-semibold text-slate-800 truncate">{session?.user?.name || 'User'}</h3>
              <p className="text-xs text-slate-500 truncate">{session?.user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="px-5 py-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${isActive(item.href)
                    ? 'bg-emerald-50 text-emerald-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <span className={`${isActive(item.href) ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout at bottom */}
        <div className="px-5 py-4 border-t border-gray-200 mt-auto">
          <Link
            href="/auth/signout"
            className="flex items-center px-4 py-2.5 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Đăng xuất</span>
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
