import type { AppPage } from "../types";
import { Lock, Unlock } from "lucide-react";

import analysImage from "../../images/analys.webp";
import openclawImage from "../../images/openclaw.webp";
import guideImage from "../../images/guide.webp";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  isFree: boolean;
  page: Extract<AppPage, "diagnostic-checklist" | "openclaw-guide" | "prompt-guide">;
};

const products: Product[] = [
  {
    id: 1,
    title: "Чек-лист диагностики промптов",
    description:
      "Бесплатный интерактивный чек-лист для быстрой диагностики ошибок в промптах и получения персонального разбора.",
    image: analysImage,
    isFree: true,
    page: "diagnostic-checklist",
  },
  {
    id: 2,
    title: "Гайд по установке OpenClaw",
    description:
      "Бесплатная пошаговая инструкция по запуску OpenClaw в облачном сервере для стабильной работы 24/7.",
    image: openclawImage,
    isFree: true,
    page: "openclaw-guide",
  },
  {
    id: 3,
    title: "Полный гайд по промптам",
    description:
      "Платный интерактивный гайд по структуре, методам и практическим шаблонам для стабильной генерации изображений.",
    image: guideImage,
    isFree: false,
    page: "prompt-guide",
  },
];

type ProductsProps = {
  onOpenProduct: (page: Product["page"]) => void;
};

export function Products({ onOpenProduct }: ProductsProps) {
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
            Мои материалы и{" "}
            <span style={{ color: "#4b7c84" }}>гайды</span>
          </h2>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => onOpenProduct(product.page)}
            />
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

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {

  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "none",
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
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
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

        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
          style={{
            background: product.isFree ? "rgba(0,212,255,0.2)" : "rgba(255,165,0,0.2)",
            color: product.isFree ? "#00d4ff" : "#ffa500",
            border: `1px solid ${product.isFree ? "rgba(0,212,255,0.3)" : "rgba(255,165,0,0.3)"}`,
          }}
        >
          {product.isFree ? <Unlock size={10} /> : <Lock size={10} />}
          {product.isFree ? "Бесплатно" : "Платно"}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
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
          <div className="flex flex-col gap-0.5">
            {product.isFree ? (
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
              <>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Платно
                </span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  450₽
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: product.isFree ? "rgba(0,212,255,0.15)" : "#4b7c84",
              color: product.isFree ? "#00d4ff" : "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              border: product.isFree ? "1px solid rgba(0,212,255,0.3)" : "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = product.isFree
                ? "rgba(0,212,255,0.25)"
                : "#3d6870";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = product.isFree
                ? "rgba(0,212,255,0.15)"
                : "#4b7c84";
            }}
          >
            Открыть
          </button>
        </div>
      </div>
    </div>
  );
}
