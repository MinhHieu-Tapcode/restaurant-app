import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router';
import { Package, AlertTriangle, ArchiveRestore, Home, List } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/inventory/alerts', icon: <AlertTriangle size={18} />, label: 'Cảnh báo tồn kho', badge: 4 },
  { path: '/inventory/ingredients', icon: <List size={18} />, label: 'Nguyên liệu' },
  { path: '/inventory/restock', icon: <ArchiveRestore size={18} />, label: 'Nhập hàng' },
];

export default function InventoryLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: '100vh', background: '#F5F7FF' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: '#14532D', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#22C55E', borderRadius: 10, padding: '7px', display: 'flex' }}>
              <Package size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>Kho vận</div>
              <div style={{ fontSize: 11, color: '#4ADE80' }}>Inventory Manager</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%', background: active ? '#22C55E' : 'none', color: active ? '#fff' : '#86EFAC',
                  border: 'none', borderRadius: 10, padding: '11px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: active ? 600 : 400,
                  marginBottom: 4, textAlign: 'left', transition: 'all 0.15s', justifyContent: 'space-between',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'none'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {item.icon}
                  {item.label}
                </span>
                {item.badge && (
                  <span style={{ background: '#EF4444', color: '#fff', borderRadius: 9999, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => navigate('/')} style={{ width: '100%', background: 'none', color: '#86EFAC', border: 'none', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Home size={16} /> Về trang chủ
          </button>
          <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <div style={{ width: 32, height: 32, background: '#22C55E', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>K</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F1F5F9' }}>Nhân viên kho</div>
              <div style={{ fontSize: 11, color: '#4ADE80' }}>kho@restaurant.vn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
