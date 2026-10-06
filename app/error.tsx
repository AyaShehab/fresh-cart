"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-12 text-center font-sans">
      {/* Icon Container */}
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <AlertCircle className="w-8 h-8" />
      </div>

      {/* Error Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong!
      </h2>
      <p className="text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
        We encountered an error while loading this page. Please try again or head back home.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Retry Button */}
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}