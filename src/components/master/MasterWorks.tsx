import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MASTER_WORKS } from "@/data/masterData";

export function MasterWorks() {
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
