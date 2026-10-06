import React from 'react'

export default function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-5">
      <div className="flex items-center gap-2.5 mb-1">
        <Icon className="w-5 h-5" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <p className="text-sm text-green-50">{subtitle}</p>
    </div>
  )
}