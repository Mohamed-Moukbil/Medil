"use client";

import { useState, useTransition } from "react";
import { uploadFile } from "@/lib/storage/actions";

export default function UploadPage() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await uploadFile(fd);
      if (res.ok) {
        setResult(res.url);
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Upload de fichier</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <div>
          <label className="field-label">Bucket</label>
          <select className="input" name="bucket" defaultValue="covers">
            <option value="covers">covers (images)</option>
            <option value="papers">papers (PDFs)</option>
          </select>
        </div>
        <div>
          <label className="field-label">Fichier</label>
          <input className="input" type="file" name="file" required />
        </div>
        <button className="btn btn--lime" type="submit" disabled={pending}>
          {pending ? "Upload…" : "Uploader"}
        </button>
      </form>
      {result ? (
        <div style={{ marginTop: 16, padding: 12, background: "var(--lime-soft)", borderRadius: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 600 }}>URL publique :</p>
          <code style={{ fontSize: 12, wordBreak: "break-all" }}>{result}</code>
        </div>
      ) : null}
      {error ? <p style={{ color: "var(--coral)", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}
