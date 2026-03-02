import { useState } from "react";
import { ExternalLink, Download, Star, Lock, Unlock, Tag } from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number | null;
  currency: string;
  category: string;
  tags: string[];
  badge?: string;
  link: string;
  featured?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    title: "AI Prompt Pack Pro",
    description:
      "200+ готовых промптов для ChatGPT, Claude и Gemini. Копирайтинг, стратегия, контент, анализ — всё в одном наборе.",
    image:
      "https://images.unsplash.com/photo-1664639985362-7eb8309f9e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBuZXVyYWwlMjBuZXR3b3JrJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzE2NzgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1490,
    currency: "₽",
    category: "paid",
    tags: ["AI", "Промпты", "ChatGPT"],
    badge: "Хит продаж",
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Мини-курс: Автоматизация на Make",
    description:
      "Пошаговый видеокурс: как собрать свои первые 5 автоматизаций в Make (Integromat) без знания кода.",
    image:
      "https://images.unsplash.com/photo-1762330917056-e69b34329ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjb3Vyc2UlMjBlLWxlYXJuaW5nJTIwZGlnaXRhbCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzE2NzgzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2990,
    currency: "₽",
    category: "paid",
    tags: ["Make", "Автоматизация", "No-code"],
    badge: "Новинка",
    link: "#",
  },
  {
    id: 3,
    title: "Шаблоны контент-плана",
    description:
      "Готовые Notion-шаблоны для планирования контента в Telegram, Instagram и YouTube. Просто заполни и публикуй.",
    image:
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMGRhc2hib2FyZCUyMFVJfGVufDF8fHx8MTc3MTY3ODMwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 590,
    currency: "₽",
    category: "paid",
    tags: ["Notion", "Контент", "Шаблоны"],
    link: "#",
  },
  {
    id: 4,
    title: "Гайд: 10 AI-инструментов 2025",
    description:
      "Бесплатный PDF-гайд с обзором 10 лучших AI-инструментов, которые заменят целую команду. Скачай и внедри сегодня.",
    image:
      "https://images.unsplash.com/photo-1707300272150-c0f50ba6a0d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVtcGxhdGUlMjBndWlkZSUyMGVib29rJTIwZG93bmxvYWR8ZW58MXx8fHwxNzcxNjc4MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: null,
    currency: "₽",
    category: "free",
    tags: ["AI", "Гайд", "PDF"],
    badge: "Бесплатно",
    link: "#",
  },
  {
    id: 5,
    title: "Чек-лист: Запуск продукта",
    description:
      "Полный чек-лист из 40 пунктов для запуска цифрового продукта. От идеи до первой продажи за 2 недели.",
    image:
      "https://images.unsplash.com/photo-1591381287254-b3349c60bf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYXV0b21hdGlvbiUyMHdvcmtmbG93JTIwcHJvZHVjdGl2aXR5JTIwdG9vbHxlbnwxfHx8fDE3NzE2NzgzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: null,
    currency: "₽",
    category: "free",
    tags: ["Запуск", "Чек-лист", "Продукт"],
    badge: "Бесплатно",
    link: "#",
  },
  {
    id: 6,
    title: "AI-ассистент для бизнеса",
    description:
      "Индивидуально настроенный AI-бот для вашего бизнеса: отвечает клиентам, обрабатывает заявки, сохраняет в CRM.",
    image:
      "https://images.unsplash.com/photo-1769684328001-dc78599f1518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxNjc4MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 9900,
    currency: "₽",
    category: "paid",
    tags: ["Бот", "CRM", "AI"],
    badge: "Под заказ",
    link: "#",
    featured: true,
  },
];

const filters = [
  { key: "all", label: "Все продукты" },
  { key: "paid", label: "Платные" },
  { key: "free", label: "Бесплатные" },
];

