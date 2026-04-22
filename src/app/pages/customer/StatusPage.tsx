import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, RefreshCw, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice, OrderStatus } from '../../data/mockData';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: '#92400E', bg: '#FEF3C7' },
  confirmed: { label: 'Đang làm', color: '#1E40AF', bg: '#DBEAFE' },
  ready: { label: 'Sẵn sàng', color: '#166534', bg: '#DCFCE7' },
  served: { label: 'Đã phục vụ', color: '#6B7280', bg: '#F3F4F6' },
  cancelled: { label: 'Đã hủy', color: '#991B1B', bg: '#FEE2E2' },
};

export default function StatusPage() {
  const navigate = useNavigate();
  const { submittedOrders, tableName } = useApp();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const allItems = submittedOrders.flatMap(o => o.items);
  const servedCount = allItems.filter(i => i.status === 'served').length;
  const totalCount = allItems.length;
  const progressPct = totalCount > 0 ? Math.round((servedCount / totalCount) * 100) : 0;
  const allServed = totalCount > 0 && servedCount === totalCount;

  const toggleExpand = (orderId: string) => {
    setExpandedOrders(prev => {
      const next = new Set(prev);
      next.has(orderId) ? next.delete(orderId) : next.add(orderId);
      return next;
    });
  };

  if (submittedOrders.length === 0) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
        <div style={{ fontSize: 60 }}>📭</div>
        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937' }}>Chưa có đơn hàng</div>
        <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>Hãy đặt món để theo dõi trạng thái tại đây</div>
        <button onClick={() => navigate('/customer')} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', fontWeight: 600 }}>
          Đặt món ngay
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>Trạng thái đơn</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{tableName}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', fontSize: 12 }}>
              <RefreshCw size={12} />
              <span>Cập nhật {lastUpdated}s trước</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Progress */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          {allServed ? (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#22C55E' }}>Tất cả món đã sẵn sàng!</div>
            </div>
          ) : (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>Tiến độ đơn hàng</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#E94560' }}>{servedCount}/{totalCount} món</span>
              </div>
              <div style={{ background: '#E5E7EB', borderRadius: 9999, height: 8, overflow: 'hidden' }}>
                <div style={{ background: '#22C55E', height: '100%', width: `${progressPct}%`, borderRadius: 9999, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['pending', 'confirmed', 'ready', 'served'] as OrderStatus[]).map(s => {
              const count = allItems.filter(i => i.status === s).length;
              const cfg = STATUS_CONFIG[s];
              return count > 0 ? (
                <span key={s} style={{ background: cfg.bg, color: cfg.color, borderRadius: 9999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                  {count} {cfg.label}
                </span>
              ) : null;
            })}
          </div>
        </div>

        {/* Orders */}
        {submittedOrders.map((order, oIdx) => {
          const isExpanded = expandedOrders.has(order.id);
          return (
            <div key={order.id} style={{ background: '#fff', borderRadius: 14, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <button onClick={() => toggleExpand(order.id)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#1F2937' }}>
                    Đơn {oIdx + 1} — <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#6B7280' }}>{order.id}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                    {order.items.length} món · {formatPrice(order.total)}
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
              </button>
              {isExpanded && (
                <div style={{ borderTop: '1px solid #F3F4F6' }}>
                  {order.items.map((item, idx) => {
                    const cfg = STATUS_CONFIG[item.status];
                    return (
                      <div key={item.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                          <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{item.name} × {item.quantity}</div>
                            <div style={{ fontSize: 12, color: '#9CA3AF' }}>{formatPrice(item.price * item.quantity)}</div>
                          </div>
                          <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 9999, padding: '4px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {cfg.label}
                          </span>
                        </div>
                        {idx < order.items.length - 1 && <div style={{ height: 1, background: '#F9FAFB', margin: '0 16px' }} />}
                      </div>
                    );
                  })}
                  {order.note && (
                    <div style={{ padding: '10px 16px', background: '#F9FAFB', borderTop: '1px solid #F3F4F6' }}>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>📝 {order.note}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #E5E7EB', padding: 16, display: 'flex', gap: 10 }}>
        <button onClick={() => navigate('/customer')} style={{ flex: 1, background: 'none', border: '2px solid #1A1A2E', color: '#1A1A2E', borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Plus size={16} /> Gọi thêm món
        </button>
        <button
          onClick={() => navigate('/customer/payment')}
          disabled={!allServed}
          style={{ flex: 1.5, background: allServed ? '#E94560' : '#E5E7EB', border: 'none', color: allServed ? '#fff' : '#9CA3AF', borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 700, cursor: allServed ? 'pointer' : 'not-allowed', fontFamily: 'Sora, sans-serif' }}
        >
          Yêu cầu thanh toán
        </button>
      </div>
    </div>
  );
}
