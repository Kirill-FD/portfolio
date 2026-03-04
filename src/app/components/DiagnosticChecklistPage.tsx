import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./DiagnosticChecklistPage.module.css";

type ProblemId = 1 | 2 | 3 | 4 | 5 | 6;

type Problem = {
  id: ProblemId;
  title: string;
  description: string;
  badLabel: string;
  badPrompt: string;
  goodLabel: string;
  goodPrompt: string;
  hint: string;
  diagnosis: string;
};

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  sendData: (data: string) => void;
  MainButton?: {
    hide: () => void;
  };
};

type TelegramWindow = Window & {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
};

type DiagnosticResult = {
  count: number;
  problems: string[];
};

const problems: Problem[] = [
  {
    id: 1,
    title: "Нейросеть генерирует не то, что главное",
    description:
      'Вы описываете много деталей, но модель "размазывает" внимание. Девушка на фоне превращается в фон с девушкой.',
    badLabel: "✕ ПЛОХОЙ ПРОМПТ:",
    badPrompt:
      "beautiful sunset, mountains, lake, trees, girl sitting, birds flying, clouds, golden light, peaceful atmosphere",
    goodLabel: "✓ ПРАВИЛЬНЫЙ ПРОМПТ:",
    goodPrompt:
      "girl sitting by mountain lake at sunset; peaceful atmosphere, mountains in background, golden hour light",
    hint: "Главный объект всегда в начало. В гайде — структура из 8 блоков по приоритету.",
    diagnosis: "Нет приоритета — модель не знает, что главное",
  },
  {
    id: 2,
    title: 'Получается "красиво", но не как задумано',
    description:
      'Вы используете оценочные слова вместо конкретных характеристик. Для нейросети "стильный продукт" ничего не значит.',
    badLabel: "✕ ПЛОХОЙ ПРОМПТ:",
    badPrompt: "stylish premium perfume bottle, beautiful design, elegant, luxury",
    goodLabel: "✓ ПРАВИЛЬНЫЙ ПРОМПТ:",
    goodPrompt:
      "matte black perfume bottle with golden cap, rectangular shape, subtle engraved logo; studio softbox lighting, clean white background",
    hint: "Конкретика вместо оценок: форма, материал, цвет, ракурс. В гайде — чек-лист терминов.",
    diagnosis: "Используете оценки вместо конкретики",
  },
  {
    id: 3,
    title: 'Стиль "гуляет" от картинки к картинке',
    description:
      "То фотореализм, то иллюстрация, то что-то среднее. Вы не задаёте чёткий визуальный язык.",
    badLabel: "✕ ПЛОХОЙ ПРОМПТ:",
    badPrompt: "cozy coffee shop scene, nice lighting, artistic style",
    goodLabel: "✓ ПРАВИЛЬНЫЙ ПРОМПТ:",
    goodPrompt:
      "cozy coffee shop interior; soft natural window light, warm tones; realistic photography, shallow depth of field, bokeh; ultra-detailed",
    hint: 'Профтермины задают стиль: bokeh, softbox, octane render. Метод "Референс-описание" в гайде.',
    diagnosis: "Не задаёте визуальный язык (стиль гуляет)",
  },
  {
    id: 4,
    title: "Лишние объекты, текст, артефакты",
    description:
      "На картинке появляются случайные предметы, нечитаемые надписи, деформированные пальцы.",
    badLabel: "✕ ПЛОХОЙ ПРОМПТ (БЕЗ НЕГАТИВА):",
    badPrompt: "portrait of a woman, close-up, studio lighting",
    goodLabel: "✓ ПРАВИЛЬНЫЙ ПРОМПТ:",
    goodPrompt:
      "portrait of a woman, close-up, studio lighting; Negative: blurry, deformed face, extra fingers, watermark, text, low resolution",
    hint: 'Negative только по делу — что реально портит. Длинный негатив "сушит" картинку.',
    diagnosis: "Не используете negative-промпт или делаете его неправильно",
  },
  {
    id: 5,
    title: "Нет контроля над композицией и ракурсом",
    description:
      "Модель сама решает, как снять кадр. То крупный план, то общий, то сбоку, то сверху.",
    badLabel: "✕ ПЛОХОЙ ПРОМПТ:",
    badPrompt: "product shot of black bottle",
    goodLabel: "✓ ПРАВИЛЬНЫЙ ПРОМПТ:",
    goodPrompt:
      "black bottle; centered composition, slight top-down angle, 4:5 vertical framing, space on right for text; shallow depth of field",
    hint: 'Композиция — отдельный блок промпта. Метод "Ограничения сначала" для рекламы.',
    diagnosis: "Не контролируете композицию и ракурс",
  },
  {
    id: 6,
    title: "Результат нестабилен — каждый раз новый",
    description:
      'Вы пытаетесь повторить удачную генерацию, но она "не ловится". Промпт слишком хаотичный.',
    badLabel: "✕ ХАОТИЧНЫЙ ПРОМПТ:",
    badPrompt:
      "futuristic city night fog neon cyclist street reflections cool vibe cyberpunk detailed",
    goodLabel: "✓ СТРУКТУРИРОВАННЫЙ ПРОМПТ:",
    goodPrompt:
      "futuristic city street at night, lone cyclist silhouette; wet asphalt reflections, neon signs, volumetric fog; wide shot, vanishing point perspective; neon rim light, teal-magenta harmony; stylized digital illustration, cyberpunk poster art",
    hint: 'Метод "Слои" — каждый слой отвечает за своё. Даёт повторяемость.',
    diagnosis: "Хаотичная структура — нет повторяемости",
  },
];

