import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 font-sans bg-white text-slate-900">
      <div className="max-w-md w-full text-center py-12">
        
        {/* 404 Illustration / Icon */}
        <div className="relative mb-6 inline-block">
          <div className="text-9xl font-black text-slate-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
              <ShoppingBag className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            href="/products"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-6 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </div>

      </div>
    </div>
  );
}