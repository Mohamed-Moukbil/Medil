import { describe, expect, it } from "vitest";
import {
  courseRow,
  dailyRow,
  parseCompactNumber,
  parseRelativeDate,
  replyRows,
  threadRow,
} from "./seed.mjs";

const reference = new Date("2026-11-27T12:00:00.000Z");

describe("parseCompactNumber", () => {
  it("parses compact French view counts", () => {
    expect(parseCompactNumber("1,2k")).toBe(1200);
    expect(parseCompactNumber("2,1k")).toBe(2100);
    expect(parseCompactNumber("864")).toBe(864);
    expect(parseCompactNumber("1.5m")).toBe(1_500_000);
    expect(parseCompactNumber(42)).toBe(42);
  });

  it("falls back to zero for empty or unknown values", () => {
    expect(parseCompactNumber("")).toBe(0);
    expect(parseCompactNumber("beaucoup")).toBe(0);
    expect(parseCompactNumber(null)).toBe(0);
  });
});

describe("parseRelativeDate", () => {
  it("parses hours and minutes", () => {
    expect(parseRelativeDate("il y a 2 h", reference).toISOString()).toBe(
      "2026-11-27T10:00:00.000Z",
    );
    expect(parseRelativeDate("il y a 48 min", reference).toISOString()).toBe(
      "2026-11-27T11:12:00.000Z",
    );
  });

  it("parses yesterday", () => {
    expect(parseRelativeDate("hier", reference).toISOString()).toBe(
      "2026-11-26T12:00:00.000Z",
    );
  });

  it("falls back to the reference date", () => {
    expect(parseRelativeDate("un jour", reference).toISOString()).toBe(
      reference.toISOString(),
    );
  });
});

describe("row mapping", () => {
  it("maps a course from camelCase to snake_case", () => {
    const row = courseRow({
      id: "demo",
      title: "Démo",
      subject: "Maths",
      level: "MP",
      coverType: "matrix",
      coverEq: "A=PDP^{-1}",
      chaptersCount: 3,
      featured: true,
      objectives: ["a"],
      toc: ["b"],
      sections: [],
    });

    expect(row.cover_type).toBe("matrix");
    expect(row.chapters_count).toBe(3);
    expect(row.toc).toEqual(["b"]);
    expect(row.status).toBe("published");
  });

  it("maps forum threads and prefixes reply ids", () => {
    const thread = {
      id: "demo-thread",
      category: "Maths",
      title: "Titre",
      excerpt: "Résumé",
      author: "Lina B.",
      grade: "MP* · Ginette",
      initials: "LB",
      avatarColor: "lime",
      time: "il y a 2 h",
      views: "1,2k",
      upvotes: 12,
      tags: ["algèbre"],
      pinned: true,
      content: "Corps du sujet",
      answers: [{ id: "r1", author: "Adam K.", text: "Réponse", upvotes: 3 }],
    };

    const row = threadRow(thread);
    expect(row.views).toBe(1200);
    expect(row.author_grade).toBe("MP* · Ginette");
    expect(row.excerpt).toBe("Résumé");

    const replies = replyRows(thread);
    expect(replies).toHaveLength(1);
    expect(replies[0].id).toBe("demo-thread--r1");
    expect(replies[0].thread_id).toBe("demo-thread");
  });

  it("builds a daily challenge with a Paris date", () => {
    const row = dailyRow(
      { id: "nilpotente-inversible", title: "Défi", steps: ["a"] },
      "nilpotente-inversible",
    );

    expect(row.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(row.exercise_id).toBe("nilpotente-inversible");
    expect(row.steps).toEqual(["a"]);
  });
});
