import { Send, Instagram, ArrowRight } from "lucide-react";

const socialLinks = [
  {
    icon: Send,
    label: "Telegram",
    handle: "@kirpol_AI",
    href: "https://t.me/kirpol_AI",
    color: "#4b7c84",
    bg: "rgba(75,124,132,0.15)",
    border: "rgba(75,124,132,0.3)",
  },
  {
    icon: Instagram,
    label: "Instagram*",
    handle: "@kirill.ai.pol",
    href: "https://www.instagram.com/kirill.ai.pol/",
    color: "#c77dff",
    bg: "rgba(199,125,255,0.1)",
    border: "rgba(199,125,255,0.3)",
    note: "Деятельность Meta Platforms Inc. (Facebook, Instagram) запрещена на территории РФ",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "#131316" }}
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
          width: 500,
          height: 500,
          background: "rgba(75,124,132,0.08)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
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
            Контакты
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Давайте{" "}
            <span style={{ color: "#4b7c84" }}>работать вместе</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}
          >
            Есть идея, вопрос или хотите индивидуальный проект?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Social links */}
          <div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              Найти меня здесь
            </h3>
            <div className="flex flex-col gap-4 mb-10">
              {socialLinks.map(({ icon: Icon, label, handle, href, color, bg, border, note }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ color: "#ffffff", fontSize: 15, fontWeight: 600 }}>
                      {label}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                      {handle}
                    </div>
                    {note && (
                      <div
                        style={{
                          color: "rgba(255,255,255,0.42)",
                          fontSize: 11,
                          fontStyle: "italic",
                          marginTop: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        {note}
                      </div>
                    )}
                  </div>
                  <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                </a>
              ))}
            </div>

            {/* Quick note */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "rgba(75,124,132,0.1)",
                border: "1px solid rgba(75,124,132,0.25)",
              }}
            >
              <div style={{ color: "#4b7c84", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                ⚡ Быстрый ответ
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.6 }}>
                Отвечаю в Telegram в течение нескольких часов. Это самый быстрый способ связаться.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
