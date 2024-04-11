import FaqCategoryList from "@/components/faqCategories/FaqCategoryList";
import NewFaqCategoryModal from "@/components/faqCategories/FaqCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function FaqCategories() {
  const { faqCategories } = await api.faqCategories.getFaqCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Faq Categories</h1>
        <NewFaqCategoryModal />
      </div>
      <FaqCategoryList faqCategories={faqCategories} />
    </main>
  );
}
