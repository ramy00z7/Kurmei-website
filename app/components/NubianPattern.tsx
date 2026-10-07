/** Original geometric artwork inspired by Nubian pottery/textile motifs and the pyramids of Meroë — drawn, not photographed, so there's no rights question. */
export function HeroArt() {
  return <svg className="hero-art" viewBox="0 0 1280 420" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="1080" cy="120" r="90" fill="url(#sun)" />
    {/* Pyramids of Meroë silhouette */}
    <g fill="currentColor" opacity="0.55" stroke="var(--bg)" strokeWidth="2">
      <polygon points="880,420 940,270 1000,420" />
      <polygon points="960,420 1015,250 1070,420" />
      <polygon points="1050,420 1100,290 1150,420" />
      <polygon points="1130,420 1175,310 1220,420" />
    </g>
    {/* Nile wave band */}
    <path d="M0,400 Q160,370 320,400 T640,400 T960,400 T1280,400" fill="none" stroke="var(--accent2)" strokeWidth="2" opacity="0.4" />
    {/* geometric triangle border echoing Nubian pottery motifs */}
    <g fill="var(--accent2)" opacity="0.35">
      {Array.from({ length: 22 }).map((_, i) => <polygon key={i} points={`${i * 60},10 ${i * 60 + 15},32 ${i * 60 + 30},10`} />)}
    </g>
  </svg>;
}
export function Divider({ width = 220 }: { width?: number }) {
  return <svg className="divider" width={width} height="14" viewBox="0 0 220 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="var(--accent2)">
      {Array.from({ length: 11 }).map((_, i) => <polygon key={i} points={`${i * 20},2 ${i * 20 + 10},12 ${i * 20 + 20},2`} />)}
    </g>
  </svg>;
}
