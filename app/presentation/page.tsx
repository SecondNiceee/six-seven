"use client"

import { useState } from "react"

export default function PresentationPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsDownloading(true)
    setError(null)
    try {
      const res = await fetch("/api/generate-pptx")
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Ошибка сервера")
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Lichess-Usability-Report.pptx"
      a.click()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      setError(e.message ?? "Неизвестная ошибка")
    } finally {
      setIsDownloading(false)
    }
  }

  const slides = [
    "Титульный слайд — авторы и тема",
    "Содержание презентации",
    "О ресурсе Lichess.org",
    "Целевая аудитория (5 сегментов)",
    "10 критериев оценки с баллами",
    "Итоговые результаты — 47/50 баллов (94%)",
    "Проблема 1: Согласованность (4/5)",
    "Проблема 2: Доступность (4/5)",
    "Проблема 3: Поддержка обучения (4/5)",
    "Стратегия улучшений (3 горизонта)",
    "Чек-лист юзабилити (10 пунктов)",
    "Выводы",
    "Спасибо за внимание",
  ]

  return (
    <main className="min-h-screen bg-[#161512] px-6 py-16 text-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">

        {/* Заголовок */}
        <div className="text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-[#629924]">
            Практическая работа 6
          </p>
          <h1 className="text-4xl font-bold leading-tight">
            Презентация
          </h1>
          <p className="mt-3 text-neutral-400">
            Экспертная оценка интерфейса Lichess.org
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            Титов Николай&nbsp;&nbsp;•&nbsp;&nbsp;Алиев Арсен&nbsp;&nbsp;•&nbsp;&nbsp;БГТУ ВОЕНМЕХ, 2026
          </p>
        </div>

        {/* Список слайдов */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#629924]">
            {slides.length} слайдов
          </h2>
          <ol className="space-y-2">
            {slides.map((title, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-800 text-xs text-neutral-500">
                  {i + 1}
                </span>
                <span className="text-sm text-neutral-300">{title}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Кнопка скачивания */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-3 rounded-lg bg-[#629924] px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-[#527a1e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDownloading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Генерация...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Скачать PPTX
              </>
            )}
          </button>

          {error && (
            <p className="rounded-lg border border-red-800 bg-red-950 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <p className="text-center text-xs text-neutral-600">
            Файл откроется в Microsoft PowerPoint, LibreOffice Impress или Google Slides
          </p>
        </div>

      </div>
    </main>
  )
}
