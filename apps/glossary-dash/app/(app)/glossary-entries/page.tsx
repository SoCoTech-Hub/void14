import GlossaryEntryList from "@/components/glossaryEntries/GlossaryEntryList";
import NewGlossaryEntryModal from "@/components/glossaryEntries/GlossaryEntryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GlossaryEntries() {
  await checkAuth();
  const { glossaryEntries } = await api.glossaryEntries.getGlossaryEntries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossary Entries</h1>
        <NewGlossaryEntryModal />
      </div>
      <GlossaryEntryList glossaryEntries={glossaryEntries} />
    </main>
  );
}
