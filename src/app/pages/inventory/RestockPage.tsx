import React, { useState } from 'react';
import { Check, RotateCcw, Search } from 'lucide-react';
import { INGREDIENTS, RESTOCK_LOGS, RestockLog, formatTime } from '../../data/mockData';

export default function RestockPage() {
  const [logs, setLogs] = useState<RestockLog[]>(RESTOCK_LOGS);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [qty, setQty] = useState('');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState('');
  const [logSearch, setLogSearch] = useState('');

  const handleSave = () => {
    if (!selectedIngredient || !qty) return;
    const ingredient = INGREDIENTS.find(i => i.id === selectedIngredient);
    if (!ingredient) return;
    const newLog: RestockLog = {
      id: `r${logs.length + 1}`,
      ingredientName: ingredient.name,
      quantity: parseFloat(qty),
      note,
      staffName: 'Nhân viên kho',
      createdAt: new Date(),
    };
    setLogs(prev => [newLog, ...prev]);
    setSuccess(`Đã nhập ${qty} ${ingredient.unit} ${ingredient.name} thành công`);
    setSelectedIngredient('');
    setQty('');
    setNote('');
    setTimeout(() => setSuccess(''), 4000);
  };

  const filteredLogs = logs.filter(l =>
    l.ingredientName.toLowerCase().includes(logSearch.toLowerCase()) ||
    l.note.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Success Toast */}
      {success && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#22C55E', color: '#fff', borderRadius: 12, padding: '14px 20px', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(34,197,94,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={16} /> {success}
        </div>
      )}

      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', marginBottom: 24 }}>Nhập hàng</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }}>
        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: 'fit-content' }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>📦 Form nhập hàng</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Chọn nguyên liệu *</label>
              <select value={selectedIngredient} onChange={e => setSelectedIngredient(e.target.value)} style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 9, padding: '11px 12px', fontSize: 14, color: selectedIngredient ? '#374151' : '#9CA3AF', outline: 'none', background: '#F9FAFB' }}>
                <option value="" disabled>Chọn nguyên liệu...</option>
                {INGREDIENTS.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} (Tồn: {i.stock} {i.unit})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                Số lượng nhập {selectedIngredient && `(${INGREDIENTS.find(i => i.id === selectedIngredient)?.unit})`} *
              </label>
              <input
                type="number"
                value={qty}
                onChange={e => setQty(e.target.value)}
                placeholder="0"
                min="0.1"
                step="0.1"
                style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 9, padding: '11px 12px', fontSize: 18, color: '#1F2937', outline: 'none', boxSizing: 'border-box', fontFamily: 'Sora, sans-serif', fontWeight: 700, background: '#F9FAFB' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Ghi chú (nhà cung cấp, lô hàng)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Nhà cung cấp ABC, lô hàng sáng 22/4..."
                style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 9, padding: '10px 12px', fontSize: 13, color: '#374151', outline: 'none', boxSizing: 'border-box', resize: 'none', height: 80, fontFamily: 'Inter, sans-serif', background: '#F9FAFB' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setSelectedIngredient(''); setQty(''); setNote(''); }} style={{ background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                <RotateCcw size={14} /> Reset
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedIngredient || !qty}
                style={{ flex: 1, background: !selectedIngredient || !qty ? '#E5E7EB' : '#22C55E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: !selectedIngredient || !qty ? 'not-allowed' : 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Lưu nhập hàng
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1F2937' }}>📋 Lịch sử nhập hàng</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 9, padding: '8px 12px', border: '1.5px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <Search size={14} color="#9CA3AF" />
              <input value={logSearch} onChange={e => setLogSearch(e.target.value)} placeholder="Tìm nguyên liệu..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#374151', width: 160 }} />
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  {['Thời gian', 'Nguyên liệu', 'Số lượng', 'Ghi chú', 'Người nhập'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr key={log.id} style={{ borderBottom: idx < filteredLogs.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace' }}>{formatTime(log.createdAt)}</td>
                    <td style={{ padding: '13px 16px', fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{log.ingredientName}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: '#DCFCE7', color: '#166534', borderRadius: 9999, padding: '3px 10px', fontSize: 13, fontWeight: 700 }}>+{log.quantity}</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#6B7280' }}>{log.note || '—'}</td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#374151' }}>{log.staffName}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
                      Không có lịch sử nhập hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
