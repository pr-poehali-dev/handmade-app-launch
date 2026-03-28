import Icon from "@/components/ui/icon";
import { MASTER_ORDERS, MASTER_STATS } from "@/data/masterData";

export function MasterDashboard() {
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
          { label: "Заказов",    value: MASTER_STATS.orders, sub: `${MASTER_STATS.ordersNew} новый`,        icon: "Package", color: "text-orange-400" },
          { label: "Просмотров", value: MASTER_STATS.views,  sub: MASTER_STATS.viewsGrowth,                  icon: "Eye",     color: "text-purple-400" },
          { label: "Рейтинг",   value: MASTER_STATS.rating, sub: `${MASTER_STATS.reviews} отзывов`,         icon: "Star",    color: "text-yellow-400" },
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
