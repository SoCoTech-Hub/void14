import FaqFaqsCategoryList from "@/components/faqFaqsCategories/FaqFaqsCategoryList";
import NewFaqFaqsCategoryModal from "@/components/faqFaqsCategories/FaqFaqsCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function FaqFaqsCategories() {
  const { faqFaqsCategories } = await api.faqFaqsCategories.getFaqFaqsCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Faq Faqs Categories</h1>
        <NewFaqFaqsCategoryModal />
      </div>
      <FaqFaqsCategoryList faqFaqsCategories={faqFaqsCategories} />
    </main>
  );
}
