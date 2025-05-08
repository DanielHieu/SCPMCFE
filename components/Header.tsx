'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import UserDropdown from './UserDropDown';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/signout' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold mr-2">SP</div>
          <span className="text-2xl font-bold text-slate-800">SmartParking</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-slate-700 hover:text-emerald-500 font-medium transition"
          >
            Tính năng
          </Link>
          <Link
            href="#how-it-works"
            className="text-slate-700 hover:text-emerald-500 font-medium transition"
          >
            Cách hoạt động
          </Link>
          <Link
            href="#download"
            className="text-slate-700 hover:text-emerald-500 font-medium transition"
          >
            Tải ứng dụng
          </Link>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/signin"
                className="text-slate-700 hover:text-emerald-500 font-medium transition"
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg mt-2 border-t border-gray-100">
          <div className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-slate-700 hover:text-emerald-500 font-medium transition p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tính năng
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-700 hover:text-emerald-500 font-medium transition p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cách hoạt động
            </Link>
            <Link
              href="#download"
              className="text-slate-700 hover:text-emerald-500 font-medium transition p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tải ứng dụng
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-200 my-1 pt-2">
                  <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm shadow">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-slate-700 font-medium">{session?.user?.name || 'User'}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-slate-700 hover:text-emerald-500 font-medium transition p-2 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left mt-2 text-red-600 hover:text-red-700 font-medium transition p-2 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-slate-700 hover:text-emerald-500 font-medium transition p-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 