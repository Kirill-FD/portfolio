import { useEffect, useRef, useState } from "react";
import styles from "./PromptGuidePage.module.css";

type SectionId =
  | "section1"
  | "section2"
  | "section3"
  | "section4"
  | "section5"
  | "section6";

const codeSnippets = {
  "markdown-code": `**Prompt**
- Subject: matte black perfume bottle with a golden cap
- Context: premium studio packshot, clean background
- Details: subtle engraved logo, realistic reflections
- Composition: centered-left, 4:5 vertical
- Lighting: softbox key light + rim light
- Style: high-end commercial photography
- Quality: ultra-detailed, sharp focus
- Negative: text, watermark, blur`,
  "xml-code": `<prompt>
  <subject>portrait of a woman, freckles, green eyes</subject>
  <context>coffee shop near window, rainy day</context>
  <details>beige trench coat, gold earrings</details>
  <camera>close-up, shallow depth of field</camera>
  <lighting>soft natural window light</lighting>
  <style>realistic photography</style>
  <quality>ultra-detailed, sharp focus</quality>
  <negative>blurry, watermark</negative>
</prompt>`,
  "json-code": `{
  "subject": "futuristic city street at night",
  "context": "wet asphalt, neon signs, fog",
  "composition": "wide shot, vanishing point",
  "lighting": "neon rim light, high contrast",
  "style": ["digital illustration", "cyberpunk"],
  "quality": ["high detail", "clean edges"],
  "negative": ["photorealism", "text"]
}`,
  "example1-code": `Subject: photorealistic portrait of a 28-year-old woman, Scandinavian appearance, natural freckles, green eyes

Context: indoor coffee shop near window, rainy day outside

Details: beige trench coat, minimal gold earrings, subtle makeup, soft smile, slightly wet hair strands

Camera/Composition: close-up portrait, eye-level, shallow depth of field, 85mm lens look, background bokeh

Lighting/Color: soft natural window light, warm skin tones, muted cinematic palette

Style/Medium: realistic photography, high detail skin texture

Quality: ultra-detailed, sharp focus on eyes

Negative: blurry, deformed face, extra fingers, heavy makeup, watermark, text`,
  "example2-code": `A vast mountain valley at sunrise with low fog between pine forests; wide-angle view, cinematic composition, golden hour light, dramatic clouds; winding river reflecting light, tiny cabin far away, atmospheric haze; realistic landscape photography, high dynamic range; Negative: oversaturated colors, cartoon, people in foreground, text, watermark`,
  "example3-code": `Layer 1: a friendly fox teaching a small rabbit to read
Layer 2: cozy forest clearing, picnic blanket, stack of books, autumn leaves
Layer 3: medium shot, characters centered, clear silhouettes
Layer 4: warm soft light, pastel palette, gentle contrast
Layer 5: children's book illustration, watercolor wash, visible paper texture, soft edges
Layer 6 Negative: photorealism, harsh shadows, scary expressions, text, watermark`,
  "example4-code": `Goal/Constraints: premium studio packshot, clean background, no text, space on the right for tagline, minimal props

Product: matte black perfume bottle with golden cap, modern rectangular shape, subtle engraved logo

Composition: centered-left, 4:5 vertical framing, slight top-down angle

Lighting: softbox key light, controlled rim light, gentle reflections

Style: high-end commercial product photography

Quality: extremely sharp, realistic materials

Negative: clutter, hands, readable labels, watermark, blur, distortion`,
  "example5-code": `A futuristic city street at night, neon signs, wet asphalt reflections, a lone cyclist in silhouette; wide shot, strong leading lines, vanishing point perspective; neon rim light, volumetric fog, high contrast, teal-magenta harmony; stylized digital illustration, cyberpunk poster art, crisp linework, gradient shading; Negative: photorealism, messy lines, low resolution, text, watermark`,
} as const;

type CodeSnippetId = keyof typeof codeSnippets;

