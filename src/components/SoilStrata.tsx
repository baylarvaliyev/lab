// Decorative recurring motif: a cross-section of soil strata.
// Ties the abstract brand mark directly back to the lab's actual subject
// matter (soil layer analysis) instead of a generic gradient blob.
export default function SoilStrata({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="480" height="72" fill="var(--paper-dim)" />
      <rect x="0" y="72" width="480" height="86" fill="var(--green)" />
      <rect x="0" y="158" width="480" height="70" fill="var(--ochre)" />
      <rect x="0" y="228" width="480" height="68" fill="var(--green-deep)" />
      <rect x="0" y="296" width="480" height="64" fill="var(--ink)" />

      {/* root system reaching down through the layers */}
      <path
        d="M240 10 C238 40, 246 55, 232 78 C222 95, 250 110, 236 140
           C226 158, 260 172, 244 200 C232 220, 258 236, 240 260"
        stroke="var(--paper)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M240 78 C220 92, 200 96, 182 118"
        stroke="var(--paper)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M240 78 C262 96, 278 100, 296 124"
        stroke="var(--paper)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M236 140 C214 154, 198 150, 176 168"
        stroke="var(--paper)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M244 200 C266 212, 284 210, 304 226"
        stroke="var(--paper)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* depth markers, like a soil sample core log */}
      {[72, 158, 228, 296].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="var(--paper)" strokeWidth="1" opacity="0.25" />
      ))}
    </svg>
  );
}
