import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headphones, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Globe, 
  MessageCircle, 
  Send 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full font-sans">
      
      {/* 1. Features Bar (القسم العلوي باللون الأخضر الفاتح) */}
      <div className="bg-[#EAF8F1] py-6 px-4 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#D3F2E3] flex items-center justify-center text-emerald-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Free Shipping</h4>
              <p className="text-xs text-slate-500">On orders over 500 EGP</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#D3F2E3] flex items-center justify-center text-emerald-600 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Easy Returns</h4>
              <p className="text-xs text-slate-500">14-day return policy</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#D3F2E3] flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-500">100% secure checkout</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#D3F2E3] flex items-center justify-center text-emerald-600 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">24/7 Support</h4>
              <p className="text-xs text-slate-500">Contact us anytime</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Body (الفوتر الداكن) */}
      <div className="bg-[#0B132B] text-slate-300 pt-12 pb-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <div className="bg-white px-4 py-2 rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-2xl font-black">🛒 FreshCart</span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400 mb-6">
              FreshCart is your one-stop destination for quality products. 
              From fashion to electronics, we bring you the best brands 
              at competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
             {/* Social Icons */}
<div className="flex items-center gap-2">
  {/* Facebook */}
  <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>

  {/* Twitter / X */}
  <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>

  {/* Youtube */}
  <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>
</div>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
            
            {/* Shop */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Shop</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
                <li><Link href="/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                <li><Link href="/men-fashion" className="hover:text-white transition-colors">Men's Fashion</Link></li>
                <li><Link href="/women-fashion" className="hover:text-white transition-colors">Women's Fashion</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Account</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/profile" className="hover:text-white transition-colors">My Account</Link></li>
                <li><Link href="/orders" className="hover:text-white transition-colors">Order History</Link></li>
                <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Support</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">Legal</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Bar (الحقوق وطرق الدفع) */}
      <div className="bg-[#070D1F] py-4 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><span className="text-slate-500">💳</span> Visa</span>
            <span className="flex items-center gap-1"><span className="text-slate-500">💳</span> Mastercard</span>
            <span className="flex items-center gap-1"><span className="text-slate-500">💳</span> PayPal</span>
          </div>
        </div>
      </div>

    </footer>
  );
}