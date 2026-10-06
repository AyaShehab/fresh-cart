import React from 'react'

export default function Loading() {
  return (
   <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      {/* Animated Spinner Ring */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
      </div>
      
      {/* Loading Text */}
      <p className="text-xs font-medium text-gray-400 tracking-wider uppercase animate-pulse">
        Loading...
      </p>
    </div>
  )
}
