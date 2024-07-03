import GlossaryEntriesCategoryList from "@/components/glossaryEntriesCategories/GlossaryEntriesCategoryList";
import NewGlossaryEntriesCategoryModal from "@/components/glossaryEntriesCategories/GlossaryEntriesCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function GlossaryEntriesCategories() {
  const { glossaryEntriesCategories } = await api.glossaryEntriesCategories.getGlossaryEntriesCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossary Entries Categories</h1>
        <NewGlossaryEntriesCategoryModal />
      </div>
      <GlossaryEntriesCategoryList glossaryEntriesCategories={glossaryEntriesCategories} />
    </main>
  );
}
