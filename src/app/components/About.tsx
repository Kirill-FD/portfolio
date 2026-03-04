import { Brain, Zap, Target, Users } from "lucide-react";

import meImage from "../../images/me.webp";

const skills = [
  { icon: Brain, label: "ИИ & нейросети", desc: "Работаю с GPT, Claude, Gemini и другими инструментами" },
  { icon: Zap, label: "Автоматизация", desc: "Make, n8n — выстраиваю автоматизированные процессы без ручного труда" },
  { icon: Target, label: "Цифровые продукты", desc: "Создаю чек-листы, инструкции и шаблоны для реального применения" },
  { icon: Users, label: "ИИ-агенты", desc: "Провожу оценку бизнес-процессов и разрабатываю стратегию интеграции ИИ-агентов" },
];

export function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "#17171a" }}
    >
      {/* Subtle separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(75,124,132,0.5), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="text-center mb-16">
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
            Обо мне
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Помогаю людям работать эффективнее,{" "}
            <span style={{ color: "#4b7c84" }}>а не больше</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(75,124,132,0.3)",
                boxShadow: "0 0 60px rgba(75,124,132,0.15)",
              }}
            >
              <img
                src={meImage}
                alt="Кирилл Полищук"
                className="w-full object-cover"
                style={{ height: 380 }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(23,23,26,0.8) 100%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl"
              style={{
                background: "rgba(23,23,26,0.95)",
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow: "0 0 20px rgba(0,212,255,0.15)",
              }}
            >
              <div style={{ color: "#00d4ff", fontSize: 13, fontWeight: 600 }}>
                ✦ ИИ-эксперт
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                с 2022 года
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p
              className="mb-8"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              Я создаю цифровые продукты, автоматизации и ИИ-инструменты, которые реально
              меняют качество работы. Мой подход — практичность и ясность: никаких
              <br />
              сложных схем, только то, что работает и приносит результат.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(75,124,132,0.4)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(75,124,132,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "rgba(75,124,132,0.2)" }}
                  >
                    <Icon size={18} style={{ color: "#4b7c84" }} />
                  </div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
