import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MASTER_ORDERS, MASTER_MESSAGES, MASTER_CHAT } from "@/data/masterData";

// ─── Shared helper ────────────────────────────────────────────────────────────

const ORDER_STATUS_LABELS: Record<string, { label: string; color: string; next: string; nextLabel: string }> = {
  new:     { label: "Новый",      color: "text-orange-400", next: "in_work", nextLabel: "Взять в работу" },
  in_work: { label: "В работе",   color: "text-yellow-400", next: "sent",    nextLabel: "Отметить отправленным" },
  sent:    { label: "Отправлен",  color: "text-blue-400",   next: "done",    nextLabel: "Завершить" },
  done:    { label: "Выполнен",   color: "text-teal-400",   next: "",        nextLabel: "" },
};

// ─── MasterOrders ─────────────────────────────────────────────────────────────

export function MasterOrders() {
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
            { key: "all",     label: "Все" },
            { key: "new",     label: "Новые" },
            { key: "in_work", label: "В работе" },
            { key: "sent",    label: "Отправлен" },
            { key: "done",    label: "Выполнен" },
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

// ─── MasterChat ───────────────────────────────────────────────────────────────

export function MasterChat() {
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
