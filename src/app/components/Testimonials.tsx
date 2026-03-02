import { Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Анна К.",
    role: "Маркетолог",
    text: "AI Prompt Pack полностью изменил мой рабочий процесс. Теперь пишу тексты в 5 раз быстрее, а качество стало намного выше!",
    avatar: "АК",
    rating: 5,
  },
  {
    id: 2,
    name: "Дмитрий С.",
    role: "Предприниматель",
    text: "Курс по Make — лучшее вложение за этот год. За неделю автоматизировал все рутинные задачи в своём бизнесе.",
    avatar: "ДС",
    rating: 5,
  },
  {
    id: 3,
    name: "Мария Л.",
    role: "Контент-мейкер",
    text: "Шаблоны контент-плана просто огонь! Всё интуитивно, легко адаптировать под себя. Сэкономила часы каждую неделю.",
    avatar: "МЛ",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#17171a" }}
    >
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
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.05)",
          bottom: "0%",
          left: "-10%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
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
            Отзывы
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Что говорят{" "}
            <span style={{ color: "#4b7c84" }}>покупатели</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(75,124,132,0.35)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(75,124,132,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.03)";
              }}
            >
              <Quote size={24} style={{ color: "#4b7c84", opacity: 0.6 }} />

              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {review.text}
              </p>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} style={{ color: "#ffa500", fontSize: 14 }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #4b7c84, #3d6870)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                    }}
                  >
                    {review.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
