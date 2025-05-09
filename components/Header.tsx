'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          </div>
        </div>
      )}
    </header>
  );
} 