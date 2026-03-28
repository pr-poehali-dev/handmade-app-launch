import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = ["Все", "Керамика", "Украшения", "Текстиль", "Кожа", "Дерево", "Вязание"];

const MASTERS = [
  { id: 1, name: "Анна Кузнецова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=orange", category: "Керамика", rating: 4.9, reviews: 128, city: "Москва", verified: true },
  { id: 2, name: "Марина Петрова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina&backgroundColor=purple", category: "Украшения", rating: 4.8, reviews: 94, city: "СПб", verified: true },
  { id: 3, name: "Елена Смирнова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=teal", category: "Вязание", rating: 4.7, reviews: 67, city: "Казань", verified: false },
  { id: 4, name: "Дарья Иванова", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darya&backgroundColor=pink", category: "Текстиль", rating: 5.0, reviews: 203, city: "Москва", verified: true },
];

const PRODUCTS = [
  {
    id: 1, masterId: 1,
    name: "Ваза «Лесная Фея»",
    price: 3200, oldPrice: 4000,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/153b73ab-ed24-41ee-96f8-199160754bbc.jpg",
    category: "Керамика", rating: 4.9, reviews: 42,
    master: "Анна Кузнецова", badge: "Хит",
    badgeColor: "from-orange-500 to-pink-500"
  },
  {
    id: 2, masterId: 2,
    name: "Макраме «Бохо»",
    price: 2800, oldPrice: null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/fc842888-37b7-419b-961c-f236c158f22b.jpg",
    category: "Текстиль", rating: 4.8, reviews: 28,
    master: "Марина Петрова", badge: "Новинка",
    badgeColor: "from-purple-500 to-blue-500"
  },
  {
    id: 3, masterId: 4,
    name: "Кошелёк «Vintage»",
    price: 1900, oldPrice: 2400,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/58298735-f968-4f81-a071-6fd9513cbc0a.jpg",
    category: "Кожа", rating: 4.7, reviews: 15,
    master: "Дарья Иванова", badge: null,
    badgeColor: ""
  },
  {
    id: 4, masterId: 3,
    name: "Свитер «Колорит»",
    price: 5600, oldPrice: null,
    image: "https://cdn.poehali.dev/projects/01db9260-f55d-4994-943f-8e4cc4a47b61/files/4b9fcf85-0326-4184-b0f0-017d9892dfae.jpg",
    category: "Вязание", rating: 5.0, reviews: 31,
    master: "Елена Смирнова", badge: "Топ мастер",
    badgeColor: "from-teal-500 to-green-500"
  },
];

const ORDERS = [
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

const MESSAGES = [
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

const CHAT_MESSAGES = [
  { id: 1, fromMaster: true, text: "Здравствуйте! Меня зовут Анна. Чем могу помочь?", time: "14:10" },
  { id: 2, fromMaster: false, text: "Привет! Можно заказать вазу, но в голубом цвете?", time: "14:28" },
  { id: 3, fromMaster: true, text: "Конечно, могу сделать в голубом цвете! Срок — около 7 дней.", time: "14:32" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "catalog" | "favorites" | "cart" | "orders" | "chat" | "profile";

// ─── Small Components ────────────────────────────────────────────────────────

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size }} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"}>★</span>
      ))}
    </div>
  );
}

