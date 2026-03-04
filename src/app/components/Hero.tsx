import { ArrowDown, Sparkles } from "lucide-react";

const heroBg =
  "https://images.unsplash.com/photo-1769684328001-dc78599f1518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxNjc4MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#17171a" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(75,124,132,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: "rgba(75,124,132,0.15)",
          top: "10%",
          left: "-10%",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          background: "rgba(0,212,255,0.08)",
          bottom: "15%",
          right: "-5%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(75,124,132,0.15)",
            border: "1px solid rgba(75,124,132,0.4)",
          }}
        >
          <Sparkles size={14} style={{ color: "#00d4ff" }} />
          <span style={{ color: "#00d4ff", fontSize: 13, letterSpacing: "0.05em" }}>
            ИИ-продукты и цифровые решения
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mb-6"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Создаю продукты,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4b7c84 0%, #00d4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            которые работают
          </span>{" "}
          за вас
        </h1>

        {/* Subheading */}
        <p
          className="mx-auto mb-10 max-w-2xl"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
          }}
        >
          Цифровые продукты, ИИ-инструменты и обучающие материалы — всё, что
          поможет вам автоматизировать, масштабировать и расти
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo("#products")}
            className="px-8 py-4 rounded-xl transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #4b7c84, #3d6870)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 0 30px rgba(75,124,132,0.4)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px rgba(75,124,132,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(75,124,132,0.4)")
            }
          >
            Смотреть продукты
          </button>
          <button
            onClick={() => scrollTo("#about")}
            className="px-8 py-4 rounded-xl transition-all duration-200"
            style={{
              background: "transparent",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(75,124,132,0.6)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(75,124,132,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Обо мне
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { value: "80+", label: "Продуктов создано" },
            { value: "50+", label: "Довольных клиентов" },
            { value: "3+", label: "Года в сфере ИИ" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#4b7c84",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
