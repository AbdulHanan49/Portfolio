"use client";

const ITEMS: [string, string, boolean][] = [
  ["14+",          "Months Experience",    true  ],
  ["3+",           "SaaS Products",        false ],
  ["24+",          "Technologies",         true  ],
  ["Full-Stack",   "Engineer",             false ],
  ["React/FastAPI","Core Stack",           true  ],
  ["Lahore",       "Open to Remote",       false ],
  ["FAST-NUCES",   "Class of 2024",        true  ],
  ["Production",   "Grade Code",           false ],
];

function TickerGroup() {
  return (
    <div className="marquee__group" style={{ gap: 0 }}>
      {ITEMS.map(([val, lbl, isAccent], i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span className="ticker-item">
            <span
              className="ticker-value"
              style={{ color: isAccent ? "var(--accent)" : "var(--accent-secondary)" }}
            >
              {val}
            </span>
            <span className="ticker-label">{lbl}</span>
          </span>
          <span className="ticker-sep" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function StatsTicker() {
  return (
    <div className="stats-ticker" aria-hidden="true">
      <div className="marquee">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
