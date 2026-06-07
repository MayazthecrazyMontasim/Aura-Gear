"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  key: string; // slug + version + jerseyType + size
  slug: string;
  country: string;
  name: string;
  edition: "Player" | "Fan";
  jerseyType: "Home" | "Away";
  size: string;
  price: number;
  image: string;
  qty: number;
};

export type ShippingZone = "inside" | "outside";

export const SHIPPING: Record<ShippingZone, { label: string; cost: number }> = {
  inside: { label: "Inside Dhaka", cost: 80 },
  outside: { label: "Outside Dhaka", cost: 160 },
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  zone: ShippingZone;
  shipping: number;
  total: number;
  setZone: (z: ShippingZone) => void;
  addItem: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "aura-gear-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [zone, setZone] = useState<ShippingZone>("inside");
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.zone === "inside" || parsed.zone === "outside")
          setZone(parsed.zone);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, zone }));
  }, [items, zone, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    const key = `${item.slug}-${item.edition}-${item.jerseyType}-${item.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { ...item, key, qty }];
    });
  };

  const setQty: CartContextValue["setQty"] = (key, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const removeItem: CartContextValue["removeItem"] = (key) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const shipping = items.length ? SHIPPING[zone].cost : 0;
    return {
      items,
      count,
      subtotal,
      zone,
      shipping,
      total: subtotal + shipping,
      setZone,
      addItem,
      setQty,
      removeItem,
      clear,
    };
  }, [items, zone]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
