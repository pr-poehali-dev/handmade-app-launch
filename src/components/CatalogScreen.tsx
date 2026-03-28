import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CATEGORIES, MASTERS, PRODUCTS } from "@/data";

// ─── Shared small components ─────────────────────────────────────────────────

export function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size }} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"}>★</span>
      ))}
    </div>
  );
}

export function ProductBadge({ text, colorClass }: { text: string; colorClass: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${colorClass}`}>
      {text}
    </span>
  );
}

// ─── CatalogScreen ────────────────────────────────────────────────────────────

export function CatalogScreen({ favorites, onToggleFavorite, onAddToCart, cart }: {
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

// ─── FavoritesScreen ──────────────────────────────────────────────────────────

export function FavoritesScreen({ favorites, onToggleFavorite, onAddToCart, cart }: {
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
