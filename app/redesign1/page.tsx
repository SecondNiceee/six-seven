"use client"

import { useState } from "react"

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
  border: "#404040",
}

interface Tournament {
  id: number
  name: string
  time: string
  format: "Bullet" | "Blitz" | "Rapid" | "Classical"
  participants: number
  duration: string
  rated: boolean
  status: "upcoming" | "ongoing" | "finished"
}

const tournaments: Tournament[] = [
  { id: 1, name: "Arena 1+0", time: "15:00", format: "Bullet", participants: 156, duration: "1h", rated: true, status: "ongoing" },
  { id: 2, name: "Arena 3+0", time: "15:30", format: "Blitz", participants: 243, duration: "2h", rated: true, status: "upcoming" },
  { id: 3, name: "Arena 5+0", time: "16:00", format: "Blitz", participants: 89, duration: "2h", rated: true, status: "upcoming" },
  { id: 4, name: "Arena 10+0", time: "16:30", format: "Rapid", participants: 67, duration: "2h", rated: true, status: "upcoming" },
  { id: 5, name: "Arena 15+10", time: "17:00", format: "Rapid", participants: 45, duration: "3h", rated: true, status: "upcoming" },
  { id: 6, name: "Arena 30+0", time: "18:00", format: "Classical", participants: 23, duration: "3h", rated: true, status: "upcoming" },
  { id: 7, name: "Weekly Bullet", time: "19:00", format: "Bullet", participants: 512, duration: "1h", rated: true, status: "upcoming" },
  { id: 8, name: "Weekly Blitz", time: "20:00", format: "Blitz", participants: 789, duration: "2h", rated: true, status: "upcoming" },
]

const formatColors: Record<string, string> = {
  Bullet: colors.orange,
  Blitz: colors.green,
  Rapid: colors.blue,
  Classical: colors.purple,
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              backgroundColor: formatColors[tournament.format],
              color: colors.textBright,
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {tournament.format}
          </span>
          {tournament.rated && (
            <span style={{ color: colors.textLight, fontSize: "12px" }}>Rated</span>
          )}
        </div>
        {tournament.status === "ongoing" && (
          <span
            style={{
              backgroundColor: colors.green,
              color: colors.textBright,
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
              animation: "pulse 2s infinite",
            }}
          >
            LIVE
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ color: colors.textBright, fontSize: "16px", fontWeight: 600, margin: 0 }}>
        {tournament.name}
      </h3>

      {/* Info Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <ClockIcon />
          <span style={{ color: colors.text, fontSize: "14px" }}>{tournament.time}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <DurationIcon />
          <span style={{ color: colors.text, fontSize: "14px" }}>{tournament.duration}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", gridColumn: "span 2" }}>
          <UsersIcon />
          <span style={{ color: colors.text, fontSize: "14px" }}>{tournament.participants} participants</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        style={{
          backgroundColor: hovered ? colors.green : "transparent",
          border: `1px solid ${colors.green}`,
          color: hovered ? colors.textBright : colors.green,
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          transition: "all 0.2s ease",
          marginTop: "4px",
        }}
      >
        {tournament.status === "ongoing" ? "Join Now" : "View Details"}
      </button>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

function DurationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
      <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function GanttIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <rect x="7" y="8" width="8" height="3" rx="1" />
      <rect x="7" y="14" width="12" height="3" rx="1" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export default function Redesign1Page() {
  const [viewMode, setViewMode] = useState<"grid" | "gantt">("grid")
  const [filter, setFilter] = useState<string>("all")

  const filteredTournaments = filter === "all" 
    ? tournaments 
    : tournaments.filter(t => t.format.toLowerCase() === filter)

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
                    color: item === "PLAY" ? colors.textBright : colors.textLight,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderBottom: item === "PLAY" ? `2px solid ${colors.green}` : "none",
                    paddingBottom: "4px",
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ background: "none", border: "none", color: colors.text, cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
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
        {/* Page Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ color: colors.textBright, fontSize: "24px", fontWeight: 600, margin: 0 }}>
              Arena Tournaments
            </h2>
            <button
              style={{
                backgroundColor: colors.green,
                color: colors.textBright,
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              + Create Tournament
            </button>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            {/* Filters */}
            <div style={{ display: "flex", gap: "8px" }}>
              {["all", "bullet", "blitz", "rapid", "classical"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    backgroundColor: filter === f ? colors.bgHover : "transparent",
                    border: `1px solid ${filter === f ? colors.border : "transparent"}`,
                    color: filter === f ? colors.textBright : colors.textLight,
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                  }}
                >
                  {f === "all" ? "All Formats" : f}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div style={{ display: "flex", backgroundColor: colors.bgCard, borderRadius: "6px", padding: "4px" }}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: viewMode === "grid" ? colors.bgHover : "transparent",
                  border: "none",
                  color: viewMode === "grid" ? colors.textBright : colors.textLight,
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
              >
                <GridIcon />
                Cards
              </button>
              <button
                onClick={() => setViewMode("gantt")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: viewMode === "gantt" ? colors.bgHover : "transparent",
                  border: "none",
                  color: viewMode === "gantt" ? colors.textBright : colors.textLight,
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
              >
                <GanttIcon />
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Tournament Grid */}
        {viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {filteredTournaments.map(tournament => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          /* Gantt View Placeholder */
          <div
            style={{
              backgroundColor: colors.bgCard,
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              color: colors.textLight,
            }}
          >
            <GanttIcon />
            <p style={{ marginTop: "12px" }}>Timeline view (legacy Gantt chart)</p>
          </div>
        )}

        {/* Design Notes */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            backgroundColor: colors.bgCard,
            borderRadius: "8px",
            borderLeft: `4px solid ${colors.purple}`,
          }}
        >
          <h3 style={{ color: colors.purpleLight, fontSize: "16px", fontWeight: 600, margin: "0 0 16px 0" }}>
            Redesign Notes: Consistency Improvements
          </h3>
          <ul style={{ color: colors.text, fontSize: "14px", lineHeight: 1.8, margin: 0, paddingLeft: "20px" }}>
            <li>Unified card-based layout matching Play, Puzzles, Learn sections</li>
            <li>Consistent typography: 12px labels, 14px body, 16px card titles, 24px headers</li>
            <li>Uniform spacing: 16px gap between cards, 8px border-radius</li>
            <li>Color-coded format badges (Bullet/Blitz/Rapid/Classical)</li>
            <li>Toggle between Card view and legacy Gantt timeline</li>
            <li>Consistent hover states and transitions across all elements</li>
          </ul>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