function getInitialTheme(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem("theme") === "dark";
}

function getTelegramWebApp(): TelegramWebApp | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  return (window as TelegramWindow).Telegram?.WebApp;
}

function getScoreText(count: number): string {
  if (count === 1) {
    return "ПРОБЛЕМА ОБНАРУЖЕНА";
  }
  if (count > 1 && count < 5) {
    return "ПРОБЛЕМЫ ОБНАРУЖЕНО";
  }
  return "ПРОБЛЕМ ОБНАРУЖЕНО";
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(" "))
    .filter(Boolean)
    .map((value) => styles[value] ?? value)
    .join(" ");
}

export function DiagnosticChecklistPage() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialTheme);
  const [checkedProblems, setCheckedProblems] = useState<Record<ProblemId, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) {
      return;
    }

    webApp.ready();
    webApp.expand();
    webApp.MainButton?.hide();
  }, []);

  useEffect(() => {
    if (!result) {
      return;
    }

    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  const toggleTheme = () => {
    const nextValue = !isDarkTheme;
    setIsDarkTheme(nextValue);
    window.localStorage.setItem("theme", nextValue ? "dark" : "light");
  };

  const toggleProblem = (problemId: ProblemId) => {
    setCheckedProblems((previous) => ({
      ...previous,
      [problemId]: !previous[problemId],
    }));
  };

  const handleCheckboxChange = (problemId: ProblemId, checked: boolean) => {
    setCheckedProblems((previous) => ({
      ...previous,
      [problemId]: checked,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedProblems = problems
      .filter((problem) => checkedProblems[problem.id])
      .map((problem) => problem.diagnosis);

    const nextResult: DiagnosticResult = {
      count: selectedProblems.length,
      problems: selectedProblems,
    };

    setResult(nextResult);

    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.sendData(
        JSON.stringify({
          action: "diagnostic_completed",
          problems_count: nextResult.count,
          problems: selectedProblems,
        }),
      );
    }
  };

  const handleGetGuide = () => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.sendData(
        JSON.stringify({
          action: "buy_guide",
          from: "diagnostic_checklist",
        }),
      );
      return;
    }

    window.alert(
      'Эта функция работает только в Telegram боте.\n\nВернитесь в бот и нажмите кнопку "Купить гайд"',
    );
  };

  const score = result?.count ?? 0;

  return (
    <main style={{ minHeight: "100vh", paddingTop: 88 }}>
      <div className={cx("diagnostic-page", isDarkTheme && "dark-theme")}>
        <button type="button" className={cx("theme-toggle")} onClick={toggleTheme}>
          <span className={cx("theme-toggle-icon")}>{isDarkTheme ? "🌙" : "☀️"}</span>
          <span className={cx("theme-toggle-text")}>
            {isDarkTheme ? "Тёмная тема" : "Светлая тема"}
          </span>
        </button>

        <div className={cx("container")}>
          <div className={cx("header")}>
            <div className={cx("brand")}>@KIRILL.AI.POL</div>
            <h1>
              ПОЧЕМУ НЕЙРОСЕТЬ
              <br />
              <span className={cx("highlight")}>ВАС НЕ СЛУШАЕТСЯ?</span>
            </h1>
            <p className={cx("subtitle")}>
              Бесплатная диагностика ваших промптов. Отметьте проблемы, с которыми вы
              сталкиваетесь
            </p>
          </div>

          <div className={cx("intro-box")}>
            <p>
              🎯 <strong>ЗНАКОМАЯ СИТУАЦИЯ?</strong> Вы представляете идеальную картинку в
              голове, пишете промпт, а нейросеть выдаёт совсем не то...
            </p>
            <p>
              Проблема не в нейросети — проблема в структуре промпта. Пройдите быструю
              диагностику и узнайте, что вы делаете не так!
            </p>
          </div>

          <form id="diagnosticForm" onSubmit={handleSubmit}>
            <div className={cx("problems-container")}>
              {problems.map((problem) => {
                const isChecked = checkedProblems[problem.id];

                return (
                  <div
                    key={problem.id}
                    className={cx("problem-section", isChecked && "checked")}
                    data-problem={problem.id}
                    onClick={() => toggleProblem(problem.id)}
                  >
                    <div className={cx("problem-header")}>
                      <div className={cx("checkbox-container")}>
                        <input
                          type="checkbox"
                          className={cx("checkbox-large")}
                          id={`problem${problem.id}`}
                          checked={isChecked}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            handleCheckboxChange(problem.id, event.currentTarget.checked)
                          }
                        />
                        <div className={cx("checkbox-custom")} />
                      </div>
                      <label htmlFor={`problem${problem.id}`} className={cx("problem-title")}>
                        {problem.title}
                      </label>
                    </div>

                    <div className={cx("problem-content")}>
                      <div className={cx("problem-description")}>{problem.description}</div>

                      <div className={cx("example-box")}>
                        <div className={cx("example-label")}>{problem.badLabel}</div>
                        <div className={cx("example-content")}>{problem.badPrompt}</div>

                        <div className={cx("example-label good")}>{problem.goodLabel}</div>
                        <div className={cx("example-content good")}>{problem.goodPrompt}</div>

                        <div className={cx("hint-box")}>
                          <strong>💡 РЕШЕНИЕ:</strong> {problem.hint}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button type="submit" className={cx("check-btn")}>
                📊 ПОЛУЧИТЬ ДИАГНОСТИКУ
              </button>
            </div>
          </form>

          <div
            ref={resultsRef}
            className={cx("results-container", result && "active")}
            id="results"
          >
            <div className={cx("score-box")}>
              <div className={cx("score-number")} id="scoreNumber">
                {score}
              </div>
              <div className={cx("score-text")} id="scoreText">
                {getScoreText(score)}
              </div>
            </div>

            <div className={cx("diagnosis")}>
              <h3>🚨 ВАШ ДИАГНОЗ:</h3>
              <ul id="problemsList">
                {result && result.count === 0 && (
                  <li style={{ paddingLeft: 0 }}>
                    🎉 ОТЛИЧНО! Вы не отметили ни одной проблемы. Но даже если промпты работают,
                    полный гайд поможет вам создавать их быстрее и понимать, ПОЧЕМУ они работают.
                  </li>
                )}
                {result?.problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </div>

            <div className={cx("cta-box")}>
              <h2>
                ПОЛУЧИТЕ РЕШЕНИЕ
                <br />
                ПРЯМО СЕЙЧАС
              </h2>
              <p>
                <strong>Полный гайд "Как писать промпты"</strong> — система для создания
                предсказуемых картинок с первого раза
              </p>

              <div className={cx("benefits-list")}>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>5 методов написания промптов под разные задачи</span>
                </div>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>Универсальный шаблон из 8 блоков с примерами</span>
                </div>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>Чек-лист правил + профессиональные термины</span>
                </div>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>
                    5 детальных примеров (портреты, пейзажи, иллюстрации, реклама)
                  </span>
                </div>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>Структуры в Markdown/XML/JSON для быстрого редактирования</span>
                </div>
                <div className={cx("benefit-item")}>
                  <span className={cx("benefit-check")}>✓</span>
                  <span>
                    <strong>БОНУС:</strong> Лучшие площадки + способ получить 1000
                    генераций/месяц бесплатно
                  </span>
                </div>
              </div>

              <button type="button" className={cx("cta-btn")} onClick={handleGetGuide}>
                ПОЛУЧИТЬ ПОЛНЫЙ ГАЙД
              </button>
            </div>
          </div>

          <p className={cx("footer-note")}>
            💡 Этот чек-лист — фрагмент полного гайда, который поможет вам перейти от случайных
            результатов к стабильным профессиональным промптам
          </p>
        </div>
      </div>
    </main>
  );
}
