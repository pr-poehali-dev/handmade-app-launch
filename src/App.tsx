import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Tab } from "@/data";
import { CatalogScreen, FavoritesScreen } from "@/components/CatalogScreen";
import { CartScreen, OrdersScreen } from "@/components/CartOrdersScreen";
import { ChatScreen, ProfileScreen } from "@/components/ChatProfileScreen";
import { MasterApp } from "@/components/MasterScreen";

type AppMode = "buyer" | "master";

export default function App() {
  const [mode, setMode] = useState<AppMode>("buyer");
  const [tab, setTab] = useState<Tab>("catalog");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const toggleFavorite = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const addToCart = (id: number) =>
    setCart(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const removeFromCart = (id: number) =>
    setCart(c => c.filter(x => x !== id));

  // ── Master mode ──────────────────────────────────────────────────────────
  if (mode === "master") {
    return <MasterApp onSwitchMode={() => setMode("buyer")} />;
  }

  // ── Buyer mode ───────────────────────────────────────────────────────────
  const NAV_ITEMS: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: "catalog",   icon: "LayoutGrid",    label: "Каталог" },
    { key: "favorites", icon: "Heart",         label: "Избранное", badge: favorites.length || undefined },
    { key: "cart",      icon: "ShoppingBag",   label: "Корзина",   badge: cart.length || undefined },
    { key: "orders",    icon: "Package",       label: "Заказы" },
    { key: "chat",      icon: "MessageCircle", label: "Чат",       badge: 2 },
    { key: "profile",   icon: "User",          label: "Профиль" },
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
              onClick={() => setMode("master")}
              className="flex items-center gap-1.5 glass rounded-full px-3 py-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Icon name="Palette" size={11} />
              Я мастер
            </button>
            <div className="flex gap-0.5 items-end">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-1 rounded-sm bg-foreground/60" style={{ height: `${4 + i * 2}px` }} />
              ))}
            </div>
            <Icon name="Wifi" size={12} className="text-foreground/60" />
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
