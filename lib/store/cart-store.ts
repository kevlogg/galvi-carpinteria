import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductImage } from "@/lib/types/database";

export interface CartItem {
  product: Pick<Product, "id" | "title" | "slug" | "price"> & { images?: ProductImage[] };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: CartItem["product"], quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem(product, quantity = 1) {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          let next: CartItem[];
          if (existing) {
            next = state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            next = [...state.items, { product, quantity }];
          }
          return { items: next };
        });
      },
      removeItem(productId) {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },
      updateQuantity(productId, quantity) {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
    { name: "pinotea-cart" }
  )
);
