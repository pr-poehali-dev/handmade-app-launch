export type MasterTab = "dashboard" | "works" | "orders" | "chat" | "profile";

export const MASTER_WORKS = [
  {
    id: 1,
    name: "Ваза «Лесная Фея»",
    price: 3200,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/153b73ab-ed24-41ee-96f8-199160754bbc.jpg",
    category: "Керамика",
    status: "published" as "published" | "draft",
    views: 284,
    likes: 42,
    sold: 7,
  },
  {
    id: 2,
    name: "Чаша «Морской бриз»",
    price: 1800,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/6a9a145c-47c7-4868-8335-a06ff341718e.jpg",
    category: "Керамика",
    status: "published" as "published" | "draft",
    views: 156,
    likes: 28,
    sold: 4,
  },
  {
    id: 3,
    name: "Кружка «Утро»",
    price: 950,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/9d640e38-52bd-4fe9-a8eb-136d2ce1a5e3.jpg",
    category: "Керамика",
    status: "draft" as "published" | "draft",
    views: 0,
    likes: 0,
    sold: 0,
  },
];

export const MASTER_ORDERS = [
  {
    id: "#B1024",
    date: "27 марта 2026",
    buyer: "Алексей М.",
    buyerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey&backgroundColor=blue",
    item: "Ваза «Лесная Фея»",
    price: 3200,
    status: "new" as "new" | "in_work" | "sent" | "done",
    address: "Москва, ул. Ленина 12, кв. 45",
  },
  {
    id: "#B0987",
    date: "22 марта 2026",
    buyer: "Мария К.",
    buyerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=green",
    item: "Чаша «Морской бриз»",
    price: 1800,
    status: "sent" as "new" | "in_work" | "sent" | "done",
    address: "СПб, Невский пр. 87, кв. 12",
  },
  {
    id: "#B0934",
    date: "14 марта 2026",
    buyer: "Ольга П.",
    buyerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga&backgroundColor=pink",
    item: "Ваза «Лесная Фея»",
    price: 3200,
    status: "done" as "new" | "in_work" | "sent" | "done",
    address: "Казань, ул. Пушкина 3, кв. 8",
  },
];

export const MASTER_MESSAGES = [
  {
    id: 1,
    buyer: "Алексей М.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey&backgroundColor=blue",
    lastMsg: "Можно ли сделать вазу в голубом цвете?",
    time: "14:28",
    unread: 1,
  },
  {
    id: 2,
    buyer: "Мария К.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=green",
    lastMsg: "Спасибо, всё получила! Очень красиво 🎉",
    time: "Вчера",
    unread: 0,
  },
];

export const MASTER_CHAT = [
  { id: 1, fromBuyer: true, text: "Добрый день! Хочу заказать вазу.", time: "14:10" },
  { id: 2, fromBuyer: false, text: "Здравствуйте! Конечно, расскажите подробнее.", time: "14:15" },
  { id: 3, fromBuyer: true, text: "Можно ли сделать вазу в голубом цвете?", time: "14:28" },
];

export const MASTER_STATS = {
  revenue: 58400,
  revenueGrowth: "+18%",
  orders: 11,
  ordersNew: 1,
  views: 1240,
  viewsGrowth: "+32%",
  rating: 4.9,
  reviews: 128,
};
