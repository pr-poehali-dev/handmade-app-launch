import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MESSAGES, CHAT_MESSAGES } from "@/data";

// ─── ChatScreen ───────────────────────────────────────────────────────────────

export function ChatScreen() {
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

// ─── ProfileScreen ────────────────────────────────────────────────────────────

export function ProfileScreen() {
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
