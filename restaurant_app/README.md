# 🍜 Restaurant App — Hệ Thống Quản Lý Nhà Hàng

Ứng dụng web quản lý nhà hàng hoàn chỉnh, gồm 4 giao diện:
- **Khách hàng** — Đặt món qua QR, theo dõi đơn, thanh toán
- **Bếp** — Kanban dashboard xử lý đơn theo thời gian thực
- **Admin** — Quản lý món ăn, bàn, đơn hàng
- **Kho** — Quản lý nguyên liệu, nhập hàng, cảnh báo tồn kho

---

## 📋 Mục Lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Chạy trên máy tính (Local)](#2-chạy-trên-máy-tính-local)
3. [Deploy lên Vercel (Miễn phí, dễ nhất)](#3-deploy-lên-vercel-miễn-phí-dễ-nhất)
4. [Deploy lên Netlify (Miễn phí)](#4-deploy-lên-netlify-miễn-phí)
5. [Các trang trong app](#5-các-trang-trong-app)
6. [Cấu trúc file](#6-cấu-trúc-file)
7. [Tuỳ chỉnh dữ liệu](#7-tuỳ-chỉnh-dữ-liệu)
8. [Câu hỏi thường gặp](#8-câu-hỏi-thường-gặp)

---

## 1. Yêu Cầu Hệ Thống

Trước tiên, cần cài 2 phần mềm sau:

### Node.js (bắt buộc)
- Tải tại: https://nodejs.org/en/download
- Chọn phiên bản **LTS** (ví dụ: 20.x)
- Cài đặt bình thường (Next → Next → Finish)
- Kiểm tra: mở Terminal/Command Prompt, gõ `node -v` → hiện số phiên bản là thành công

### Git (bắt buộc để deploy)
- Tải tại: https://git-scm.com/downloads
- Cài đặt bình thường, giữ mặc định
- Kiểm tra: gõ `git --version` → hiện số phiên bản là thành công

---

## 2. Chạy Trên Máy Tính (Local)

### Bước 1 — Giải nén project
Giải nén file zip bạn nhận được vào một thư mục, ví dụ `C:\restaurant_app` (Windows) hoặc `~/restaurant_app` (Mac/Linux).

### Bước 2 — Mở Terminal trong thư mục project

**Windows:** Mở thư mục trong File Explorer → nhấp chuột phải → "Open in Terminal" (hoặc "Git Bash Here")

**Mac:** Mở Terminal → gõ `cd ` (có dấu cách) → kéo thư mục project vào Terminal → nhấn Enter

### Bước 3 — Cài dependencies
```bash
npm install
```
Chờ khoảng 1-2 phút. Thấy `added X packages` là xong.

### Bước 4 — Chạy app
```bash
npm run dev
```
Mở trình duyệt, vào địa chỉ: **http://localhost:5173**

✅ Thấy trang Landing Page với 4 role là thành công!

### Dừng app
Nhấn `Ctrl + C` trong Terminal.

---

## 3. Deploy Lên Vercel (Miễn Phí, Dễ Nhất)

Vercel là nền tảng hosting miễn phí, phù hợp nhất cho app React. Sau khi deploy, bạn có 1 URL để chia sẻ cho mọi người.

### Bước 1 — Tạo tài khoản GitHub
Vào https://github.com → Sign up (nếu chưa có)

### Bước 2 — Tạo repo trên GitHub
1. Đăng nhập GitHub → click nút **"New"** (màu xanh lá) ở trang chủ
2. Đặt tên repo, ví dụ `restaurant-app`
3. Chọn **Private** nếu muốn giữ bí mật
4. Click **"Create repository"**

### Bước 3 — Upload code lên GitHub
Mở Terminal trong thư mục project, chạy lần lượt từng lệnh:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TÊN_BẠN/restaurant-app.git
git push -u origin main
```
> ⚠️ Thay `TÊN_BẠN` bằng username GitHub của bạn.

Nếu hỏi username/password GitHub → nhập vào.

### Bước 4 — Deploy lên Vercel
1. Vào https://vercel.com → **Sign Up** bằng tài khoản GitHub
2. Click **"Add New Project"**
3. Chọn repo `restaurant-app` vừa tạo → click **"Import"**
4. Vercel tự phát hiện đây là Vite app → giữ mặc định tất cả
5. Click **"Deploy"**

Chờ khoảng 1-2 phút. Vercel sẽ cho bạn 1 URL dạng: `https://restaurant-app-xxx.vercel.app`

✅ Chia sẻ URL đó là mọi người có thể dùng ngay trên điện thoại lẫn máy tính!

### Cập nhật sau này
Mỗi khi bạn sửa code, chỉ cần chạy:
```bash
git add .
git commit -m "mô tả thay đổi"
git push
```
Vercel tự động deploy lại trong vòng 1-2 phút.

---

## 4. Deploy Lên Netlify (Miễn Phí)

Cách đơn giản hơn nếu không muốn dùng GitHub.

### Cách 1 — Kéo thả (cực đơn giản)
1. Chạy lệnh build trong Terminal:
   ```bash
   npm run build
   ```
   Sẽ tạo ra thư mục `dist/` trong project.

2. Vào https://app.netlify.com → Sign up (dùng email là được)
3. Kéo thả thư mục **`dist`** vào vùng trống trên trang Netlify
4. Netlify tự upload và cho bạn URL ngay lập tức!

5. ⚠️ Thêm file `_redirects` vào thư mục `dist` với nội dung:
   ```
   /*    /index.html   200
   ```
   (Để tránh lỗi 404 khi reload trang)

### Cách 2 — Kết nối GitHub (tự động deploy)
Tương tự Vercel: sign up → "New site from Git" → chọn repo → Build command: `npm run build` → Publish directory: `dist` → Deploy.

---

## 5. Các Trang Trong App

Sau khi chạy app, vào **http://localhost:5173** sẽ thấy Landing Page với các link:

| Đường dẫn | Giao diện | Dành cho |
|---|---|---|
| `/` | Landing Page | Tổng quan, link đến tất cả màn hình |
| `/customer` | Menu đặt món | Khách hàng (mobile) |
| `/customer/cart` | Giỏ hàng | Khách hàng |
| `/customer/confirm` | Xác nhận đơn | Khách hàng |
| `/customer/status` | Trạng thái đơn | Khách hàng |
| `/customer/payment` | Thanh toán | Khách hàng |
| `/kitchen` | Dashboard bếp | Nhân viên bếp (desktop) |
| `/admin/menu` | Quản lý món ăn | Admin (desktop) |
| `/admin/tables` | Quản lý bàn + QR | Admin (desktop) |
| `/admin/orders` | Quản lý đơn | Admin (desktop) |
| `/inventory/alerts` | Cảnh báo tồn kho | Nhân viên kho |
| `/inventory/ingredients` | Danh sách nguyên liệu | Nhân viên kho |
| `/inventory/restock` | Nhập hàng | Nhân viên kho |

> **Lưu ý:** Đây là **bản demo frontend** — tất cả dữ liệu là mock (giả lập). Không có backend thật. Đơn hàng, tồn kho sẽ reset khi reload trang.

---

## 6. Cấu Trúc File

```
restaurant_app/
├── src/
│   └── app/
│       ├── data/
│       │   └── mockData.ts        ← Dữ liệu giả (menu, bàn, nguyên liệu)
│       ├── context/
│       │   └── AppContext.tsx     ← Quản lý state toàn app (giỏ hàng, đơn)
│       ├── pages/
│       │   ├── LandingPage.tsx    ← Trang chủ
│       │   ├── customer/          ← 5 màn hình khách hàng
│       │   ├── kitchen/           ← Dashboard bếp
│       │   ├── admin/             ← 3 màn hình admin
│       │   └── inventory/         ← 3 màn hình kho
│       └── routes.tsx             ← Định nghĩa URL routing
├── package.json                   ← Danh sách thư viện
├── vite.config.ts                 ← Cấu hình build
└── README.md                      ← File này
```

---

## 7. Tuỳ Chỉnh Dữ Liệu

Tất cả dữ liệu giả nằm trong file: `src/app/data/mockData.ts`

### Thay đổi tên nhà hàng
Tìm trong file `src/app/pages/customer/MenuPage.tsx`:
```
🍜 Nhà hàng Phố Việt
```
Thay bằng tên nhà hàng của bạn.

### Thêm/sửa món ăn
Mở `src/app/data/mockData.ts`, tìm mảng `MENU_ITEMS` và thêm món:
```typescript
{
  id: 'm99',                        // ID duy nhất, không trùng
  name: 'Tên món',
  description: 'Mô tả món',
  price: 80000,                     // Giá tính bằng VND
  category: 'Món chính',            // Khai vị / Món chính / Tráng miệng / Đồ uống
  image: 'https://...',             // URL ảnh từ Unsplash hoặc link ảnh trực tiếp
  isAvailable: true,
  ingredients: ['Nguyên liệu 1', 'Nguyên liệu 2'],
},
```

### Thay ảnh món ăn
Dùng ảnh từ [Unsplash](https://unsplash.com) — tìm ảnh → nhấp chuột phải → "Copy image address" → dán vào trường `image`.

---

## 8. Câu Hỏi Thường Gặp

**Q: Reload trang thì mất giỏ hàng?**
A: Đúng. Đây là bản demo, giỏ hàng lưu trong RAM (React state). Cần backend thật để lưu persistent.

**Q: Làm sao mở trên điện thoại khi chạy local?**
A: Tìm IP máy tính (Windows: `ipconfig` | Mac: `ifconfig`), rồi vào `http://IP_MÁY:5173` trên điện thoại. Điện thoại và máy tính phải cùng WiFi.

**Q: Deploy xong URL dài quá, có tên miền riêng không?**
A: Vercel/Netlify cho phép mua và gắn tên miền riêng. Hoặc đổi subdomain miễn phí trong Settings của Vercel/Netlify.

**Q: Lỗi `npm install` thất bại?**
A: Thử: `npm install --legacy-peer-deps`

**Q: Build lỗi trên Vercel?**
A: Vào Vercel → Settings → Environment Variables → thêm `NODE_VERSION` = `20`

**Q: Muốn có backend thật (lưu dữ liệu thật)?**
A: Cần phát triển thêm backend Flask/Node theo tài liệu phân tích thiết kế kèm theo. Frontend này đã sẵn sàng kết nối API.

---

## 🛠 Scripts

```bash
npm run dev      # Chạy development server (http://localhost:5173)
npm run build    # Build ra thư mục dist/ để deploy
npm run preview  # Preview bản build trên máy local
```

---

## 📦 Công Nghệ Sử Dụng

- **React 18** — UI framework
- **React Router 7** — Điều hướng trang
- **Vite 6** — Build tool
- **Tailwind CSS 4** — Styling
- **Lucide React** — Icon set
- **Radix UI** — Component primitives

---

*Được tạo từ tài liệu thiết kế RestaurantApp v1.0*
