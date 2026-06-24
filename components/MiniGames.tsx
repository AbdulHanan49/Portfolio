"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

/* ─────────────────────────────────────────
   TIC-TAC-TOE  (minimax AI)
───────────────────────────────────────── */
const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(b: (string|null)[]): string|null {
  for (const [a,c,d] of WIN_LINES)
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return null;
}

function getWinLine(b: (string|null)[]): number[]|null {
  for (const line of WIN_LINES) {
    const [a,c,d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
  }
  return null;
}

function minimax(b: (string|null)[], depth: number, maximizing: boolean): number {
  const w = checkWinner(b);
  if (w === "O") return 10 - depth;
  if (w === "X") return depth - 10;
  if (b.every(Boolean)) return 0;
  if (maximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { b[i] = "O"; best = Math.max(best, minimax(b, depth+1, false)); b[i] = null; }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { b[i] = "X"; best = Math.min(best, minimax(b, depth+1, true)); b[i] = null; }
    }
    return best;
  }
}

function bestMove(b: (string|null)[]): number {
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = "O";
      const v = minimax(b, 0, false);
      b[i] = null;
      if (v > best) { best = v; move = i; }
    }
  }
  return move;
}

function TicTacToe() {
  const [board, setBoard] = useState<(string|null)[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [scores, setScores] = useState({ you: 0, ai: 0, draw: 0 });
  const [over, setOver] = useState(false);
  const [msg, setMsg] = useState("Your turn  —  you are ✕");

  const winner = checkWinner(board);
  const winLine = getWinLine(board);
  const draw = !winner && board.every(Boolean);

  const click = useCallback((i: number) => {
    if (!playerTurn || board[i] || winner || draw || over) return;
    const next = [...board]; next[i] = "X";
    setBoard(next); setPlayerTurn(false);
  }, [board, playerTurn, winner, draw, over]);

  useEffect(() => {
    if (playerTurn) return;
    if (checkWinner(board) || board.every(Boolean)) return;
    const t = setTimeout(() => {
      const b = [...board];
      const m = bestMove(b);
      if (m !== -1) { b[m] = "O"; setBoard(b); }
      setPlayerTurn(true);
    }, 430);
    return () => clearTimeout(t);
  }, [playerTurn, board]);

  useEffect(() => {
    const w = checkWinner(board);
    const d = !w && board.every(Boolean);
    if (w) {
      setOver(true);
      if (w === "X") { setMsg("You win!"); setScores(s => ({...s, you: s.you+1})); }
      else            { setMsg("AI wins!"); setScores(s => ({...s, ai: s.ai+1})); }
    } else if (d) {
      setOver(true); setMsg("It's a draw."); setScores(s => ({...s, draw: s.draw+1}));
    } else if (playerTurn) setMsg("Your turn  —  you are ✕");
    else setMsg("AI is thinking…");
  }, [board, playerTurn]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true); setOver(false);
    setMsg("Your turn  —  you are ✕");
  };

  return (
    <div className="game-panel">
      {/* Scoreboard */}
      <div className="game-scores">
        {[
          { l: "You (✕)", v: scores.you,  c: "var(--accent)" },
          { l: "Draw",    v: scores.draw, c: "var(--text-muted)" },
          { l: "AI  (○)", v: scores.ai,   c: "#F59E0B" },
        ].map(s => (
          <div key={s.l} className="game-score-item">
            <span className="game-score-val" style={{ color: s.c }}>{s.v}</span>
            <span className="game-score-label">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Status line */}
      <motion.p key={msg} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="game-status">
        {msg}
      </motion.p>

      {/* 3×3 board */}
      <div className="ttt-grid">
        {board.map((cell, i) => {
          const hl = winLine?.includes(i);
          return (
            <motion.button
              key={i}
              onClick={() => click(i)}
              whileHover={!cell && !over ? { scale: 1.08, backgroundColor: "var(--accent-glow)" } : {}}
              whileTap={!cell && !over   ? { scale: 0.92 } : {}}
              className={`ttt-cell${hl ? " ttt-cell-win" : ""}`}
              style={{ cursor: cell || over ? "default" : "pointer" }}
              aria-label={`Cell ${i + 1}: ${cell === "X" ? "your mark" : cell === "O" ? "AI mark" : "empty"}`}
            >
              <AnimatePresence mode="wait">
                {cell && (
                  <motion.span
                    key={`${i}-${cell}`}
                    initial={{ scale: 0, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    style={{
                      color: cell === "X" ? "var(--accent)" : "#F59E0B",
                      textShadow: cell === "X"
                        ? "0 0 18px rgba(120,86,255,0.9), 0 0 36px rgba(120,86,255,0.4)"
                        : "0 0 18px rgba(245,158,11,0.9), 0 0 36px rgba(245,158,11,0.4)",
                    }}
                  >
                    {cell === "X" ? "✕" : "○"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <motion.button onClick={reset} className="game-reset-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        New Game
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────
   MEMORY CARD GAME
───────────────────────────────────────── */
const MEM_ITEMS = [
  { id: "react",  label: "React",      color: "#61DAFB" },
  { id: "ts",     label: "TypeScript", color: "#3178C6" },
  { id: "vue",    label: "Vue 3",      color: "#42b883" },
  { id: "py",     label: "Python",     color: "#F7CA3B" },
  { id: "node",   label: "Node.js",    color: "#68A063" },
  { id: "docker", label: "Docker",     color: "#2496ED" },
  { id: "git",    label: "Git",        color: "#F05032" },
  { id: "api",    label: "FastAPI",    color: "#009688" },
];

type MC = { uid: string; id: string; label: string; color: string; flipped: boolean; matched: boolean };

function MemoryGame() {
  const [cards, setCards] = useState<MC[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locking, setLocking] = useState(false);

  const init = useCallback(() => {
    const doubled = [...MEM_ITEMS, ...MEM_ITEMS]
      .map((c, i) => ({ ...c, uid: `${c.id}-${i}`, flipped: false, matched: false }));
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled); setPicked([]); setMoves(0); setWon(false); setLocking(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  const flip = (uid: string) => {
    if (locking || picked.length >= 2) return;
    const card = cards.find(c => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    const next = cards.map(c => c.uid === uid ? { ...c, flipped: true } : c);
    const newPicked = [...picked, uid];
    setCards(next); setPicked(newPicked);

    if (newPicked.length === 2) {
      setMoves(m => m+1); setLocking(true);
      const [u1, u2] = newPicked;
      const c1 = next.find(c => c.uid === u1)!;
      const c2 = next.find(c => c.uid === u2)!;
      setTimeout(() => {
        const result = c1.id === c2.id
          ? next.map(c => (c.uid===u1||c.uid===u2) ? {...c, matched: true}  : c)
          : next.map(c => (c.uid===u1||c.uid===u2) ? {...c, flipped: false} : c);
        setCards(result);
        if (result.every(c => c.matched)) setWon(true);
        setPicked([]); setLocking(false);
      }, 720);
    }
  };

  const matched = cards.filter(c => c.matched).length / 2;

  return (
    <div className="game-panel">
      {/* Stats */}
      <div className="game-scores">
        <div className="game-score-item">
          <span className="game-score-val" style={{ color: "var(--accent)" }}>{moves}</span>
          <span className="game-score-label">Moves</span>
        </div>
        <div className="game-score-item">
          <span className="game-score-val" style={{ color: "#00FFB2" }}>{matched}/8</span>
          <span className="game-score-label">Matched</span>
        </div>
      </div>

      {/* Status */}
      <AnimatePresence mode="wait">
        {won ? (
          <motion.p key="won" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="game-status" style={{ color: "#00FFB2" }}>
            All matched in {moves} moves.
          </motion.p>
        ) : (
          <motion.p key="hint" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="game-status">
            Flip cards and find matching tech pairs
          </motion.p>
        )}
      </AnimatePresence>

      {/* 4×4 card grid */}
      <div className="mem-grid">
        {cards.map(card => (
          <motion.button
            key={card.uid}
            onClick={() => flip(card.uid)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.08 } : {}}
            whileTap={!card.flipped && !card.matched   ? { scale: 0.92 } : {}}
            className="mem-card"
            style={{
              cursor:      card.flipped || card.matched ? "default" : "pointer",
              borderColor: card.matched ? `${card.color}55` : undefined,
              background:  card.flipped || card.matched ? `${card.color}16` : undefined,
              opacity:     card.matched ? 0.5 : 1,
            }}
          >
            {card.flipped || card.matched ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="mem-card-label"
                style={{ color: card.color }}
              >
                {card.label}
              </motion.span>
            ) : (
              <span className="mem-card-back">?</span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.button onClick={init} className="game-reset-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        Shuffle & Restart
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function MiniGames() {
  const [active, setActive] = useState<"ttt"|"mem">("ttt");

  return (
    <section id="games" style={{ padding: "3.5rem 0 5rem", background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      {/* Subtle dot-grid bg */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(120,86,255,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        mask: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 2rem)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase",
              letterSpacing: "0.28em", marginBottom: "0.6rem",
            }}>
              06 — Playground
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}>
              Mini Games
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 420, margin: "0 auto" }}>
              Take a break — challenge the AI or test your memory with tech pairs.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab switcher */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <div className="game-tab-bar">
            {(["ttt", "mem"] as const).map(g => (
              <button
                key={g}
                onClick={() => setActive(g)}
                className={`game-tab${active === g ? " game-tab-active" : ""}`}
              >
                {g === "ttt" ? "Tic-Tac-Toe" : "Memory Cards"}
              </button>
            ))}
          </div>
        </div>

        {/* Game area */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            {active === "ttt" ? (
              <motion.div key="ttt"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.28 }}
              >
                <TicTacToe />
              </motion.div>
            ) : (
              <motion.div key="mem"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}
              >
                <MemoryGame />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
