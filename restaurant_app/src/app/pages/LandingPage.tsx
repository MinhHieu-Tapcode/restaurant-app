import React from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, ChefHat, Settings, Package, QrCode, Clock, Users, Layers } from 'lucide-react';

const SUMMARY = {
  userRoles: [
    {
      icon: <ShoppingCart size={22} />,
      title: 'Khách hàng (Customer)',
      desc: 'Truy cập qua QR scan, không cần đăng nhập. Dùng mobile.',
      color: '#E94560',
      route: '/customer',
    },
    {
      icon: <ChefHat size={22} />,
      title: 'Nhân viên bếp (Kitchen)',
      desc: 'Xem & xử lý đơn theo thời gian thực. Dùng desktop/tablet.',
      color: '#F59E0B',
      route: '/kitchen',
    },
    {
      icon: <Settings size={22} />,
      title: 'Admin',
      desc: 'Quản lý toàn hệ thống: món, bàn, đơn. Yêu cầu đăng nhập.',
      color: '#1A1A2E',
      route: '/admin/menu',
    },
    {
      icon: <Package size={22} />,
      title: 'Nhân viên kho (Inventory)',
      desc: 'Quản lý nguyên liệu, nhập hàng, cảnh báo tồn kho.',
      color: '#22C55E',
      route: '/inventory/alerts',
    },
  ],
  flows: [
    {
      label: 'Khách đặt món',
      color: '#E94560',
      steps: ['Scan QR → Menu', 'Thêm vào giỏ', 'Xác nhận đơn', 'Theo dõi trạng thái', 'Thanh toán'],
    },
    {
      label: 'Bếp xử lý',
      color: '#F59E0B',
      steps: ['Nhận đơn mới', 'Bắt đầu làm', 'Hoàn thành', 'Phục vụ mang ra'],
    },
    {
      label: 'Admin quản lý',
      color: '#1A1A2E',
      steps: ['Quản lý món ăn', 'Quản lý bàn + QR', 'Theo dõi đơn & doanh thu'],
    },
    {
      label: 'Kho vận',
      color: '#22C55E',
      steps: ['Kiểm tra tồn kho', 'Xem cảnh báo', 'Nhập hàng nhanh', 'Lịch sử audit'],
    },
  ],
  screens: [
    { group: 'Customer (Mobile)', screens: ['Menu', 'Giỏ hàng', 'Xác nhận đơn', 'Trạng thái đơn', 'Thanh toán'], color: '#E94560' },
    { group: 'Kitchen (Desktop)', screens: ['Kanban Dashboard'], color: '#F59E0B' },
    { group: 'Admin (Desktop)', screens: ['Quản lý món', 'Quản lý bàn', 'Quản lý đơn'], color: '#1A1A2E' },
    { group: 'Inventory (Desktop)', screens: ['Nguyên liệu', 'Nhập hàng', 'Cảnh báo tồn kho'], color: '#22C55E' },
  ],
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F7FF', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1A1A2E', padding: '32px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ background: '#E94560', borderRadius: 10, padding: '6px 8px', display: 'flex' }}>
              <ChefHat size={24} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>RestaurantApp</span>
            <span style={{ background: '#E94560', color: '#fff', borderRadius: 9999, padding: '2px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>v1.0</span>
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 700, color: '#fff', margin: 0 }}>
            Hệ thống Quản lý Nhà hàng
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 8, fontSize: 15 }}>
            Restaurant Order Management System · 12 màn hình · 4 nhóm người dùng
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* SUMMARY SECTION */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>
            📋 Tóm tắt tài liệu
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>
            Phân tích từ 3 tài liệu: Figma Design Guide, UI/UX Screen Spec, và PDF đính kèm
          </p>

          {/* User Roles */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Users size={18} color="#E94560" />
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                User Roles (4 nhóm)
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {SUMMARY.userRoles.map((role) => (
                <div key={role.title} style={{ border: `2px solid ${role.color}20`, borderRadius: 12, padding: 16, background: `${role.color}08` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ color: role.color }}>{role.icon}</div>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#1F2937' }}>{role.title}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{role.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Flows */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Layers size={18} color="#E94560" />
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                Main Flows (4 luồng nghiệp vụ)
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {SUMMARY.flows.map((flow) => (
                <div key={flow.label} style={{ borderRadius: 12, padding: 16, background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: flow.color }} />
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#1F2937' }}>{flow.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {flow.steps.map((step, i) => (
                      <React.Fragment key={step}>
                        <span style={{ fontSize: 11, color: '#374151', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, padding: '2px 8px' }}>{step}</span>
                        {i < flow.steps.length - 1 && <span style={{ fontSize: 11, color: '#9CA3AF', alignSelf: 'center' }}>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screens */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Clock size={18} color="#E94560" />
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1F2937', margin: 0 }}>
                Screens (12 màn hình tổng)
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {SUMMARY.screens.map((group) => (
                <div key={group.group} style={{ borderRadius: 12, padding: 16, background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color }} />
                    <span style={{ fontWeight: 600, fontSize: 12, color: '#374151' }}>{group.group}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {group.screens.map((screen) => (
                      <li key={screen} style={{ fontSize: 12, color: '#6B7280', padding: '3px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: group.color, display: 'inline-block', flexShrink: 0 }} />
                        {screen}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROLE SELECTOR */}
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>
          🚀 Chọn giao diện để xem demo
        </h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          Mỗi vai trò có giao diện riêng biệt, thiết kế theo đặc tả UI/UX
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {/* Customer */}
          <button
            onClick={() => navigate('/customer')}
            style={{ background: '#1A1A2E', borderRadius: 16, padding: 28, border: 'none', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ background: '#E94560', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <QrCode size={24} color="#fff" />
            </div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Khách hàng</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>Scan QR, đặt món, theo dõi đơn hàng, thanh toán</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Menu', 'Giỏ hàng', 'Xác nhận', 'Trạng thái', 'Thanh toán'].map(s => (
                <span key={s} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 9999, padding: '3px 10px', fontSize: 11 }}>{s}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#E94560', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              📱 Mobile
            </div>
          </button>

          {/* Kitchen */}
          <button
            onClick={() => navigate('/kitchen')}
            style={{ background: '#fff', borderRadius: 16, padding: 28, border: '2px solid #F59E0B', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ background: '#FEF3C7', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <ChefHat size={24} color="#F59E0B" />
            </div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>Bếp</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Kanban board thời gian thực, cập nhật trạng thái đơn</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Chờ xác nhận', 'Đang làm', 'Sẵn sàng', 'Đã phục vụ'].map(s => (
                <span key={s} style={{ background: '#FEF3C7', color: '#92400E', borderRadius: 9999, padding: '3px 10px', fontSize: 11 }}>{s}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#F59E0B', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              🖥 Desktop
            </div>
          </button>

          {/* Admin */}
          <button
            onClick={() => navigate('/admin/menu')}
            style={{ background: '#fff', borderRadius: 16, padding: 28, border: '2px solid #1A1A2E', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ background: '#EEF2FF', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Settings size={24} color="#1A1A2E" />
            </div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>Admin</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Quản lý toàn diện: món ăn, bàn, đơn hàng, doanh thu</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Quản lý món', 'Quản lý bàn', 'Quản lý đơn'].map(s => (
                <span key={s} style={{ background: '#F1F5F9', color: '#475569', borderRadius: 9999, padding: '3px 10px', fontSize: 11 }}>{s}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#1A1A2E', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              🖥 Desktop
            </div>
          </button>

          {/* Inventory */}
          <button
            onClick={() => navigate('/inventory/alerts')}
            style={{ background: '#fff', borderRadius: 16, padding: 28, border: '2px solid #22C55E', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ background: '#DCFCE7', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Package size={24} color="#22C55E" />
            </div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>Kho vận</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Nguyên liệu, nhập hàng, cảnh báo tồn kho thấp</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Nguyên liệu', 'Nhập hàng', 'Cảnh báo'].map(s => (
                <span key={s} style={{ background: '#DCFCE7', color: '#15803D', borderRadius: 9999, padding: '3px 10px', fontSize: 11 }}>{s}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#22C55E', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              🖥 Desktop
            </div>
          </button>
        </div>

        {/* Design Tokens */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginTop: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>🎨 Design Tokens</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { name: 'Primary', hex: '#1A1A2E', text: '#fff' },
              { name: 'Accent', hex: '#E94560', text: '#fff' },
              { name: 'Success', hex: '#22C55E', text: '#fff' },
              { name: 'Warning', hex: '#F59E0B', text: '#fff' },
              { name: 'Error', hex: '#EF4444', text: '#fff' },
              { name: 'BG', hex: '#F5F7FF', text: '#1F2937' },
              { name: 'Muted', hex: '#6B7280', text: '#fff' },
              { name: 'Border', hex: '#E5E7EB', text: '#1F2937' },
            ].map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.hex, border: '1px solid #E5E7EB' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace' }}>{t.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
