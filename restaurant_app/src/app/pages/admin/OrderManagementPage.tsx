import React, { useState } from 'react';
import { Search, X, FileDown } from 'lucide-react';
import { ADMIN_ORDERS, Order, OrderStatus, formatPrice, formatTime } from '../../data/mockData';

const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: '#FEF3C7', text: '#92400E', label: 'Chờ xác nhận' },
  confirmed: { bg: '#DBEAFE', text: '#1E40AF', label: 'Đang làm' },
  ready: { bg: '#DCFCE7', text: '#166534', label: 'Sẵn sàng' },
  served: { bg: '#F3F4F6', text: '#6B7280', label: 'Đã phục vụ' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B', label: 'Đã hủy' },
};

function getOrderStatus(order: Order): OrderStatus {
  const statuses = order.items.map(i => i.status);
  if (statuses.every(s => s === 'served')) return 'served';
  if (statuses.every(s => s === 'cancelled')) return 'cancelled';
  if (statuses.some(s => s === 'ready')) return 'ready';
  if (statuses.some(s => s === 'confirmed')) return 'confirmed';
  return 'pending';
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>(ADMIN_ORDERS);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dateFilter] = useState(new Date().toISOString().split('T')[0]);

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.tableName.toLowerCase().includes(search.toLowerCase())
  );

  const cancelItem = (orderId: string, itemId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      items: o.items.map(i => i.id === itemId ? { ...i, status: 'cancelled' as OrderStatus } : i),
    } : o));
    setSelectedOrder(prev => prev?.id === orderId ? {
      ...prev,
      items: prev.items.map(i => i.id === itemId ? { ...i, status: 'cancelled' as OrderStatus } : i),
    } : prev);
  };

  const totalRevenue = filtered.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ padding: '28px 32px', display: 'flex', gap: 20 }}>
      {/* Main Panel */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Quản lý đơn hàng</h1>
            <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>Ngày {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
          <button style={{ background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileDown size={15} /> Xuất CSV
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', borderRadius: 8, padding: '8px 12px', border: '1.5px solid #E5E7EB' }}>
            <Search size={15} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm order ID, số bàn..." style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#374151' }} />
          </div>
          <input type="date" defaultValue={dateFilter} style={{ border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#374151', outline: 'none', background: '#F9FAFB' }} />
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                {['Order ID', 'Bàn', 'Thời gian', 'Số món', 'Tổng tiền', 'Trạng thái'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => {
                const status = getOrderStatus(order);
                const cfg = STATUS_CONFIG[status];
                const isSelected = selectedOrder?.id === order.id;
                return (
                  <tr key={order.id}
                    onClick={() => setSelectedOrder(isSelected ? null : order)}
                    style={{
                      borderBottom: idx < filtered.length - 1 ? '1px solid #F3F4F6' : 'none',
                      cursor: 'pointer',
                      background: isSelected ? '#F0F4FF' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#FAFAFA'; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{order.id}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151', fontWeight: 500 }}>{order.tableName}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#9CA3AF' }}>{formatTime(order.createdAt)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{order.items.length} món</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#E94560' }}>{formatPrice(order.total)}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ background: cfg.bg, color: cfg.text, borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{cfg.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: '#F9FAFB', borderTop: '2px solid #E5E7EB' }}>
                <td colSpan={3} style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: '#374151' }}>Tổng: {filtered.length} đơn</td>
                <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: '#374151' }}>{filtered.reduce((s, o) => s + o.items.length, 0)} món</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#E94560' }}>{formatPrice(totalRevenue)}</span>
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedOrder && (
        <div style={{ width: 340, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', position: 'sticky', top: 20 }}>
            <div style={{ background: '#1A1A2E', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>Chi tiết đơn</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#64748B', marginTop: 2 }}>{selectedOrder.id}</div>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 7, padding: '7px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>Bàn</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{selectedOrder.tableName}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>Thời gian</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{formatTime(selectedOrder.createdAt)}</div>
                </div>
              </div>

              {selectedOrder.items.map((item, idx) => {
                const cfg = STATUS_CONFIG[item.status];
                return (
                  <div key={item.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
                      <img src={item.image} alt={item.name} style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{item.name} × {item.quantity}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                          <span style={{ background: cfg.bg, color: cfg.text, borderRadius: 9999, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{cfg.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E94560' }}>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                      {item.status === 'pending' && (
                        <button onClick={() => cancelItem(selectedOrder.id, item.id)} style={{ background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: '#991B1B', flexShrink: 0 }}>
                          Hủy
                        </button>
                      )}
                    </div>
                    {idx < selectedOrder.items.length - 1 && <div style={{ height: 1, background: '#F3F4F6' }} />}
                  </div>
                );
              })}

              {selectedOrder.note && (
                <div style={{ background: '#FEF3C7', borderRadius: 8, padding: '10px 12px', marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: '#92400E' }}>📝 {selectedOrder.note}</span>
                </div>
              )}

              <div style={{ borderTop: '2px solid #E5E7EB', marginTop: 16, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Tổng cộng</span>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700, color: '#E94560' }}>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
