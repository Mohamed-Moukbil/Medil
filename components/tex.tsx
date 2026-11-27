import { renderMath } from "@/lib/content/rich-text";

type TexProps = {
  expression: string | null | undefined;
  display?: boolean;
  className?: string;
};

/**
 * Server-rendered KaTeX. The HTML comes from KaTeX itself, never from user
 * input, so it is safe to inject.
 */
export function Tex({ expression, display = false, className = "" }: TexProps) {
  if (!expression) return null;

  return (
    <span
      className={`tex ${display ? "tex-display" : ""} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: renderMath(expression, display) }}
    />
  );
}
