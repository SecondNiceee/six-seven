"use client"

import { useState, useRef, useEffect } from "react"

const colors = {
  bg: "#161512",
  bgLight: "#1a1917",
  bgCard: "#262421",
  bgHover: "#302e2c",
  text: "#bababa",
  textLight: "#787878",
  textMuted: "#5a5a5a",
  textBright: "#fff",
  green: "#629924",
  greenLight: "#7cb342",
  blue: "#3893e8",
  border: "#404040",
  focus: "#5ba3ec",
}

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "P", "", "", ""],
  ["", "", "", "", "", "N", "", ""],
  ["P", "P", "P", "P", "", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "", "R"],
]

const languages = [
  { code: "en", native: "English" },
  { code: "ru", native: "Русский" },
  { code: "de", native: "Deutsch" },
  { code: "fr", native: "Français" },
  { code: "es", native: "Español" },
  { code: "zh", native: "中文" },
  { code: "ja", native: "日本語" },
  { code: "ko", native: "한국어" },
]

function ChessPiece({ piece, isLight }: { piece: string; isLight: boolean }) {
  const isWhitePiece = piece === piece.toUpperCase()
  const pieceType = piece.toLowerCase()
  
  const pieceImages: Record<string, { white: string; black: string }> = {
    k: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png"
    },
    q: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png"
    },
    r: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png"
    },
    b: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png"
    },
    n: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png"
    },
    p: { 
      white: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
      black: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png"
    },
  }
  
  if (!piece || !pieceImages[pieceType]) return null
  
  const imgSrc = isWhitePiece ? pieceImages[pieceType].white : pieceImages[pieceType].black
  
  return (
    <img 
      src={imgSrc} 
      alt=""
      style={{
        width: "85%",
        height: "85%",
        objectFit: "contain",
        filter: `drop-shadow(${isLight ? "1px 2px 2px rgba(0,0,0,0.3)" : "1px 2px 3px rgba(0,0,0,0.5)"})`,
        pointerEvents: "none",
      }}
      draggable={false}
    />
  )
}

