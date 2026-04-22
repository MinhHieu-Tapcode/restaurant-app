import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RefreshCw, ChefHat, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { OrderStatus } from '../../data/mockData';

interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  tableId: string;
  tableName: string;
  orderId: string;
  status: OrderStatus;
  image: string;
  createdAt: Date;
}

const INITIAL_ITEMS: KitchenItem[] = [
  { id: 'k1', name: 'Phở Bò Tái', quantity: 2, tableId: 't3', tableName: 'Bàn 03', orderId: '#ORD-002', status: 'pending', image: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 180000) },
  { id: 'k2', name: 'Cơm Gà Nướng', quantity: 3, tableId: 't3', tableName: 'Bàn 03', orderId: '#ORD-002', status: 'confirmed', image: 'https://images.unsplash.com/photo-1766050587783-1c90751275dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 720000) },
  { id: 'k3', name: 'Bò Xào Lúc Lắc', quantity: 1, tableId: 't3', tableName: 'Bàn 03', orderId: '#ORD-002', status: 'pending', image: 'https://images.unsplash.com/photo-1774668770914-2a37b84c3ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 120000) },
  { id: 'k4', name: 'Ch�� Giò Tôm', quantity: 2, tableId: 't5', tableName: 'Bàn 05', orderId: '#ORD-003', status: 'pending', image: 'https://images.unsplash.com/photo-1776178393305-be4c1097fae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 60000) },
  { id: 'k5', name: 'Nước Ép Trái Cây', quantity: 4, tableId: 't3', tableName: 'Bàn 03', orderId: '#ORD-002', status: 'ready', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 900000) },
  { id: 'k6', name: 'Phở Bò Tái', quantity: 1, tableId: 't7', tableName: 'Bàn 07', orderId: '#ORD-004', status: 'ready', image: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 1500000) },
  { id: 'k7', name: 'Xôi Xoài', quantity: 2, tableId: 't7', tableName: 'Bàn 07', orderId: '#ORD-004', status: 'confirmed', image: 'https://images.unsplash.com/photo-1664155941358-2f50e4672430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 1200000) },
  { id: 'k8', name: 'Cà Phê Sữa Đá', quantity: 2, tableId: 't1', tableName: 'Bàn 01', orderId: '#ORD-001', status: 'served', image: 'https://images.unsplash.com/photo-1767322248580-bfebe7eb9b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80', createdAt: new Date(Date.now() - 3600000) },
];

const COLUMNS: { status: OrderStatus; label: string; headerBg: string; headerText: string; actionLabel: string; nextStatus?: OrderStatus }[] = [
  { status: 'pending', label: 'Chờ xác nhận', headerBg: '#FEF3C7', headerText: '#92400E', actionLabel: 'Bắt đầu làm', nextStatus: 'confirmed' },
  { status: 'confirmed', label: 'Đang làm', headerBg: '#DBEAFE', headerText: '#1E40AF', actionLabel: 'Hoàn thành', nextStatus: 'ready' },
  { status: 'ready', label: 'Sẵn sàng', headerBg: '#DCFCE7', headerText: '#166534', actionLabel: 'Đã mang ra', nextStatus: 'served' },
  { status: 'served', label: 'Đã phục vụ', headerBg: '#F3F4F6', headerText: '#6B7280', actionLabel: '' },
];

function ElapsedTimer({ createdAt }: { createdAt: Date }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(t);
  }, []);
  const mins = Math.floor((now - createdAt.getTime()) / 60000);
  const isUrgent = mins > 15;
  return (
    <span style={{ fontSize: 11, color: isUrgent ? '#EF4444' : '#9CA3AF', display: 'flex', alignItems: 'center', gap: 3, fontWeight: isUrgent ? 700 : 400 }}>
      {isUrgent && <AlertTriangle size={11} />}
      <Clock size={11} /> {mins < 60 ? `${mins} phút` : `${Math.floor(mins / 60)}h ${mins % 60}p`}
    </span>
  );
}

export default function KitchenPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [now, setNow] = useState(new Date());
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
      setLastRefresh(s => s + 1);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const updateStatus = (id: string, nextStatus: OrderStatus) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: nextStatus } : i));
  };

  const activeCount = items.filter(i => i.status !== 'served').length;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0F172A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#1E293B', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ background: '#E94560', borderRadius: 10, padding: '8px', display: 'flex' }}>
            <ChefHat size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>Bếp — Kitchen Dashboard</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>
              {now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · {activeCount} đơn đang xử lý
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#64748B' }}>Cập nhật: {lastRefresh * 10}s trước</span>
          <button onClick={() => setLastRefresh(0)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: 20, flex: 1, minHeight: 0 }}>
        {COLUMNS.map(col => {
          const colItems = items.filter(i => i.status === col.status);
          return (
            <div key={col.status} style={{ background: '#1E293B', borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #334155' }}>
              {/* Column Header */}
              <div style={{ background: col.headerBg, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: col.headerText }}>{col.label}</span>
                <span style={{ background: col.headerText, color: '#fff', borderRadius: 9999, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {colItems.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ flex: 1, padding: 12, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {colItems.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 120, gap: 8 }}>
                    <span style={{ fontSize: 28 }}>✅</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>Không có đơn mới</span>
                  </div>
                ) : (
                  colItems.map(item => {
                    const minsElapsed = Math.floor((Date.now() - item.createdAt.getTime()) / 60000);
                    const isUrgent = minsElapsed > 15 && item.status !== 'served';
                    return (
                      <div key={item.id} style={{
                        background: '#0F172A',
                        borderRadius: 12,
                        padding: 14,
                        border: `2px solid ${isUrgent ? '#EF4444' : '#334155'}`,
                        transition: 'border-color 0.2s',
                      }}>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                          <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>{item.name}</div>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <span style={{ background: '#E94560', color: '#fff', borderRadius: 9999, padding: '1px 8px', fontSize: 12, fontWeight: 700 }}>×{item.quantity}</span>
                              <span style={{ fontSize: 12, color: '#64748B' }}>{item.tableName}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: col.actionLabel ? 10 : 0 }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{item.orderId}</span>
                          <ElapsedTimer createdAt={item.createdAt} />
                        </div>
                        {col.actionLabel && col.nextStatus && (
                          <button
                            onClick={() => updateStatus(item.id, col.nextStatus!)}
                            style={{
                              width: '100%', background: col.headerBg, color: col.headerText, border: 'none',
                              borderRadius: 8, padding: '9px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                              transition: 'opacity 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                          >
                            {col.actionLabel}
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}