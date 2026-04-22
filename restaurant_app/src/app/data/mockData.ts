export type Category = 'Tất cả' | 'Khai vị' | 'Món chính' | 'Tráng miệng' | 'Đồ uống';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, 'Tất cả'>;
  image: string;
  isAvailable: boolean;
  ingredients: string[];
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'served' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  image: string;
}

export interface Order {
  id: string;
  tableId: string;
  tableName: string;
  items: OrderItem[];
  note: string;
  createdAt: Date;
  total: number;
}

export interface Table {
  id: string;
  name: string;
  status: 'empty' | 'occupied' | 'waiting';
  capacity: number;
  currentGuests?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  stock: number;
  threshold: number;
  affectedDishes: string[];
}

export interface RestockLog {
  id: string;
  ingredientName: string;
  quantity: number;
  note: string;
  staffName: string;
  createdAt: Date;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Phở Bò Tái',
    description: 'Phở bò truyền thống với thịt bò tái, nước dùng đậm đà',
    price: 75000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Bánh phở', 'Thịt bò', 'Hành lá', 'Gừng'],
  },
  {
    id: 'm2',
    name: 'Cơm Gà Nướng',
    description: 'Cơm trắng với gà nướng mật ong, kèm rau sống và nước chấm',
    price: 85000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1766050587783-1c90751275dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Gà', 'Cơm', 'Mật ong', 'Rau sống'],
  },
  {
    id: 'm3',
    name: 'Chả Giò Tôm',
    description: 'Chả giò nhân tôm giòn rụm, chấm với nước mắm chua ngọt',
    price: 55000,
    category: 'Khai vị',
    image: 'https://images.unsplash.com/photo-1776178393305-be4c1097fae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Tôm', 'Bánh tráng', 'Cà rốt', 'Miến'],
  },
  {
    id: 'm4',
    name: 'Bánh Mì Thịt Nướng',
    description: 'Bánh mì giòn rụm với thịt nướng, pate, rau thơm',
    price: 40000,
    category: 'Khai vị',
    image: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: false,
    ingredients: ['Bánh mì', 'Thịt heo', 'Pate', 'Rau thơm'],
  },
  {
    id: 'm5',
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê phin truyền thống với sữa đặc và đá viên',
    price: 30000,
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1767322248580-bfebe7eb9b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Cà phê', 'Sữa đặc', 'Đá'],
  },
  {
    id: 'm6',
    name: 'Bò Xào Lúc Lắc',
    description: 'Bò xào với ớt chuông, hành tây, sốt oyster đậm vị',
    price: 110000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1774668770914-2a37b84c3ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Thịt bò', 'Ớt chuông', 'Hành tây', 'Sốt oyster'],
  },
  {
    id: 'm7',
    name: 'Xôi Xoài',
    description: 'Xôi nếp dẻo thơm với xoài chín, nước cốt dừa béo ngậy',
    price: 45000,
    category: 'Tráng miệng',
    image: 'https://images.unsplash.com/photo-1664155941358-2f50e4672430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Gạo nếp', 'Xoài', 'Nước cốt dừa', 'Đường'],
  },
  {
    id: 'm8',
    name: 'Nước Ép Trái Cây',
    description: 'Hỗn hợp trái cây tươi xay nguyên chất, không đường',
    price: 35000,
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    isAvailable: true,
    ingredients: ['Cam', 'Dứa', 'Dưa hấu'],
  },
];

export const TABLES: Table[] = [
  { id: 't1', name: 'Bàn 01', status: 'occupied', capacity: 4, currentGuests: 2 },
  { id: 't2', name: 'Bàn 02', status: 'empty', capacity: 2 },
  { id: 't3', name: 'Bàn 03', status: 'waiting', capacity: 6, currentGuests: 4 },
  { id: 't4', name: 'Bàn 04', status: 'empty', capacity: 4 },
  { id: 't5', name: 'Bàn 05', status: 'occupied', capacity: 2, currentGuests: 2 },
  { id: 't6', name: 'Bàn 06', status: 'empty', capacity: 8 },
  { id: 't7', name: 'Bàn 07', status: 'occupied', capacity: 4, currentGuests: 3 },
  { id: 't8', name: 'Bàn 08', status: 'empty', capacity: 2 },
];

