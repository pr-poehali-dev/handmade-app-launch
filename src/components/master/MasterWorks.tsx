import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { MASTER_WORKS } from "@/data/masterData";

const UPLOAD_URL = "https://functions.poehali.dev/cf49085d-eae4-438f-a8ff-b8e70524acf2";

type UploadState = "idle" | "uploading" | "done" | "error";

export function MasterWorks() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Предпросмотр
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreviewUrl(dataUrl);
      setUploadState("uploading");
      setUploadError(null);
      setUploadedUrl(null);

      try {
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: dataUrl,
            contentType: file.type || "image/jpeg",
          }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setUploadedUrl(data.url);
          setUploadState("done");
        } else {
          setUploadState("error");
          setUploadError("Не удалось загрузить фото");
        }
      } catch {
        setUploadState("error");
        setUploadError("Ошибка сети, попробуйте снова");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setUploadedUrl(null);
    setUploadState("idle");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setShowAddForm(false);
    handleReset();
  };

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

            {/* Photo upload area */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {!previewUrl ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Icon name="ImagePlus" size={28} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground font-medium">Нажмите, чтобы выбрать фото</p>
                <p className="text-[11px] text-muted-foreground">JPG, PNG, WEBP до 10 МБ</p>
              </button>
            ) : (
              <div className="relative rounded-xl overflow-hidden h-48">
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />

                {/* Overlay states */}
                {uploadState === "uploading" && (
                  <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium">Загружаю фото...</p>
                  </div>
                )}
                {uploadState === "done" && (
                  <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-semibold">
                    <Icon name="Check" size={12} />
                    Загружено
                  </div>
                )}
                {uploadState === "error" && (
                  <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
                    <Icon name="AlertCircle" size={28} className="text-red-400" />
                    <p className="text-sm text-red-400 font-medium">{uploadError}</p>
                  </div>
                )}

                {/* Replace / remove buttons */}
                <div className="absolute bottom-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="glass rounded-lg px-2.5 py-1.5 text-[11px] font-medium flex items-center gap-1"
                  >
                    <Icon name="RefreshCw" size={11} />
                    Заменить
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="glass rounded-lg px-2 py-1.5 text-red-400"
                  >
                    <Icon name="X" size={13} />
                  </button>
                </div>
              </div>
            )}

            <input
              placeholder="Название работы"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Цена, ₽"
                type="number"
                className="bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
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
            <textarea
              placeholder="Описание работы..."
              rows={3}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground resize-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="glass rounded-xl py-3 text-sm font-medium"
                onClick={handleClose}
              >
                Отмена
              </button>
              <button
                type="button"
                disabled={uploadState === "uploading" || (previewUrl !== null && uploadState !== "done" && uploadState !== "error")}
                className="bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {uploadState === "uploading" ? "Загружаю..." : "Опубликовать"}
              </button>
            </div>

            {/* Uploaded URL hint */}
            {uploadedUrl && (
              <p className="text-[10px] text-muted-foreground truncate px-1">
                ✓ {uploadedUrl}
              </p>
            )}
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
