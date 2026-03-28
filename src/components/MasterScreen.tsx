import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type MasterTab, MASTER_ORDERS, MASTER_MESSAGES } from "@/data/masterData";
import { MasterDashboard } from "@/components/master/MasterDashboard";
import { MasterWorks } from "@/components/master/MasterWorks";
import { MasterOrders, MasterChat } from "@/components/master/MasterOrdersChat";
import { MasterProfile } from "@/components/master/MasterProfile";

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
