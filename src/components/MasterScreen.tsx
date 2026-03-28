import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  type MasterTab,
  MASTER_WORKS,
  MASTER_ORDERS,
  MASTER_MESSAGES,
  MASTER_CHAT,
  MASTER_STATS,
} from "@/data/masterData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ORDER_STATUS_LABELS: Record<string, { label: string; color: string; next: string; nextLabel: string }> = {
  new:     { label: "Новый",      color: "text-orange-400",  next: "in_work", nextLabel: "Взять в работу" },
  in_work: { label: "В работе",   color: "text-yellow-400",  next: "sent",    nextLabel: "Отметить отправленным" },
  sent:    { label: "Отправлен",  color: "text-blue-400",    next: "done",    nextLabel: "Завершить" },
  done:    { label: "Выполнен",   color: "text-teal-400",    next: "",        nextLabel: "" },
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

function MasterDashboard() {
  return (
    <div className="animate-fade-in px-4 pt-4 pb-2">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-5 mb-5"
        style={{ background: "linear-gradient(135deg, hsl(280,70%,28%), hsl(24,100%,30%))" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, hsl(24,100%,58%), transparent)" }} />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-lg font-bold">А</span>
          </div>
          <div>
            <p className="font-bold text-white">Анна Кузнецова</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-white/80 text-xs">{MASTER_STATS.rating} · {MASTER_STATS.reviews} отзыва</span>
            </div>
          </div>
          <div className="ml-auto bg-white/20 rounded-xl px-3 py-1">
            <span className="text-white text-xs font-semibold">Мастер ✓</span>
          </div>
        </div>
        {/* Revenue */}
        <div>
          <p className="text-white/60 text-xs mb-0.5">Выручка за месяц</p>
          <div className="flex items-end gap-2">
            <p className="text-white text-3xl font-bold">{MASTER_STATS.revenue.toLocaleString()} ₽</p>
            <span className="text-teal-400 text-sm font-semibold mb-0.5">{MASTER_STATS.revenueGrowth}</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Заказов",   value: MASTER_STATS.orders,   sub: `${MASTER_STATS.ordersNew} новый`,    icon: "Package",     color: "text-orange-400" },
          { label: "Просмотров", value: MASTER_STATS.views,    sub: MASTER_STATS.viewsGrowth,              icon: "Eye",         color: "text-purple-400" },
          { label: "Рейтинг",   value: MASTER_STATS.rating,   sub: `${MASTER_STATS.reviews} отзывов`,    icon: "Star",        color: "text-yellow-400" },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-2xl p-3">
            <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={16} className={`${s.color} mb-2`} />
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
            <p className="text-[10px] text-teal-400 font-medium mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* New orders */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Новые заказы</h2>
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
            {MASTER_ORDERS.filter(o => o.status === "new").length} новых
          </span>
        </div>
        <div className="space-y-2">
          {MASTER_ORDERS.filter(o => o.status === "new").map(order => (
            <div key={order.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <img src={order.buyerAvatar} className="w-10 h-10 rounded-full" alt={order.buyer} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{order.buyer}</p>
                <p className="text-xs text-muted-foreground truncate">{order.item}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary text-sm">{order.price.toLocaleString()} ₽</p>
                <p className="text-[10px] text-orange-400 font-medium">Новый</p>
              </div>
            </div>
          ))}
          {MASTER_ORDERS.filter(o => o.status === "new").length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-4">Новых заказов нет</p>
          )}
        </div>
      </div>

      {/* Quick tips */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Lightbulb" size={16} className="text-yellow-400" />
          <p className="font-semibold text-sm">Совет</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Добавьте больше фото к работам — товары с 3+ фото продаются в 2 раза чаще.
        </p>
      </div>
    </div>
  );
}

// ─── Works ────────────────────────────────────────────────────────────────────

function MasterWorks() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="animate-fade-in px-4 pt-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Мои работы</h1>
          <p className="text-muted-foreground text-sm">{MASTER_WORKS.length} работы</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-semibold glow-orange"
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="glass-card rounded-2xl p-4 mb-5 animate-fade-in">
          <p className="font-semibold mb-3">Новая работа</p>
          <div className="space-y-3">
            <div className="border-2 border-dashed border-border rounded-xl h-28 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
              <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Загрузить фото</p>
            </div>
            <input placeholder="Название работы" className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground" />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="Цена, ₽" type="number" className="bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground" />
              <select className="bg-muted rounded-xl px-4 py-3 text-sm outline-none text-muted-foreground">
                <option>Категория</option>
                <option>Керамика</option>
                <option>Украшения</option>
                <option>Текстиль</option>
                <option>Кожа</option>
                <option>Дерево</option>
                <option>Вязание</option>
              </select>
            </div>
            <textarea placeholder="Описание работы..." rows={3}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground resize-none" />
            <div className="grid grid-cols-2 gap-2">
              <button className="glass rounded-xl py-3 text-sm font-medium" onClick={() => setShowAddForm(false)}>Отмена</button>
              <button className="bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold">Опубликовать</button>
            </div>
          </div>
        </div>
      )}

      {/* Works list */}
      <div className="space-y-3">
        {MASTER_WORKS.map(work => (
          <div key={work.id} className="glass-card rounded-2xl p-3 flex gap-3">
            <img src={work.image} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" alt={work.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-sm leading-tight">{work.name}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                  work.status === "published"
                    ? "bg-teal-500/20 text-teal-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {work.status === "published" ? "Опубликовано" : "Черновик"}
                </span>
              </div>
              <p className="text-primary font-bold text-sm mb-2">{work.price.toLocaleString()} ₽</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={11} />
                  {work.views}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Heart" size={11} />
                  {work.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ShoppingBag" size={11} />
                  {work.sold} продано
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <button className="w-8 h-8 glass rounded-xl flex items-center justify-center">
                <Icon name="Pencil" size={13} className="text-muted-foreground" />
              </button>
              <button className="w-8 h-8 glass rounded-xl flex items-center justify-center">
                <Icon name="Trash2" size={13} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Orders ───────────────────────────────────────────────────────────────────

function MasterOrders() {
  const [orders, setOrders] = useState(MASTER_ORDERS);
  const [expanded, setExpanded] = useState<string | null>("#B1024");

  const advanceStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = ORDER_STATUS_LABELS[o.status].next;
      if (!next) return o;
      return { ...o, status: next as typeof o.status };
    }));
  };

  return (
    <div className="animate-fade-in px-4 pt-6">
      <h1 className="text-xl font-bold mb-1">Заказы</h1>
      <p className="text-muted-foreground text-sm mb-5">{orders.length} заказа</p>

      {/* Status filter */}
      <div className="overflow-x-auto mb-5">
        <div className="flex gap-2 w-max">
          {[
            { key: "all", label: "Все" },
            { key: "new", label: "Новые" },
            { key: "in_work", label: "В работе" },
            { key: "sent", label: "Отправлен" },
            { key: "done", label: "Выполнен" },
          ].map(f => (
            <button key={f.key}
              className="px-4 py-2 rounded-full text-sm font-medium glass text-muted-foreground whitespace-nowrap hover:text-foreground transition-all">
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {orders.map(order => {
          const statusInfo = ORDER_STATUS_LABELS[order.status];
          return (
            <div key={order.id} className="glass-card rounded-2xl overflow-hidden">
              <button
                className="w-full p-4 flex items-start justify-between"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-3 text-left">
                  <img src={order.buyerAvatar} className="w-9 h-9 rounded-full flex-shrink-0" alt={order.buyer} />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm">{order.id}</span>
                      <span className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.buyer} · {order.date}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">{order.item}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary text-sm">{order.price.toLocaleString()} ₽</p>
                  <Icon name={expanded === order.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground mt-1 ml-auto" />
                </div>
              </button>

              {expanded === order.id && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="h-px bg-border mb-3" />
                  <div className="glass rounded-xl px-3 py-2 mb-3 flex items-start gap-2">
                    <Icon name="MapPin" size={13} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{order.address}</p>
                  </div>
                  {statusInfo.next && (
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold transition-all active:scale-95"
                    >
                      {statusInfo.nextLabel}
                    </button>
                  )}
                  {!statusInfo.next && (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <Icon name="CheckCircle2" size={16} className="text-teal-400" />
                      <span className="text-teal-400 text-sm font-medium">Заказ выполнен</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

function MasterChat() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  if (activeChat !== null) {
    const chat = MASTER_MESSAGES.find(m => m.id === activeChat)!;
    return (
      <div className="animate-fade-in flex flex-col" style={{ height: "calc(100vh - 80px)" }}>
        <div className="glass px-4 py-3 flex items-center gap-3">
          <button onClick={() => setActiveChat(null)} className="text-muted-foreground">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <img src={chat.avatar} className="w-9 h-9 rounded-full" alt={chat.buyer} />
          <div>
            <p className="font-semibold text-sm">{chat.buyer}</p>
            <p className="text-[11px] text-teal-400">Покупатель</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {MASTER_CHAT.map(msg => (
            <div key={msg.id} className={`flex ${msg.fromBuyer ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.fromBuyer
                  ? "glass-card rounded-tl-sm"
                  : "bg-primary text-primary-foreground rounded-tr-sm"
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.fromBuyer ? "text-muted-foreground" : "text-primary-foreground/70"}`}>{msg.time}</p>
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
      <p className="text-muted-foreground text-sm mb-5">Чат с покупателями</p>
      <div className="space-y-2">
        {MASTER_MESSAGES.map(chat => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover"
          >
            <div className="relative">
              <img src={chat.avatar} className="w-12 h-12 rounded-full" alt={chat.buyer} />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{chat.buyer}</p>
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

// ─── Master Profile ───────────────────────────────────────────────────────────

function MasterProfile() {
  return (
    <div className="animate-fade-in">
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(280,70%,28%), hsl(24,100%,38%), hsl(165,80%,25%))" }} />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      </div>
      <div className="px-4 pb-6">
        <div className="relative -mt-10 mb-4 flex items-end justify-between">
          <div className="w-20 h-20 rounded-full border-4 border-background bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">А</span>
          </div>
          <button className="glass rounded-xl px-4 py-2 text-sm font-medium">Редактировать</button>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold">Анна Кузнецова</h1>
          <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
            <Icon name="Check" size={11} className="text-white" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-1">Мастер керамики · Москва</p>
        <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
          Создаю уникальные керамические изделия ручной работы. Каждая вещь — это история.
        </p>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { label: "Работ",    value: MASTER_WORKS.length },
            { label: "Продано",  value: MASTER_WORKS.reduce((s, w) => s + w.sold, 0) },
            { label: "Отзывов",  value: MASTER_STATS.reviews },
            { label: "Рейтинг",  value: MASTER_STATS.rating },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
              <p className="text-base font-bold gradient-text">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { icon: "CreditCard", label: "Выплаты", sub: "Карта **** 4521" },
            { icon: "BarChart2",  label: "Аналитика", sub: "Статистика продаж" },
            { icon: "Tag",        label: "Промокоды", sub: "Создать скидку" },
            { icon: "HelpCircle", label: "Помощь",    sub: "Центр поддержки" },
            { icon: "Settings",   label: "Настройки", sub: "" },
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
      </div>
    </div>
  );
}

// ─── Master App Shell ─────────────────────────────────────────────────────────

export function MasterApp({ onSwitchMode }: { onSwitchMode: () => void }) {
  const [tab, setTab] = useState<MasterTab>("dashboard");

  const NAV: { key: MasterTab; icon: string; label: string; badge?: number }[] = [
    { key: "dashboard", icon: "LayoutDashboard", label: "Главная" },
    { key: "works",     icon: "ImageIcon",       label: "Работы" },
    { key: "orders",    icon: "Package",          label: "Заказы", badge: MASTER_ORDERS.filter(o => o.status === "new").length || undefined },
    { key: "chat",      icon: "MessageCircle",    label: "Чат",    badge: MASTER_MESSAGES.reduce((s, m) => s + m.unread, 0) || undefined },
    { key: "profile",   icon: "User",             label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-background mesh-bg font-golos">
      <div className="max-w-sm mx-auto relative min-h-screen flex flex-col">

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-medium">9:41</span>
          <div className="flex items-center gap-2">
            {/* Mode switcher */}
            <button
              onClick={onSwitchMode}
              className="flex items-center gap-1.5 glass rounded-full px-3 py-1 text-[11px] font-semibold text-primary"
            >
              <Icon name="ShoppingBag" size={11} />
              Покупатель
            </button>
            <div className="flex gap-0.5 items-end">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-1 rounded-sm bg-foreground/60" style={{ height: `${4 + i * 2}px` }} />
              ))}
            </div>
            <Icon name="Wifi" size={12} className="text-foreground/60" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {tab === "dashboard" && <MasterDashboard />}
          {tab === "works"     && <MasterWorks />}
          {tab === "orders"    && <MasterOrders />}
          {tab === "chat"      && <MasterChat />}
          {tab === "profile"   && <MasterProfile />}
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm glass border-t border-border/50 px-2 py-2 z-50">
          <div className="grid grid-cols-5 gap-0.5">
            {NAV.map(item => {
              const active = tab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className="relative flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl transition-all"
                >
                  {active && <div className="absolute inset-0 rounded-xl bg-primary/15" />}
                  <div className="relative">
                    <Icon
                      name={item.icon as Parameters<typeof Icon>[0]["name"]}
                      size={20}
                      className={`transition-all ${active ? "text-primary scale-110" : "text-muted-foreground"}`}
                    />
                    {item.badge ? (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                        {item.badge}
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
