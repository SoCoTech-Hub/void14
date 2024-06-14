import GlossaryAliasList from "@/components/glossaryAliases/GlossaryAliasList";
import NewGlossaryAliasModal from "@/components/glossaryAliases/GlossaryAliasModal";
import { api } from "@/lib/trpc/api";

export default async function GlossaryAliases() {
  const { glossaryAliases } = await api.glossaryAliases.getGlossaryAliases.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossary Aliases</h1>
        <NewGlossaryAliasModal />
      </div>
      <GlossaryAliasList glossaryAliases={glossaryAliases} />
    </main>
  );
}
