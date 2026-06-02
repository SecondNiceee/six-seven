"use client"

import { useState, useEffect } from "react"

// Lichess color palette
const colors = {
  bg: "#161512",
  bgLight: "#1a1917",
  bgCard: "#262421",
  bgHover: "#302e2c",
  text: "#bababa",
  textLight: "#787878",
  textBright: "#fff",
  green: "#629924",
  greenLight: "#8bc34a",
  purple: "#9b59b6",
  purpleLight: "#bf78db",
  blue: "#3893e8",
  orange: "#e69f00",
  red: "#dc3545",
  yellow: "#f0ad4e",
  border: "#404040",
}

interface Course {
  id: number
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  level: "beginner" | "intermediate" | "advanced"
  official: boolean
  rating?: number
  author?: string
}

const courses: Course[] = [
  { id: 1, title: "Chess Basics", description: "Learn how pieces move", progress: 100, totalLessons: 8, completedLessons: 8, level: "beginner", official: true },
  { id: 2, title: "Captures", description: "Practice taking opponent pieces", progress: 75, totalLessons: 6, completedLessons: 4, level: "beginner", official: true },
  { id: 3, title: "Basic Checkmates", description: "Deliver checkmate patterns", progress: 40, totalLessons: 10, completedLessons: 4, level: "beginner", official: true },
  { id: 4, title: "The Rook", description: "Master rook endgames", progress: 0, totalLessons: 12, completedLessons: 0, level: "intermediate", official: true },
  { id: 5, title: "Opening Principles", description: "Fundamentals of the opening", progress: 0, totalLessons: 15, completedLessons: 0, level: "intermediate", official: true },
  { id: 6, title: "Sicilian Defense Guide", description: "Complete Sicilian repertoire", progress: 20, totalLessons: 25, completedLessons: 5, level: "advanced", official: false, rating: 4.8, author: "GM_Teacher" },
  { id: 7, title: "Endgame Mastery", description: "Advanced endgame techniques", progress: 0, totalLessons: 30, completedLessons: 0, level: "advanced", official: false, rating: 4.5, author: "ChessCoach" },
]

function ProgressBar({ progress, size = "md" }: { progress: number; size?: "sm" | "md" | "lg" }) {
  const heights = { sm: "4px", md: "8px", lg: "12px" }
  return (
    <div style={{ width: "100%", height: heights[size], backgroundColor: colors.bgHover, borderRadius: "4px", overflow: "hidden" }}>
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: progress === 100 ? colors.green : colors.blue,
          borderRadius: "4px",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  )
}

function LevelBadge({ level }: { level: "beginner" | "intermediate" | "advanced" }) {
  const config = {
    beginner: { color: colors.green, stars: 1, label: "Beginner" },
    intermediate: { color: colors.orange, stars: 2, label: "Intermediate" },
    advanced: { color: colors.red, stars: 3, label: "Advanced" },
  }
  const { color, stars, label } = config[level]
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ color, fontSize: "12px" }}>
        {"★".repeat(stars)}{"☆".repeat(3 - stars)}
      </span>
      <span style={{ color, fontSize: "12px", fontWeight: 500 }}>{label}</span>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? colors.bgHover : colors.bgCard,
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: `1px solid ${hovered ? colors.border : "transparent"}`,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <LevelBadge level={course.level} />
        {course.progress === 100 && (
          <span style={{ color: colors.green, fontSize: "14px" }}>✓ Complete</span>
        )}
        {course.rating && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: colors.yellow, fontSize: "12px" }}>★</span>
            <span style={{ color: colors.text, fontSize: "12px" }}>{course.rating}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 style={{ color: colors.textBright, fontSize: "16px", fontWeight: 600, margin: "0 0 4px 0" }}>
          {course.title}
        </h3>
        <p style={{ color: colors.textLight, fontSize: "13px", margin: 0 }}>
          {course.description}
        </p>
        {course.author && (
          <p style={{ color: colors.textLight, fontSize: "12px", margin: "4px 0 0 0" }}>
            by {course.author}
          </p>
        )}
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ color: colors.text, fontSize: "12px" }}>
            {course.completedLessons} / {course.totalLessons} lessons
          </span>
          <span style={{ color: colors.text, fontSize: "12px" }}>{course.progress}%</span>
        </div>
        <ProgressBar progress={course.progress} />
      </div>

      {/* Action */}
      <button
        style={{
          backgroundColor: course.progress > 0 && course.progress < 100 ? colors.green : "transparent",
          border: `1px solid ${colors.green}`,
          color: course.progress > 0 && course.progress < 100 ? colors.textBright : colors.green,
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          transition: "all 0.2s ease",
        }}
      >
        {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review" : "Continue"}
      </button>
    </div>
  )
}

function ContinueLearningWidget({ course }: { course: Course }) {
  return (
    <div
      style={{
        backgroundColor: colors.bgCard,
        borderRadius: "12px",
        padding: "20px",
        border: `1px solid ${colors.green}`,
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.green} stroke="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <h2 style={{ color: colors.textBright, fontSize: "18px", fontWeight: 600, margin: 0 }}>
          Continue Learning
        </h2>
      </div>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Course Info */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ color: colors.textBright, fontSize: "20px", fontWeight: 600, margin: "0 0 8px 0" }}>
            {course.title}
          </h3>
          <p style={{ color: colors.textLight, fontSize: "14px", margin: "0 0 16px 0" }}>
            {course.description}
          </p>
          
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: colors.text, fontSize: "14px" }}>Progress</span>
              <span style={{ color: colors.green, fontSize: "14px", fontWeight: 600 }}>{course.progress}%</span>
            </div>
            <ProgressBar progress={course.progress} size="lg" />
          </div>
          
          <div style={{ display: "flex", gap: "8px", color: colors.textLight, fontSize: "13px" }}>
            <span>Completed: Lesson {course.completedLessons}</span>
            <span>•</span>
            <span>Next: Lesson {course.completedLessons + 1}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
          <button
            style={{
              backgroundColor: colors.green,
              color: colors.textBright,
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Continue
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: colors.text,
              border: `1px solid ${colors.border}`,
              padding: "10px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            All Lessons
          </button>
        </div>
      </div>
    </div>
  )
}