function getInitialTheme(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem("theme") === "dark";
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(" "))
    .filter(Boolean)
    .map((value) => styles[value] ?? value)
    .join(" ");
}

type CopyCodeBlockProps = {
  codeId: CodeSnippetId;
  language: string;
  copiedCodeId: CodeSnippetId | null;
  onCopy: (codeId: CodeSnippetId) => void;
};

function CopyCodeBlock({ codeId, language, copiedCodeId, onCopy }: CopyCodeBlockProps) {
  const copied = copiedCodeId === codeId;

  return (
    <div className={cx("code-block")}>
      <div className={cx("code-header")}>
        <span className={cx("code-lang")}>{language}</span>
        <button
          type="button"
          className={cx("copy-btn", copied && "copied")}
          onClick={() => onCopy(codeId)}
        >
          {copied ? (
            <>
              <span>✅</span>
              <span>Скопировано!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Копировать</span>
            </>
          )}
        </button>
      </div>
      <pre id={codeId}>{codeSnippets[codeId]}</pre>
    </div>
  );
}

export function PromptGuidePage() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialTheme);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<Record<SectionId, boolean>>({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
  });
  const [copiedCodeId, setCopiedCodeId] = useState<CodeSnippetId | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const expandTimeoutRef = useRef<number | null>(null);

  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
    section6: null,
  });

  useEffect(() => {
    const onScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScrollable = documentHeight - windowHeight;
      const nextProgress =
        maxScrollable <= 0 ? 0 : Math.min(100, Math.max(0, (scrollTop / maxScrollable) * 100));
      setScrollProgress(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (expandTimeoutRef.current) {
        window.clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextValue = !isDarkTheme;
    setIsDarkTheme(nextValue);
    window.localStorage.setItem("theme", nextValue ? "dark" : "light");
  };

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSections((previous) => ({
      ...previous,
      [sectionId]: !previous[sectionId],
    }));
  };

  const scrollToSection = (sectionId: SectionId) => {
    const section = sectionRefs.current[sectionId];
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (expandTimeoutRef.current) {
      window.clearTimeout(expandTimeoutRef.current);
    }

    expandTimeoutRef.current = window.setTimeout(() => {
      setExpandedSections((previous) => ({
        ...previous,
        [sectionId]: true,
      }));
    }, 500);
  };

  const copyCode = async (codeId: CodeSnippetId) => {
    try {
      await navigator.clipboard.writeText(codeSnippets[codeId]);
      setCopiedCodeId(codeId);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedCodeId(null);
      }, 2000);
    } catch {
      // Keep silent to preserve original behavior without extra UI noise.
    }
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: 88 }}>
      <div className={cx("prompt-guide-page", isDarkTheme && "dark-theme")}>
        <div className={cx("progress-bar")}>
          <div className={cx("progress-fill")} id="progressFill" style={{ width: `${scrollProgress}%` }} />
        </div>

        <button type="button" className={cx("theme-toggle")} onClick={toggleTheme}>
          <span style={{ fontSize: 18 }}>{isDarkTheme ? "🌙" : "☀️"}</span>
        </button>

        <div className={cx("container")}>
          <div className={cx("header")}>
            <div className={cx("brand")}>@KIRILL.AI.POL</div>
            <h1>Как писать промпты для генерации изображений</h1>
            <p className={cx("subtitle")}>
              Полный гайд: от структуры до методов. Научитесь создавать предсказуемые картинки с
              первого раза
            </p>
          </div>

          <div className={cx("toc")}>
            <h2>📋 Содержание гайда</h2>
            <ul className={cx("toc-list")}>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section1")}>
                  <span className={cx("toc-number")}>1</span>
                  Как создать промпт, чтобы изображение было «как в голове»
                </button>
              </li>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section2")}>
                  <span className={cx("toc-number")}>2</span>
                  Как правильно описывать контекст
                </button>
              </li>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section3")}>
                  <span className={cx("toc-number")}>3</span>
                  Правила структуры промпта (универсальный шаблон)
                </button>
              </li>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section4")}>
                  <span className={cx("toc-number")}>4</span>
                  5 методов написания промптов
                </button>
              </li>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section5")}>
                  <span className={cx("toc-number")}>5</span>
                  Примеры промптов с разбором
                </button>
              </li>
              <li>
                <button type="button" className={cx("toc-item")} onClick={() => scrollToSection("section6")}>
                  <span className={cx("toc-number")}>🎁</span>
                  Бонус: площадки и бесплатный доступ
                </button>
              </li>
            </ul>
          </div>

          <div className={cx("content")}>
            <div
              className={cx("section", expandedSections.section1 && "expanded")}
              id="section1"
              ref={(element) => {
                sectionRefs.current.section1 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section1")}
              >
                <div className={cx("section-number")}>1</div>
                <div className={cx("section-title")}>
                  Как создать промпт, чтобы изображение было «как в голове»
                </div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("highlight-box")}>
                    <strong>Ключевая идея:</strong> Нейросеть не «понимает» замысел целиком — она
                    собирает изображение из подсказок и вероятностей. Поэтому вам нужно зафиксировать
                    главный объект, уточнить контекст, описать детали, задать стиль и ограничить
                    лишнее.
                  </div>

                  <div className={cx("card")}>
                    <h3>✅ Правила хорошего промпта (быстрый чек-лист)</h3>
                    <ul className={cx("styled-list")}>
                      <li>
                        <strong>Язык промпта:</strong> чаще всего английский даёт более стабильные
                        результаты. Ключевые визуальные термины (lens, soft light, bokeh) лучше
                        оставлять на английском
                      </li>
                      <li>
                        <strong>Приоритеты и порядок:</strong> самое важное — в начало (объект →
                        критичные детали → контекст)
                      </li>
                      <li>
                        <strong>Конкретика вместо оценок:</strong> "премиальный packshot на белом
                        фоне, мягкий софтбокс" работает лучше, чем "красиво и стильно"
                      </li>
                      <li>
                        <strong>Ограничения (negative) по делу:</strong> добавляйте только то, что
                        реально портит результат (blur, watermark, extra fingers)
                      </li>
                    </ul>
                  </div>

                  <div className={cx("warning-box")}>
                    <strong>❌ Самые частые причины «не попал в ожидания»:</strong>
                    <ul className={cx("styled-list")} style={{ marginTop: 12 }}>
                      <li>Нет приоритета: много деталей, но не сказано, что главное</li>
                      <li>Мало конкретики: "красивая девушка", "крутой город"</li>
                      <li>Несовместимые стили: "фотореализм + аниме" в одном</li>
                      <li>Нет композиции/ракурса — модель выбирает сама</li>
                      <li>Нет ограничений — модель добавляет лишние объекты</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx("section", expandedSections.section2 && "expanded")}
              id="section2"
              ref={(element) => {
                sectionRefs.current.section2 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section2")}
              >
                <div className={cx("section-number")}>2</div>
                <div className={cx("section-title")}>Как правильно описывать контекст</div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("card")}>
                    <h3>📝 Формула описания</h3>
                    <p>
                      <strong>Кто/Что + Где + Когда + Как снято/нарисовано + Настроение</strong>
                    </p>
                  </div>

                  <div className={cx("card")}>
                    <h3>🎯 Объект (главное)</h3>
                    <ul className={cx("styled-list")}>
                      <li>Кто/что (человек/продукт/место)</li>
                      <li>Ключевые признаки (возраст, одежда, материал, форма, цвет)</li>
                      <li>Действие/поза/выражение лица</li>
                    </ul>
                  </div>

                  <div className={cx("card")}>
                    <h3>🌍 Окружение</h3>
                    <ul className={cx("styled-list")}>
                      <li>Локация (улица Токио, лес после дождя, студия)</li>
                      <li>Предметы рядом (минимум, только важное)</li>
                      <li>Фон (чистый/размытый/детализированный)</li>
                    </ul>
                  </div>

                  <div className={cx("card")}>
                    <h3>✨ Визуальный язык (сильно влияет на точность)</h3>
                    <ul className={cx("styled-list")}>
                      <li>Стиль (фото/3D/иллюстрация/аниме)</li>
                      <li>Свет (softbox, контровой, неон)</li>
                      <li>Камера/ракурс (крупный план, общий план)</li>
                      <li>Композиция (центральная, правило третей)</li>
                      <li>Качество (детализация, резкость)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx("section", expandedSections.section3 && "expanded")}
              id="section3"
              ref={(element) => {
                sectionRefs.current.section3 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section3")}
              >
                <div className={cx("section-number")}>3</div>
                <div className={cx("section-title")}>Универсальный шаблон из 8 блоков</div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("card")}>
                    <h3>🏗️ Структура промпта</h3>
                    <ol style={{ listStyle: "decimal", paddingLeft: 24, color: "#2a2a2a" }}>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Главный объект</strong> (максимально конкретно)
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Контекст/локация/время</strong>
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Критичные детали</strong> (что нельзя потерять)
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Композиция и ракурс</strong>
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Свет и цвет</strong>
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Стиль/медиум</strong> (фото/3D/иллюстрация)
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Качество/рендер</strong> (детализация)
                      </li>
                      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>
                        <strong>Negative</strong> (что исключить)
                      </li>
                    </ol>
                  </div>

                  <div className={cx("highlight-box")}>
                    <strong>💡 Почему иногда лучше писать промпт в разметке:</strong>
                    <p style={{ marginTop: 12 }}>
                      Разметка полезна, когда вы хотите не терять структуру, быстрее редактировать,
                      использовать ассистента для сборки промпта, хранить библиотеку или работать в
                      команде.
                    </p>
                  </div>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      margin: "32px 0 20px",
                      color: "#1a1a1a",
                    }}
                  >
                    📄 Примеры структурирования
                  </h3>

                  <CopyCodeBlock
                    codeId="markdown-code"
                    language="Markdown"
                    copiedCodeId={copiedCodeId}
                    onCopy={copyCode}
                  />
                  <CopyCodeBlock
                    codeId="xml-code"
                    language="XML"
                    copiedCodeId={copiedCodeId}
                    onCopy={copyCode}
                  />
                  <CopyCodeBlock
                    codeId="json-code"
                    language="JSON"
                    copiedCodeId={copiedCodeId}
                    onCopy={copyCode}
                  />
                </div>
              </div>
            </div>

            <div
              className={cx("section", expandedSections.section4 && "expanded")}
              id="section4"
              ref={(element) => {
                sectionRefs.current.section4 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section4")}
              >
                <div className={cx("section-number")}>4</div>
                <div className={cx("section-title")}>5 методов написания промптов</div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("method-card")}>
                    <div className={cx("method-header")}>
                      <span className={cx("method-badge")}>Метод 1</span>
                      <h4>"ТЗ-каркас" (самый надёжный)</h4>
                    </div>
                    <p className={cx("method-desc")}>
                      <strong>Когда использовать:</strong> когда нужен предсказуемый результат
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Как:</strong> заполните шаблон из 8 блоков (объект → контекст → детали
                      → композиция → свет → стиль → качество → негатив)
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Плюс:</strong> стабильно повторяемо. <strong>Минус:</strong> чуть дольше
                      писать
                    </p>
                  </div>

                  <div className={cx("method-card")}>
                    <div className={cx("method-header")}>
                      <span className={cx("method-badge")}>Метод 2</span>
                      <h4>"От общего к частному"</h4>
                    </div>
                    <p className={cx("method-desc")}>
                      <strong>Когда использовать:</strong> вы знаете идею, но не уверены в деталях
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Как:</strong> 1) Опишите сцену одной строкой 2) Добавьте 3-5 уточнений
                      3) Добавьте 3 критичных детали 4) В конце — негатив
                    </p>
                  </div>

                  <div className={cx("method-card")}>
                    <div className={cx("method-header")}>
                      <span className={cx("method-badge")}>Метод 3</span>
                      <h4>"Слои" (Layering)</h4>
                    </div>
                    <p className={cx("method-desc")}>
                      <strong>Когда использовать:</strong> если модель «гуляет» и результат
                      нестабилен
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Как:</strong> пишите промпт слоями: 1) смысл и объект 2) контекст 3)
                      композиция 4) свет и цвет 5) стиль 6) негатив
                    </p>
                  </div>

                  <div className={cx("method-card")}>
                    <div className={cx("method-header")}>
                      <span className={cx("method-badge")}>Метод 4</span>
                      <h4>"Ограничения сначала"</h4>
                    </div>
                    <p className={cx("method-desc")}>
                      <strong>Когда использовать:</strong> реклама продукта, бренд-материалы, строгий
                      дизайн
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Как:</strong> начните с ограничений и целей (packshot, белый фон, формат
                      4:5), затем объект и детали
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Плюс:</strong> меньше сюрпризов. <strong>Минус:</strong> иногда снижает
                      креативность
                    </p>
                  </div>

                  <div className={cx("method-card")}>
                    <div className={cx("method-header")}>
                      <span className={cx("method-badge")}>Метод 5</span>
                      <h4>"Референс-описание"</h4>
                    </div>
                    <p className={cx("method-desc")}>
                      <strong>Когда использовать:</strong> нужен конкретный визуальный язык
                      (кинематографичный свет, премиальный packshot)
                    </p>
                    <p className={cx("method-desc")}>
                      <strong>Как:</strong> используйте профессиональные термины — для фото: lens,
                      bokeh, rim light; для 3D: octane render, subsurface scattering; для
                      иллюстрации: lineart, watercolor wash
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx("section", expandedSections.section5 && "expanded")}
              id="section5"
              ref={(element) => {
                sectionRefs.current.section5 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section5")}
              >
                <div className={cx("section-number")}>5</div>
                <div className={cx("section-title")}>Примеры промптов с разбором</div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("example-card")}>
                    <div className={cx("example-header")}>
                      <h3 className={cx("example-title")}>Пример 1: Портрет (фотореализм)</h3>
                      <span className={cx("example-method")}>ТЗ-каркас</span>
                    </div>
                    <CopyCodeBlock
                      codeId="example1-code"
                      language="Prompt"
                      copiedCodeId={copiedCodeId}
                      onCopy={copyCode}
                    />
                  </div>

                  <div className={cx("example-card")}>
                    <div className={cx("example-header")}>
                      <h3 className={cx("example-title")}>Пример 2: Пейзаж (кинематограф)</h3>
                      <span className={cx("example-method")}>От общего к частному</span>
                    </div>
                    <CopyCodeBlock
                      codeId="example2-code"
                      language="Prompt"
                      copiedCodeId={copiedCodeId}
                      onCopy={copyCode}
                    />
                  </div>

                  <div className={cx("example-card")}>
                    <div className={cx("example-header")}>
                      <h3 className={cx("example-title")}>Пример 3: Иллюстрация (детская книга)</h3>
                      <span className={cx("example-method")}>Слои</span>
                    </div>
                    <CopyCodeBlock
                      codeId="example3-code"
                      language="Prompt"
                      copiedCodeId={copiedCodeId}
                      onCopy={copyCode}
                    />
                  </div>

                  <div className={cx("example-card")}>
                    <div className={cx("example-header")}>
                      <h3 className={cx("example-title")}>Пример 4: Реклама продукта (packshot)</h3>
                      <span className={cx("example-method")}>Ограничения сначала</span>
                    </div>
                    <CopyCodeBlock
                      codeId="example4-code"
                      language="Prompt"
                      copiedCodeId={copiedCodeId}
                      onCopy={copyCode}
                    />
                  </div>

                  <div className={cx("example-card")}>
                    <div className={cx("example-header")}>
                      <h3 className={cx("example-title")}>Пример 5: Постер (графика + стиль)</h3>
                      <span className={cx("example-method")}>Референс-термины</span>
                    </div>
                    <CopyCodeBlock
                      codeId="example5-code"
                      language="Prompt"
                      copiedCodeId={copiedCodeId}
                      onCopy={copyCode}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cx("section", expandedSections.section6 && "expanded")}
              id="section6"
              ref={(element) => {
                sectionRefs.current.section6 = element;
              }}
            >
              <button
                type="button"
                className={cx("section-header")}
                onClick={() => toggleSection("section6")}
              >
                <div className={cx("section-number")}>🎁</div>
                <div className={cx("section-title")}>Бонус: площадки и бесплатный доступ</div>
                <span className={cx("section-icon")}>▼</span>
              </button>
              <div className={cx("section-content")}>
                <div className={cx("section-body")}>
                  <div className={cx("highlight-box")}>
                    <strong>🎉 Специально для вас!</strong>
                    <p style={{ marginTop: 12 }}>
                      Я собрал лучшие площадки для генерации изображений в Nano Banana Pro, чтобы вы
                      могли быстро сравнить результаты и выбрать удобный рабочий процесс. И
                      дополнительно подготовил метод бесплатного использования.
                    </p>
                  </div>

                  <div className={cx("card")}>
                    <h3>🆓 Площадки для бесплатного использования Nano Banana Pro:</h3>
                    <ul className={cx("styled-list")}>
                      <li>
                        <strong>artlist.io</strong> — 2 бесплатных генерации в день
                      </li>
                      <li>
                        <strong>Felo.ai</strong> — 4 бесплатных генерации в день
                      </li>
                      <li>
                        <strong>Higgsfield.ai</strong> — 5 генераций в день + видео функции
                      </li>
                      <li>
                        <strong>hailuoai</strong> — 35 генераций на месяц
                      </li>
                      <li>
                        <strong>flowith.io</strong> — ~1000 генераций на месяц
                      </li>
                      <li>
                        <strong>arena.ai</strong> — 2 генерации бесплатно
                      </li>
                    </ul>
                  </div>

                  <div className={cx("card")}>
                    <h3>💎 Метод бесплатного доступа на месяц</h3>
                    <p style={{ marginBottom: 16, fontStyle: "italic", color: "#666666" }}>
                      (Сам регулярно пользуюсь этим методом. Результат отличный)
                    </p>
                    <ol style={{ listStyle: "decimal", paddingLeft: 24, color: "#2a2a2a" }}>
                      <li style={{ marginBottom: 12, lineHeight: 1.7 }}>
                        Переходим на сайт <strong>Gemini Business</strong> (business.gemini.google)
                      </li>
                      <li style={{ marginBottom: 12, lineHeight: 1.7 }}>
                        Генерируем бесплатную одноразовую почту (temp-mail.org).{" "}
                        <strong>После генерации НЕ обновляем!</strong>
                      </li>
                      <li style={{ marginBottom: 12, lineHeight: 1.7 }}>
                        Копируем почту, вставляем на сайт Gemini Business и возвращаемся к сервису с
                        почтой
                      </li>
                      <li style={{ marginBottom: 12, lineHeight: 1.7 }}>
                        Копируем пришедший код из 6 символов, вставляем на Gemini Business и жмём
                        Verify
                      </li>
                      <li style={{ marginBottom: 12, lineHeight: 1.7 }}>
                        Поздравляю! Теперь у вас бесплатная подписка Nano Banana Pro на месяц 🎉
                      </li>
                    </ol>
                  </div>

                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <a href="https://t.me/kirpol_AI" target="_blank" className={cx("bonus-link")} rel="noreferrer">
                      📱 Мой TG-канал
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("footer")}>
            © 2026 <span className={cx("footer-brand")}>@KIRILL.AI.POL</span> | Полный гайд по
            промпт-инжинирингу
          </div>
        </div>
      </div>
    </main>
  );
}