function ChessBoard({ flipped }: { flipped: boolean }) {
  const board = flipped ? [...initialBoard].reverse().map(row => [...row].reverse()) : initialBoard
  const files = flipped ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = flipped ? ["1", "2", "3", "4", "5", "6", "7", "8"] : ["8", "7", "6", "5", "4", "3", "2", "1"]
  
  return (
    <div style={{ position: "relative" }}>
      {/* Board with coordinates */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "24px repeat(8, 1fr)",
          gridTemplateRows: "repeat(8, 1fr) 24px",
          width: "100%",
          maxWidth: "520px",
          aspectRatio: "1.05",
        }}
      >
        {/* Rank labels (left side) */}
        {ranks.map((rank, i) => (
          <div
            key={`rank-${i}`}
            style={{
              gridColumn: "1",
              gridRow: `${i + 1}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.textLight,
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            {rank}
          </div>
        ))}
        
        {/* Chess board squares */}
        <div
          style={{
            gridColumn: "2 / -1",
            gridRow: "1 / 9",
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0
              const isLastMove = 
                (rowIndex === 4 && colIndex === 4) || 
                (rowIndex === 5 && colIndex === 5) ||
                (rowIndex === 6 && colIndex === 4)
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: isLastMove 
                      ? (isLight ? "#f7ec7a" : "#dac34b")
                      : (isLight ? "#ecd9b9" : "#ae8a68"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: piece ? "grab" : "default",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <ChessPiece piece={piece} isLight={isLight} />
                </div>
              )
            })
          )}
        </div>
        
        {/* File labels (bottom) */}
        {files.map((file, i) => (
          <div
            key={`file-${i}`}
            style={{
              gridColumn: `${i + 2}`,
              gridRow: "9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.textLight,
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            {file}
          </div>
        ))}
      </div>
    </div>
  )
}

function ControlButton({ 
  icon, 
  label, 
  shortcut, 
  active, 
  disabled, 
  onClick 
}: { 
  icon: React.ReactNode
  label: string
  shortcut?: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const isHighlighted = hovered || focused

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      aria-label={`${label}${shortcut ? `. Shortcut: ${shortcut}` : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        backgroundColor: active ? colors.green : isHighlighted ? colors.bgHover : "transparent",
        border: focused ? `2px solid ${colors.focus}` : "2px solid transparent",
        color: disabled ? colors.textMuted : active ? colors.textBright : isHighlighted ? colors.textBright : colors.text,
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.12s ease",
        minWidth: "64px",
        minHeight: "56px",
        opacity: disabled ? 0.4 : 1,
        outline: "none",
      }}
    >
      <div style={{ fontSize: "20px", lineHeight: 1 }} aria-hidden="true">
        {icon}
      </div>
      <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em" }}>
        {label}
      </span>
      {shortcut && (
        <span style={{ 
          fontSize: "9px", 
          color: colors.textMuted, 
          backgroundColor: colors.bg,
          padding: "1px 5px",
          borderRadius: "3px",
          fontFamily: "monospace",
        }}>
          {shortcut}
        </span>
      )}
    </button>
  )
}

function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(languages[0])
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: open ? colors.bgHover : "transparent",
          border: focused ? `2px solid ${colors.focus}` : "2px solid transparent",
          color: colors.text,
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
          minHeight: "48px",
          outline: "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "12px" }}>{selected.code}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          right: 0,
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          overflow: "hidden",
          zIndex: 100,
          minWidth: "160px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { setSelected(lang); setOpen(false) }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "12px 14px",
                backgroundColor: selected.code === lang.code ? colors.bgHover : "transparent",
                border: "none",
                color: selected.code === lang.code ? colors.textBright : colors.text,
                cursor: "pointer",
                fontSize: "13px",
                textAlign: "left",
                minHeight: "48px",
              }}
              onMouseEnter={(e) => { if (selected.code !== lang.code) e.currentTarget.style.backgroundColor = colors.bgHover }}
              onMouseLeave={(e) => { if (selected.code !== lang.code) e.currentTarget.style.backgroundColor = "transparent" }}
            >
              <span style={{ textTransform: "uppercase", fontWeight: 700, color: colors.textLight, fontSize: "11px", width: "24px" }}>
                {lang.code}
              </span>
              <span>{lang.native}</span>
              {selected.code === lang.code && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.green} style={{ marginLeft: "auto" }}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(true)
  const [focused, setFocused] = useState(false)
  
  return (
    <button
      onClick={() => setDark(!dark)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        border: focused ? `2px solid ${colors.focus}` : "2px solid transparent",
        color: colors.text,
        padding: "8px",
        borderRadius: "6px",
        cursor: "pointer",
        minWidth: "48px",
        minHeight: "48px",
        outline: "none",
      }}
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const options = [
    { label: "Screen Reader Mode", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> },
    { label: "High Contrast", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg> },
    { label: "Large Text", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg> },
    { label: "Reduce Motion", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> },
  ]

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Accessibility options"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          border: focused ? `2px solid ${colors.focus}` : "2px solid transparent",
          color: colors.text,
          padding: "8px",
          borderRadius: "6px",
          cursor: "pointer",
          minWidth: "48px",
          minHeight: "48px",
          outline: "none",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="4" r="2" />
          <path d="M12 6v6M6 10l6 2 6-2M12 12l-4 8M12 12l4 8" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          right: 0,
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          overflow: "hidden",
          zIndex: 100,
          minWidth: "200px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          <div style={{ padding: "8px 14px", borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.textLight, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Accessibility
            </span>
          </div>
          {options.map((item, i) => (
            <button
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "12px 14px",
                backgroundColor: "transparent",
                border: "none",
                color: colors.text,
                cursor: "pointer",
                fontSize: "13px",
                textAlign: "left",
                minHeight: "48px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.bgHover }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PlayerInfo({ name, rating, time, isWhite, isActive }: { 
  name: string
  rating: number
  time: string
  isWhite: boolean
  isActive?: boolean
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      backgroundColor: isActive ? colors.bgHover : colors.bgCard,
      borderRadius: "8px",
      borderLeft: isActive ? `3px solid ${colors.green}` : "3px solid transparent",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: isWhite ? "#fff" : "#1a1a1a",
          border: `2px solid ${colors.border}`,
        }} />
        <div>
          <div style={{ color: colors.textBright, fontSize: "14px", fontWeight: 600 }}>{name}</div>
          <div style={{ color: colors.textLight, fontSize: "12px" }}>{rating}</div>
        </div>
      </div>
      <div style={{
        backgroundColor: isActive ? colors.green : colors.bg,
        color: colors.textBright,
        padding: "8px 14px",
        borderRadius: "6px",
        fontSize: "18px",
        fontWeight: 700,
        fontFamily: "monospace",
      }}>
        {time}
      </div>
    </div>
  )
}

