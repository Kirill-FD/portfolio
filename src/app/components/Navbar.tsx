import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "../../images/logo.png";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Обо мне", href: "#about" },
  { label: "Продукты", href: "#products" },
  { label: "Контакты", href: "#contact" },
];

type NavbarProps = {
  showBackButton?: boolean;
  onBackClick?: () => void;
};

export function Navbar({ showBackButton = false, onBackClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (showBackButton) return;
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(23,23,26,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(75,124,132,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => (showBackButton ? onBackClick?.() : scrollTo("#hero"))}
          className="flex items-center gap-2 group"
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

        {showBackButton ? (
          <button
            onClick={onBackClick}
            className="px-5 py-2 rounded-lg transition-all duration-200"
            style={{
              background: "#4b7c84",
              color: "#fff",
              fontSize: 15,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#3d6870")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#4b7c84")
            }
          >
            Вернуться
          </button>
        ) : (
          <>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="transition-colors duration-200 hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#4b7c84")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")
                  }
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="px-5 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: "#4b7c84",
                  color: "#fff",
                  fontSize: 15,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#3d6870")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#4b7c84")
                }
              >
                Связаться
              </button>
            </nav>

            {/* Mobile burger */}
            <button
              className="md:hidden"
              style={{ color: "#ffffff" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {!showBackButton && menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(23,23,26,0.98)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left py-2 transition-colors"
              style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="py-3 rounded-lg"
            style={{ background: "#4b7c84", color: "#fff", fontSize: 16 }}
          >
            Связаться
          </button>
        </div>
      )}
    </header>
  );
}
