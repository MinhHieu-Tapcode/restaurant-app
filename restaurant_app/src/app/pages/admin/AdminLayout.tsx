import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router';
import { Settings, UtensilsCrossed, Table2, ShoppingBag, LogOut, Home } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/admin/menu', icon: <UtensilsCrossed size={18} />, label: 'Quản lý món' },
  { path: '/admin/tables', icon: <Table2 size={18} />, label: 'Quản lý bàn' },
  { path: '/admin/orders', icon: <ShoppingBag size={18} />, label: 'Quản lý đơn' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: '100vh', background: '#F5F7FF' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: '#1A1A2E', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#E94560', borderRadius: 10, padding: '7px', display: 'flex' }}>
              <Settings size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>Admin Panel</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>Restaurant Manager</div>
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
                  width: '100%', background: active ? '#E94560' : 'none', color: active ? '#fff' : '#94A3B8',
                  border: 'none', borderRadius: 10, padding: '11px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: active ? 600 : 400,
                  marginBottom: 4, textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'none'; }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => navigate('/')} style={{ width: '100%', background: 'none', color: '#94A3B8', border: 'none', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Home size={16} /> Về trang chủ
          </button>
          <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <div style={{ width: 32, height: 32, background: '#E94560', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F1F5F9' }}>Admin</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>admin@restaurant.vn</div>
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
