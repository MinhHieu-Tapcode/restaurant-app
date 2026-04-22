import React, { useState } from 'react';
import { AlertTriangle, X, Check, ArrowRight } from 'lucide-react';
import { INGREDIENTS, Ingredient } from '../../data/mockData';
import { useNavigate } from 'react-router';

function getLowStock(ingredients: Ingredient[]) {
  return ingredients.filter(i => i.stock <= i.threshold);
}

export default function AlertsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>(INGREDIENTS);
  const [showRestock, setShowRestock] = useState<Ingredient | null>(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockNote, setRestockNote] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const lowStockItems = getLowStock(ingredients);

  const handleRestock = () => {
    if (!showRestock || !restockQty) return;
    const qty = parseFloat(restockQty);
    setIngredients(prev => prev.map(i => i.id === showRestock.id ? { ...i, stock: i.stock + qty } : i));
    setSuccessMsg(`Đã nhập ${qty} ${showRestock.unit} ${showRestock.name}`);
    setShowRestock(null);
    setRestockQty('');
    setRestockNote('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Success Toast */}
      {successMsg && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#22C55E', color: '#fff', borderRadius: 12, padding: '14px 20px', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(34,197,94,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={16} /> {successMsg}
        </div>
      )}

      {/* Alert Banner */}
      <div style={{ background: lowStockItems.length > 0 ? '#FEE2E2' : '#DCFCE7', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, border: `2px solid ${lowStockItems.length > 0 ? '#FECACA' : '#BBF7D0'}` }}>
        <AlertTriangle size={22} color={lowStockItems.length > 0 ? '#EF4444' : '#22C55E'} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: lowStockItems.length > 0 ? '#991B1B' : '#166534' }}>
            {lowStockItems.length > 0 ? `${lowStockItems.length} nguyên liệu cần nhập hàng` : 'Tất cả nguyên liệu ở mức an toàn'}
          </div>
          <div style={{ fontSize: 13, color: lowStockItems.length > 0 ? '#B91C1C' : '#15803D', marginTop: 2 }}>
            {lowStockItems.length > 0 ? 'Hành động ngay để tránh gián đoạn hoạt động' : 'Không có cảnh báo tồn kho nào'}
          </div>
        </div>
        <button onClick={() => navigate('/inventory/ingredients')} style={{ background: 'none', border: '2px solid currentColor', borderRadius: 9, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: lowStockItems.length > 0 ? '#991B1B' : '#166534', display: 'flex', alignItems: 'center', gap: 5 }}>
          Xem tất cả <ArrowRight size={14} />
        </button>
      </div>

      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>
        Cảnh báo tồn kho
      </h1>

      {lowStockItems.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12 }}>
          <div style={{ fontSize: 50 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>Không có nguyên liệu nào dưới ngưỡng</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lowStockItems.map(item => {
            const pct = Math.round((item.stock / item.threshold) * 100);
            const isOut = item.stock === 0;
            return (
              <div key={item.id} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: `2px solid ${isOut ? '#FEE2E2' : '#FEF3C7'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {item.name}
                      <span style={{ background: isOut ? '#FEE2E2' : '#FEF3C7', color: isOut ? '#991B1B' : '#92400E', borderRadius: 9999, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
                        {isOut ? 'Hết hàng' : 'Sắp hết'}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
                      Tồn kho: <strong style={{ color: isOut ? '#EF4444' : '#F59E0B' }}>{item.stock} {item.unit}</strong>
                      {' '}/ Ngưỡng: {item.threshold} {item.unit}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRestock(item)}
                    style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Nhập hàng
                  </button>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>Mức tồn kho hiện tại</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: isOut ? '#EF4444' : '#F59E0B' }}>{pct}%</span>
                  </div>
                  <div style={{ background: '#E5E7EB', borderRadius: 9999, height: 10, overflow: 'hidden' }}>
                    <div style={{ background: isOut ? '#EF4444' : '#F59E0B', height: '100%', width: `${Math.min(pct, 100)}%`, borderRadius: 9999, transition: 'width 0.4s' }} />
                  </div>
                </div>

                {/* Affected dishes */}
                {item.affectedDishes.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Món bị ảnh hưởng</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {item.affectedDishes.map(dish => (
                        <button key={dish} onClick={() => navigate('/admin/menu')} style={{ background: '#EEF2FF', color: '#4338CA', border: 'none', borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
                          {dish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Restock Modal */}
      {showRestock && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                Nhập hàng — {showRestock.name}
              </h3>
              <button onClick={() => setShowRestock(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ background: '#F9FAFB', borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#6B7280' }}>Tồn kho hiện tại: <strong style={{ color: '#EF4444' }}>{showRestock.stock} {showRestock.unit}</strong></div>
              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Ngưỡng cảnh báo: {showRestock.threshold} {showRestock.unit}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Số lượng nhập ({showRestock.unit}) *</label>
                <input
                  type="number"
                  value={restockQty}
                  onChange={e => setRestockQty(e.target.value)}
                  placeholder="0"
                  min="0.1"
                  step="0.1"
                  style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '11px 12px', fontSize: 16, color: '#374151', outline: 'none', boxSizing: 'border-box', fontFamily: 'Sora, sans-serif', fontWeight: 700 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Ghi chú (nhà cung cấp, lô hàng)</label>
                <textarea
                  value={restockNote}
                  onChange={e => setRestockNote(e.target.value)}
                  placeholder="Nhà cung cấp ABC, lô hàng sáng..."
                  style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#374151', outline: 'none', boxSizing: 'border-box', resize: 'none', height: 70, fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowRestock(null)} style={{ flex: 1, background: '#F3F4F6', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>Hủy</button>
              <button onClick={handleRestock} disabled={!restockQty} style={{ flex: 1, background: !restockQty ? '#E5E7EB' : '#22C55E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: restockQty ? 'pointer' : 'not-allowed', color: '#fff' }}>
                Lưu nhập hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
