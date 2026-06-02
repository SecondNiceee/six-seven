"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Данные из отчета - оценки по критериям
const criteriaData = [
  { name: "Консистентность", score: 8, fullMark: 10 },
  { name: "Навигация", score: 9, fullMark: 10 },
  { name: "Обратная связь", score: 8, fullMark: 10 },
  { name: "Предотвращение ошибок", score: 7, fullMark: 10 },
  { name: "Гибкость", score: 9, fullMark: 10 },
  { name: "Минимализм", score: 8, fullMark: 10 },
  { name: "Помощь", score: 7, fullMark: 10 },
  { name: "Доступность", score: 6, fullMark: 10 },
]

// Данные для радара
const radarData = [
  { criterion: "Консистентность", A: 8 },
  { criterion: "Навигация", A: 9 },
  { criterion: "Обратная связь", A: 8 },
  { criterion: "Ошибки", A: 7 },
  { criterion: "Гибкость", A: 9 },
  { criterion: "Минимализм", A: 8 },
  { criterion: "Помощь", A: 7 },
  { criterion: "Доступность", A: 6 },
]

// Распределение оценок
const distributionData = [
  { range: "1-3", count: 0, fill: "#ef4444" },
  { range: "4-5", count: 1, fill: "#f97316" },
  { range: "6-7", count: 3, fill: "#eab308" },
  { range: "8-9", count: 4, fill: "#22c55e" },
  { range: "10", count: 0, fill: "#3b82f6" },
]

// Состав чек-листа
const checklistData = [
  { name: "Выполнено", value: 18, color: "#22c55e" },
  { name: "Частично", value: 4, color: "#eab308" },
  { name: "Не выполнено", value: 3, color: "#ef4444" },
]

// Скриншоты lichess для Приложения A
const lichessScreenshots = [
  {
    num: 1,
    title: "Главная страница",
    description: "Сетка контролей времени, боковая панель с турнирами",
    url: "https://lichess.org",
  },
  {
    num: 2,
    title: "Раздел обучения",
    description: "Карточки уроков с прогресс-баром",
    url: "https://lichess.org/practice",
  },
  {
    num: 3,
    title: "Анализ партии",
    description: "Доска и движок Stockfish",
    url: "https://lichess.org/analysis",
  },
  {
    num: 4,
    title: "Мобильная версия",
    description: "Бургер-меню, адаптивная сетка",
    url: "https://lichess.org (mobile viewport)",
  },
  {
    num: 5,
    title: "Турниры",
    description: "Gantt-шкала с цветовым кодированием",
    url: "https://lichess.org/tournament",
  },
  {
    num: 6,
    title: "Лидерборд и сообщество",
    description: "Таблица лидеров, профили игроков",
    url: "https://lichess.org/player",
  },
]

// Макеты редизайна для Приложения C
const redesignMockups = [
  {
    num: 11,
    title: "Согласованность",
    description: "Карточный режим турниров",
    path: "/redesign1",
  },
  {
    num: 12,
    title: "Доступность",
    description: "Видимые подписи к иконкам",
    path: "/redesign2",
  },
  {
    num: 13,
    title: "Поддержка обучения",
    description: "Сохранение прогресса",
    path: "/redesign3",
  },
]

