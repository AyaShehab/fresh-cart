'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  UserPlus,
  UserCircle,
  LogOut,
  ChevronDown,
  Phone,
  Mail,
  Headphones,
  Truck,
  Gift,
  Menu,
  X,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { getShopCategories } from '@/Api/Services/categoriesApi';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
}

export default function Navbar() {
  const { data: sessionData, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  // Fetch categories for the Dropdown menu
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getShopCategories();
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* 1. Top Announcement Bar */}
      <div className="hidden lg:block bg-gray-50 text-gray-500 text-xs border-b border-gray-100 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Side: Offers */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          {/* Right Side: Contact & Auth Links */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+18001234567" className="flex items-center gap-1 hover:text-emerald-600 transition">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a href="mailto:support@freshcart.com" className="flex items-center gap-1 hover:text-emerald-600 transition">
                <Mail className="w-3.5 h-3.5" />
                <span>support@freshcart.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              {isLoggedIn ? (
                <>
                  <span className="flex items-center gap-1 text-slate-700">
                    <User className="w-3.5 h-3.5" />
                    <span>{sessionData?.user?.name}</span>
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 hover:text-emerald-600 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-1 hover:text-emerald-600 transition">
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link href="/register" className="flex items-center gap-1 hover:text-emerald-600 transition">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <ShoppingCart className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold text-slate-900 tracking-tight">FreshCart</span>
        </Link>

        {/* Search */}

        <form onSubmit={handleSearch} className="relative flex-1 max-w-md hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-5 pr-12 text-xs text-slate-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>


        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link href="/products" className="hover:text-emerald-600 transition">Shop</Link>

          {/* Categories Dropdown */}
          <div className="relative group py-6">
            <button className="flex items-center gap-1 hover:text-emerald-600 transition outline-none">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link
                href="/categories"
                className="block px-5 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50/60 hover:bg-emerald-50 transition"
              >
                All Categories
              </Link>
              <div className="h-px bg-gray-100 my-1" />

              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-gray-50 transition"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/brands" className="hover:text-emerald-600 transition">Brands</Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {/* Support 24/7 */}
          <Link href={'/contact'}>
            <div className="hidden xl:flex items-center gap-2 border-r border-gray-100 pr-4">
              <Headphones className="w-6 h-6 text-emerald-600" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase font-medium leading-none">Support</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">24/7 Help</span>
              </div>
            </div>
          </Link>

          {isLoggedIn ? (
            <>
              {/* Wishlist */}
              <Link href="/wishlist" className="p-2 text-slate-700 hover:text-emerald-600 transition">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="p-2 text-slate-700 hover:text-emerald-600 transition">
                <ShoppingCart className="w-5 h-5" />
              </Link>

              {/* Account icon */}
              <Link
                href="/profile"
                aria-label="Account"
                className="hidden lg:flex p-2 text-slate-700 hover:text-emerald-600 transition"
              >
                <UserCircle className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Menu Toggler */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition shadow-sm"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile / Tablet Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <ShoppingCart className="w-6 h-6 text-emerald-600" />
                  <span className="text-lg font-bold text-slate-900">FreshCart</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-200 rounded-lg py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-emerald-500"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 bg-emerald-600 text-white rounded-md flex items-center justify-center">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-4 text-slate-700 font-medium text-sm">
                <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-emerald-600 transition">Home</Link>
                <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-emerald-600 transition">Shop</Link>
                <Link href="/categories" onClick={() => setIsOpen(false)} className="hover:text-emerald-600 transition">Categories</Link>
                <Link href="/brands" onClick={() => setIsOpen(false)} className="hover:text-emerald-600 transition">Brands</Link>

                {isLoggedIn && (
                  <>
                    <hr className="my-1 border-gray-100" />

                    <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 hover:text-emerald-600 transition">
                      <Heart className="w-4 h-4 text-emerald-600" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 hover:text-emerald-600 transition">
                      <ShoppingCart className="w-4 h-4 text-emerald-600" />
                      <span>Cart</span>
                    </Link>
                    <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 hover:text-emerald-600 transition">
                      <UserCircle className="w-4 h-4 text-emerald-600" />
                      <span>{sessionData?.user?.name ?? 'Account'}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Auth Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6">
              {isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg text-center transition shadow-sm cursor-cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg text-center transition shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold text-xs rounded-lg text-center transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}