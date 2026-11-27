import type { ReactNode } from "react";

export function CoverArt({ type }: { type: string | null | undefined }) {
  const art: Record<string, ReactNode> = {
    matrix: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <circle cx="234" cy="74" r="72" stroke="currentColor" strokeOpacity=".2" />
        <circle cx="234" cy="74" r="45" stroke="currentColor" strokeOpacity=".16" />
        <path d="M60 157 164 51M101 167 205 61M40 119 144 13" stroke="currentColor" strokeOpacity=".13" />
        <path d="M199 37v74M262 37v74M189 47h83M189 101h83" stroke="currentColor" strokeOpacity=".34" />
        <path d="M214 62h33M214 80h20M238 98h9" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
      </svg>
    ),
    graph: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <path d="M32 154h260M54 178V28" stroke="currentColor" strokeOpacity=".22" />
        <path d="M54 127c35-8 45-76 101-74 80 2 83 97 157 66" stroke="currentColor" strokeOpacity=".68" strokeWidth="2" />
        <path d="M54 145c44-56 79-105 156-98 30 3 58 25 76 58" stroke="currentColor" strokeOpacity=".2" strokeDasharray="5 7" />
        <circle cx="155" cy="53" r="4" fill="currentColor" />
        <circle cx="245" cy="110" r="4" fill="currentColor" />
        <path d="M54 127h201" stroke="currentColor" strokeOpacity=".22" strokeDasharray="3 7" />
      </svg>
    ),
    dots: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <g fill="currentColor" opacity=".27">
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 11 }, (_, col) => (
              <circle key={`${row}-${col}`} cx={35 + col * 25} cy={28 + row * 24} r="1.8" />
            )),
          )}
        </g>
        <path d="M41 159c47 0 54-105 121-105s72 70 118 70" stroke="currentColor" strokeOpacity=".6" strokeWidth="2" />
        <path d="M66 159c35 0 42-76 96-76s62 52 118 52" stroke="currentColor" strokeOpacity=".16" strokeDasharray="4 7" />
        <circle cx="162" cy="54" r="5" fill="currentColor" />
      </svg>
    ),
    field: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <circle cx="160" cy="94" r="20" fill="currentColor" opacity=".88" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M160 94 ${i * 30 + 10} 190`}
            stroke="currentColor"
            strokeOpacity={0.12 + (i % 3) * 0.08}
          />
        ))}
        <circle cx="160" cy="94" r="47" stroke="currentColor" strokeOpacity=".25" />
        <circle cx="160" cy="94" r="74" stroke="currentColor" strokeOpacity=".18" />
        <circle cx="160" cy="94" r="103" stroke="currentColor" strokeOpacity=".11" />
      </svg>
    ),
    wave: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <path d="M18 103c17-54 34-54 51 0s34 54 51 0 34-54 51 0 34 54 51 0 34-54 51 0 34 54 51 0" stroke="currentColor" strokeOpacity=".63" strokeWidth="2" />
        <path d="M18 132c17-33 34-33 51 0s34 33 51 0 34-33 51 0 34 33 51 0 34-33 51 0 34 33 51 0" stroke="currentColor" strokeOpacity=".22" />
        <path d="M18 74c17-24 34-24 51 0s34 24 51 0 34-24 51 0 34 24 51 0 34-24 51 0 34 24 51 0" stroke="currentColor" strokeOpacity=".16" />
        <circle cx="161" cy="103" r="4" fill="currentColor" />
      </svg>
    ),
    thermo: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <rect x="82" y="39" width="105" height="110" rx="10" stroke="currentColor" strokeOpacity=".47" />
        <path d="M187 65h42v70h-42M229 65l39 35-39 35" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
        <path d="M105 151V74h65v77M105 97h65M105 122h65" stroke="currentColor" strokeOpacity=".17" />
        <circle cx="260" cy="47" r="4" fill="currentColor" opacity=".7" />
        <path d="M250 30c20 0 20-18 38-18M250 26c15 0 15-14 29-14" stroke="currentColor" strokeOpacity=".2" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <path d="M88 41h55l37 37v80H88V41ZM143 41v38h37" stroke="currentColor" strokeOpacity=".43" />
        <path d="M109 108h65M109 123h52M109 138h34" stroke="currentColor" strokeOpacity=".3" strokeWidth="2" />
        <path d="m221 70-28 30 28 30M263 70l28 30-28 30" stroke="currentColor" strokeOpacity=".33" strokeWidth="2" />
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <rect x="55" y="42" width="210" height="120" rx="10" stroke="currentColor" strokeOpacity=".4" />
        <path d="M55 66h210" stroke="currentColor" strokeOpacity=".24" />
        <circle cx="72" cy="54" r="2.5" fill="currentColor" opacity=".6" />
        <circle cx="82" cy="54" r="2.5" fill="currentColor" opacity=".35" />
        <circle cx="92" cy="54" r="2.5" fill="currentColor" opacity=".2" />
        <path d="m76 92 12 11-12 11M101 116h47" stroke="currentColor" strokeOpacity=".58" strokeWidth="2" />
        <path d="M76 138h140M76 147h74" stroke="currentColor" strokeOpacity=".15" />
      </svg>
    ),
    norm: (
      <svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
        <circle cx="172" cy="93" r="68" stroke="currentColor" strokeOpacity=".33" />
        <circle cx="172" cy="93" r="42" stroke="currentColor" strokeOpacity=".18" />
        <path d="M172 93 264 45M172 93 107 159" stroke="currentColor" strokeOpacity=".62" strokeWidth="2" />
        <path d="M172 93h68v52H172" stroke="currentColor" strokeOpacity=".16" strokeDasharray="4 6" />
        <circle cx="172" cy="93" r="4" fill="currentColor" />
        <circle cx="264" cy="45" r="4" fill="currentColor" />
      </svg>
    ),
  };

  return <div className="cover-art" aria-hidden="true">{art[type ?? "matrix"] ?? art.matrix}</div>;
}
