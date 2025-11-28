"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { Book } from "@/lib/data";

interface WishlistContextType {
  wishlistItems: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: number) => void;
  isInWishlist: (bookId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Book[]>([]);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("bookBrewWishlist");
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookBrewWishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((book: Book) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((item) => item.id === book.id)) {
        return [...prevItems, book];
      }
      return prevItems;
    });
  }, []);

  const removeFromWishlist = useCallback((bookId: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  }, []);

  const isInWishlist = useCallback((bookId: number) => {
    return wishlistItems.some((item) => item.id === bookId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