function GuestWarningBanner() {
  return (
    <div
      style={{
        backgroundColor: "rgba(220, 53, 69, 0.1)",
        border: `1px solid ${colors.red}`,
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.red} stroke="none">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
        <span style={{ color: colors.text, fontSize: "14px" }}>
          Your learning progress is saved locally. Create an account to sync across devices.
        </span>
      </div>
      <button
        style={{
          backgroundColor: colors.green,
          color: colors.textBright,
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        Sign Up Free
      </button>
    </div>
  )
}

function SavedIndicator({ saved }: { saved: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: saved ? "rgba(98, 153, 36, 0.1)" : "rgba(220, 53, 69, 0.1)",
        border: `1px solid ${saved ? colors.green : colors.red}`,
        borderRadius: "4px",
        fontSize: "12px",
        color: saved ? colors.green : colors.red,
      }}
    >
      {saved ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Progress saved
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Not saved
        </>
      )}
    </div>
  )
}

export default function Redesign3Page() {
  const [tab, setTab] = useState<"official" | "community">("official")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [isLoggedIn] = useState(false)
  const [localProgress, setLocalProgress] = useState(false)

  useEffect(() => {
    // Simulate checking localStorage for progress
    const hasProgress = localStorage.getItem("lichess_learn_progress")
    setLocalProgress(!!hasProgress || true) // Demo: assume progress exists
  }, [])

  const currentCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[1]
  
  const filteredCourses = courses
    .filter(c => tab === "official" ? c.official : !c.official)
    .filter(c => levelFilter === "all" || c.level === levelFilter)

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.bg }}>
      {/* Header */}
      <header style={{ backgroundColor: colors.bgLight, borderBottom: `1px solid ${colors.border}`, padding: "12px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <h1 style={{ color: colors.textBright, fontSize: "24px", fontWeight: 700, margin: 0 }}>lichess</h1>
            <nav style={{ display: "flex", gap: "24px" }}>
              {["PLAY", "PUZZLES", "LEARN", "WATCH", "COMMUNITY"].map(item => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: item === "LEARN" ? colors.textBright : colors.textLight,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderBottom: item === "LEARN" ? `2px solid ${colors.green}` : "none",
                    paddingBottom: "4px",
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <SavedIndicator saved={localProgress} />
            <button
              style={{
                backgroundColor: colors.green,
                color: colors.textBright,
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        {/* Guest Warning */}
        {!isLoggedIn && <GuestWarningBanner />}

        {/* Continue Learning Widget */}
        <ContinueLearningWidget course={currentCourse} />

        {/* Studies Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{ color: colors.textBright, fontSize: "24px", fontWeight: 600, margin: 0 }}>
              Studies
            </h2>
            
            {/* Tabs */}
            <div style={{ display: "flex", backgroundColor: colors.bgCard, borderRadius: "8px", padding: "4px" }}>
              <button
                onClick={() => setTab("official")}
                style={{
                  backgroundColor: tab === "official" ? colors.bgHover : "transparent",
                  border: "none",
                  color: tab === "official" ? colors.textBright : colors.textLight,
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              >
                Official Courses
              </button>
              <button
                onClick={() => setTab("community")}
                style={{
                  backgroundColor: tab === "community" ? colors.bgHover : "transparent",
                  border: "none",
                  color: tab === "community" ? colors.textBright : colors.textLight,
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              >
                Community
              </button>
            </div>
          </div>

          {/* Level Filter */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ color: colors.textLight, fontSize: "14px", alignSelf: "center", marginRight: "8px" }}>
              Filter by level:
            </span>
            {[
              { value: "all", label: "All Levels" },
              { value: "beginner", label: "★ Beginner" },
              { value: "intermediate", label: "★★ Intermediate" },
              { value: "advanced", label: "★★★ Advanced" },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setLevelFilter(option.value)}
                style={{
                  backgroundColor: levelFilter === option.value ? colors.bgHover : "transparent",
                  border: `1px solid ${levelFilter === option.value ? colors.border : "transparent"}`,
                  color: levelFilter === option.value ? colors.textBright : colors.textLight,
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px", color: colors.textLight }}>
              No courses found for this filter.
            </div>
          )}
        </div>

        {/* Design Notes */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            backgroundColor: colors.bgCard,
            borderRadius: "8px",
            borderLeft: `4px solid ${colors.orange}`,
          }}
        >
          <h3 style={{ color: colors.orange, fontSize: "16px", fontWeight: 600, margin: "0 0 16px 0" }}>
            Redesign Notes: Learning Support Improvements
          </h3>
          <ul style={{ color: colors.text, fontSize: "14px", lineHeight: 1.8, margin: 0, paddingLeft: "20px" }}>
            <li>localStorage saves guest progress between sessions (with warning banner)</li>
            <li>Studies split into Official Courses and Community tabs</li>
            <li>Level filter with star ratings: Beginner / Intermediate / Advanced</li>
            <li>Continue Learning widget on main page with progress bar and quick actions</li>
            <li>Visual save indicator showing sync status in header</li>
            <li>Clear call-to-action for account creation with data sync benefit</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
