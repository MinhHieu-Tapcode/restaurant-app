import React, { useState } from 'react';
import { Plus, QrCode, Pencil, Trash2, X, Users } from 'lucide-react';
import { TABLES, Table } from '../../data/mockData';

const STATUS_CONFIG = {
  empty: { bg: '#DCFCE7', text: '#166534', label: 'Trống', dot: '#22C55E' },
  occupied: { bg: '#DBEAFE', text: '#1E40AF', label: 'Đang có khách', dot: '#3B82F6' },
  waiting: { bg: '#FEF3C7', text: '#92400E', label: 'Chờ thanh toán', dot: '#F59E0B' },
};

export default function TableManagementPage() {
  const [tables, setTables] = useState<Table[]>(TABLES);
  const [search, setSearch] = useState('');
  const [showQR, setShowQR] = useState<Table | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newCapacity, setNewCapacity] = useState('4');

  const filtered = tables.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const addTable = () => {
    if (!newTableName) return;
    setTables(prev => [...prev, { id: `t${prev.length + 1}`, name: newTableName, status: 'empty', capacity: parseInt(newCapacity) }]);
    setShowAddModal(false);
    setNewTableName('');
    setNewCapacity('4');
  };

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Quản lý bàn</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>{tables.length} bàn · {tables.filter(t => t.status === 'occupied').length} đang có khách</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Thêm bàn
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Bàn trống', count: tables.filter(t => t.status === 'empty').length, color: '#22C55E', bg: '#DCFCE7' },
          { label: 'Đang có khách', count: tables.filter(t => t.status === 'occupied').length, color: '#3B82F6', bg: '#DBEAFE' },
          { label: 'Chờ thanh toán', count: tables.filter(t => t.status === 'waiting').length, color: '#F59E0B', bg: '#FEF3C7' },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.bg, borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 700, color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: 13, color: '#374151', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #E5E7EB', maxWidth: 320 }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bàn..." style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#374151' }} />
      </div>

      {/* Table Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.map(table => {
          const cfg = STATUS_CONFIG[table.status];
          return (
            <div key={table.id} style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: `2px solid ${cfg.bg}`, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 28, fontWeight: 700, color: '#1A1A2E' }}>{table.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <Users size={13} color="#9CA3AF" />
                    <span style={{ fontSize: 12, color: '#6B7280' }}>Sức chứa: {table.capacity} người</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => {}} style={{ background: '#EEF2FF', border: 'none', borderRadius: 7, padding: '7px', cursor: 'pointer', display: 'flex', color: '#4338CA' }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => {}} disabled={table.status !== 'empty'} style={{ background: table.status !== 'empty' ? '#F3F4F6' : '#FEE2E2', border: 'none', borderRadius: 7, padding: '7px', cursor: table.status === 'empty' ? 'pointer' : 'not-allowed', display: 'flex', color: table.status !== 'empty' ? '#D1D5DB' : '#991B1B' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot }} />
                <span style={{ background: cfg.bg, color: cfg.text, borderRadius: 9999, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{cfg.label}</span>
                {table.currentGuests && (
                  <span style={{ fontSize: 12, color: '#6B7280' }}>{table.currentGuests} khách</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowQR(table)} style={{ flex: 1, background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 9, padding: '9px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <QrCode size={14} /> Xem QR
                </button>
                {table.status !== 'empty' && (
                  <button style={{ flex: 1, background: '#FEF3C7', border: 'none', borderRadius: 9, padding: '9px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#92400E' }}>
                    Đóng bàn
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Modal */}
      {showQR && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 360, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', margin: 0 }}>QR Code — {showQR.name}</h3>
              <button onClick={() => setShowQR(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
            {/* Fake QR */}
            <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 24, marginBottom: 16, display: 'inline-block' }}>
              <div style={{ width: 180, height: 180, background: '#1A1A2E', borderRadius: 12, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 2, padding: 12, margin: '0 auto' }}>
                {Array.from({ length: 81 }).map((_, i) => (
                  <div key={i} style={{ background: Math.random() > 0.5 ? '#fff' : 'transparent', borderRadius: 1 }} />
                ))}
              </div>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#6B7280', marginBottom: 20 }}>
              /customer/menu/{showQR.id}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                🖨 In QR
              </button>
              <button style={{ flex: 1, background: '#1A1A2E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#fff' }}>
                ⬇ Tải PNG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Thêm bàn mới</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Tên bàn *</label>
                <input value={newTableName} onChange={e => setNewTableName(e.target.value)} placeholder="Bàn 09..." style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Sức chứa</label>
                <input type="number" value={newCapacity} onChange={e => setNewCapacity(e.target.value)} min="1" max="20" style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>Hủy</button>
              <button onClick={addTable} style={{ flex: 1, background: '#1A1A2E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>Thêm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
