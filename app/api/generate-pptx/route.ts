import { NextResponse } from "next/server"
// @ts-ignore
import PptxGenJS from "pptxgenjs"

export async function GET() {
  const pptx = new PptxGenJS()

  pptx.author = "Титов Николай, Алиев Арсен"
  pptx.title = "Экспертная оценка интерфейса Lichess.org"
  pptx.subject = "Отчёт по юзабилити"
  pptx.company = "БГТУ ВОЕНМЕХ"

  const BG = "161512"
  const GREEN = "629924"
  const PURPLE = "9b59b6"
  const WHITE = "FFFFFF"
  const GRAY = "BABABA"
  const ORANGE = "E67E22"

  // ── СЛАЙД 1: Титульный ──────────────────────────────────────────────────
  let slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.92, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("ЭКСПЕРТНАЯ ОЦЕНКА ИНТЕРФЕЙСА И ЮЗАБИЛИТИ", {
    x: 0.5, y: 1.2, w: 9, h: 0.9,
    fontSize: 28, bold: true, color: WHITE, align: "center", charSpacing: 1,
  })
  slide.addText("Lichess.org", {
    x: 0.5, y: 2.3, w: 9, h: 1.1,
    fontSize: 60, bold: true, color: GREEN, align: "center",
  })
  slide.addShape(pptx.ShapeType.rect, { x: 3.5, y: 3.55, w: 3, h: 0.04, fill: { color: GRAY } })
  slide.addText("Титов Николай  •  Алиев Арсен", {
    x: 0.5, y: 3.8, w: 9, h: 0.5,
    fontSize: 18, color: GRAY, align: "center",
  })
  slide.addText("БГТУ «ВОЕНМЕХ» им. Д.Ф. Устинова  •  Кафедра компьютерного дизайна  •  2026", {
    x: 0.5, y: 5.6, w: 9, h: 0.4,
    fontSize: 11, color: "666666", align: "center",
  })

  // ── СЛАЙД 2: Содержание ──────────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Содержание", {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 30, bold: true, color: WHITE,
  })
  const contents = [
    ["01", "Описание ресурса"],
    ["02", "Целевая аудитория"],
    ["03", "Критерии оценки"],
    ["04", "Итоговые результаты"],
    ["05", "Выявленные проблемы"],
    ["06", "Концепт редизайна"],
    ["07", "Стратегия улучшений"],
    ["08", "Выводы"],
  ]
  contents.forEach(([num, label], i) => {
    const col = i < 4 ? 0 : 1
    const row = i % 4
    slide.addText(num, {
      x: 0.5 + col * 4.6, y: 1.3 + row * 1.1, w: 0.7, h: 0.7,
      fontSize: 20, bold: true, color: GREEN, align: "center",
      fill: { color: "1E1C19" }, shape: pptx.ShapeType.rect,
    })
    slide.addText(label, {
      x: 1.35 + col * 4.6, y: 1.3 + row * 1.1, w: 3.5, h: 0.7,
      fontSize: 15, color: WHITE, valign: "middle",
    })
  })

  // ── СЛАЙД 3: О ресурсе ───────────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("О ресурсе Lichess.org", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const facts = [
    ["Тип", "Бесплатная онлайн-платформа для игры в шахматы"],
    ["Основана", "2010 год, Тибо Дюпюи (Франция)"],
    ["Аудитория", "5+ миллионов активных пользователей в месяц"],
    ["Особенность", "100% бесплатный, открытый исходный код, без рекламы"],
    ["Функции", "Онлайн-игры, турниры, задачи, обучение, анализ партий"],
  ]
  facts.forEach(([key, val], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: 1.25 + i * 0.95, w: 9, h: 0.78,
      fill: { color: i % 2 === 0 ? "1E1C19" : "1A1816" }, line: { color: "2A2825", width: 0.5 },
    })
    slide.addText(key, {
      x: 0.7, y: 1.25 + i * 0.95, w: 1.8, h: 0.78,
      fontSize: 13, bold: true, color: GREEN, valign: "middle",
    })
    slide.addText(val, {
      x: 2.7, y: 1.25 + i * 0.95, w: 6.5, h: 0.78,
      fontSize: 13, color: WHITE, valign: "middle",
    })
  })

  // ── СЛАЙД 4: Целевая аудитория ───────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Целевая аудитория", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const audiences = [
    ["Начинающие", "35%", "Обучение с нуля, первые партии", GREEN],
    ["Любители", "40%", "Регулярные партии, рейтинг", GREEN],
    ["Продвинутые", "15%", "Турниры, глубокий анализ", PURPLE],
    ["Профессионалы", "5%", "Стриминг, тренировки", PURPLE],
    ["Зрители", "5%", "Трансляции, контент", ORANGE],
  ]
  audiences.forEach(([name, pct, desc, color], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: 1.3 + i * 0.95, w: 9, h: 0.8,
      fill: { color: "1E1C19" }, line: { color: "2A2825", width: 0.5 },
    })
    slide.addText(pct, {
      x: 0.5, y: 1.3 + i * 0.95, w: 1.2, h: 0.8,
      fontSize: 22, bold: true, color: color, align: "center", valign: "middle",
    })
    slide.addText(name, {
      x: 1.9, y: 1.3 + i * 0.95, w: 2.2, h: 0.8,
      fontSize: 14, bold: true, color: WHITE, valign: "middle",
    })
    slide.addText(desc, {
      x: 4.3, y: 1.3 + i * 0.95, w: 5, h: 0.8,
      fontSize: 13, color: GRAY, valign: "middle",
    })
  })

  // ── СЛАЙД 5: Критерии оценки ─────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("10 критериев оценки", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const criteria = [
    ["Ясность и понятность", "5", false],
    ["Навигация", "5", false],
    ["Эффективность", "5", false],
    ["Согласованность", "4", true],
    ["Визуальный дизайн", "5", false],
    ["Отзывчивость (feedback)", "5", false],
    ["Доступность", "4", true],
    ["Адаптивность (responsive)", "5", false],
    ["Поддержка обучения", "4", true],
    ["Поддержка игрового процесса", "5", false],
  ]
  criteria.forEach(([name, score, isWeak], i) => {
    const col = i < 5 ? 0 : 1
    const row = i % 5
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3 + col * 4.8, y: 1.25 + row * 1.0, w: 4.4, h: 0.82,
      fill: { color: isWeak ? "1E1420" : "1E1C19" },
      line: { color: isWeak ? PURPLE : "2A2825", width: isWeak ? 1 : 0.5 },
    })
    slide.addText(name, {
      x: 0.5 + col * 4.8, y: 1.25 + row * 1.0, w: 3.0, h: 0.82,
      fontSize: 12, color: WHITE, valign: "middle",
    })
    slide.addText(score + "/5", {
      x: 3.7 + col * 4.8, y: 1.25 + row * 1.0, w: 0.9, h: 0.82,
      fontSize: 18, bold: true, color: isWeak ? PURPLE : GREEN, align: "center", valign: "middle",
    })
  })

  // ── СЛАЙД 6: Итоговые результаты ─────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Итоговые результаты", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  // Большие числа
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.4, w: 4, h: 3, fill: { color: "1E2A1A" }, line: { color: GREEN, width: 2 },
  })
  slide.addText("47/50", {
    x: 0.5, y: 1.8, w: 4, h: 1.5,
    fontSize: 64, bold: true, color: GREEN, align: "center",
  })
  slide.addText("баллов", {
    x: 0.5, y: 3.3, w: 4, h: 0.5,
    fontSize: 16, color: GRAY, align: "center",
  })
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.5, y: 1.4, w: 4, h: 3, fill: { color: "1A1420" }, line: { color: PURPLE, width: 2 },
  })
  slide.addText("94%", {
    x: 5.5, y: 1.8, w: 4, h: 1.5,
    fontSize: 64, bold: true, color: PURPLE, align: "center",
  })
  slide.addText("от максимума", {
    x: 5.5, y: 3.3, w: 4, h: 0.5,
    fontSize: 16, color: GRAY, align: "center",
  })
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.7, w: 9, h: 0.65,
    fill: { color: GREEN },
  })
  slide.addText("ВЫСОКИЙ УРОВЕНЬ КАЧЕСТВА ИНТЕРФЕЙСА", {
    x: 0.5, y: 4.7, w: 9, h: 0.65,
    fontSize: 16, bold: true, color: "000000", align: "center", valign: "middle",
  })

  // ── СЛАЙДЫ 7-9: Три проблемы ─────────────────────────────────────────────
  const problems = [
    {
      title: "Проблема 1: Согласованность (4/5)",
      issues: [
        "Gantt-шкала турниров отличается от карточного стиля остального сайта",
        "Разная типография и отступы в разделах Studies и Puzzles",
        "Несогласованные стили таблиц лидеров в разных секциях",
      ],
      solutions: [
        "Добавить переключаемый карточный режим для турниров",
        "Унифицировать типографику: 16px gap, 8px border-radius по всему сайту",
        "Синхронизировать стили таблиц через единую дизайн-систему",
      ],
    },
    {
      title: "Проблема 2: Доступность (4/5)",
      issues: [
        "Иконки навигации без видимых текстовых подписей",
        "Gantt-шкала с мелкими целевыми областями для нажатия",
        "Смена языка скрыта в глубине меню Preferences",
        "Кнопки меньше 44px на мобильных устройствах",
      ],
      solutions: [
        "Добавить видимые подписи и tooltips ко всем иконкам",
        "Вынести переключатель языка в основную шапку сайта",
        "Увеличить целевые области до минимума 48 x 48px",
        "Провести полный аудит соответствия WCAG 2.2 AA",
      ],
    },
    {
      title: "Проблема 3: Поддержка обучения (4/5)",
      issues: [
        "Прогресс гостя не сохраняется между сессиями браузера",
        "Раздел Studies смешивает официальный контент и материалы сообщества",
        "Отсутствует фильтрация учебных материалов по уровню сложности",
        "Нет удобного способа вернуться к прерванному курсу",
      ],
      solutions: [
        "Сохранять прогресс незарегистрированных пользователей в localStorage",
        "Разделить Studies на вкладки: Официальные курсы / Сообщество",
        "Добавить фильтр уровня: Новичок / Средний / Продвинутый",
        "Создать виджет «Продолжить обучение» на главной странице",
      ],
    },
  ]

  problems.forEach((prob) => {
    slide = pptx.addSlide()
    slide.background = { color: BG }
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: PURPLE } })
    slide.addText(prob.title, {
      x: 0.5, y: 0.28, w: 9, h: 0.65, fontSize: 22, bold: true, color: PURPLE,
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: 1.1, w: 4.2, h: prob.issues.length * 1.0 + 0.5,
      fill: { color: "1E1C19" }, line: { color: "2A2825", width: 0.5 },
    })
    slide.addText("Недостатки:", {
      x: 0.7, y: 1.2, w: 3.8, h: 0.4, fontSize: 13, bold: true, color: GRAY,
    })
    prob.issues.forEach((issue, i) => {
      slide.addText("• " + issue, {
        x: 0.7, y: 1.65 + i * 0.88, w: 3.8, h: 0.78, fontSize: 12, color: WHITE, valign: "top",
      })
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 5.2, y: 1.1, w: 4.3, h: prob.solutions.length * 1.0 + 0.5,
      fill: { color: "1A2215" }, line: { color: GREEN, width: 1 },
    })
    slide.addText("Решения:", {
      x: 5.4, y: 1.2, w: 3.9, h: 0.4, fontSize: 13, bold: true, color: GREEN,
    })
    prob.solutions.forEach((sol, i) => {
      slide.addText("→ " + sol, {
        x: 5.4, y: 1.65 + i * 0.88, w: 3.9, h: 0.78, fontSize: 12, color: WHITE, valign: "top",
      })
    })
  })

  // ── СЛАЙД 10: Стратегия улучшений ───────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Стратегия улучшений", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const strategy = [
    {
      label: "Quick Wins",
      timeline: "1–2 спринта",
      color: GREEN,
      items: ["localStorage для гостевого прогресса", "Видимые подписи к иконкам", "Язык в шапке сайта", "Унификация типографики"],
      kpi: "+15–20% удержания",
    },
    {
      label: "Среднесрочные",
      timeline: "1–2 квартала",
      color: PURPLE,
      items: ["Карточный режим турниров", "Разделение Studies на вкладки", "Фильтр по уровню сложности", "Увеличение tap-областей"],
      kpi: "+30–40% завершаемости",
    },
    {
      label: "Системные",
      timeline: "6+ месяцев",
      color: ORANGE,
      items: ["Единая дизайн-система", "Рекомендательный движок", "Расширение мобильного приложения"],
      kpi: "Масштабирование",
    },
  ]
  strategy.forEach((s, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3 + i * 3.2, y: 1.2, w: 3.0, h: 5.0,
      fill: { color: "1E1C19" }, line: { color: s.color, width: 2 },
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3 + i * 3.2, y: 1.2, w: 3.0, h: 0.65,
      fill: { color: s.color },
    })
    slide.addText(s.label, {
      x: 0.3 + i * 3.2, y: 1.2, w: 3.0, h: 0.65,
      fontSize: 15, bold: true, color: "000000", align: "center", valign: "middle",
    })
    slide.addText(s.timeline, {
      x: 0.3 + i * 3.2, y: 1.9, w: 3.0, h: 0.45,
      fontSize: 12, color: GRAY, align: "center",
    })
    s.items.forEach((item, j) => {
      slide.addText("• " + item, {
        x: 0.5 + i * 3.2, y: 2.4 + j * 0.7, w: 2.7, h: 0.6,
        fontSize: 11, color: WHITE,
      })
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3 + i * 3.2, y: 5.7, w: 3.0, h: 0.5,
      fill: { color: "2A2825" },
    })
    slide.addText(s.kpi, {
      x: 0.3 + i * 3.2, y: 5.7, w: 3.0, h: 0.5,
      fontSize: 12, bold: true, color: s.color, align: "center", valign: "middle",
    })
  })

  // ── СЛАЙД 11: Чек-лист ──────────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Чек-лист юзабилити", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const checklist = [
    ["Главная страница информативна без регистрации", true],
    ["Навигация интуитивно понятна новому пользователю", true],
    ["Доступ к игре осуществляется за 1–2 клика", true],
    ["Игровой процесс работает без сбоев и задержек", true],
    ["Обратная связь системы понятна пользователю", true],
    ["Мобильная версия адаптивна и удобна", true],
    ["Помощь и FAQ легко найти", true],
    ["Настройки профиля доступны и логичны", true],
    ["Локализация и смена языка доступны", false],
    ["Отсутствуют критические ошибки интерфейса", true],
  ]
  checklist.forEach(([label, ok], i) => {
    const col = i < 5 ? 0 : 1
    const row = i % 5
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3 + col * 4.8, y: 1.3 + row * 1.05, w: 4.4, h: 0.88,
      fill: { color: ok ? "1A2215" : "1E1420" },
      line: { color: ok ? GREEN : PURPLE, width: ok ? 0.5 : 1 },
    })
    slide.addText(ok ? "✓" : "≈", {
      x: 0.5 + col * 4.8, y: 1.3 + row * 1.05, w: 0.65, h: 0.88,
      fontSize: 20, bold: true, color: ok ? GREEN : PURPLE, align: "center", valign: "middle",
    })
    slide.addText(label as string, {
      x: 1.2 + col * 4.8, y: 1.3 + row * 1.05, w: 3.3, h: 0.88,
      fontSize: 11, color: ok ? WHITE : GRAY, valign: "middle",
    })
  })

  // ── СЛАЙД 12: Выводы ────────────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Выводы", {
    x: 0.5, y: 0.35, w: 9, h: 0.65, fontSize: 30, bold: true, color: WHITE,
  })
  const conclusions = [
    ["01", GREEN, "Lichess.org демонстрирует высокое качество интерфейса — 47/50 баллов (94%)"],
    ["02", PURPLE, "Выявлено 3 зоны роста: согласованность, доступность, поддержка обучения"],
    ["03", GREEN, "Для каждой проблемы разработан конкретный концепт редизайна с решениями"],
    ["04", ORANGE, "Quick Wins (локальные улучшения) можно реализовать за 1–2 спринта"],
    ["05", GREEN, "Ожидаемый эффект от улучшений: +15–40% по ключевым метрикам"],
  ]
  conclusions.forEach(([num, color, text], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y: 1.3 + i * 1.0, w: 9.4, h: 0.85,
      fill: { color: "1E1C19" }, line: { color: color as string, width: 1 },
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y: 1.3 + i * 1.0, w: 0.65, h: 0.85,
      fill: { color: color as string },
    })
    slide.addText(num as string, {
      x: 0.3, y: 1.3 + i * 1.0, w: 0.65, h: 0.85,
      fontSize: 16, bold: true, color: "000000", align: "center", valign: "middle",
    })
    slide.addText(text as string, {
      x: 1.15, y: 1.3 + i * 1.0, w: 8.3, h: 0.85,
      fontSize: 13, color: WHITE, valign: "middle",
    })
  })

  // ── СЛАЙД 13: Спасибо ───────────────────────────────────────────────────
  slide = pptx.addSlide()
  slide.background = { color: BG }
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.92, w: "100%", h: 0.08, fill: { color: GREEN } })
  slide.addText("Спасибо за внимание!", {
    x: 0.5, y: 2.0, w: 9, h: 1.0,
    fontSize: 44, bold: true, color: WHITE, align: "center",
  })
  slide.addText("Готовы ответить на вопросы", {
    x: 0.5, y: 3.2, w: 9, h: 0.6,
    fontSize: 20, color: GREEN, align: "center",
  })
  slide.addShape(pptx.ShapeType.rect, { x: 3.2, y: 4.1, w: 3.6, h: 0.05, fill: { color: GRAY } })
  slide.addText("Титов Николай  •  Алиев Арсен", {
    x: 0.5, y: 4.3, w: 9, h: 0.5,
    fontSize: 16, color: GRAY, align: "center",
  })
  slide.addText("БГТУ «ВОЕНМЕХ»  •  Кафедра КД  •  2026", {
    x: 0.5, y: 4.9, w: 9, h: 0.4,
    fontSize: 13, color: "555555", align: "center",
  })

  // Генерация в буфер и отдача как файл
  const buffer = await pptx.write({ outputType: "nodebuffer" }) as Buffer

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": 'attachment; filename="Lichess-Usability-Report.pptx"',
    },
  })
}
