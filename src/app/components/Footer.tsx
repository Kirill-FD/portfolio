import { Send, Instagram, Heart } from "lucide-react";
import logoImage from "../../images/logo.png";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Обо мне", href: "#about" },
  { label: "Продукты", href: "#products" },
  { label: "Контакты", href: "#contact" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-12 relative"
      style={{
        background: "#17171a",
        borderTop: "1px solid rgba(75,124,132,0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2"
          >
            <img
              src={logoImage}
              alt="Логотип"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span style={{ color: "#ffffff", fontWeight: 600, fontSize: 17 }}>
              Кирилл Полищук
            </span>
          </button>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#4b7c84")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.45)")
                }
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/kirpol_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(75,124,132,0.15)",
                color: "#4b7c84",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(75,124,132,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(75,124,132,0.15)";
              }}
            >
              <Send size={16} />
            </a>
            <a
              href="https://www.instagram.com/kirill.ai.pol/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(199,125,255,0.1)",
                color: "#c77dff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(199,125,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(199,125,255,0.1)";
              }}
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-8 pt-6 text-center flex items-center justify-center gap-1"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.3)",
            fontSize: 13,
          }}
        >
          <span>© 2026. Сделано с</span>
          <Heart size={12} style={{ color: "#4b7c84", fill: "#4b7c84" }} />
          <span>и ИИ.</span>
        </div>
      </div>
    </footer>
  );
}
