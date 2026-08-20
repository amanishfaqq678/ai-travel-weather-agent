import { motion } from "framer-motion";

const destinations = [
  { x: 32, y: 38, label: "Lahore" },
  { x: 62, y: 30, label: "Swat" },
  { x: 70, y: 62, label: "Dubai" },
  { x: 44, y: 68, label: "Murree" },
];

/**
 * Abstract travel + weather + AI hero visual: a dark globe with atmospheric
 * layers, glowing destination nodes, route arcs and a scanning sweep.
 * Pure SVG/CSS — no stock imagery.
 */
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto aspect-square w-full max-w-lg"
      aria-hidden
    >
      <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute inset-16 rounded-full bg-electric/20 blur-3xl" />

      <svg viewBox="0 0 100 100" className="relative size-full">
        <defs>
          <radialGradient id="globeFill" cx="35%" cy="30%">
            <stop offset="0%" stopColor="var(--surface-2)" />
            <stop offset="100%" stopColor="var(--background)" />
          </radialGradient>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>

        {/* atmosphere rings */}
        {[46, 42].map((r, i) => (
          <motion.circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.3"
            strokeDasharray={i === 0 ? "2 3" : undefined}
            animate={{ rotate: 360 }}
            transition={{ duration: 60 + i * 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 50%" }}
          />
        ))}

        {/* globe */}
        <circle cx="50" cy="50" r="36" fill="url(#globeFill)" stroke="var(--border)" strokeWidth="0.4" />

        {/* meridians */}
        {[10, 20, 30].map((rx) => (
          <ellipse
            key={rx}
            cx="50"
            cy="50"
            rx={rx}
            ry="36"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.18"
            strokeWidth="0.3"
          />
        ))}
        {[-24, -12, 0, 12, 24].map((dy) => (
          <ellipse
            key={dy}
            cx="50"
            cy={50 + dy}
            rx={Math.sqrt(Math.max(36 * 36 - dy * dy, 0))}
            ry="3"
            fill="none"
            stroke="var(--electric)"
            strokeOpacity="0.16"
            strokeWidth="0.3"
          />
        ))}

        {/* route arcs */}
        <path
          d="M32 62 Q50 22 70 46"
          fill="none"
          stroke="url(#arc)"
          strokeWidth="0.6"
          strokeDasharray="1.5 2"
          opacity="0.8"
        />
        <path d="M38 38 Q56 52 66 70" fill="none" stroke="url(#arc)" strokeWidth="0.5" opacity="0.5" />

        {/* destination nodes */}
        {destinations.map((d, i) => (
          <g key={d.label}>
            <motion.circle
              cx={d.x}
              cy={d.y}
              r="1.4"
              fill="var(--cyan)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
            />
            <motion.circle
              cx={d.x}
              cy={d.y}
              r="1.4"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="0.3"
              animate={{ r: [1.4, 5], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
            />
          </g>
        ))}

        {/* AI scan sweep */}
        <motion.line
          x1="50"
          y1="14"
          x2="50"
          y2="86"
          stroke="var(--primary)"
          strokeOpacity="0.35"
          strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        />
      </svg>

      {/* floating data chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute left-0 top-10 rounded-xl px-4 py-3"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Travel Score</p>
        <p className="font-display text-xl font-semibold">82</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="glass absolute bottom-8 right-0 rounded-xl px-4 py-3"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Rain Risk</p>
        <p className="font-display text-xl font-semibold text-cyan">Low</p>
      </motion.div>
    </motion.div>
  );
}
