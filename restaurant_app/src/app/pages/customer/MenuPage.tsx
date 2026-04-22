import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
import { MENU_ITEMS, Category, formatPrice } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const CATEGORIES: Category[] = ['Tất cả', 'Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống'];

export default function MenuPage() {
  const navigate = useNavigate();
  const { cart, addToCart, updateQty, totalItems, totalPrice, tableName } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>('Tất cả');

  const filtered = activeCategory === 'Tất cả' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.category === activeCategory);

  const getQty = (itemId: string) => cart.find(c => c.menuItemId === itemId)?.quantity ?? 0;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', position: 'relative', paddingBottom: totalItems > 0 ? 90 : 0 }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
              <ArrowLeft size={18} />
            </button>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>🍜 Nhà hàng Phố Việt</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                <span style={{ background: '#E94560', borderRadius: 9999, padding: '1px 8px', color: '#fff', fontSize: 11 }}>{tableName}</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/customer/cart')} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', padding: 4 }}>
            <ShoppingCart size={24} color="#fff" />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, background: '#E94560', color: '#fff', borderRadius: 9999, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#E94560' : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat ? '#fff' : '#94A3B8',
                border: 'none',
                borderRadius: 9999,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(item => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} style={{
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                opacity: item.isAvailable ? 1 : 0.6,
                position: 'relative',
              }}>
                <div style={{ position: 'relative', height: 130 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {!item.isAvailable && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ background: '#EF4444', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>Hết hàng</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 8, left: 8 }}>
                    <span style={{ background: 'rgba(255,255,255,0.9)', color: '#6B7280', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600, color: '#1F2937', marginBottom: 4, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10, lineHeight: 1.4, minHeight: 32 }}>{item.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#E94560' }}>{formatPrice(item.price)}</span>
                    {item.isAvailable ? (
                      qty === 0 ? (
                        <button
                          onClick={() => addToCart(item.id)}
                          style={{ background: '#1A1A2E', border: 'none', borderRadius: 9999, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <Plus size={18} color="#fff" />
                        </button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: '2px solid #1A1A2E', borderRadius: 9999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Minus size={14} color="#1A1A2E" />
                          </button>
                          <span style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E', minWidth: 16, textAlign: 'center' }}>{qty}</span>
                          <button onClick={() => addToCart(item.id)} style={{ background: '#1A1A2E', border: 'none', borderRadius: 9999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Plus size={14} color="#fff" />
                          </button>
                        </div>
                      )
                    ) : (
                      <button disabled style={{ background: '#E5E7EB', border: 'none', borderRadius: 9999, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'not-allowed' }}>
                        <Plus size={18} color="#9CA3AF" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 398,
          background: '#1A1A2E',
          borderRadius: 14,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          zIndex: 200,
          cursor: 'pointer',
        }} onClick={() => navigate('/customer/cart')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#E94560', borderRadius: 9999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{totalItems}</span>
            </div>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{totalItems} món trong giỏ</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#E94560' }}>{formatPrice(totalPrice)}</span>
            <span style={{ color: '#94A3B8', fontSize: 13 }}>Xem giỏ →</span>
          </div>
        </div>
      )}
    </div>
  );
}