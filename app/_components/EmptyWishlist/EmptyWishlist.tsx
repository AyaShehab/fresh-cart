import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function EmptyWishlist() {
  return (
    <main className="bg-slate-50/60 min-h-[calc(100vh-8rem)]">
      <section className="max-w-xl mx-auto px-4 pt-20 pb-24 flex flex-col items-center text-center">
        {/* Icon box */}
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
          <Heart className="w-8 h-8 text-gray-400" strokeWidth={1.75} />
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h1>
        <p className="text-sm text-gray-500 mb-6">
          Browse products and save your favorites here.
        </p>

        <Link
          href="/products"
          className="w-full max-w-sm inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-lg transition"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}