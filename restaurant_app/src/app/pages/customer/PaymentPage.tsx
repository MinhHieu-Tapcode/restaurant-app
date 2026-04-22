import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { submittedOrders, tableName } = useApp();
  const [method, setMethod] = useState<'cash' | 'transfer'>('cash');
  const [paid, setPaid] = useState(false);

  const grandTotal = submittedOrders.reduce((s, o) => s + o.total, 0);

  const handlePay = () => setPaid(true);

  if (paid) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#1A1A2E', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
        <div style={{ background: '#22C55E', borderRadius: 9999, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={44} color="#fff" />
        </div>
        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 700, color: '#fff', textAlign: 'center' }}>Cảm ơn bạn! 🙏</div>
        <div style={{ fontSize: 15, color: '#94A3B8', textAlign: 'center' }}>Thanh toán thành công. Hẹn gặp lại lần sau!</div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Tổng đã thanh toán</div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 700, color: '#E94560' }}>{formatPrice(grandTotal)}</div>
        </div>
        <button onClick={() => navigate('/')} style={{ background: '#E94560', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora, sans-serif', marginTop: 8 }}>
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/customer/status')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>Thanh toán</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>{tableName}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Bill per order */}
        {submittedOrders.map((order, oIdx) => (
          <div key={order.id} style={{ background: '#fff', borderRadius: 14, marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Đơn lần {oIdx + 1}</span>
                <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9CA3AF' }}>{order.id}</span>
              </div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#E94560' }}>{formatPrice(order.total)}</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px' }}>
                  <span style={{ fontSize: 13, color: '#374151' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
                {idx < order.items.length - 1 && <div style={{ height: 1, background: '#F9FAFB', margin: '0 16px' }} />}
              </div>
            ))}
          </div>
        ))}

        {/* Payment Method */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Phương thức thanh toán</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { key: 'cash', icon: <Banknote size={20} />, label: 'Tiền mặt' },
              { key: 'transfer', icon: <Smartphone size={20} />, label: 'Chuyển khoản' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setMethod(m.key as any)}
                style={{
                  flex: 1, padding: '14px 12px', border: `2px solid ${method === m.key ? '#1A1A2E' : '#E5E7EB'}`,
                  background: method === m.key ? '#1A1A2E' : '#fff',
                  borderRadius: 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  color: method === m.key ? '#fff' : '#374151', transition: 'all 0.2s',
                }}
              >
                {m.icon}
                <span style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div style={{ background: '#1A1A2E', borderRadius: 14, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: '#94A3B8', fontSize: 14 }}>Tổng {submittedOrders.reduce((s, o) => s + o.items.length, 0)} món</span>
            <span style={{ color: '#fff', fontSize: 14 }}>{formatPrice(grandTotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94A3B8', fontSize: 15, fontWeight: 600 }}>TỔNG CỘNG</span>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 30, fontWeight: 700, color: '#E94560' }}>{formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #E5E7EB', padding: 16 }}>
        <button onClick={handlePay} style={{
          width: '100%', background: '#E94560', color: '#fff', border: 'none',
          borderRadius: 12, padding: '15px', fontSize: 16, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Sora, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <CheckCircle size={18} /> Xác nhận đã thanh toán
        </button>
      </div>
    </div>
  );
}
