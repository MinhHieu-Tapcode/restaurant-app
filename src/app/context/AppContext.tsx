import React, { createContext, useContext, useState } from 'react';
import { CartItem, OrderItem, Order, MENU_ITEMS } from '../data/mockData';

interface AppContextType {
  tableId: string;
  tableName: string;
  cart: CartItem[];
  orderNote: string;
  submittedOrders: Order[];
  setOrderNote: (note: string) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQty: (itemId: string, delta: number) => void;
  clearCart: () => void;
  submitOrder: () => void;
  totalItems: number;
  totalPrice: number;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState('');
  const [submittedOrders, setSubmittedOrders] = useState<Order[]>([]);

  const tableId = 't1';
  const tableName = 'Bàn 05';

  const addToCart = (itemId: string) => {
    const menuItem = MENU_ITEMS.find(m => m.id === itemId);
    if (!menuItem || !menuItem.isAvailable) return;
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === itemId);
      if (existing) {
        return prev.map(c => c.menuItemId === itemId ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { menuItemId: itemId, name: menuItem.name, price: menuItem.price, quantity: 1, image: menuItem.image }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(c => c.menuItemId !== itemId));
  };

  const updateQty = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(c => {
        if (c.menuItemId === itemId) {
          const newQty = c.quantity + delta;
          if (newQty <= 0) return null as any;
          return { ...c, quantity: newQty };
        }
        return c;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const submitOrder = () => {
    const orderId = `#ORD-${String(submittedOrders.length + 100).padStart(3, '0')}`;
    const items: OrderItem[] = cart.map((c, i) => ({
      id: `oi-${Date.now()}-${i}`,
      name: c.name,
      quantity: c.quantity,
      price: c.price,
      status: 'pending',
      image: c.image,
    }));
    const order: Order = {
      id: orderId,
      tableId,
      tableName,
      items,
      note: orderNote,
      createdAt: new Date(),
      total: cart.reduce((s, c) => s + c.price * c.quantity, 0),
    };
    setSubmittedOrders(prev => [...prev, order]);
    clearCart();
    setOrderNote('');

    // Simulate status progression
    setTimeout(() => {
      setSubmittedOrders(prev =>
        prev.map(o => o.id === orderId
          ? { ...o, items: o.items.map(it => ({ ...it, status: 'confirmed' as const })) }
          : o
        )
      );
    }, 5000);
    setTimeout(() => {
      setSubmittedOrders(prev =>
        prev.map(o => o.id === orderId
          ? { ...o, items: o.items.map(it => ({ ...it, status: 'ready' as const })) }
          : o
        )
      );
    }, 12000);
    setTimeout(() => {
      setSubmittedOrders(prev =>
        prev.map(o => o.id === orderId
          ? { ...o, items: o.items.map(it => ({ ...it, status: 'served' as const })) }
          : o
        )
      );
    }, 20000);
  };

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  return (
    <AppContext.Provider value={{
      tableId, tableName, cart, orderNote, submittedOrders,
      setOrderNote, addToCart, removeFromCart, updateQty, clearCart, submitOrder,
      totalItems, totalPrice,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