export function Products() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section
      id="products"
      className="py-24 relative overflow-hidden"
      style={{ background: "#131316" }}
    >
      {/* Separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(75,124,132,0.5), transparent)",
        }}
      />

      {/* BG glow */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "rgba(75,124,132,0.07)",
          top: "20%",
          right: "-15%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full mb-4"
            style={{
              background: "rgba(75,124,132,0.15)",
              color: "#4b7c84",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Продукты
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Все мои продукты и{" "}
            <span style={{ color: "#4b7c84" }}>материалы</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}
          >
            Платные и бесплатные — для разных задач и бюджетов
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-5 py-2 rounded-xl transition-all duration-200"
              style={{
                background:
                  activeFilter === f.key
                    ? "#4b7c84"
                    : "rgba(255,255,255,0.05)",
                color:
                  activeFilter === f.key
                    ? "#ffffff"
                    : "rgba(255,255,255,0.55)",
                border:
                  activeFilter === f.key
                    ? "1px solid #4b7c84"
                    : "1px solid rgba(255,255,255,0.08)",
                fontSize: 14,
                fontWeight: activeFilter === f.key ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center mt-12"
          style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}
        >
          Нужен индивидуальный продукт?{" "}
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ color: "#4b7c84", textDecoration: "underline" }}
          >
            Напишите мне
          </button>
        </p>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isFree = product.price === null;

  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: product.featured
          ? "1px solid rgba(75,124,132,0.5)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: product.featured
          ? "0 0 30px rgba(75,124,132,0.12)"
          : "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(75,124,132,0.5)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 40px rgba(75,124,132,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = product.featured
          ? "rgba(75,124,132,0.5)"
          : "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = product.featured
          ? "0 0 30px rgba(75,124,132,0.12)"
          : "none";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(13,13,18,0.8) 100%)",
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: isFree
                ? "rgba(0,212,255,0.2)"
                : product.badge === "Хит продаж"
                ? "rgba(255,165,0,0.2)"
                : product.badge === "Под заказ"
                ? "rgba(147,112,219,0.2)"
                : "rgba(75,124,132,0.3)",
              color: isFree
                ? "#00d4ff"
                : product.badge === "Хит продаж"
                ? "#ffa500"
                : product.badge === "Под заказ"
                ? "#c39aff"
                : "#4b7c84",
              border: `1px solid ${
                isFree
                  ? "rgba(0,212,255,0.3)"
                  : product.badge === "Хит продаж"
                  ? "rgba(255,165,0,0.3)"
                  : product.badge === "Под заказ"
                  ? "rgba(147,112,219,0.3)"
                  : "rgba(75,124,132,0.4)"
              }`,
            }}
          >
            {isFree ? <Unlock size={10} className="inline mr-1" /> : <Lock size={10} className="inline mr-1" />}
            {product.badge}
          </div>
        )}

        {/* Featured star */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <Star size={16} style={{ color: "#ffa500", fill: "#ffa500" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1"
              style={{
                background: "rgba(75,124,132,0.1)",
                color: "#4b7c84",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        <h3
          style={{
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: 8,
          }}
        >
          {product.title}
        </h3>

        <p
          className="flex-1"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            {isFree ? (
              <span
                style={{
                  color: "#00d4ff",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                Бесплатно
              </span>
            ) : (
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                {product.price?.toLocaleString("ru-RU")}
                {product.currency}
              </span>
            )}
          </div>

          <a
            href={product.link}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: isFree ? "rgba(0,212,255,0.15)" : "#4b7c84",
              color: isFree ? "#00d4ff" : "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              border: isFree ? "1px solid rgba(0,212,255,0.3)" : "none",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = isFree
                ? "rgba(0,212,255,0.25)"
                : "#3d6870";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = isFree
                ? "rgba(0,212,255,0.15)"
                : "#4b7c84";
            }}
          >
            {isFree ? (
              <>
                <Download size={14} />
                Скачать
              </>
            ) : (
              <>
                <ExternalLink size={14} />
                Купить
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