function MoveList({ moves, currentMove, onMoveClick }: { 
  moves: string[]
  currentMove: number
  onMoveClick: (i: number) => void 
}) {
  const pairs: { num: number; white: string; black?: string }[] = []
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({ 
      num: Math.floor(i / 2) + 1, 
      white: moves[i], 
      black: moves[i + 1] 
    })
  }

  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {pairs.map((pair, pairIndex) => (
        <div key={pairIndex} style={{ 
          display: "grid", 
          gridTemplateColumns: "32px 1fr 1fr", 
          gap: "4px",
          padding: "2px 0",
        }}>
          <span style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 500 }}>{pair.num}.</span>
          <button
            onClick={() => onMoveClick(pairIndex * 2)}
            style={{
              backgroundColor: currentMove === pairIndex * 2 ? colors.green : "transparent",
              border: "none",
              color: currentMove === pairIndex * 2 ? colors.textBright : colors.text,
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "monospace",
              textAlign: "left",
              fontWeight: currentMove === pairIndex * 2 ? 600 : 400,
            }}
            onMouseEnter={(e) => { if (currentMove !== pairIndex * 2) e.currentTarget.style.backgroundColor = colors.bgHover }}
            onMouseLeave={(e) => { if (currentMove !== pairIndex * 2) e.currentTarget.style.backgroundColor = "transparent" }}
          >
            {pair.white}
          </button>
          {pair.black && (
            <button
              onClick={() => onMoveClick(pairIndex * 2 + 1)}
              style={{
                backgroundColor: currentMove === pairIndex * 2 + 1 ? colors.green : "transparent",
                border: "none",
                color: currentMove === pairIndex * 2 + 1 ? colors.textBright : colors.text,
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "monospace",
                textAlign: "left",
                fontWeight: currentMove === pairIndex * 2 + 1 ? 600 : 400,
              }}
              onMouseEnter={(e) => { if (currentMove !== pairIndex * 2 + 1) e.currentTarget.style.backgroundColor = colors.bgHover }}
              onMouseLeave={(e) => { if (currentMove !== pairIndex * 2 + 1) e.currentTarget.style.backgroundColor = "transparent" }}
            >
              {pair.black}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ChessPage() {
  const [currentMove, setCurrentMove] = useState(4)
  const [flipped, setFlipped] = useState(false)
  const moves = ["e4", "e5", "Nf3", "Nc6", "Bb5"]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentMove(prev => Math.max(0, prev - 1))
      else if (e.key === "ArrowRight") setCurrentMove(prev => Math.min(moves.length - 1, prev + 1))
      else if (e.key === "Home") setCurrentMove(0)
      else if (e.key === "End") setCurrentMove(moves.length - 1)
      else if (e.key === "f" || e.key === "F") setFlipped(prev => !prev)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [moves.length])

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Skip link */}
      <a
        href="#main"
        style={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: colors.green,
          color: colors.textBright,
          padding: "10px 20px",
          borderRadius: "0 0 8px 8px",
          fontWeight: 600,
          zIndex: 1000,
        }}
        onFocus={(e) => { e.currentTarget.style.top = "0" }}
        onBlur={(e) => { e.currentTarget.style.top = "-50px" }}
      >
        Skip to content
      </a>

      {/* Header */}
      <header style={{ 
        backgroundColor: colors.bgLight, 
        borderBottom: `1px solid ${colors.border}`, 
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          height: "56px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <a href="/" style={{ 
              color: colors.textBright, 
              fontSize: "22px", 
              fontWeight: 800, 
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}>
              lichess
            </a>
            <nav style={{ display: "flex", gap: "4px" }}>
              {["PLAY", "PUZZLES", "LEARN", "WATCH", "COMMUNITY"].map(item => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: colors.textLight,
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "8px 12px",
                    borderRadius: "4px",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = colors.textBright 
                    e.currentTarget.style.backgroundColor = colors.bgHover
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = colors.textLight
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LanguageSelector />
            <ThemeToggle />
            <AccessibilityMenu />
            <button
              style={{
                backgroundColor: colors.green,
                color: colors.textBright,
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                marginLeft: "8px",
                minHeight: "40px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.greenLight }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.green }}
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main" style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {/* Board Section */}
          <div style={{ flex: "0 0 auto", width: "100%", maxWidth: "520px" }}>
            {/* Top player */}
            <PlayerInfo name="Magnus" rating={2850} time="5:42" isWhite={false} />
            
            {/* Board */}
            <div style={{ margin: "12px 0" }}>
              <ChessBoard flipped={flipped} />
            </div>
            
            {/* Bottom player */}
            <PlayerInfo name="Hikaru" rating={2780} time="4:18" isWhite={true} isActive={true} />
            
            {/* Controls */}
            <div style={{
              marginTop: "16px",
              backgroundColor: colors.bgCard,
              borderRadius: "10px",
              padding: "12px",
            }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", flexWrap: "wrap" }}>
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 17-5-5 5-5M18 17l-5-5 5-5" /></svg>}
                  label="First"
                  shortcut="Home"
                  disabled={currentMove === 0}
                  onClick={() => setCurrentMove(0)}
                />
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>}
                  label="Previous"
                  shortcut="Left"
                  disabled={currentMove === 0}
                  onClick={() => setCurrentMove(Math.max(0, currentMove - 1))}
                />
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>}
                  label="Next"
                  shortcut="Right"
                  disabled={currentMove === moves.length - 1}
                  onClick={() => setCurrentMove(Math.min(moves.length - 1, currentMove + 1))}
                />
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 17 5-5-5-5M13 17l5-5-5-5" /></svg>}
                  label="Last"
                  shortcut="End"
                  disabled={currentMove === moves.length - 1}
                  onClick={() => setCurrentMove(moves.length - 1)}
                />
                
                <div style={{ width: "1px", backgroundColor: colors.border, margin: "0 8px" }} />
                
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4M17 8v12M7 4l4 4-4 4M17 20l-4-4 4-4" /></svg>}
                  label="Flip"
                  shortcut="F"
                  active={flipped}
                  onClick={() => setFlipped(!flipped)}
                />
                <ControlButton
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
                  label="Settings"
                />
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div style={{ 
            flex: 1, 
            minWidth: "280px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "16px",
            backgroundColor: colors.bgCard,
            borderRadius: "10px",
            padding: "16px",
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              paddingBottom: "12px",
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <span style={{ color: colors.textBright, fontSize: "14px", fontWeight: 600 }}>
                Ruy Lopez: Berlin Defense
              </span>
              <span style={{ color: colors.textLight, fontSize: "12px" }}>
                Rapid 10+0
              </span>
            </div>
            
            <MoveList moves={moves} currentMove={currentMove} onMoveClick={setCurrentMove} />
            
            <div style={{ 
              display: "flex", 
              gap: "8px", 
              paddingTop: "12px",
              borderTop: `1px solid ${colors.border}`,
            }}>
              <button style={{
                flex: 1,
                backgroundColor: colors.bgHover,
                border: "none",
                color: colors.text,
                padding: "12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                minHeight: "48px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                Share
              </button>
              <button style={{
                flex: 1,
                backgroundColor: colors.bgHover,
                border: "none",
                color: colors.text,
                padding: "12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                minHeight: "48px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                </svg>
                Analyze
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