export default function AppendixPage() {
  const [activeTab, setActiveTab] = useState<"a" | "b" | "c">("b")
  const [activeChart, setActiveChart] = useState<7 | 8 | 9 | 10>(7)

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#161512",
        color: "#bababa",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#302e2c",
          borderBottom: "1px solid #3d3a37",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            Приложения к отчету
          </h1>
          <p style={{ fontSize: "14px", color: "#9a9a9a", marginTop: "4px" }}>
            Скриншоты, графики и макеты редизайна lichess.org
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav
        style={{
          backgroundColor: "#262421",
          borderBottom: "1px solid #3d3a37",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "4px",
            padding: "8px 24px",
          }}
        >
          {[
            { id: "a" as const, label: "A. Скриншоты интерфейса" },
            { id: "b" as const, label: "B. Графики и диаграммы" },
            { id: "c" as const, label: "C. Макеты редизайна" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor:
                  activeTab === tab.id ? "#629924" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#bababa",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Приложение A - Скриншоты */}
        {activeTab === "a" && (
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "24px",
              }}
            >
              Приложение А. Скриншоты интерфейса
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#9a9a9a",
                marginBottom: "24px",
                padding: "16px",
                backgroundColor: "#262421",
                borderRadius: "8px",
                border: "1px solid #3d3a37",
              }}
            >
              Для получения скриншотов откройте указанные URL на сайте lichess.org
              и сделайте снимок экрана. Для мобильной версии используйте DevTools
              (F12) и режим эмуляции мобильного устройства.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "16px",
              }}
            >
              {lichessScreenshots.map((item) => (
                <div
                  key={item.num}
                  style={{
                    backgroundColor: "#262421",
                    borderRadius: "8px",
                    border: "1px solid #3d3a37",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#629924",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {item.num}
                    </span>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "14px", color: "#9a9a9a", marginBottom: "12px" }}>
                    {item.description}
                  </p>
                  <a
                    href={item.url.startsWith("http") ? item.url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "#3d3a37",
                      color: "#bababa",
                      fontSize: "13px",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    {item.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Приложение B - Графики */}
        {activeTab === "b" && (
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "24px",
              }}
            >
              Приложение B. Графики и диаграммы
            </h2>

            {/* Табы для графиков */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              {[
                { id: 7 as const, label: "Рис. 7", subtitle: "Столбчатая" },
                { id: 8 as const, label: "Рис. 8", subtitle: "Радар" },
                { id: 9 as const, label: "Рис. 9", subtitle: "Распределение" },
                { id: 10 as const, label: "Рис. 10", subtitle: "Круговая" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChart(tab.id)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: activeChart === tab.id ? "#629924" : "#3d3a37",
                    color: activeChart === tab.id ? "#fff" : "#bababa",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "100px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 700 }}>{tab.label}</span>
                  <span style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>
                    {tab.subtitle}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gap: "32px" }}>
              {/* Рис. 7 - Столбчатая диаграмма */}
              {activeChart === 7 && (
              <div
                style={{
                  backgroundColor: "#262421",
                  borderRadius: "8px",
                  border: "1px solid #3d3a37",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  Рис. 7. Столбчатая диаграмма оценок по критериям
                </h3>
                <p style={{ fontSize: "13px", color: "#9a9a9a", marginBottom: "24px" }}>
                  Оценка lichess.org по 8 критериям юзабилити (шкала 1-10)
                </p>
                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={criteriaData} layout="vertical" margin={{ left: 120 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3d3a37" />
                      <XAxis type="number" domain={[0, 10]} stroke="#9a9a9a" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#9a9a9a"
                        tick={{ fill: "#bababa", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#302e2c",
                          border: "1px solid #3d3a37",
                          borderRadius: "4px",
                        }}
                      />
                      <Bar dataKey="score" fill="#629924" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              )}

              {/* Рис. 8 - Лепестковая диаграмма */}
              {activeChart === 8 && (
              <div
                style={{
                  backgroundColor: "#262421",
                  borderRadius: "8px",
                  border: "1px solid #3d3a37",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  Рис. 8. Лепестковая диаграмма (радар) оценок
                </h3>
                <p style={{ fontSize: "13px", color: "#9a9a9a", marginBottom: "24px" }}>
                  Визуализация сильных и слабых сторон интерфейса
                </p>
                <div style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#3d3a37" />
                      <PolarAngleAxis
                        dataKey="criterion"
                        tick={{ fill: "#bababa", fontSize: 11 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 10]}
                        tick={{ fill: "#9a9a9a", fontSize: 10 }}
                      />
                      <Radar
                        name="Оценка"
                        dataKey="A"
                        stroke="#629924"
                        fill="#629924"
                        fillOpacity={0.4}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#302e2c",
                          border: "1px solid #3d3a37",
                          borderRadius: "4px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              )}

              {/* Рис. 9 - Распределение оценок */}
              {activeChart === 9 && (
                <div
                  style={{
                    backgroundColor: "#262421",
                    borderRadius: "8px",
                    border: "1px solid #3d3a37",
                    padding: "24px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    Рис. 9. Распределение оценок по баллам
                  </h3>
                  <p style={{ fontSize: "13px", color: "#9a9a9a", marginBottom: "24px" }}>
                    Количество критериев в каждом диапазоне оценок
                  </p>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={distributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3d3a37" />
                        <XAxis dataKey="range" stroke="#9a9a9a" />
                        <YAxis stroke="#9a9a9a" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#302e2c",
                            border: "1px solid #3d3a37",
                            borderRadius: "4px",
                          }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                          {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Рис. 10 - Круговая диаграмма */}
              {activeChart === 10 && (
                <div
                  style={{
                    backgroundColor: "#262421",
                    borderRadius: "8px",
                    border: "1px solid #3d3a37",
                    padding: "24px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    Рис. 10. Состав чек-листа (круговая диаграмма)
                  </h3>
                  <p style={{ fontSize: "13px", color: "#9a9a9a", marginBottom: "24px" }}>
                    Соотношение выполненных требований
                  </p>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={checklistData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {checklistData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#302e2c",
                            border: "1px solid #3d3a37",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Приложение C - Макеты редизайна */}
        {activeTab === "c" && (
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "24px",
              }}
            >
              Приложение C. Макеты редизайна
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "20px",
              }}
            >
              {redesignMockups.map((item) => (
                <Link
                  key={item.num}
                  href={item.path}
                  style={{
                    backgroundColor: "#262421",
                    borderRadius: "8px",
                    border: "1px solid #3d3a37",
                    padding: "24px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#629924",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#9a9a9a", margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      backgroundColor: "#302e2c",
                      borderRadius: "6px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#bababa" }}>
                      Открыть макет
                    </span>
                    <span style={{ fontSize: "18px", color: "#629924" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                backgroundColor: "#262421",
                borderRadius: "8px",
                border: "1px solid #3d3a37",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: "12px",
                }}
              >
                Инструкция по созданию скриншотов макетов
              </h3>
              <ol
                style={{
                  fontSize: "14px",
                  color: "#9a9a9a",
                  margin: 0,
                  paddingLeft: "20px",
                  lineHeight: 1.8,
                }}
              >
                <li>Откройте каждый макет по ссылке выше</li>
                <li>Установите ширину окна браузера 1440px для десктопа</li>
                <li>Сделайте скриншот всей страницы (Cmd+Shift+4 на Mac или Print Screen на Windows)</li>
                <li>Сохраните как Рис. 11, Рис. 12, Рис. 13 соответственно</li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
