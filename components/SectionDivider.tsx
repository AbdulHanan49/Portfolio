interface SectionDividerProps {
  flip?: boolean;
}

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  const id = `divider-grad-${flip ? "f" : "n"}`;

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: 48,
        overflow: "hidden",
        pointerEvents: "none",
        background: "var(--bg-primary)",
      }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%", transform: flip ? "scaleY(-1)" : undefined }}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            <stop offset="50%"  style={{ stopColor: "var(--accent)", stopOpacity: 0.45 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-secondary)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