export const ADMIN_ORDERS: Order[] = [
  {
    id: '#ORD-001',
    tableId: 't1',
    tableName: 'Bàn 01',
    items: [
      { id: 'oi1', name: 'Phở Bò Tái', quantity: 2, price: 75000, status: 'served', image: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
      { id: 'oi2', name: 'Cà Phê Sữa Đá', quantity: 2, price: 30000, status: 'served', image: 'https://images.unsplash.com/photo-1767322248580-bfebe7eb9b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
    ],
    note: 'Ít đường, không đá',
    createdAt: new Date(Date.now() - 3600000),
    total: 210000,
  },
  {
    id: '#ORD-002',
    tableId: 't3',
    tableName: 'Bàn 03',
    items: [
      { id: 'oi3', name: 'Cơm Gà Nướng', quantity: 3, price: 85000, status: 'confirmed', image: 'https://images.unsplash.com/photo-1766050587783-1c90751275dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
      { id: 'oi4', name: 'Bò Xào Lúc Lắc', quantity: 1, price: 110000, status: 'pending', image: 'https://images.unsplash.com/photo-1774668770914-2a37b84c3ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
      { id: 'oi5', name: 'Nước Ép Trái Cây', quantity: 4, price: 35000, status: 'ready', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
    ],
    note: '',
    createdAt: new Date(Date.now() - 900000),
    total: 505000,
  },
  {
    id: '#ORD-003',
    tableId: 't5',
    tableName: 'Bàn 05',
    items: [
      { id: 'oi6', name: 'Chả Giò Tôm', quantity: 2, price: 55000, status: 'pending', image: 'https://images.unsplash.com/photo-1776178393305-be4c1097fae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
    ],
    note: 'Không hành',
    createdAt: new Date(Date.now() - 300000),
    total: 110000,
  },
  {
    id: '#ORD-004',
    tableId: 't7',
    tableName: 'Bàn 07',
    items: [
      { id: 'oi7', name: 'Phở Bò Tái', quantity: 1, price: 75000, status: 'ready', image: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
      { id: 'oi8', name: 'Xôi Xoài', quantity: 2, price: 45000, status: 'confirmed', image: 'https://images.unsplash.com/photo-1664155941358-2f50e4672430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' },
    ],
    note: '',
    createdAt: new Date(Date.now() - 1800000),
    total: 165000,
  },
];

export const INGREDIENTS: Ingredient[] = [
  { id: 'i1', name: 'Thịt bò', unit: 'kg', stock: 2.5, threshold: 5, affectedDishes: ['Phở Bò Tái', 'Bò Xào Lúc Lắc'] },
  { id: 'i2', name: 'Bánh phở', unit: 'kg', stock: 8, threshold: 10, affectedDishes: ['Phở Bò Tái'] },
  { id: 'i3', name: 'Gà', unit: 'kg', stock: 12, threshold: 8, affectedDishes: ['Cơm Gà Nướng'] },
  { id: 'i4', name: 'Tôm', unit: 'kg', stock: 1, threshold: 3, affectedDishes: ['Chả Giò Tôm'] },
  { id: 'i5', name: 'Cà phê', unit: 'kg', stock: 0.5, threshold: 2, affectedDishes: ['Cà Phê Sữa Đá'] },
  { id: 'i6', name: 'Xoài', unit: 'kg', stock: 15, threshold: 5, affectedDishes: ['Xôi Xoài', 'Nước Ép Trái Cây'] },
  { id: 'i7', name: 'Gạo nếp', unit: 'kg', stock: 10, threshold: 5, affectedDishes: ['Xôi Xoài'] },
  { id: 'i8', name: 'Sữa đặc', unit: 'lon', stock: 3, threshold: 10, affectedDishes: ['Cà Phê Sữa Đá'] },
];

export const RESTOCK_LOGS: RestockLog[] = [
  { id: 'r1', ingredientName: 'Thịt bò', quantity: 10, note: 'Nhà cung cấp ABC', staffName: 'Nguyễn Văn A', createdAt: new Date(Date.now() - 86400000) },
  { id: 'r2', ingredientName: 'Bánh phở', quantity: 20, note: 'Lô hàng sáng', staffName: 'Trần Thị B', createdAt: new Date(Date.now() - 172800000) },
  { id: 'r3', ingredientName: 'Cà phê', quantity: 5, note: 'Rang xay mới', staffName: 'Nguyễn Văn A', createdAt: new Date(Date.now() - 259200000) },
  { id: 'r4', ingredientName: 'Tôm', quantity: 8, note: 'Tôm tươi sáng hôm nay', staffName: 'Lê Văn C', createdAt: new Date(Date.now() - 3600000) },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const formatTime = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} giờ trước`;
};
