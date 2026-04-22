import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { cart, orderNote, totalItems, totalPrice, tableName, submitOrder } = useApp();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      submitOrder();
      navigate('/customer/status');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 60 }}>📋</div>
        <div style={{ fontSize: 16, color: '#1F2937', fontWeight: 600 }}>Giỏ hàng trống</div>
        <button onClick={() => navigate('/customer')} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', fontWeight: 600 }}>
          Quay lại menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/customer/cart')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>Xác nhận đơn</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Kiểm tra trước khi gửi</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 16, paddingBottom: 110 }}>
        {/* Info Card */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '2px solid #E94560' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Bàn', value: tableName },
              { label: 'Số món', value: `${totalItems} món` },
              { label: 'Thời gian', value: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) },
            ].map(info => (
              <div key={info.label}>
                <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{info.label}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#1F2937' }}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>Đây là bước cuối cùng. Sau khi gửi đơn, bạn không thể chỉnh sửa.</span>
        </div>

        {/* Order Preview */}
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#1F2937' }}>📋 Danh sách món</span>
          </div>
          {cart.map((item, idx) => (
            <div key={item.menuItemId}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>× {item.quantity}</div>
                  </div>
                </div>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#E94560' }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
              {idx < cart.length - 1 && <div style={{ height: 1, background: '#F9FAFB', margin: '0 16px' }} />}
            </div>
          ))}
        </div>

        {/* Note */}
        {orderNote && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>GHI CHÚ</div>
            <div style={{ fontSize: 14, color: '#374151' }}>{orderNote}</div>
          </div>
        )}

        {/* Total */}
        <div style={{ background: '#1A1A2E', borderRadius: 14, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94A3B8', fontSize: 15 }}>Tổng cộng</span>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 700, color: '#E94560' }}>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #E5E7EB', padding: 16 }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', background: loading ? '#9CA3AF' : '#E94560', color: '#fff', border: 'none',
            borderRadius: 12, padding: '15px', fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Sora, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {loading ? (
            <><Loader size={18} className="animate-spin" /> Đang gửi...</>
          ) : (
            <><CheckCircle size={18} /> Gửi đơn</>
          )}
        </button>
      </div>
    </div>
  );
}
