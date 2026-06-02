"use client"

import { useState } from "react"

declare global {
  interface Window {
    PptxGenJS: any
  }
}

export default function PresentationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const loadScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.PptxGenJS) {
        resolve()
        return
      }
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/gh/gitbrent/PptxGenJS@3.12.0/dist/pptxgen.bundle.js"
      script.onload = () => {
        setIsLoaded(true)
        resolve()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  const generatePresentation = async () => {
    setIsGenerating(true)
    try {
      await loadScript()
      const pptx = new window.PptxGenJS()

      // Настройки презентации
      pptx.author = "Титов Николай, Алиев Арсен"
      pptx.title = "Экспертная оценка интерфейса Lichess.org"
      pptx.subject = "Отчёт по юзабилити"
      pptx.company = "БГТУ ВОЕНМЕХ"

      // Цвета
      const DARK_BG = "161512"
      const ACCENT_GREEN = "629924"
      const ACCENT_PURPLE = "9b59b6"
      const WHITE = "FFFFFF"
      const GRAY = "BABABA"

      // ========== СЛАЙД 1: Титульный ==========
      let slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("ЭКСПЕРТНАЯ ОЦЕНКА ИНТЕРФЕЙСА\nИ ЮЗАБИЛИТИ", {
        x: 0.5, y: 1.5, w: 9, h: 1.5,
        fontSize: 36, bold: true, color: WHITE, align: "center"
      })
      slide.addText("Lichess.org", {
        x: 0.5, y: 3.2, w: 9, h: 0.8,
        fontSize: 48, bold: true, color: ACCENT_GREEN, align: "center"
      })
      slide.addText("Титов Николай\nАлиев Арсен", {
        x: 0.5, y: 4.5, w: 9, h: 1,
        fontSize: 20, color: GRAY, align: "center"
      })
      slide.addText("БГТУ «ВОЕНМЕХ» им. Д.Ф. Устинова\nКафедра компьютерного дизайна\n6 семестр, 2025/2026", {
        x: 0.5, y: 5.8, w: 9, h: 1,
        fontSize: 14, color: GRAY, align: "center"
      })

      // ========== СЛАЙД 2: Содержание ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Содержание", {
        x: 0.5, y: 0.5, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      const contents = [
        "1. Описание ресурса",
        "2. Целевая аудитория",
        "3. Критерии оценки",
        "4. Результаты оценки",
        "5. Выявленные проблемы",
        "6. Концепт редизайна",
        "7. Стратегия улучшений",
        "8. Выводы"
      ]
      contents.forEach((item, i) => {
        slide.addText(item, {
          x: 1, y: 1.4 + i * 0.55, w: 8, h: 0.5,
          fontSize: 18, color: i % 2 === 0 ? WHITE : GRAY
        })
      })

      // ========== СЛАЙД 3: О ресурсе ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("О ресурсе Lichess.org", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      slide.addText([
        { text: "Тип: ", options: { bold: true, color: ACCENT_GREEN } },
        { text: "Бесплатная онлайн-платформа для игры в шахматы\n\n", options: { color: WHITE } },
        { text: "Основана: ", options: { bold: true, color: ACCENT_GREEN } },
        { text: "2010 год\n\n", options: { color: WHITE } },
        { text: "Пользователей: ", options: { bold: true, color: ACCENT_GREEN } },
        { text: "5+ миллионов активных в месяц\n\n", options: { color: WHITE } },
        { text: "Особенность: ", options: { bold: true, color: ACCENT_GREEN } },
        { text: "100% бесплатный, открытый исходный код, без рекламы\n\n", options: { color: WHITE } },
        { text: "Функции: ", options: { bold: true, color: ACCENT_GREEN } },
        { text: "Онлайн-игры, турниры, задачи, обучение, анализ партий", options: { color: WHITE } }
      ], { x: 0.5, y: 1.1, w: 9, h: 4, fontSize: 16, valign: "top" })

      // ========== СЛАЙД 4: Целевая аудитория ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Целевая аудитория", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      const audiences = [
        ["Начинающие", "35%", "Обучение с нуля"],
        ["Любители", "40%", "Регулярные партии"],
        ["Продвинутые", "15%", "Турниры, анализ"],
        ["Профессионалы", "5%", "Стриминг, тренировки"],
        ["Зрители", "5%", "Трансляции, контент"]
      ]
      audiences.forEach((row, i) => {
        slide.addText(row[0], {
          x: 0.5, y: 1.2 + i * 0.8, w: 2.5, h: 0.6,
          fontSize: 16, bold: true, color: ACCENT_GREEN
        })
        slide.addText(row[1], {
          x: 3.2, y: 1.2 + i * 0.8, w: 1.2, h: 0.6,
          fontSize: 16, bold: true, color: ACCENT_PURPLE, align: "center"
        })
        slide.addText(row[2], {
          x: 4.6, y: 1.2 + i * 0.8, w: 5, h: 0.6,
          fontSize: 16, color: WHITE
        })
      })

      // ========== СЛАЙД 5: Критерии оценки ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Критерии оценки (10 критериев)", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      const criteria = [
        ["1. Ясность и понятность", "5/5"],
        ["2. Навигация", "5/5"],
        ["3. Эффективность", "5/5"],
        ["4. Согласованность", "4/5"],
        ["5. Визуальный дизайн", "5/5"],
        ["6. Отзывчивость", "5/5"],
        ["7. Доступность", "4/5"],
        ["8. Адаптивность", "5/5"],
        ["9. Поддержка обучения", "4/5"],
        ["10. Поддержка игрового процесса", "5/5"]
      ]
      criteria.forEach((row, i) => {
        const isLow = row[1] === "4/5"
        slide.addText(row[0], {
          x: 0.5, y: 1.0 + i * 0.45, w: 6, h: 0.4,
          fontSize: 14, color: isLow ? ACCENT_PURPLE : WHITE
        })
        slide.addText(row[1], {
          x: 7, y: 1.0 + i * 0.45, w: 2, h: 0.4,
          fontSize: 14, bold: true, color: isLow ? ACCENT_PURPLE : ACCENT_GREEN, align: "right"
        })
      })

      // ========== СЛАЙД 6: Итоговые результаты ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Итоговые результаты", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      slide.addText("47/50", {
        x: 0.5, y: 1.5, w: 4, h: 1.5,
        fontSize: 72, bold: true, color: ACCENT_GREEN, align: "center"
      })
      slide.addText("баллов", {
        x: 0.5, y: 3, w: 4, h: 0.5,
        fontSize: 20, color: GRAY, align: "center"
      })
      slide.addText("94%", {
        x: 5, y: 1.5, w: 4, h: 1.5,
        fontSize: 72, bold: true, color: ACCENT_PURPLE, align: "center"
      })
      slide.addText("от максимума", {
        x: 5, y: 3, w: 4, h: 0.5,
        fontSize: 20, color: GRAY, align: "center"
      })
      slide.addText("ВЫСОКИЙ УРОВЕНЬ КАЧЕСТВА ИНТЕРФЕЙСА", {
        x: 0.5, y: 4.2, w: 9, h: 0.6,
        fontSize: 18, bold: true, color: ACCENT_GREEN, align: "center"
      })

      // ========== СЛАЙД 7: Проблема 1 ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Проблема 1: Согласованность (4/5)", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: ACCENT_PURPLE
      })
      slide.addText("Выявленные недостатки:", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: WHITE
      })
      slide.addText([
        "• Gantt-шкала турниров отличается от карточного стиля\n",
        "• Разная типография в Studies и Puzzles\n",
        "• Несогласованные таблицы лидеров"
      ].join(""), { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 14, color: GRAY })
      slide.addText("Решение:", {
        x: 0.5, y: 3.2, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: ACCENT_GREEN
      })
      slide.addText([
        "→ Добавить карточный режим турниров\n",
        "→ Унифицировать типографику (16px gap, 8px border-radius)\n",
        "→ Синхронизировать стили таблиц"
      ].join(""), { x: 0.5, y: 3.7, w: 9, h: 1.5, fontSize: 14, color: WHITE })

      // ========== СЛАЙД 8: Проблема 2 ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Проблема 2: Доступность (4/5)", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: ACCENT_PURPLE
      })
      slide.addText("Выявленные недостатки:", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: WHITE
      })
      slide.addText([
        "• Иконки без видимых подписей\n",
        "• Gantt-шкала с мелкими целевыми областями\n",
        "• Язык скрыт в меню Preferences\n",
        "• Кнопки < 44px на мобильных устройствах"
      ].join(""), { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 14, color: GRAY })
      slide.addText("Решение:", {
        x: 0.5, y: 3.2, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: ACCENT_GREEN
      })
      slide.addText([
        "→ Добавить видимые подписи и tooltips к иконкам\n",
        "→ Вынести язык в шапку сайта\n",
        "→ Увеличить целевые области до 48×48px\n",
        "→ Провести аудит по WCAG 2.2 AA"
      ].join(""), { x: 0.5, y: 3.7, w: 9, h: 1.5, fontSize: 14, color: WHITE })

      // ========== СЛАЙД 9: Проблема 3 ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Проблема 3: Поддержка обучения (4/5)", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: ACCENT_PURPLE
      })
      slide.addText("Выявленные недостатки:", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: WHITE
      })
      slide.addText([
        "• Прогресс гостя не сохраняется между сессиями\n",
        "• Studies смешивает официальное и пользовательское\n",
        "• Нет разделения по уровню сложности\n",
        "• Сложно вернуться к прерванному курсу"
      ].join(""), { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 14, color: GRAY })
      slide.addText("Решение:", {
        x: 0.5, y: 3.2, w: 9, h: 0.4,
        fontSize: 16, bold: true, color: ACCENT_GREEN
      })
      slide.addText([
        "→ Сохранять прогресс в localStorage\n",
        "→ Разделить Studies на вкладки\n",
        "→ Добавить фильтр по уровню (Новичок/Средний/Продвинутый)\n",
        "→ Создать виджет «Продолжить обучение» на главной"
      ].join(""), { x: 0.5, y: 3.7, w: 9, h: 1.5, fontSize: 14, color: WHITE })

      // ========== СЛАЙД 10: Концепт редизайна - Турниры ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Концепт редизайна: Турниры", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: WHITE
      })
      slide.addText("Было: Gantt-шкала → Стало: Карточный режим", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, color: GRAY
      })
      slide.addText([
        "• Переключатель между режимами (Card/Gantt)\n",
        "• Карточки с названием, временем, форматом\n",
        "• Цветовые бейджи: Blitz (зеленый), Rapid (фиолетовый)\n",
        "• Количество участников\n",
        "• Сетка из 2-3 колонок"
      ].join(""), { x: 0.5, y: 1.6, w: 9, h: 2, fontSize: 14, color: WHITE })
      slide.addText("См. макет: redesign-1-tournaments.png", {
        x: 0.5, y: 4.5, w: 9, h: 0.4,
        fontSize: 12, italic: true, color: ACCENT_GREEN
      })

      // ========== СЛАЙД 11: Концепт редизайна - Доступность ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Концепт редизайна: Доступность", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: WHITE
      })
      slide.addText("Улучшения навигации и взаимодействия", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, color: GRAY
      })
      slide.addText([
        "• Видимые подписи под иконками (Previous Move, Next Move...)\n",
        "• Переключатель языка в шапке (глобус + EN)\n",
        "• Минимальный размер кнопок 48×48px\n",
        "• Улучшенный контраст текста\n",
        "• Соответствие WCAG 2.2 AA"
      ].join(""), { x: 0.5, y: 1.6, w: 9, h: 2, fontSize: 14, color: WHITE })
      slide.addText("См. макет: redesign-2-accessibility.png", {
        x: 0.5, y: 4.5, w: 9, h: 0.4,
        fontSize: 12, italic: true, color: ACCENT_GREEN
      })

      // ========== СЛАЙД 12: Концепт редизайна - Обучение ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Концепт редизайна: Обучение", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 24, bold: true, color: WHITE
      })
      slide.addText("Структурирование учебных материалов", {
        x: 0.5, y: 1.0, w: 9, h: 0.4,
        fontSize: 16, color: GRAY
      })
      slide.addText([
        "• Виджет «Продолжить обучение» с прогресс-баром\n",
        "• Вкладки: Официальные курсы / Сообщество\n",
        "• Фильтр по уровню: Новичок ★, Средний ★★, Продвинутый ★★★\n",
        "• Предупреждение для гостей о сохранении прогресса\n",
        "• Галочки на пройденных уроках"
      ].join(""), { x: 0.5, y: 1.6, w: 9, h: 2, fontSize: 14, color: WHITE })
      slide.addText("См. макет: redesign-3-learning.png", {
        x: 0.5, y: 4.5, w: 9, h: 0.4,
        fontSize: 12, italic: true, color: ACCENT_GREEN
      })

      // ========== СЛАЙД 13: Стратегия улучшений ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Стратегия улучшений", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      const strategy = [
        ["Quick Wins", "1-2 спринта", "localStorage, подписи, язык в шапке", "+15-20% удержания"],
        ["Среднесрочные", "1-2 квартала", "Карточный режим, вкладки Studies", "+30-40% завершаемости"],
        ["Системные", "6+ месяцев", "Design System, рекомендации", "Масштабирование"]
      ]
      strategy.forEach((row, i) => {
        const colors = [ACCENT_GREEN, ACCENT_PURPLE, "E67E22"]
        slide.addText(row[0], {
          x: 0.5, y: 1.2 + i * 1.2, w: 2.5, h: 0.5,
          fontSize: 16, bold: true, color: colors[i]
        })
        slide.addText(row[1], {
          x: 3.2, y: 1.2 + i * 1.2, w: 1.8, h: 0.5,
          fontSize: 14, color: GRAY
        })
        slide.addText(row[2], {
          x: 0.5, y: 1.6 + i * 1.2, w: 6, h: 0.5,
          fontSize: 13, color: WHITE
        })
        slide.addText(row[3], {
          x: 7, y: 1.4 + i * 1.2, w: 2.5, h: 0.5,
          fontSize: 14, bold: true, color: colors[i], align: "right"
        })
      })

      // ========== СЛАЙД 14: Чек-лист ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Чек-лист юзабилити", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      const checklist = [
        ["Главная страница информативна", true],
        ["Навигация интуитивна", true],
        ["Доступ к игре в 1-2 клика", true],
        ["Игровой процесс без сбоев", true],
        ["Обратная связь понятна", true],
        ["Мобильная версия адаптивна", true],
        ["Помощь легко найти", true],
        ["Настройки доступны", true],
        ["Локализация присутствует", false],
        ["Отсутствуют критические ошибки", true]
      ]
      checklist.forEach((row, i) => {
        const icon = row[1] ? "✓" : "≈"
        const color = row[1] ? ACCENT_GREEN : ACCENT_PURPLE
        slide.addText(icon, {
          x: 0.5, y: 1.0 + i * 0.42, w: 0.4, h: 0.4,
          fontSize: 16, bold: true, color: color
        })
        slide.addText(row[0] as string, {
          x: 1.0, y: 1.0 + i * 0.42, w: 8, h: 0.4,
          fontSize: 13, color: row[1] ? WHITE : GRAY
        })
      })
      slide.addText("9/10 выполнено полностью (90%)", {
        x: 0.5, y: 5.2, w: 9, h: 0.4,
        fontSize: 14, bold: true, color: ACCENT_GREEN, align: "center"
      })

      // ========== СЛАЙД 15: Выводы ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Выводы", {
        x: 0.5, y: 0.3, w: 9, h: 0.6,
        fontSize: 28, bold: true, color: WHITE
      })
      slide.addText([
        "1. Lichess.org — высококачественный интерфейс (94%)\n\n",
        "2. Выявлено 3 зоны роста: согласованность, доступность, обучение\n\n",
        "3. Предложены конкретные решения с макетами редизайна\n\n",
        "4. Quick Wins можно реализовать за 1-2 спринта\n\n",
        "5. Ожидаемый эффект: +15-40% по ключевым метрикам"
      ].join(""), { x: 0.5, y: 1.2, w: 9, h: 3.5, fontSize: 16, color: WHITE })

      // ========== СЛАЙД 16: Спасибо ==========
      slide = pptx.addSlide()
      slide.background = { color: DARK_BG }
      slide.addText("Спасибо за внимание!", {
        x: 0.5, y: 2, w: 9, h: 1,
        fontSize: 40, bold: true, color: WHITE, align: "center"
      })
      slide.addText("Вопросы?", {
        x: 0.5, y: 3.2, w: 9, h: 0.6,
        fontSize: 24, color: ACCENT_GREEN, align: "center"
      })
      slide.addText("Титов Николай • Алиев Арсен\nБГТУ «ВОЕНМЕХ» • 2026", {
        x: 0.5, y: 4.5, w: 9, h: 1,
        fontSize: 16, color: GRAY, align: "center"
      })

      // Сохранение
      await pptx.writeFile({ fileName: "Lichess-Usability-Report.pptx" })
    } catch (error) {
      console.error("Error generating presentation:", error)
      alert("Ошибка при генерации презентации. Попробуйте еще раз.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#161512] px-6 py-12 text-white">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Генератор презентации PPTX
          </h1>
          <p className="mt-2 text-neutral-400">
            Экспертная оценка интерфейса Lichess.org
          </p>
        </div>

        <div className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#629924]">
            Содержание презентации (16 слайдов):
          </h2>
          <ol className="list-inside list-decimal space-y-1 text-sm text-neutral-300">
            <li>Титульный слайд</li>
            <li>Содержание</li>
            <li>О ресурсе Lichess.org</li>
            <li>Целевая аудитория</li>
            <li>Критерии оценки (10 критериев)</li>
            <li>Итоговые результаты (47/50 баллов)</li>
            <li>Проблема 1: Согласованность</li>
            <li>Проблема 2: Доступность</li>
            <li>Проблема 3: Поддержка обучения</li>
            <li>Концепт редизайна: Турниры</li>
            <li>Концепт редизайна: Доступность</li>
            <li>Концепт редизайна: Обучение</li>
            <li>Стратегия улучшений</li>
            <li>Чек-лист юзабилити</li>
            <li>Выводы</li>
            <li>Спасибо за внимание</li>
          </ol>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={generatePresentation}
            disabled={isGenerating}
            className="rounded-lg bg-[#629924] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#4a7a1a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Генерация...
              </span>
            ) : (
              "Скачать PPTX презентацию"
            )}
          </button>
          <p className="text-xs text-neutral-500">
            Файл будет загружен автоматически
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-center">
          <p className="text-sm text-neutral-400">
            <span className="font-semibold text-white">Авторы:</span> Титов Николай, Алиев Арсен
          </p>
          <p className="text-sm text-neutral-500">
            БГТУ «ВОЕНМЕХ» им. Д.Ф. Устинова • Кафедра компьютерного дизайна
          </p>
        </div>
      </div>
    </main>
  )
}
