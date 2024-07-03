import GlossaryCategoryList from "@/components/glossaryCategories/GlossaryCategoryList";
import NewGlossaryCategoryModal from "@/components/glossaryCategories/GlossaryCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function GlossaryCategories() {
  const { glossaryCategories } = await api.glossaryCategories.getGlossaryCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Glossary Categories</h1>
        <NewGlossaryCategoryModal />
      </div>
      <GlossaryCategoryList glossaryCategories={glossaryCategories} />
    </main>
  );
}
