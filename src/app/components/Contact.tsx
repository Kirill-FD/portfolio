import { Send, MessageCircle, Instagram, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  {
    icon: MessageCircle,
    label: "Telegram",
    handle: "@username",
    href: "https://t.me/username",
    color: "#4b7c84",
    bg: "rgba(75,124,132,0.15)",
    border: "rgba(75,124,132,0.3)",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@username",
    href: "https://instagram.com/username",
    color: "#c77dff",
    bg: "rgba(199,125,255,0.1)",
    border: "rgba(199,125,255,0.3)",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "hello@example.com",
    href: "mailto:hello@example.com",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.3)",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

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
            Есть идея, вопрос или хотите индивидуальный проект? Напишите мне!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
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
              {socialLinks.map(({ icon: Icon, label, handle, href, color, bg, border }) => (
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

          {/* Contact form */}
          <div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              Написать напрямую
            </h3>

            {sent ? (
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  background: "rgba(75,124,132,0.1)",
                  border: "1px solid rgba(75,124,132,0.4)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
                <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  Сообщение отправлено!
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                  Отвечу вам в ближайшее время.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: 8 }}
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      fontSize: 15,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(75,124,132,0.6)";
                      (e.target as HTMLElement).style.background = "rgba(75,124,132,0.08)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: 8 }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      fontSize: 15,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(75,124,132,0.6)";
                      (e.target as HTMLElement).style.background = "rgba(75,124,132,0.08)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: 8 }}
                  >
                    Сообщение
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Расскажите о вашем проекте или задайте вопрос..."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      fontSize: 15,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(75,124,132,0.6)";
                      (e.target as HTMLElement).style.background = "rgba(75,124,132,0.08)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #4b7c84, #3d6870)",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    boxShadow: "0 0 25px rgba(75,124,132,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 35px rgba(75,124,132,0.55)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 25px rgba(75,124,132,0.35)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Send size={16} />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
