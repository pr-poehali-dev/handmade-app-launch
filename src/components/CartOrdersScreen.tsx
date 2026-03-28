import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRODUCTS, ORDERS } from "@/data";

// ─── CartScreen ───────────────────────────────────────────────────────────────

export function CartScreen({ cart, onRemoveFromCart }: { cart: number[]; onRemoveFromCart: (id: number) => void }) {
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

// ─── OrdersScreen ─────────────────────────────────────────────────────────────

export function OrdersScreen() {
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
