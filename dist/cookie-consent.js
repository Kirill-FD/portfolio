/*
  Cookie Consent Banner для kirpolai.ru
  Соответствие 152-ФЗ и 420-ФЗ

  УСТАНОВКА:
  1. Скопируйте этот файл в /www/kirpolai.ru/cookie-consent.js
  2. Добавьте в index.html перед закрывающим </body>:
     <script src="/cookie-consent.js"></script>
*/

(function () {
  "use strict";

  // === НАСТРОЙКИ ===
  const CONFIG = {
    cookieName: "cookie_consent",
    cookieDays: 365,
    privacyUrl: "/privacy.html",
    ownerName: "ИП Полищук Кирилл Владимирович", // <-- ЗАМЕНИТЕ на ваши данные
    ownerEmail: "kvp0436@gmail.com",       // <-- ЗАМЕНИТЕ на ваш email
  };

  // Проверяем, давал ли пользователь согласие ранее
  function getConsent() {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + CONFIG.cookieName + "=([^;]*)")
    );
    if (!match) return null;
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {
      return null;
    }
  }

  function setConsent(value) {
    const date = new Date();
    date.setTime(date.getTime() + CONFIG.cookieDays * 24 * 60 * 60 * 1000);
    document.cookie =
      CONFIG.cookieName +
      "=" +
      encodeURIComponent(JSON.stringify(value)) +
      "; expires=" +
      date.toUTCString() +
      "; path=/; SameSite=Lax";
  }

  // Если согласие уже дано — не показываем баннер
  if (getConsent()) return;

  // === СТИЛИ ===
  const style = document.createElement("style");
  style.textContent = `
    /* Overlay */
    .cc-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 99998;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .cc-overlay.cc-visible {
      opacity: 1;
    }

    /* Banner */
    .cc-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99999;
      background: #1a1a2e;
      color: #e0e0e0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cc-banner.cc-visible {
      transform: translateY(0);
    }

    .cc-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 20px 24px;
    }

    .cc-text {
      margin-bottom: 16px;
    }

    .cc-text a {
      color: #7eb8f7;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .cc-text a:hover {
      color: #a8d4ff;
    }

    /* Категории */
    .cc-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }

    .cc-category {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      user-select: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .cc-category:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .cc-category.cc-disabled {
      opacity: 0.5;
      cursor: default;
    }

    .cc-toggle {
      position: relative;
      width: 36px;
      height: 20px;
      flex-shrink: 0;
    }
    .cc-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }
    .cc-slider {
      position: absolute;
      inset: 0;
      background: #555;
      border-radius: 10px;
      transition: background 0.2s;
    }
    .cc-slider::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }
    .cc-toggle input:checked + .cc-slider {
      background: #4caf50;
    }
    .cc-toggle input:checked + .cc-slider::after {
      transform: translateX(16px);
    }
    .cc-toggle input:disabled + .cc-slider {
      background: #4caf50;
      opacity: 0.6;
    }
    .cc-toggle input:disabled + .cc-slider::after {
      transform: translateX(16px);
    }

    .cc-cat-label {
      font-size: 13px;
      color: #ccc;
    }

    /* Кнопки */
    .cc-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .cc-btn {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
    }
    .cc-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .cc-btn:active {
      transform: translateY(0);
    }

    .cc-btn-accept {
      background: #4caf50;
      color: #fff;
    }
    .cc-btn-accept:hover {
      background: #43a047;
    }

    .cc-btn-selected {
      background: #7eb8f7;
      color: #1a1a2e;
    }
    .cc-btn-selected:hover {
      background: #6aa8e7;
    }

    .cc-btn-reject {
      background: transparent;
      color: #aaa;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .cc-btn-reject:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #ddd;
    }

    /* Mobile */
    @media (max-width: 600px) {
      .cc-inner {
        padding: 16px;
      }
      .cc-categories {
        flex-direction: column;
        gap: 8px;
      }
      .cc-buttons {
        flex-direction: column;
      }
      .cc-btn {
        width: 100%;
        text-align: center;
      }
    }
  `;
  document.head.appendChild(style);

  // === HTML ===
  const overlay = document.createElement("div");
  overlay.className = "cc-overlay";

  const banner = document.createElement("div");
  banner.className = "cc-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Настройки cookie");

  banner.innerHTML = `
    <div class="cc-inner">
      <div class="cc-text">
        Мы используем файлы cookie для корректной работы сайта и&nbsp;улучшения вашего опыта.
        Аналитические cookie помогают нам понять, как вы взаимодействуете с&nbsp;сайтом.
        Вы можете выбрать, какие категории cookie разрешить.
        Подробнее — в&nbsp;<a href="${CONFIG.privacyUrl}" target="_blank">Политике конфиденциальности</a>.
      </div>

      <div class="cc-categories">
        <label class="cc-category cc-disabled">
          <span class="cc-toggle">
            <input type="checkbox" checked disabled data-cc="necessary">
            <span class="cc-slider"></span>
          </span>
          <span class="cc-cat-label">Необходимые</span>
        </label>

        <label class="cc-category">
          <span class="cc-toggle">
            <input type="checkbox" data-cc="analytics">
            <span class="cc-slider"></span>
          </span>
          <span class="cc-cat-label">Аналитические</span>
        </label>

        <label class="cc-category">
          <span class="cc-toggle">
            <input type="checkbox" data-cc="marketing">
            <span class="cc-slider"></span>
          </span>
          <span class="cc-cat-label">Маркетинговые</span>
        </label>
      </div>

      <div class="cc-buttons">
        <button class="cc-btn cc-btn-accept" data-action="accept-all">Принять все</button>
        <button class="cc-btn cc-btn-selected" data-action="accept-selected">Сохранить выбранные</button>
        <button class="cc-btn cc-btn-reject" data-action="reject">Только необходимые</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(banner);

  // Анимация появления
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("cc-visible");
      banner.classList.add("cc-visible");
    });
  });

  // === ЛОГИКА ===
  function closeBanner(consent) {
    setConsent(consent);
    banner.classList.remove("cc-visible");
    overlay.classList.remove("cc-visible");
    setTimeout(() => {
      banner.remove();
      overlay.remove();
      style.remove();
    }, 400);

    // Событие для других скриптов
    window.dispatchEvent(
      new CustomEvent("cookieConsent", { detail: consent })
    );

    // Если разрешена аналитика — подключаем Яндекс.Метрику
    if (consent.analytics) {
      loadYandexMetrika();
    }
  }

  // Кнопки
  banner.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "accept-all") {
      closeBanner({ necessary: true, analytics: true, marketing: true });
    } else if (action === "accept-selected") {
      const analytics = banner.querySelector('[data-cc="analytics"]').checked;
      const marketing = banner.querySelector('[data-cc="marketing"]').checked;
      closeBanner({
        necessary: true,
        analytics: analytics,
        marketing: marketing,
      });
    } else if (action === "reject") {
      closeBanner({ necessary: true, analytics: false, marketing: false });
    }
  });

  // === ЯНДЕКС.МЕТРИКА ===
  // Замените XXXXXXXX на ваш номер счётчика
  function loadYandexMetrika() {
    if (document.querySelector("#ym-script")) return;

    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        (k.id = "ym-script"),
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    // ЗАМЕНИТЕ 00000000 на ваш ID счётчика Яндекс.Метрики
    ym(107143875, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }
})();
