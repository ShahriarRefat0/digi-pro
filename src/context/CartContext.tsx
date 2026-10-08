"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface AddToCartProductInput {
  id: string;
  name?: string;
  title?: string;
  slug?: string;
  thumbnail?: string;
  coverImage?: string;
  price: number | string;
  category?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  totalQuantity: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  addToCart: (
    product: AddToCartProductInput,
    quantity?: number,
    options?: { openDrawer?: boolean }
  ) => void;
  buyNow: (product: AddToCartProductInput, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const LOCAL_STORAGE_KEY = "careproff_shopping_cart";

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Hydrate cart from localStorage on client mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  React.useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (err) {
        console.error("Failed to persist cart to localStorage:", err);
      }
    }
  }, [cartItems, isHydrated]);

  const parseNumPrice = (priceInput: number | string): number => {
    if (typeof priceInput === "number") return priceInput;
    const clean = priceInput.toString().replace(/[^\d.]/g, "");
    return Number(clean) || 0;
  };

  const addToCart = React.useCallback(
    (
      product: AddToCartProductInput,
      quantityToAdd: number = 1,
      options: { openDrawer?: boolean } = {}
    ) => {
      const pId = product.id;
      const pName = product.name || product.title || "Care Product";
      const pSlug = product.slug || product.id;
      const pThumb = product.thumbnail || product.coverImage || "/images/placeholder.webp";
      const pPrice = parseNumPrice(product.price);
      const validQty = Math.max(1, quantityToAdd);

      setCartItems((prevItems) => {
        const existingIdx = prevItems.findIndex((item) => item.productId === pId);
        if (existingIdx > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIdx].quantity + validQty;
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: newQty,
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              productId: pId,
              name: pName,
              slug: pSlug,
              thumbnail: pThumb,
              price: pPrice,
              quantity: validQty,
              category: product.category || "Careproff",
            },
          ];
        }
      });

      toast.success(`${pName} added to cart!`);

      if (options.openDrawer) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const buyNow = React.useCallback(
    (product: AddToCartProductInput, quantity: number = 1) => {
      addToCart(product, quantity, { openDrawer: false });
      router.push("/checkout");
    },
    [addToCart, router]
  );

  const updateQuantity = React.useCallback((productId: string, newQuantity: number) => {
    const validQty = Math.max(1, newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: validQty } : item
      )
    );
  }, []);

  const removeFromCart = React.useCallback((productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.productId === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter((item) => item.productId !== productId);
    });
  }, []);

  const clearCart = React.useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear localStorage cart:", err);
    }
  }, []);

  const totalQuantity = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        subtotal,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        buyNow,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
