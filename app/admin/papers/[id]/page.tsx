import { getPaper } from "@/lib/content/public";
import { PaperForm } from "@/components/admin/paper-form";
import { notFound } from "next/navigation";

export default async function EditPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = await getPaper(id);
  if (!paper) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Modifier : {paper.title}</h1>
      <PaperForm initial={paper as unknown as Record<string, unknown>} />
    </div>
  );
}
