import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Check } from 'lucide-react';
import { MENU_ITEMS, MenuItem, formatPrice } from '../../data/mockData';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  available: { bg: '#DCFCE7', text: '#166534', label: 'Đang bán' },
  unavailable: { bg: '#FEE2E2', text: '#991B1B', label: 'Hết hàng' },
};

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailable = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>Quản lý món ăn</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>{items.length} món trong thực đơn</p>
        </div>
        <button onClick={() => { setEditItem(null); setShowModal(true); }} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Thêm món
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', borderRadius: 8, padding: '8px 12px', border: '1.5px solid #E5E7EB' }}>
          <Search size={16} color="#9CA3AF" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm món ăn..." style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#374151' }} />
        </div>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Hiển thị {filtered.length} / {items.length} món</div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['Món ăn', 'Danh mục', 'Giá', 'Nguyên liệu', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => {
              const statusKey = item.isAvailable ? 'available' : 'unavailable';
              const statusCfg = STATUS_COLORS[statusKey];
              return (
                <tr key={item.id} style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>{item.description.slice(0, 45)}...</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#EEF2FF', color: '#4338CA', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: '#E94560' }}>{formatPrice(item.price)}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {item.ingredients.slice(0, 3).map(ing => (
                        <span key={ing} style={{ background: '#F3F4F6', color: '#374151', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{ing}</span>
                      ))}
                      {item.ingredients.length > 3 && <span style={{ fontSize: 11, color: '#9CA3AF' }}>+{item.ingredients.length - 3}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => toggleAvailable(item.id)} style={{ background: statusCfg.bg, color: statusCfg.text, border: 'none', borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                      {statusCfg.label}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setEditItem(item); setShowModal(true); }} style={{ background: '#EEF2FF', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex', color: '#4338CA' }}>
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setConfirmDelete(item.id)} style={{ background: '#FEE2E2', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex', color: '#991B1B' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 12 }}>🗑</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>Xóa món này?</div>
            <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 24 }}>Thao tác không thể hoàn tác. Bạn chắc chắn muốn xóa?</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                Hủy
              </button>
              <button onClick={() => deleteItem(confirmDelete)} style={{ flex: 1, background: '#EF4444', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                {editItem ? 'Sửa món ăn' : 'Thêm món mới'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Tên món *', placeholder: 'Phở bò tái...', key: 'name' },
                { label: 'Giá (VND) *', placeholder: '75000', key: 'price', type: 'number' },
                { label: 'Mô tả', placeholder: 'Mô tả ngắn về món ăn...', key: 'description' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    defaultValue={editItem ? String((editItem as any)[field.key]) : ''}
                    placeholder={field.placeholder}
                    style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Danh mục *</label>
                <select defaultValue={editItem?.category || 'Món chính'} style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#374151', outline: 'none' }}>
                  {['Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trạng thái</label>
                <div style={{ background: '#DCFCE7', borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#166534' }}>Đang bán</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                Hủy
              </button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#1A1A2E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Check size={16} /> {editItem ? 'Lưu thay đổi' : 'Thêm món'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
