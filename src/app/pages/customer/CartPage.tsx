import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, orderNote, setOrderNote, totalItems, totalPrice, tableName } = useApp();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/customer')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>Giỏ hàng</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>{tableName} · {totalItems} món</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: 16, paddingBottom: 100 }}>
        {cart.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
            <div style={{ fontSize: 60 }}>🛒</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937' }}>Giỏ hàng trống</div>
            <div style={{ fontSize: 14, color: '#6B7280' }}>Hãy chọn thêm món ăn bạn muốn</div>
            <button onClick={() => navigate('/customer')} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
              Chọn món ngay
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              {cart.map((item, idx) => (
                <div key={item.menuItemId}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14 }}>
                    <img src={item.image} alt={item.name} style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600, color: '#1F2937', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#E94560' }}>{formatPrice(item.price)}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <button onClick={() => removeFromCart(item.menuItemId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', padding: 2 }}>
                        <Trash2 size={16} />
                      </button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button onClick={() => updateQty(item.menuItemId, -1)} style={{ background: 'none', border: '2px solid #E5E7EB', borderRadius: 9999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Minus size={13} color="#1A1A2E" />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E', minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.menuItemId, 1)} style={{ background: '#1A1A2E', border: 'none', borderRadius: 9999, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Plus size={13} color="#fff" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginRight: 14, marginLeft: 14, display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 12, color: '#6B7280', paddingBottom: 12 }}>
                      Tổng: <strong style={{ color: '#1F2937' }}>{formatPrice(item.price * item.quantity)}</strong>
                    </span>
                  </div>
                  {idx < cart.length - 1 && <div style={{ height: 1, background: '#F3F4F6', margin: '0 14px' }} />}
                </div>
              ))}
            </div>

            {/* Note */}
            <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <label style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#1F2937', display: 'block', marginBottom: 8 }}>
                📝 Ghi chú cho đơn hàng
              </label>
              <textarea
                value={orderNote}
                onChange={e => setOrderNote(e.target.value)}
                placeholder="Ví dụ: ít cay, không hành, dị ứng lạc..."
                style={{ width: '100%', height: 80, border: '1.5px solid #E5E7EB', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#374151', resize: 'none', fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Continue shopping */}
            <button onClick={() => navigate('/customer')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
              ← Tiếp tục chọn món
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430, background: '#fff',
          borderTop: '1px solid #E5E7EB', padding: '16px',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: '#6B7280' }}>Tổng ({totalItems} món)</span>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#E94560' }}>{formatPrice(totalPrice)}</span>
          </div>
          <button onClick={() => navigate('/customer/confirm')} style={{
            width: '100%', background: '#1A1A2E', color: '#fff', border: 'none',
            borderRadius: 12, padding: '15px', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Sora, sans-serif',
          }}>
            Xác nhận đặt món →
          </button>
        </div>
      )}
    </div>
  );
}
