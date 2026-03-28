export const CATEGORIES = ["Все", "Керамика", "Украшения", "Текстиль", "Кожа", "Дерево", "Вязание"];

export const MASTERS = [
  { id: 1, name: "Анна Кузнецова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=orange", category: "Керамика", rating: 4.9, reviews: 128, city: "Москва", verified: true },
  { id: 2, name: "Марина Петрова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina&backgroundColor=purple", category: "Украшения", rating: 4.8, reviews: 94, city: "СПб", verified: true },
  { id: 3, name: "Елена Смирнова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=teal", category: "Вязание", rating: 4.7, reviews: 67, city: "Казань", verified: false },
  { id: 4, name: "Дарья Иванова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darya&backgroundColor=pink", category: "Текстиль", rating: 5.0, reviews: 203, city: "Москва", verified: true },
];

export const PRODUCTS = [
  {
    id: 1, masterId: 1,
    name: "Ваза «Лесная Фея»",
    price: 3200, oldPrice: 4000 as number | null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/153b73ab-ed24-41ee-96f8-199160754bbc.jpg",
    category: "Керамика", rating: 4.9, reviews: 42,
    master: "Анна Кузнецова", badge: "Хит" as string | null,
    badgeColor: "from-orange-500 to-pink-500"
  },
  {
    id: 2, masterId: 2,
    name: "Макраме «Бохо»",
    price: 2800, oldPrice: null as number | null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/fc842888-37b7-419b-961c-f236c158f22b.jpg",
    category: "Текстиль", rating: 4.8, reviews: 28,
    master: "Марина Петрова", badge: "Новинка" as string | null,
    badgeColor: "from-purple-500 to-blue-500"
  },
  {
    id: 3, masterId: 4,
    name: "Кошелёк «Vintage»",
    price: 1900, oldPrice: 2400 as number | null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/58298735-f968-4f81-a071-6fd9513cbc0a.jpg",
    category: "Кожа", rating: 4.7, reviews: 15,
    master: "Дарья Иванова", badge: null as string | null,
    badgeColor: ""
  },
  {
    id: 4, masterId: 3,
    name: "Свитер «Колорит»",
    price: 5600, oldPrice: null as number | null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/4b9fcf85-0326-4184-b0f0-017d9892dfae.jpg",
    category: "Вязание", rating: 5.0, reviews: 31,
    master: "Елена Смирнова", badge: "Топ мастер" as string | null,
    badgeColor: "from-teal-500 to-green-500"
  },
];

export const ORDERS = [
  {
    id: "#A3812", date: "24 марта 2026", status: "Доставляется",
    statusColor: "text-orange-400", items: ["Ваза «Лесная Фея»"], total: 3200,
    progress: 65, stage: "В пути · Ориентировочно 30 марта"
  },
  {
    id: "#A3756", date: "15 марта 2026", status: "Получен",
    statusColor: "text-teal-400", items: ["Кошелёк «Vintage»", "Макраме «Бохо»"], total: 4700,
    progress: 100, stage: "Получено 18 марта"
  },
  {
    id: "#A3690", date: "2 марта 2026", status: "Получен",
    statusColor: "text-teal-400", items: ["Свитер «Колорит»"], total: 5600,
    progress: 100, stage: "Получено 7 марта"
  },
];

export const MESSAGES = [
  {
    id: 1, master: "Анна Кузнецова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=orange",
    lastMsg: "Конечно, могу сделать в голубом цвете!", time: "14:32", unread: 2
  },
  {
    id: 2, master: "Марина Петрова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina&backgroundColor=purple",
    lastMsg: "Заказ отправлен, трек-номер прислала ✨", time: "Вчера", unread: 0
  },
  {
    id: 3, master: "Дарья Иванова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darya&backgroundColor=pink",
    lastMsg: "Добро пожаловать! Рада помочь.", time: "Пн", unread: 0
  },
];

export const CHAT_MESSAGES = [
  { id: 1, fromMaster: true, text: "Здравствуйте! Меня зовут Анна. Чем могу помочь?", time: "14:10" },
  { id: 2, fromMaster: false, text: "Привет! Можно заказать вазу, но в голубом цвете?", time: "14:28" },
  { id: 3, fromMaster: true, text: "Конечно, могу сделать в голубом цвете! Срок — около 7 дней.", time: "14:32" },
];

export type Tab = "catalog" | "favorites" | "cart" | "orders" | "chat" | "profile";
