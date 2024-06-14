import GlossaryList from "@/components/glossaries/GlossaryList";
import NewGlossaryModal from "@/components/glossaries/GlossaryModal";
import { api } from "@/lib/trpc/api";

export default async function Glossaries() {
  const { glossaries } = await api.glossaries.getGlossaries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossaries</h1>
        <NewGlossaryModal />
      </div>
      <GlossaryList glossaries={glossaries} />
    </main>
  );
}
