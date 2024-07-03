import GlossaryFormatList from "@/components/glossaryFormats/GlossaryFormatList";
import NewGlossaryFormatModal from "@/components/glossaryFormats/GlossaryFormatModal";
import { api } from "@/lib/trpc/api";

export default async function GlossaryFormats() {
  const { glossaryFormats } = await api.glossaryFormats.getGlossaryFormats.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossary Formats</h1>
        <NewGlossaryFormatModal />
      </div>
      <GlossaryFormatList glossaryFormats={glossaryFormats} />
    </main>
  );
}
