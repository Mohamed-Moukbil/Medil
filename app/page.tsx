export default function Home() {
  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          MEDIL · Next.js + Supabase
        </p>
        <h1 style={{ marginTop: 24, fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.95 }}>
          La prépa,
          <br />
          <span className="serif-italic">sans angles morts.</span>
        </h1>
        <p style={{ marginTop: 24, maxWidth: 620, color: "var(--ink-muted)", fontSize: 18 }}>
          Le nouveau site est en cours de migration. Les cours, exercices, concours et le forum
          arrivent ici, servis dynamiquement depuis Supabase.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a className="btn btn--lime btn--lg" href="/cours">
            Voir les cours
          </a>
          <a className="btn btn--outline btn--lg" href="/forum">
            Ouvrir le forum
          </a>
        </div>
      </div>
    </main>
  );
}
