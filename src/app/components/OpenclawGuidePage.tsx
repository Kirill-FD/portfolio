import { useState } from "react";
import styles from "./OpenclawGuidePage.module.css";

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

export function OpenclawGuidePage() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialTheme);

  const toggleTheme = () => {
    const nextValue = !isDarkTheme;
    setIsDarkTheme(nextValue);
    window.localStorage.setItem("theme", nextValue ? "dark" : "light");
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: 88 }}>
      <div className={cx("openclaw-page", isDarkTheme && "dark-theme")}>
        <button type="button" className={cx("theme-toggle")} onClick={toggleTheme}>
          <span className={cx("theme-icon")}>{isDarkTheme ? "🌙" : "☀️"}</span>
          <span className={cx("theme-toggle-text")}>
            {isDarkTheme ? "Тёмная тема" : "Светлая тема"}
          </span>
        </button>

        <div className={cx("container")}>
          <div className={cx("header")}>
            <div className={cx("brand")}>@KIRILL.AI.POL</div>
            <h1>Установка OpenClaw</h1>
            <p className={cx("subtitle")}>
              Пошаговая инструкция по созданию автономного AI-ассистента в облаке
            </p>
          </div>

          <div className={cx("content")}>
            <div className={cx("intro-card")}>
              <h2>🤖 Что такое OpenClaw?</h2>
              <p>
                OpenClaw — это автономный AI-ассистент, который работает круглосуточно на облачном
                сервере. Вы можете управлять им через WhatsApp или Telegram со своего телефона, не
                держа открытыми вкладки браузера.
              </p>
              <p>
                <strong>Преимущества облачной установки:</strong>
              </p>
              <ul className={cx("step-list")}>
                <li>Работает 24/7 без участия вашего компьютера</li>
                <li>Безопасность — изолирован от ваших личных файлов</li>
                <li>Нет замедления работы основного ПК</li>
                <li>Управление прямо из мессенджера</li>
              </ul>

              <div className={cx("warning-box")}>
                <p>
                  <strong>Внимание!</strong> Данная инструкция предназначена для создания своего
                  AI-ассистента OpenClaw в облачном сервере. У ассистента не будет доступа к файлам
                  вашего ПК, так как он находится на удаленном сервере.
                </p>
              </div>
            </div>

            <div className={cx("step-card")}>
              <div className={cx("step-header")}>
                <div className={cx("step-number")}>1</div>
                <div className={cx("step-title")}>Аренда и настройка VPS на Hostinger</div>
              </div>
              <div className={cx("step-content")}>
                <p>
                  Облачный сервер позволяет агенту работать круглосуточно без замедления вашего
                  компьютера и риска для личных файлов.
                </p>

                <ul className={cx("step-list")}>
                  <li>
                    <strong>Выберите провайдера:</strong> Рекомендуется Hostinger — визуальная
                    панель управления без сложных команд терминала
                  </li>
                  <li>
                    <strong>Выберите тарифный план:</strong> KVM2 для лучшей производительности
                    (KVM1 подходит для начала)
                  </li>
                  <li>
                    <strong>Операционная система:</strong> Выберите ОС с <code>LTS</code> (Long-Term
                    Support) в названии для стабильности
                  </li>
                  <li>
                    <strong>Расположение сервера:</strong> Географически близкое к вам
                    местоположение
                  </li>
                  <li>
                    <strong>Необходимые дополнения:</strong> Перед завершением покупки включите:
                    <ul className={cx("nested-list")}>
                      <li>Сканер вредоносных программ</li>
                      <li>
                        <strong>Docker Manager</strong> (критично важно! Создает изолированные
                        контейнеры для безопасной работы)
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Завершение:</strong> Оплатите сервер. После установки Docker Manager ваш
                    виртуальный компьютер готов к работе
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("step-card")}>
              <div className={cx("step-header")}>
                <div className={cx("step-number")}>2</div>
                <div className={cx("step-title")}>Установите OpenClaw через Docker</div>
              </div>
              <div className={cx("step-content")}>
                <ul className={cx("step-list")}>
                  <li>
                    В панели управления Hostinger найдите <strong>Docker Manager</strong> в левой
                    боковой панели
                  </li>
                  <li>
                    Перейдите в каталог, найдите <strong>OpenClaw</strong> и нажмите{" "}
                    <code>Развернуть</code>
                  </li>
                  <li>
                    Появится экран настройки:
                    <ul className={cx("nested-list")}>
                      <li>
                        <strong>Gateway Token:</strong> Скопируйте и сохраните автоматически
                        сгенерированный токен. Это пароль к вашей системе!
                      </li>
                      <li>
                        <strong>AI Provider Key:</strong> Вставьте API-ключ вашего провайдера AI:
                        <ul
                          style={{
                            listStyle: "none",
                            paddingLeft: 20,
                            marginTop: 8,
                          }}
                        >
                          <li>• Если используете Claude → ключ из Anthropic</li>
                          <li>• Если используете GPT-4 → ключ из OpenAI</li>
                          <li>• Поле для неиспользуемого провайдера оставьте пустым</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Нажмите <code>Развернуть</code>. Установка займет 1-2 минуты
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("step-card")}>
              <div className={cx("step-header")}>
                <div className={cx("step-number")}>3</div>
                <div className={cx("step-title")}>Первый запуск и вход в систему</div>
              </div>
              <div className={cx("step-content")}>
                <ul className={cx("step-list")}>
                  <li>
                    Как только статус изменится на <code>Running</code> (Работает), рядом появится
                    номер порта
                  </li>
                  <li>Нажмите на этот порт, чтобы открыть веб-интерфейс</li>
                  <li>
                    Вставьте ранее сохраненный <strong>Gateway Token</strong> в поле входа
                  </li>
                  <li>
                    Нажмите <code>Подключиться</code>. Теперь вы в системе и можете взаимодействовать
                    с агентом через браузер!
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("step-card")}>
              <div className={cx("step-header")}>
                <div className={cx("step-number")}>4</div>
                <div className={cx("step-title")}>Настройка безопасности</div>
              </div>
              <div className={cx("step-content")}>
                <p>
                  Чтобы агент был действительно автономным и безопасным, внесите свой номер телефона
                  в белый список — он будет игнорировать команды от других пользователей.
                </p>

                <ul className={cx("step-list")}>
                  <li>
                    Перейдите в <code>Настройки</code> → <code>Конфигурация</code> → вкладка{" "}
                    <code>Raw</code>
                  </li>
                  <li>
                    Вставьте код конфигурации. В скобках этого кода введите{" "}
                    <strong>свой номер телефона</strong>
                  </li>
                  <li>
                    Если вы ранее ввели ключ OpenAI, вставьте также конфигурацию конкретной модели,
                    чтобы бот знал, какую модель запускать
                  </li>
                  <li>
                    Нажмите <code>Сохранить</code>
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("step-card")}>
              <div className={cx("step-header")}>
                <div className={cx("step-number")}>5</div>
                <div className={cx("step-title")}>Подключите каналы обмена сообщениями</div>
              </div>
              <div className={cx("step-content")}>
                <p>
                  Этот шаг позволит управлять агентом со своего телефона, не держа открытой вкладку
                  браузера.
                </p>

                <ul className={cx("step-list")}>
                  <li>
                    Перейдите в раздел <code>Каналы</code> на боковой панели
                  </li>
                  <li>
                    Вы увидите QR-код. Отсканируйте его с помощью <strong>WhatsApp</strong> или{" "}
                    <strong>Telegram</strong>, чтобы связать свою учетную запись
                  </li>
                  <li>
                    ✅ Готово! Теперь ваш агент работает на изолированном сервере, и вы можете
                    полностью управлять им со своего телефона
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("intro-card success-card")}>
              <h2>🎉 Поздравляем!</h2>
              <p>Ваш автономный AI-ассистент OpenClaw успешно установлен и готов к работе. Теперь вы можете:</p>
              <ul className={cx("step-list")}>
                <li>Управлять им из WhatsApp или Telegram</li>
                <li>Работать с ним 24/7 без включенного компьютера</li>
                <li>Быть уверенным в безопасности своих данных</li>
                <li>Настраивать и расширять функционал по мере необходимости</li>
              </ul>
            </div>
          </div>

          <div className={cx("footer")}>
            © 2026 <span className={cx("footer-brand")}>@KIRILL.AI.POL</span> | Инструкция по установке
            OpenClaw
          </div>
        </div>
      </div>
    </main>
  );
}
