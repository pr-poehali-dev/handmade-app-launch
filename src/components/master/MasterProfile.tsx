import Icon from "@/components/ui/icon";
import { MASTER_WORKS, MASTER_STATS } from "@/data/masterData";

export function MasterProfile() {
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
            { label: "Работ",   value: MASTER_WORKS.length },
            { label: "Продано", value: MASTER_WORKS.reduce((s, w) => s + w.sold, 0) },
            { label: "Отзывов", value: MASTER_STATS.reviews },
            { label: "Рейтинг", value: MASTER_STATS.rating },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
              <p className="text-base font-bold gradient-text">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { icon: "CreditCard", label: "Выплаты",    sub: "Карта **** 4521" },
            { icon: "BarChart2",  label: "Аналитика",  sub: "Статистика продаж" },
            { icon: "Tag",        label: "Промокоды",  sub: "Создать скидку" },
            { icon: "HelpCircle", label: "Помощь",     sub: "Центр поддержки" },
            { icon: "Settings",   label: "Настройки",  sub: "" },
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