function ProductBadge({ text, colorClass }: { text: string; colorClass: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${colorClass}`}>
      {text}
    </span>
  );
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function CatalogScreen({ favorites, onToggleFavorite, onAddToCart, cart }: {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
  cart: number[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p =>
    (selectedCategory === "Все" || p.category === selectedCategory) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.master.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="relative overflow-hidden px-4 pt-4 pb-6 mesh-bg">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, hsl(24,100%,58%), transparent)" }} />
        <p className="text-muted-foreground text-sm mb-1">Доброго утра! 👋</p>
        <h1 className="text-2xl font-bold mb-1">
          Найди что-то <span className="gradient-text font-caveat text-3xl">особенное</span>
        </h1>
        <p className="text-muted-foreground text-sm">4 800+ работ от 320 мастеров</p>
      </div>

      <div className="px-4 -mt-3 mb-4">
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по работам и мастерам..."
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Icon name="SlidersHorizontal" size={18} className="text-primary" />
        </div>
      </div>

      <div className="overflow-x-auto px-4 mb-5">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground glow-orange"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mb-5">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Топ мастера</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-3 w-max">
            {MASTERS.map(m => (
              <div key={m.id} className="glass-card rounded-2xl p-3 w-28 flex flex-col items-center text-center card-hover cursor-pointer">
                <div className="relative mb-2">
                  <img src={m.avatar} className="w-12 h-12 rounded-full" alt={m.name} />
                  {m.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={9} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold leading-tight">{m.name.split(" ")[0]}</p>
                <p className="text-[10px] text-muted-foreground">{m.category}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-[10px]">★</span>
                  <span className="text-[10px] font-medium">{m.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Работы <span className="text-muted-foreground text-sm">({filtered.length})</span></h2>
          <button className="text-primary text-sm font-medium">Сортировка</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p, i) => {
            const inCart = cart.includes(p.id);
            const isFav = favorites.includes(p.id);
            return (
              <div key={p.id} className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover" />
                  {p.badge && (
                    <div className="absolute top-2 left-2">
                      <ProductBadge text={p.badge} colorClass={p.badgeColor} />
                    </div>
                  )}
                  <button
                    onClick={() => onToggleFavorite(p.id)}
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isFav ? "bg-pink-500 text-white scale-110" : "glass text-muted-foreground"
                    }`}
                  >
                    <Icon name="Heart" size={13} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{p.master}</p>
                  <p className="text-sm font-semibold leading-tight mb-1">{p.name}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={p.rating} />
                    <span className="text-[10px] text-muted-foreground">({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-primary">{p.price.toLocaleString()} ₽</span>
                      {p.oldPrice && (
                        <span className="text-[11px] text-muted-foreground line-through ml-1">{p.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(p.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        inCart ? "bg-teal-500 text-white" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <Icon name={inCart ? "Check" : "Plus"} size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted-foreground">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FavoritesScreen({ favorites, onToggleFavorite, onAddToCart, cart }: {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
  cart: number[];
}) {
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  return (
    <div className="animate-fade-in px-4 pt-6">
      <h1 className="text-xl font-bold mb-1">Избранное</h1>
      <p className="text-muted-foreground text-sm mb-5">{favProducts.length} {favProducts.length === 1 ? "работа" : "работ"}</p>
      {favProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-float inline-block">💝</div>
          <p className="font-semibold text-lg mb-2">Пока пусто</p>
          <p className="text-muted-foreground text-sm">Сохраняй понравившиеся работы,<br/>нажимая ♥ на карточке</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {favProducts.map(p => {
            const inCart = cart.includes(p.id);
            return (
              <div key={p.id} className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover" />
                  <button
                    onClick={() => onToggleFavorite(p.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center"
                  >
                    <Icon name="Heart" size={13} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{p.master}</p>
                  <p className="text-sm font-semibold mb-2">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{p.price.toLocaleString()} ₽</span>
                    <button
                      onClick={() => onAddToCart(p.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        inCart ? "bg-teal-500 text-white" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <Icon name={inCart ? "Check" : "ShoppingBag"} size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CartScreen({ cart, onRemoveFromCart }: { cart: number[]; onRemoveFromCart: (id: number) => void }) {
  const [payMethod, setPayMethod] = useState<"card" | "wallet" | "cash">("card");
  const cartProducts = PRODUCTS.filter(p => cart.includes(p.id));
  const total = cartProducts.reduce((s, p) => s + p.price, 0);
  const delivery = cartProducts.length > 0 ? 290 : 0;

  return (
    <div className="animate-fade-in px-4 pt-6">
      <h1 className="text-xl font-bold mb-1">Корзина</h1>
      <p className="text-muted-foreground text-sm mb-5">{cartProducts.length} {cartProducts.length === 1 ? "товар" : "товара"}</p>

      {cartProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-float inline-block">🛍️</div>
          <p className="font-semibold text-lg mb-2">Корзина пуста</p>
          <p className="text-muted-foreground text-sm">Добавляй понравившиеся работы<br/>из каталога</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            {cartProducts.map(p => (
              <div key={p.id} className="glass-card rounded-2xl p-3 flex gap-3">
                <img src={p.image} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" alt={p.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{p.master}</p>
                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                  <p className="text-primary font-bold mt-1">{p.price.toLocaleString()} ₽</p>
                </div>
                <button onClick={() => onRemoveFromCart(p.id)} className="text-muted-foreground hover:text-red-400 transition-colors self-start mt-1">
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-4 mb-5">
            <p className="font-semibold mb-3">Способ оплаты</p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: "card" as const, label: "Карта", icon: "CreditCard" },
                { key: "wallet" as const, label: "Кошелёк", icon: "Wallet" },
                { key: "cash" as const, label: "При получении", icon: "Banknote" },
              ]).map(m => (
                <button
                  key={m.key}
                  onClick={() => setPayMethod(m.key)}
                  className={`rounded-xl p-3 flex flex-col items-center gap-1 transition-all ${
                    payMethod === m.key
                      ? "bg-primary text-primary-foreground glow-orange"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={m.icon as Parameters<typeof Icon>[0]["name"]} size={18} />
                  <span className="text-[11px] font-medium leading-tight text-center">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 mb-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товары</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span>{delivery} ₽</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between font-bold">
              <span>Итого</span>
              <span className="text-primary">{(total + delivery).toLocaleString()} ₽</span>
            </div>
          </div>

          <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl glow-orange transition-all active:scale-95 text-base">
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
}

function OrdersScreen() {
  const [expanded, setExpanded] = useState<string | null>("#A3812");
  return (
    <div className="animate-fade-in px-4 pt-6">
      <h1 className="text-xl font-bold mb-1">Мои заказы</h1>
      <p className="text-muted-foreground text-sm mb-5">{ORDERS.length} заказа</p>
      <div className="space-y-3">
        {ORDERS.map(order => (
          <div key={order.id} className="glass-card rounded-2xl overflow-hidden">
            <button
              className="w-full p-4 flex items-start justify-between"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{order.id}</span>
                  <span className={`text-xs font-semibold ${order.statusColor}`}>{order.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{order.date}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{order.items.join(", ")}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary text-sm">{order.total.toLocaleString()} ₽</p>
                <Icon name={expanded === order.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground mt-1 ml-auto" />
              </div>
            </button>
            {expanded === order.id && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="h-px bg-border mb-4" />
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Статус доставки</span>
                    <span className="text-primary font-medium">{order.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${order.progress}%`,
                        background: order.progress === 100
                          ? "hsl(var(--brand-teal))"
                          : "linear-gradient(90deg, hsl(var(--brand-orange)), hsl(var(--brand-pink)))"
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-3">
                  {["Оплачен", "Собирается", "В пути", "Получен"].map((stage, i) => {
                    const threshold = [1, 33, 66, 100][i];
                    const done = order.progress >= threshold;
                    return (
                      <div key={stage} className="flex flex-col items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {done ? "✓" : i + 1}
                        </div>
                        <span className="text-[10px] text-muted-foreground text-center leading-tight">{stage}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground bg-muted rounded-xl px-3 py-2">{order.stage}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  if (activeChat !== null) {
    const chat = MESSAGES.find(m => m.id === activeChat)!;
    return (
      <div className="animate-fade-in flex flex-col" style={{ height: "calc(100vh - 80px)" }}>
        <div className="glass px-4 py-3 flex items-center gap-3">
          <button onClick={() => setActiveChat(null)} className="text-muted-foreground">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <img src={chat.avatar} className="w-9 h-9 rounded-full" alt={chat.master} />
          <div>
            <p className="font-semibold text-sm">{chat.master}</p>
            <p className="text-[11px] text-teal-400">Онлайн</p>
          </div>
          <button className="ml-auto text-muted-foreground"><Icon name="Phone" size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {CHAT_MESSAGES.map(msg => (
            <div key={msg.id} className={`flex ${msg.fromMaster ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.fromMaster
                  ? "glass-card rounded-tl-sm"
                  : "bg-primary text-primary-foreground rounded-tr-sm"
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.fromMaster ? "text-muted-foreground" : "text-primary-foreground/70"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 glass flex items-center gap-2">
          <div className="flex-1 glass-card rounded-2xl flex items-center px-4 py-2.5 gap-2">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Icon name="Smile" size={18} className="text-muted-foreground" />
          </div>
          <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center glow-orange">
            <Icon name="Send" size={16} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-6">
      <h1 className="text-xl font-bold mb-1">Сообщения</h1>
      <p className="text-muted-foreground text-sm mb-5">Чат с мастерами</p>
      <div className="space-y-2">
        {MESSAGES.map(chat => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover"
          >
            <div className="relative">
              <img src={chat.avatar} className="w-12 h-12 rounded-full" alt={chat.master} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{chat.master}</p>
              <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-muted-foreground">{chat.time}</span>
              {chat.unread > 0 && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="animate-fade-in">
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, hsl(24,100%,58%), hsl(330,90%,65%), hsl(280,70%,60%))"
        }} />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      </div>

      <div className="px-4 pb-6">
        <div className="relative -mt-10 mb-4 flex items-end justify-between">
          <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">А</span>
          </div>
          <button className="glass rounded-xl px-4 py-2 text-sm font-medium">Редактировать</button>
        </div>

        <h1 className="text-xl font-bold">Алексей Морозов</h1>
        <p className="text-muted-foreground text-sm mb-4">Покупатель · Москва</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Заказов", value: "12" },
            { label: "Избранных", value: "24" },
            { label: "Отзывов", value: "8" },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
              <p className="text-xl font-bold gradient-text">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { icon: "MapPin", label: "Адреса доставки", sub: "3 адреса" },
            { icon: "Bell", label: "Уведомления", sub: "Включены" },
            { icon: "Star", label: "Мои отзывы", sub: "8 отзывов" },
            { icon: "HelpCircle", label: "Помощь и поддержка", sub: "" },
            { icon: "Settings", label: "Настройки", sub: "" },
          ].map(item => (
            <button key={item.label} className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 card-hover">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={18} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{item.label}</p>
                {item.sub && <p className="text-xs text-muted-foreground">{item.sub}</p>}
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="w-full mt-4 glass rounded-2xl py-4 text-red-400 font-medium text-sm flex items-center justify-center gap-2">
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<Tab>("catalog");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const toggleFavorite = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const addToCart = (id: number) =>
    setCart(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const removeFromCart = (id: number) =>
    setCart(c => c.filter(x => x !== id));

  const NAV_ITEMS: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: "catalog", icon: "LayoutGrid", label: "Каталог" },
    { key: "favorites", icon: "Heart", label: "Избранное", badge: favorites.length || undefined },
    { key: "cart", icon: "ShoppingBag", label: "Корзина", badge: cart.length || undefined },
    { key: "orders", icon: "Package", label: "Заказы" },
    { key: "chat", icon: "MessageCircle", label: "Чат", badge: 2 },
    { key: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-background mesh-bg font-golos">
      <div className="max-w-sm mx-auto relative min-h-screen flex flex-col">

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-1 rounded-sm bg-foreground/60" style={{ height: `${4 + i * 2}px` }} />
              ))}
            </div>
            <Icon name="Wifi" size={12} className="text-foreground/60" />
            <div className="w-5 h-2.5 rounded-sm border border-foreground/60 relative ml-0.5">
              <div className="absolute inset-y-0.5 left-0.5 rounded-sm bg-foreground/60" style={{ width: "75%" }} />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {tab === "catalog" && (
            <CatalogScreen favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} cart={cart} />
          )}
          {tab === "favorites" && (
            <FavoritesScreen favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} cart={cart} />
          )}
          {tab === "cart" && (
            <CartScreen cart={cart} onRemoveFromCart={removeFromCart} />
          )}
          {tab === "orders" && <OrdersScreen />}
          {tab === "chat" && <ChatScreen />}
          {tab === "profile" && <ProfileScreen />}
        </div>

        {/* Bottom navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm glass border-t border-border/50 px-2 py-2 z-50">
          <div className="grid grid-cols-6 gap-0.5">
            {NAV_ITEMS.map(item => {
              const active = tab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className="relative flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl transition-all"
                >
                  {active && (
                    <div className="absolute inset-0 rounded-xl bg-primary/15" />
                  )}
                  <div className="relative">
                    <Icon
                      name={item.icon as Parameters<typeof Icon>[0]["name"]}
                      size={20}
                      className={`transition-all ${active ? "text-primary scale-110" : "text-muted-foreground"}`}
                    />
                    {item.badge ? (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className={`text-[9px] font-medium transition-all leading-none ${active ? "text-primary" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
