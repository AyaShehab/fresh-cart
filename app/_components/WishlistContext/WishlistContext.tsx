'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/Api/Services/wishlistApi';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: any[];
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  fetchWishlistData: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  // استخراج الـ token بأي شكل موجود به داخل session
  const token = (session as any)?.token || (session as any)?.user?.token || '';

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWishlistData = async () => {
    if (status !== 'authenticated' || !token) return;
    
    setIsLoading(true);
    try {
      const res = await getWishlist(token);
      if (res.status === 'success' && res.data) {
        setWishlistItems(res.data);
        const ids = res.data.map((item: any) => item._id || item.id);
        setWishlistIds(ids);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && token) {
      fetchWishlistData();
    }
  }, [status, token]);

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (status !== 'authenticated' || !token) {
      alert('Please sign in to manage your wishlist');
      return;
    }

    const isExist = isInWishlist(productId);

    // Optimistic Update لتجربة مستخدم سريعة
    if (isExist) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } else {
      setWishlistIds((prev) => [...prev, productId]);
    }

    try {
      if (isExist) {
        await removeFromWishlist(productId, token);
      } else {
        await addToWishlist(productId, token);
      }
      await fetchWishlistData();
    } catch (err) {
      console.error('Failed to update wishlist:', err);
      fetchWishlistData();
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        isLoading,
        isInWishlist,
        toggleWishlist,
        fetchWishlistData,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}