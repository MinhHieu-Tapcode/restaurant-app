import React, { useState } from 'react';
import { Search, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { INGREDIENTS, Ingredient } from '../../data/mockData';

function getStatus(stock: number, threshold: number) {
  if (stock === 0) return { label: 'Hết', bg: '#FEE2E2', text: '#991B1B' };
  if (stock <= threshold) return { label: 'Thấp', bg: '#FEF3C7', text: '#92400E' };
  return { label: 'OK', bg: '#DCFCE7', text: '#166534' };
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INGREDIENTS);
  const [search, setSearch] = useState('');
  const [filterLow, setFilterLow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Ingredient | null>(null);
  const [restockRow, setRestockRow] = useState<string | null>(null);
  const [restockAmt, setRestockAmt] = useState('');

  const filtered = ingredients.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterLow ? i.stock <= i.threshold : true;
    return matchSearch && matchFilter;
  });

  const handleQuickRestock = (id: string) => {
    const qty = parseFloat(restockAmt);
    if (!qty) return;
    setIngredients(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock + qty } : i));
    setRestockRow(null);
    setRestockAmt('');
  };

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Nguyên liệu</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>{ingredients.length} nguyên liệu · {ingredients.filter(i => i.stock <= i.threshold).length} dưới ngưỡng</p>
        </div>
        <button onClick={() => { setEditItem(null); setShowModal(true); }} style={{ background: '#22C55E', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Thêm nguyên liệu
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 10, padding: '10px 14px', border: '1.5px solid #E5E7EB', maxWidth: 340, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <Search size={15} color="#9CA3AF" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm nguyên liệu..." style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#374151' }} />
        </div>
        <button onClick={() => setFilterLow(f => !f)} style={{ background: filterLow ? '#FEF3C7' : '#fff', border: `2px solid ${filterLow ? '#F59E0B' : '#E5E7EB'}`, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: filterLow ? '#92400E' : '#374151', transition: 'all 0.15s' }}>
          {filterLow ? '✓ ' : ''}Dưới ngưỡng
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['Tên nguyên liệu', 'Đơn vị', 'Tồn kho', 'Ngưỡng cảnh báo', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => {
              const status = getStatus(item.stock, item.threshold);
              const isRestocking = restockRow === item.id;
              return (
                <tr key={item.id}
                  style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', background: item.stock === 0 ? '#FFF5F5' : item.stock <= item.threshold ? '#FFFBEB' : 'transparent' }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{item.unit}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: item.stock === 0 ? '#EF4444' : item.stock <= item.threshold ? '#F59E0B' : '#22C55E' }}>
                      {item.stock}
                    </span>
                    <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 4 }}>{item.unit}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{item.threshold} {item.unit}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: status.bg, color: status.text, borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{status.label}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {isRestocking ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                          type="number"
                          value={restockAmt}
                          onChange={e => setRestockAmt(e.target.value)}
                          placeholder="Số lượng"
                          style={{ width: 90, border: '1.5px solid #22C55E', borderRadius: 7, padding: '6px 8px', fontSize: 13, outline: 'none' }}
                          autoFocus
                        />
                        <button onClick={() => handleQuickRestock(item.id)} style={{ background: '#22C55E', border: 'none', borderRadius: 7, padding: '7px 10px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                          <Check size={14} />
                        </button>
                        <button onClick={() => setRestockRow(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 7, padding: '7px', cursor: 'pointer', display: 'flex' }}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => { setEditItem(item); setShowModal(true); }} style={{ background: '#EEF2FF', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', display: 'flex', color: '#4338CA' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => { setRestockRow(item.id); setRestockAmt(''); }} style={{ background: '#DCFCE7', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#166534', fontSize: 12, fontWeight: 600 }}>
                          <Plus size={13} /> Nhập
                        </button>
                        <button style={{ background: '#FEE2E2', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', display: 'flex', color: '#991B1B' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                {editItem ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Tên nguyên liệu *', key: 'name', placeholder: 'Thịt bò...' },
                { label: 'Đơn vị *', key: 'unit', placeholder: 'kg, lít, lon...' },
                { label: 'Tồn kho ban đầu', key: 'stock', type: 'number', placeholder: '10' },
                { label: 'Ngưỡng cảnh báo', key: 'threshold', type: 'number', placeholder: '5' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    defaultValue={editItem ? String((editItem as any)[field.key]) : ''}
                    placeholder={field.placeholder}
                    disabled={editItem && field.key === 'stock'}
                    style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box', background: editItem && field.key === 'stock' ? '#F9FAFB' : '#fff' }}
                  />
                  {editItem && field.key === 'stock' && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Số lượng tồn kho chỉ có thể thay đổi qua nhập hàng</div>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>Hủy</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#22C55E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                {editItem ? 'Lưu thay đổi' : 'Thêm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
