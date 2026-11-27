import "server-only";

import katex from "katex";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "sub",
  "sup",
  "code",
  "pre",
  "span",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel", "title"],
  span: ["class", "data-tex"],
  code: ["class"],
};

function decodeEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function getAttribute(attributes: string, name: string): string | null {
  const match = attributes.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return match ? decodeEntities(match[1]) : null;
}

function renderMath(expression: string, displayMode = false): string {
  try {
    return katex.renderToString(expression, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "html",
    });
  } catch (error) {
    console.error("[medil] KaTeX render failed:", error);
    return `<code>${expression.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
  }
}

/**
 * Sanitizes editorial HTML, then replaces inline TeX placeholders with
 * server-rendered KaTeX. The result is safe to inject with
 * dangerouslySetInnerHTML.
 */
export function renderRichText(input: string | null | undefined): string {
  if (!input) return "";

  const sanitized = sanitizeHtml(input, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedClasses: {
      span: ["inline-tex"],
      code: ["language-*"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => {
        const next: Record<string, string> = { ...attribs, rel: "noopener noreferrer" };
        if (next.target && next.target !== "_blank") delete next.target;
        return { tagName, attribs: next };
      },
    },
  });

  return sanitized.replace(
    /<span\b([^>]*)>\s*<\/span>/gi,
    (match, attributes: string) => {
      if (!/\binline-tex\b/i.test(attributes)) return match;
      const expression = getAttribute(attributes, "data-tex");
      if (!expression) return match;
      return renderMath(expression);
    },
  );
}

export function renderPlainText(input: string | null | undefined): string {
  if (!input) return "";

  return input
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export { renderMath };
