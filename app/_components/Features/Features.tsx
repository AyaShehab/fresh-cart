import React from 'react';
import { Truck, ShieldCheck, RotateCcw, HeadphoneOff, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50',
      title: 'Free Shipping',
      description: 'On orders over 500 EGP',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-50',
      title: 'Easy Returns',
      description: '14-day return policy',
    },
    {
      icon: <Headphones className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50',
      title: '24/7 Support',
      description: 'Dedicated support team',
    },
  ];

  return (
    <section className="w-full bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4 transition-all hover:shadow-md"
            >
              {/* Ikon med farvet baggrund */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}
              >
                {item.icon}
              </div>

              {/* Tekstindhold */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}